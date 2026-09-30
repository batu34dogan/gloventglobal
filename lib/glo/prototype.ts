// Glo etkileşim prototipi (Aşama A) — konuşma mantığı. YAPAY ZEKÂ YOK: sabit soru sırası + dar kapsamlı
// kural tabanlı serbest metin eşleştirmesi. Amaç konuşma ritmini ve form geçişini denemek; gerçek dil
// anlama taklit edilmez. Emin olunmayan her durumda hiçbir şey kaydedilmez ya da kullanıcıya seçtirilir.
//
// Kurallar:
// - Cevap değerleri yalnızca lib/analysis/questions seçenekleridir (n8n/sunucu doğrulamasıyla aynı).
// - "Nereden başlıyoruz?", ürün/hizmet ve hedef kanal/pazar yalnızca bağlamdır; analiz alanına eşlenmez.
// - Hedef kanal hiçbir zaman mevcut satış kanalı olarak kaydedilmez; olumsuz ifadelerden çıkarım yapılmaz.
// - Tek türetme: kanal "Henüz Satış Yapmıyorum" ise satış hacmi "Henüz satış yok" işaretlenir ve kanal
//   değişince silinir (inferredVolume). Başka alan kendiliğinden doldurulmaz.
import { questions, type Answers, type Question, type QuestionId } from '@/lib/analysis/questions';
import { ANALYSIS_LIMITS } from '@/lib/analysis/lead';
import type { GloAiResult, GloTurnRequest } from './ai/schema';
import {
  NO_SALES_CHANNEL,
  NO_SALES_VOLUME,
  OTHER_CHANNEL,
  OTHER_CHANNEL_LIMIT,
  OTHER_CHANNEL_NOTE,
  otherCurrentNames,
  upsertNoteLine,
  withProductNote,
  type GloField,
  type GloMessage,
  type GloStart,
  type GloState,
} from './state';

export const MESSAGE_LIMIT = 600;
export const NOTES_LIMIT = ANALYSIS_LIMITS.notes;

type SingleId = Exclude<QuestionId, 'channels'>;
const Q = Object.fromEntries(questions.map((q) => [q.id, q])) as Record<QuestionId, Question>;

export const FIELD_LABEL: Record<GloField, string> = {
  start: 'Başlangıç noktası',
  product: 'Ürün / hizmet',
  target: 'Hedef kanal / pazar',
  businessType: 'İşletme tipi',
  channels: 'Mevcut satış kanalları',
  problem: 'En büyük zorluk',
  goal: 'Öncelikli hedef',
  infraLevel: 'Dijital altyapı',
  salesVolume: 'Aylık satış hacmi',
  budget: 'Aylık büyüme / reklam bütçesi',
};

export const START_OPTIONS: { label: string; value: GloStart }[] = [
  { label: 'Satış yapıyorum', value: 'selling' },
  { label: 'Yeni başlayacağım', value: 'new' },
  { label: 'Markam için destek arıyorum', value: 'brand' },
];
const START_LABEL = Object.fromEntries(START_OPTIONS.map((o) => [o.value, o.label])) as Record<GloStart, string>;

const TARGET_OPTIONS = ['Amazon', 'Etsy', 'eBay', 'Kendi web sitem', 'B2B / Toptan', 'Henüz net değil'];
const SKIP = '__skip__';
const NO = '__no__';
const CLARIFY_CURRENT = '__current__';
const CLARIFY_TARGET = '__target__';
const CLARIFY_UNSURE = '__unsure__';
const CHANNEL_LOCATIVE: Record<string, string> = {
  Amazon: 'Amazon’da',
  Etsy: 'Etsy’de',
  eBay: 'eBay’de',
  'Shopify / Kendi Web Sitem': 'Kendi web sitenizde',
  'B2B / Toptan': 'B2B / toptan kanalda',
  'Sosyal Medya': 'Sosyal medyada',
};
const CH_NEW_NONE = 'Evet, henüz satış yok';
const CH_NEW_SOME = 'Bazı kanallarda satışım var';
const REST: SingleId[] = ['businessType', 'problem', 'infraLevel', 'salesVolume', 'budget'];

// ---------------------------------------------------------------------------
// Adım seçimi
// ---------------------------------------------------------------------------
export type StepKey = GloField | 'intro' | 'otherChannel' | 'suggestion' | 'summary';

/** AI açıkken açılış sorusu (tek mesajda birden fazla bilgi verilebilir). */
export const AI_OPENING = 'Ne satıyorsunuz, şu an nerede satış yapıyorsunuz ve neyi geliştirmek istiyorsunuz? Kısaca anlatın, birlikte bakalım.';

const arr = (v: Answers[QuestionId]) => (Array.isArray(v) ? v : []);
export const hasAnswer = (a: Answers, id: QuestionId) => {
  const v = a[id];
  return Array.isArray(v) ? v.length > 0 : Boolean(v);
};
const targetKnown = (g: GloState) => g.targetChannels.length > 0 || g.targetMarkets.length > 0 || Boolean(g.targetText) || g.targetSkipped;
const needsTarget = (a: Answers, g: GloState) => a.goal === 'Yeni pazarlara açılmak' || g.start === 'new';

function isFilled(field: GloField, a: Answers, g: GloState) {
  if (field === 'start') return Boolean(g.start);
  if (field === 'product') return g.product !== undefined || g.productSkipped;
  if (field === 'target') return targetKnown(g);
  return hasAnswer(a, field);
}

export function nextStep(a: Answers, g: GloState): StepKey {
  if (g.suggestions.length > 0) return 'suggestion';
  if (g.editing) return g.editing;
  if (g.intro) return 'intro';
  if (!g.start && !hasAnswer(a, 'channels')) return 'start';
  if (g.product === undefined && !g.productSkipped) return 'product';
  if (!hasAnswer(a, 'channels')) return 'channels';
  // "Diğer" seçildiyse (ve AI adını almadıysa) kısa kanal adı bir kez sorulur.
  if (arr(a.channels).includes(OTHER_CHANNEL) && !otherCurrentNames(g) && !g.otherChannelSkipped) return 'otherChannel';
  if (!hasAnswer(a, 'goal')) return 'goal';
  if (needsTarget(a, g) && !targetKnown(g)) return 'target';
  for (const id of REST) if (!hasAnswer(a, id)) return id;
  return 'summary';
}

// ---------------------------------------------------------------------------
// Soru metinleri
// ---------------------------------------------------------------------------
export type PromptOption = { label: string; value: string; exclusive?: boolean };
export type Prompt = {
  step: StepKey;
  kind: 'single' | 'multi' | 'summary';
  text: string;
  hint?: string;
  options: PromptOption[];
  /** Serbest metin bu adımda kabul ediliyor mu (özette kapalı). */
  text_input: boolean;
};

const opts = (values: string[]): PromptOption[] => values.map((v) => ({ label: v, value: v }));

export function promptFor(a: Answers, g: GloState): Prompt {
  const step = nextStep(a, g);
  const base = { step, text_input: true };
  switch (step) {
    case 'suggestion': {
      const s = g.suggestions[0];
      if (s.kind === 'clarify') {
        return {
          ...base,
          kind: 'single',
          text: `${CHANNEL_LOCATIVE[s.options[0]] ?? s.options[0]} şu anda satış yapıyor musunuz, yoksa başlamayı mı düşünüyorsunuz?`,
          options: [
            { label: 'Şu anda satıyorum', value: CLARIFY_CURRENT },
            { label: 'Başlamayı düşünüyorum', value: CLARIFY_TARGET },
            { label: 'Henüz net değil', value: CLARIFY_UNSURE },
          ],
        };
      }
      if (s.field === 'channels') {
        return {
          ...base,
          kind: 'single',
          text: 'Şu an hiçbir kanalda satış yapmadığınızı not edeyim mi?',
          options: [
            { label: 'Evet, henüz satış yok', value: NO_SALES_CHANNEL },
            { label: 'Hayır', value: NO },
          ],
        };
      }
      // AI'nın doğrulanmış doğal sorusu varsa o; birden çok seçenekte "hangisi", tek seçenekte onay şablonu.
      return {
        ...base,
        kind: 'single',
        text: s.question ?? (s.options.length > 1 ? `${FIELD_LABEL[s.field]} için hangisi daha yakın?` : `${FIELD_LABEL[s.field]} için bunu mu kastettiniz?`),
        options: [...opts(s.options), { label: s.options.length > 1 ? 'Başka bir durum' : 'Hayır, tüm seçenekleri göster', value: NO }],
      };
    }
    case 'intro':
      return { ...base, kind: 'single', text: AI_OPENING, options: START_OPTIONS.map((o) => ({ label: o.label, value: o.value })) };
    case 'start':
      return { ...base, kind: 'single', text: 'Nereden başlıyoruz?', options: START_OPTIONS.map((o) => ({ label: o.label, value: o.value })) };
    case 'product':
      return {
        ...base,
        kind: 'single',
        text: 'Ne satıyorsunuz ya da satmayı planlıyorsunuz?',
        hint: 'Birkaç kelimeyle yazmanız yeterli; örneğin “el yapımı seramik” ya da “endüstriyel ambalaj”.',
        options: [{ label: 'Şimdilik geçelim', value: SKIP }],
      };
    case 'target':
      return {
        ...base,
        kind: 'single',
        text: 'Hangi kanalı ya da pazarı hedefliyorsunuz?',
        hint: 'Seçebilir ya da ülke/pazar yazabilirsiniz. Bunu mevcut satış kanalı olarak kaydetmem.',
        options: opts(TARGET_OPTIONS),
      };
    case 'channels':
      if (g.start === 'new' && !g.channelsExpanded) {
        return {
          ...base,
          kind: 'single',
          text: 'Yeni başlayacağınızı söylediniz. Şu an hiçbir kanalda satış yapmadığınızı not edeyim mi?',
          options: opts([CH_NEW_NONE, CH_NEW_SOME]),
        };
      }
      return {
        ...base,
        kind: 'multi',
        text: 'Şu anda hangi kanallarda satış yapıyorsunuz?',
        hint: 'Birden fazla seçebilirsiniz. Yalnızca bugün satış yaptığınız kanalları işaretleyin; listede yoksa “Diğer”i seçin.',
        options: Q.channels.options.map((o) => ({ label: o, value: o, exclusive: o === NO_SALES_CHANNEL })),
      };
    case 'otherChannel':
      return {
        ...base,
        kind: 'single',
        text: 'Listede olmayan hangi kanalda satış yapıyorsunuz?',
        hint: 'Kısa bir ad yeterli; örneğin Trendyol ya da Hepsiburada.',
        options: [{ label: 'Şimdilik geçelim', value: SKIP }],
      };
    case 'goal':
      return { ...base, kind: 'single', text: 'Önümüzdeki dönemde önceliğiniz ne?', options: opts(Q.goal.options) };
    case 'businessType':
      return { ...base, kind: 'single', text: 'Sizi en iyi hangisi tanımlıyor?', options: opts(Q.businessType.options) };
    case 'problem':
      return { ...base, kind: 'single', text: 'Şu an sizi en çok zorlayan konu hangisi?', options: opts(Q.problem.options) };
    case 'infraLevel':
      return {
        ...base,
        kind: 'single',
        text: 'Dijital altyapınızı (site, mağaza, içerik, süreçler) nasıl değerlendirirsiniz?',
        options: opts(Q.infraLevel.options),
      };
    case 'salesVolume':
      return { ...base, kind: 'single', text: 'Aylık satış hacminiz hangi aralıkta?', hint: Q.salesVolume.subtitle, options: opts(Q.salesVolume.options) };
    case 'budget':
      return {
        ...base,
        kind: 'single',
        text: 'Büyüme ve reklam için aylık bütçe aralığınız nedir?',
        hint: Q.budget.subtitle,
        options: opts(Q.budget.options),
      };
    case 'summary':
      return {
        step,
        kind: 'summary',
        text: 'Sizi doğru anladıysam durum aşağıdaki gibi. Gerekirse düzenleyin; doğruysa ön değerlendirmeye geçelim.',
        options: [],
        text_input: false,
      };
  }
}

// ---------------------------------------------------------------------------
// Serbest metin eşleştirme — dar kapsamlı, açık ifadeler
// ---------------------------------------------------------------------------
const norm = (s: string) => s.toLocaleLowerCase('tr-TR').replace(/[’`´‘]/g, "'").replace(/\s+/g, ' ').trim();

const CHANNELS: [string, RegExp][] = [
  ['Amazon', /\bamazon/],
  ['Etsy', /\betsy/],
  ['eBay', /\bebay/],
  ['Shopify / Kendi Web Sitem', /\bshopify|kendi (?:web )?site|web site(?:m|miz)\b|kendi e-?ticaret site/],
  ['B2B / Toptan', /\bb2b|toptan(?!c)/],
  ['Sosyal Medya', /sosyal medya|instagram|tiktok|facebook/],
];
const TARGET_CHANNEL_LABEL: Record<string, string> = { 'Shopify / Kendi Web Sitem': 'Kendi web sitesi' };

const MARKETS: [string, RegExp][] = [
  ['ABD', /\babd\b|amerika|birleşik devletler/],
  ['Almanya', /almanya/],
  ['İngiltere', /ingiltere|birleşik krall/],
  ['Avrupa', /avrupa/],
  ['Kanada', /kanada/],
  ['Avustralya', /avustralya/],
  ['Fransa', /fransa/],
  ['Hollanda', /hollanda/],
  ['Körfez ülkeleri', /körfez|dubai|\bbae\b|suudi/],
  ['Japonya', /japonya/],
];

const NEG = /sat(?:m[ıi]yor|mad[ıi])|yapm[ıi]yor|\byok\b|değil|\bhiç\b|kapatt|b[ıi]rakt/;
const INTENT = /düşün|planl|istiyor|isterim|isteriz|hedef|açmak|açılmak|açaca|başlayaca|başlamak|geçmek|geçece|sataca|satmay|satmak/;
// Yalnızca zarfla belirsizleşen parça ("belki Etsy"): kendi kanalı hedef sayılır ama sınıfı öncekine taşınmaz.
const MAYBE = /belki|ileride|yakında|olabilir/;
const CURRENT =
  /sat[ıi]yor|sat[ıi]ş yap[ıi]yor|sat[ıi]ş(?:[ıi]m[ıi]z|[ıi]m|lar[ıi]m[ıi]z?) var|mağaza(?:m|m[ıi]z) var|mağaza(?:m|m[ıi]z)[ıi]? (?:açık|aktif)|üzerinden sat|satmaktay/;
const WEAK = /\bvar\b|mağaza|hesab/;

type Cls = 'neg' | 'target' | 'maybe' | 'current' | 'weak' | 'none';
function classify(seg: string): Cls {
  if (NEG.test(seg)) return 'neg';
  if (INTENT.test(seg)) return 'target';
  if (CURRENT.test(seg)) return 'current';
  if (MAYBE.test(seg)) return 'maybe';
  if (WEAK.test(seg)) return 'weak';
  return 'none';
}
const splitSegments = (t: string) =>
  t
    .split(/[.;!?\n]+|,|\s(?:ama|fakat|ancak|lakin|ve|ile|ayrıca|hem de)\s/)
    .map((s) => s.trim())
    .filter(Boolean);

const BUSINESS: [string, RegExp][] = [
  ['Üretici / Marka Sahibi', /üretici|kendi üretim|üretim yap|imalat|fabrika/],
  ['Toptancı / B2B Firma', /toptancı/],
  ['E-Ticaret Markası', /e-?ticaret markas/],
];
const GOALS: [string, RegExp][] = [
  ['Satışları artırmak', /sat[ıi]ş\S* art[ıi]r|daha (?:fazla|çok) sat/],
  ['Yeni pazarlara açılmak', /yeni pazar|yurt ?dış|global(?:e)? aç|ihracat|uluslararası|dış pazar/],
  ['Marka bilinirliğini güçlendirmek', /bilinirli|tanınırlı/],
  ['Operasyonu düzenlemek', /operasyon\S* (?:düzen|toparla)|süreç\S* düzen/],
  ['Yapay zeka / otomasyon entegre etmek', /yapay zek|otomasyon|\bai\b|n8n/],
  ['B2B satış sürecini dijitalleştirmek', /(?:b2b|toptan|bayi)\S*.*dijital/],
];
const PROBLEMS: [string, RegExp][] = [
  ['Trafik var ama satışa dönüşmüyor', /(?:trafik|ziyaret\S*) var.*(?:dönüş|sat[ıi]ş\S* (?:yok|olmuyor|gelmiyor))|dönüşüm\S* (?:oran\S* )?(?:düşük|yok|az)/],
  ['Yeterli trafik alamıyorum', /(?:trafik|ziyaret\S*) (?:yok|az|alam|düşük|gelmiyor)/],
  ['Reklam harcıyorum ama sonuç alamıyorum', /reklam.*(?:sonuç alam|işe yaram|boşa|verim)/],
  ['Ürünlerimi doğru sunamıyorum', /ürün\S* .*(?:sunam|anlatam)|görsel\S* (?:zayıf|kötü)/],
  ['Operasyon / süreç yönetimi çok dağınık', /(?:operasyon|süreç)\S* .*(?:dağınık|karışık)/],
  ['Satış yok / çok düşük', /sat[ıi]ş\S* (?:çok )?(?:düşük|az)\b/],
];
const INFRA: [string, RegExp][] = [
  ['Hiç Yok / Yeni Kuracağım', /\byok\b|sıfırdan|yeni kur|kuraca/],
  ['Var Ama Zayıf', /zayıf|eksik|yetersiz/],
  ['Orta Seviyede', /\borta\b|idare eder/],
];

const VOLUME_OPTIONS = ['0 - 100.000 TL', '100.000 - 500.000 TL', '500.000 - 1.000.000 TL', '1.000.000 TL üzeri'];
const BUDGET_OPTIONS = ['0 - 25.000 TL', '25.000 - 75.000 TL', '75.000 - 150.000 TL', '150.000 TL üzeri'];
function bucket(v: number, edges: number[], options: string[]): string[] {
  for (let i = 0; i < edges.length; i++) {
    if (v < edges[i]) return [options[i]];
    if (v === edges[i]) return [options[i], options[i + 1]]; // sınır değer iki aralığa da girebilir → sor
  }
  return [options[options.length - 1]];
}

/** TL tutarları. Birim (bin/milyon/k/m) veya para birimi yoksa yalnızca `allowPlain` iken ve ≥1000 ise kabul. */
function parseMoney(seg: string, allowPlain: boolean): number[] {
  const re = /(\d{1,3}(?:\.\d{3})+|\d+(?:[.,]\d+)?)\s*(milyon|bin|k\b|m\b)?\s*(tl|₺|lira)?/g;
  const tokens: { value: number; mult: number | null; currency: boolean; thousands: boolean; start: number; end: number }[] = [];
  for (const m of seg.matchAll(re)) {
    const thousands = /\./.test(m[1]) && /^\d{1,3}(?:\.\d{3})+$/.test(m[1]);
    const value = thousands ? Number(m[1].replace(/\./g, '')) : Number(m[1].replace(',', '.'));
    const unit = m[2];
    const after = seg.slice((m.index ?? 0) + m[0].length);
    if (/^\s*(?:sipariş|adet|ürün|müşteri|kişi|satış\b|%)/.test(after)) continue;
    tokens.push({
      value,
      mult: unit === 'milyon' || unit === 'm' ? 1e6 : unit ? 1e3 : null,
      currency: Boolean(m[3]),
      thousands,
      start: m.index ?? 0,
      end: (m.index ?? 0) + m[0].length,
    });
  }
  // "100-500 bin" → ilk sayı birimi sonrakinden alır
  for (let i = tokens.length - 2; i >= 0; i--) {
    if (tokens[i].mult === null && tokens[i + 1].mult !== null && /^\s*[-–]\s*$/.test(seg.slice(tokens[i].end, tokens[i + 1].start))) {
      tokens[i].mult = tokens[i + 1].mult;
    }
  }
  return tokens
    .filter((t) => t.mult !== null || t.currency || t.thousands || (allowPlain && t.value >= 1000))
    .map((t) => t.value * (t.mult ?? 1));
}

export type Extract = {
  set: Map<SingleId, { strong: Set<string>; weak: Set<string> }>;
  channelsAdd: string[];
  channelsNone: 'strong' | 'weak' | null;
  negChannels: string[];
  unclearChannels: string[];
  targetChannels: string[];
  targetMarkets: string[];
  currentMarkets: string[];
  start?: GloStart;
};

export function extract(text: string, step: StepKey): Extract {
  const t = norm(text);
  const segs = splitSegments(t);
  const own = segs.map(classify);
  // Fiilsiz liste parçaları ("Amazon, Etsy'de satıyorum") sınıfını sonraki parçadan alır.
  const inherited = [...own];
  for (let i = inherited.length - 2; i >= 0; i--) if (inherited[i] === 'none' && inherited[i + 1] !== 'maybe') inherited[i] = inherited[i + 1];
  const fallback: Cls = step === 'channels' ? 'current' : step === 'target' ? 'target' : 'none';

  const ex: Extract = {
    set: new Map(),
    channelsAdd: [],
    channelsNone: null,
    negChannels: [],
    unclearChannels: [],
    targetChannels: [],
    targetMarkets: [],
    currentMarkets: [],
  };
  const add = (id: SingleId, values: string[], strength: 'strong' | 'weak') => {
    const e = ex.set.get(id) ?? { strong: new Set<string>(), weak: new Set<string>() };
    for (const v of values) e[strength].add(v);
    ex.set.set(id, e);
  };
  const uniq = (xs: string[]) => [...new Set(xs)];

  let mentionedChannel = false;
  // "Amazon ve belki Etsy": zarfla belirsizleşen mesajda fiilsiz kanallar da mevcut sayılmaz → netleştirilir.
  const hedged = own.includes('maybe');
  segs.forEach((seg, i) => {
    let c: Cls | 'unclear' = inherited[i];
    if (c === 'none') c = fallback === 'target' ? 'target' : fallback === 'current' && !hedged ? 'current' : 'unclear';
    else if (c === 'maybe') c = step === 'target' ? 'target' : 'unclear';
    else if (c === 'weak') c = 'unclear';
    // Marka/ülke adları: tr-TR küçük harf "Instagram"ı "ınstagram" yapar → ı/i ayrımı yok sayılır.
    const plain = seg.replace(/ı/g, 'i');
    const chans = CHANNELS.filter(([, re]) => re.test(plain)).map(([v]) => v);
    const markets = MARKETS.filter(([, re]) => re.test(plain)).map(([v]) => v);
    if (chans.length) mentionedChannel = true;
    if (c === 'current') {
      ex.channelsAdd.push(...chans);
      ex.currentMarkets.push(...markets);
    } else if (c === 'target') {
      ex.targetChannels.push(...chans.map((x) => TARGET_CHANNEL_LABEL[x] ?? x));
      ex.targetMarkets.push(...markets);
    } else if (c === 'neg') {
      ex.negChannels.push(...chans);
    } else if (c === 'unclear') {
      ex.unclearChannels.push(...chans);
    }

    const ownCls = own[i];
    if (ownCls !== 'neg') {
      const bt = BUSINESS.filter(([, re]) => re.test(seg)).map(([v]) => v);
      if (bt.length) add('businessType', bt, 'strong');
      // "Kendi markamız var": marka sahibi mi e-ticaret markası mı belirsiz → seçtir
      else if (/kendi marka/.test(seg)) add('businessType', ['Üretici / Marka Sahibi', 'E-Ticaret Markası'], 'weak');
    }
    if (ownCls === 'target' || step === 'goal') {
      const gl = GOALS.filter(([, re]) => re.test(seg)).map(([v]) => v);
      // "Almanya'ya açılmak istiyoruz": pazar adı + açılmak → yeni pazar hedefi
      if (ownCls === 'target' && markets.length && /açıl/.test(seg) && !gl.includes('Yeni pazarlara açılmak')) gl.push('Yeni pazarlara açılmak');
      if (gl.length) add('goal', gl, 'strong');
    }
    if (/altyapı/.test(seg) || step === 'infraLevel') {
      const inf = INFRA.filter(([, re]) => re.test(seg)).map(([v]) => v);
      if (inf.length) add('infraLevel', inf, 'strong');
      else if (/güçlü/.test(seg)) add('infraLevel', ['Güçlü Ama Büyümüyor'], 'weak');
    }

    // Tutarlar: yabancı para veya yıllık ifade varsa tahmin yok.
    if (!/dolar|\$|euro|€|\busd\b|\beur\b|sterlin|£/.test(seg) && !/y[ıi]l|sene/.test(seg)) {
      const monthly = /\bay(?:da|l[ıi]k)?\b|aylık/.test(seg);
      const budgetCtx = /bütçe|reklam|harca|ayır/.test(seg) || (step === 'budget' && !/ciro|sat[ıi]ş|hacim|gelir/.test(seg));
      const volumeCtx = !budgetCtx && (/ciro|sat[ıi]ş|hacim|gelir|kazan/.test(seg) || step === 'salesVolume');
      const amounts = parseMoney(seg, step === 'budget' || step === 'salesVolume');
      if (amounts.length && (budgetCtx || volumeCtx)) {
        const [id, edges, options] = budgetCtx
          ? (['budget', [25000, 75000, 150000], BUDGET_OPTIONS] as const)
          : (['salesVolume', [100000, 500000, 1000000], VOLUME_OPTIONS] as const);
        const buckets = uniq(amounts.flatMap((v) => bucket(v, [...edges], [...options])));
        const sure = buckets.length === 1 && (monthly || step === id);
        add(id, buckets, sure ? 'strong' : 'weak');
      }
    }
  });

  // Problem kalıpları "ama" ile bölünen cümleleri kapsar ("trafik var ama satışa dönmüyor") → tüm metinde.
  if (step === 'problem' || !own.every((c) => c === 'target')) {
    const pr = PROBLEMS.filter(([, re]) => re.test(t)).map(([v]) => v);
    if (pr.length) add('problem', pr, 'strong'); // birden fazlaysa seçtirilir
  }

  // Aktif sorunun seçeneğini birebir yazdıysa (ör. "Henüz bütçe belirlemedik") kesin kabul.
  if (step !== 'suggestion' && step !== 'summary' && step !== 'intro' && step !== 'otherChannel' && step !== 'start' && step !== 'product' && step !== 'target' && step !== 'channels') {
    const literal = Q[step].options.filter((o) => t.includes(norm(o)));
    if (literal.length === 1) add(step, literal, 'strong');
  }

  // Satış yok: yalnızca kanal/başlangıç sorusunda ve kanal adı geçmiyorsa.
  if ((step === 'channels' || step === 'start') && !mentionedChannel) {
    if (t.includes(norm(NO_SALES_CHANNEL))) ex.channelsNone = step === 'channels' ? 'strong' : 'weak';
    else if (/(?:hiç|henüz) sat[ıi]ş\S* yok|sat[ıi]ş yapm[ıi]yor|hiçbir yerde sat/.test(t)) ex.channelsNone = 'weak';
  }

  // Başlangıç bağlamı (analiz alanı değil)
  const isNew = /yeni başla|henüz başla|sıfırdan|başlangıç aşama/.test(t);
  const isBrand = /markam(?:ız)? için|marka desteği|markam(?:ız)?[ıi]? (?:büyüt|güçlendir|konumlandır)/.test(t);
  const isSelling = ex.channelsAdd.length > 0 || own.includes('current');
  const starts = [isNew && 'new', isBrand && 'brand', isSelling && 'selling'].filter(Boolean) as GloStart[];
  if (starts.length === 1) ex.start = starts[0];

  ex.channelsAdd = uniq(ex.channelsAdd);
  ex.negChannels = uniq(ex.negChannels).filter((c) => !ex.channelsAdd.includes(c));
  ex.unclearChannels = uniq(ex.unclearChannels).filter((c) => !ex.channelsAdd.includes(c));
  ex.targetChannels = uniq(ex.targetChannels);
  ex.targetMarkets = uniq(ex.targetMarkets);
  ex.currentMarkets = uniq(ex.currentMarkets);
  return ex;
}

// ---------------------------------------------------------------------------
// Tur işleme
// ---------------------------------------------------------------------------
export type GloInput =
  | { type: 'choice'; value: string; label: string }
  | { type: 'multi'; values: string[] }
  | { type: 'text'; text: string }
  /** Ürün/hizmet sorusunun kısa metni (AI kapalı): olduğu gibi saklanır — AI'a gitmez, sınıflandırılmaz, puana katılmaz. */
  | { type: 'product'; text: string }
  /** "Diğer" kanalın kısa adı: olduğu gibi saklanır — AI'a gitmez, hiçbir kanala eşlenmez, puana katılmaz. */
  | { type: 'otherChannel'; text: string }
  | { type: 'edit'; field: GloField };

/** Ürün/hizmet kısa metin sınırı. */
export const PRODUCT_LIMIT = 120;

function reconcile(a: Answers, g: GloState, notes: string[]) {
  const ch = arr(a.channels);
  const none = ch.length === 1 && ch[0] === NO_SALES_CHANNEL;
  if (g.inferredVolume && !none) {
    delete a.salesVolume;
    g.inferredVolume = false;
    notes.push('Satış kanalı değiştiği için aylık satış hacmini ayrıca soracağım');
  }
  if (none && !hasAnswer(a, 'salesVolume') && g.editing !== 'salesVolume') {
    a.salesVolume = NO_SALES_VOLUME;
    g.inferredVolume = true;
    notes.push(`Satış kanalı olmadığı için aylık satış hacmini “${NO_SALES_VOLUME}” olarak işaretledim; özetten değiştirebilirsiniz`);
  }
}

const joinTr = (xs: string[]) => xs.join(', ');

export function respond(a0: Answers, g0: GloState, input: GloInput): { answers: Answers; glo: GloState } {
  const a: Answers = { ...a0 };
  const g: GloState = {
    ...g0,
    messages: [...g0.messages],
    suggestions: [...g0.suggestions],
    targetChannels: [...g0.targetChannels],
    targetMarkets: [...g0.targetMarkets],
    currentMarkets: [...g0.currentMarkets],
    extraNotes: [...g0.extraNotes],
    unsureChannels: [...g0.unsureChannels],
  };
  const push = (m: Omit<GloMessage, 'id'>) => {
    g.messages.push({ ...m, id: g.nextId });
    g.nextId += 1;
  };
  const prompt = promptFor(a0, g0);
  const step = prompt.step;
  const notes: string[] = [];
  const recorded: GloField[] = [];

  if (input.type === 'edit') {
    const f = input.field;
    if (f === 'start') {
      g.start = undefined;
      g.channelsExpanded = false;
    } else if (f === 'product') {
      g.product = undefined;
      g.productSkipped = false;
    } else if (f === 'target') {
      g.targetChannels = [];
      g.targetMarkets = [];
      g.targetText = undefined;
      g.targetSkipped = false;
    } else {
      delete a[f];
      if (f === 'salesVolume') g.inferredVolume = false;
      if (f === 'channels') {
        g.channelsExpanded = false;
        if (g.inferredVolume) {
          delete a.salesVolume;
          g.inferredVolume = false;
        }
      }
    }
    g.editing = f;
    g.suggestions = g.suggestions.filter((s) => s.field !== f);
    g.messages = g.messages.map((m) => (m.fields?.includes(f) ? { ...m, replaced: [...(m.replaced ?? []), f] } : m));
    push({ from: 'glo', tone: 'note', text: `Tamam, “${FIELD_LABEL[f]}” bilgisini yeniden seçelim.` });
    return { answers: a, glo: g };
  }

  // Cevaplanan soru geçmişe taşınır; ardından kullanıcının cevabı.
  push({ from: 'glo', text: prompt.text });

  if (input.type === 'choice') {
    const v = input.value;
    if (step === 'suggestion') {
      const s = g.suggestions.shift()!;
      if (s.kind === 'clarify') {
        const ch = s.options[0];
        if (v === CLARIFY_CURRENT) {
          const cur = arr(a.channels).filter((x) => x !== NO_SALES_CHANNEL);
          a.channels = cur.includes(ch) ? cur : [...cur, ch];
          recorded.push('channels');
        } else if (v === CLARIFY_TARGET) {
          const label = TARGET_CHANNEL_LABEL[ch] ?? ch;
          if (!g.targetChannels.includes(label)) g.targetChannels.push(label);
          recorded.push('target');
        } else if (!g.unsureChannels.includes(ch)) {
          g.unsureChannels.push(ch);
        }
      } else if (v !== NO) {
        if (s.field === 'channels') {
          const cur = v === NO_SALES_CHANNEL ? [] : arr(a.channels).filter((x) => x !== NO_SALES_CHANNEL);
          a.channels = cur.includes(v) ? cur : [...cur, v];
        } else {
          a[s.field] = v;
          if (s.field === 'salesVolume') g.inferredVolume = false;
        }
        recorded.push(s.field);
      }
    } else if (step === 'start' || step === 'intro') {
      g.start = v as GloStart;
      g.intro = false;
      recorded.push('start');
    } else if (step === 'product') {
      g.productSkipped = true;
      recorded.push('product');
    } else if (step === 'target') {
      if (v === 'Henüz net değil') g.targetText = v;
      else g.targetChannels = [...new Set([...g.targetChannels, v])];
      recorded.push('target');
    } else if (step === 'channels') {
      if (v === CH_NEW_NONE) {
        a.channels = [NO_SALES_CHANNEL];
        recorded.push('channels');
      } else if (v === CH_NEW_SOME) {
        g.channelsExpanded = true;
      }
    } else if (step === 'otherChannel') {
      g.otherChannelSkipped = true; // "Diğer" kalır; adı belirtilmedi
      recorded.push('channels');
    } else if (step !== 'summary') {
      a[step] = v;
      if (step === 'salesVolume') g.inferredVolume = false;
      recorded.push(step);
    }
    push({ from: 'user', text: input.label, fields: recorded.length ? [...recorded] : undefined });
  } else if (input.type === 'otherChannel') {
    const name = input.text.replace(/[<>\u0000-\u001f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, OTHER_CHANNEL_LIMIT);
    if (step === 'otherChannel' && name) {
      g.otherChannels = [...(g.otherChannels ?? []).filter((o) => o.status !== 'current'), { name, status: 'current' }];
      g.otherChannelSkipped = false;
      recorded.push('channels');
    }
    push({ from: 'user', text: name, fields: recorded.length ? ['channels'] : undefined });
  } else if (input.type === 'product') {
    const text = input.text.trim().slice(0, PRODUCT_LIMIT);
    if (step === 'product' && text) {
      g.product = text;
      g.productSkipped = false;
      recorded.push('product');
    }
    push({ from: 'user', text, fields: recorded.length ? ['product'] : undefined });
  } else if (input.type === 'multi') {
    a.channels = [...input.values];
    // "Diğer" kaldırıldıysa bugünkü diğer kanal adları da düşer (hedef/netleşmemiş olanlar kalır).
    if (!input.values.includes(OTHER_CHANNEL)) {
      g.otherChannels = (g.otherChannels ?? []).filter((o) => o.status !== 'current');
      g.otherChannelSkipped = false;
    }
    recorded.push('channels');
    push({ from: 'user', text: joinTr(input.values), fields: ['channels'] });
  } else {
    const text = input.text.trim();
    if (step === 'suggestion') g.suggestions.shift(); // seçmek yerine yazdı: öneri düşer
    const pendingBefore = g.suggestions.length;
    const ex = extract(text, step);

    for (const [id, { strong, weak }] of ex.set) {
      if (strong.size === 1) {
        const v = [...strong][0];
        const prev = a[id];
        if (prev === v) continue;
        a[id] = v;
        if (id === 'salesVolume') g.inferredVolume = false;
        recorded.push(id);
        notes.push(`${FIELD_LABEL[id]}: ${v}${prev ? ' (güncellendi)' : ''}`);
      } else {
        const options = [...(strong.size ? strong : weak)];
        if (options.length === 1 && a[id] === options[0]) continue;
        g.suggestions.push({ field: id, options });
      }
    }
    if (ex.channelsNone === 'strong') {
      a.channels = [NO_SALES_CHANNEL];
      recorded.push('channels');
      notes.push(`${FIELD_LABEL.channels}: ${NO_SALES_CHANNEL}`);
    } else if (ex.channelsNone === 'weak' && !hasAnswer(a, 'channels')) {
      g.suggestions.push({ field: 'channels', options: [NO_SALES_CHANNEL] });
    }
    if (ex.channelsAdd.length) {
      const cur = arr(a.channels).filter((x) => x !== NO_SALES_CHANNEL);
      const added = ex.channelsAdd.filter((x) => !cur.includes(x));
      if (added.length) {
        a.channels = [...cur, ...added];
        recorded.push('channels');
        notes.push(`${FIELD_LABEL.channels}: ${joinTr(added)}`);
      }
    }
    // Belirsiz kanallar tek tek netleştirilir (zaten mevcut/hedef olarak bilinenler hariç).
    for (const ch of ex.unclearChannels) {
      if (arr(a.channels).includes(ch) || g.targetChannels.includes(TARGET_CHANNEL_LABEL[ch] ?? ch)) continue;
      g.suggestions.push({ field: 'channels', options: [ch], kind: 'clarify' });
    }
    const tAdd = ex.targetChannels.filter((x) => !g.targetChannels.includes(x));
    if (tAdd.length) {
      g.targetChannels.push(...tAdd);
      recorded.push('target');
      notes.push(`Hedef kanal: ${joinTr(tAdd)} (mevcut satış kanalı olarak kaydetmedim)`);
    }
    const mAdd = ex.targetMarkets.filter((x) => !g.targetMarkets.includes(x));
    if (mAdd.length) {
      g.targetMarkets.push(...mAdd);
      if (!recorded.includes('target')) recorded.push('target');
      notes.push(`Hedef pazar: ${joinTr(mAdd)}`);
    }
    const cmAdd = ex.currentMarkets.filter((x) => !g.currentMarkets.includes(x));
    if (cmAdd.length) {
      g.currentMarkets.push(...cmAdd);
      notes.push(`Mevcut pazar (not): ${joinTr(cmAdd)}`);
    }
    if (ex.start && !g.start) {
      g.start = ex.start;
      recorded.push('start');
    }
    if (step === 'product') {
      g.product = text;
      g.productSkipped = false;
      recorded.push('product');
    }
    if (step === 'target' && !recorded.includes('target')) {
      g.targetText = text;
      recorded.push('target');
    }

    push({ from: 'user', text, fields: recorded.length ? [...new Set(recorded)] : undefined });
    if (ex.negChannels.length) {
      push({
        from: 'glo',
        tone: 'note',
        text: `${joinTr(ex.negChannels)} için olumsuz bir ifade yazdınız; mevcut satış kanalı olarak kaydetmedim.`,
      });
    }
    const understood = recorded.length > 0 || notes.length > 0 || g.suggestions.length > pendingBefore;
    if (!understood && !ex.negChannels.length) {
      g.extraNotes.push(text);
      push({
        from: 'glo',
        tone: 'note',
        text: 'Bu prototip yazdığınızı seçeneklerle güvenle eşleştiremedi. Aşağıdan bir seçenek seçebilirsiniz; yazdığınızı not taslağına ekledim.',
      });
    }
  }

  if (g.editing && isFilled(g.editing, a, g)) g.editing = undefined;
  reconcile(a, g, notes);
  if (notes.length) push({ from: 'glo', tone: 'note', text: `Not ettim: ${notes.join(' · ')}.` });
  return { answers: a, glo: g };
}

// ---------------------------------------------------------------------------
// Özet
// ---------------------------------------------------------------------------
export function contextValue(field: 'start' | 'product' | 'target', g: GloState): string {
  if (field === 'start') return g.start ? START_LABEL[g.start] : '—';
  if (field === 'product') return g.product ?? (g.productSkipped ? 'Belirtilmedi' : '—');
  const parts = [
    g.targetChannels.length ? `Kanal: ${joinTr(g.targetChannels)}` : '',
    g.targetMarkets.length ? `Pazar: ${joinTr(g.targetMarkets)}` : '',
    g.targetText ?? '',
  ].filter(Boolean);
  return parts.length ? parts.join(' · ') : '—';
}

export function showsTarget(a: Answers, g: GloState) {
  return needsTarget(a, g) || targetKnown(g);
}

/** Şemaya uymayan bağlam — kullanıcıya ayrıca gösterilmez, sonuç ekranındaki `notes` alanına eklenir. */
function contextNotes(g: GloState): string {
  const lines: string[] = [];
  if (g.start) lines.push(`Başlangıç noktası: ${START_LABEL[g.start]}`);
  if (g.product) lines.push(`Ürün / hizmet: ${g.product}`);
  if (g.currentMarkets.length) lines.push(`Mevcut pazar: ${joinTr(g.currentMarkets)}`);
  if (g.targetChannels.length) lines.push(`Hedef kanal: ${joinTr(g.targetChannels)}`);
  if (g.targetMarkets.length) lines.push(`Hedef pazar: ${joinTr(g.targetMarkets)}`);
  if (g.targetText) lines.push(`Hedef: ${g.targetText}`);
  if (g.unsureChannels.length) lines.push(`Netleşmemiş kanal: ${joinTr(g.unsureChannels)}`);
  const other = (s: 'current' | 'planned' | 'unclear') => (g.otherChannels ?? []).filter((o) => o.status === s).map((o) => o.name);
  if (other('current').length) lines.push(`Diğer mevcut kanal: ${joinTr(other('current'))}`);
  if (other('planned').length) lines.push(`Diğer hedef kanal: ${joinTr(other('planned'))}`);
  if (other('unclear').length) lines.push(`Diğer kanal (durumu netleşmedi): ${joinTr(other('unclear'))}`);
  return lines.join('\n');
}

/** "Eklemek istediğiniz bir şey var mı?" alanının değeri (varsayılan: eşleşmeyen serbest mesajlar). */
export const notesExtra = (g: GloState) => g.notesExtra ?? g.extraNotes.join('\n');

/** Sonuç ekranına aktarılacak tam not: bağlam + kullanıcının eklediği metin. */
export function composeNotes(g: GloState): string {
  // Elle düzenlenmiş not korunur; yalnız ürün/hizmet satırı güncel değere çekilir.
  if (g.notesRaw !== undefined) return upsertNoteLine(withProductNote(g.notesRaw, g.product), OTHER_CHANNEL_NOTE, otherCurrentNames(g) || undefined);
  return [contextNotes(g), notesExtra(g).trim()].filter(Boolean).join('\n\n');
}

/** Kısa özet: ürün/hizmet, mevcut durum, hedef, ihtiyaç. */
export function shortSummary(a: Answers, g: GloState): { label: string; value: string }[] {
  const ch = arr(a.channels);
  const others = (s: 'current' | 'planned') => (g.otherChannels ?? []).filter((o) => o.status === s).map((o) => o.name);
  const current =
    ch.length === 1 && ch[0] === NO_SALES_CHANNEL && !others('current').length
      ? 'Henüz satış yapmıyor'
      : [
          joinTr([...ch.filter((c) => c !== NO_SALES_CHANNEL && !(c === OTHER_CHANNEL && others('current').length)), ...others('current')]),
          a.salesVolume && a.salesVolume !== NO_SALES_VOLUME ? `aylık ${a.salesVolume}` : '',
        ]
          .filter(Boolean)
          .join(' · ');
  const target = [a.goal as string | undefined, [...g.targetChannels, ...others('planned'), ...g.targetMarkets].join(', '), g.targetText].filter(Boolean).join(' · ');
  return [
    { label: 'Ürün / hizmet', value: g.product ?? 'Belirtilmedi' },
    { label: 'Mevcut durum', value: current || '—' },
    { label: 'Hedef', value: target || '—' },
    { label: 'İhtiyaç', value: (a.problem as string | undefined) ?? '—' },
  ];
}

export function formatAnswer(a: Answers, id: QuestionId): string {
  const v = a[id];
  return Array.isArray(v) ? joinTr(v) : (v ?? '—');
}

/** Kanal cevabı + "Diğer" kanalın adı (ör. "Etsy, Diğer (Trendyol)"). */
export function channelsText(a: Answers, g: GloState): string {
  const names = otherCurrentNames(g);
  return arr(a.channels).map((c) => (c === OTHER_CHANNEL && names ? `${OTHER_CHANNEL} (${names})` : c)).join(', ') || '—';
}

// ---------------------------------------------------------------------------
// Yerel AI denemesi (Aşama B1): doğrulanmış model önerisini uygular. Kural tabanlı eşleştirme bu yolda
// kullanılmaz; model yanıt veremezse hiçbir cevap değişmez ve bu açıkça söylenir.
// ---------------------------------------------------------------------------
export const AI_FAILURE_TEXT = 'Şu anda yanıt veremiyorum; mesajınızı not olarak sakladım. Seçeneklerle veya form üzerinden devam edebilirsiniz.';

function beginTextTurn(a0: Answers, g0: GloState) {
  const a: Answers = { ...a0 };
  const g: GloState = {
    ...g0,
    messages: [...g0.messages],
    suggestions: [...g0.suggestions],
    targetChannels: [...g0.targetChannels],
    targetMarkets: [...g0.targetMarkets],
    currentMarkets: [...g0.currentMarkets],
    extraNotes: [...g0.extraNotes],
    unsureChannels: [...g0.unsureChannels],
  };
  const push = (m: Omit<GloMessage, 'id'>) => {
    g.messages.push({ ...m, id: g.nextId });
    g.nextId += 1;
  };
  const prompt = promptFor(a0, g0);
  push({ from: 'glo', text: prompt.text });
  return { a, g, push, step: prompt.step };
}

export function applyAiFailure(a0: Answers, g0: GloState, text: string) {
  // Cevaplar değişmez; mesaj kaybolmaz: geçmişte kalır ve not taslağına eklenir. Açılış sorusu açık kalır.
  const { a, g, push } = beginTextTurn(a0, g0);
  push({ from: 'user', text });
  if (!g.extraNotes.includes(text)) g.extraNotes.push(text);
  push({ from: 'glo', tone: 'note', text: AI_FAILURE_TEXT });
  return { answers: a, glo: g };
}

export function applyAiResult(a0: Answers, g0: GloState, text: string, r: GloAiResult) {
  const { a, g, push, step } = beginTextTurn(a0, g0);
  // Notlar kısa tutulur: kaydedilen alanların ADI (değerler kullanıcı mesajının altındaki "Değiştir"
  // bağlantılarında görünür; kullanıcının söylediği uzun uzun tekrar edilmez).
  const notes: string[] = [];
  const recorded: GloField[] = [];
  if (step === 'suggestion') g.suggestions.shift(); // seçmek yerine yazdı: bekleyen netleştirme düşer
  g.intro = false;

  for (const [id, v] of Object.entries(r.answers) as [QuestionId, string | string[]][]) {
    const prev = a[id];
    if (JSON.stringify(prev) === JSON.stringify(v)) continue;
    a[id] = Array.isArray(v) ? [...v] : v;
    if (id === 'salesVolume') g.inferredVolume = false;
    recorded.push(id);
    notes.push(`${FIELD_LABEL[id]}${prev ? ' (güncellendi)' : ''}`);
  }
  for (const id of r.clear) {
    if (!hasAnswer(a, id)) continue;
    delete a[id];
    if (id === 'salesVolume') g.inferredVolume = false;
    g.messages = g.messages.map((m) => (m.fields?.includes(id) ? { ...m, replaced: [...(m.replaced ?? []), id] } : m));
    notes.push(`${FIELD_LABEL[id]} bilgisini kaldırdım`);
  }
  if (r.start && !g.start) {
    g.start = r.start;
    recorded.push('start');
  }
  if (r.product) {
    g.product = r.product;
    g.productSkipped = false;
    recorded.push('product');
  } else if (step === 'product') {
    g.product = text.slice(0, 300); // ürün sorusuna verilen cevap zaten bağlamdır
    g.productSkipped = false;
    recorded.push('product');
  }
  const tAdd = (r.targetChannels ?? []).map((c) => TARGET_CHANNEL_LABEL[c] ?? c).filter((c) => !g.targetChannels.includes(c));
  if (tAdd.length) {
    g.targetChannels.push(...tAdd);
    recorded.push('target');
    notes.push('Hedef kanal (mevcut satış olarak değil)');
  }
  const mAdd = (r.targetMarkets ?? []).filter((m) => !g.targetMarkets.includes(m));
  if (mAdd.length) {
    g.targetMarkets.push(...mAdd);
    if (!recorded.includes('target')) recorded.push('target');
    notes.push('Hedef pazar');
  }
  if (step === 'target' && !recorded.includes('target')) {
    g.targetText = text.slice(0, 300);
    recorded.push('target');
  }
  // Listede olmayan kanallar (ör. Trendyol) hiçbir seçeneğe eşlenmez; bağlamda saklanır, nota ve özete girer.
  if (r.otherChannels?.length) {
    const others = [...(g.otherChannels ?? [])];
    for (const o of r.otherChannels) {
      const i = others.findIndex((x) => x.name.toLocaleLowerCase('tr-TR') === o.name.toLocaleLowerCase('tr-TR'));
      if (i === -1) others.push(o);
      else if (o.status !== 'unclear') others[i] = o; // netleşen durum öncekini günceller
    }
    g.otherChannels = others;
    notes.push('Listede olmayan kanal (not olarak)');
  }
  // Netleştirmeler (belirsiz kanal / tekil bilgi) önce sorulur; AI'nın doğal sorusu en başa alınır.
  const clarifications: typeof g.suggestions = [];
  for (const c of r.confirm ?? []) {
    if (!hasAnswer(a, c.field)) clarifications.push({ field: c.field, options: c.options, ...(c.question ? { question: c.question } : {}) });
  }
  for (const ch of r.unclearChannels ?? []) {
    if (arr(a.channels).includes(ch) || g.targetChannels.includes(TARGET_CHANNEL_LABEL[ch] ?? ch)) continue;
    clarifications.push({ field: 'channels', options: [ch], kind: 'clarify' });
  }
  const natural = clarifications.filter((c) => c.question);
  g.suggestions.unshift(...natural);
  g.suggestions.push(...clarifications.filter((c) => !c.question));

  push({ from: 'user', text, fields: recorded.length ? [...new Set(recorded)] : undefined });
  if (r.reply) push({ from: 'glo', text: r.reply });
  if (!recorded.length && !notes.length && g.suggestions.length === g0.suggestions.length - (step === 'suggestion' ? 1 : 0) && !r.reply) {
    push({ from: 'glo', tone: 'note', text: 'Bunu bir analiz bilgisine dönüştüremedim. Aşağıdaki seçeneklerden birini seçebilirsiniz.' });
  }
  if (g.editing && isFilled(g.editing, a, g)) g.editing = undefined;
  reconcile(a, g, notes);
  if (notes.length) push({ from: 'glo', tone: 'note', text: `Kaydettim: ${notes.join(' · ')}.` });
  return { answers: a, glo: g };
}

/** Sunucuya giden istek: yalnızca analiz durumu ve son mesajlar (iletişim formu alanları yok). */
export function buildTurnRequest(a: Answers, g: GloState, message: string): GloTurnRequest {
  return {
    message,
    step: promptFor(a, g).step,
    question: promptFor(a, g).text,
    answers: a,
    context: { start: g.start, product: g.product, targetChannels: g.targetChannels, targetMarkets: g.targetMarkets },
    history: g.messages.slice(-6).map((m) => ({ from: m.from, text: m.text.slice(0, 300) })),
  };
}
