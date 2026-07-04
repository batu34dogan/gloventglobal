'use client';

/**
 * GoogleAnalytics — consent-gated GA4 loader.
 *
 * Davranış:
 * - `glovent_cookie_consent === 'accepted'` olmadan GA script DOM'a eklenmez.
 * - Kullanıcı banner'dan "Tümünü Kabul Et" dediğinde storage değişim eventi
 *   yakalanır ve script o an yüklenir (sayfa yenilemesi gerektirmez).
 * - Script production-only yüklenir (NODE_ENV kontrolü build-time'da yapılır,
 *   GA_ID prop olarak layout.tsx'ten gelir).
 * - lib/analytics.ts içindeki trackEvent de ayrıca consent kontrolü yapar,
 *   çift katman güvenlik sağlar.
 */

import { useEffect } from 'react';
import Script from 'next/script';
import { useState } from 'react';

const CONSENT_KEY = 'glovent_cookie_consent';

interface Props {
  gaId: string;
}

export default function GoogleAnalytics({ gaId }: Props) {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    // İlk kontrol — sayfa açıldığında storage'daki mevcut değeri oku.
    const check = () => {
      setConsent(window.localStorage.getItem(CONSENT_KEY) === 'accepted');
    };
    check();

    // CookieConsent componenti 'glovent-consent-change' custom event fırlatıyor.
    // Bu event geldiğinde storage'ı yeniden oku — banner kapanınca GA hemen aktif olsun.
    const handler = () => check();
    window.addEventListener('glovent-consent-change', handler);
    return () => window.removeEventListener('glovent-consent-change', handler);
  }, []);

  // Consent yoksa hiçbir şey render etme — script DOM'a eklenmez.
  if (!consent) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { page_path: window.location.pathname });
        `}
      </Script>
    </>
  );
}