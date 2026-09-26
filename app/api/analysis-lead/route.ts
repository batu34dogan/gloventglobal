import { NextResponse } from 'next/server';
import { HONEYPOT_FIELD, createRateLimiter, getClientIp, isHoneypotFilled, postToWebhook, readJsonBody } from '@/lib/leads/server';

// Ücretsiz analiz lead'i (AnalysisWidget modalı, /analiz ve eski /iletisim quiz'i). Davranış önceki
// sürümle aynı; güvenlik/teslimat kodu lib/leads/server.ts ile /api/contact-lead'le paylaşılıyor.
// In-memory rate limit Vercel'de instance başına tutulur — kusursuz değil, başlangıç için yeterli.
const isRateLimited = createRateLimiter({ windowMs: 10 * 60 * 1000, max: 5 }); // 10 dk'da IP başına 5
const MAX_BODY_BYTES = 32 * 1024; // gerçek analiz payload'u ~1-3 KB

export async function POST(request: Request) {
  if (isRateLimited(getClientIp(request))) {
    return NextResponse.json(
      { success: false, message: 'Çok fazla deneme yapıldı. Lütfen birkaç dakika sonra tekrar deneyin.' },
      { status: 429 }
    );
  }

  const parsed = await readJsonBody(request, MAX_BODY_BYTES);
  if (!parsed.ok) {
    return NextResponse.json({ success: false }, { status: parsed.reason === 'too_large' ? 413 : 400 });
  }
  const body = parsed.body;

  // Honeypot dolu → bot. Gerçek sonuç gibi göster ama n8n'e gönderme.
  if (isHoneypotFilled(body)) {
    return NextResponse.json({ success: true });
  }

  // Webhook URL sadece server-side okunuyor (NEXT_PUBLIC_ prefix yok) — frontend'e sızmıyor.
  // Honeypot alanı n8n payload'una dahil edilmiyor.
  const { [HONEYPOT_FIELD]: _removed, ...cleanPayload } = body;
  void _removed;

  const result = await postToWebhook(process.env.ANALYSIS_WEBHOOK_URL, cleanPayload);
  return NextResponse.json({ success: result.ok });
}
