// Glo AI yerel denemesi (Aşama B1). Kapalıyken (varsayılan, Vercel production/preview) 404 döner ve
// sağlayıcıya gidilmez. İstek/yanıt içeriği loglanmaz. Ayrıntılar: lib/glo/ai/handler.ts
import { getClientIp, readJsonBody } from '@/lib/leads/server';
import { AI_LIMITS, handleGloTurn } from '@/lib/glo/ai/handler';

export async function POST(request: Request) {
  const parsed = await readJsonBody(request, AI_LIMITS.body);
  const res = await handleGloTurn({
    body: parsed.ok ? parsed.body : null,
    bodyTooLarge: !parsed.ok && parsed.reason === 'too_large',
    ip: getClientIp(request),
    signal: request.signal,
  });
  return Response.json(res.body, { status: res.status, headers: { 'Cache-Control': 'no-store' } });
}
