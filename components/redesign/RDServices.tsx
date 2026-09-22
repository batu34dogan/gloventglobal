'use client';

import { useEffect, useRef, useState } from 'react';

const services = [
  { n: '01', title: 'Strateji', desc: 'Pazar, ürün, fiyatlandırma ve büyüme modeli.' },
  { n: '02', title: 'Ticaret', desc: 'Marketplace, Shopify, B2B ve satış kanalları.' },
  { n: '03', title: 'Teknoloji', desc: 'Web, entegrasyon, API, AI ve otomasyon.' },
  { n: '04', title: 'Operasyon', desc: 'İçerik, ürün, reklam, veri ve günlük operasyon.' },
];

const aiNodes = ['Otomasyon', 'İçerik', 'Veri', 'Karar Desteği', 'Operasyon', 'İş Akışları'];

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

function handleAiPointerMove(e: React.PointerEvent<HTMLDivElement>) {
  if (e.pointerType !== 'mouse') return;
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--ai-mx', `${e.clientX - rect.left}px`);
  el.style.setProperty('--ai-my', `${e.clientY - rect.top}px`);
}

export default function RDServices() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const aiRef = useRef<HTMLDivElement>(null);
  const [aiInView, setAiInView] = useState(false);

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

  useEffect(() => {
    const el = aiRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      const id = window.setTimeout(() => setAiInView(true), 0);
      return () => window.clearTimeout(id);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setAiInView(true);
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

        /* AI + Data operating layer */
        .rd-ai-panel {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity .7s ease, transform .7s ease;
        }
        .rd-ai-panel.rd-ai-in { opacity: 1; transform: translateY(0); }

        .rd-ai-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 28px 28px;
          -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 78%);
          mask-image: radial-gradient(ellipse at center, black 0%, transparent 78%);
        }

        .rd-ai-glow {
          position: absolute; inset: 0; pointer-events: none; opacity: 0;
          transition: opacity .4s ease;
          background: radial-gradient(380px circle at var(--ai-mx, 50%) var(--ai-my, 50%), rgba(27,92,214,0.22), rgba(201,168,118,0.10) 45%, transparent 70%);
        }
        @media (hover: hover) and (pointer: fine) {
          .rd-ai-panel:hover .rd-ai-glow { opacity: 1; }
        }

        .rd-ai-node {
          opacity: 0;
          transform: translateY(8px);
          transition: opacity .5s ease, transform .5s ease, border-color .25s ease, background-color .25s ease;
        }
        .rd-ai-panel.rd-ai-in .rd-ai-node { opacity: 1; transform: translateY(0); }
        @media (hover: hover) and (pointer: fine) {
          .rd-ai-node:hover {
            border-color: rgba(201,168,118,0.65);
            background-color: rgba(255,255,255,0.1);
            transform: translateY(-1px) scale(1.03);
          }
          .rd-ai-node:hover .rd-ai-dot { background: #C9A876; box-shadow: 0 0 6px 1px rgba(201,168,118,0.6); }
        }

        @media (prefers-reduced-motion: reduce) {
          .rd-ai-panel, .rd-ai-panel.rd-ai-in, .rd-ai-node, .rd-ai-panel.rd-ai-in .rd-ai-node, .rd-ai-node:hover {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
          .rd-ai-glow { opacity: 0 !important; }
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

        {/* AI + Data operating layer — runs beneath and across all four capabilities, not a fifth card */}
        <div
          ref={aiRef}
          onPointerMove={handleAiPointerMove}
          className={`rd-ai-panel ${aiInView ? 'rd-ai-in' : ''} relative mt-8 overflow-hidden rounded-2xl bg-[#0F1E3C] px-7 py-10 sm:px-10 sm:py-12 lg:px-12`}
        >
          <span aria-hidden className="rd-ai-grid" />
          <span aria-hidden className="rd-ai-glow" />

          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
            <div className="max-w-[46ch]">
              <p className="text-[11px] font-bold tracking-[0.28em] text-[#C9A876] uppercase">AI + Data Layer</p>
              <h3 className="mt-4 text-[1.75rem] font-extrabold leading-tight text-white sm:text-[2.1rem]">
                Yapay zekâyı anlatmıyoruz. Sistemlerin içine entegre ediyoruz.
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-white/65">
                İçerik üretiminden veri analizine, otomasyondan karar desteğine kadar yapay zekâyı kendi operasyonlarımızda ve kurduğumuz sistemlerin içinde aktif olarak kullanıyoruz.
              </p>
            </div>

            <div className="flex w-full flex-wrap gap-x-2.5 gap-y-3 lg:w-[420px] xl:w-[460px]">
              {aiNodes.map((n, i) => (
                <span
                  key={n}
                  style={{ transitionDelay: aiInView ? `${220 + i * 60}ms` : '0ms' }}
                  className="rd-ai-node inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-2 text-[11px] font-semibold tracking-[0.08em] text-white/80 uppercase"
                >
                  <span aria-hidden className="rd-ai-dot h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A876]/70 transition-colors" />
                  {n}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
