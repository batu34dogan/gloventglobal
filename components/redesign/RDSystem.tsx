'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

const steps = [
  { n: '01', title: 'Fırsat', desc: 'Pazar fırsatı ve doğru konumlanma.' },
  { n: '02', title: 'Kanal', desc: 'Doğru kanal ve pazar yeri seçimi.' },
  { n: '03', title: 'Altyapı', desc: 'Teknik altyapı ve sistem kurulumu.' },
  { n: '04', title: 'Operasyon', desc: 'Günlük yürütme ve optimizasyon.' },
  { n: '05', title: 'Büyüme', desc: 'Ölçekli, sürdürülebilir büyüme.', outcome: true },
];

// Node centers as % of the horizontal diagram box — aligned to a 5-column grid (10/30/50/70/90)
// so the text row beneath lines up exactly under each node without extra math.
const NODE_X = [10, 30, 50, 70, 90];
const NODE_Y = [71, 46, 71, 46, 33]; // gentle up/down orbital wave, ending high on Growth

// Four cubic-bezier segments (smooth curve through the 5 node points above), viewBox 0 0 1200 210.
const SEGMENTS_H = [
  'M120,149 C200,149 280,97 360,97',
  'M360,97 C440,97 520,149 600,149',
  'M600,149 C680,149 760,97 840,97',
  'M840,97 C920,97 1000,69 1080,69',
];
const FULL_PATH_H = 'M120,149 C200,149 280,97 360,97 C440,97 520,149 600,149 C680,149 760,97 840,97 C920,97 1000,69 1080,69';
const RETURN_PATH_H = 'M1080,69 Q600,4 120,149';

// Vertical mobile variant, viewBox 0 0 120 620 (stretches to the row stack's real height).
const FULL_PATH_V = 'M40,60 C40,120 88,130 88,190 C88,250 40,260 40,320 C40,380 88,390 88,450 C88,510 62,520 62,560';
const RETURN_PATH_V = 'M62,560 Q10,320 40,60';

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

function NodeButton({
  step,
  index,
  hovered,
  onHover,
  style,
  delayMs,
  active,
}: {
  step: (typeof steps)[number];
  index: number;
  hovered: boolean;
  onHover: (i: number | null) => void;
  style: React.CSSProperties;
  delayMs: number;
  active: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={`${step.n} ${step.title}`}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(index)}
      onBlur={() => onHover(null)}
      style={{ ...style, transitionDelay: `${delayMs}ms` }}
      className={`rd-sys-node pointer-events-auto absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[12.5px] font-bold ${
        step.outcome
          ? 'border-2 border-[#1B5CD6] bg-white text-[#1B5CD6]'
          : 'border border-[#DCDCE2] bg-[#FEFCF9] text-[#14213F]'
      } ${hovered ? 'rd-sys-node-hover' : ''} ${active ? 'rd-sys-in' : ''}`}
    >
      {step.n}
    </button>
  );
}

export default function RDSystem() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = wrapRef.current;
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
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="border-t border-[#E8E8EC] bg-white py-16 sm:py-20">
      <style>{`
        .rd-sys-bgpattern {
          position: absolute; inset: -10% -2% auto -2%; height: 130%; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(20,33,63,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20,33,63,0.04) 1px, transparent 1px);
          background-size: 26px 26px;
          -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 72%);
          mask-image: radial-gradient(ellipse at center, black 0%, transparent 72%);
        }

        .rd-sys-seg {
          fill: none;
          stroke: #B1B4BC;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-dasharray: 420;
          stroke-dashoffset: 420;
          transition: stroke-dashoffset .55s ease, stroke .3s ease, stroke-width .3s ease;
        }
        .rd-sys-diagram.rd-in .rd-sys-seg { stroke-dashoffset: 0; }
        .rd-sys-seg[data-i="0"] { transition-delay: 0ms; }
        .rd-sys-seg[data-i="1"] { transition-delay: 220ms; }
        .rd-sys-seg[data-i="2"] { transition-delay: 440ms; }
        .rd-sys-seg[data-i="3"] { transition-delay: 660ms; }
        .rd-sys-seg.rd-sys-seg-hot { stroke: #1B5CD6; stroke-width: 2.75; }

        .rd-sys-return {
          fill: none;
          stroke: #C9A876;
          stroke-width: 1.25;
          stroke-linecap: round;
          stroke-dasharray: 4 5;
          opacity: 0;
          transition: opacity .6s ease;
          transition-delay: 900ms;
        }
        .rd-sys-diagram.rd-in .rd-sys-return { opacity: .4; }

        .rd-sys-return-label {
          opacity: 0;
          transition: opacity .6s ease;
          transition-delay: 950ms;
        }
        .rd-sys-diagram.rd-in .rd-sys-return-label { opacity: .85; }

        .rd-sys-pulse-dot { opacity: 0; filter: drop-shadow(0 0 3px rgba(201,168,118,0.65)); transition: opacity .4s ease; transition-delay: 1000ms; }
        .rd-sys-diagram.rd-in .rd-sys-pulse-dot { opacity: 1; }

        .rd-sys-node {
          opacity: 0;
          transform: translate(-50%, calc(-50% + 10px));
          transition: opacity .5s ease, transform .3s ease, border-color .25s ease, box-shadow .25s ease;
        }
        .rd-sys-node.rd-sys-in { opacity: 1; transform: translate(-50%, -50%); }
        @media (hover: hover) and (pointer: fine) {
          .rd-sys-node:hover, .rd-sys-node-hover {
            transform: translate(-50%, calc(-50% - 3px)) scale(1.04);
            border-color: #1B5CD6 !important;
            box-shadow: 0 0 0 4px rgba(27,92,214,0.12);
          }
        }

        .rd-sys-text { transition: opacity .3s ease, color .3s ease; }
        .rd-sys-text-active h3 { color: #1B5CD6; }
        .rd-sys-text-active p { opacity: .9; }

        .rd-sys-connector {
          position: absolute; top: 0; width: 1px; height: 100%;
          background: linear-gradient(to bottom, rgba(27,92,214,0.25), rgba(27,92,214,0.05));
          opacity: 0;
          transition: opacity .6s ease;
        }
        .rd-sys-connectors.rd-in .rd-sys-connector { opacity: 1; }
        .rd-sys-connectors.rd-in .rd-sys-connector[data-i="1"] { transition-delay: 80ms; }
        .rd-sys-connectors.rd-in .rd-sys-connector[data-i="2"] { transition-delay: 160ms; }
        .rd-sys-connectors.rd-in .rd-sys-connector[data-i="3"] { transition-delay: 240ms; }
        .rd-sys-connectors.rd-in .rd-sys-connector[data-i="4"] { transition-delay: 320ms; }

        @media (prefers-reduced-motion: reduce) {
          .rd-sys-seg, .rd-sys-diagram.rd-in .rd-sys-seg {
            stroke-dashoffset: 0 !important;
            transition: none !important;
          }
          .rd-sys-return, .rd-sys-diagram.rd-in .rd-sys-return { opacity: .4 !important; transition: none !important; }
          .rd-sys-return-label, .rd-sys-diagram.rd-in .rd-sys-return-label { opacity: .85 !important; transition: none !important; }
          .rd-sys-node, .rd-sys-node.rd-sys-in, .rd-sys-node:hover, .rd-sys-node-hover {
            opacity: 1 !important; transform: translate(-50%, -50%) !important; transition: none !important; box-shadow: none !important;
          }
          .rd-sys-connector, .rd-sys-connectors.rd-in .rd-sys-connector { opacity: 1 !important; transition: none !important; }
        }
      `}</style>

      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="max-w-[44ch]">
          <p className="text-[11.5px] font-bold tracking-[0.26em] text-[#1B5CD6] uppercase">Gerçek Çalışma Süreci</p>
          <h2 className="mt-3 text-[2.6rem] font-extrabold leading-tight tracking-tight text-[#14213F] sm:text-[3.1rem]">
            Stratejiden Çalışan Sisteme.
          </h2>
        </div>

        <div ref={wrapRef} className="relative mt-16">
          <span aria-hidden className="rd-sys-bgpattern" />

          {/* Desktop / tablet — horizontal orbital path */}
          <div className="relative z-10 hidden sm:block">
            <div className={`rd-sys-diagram relative ${inView ? 'rd-in' : ''}`}>
              <svg viewBox="0 0 1200 210" className="w-full" aria-hidden focusable="false">
                <path d={RETURN_PATH_H} className="rd-sys-return" />
                {SEGMENTS_H.map((d, i) => (
                  <path
                    key={i}
                    d={d}
                    data-i={i}
                    className={`rd-sys-seg ${hovered === i || hovered === i + 1 ? 'rd-sys-seg-hot' : ''}`}
                  />
                ))}
                {!reducedMotion && (
                  <circle r="4" fill="#C9A876" className="rd-sys-pulse-dot">
                    <animateMotion dur="7s" repeatCount="indefinite" path={FULL_PATH_H} rotate="auto" />
                  </circle>
                )}
              </svg>
              <div className="pointer-events-none absolute inset-0">
                {steps.map((s, i) => (
                  <NodeButton
                    key={s.n}
                    step={s}
                    index={i}
                    hovered={hovered === i}
                    onHover={setHovered}
                    active={inView}
                    delayMs={900 + i * 90}
                    style={{ left: `${NODE_X[i]}%`, top: `${NODE_Y[i]}%` }}
                  />
                ))}
              </div>
              <span
                aria-hidden
                className="rd-sys-return-label absolute text-[9.5px] font-bold tracking-[0.18em] text-[#B8935A] uppercase"
                style={{ left: '48%', top: '7px', transform: 'translate(-50%, 0)' }}
              >
                Sürekli Optimizasyon
              </span>
            </div>

            <div className="mt-4 grid grid-cols-5 gap-x-4 text-center">
              {steps.map((s, i) => (
                <div key={s.n} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} className={`rd-sys-text ${hovered === i ? 'rd-sys-text-active' : ''}`}>
                  <h3 className={`text-[16px] font-bold ${s.outcome ? 'text-[#1B5CD6]' : 'text-[#14213F]'}`}>{s.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-[#6A6A7A]">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile — vertical flow */}
          <div className="relative z-10 sm:hidden">
            <div className={`rd-sys-diagram relative flex ${inView ? 'rd-in' : ''}`}>
              <div className="relative w-[70px] shrink-0">
                <svg viewBox="0 0 120 620" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden focusable="false">
                  <path d={RETURN_PATH_V} className="rd-sys-return" />
                  <path d={FULL_PATH_V} className="rd-sys-seg" data-i="0" style={{ strokeDasharray: 640, strokeDashoffset: inView ? 0 : 640 }} />
                  {!reducedMotion && (
                    <circle r="4" fill="#C9A876" className="rd-sys-pulse-dot">
                      <animateMotion dur="7s" repeatCount="indefinite" path={FULL_PATH_V} rotate="auto" />
                    </circle>
                  )}
                </svg>
                {steps.map((s, i) => (
                  <NodeButton
                    key={s.n}
                    step={s}
                    index={i}
                    hovered={false}
                    onHover={() => {}}
                    active={inView}
                    delayMs={500 + i * 90}
                    style={{ left: '46%', top: `${(i / (steps.length - 1)) * 96 + 2}%` }}
                  />
                ))}
              </div>
              <div className="flex flex-1 flex-col justify-between py-1">
                {steps.map(s => (
                  <div key={s.n} className="min-h-[112px] pl-2">
                    <h3 className={`text-[16px] font-bold ${s.outcome ? 'text-[#1B5CD6]' : 'text-[#14213F]'}`}>{s.title}</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-[#6A6A7A]">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-2 text-[9.5px] font-bold tracking-[0.18em] text-[#B8935A] uppercase">Sürekli Optimizasyon</p>
          </div>
        </div>

        {/* AI + DATA — continuous layer running underneath the whole process */}
        <div className="relative mt-10">
          <div aria-hidden className="rd-sys-connectors relative z-0 hidden h-8 sm:block">
            {NODE_X.map((x, i) => (
              <span key={i} data-i={i} className="rd-sys-connector" style={{ left: `${x}%` }} />
            ))}
          </div>
          <div className="relative z-10 flex flex-wrap items-center gap-4 rounded-2xl bg-[#0F1E3C] px-6 py-5">
            <span className="text-[12px] font-bold tracking-[0.28em] text-[#C9A876] uppercase">AI + Data</span>
            <span aria-hidden className="hidden h-px flex-1 bg-white/15 sm:block" />
            <span className="text-[14px] text-white/60">Fırsattan büyümeye kadar sürecin tamamında sürekli çalışan yatay katman.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
