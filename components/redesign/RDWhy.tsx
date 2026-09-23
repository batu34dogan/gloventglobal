'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { trackEvent } from '@/lib/analytics';

const diffs = [
  { not: 'Rapor değil', is: 'Çalışan sistem' },
  { not: 'AI eğitimi değil', is: 'AI entegrasyonu' },
  { not: 'Tek kanal değil', is: 'Büyüme mimarisi' },
  { not: 'Teslim edip çıkmak değil', is: 'Sürekli optimizasyon' },
];

const pad = (n: number) => String(n).padStart(2, '0');

function handleSpotlightMove(e: React.PointerEvent<HTMLDivElement>) {
  if (e.pointerType !== 'mouse') return;
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--dmx', `${e.clientX - rect.left}px`);
  el.style.setProperty('--dmy', `${e.clientY - rect.top}px`);
}

export default function RDWhy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      const id = window.setTimeout(() => setInView(true), 0);
      return () => window.clearTimeout(id);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="overflow-hidden bg-[#0F1E3C]">
      <style>{`
        .rd-diff-left {
          opacity: 0;
          transform: translateY(14px);
          transition: opacity .6s ease, transform .6s ease;
        }
        .rd-diff-left.rd-in { opacity: 1; transform: translateY(0); }

        .rd-diff-row {
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity .5s ease, transform .5s ease, background-color .3s ease;
        }
        .rd-diff-row.rd-in { opacity: 1; transform: translateY(0); }

        .rd-diff-accent {
          position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
          background: linear-gradient(to bottom, #1B5CD6, #C9A876);
          opacity: 0;
          transform: scaleY(0);
          transform-origin: top;
          transition: opacity .35s ease, transform .35s ease;
        }

        .rd-diff-is { transition: text-shadow .3s ease; }
        .rd-diff-num { transition: opacity .3s ease, color .3s ease; }

        .rd-diff-spotlight {
          position: absolute; inset: 0; pointer-events: none; opacity: 0;
          transition: opacity .3s ease;
          background: radial-gradient(380px circle at var(--dmx, 50%) var(--dmy, 50%), rgba(27,92,214,0.14), rgba(201,168,118,0.06) 45%, transparent 70%);
        }

        @media (hover: hover) and (pointer: fine) {
          .rd-diff-rows:hover .rd-diff-spotlight { opacity: 1; }
          .rd-diff-row:hover { background-color: rgba(255,255,255,0.035); transform: translateY(0) translateX(7px); }
          .rd-diff-row:hover .rd-diff-accent { opacity: 1; transform: scaleY(1); }
          .rd-diff-row:hover .rd-diff-is { text-shadow: 0 0 22px rgba(255,255,255,0.3); }
          .rd-diff-row:hover .rd-diff-num { opacity: 1; color: rgba(255,255,255,0.85); }
        }

        @media (prefers-reduced-motion: reduce) {
          .rd-diff-left, .rd-diff-left.rd-in,
          .rd-diff-row, .rd-diff-row.rd-in, .rd-diff-row:hover {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
          .rd-diff-accent { opacity: 0 !important; transform: scaleY(0) !important; }
          .rd-diff-row:hover .rd-diff-is { text-shadow: none !important; }
          .rd-diff-spotlight { opacity: 0 !important; }
        }
      `}</style>

      <div ref={sectionRef} className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-[1fr_1.08fr]">
          {/* Left dark panel */}
          <div className={`rd-diff-left ${inView ? 'rd-in' : ''} flex flex-col justify-center py-12 pr-0 md:py-16 md:pr-8 lg:pr-16`}>
            <p className="text-[11px] font-bold tracking-[0.28em] text-[#1B5CD6] uppercase">Türkiye&apos;den Dünyaya</p>
            <h2 className="mt-5 text-[2.6rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-[3.1rem]">
              Yerel Gücü Global Büyümeye Dönüştürüyoruz.
            </h2>
            <p className="mt-5 max-w-[42ch] text-[15px] leading-relaxed text-white/60">
              Stratejiden teknolojiye, satıştan operasyona kadar global büyüme için gereken sistemi tek yapı altında kuruyoruz.
            </p>
            <Link
              href="/iletisim"
              onClick={() => trackEvent('contact_cta_click', { location: 'redesign_why' })}
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-[15.5px] font-semibold text-white transition-all hover:bg-white hover:text-[#0F1E3C]"
            >
              İletişime Geç →
            </Link>
            <p className="mt-5 max-w-[400px] text-[14px] leading-relaxed text-[#A9B4CC]/[0.92]">
              Strateji verip çekilmiyoruz. Sistemi kuruyor, işletiyor ve sürekli geliştiriyoruz.
            </p>
          </div>

          {/* Right — transformation rows */}
          <div
            onPointerMove={handleSpotlightMove}
            className="rd-diff-rows relative border-t border-white/10 bg-white/[0.04] py-12 pl-0 md:border-l md:border-t-0 md:py-16 md:pl-8 lg:pl-16"
          >
            <span aria-hidden className="rd-diff-spotlight" />
            <p className="relative text-[11px] font-bold tracking-[0.28em] text-[#5B8CEE] uppercase">Neden GloventGlobal?</p>
            <div className="relative mt-6 md:mt-8">
              {diffs.map((d, i) => (
                <div
                  key={d.is}
                  style={{ transitionDelay: inView ? `${i * 85}ms` : '0ms' }}
                  className={`rd-diff-row ${inView ? 'rd-in' : ''} border-b border-white/10 last:border-0`}
                >
                  <span aria-hidden className="rd-diff-accent" />
                  <div className="flex items-center justify-between gap-6 py-6 pl-5 pr-5 md:py-8">
                    <div>
                      <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-white/46">{d.not}</p>
                      <p className="rd-diff-is mt-1.5 text-[1.5rem] font-bold leading-snug text-white">{d.is}</p>
                    </div>
                    <span className="rd-diff-num shrink-0 text-[13px] font-bold text-white/30">{pad(i + 1)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
