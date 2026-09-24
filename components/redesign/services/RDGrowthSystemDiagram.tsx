'use client';

import { useState } from 'react';

// Hero'nun "signature" görseli: GloventGlobal'ın homepage'te de kullandığı dört yetkinlik
// (Strateji/Ticaret/Teknoloji/Operasyon) + AI+Data yatay katmanının, saf CSS/SVG ile çizilmiş bir
// "growth operating system" diyagramı. Stock görsel, 3D kütüphane veya ağır dependency yok.
// Node'lar RDSystem.tsx'teki kanıtlanmış "gerçek buton + hover state" tekniğini kullanıyor —
// dokunmatik cihazlarda da tıklanabilir/odaklanabilir, bilgi hover'a bağımlı değil (etiketler
// zaten her zaman görünür).
const NODES = [
  { key: 'strategy', label: 'STRATEGY', x: 50, y: 12 },
  { key: 'commerce', label: 'COMMERCE', x: 88, y: 50 },
  { key: 'technology', label: 'TECHNOLOGY', x: 50, y: 88 },
  { key: 'operations', label: 'OPERATIONS', x: 12, y: 50 },
] as const;

function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
  if (e.pointerType !== 'mouse') return;
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--gsd-mx', `${e.clientX - rect.left}px`);
  el.style.setProperty('--gsd-my', `${e.clientY - rect.top}px`);
}

export default function RDGrowthSystemDiagram() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      onPointerMove={handlePointerMove}
      className="rd-gsd relative mx-auto aspect-square w-full max-w-[580px]"
    >
      <style>{`
        .rd-gsd-spotlight {
          position: absolute; inset: 0; pointer-events: none; opacity: 0; border-radius: 9999px;
          transition: opacity .35s ease;
          background: radial-gradient(240px circle at var(--gsd-mx,50%) var(--gsd-my,50%), rgba(27,92,214,0.10), rgba(201,168,118,0.05) 45%, transparent 70%);
        }
        @media (hover: hover) and (pointer: fine) {
          .rd-gsd:hover .rd-gsd-spotlight { opacity: 1; }
        }
        .rd-gsd-spoke {
          fill: none; stroke: #C7C7D1; stroke-width: 1.6; stroke-linecap: round;
          transition: stroke .3s ease, stroke-width .3s ease;
        }
        .rd-gsd-spoke.rd-gsd-hot { stroke: #1B5CD6; stroke-width: 2.4; }
        .rd-gsd-core-ring {
          fill: none; stroke: #C9A876; stroke-width: 1.2; opacity: .5;
          transform-origin: 220px 220px;
          animation: rd-gsd-pulse 4.5s ease-in-out infinite;
        }
        @keyframes rd-gsd-pulse {
          0%, 100% { transform: scale(1); opacity: .45; }
          50% { transform: scale(1.08); opacity: .15; }
        }
        .rd-gsd-node {
          position: absolute; display: flex; flex-direction: column; align-items: center; gap: 8px;
          transform: translate(-50%, -50%);
          background: none; border: none; padding: 0; cursor: pointer;
        }
        .rd-gsd-node-dot {
          display: flex; height: 60px; width: 60px; align-items: center; justify-content: center;
          border-radius: 9999px; border: 1.5px solid #DCDCE2; background: #FEFCF9;
          transition: border-color .25s ease, box-shadow .25s ease, transform .25s ease;
        }
        .rd-gsd-node-label {
          font-size: 11.5px; font-weight: 700; letter-spacing: .12em; color: #71717D;
          transition: color .25s ease;
        }
        /* Dar viewport'larda (1024px altı) OPERATIONS/COMMERCE gibi uzun label'lar diyagramın
           dışına taşabiliyor — yalnızca bu breakpoint'te font/tracking hafifçe daraltıldı, node
           pozisyonları (dolayısıyla 1024px+ desktop görünümü) hiç değişmedi. */
        @media (max-width: 1023px) {
          .rd-gsd-node-label { font-size: 9.5px; letter-spacing: .02em; }
        }
        @media (hover: hover) and (pointer: fine) {
          .rd-gsd-node:hover .rd-gsd-node-dot, .rd-gsd-node:focus-visible .rd-gsd-node-dot {
            border-color: #1B5CD6; transform: scale(1.06); box-shadow: 0 0 0 5px rgba(27,92,214,0.10);
          }
          .rd-gsd-node:hover .rd-gsd-node-label, .rd-gsd-node:focus-visible .rd-gsd-node-label { color: #1B5CD6; }
        }
        @media (prefers-reduced-motion: reduce) {
          .rd-gsd-core-ring { animation: none; opacity: .3; }
          .rd-gsd-spoke, .rd-gsd-node-dot, .rd-gsd-node-label { transition: none !important; }
        }
      `}</style>

      <span aria-hidden="true" className="rd-gsd-spotlight" />

      <svg viewBox="0 0 440 440" className="absolute inset-0 h-full w-full" aria-hidden focusable="false">
        {NODES.map((n) => (
          <line
            key={n.key}
            x1="220"
            y1="220"
            x2={(n.x / 100) * 440}
            y2={(n.y / 100) * 440}
            className={`rd-gsd-spoke ${hovered === n.key ? 'rd-gsd-hot' : ''}`}
          />
        ))}
        <circle cx="220" cy="220" r="74" className="rd-gsd-core-ring" />
        <circle cx="220" cy="220" r="62" fill="#FEFCF9" stroke="#1B5CD6" strokeWidth="1.8" />
      </svg>

      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <span className="text-[12px] font-bold tracking-[0.14em] text-[#C9A876] uppercase">AI +</span>
        <span className="text-[16px] font-extrabold tracking-[0.06em] text-[#14213F]">DATA</span>
      </div>

      {NODES.map((n) => (
        <button
          key={n.key}
          type="button"
          className="rd-gsd-node"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
          aria-label={n.label}
          onMouseEnter={() => setHovered(n.key)}
          onMouseLeave={() => setHovered(null)}
          onFocus={() => setHovered(n.key)}
          onBlur={() => setHovered(null)}
        >
          <span aria-hidden="true" className="rd-gsd-node-dot" />
          <span className="rd-gsd-node-label">{n.label}</span>
        </button>
      ))}
    </div>
  );
}
