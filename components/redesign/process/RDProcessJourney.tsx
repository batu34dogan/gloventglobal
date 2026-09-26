'use client';

import { useEffect, useRef } from 'react';
import { sectionShell } from '@/components/redesign/service-detail/RDServiceDetailPrimitives';
import { growthStages, processSteps } from './processData';

// Sayfanın imza bölümü — production'daki 6 gerçek adım (başlık + açıklama birebir). Homepage
// Growth Engine aşamaları ayrı bir diyagram değil, her adımın küçük aşama etiketi ve üstteki
// ince "track marker" satırı. Aktif adım geçişi: ekranın orta bandına giren adıma class eklenir
// (IntersectionObserver, React state/re-render yok). Reduced-motion'da dekoratif hareket yok.
export default function RDProcessJourney() {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const root = listRef.current;
    if (!root || typeof IntersectionObserver === 'undefined') return;
    const items = root.querySelectorAll<HTMLElement>('[data-step]');
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.target.classList.toggle('rd-pj-on', e.isIntersecting);
      },
      { rootMargin: '-38% 0px -38% 0px' },
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section aria-labelledby="pr-journey" className="overflow-hidden border-t border-[#E5E5EC] bg-white py-16 sm:py-24">
      <style>{`
        .rd-pj-node { transition: background-color .45s ease, border-color .45s ease, color .45s ease, box-shadow .45s ease; }
        .rd-pj-on .rd-pj-node { background: #1B5CD6; border-color: #1B5CD6; color: #fff; box-shadow: 0 0 0 6px rgba(27,92,214,0.10); }
        /* Desktop (1024px+): omurga/düğüm varlığı biraz güçlendirildi — beyaz halka çizgiyi düğüm arkasında keser,
           aktif düğüm biraz daha belirgin. 1023px altı değişmedi. */
        @media (min-width: 1024px) {
          .rd-pj-node { border-color: rgba(27,92,214,0.72); box-shadow: 0 0 0 5px #fff; }
          .rd-pj-on .rd-pj-node { box-shadow: 0 0 0 5px #fff, 0 0 0 10px rgba(27,92,214,0.16); }
          .rd-pj-stub { transition: opacity .45s ease; opacity: .55; }
          .rd-pj-on .rd-pj-stub { opacity: 1; }
        }
        .rd-pj-card { transition: border-color .45s ease, box-shadow .45s ease; }
        .rd-pj-on .rd-pj-card { border-color: rgba(27,92,214,0.35); box-shadow: 0 22px 44px -34px rgba(20,33,63,0.45); }
        .rd-pj-pulse { animation: rd-pj-pulse-kf 9s linear infinite; }
        @keyframes rd-pj-pulse-kf { 0% { top: 0%; opacity: 0; } 6% { opacity: 1; } 94% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
        @media (prefers-reduced-motion: reduce) {
          .rd-pj-node, .rd-pj-card, .rd-pj-stub { transition: none !important; }
          .rd-pj-pulse { animation: none !important; opacity: 0 !important; }
        }
      `}</style>

      <div className={sectionShell}>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#1B5CD6]">Metodoloji</p>
            <h2 id="pr-journey" className="mt-3 max-w-[22ch] text-[1.9rem] font-extrabold leading-[1.1] tracking-tight text-[#14213F] sm:text-[2.5rem]">
              Analizden Büyümeye 6 Adım.
            </h2>
          </div>
          {/* Homepage Growth Engine ile bağlayıcı track marker */}
          <div className="lg:text-right">
            <p lang="en" className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8A6E43]">Growth Engine</p>
            <ol className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[12.5px] font-semibold text-[#14213F] lg:justify-end">
              {growthStages.map((s, i) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="rounded-full border border-[#E0E0E8] bg-[#FAF9F6] px-2.5 py-1">{s}</span>
                  {i < growthStages.length - 1 && <span aria-hidden="true" className="text-[#C9A876]">→</span>}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="relative mt-14 lg:mt-20">
          {/* Omurga: mobilde solda, desktop'ta ortada */}
          <span aria-hidden="true" className="absolute bottom-6 left-[21px] top-6 w-[1.5px] bg-gradient-to-b from-[#1B5CD6]/50 via-[#1B5CD6]/30 to-[#C9A876]/60 lg:left-1/2 lg:w-[2px] lg:-translate-x-1/2 lg:from-[#1B5CD6]/65 lg:via-[#1B5CD6]/40 lg:to-[#C9A876]/75" />
          <span aria-hidden="true" className="absolute bottom-6 left-[21px] top-6 w-0 lg:left-1/2">
            <span className="rd-pj-pulse absolute left-0 h-2 w-2 -translate-x-1/2 rounded-full bg-[#C9A876] shadow-[0_0_0_4px_rgba(201,168,118,0.18)]" />
          </span>
          <ol ref={listRef} className="relative">
          {processSteps.map((s, i) => {
            const right = i % 2 === 1;
            return (
              <li
                key={s.number}
                data-step
                className={`relative grid grid-cols-[44px_1fr] gap-x-5 pb-10 last:pb-0 lg:grid-cols-[1fr_88px_1fr] lg:gap-x-0 lg:pb-14`}
              >
                <div className="relative flex justify-center lg:col-start-2 lg:row-start-1 lg:pt-6">
                  {/* Desktop: düğümden karta ince bağlantı (kartın arkasında kaybolmaz, kartın kenarında biter) */}
                  <span
                    aria-hidden="true"
                    className={`rd-pj-stub absolute top-[46px] hidden h-[2px] w-[46px] lg:block ${
                      right ? 'left-[calc(50%+22px)] bg-gradient-to-r' : 'right-[calc(50%+22px)] bg-gradient-to-l'
                    } from-[#1B5CD6]/70 to-[#C9A876]/60`}
                  />
                  <span className="rd-pj-node relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#1B5CD6]/55 bg-white text-[14px] font-bold text-[#1B5CD6]">
                    {s.number}
                  </span>
                </div>
                <div className={`lg:row-start-1 ${right ? 'lg:col-start-3 lg:pl-6' : 'lg:col-start-1 lg:pr-6'}`}>
                  <div className={`rd-pj-card relative rounded-2xl border border-[#E5E5EC] bg-[#FCFBF8] p-5 sm:p-7 lg:max-w-[520px] ${right ? '' : 'lg:ml-auto'}`}>
                    <span aria-hidden="true" className="absolute left-7 right-7 top-0 h-px bg-gradient-to-r from-[#1B5CD6] via-[#C9A876] to-transparent" />
                    <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-[#8A6E43]">
                      <span className="sr-only">Growth Engine aşaması: </span>
                      {s.stage}
                    </p>
                    <h3 className="mt-2 text-[19px] font-extrabold leading-snug text-[#14213F] sm:text-[22px]">{s.title}</h3>
                    <p className="mt-3 text-[14.5px] leading-relaxed text-[#4A4A5A] sm:text-[15.5px]">{s.description}</p>
                  </div>
                </div>
              </li>
            );
          })}
          </ol>
        </div>
      </div>
    </section>
  );
}
