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
    // Sağ alttaki "Ücretsiz Analiz" floating butonu (bottom-5/6 right-4/6) ile ÇAKIŞMASIN diye
    // bilerek karşı tarafa (sol alt) yerleştirildi. Mobilde ise butonun (bottom-5, ~50px yükseklik)
    // ÜSTÜNE oturacak şekilde bottom-[92px] kullanıldı — z-index'e güvenmek yerine konumla
    // gerçek çakışmayı önlüyor. z-40 (navbar seviyesi), analiz widget'ın z-[45] modalının/
    // butonunun her zaman üstte kalmasını garantiliyor.
    <div className="fixed bottom-[92px] left-4 right-4 z-40 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-[460px]">
      <div className="relative overflow-hidden rounded-2xl border border-blue-400/25 bg-[#0a1120]/90 p-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.65)] backdrop-blur-md">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-10 -top-16 h-40 w-40 rounded-full opacity-40 blur-3xl"
          style={{ background: 'radial-gradient(closest-side, rgba(96,165,250,0.55), transparent 75%)' }}
        />

        <p className="relative text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-300/80">
          Gizlilik Tercihi
        </p>
        <h2 className="relative mt-1.5 text-base font-bold tracking-tight text-white sm:text-lg">
          Çerez tercihlerinizi yönetin
        </h2>
        <p className="relative mt-2 text-xs leading-relaxed text-blue-100/70">
          GloventGlobal olarak site deneyimini iyileştirmek, ziyaretçi etkileşimlerini analiz etmek ve
          hizmetlerimizi geliştirmek için çerezlerden yararlanıyoruz.
        </p>
        <a
          href="/cerez-politikasi"
          className="relative mt-2 inline-block text-xs font-medium text-blue-300/85 underline hover:text-blue-200"
        >
          Çerez Politikası
        </a>

        <div className="relative mt-4 flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => handleChoice('rejected')}
            className="flex-1 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/75 transition-all duration-200 hover:border-white/35 hover:text-white"
          >
            Reddet
          </button>
          <button
            type="button"
            onClick={() => handleChoice('accepted')}
            className="flex-1 rounded-full border border-blue-400/55 bg-blue-500/15 px-4 py-2 text-xs font-semibold text-white shadow-[0_0_20px_-4px_rgba(59,130,246,0.65)] transition-all duration-200 hover:border-blue-400/85 hover:bg-blue-500/25 hover:shadow-[0_0_28px_-2px_rgba(59,130,246,0.8)]"
          >
            Kabul Et
          </button>
        </div>
      </div>
    </div>
  );
}