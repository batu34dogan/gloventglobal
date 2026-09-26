// Analiz sonuç mantığı — saf, deterministik fonksiyonlar. Ağırlıklar ve skor kuralları eski
// AnalysisContent'teki ile birebir aynı (bu refactor'da davranış değişmedi). Client sonucu anında
// gösterir; /api/analysis-lead aynı fonksiyonlarla answers'tan yeniden hesaplar (client'tan gelen
// skor/önerilere güvenilmez).
import type { Answers } from './questions';
import type { ServiceTag } from './services';

// Kanal bazlı eşleştirme — her kanal için 1 öncelikli sistem + 2 destek sistemi. Çoklu seçimde
// her seçilen kanalın puanı toplanır (kanal seçimi "ilk güçlü sinyal").
const channelTagMap: Record<string, { primary: ServiceTag; support: [ServiceTag, ServiceTag] }> = {
  Amazon: { primary: 'amazon', support: ['reklam-optimizasyon', 'gorsel-icerik-sistemi'] },
  Etsy: { primary: 'etsy', support: ['gorsel-icerik-sistemi', 'sosyal-medya-yonetimi'] },
  eBay: { primary: 'ebay', support: ['global-pazara-giris-stratejisi', 'reklam-optimizasyon'] },
  'Shopify / Kendi Web Sitem': { primary: 'shopify', support: ['reklam-optimizasyon', 'otomasyon-n8n'] },
  'B2B / Toptan': { primary: 'b2b-dijital-showroom', support: ['shopify', 'otomasyon-n8n'] },
  'Sosyal Medya': { primary: 'sosyal-medya-yonetimi', support: ['marka-konumlandirma', 'gorsel-icerik-sistemi'] },
  'Henüz Satış Yapmıyorum': { primary: 'global-pazara-giris-stratejisi', support: ['marka-konumlandirma', 'gorsel-icerik-sistemi'] },
};

// Problem bazlı öncelik sıralaması (1. > 2. > 3.).
const problemTagMap: Record<string, [ServiceTag, ServiceTag, ServiceTag]> = {
  'Yeterli trafik alamıyorum': ['reklam-optimizasyon', 'sosyal-medya-yonetimi', 'gorsel-icerik-sistemi'],
  'Trafik var ama satışa dönüşmüyor': ['gorsel-icerik-sistemi', 'shopify', 'reklam-optimizasyon'],
  'Satış yok / çok düşük': ['marka-konumlandirma', 'gorsel-icerik-sistemi', 'reklam-optimizasyon'],
  'Reklam harcıyorum ama sonuç alamıyorum': ['reklam-optimizasyon', 'gorsel-icerik-sistemi', 'shopify'],
  'Ürünlerimi doğru sunamıyorum': ['gorsel-icerik-sistemi', 'marka-konumlandirma', 'etsy'],
  'Operasyon / süreç yönetimi çok dağınık': ['otomasyon-n8n', 'yapay-zeka-entegrasyonu', 'b2b-dijital-showroom'],
  'Global pazara açılmak istiyorum': ['global-pazara-giris-stratejisi', 'amazon', 'ebay'],
};

// Hedef bazlı öncelik sıralaması — üçüncü sinyal katmanı.
const goalTagMap: Record<string, [ServiceTag, ServiceTag, ServiceTag]> = {
  'Satışları artırmak': ['marka-konumlandirma', 'gorsel-icerik-sistemi', 'reklam-optimizasyon'],
  'Yeni pazarlara açılmak': ['global-pazara-giris-stratejisi', 'amazon', 'ebay'],
  'Marka bilinirliğini güçlendirmek': ['marka-konumlandirma', 'sosyal-medya-yonetimi', 'gorsel-icerik-sistemi'],
  'Operasyonu düzenlemek': ['otomasyon-n8n', 'yapay-zeka-entegrasyonu', 'b2b-dijital-showroom'],
  'Yapay zeka / otomasyon entegre etmek': ['yapay-zeka-entegrasyonu', 'otomasyon-n8n', 'reklam-optimizasyon'],
  'B2B satış sürecini dijitalleştirmek': ['b2b-dijital-showroom', 'shopify', 'otomasyon-n8n'],
};

const channelsOf = (answers: Answers) => (Array.isArray(answers.channels) ? answers.channels : []);

// Bilerek basit ağırlıklı puanlama — cevaplara göre en fazla 3 kişisel sistemi öne çıkarır.
// Ağırlıklar: kanal (çoklu seçimde toplanır) > problem > hedef > işletme tipi / altyapı.
export function getRecommendations(answers: Answers): { tag: ServiceTag; score: number }[] {
  const tagScores: Partial<Record<ServiceTag, number>> = {};
  const add = (tag: ServiceTag, amount: number) => {
    tagScores[tag] = (tagScores[tag] ?? 0) + amount;
  };

  channelsOf(answers).forEach((channel) => {
    const mapping = channelTagMap[channel];
    if (!mapping) return;
    add(mapping.primary, 5);
    mapping.support.forEach((tag) => add(tag, 2));
  });

  const problemTags = typeof answers.problem === 'string' ? problemTagMap[answers.problem] : undefined;
  if (problemTags) {
    add(problemTags[0], 4);
    add(problemTags[1], 3);
    add(problemTags[2], 2);
  }

  const goalTags = typeof answers.goal === 'string' ? goalTagMap[answers.goal] : undefined;
  if (goalTags) {
    add(goalTags[0], 3);
    add(goalTags[1], 2);
    add(goalTags[2], 1);
  }

  switch (answers.businessType) {
    case 'Üretici / Marka Sahibi':
      add('marka-konumlandirma', 1);
      add('gorsel-icerik-sistemi', 1);
      break;
    case 'Toptancı / B2B Firma':
      add('b2b-dijital-showroom', 1);
      break;
    case 'E-Ticaret Markası':
      add('shopify', 1);
      add('reklam-optimizasyon', 1);
      break;
  }
  switch (answers.infraLevel) {
    case 'Hiç Yok / Yeni Kuracağım':
      add('shopify', 1);
      break;
    case 'Var Ama Zayıf':
      add('gorsel-icerik-sistemi', 1);
      break;
    case 'Güçlü Ama Büyümüyor':
      add('reklam-optimizasyon', 1);
      add('yapay-zeka-entegrasyonu', 1);
      break;
  }

  const sorted = (Object.entries(tagScores) as [ServiceTag, number][]).sort((a, b) => b[1] - a[1]);

  // Yeterli sinyal yoksa genel ve güvenli önerilerle tamamla; aynı sistem tekrar etmez, en fazla 3.
  const fallback: ServiceTag[] = ['marka-konumlandirma', 'yapay-zeka-entegrasyonu', 'reklam-optimizasyon'];
  const combined: [ServiceTag, number][] = [...sorted, ...fallback.map((tag) => [tag, 0] as [ServiceTag, number])];
  const unique: { tag: ServiceTag; score: number }[] = [];
  for (const [tag, score] of combined) {
    if (!unique.some((u) => u.tag === tag)) unique.push({ tag, score });
    if (unique.length === 3) break;
  }
  return unique;
}

// Öneri sırasına göre sabit öncelik etiketleri (kesin analiz değil, ön değerlendirme dili).
export const PRIORITY_LABELS = ['Yüksek Öncelik', 'Orta-Yüksek Öncelik', 'Destekleyici Öncelik'] as const;
export const priorityLabel = (index: number) => PRIORITY_LABELS[index] ?? 'Destekleyici Öncelik';

// İÇ (internal) skor — kullanıcıya sayı olarak GÖSTERİLMEZ; yalnızca hazırlık seviyesine
// deterministik eşleme ve n8n'deki iç sıralama için. Kurallar eski "X / 100" skoruyla aynı: taban
// 60, sinyallere göre artar, 55–95 aralığına sınırlanır (pratikte en düşük değer 60'tır).
export function getGrowthScore(answers: Answers): number {
  let score = 60;

  const realChannelCount = channelsOf(answers).filter((c) => c !== 'Henüz Satış Yapmıyorum').length;
  if (realChannelCount >= 1) score += 5;
  if (realChannelCount >= 2) score += 8;

  const sales = typeof answers.salesVolume === 'string' ? answers.salesVolume : '';
  if (['100.000 - 500.000 TL', '500.000 - 1.000.000 TL', '1.000.000 TL üzeri'].includes(sales)) score += 8;
  if (['500.000 - 1.000.000 TL', '1.000.000 TL üzeri'].includes(sales)) score += 12;

  const budget = typeof answers.budget === 'string' ? answers.budget : '';
  if (['25.000 - 75.000 TL', '75.000 - 150.000 TL', '150.000 TL üzeri'].includes(budget)) score += 5;
  if (['75.000 - 150.000 TL', '150.000 TL üzeri'].includes(budget)) score += 8;

  if (answers.infraLevel === 'Var Ama Zayıf') score += 6;

  if (answers.problem === 'Global pazara açılmak istiyorum' || answers.goal === 'Yeni pazarlara açılmak') score += 5;

  if (
    answers.problem === 'Operasyon / süreç yönetimi çok dağınık' ||
    answers.goal === 'Operasyonu düzenlemek' ||
    answers.goal === 'Yapay zeka / otomasyon entegre etmek'
  ) {
    score += 5;
  }

  return Math.min(95, Math.max(55, score));
}

// ---------------------------------------------------------------------------
// Global Büyüme Hazırlık Seviyesi — kullanıcıya gösterilen tek "değerlendirme". İç skordan basit,
// açık eşiklerle türetilir: 55–71 Başlangıç, 72–85 Gelişen, 86–95 Güçlü. (Önerilen 68/82 eşiği
// tüm kombinasyonlarda ~%76 "Güçlü" üretiyordu; 72/86 ile tek kanallı + düşük hacimli profiller
// Başlangıç, iki+ kanal + orta hacim + orta bütçe profilleri Güçlü seviyesine düşüyor.)
// ---------------------------------------------------------------------------
export type ReadinessLevel = 'Başlangıç' | 'Gelişen' | 'Güçlü';
export const READINESS_LEVELS: ReadinessLevel[] = ['Başlangıç', 'Gelişen', 'Güçlü'];

export function getReadinessLevel(score: number): ReadinessLevel {
  if (score >= 86) return 'Güçlü';
  if (score >= 72) return 'Gelişen';
  return 'Başlangıç';
}

// Seviye açıklamaları yalnızca skoru oluşturan girdileri (kanal, hacim, bütçe, altyapı, hedef)
// tarif eder — yeni metrik ya da vaat yok.
export const READINESS_COPY: Record<ReadinessLevel, string> = {
  Başlangıç: 'Kanal, altyapı ve bütçe tarafındaki temel kararlar henüz netleşme aşamasında görünüyor. İlk adım doğru önceliği belirlemek.',
  Gelişen: 'Büyümeye uygun bir temel görünüyor. Kanal, altyapı ve bütçe önceliklerini netleştirmek bir sonraki adımı hızlandırabilir.',
  Güçlü: 'Kanal, satış hacmi ve bütçe sinyalleriniz güçlü görünüyor. Öncelik, mevcut yapıyı ölçeklenebilir sistemlerle desteklemek.',
};

// "En Büyük Fırsat Alanı" metni — önce kanal, sonra problem/hedef, yoksa genel açıklama.
export function getReasonText(answers: Answers): string {
  const channels = channelsOf(answers);
  if (channels.includes('Amazon')) {
    return 'Amazon kanalını belirttiğiniz için ürün görünürlüğü, reklam verimliliği ve operasyon takibi öncelikli görünüyor.';
  }
  if (channels.includes('Etsy')) {
    return 'Etsy kanalını belirttiğiniz için marka dili, görsel sunum, SEO ve ürün algısı öncelikli görünüyor.';
  }
  if (channels.includes('Shopify / Kendi Web Sitem')) {
    return 'Shopify veya kendi web sitenizi belirttiğiniz için dönüşüm akışı, ürün yapısı ve müşteri deneyimi öncelikli görünüyor.';
  }
  if (channels.includes('B2B / Toptan')) {
    return 'B2B satış yapınızı belirttiğiniz için ürün sunumu, teklif süreci ve müşteri yönetimi öncelikli görünüyor.';
  }
  if (answers.problem === 'Operasyon / süreç yönetimi çok dağınık' || answers.goal === 'Operasyonu düzenlemek') {
    return 'Operasyon tarafında dağınıklık belirttiğiniz için otomasyon, yapay zeka ve takip sistemleri öncelikli hale geliyor.';
  }
  if (answers.problem === 'Reklam harcıyorum ama sonuç alamıyorum' || answers.problem === 'Yeterli trafik alamıyorum') {
    return 'Reklam veya dönüşüm problemi belirttiğiniz için performans pazarlama, dönüşüm takibi ve içerik sistemi öncelikli görünüyor.';
  }
  return 'Cevaplarınıza göre ilk aşamada kanal seçimi, marka konumu ve büyüme önceliği netleştirilmelidir.';
}
