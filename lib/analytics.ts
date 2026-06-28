// Basit GA4 event helper. window.gtag tanımlı değilse (GA henüz kurulmamışsa veya engellenmişse)
// hiçbir hata fırlatmaz, sessizce no-op olur — kullanıcı deneyimini hiç etkilemez.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  try {
    if (typeof window === 'undefined') return;
    // Kullanıcı "Tümünü Kabul Et" demediyse (reddetti veya henüz hiç tercih belirtmediyse)
    // analytics event'i hiç gönderilmez.
    const consent = window.localStorage.getItem('glovent_cookie_consent');
    if (consent !== 'accepted') return;

    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params ?? {});
    }
  } catch {
    // Analytics asla kullanıcı deneyimini bozmamalı — sessizce yut.
  }
}