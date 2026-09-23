'use client';

import { useEffect, useRef, useState } from 'react';

// Homepage'teki (RDServices.tsx) dört yetkinlik birebir korunuyor — bu dosyaya özel, bağımsız bir
// kopya. Açıklamalar, her pillar'ın gerçek hizmetlerinin serviceDetailsData.ts içeriğinden
// derlendi — yeni bir kapsam/vaat uydurulmadı.
const pillars = [
  {
    n: '01',
    title: 'Strateji',
    desc: 'Markanızın pazarda nasıl algılanacağını, hangi ülke ve kanaldan büyüyeceğini, hangi fiyat konumunda duracağını netleştiririz. Ürün-pazar uyumu, rakip ayrışması ve hedef müşteri kararları bu aşamada birlikte ele alınır.',
    services: ['Marka Konumlandırma', 'Global Pazara Giriş Stratejisi'],
  },
  {
    n: '02',
    title: 'Ticaret',
    desc: 'Amazon, Etsy, eBay, Shopify ve B2B dijital showroom üzerinde satış kanalını kurar, listeleme ve ürün sunumunu satışa hazır hale getiririz. Her kanal kendi dinamiğine göre planlanır, ama markanın tek satış sistemi içinde birbirine bağlı kalır.',
    services: ['Amazon', 'Etsy', 'eBay', 'Shopify', 'B2B Dijital Showroom'],
    secondaryLabel: 'Reklam & Growth',
  },
  {
    n: '03',
    title: 'Teknoloji',
    desc: 'Commerce altyapısını, API ve n8n tabanlı otomasyonları, yapay zeka destekli iş akışlarını satış sisteminize entegre ederiz. Tekrarlayan form, teklif, sipariş ve raporlama süreçleri birbirine bağlı, izlenebilir sistemlere dönüşür.',
    services: ['Shopify Altyapısı', 'Otomasyon & n8n', 'Yapay Zeka Entegrasyonu', 'B2B Teknik Altyapı'],
  },
  {
    n: '04',
    title: 'Operasyon',
    desc: 'Reklam, görsel/içerik üretimi, sosyal medya ve pazaryerlerindeki günlük operasyonu; performans verisine göre sürekli geliştirilen tek bir sistem olarak yürütürüz. Sistemi kurup bırakmayız, veriyle birlikte geliştirmeye devam ederiz.',
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
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView] as const;
}

function handleModuleMove(e: React.PointerEvent<HTMLDivElement>) {
  if (e.pointerType !== 'mouse') return;
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--pm-mx', `${e.clientX - rect.left}px`);
  el.style.setProperty('--pm-my', `${e.clientY - rect.top}px`);
}

export default function RDServicesPillars() {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <section className="border-t border-[#E5E5EC] bg-[#FAF9F6] py-16 sm:py-20">
      <style>{`
        .rd-pm-grid {
          position: absolute; inset: -6% -3%; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(20,33,63,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20,33,63,0.05) 1px, transparent 1px);
          background-size: 28px 28px;
          -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 75%);
          mask-image: radial-gradient(ellipse at center, black 0%, transparent 75%);
        }
        .rd-pm-module {
          position: relative; overflow: hidden; z-index: 1;
          opacity: 0; transform: translateY(14px);
          transition: opacity .55s ease, transform .55s ease, border-color .3s ease, box-shadow .3s ease;
        }
        .rd-pm-module.rd-in { opacity: 1; transform: translateY(0); }
        .rd-pm-inner-grid {
          position: absolute; inset: 0; opacity: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(27,92,214,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(27,92,214,0.06) 1px, transparent 1px);
          background-size: 22px 22px;
          transition: opacity .3s ease;
        }
        .rd-pm-spotlight {
          position: absolute; inset: 0; opacity: 0; pointer-events: none;
          background: radial-gradient(220px circle at var(--pm-mx,50%) var(--pm-my,50%), rgba(27,92,214,0.06), transparent 65%);
          transition: opacity .3s ease;
        }
        .rd-pm-title { transition: transform .3s ease, color .3s ease; display: block; }
        .rd-pm-label { transition: border-color .25s ease, color .25s ease; }
        @media (hover: hover) and (pointer: fine) {
          .rd-pm-module:hover { border-color: rgba(27,92,214,0.35); box-shadow: 0 18px 40px -28px rgba(20,33,63,0.35); }
          .rd-pm-module:hover .rd-pm-inner-grid { opacity: 1; }
          .rd-pm-module:hover .rd-pm-spotlight { opacity: 1; }
          .rd-pm-module:hover .rd-pm-title { transform: translateX(4px); color: #1B5CD6; }
          .rd-pm-module:hover .rd-pm-label { border-color: rgba(27,92,214,0.4); color: #14213F; }
        }
        @media (prefers-reduced-motion: reduce) {
          .rd-pm-module, .rd-pm-module.rd-in { opacity: 1 !important; transform: none !important; transition: none !important; }
          .rd-pm-title { transition: none !important; }
        }
      `}</style>

      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="max-w-[46ch]">
          <p className="text-[11.5px] font-bold tracking-[0.26em] text-[#1B5CD6] uppercase">Büyüme Mimarisi</p>
          <h2 className="mt-3 text-[2.4rem] font-extrabold leading-tight tracking-tight text-[#14213F] sm:text-[3rem]">
            Dört Yetkinlik. Tek Sistem.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#6A6A7A]">
            Her hizmet bu dört yetkinlikten birine veya birkaçına birlikte oturur — birbirinden kopuk ayrı ürünler
            değil, aynı sistemin parçalarıdır.
          </p>
        </div>

        <div ref={ref} className="relative mt-14">
          <span aria-hidden="true" className="rd-pm-grid" />
          <div className="relative grid gap-5 lg:grid-cols-2">
            {pillars.map((p, i) => (
              <div
                key={p.title}
                onPointerMove={handleModuleMove}
                style={{ transitionDelay: inView ? `${i * 110}ms` : '0ms' }}
                className={`rd-pm-module ${inView ? 'rd-in' : ''} rounded-2xl border border-[#E5E5EC] bg-white p-8 sm:p-10 ${
                  i < 2 ? 'lg:py-12' : ''
                }`}
              >
                <span aria-hidden="true" className="rd-pm-inner-grid" />
                <span aria-hidden="true" className="rd-pm-spotlight" />
                <span
                  aria-hidden="true"
                  className="absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-[#1B5CD6] via-[#C9A876] to-transparent sm:left-10 sm:right-10"
                />

                <div className="relative">
                  <span className="text-[13px] font-bold text-[#C4C4CE]">{p.n}</span>
                  <h3 className="rd-pm-title mt-2 text-[1.9rem] font-extrabold text-[#14213F] sm:text-[2.2rem]">
                    {p.title}
                  </h3>
                  <p className="mt-4 max-w-[52ch] text-[14.5px] leading-relaxed text-[#4A4A5A]">{p.desc}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.services.map((s) => (
                      <span
                        key={s}
                        className="rd-pm-label rounded-full border border-[#E0E0E8] px-3 py-1.5 text-[12px] font-medium text-[#4A4A5A]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  {p.secondaryLabel && (
                    <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8A6E43]">
                      + {p.secondaryLabel}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
