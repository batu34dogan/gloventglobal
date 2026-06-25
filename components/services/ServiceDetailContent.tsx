'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { serviceDetails } from './serviceDetailsData';
import { trackEvent } from '@/lib/analytics';

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

// Büyük başlıkların arkasına oturan, Hero'da kanıtlanmış aynı teknik: başlığın KENDİ (relative
// isolate) wrapper'ına sıkıca bağlı bir radial ışık katmanı — eyebrow+başlık+açıklamayı içeren
// daha büyük bloğun ortasına değil, doğrudan başlığın arkasına. "normal" 6 büyük section
// başlığında, "subtle" sadece Final CTA'da (daha hafif) kullanılıyor. Hero kendi özel/daha güçlü
// glow'unu kullanıyor (bu helper'dan bağımsız, değişmedi). Kartlara veya carousel'e dokunmuyor.
function SectionTitleGlow({ intensity }: { intensity: 'normal' | 'subtle' }) {
  const sizeClass =
    intensity === 'normal'
      ? 'h-[200px] w-[min(560px,85vw)] sm:h-[230px] sm:w-[min(620px,82vw)]'
      : 'h-[170px] w-[min(480px,80vw)] sm:h-[190px] sm:w-[min(520px,78vw)]';
  const opacityClass = intensity === 'normal' ? 'opacity-[0.26]' : 'opacity-[0.16]';

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 ${sizeClass} rounded-full blur-2xl ${opacityClass}`}
      style={{
        background: 'radial-gradient(closest-side, rgba(255,255,255,0.9), rgba(96,165,250,0.5) 45%, transparent 75%)',
      }}
    />
  );
}

export default function ServiceDetailContent({ slug }: { slug: string }) {
  const data = serviceDetails[slug];
  const [mounted, setMounted] = useState(false);
  const [audienceRef, audienceInView] = useInView<HTMLElement>();
  const [problemRef, problemInView] = useInView<HTMLElement>();
  const [approachRef, approachInView] = useInView<HTMLElement>();
  const [useCasesRef, useCasesInView] = useInView<HTMLElement>();
  const [dataSystemRef, dataSystemInView] = useInView<HTMLElement>();
  const [compositionRef, compositionInView] = useInView<HTMLElement>();
  // Bir görsel yüklenemezse (yanlış dosya adı, eksik dosya vb.) src'sini buraya ekleyip o kartı
  // çirkin "kırık görsel + alt text" yerine zarif bir koyu placeholder ile gösteriyoruz.
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [processRef, processInView] = useInView<HTMLElement>();
  const [deliverablesRef, deliverablesInView] = useInView<HTMLElement>();
  const [workModelRef, workModelInView] = useInView<HTMLElement>();
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

  // Opsiyonel "kullanım alanları" bölümü (sadece data.useCases tanımlıysa render edilir) —
  // kendi viewport girişine (useCasesInView) bağlı.
  const useCasesReveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      useCasesInView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
    }`;

  // "Veriyle Yönetilen Sistem" bölümü "Nasıl Yaklaşır?"ın altında, ekran dışında başlıyor — kendi
  // viewport girişine bağlı, ayrı reveal.
  const dataSystemReveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      dataSystemInView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
    }`;

  // Opsiyonel "sistem haritası" bölümü (sadece data.systemComposition tanımlıysa render edilir) —
  // kendi viewport girişine (compositionInView) bağlı.
  const compositionReveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      compositionInView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
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

  // Opsiyonel "Çalışma Modeli" bölümü (sadece data.workModel tanımlıysa render edilir) —
  // kendi viewport girişine (workModelInView) bağlı.
  const workModelReveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      workModelInView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
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
          {/* Hero ana başlığı için ÖZEL, sıkı kapsamlı glow — daha önceki deneme yanlışlıkla
              eyebrow+başlık+açıklama+butonları içeren TÜM bloğun ortasına (top-1/2) oturuyordu, bu
              da görsel olarak başlığın "arkasında" değil, blok'un ortasında bir yerde kalmasına
              sebep oluyordu. Burada glow artık SADECE h1'in kendi (relative isolate) kutusuna
              bağlı; isolate yeni bir stacking context kuruyor (z-index'in yanlış katmana
              kaymaması için), h1 kendi relative z-10'una sahip. Opaklık/blur da gözle görünür
              olacak şekilde belirgin artırıldı (eski: opacity-[0.16] + blur-3xl, çok zayıf
              kalıyordu). */}
          <div className="relative isolate mx-auto mt-8 max-w-3xl">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[300px] w-[min(820px,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-2xl sm:h-[360px] sm:w-[min(940px,90vw)]"
              style={{
                background: 'radial-gradient(closest-side, rgba(255,255,255,0.95), rgba(96,165,250,0.55) 45%, transparent 75%)',
              }}
            />
            <h1
              className={`relative z-10 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl ${reveal(
                'delay-[200ms]',
              )}`}
            >
              {data.title}
            </h1>
          </div>
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
          <div className="relative isolate mx-auto mt-4 max-w-2xl">
            <SectionTitleGlow intensity="normal" />
            <h2
              className={`relative z-10 text-3xl font-bold tracking-tight sm:text-4xl ${audienceReveal(
                'delay-[100ms]',
              )}`}
            >
              {data.audience.title}
            </h2>
          </div>
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
          <div className="relative isolate mx-auto mt-4 max-w-2xl">
            <SectionTitleGlow intensity="normal" />
            <h2
              className={`relative z-10 text-3xl font-bold tracking-tight sm:text-4xl ${problemReveal(
                'delay-[100ms]',
              )}`}
            >
              {data.problem.title}
            </h2>
          </div>
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
          <div className="relative isolate mx-auto mt-4 max-w-2xl">
            <SectionTitleGlow intensity="normal" />
            <h2
              className={`relative z-10 text-3xl font-bold tracking-tight sm:text-4xl ${approachReveal(
                'delay-[100ms]',
              )}`}
            >
              {data.approach.title}
            </h2>
          </div>
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
              <h3 className="mt-5 text-xl font-semibold text-white">{step.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-blue-100/85 transition-colors duration-300 group-hover:text-blue-100/100">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Opsiyonel "kullanım alanları" bölümü — sadece bu alanı dolduran hizmetlerde (şu an Yapay
          Zeka Entegrasyonu) render edilir, diğer hizmetlerde data.useCases tanımsız olduğu için
          hiçbir görsel değişiklik oluşmaz. "GloventGlobal Yaklaşımı" ile "Veriyle Yönetilen
          Sistem" arasında, 5 kart için sitedeki kanıtlanmış 3+2 merkezli grid tekniği. */}
      {data.useCases && (
        <section ref={useCasesRef} className="relative px-6 pb-20 pt-2 sm:px-10">
          <div className="relative mx-auto max-w-3xl text-center">
            <p
              className={`text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/80 ${useCasesReveal(
                'delay-[0ms]',
              )}`}
            >
              {data.useCases.eyebrow}
            </p>
            <div className="relative isolate mx-auto mt-4 max-w-xl">
              <SectionTitleGlow intensity="normal" />
              <h2
                className={`relative z-10 text-3xl font-bold tracking-tight sm:text-4xl ${useCasesReveal(
                  'delay-[100ms]',
                )}`}
              >
                {data.useCases.title}
              </h2>
            </div>
            <p
              className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg ${useCasesReveal(
                'delay-[200ms]',
              )}`}
            >
              {data.useCases.description}
            </p>
          </div>

          <div className="relative mx-auto mt-10 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-8">
            {data.useCases.cards.map((card, index) => (
              <div
                key={card.number}
                className={`${useCasesReveal(
                  ['delay-[300ms]', 'delay-[360ms]', 'delay-[420ms]', 'delay-[480ms]', 'delay-[540ms]'][index] ??
                    'delay-[300ms]',
                )} lg:col-span-2 ${index === 0 ? 'lg:col-start-2' : index === 3 ? 'lg:col-start-3' : ''}`}
              >
                <div className="relative flex h-full min-h-[190px] flex-col rounded-xl border border-white/[0.08] bg-white/[0.035] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-white/[0.06] hover:shadow-[0_0_40px_-12px_rgba(59,130,246,0.45)]">
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
      )}

      {/* ============ VERİYLE YÖNETİLEN SİSTEM ============
          Gerçek dashboard görselleri hazır olan hizmetlerde (örn. Etsy) kayan görsel carousel
          gösterilir. Görseller henüz hazır olmayan hizmetlerde (örn. Amazon) aynı bölüm, geçici
          olarak sade metin kartlarıyla render edilir — görseller eklendiğinde data'ya sadece
          `dashboardImages` eklenmesi yeterli, bu component'e tekrar dokunmaya gerek kalmaz. */}
      <section ref={dataSystemRef} className="relative px-6 pb-20 pt-14 sm:px-10">
        <Glow visible={dataSystemInView} targetOpacity="opacity-35" className="right-[-200px] top-0 h-[400px] w-[400px]" />

        <div className="relative mx-auto max-w-3xl text-center">
          <p
            className={`text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/80 ${dataSystemReveal(
              'delay-[0ms]',
            )}`}
          >
            {data.dataSystem.eyebrow}
          </p>
          <div className="relative isolate mx-auto mt-4 max-w-2xl">
            <SectionTitleGlow intensity="normal" />
            <h2
              className={`relative z-10 text-3xl font-bold tracking-tight sm:text-4xl ${dataSystemReveal(
                'delay-[100ms]',
              )}`}
            >
              {data.dataSystem.title}
            </h2>
          </div>
          <p
            className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg ${dataSystemReveal(
              'delay-[200ms]',
            )}`}
          >
            {data.dataSystem.description}
          </p>
        </div>

        {/* Marquee için @keyframes — globals.css'e dokunmamak için component içinde tanımlı, ana
            sayfadaki brand-marquee'den bağımsız, farklı bir isimle. Koşulsuz/ortak burada
            tanımlanıyor ki hem görsel carousel (Etsy/Amazon) hem metin kartı şeridi (Shopify)
            aynı keyframe'i kullanabilsin — hangi dal render olursa olsun erişilebilir. */}
        <style>{`
          @keyframes etsy-data-marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>

        {data.dataSystem.dashboardImages && data.dataSystem.dashboardImages.length > 0 ? (
          <>
            {/* Kayan görsel şeridi — diğer bölümlerle (Kimler İçin, Sistem Eksikleri, Hazırlanan Sistem)
                aynı max-w-6xl sınırına oturtuldu, böylece kesilme/fade her zaman kontrollü bir yerde oluyor. */}
            <div
              className={`relative mx-auto mt-10 max-w-6xl overflow-hidden ${dataSystemReveal('delay-[300ms]')}`}
            >
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#070d18]/70 via-[#070d18]/25 to-transparent sm:w-36" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#070d18]/70 via-[#070d18]/25 to-transparent sm:w-36" />

              <div className="flex w-max animate-[etsy-data-marquee_52s_linear_infinite] gap-6 motion-reduce:animate-none hover:[animation-play-state:paused]">
                {[...data.dataSystem.dashboardImages, ...data.dataSystem.dashboardImages].map((src, index) => {
                  const isContain = data.dataSystem.imageFit === 'contain';
                  const objectFitClass = isContain ? 'object-contain' : 'object-cover';
                  const hasFailed = failedImages.has(src);

                  // Bazı dashboard görselleri (örn. Amazon Ads/ROAS reklam paneli) diğerlerinden
                  // farklı bir oranda (yatay) olabilir. Veri yapısını (düz string dizisi) değiştirip
                  // her görsele meta eklemek yerine, dosya adına göre tanıyıp SADECE bu görsele özel
                  // bir kart boyutu/çerçevesi veriyoruz — diğer görseller ve Etsy'nin verisi/render'ı
                  // hiç etkilenmiyor (Etsy'nin dosya adlarında "ads-roas" hiç geçmiyor).
                  const isWideAdsPanel = src.includes('ads-roas');

                  // "contain" modunda (örn. Amazon, dikey ağırlıklı dashboard görselleri) kart
                  // hem biraz daha büyük/dikey hem de daha ince/hafif bir çerçeveye sahip — görsel
                  // koyu kutunun içinde "gömülü" değil, kutunun kendisi gibi hissettiriyor.
                  // "cover" modu (Etsy) hiç değişmedi: aynı boyut, aynı çerçeve, aynı padding.
                  const cardSizeClass = !isContain
                    ? 'h-[190px] w-[300px]'
                    : isWideAdsPanel
                      ? 'h-[210px] w-[340px]'
                      : 'h-[260px] w-[230px]';
                  const frameClass = isContain
                    ? 'border border-white/[0.07] bg-white/[0.02] p-1'
                    : 'border border-white/[0.1] bg-white/[0.035] p-2';

                  return (
                    <div
                      key={`${src}-${index}`}
                      className={`group relative ${cardSizeClass} flex-shrink-0 rounded-xl ${frameClass} backdrop-blur-sm transition-all duration-500 hover:border-blue-400/45 hover:shadow-[0_0_36px_-10px_rgba(59,130,246,0.5)]`}
                    >
                      <div className="relative h-full w-full overflow-hidden rounded-lg bg-[#0a1120]">
                        {hasFailed ? (
                          // Görsel yüklenemedi — tarayıcının çirkin kırık ikon + alt text gösterimi
                          // yerine, kartın kendi koyu/glass diliyle uyumlu sade bir yer tutucu.
                          <div className="flex h-full w-full items-center justify-center">
                            <span className="h-1.5 w-10 rounded-full bg-blue-400/25" />
                          </div>
                        ) : (
                          <Image
                            src={src}
                            alt="Mağaza performans panelinden anonimleştirilmiş örnek görünüm"
                            fill
                            sizes="300px"
                            className={`${objectFitClass} transition-transform duration-500 group-hover:scale-[1.03]`}
                            onError={() => setFailedImages((previous) => new Set(previous).add(src))}
                          />
                        )}
                        {/* Görselin koyu site zeminine karşı sert patlamaması için hafif üst-alt karartma.
                            object-contain kullanıldığında (örn. Amazon) metrik alanlarını gizlememesi için
                            bu karartma zaten çok hafif tutulmuştu, değişmedi. */}
                        {!hasFailed && (
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070d18]/35 via-transparent to-[#070d18]/10" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {data.dataSystem.note && (
              <p
                className={`relative mx-auto mt-3 max-w-lg text-center text-xs leading-relaxed text-blue-100/40 ${dataSystemReveal(
                  'delay-[400ms]',
                )}`}
              >
                {data.dataSystem.note}
              </p>
            )}
          </>
        ) : (
          data.dataSystem.dataCards && (
            // Sabit grid yerine yatay kayan şerit — Etsy/Amazon'daki görsel carousel ile aynı
            // teknik (max-w-6xl sınırı, yumuşak fade mask, dizi 2x tekrarla kesintisiz döngü),
            // ama görsel yerine mevcut metin kartları kullanılıyor. İçerik/ikon/metin AYNI kaldı,
            // sadece sunum sabit grid'den kayan şeride döndü.
            <div className="relative mx-auto mt-10 max-w-6xl overflow-hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#070d18]/70 via-[#070d18]/25 to-transparent sm:w-36" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#070d18]/70 via-[#070d18]/25 to-transparent sm:w-36" />

              <div
                className={`flex w-max animate-[etsy-data-marquee_46s_linear_infinite] gap-6 motion-reduce:animate-none hover:[animation-play-state:paused] ${dataSystemReveal(
                  'delay-[300ms]',
                )}`}
              >
                {[...data.dataSystem.dataCards, ...data.dataSystem.dataCards].map((card, index) => (
                  <div
                    key={`${card.title}-${index}`}
                    className="relative flex h-[150px] w-[260px] flex-shrink-0 flex-col justify-start rounded-xl border border-white/[0.08] bg-white/[0.035] p-5 backdrop-blur-sm transition-all duration-300 hover:border-blue-400/40 hover:bg-white/[0.06] hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.45)]"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute left-5 right-5 top-0 h-px bg-gradient-to-r from-blue-400/50 via-blue-400/15 to-transparent"
                    />
                    {/* Dekoratif sinyal çubukları — gerçek/sahte veri değil, sadece "dashboard"
                        hissi veren stilize bir görsel motif. Hiçbir sayı/etiket yok. */}
                    <div aria-hidden="true" className="flex items-end gap-1">
                      <span className="h-3 w-1 rounded-full bg-blue-400/40" />
                      <span className="h-5 w-1 rounded-full bg-blue-400/60" />
                      <span className="h-4 w-1 rounded-full bg-blue-400/50" />
                      <span className="h-6 w-1 rounded-full bg-blue-400/70" />
                      <span className="h-3.5 w-1 rounded-full bg-blue-400/45" />
                    </div>
                    <h3 className="mt-3 text-sm font-semibold text-white">{card.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-blue-100/65">{card.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )
        )}

        {/* Opsiyonel "küçük bilgi katmanı" — sadece bu alanı dolduran hizmetlerde (şu an Amazon)
            render edilir, diğer hizmetlerde data.dataSystem.insight tanımsız olduğu için hiçbir
            görsel değişiklik oluşmaz. Bilerek büyük section gibi değil, kompakt/sade bir panel. */}
        {data.dataSystem.insight && (
          <div
            className={`relative mx-auto mt-8 max-w-2xl rounded-xl border border-white/[0.08] bg-white/[0.03] px-6 py-5 text-center backdrop-blur-sm sm:px-8 ${dataSystemReveal(
              'delay-[450ms]',
            )}`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300/80">
              {data.dataSystem.insight.title}
            </p>
            <p className="mx-auto mt-2.5 max-w-xl text-sm leading-relaxed text-blue-100/70">
              {data.dataSystem.insight.text}
            </p>
            {data.dataSystem.insight.chips && data.dataSystem.insight.chips.length > 0 && (
              <div className="mx-auto mt-4 flex max-w-xl flex-wrap justify-center gap-2">
                {data.dataSystem.insight.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-blue-400/25 bg-blue-500/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.05em] text-blue-200/75"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Opsiyonel "sistem haritası" bölümü — sadece bu alanı dolduran hizmetlerde (şu an Shopify)
          render edilir, diğer hizmetlerde data.systemComposition tanımsız olduğu için hiçbir
          görsel değişiklik oluşmaz. "Veriyle Yönetilen Sistem" ile "Süreç" arasında, 5 kart için
          /hizmetler'deki "Dijital Büyüme Sistemi Nelerden Oluşur?" bölümünün aynı kanıtlanmış 3+2
          merkezli grid tekniği (8 sanal sütun, col-span-2, 0. karta col-start-2 / 3. karta
          col-start-3 ile her iki satır bağımsız ortalanıyor). */}
      {data.systemComposition && (
        <section ref={compositionRef} className="relative px-6 pb-20 pt-2 sm:px-10">
          <div className="relative mx-auto max-w-3xl text-center">
            <p
              className={`text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/80 ${compositionReveal(
                'delay-[0ms]',
              )}`}
            >
              {data.systemComposition.eyebrow}
            </p>
            <div className="relative isolate mx-auto mt-4 max-w-xl">
              <SectionTitleGlow intensity="normal" />
              <h2
                className={`relative z-10 text-3xl font-bold tracking-tight sm:text-4xl ${compositionReveal(
                  'delay-[100ms]',
                )}`}
              >
                {data.systemComposition.title}
              </h2>
            </div>
            <p
              className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg ${compositionReveal(
                'delay-[200ms]',
              )}`}
            >
              {data.systemComposition.description}
            </p>
          </div>

          <div className="relative mx-auto mt-10 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-8">
            {data.systemComposition.cards.map((card, index) => (
              <div
                key={card.number}
                className={`${compositionReveal(
                  ['delay-[300ms]', 'delay-[360ms]', 'delay-[420ms]', 'delay-[480ms]', 'delay-[540ms]'][index] ??
                    'delay-[300ms]',
                )} lg:col-span-2 ${index === 0 ? 'lg:col-start-2' : index === 3 ? 'lg:col-start-3' : ''}`}
              >
                <div className="relative flex h-full min-h-[190px] flex-col rounded-xl border border-white/[0.08] bg-white/[0.035] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-white/[0.06] hover:shadow-[0_0_40px_-12px_rgba(59,130,246,0.45)]">
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
      )}

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
          <div className="relative isolate mx-auto mt-4 max-w-2xl">
            <SectionTitleGlow intensity="normal" />
            <h2
              className={`relative z-10 text-3xl font-bold tracking-tight sm:text-4xl ${processReveal(
                'delay-[100ms]',
              )}`}
            >
              {data.process.title}
            </h2>
          </div>
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
          <div className="relative isolate mx-auto mt-4 max-w-2xl">
            <SectionTitleGlow intensity="normal" />
            <h2
              className={`relative z-10 text-3xl font-bold tracking-tight sm:text-4xl ${deliverablesReveal(
                'delay-[100ms]',
              )}`}
            >
              {data.deliverables.title}
            </h2>
          </div>
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

      {/* Opsiyonel "Çalışma Modeli" bölümü — sadece bu alanı dolduran hizmetlerde (şu an Amazon)
          render edilir, diğer hizmetlerde data.workModel tanımsız olduğu için hiçbir görsel
          değişiklik oluşmaz. Final CTA'dan hemen önce, sade ve kısa: eyebrow + başlık + açıklama
          + 2 kart (Hazırlanan Sistem bölümündeki aynı kart diliyle). */}
      {data.workModel && (
        <section ref={workModelRef} className="relative px-6 pb-20 pt-2 sm:px-10">
          <div className="relative mx-auto max-w-3xl text-center">
            <p
              className={`text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/80 ${workModelReveal(
                'delay-[0ms]',
              )}`}
            >
              {data.workModel.eyebrow}
            </p>
            <div className="relative isolate mx-auto mt-4 max-w-xl">
              <SectionTitleGlow intensity="normal" />
              <h2
                className={`relative z-10 text-3xl font-bold tracking-tight sm:text-4xl ${workModelReveal(
                  'delay-[100ms]',
                )}`}
              >
                {data.workModel.title}
              </h2>
            </div>
            <p
              className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg ${workModelReveal(
                'delay-[200ms]',
              )}`}
            >
              {data.workModel.description}
            </p>
          </div>

          <div className="relative mx-auto mt-10 grid max-w-3xl items-stretch gap-6 sm:grid-cols-2">
            {data.workModel.cards.map((card, index) => (
              <div key={card.number} className={workModelReveal(['delay-[300ms]', 'delay-[380ms]'][index] ?? 'delay-[300ms]')}>
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
      )}

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

          <div className="relative isolate mx-auto max-w-2xl">
            <SectionTitleGlow intensity="subtle" />
            <h2 className="relative z-10 text-3xl font-bold tracking-tight sm:text-4xl">{data.finalCta.title}</h2>
          </div>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-blue-100/70 sm:text-lg">
            {data.finalCta.description}
          </p>

          <p className="mt-6 text-xs font-medium uppercase tracking-[0.25em] text-blue-100/45">
            {data.finalCta.supportText}
          </p>

          <div className="mt-9 flex flex-col flex-wrap items-center justify-center gap-4 sm:flex-row">
            <a
              href="/iletisim"
              className="inline-block rounded-full border border-blue-400/45 bg-blue-500/10 px-10 py-3.5 text-sm font-semibold tracking-wide text-white backdrop-blur-sm transition-all duration-300 hover:border-blue-400/75 hover:bg-blue-500/20 hover:shadow-[0_0_36px_-6px_rgba(59,130,246,0.6)]"
            >
              {data.finalCta.ctaLabel}
            </a>
            <button
              type="button"
              onClick={() => {
                trackEvent('free_analysis_cta_click', { location: 'service_detail_final_cta', service: slug });
                window.dispatchEvent(new Event('open-analysis-widget'));
              }}
              className="inline-block rounded-full border border-blue-400/45 bg-blue-500/10 px-10 py-3.5 text-sm font-semibold tracking-wide text-white backdrop-blur-sm transition-all duration-300 hover:border-blue-400/75 hover:bg-blue-500/20 hover:shadow-[0_0_36px_-6px_rgba(59,130,246,0.6)]"
            >
              Ücretsiz Analiz Al
            </button>
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