'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const LINKS = ['Hizmetler','Sektörler','Başarı Hikayeleri','Kaynaklar','Hakkımızda'];

export default function RDNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    fn(); window.addEventListener('scroll', fn, {passive:true});
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ${scrolled ? 'bg-white/96 shadow-[0_1px_0_0_#e5e5e8] backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm'}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5 sm:px-10">
        {/* Logo */}
        <Link href="/redesign" className="flex items-center gap-2.5 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#1B5CD6] text-[15px] font-black text-[#1B2E5E]">G</div>
          <div>
            <div className="text-[15px] font-bold leading-tight tracking-tight text-[#1B2E5E]">GloventGlobal</div>
            <div className="text-[8.5px] font-semibold tracking-[0.18em] text-[#1B5CD6] uppercase">Global Growth Partner</div>
          </div>
        </Link>
        {/* Desktop nav */}
        <ul className="hidden items-center gap-6 lg:flex">
          {LINKS.map(l => <li key={l}><a href="#" className="text-[13.5px] font-medium text-[#4A4A5A] transition-colors hover:text-[#1B5CD6]">{l}</a></li>)}
        </ul>
        <div className="hidden items-center gap-3 lg:flex">
          <button className="flex items-center gap-1 text-[13px] font-medium text-[#4A4A5A]">TR <span className="text-[10px]">▾</span></button>
          <Link href="/iletisim" className="rounded-full bg-[#1B2E5E] px-5 py-2.5 text-[13.5px] font-semibold text-white transition-all hover:bg-[#1B5CD6]">İletişime Geç →</Link>
        </div>
        <button onClick={() => setOpen(o=>!o)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5E5E8] lg:hidden">
          <svg viewBox="0 0 18 18" className="h-4 w-4" stroke="#1B2E5E" strokeWidth="1.8" strokeLinecap="round" fill="none">
            {open ? <><path d="M3 3l12 12M15 3L3 15"/> </> : <><path d="M2 5h14M2 9h14M2 13h14"/></>}
          </svg>
        </button>
      </nav>
      <div className={`overflow-hidden border-t border-[#E8E8EC] bg-white transition-all lg:hidden ${open ? 'max-h-80' : 'max-h-0 border-transparent'}`}>
        <div className="flex flex-col px-6 py-3 gap-0.5">
          {LINKS.map(l => <a key={l} href="#" onClick={()=>setOpen(false)} className="rounded-lg px-2 py-2.5 text-[14px] font-medium text-[#3A3A4A] hover:bg-[#F4F4F8]">{l}</a>)}
          <Link href="/iletisim" onClick={()=>setOpen(false)} className="mt-2 rounded-full bg-[#1B2E5E] px-5 py-3 text-center text-[14px] font-semibold text-white">İletişime Geç →</Link>
        </div>
      </div>
    </header>
  );
}