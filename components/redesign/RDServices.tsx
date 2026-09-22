'use client';

import { useEffect, useRef, useState } from 'react';

const services = [
  { n: '01', title: 'Strateji', desc: 'Pazar, ürün, fiyatlandırma ve büyüme modeli.' },
  { n: '02', title: 'Ticaret', desc: 'Marketplace, Shopify, B2B ve satış kanalları.' },
  { n: '03', title: 'Teknoloji', desc: 'Web, entegrasyon, API, AI ve otomasyon.' },
  { n: '04', title: 'Operasyon', desc: 'İçerik, ürün, reklam, veri ve günlük operasyon.' },
];

function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
  if (e.pointerType !== 'mouse') return;
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  el.style.setProperty('--mx', `${x}px`);
  el.style.setProperty('--my', `${y}px`);
  const nx = x / rect.width - 0.5;
  const ny = y / rect.height - 0.5;
  el.style.setProperty('--ry', `${(nx * 4).toFixed(2)}deg`);
  el.style.setProperty('--rx', `${(-ny * 4).toFixed(2)}deg`);
}

export default function RDServices() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = gridRef.current;
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
    <section id="hizmetler" className="bg-[#FAF9F6] py-16 sm:py-20">
      <style>{`
        .rd-cap-card {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity .6s ease, transform .6s ease, border-color .3s ease;
        }
        .rd-cap-card.rd-in { opacity: 1; transform: translateY(0); }

        .rd-cap-bgpattern {
          position: absolute; inset: 0; pointer-events: none; border-radius: inherit; overflow: hidden;
          background-image:
            linear-gradient(rgba(20,33,63,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20,33,63,0.05) 1px, transparent 1px);
          background-size: 22px 22px;
          opacity: .3;
          transition: opacity .3s ease;
        }
        .rd-cap-card:hover .rd-cap-bgpattern { opacity: .55; }

        .rd-cap-spotlight {
          position: absolute; inset: 0; pointer-events: none; border-radius: inherit;
          opacity: 0;
          transition: opacity .3s ease;
          background: radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), rgba(27,92,214,0.10), rgba(201,168,118,0.07) 45%, transparent 70%);
        }

        .rd-cap-edge {
          position: absolute; left: 6%; right: 6%; top: 0; height: 2px; pointer-events: none;
          background: linear-gradient(90deg, transparent, #1B5CD6, #C9A876, transparent);
          background-size: 220% 100%;
          background-position: -120% 0;
          opacity: 0;
        }
        .rd-cap-card:hover .rd-cap-edge {
          opacity: 1;
          animation: rd-cap-sweep 1.3s ease forwards;
        }
        @keyframes rd-cap-sweep {
          from { background-position: -120% 0; }
          to { background-position: 120% 0; }
        }

        .rd-cap-number { display: inline-block; transition: transform .3s ease, opacity .3s ease; }
        .rd-cap-title { display: block; transition: transform .3s ease; }

        .rd-cap-card:active { transform: scale(0.99); }

        @media (hover: hover) and (pointer: fine) {
          .rd-cap-grid { perspective: 1100px; }
          .rd-cap-card:hover {
            transform: translateY(-5px) scale(1.012) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
            border-color: rgba(27,92,214,0.35);
          }
          .rd-cap-card:hover .rd-cap-spotlight { opacity: 1; }
          .rd-cap-card:hover .rd-cap-number { transform: scale(1.08); opacity: 1; }
          .rd-cap-card:hover .rd-cap-title { transform: translateY(-2px); }
          .rd-cap-grid:has(.rd-cap-card:hover) .rd-cap-card:not(:hover) {
            opacity: .92;
            transform: scale(0.99);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .rd-cap-card, .rd-cap-card.rd-in, .rd-cap-card:hover {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
          .rd-cap-card:hover .rd-cap-title,
          .rd-cap-card:hover .rd-cap-number { transform: none !important; }
          .rd-cap-edge { animation: none !important; opacity: 0 !important; }
          .rd-cap-grid:has(.rd-cap-card:hover) .rd-cap-card:not(:hover) { opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        {/* Header row */}
        <div className="flex flex-wrap items-center justify-between gap-8">
          <div>
            <p className="text-[11.5px] font-bold tracking-[0.26em] text-[#1B5CD6] uppercase">Çekirdek Yetkinlikler</p>
            <h2 className="mt-3 text-[2.6rem] font-extrabold leading-tight tracking-tight text-[#14213F] sm:text-[3.1rem]">Neler Yapıyoruz?</h2>
          </div>
          <p className="max-w-[32ch] text-[1.1rem] leading-relaxed text-[#5A5A6A]">
            Markanızı global pazarlara taşıyan dört temel yetkinlik.
          </p>
        </div>

        {/* Capability tiles */}
        <div ref={gridRef} className="rd-cap-grid mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((s, i) => (
            <div
              key={s.title}
              onPointerMove={handlePointerMove}
              style={{ transitionDelay: inView ? `${i * 80}ms` : '0ms' }}
              className={`rd-cap-card ${inView ? 'rd-in' : ''} relative overflow-hidden rounded-2xl border border-[#E5E5EC] bg-[#FEFCF9] p-8`}
            >
              <span aria-hidden className="rd-cap-bgpattern" />
              <span aria-hidden className="rd-cap-spotlight" />
              <span aria-hidden className="rd-cap-edge" />
              <span className="rd-cap-number relative text-[11.5px] font-bold tracking-[0.2em] text-[#B8935A]">{s.n}</span>
              <h3 className="rd-cap-title relative mt-4 text-[21px] font-bold tracking-tight text-[#14213F]">{s.title}</h3>
              <p className="relative mt-2.5 text-[15px] leading-[1.65] text-[#5A5A6A]">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
