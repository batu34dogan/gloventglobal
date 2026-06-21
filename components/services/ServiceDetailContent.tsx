'use client';

import { useEffect, useRef, useState } from 'react';
import { serviceDetails } from './serviceDetailsData';

// Bir elementin viewport'a girip girmediğini takip eder (native IntersectionObserver, yeni paket yok).
// Sitedeki diğer sayfalarla aynı desenin bu dosyaya özel, bağımsız bir kopyası.
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
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView] as const;
}

// Ana sayfadaki / hizmetler / iletişim / hakkımızda sayfalarındaki aynı görsel dil — ama bu dosyaya
// özel, bağımsız kopya. O dosyalara dokunmamak / import etmemek için bilerek burada yeniden tanımlandı.
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

export default function ServiceDetailContent({ slug }: { slug: string }) {
  const data = serviceDetails[slug];
  const [mounted, setMounted] = useState(false);
  const [audienceRef, audienceInView] = useInView<HTMLElement>();

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

  // "Bu Hizmet Kimler İçin?" bölümü Hero'nun altında, ekran dışında başlıyor — kendi viewport
  // girişine bağlı, ayrı reveal.
  const audienceReveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      audienceInView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
    }`;

  // page.tsx zaten slug'ı kontrol edip yoksa notFound() çağırıyor; bu yine de TypeScript'i ve
  // olası ileride doğrudan kullanım hatalarını güvenceye almak için bir son güvenlik katmanı.
  if (!data) {
    return null;
  }

  return (
    <main className="relative overflow-hidden bg-[#070d18] font-sans text-white">
      {/* ============ HİZMET HERO ============
          Üst padding (pt-24/md:pt-28), /hizmetler, /iletisim ve /hakkimizda Hero'larıyla birebir
          aynı — sabit navbar'ın (z-40) yüksekliğini rahatça karşılıyor. Intro yok, sayfa direkt başlıyor. */}
      <section className="relative px-6 pb-14 pt-24 sm:px-10 md:pb-16 md:pt-28">
        <Glow visible={mounted} targetOpacity="opacity-70" className="left-1/2 top-[-120px] h-[560px] w-[860px] -translate-x-1/2" />
        <Glow visible={mounted} targetOpacity="opacity-50" className="left-[-200px] top-[200px] h-[380px] w-[380px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className={`text-xs font-semibold uppercase tracking-[0.35em] text-blue-300/80 ${reveal('delay-[100ms]')}`}>
            {data.eyebrow}
          </p>
          <h1
            className={`mx-auto mt-8 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl ${reveal(
              'delay-[200ms]',
            )}`}
          >
            {data.title}
          </h1>
          <p
            className={`mx-auto mt-7 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg ${reveal(
              'delay-[300ms]',
            )}`}
          >
            {data.description}
          </p>

          <div className={`mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row ${reveal('delay-[400ms]')}`}>
            <a
              href="/iletisim"
              className="rounded-full border border-blue-400/40 bg-blue-500/10 px-8 py-3 text-sm font-semibold tracking-wide text-white backdrop-blur-sm transition-all duration-300 hover:border-blue-400/70 hover:bg-blue-500/20 hover:shadow-[0_0_30px_-6px_rgba(59,130,246,0.55)]"
            >
              {data.ctaLabel}
            </a>
            <a
              href="/hizmetler"
              className="rounded-full border border-white/15 px-8 py-3 text-sm font-semibold tracking-wide text-white/90 transition-colors duration-300 hover:border-white/35 hover:bg-white/5"
            >
              Tüm Hizmetleri Gör
            </a>
          </div>
        </div>
      </section>

      {/* ============ BU HİZMET KİMLER İÇİN? ============
          Hero ile aynı glass/mavi glow dili, numaralı kart yapısı — sitede zaten kanıtlanmış desen. */}
      <section ref={audienceRef} className="relative px-6 pb-20 pt-14 sm:px-10">
        <Glow visible={audienceInView} targetOpacity="opacity-40" className="left-1/2 top-0 h-[420px] w-[800px] -translate-x-1/2" />

        <div className="relative mx-auto max-w-3xl text-center">
          <p
            className={`text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/80 ${audienceReveal(
              'delay-[0ms]',
            )}`}
          >
            {data.audience.eyebrow}
          </p>
          <h2
            className={`mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl ${audienceReveal(
              'delay-[100ms]',
            )}`}
          >
            {data.audience.title}
          </h2>
          <p
            className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg ${audienceReveal(
              'delay-[200ms]',
            )}`}
          >
            {data.audience.description}
          </p>
        </div>

        <div className="relative mx-auto mt-10 grid max-w-6xl items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.audience.cards.map((card, index) => (
            <div
              key={card.number}
              className={audienceReveal(
                ['delay-[0ms]', 'delay-[80ms]', 'delay-[160ms]', 'delay-[240ms]'][index] ?? 'delay-[0ms]',
              )}
            >
              <div className="relative flex h-full min-h-[170px] flex-col rounded-xl border border-white/[0.08] bg-white/[0.035] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-white/[0.06] hover:shadow-[0_0_40px_-12px_rgba(59,130,246,0.45)]">
                <span
                  aria-hidden="true"
                  className="absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-blue-400/55 via-blue-400/20 to-transparent"
                />
                <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-blue-400/45 bg-blue-500/10 text-xs font-semibold text-blue-300 shadow-[0_0_16px_-2px_rgba(59,130,246,0.6)]">
                  {card.number}
                </span>
                <h3 className="mt-4 text-base font-semibold text-white">{card.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-blue-100/75">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}