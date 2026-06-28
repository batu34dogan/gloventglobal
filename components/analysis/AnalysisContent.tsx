'use client';

import { useMemo, useState } from 'react';
import { trackEvent } from '@/lib/analytics';

// ============================================================================
// Soru tanımları — 7 soruluk akış. Sıra: işletme tipi -> mevcut satış kanalları
// (çoklu seçim) -> en büyük problem -> öncelikli hedef -> dijital altyapı durumu
// -> aylık satış hacmi -> aylık büyüme/reklam bütçesi (son adım).
// ============================================================================

type QuestionId = 'businessType' | 'channels' | 'problem' | 'goal' | 'infraLevel' | 'salesVolume' | 'budget';

type Question = {
  id: QuestionId;
  title: string;
  subtitle?: string;
  multi: boolean;
  options: string[];
};

const questions: Question[] = [
  {
    id: 'businessType',
    title: 'İşletme tipiniz nedir?',
    multi: false,
    options: ['Üretici / Marka Sahibi', 'Toptancı / B2B Firma', 'E-Ticaret Markası', 'Henüz Karar Vermedim'],
  },
  {
    id: 'channels',
    title: 'Şu anda nerede satış yapıyorsunuz?',
    multi: true,
    options: ['Amazon', 'Etsy', 'eBay', 'Shopify / Kendi Web Sitem', 'B2B / Toptan', 'Sosyal Medya', 'Henüz Satış Yapmıyorum'],
  },
  {
    id: 'problem',
    title: 'En büyük probleminiz nedir?',
    multi: false,
    options: [
      'Yeterli trafik alamıyorum',
      'Trafik var ama satışa dönüşmüyor',
      'Satış yok / çok düşük',
      'Reklam harcıyorum ama sonuç alamıyorum',
      'Ürünlerimi doğru sunamıyorum',
      'Operasyon / süreç yönetimi çok dağınık',
      'Global pazara açılmak istiyorum',
      'Henüz net değil',
    ],
  },
  {
    id: 'goal',
    title: 'Öncelikli hedefiniz nedir?',
    multi: false,
    options: [
      'Satışları artırmak',
      'Yeni pazarlara açılmak',
      'Marka bilinirliğini güçlendirmek',
      'Operasyonu düzenlemek',
      'Yapay zeka / otomasyon entegre etmek',
      'B2B satış sürecini dijitalleştirmek',
      'Henüz karar vermedim',
    ],
  },
  {
    id: 'infraLevel',
    title: 'Mevcut dijital altyapınız ne durumda?',
    multi: false,
    options: ['Hiç Yok / Yeni Kuracağım', 'Var Ama Zayıf', 'Orta Seviyede', 'Güçlü Ama Büyümüyor'],
  },
  {
    id: 'salesVolume',
    title: 'Aylık satış hacminiz nedir?',
    subtitle: 'Satış hacmi bilgisi, markanızın büyüme aşamasını daha doğru değerlendirebilmemiz için kullanılır.',
    multi: false,
    options: ['Henüz satış yok', '0 - 100.000 TL', '100.000 - 500.000 TL', '500.000 - 1.000.000 TL', '1.000.000 TL üzeri', 'Paylaşmak istemiyorum'],
  },
  {
    id: 'budget',
    title: 'Aylık büyüme / reklam bütçesi aralığınız nedir?',
    subtitle: 'Bütçe bilgisi, size daha doğru bir büyüme yol haritası önerebilmemiz için kullanılır.',
    multi: false,
    options: ['Henüz bütçe belirlemedik', '0 - 25.000 TL', '25.000 - 75.000 TL', '75.000 - 150.000 TL', '150.000 TL üzeri'],
  },
];

type Answers = Partial<Record<QuestionId, string | string[]>>;

// ============================================================================
// Cevap -> önerilen sistem eşleştirmesi. Her hizmet için sitedeki güncel
// konumlandırma diliyle birebir uyumlu başlık/açıklama kullanılıyor.
// ============================================================================

type ServiceTag =
  | 'amazon'
  | 'etsy'
  | 'ebay'
  | 'shopify'
  | 'b2b-dijital-showroom'
  | 'marka-konumlandirma'
  | 'gorsel-icerik-sistemi'
  | 'yapay-zeka-entegrasyonu'
  | 'sosyal-medya-yonetimi'
  | 'reklam-optimizasyon'
  | 'otomasyon-n8n'
  | 'global-pazara-giris-stratejisi';

const serviceInfo: Record<ServiceTag, { title: string; description: string }> = {
  amazon: { title: 'Amazon Global Satış Sistemi', description: 'Kategori, listeleme, reklam ve operasyon süreçlerini birlikte çalışan global satış sistemine dönüştürürüz.' },
  etsy: { title: 'Etsy Marka Sistemi', description: 'Ürün, görsel dil, marka hikayesi ve SEO’yu birlikte çalışan bir Etsy marka sistemine dönüştürürüz.' },
  ebay: { title: 'eBay Global Satış Sistemi', description: 'Ülke stratejisi, fiyatlama, kargo ve operasyonla global satış sistemine dönüştürürüz.' },
  shopify: { title: 'Shopify Commerce Sistemi', description: 'Bağımsız bir dijital ticaret sistemi kurarak markanızı yönetilebilir hale getiririz.' },
  'b2b-dijital-showroom': { title: 'B2B Satış Sistemi', description: 'Dijital showroom, teklif süreci ve müşteri yönetimini birlikte çalışan bir satış sistemine dönüştürürüz.' },
  'marka-konumlandirma': { title: 'Marka ve Konumlandırma Sistemi', description: 'Markanızı doğru müşterinin gözünde doğru konuma yerleştiririz.' },
  'gorsel-icerik-sistemi': { title: 'Görsel ve İçerik Sistemi', description: 'Ürünlerinizi satışa dönüşen bir görsel ve içerik sistemiyle hazırlarız.' },
  'yapay-zeka-entegrasyonu': { title: 'Yapay Zeka ve Karar Sistemleri', description: 'Yapay zekayı satış ve operasyon sistemlerinize entegre ederiz.' },
  'sosyal-medya-yonetimi': { title: 'Sosyal Medya Büyüme Sistemi', description: 'Satış kanallarıyla uyumlu bir sosyal medya iletişim sistemi kurarız.' },
  'reklam-optimizasyon': { title: 'Performans Pazarlama Sistemi', description: 'Reklam bütçenizi veriye dayalı, ölçülebilir bir büyüme sistemine dönüştürürüz.' },
  'otomasyon-n8n': { title: 'Otomasyon ve Entegrasyon Sistemleri', description: 'Tekrarlayan işleri azaltan, operasyonu hızlandıran sistemler kurarız.' },
  'global-pazara-giris-stratejisi': { title: 'Global Büyüme Stratejisi', description: 'Doğru ülke, kanal, fiyat ve operasyon planıyla global pazara giriş sistemi kurarız.' },
};

// Her hizmetin gerçek route slug'ı.
const serviceHref = (tag: ServiceTag) => `/hizmetler/${tag}`;

// Kanal bazlı eşleştirme — her kanal için 1 öncelikli sistem + 2 destek sistemi. Çoklu seçim
// olduğu için her seçilen kanalın puanı toplanıyor (kanal seçimi "ilk güçlü sinyal").
const channelTagMap: Record<string, { primary: ServiceTag; support: [ServiceTag, ServiceTag] }> = {
  Amazon: { primary: 'amazon', support: ['reklam-optimizasyon', 'gorsel-icerik-sistemi'] },
  Etsy: { primary: 'etsy', support: ['gorsel-icerik-sistemi', 'sosyal-medya-yonetimi'] },
  eBay: { primary: 'ebay', support: ['global-pazara-giris-stratejisi', 'reklam-optimizasyon'] },
  'Shopify / Kendi Web Sitem': { primary: 'shopify', support: ['reklam-optimizasyon', 'otomasyon-n8n'] },
  'B2B / Toptan': { primary: 'b2b-dijital-showroom', support: ['shopify', 'otomasyon-n8n'] },
  'Sosyal Medya': { primary: 'sosyal-medya-yonetimi', support: ['marka-konumlandirma', 'gorsel-icerik-sistemi'] },
  'Henüz Satış Yapmıyorum': { primary: 'global-pazara-giris-stratejisi', support: ['marka-konumlandirma', 'gorsel-icerik-sistemi'] },
};

// Problem bazlı öncelik sıralaması (1. > 2. > 3.) — problem seçimi çok netse öneri sırasını
// kanal sinyaliyle birlikte etkiler.
const problemTagMap: Record<string, [ServiceTag, ServiceTag, ServiceTag]> = {
  'Yeterli trafik alamıyorum': ['reklam-optimizasyon', 'sosyal-medya-yonetimi', 'gorsel-icerik-sistemi'],
  'Trafik var ama satışa dönüşmüyor': ['gorsel-icerik-sistemi', 'shopify', 'reklam-optimizasyon'],
  'Satış yok / çok düşük': ['marka-konumlandirma', 'gorsel-icerik-sistemi', 'reklam-optimizasyon'],
  'Reklam harcıyorum ama sonuç alamıyorum': ['reklam-optimizasyon', 'gorsel-icerik-sistemi', 'shopify'],
  'Ürünlerimi doğru sunamıyorum': ['gorsel-icerik-sistemi', 'marka-konumlandirma', 'etsy'],
  'Operasyon / süreç yönetimi çok dağınık': ['otomasyon-n8n', 'yapay-zeka-entegrasyonu', 'b2b-dijital-showroom'],
  'Global pazara açılmak istiyorum': ['global-pazara-giris-stratejisi', 'amazon', 'ebay'],
};

// Hedef bazlı öncelik sıralaması — kanal ve problemden sonra üçüncü sinyal katmanı.
const goalTagMap: Record<string, [ServiceTag, ServiceTag, ServiceTag]> = {
  'Satışları artırmak': ['marka-konumlandirma', 'gorsel-icerik-sistemi', 'reklam-optimizasyon'],
  'Yeni pazarlara açılmak': ['global-pazara-giris-stratejisi', 'amazon', 'ebay'],
  'Marka bilinirliğini güçlendirmek': ['marka-konumlandirma', 'sosyal-medya-yonetimi', 'gorsel-icerik-sistemi'],
  'Operasyonu düzenlemek': ['otomasyon-n8n', 'yapay-zeka-entegrasyonu', 'b2b-dijital-showroom'],
  'Yapay zeka / otomasyon entegre etmek': ['yapay-zeka-entegrasyonu', 'otomasyon-n8n', 'reklam-optimizasyon'],
  'B2B satış sürecini dijitalleştirmek': ['b2b-dijital-showroom', 'shopify', 'otomasyon-n8n'],
};

// Bilerek basit bir ağırlıklı puanlama sistemi — karmaşık bir öneri motoru değil, sadece
// cevaplara göre en fazla 3 anlamlı ve KİŞİSEL sistemi öne çıkaran hafif bir mantık. Backend / AI
// yok. Ağırlıklar: kanal (ilk güçlü sinyal, çoklu seçimde toplanır) > problem > hedef > diğer.
function getRecommendations(answers: Answers): { tag: ServiceTag; score: number }[] {
  const tagScores: Partial<Record<ServiceTag, number>> = {};
  const addScore = (tag: ServiceTag, amount: number) => {
    tagScores[tag] = (tagScores[tag] ?? 0) + amount;
  };

  // 1) Kanal sinyali — en güçlü katman. Çoklu seçimde her kanal kendi puanını ekler.
  const selectedChannels = (Array.isArray(answers.channels) ? answers.channels : []) as string[];
  selectedChannels.forEach((channel) => {
    const mapping = channelTagMap[channel];
    if (!mapping) return;
    addScore(mapping.primary, 5);
    mapping.support.forEach((tag) => addScore(tag, 2));
  });

  // 2) Problem sinyali — ikinci katman, sıralı ağırlık (1. > 2. > 3.).
  const problemTags = answers.problem ? problemTagMap[answers.problem as string] : undefined;
  if (problemTags) {
    addScore(problemTags[0], 4);
    addScore(problemTags[1], 3);
    addScore(problemTags[2], 2);
  }

  // 3) Hedef sinyali — üçüncü katman, daha hafif ağırlık.
  const goalTags = answers.goal ? goalTagMap[answers.goal as string] : undefined;
  if (goalTags) {
    addScore(goalTags[0], 3);
    addScore(goalTags[1], 2);
    addScore(goalTags[2], 1);
  }

  // 4) İşletme tipi ve altyapı durumu — küçük tamamlayıcı sinyaller.
  switch (answers.businessType) {
    case 'Üretici / Marka Sahibi':
      addScore('marka-konumlandirma', 1);
      addScore('gorsel-icerik-sistemi', 1);
      break;
    case 'Toptancı / B2B Firma':
      addScore('b2b-dijital-showroom', 1);
      break;
    case 'E-Ticaret Markası':
      addScore('shopify', 1);
      addScore('reklam-optimizasyon', 1);
      break;
  }
  switch (answers.infraLevel) {
    case 'Hiç Yok / Yeni Kuracağım':
      addScore('shopify', 1);
      break;
    case 'Var Ama Zayıf':
      addScore('gorsel-icerik-sistemi', 1);
      break;
    case 'Güçlü Ama Büyümüyor':
      addScore('reklam-optimizasyon', 1);
      addScore('yapay-zeka-entegrasyonu', 1);
      break;
  }

  const sorted = (Object.entries(tagScores) as [ServiceTag, number][]).sort((a, b) => b[1] - a[1]);

  // Yeterli sinyal yoksa (örn. "Henüz Satış Yapmıyorum" + "Henüz net değil" + "Henüz karar
  // vermedim") genel ve güvenli önerilerle tamamla — boş sonuç ekranı göstermemek için. Aynı
  // sistem asla tekrar etmez (unique kontrolü), en fazla 3 sistem gösterilir.
  const fallback: ServiceTag[] = ['marka-konumlandirma', 'yapay-zeka-entegrasyonu', 'reklam-optimizasyon'];
  const combined: [ServiceTag, number][] = [...sorted, ...fallback.map((tag) => [tag, 0] as [ServiceTag, number])];
  const unique: { tag: ServiceTag; score: number }[] = [];
  for (const [tag, score] of combined) {
    if (!unique.some((u) => u.tag === tag)) unique.push({ tag, score });
    if (unique.length === 3) break;
  }
  return unique;
}

// Sonuç kartlarındaki "Tahmini Öncelik" yüzdesi — kesin analiz sonucu gibi değil, ön
// değerlendirme gibi hissettirecek sabit sıralama bazlı değerler (en güçlü öneri en yüksekte).
const PRIORITY_LABELS = ['Yüksek Öncelik', 'Orta-Yüksek Öncelik', 'Destekleyici Öncelik'];

// "Tahmini Büyüme Potansiyeli" skoru (0-100, gösterimde X/100). Basit, toplamalı frontend
// mantığı — backend / AI entegrasyonu yok. Taban 60, sinyallere göre artar, 55-95 arasında
// sınırlanır (kesin sonuç gibi görünmemesi için üst sınır 95'te tutuluyor).
function getGrowthPotentialScore(answers: Answers): number {
  let score = 60;

  const selectedChannels = (Array.isArray(answers.channels) ? answers.channels : []) as string[];
  const realChannelCount = selectedChannels.filter((c) => c !== 'Henüz Satış Yapmıyorum').length;
  if (realChannelCount >= 1) score += 5;
  if (realChannelCount >= 2) score += 8;

  const salesVolume = answers.salesVolume as string | undefined;
  const salesAbove100k = ['100.000 - 500.000 TL', '500.000 - 1.000.000 TL', '1.000.000 TL üzeri'].includes(salesVolume ?? '');
  const salesAbove500k = ['500.000 - 1.000.000 TL', '1.000.000 TL üzeri'].includes(salesVolume ?? '');
  if (salesAbove100k) score += 8;
  if (salesAbove500k) score += 12;

  const budget = answers.budget as string | undefined;
  const budgetAbove25k = ['25.000 - 75.000 TL', '75.000 - 150.000 TL', '150.000 TL üzeri'].includes(budget ?? '');
  const budgetAbove75k = ['75.000 - 150.000 TL', '150.000 TL üzeri'].includes(budget ?? '');
  if (budgetAbove25k) score += 5;
  if (budgetAbove75k) score += 8;

  if (answers.infraLevel === 'Var Ama Zayıf') score += 6;

  const wantsGlobal = answers.problem === 'Global pazara açılmak istiyorum' || answers.goal === 'Yeni pazarlara açılmak';
  if (wantsGlobal) score += 5;

  const wantsOps =
    answers.problem === 'Operasyon / süreç yönetimi çok dağınık' ||
    answers.goal === 'Operasyonu düzenlemek' ||
    answers.goal === 'Yapay zeka / otomasyon entegre etmek';
  if (wantsOps) score += 5;

  return Math.min(95, Math.max(55, score));
}

// Sonuç ekranındaki "Markanızın En Büyük Fırsat Alanı" özetini cevaplara göre üretir. Kanal
// seçimi ilk güçlü sinyal olduğu için önce kanal bazlı eşleşmeler kontrol edilir, sonra problem
// bazlı, hiçbiri yoksa genel (net sinyal yok) açıklamaya düşülür.
function getReasonText(answers: Answers): string {
  const channels = (Array.isArray(answers.channels) ? answers.channels : []) as string[];
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


type Stage = 'quiz' | 'results' | 'success';

export default function AnalysisContent({ onRequestClose }: { onRequestClose?: () => void }) {
  const [stage, setStage] = useState<Stage>('quiz');
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [formValues, setFormValues] = useState({
    fullName: '',
    company: '',
    phone: '',
    email: '',
    website: '',
    notes: '',
  });
  // Pazarlama iletişimi izni — opsiyonel, varsayılan işaretsiz, form gönderimini engellemiyor.
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const currentQuestion = questions[stepIndex];
  const isLastQuestion = stepIndex === questions.length - 1;

  const recommendations = useMemo(() => getRecommendations(answers), [answers]);
  const reasonText = useMemo(() => getReasonText(answers), [answers]);
  const growthScore = useMemo(() => getGrowthPotentialScore(answers), [answers]);

  const updateField = (field: keyof typeof formValues) => (value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectSingle = (questionId: QuestionId, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleToggleMulti = (questionId: QuestionId, option: string) => {
    setAnswers((prev) => {
      const current = (prev[questionId] as string[]) ?? [];
      const next = current.includes(option) ? current.filter((o) => o !== option) : [...current, option];
      return { ...prev, [questionId]: next };
    });
  };

  const isOptionSelected = (questionId: QuestionId, option: string) => {
    const value = answers[questionId];
    if (Array.isArray(value)) return value.includes(option);
    return value === option;
  };

  const isCurrentAnswered = () => {
    const value = answers[currentQuestion.id];
    if (Array.isArray(value)) return value.length > 0;
    return Boolean(value);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setStage('results');
      return;
    }
    setStepIndex((i) => Math.min(i + 1, questions.length - 1));
  };

  const handleBack = () => {
    if (stepIndex === 0) return;
    setStepIndex((i) => Math.max(i - 1, 0));
  };

  const resetAll = () => {
    setStage('quiz');
    setStepIndex(0);
    setAnswers({});
    setFormValues({ fullName: '', company: '', phone: '', email: '', website: '', notes: '' });
    setMarketingConsent(false);
    setFormError(null);
  };

  const handleClose = () => {
    onRequestClose?.();
    // Widget tekrar açıldığında analiz baştan başlasın (ilk faz için bu davranış yeterli).
    resetAll();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValues.fullName.trim()) {
      setFormError('Lütfen ad soyad alanını doldurun.');
      return;
    }
    if (!formValues.company.trim()) {
      setFormError('Lütfen firma adı alanını doldurun.');
      return;
    }
    if (!formValues.phone.trim() && !formValues.email.trim()) {
      setFormError('Lütfen telefon veya e-posta alanlarından en az birini doldurun.');
      return;
    }
    setFormError(null);
    setSubmitError(null);
    setIsSubmitting(true);

    const payload = {
      contact: formValues,
      marketingConsent,
      answers,
      growthScore,
      recommendations: recommendations.map(({ tag }, index) => ({
        tag,
        title: serviceInfo[tag].title,
        priority: PRIORITY_LABELS[index] ?? 'Destekleyici Öncelik',
      })),
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
      createdAt: new Date().toISOString(),
      leadSource: 'analysis-widget',
    };

    try {
      const res = await fetch('/api/analysis-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        trackEvent('analysis_form_submit_success', { growthScore });
        setStage('success');
      } else {
        setSubmitError('Analiz talebiniz gönderilemedi. Lütfen daha sonra tekrar deneyin veya iletişim sayfasından bize ulaşın.');
      }
    } catch {
      setSubmitError('Analiz talebiniz gönderilemedi. Lütfen daha sonra tekrar deneyin veya iletişim sayfasından bize ulaşın.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldLabelClass = 'mb-1.5 block text-xs font-medium uppercase tracking-[0.1em] text-blue-100/70';
  const fieldInputClass =
    'w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-blue-100/30 outline-none transition-colors duration-200 focus:border-blue-400/55 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.15)]';

  return (
    <div className="text-white">
      {stage === 'quiz' && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300/80">
            Adım {stepIndex + 1} / {questions.length}
          </p>
          {/* İnce ilerleme çubuğu — adım göstergesini görsel olarak da güçlendiriyor. */}
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-blue-400/70 transition-all duration-500"
              style={{ width: `${((stepIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          <h3 className="mt-5 text-xl font-semibold text-white sm:text-2xl">{currentQuestion.title}</h3>
          {currentQuestion.subtitle && (
            <p className="mt-1.5 text-xs leading-relaxed text-blue-100/55">{currentQuestion.subtitle}</p>
          )}
          {currentQuestion.multi && (
            <p className="mt-1.5 text-xs text-blue-100/55">Birden fazla seçenek işaretleyebilirsiniz.</p>
          )}

          <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {currentQuestion.options.map((option) => {
              const selected = isOptionSelected(currentQuestion.id, option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() =>
                    currentQuestion.multi
                      ? handleToggleMulti(currentQuestion.id, option)
                      : handleSelectSingle(currentQuestion.id, option)
                  }
                  className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
                    selected
                      ? 'border-blue-400/60 bg-blue-500/15 text-white shadow-[0_0_24px_-8px_rgba(59,130,246,0.6)]'
                      : 'border-white/10 bg-white/[0.03] text-blue-100/80 hover:border-white/25 hover:bg-white/[0.06]'
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          <div className="mt-7 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleBack}
              disabled={stepIndex === 0}
              className="rounded-full border border-white/15 px-6 py-2.5 text-sm font-semibold text-white/75 transition-all duration-200 hover:border-white/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              Geri
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={!isCurrentAnswered()}
              className="rounded-full border border-blue-400/45 bg-blue-500/10 px-7 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:border-blue-400/75 hover:bg-blue-500/20 disabled:cursor-not-allowed disabled:opacity-30"
            >
              {isLastQuestion ? 'Ön Analizi Gör' : 'İleri'}
            </button>
          </div>
        </div>
      )}

      {stage === 'results' && (
        <div>
          {/* "İlk Değerlendirme Tamamlandı" + Büyüme Potansiyeli skoru — formdan önce, sonuç
              kartlarından önce gösterilen güçlü ön değerlendirme bloğu. */}
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300/80">İlk Değerlendirme Tamamlandı</p>
          <p className="mt-3 text-sm leading-relaxed text-blue-100/70 sm:text-base">
            Cevaplarınıza göre markanızın mevcut dijital büyüme öncelikleri ve potansiyel gelişim alanları
            aşağıdaki gibi görünüyor.
          </p>

          <div className="mt-4 flex items-center gap-4 rounded-xl border border-blue-400/25 bg-blue-500/[0.06] px-5 py-4">
            <div className="flex-shrink-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-blue-300/75">Tahmini Büyüme Potansiyeli</p>
              <p className="mt-0.5 text-3xl font-bold text-white">
                {growthScore}
                <span className="text-base font-medium text-blue-200/60"> / 100</span>
              </p>
            </div>
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-blue-100/45">
            Bu skor; mevcut satış kanallarınız, hedefleriniz, dijital altyapınız, satış hacminiz ve büyüme
            bütçenize göre oluşturulan ön değerlendirmedir.
          </p>

          <div className="mt-4 rounded-lg border border-blue-400/20 bg-blue-500/[0.05] px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-300/80">
              Markanızın En Büyük Fırsat Alanı
            </p>
            <p className="mt-1.5 text-xs text-blue-100/70">Cevaplarınıza göre ilk odaklanmanız gereken alanlar şunlar olabilir:</p>
            <ul className="mt-1.5 space-y-1">
              {recommendations.map(({ tag }) => (
                <li key={tag} className="flex items-start gap-1.5 text-xs leading-relaxed text-blue-100/85 sm:text-sm">
                  <span className="text-blue-400">✓</span>
                  {serviceInfo[tag].title}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-3 rounded-lg border border-blue-400/20 bg-blue-500/[0.05] px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-300/80">
              Neden Bu Sistemler Önerildi?
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-blue-100/75 sm:text-sm">{reasonText}</p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {recommendations.map(({ tag }, index) => (
              <a
                key={tag}
                href={serviceHref(tag)}
                className="group relative rounded-xl border border-white/[0.08] bg-white/[0.035] p-4 pt-9 transition-all duration-300 hover:border-blue-400/40 hover:bg-white/[0.06]"
              >
                <span className="absolute right-3 top-3 rounded-full border border-blue-400/35 bg-blue-500/10 px-2.5 py-1 text-[10px] font-semibold text-blue-200/90">
                  {PRIORITY_LABELS[index] ?? 'Destekleyici Öncelik'}
                </span>
                <h4 className="text-sm font-semibold text-white group-hover:text-blue-200">{serviceInfo[tag].title}</h4>
                <p className="mt-1.5 text-xs leading-relaxed text-blue-100/65">{serviceInfo[tag].description}</p>
                <span className="mt-2 inline-block text-[11px] font-semibold uppercase tracking-[0.05em] text-blue-300/80">
                  Detayları Gör →
                </span>
              </a>
            ))}
          </div>

          <p className="mt-3 text-[11px] leading-relaxed text-blue-100/45">
            Bu öncelik seviyeleri, verdiğiniz cevaplara göre oluşturulan ön değerlendirmedir; kesin bir analiz
            sonucu değildir.
          </p>

          {/* 5. madde: Ücretsiz Detaylı Analizde Ne Alacaksınız? — formdan önce değer kutusu. */}
          <div className="mt-8 rounded-lg border border-blue-400/20 bg-blue-500/[0.05] px-4 py-3.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-300/80">
              Ücretsiz Detaylı Analizde Ne Alacaksınız?
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-blue-100/70 sm:text-sm">
              Bilgilerinizi bıraktığınızda markanızın mevcut yapısını daha detaylı inceleyerek size uygulanabilir
              bir büyüme yönü sunabiliriz.
            </p>
            <ul className="mt-2 grid gap-1 sm:grid-cols-2">
              {['Rakip ve pazar görünümü', 'Kanal önceliklendirme', 'İlk 90 gün yol haritası', 'Büyüme fırsatları', 'Sistem önerileri'].map((item) => (
                <li key={item} className="flex items-start gap-1.5 text-xs leading-relaxed text-blue-100/80">
                  <span className="text-blue-400">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 border-t border-white/[0.08] pt-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300/80">
              Detaylı Analiz İçin Bilgilerinizi Bırakın
            </p>
            <p className="mt-2 text-xs leading-relaxed text-blue-100/65 sm:text-sm">
              Ön değerlendirme sonucunuza göre markanızı daha detaylı inceleyip size uygulanabilir bir büyüme yol
              haritası sunabiliriz.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className={fieldLabelClass}>Ad Soyad</span>
                <input
                  value={formValues.fullName}
                  onChange={(e) => updateField('fullName')(e.target.value)}
                  className={fieldInputClass}
                />
              </label>
              <label className="block">
                <span className={fieldLabelClass}>Firma Adı</span>
                <input
                  value={formValues.company}
                  onChange={(e) => updateField('company')(e.target.value)}
                  className={fieldInputClass}
                />
              </label>
              <label className="block">
                <span className={fieldLabelClass}>Telefon</span>
                <input
                  type="tel"
                  value={formValues.phone}
                  onChange={(e) => updateField('phone')(e.target.value)}
                  className={fieldInputClass}
                />
              </label>
              <label className="block">
                <span className={fieldLabelClass}>E-posta</span>
                <input
                  type="email"
                  value={formValues.email}
                  onChange={(e) => updateField('email')(e.target.value)}
                  className={fieldInputClass}
                />
              </label>
              <label className="block sm:col-span-2">
                <span className={fieldLabelClass}>Web Sitesi / Mağaza Linki</span>
                <input
                  value={formValues.website}
                  onChange={(e) => updateField('website')(e.target.value)}
                  className={fieldInputClass}
                />
              </label>
              <label className="block sm:col-span-2">
                <span className={fieldLabelClass}>Notunuz</span>
                <textarea
                  value={formValues.notes}
                  onChange={(e) => updateField('notes')(e.target.value)}
                  rows={3}
                  className={`${fieldInputClass} resize-none`}
                />
              </label>

              {formError && <p className="text-xs font-medium text-red-300/90 sm:col-span-2">{formError}</p>}
              {submitError && <p className="text-xs font-medium text-red-300/90 sm:col-span-2">{submitError}</p>}

              <label className="flex items-start gap-2.5 sm:col-span-2">
                <input
                  type="checkbox"
                  checked={marketingConsent}
                  onChange={(e) => setMarketingConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-white/20 bg-white/[0.03] text-blue-500 accent-blue-500"
                />
                <span className="text-xs leading-relaxed text-blue-100/65">
                  GloventGlobal tarafından hizmetler, kampanyalar, dijital büyüme içerikleri ve
                  bilgilendirmeler hakkında e-posta, telefon ve WhatsApp üzerinden benimle iletişime
                  geçilmesini kabul ediyorum.
                </span>
              </label>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full border border-blue-400/45 bg-blue-500/10 px-8 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:border-blue-400/75 hover:bg-blue-500/20 hover:shadow-[0_0_36px_-6px_rgba(59,130,246,0.6)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {isSubmitting ? 'Gönderiliyor...' : 'Analiz Talebimi Gönder'}
                </button>
                <p className="mt-3 text-[10px] leading-relaxed text-blue-100/40 sm:col-span-2">
                  Formu göndererek bilgilerinizin talebinizin değerlendirilmesi ve sizinle iletişime geçilmesi
                  amacıyla işlenmesini kabul etmiş olursunuz. Detaylı bilgi için{' '}
                  <a href="/kvkk" className="underline hover:text-blue-200">
                    KVKK Aydınlatma Metni
                  </a>
                  &apos;ni inceleyebilirsiniz.
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

      {stage === 'success' && (
        <div className="py-2 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-blue-400/45 bg-blue-500/10 text-blue-300">
            <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
              <path d="M4 10.5L8 14.5L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <h3 className="mt-4 text-xl font-semibold text-white">Analiz talebiniz alındı.</h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-blue-100/70">
            Cevaplarınıza göre markanız için ön değerlendirme oluşturuldu. Ekibimiz 24-48 saat içinde detaylı analiz
            için sizinle iletişime geçecektir.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-full border border-white/15 px-8 py-2.5 text-sm font-semibold text-white/85 transition-all duration-200 hover:border-white/35 hover:text-white"
            >
              Kapat
            </button>
            <a
              href="/hizmetler"
              className="rounded-full border border-blue-400/45 bg-blue-500/10 px-8 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:border-blue-400/75 hover:bg-blue-500/20"
            >
              Hizmetleri İncele
            </a>
          </div>
        </div>
      )}
    </div>
  );
}