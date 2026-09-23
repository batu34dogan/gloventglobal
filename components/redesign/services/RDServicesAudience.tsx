'use client';

import { useEffect, useRef, useState } from 'react';

// Kaynak: components/services/ServicesContent.tsx (audienceSegments) — production /hizmetler'in
// "Kimler İçin?" bölümündeki 5 gerçek segmentin başlığı VE tam açıklama metni birebir aynı,
// homepage'in RDAudiences'ı (farklı bir segmentasyon/interaksiyon) tekrar edilmiyor. Kompakt bir
// "bridge" — tam bölüm değil.
const segments = [
  {
    n: '01',
    title: 'Üreticiler',
    desc: 'Ürününü ilk kez global pazarlara taşımak isteyen üreticiler için pazar, kanal ve satış sistemi planı oluştururuz.',
  },
  {
    n: '02',
    title: 'Toptan Satış Yapan Markalar',
    desc: 'Toptan çalışan markalar için dijital katalog, B2B showroom, teklif listesi ve müşteri odaklı ürün sunumu kurgularız.',
  },
  {
    n: '03',
    title: 'Pazaryerlerine Girmek İsteyenler',
    desc: 'Pazaryerlerine giriş yapmak isteyen markalar için mağaza kurulumu, listeleme, SEO, görsel dil ve reklam altyapısını hazırlarız.',
  },
  {
    n: '04',
    title: 'Shopify ile Kendi Sistemini Kurmak İsteyenler',
    desc: 'Kendi markasına ait satış kanalı kurmak isteyen işletmeler için Shopify tabanlı vitrin, ürün yönetimi ve satış deneyimi oluştururuz.',
  },
  {
    n: '05',
    title: 'Marka Algısını Güçlendirmek İsteyenler',
    desc: 'Yalnızca satış değil, marka algısı, görsel bütünlük, sosyal medya ve içerik diliyle global pazarda daha güçlü görünmek isteyen markalara sistem kurarız.',
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
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView] as const;
}

export default function RDServicesAudience() {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <section className="border-t border-[#E5E5EC] bg-[#F6F3EC] py-14 sm:py-16">
      <style>{`
        .rd-aud-block {
          position: relative; opacity: 0; transform: translateY(14px);
          transition: opacity .55s ease, transform .55s ease, border-color .25s ease;
        }
        .rd-aud-block.rd-in { opacity: 1; transform: translateY(0); }
        .rd-aud-num {
          position: absolute; right: 10px; top: -6px; font-size: 52px; font-weight: 800;
          color: rgba(20,33,63,0.05); line-height: 1; pointer-events: none;
        }
        @media (hover: hover) and (pointer: fine) {
          .rd-aud-block:hover { border-color: rgba(27,92,214,0.35); }
          .rd-aud-block:hover .rd-aud-title { color: #1B5CD6; }
        }
        @media (prefers-reduced-motion: reduce) {
          .rd-aud-block, .rd-aud-block.rd-in { opacity: 1 !important; transform: none !important; transition: none !important; }
        }
      `}</style>

      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold tracking-[0.28em] text-[#1B5CD6] uppercase">Kimler İçin</p>
            <h2 className="mt-3 text-[1.9rem] font-extrabold leading-tight tracking-tight text-[#14213F] sm:text-[2.3rem]">
              Hangi Hizmet Sizin İçin Doğru?
            </h2>
          </div>
          <p className="max-w-[42ch] text-[14.5px] leading-relaxed text-[#6A6A7A]">
            Her markanın ihtiyacı aynı değildir — GloventGlobal doğru sistemi ürün yapınıza ve büyüme aşamanıza göre
            belirler.
          </p>
        </div>

        <div ref={ref} className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {segments.map((s, i) => (
            <div
              key={s.title}
              style={{ transitionDelay: inView ? `${i * 80}ms` : '0ms' }}
              className={`rd-aud-block ${inView ? 'rd-in' : ''} overflow-hidden rounded-xl border border-[#E5DFCF] bg-white p-6 ${
                i % 2 === 1 ? 'lg:mt-6' : ''
              }`}
            >
              <span aria-hidden="true" className="rd-aud-num">{s.n}</span>
              <h3 className="rd-aud-title relative text-[14.5px] font-bold leading-snug text-[#14213F] transition-colors duration-300">
                {s.title}
              </h3>
              <p className="relative mt-2.5 text-[12.5px] leading-relaxed text-[#6A6A7A]">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
