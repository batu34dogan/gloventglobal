'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { label: 'Hizmetler', href: '/hizmetler' },
  { label: 'Rehberler', href: '/rehberler' },
  { label: 'Farkımız', href: '/farkimiz' },
  { label: 'Nasıl Çalışıyoruz', href: '/nasil-calisiyoruz' },
  { label: 'Hakkımızda', href: '/hakkimizda' },
  { label: 'İletişim', href: '/iletisim' },
];

// Intro (GloventIntro.tsx) "fixed inset-0 z-50" ile çalışıyor. SiteNavbar'a bilerek daha düşük bir
// z-index (z-40) veriliyor — intro açıkken navbar'ın arkasında kalır (görünmez), intro fade-out
// olurken doğal şekilde belirir. Bu sayede GloventIntro.tsx'e hiç dokunulmadan çakışma önleniyor.
export default function SiteNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    // Sayfa zaten scroll edilmiş bir konumda açılmışsa (örn. #anchor ile gelindiyse)
    // ilk durumu hemen doğru ayarla.
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-all duration-300 ${
        scrolled
          ? 'border-white/10 bg-[#070d18]/80 shadow-[0_8px_30px_-12px_rgba(59,130,246,0.35)] backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
        {/* Logo — mobilde scroll olunca gizlenir, desktop'ta her zaman görünür */}
        <Link
          href="/"
          aria-label="GloventGlobal — Ana Sayfa"
          className={`transition-all duration-300 sm:opacity-100 sm:pointer-events-auto ${
            scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
          }`}
        >
          <span className="relative flex h-[52px] w-[200px] items-center justify-center overflow-hidden rounded-xl border border-blue-300/30 bg-slate-950/75 shadow-[0_0_24px_rgba(59,130,246,0.22)] backdrop-blur-md md:h-[56px] md:w-[220px]">
            {/* Geniş radial ışık — tüm kutuya yayılır */}
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-xl bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.72)_0%,rgba(226,239,255,0.58)_34%,rgba(147,197,253,0.28)_58%,rgba(15,23,42,0.08)_82%,transparent_100%)] opacity-95 blur-[1px]"
            />
            {/* Yatay yumuşak band — logo yazısı bölgesini destekler */}
            <span
              aria-hidden="true"
              className="absolute inset-x-2 top-1/2 h-9 -translate-y-1/2 rounded-full bg-white/55 opacity-80 blur-xl"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/gloventglobal-logo.svg"
              alt="GloventGlobal"
              className="relative z-10 h-full w-full translate-y-[3px] scale-[1.55] transform-gpu object-contain brightness-100 contrast-105 saturate-100 md:scale-[2.2] md:brightness-110 md:contrast-125 md:saturate-110"
            />
          </span>
        </Link>

        <div className="hidden items-center gap-8 sm:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-medium uppercase tracking-[0.15em] text-blue-100/75 transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobil hamburger buton — sadece sm altında görünür, desktop satırı (yukarıdaki div) etkilenmez. */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
          aria-expanded={menuOpen}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-white sm:hidden"
        >
          {menuOpen ? (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobil açılır menü paneli — header'ın (z-40) içinde olduğu için intro'nun (z-50) altında kalır.
          Header "fixed" olduğu için panel genişlediğinde sayfa akışını itmiyor, sadece üstte fazladan
          alan kaplıyor (standart mobil menü davranışı). w-full + aynı px-6 padding ile yatay taşma yok. */}
      <div
        className={`overflow-hidden border-t transition-all duration-300 sm:hidden ${
          menuOpen ? 'max-h-64 border-white/10 bg-[#070d18]/95 backdrop-blur-md' : 'max-h-0 border-transparent'
        }`}
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-md px-2 py-2.5 text-xs font-medium uppercase tracking-[0.15em] text-blue-100/80 transition-colors duration-200 hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}