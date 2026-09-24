'use client';

import { useEffect, useRef, useState } from 'react';

// secondaryLabel/secondaryChips: production ana sayfanın (HomeContent.tsx) eski Ekosistem
// bölümünde ayrı kart olarak geçen "Reklam & Growth" (PPC/SEO/Content) ve "Veri & Performans
// Analizi" (GA4/Search Console/KPI) yetkinlikleri — yeni 5./6. kart açmadan, en ilgili mevcut
// karta (satış kanalları → Ticaret, günlük operasyon/veri → Operasyon) düşük ağırlıklı ikincil
// etiket olarak entegre edildi. Uydurma araç/hizmet adı yok, hepsi production kaynağından.
const services = [
  { n: '01', title: 'Strateji', desc: 'Pazar, ürün, fiyatlandırma ve büyüme modeli.' },
  {
    n: '02',
    title: 'Ticaret',
    desc: 'Marketplace, Shopify, B2B ve satış kanalları.',
    secondaryLabel: 'Reklam & Growth',
    secondaryChips: ['PPC', 'SEO', 'Content'],
  },
  { n: '03', title: 'Teknoloji', desc: 'Web, entegrasyon, API, AI ve otomasyon.' },
  {
    n: '04',
    title: 'Operasyon',
    desc: 'İçerik, ürün, reklam, veri ve günlük operasyon.',
    secondaryLabel: 'Veri & Performans Analizi',
    secondaryChips: ['GA4', 'Search Console', 'KPI'],
  },
];

const aiNodes = ['Otomasyon', 'İçerik', 'Veri', 'Karar Desteği', 'Operasyon', 'İş Akışları'];

// Mobil (0-767px) radial network — 6 node hub'ın çevresine altıgen düzende yerleşiyor (viewBox
// 0 0 200 250, hub 100,125). x/y: SVG spoke+dot koordinatları. xPct/yPct: aynı noktanın HTML
// label'ı için yüzde konumu. transform/align/maxWidth: label kutusunun dot'a göre dışa doğru
// (üst/alt/sağ/sol) hizalanmasını sağlıyor — 360px genişlikte bile viewport dışına taşmadan.
const AI_RADIAL_NODES: Array<{
  key: string;
  label: string;
  x: number;
  y: number;
  xPct: number;
  yPct: number;
  align: 'left' | 'right' | 'center';
  transform: string;
  maxWidth: number;
}> = [
  { key: 'automation', label: 'Otomasyon', x: 100, y: 45, xPct: 50, yPct: 18, align: 'center', transform: 'translate(-50%, calc(-100% - 10px))', maxWidth: 110 },
  { key: 'content', label: 'İçerik', x: 150.2, y: 85, xPct: 75, yPct: 34, align: 'left', transform: 'translate(10px, -50%)', maxWidth: 66 },
  { key: 'data', label: 'Veri', x: 150.2, y: 165, xPct: 75, yPct: 66, align: 'left', transform: 'translate(10px, -50%)', maxWidth: 66 },
  { key: 'decision', label: 'Karar Desteği', x: 100, y: 205, xPct: 50, yPct: 82, align: 'center', transform: 'translate(-50%, 10px)', maxWidth: 116 },
  { key: 'ops', label: 'Operasyon', x: 49.8, y: 165, xPct: 25, yPct: 66, align: 'right', transform: 'translate(calc(-100% - 10px), -50%)', maxWidth: 66 },
  { key: 'workflows', label: 'İş Akışları', x: 49.8, y: 85, xPct: 25, yPct: 34, align: 'right', transform: 'translate(calc(-100% - 10px), -50%)', maxWidth: 66 },
];

// Desktop (1024px+) network — aynı 6 kavram, artık pill/chip değil doğrudan network'ün node'ları.
// Hexagon + merkez hub (services sayfasındaki RDServicesAILayer ile aynı "altıgen + hub" dili,
// farklı bir kopya) — angle sırası aiNodes ile birebir aynı ki otomatik sequence doğru sırada aksın.
const AI_DESKTOP_NODES = [
  { key: 'automation', label: 'Otomasyon', angle: -90 },
  { key: 'content', label: 'İçerik', angle: -30 },
  { key: 'data', label: 'Veri', angle: 30 },
  { key: 'decision', label: 'Karar Desteği', angle: 90 },
  { key: 'ops', label: 'Operasyon', angle: 150 },
  { key: 'workflows', label: 'İş Akışları', angle: 210 },
] as const;

const AI_DESKTOP_CX = 200;
const AI_DESKTOP_CY = 200;
const AI_DESKTOP_R = 156;

function aiDesktopPoint(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: AI_DESKTOP_CX + AI_DESKTOP_R * Math.cos(rad), y: AI_DESKTOP_CY + AI_DESKTOP_R * Math.sin(rad) };
}

const AI_DESKTOP_HEX =
  AI_DESKTOP_NODES.map((n, i) => {
    const p = aiDesktopPoint(n.angle);
    return `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`;
  }).join(' ') + ' Z';

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
  const [aiDesktopHovered, setAiDesktopHovered] = useState<number | null>(null);

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
    <section id="hizmetler" className="scroll-mt-20 bg-[#FAF9F6] py-16 sm:py-20">
      <style>{`
        .rd-cap-card {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity .6s ease, transform .6s ease, border-color .3s ease;
        }
        .rd-cap-card.rd-in { opacity: 1; transform: translateY(0); }

        .rd-support {
          opacity: 0;
          transform: translateY(10px);
          transition: opacity .6s ease, transform .6s ease;
        }
        .rd-support.rd-in { opacity: 1; transform: translateY(0); }

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

        .rd-cap-mobile-grid {
          position: absolute; inset: -4% -6%; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(20,33,63,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20,33,63,0.035) 1px, transparent 1px);
          background-size: 24px 24px;
          -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 75%);
          mask-image: radial-gradient(ellipse at center, black 0%, transparent 75%);
        }

        @media (prefers-reduced-motion: reduce) {
          .rd-cap-card, .rd-cap-card.rd-in, .rd-cap-card:hover,
          .rd-support, .rd-support.rd-in {
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

        .rd-ai-mini-pulse {
          transform-origin: center;
          animation: rd-ai-mini-pulse-kf 4.5s ease-in-out infinite;
        }
        @keyframes rd-ai-mini-pulse-kf {
          0%, 100% { transform: scale(1); opacity: .5; }
          50% { transform: scale(1.12); opacity: .15; }
        }

        /* Mobile (0-767px) AI+Data network — restrained data-flow loop. Dedicated classes/keyframes
           (not shared with .rd-ai-mini-pulse, which the 768-1023px decorative network still uses
           untouched) so tablet/desktop stay pixel-identical. One 7.2s cycle, one node active at a
           time (6 × 1.2s slots), phase-shifted per node via negative animation-delay. */
        .rd-ai-hub-pulse {
          animation: rd-ai-hub-pulse-kf 4s ease-in-out infinite;
        }
        @keyframes rd-ai-hub-pulse-kf {
          0%, 100% { opacity: .35; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: .65; transform: translate(-50%, -50%) scale(1.04); }
        }

        .rd-ai-node-spoke {
          animation: rd-ai-spoke-kf 7.2s ease-in-out infinite;
        }
        @keyframes rd-ai-spoke-kf {
          0%, 100% { stroke: rgba(255,255,255,0.2); stroke-width: 1; }
          4%, 13% { stroke: #1B5CD6; stroke-width: 1.6; }
          15% { stroke: rgba(255,255,255,0.2); stroke-width: 1; }
        }

        .rd-ai-node-dot {
          animation: rd-ai-dot-kf 7.2s ease-in-out infinite;
        }
        @keyframes rd-ai-dot-kf {
          0%, 100% { stroke: rgba(255,255,255,0.4); r: 4.5px; }
          4%, 13% { stroke: #C9A876; r: 5px; }
          15% { stroke: rgba(255,255,255,0.4); r: 4.5px; }
        }

        .rd-ai-node-label {
          display: inline-block;
          color: rgba(255,255,255,0.72);
          animation: rd-ai-label-kf 7.2s ease-in-out infinite;
        }
        @keyframes rd-ai-label-kf {
          0%, 100% { color: rgba(255,255,255,0.72); transform: scale(1); }
          4%, 13% { color: #FFFFFF; transform: scale(1.05); }
          15% { color: rgba(255,255,255,0.72); transform: scale(1); }
        }

        .rd-ai-data-point {
          animation: rd-ai-travel-kf 7.2s linear infinite;
        }
        @keyframes rd-ai-travel-kf {
          0%, 4% { offset-distance: 0%; opacity: 0; }
          6% { offset-distance: 12%; opacity: 1; }
          11% { offset-distance: 100%; opacity: 1; }
          13%, 100% { offset-distance: 100%; opacity: 0; }
        }

        /* Desktop (1024px+) AI+Data network — eski 6 pill/chip'in yerine. Dedicated rd-ai2-*
           class/keyframe'leri (mobil rd-ai-*'dan tamamen ayrı) — restrained otomatik sequence
           (mobil ile aynı 7.2s / 6x1.2s mantığı, node sırası aiNodes ile birebir aynı) + pointer:fine
           hover/focus emphasis üstüne biner (!important ile, sequence'i durdurmadan). */
        .rd-ai2-hex { fill: none; stroke: rgba(255,255,255,0.1); stroke-width: 1; }

        .rd-ai2-spoke {
          fill: none; stroke: rgba(255,255,255,0.22); stroke-width: 1.4;
          animation: rd-ai2-spoke-kf 7.2s ease-in-out infinite;
        }
        @keyframes rd-ai2-spoke-kf {
          0%, 100% { stroke: rgba(255,255,255,0.22); stroke-width: 1.4; }
          4%, 13% { stroke: #1B5CD6; stroke-width: 2; }
          15% { stroke: rgba(255,255,255,0.22); stroke-width: 1.4; }
        }
        .rd-ai2-spoke.rd-ai2-hot { stroke: #C9A876 !important; stroke-width: 2.2 !important; }

        .rd-ai2-hub-ring-outer { fill: none; stroke: #C9A876; stroke-width: 1; opacity: .55; }
        .rd-ai2-hub-pulse {
          animation: rd-ai2-hub-pulse-kf 4s ease-in-out infinite;
        }
        @keyframes rd-ai2-hub-pulse-kf {
          0%, 100% { opacity: .4; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: .7; transform: translate(-50%, -50%) scale(1.035); }
        }

        .rd-ai2-node {
          position: absolute; display: flex; flex-direction: column; align-items: center; gap: 9px;
          transform: translate(-50%, -50%);
          background: none; border: none; padding: 0; cursor: pointer;
        }
        .rd-ai2-node-dot {
          display: flex; height: 15px; width: 15px; align-items: center; justify-content: center;
          border-radius: 9999px; border: 1.5px solid rgba(255,255,255,0.28); background: rgba(255,255,255,0.05);
          animation: rd-ai2-dot-kf 7.2s ease-in-out infinite;
        }
        @keyframes rd-ai2-dot-kf {
          0%, 100% { border-color: rgba(255,255,255,0.28); background-color: rgba(255,255,255,0.05); transform: scale(1); }
          4%, 13% { border-color: #1B5CD6; background-color: rgba(27,92,214,0.16); transform: scale(1.05); }
          15% { border-color: rgba(255,255,255,0.28); background-color: rgba(255,255,255,0.05); transform: scale(1); }
        }
        .rd-ai2-node.rd-ai2-hot .rd-ai2-node-dot {
          border-color: #C9A876 !important; background-color: rgba(201,168,118,0.18) !important; transform: scale(1.05) !important;
        }
        .rd-ai2-node-label {
          font-size: 12.5px; font-weight: 600; color: rgba(255,255,255,0.65); white-space: nowrap;
          animation: rd-ai2-label-kf 7.2s ease-in-out infinite;
        }
        @keyframes rd-ai2-label-kf {
          0%, 100% { color: rgba(255,255,255,0.65); }
          4%, 13% { color: #fff; }
          15% { color: rgba(255,255,255,0.65); }
        }
        .rd-ai2-node.rd-ai2-hot .rd-ai2-node-label { color: #fff !important; }

        .rd-ai2-data-point {
          animation: rd-ai2-travel-kf 7.2s linear infinite;
        }
        @keyframes rd-ai2-travel-kf {
          0%, 4% { offset-distance: 0%; opacity: 0; }
          6% { offset-distance: 12%; opacity: 1; }
          11% { offset-distance: 100%; opacity: 1; }
          13%, 100% { offset-distance: 100%; opacity: 0; }
        }

        @media (hover: hover) and (pointer: fine) {
          .rd-ai2-node:focus-visible { outline: 2px solid rgba(201,168,118,0.6); outline-offset: 6px; border-radius: 9999px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .rd-ai-panel, .rd-ai-panel.rd-ai-in, .rd-ai-node, .rd-ai-panel.rd-ai-in .rd-ai-node, .rd-ai-node:hover {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
          .rd-ai-glow { opacity: 0 !important; }
          .rd-ai-mini-pulse { animation: none !important; opacity: .3; }
          .rd-ai-hub-pulse {
            animation: none !important;
            opacity: .5 !important;
            transform: translate(-50%, -50%) scale(1) !important;
          }
          .rd-ai-node-spoke { animation: none !important; stroke: rgba(255,255,255,0.2) !important; stroke-width: 1 !important; }
          .rd-ai-node-dot { animation: none !important; stroke: rgba(255,255,255,0.4) !important; r: 4.5px !important; }
          .rd-ai-node-label { animation: none !important; color: rgba(255,255,255,0.72) !important; transform: none !important; }
          .rd-ai-data-point { animation: none !important; opacity: 0 !important; }
          .rd-ai2-spoke { animation: none !important; stroke: rgba(255,255,255,0.22) !important; stroke-width: 1.4 !important; }
          .rd-ai2-hub-pulse { animation: none !important; opacity: .5 !important; transform: translate(-50%, -50%) scale(1) !important; }
          .rd-ai2-node-dot { animation: none !important; border-color: rgba(255,255,255,0.28) !important; background-color: rgba(255,255,255,0.05) !important; transform: none !important; }
          .rd-ai2-node-label { animation: none !important; color: rgba(255,255,255,0.65) !important; }
          .rd-ai2-data-point { animation: none !important; opacity: 0 !important; }
        }
      `}</style>

      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        {/* Header row */}
        <div className="flex flex-wrap items-center justify-between gap-8">
          <div>
            <p className="text-[11.5px] font-bold tracking-[0.26em] text-[#1B5CD6] uppercase">Büyüme Mimarisi</p>
            <h2 className="mt-3 text-[2.6rem] font-extrabold leading-tight tracking-tight text-[#14213F] sm:text-[3.1rem]">Neler Yapıyoruz?</h2>
          </div>
          <div className={`rd-support max-w-[365px] ${inView ? 'rd-in' : ''}`}>
            <p className="text-[11px] font-bold tracking-[0.24em] text-[#8A6E43] uppercase">Tek Sistem · Dört Yetkinlik</p>
            <p className="mt-3 text-[1.275rem] font-semibold leading-snug text-[#1F2A44] sm:text-[1.4rem]">
              Strateji, ticaret, teknoloji ve operasyonu <span className="text-[#1B5CD6]">tek bir büyüme sisteminde</span> birleştiriyoruz.
            </p>
          </div>
        </div>

        {/* Capability tiles — desktop/tablet (768px+, mevcut davranış birebir korunuyor) */}
        <div ref={gridRef} className="rd-cap-grid mt-10 hidden gap-6 sm:grid-cols-2 md:grid xl:grid-cols-4">
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
              <span className="rd-cap-number relative text-[11.5px] font-bold tracking-[0.2em] text-[#8A6E43]">{s.n}</span>
              <h3 className="rd-cap-title relative mt-4 text-[21px] font-bold tracking-tight text-[#14213F]">{s.title}</h3>
              <p className="relative mt-2.5 text-[15px] leading-[1.65] text-[#5A5A6A]">{s.desc}</p>
              {s.secondaryLabel && (
                <div className="relative mt-5 border-t border-[#E5E5EC] pt-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#757580]">
                    {s.secondaryLabel}
                  </p>
                  <p className="mt-1 text-[10.5px] font-medium uppercase tracking-[0.06em] text-[#8A6E43]">
                    {s.secondaryChips.join(' · ')}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Capability chapters — mobil (0-767px): küçük carousel kartları değil, doğal vertical
            editorial akış. Her yetkinlik kendi büyük "chapter"ı — beyaz kart/kutu yok, sadece
            typography + ince blue→champagne accent çizgisi + çok hafif arkaplan grid dokusu. */}
        <div className="relative mt-10 md:hidden">
          <span aria-hidden="true" className="rd-cap-mobile-grid" />
          <div className="relative flex flex-col">
            {services.map((s, i) => (
              <div key={s.title} className={`relative py-8 pl-6 ${i > 0 ? 'border-t border-[#E5E5EC]' : ''}`}>
                <span aria-hidden="true" className="absolute left-0 top-8 bottom-8 w-[2px] bg-gradient-to-b from-[#1B5CD6] to-[#C9A876]" />
                <span className="text-[13px] font-bold text-[#C4C4CE]">{s.n}</span>
                <h3 className="mt-2 text-[27px] font-extrabold leading-tight tracking-tight text-[#14213F]">{s.title}</h3>
                <p className="mt-2.5 max-w-[38ch] text-[15px] leading-relaxed text-[#5A5A6A]">{s.desc}</p>
                {s.secondaryLabel && (
                  <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8A6E43]">
                    {s.secondaryLabel} · {s.secondaryChips.join(' · ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* AI + Data operating layer — runs beneath and across all four capabilities, not a fifth card */}
        <div
          ref={aiRef}
          onPointerMove={handleAiPointerMove}
          className={`rd-ai-panel ${aiInView ? 'rd-ai-in' : ''} relative mt-8 overflow-hidden rounded-2xl bg-[#0F1E3C] px-7 py-10 sm:px-10 sm:py-12 lg:px-12`}
        >
          <span aria-hidden className="rd-ai-grid" />
          <span aria-hidden className="rd-ai-glow" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
            <div className="max-w-[46ch]">
              <p className="text-[11px] font-bold tracking-[0.28em] text-[#C9A876] uppercase">AI + Data Layer</p>
              <h3 className="mt-4 text-[1.75rem] font-extrabold leading-tight text-white sm:text-[2.1rem]">
                Yapay zekâyı anlatmıyoruz. Sistemlerin içine entegre ediyoruz.
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-white/65">
                İçerik üretiminden veri analizine, otomasyondan karar desteğine kadar yapay zekâyı kendi operasyonlarımızda ve kurduğumuz sistemlerin içinde aktif olarak kullanıyoruz.
              </p>
            </div>

            {/* Mobil (0-767px): 6 node, ayrı chip listesi olarak değil, doğrudan network
                diyagramının çevresinde — merkezde AI + DATA hub, her node ince bir spoke line ile
                bağlı. Label'lar gerçek/erişilebilir metin (aria-hidden değil); sadece çizgi/nokta
                dekoratif. Hover/tap gerekmiyor, her zaman görünür. Sıralı, restrained data-flow
                animasyonu: aynı anda yalnızca bir node/spoke aktif + merkezden o node'a doğru
                küçük bir champagne veri noktası akıyor (bkz. yukarıdaki rd-ai-* keyframe'leri). */}
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[264px] md:hidden">
              <svg viewBox="0 0 200 250" aria-hidden="true" className="absolute inset-0 h-full w-full">
                {AI_RADIAL_NODES.map((node, i) => (
                  <line
                    key={`line-${node.key}`}
                    className="rd-ai-node-spoke"
                    x1="100"
                    y1="125"
                    x2={node.x}
                    y2={node.y}
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="1"
                    style={{ animationDelay: `${i * 1.2}s` }}
                  />
                ))}
                <circle cx="100" cy="125" r="26" fill="#0F1E3C" stroke="#C9A876" strokeWidth="1.2" />
                {AI_RADIAL_NODES.map((node, i) => (
                  <circle
                    key={`dot-${node.key}`}
                    className="rd-ai-node-dot"
                    cx={node.x}
                    cy={node.y}
                    r="4.5"
                    fill="#14213F"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="1"
                    style={{ animationDelay: `${i * 1.2}s` }}
                  />
                ))}
                {AI_RADIAL_NODES.map((node, i) => (
                  <circle
                    key={`travel-${node.key}`}
                    className="rd-ai-data-point"
                    r="3.5"
                    cx="0"
                    cy="0"
                    fill="#C9A876"
                    style={{
                      offsetPath: `path('M 100 125 L ${node.x} ${node.y}')`,
                      animationDelay: `${i * 1.2}s`,
                    }}
                  />
                ))}
              </svg>
              <span
                aria-hidden="true"
                className="rd-ai-hub-pulse absolute rounded-full border border-[#C9A876]/40"
                style={{ left: '50%', top: '50%', width: '20.8%', height: '16.64%' }}
              />
              <span
                className="absolute whitespace-nowrap text-[9px] font-extrabold tracking-[0.04em] text-[#C9A876] uppercase"
                style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
              >
                AI + Data
              </span>
              {AI_RADIAL_NODES.map((node, i) => (
                <span
                  key={node.key}
                  className="absolute text-[11.5px] font-semibold leading-tight"
                  style={{
                    left: `${node.xPct}%`,
                    top: `${node.yPct}%`,
                    transform: node.transform,
                    textAlign: node.align,
                    maxWidth: `${node.maxWidth}px`,
                  }}
                >
                  <span className="rd-ai-node-label" style={{ animationDelay: `${i * 1.2}s` }}>
                    {node.label}
                  </span>
                </span>
              ))}
            </div>

            {/* Tablet (768-1023px): mevcut dekoratif mini-network + gerçek chip listesi kombinasyonu
                birebir korunuyor — mobilde artık üstteki entegre network kullanılıyor. Masaüstünde
                (1024px+) mini-network zaten lg:hidden, chip listesi metnin yanında yatay duruyor. */}
            <div aria-hidden="true" className="relative mx-auto hidden h-[192px] w-[192px] shrink-0 md:block lg:hidden">
              <span
                className="rd-ai-mini-pulse absolute inset-[28%] rounded-full border border-[#C9A876]/40"
              />
              <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
                {[
                  [100, 30], [160.6, 65], [160.6, 135],
                  [100, 170], [39.4, 135], [39.4, 65],
                ].map(([x, y]) => (
                  <line key={`${x}-${y}`} x1="100" y1="100" x2={x} y2={y} stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
                ))}
                <circle cx="100" cy="100" r="15" fill="#0F1E3C" stroke="#C9A876" strokeWidth="1.2" />
                {[
                  [100, 30], [160.6, 65], [160.6, 135],
                  [100, 170], [39.4, 135], [39.4, 65],
                ].map(([x, y]) => (
                  <circle key={`dot-${x}-${y}`} cx={x} cy={y} r="5" fill="#14213F" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
                ))}
              </svg>
            </div>

            <div className="hidden w-full flex-wrap gap-x-2.5 gap-y-3 md:flex lg:hidden">
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

            {/* Desktop (1024px+): 6 pill/chip yerine doğrudan network'ün node'ları. Merkezde AI + DATA
                double-ring hub (çok hafif breathing), çevrede altıgen + hex outline. Node sırası
                aiNodes ile birebir aynı: otomatik sequence Otomasyon→İçerik→Veri→Karar Desteği→
                Operasyon→İş Akışları sırasında aksın diye pozitif animation-delay kullanıldı (bkz.
                mobil versiyonda negatif delay'in sırayı ters çevirdiği, bu sefer baştan doğru yapıldı).
                Aynı anda tek node aktif + merkezden o node'a akan tek champagne data point. */}
            <div className="relative mx-auto hidden aspect-square w-full max-w-[460px] shrink-0 lg:block lg:w-[440px] xl:max-w-[500px] xl:w-[500px]">
              <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden focusable="false">
                <path d={AI_DESKTOP_HEX} className="rd-ai2-hex" />
                {AI_DESKTOP_NODES.map((n, i) => {
                  const p = aiDesktopPoint(n.angle);
                  return (
                    <line
                      key={`line-${n.key}`}
                      x1={AI_DESKTOP_CX}
                      y1={AI_DESKTOP_CY}
                      x2={p.x}
                      y2={p.y}
                      className={`rd-ai2-spoke ${aiDesktopHovered === i ? 'rd-ai2-hot' : ''}`}
                      style={{ animationDelay: `${i * 1.2}s` }}
                    />
                  );
                })}
                <circle cx={AI_DESKTOP_CX} cy={AI_DESKTOP_CY} r="60" className="rd-ai2-hub-ring-outer" />
                <circle cx={AI_DESKTOP_CX} cy={AI_DESKTOP_CY} r="47" fill="#0F1E3C" stroke="#1B5CD6" strokeWidth="1.4" />
                {AI_DESKTOP_NODES.map((n, i) => {
                  const p = aiDesktopPoint(n.angle);
                  return (
                    <circle
                      key={`travel-${n.key}`}
                      r="3.5"
                      cx="0"
                      cy="0"
                      fill="#C9A876"
                      className="rd-ai2-data-point"
                      style={{
                        offsetPath: `path('M ${AI_DESKTOP_CX} ${AI_DESKTOP_CY} L ${p.x} ${p.y}')`,
                        animationDelay: `${i * 1.2}s`,
                      }}
                    />
                  );
                })}
              </svg>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
              >
                <span
                  className="rd-ai2-hub-pulse absolute rounded-full border border-[#C9A876]/40"
                  style={{ width: '118px', height: '118px' }}
                />
                <span className="relative text-[12px] font-bold tracking-[0.2em] text-[#C9A876] uppercase">AI +</span>
                <span className="relative text-[16px] font-extrabold tracking-[0.06em] text-white">DATA</span>
              </div>

              {AI_DESKTOP_NODES.map((n, i) => {
                const p = aiDesktopPoint(n.angle);
                return (
                  <button
                    key={n.key}
                    type="button"
                    className={`rd-ai2-node ${aiDesktopHovered === i ? 'rd-ai2-hot' : ''}`}
                    style={{ left: `${(p.x / 400) * 100}%`, top: `${(p.y / 400) * 100}%`, animationDelay: `${i * 1.2}s` }}
                    aria-label={n.label}
                    onMouseEnter={() => setAiDesktopHovered(i)}
                    onMouseLeave={() => setAiDesktopHovered(null)}
                    onFocus={() => setAiDesktopHovered(i)}
                    onBlur={() => setAiDesktopHovered(null)}
                  >
                    <span aria-hidden="true" className="rd-ai2-node-dot" />
                    <span className="rd-ai2-node-label">{n.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
