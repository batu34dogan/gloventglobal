'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';
import { focusRing } from '@/components/redesign/service-detail/RDServiceDetailPrimitives';

// Projeler: ana sayfadaki #hikayeler bölümü (RDCases) — iç sayfalarda da doğru yere gitsin diye /#hikayeler.
const LINKS = [
  { label: 'Hizmetler', href: '/hizmetler' },
  { label: 'Nasıl Çalışıyoruz', href: '/nasil-calisiyoruz' },
  { label: 'Projeler', href: '/#hikayeler' },
  { label: 'Rehberler', href: '/rehberler' },
  { label: 'Hakkımızda', href: '/hakkimizda' },
];

export default function RDNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  // Aynı navbar production ve /redesign preview'de render ediliyor: production 'navbar', preview 'redesign_navbar'.
  const pathname = usePathname();
  const navLocation = pathname?.startsWith('/redesign') ? 'redesign_navbar' : 'navbar';

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    fn(); window.addEventListener('scroll', fn, {passive:true});
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const closeMenu = useCallback((restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  }, []);

  // Mobil menü açıkken: Escape kapatır (odak menü butonuna döner), arka sayfa kaydırılmaz,
  // masaüstü genişliğine geçilirse (menü lg'de gizli) menü kapanır.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeMenu(true);
      }
    };
    const mq = window.matchMedia('(min-width: 1024px)');
    const onMq = () => { if (mq.matches) closeMenu(false); };
    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, closeMenu]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ${scrolled ? 'bg-white/96 shadow-[0_1px_0_0_#e5e5e8] backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm'}`}>
      <nav aria-label="Ana menü" className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-1 sm:px-10 sm:py-1.5 lg:py-2.5">
        {/* Logo */}
        <Link href="/" className={`flex shrink-0 items-center rounded-md ${focusRing}`}>
          <Image
            src="/redesign/gloventglobal-logo-full.svg"
            alt="GloventGlobal"
            width={1454}
            height={717}
            priority
            className="h-[62px] w-auto sm:h-[64px] lg:h-[56px]"
          />
        </Link>
        {/* Desktop nav */}
        <ul className="hidden items-center gap-6 lg:flex">
          {LINKS.map(l => <li key={l.label}><a href={l.href} className={`rounded text-[15px] font-medium text-[#4A4A5A] transition-colors hover:text-[#1B5CD6] ${focusRing}`}>{l.label}</a></li>)}
        </ul>
        <div className="hidden items-center gap-3 lg:flex">
          {/* Tek dil (TR) — işlevsel dil menüsü olmadığı için etkileşimsiz gösterge. */}
          <span className="text-[14px] font-medium text-[#4A4A5A]">
            <span className="sr-only">Dil: </span>TR
          </span>
          <Link href="/iletisim" onClick={() => trackEvent('contact_cta_click', { location: navLocation })} className={`rounded-full bg-[#1B2E5E] px-5 py-2.5 text-[15px] font-semibold text-white transition-all hover:bg-[#1B5CD6] ${focusRing}`}>İletişime Geç →</Link>
        </div>
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(o=>!o)}
          aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
          aria-expanded={open}
          aria-controls="rd-mobile-menu"
          className={`flex h-11 w-11 items-center justify-center rounded-lg border border-[#E5E5E8] lg:hidden ${focusRing}`}
        >
          <svg aria-hidden="true" viewBox="0 0 18 18" className="h-4 w-4" stroke="#1B2E5E" strokeWidth="1.8" strokeLinecap="round" fill="none">
            {open ? <><path d="M3 3l12 12M15 3L3 15"/> </> : <><path d="M2 5h14M2 9h14M2 13h14"/></>}
          </svg>
        </button>
      </nav>
      <div
        id="rd-mobile-menu"
        inert={!open}
        className={`overflow-hidden border-t border-[#E8E8EC] bg-white transition-all duration-300 lg:hidden ${open ? 'max-h-[480px]' : 'max-h-0 border-transparent'}`}
      >
        <nav aria-label="Mobil menü" className="flex flex-col gap-1 px-6 py-5">
          {LINKS.map(l => <a key={l.label} href={l.href} onClick={()=>closeMenu(false)} className={`rounded-lg px-3 py-3.5 text-[16px] font-medium text-[#3A3A4A] transition-colors hover:bg-[#F4F4F8] ${focusRing}`}>{l.label}</a>)}
          <Link href="/iletisim" onClick={()=>{trackEvent('contact_cta_click', { location: navLocation }); closeMenu(false);}} className={`mt-3 rounded-full bg-[#1B2E5E] px-5 py-4 text-center text-[16px] font-semibold text-white transition-colors hover:bg-[#1B5CD6] ${focusRing}`}>İletişime Geç →</Link>
        </nav>
      </div>
    </header>
  );
}
