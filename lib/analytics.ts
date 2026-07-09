// Basit GA4 event helper. window.gtag tanımlı değilse (GA henüz kurulmamışsa veya engellenmişse)
// hiçbir hata fırlatmaz, sessizce no-op olur — kullanıcı deneyimini hiç etkilemez.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function sendGtagEvent(eventName: string, params: Record<string, unknown>): boolean {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
    if (process.env.NODE_ENV !== 'production') {
      console.log('[GA4 EVENT sent]', eventName, params);
    }
    return true;
  }
  return false;
}

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  try {
    if (typeof window === 'undefined') return;

    // Kullanıcı "Tümünü Kabul Et" demediyse analytics event'i hiç gönderilmez.
    const consent = window.localStorage.getItem('glovent_cookie_consent');
    if (consent !== 'accepted') {
      if (process.env.NODE_ENV !== 'production') {
        console.log('[GA4 EVENT blocked — no consent]', eventName);
      }
      return;
    }

    const mergedParams = params ?? {};

    // İlk deneme — gtag çoğu zaman hazırdır.
    if (sendGtagEvent(eventName, mergedParams)) return;

    // gtag henüz yüklenmemişse (afterInteractive script gecikmesi) 500ms sonra bir kez daha dene.
    setTimeout(() => {
      try {
        if (!sendGtagEvent(eventName, mergedParams)) {
          if (process.env.NODE_ENV !== 'production') {
            console.warn('[GA4 EVENT failed — gtag still not ready]', eventName);
          }
        }
      } catch {
        // sessiz yut
      }
    }, 500);
  } catch {
    // Analytics asla kullanıcı deneyimini bozmamalı — sessizce yut.
  }
}