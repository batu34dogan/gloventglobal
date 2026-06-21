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
  const [problemRef, problemInView] = useInView<HTMLElement>();
  const [approachRef, approachInView] = useInView<HTMLElement>();
  const [processRef, processInView] = useInView<HTMLElement>();
  const [deliverablesRef, deliverablesInView] = useInView<HTMLElement>();
  const [ctaRef, ctaInView] = useInView<HTMLElement>();

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

  // "Çözdüğü Sorun" bölümü "Kimler İçin?"in altında, ekran dışında başlıyor — kendi viewport
  // girişine bağlı, ayrı reveal.
  const problemReveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      problemInView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
    }`;

  // "GloventGlobal Nasıl Yaklaşır?" bölümü "Çözdüğü Sorun"un altında, ekran dışında başlıyor —
  // kendi viewport girişine bağlı, ayrı reveal.
  const approachReveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      approachInView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
    }`;

  // "Süreç" bölümü "Nasıl Yaklaşır?"ın altında, ekran dışında başlıyor — kendi viewport girişine
  // bağlı, ayrı reveal.
  const processReveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      processInView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
    }`;

  // "Teslim / Çıktılar" bölümü "Süreç"in altında, ekran dışında başlıyor — kendi viewport girişine
  // bağlı, ayrı reveal.
  const deliverablesReveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      deliverablesInView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
    }`;

  // Final CTA sayfanın en sonunda — kendi viewport girişine bağlı, ayrı reveal.
  const ctaReveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      ctaInView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
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

      {/* ============ ÇÖZDÜĞÜ SORUN ============
          Bilinçli olarak "Kimler İçin?"den farklı: 4 yerine 2 sütunlu (2x2) grid, kartlarda numara
          ve başlık dikey değil yatay (yan yana) yerleşiyor — sorun odaklı olduğu görsel olarak ayrışsın. */}
      <section ref={problemRef} className="relative px-6 pb-20 pt-14 sm:px-10">
        <Glow visible={problemInView} targetOpacity="opacity-35" className="right-[-220px] top-0 h-[420px] w-[420px]" />
        <Glow visible={problemInView} targetOpacity="opacity-25" className="left-[-220px] bottom-0 h-[400px] w-[400px]" />

        <div className="relative mx-auto max-w-3xl text-center">
          <p
            className={`text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/80 ${problemReveal(
              'delay-[0ms]',
            )}`}
          >
            {data.problem.eyebrow}
          </p>
          <h2
            className={`mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl ${problemReveal(
              'delay-[100ms]',
            )}`}
          >
            {data.problem.title}
          </h2>
          <p
            className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg ${problemReveal(
              'delay-[200ms]',
            )}`}
          >
            {data.problem.description}
          </p>
        </div>

        <div className="relative mx-auto mt-10 grid max-w-4xl items-stretch gap-6 sm:grid-cols-2">
          {data.problem.cards.map((card, index) => (
            <div
              key={card.number}
              className={problemReveal(
                ['delay-[0ms]', 'delay-[80ms]', 'delay-[160ms]', 'delay-[240ms]'][index] ?? 'delay-[0ms]',
              )}
            >
              <div className="relative flex h-full min-h-[150px] flex-col rounded-xl border border-white/[0.08] bg-white/[0.035] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-white/[0.06] hover:shadow-[0_0_40px_-12px_rgba(59,130,246,0.45)]">
                <span
                  aria-hidden="true"
                  className="absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-blue-400/55 via-blue-400/20 to-transparent"
                />
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-blue-400/45 bg-blue-500/10 text-xs font-semibold text-blue-300 shadow-[0_0_14px_-2px_rgba(59,130,246,0.6)]">
                    {card.number}
                  </span>
                  <h3 className="text-base font-semibold text-white">{card.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-blue-100/75">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ GLOVENTGLOBAL NASIL YAKLAŞIR? ============
          Bilinçli olarak dolu kart değil — ana sayfanın Süreç bölümündeki "bağlantılı node" görseli
          (numaralı daire + aralarında bağlantı çizgisi). Bu, "Kimler İçin?" ve "Çözdüğü Sorun"
          bölümlerinin (ikisi de dolu glass kart) tekrarı gibi durmuyor; sıralı bir yaklaşım/akış
          hissi veriyor — sorun değil, çözüm odaklı bir his için bilinçli tercih. */}
      <section ref={approachRef} className="relative px-6 pb-20 pt-14 sm:px-10">
        <Glow visible={approachInView} targetOpacity="opacity-40" className="left-1/2 top-0 h-[420px] w-[800px] -translate-x-1/2" />

        <div className="relative mx-auto max-w-3xl text-center">
          <p
            className={`text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/80 ${approachReveal(
              'delay-[0ms]',
            )}`}
          >
            {data.approach.eyebrow}
          </p>
          <h2
            className={`mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl ${approachReveal(
              'delay-[100ms]',
            )}`}
          >
            {data.approach.title}
          </h2>
          <p
            className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg ${approachReveal(
              'delay-[200ms]',
            )}`}
          >
            {data.approach.description}
          </p>
        </div>

        <div
          className={`relative mx-auto mt-14 grid max-w-5xl gap-y-10 sm:grid-cols-2 lg:grid-cols-4 ${approachReveal(
            'delay-[300ms]',
          )}`}
        >
          {/* Mobil için dikey bağlantı çizgisi (sadece tek sütunken anlamlı) — yükseklik
              konteynere göre otomatik uzar. Tablet'in 2 sütunlu grid'inde hiçbir çizgi yok (orta
              boy ekranda ne dikey ne yatay çizgi öğeleri doğru bağlayamaz), desktop'ta yatay çizgi var. */}
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-6 bottom-6 block w-px -translate-x-1/2 bg-gradient-to-b from-blue-400/45 via-blue-400/25 to-blue-400/45 sm:hidden"
          />

          {data.approach.steps.map((step, index) => (
            <div key={step.number} className="group relative flex flex-col items-center text-center">
              {index < data.approach.steps.length - 1 && (
                <span className="absolute left-1/2 top-[24px] hidden h-px w-full bg-gradient-to-r from-blue-400/70 to-transparent lg:block" />
              )}
              <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-blue-400/55 bg-white/[0.045] text-sm font-semibold text-blue-300 shadow-[0_0_24px_-2px_rgba(59,130,246,0.75)] backdrop-blur-sm transition-all duration-300 group-hover:border-blue-400/85 group-hover:shadow-[0_0_32px_-2px_rgba(59,130,246,0.95)]">
                {step.number}
              </span>
              <h3 className="mt-4 text-base font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-blue-100/65 transition-colors duration-300 group-hover:text-blue-100/85">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ SÜREÇ ============
          Bilinçli olarak hem kart grid'lerinden (Kimler İçin / Çözdüğü Sorun) hem yatay node
          akışından (Nasıl Yaklaşır?) farklı: dikey, sola hizalı bir "yol haritası" timeline'ı —
          numaralı işaretler arasında dikey bağlantı çizgisi, sağında başlık+açıklama. Bu yapı
          mobil/desktop'ta aynı (tek sütun), bu yüzden breakpoint'e bağlı layout shift riski yok. */}
      <section ref={processRef} className="relative px-6 pb-20 pt-14 sm:px-10">
        <Glow visible={processInView} targetOpacity="opacity-35" className="right-[-220px] top-0 h-[420px] w-[420px]" />

        <div className="relative mx-auto max-w-3xl text-center">
          <p
            className={`text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/80 ${processReveal(
              'delay-[0ms]',
            )}`}
          >
            {data.process.eyebrow}
          </p>
          <h2
            className={`mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl ${processReveal(
              'delay-[100ms]',
            )}`}
          >
            {data.process.title}
          </h2>
          <p
            className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg ${processReveal(
              'delay-[200ms]',
            )}`}
          >
            {data.process.description}
          </p>
        </div>

        <div className="relative mx-auto mt-12 max-w-2xl">
          {/* Dikey bağlantı çizgisi — işaretlerin merkezinden geçecek şekilde sola hizalı,
              konteynerin gerçek yüksekliğine göre otomatik uzar (sabit piksel tahmini yok). */}
          <span
            aria-hidden="true"
            className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-blue-400/50 via-blue-400/25 to-transparent"
          />

          {data.process.steps.map((step, index) => (
            <div
              key={step.number}
              className={`relative flex gap-5 pb-10 last:pb-0 ${processReveal(
                ['delay-[0ms]', 'delay-[60ms]', 'delay-[120ms]', 'delay-[180ms]', 'delay-[240ms]'][index] ?? 'delay-[0ms]',
              )}`}
            >
              <span className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-blue-400/55 bg-[#070d18] text-xs font-semibold text-blue-300 shadow-[0_0_18px_-2px_rgba(59,130,246,0.6)]">
                {step.number}
              </span>
              <div className="pt-1.5">
                <h3 className="text-base font-semibold text-white">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-blue-100/70">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ TESLİM / ÇIKTILAR ============
          Net bir "çıktı listesi" hissi için kanıtlanmış numaralı kart deseni — sitede zaten
          kullanılan glass kart dili, 6 öğe için 3+3 desktop düzeni. */}
      <section ref={deliverablesRef} className="relative px-6 pb-20 pt-14 sm:px-10">
        <Glow visible={deliverablesInView} targetOpacity="opacity-40" className="left-1/2 top-0 h-[420px] w-[800px] -translate-x-1/2" />

        <div className="relative mx-auto max-w-3xl text-center">
          <p
            className={`text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/80 ${deliverablesReveal(
              'delay-[0ms]',
            )}`}
          >
            {data.deliverables.eyebrow}
          </p>
          <h2
            className={`mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl ${deliverablesReveal(
              'delay-[100ms]',
            )}`}
          >
            {data.deliverables.title}
          </h2>
          <p
            className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg ${deliverablesReveal(
              'delay-[200ms]',
            )}`}
          >
            {data.deliverables.description}
          </p>
        </div>

        <div className="relative mx-auto mt-10 grid max-w-5xl items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.deliverables.items.map((item, index) => (
            <div
              key={item.number}
              className={deliverablesReveal(
                ['delay-[0ms]', 'delay-[60ms]', 'delay-[120ms]', 'delay-[180ms]', 'delay-[240ms]', 'delay-[300ms]'][
                  index
                ] ?? 'delay-[0ms]',
              )}
            >
              <div className="relative flex h-full min-h-[160px] flex-col rounded-xl border border-white/[0.08] bg-white/[0.035] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-white/[0.06] hover:shadow-[0_0_40px_-12px_rgba(59,130,246,0.45)]">
                <span
                  aria-hidden="true"
                  className="absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-blue-400/55 via-blue-400/20 to-transparent"
                />
                <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-blue-400/45 bg-blue-500/10 text-xs font-semibold text-blue-300 shadow-[0_0_16px_-2px_rgba(59,130,246,0.6)]">
                  {item.number}
                </span>
                <h3 className="mt-4 text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-blue-100/75">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ FİNAL CTA ============
          Diğer sayfalardaki Final CTA panelleriyle aynı glass dil — küçük, sakin bir kapanış. */}
      <section ref={ctaRef} className="relative px-6 pb-24 pt-14 sm:px-10">
        <Glow visible={ctaInView} targetOpacity="opacity-55" className="left-1/2 top-0 h-[460px] w-[800px] -translate-x-1/2" />

        <div
          className={`relative mx-auto max-w-2xl rounded-2xl border border-white/[0.08] bg-white/[0.035] px-6 py-10 text-center backdrop-blur-sm sm:px-12 sm:py-12 ${ctaReveal(
            'delay-[0ms]',
          )}`}
        >
          <span
            aria-hidden="true"
            className="absolute left-10 right-10 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent"
          />

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{data.finalCta.title}</h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-blue-100/70 sm:text-lg">
            {data.finalCta.description}
          </p>

          <p className="mt-6 text-xs font-medium uppercase tracking-[0.25em] text-blue-100/45">
            {data.finalCta.supportText}
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/iletisim"
              className="inline-block rounded-full border border-blue-400/45 bg-blue-500/10 px-10 py-3.5 text-sm font-semibold tracking-wide text-white backdrop-blur-sm transition-all duration-300 hover:border-blue-400/75 hover:bg-blue-500/20 hover:shadow-[0_0_36px_-6px_rgba(59,130,246,0.6)]"
            >
              {data.finalCta.ctaLabel}
            </a>
            <a
              href="/hizmetler"
              className="inline-block rounded-full border border-white/15 px-10 py-3.5 text-sm font-semibold tracking-wide text-white/90 transition-colors duration-300 hover:border-white/35 hover:bg-white/5"
            >
              Tüm Hizmetleri Gör
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}