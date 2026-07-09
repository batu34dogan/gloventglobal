'use client';

/**
 * GoogleAnalytics — consent-gated GA4 loader.
 *
 * Düzeltmeler:
 * - Script yüklenince window.gtag hemen hazır olmayabilir. onLoad callback ile
 *   dataLayer/gtag'ın gerçekten tanımlandığını doğruluyoruz.
 * - 'glovent-consent-change' event'i yanı sıra storage polling de eklendi —
 *   bazı tarayıcılarda cross-tab event gecikebiliyor.
 * - GA_ID prop doğrulaması eklendi.
 */

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

const CONSENT_KEY = 'glovent_cookie_consent';

interface Props {
  gaId: string;
}

export default function GoogleAnalytics({ gaId }: Props) {
  const [consent, setConsent] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    const check = () => {
      const val = window.localStorage.getItem(CONSENT_KEY) === 'accepted';
      setConsent(val);
    };

    // İlk yükleme kontrolü
    check();

    // CookieConsent banner'dan gelen custom event
    window.addEventListener('glovent-consent-change', check);

    // Fallback: 1 sn arayla 3 kez polling — bazı tarayıcılarda event kaçabilir
    const timers = [
      setTimeout(check, 1000),
      setTimeout(check, 2000),
      setTimeout(check, 3000),
    ];

    return () => {
      window.removeEventListener('glovent-consent-change', check);
      timers.forEach(clearTimeout);
    };
  }, []);

  if (!consent || !gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
        onLoad={() => {
          // Script yüklenince gtag'ı initialize et
          if (initialized.current) return;
          initialized.current = true;

          window.dataLayer = window.dataLayer ?? [];
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          window.gtag = function gtag(...args: any[]) {
            window.dataLayer!.push(args);
          };
          window.gtag('js', new Date());
          window.gtag('config', gaId, {
            page_path: window.location.pathname,
            send_page_view: true,
          });

          if (process.env.NODE_ENV !== 'production') {
            console.log('[GA4] Script loaded & initialized. gtag ready:', typeof window.gtag);
          }
        }}
      />
    </>
  );
}