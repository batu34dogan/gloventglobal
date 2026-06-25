import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  // Webhook URL sadece server-side okunuyor (process.env, NEXT_PUBLIC_ prefix yok) — frontend'e
  // hiç sızmıyor.
  const webhookUrl = process.env.ANALYSIS_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ success: false });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      return NextResponse.json({ success: false });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false });
  }
}