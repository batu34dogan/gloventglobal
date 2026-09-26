// Lead endpoint'leri (/api/analysis-lead, /api/contact-lead) için ortak SERVER-ONLY yardımcılar.
// Yalnızca route handler'lardan import edilmeli — client bundle'a girmemeli (webhook env'leri burada
// okunmuyor, çağıran route okuyup URL'yi parametre olarak veriyor).

// ---------------------------------------------------------------------------
// IP
// ---------------------------------------------------------------------------
export function getClientIp(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'
  );
}

// ---------------------------------------------------------------------------
// In-memory rate limiter — Vercel serverless'da instance başına tutulur. Kusursuz dağıtık koruma
// değil (bkz. Upstash/Turnstile notu); her endpoint kendi limiter'ını oluşturur.
// ---------------------------------------------------------------------------
export function createRateLimiter({ windowMs, max }: { windowMs: number; max: number }) {
  const map = new Map<string, { count: number; windowStart: number }>();
  return function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = map.get(ip);
    if (!entry || now - entry.windowStart > windowMs) {
      map.set(ip, { count: 1, windowStart: now });
      return false;
    }
    if (entry.count >= max) return true;
    entry.count += 1;
    return false;
  };
}

// ---------------------------------------------------------------------------
// Boyut sınırlı JSON okuma — çok büyük gövde webhook'a hiç ulaşmaz.
// ---------------------------------------------------------------------------
export type JsonBodyResult =
  | { ok: true; body: Record<string, unknown> }
  | { ok: false; reason: 'too_large' | 'invalid_json' };

export async function readJsonBody(request: Request, maxBytes: number): Promise<JsonBodyResult> {
  const declared = Number(request.headers.get('content-length') ?? '0');
  if (declared > maxBytes) return { ok: false, reason: 'too_large' };
  let text: string;
  try {
    text = await request.text();
  } catch {
    return { ok: false, reason: 'invalid_json' };
  }
  // content-length başlığı olmayan/yanlış olan istekler için gerçek boyut kontrolü
  if (new TextEncoder().encode(text).length > maxBytes) return { ok: false, reason: 'too_large' };
  try {
    const parsed: unknown = JSON.parse(text);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return { ok: false, reason: 'invalid_json' };
    return { ok: true, body: parsed as Record<string, unknown> };
  } catch {
    return { ok: false, reason: 'invalid_json' };
  }
}

// ---------------------------------------------------------------------------
// Honeypot — gerçek kullanıcı gizli alanı görmez/doldurmaz. Dolu gelirse bot kabul edilir.
// ---------------------------------------------------------------------------
export const HONEYPOT_FIELD = '_hp';

export function isHoneypotFilled(body: Record<string, unknown>): boolean {
  const v = body[HONEYPOT_FIELD];
  return typeof v === 'string' ? v.trim().length > 0 : Boolean(v);
}

// ---------------------------------------------------------------------------
// Webhook POST — hata durumları tek tipe normalize edilir.
// ---------------------------------------------------------------------------
export type WebhookResult = { ok: true } | { ok: false; reason: 'not_configured' | 'upstream_error' | 'network_error' };

export async function postToWebhook(url: string | undefined, payload: unknown): Promise<WebhookResult> {
  if (!url) return { ok: false, reason: 'not_configured' };
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.ok ? { ok: true } : { ok: false, reason: 'upstream_error' };
  } catch {
    return { ok: false, reason: 'network_error' };
  }
}
