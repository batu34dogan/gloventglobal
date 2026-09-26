import { NextResponse } from 'next/server';
import { createRateLimiter, getClientIp, isHoneypotFilled, postToWebhook, readJsonBody } from '@/lib/leads/server';
import { CONTACT_LIMITS, normalizeContactInput, validateContact } from '@/lib/leads/contact';

// Genel iletişim lead'i (Doğrudan İletişim formu). /api/analysis-lead'den ayrı; güvenlik/teslimat
// kodu lib/leads/server.ts ile paylaşılıyor.
//
// Webhook: CONTACT_WEBHOOK_URL tanımlıysa o, yoksa geriye uyumlu olarak ANALYSIS_WEBHOOK_URL.
// Payload her durumda leadSource + intent: "general-contact" taşır — n8n analiz lead'inden ayırabilir.
// Client'tan yalnızca form alanları + pageUrl kabul edilir; diğer metadata (createdAt, leadSource,
// intent) server'da üretilir.
const isRateLimited = createRateLimiter({ windowMs: 10 * 60 * 1000, max: 5 }); // analysis ile aynı seviye
const MAX_BODY_BYTES = 16 * 1024; // en uzun geçerli form (3000 karakter mesaj) ~7 KB

// Preview (/redesign/...) gönderimleri production verisine karışmasın diye ayrı leadSource alır.
function leadSourceFor(pageUrl: string): 'contact-page' | 'contact-page-preview' {
  try {
    return new URL(pageUrl).pathname.startsWith('/redesign') ? 'contact-page-preview' : 'contact-page';
  } catch {
    return 'contact-page';
  }
}

export async function POST(request: Request) {
  if (isRateLimited(getClientIp(request))) {
    return NextResponse.json(
      { success: false, message: 'Çok fazla deneme yapıldı. Lütfen birkaç dakika sonra tekrar deneyin.' },
      { status: 429 }
    );
  }

  const parsed = await readJsonBody(request, MAX_BODY_BYTES);
  if (!parsed.ok) {
    return NextResponse.json({ success: false, error: parsed.reason }, { status: parsed.reason === 'too_large' ? 413 : 400 });
  }
  const body = parsed.body;

  // Honeypot dolu → bot. analysis-lead ile aynı strateji: başarı gibi göster, webhook'a gönderme.
  if (isHoneypotFilled(body)) {
    return NextResponse.json({ success: true });
  }

  const input = normalizeContactInput(body);
  const errors = validateContact(input);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ success: false, error: 'validation', errors }, { status: 400 });
  }

  const pageUrl = typeof body.pageUrl === 'string' ? body.pageUrl.slice(0, CONTACT_LIMITS.pageUrl) : '';
  const payload = {
    leadSource: leadSourceFor(pageUrl),
    intent: 'general-contact',
    contact: { fullName: input.fullName, company: input.company, email: input.email, phone: input.phone },
    subject: input.subject,
    message: input.message,
    marketingConsent: input.marketingConsent,
    pageUrl,
    createdAt: new Date().toISOString(),
  };

  const result = await postToWebhook(process.env.CONTACT_WEBHOOK_URL || process.env.ANALYSIS_WEBHOOK_URL, payload);
  if (!result.ok) {
    return NextResponse.json({ success: false, error: result.reason }, { status: result.reason === 'not_configured' ? 503 : 502 });
  }
  return NextResponse.json({ success: true });
}
