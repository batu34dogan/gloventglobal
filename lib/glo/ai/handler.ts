// Glo AI — SUNUCU tarafı tur işleyicisi (route'tan bağımsız, testlerde doğrudan çağrılır).
// Sıra: ortam kapısı → sağlayıcı yapılandırması → hız/eşzamanlılık/toplam çağrı sınırı → gövde doğrulama →
// maskeleme → sağlayıcı (timeout + istemci iptali) → çıktı doğrulama. Mesaj/yanıt/kişisel veri loglanmaz.
// Sınırlar tek süreç belleğindedir: YEREL deneme içindir, production için dağıtık maliyet koruması değildir.
import { gloAiMode, gloSurface } from '@/lib/glo/flag';
import { createRateLimiter } from '@/lib/leads/server';
import { GLO_SYSTEM_INSTRUCTION, buildModelInput } from './prompt';
import { DEFAULT_GLO_MODEL, ProviderError, geminiProvider, mockProvider, type GloProvider, type ProviderErrorDetail, type ProviderUsage } from './providers';
import { AI_LIMITS, aiResponseSchema, interpretModelOutput, maskContact, parseTurnRequest, type GloAiResult } from './schema';

type Env = Record<string, string | undefined>;

export const AI_RUNTIME_DEFAULTS = {
  maxOutputTokens: 800,
  // Gerçek ölçümler (gemini-3.8-flash): basit metin isteği ~8 sn; başarılı Glo çağrıları 4–7 sn — yalnız kısa, tek bilgili
  // mesajlarla. Çok bilgili mesajla henüz başarılı gerçek çağrı yok. 12 sn geçerli yanıtları kesebilirdi.
  timeoutMs: 20_000,
  maxCalls: 40, // süreç başına toplam sağlayıcı çağrısı (GLO_AI_MAX_CALLS ile düşürülebilir/yükseltilebilir)
  perIp: { windowMs: 10 * 60_000, max: 20 },
};

export type GloRuntime = { calls: number; inFlight: Set<string>; isRateLimited: (ip: string) => boolean };
export const createRuntime = (): GloRuntime => ({ calls: 0, inFlight: new Set(), isRateLimited: createRateLimiter(AI_RUNTIME_DEFAULTS.perIp) });
const sharedRuntime = createRuntime();

export type TurnResponse =
  | { status: 200; body: { result: GloAiResult; provider: GloProvider['name']; model: string; usage?: ProviderUsage; trace?: { modelFacts: number; modelChannels: number; acceptedFields: number; pending: number } } }
  | { status: 400 | 404 | 413 | 429 | 502 | 503 | 504; body: { error: string; detail?: ProviderErrorDetail } };

const intEnv = (v: string | undefined, def: number, min: number, max: number) => {
  const n = Number(v);
  return Number.isFinite(n) && n >= min && n <= max ? Math.floor(n) : def;
};

export async function handleGloTurn(
  input: { body: unknown; ip: string; signal?: AbortSignal; bodyTooLarge?: boolean },
  deps: { env?: Env; provider?: GloProvider; runtime?: GloRuntime } = {},
): Promise<TurnResponse> {
  const env = deps.env ?? process.env;
  const runtime = deps.runtime ?? sharedRuntime;
  const surface = gloSurface(env);
  const mode = gloAiMode(env);
  // Canlı erken erişim: AI yalnız gerçek sağlayıcı anahtarı varken (GLO_AI=0 ile kapatılır; test sağlayıcısı yok).
  // Yerel prototip: GLO_AI=1 gerekir. Glo kapalıysa sağlayıcıya hiç gidilmez.
  const aiRequested = surface === 'live' ? env.GLO_AI !== '0' : surface === 'prototype' && env.GLO_AI === '1';
  if (!aiRequested) return { status: 404, body: { error: 'disabled' } };
  if (mode === 'off') return { status: 503, body: { error: 'not_configured' } }; // açık ama anahtar yok
  // Vercel'de (canlı) içeriksiz tanı ve token sayıları istemciye döndürülmez.
  const local = env.VERCEL_ENV !== 'production' && env.VERCEL_ENV !== 'preview';

  const provider =
    deps.provider ?? (mode === 'mock' ? mockProvider() : geminiProvider(env.GEMINI_API_KEY as string, env.GLO_MODEL?.trim() || DEFAULT_GLO_MODEL));

  if (input.bodyTooLarge) return { status: 413, body: { error: 'too_large' } };
  const req = parseTurnRequest(input.body);
  if (!req) return { status: 400, body: { error: 'invalid_request' } };

  if (runtime.isRateLimited(input.ip)) return { status: 429, body: { error: 'rate_limited' } };
  if (runtime.inFlight.has(input.ip)) return { status: 429, body: { error: 'busy' } };
  const maxCalls = intEnv(env.GLO_AI_MAX_CALLS, AI_RUNTIME_DEFAULTS.maxCalls, 0, 1000);
  if (runtime.calls >= maxCalls) return { status: 429, body: { error: 'budget_exhausted' } };

  const timeoutMs = intEnv(env.GLO_AI_TIMEOUT_MS, AI_RUNTIME_DEFAULTS.timeoutMs, 1000, 30_000);
  const timeout = new AbortController();
  const timer = setTimeout(() => timeout.abort(new Error('timeout')), timeoutMs);
  const signal = AbortSignal.any([timeout.signal, ...(input.signal ? [input.signal] : [])]);

  runtime.calls += 1;
  runtime.inFlight.add(input.ip);
  let headersMs: number | undefined; // yerel tanı: zaman aşımında başlık gelmiş miydi
  try {
    const out = await provider.generate({
      system: GLO_SYSTEM_INSTRUCTION,
      input: buildModelInput(req),
      schema: aiResponseSchema(),
      maxOutputTokens: AI_RUNTIME_DEFAULTS.maxOutputTokens,
      signal,
      onHeaders: (ms) => {
        headersMs = ms;
      },
    });
    let parsed: unknown;
    try {
      parsed = JSON.parse(out.text);
    } catch {
      return { status: 502, body: { error: 'invalid_output' } };
    }
    // Dayanak (alıntı) kontrolü maskelenmiş mesaja karşı yapılır — modele giden metnin aynısı.
    const known = req.answers.channels;
    const result = interpretModelOutput(parsed, {
      message: maskContact(req.message),
      step: req.step,
      knownChannels: Array.isArray(known) ? known : [],
      answered: (Object.keys(req.answers) as (keyof typeof req.answers)[]).filter((k) => req.answers[k] !== undefined),
    });
    if (!result) return { status: 502, body: { error: 'invalid_output' } };
    // Yerel tanı (GLO_AI_TRACE=1): yalnız içeriksiz sayılar — değer, alıntı veya mesaj yok.
    const p = parsed as { facts?: unknown; channels?: unknown };
    const trace =
      env.GLO_AI_TRACE === '1'
        ? {
            modelFacts: Array.isArray(p.facts) ? p.facts.length : 0,
            modelChannels: Array.isArray(p.channels) ? p.channels.length : 0,
            acceptedFields: Object.keys(result.answers).length,
            pending: (result.unclearChannels?.length ?? 0) + (result.confirm?.length ?? 0),
          }
        : undefined;
    return { status: 200, body: { result, provider: provider.name, model: provider.model, usage: local ? out.usage : undefined, trace } };
  } catch (e) {
    if (e instanceof ProviderError) {
      // detail: yalnız içeriksiz tanı (HTTP/Google durum kodu, kota kimliği) — mesaj veya anahtar içermez
      if (e.kind === 'quota') return { status: 503, body: { error: 'quota', detail: local ? e.detail : undefined } };
      if (e.kind === 'invalid_output') return { status: 502, body: { error: 'invalid_output' } };
      return { status: 502, body: { error: 'upstream', detail: local ? e.detail : undefined } };
    }
    // Yerelde: headersMs yoksa yanıt başlıkları süre içinde hiç gelmedi; varsa gövde okunurken kesildi.
    if (signal.aborted) return { status: 504, body: { error: input.signal?.aborted ? 'cancelled' : 'timeout', detail: local ? { headersMs } : undefined } };
    return { status: 502, body: { error: 'upstream' } };
  } finally {
    clearTimeout(timer);
    runtime.inFlight.delete(input.ip);
  }
}

export { AI_LIMITS };
