import { NextResponse } from 'next/server';
import { createRateLimiter, getClientIp, isHoneypotFilled, postToWebhook, readJsonBody } from '@/lib/leads/server';
import { parseAnswers } from '@/lib/analysis/questions';
import { getGrowthScore, getReadinessLevel, getRecommendations, priorityLabel } from '@/lib/analysis/engine';
import { getAnalysisService, isServiceTag } from '@/lib/analysis/services';
import { ANALYSIS_LIMITS, isAnalysisLeadSource, normalizeAnalysisContact, validateAnalysisContact } from '@/lib/analysis/lead';

// Ücretsiz analiz lead'i (AnalysisWidget modalı, /analiz, /redesign/analiz). Güvenlik/teslimat kodu
// lib/leads/server.ts ile /api/contact-lead'le paylaşılıyor. In-memory rate limit Vercel'de instance
// başına tutulur — kusursuz değil, başlangıç için yeterli.
//
// Client'tan gelen growthScore / recommendations'a GÜVENİLMEZ: answers doğrulanır ve skor, hazırlık
// seviyesi ve öneriler server'da aynı lib/analysis fonksiyonlarıyla yeniden hesaplanır. n8n payload
// şekli önceki sürümle uyumlu (contact, marketingConsent, answers, growthScore, recommendations[{tag,
// title, priority}], pageUrl, createdAt, leadSource) + readinessLevel.
const isRateLimited = createRateLimiter({ windowMs: 10 * 60 * 1000, max: 5 }); // 10 dk'da IP başına 5
const MAX_BODY_BYTES = 32 * 1024; // gerçek analiz payload'u ~1-3 KB

// Preview (/redesign/...) gönderimleri production verisine karışmasın diye "-preview" son eki alır
// (iletişim formundaki contact-page-preview ile aynı desen).
function isPreviewUrl(pageUrl: string) {
  try {
    return new URL(pageUrl).pathname.startsWith('/redesign');
  } catch {
    return false;
  }
}

// recommendations alanı gönderildiyse beklenen şekilde olmalı (en fazla 3, bilinen slug'lar). Değerleri
// yine de kullanılmaz — server'da yeniden hesaplanır.
function isValidClientRecommendations(v: unknown) {
  if (v === undefined) return true;
  return (
    Array.isArray(v) &&
    v.length <= 3 &&
    v.every((r) => r && typeof r === 'object' && isServiceTag((r as Record<string, unknown>).tag))
  );
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

  // Honeypot dolu → bot. Gerçek sonuç gibi göster ama n8n'e gönderme.
  if (isHoneypotFilled(body)) {
    return NextResponse.json({ success: true });
  }

  const contact = normalizeAnalysisContact(body.contact);
  const errors = validateAnalysisContact(contact);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ success: false, error: 'validation', errors }, { status: 400 });
  }

  const answers = parseAnswers(body.answers);
  if (!answers || !isAnalysisLeadSource(body.leadSource) || !isValidClientRecommendations(body.recommendations)) {
    return NextResponse.json({ success: false, error: 'invalid_payload' }, { status: 400 });
  }

  const pageUrl = typeof body.pageUrl === 'string' ? body.pageUrl.slice(0, ANALYSIS_LIMITS.pageUrl) : '';
  const growthScore = getGrowthScore(answers);
  const payload = {
    contact,
    marketingConsent: body.marketingConsent === true,
    answers,
    growthScore, // iç skor — kullanıcıya gösterilmiyor
    readinessLevel: getReadinessLevel(growthScore),
    recommendations: getRecommendations(answers).map(({ tag }, index) => ({
      tag,
      title: getAnalysisService(tag).name,
      priority: priorityLabel(index),
    })),
    pageUrl,
    createdAt: new Date().toISOString(),
    leadSource: isPreviewUrl(pageUrl) ? `${body.leadSource}-preview` : body.leadSource,
  };

  // Webhook URL sadece server-side okunuyor (NEXT_PUBLIC_ prefix yok) — frontend'e sızmıyor.
  // Hata semantik status ile döner (contact-lead ile aynı): yapılandırma yok 503, n8n/ağ hatası 502.
  // Client her iki durumu da (status veya success:false) hata olarak ele alır; n8n tarafı etkilenmez.
  const result = await postToWebhook(process.env.ANALYSIS_WEBHOOK_URL, payload);
  if (!result.ok) {
    return NextResponse.json({ success: false, error: result.reason }, { status: result.reason === 'not_configured' ? 503 : 502 });
  }
  return NextResponse.json({ success: true });
}
