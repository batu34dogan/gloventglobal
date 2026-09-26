// Ücretsiz Global Büyüme Analizi — 7 soruluk akışın tek kaynağı. Saf veri; hem client akışı
// (components/analysis/AnalysisFlow.tsx, eski AnalysisContent.tsx) hem /api/analysis-lead (server
// doğrulaması) aynı tanımları kullanır. Soru/seçenek metinleri n8n payload'ında aynen gittiği için
// değiştirilmemeli. Sıra: işletme tipi -> kanallar (çoklu) -> problem -> hedef -> altyapı -> hacim -> bütçe.

export type QuestionId = 'businessType' | 'channels' | 'problem' | 'goal' | 'infraLevel' | 'salesVolume' | 'budget';

export type Question = {
  id: QuestionId;
  title: string;
  subtitle?: string;
  multi: boolean;
  options: string[];
};

export const questions: Question[] = [
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

export type Answers = Partial<Record<QuestionId, string | string[]>>;
/** Tüm sorular geçerli şekilde cevaplanmış hali (server doğrulamasından sonra). */
export type CompleteAnswers = { [K in QuestionId]: K extends 'channels' ? string[] : string };

export function isQuestionAnswered(answers: Answers, q: Question): boolean {
  const v = answers[q.id];
  return Array.isArray(v) ? v.length > 0 : Boolean(v);
}

/**
 * Dışarıdan gelen (güvenilmeyen) answers nesnesini doğrular: her soru cevaplanmış olmalı, her değer
 * o sorunun seçeneklerinden biri olmalı, çoklu seçim tekrarsız ve boş olmayan bir dizi olmalı.
 * Geçerliyse yalnızca bilinen anahtarlardan oluşan temiz bir kopya döner, değilse null.
 */
export function parseAnswers(raw: unknown): CompleteAnswers | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const src = raw as Record<string, unknown>;
  const out: Record<string, string | string[]> = {};
  for (const q of questions) {
    const v = src[q.id];
    if (q.multi) {
      if (!Array.isArray(v) || v.length === 0 || v.length > q.options.length) return null;
      if (!v.every((x) => typeof x === 'string' && q.options.includes(x))) return null;
      if (new Set(v).size !== v.length) return null;
      out[q.id] = [...(v as string[])];
    } else {
      if (typeof v !== 'string' || !q.options.includes(v)) return null;
      out[q.id] = v;
    }
  }
  return out as CompleteAnswers;
}
