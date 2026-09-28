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
 * - Rıza geri çekme (accepted → rejected): GA script'i sayfada yüklü kalsa bile resmi
 *   window['ga-disable-<ID>'] bayrağı ile gtag.js hiçbir hit göndermez, consent mode
 *   analytics_storage 'denied' olarak güncellenir ve bu sitenin _ga çerezleri silinir.
 *   Yeniden kabulde (rejected → accepted) bayrak kalkar ve analytics_storage 'granted' olur.
 */

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

const CONSENT_KEY = 'glovent_cookie_consent';

// Bu sitenin GA çerezleri (_ga, _ga_<container>) — host ve üst alan adı varyantlarıyla silinir.
function clearGaCookies() {
  const host = window.location.hostname;
  const domains = ['', host, '.' + host.replace(/^www\./, '')];
  for (const c of document.cookie.split(';')) {
    const name = c.split('=')[0].trim();
    if (!/^_ga(_|$)/.test(name)) continue;
    for (const d of domains) {
      document.cookie = name + '=; Max-Age=0; path=/' + (d ? '; domain=' + d : '');
    }
  }
}

interface Props {
  gaId: string;
}

export default function GoogleAnalytics({ gaId }: Props) {
  // null = henüz okunmadı (ilk render). Böylece kabul etmiş kullanıcının çerezleri, storage okunmadan
  // önceki ilk effect'te yanlışlıkla silinmez.
  const [consent, setConsent] = useState<boolean | null>(null);
  // Script bir kez yüklendiyse (sayfa ömrü boyunca) mount'ta kalır; rıza durumu aşağıdaki effect ile
  // runtime'da uygulanır. Aksi halde unmount script'i kaldırmaz ama yeniden kabulü takip edemezdik.
  const [loadScript, setLoadScript] = useState(false);
  if (consent && !loadScript) setLoadScript(true);
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

  // Rıza değişimlerini yüklü gtag'a uygula (ilk kabul, geri çekme, yeniden kabul).
  useEffect(() => {
    if (consent === null || !gaId) return;
    (window as unknown as Record<string, unknown>)['ga-disable-' + gaId] = !consent;
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { analytics_storage: consent ? 'granted' : 'denied' });
    }
    if (!consent) clearGaCookies();
  }, [consent, gaId]);

  if (!loadScript || !gaId) return null;

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
          // Consent mode: yalnızca analitik; reklam sinyalleri hiç kullanılmıyor. Script yüklenirken
          // rıza geri çekildiyse doğrudan 'denied' başlar.
          const granted = window.localStorage.getItem(CONSENT_KEY) === 'accepted';
          window.gtag('consent', 'default', {
            analytics_storage: granted ? 'granted' : 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
          });
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