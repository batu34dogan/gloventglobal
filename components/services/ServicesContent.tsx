'use client';

import { useEffect, useRef, useState } from 'react';

// Bir elementin viewport'a girip girmediğini takip eder (native IntersectionObserver, yeni paket yok).
// HomeContent.tsx'teki aynı desenin bu dosyaya özel, bağımsız bir kopyası.
function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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

// Ana sayfadaki (HomeContent.tsx) aynı görsel dil — ama bu dosyaya özel, bağımsız kopya.
// HomeContent.tsx'e dokunmamak / import etmemek için bilerek burada yeniden tanımlandı.
function Glow({
  className,
  targetOpacity,
  visible,
}: {
  className: string;
  targetOpacity: string;
  visible: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full transition-opacity duration-[1200ms] ease-out motion-reduce:transition-none ${className} ${
        visible ? targetOpacity : 'opacity-0'
      }`}
      style={{ background: 'radial-gradient(closest-side, rgba(59,130,246,0.22), transparent)' }}
    />
  );
}

const systemPillars = [
  {
    number: '01',
    title: 'Strateji',
    description: 'Ürünün hangi pazarda, hangi müşteri kitlesine ve hangi satış kanalıyla büyüyebileceğini planlarız.',
  },
  {
    number: '02',
    title: 'Altyapı',
    description: 'Pazaryeri, Shopify, B2B katalog veya dijital showroom yapısını markanın ihtiyacına göre kurarız.',
  },
  {
    number: '03',
    title: 'Büyüme',
    description: 'İçerik, reklam, veri ve operasyon süreçlerini sürekli optimize ederek sistemi ölçeklenebilir hale getiririz.',
  },
];

export default function ServicesContent() {
  const [mounted, setMounted] = useState(false);
  const [systemRef, systemInView] = useInView<HTMLElement>();

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Hero içindeki elementler için kademeli giriş (delay class'ları literal/sabit olmalı —
  // Tailwind derleme zamanında metni tarayarak class üretir, dinamik string birleştirme çalışmaz).
  const reveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      mounted ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
    }`;

  // Sistem Mantığı bölümü Hero'nun altında, ekran dışında başlıyor — bu yüzden "mounted"a değil,
  // bu section'ın gerçekten viewport'a girip girmediğine (systemInView) bağlı, ayrı bir reveal.
  const systemReveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      systemInView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
    }`;

  return (
    <main className="relative overflow-hidden bg-[#070d18] font-sans text-white">
      {/* ============ 1. HİZMETLER HERO ============ */}
      <section className="relative px-6 pb-14 pt-24 sm:px-10 md:pb-16 md:pt-28">
        <Glow visible={mounted} targetOpacity="opacity-70" className="left-1/2 top-[-120px] h-[560px] w-[860px] -translate-x-1/2" />
        <Glow visible={mounted} targetOpacity="opacity-50" className="left-[-200px] top-[200px] h-[380px] w-[380px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className={`text-xs font-semibold uppercase tracking-[0.35em] text-blue-300/80 ${reveal('delay-[100ms]')}`}>
            Hizmetler
          </p>
          <h1
            className={`mx-auto mt-8 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl ${reveal(
              'delay-[200ms]',
            )}`}
          >
            Global Satış İçin Uçtan Uca Sistemler
          </h1>
          <p
            className={`mx-auto mt-7 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg ${reveal(
              'delay-[300ms]',
            )}`}
          >
            GloventGlobal; Amazon, Etsy, eBay, Shopify ve B2B dijital altyapılar üzerinden markaların global
            pazarlara açılması için strateji, içerik, altyapı, reklam ve operasyon sistemleri kurar.
          </p>

          <div className={`mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row ${reveal('delay-[400ms]')}`}>
            <a
              href="/#contact"
              className="rounded-full border border-blue-400/40 bg-blue-500/10 px-8 py-3 text-sm font-semibold tracking-wide text-white backdrop-blur-sm transition-all duration-300 hover:border-blue-400/70 hover:bg-blue-500/20 hover:shadow-[0_0_30px_-6px_rgba(59,130,246,0.55)]"
            >
              Hizmet Planı Oluştur
            </a>
            <a
              href="#system-logic"
              className="rounded-full border border-white/15 px-8 py-3 text-sm font-semibold tracking-wide text-white/90 transition-colors duration-300 hover:border-white/35 hover:bg-white/5"
            >
              Sistem Mantığını Gör
            </a>
          </div>
        </div>
      </section>

      {/* ============ 2. SİSTEM MANTIĞI ============ */}
      <section id="system-logic" ref={systemRef} className="relative px-6 pb-20 pt-14 sm:px-10">
        <Glow visible={systemInView} targetOpacity="opacity-45" className="left-1/2 top-0 h-[420px] w-[800px] -translate-x-1/2" />

        <div className="relative mx-auto max-w-3xl text-center">
          <p className={`text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/80 ${systemReveal('delay-[0ms]')}`}>
            Sistem Mantığı
          </p>
          <h2 className={`mx-auto mt-4 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl ${systemReveal('delay-[100ms]')}`}>
            Sadece Hizmet Değil, Birbirine Bağlı Satış Sistemi
          </h2>
          <p
            className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg ${systemReveal(
              'delay-[200ms]',
            )}`}
          >
            Strateji olmadan reklam, içerik olmadan mağaza, altyapı olmadan büyüme sürdürülebilir olmaz.
            GloventGlobal; pazar analizi, marka konumlandırma, dijital altyapı, içerik üretimi, reklam ve operasyon
            süreçlerini tek bir sistem mantığıyla birleştirir.
          </p>
        </div>

        <div className="relative mx-auto mt-10 grid max-w-5xl items-stretch gap-6 lg:grid-cols-3">
          {systemPillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className={systemReveal(['delay-[300ms]', 'delay-[380ms]', 'delay-[460ms]'][index])}
            >
              <div className="relative flex h-full min-h-[170px] flex-col rounded-xl border border-white/[0.09] bg-white/[0.042] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-white/[0.065] hover:shadow-[0_0_45px_-12px_rgba(59,130,246,0.5)]">
                <span
                  aria-hidden="true"
                  className="absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-blue-400/60 via-blue-400/20 to-transparent"
                />
                <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-blue-400/45 bg-blue-500/10 text-xs font-semibold text-blue-300 shadow-[0_0_18px_-2px_rgba(59,130,246,0.65)]">
                  {pillar.number}
                </span>
                <h3 className="mt-4 text-base font-semibold uppercase tracking-[0.15em] text-white">{pillar.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-blue-100/75">{pillar.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}