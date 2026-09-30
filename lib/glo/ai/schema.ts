// Glo AI (Aşama B1, yalnızca yerel deneme) — istemci ile sunucu arasında paylaşılan dar sözleşme.
// Saf modül: gizli bilgi yok. Model yalnızca ALAN ÖNERİSİ üretir (skor, hizmet sıralaması, fiyat, sonuç yok).
//
// Kesinlik ayrımı (yalnızca talimata bırakılmaz): model her bilgiyi `certainty` + mesajdan birebir `quote`
// ile döndürür. Sunucu `interpretModelOutput` ile DETERMİNİSTİK olarak karar verir:
// - alıntı kullanıcının (maskelenmiş) mesajında geçmiyorsa, çekince sözcüğü içeriyorsa ya da model
//   "uncertain" dediyse bilgi CEVABA YAZILMAZ → kullanıcıya sorulur (confirm / unclearChannels);
// - mevcut kanal ancak alıntıda şimdiki zamanlı satış ifadesi varsa YA DA o anki soru açıkça mevcut
//   kanalları soruyorsa (step === 'channels') ve mesajda çekince yoksa kabul edilir;
// - planlanan kanal ancak alıntıda niyet ifadesi varsa; olumsuz kanal ancak alıntıda olumsuzluk varsa.
// Seçenek listesi doğrulaması ayrıca uygulanır ama tek başına doğru yorumun kanıtı sayılmaz.
import { questions, type Answers, type QuestionId } from '@/lib/analysis/questions';
import { NO_SALES_CHANNEL, OTHER_CHANNEL, type GloStart } from '@/lib/glo/state';

export const AI_LIMITS = {
  message: 600, // kullanıcı mesajı (karakter)
  question: 200, // o anki soru metni
  historyItems: 6, // gönderilen son mesaj sayısı
  historyText: 300, // geçmişteki her mesaj
  product: 200,
  market: 40,
  markets: 5,
  quote: 200,
  items: 12,
  reply: 280,
  clarifyQuestion: 160, // doğrulanmış netleştirme sorusu
  others: 5, // listede olmayan kanal sayısı
  otherName: 30,
  body: 16 * 1024, // istek gövdesi (bayt)
} as const;

export type SingleId = Exclude<QuestionId, 'channels'>;
const Q = Object.fromEntries(questions.map((q) => [q.id, q])) as Record<QuestionId, (typeof questions)[number]>;
const SINGLE_IDS = questions.filter((q) => !q.multi).map((q) => q.id) as SingleId[];
const QUESTION_IDS = questions.map((q) => q.id);
const CHANNEL_OPTIONS = Q.channels.options;
// Modelin eşleyebileceği kanallar: "Diğer" hariç (listede olmayan kanal otherChannels ile gelir; "Diğer"i sunucu türetir).
const MODEL_CHANNELS = CHANNEL_OPTIONS.filter((c) => c !== OTHER_CHANNEL);
const REAL_CHANNELS = MODEL_CHANNELS.filter((c) => c !== NO_SALES_CHANNEL);
const STARTS: GloStart[] = ['selling', 'new', 'brand'];
const CONTEXT_FIELDS = ['product', 'targetMarket', 'start'] as const;
const CHANNEL_STATUS = ['current', 'planned', 'negated', 'unclear'] as const;
/** İstemcinin o anki adımı (uygulama durumu). Yalnızca 'channels' mevcut kanal bağlamı sayılır. */
const STEPS = ['intro', 'otherChannel', 'start', 'product', 'target', 'suggestion', 'summary', ...QUESTION_IDS] as const;
export type TurnStep = (typeof STEPS)[number];

/** Uygulamaya giden, sunucuda yorumlanmış öneri. Olmayan alan = değişiklik yok; `clear` = açıkça kaldır. */
export type GloAiResult = {
  answers: Partial<Record<SingleId, string>> & { channels?: string[] };
  clear: QuestionId[];
  start?: GloStart;
  product?: string;
  targetChannels?: string[];
  targetMarkets?: string[];
  /** Mevcut mu planlı mı belli olmayan kanallar → tek tek netleştirilir. */
  unclearChannels?: string[];
  /** Belirsiz tekil bilgiler → cevaba yazılmadan kullanıcıya onaylatılır. `question`: doğrulanmış doğal soru. */
  confirm?: { field: SingleId; options: string[]; question?: string }[];
  /** Seçeneklerde olmayan kanallar (ör. Trendyol) — eşlenmez, bağlamda saklanır. */
  otherChannels?: { name: string; status: 'current' | 'planned' | 'unclear' }[];
  reply: string;
};

/** Sağlayıcıya verilen JSON şeması (yalnızca desteklenen anahtar kelimeler: enum, items, maxItems…). */
export function aiResponseSchema() {
  const enumStr = (values: readonly string[]) => ({ type: 'string', enum: [...values] });
  const certainty = { type: 'string', enum: ['explicit', 'uncertain'], description: 'explicit only if the visitor states it plainly without hedging.' };
  const quote = { type: 'string', description: 'Exact verbatim fragment copied from the latest message that supports this item.' };
  return {
    type: 'object',
    properties: {
      facts: {
        type: 'array',
        description: 'Single-choice answers and context stated in the LATEST message. Omit anything not mentioned.',
        maxItems: AI_LIMITS.items,
        items: {
          type: 'object',
          properties: {
            field: enumStr([...SINGLE_IDS, ...CONTEXT_FIELDS]),
            value: { type: 'string', description: 'Exact option string for analysis fields; plain text for product/targetMarket; selling|new|brand for start.' },
            certainty,
            quote,
          },
          required: ['field', 'value', 'certainty', 'quote'],
        },
      },
      channels: {
        type: 'array',
        description: 'Every sales channel mentioned in the LATEST message, each with its status.',
        maxItems: MODEL_CHANNELS.length,
        items: {
          type: 'object',
          properties: {
            channel: enumStr(MODEL_CHANNELS),
            status: { type: 'string', enum: [...CHANNEL_STATUS], description: 'current = sells there today; planned = wants/considers; negated = says they do not; unclear = cannot tell.' },
            certainty,
            quote,
          },
          required: ['channel', 'status', 'certainty', 'quote'],
        },
      },
      otherChannels: {
        type: 'array',
        description: 'Sales channels mentioned in the LATEST message that are NOT in the channel list (e.g. Trendyol, Hepsiburada).',
        maxItems: AI_LIMITS.others,
        items: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Channel name as the visitor wrote it, without suffix (e.g. "Trendyol").' },
            status: { type: 'string', enum: ['current', 'planned', 'unclear'] },
            certainty,
            quote,
          },
          required: ['name', 'status', 'certainty', 'quote'],
        },
      },
      clarify: {
        type: 'object',
        description: 'Optional: the single most important open analysis field the latest message points to but leaves ambiguous between 2-3 options.',
        properties: {
          field: enumStr(SINGLE_IDS),
          options: { type: 'array', items: { type: 'string' }, maxItems: 3, description: 'Exact option strings of that field.' },
          question: { type: 'string', description: 'One short natural Turkish question that tells these options apart, ending with "?".' },
        },
        required: ['field', 'options', 'question'],
      },
      clear: { type: 'array', description: 'Answers the visitor explicitly withdrew, with no replacement.', items: enumStr(QUESTION_IDS), maxItems: QUESTION_IDS.length },
      reply: { type: 'string', description: 'At most one or two short Turkish sentences, or empty. No question, no praise, no restating.' },
    },
    required: ['reply'],
  };
}

const isObj = (v: unknown): v is Record<string, unknown> => Boolean(v) && typeof v === 'object' && !Array.isArray(v);
const clean = (s: string) => s.replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim();
const norm = (s: string) =>
  clean(s)
    .toLocaleLowerCase('tr-TR')
    .replace(/[’‘`´]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/^[\s.,;:!?"'-]+|[\s.,;:!?"'-]+$/g, '');

// Deterministik dil sinyalleri (alıntı üzerinde).
const HEDGE = /belki|galiba|sanırım|sanirim|herhalde|muhtemelen|olabilir|emin değil|bilmiyorum|belli değil|kararsız|henüz karar/;
const PRESENT_SELL = /sat[ıi]yor|sat[ıi]ş yap[ıi]yor|sat[ıi]ş(?:[ıi]m[ıi]z|[ıi]m|lar[ıi]m[ıi]z?)? var|mağaza(?:m|m[ıi]z)?(?: da)? var|üzerinden sat|satmaktay/;
const INTENT = /düşün|planl|istiyor|isterim|isteriz|hedef|açmak|açılmak|açaca|başlayaca|başlamak|geçmek|geçece|sataca|satmay|satmak/;
const NEGATION = /satm[ıi]yor|sat[ıi]ş yapm[ıi]yor|değil|\byok\b|b[ıi]rakt|kapatt/;
const NO_SALES = /(?:hiç|henüz) sat[ıi]ş\S* yok|sat[ıi]ş(?:[ıi]m[ıi]z|[ıi]m)? yok|sat[ıi]ş yapm[ıi]yor|hiçbir yerde sat/;
// Kanalda bugün var olma (mağaza açılmış/kurulmuş, "Trendyol'dayım"): satış gelmese de mevcut kanaldır.
const PRESENCE = /\baçt[ıi](?:m|k)\b|\bkurdu(?:m|k)\b|mağazam|mağazam[ıi]z|sitem(?:iz)? var|'(?:d|t)[ae]y[ıi](?:m|z)\b/;
const CHANNEL_NAME: Record<string, RegExp> = {
  Amazon: /amazon/,
  Etsy: /etsy/,
  eBay: /ebay/,
  'Shopify / Kendi Web Sitem': /shopify|web ?site|kendi site|e-?ticaret site/,
  'B2B / Toptan': /b2b|toptan/,
  'Sosyal Medya': /sosyal medya|[ıi]nstagram|t[ıi]kt[oö]k|facebook/,
  [NO_SALES_CHANNEL]: /./,
};

// Fiyat/garanti/yüzde/tutar içeren ve bunu REDDETMEYEN cümle düşer (model talimata uymazsa ikinci savunma).
const RISKY = /garanti|%\s*\d|\d+\s*%|fiyat|ücret|indirim|\d[\d.,]*\s*(?:tl|₺|\$|€|dolar|euro)\b/i;
const REFUSAL = /verem|vermiyor|veremiyor|yapam|edemem|sunam|söyleyemem|paylaşam|bilgi veremem|değerlendirir/i;

// Kalıp övgü/dolgu (model talimata uymazsa deterministik temizlik): cümle başındaki övgü atılır.
const PRAISE = /^(?:harika|mükemmel|süper|çok güzel|muhteşem|şahane|tebrikler|teşekkürler|teşekkür ederim|anladım|tamam|çok iyi)\b[\s!.,…:-]*/i;

const plainText = (raw: string) =>
  clean(raw.replace(/<[^>]*>/g, ' '))
    .replace(/https?:\/\/\S+|www\.\S+/gi, '')
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s+([.!?,])/g, '$1');

/** Model yanıt metni: düz metin, etiketsiz, bağlantısız, soru cümlesiz, övgüsüz, sınırlı uzunlukta (cümle sınırında). */
export function sanitizeReply(raw: string): string {
  const text = plainText(raw);
  const sentences = text.match(/[^.!?…]+[.!?…]*/g) ?? [];
  let out = '';
  for (const s0 of sentences.map((x) => x.trim()).filter(Boolean)) {
    const stripped = s0.replace(PRAISE, '').trim();
    if (!/\p{L}{2}/u.test(stripped)) continue; // yalnız övgüden ibaret cümle
    const s = stripped[0].toLocaleUpperCase('tr-TR') + stripped.slice(1);
    if (s.endsWith('?')) continue; // soruyu uygulama sorar
    if (RISKY.test(s) && !REFUSAL.test(s)) continue;
    const next = out ? `${out} ${s}` : s;
    if (next.length > AI_LIMITS.reply) break;
    out = next;
  }
  return out;
}

/**
 * Modelin önerdiği netleştirme sorusu: tek cümle, soru işaretiyle biten, bağlantısız, fiyat/garanti/tutar
 * içermeyen, sınırlı uzunlukta metin. Uymazsa undefined (uygulama şablon soruyu kullanır).
 */
export function sanitizeQuestion(raw: unknown): string | undefined {
  if (typeof raw !== 'string') return undefined;
  const q = plainText(raw).replace(PRAISE, '').trim();
  if (q.length < 8 || q.length > AI_LIMITS.clarifyQuestion || !q.endsWith('?')) return undefined;
  if ((q.match(/[.!?…]/g) ?? []).length !== 1 || RISKY.test(q)) return undefined;
  return q[0].toLocaleUpperCase('tr-TR') + q.slice(1);
}

/** Listede olmayan kanal adı: kısa, harf/rakam; bilinen bir kanal adıysa (eşlemeyi atlatma) kabul edilmez. */
function otherChannelName(raw: unknown): string | undefined {
  if (typeof raw !== 'string') return undefined;
  const name = clean(raw).replace(/['’].*$/, '');
  if (name.length < 2 || name.length > AI_LIMITS.otherName || !/^[\p{L}\p{N} .&-]+$/u.test(name)) return undefined;
  const n = norm(name).replace(/ı/g, 'i');
  if (Object.entries(CHANNEL_NAME).some(([ch, re]) => ch !== NO_SALES_CHANNEL && re.test(n))) return undefined;
  return name;
}

export type InterpretContext = { message: string; step: TurnStep; knownChannels: string[]; answered?: QuestionId[] };

/**
 * Güvenilmeyen model çıktısını yorumlar. Nesne değilse veya `reply` metin değilse null (geçersiz çıktı).
 * Yalnızca açık + mesajda dayanağı olan + çekincesiz bilgiler cevaba yazılır; belirsizler sorulur.
 */
export function interpretModelOutput(raw: unknown, ctx: InterpretContext): GloAiResult | null {
  if (!isObj(raw) || typeof raw.reply !== 'string') return null;
  const out: GloAiResult = { answers: {}, clear: [], reply: sanitizeReply(raw.reply) };
  const msg = norm(ctx.message);
  const grounded = (q: unknown): q is string => typeof q === 'string' && q.length <= AI_LIMITS.quote && norm(q).length > 1 && msg.includes(norm(q));
  const confirm: NonNullable<GloAiResult['confirm']> = [];

  // --- Tekil alanlar ve bağlam
  for (const f of Array.isArray(raw.facts) ? raw.facts.slice(0, AI_LIMITS.items) : []) {
    if (!isObj(f) || typeof f.field !== 'string' || typeof f.value !== 'string') continue;
    const q = grounded(f.quote) ? norm(f.quote as string) : null;
    const sure = f.certainty === 'explicit' && q !== null && !HEDGE.test(q);
    if ((SINGLE_IDS as string[]).includes(f.field)) {
      const id = f.field as SingleId;
      if (!Q[id].options.includes(f.value)) continue;
      // tutar alanları: alıntıda rakam ya da "yok/belirlemedik/paylaşmak" türü dayanak şart
      const amountOk = (id !== 'salesVolume' && id !== 'budget') || (q !== null && /\d|yok|belirle|paylaş|henüz/.test(q));
      // Dayanaksız tutar ("ciromuz iyi") onaya bile sunulmaz: aralık önermek tutar uydurmak olur; alan sonra sorulur.
      if (sure && amountOk) out.answers[id] = f.value;
      else if (q !== null && amountOk && !confirm.some((c) => c.field === id)) confirm.push({ field: id, options: [f.value] });
    } else if (sure && f.field === 'product') {
      const p = clean(f.value).replace(/[<>]/g, '');
      if (p && p.length <= AI_LIMITS.product) out.product = p;
    } else if (sure && f.field === 'targetMarket') {
      const m = clean(f.value);
      if (m.length > 1 && m.length <= AI_LIMITS.market && /^[\p{L} .'’-]+$/u.test(m) && INTENT.test(q!)) {
        out.targetMarkets = [...new Set([...(out.targetMarkets ?? []), m])].slice(0, AI_LIMITS.markets);
      }
    } else if (sure && f.field === 'start' && (STARTS as string[]).includes(f.value)) {
      out.start = f.value as GloStart;
    }
  }

  // --- Kanallar
  // Soru açıkça mevcut kanalları soruyorsa çekincesiz alıntıdaki fiilsiz kanal adı mevcut sayılır
  // (ör. "Amazon ve belki Etsy" → Amazon kesin, Etsy netleştirilir). Çekince alıntı düzeyinde aranır.
  const channelContext = ctx.step === 'channels';
  let current = ctx.knownChannels.filter((c) => c !== NO_SALES_CHANNEL);
  let noSales = ctx.knownChannels.length === 1 && ctx.knownChannels[0] === NO_SALES_CHANNEL;
  let channelsTouched = false;
  const planned: string[] = [];
  const unclear: string[] = [];
  for (const c of Array.isArray(raw.channels) ? raw.channels.slice(0, MODEL_CHANNELS.length) : []) {
    if (!isObj(c) || typeof c.channel !== 'string' || !MODEL_CHANNELS.includes(c.channel)) continue;
    const ch = c.channel;
    const q = grounded(c.quote) ? norm(c.quote as string) : null;
    if (q === null || !CHANNEL_NAME[ch].test(q.replace(/ı/g, 'i'))) {
      if (ch !== NO_SALES_CHANNEL && msg.replace(/ı/g, 'i').match(CHANNEL_NAME[ch])) unclear.push(ch); // adı geçiyor ama dayanak yok
      continue;
    }
    const hedged = HEDGE.test(q) || c.certainty !== 'explicit';
    if (ch === NO_SALES_CHANNEL) {
      if (c.status === 'current' && !hedged && NO_SALES.test(q)) {
        noSales = true;
        current = [];
        channelsTouched = true;
      }
      continue;
    }
    if (c.status === 'negated' && !hedged && NEGATION.test(q)) {
      if (current.includes(ch)) {
        current = current.filter((x) => x !== ch);
        channelsTouched = true;
      }
    } else if (
      c.status === 'current' &&
      !hedged &&
      (PRESENT_SELL.test(q) || (PRESENCE.test(q) && !NEGATION.test(q)) || (channelContext && !INTENT.test(q) && !NEGATION.test(q)))
    ) {
      if (!current.includes(ch)) current.push(ch);
      noSales = false;
      channelsTouched = true;
    } else if (c.status === 'planned' && !hedged && INTENT.test(q)) {
      planned.push(ch);
    } else if (c.status !== 'negated') {
      unclear.push(ch); // belirsiz, çekinceli ya da dayanaksız → sor
    }
  }
  if (channelsTouched) {
    if (current.length) out.answers.channels = current;
    else if (noSales) out.answers.channels = [NO_SALES_CHANNEL];
    else out.clear.push('channels'); // tek mevcut kanal olumsuzlandı → kanal yeniden sorulur
  }
  const finalCurrent = out.answers.channels ?? current;
  const plannedOk = [...new Set(planned)].filter((c) => !finalCurrent.includes(c));
  if (plannedOk.length) out.targetChannels = plannedOk;
  const unclearOk = [...new Set(unclear)].filter((c) => !finalCurrent.includes(c) && !plannedOk.includes(c));
  if (unclearOk.length) out.unclearChannels = unclearOk;

  if (Array.isArray(raw.clear)) {
    for (const c of raw.clear) {
      if (typeof c === 'string' && (QUESTION_IDS as string[]).includes(c) && !(c in out.answers) && !out.clear.includes(c as QuestionId)) out.clear.push(c as QuestionId);
    }
  }
  // --- Listede olmayan kanallar: eşlenmez; durum alıntıdaki dil sinyaliyle belirlenir, aksi hâlde "unclear".
  const others: NonNullable<GloAiResult['otherChannels']> = [];
  for (const o of Array.isArray(raw.otherChannels) ? raw.otherChannels.slice(0, AI_LIMITS.others) : []) {
    if (!isObj(o)) continue;
    const name = otherChannelName(o.name);
    const q = grounded(o.quote) ? norm(o.quote as string) : null;
    if (!name || q === null || !msg.includes(norm(name)) || others.some((x) => norm(x.name) === norm(name))) continue;
    const hedged = HEDGE.test(q) || o.certainty !== 'explicit';
    const status =
      !hedged && o.status === 'current' && !NEGATION.test(q) && (PRESENT_SELL.test(q) || PRESENCE.test(q))
        ? 'current'
        : !hedged && o.status === 'planned' && INTENT.test(q)
          ? 'planned'
          : o.status === 'current' || o.status === 'planned' || o.status === 'unclear'
            ? 'unclear'
            : null;
    if (status) others.push({ name, status });
  }
  if (others.length) out.otherChannels = others;
  // Listede olmayan kanalda bugün satış açıkça söylendiyse analiz cevabına yalnız "Diğer" eklenir (Amazon/Etsy
  // gibi bir kanala eşlenmez); böylece kanal sorusu tekrar sorulmaz. "Satışım yok" ile birlikte tutulmaz.
  if (others.some((o) => o.status === 'current')) {
    const base = (out.answers.channels ?? current).filter((c) => c !== NO_SALES_CHANNEL);
    if (!base.includes(OTHER_CHANNEL)) out.answers.channels = [...base, OTHER_CHANNEL];
    out.clear = out.clear.filter((c) => c !== 'channels');
  }

  // --- Doğal netleştirme: açık olmayan tek alan, o alanın 2–3 geçerli seçeneği ve doğrulanmış kısa soru.
  // Zaten cevaplanmış ya da bu mesajda kesinleşmiş alan için sorulmaz. Soru uygun değilse şablon kullanılır.
  const answered = new Set<string>([...(ctx.answered ?? []), ...Object.keys(out.answers)]);
  if (isObj(raw.clarify) && typeof raw.clarify.field === 'string' && (SINGLE_IDS as string[]).includes(raw.clarify.field) && !answered.has(raw.clarify.field)) {
    const id = raw.clarify.field as SingleId;
    const options = [...new Set(Array.isArray(raw.clarify.options) ? raw.clarify.options : [])].filter((o): o is string => typeof o === 'string' && Q[id].options.includes(o)).slice(0, 3);
    if (options.length >= 2) {
      const rest = confirm.filter((c) => c.field !== id);
      confirm.length = 0;
      confirm.push({ field: id, options, question: sanitizeQuestion(raw.clarify.question) }, ...rest);
    }
  }

  if (confirm.length) out.confirm = confirm.filter((c) => !(c.field in out.answers) && !(ctx.answered ?? []).includes(c.field));
  return out;
}

/** İstemci tarafı: sunucudan gelen yorumlanmış sonucun biçimini yeniden doğrular (güvenilmeyen ağ verisi). */
export function checkAiResult(raw: unknown): GloAiResult | null {
  if (!isObj(raw) || typeof raw.reply !== 'string' || !isObj(raw.answers)) return null;
  const out: GloAiResult = { answers: {}, clear: [], reply: sanitizeReply(raw.reply) };
  for (const id of SINGLE_IDS) {
    const v = raw.answers[id];
    if (typeof v === 'string' && Q[id].options.includes(v)) out.answers[id] = v;
  }
  const ch = raw.answers.channels;
  if (Array.isArray(ch) && ch.length && ch.every((c) => typeof c === 'string' && CHANNEL_OPTIONS.includes(c))) {
    const list = [...new Set(ch as string[])];
    if (!(list.includes(NO_SALES_CHANNEL) && list.length > 1)) out.answers.channels = list;
  }
  if (Array.isArray(raw.clear)) out.clear = raw.clear.filter((c): c is QuestionId => typeof c === 'string' && (QUESTION_IDS as string[]).includes(c));
  if (typeof raw.start === 'string' && (STARTS as string[]).includes(raw.start)) out.start = raw.start as GloStart;
  if (typeof raw.product === 'string' && raw.product.length <= AI_LIMITS.product) out.product = clean(raw.product);
  const chList = (v: unknown) => (Array.isArray(v) ? v.filter((c): c is string => typeof c === 'string' && REAL_CHANNELS.includes(c)) : []);
  if (chList(raw.targetChannels).length) out.targetChannels = chList(raw.targetChannels);
  if (chList(raw.unclearChannels).length) out.unclearChannels = chList(raw.unclearChannels);
  if (Array.isArray(raw.targetMarkets)) {
    const m = raw.targetMarkets.filter((x): x is string => typeof x === 'string' && x.length <= AI_LIMITS.market).slice(0, AI_LIMITS.markets);
    if (m.length) out.targetMarkets = m;
  }
  if (Array.isArray(raw.confirm)) {
    const c = raw.confirm
      .filter((x): x is { field: SingleId; options: string[] } => isObj(x) && (SINGLE_IDS as unknown[]).includes(x.field) && Array.isArray(x.options))
      .map((x) => ({
        field: x.field,
        options: x.options.filter((o) => typeof o === 'string' && Q[x.field].options.includes(o)).slice(0, 4),
        question: sanitizeQuestion((x as { question?: unknown }).question),
      }))
      .filter((x) => x.options.length > 0);
    if (c.length) out.confirm = c;
  }
  if (Array.isArray(raw.otherChannels)) {
    const o = raw.otherChannels
      .filter(isObj)
      .map((x) => ({ name: otherChannelName(x.name), status: x.status }))
      .filter((x): x is { name: string; status: 'current' | 'planned' | 'unclear' } => Boolean(x.name) && (x.status === 'current' || x.status === 'planned' || x.status === 'unclear'))
      .slice(0, AI_LIMITS.others);
    if (o.length) out.otherChannels = o;
  }
  return out;
}

// ---------------------------------------------------------------------------
// İstemci → sunucu isteği
// ---------------------------------------------------------------------------
export type GloTurnRequest = {
  message: string;
  step: TurnStep;
  question: string;
  answers: Answers;
  context: { start?: GloStart; product?: string; targetChannels: string[]; targetMarkets: string[] };
  history: { from: 'glo' | 'user'; text: string }[];
};

/** Sunucu tarafı istek doğrulaması. İletişim formu alanları sözleşmede yok; bilinmeyen anahtarlar düşer. */
export function parseTurnRequest(raw: unknown): GloTurnRequest | null {
  if (!isObj(raw)) return null;
  const message = typeof raw.message === 'string' ? raw.message.trim() : '';
  if (!message || message.length > AI_LIMITS.message) return null;
  const step = typeof raw.step === 'string' && (STEPS as readonly string[]).includes(raw.step) ? (raw.step as TurnStep) : 'start';
  const question = typeof raw.question === 'string' ? clean(raw.question).slice(0, AI_LIMITS.question) : '';
  const answers: Answers = {};
  if (isObj(raw.answers)) {
    for (const q of questions) {
      const v = raw.answers[q.id];
      if (q.multi) {
        if (Array.isArray(v) && v.length && v.every((x) => typeof x === 'string' && q.options.includes(x))) answers[q.id] = [...new Set(v as string[])];
      } else if (typeof v === 'string' && q.options.includes(v)) answers[q.id] = v;
    }
  }
  const ctx = isObj(raw.context) ? raw.context : {};
  const strList = (v: unknown, max: number) =>
    Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string').map(clean).filter((x) => x && x.length <= AI_LIMITS.market).slice(0, max) : [];
  const context = {
    start: typeof ctx.start === 'string' && (STARTS as string[]).includes(ctx.start) ? (ctx.start as GloStart) : undefined,
    product: typeof ctx.product === 'string' ? clean(ctx.product).slice(0, AI_LIMITS.product) || undefined : undefined,
    targetChannels: strList(ctx.targetChannels, REAL_CHANNELS.length),
    targetMarkets: strList(ctx.targetMarkets, AI_LIMITS.markets),
  };
  if (raw.history !== undefined && !Array.isArray(raw.history)) return null;
  const history = ((raw.history as unknown[]) ?? [])
    .slice(-AI_LIMITS.historyItems)
    .filter((h): h is { from: 'glo' | 'user'; text: string } => isObj(h) && (h.from === 'glo' || h.from === 'user') && typeof h.text === 'string')
    .map((h) => ({ from: h.from, text: clean(h.text).slice(0, AI_LIMITS.historyText) }));
  return { message, step, question, answers, context, history };
}

/**
 * Sağlayıcıya gitmeden önce açık iletişim bilgilerini maskeler (e-posta, telefon benzeri rakam dizileri,
 * web adresleri). Tüm kişisel verileri temizlediği iddia edilmez — yalnızca bariz kalıplar.
 */
export function maskContact(text: string): string {
  return text
    .replace(/[\p{L}\p{N}._%+-]+@[\p{L}\p{N}.-]+\.[\p{L}]{2,}/gu, '[e-posta]')
    .replace(/(?:\+?\d[\s().-]*){10,}/g, (m) => (m.replace(/\D/g, '').length >= 10 ? '[telefon] ' : m))
    .replace(/https?:\/\/\S+|www\.\S+/gi, '[bağlantı]')
    .replace(/\s+$/g, '');
}
