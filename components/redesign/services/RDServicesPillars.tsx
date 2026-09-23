'use client';

import { useEffect, useRef, useState } from 'react';

// Homepage'teki (RDServices.tsx) dört yetkinlik birebir korunuyor — bu dosyaya özel, bağımsız bir
// kopya (site genelindeki "sayfa izolasyonu" prensibi: her RD* dosyası kendi verisini taşır).
// `services` alanı, kullanıcının audit sonrası verdiği pillar↔hizmet eşleştirmesinin aynısı —
// yeni bir kategori/isim uydurulmadı.
const pillars = [
  {
    n: '01',
    title: 'Strateji',
    desc: 'Pazar, ürün, fiyatlandırma ve büyüme modeli.',
    services: ['Marka Konumlandırma', 'Global Pazara Giriş Stratejisi'],
  },
  {
    n: '02',
    title: 'Ticaret',
    desc: 'Marketplace, Shopify, B2B ve satış kanalları.',
    services: ['Amazon', 'Etsy', 'eBay', 'Shopify', 'B2B Dijital Showroom'],
    secondaryLabel: 'Reklam & Growth',
  },
  {
    n: '03',
    title: 'Teknoloji',
    desc: 'Web, entegrasyon, API, AI ve otomasyon.',
    services: ['Shopify Altyapısı', 'Otomasyon & n8n', 'Yapay Zeka Entegrasyonu', 'B2B Teknik Altyapı'],
  },
  {
    n: '04',
    title: 'Operasyon',
    desc: 'İçerik, ürün, reklam, veri ve günlük operasyon.',
    services: ['Reklam & Optimizasyon', 'Görsel & İçerik Sistemi', 'Sosyal Medya Yönetimi'],
    secondaryLabel: 'Veri & Performans Analizi',
  },
];

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
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView] as const;
}

export default function RDServicesPillars() {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <section className="border-t border-[#E5E5EC] bg-white py-16 sm:py-20">
      <style>{`
        .rd-pillar-row {
          position: relative;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity .55s ease, transform .55s ease;
        }
        .rd-pillar-row.rd-in { opacity: 1; transform: translateY(0); }
        .rd-pillar-accent {
          position: absolute; left: -1px; top: 0; bottom: 0; width: 2px;
          background: linear-gradient(to bottom, #1B5CD6, #C9A876);
          transform: scaleY(0);
          transform-origin: top;
          transition: transform .35s ease;
        }
        @media (hover: hover) and (pointer: fine) {
          .rd-pillar-row:hover { background-color: rgba(27,92,214,0.025); }
          .rd-pillar-row:hover .rd-pillar-accent { transform: scaleY(1); }
          .rd-pillar-row:hover .rd-pillar-title { color: #1B5CD6; }
        }
        @media (prefers-reduced-motion: reduce) {
          .rd-pillar-row, .rd-pillar-row.rd-in { opacity: 1 !important; transform: none !important; transition: none !important; }
        }
      `}</style>

      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="max-w-[46ch]">
          <p className="text-[11.5px] font-bold tracking-[0.26em] text-[#1B5CD6] uppercase">Büyüme Mimarisi</p>
          <h2 className="mt-3 text-[2.2rem] font-extrabold leading-tight tracking-tight text-[#14213F] sm:text-[2.7rem]">
            Dört Yetkinlik. Tek Sistem.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#6A6A7A]">
            Her hizmet bu dört yetkinlikten birine veya birkaçına birlikte oturur — birbirinden kopuk ayrı ürünler
            değil, aynı sistemin parçalarıdır.
          </p>
        </div>

        <div ref={ref} className="mt-12 border-t border-[#E5E5EC]">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              style={{ transitionDelay: inView ? `${i * 90}ms` : '0ms' }}
              className={`rd-pillar-row border-b border-[#E5E5EC] ${inView ? 'rd-in' : ''}`}
            >
              <span aria-hidden="true" className="rd-pillar-accent" />
              <div className="grid gap-3 py-9 pl-5 pr-2 lg:grid-cols-[56px_180px_1fr_1.1fr] lg:items-start lg:gap-8 lg:py-10">
                <span className="text-[13px] font-bold text-[#C4C4CE]">{p.n}</span>
                <h3 className="rd-pillar-title text-[1.6rem] font-extrabold text-[#14213F] transition-colors duration-300">
                  {p.title}
                </h3>
                <p className="text-[14.5px] leading-relaxed text-[#4A4A5A]">{p.desc}</p>
                <div>
                  <div className="flex flex-wrap gap-2">
                    {p.services.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-[#E0E0E8] px-3 py-1.5 text-[12px] font-medium text-[#4A4A5A]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  {p.secondaryLabel && (
                    <p className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8A6E43]">
                      + {p.secondaryLabel}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
