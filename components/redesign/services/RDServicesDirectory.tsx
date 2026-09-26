'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { serviceDirectoryGroups as groups } from './servicesDirectoryData';

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

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
      { threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView] as const;
}

// Desktop-only "system module" kartı (lg+, sağdaki explorer panelinde) — mobile hâlâ aynı
// ServiceRow'u kullanıyor, bu görevde mobile markup'a dokunulmadı.
function ServiceModule({ item }: { item: (typeof groups)[number]['items'][number] }) {
  return (
    <Link
      href={`/hizmetler/${item.slug}`}
      className="rd-exp-module group relative block overflow-hidden rounded-2xl border border-[#E5E5EC] bg-white p-8"
    >
      <span aria-hidden="true" className="rd-exp-module-accent" />
      <span aria-hidden="true" className="rd-exp-module-grid" />
      <div className="relative flex items-start justify-between gap-8">
        <div className="max-w-[600px]">
          <h4 className="rd-exp-module-title text-[20px] font-bold text-[#14213F]">{item.title}</h4>
          <p className="mt-2.5 text-[14.5px] leading-relaxed text-[#6A6A7A]">{item.desc}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {item.labels.map((label) => (
              <span
                key={label}
                className="rounded-full border border-[#E0E0E8] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.03em] text-[#6F6F79]"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
        <span className="mt-1 flex shrink-0 items-center gap-1 text-[13.5px] font-semibold text-[#1B5CD6]">
          Detayları İncele <span aria-hidden="true" className="rd-exp-arrow">→</span>
        </span>
      </div>
    </Link>
  );
}

function ServiceRow({ item }: { item: (typeof groups)[number]['items'][number] }) {
  return (
    <Link
      href={`/hizmetler/${item.slug}`}
      className="rd-exp-row group relative flex flex-col gap-3 py-7 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
    >
      <span aria-hidden="true" className="rd-exp-accent" />
      <div className="max-w-[640px]">
        <h4 className="rd-exp-title text-[18px] font-bold text-[#14213F]">{item.title}</h4>
        <p className="mt-1.5 text-[14px] leading-relaxed text-[#6A6A7A]">{item.desc}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.labels.map((label) => (
            <span
              key={label}
              className="rounded-full border border-[#E0E0E8] px-2.5 py-1 text-[10.5px] font-medium uppercase tracking-[0.03em] text-[#6F6F79]"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
      <span className="shrink-0 text-[13.5px] font-semibold text-[#1B5CD6]">
        Detayları İncele <span aria-hidden="true" className="rd-exp-arrow">→</span>
      </span>
    </Link>
  );
}

export default function RDServicesDirectory() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const [active, setActive] = useState(0);

  return (
    <section id="hizmetler" className="scroll-mt-20 bg-white py-16 sm:py-20">
      <style>{`
        .rd-exp-row { position: relative; transition: background-color .25s ease; }
        .rd-exp-accent {
          position: absolute; left: -1px; top: 0; bottom: 0; width: 2px;
          background: linear-gradient(to bottom, #1B5CD6, #C9A876);
          transform: scaleY(0); transform-origin: top; transition: transform .3s ease;
        }
        .rd-exp-title { transition: color .25s ease, transform .25s ease; display: inline-block; }
        .rd-exp-arrow { display: inline-block; transition: transform .25s ease; }
        @media (hover: hover) and (pointer: fine) {
          .rd-exp-row:hover { background-color: rgba(27,92,214,0.035); }
          .rd-exp-row:hover .rd-exp-accent { transform: scaleY(1); }
          .rd-exp-row:hover .rd-exp-title { color: #1B5CD6; transform: translateX(3px); }
          .rd-exp-row:hover .rd-exp-arrow { transform: translateX(3px); }
        }
        .rd-exp-nav-btn {
          position: relative; display: flex; width: 100%; align-items: center; justify-content: space-between;
          gap: 12px; border-radius: 12px; padding: 14px 16px; text-align: left;
          transition: background-color .25s ease, color .25s ease;
        }
        .rd-exp-nav-btn[aria-current="true"] { background-color: rgba(27,92,214,0.06); }
        .rd-exp-nav-btn:not([aria-current="true"]):hover { background-color: rgba(20,33,63,0.03); }
        .rd-exp-panel {
          opacity: 0; transform: translateY(8px);
          animation: rd-exp-fade .4s ease forwards;
        }
        @keyframes rd-exp-fade { to { opacity: 1; transform: translateY(0); } }
        .rd-exp-module { transition: border-color .3s ease, box-shadow .3s ease, background-color .3s ease; }
        .rd-exp-module-accent {
          position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
          background: linear-gradient(to bottom, #1B5CD6, #C9A876);
          opacity: .35; transition: opacity .3s ease;
        }
        .rd-exp-module-grid {
          position: absolute; inset: 0; opacity: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(27,92,214,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(27,92,214,0.05) 1px, transparent 1px);
          background-size: 22px 22px;
          transition: opacity .3s ease;
        }
        .rd-exp-module-title { transition: color .25s ease, transform .25s ease; display: inline-block; }
        @media (hover: hover) and (pointer: fine) {
          .rd-exp-module:hover {
            border-color: rgba(27,92,214,0.3); background-color: rgba(27,92,214,0.015);
            box-shadow: 0 16px 36px -28px rgba(20,33,63,0.35);
          }
          .rd-exp-module:hover .rd-exp-module-accent { opacity: 1; }
          .rd-exp-module:hover .rd-exp-module-grid { opacity: 1; }
          .rd-exp-module:hover .rd-exp-module-title { color: #1B5CD6; transform: translateX(3px); }
        }
        .rd-exp-group {
          opacity: 0; transform: translateY(10px);
          transition: opacity .55s ease, transform .55s ease;
        }
        .rd-exp-group.rd-in { opacity: 1; transform: translateY(0); }
        @media (prefers-reduced-motion: reduce) {
          .rd-exp-group, .rd-exp-group.rd-in { opacity: 1 !important; transform: none !important; transition: none !important; }
          .rd-exp-panel { animation: none !important; opacity: 1 !important; transform: none !important; }
          .rd-exp-title, .rd-exp-arrow, .rd-exp-module-title { transition: none !important; }
          .rd-exp-row:hover .rd-exp-title, .rd-exp-row:hover .rd-exp-arrow { transform: none !important; }
          .rd-exp-module:hover .rd-exp-module-title { transform: none !important; }
        }

        /* Mobil accordion — native <details>/<summary>: JS olmadan da çalışır (tarayıcı nativesi),
           tüm hizmet içeriği her zaman DOM'da/HTML kaynağında kalır (SEO), klavye ve dokunma
           erişimi native olarak gelir. */
        .rd-acc-summary { cursor: pointer; list-style: none; }
        .rd-acc-summary::-webkit-details-marker { display: none; }
        .rd-acc-chevron { transition: transform .3s ease; }
        details[open] > .rd-acc-summary .rd-acc-chevron { transform: rotate(180deg); }
        .rd-acc-summary:focus-visible { outline: 2px solid rgba(27,92,214,0.5); outline-offset: -2px; }
        @media (prefers-reduced-motion: reduce) {
          .rd-acc-chevron { transition: none !important; }
        }
      `}</style>

      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="max-w-[52ch]">
          <p className="text-[11.5px] font-bold tracking-[0.26em] text-[#1B5CD6] uppercase">Çözümler</p>
          <h2 className="mt-3 text-[2.4rem] font-extrabold leading-tight tracking-tight text-[#14213F] sm:text-[3rem]">
            İhtiyacınıza Göre Kurduğumuz Sistemler.
          </h2>
        </div>

        {/* Desktop — sticky category nav + active category panel */}
        <div className="mt-14 hidden lg:grid lg:grid-cols-[240px_1fr] lg:gap-14">
          <nav aria-label="Hizmet kategorileri" className="sticky top-24 flex h-fit flex-col gap-1.5">
            {groups.map((g, i) => (
              <button
                key={g.category}
                type="button"
                aria-current={active === i}
                onClick={() => setActive(i)}
                className="rd-exp-nav-btn"
              >
                <span className="flex items-center gap-3">
                  <span className="text-[12px] font-bold text-[#C4C4CE]">{String(i + 1).padStart(2, '0')}</span>
                  <span
                    className={`text-[15px] font-bold ${active === i ? 'text-[#1B5CD6]' : 'text-[#14213F]'}`}
                  >
                    {g.category}
                  </span>
                </span>
                <span className="text-[11px] font-medium text-[#B8B8C2]">{g.items.length}</span>
              </button>
            ))}
          </nav>

          <div key={active} className="rd-exp-panel flex flex-col gap-5 lg:min-h-[480px]">
            {groups[active].items.map((item) => (
              <ServiceModule key={item.slug} item={item} />
            ))}
          </div>
        </div>

        {/* Mobile / tablet — 4 category accordion (native <details>, tüm 12 hizmet her zaman DOM'da).
            İlk kategori (Strateji) varsayılan açık, diğerleri kapalı; kullanıcı dokununca açılır. */}
        <div ref={ref} className="mt-12 flex flex-col gap-3 lg:hidden">
          {groups.map((group, gi) => (
            <details
              key={group.category}
              open={gi === 0}
              style={{ transitionDelay: inView ? `${gi * 90}ms` : '0ms' }}
              className={`rd-exp-group ${inView ? 'rd-in' : ''} overflow-hidden rounded-2xl border border-[#E5E5EC] bg-white`}
            >
              <summary className="rd-acc-summary flex items-center justify-between gap-4 px-5 py-4">
                <span className="flex items-center gap-3">
                  <span className="text-[12px] font-bold text-[#C4C4CE]">{String(gi + 1).padStart(2, '0')}</span>
                  <span className="text-[14.5px] font-bold uppercase tracking-[0.1em] text-[#14213F]">
                    {group.category}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-2.5">
                  <span className="text-[11px] font-medium text-[#B8B8C2]">{group.items.length} hizmet</span>
                  <svg aria-hidden="true" className="rd-acc-chevron h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="#71717D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 7.5l5 5 5-5" />
                  </svg>
                </span>
              </summary>
              <div className="divide-y divide-[#E5E5EC] border-t border-[#E5E5EC] px-5">
                {group.items.map((item) => (
                  <ServiceRow key={item.slug} item={item} />
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
