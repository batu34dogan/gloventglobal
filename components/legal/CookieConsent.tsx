'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'glovent_cookie_consent';

export default function CookieConsent() {
  // İlk render'da false kalır (SSR/hydration uyumu için) — gerçek kontrol useEffect içinde
  // yapılır, böylece localStorage'a yalnızca client'ta erişilir.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const existing = window.localStorage.getItem(STORAGE_KEY);
    if (!existing) setVisible(true);
  }, []);

  const handleChoice = (value: 'accepted' | 'rejected') => {
    window.localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      // z-40: AnalysisWidget'ın floating butonu/modalı (z-[45]) bunun her zaman üstünde kalır —
      // analiz widget'ı/modalı bu banner yüzünden hiç bozulmaz.
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.08] bg-[#070d18]/95 px-4 py-4 backdrop-blur-md sm:px-6 sm:py-4"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-center text-xs leading-relaxed text-blue-100/70 sm:text-left sm:text-sm">
          GloventGlobal olarak site deneyimini iyileştirmek, ziyaretçi etkileşimlerini analiz etmek ve
          hizmetlerimizi geliştirmek için çerezlerden yararlanıyoruz. Detaylı bilgi için{' '}
          <a href="/cerez-politikasi" className="underline hover:text-blue-200">
            Çerez Politikası
          </a>
          &apos;nı inceleyebilirsiniz.
        </p>

        <div className="flex w-full flex-col items-center gap-2.5 sm:w-auto sm:flex-row sm:flex-shrink-0">
          <a
            href="/cerez-politikasi"
            className="text-xs font-medium text-blue-100/55 underline hover:text-blue-200 sm:order-1"
          >
            Çerez Politikası
          </a>
          <button
            type="button"
            onClick={() => handleChoice('rejected')}
            className="w-full rounded-full border border-white/15 px-5 py-2 text-xs font-semibold text-white/80 transition-all duration-200 hover:border-white/35 hover:text-white sm:order-2 sm:w-auto"
          >
            Reddet
          </button>
          <button
            type="button"
            onClick={() => handleChoice('accepted')}
            className="w-full rounded-full border border-blue-400/45 bg-blue-500/10 px-5 py-2 text-xs font-semibold text-white transition-all duration-200 hover:border-blue-400/75 hover:bg-blue-500/20 sm:order-3 sm:w-auto"
          >
            Kabul Et
          </button>
        </div>
      </div>
    </div>
  );
}