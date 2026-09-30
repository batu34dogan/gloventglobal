// Glo AI — SUNUCU tarafı sağlayıcılar. Sağlayıcıdan bağımsız arayüz; varsayılan Gemini (Interactions API,
// resmî REST: POST https://generativelanguage.googleapis.com/v1beta/interactions). Anahtar yalnızca
// sunucu ortamından okunur ve hiçbir yere yazılmaz. `mock` yalnızca yerel testler içindir.

export type ProviderUsage = { input?: number; output?: number; thought?: number; total?: number };
export type ProviderResult = { text: string; usage?: ProviderUsage };
export type ProviderRequest = {
  system: string;
  input: string;
  schema: object;
  maxOutputTokens: number;
  signal: AbortSignal;
  /** Yanıt başlıkları geldiğinde (ms) — zaman aşımında "başlık hiç gelmedi" ile "gövde okunurken kesildi"yi ayırmak için. */
  onHeaders?: (ms: number) => void;
};
export type GloProvider = { name: 'gemini' | 'mock'; model: string; generate: (req: ProviderRequest) => Promise<ProviderResult> };

/** Sağlayıcı hatasının içeriksiz özeti (HTTP kodu, Google hata durumu, kota kimliği, Retry-After) — yerel tanı. */
export type ProviderErrorDetail = {
  httpStatus?: number;
  googleStatus?: string;
  quotaIds?: string[];
  retryAfter?: string;
  /** Sağlayıcının hata mesajı (kısaltılmış; anahtar benzeri diziler maskelenir) — yalnız yerel tanı. */
  providerMessage?: string;
  /** Yanıt başlığındaki istek kimliği (varsa). */
  requestId?: string;
  /** Zaman aşımında: yanıt başlıklarının geldiği an (ms); yoksa başlık hiç gelmedi. */
  headersMs?: number;
};

export class ProviderError extends Error {
  kind: 'quota' | 'upstream' | 'invalid_output';
  status?: number;
  detail?: ProviderErrorDetail;
  constructor(kind: ProviderError['kind'], status?: number, detail?: ProviderErrorDetail) {
    super(kind);
    this.kind = kind;
    this.status = status;
    this.detail = detail;
  }
}

async function errorDetail(res: Response): Promise<ProviderErrorDetail> {
  const body = (await res.json().catch(() => null)) as { error?: { status?: unknown; details?: unknown; message?: unknown } } | null;
  const message =
    typeof body?.error?.message === 'string'
      ? body.error.message
          .replace(/AIza[\w-]{10,}/g, '[anahtar]')
          .replace(/[A-Za-z0-9_-]{32,}/g, '[gizli]')
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, 200)
      : undefined;
  const requestId = ['x-request-id', 'x-goog-request-id', 'x-cloud-trace-context'].map((h) => res.headers.get(h)).find(Boolean) ?? undefined;
  const quotaIds = Array.isArray(body?.error?.details)
    ? body.error.details.flatMap((d: { violations?: { quotaId?: unknown }[] }) =>
        (d?.violations ?? []).map((v) => v?.quotaId).filter((q): q is string => typeof q === 'string'),
      )
    : [];
  return {
    httpStatus: res.status,
    googleStatus: typeof body?.error?.status === 'string' ? body.error.status : undefined,
    quotaIds: quotaIds.length ? quotaIds.slice(0, 3) : undefined,
    retryAfter: res.headers.get('retry-after') ?? undefined,
    providerMessage: message || undefined,
    requestId: requestId?.slice(0, 80),
  };
}

export const DEFAULT_GLO_MODEL = 'gemini-3.8-flash';
const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/interactions';

export function geminiProvider(apiKey: string, model: string): GloProvider {
  return {
    name: 'gemini',
    model,
    async generate({ system, input, schema, maxOutputTokens, signal, onHeaders }) {
      const t0 = Date.now();
      const res = await fetch(GEMINI_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
        body: JSON.stringify({
          model,
          input,
          system_instruction: system,
          generation_config: { max_output_tokens: maxOutputTokens, thinking_level: 'low' },
          response_format: { type: 'text', mime_type: 'application/json', schema },
          store: false, // etkileşim sağlayıcıda saklanmasın (varsayılan true)
        }),
        signal,
      });
      onHeaders?.(Date.now() - t0);
      if (res.status === 429) throw new ProviderError('quota', 429, await errorDetail(res));
      if (!res.ok) throw new ProviderError('upstream', res.status, await errorDetail(res));
      const data = (await res.json().catch(() => null)) as Record<string, unknown> | null;
      if (!data) throw new ProviderError('invalid_output');
      const text = extractText(data);
      if (!text) throw new ProviderError('invalid_output');
      const u = (data.usage ?? {}) as Record<string, unknown>;
      const num = (v: unknown) => (typeof v === 'number' ? v : undefined);
      return {
        text,
        usage: {
          input: num(u.total_input_tokens),
          output: num(u.total_output_tokens),
          thought: num(u.total_thought_tokens),
          total: num(u.total_tokens),
        },
      };
    },
  };
}

/** Yanıttaki model metni: steps[type=model_output].content[type=text] (belgelenen biçim), yedek: output_text. */
function extractText(data: Record<string, unknown>): string {
  if (typeof data.status === 'string' && data.status !== 'completed') return '';
  const parts: string[] = [];
  for (const step of Array.isArray(data.steps) ? data.steps : []) {
    if (!step || typeof step !== 'object' || (step as { type?: unknown }).type !== 'model_output') continue;
    for (const c of ((step as { content?: unknown }).content as unknown[]) ?? []) {
      if (c && typeof c === 'object' && (c as { type?: unknown }).type === 'text' && typeof (c as { text?: unknown }).text === 'string') {
        parts.push((c as { text: string }).text);
      }
    }
  }
  if (parts.length) return parts.join('');
  return typeof data.output_text === 'string' ? data.output_text : '';
}

// ---------------------------------------------------------------------------
// Test sağlayıcısı — gerçek model DEĞİL. Sabit senaryolar + hata/gecikme tetikleyicileri.
// ---------------------------------------------------------------------------
const wait = (ms: number, signal: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const t = setTimeout(resolve, ms);
    signal.addEventListener('abort', () => {
      clearTimeout(t);
      reject(signal.reason ?? new Error('aborted'));
    });
  });

type MockOut = Record<string, unknown>;
// Senaryolar yeni çıktı biçimindedir (facts/channels + certainty + birebir quote). Bilerek "iyimser"
// çıktılar da içerir (ör. "belki" senaryosunda Amazon'u current/explicit döndürür) — kabul kararını
// sunucunun deterministik kuralları verir; testler bunu doğrular.
const MOCK_SCRIPTS: [RegExp, MockOut][] = [
  [
    /zeytinya/i,
    {
      facts: [
        { field: 'businessType', value: 'Üretici / Marka Sahibi', certainty: 'explicit', quote: 'üreticisiyiz' },
        { field: 'salesVolume', value: '100.000 - 500.000 TL', certainty: 'explicit', quote: '300 bin TL' },
        { field: 'goal', value: 'Yeni pazarlara açılmak', certainty: 'explicit', quote: 'açılmak istiyoruz' },
        { field: 'product', value: 'Organik zeytinyağı', certainty: 'explicit', quote: 'Organik zeytinyağı' },
        { field: 'targetMarket', value: 'Almanya', certainty: 'explicit', quote: 'Almanya’ya açılmak istiyoruz' },
        { field: 'start', value: 'selling', certainty: 'explicit', quote: 'satıyoruz' },
      ],
      channels: [{ channel: 'Amazon', status: 'current', certainty: 'explicit', quote: 'Amazon’da satıyoruz' }],
      reply: 'Teşekkürler, paylaştığınız bilgileri not ettim.',
    },
  ],
  [
    /satm[ıi]yorum.*etsy/i,
    {
      channels: [
        { channel: 'Amazon', status: 'negated', certainty: 'explicit', quote: 'Amazon’da satmıyorum' },
        { channel: 'Etsy', status: 'planned', certainty: 'explicit', quote: 'Etsy düşünüyorum' },
      ],
      reply: 'Etsy’yi hedef kanal olarak not ettim; Amazon’u mevcut kanal olarak kaydetmedim.',
    },
  ],
  [
    /belki/i,
    {
      channels: [
        { channel: 'Amazon', status: 'current', certainty: 'explicit', quote: 'Amazon' },
        { channel: 'Etsy', status: 'planned', certainty: 'uncertain', quote: 'belki Etsy' },
      ],
      reply: 'Kanal bilgilerinizi aldım.',
    },
  ],
  [
    /asl[ıi]nda/i,
    {
      channels: [
        { channel: 'Etsy', status: 'negated', certainty: 'explicit', quote: 'Etsy’de değil' },
        { channel: 'Amazon', status: 'current', certainty: 'explicit', quote: 'Amazon’da satıyoruz' },
      ],
      reply: 'Mevcut kanalınızı Amazon olarak güncelledim.',
    },
  ],
  [/galiba/i, { facts: [{ field: 'goal', value: 'Satışları artırmak', certainty: 'explicit', quote: 'galiba satışları artırmak' }], reply: 'Not aldım.' }],
  [/uydurma/i, { facts: [{ field: 'budget', value: '0 - 25.000 TL', certainty: 'explicit', quote: 'ayda 10 bin reklam bütçesi' }], reply: 'Not aldım.' }],
  [/trendyol/i, { reply: 'Trendyol analiz seçenekleri arasında yok; mevcut seçeneklerden size en yakın olanı seçebilirsiniz.' }],
  [/dolar|yılda|yaklaşık iyi/i, { reply: 'Aylık satış hacmini TL aralıklarıyla değerlendiriyorum; uygun aralığı seçeneklerden seçebilirsiniz.' }],
  [/fiyat|garanti/i, { reply: 'Fiyat, garanti veya sonuç bilgisi veremem. Bunları ekibimiz analizden sonra değerlendirir.' }],
  [/talimat|sistem mesaj|rolünü/i, { reply: 'Yalnızca bu ön analiz için yardımcı olabilirim.' }],
];

export function mockProvider(): GloProvider {
  return {
    name: 'mock',
    model: 'mock',
    async generate({ input, signal }) {
      const msg = String((JSON.parse(input) as { message?: unknown }).message ?? '');
      if (msg.includes('[kota]')) throw new ProviderError('quota', 429);
      if (msg.includes('[zaman aşımı]')) await wait(60_000, signal);
      if (msg.includes('[yavaş]')) await wait(4_000, signal);
      if (msg.includes('[bozuk]')) return { text: '{"reply": "yarım' };
      if (msg.includes('[eksik]')) return { text: '{"answers": {"goal": "Uçmak"}}' };
      if (msg.includes('[geçersiz]'))
        return {
          text: JSON.stringify({
            facts: [
              { field: 'goal', value: 'Dünyayı fethetmek', certainty: 'explicit', quote: 'geçersiz' },
              { field: 'budget', value: '0 - 25.000 TL', certainty: 'explicit', quote: 'ayda 10 bin reklam' },
              { field: 'targetMarket', value: '<script>alert(1)</script>', certainty: 'explicit', quote: 'geçersiz' },
            ],
            channels: [{ channel: 'Trendyol', status: 'current', certainty: 'explicit', quote: 'geçersiz' }],
            clear: ['bilinmeyen'],
            reply: '<b>Harika!</b> Size %100 satış garantisi veriyoruz? Detaylar https://ornek.test adresinde.',
          }),
        };
      const hit = MOCK_SCRIPTS.find(([re]) => re.test(msg));
      return { text: JSON.stringify(hit ? hit[1] : { reply: '' }), usage: { input: 0, output: 0 } };
    },
  };
}
