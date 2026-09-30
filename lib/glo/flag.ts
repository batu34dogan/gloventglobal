// Glo'nun hangi yüzeyle çalıştığını belirleyen SUNUCU tarafı karar. Yalnızca server component'lerden ve route
// handler'lardan çağrılır; client'a yalnızca mod adı iner (anahtar/değer asla). Statik sayfalarda build sırasında
// okunur: canlıda sağlayıcı anahtarı eklenir/kaldırılırsa yeni bir deploy gerekir.
//
// Yüzeyler:
// - 'live'      Vercel (production/preview) — ERKEN ERİŞİM, varsayılan açık. GLO_EARLY_ACCESS=0 ile kapatılır.
//               Glo karşılaması herkese açılır; başvuru ve analitik normal akıştaki gibi çalışır.
// - 'prototype' Yalnız yerel (GLO_PROTOTYPE=1, ayrıca istemcide ?glo=1): test/prototip; başvuru gönderilmez.
// - 'off'       Glo yok, normal analiz akışı.
// Yerelde canlı davranışı denemek için GLO_EARLY_ACCESS=1 kullanılabilir.
type Env = Record<string, string | undefined>;

export type GloSurface = 'off' | 'prototype' | 'live';
export type GloAiMode = 'off' | 'gemini' | 'mock';

const onVercel = (env: Env) => env.VERCEL_ENV === 'production' || env.VERCEL_ENV === 'preview';

export function gloSurface(env: Env = process.env): GloSurface {
  if (onVercel(env)) return env.GLO_EARLY_ACCESS === '0' ? 'off' : 'live';
  if (env.GLO_PROTOTYPE === '1') return 'prototype';
  if (env.GLO_EARLY_ACCESS === '1') return 'live';
  return 'off';
}

/**
 * AI sohbet modu. Canlıda yalnız gerçek sağlayıcı (sunucuda GEMINI_API_KEY varsa; GLO_AI=0 ile kapatılır) —
 * test sağlayıcısı canlıda asla seçilmez; anahtar yoksa 'off' (Glo karşılaması → normal form, yapay yanıt yok).
 * Yerel prototipte GLO_AI=1 gerekir; GLO_PROVIDER=mock yalnız burada geçerlidir.
 */
export function gloAiMode(env: Env = process.env): GloAiMode {
  const surface = gloSurface(env);
  if (surface === 'off') return 'off';
  if (surface === 'live') return env.GLO_AI !== '0' && env.GEMINI_API_KEY ? 'gemini' : 'off';
  if (env.GLO_AI !== '1') return 'off';
  if (env.GLO_PROVIDER === 'mock') return 'mock';
  return env.GEMINI_API_KEY ? 'gemini' : 'off';
}
