// Basit GA4 event helper. window.gtag tanımlı değilse (GA henüz kurulmamışsa veya engellenmişse)
// hiçbir hata fırlatmaz, sessizce no-op olur — kullanıcı deneyimini hiç etkilemez.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, params ?? {});
    }
  } catch {
    // Analytics asla kullanıcı deneyimini bozmamalı — sessizce yut.
  }
}