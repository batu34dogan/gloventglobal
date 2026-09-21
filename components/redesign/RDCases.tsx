'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type Project = {
  brand: string;
  category: string;
  capability: string;
  desc: string;
  tone: string;
};

const projects: Project[] = [
  {
    brand: 'ASL Çanta',
    category: 'E-Commerce',
    capability: 'Shopify · Commerce Infrastructure · UX',
    desc: 'Geniş ürün kataloğu için ürün mimarisinden kullanıcı deneyimine uzanan modern e-ticaret ve dijital operasyon altyapısı.',
    tone: 'linear-gradient(160deg,#EFE9DD 0%,#E6DFD0 100%)',
  },
  {
    brand: 'BERD',
    category: 'Global Commerce',
    capability: 'Amazon · Market Entry · Growth',
    desc: 'Türkiye’den global pazarlara açılma sürecinde pazaryeri, satış ve büyüme yapısının oluşturulması.',
    tone: 'linear-gradient(160deg,#E4E6EA 0%,#D8DBE1 100%)',
  },
  {
    brand: 'Güvenli Adımlar',
    category: 'Amazon',
    capability: 'Amazon · Listing · Marketplace Operations',
    desc: 'Amazon satış operasyonunun ürün konumlandırması, listeleme ve pazaryeri süreçleriyle yapılandırılması.',
    tone: 'linear-gradient(160deg,#EDEBE6 0%,#E3E0D8 100%)',
  },
  {
    brand: 'Ziynet Bijüteri',
    category: 'B2B',
    capability: 'B2B · Digital Showroom · Global',
    desc: 'Türkiye’den global alıcılara ulaşmayı destekleyen dijital B2B satış ve marka sunum yapısı.',
    tone: 'linear-gradient(160deg,#E7EAED 0%,#DCE0E5 100%)',
  },
  {
    brand: 'RituelCo',
    category: 'Etsy',
    capability: 'Etsy · Commerce · Global',
    desc: 'Global dijital müşterilere ulaşmak için Etsy odaklı satış ve commerce yapısı.',
    tone: 'linear-gradient(160deg,#F0ECE3 0%,#E7E1D3 100%)',
  },
  {
    brand: 'GLC',
    category: 'Etsy',
    capability: 'Etsy · Marketplace · Global',
    desc: 'Etsy üzerinden global müşterilere ulaşmayı destekleyen pazaryeri ve dijital satış yapısı.',
    tone: 'linear-gradient(160deg,#ECE7DC 0%,#E1DACB 100%)',
  },
  {
    brand: 'Maxpace',
    category: 'Amazon',
    capability: 'Amazon · Marketplace · Global Expansion',
    desc: 'Amazon üzerinden farklı küresel pazarlara açılmayı destekleyen satış ve pazaryeri yapılanması.',
    tone: 'linear-gradient(160deg,#E3E5E8 0%,#D7DAE0 100%)',
  },
];

const pad = (n: number) => String(n).padStart(2, '0');

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function RDCases() {
  const railRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0 });
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);

  const updateIndex = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll('article'));
    let closest = 0;
    let minDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs((card as HTMLElement).offsetLeft - el.scrollLeft);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    setIndex(closest);
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateIndex, { passive: true });
    return () => el.removeEventListener('scroll', updateIndex);
  }, [updateIndex]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const cards = Array.from(el.children) as HTMLElement[];
    const step = cards[1] ? cards[1].offsetLeft - cards[0].offsetLeft : el.clientWidth * 0.8;
    el.scrollBy({ left: step * dir, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const el = railRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft };
    setDragging(true);
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    const el = railRef.current;
    if (!el) return;
    el.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX);
  };

  const endDrag = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setDragging(false);
    railRef.current?.releasePointerCapture(e.pointerId);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); scrollByCard(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); scrollByCard(-1); }
  };

  return (
    <section id="hikayeler" className="bg-[#FAF9F6] py-16 sm:py-20">
      <style>{`
        .rd-rail{scrollbar-width:none;-ms-overflow-style:none;}
        .rd-rail::-webkit-scrollbar{display:none;}
      `}</style>

      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[52ch]">
            <p className="text-[11.5px] font-bold tracking-[0.26em] text-[#1B5CD6] uppercase">Projeler</p>
            <h2 className="mt-3 text-[2.6rem] font-extrabold tracking-tight text-[#14213F] sm:text-[3.1rem]">Birlikte Kurduğumuz Sistemler</h2>
            <p className="mt-4 text-[1.1rem] leading-relaxed text-[#5A5A6A]">
              Her marka için aynı reçeteyi değil; ihtiyacına göre strateji, teknoloji, commerce ve operasyon sistemleri kuruyoruz.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Önceki proje"
              onClick={() => scrollByCard(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DCDCE2] text-[#14213F] transition-colors hover:border-[#1B5CD6] hover:text-[#1B5CD6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B5CD6]"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Sonraki proje"
              onClick={() => scrollByCard(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DCDCE2] text-[#14213F] transition-colors hover:border-[#1B5CD6] hover:text-[#1B5CD6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B5CD6]"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Rail — left edge aligns with the header above; right edge bleeds past the content column to hint continuation */}
      <div className="mt-12 pl-6 sm:pl-10 lg:pl-[max(2.5rem,calc((100vw-1400px)/2+2.5rem))]">
        <div
          ref={railRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Proje galerisi"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
          className={`rd-rail flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain pb-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B5CD6] ${dragging ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
        >
          {projects.map(p => (
            <article key={p.brand} className="w-[85vw] shrink-0 snap-start sm:w-[55vw] sm:max-w-[420px] lg:w-[42vw] lg:max-w-[600px]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                {/* Neutral editorial placeholder — swap for next/image (fill + object-cover) once real project photography is ready */}
                <div aria-hidden className="absolute inset-0" style={{ background: p.tone }} />
                <span aria-hidden className="absolute inset-0 flex items-center justify-center text-[7rem] font-black leading-none text-[#14213F]/[0.06] sm:text-[8rem]">
                  {p.brand.charAt(0)}
                </span>
                <div aria-hidden className="absolute inset-0 ring-1 ring-inset ring-black/5" />
              </div>
              <div className="pt-6">
                <p className="text-[11px] font-bold tracking-[0.2em] text-[#8A8A98] uppercase">{p.category}</p>
                <h3 className="mt-2 text-[24px] font-bold text-[#14213F] sm:text-[26px]">{p.brand}</h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-[#5A5A6A]">{p.desc}</p>
                <p className="mt-3.5 text-[12.5px] font-semibold tracking-[0.05em] text-[#8A8A98]">{p.capability}</p>
              </div>
            </article>
          ))}
          <div aria-hidden className="w-px shrink-0 sm:w-4" />
        </div>
      </div>

      {/* Minimal progress indicator */}
      <div className="mx-auto mt-8 max-w-[1400px] px-6 sm:px-10">
        <div className="flex max-w-[220px] items-center gap-3">
          <span className="text-[11px] font-bold tabular-nums text-[#14213F]">{pad(index + 1)}</span>
          <div className="relative h-px flex-1 bg-[#E0E0E6]">
            <div
              className="absolute inset-y-0 left-0 bg-[#1B5CD6] transition-[width] duration-300"
              style={{ width: `${(index / (projects.length - 1)) * 100}%` }}
            />
          </div>
          <span className="text-[11px] font-bold tabular-nums text-[#8A8A98]">{pad(projects.length)}</span>
        </div>
      </div>
    </section>
  );
}
