'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

// Homepage'te (RDSystem.tsx) doğrulanmış aynı altı node — yeni bir AI ürünü/etiketi uydurulmadı.
// Bu görsel, Hero'daki dört-node diyagramdan bilinçli olarak farklı bir geometri kullanıyor
// (altıgen network + merkez hub) — kopya değil, aynı dilin daha büyük/mimari bir devamı.
const NODES = [
  { label: 'Otomasyon', angle: -90 },
  { label: 'İçerik', angle: -30 },
  { label: 'Veri', angle: 30 },
  { label: 'Karar Desteği', angle: 90 },
  { label: 'Operasyon', angle: 150 },
  { label: 'İş Akışları', angle: 210 },
];

const CX = 200;
const CY = 200;
const R = 150;

function point(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) };
}

const HEX_PATH = NODES.map((n, i) => {
  const p = point(n.angle);
  return `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`;
}).join(' ') + ' Z';

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}
const getReducedMotionSnapshot = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const getReducedMotionServerSnapshot = () => false;
function useReducedMotion() {
  return useSyncExternalStore(subscribeReducedMotion, getReducedMotionSnapshot, getReducedMotionServerSnapshot);
}

export default function RDServicesAILayer() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
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
    <section className="bg-[#0F1E3C] py-16 sm:py-20">
      <style>{`
        .rd-ainet-spoke { fill: none; stroke: rgba(255,255,255,0.16); stroke-width: 1.2; transition: stroke .3s ease, stroke-width .3s ease; }
        .rd-ainet-spoke.rd-ainet-hot { stroke: #C9A876; stroke-width: 1.8; }
        .rd-ainet-hex { fill: none; stroke: rgba(255,255,255,0.08); stroke-width: 1; }
        .rd-ainet-core {
          transform-origin: 200px 200px;
          animation: rd-ainet-pulse 4s ease-in-out infinite;
        }
        @keyframes rd-ainet-pulse {
          0%, 100% { opacity: .5; transform: scale(1); }
          50% { opacity: .15; transform: scale(1.15); }
        }
        .rd-ainet-node {
          position: absolute; display: flex; flex-direction: column; align-items: center; gap: 8px;
          transform: translate(-50%, -50%);
          background: none; border: none; padding: 0; cursor: pointer;
          opacity: 0; transition: opacity .5s ease;
        }
        .rd-ainet-node.rd-in { opacity: 1; }
        .rd-ainet-node-dot {
          display: flex; height: 40px; width: 40px; align-items: center; justify-content: center;
          border-radius: 9999px; border: 1px solid rgba(255,255,255,0.18); background: rgba(255,255,255,0.04);
          transition: border-color .25s ease, background-color .25s ease, transform .25s ease;
        }
        .rd-ainet-node-label {
          font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.65); white-space: nowrap;
          transition: color .25s ease;
        }
        @media (hover: hover) and (pointer: fine) {
          .rd-ainet-node:hover .rd-ainet-node-dot, .rd-ainet-node:focus-visible .rd-ainet-node-dot {
            border-color: #C9A876; background-color: rgba(201,168,118,0.12); transform: scale(1.08);
          }
          .rd-ainet-node:hover .rd-ainet-node-label, .rd-ainet-node:focus-visible .rd-ainet-node-label { color: #fff; }
        }
        @media (prefers-reduced-motion: reduce) {
          .rd-ainet-core { animation: none !important; opacity: .3; }
          .rd-ainet-node { transition: none !important; }
          .rd-ainet-node-dot, .rd-ainet-node-label { transition: none !important; }
        }
      `}</style>

      <div ref={ref} className="mx-auto grid max-w-[1400px] items-center gap-12 px-6 sm:px-10 lg:grid-cols-[1fr_0.9fr] lg:gap-8">
        <div>
          <p className="text-[11px] font-bold tracking-[0.28em] text-[#C9A876] uppercase">AI + Data Layer</p>
          <h2 className="mt-4 max-w-[22ch] text-[2rem] font-extrabold leading-tight tracking-tight text-white sm:text-[2.6rem]">
            Her Sistemin İçinde Çalışan Katman.
          </h2>
          <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-white/60">
            Ürün açıklamaları, listeleme içerikleri, teklif ve müşteri akışları, raporlama ile n8n tabanlı
            otomasyonlar bu katman üzerinden çalışır. Amazon’dan Shopify’a, reklamdan operasyona kadar her sistemde
            aynı veri ve karar desteği altyapısını kullanırız — ayrı bir “AI ürünü” değil, sistemin kendisidir.
          </p>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[380px]">
          <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden focusable="false">
            <path d={HEX_PATH} className="rd-ainet-hex" />
            {NODES.map((n, i) => {
              const p = point(n.angle);
              return (
                <line
                  key={n.label}
                  x1={CX}
                  y1={CY}
                  x2={p.x}
                  y2={p.y}
                  className={`rd-ainet-spoke ${hovered === i ? 'rd-ainet-hot' : ''}`}
                />
              );
            })}
            <circle cx={CX} cy={CY} r="34" className="rd-ainet-core" fill="none" stroke="#C9A876" strokeWidth="1" />
            <circle cx={CX} cy={CY} r="20" fill="#14213F" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            {!reducedMotion && (
              <circle r="2.5" fill="#C9A876">
                <animateMotion dur="6s" repeatCount="indefinite" path={HEX_PATH} rotate="auto" />
              </circle>
            )}
          </svg>

          {NODES.map((n, i) => {
            const p = point(n.angle);
            return (
              <button
                key={n.label}
                type="button"
                className={`rd-ainet-node ${inView ? 'rd-in' : ''}`}
                style={{
                  left: `${(p.x / 400) * 100}%`,
                  top: `${(p.y / 400) * 100}%`,
                  transitionDelay: inView ? `${i * 70}ms` : '0ms',
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
              >
                <span aria-hidden="true" className="rd-ainet-node-dot" />
                <span className="rd-ainet-node-label">{n.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
