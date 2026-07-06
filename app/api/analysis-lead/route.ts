import { NextResponse } from 'next/server';

// ---------------------------------------------------------------------------
// In-memory rate limiter — Vercel serverless'da instance başına tutulur.
// Kusursuz değil ama başlangıç için yeterli. Daha güçlü ihtiyaç için
// Upstash Redis veya Cloudflare Turnstile entegrasyonu planlanabilir.
// ---------------------------------------------------------------------------
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 dakika
const RATE_LIMIT_MAX = 5; // aynı IP'den maksimum 5 istek

interface RateEntry {
  count: number;
  windowStart: number;
}
const rateMap = new Map<string, RateEntry>();

function getClientIp(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateMap.set(ip, { count: 1, windowStart: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) return true;

  entry.count += 1;
  return false;
}

// ---------------------------------------------------------------------------
export async function POST(request: Request) {
  // Rate limit kontrolü
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, message: 'Çok fazla deneme yapıldı. Lütfen birkaç dakika sonra tekrar deneyin.' },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  // Honeypot kontrolü — _hp alanı dolu gelirse bot, sessizce reddedilir.
  // Gerçek kullanıcı bu alanı hiç görmez, doldurmaz.
  if (body._hp) {
    // Bota gerçek sonuç gibi göster ama n8n'e gönderme.
    return NextResponse.json({ success: true });
  }

  // Webhook URL sadece server-side okunuyor (process.env, NEXT_PUBLIC_ prefix yok) — frontend'e
  // hiç sızmıyor.
  const webhookUrl = process.env.ANALYSIS_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ success: false });
  }

  // Honeypot alanını n8n payload'una dahil etme — temiz payload gönder
  const { _hp: _removed, ...cleanPayload } = body;
  void _removed;

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cleanPayload),
    });
    if (!res.ok) {
      return NextResponse.json({ success: false });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false });
  }
}