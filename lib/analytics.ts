declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    __gloventTrackTest?: () => void;
  }
}

const IS_DEV = process.env.NODE_ENV !== 'production';

function attempt(eventName: string, params: Record<string, unknown>): boolean {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
    if (IS_DEV) console.log('[GA4 ✓ sent]', eventName, params);
    return true;
  }
  return false;
}

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  try {
    if (typeof window === 'undefined') return;

    const consent = window.localStorage.getItem('glovent_cookie_consent');
    if (consent !== 'accepted') {
      if (IS_DEV) console.log('[GA4 ✗ blocked — no consent]', eventName);
      return;
    }

    const p = params ?? {};

    // Deneme 1 — anında
    if (attempt(eventName, p)) return;
    if (IS_DEV) console.warn('[GA4 ⟳ retry 500ms]', eventName);

    // Deneme 2 — 500ms
    setTimeout(() => {
      if (attempt(eventName, p)) return;
      if (IS_DEV) console.warn('[GA4 ⟳ retry 1500ms]', eventName);

      // Deneme 3 — 1500ms
      setTimeout(() => {
        if (!attempt(eventName, p)) {
          if (IS_DEV) console.error('[GA4 ✗ all retries failed]', eventName);
        }
      }, 1000);
    }, 500);
  } catch {
    // Analytics asla kullanıcı deneyimini bozmamalı.
  }
}

// Development'ta browser console'dan manuel test:
// window.__gloventTrackTest()
if (typeof window !== 'undefined' && IS_DEV) {
  window.__gloventTrackTest = () => {
    trackEvent('test_glovent_event', {
      debug_mode: true,
      page_path: window.location.pathname,
    });
  };
}