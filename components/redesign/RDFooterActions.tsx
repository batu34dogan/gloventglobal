'use client';

import { trackEvent } from '@/lib/analytics';

// RDFooter server component kalsın diye footer'daki iki etkileşimli aksiyon küçük client adası olarak
// burada: mevcut global AnalysisWidget modalı ve mevcut CookieConsent banner'ı custom event ile açılır.

export const OPEN_COOKIE_PREFERENCES_EVENT = 'glovent-open-cookie-preferences';

export function FooterAnalysisButton({ className }: { className: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        trackEvent('free_analysis_cta_click', { location: 'footer' });
        window.dispatchEvent(new Event('open-analysis-widget'));
      }}
      className={className}
    >
      Ücretsiz Ön Analiz
    </button>
  );
}

export function CookiePreferencesButton({ className }: { className: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_PREFERENCES_EVENT))} className={className}>
      Çerez Tercihleri
    </button>
  );
}
