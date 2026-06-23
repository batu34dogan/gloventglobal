'use client';

import { useEffect, useRef, useState } from 'react';

// Bir elementin viewport'a girip girmediğini takip eder (native IntersectionObserver, yeni paket yok).
// HomeContent.tsx / ServicesContent.tsx / ContactContent.tsx'teki aynı desenin bu dosyaya özel,
// bağımsız bir kopyası.
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

// Ana sayfadaki / hizmetler / iletişim sayfalarındaki aynı görsel dil — ama bu dosyaya özel,
// bağımsız kopya. O dosyalara dokunmamak / import etmemek için bilerek burada yeniden tanımlandı.
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

// Büyük başlıkların arkasına oturan, ana sayfa/hizmet detay sayfalarındaki Hero glow'uyla aynı
// kanıtlanmış teknik — bağımsız kopya (sayfa izolasyonu prensibi korunuyor). Başlığın KENDİ
// (relative isolate) kutusuna sıkıca bağlı; eyebrow/açıklama gibi çevresindeki içeriği değil,
// SADECE başlığı kapsıyor. Sitedeki 3 sabit seviye: "hero" en geniş/belirgin, "section" orta,
// "cta" en hafif.
function TitleGlow({ tone }: { tone: 'hero' | 'section' | 'cta' }) {
  const sizeClass =
    tone === 'hero'
      ? 'h-[300px] w-[min(820px,92vw)] sm:h-[360px] sm:w-[min(940px,90vw)]'
      : tone === 'section'
        ? 'h-[200px] w-[min(560px,85vw)] sm:h-[230px] sm:w-[min(620px,82vw)]'
        : 'h-[170px] w-[min(480px,80vw)] sm:h-[190px] sm:w-[min(520px,78vw)]';
  const opacityClass = tone === 'hero' ? 'opacity-50' : tone === 'section' ? 'opacity-[0.26]' : 'opacity-[0.16]';

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 ${sizeClass} rounded-full ${opacityClass} blur-2xl`}
      style={{
        background: 'radial-gradient(closest-side, rgba(255,255,255,0.9), rgba(96,165,250,0.5) 45%, transparent 75%)',
      }}
    />
  );
}

// "GloventGlobal'in Çalışma Prensipleri" listesi — bilerek hizmet adı değil, şirket prensibi/bakış
// açısı cümleleri kullanılıyor (Hakkımızda sayfasının "ne yapıyoruz" değil "nasıl düşünüyoruz"
// sorusuna cevap vermesi gerektiği için). Render mantığı (border-b liste, focusAreaDelays) aynı.
const focusAreas = [
  'Sistem düşünürüz.',
  'Veriye göre karar veririz.',
  'Teknolojiyi amaç değil, araç olarak görürüz.',
  'Yapay zekayı sürece dahil ederiz.',
  'Operasyonu büyümenin parçası sayarız.',
  'Uzun vadeli düşünürüz.',
];

const focusAreaDelays = [
  'delay-[0ms]',
  'delay-[50ms]',
  'delay-[100ms]',
  'delay-[150ms]',
  'delay-[200ms]',
  'delay-[250ms]',
  'delay-[300ms]',
  'delay-[350ms]',
  'delay-[400ms]',
];

const whyCards = [
  {
    number: '01',
    title: 'Parça Hizmet Değil Sistem',
    description:
      'Reklam, sosyal medya, pazaryeri, Shopify, içerik ve otomasyon süreçlerini ayrı işler olarak değil, aynı hedefe çalışan tek bir yapı olarak planlarız.',
  },
  {
    number: '02',
    title: 'Global Pazara Uyum',
    description:
      'Her ürünün her pazarda aynı şekilde satılamayacağını biliriz. Ürün, fiyat, hedef müşteri, rakipler ve satış kanalı birlikte değerlendirilir.',
  },
  {
    number: '03',
    title: 'Operasyon ve Büyüme Mantığı',
    description:
      'Sistemin yalnızca kurulmasını değil, sürdürülebilir şekilde yönetilebilir, ölçülebilir ve geliştirilebilir olmasını hedefleriz.',
  },
];

const whyCardDelays = ['delay-[0ms]', 'delay-[100ms]', 'delay-[200ms]'];

const audienceSegments = [
  {
    number: '01',
    title: 'Üreticiler',
    description: 'Ürününü ilk kez dijital satış kanallarına ve pazaryerlerine taşımak isteyen üreticiler için pazar, kanal ve satış sistemi planı oluştururuz.',
  },
  {
    number: '02',
    title: 'Toptan Satış Yapan Markalar',
    description: 'Toptan çalışan markalar için dijital katalog, B2B showroom, teklif listesi ve müşteri odaklı ürün sunumu kurgularız.',
  },
  {
    number: '03',
    title: 'Pazaryerlerine Girmek İsteyen Markalar',
    description: 'Amazon, Etsy veya eBay gibi pazaryerlerine giriş yapmak isteyen markalar için mağaza, listeleme ve reklam altyapısı hazırlarız.',
  },
  {
    number: '04',
    title: 'Kendi Satış Sistemini Kurmak İsteyenler',
    description: 'Shopify, B2B katalog, dijital showroom veya pazaryeri yapısıyla kendi satış altyapısını kurmak isteyen markalara sistem tasarlarız.',
  },
  {
    number: '05',
    title: 'Dijitalde Marka Algısını Güçlendirmek İsteyenler',
    description: 'Görsel dil, sosyal medya, içerik ve reklam yapısıyla dijital kanallarda daha güçlü görünmek isteyen markalar için bütüncül yapı kurarız.',
  },
];

const audienceDelays = ['delay-[0ms]', 'delay-[80ms]', 'delay-[160ms]', 'delay-[240ms]', 'delay-[320ms]'];

export default function AboutContent() {
  const [mounted, setMounted] = useState(false);
  const [whoRef, whoInView] = useInView<HTMLElement>();
  const [whyRef, whyInView] = useInView<HTMLElement>();
  const [mindsetRef, mindsetInView] = useInView<HTMLElement>();
  const [audienceRef, audienceInView] = useInView<HTMLElement>();
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

  // Biz Kimiz bölümü Hero'nun altında, ekran dışında başlıyor — kendi viewport girişine bağlı, ayrı reveal.
  const whoReveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      whoInView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
    }`;

  // Neden GloventGlobal bölümü Biz Kimiz'in altında, ekran dışında başlıyor — kendi viewport
  // girişine bağlı, ayrı reveal.
  const whyReveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      whyInView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
    }`;

  // Nasıl Düşünüyoruz bölümü Neden GloventGlobal'ın altında, ekran dışında başlıyor — kendi
  // viewport girişine bağlı, ayrı reveal.
  const mindsetReveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      mindsetInView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
    }`;

  // Kimlerle Çalışıyoruz bölümü Nasıl Düşünüyoruz'un altında, ekran dışında başlıyor — kendi
  // viewport girişine bağlı, ayrı reveal.
  const audienceReveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      audienceInView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
    }`;

  // Final CTA sayfanın en sonunda — kendi viewport girişine bağlı, ayrı reveal.
  const ctaReveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      ctaInView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
    }`;

  return (
    <main className="relative overflow-hidden bg-[#070d18] font-sans text-white">
      {/* ============ 1. HAKKIMIZDA HERO ============
          Üst padding (pt-24/md:pt-28), /hizmetler ve /iletisim Hero'larıyla birebir aynı — sabit
          navbar'ın (z-40) yüksekliğini rahatça karşılıyor, çakışma olmuyor. Intro yok, sayfa direkt başlıyor. */}
      <section className="relative px-6 pb-14 pt-24 sm:px-10 md:pb-16 md:pt-28">
        <Glow visible={mounted} targetOpacity="opacity-70" className="left-1/2 top-[-120px] h-[560px] w-[860px] -translate-x-1/2" />
        <Glow visible={mounted} targetOpacity="opacity-50" className="left-[-200px] top-[200px] h-[380px] w-[380px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className={`text-xs font-semibold uppercase tracking-[0.35em] text-blue-300/80 ${reveal('delay-[100ms]')}`}>
            Hakkımızda
          </p>
          <div className="relative isolate mx-auto mt-8 max-w-3xl">
            <TitleGlow tone="hero" />
            <h1
              className={`relative z-10 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl ${reveal(
                'delay-[200ms]',
              )}`}
            >
              Dijital Büyümeyi Parçalara Ayırmak Yerine Sistem Olarak Görüyoruz
            </h1>
          </div>
          <p
            className={`mx-auto mt-7 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg ${reveal(
              'delay-[300ms]',
            )}`}
          >
            GloventGlobal; işletmelerin dijitalde büyümesi için strateji, teknoloji, yapay zeka, otomasyon,
            e-ticaret altyapısı ve operasyon süreçlerini birbirine bağlayan sistemler tasarlamak için kuruldu.
          </p>
        </div>
      </section>

      {/* ============ 2. BİZ KİMİZ? ============
          Bilinçli olarak ağır kart yok — sol tarafta metin, sağ tarafta odak alanları hafif bir
          liste olarak (ince ayraçlı, küçük nokta işaretli), glass panel/kart kabuğu kullanılmadı. */}
      <section ref={whoRef} className="relative px-6 pb-20 pt-14 sm:px-10">
        <Glow visible={whoInView} targetOpacity="opacity-35" className="right-[-220px] top-10 h-[440px] w-[440px]" />

        <div className="relative mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div>
            <p className={`text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/80 ${whoReveal('delay-[0ms]')}`}>
              Biz Kimiz?
            </p>
            <h2 className={`mt-4 text-2xl font-bold tracking-tight sm:text-3xl ${whoReveal('delay-[100ms]')}`}>
              Ajans Değil, Dijital Satış Sistemi Kuruyoruz
            </h2>
            <p className={`mt-5 text-sm leading-relaxed text-blue-100/70 sm:text-base ${whoReveal('delay-[200ms]')}`}>
              GloventGlobal; markaların yalnızca reklam vermesini, sosyal medya yönetmesini veya pazaryerinde
              mağaza açmasını değil, tüm bu parçaların birlikte çalıştığı sürdürülebilir bir dijital satış ve büyüme
              sistemi kurmasını hedefler. Strateji, altyapı, içerik, reklam, operasyon, otomasyon ve yapay zeka
              entegrasyonlarını birbirinden kopuk hizmetler olarak değil; markanın satışını ve büyümesini
              destekleyen tek bir yapı olarak ele alır.
            </p>
            <p className={`mt-4 text-sm leading-relaxed text-blue-100/70 sm:text-base ${whoReveal('delay-[280ms]')}`}>
              Bu yüzden her markaya hazır paketlerle yaklaşmayız. Ürünü, hedef pazarı, satış kanalını, fiyat
              yapısını, görsel dili, operasyon kapasitesini ve dijital altyapıyı birlikte analiz eder; markaya özel
              uygulanabilir bir dijital satış ve global büyüme yol haritası tasarlarız.
            </p>
            <p
              className={`mt-5 border-l-2 border-blue-400/40 pl-4 text-sm font-medium leading-relaxed text-blue-100/85 sm:text-base ${whoReveal(
                'delay-[360ms]',
              )}`}
            >
              Ürün var ama satış sistemi yoksa, sürdürülebilir büyüme zorlaşır. GloventGlobal bu sistemi kurmak için
              çalışır.
            </p>
          </div>

          <div className="lg:pt-1">
            <h3 className={`mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/80 ${whoReveal('delay-[80ms]')}`}>
              GloventGlobal&apos;in Çalışma Prensipleri
            </h3>
            {focusAreas.map((area, index) => (
              <div
                key={area}
                className={`flex items-center gap-3 border-b border-white/[0.07] py-3 first:pt-0 last:border-0 last:pb-0 ${whoReveal(
                  focusAreaDelays[index],
                )}`}
              >
                <span aria-hidden="true" className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-400/70" />
                <span className="text-sm font-medium text-blue-100/85">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 3. NEDEN GLOVENTGLOBAL? ============ */}
      <section ref={whyRef} className="relative px-6 pb-20 pt-14 sm:px-10">
        <Glow visible={whyInView} targetOpacity="opacity-40" className="left-1/2 top-0 h-[420px] w-[800px] -translate-x-1/2" />

        <div className="relative mx-auto max-w-3xl text-center">
          <p className={`text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/80 ${whyReveal('delay-[0ms]')}`}>
            Neden GloventGlobal?
          </p>
          <div className="relative isolate mx-auto mt-4 max-w-xl">
            <TitleGlow tone="section" />
            <h2 className={`relative z-10 text-3xl font-bold tracking-tight sm:text-4xl ${whyReveal('delay-[100ms]')}`}>
              Parçaları Değil, Sistemin Tamamını Kuruyoruz
            </h2>
          </div>
          <p
            className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg ${whyReveal(
              'delay-[200ms]',
            )}`}
          >
            Markaların global pazarda büyümesi yalnızca reklam, mağaza kurulumu veya içerik üretimiyle sürdürülebilir
            olmaz. GloventGlobal; strateji, altyapı, içerik, reklam, operasyon ve otomasyonu birbirine bağlı bir
            satış sistemi olarak ele alır.
          </p>
        </div>

        <div className="relative mx-auto mt-10 grid max-w-5xl items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyCards.map((card, index) => (
            <div key={card.number} className={whyReveal(whyCardDelays[index])}>
              <div className="relative flex h-full min-h-[170px] flex-col rounded-xl border border-white/[0.08] bg-white/[0.035] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-white/[0.06] hover:shadow-[0_0_40px_-12px_rgba(59,130,246,0.45)]">
                <span
                  aria-hidden="true"
                  className="absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-blue-400/55 via-blue-400/20 to-transparent"
                />
                <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-blue-400/45 bg-blue-500/10 text-xs font-semibold text-blue-300 shadow-[0_0_16px_-2px_rgba(59,130,246,0.6)]">
                  {card.number}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">{card.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-blue-100/75">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ 4. NASIL DÜŞÜNÜYORUZ? ============
          Bilinçli olarak kart yok — tek bir geniş glass panel içinde manifesto/yaklaşım metni. */}
      <section ref={mindsetRef} className="relative px-6 pb-20 pt-14 sm:px-10">
        <Glow visible={mindsetInView} targetOpacity="opacity-35" className="left-1/2 top-0 h-[400px] w-[760px] -translate-x-1/2" />

        <div
          className={`relative mx-auto max-w-3xl rounded-2xl border border-white/[0.08] bg-white/[0.035] px-6 py-10 text-center backdrop-blur-sm sm:px-12 sm:py-12 ${mindsetReveal(
            'delay-[0ms]',
          )}`}
        >
          <span
            aria-hidden="true"
            className="absolute left-10 right-10 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/55 to-transparent"
          />

          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/80">Nasıl Düşünüyoruz?</p>
          <div className="relative isolate mx-auto mt-4 max-w-xl">
            <TitleGlow tone="section" />
            <h2 className="relative z-10 text-2xl font-bold tracking-tight sm:text-3xl">
              Her Marka İçin Aynı Yol Haritası Kullanılmaz
            </h2>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-blue-100/70 sm:text-base">
            Bir markanın global pazara açılması yalnızca doğru platformu seçmekle başlamaz. Ürünün pazardaki
            karşılığı, hedef müşteri, fiyat yapısı, rakipler, görsel dil, operasyon kapasitesi ve reklam bütçesi
            birlikte değerlendirilmelidir.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-blue-100/70 sm:text-base">
            Bu yüzden GloventGlobal, her markaya aynı hizmet paketini sunmak yerine, markanın mevcut durumuna ve
            hedeflerine göre uygulanabilir bir yol haritası tasarlar. Amaç yalnızca dijitalde görünmek değil;
            yönetilebilir, ölçülebilir ve sürdürülebilir bir satış sistemi kurmaktır.
          </p>
          <p className="mx-auto mt-6 max-w-xl border-l-2 border-blue-400/40 pl-4 text-left text-sm font-medium leading-relaxed text-blue-100/85 sm:text-base">
            Önce ürünü ve pazarı okuruz, sonra sistemi kurarız.
          </p>
        </div>
      </section>

      {/* ============ 5. KİMLERLE ÇALIŞIYORUZ? ============
          /hizmetler'deki "Kimler İçin?" bölümünün 3+2 ortalı grid tekniğini kullanıyor, ama kart
          görseli bu sayfanın "Neden GloventGlobal?" bölümüyle aynı dilde — birebir kopya değil. */}
      <section ref={audienceRef} className="relative px-6 pb-20 pt-14 sm:px-10">
        <Glow visible={audienceInView} targetOpacity="opacity-40" className="right-[-220px] top-0 h-[420px] w-[420px]" />
        <Glow visible={audienceInView} targetOpacity="opacity-30" className="left-[-220px] bottom-0 h-[400px] w-[400px]" />

        <div className="relative mx-auto max-w-3xl text-center">
          <p
            className={`text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/80 ${audienceReveal(
              'delay-[0ms]',
            )}`}
          >
            Kimlerle Çalışıyoruz?
          </p>
          <div className="relative isolate mx-auto mt-4 max-w-xl">
            <TitleGlow tone="section" />
            <h2
              className={`relative z-10 text-3xl font-bold tracking-tight sm:text-4xl ${audienceReveal(
                'delay-[100ms]',
              )}`}
            >
              Dijital Satış Sistemini Güçlendirmek İsteyen Markalarla Çalışıyoruz
            </h2>
          </div>
          <p
            className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg ${audienceReveal(
              'delay-[200ms]',
            )}`}
          >
            GloventGlobal; ürününü dijital satış kanallarına taşımak, mevcut satış yapısını güçlendirmek veya
            pazaryeri, Shopify, B2B, sosyal medya, reklam ve otomasyon süreçlerini daha sistemli yönetmek isteyen
            markalarla çalışır.
          </p>
        </div>

        {/* 6 sanal sütun (lg:grid-cols-6) + her kart 2 sütun (lg:col-span-2): ilk 3 kart tam satırı
            dolduruyor, 4. karta lg:col-start-2 verilince son 2 kart simetrik ortalanıyor. */}
        <div className="relative mx-auto mt-10 grid max-w-6xl items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {audienceSegments.map((segment, index) => (
            <div
              key={segment.number}
              className={`${audienceReveal(audienceDelays[index])} lg:col-span-2 ${
                index === 3 ? 'lg:col-start-2' : ''
              }`}
            >
              <div className="relative flex h-full min-h-[170px] flex-col rounded-xl border border-white/[0.08] bg-white/[0.035] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-white/[0.06] hover:shadow-[0_0_40px_-12px_rgba(59,130,246,0.45)]">
                <span
                  aria-hidden="true"
                  className="absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-blue-400/55 via-blue-400/20 to-transparent"
                />
                <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-blue-400/45 bg-blue-500/10 text-xs font-semibold text-blue-300 shadow-[0_0_16px_-2px_rgba(59,130,246,0.6)]">
                  {segment.number}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">{segment.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-blue-100/75">{segment.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ 6. FİNAL CTA ============ */}
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
            <TitleGlow tone="cta" />
            <h2 className="relative z-10 text-3xl font-bold tracking-tight sm:text-4xl">
              Markanız İçin Doğru Sistemi Birlikte Kuralım
            </h2>
          </div>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-blue-100/70 sm:text-lg">
            Ürününüzü, mevcut satış yapınızı ve hedeflerinizi birlikte değerlendirerek markanız için doğru dijital
            satış ve büyüme sistemini planlayalım.
          </p>

          <p className="mt-6 text-xs font-medium uppercase tracking-[0.25em] text-blue-100/45">
            Strateji • Altyapı • İçerik • Reklam • Otomasyon • Büyüme
          </p>

          <a
            href="/iletisim"
            className="mt-9 inline-block rounded-full border border-blue-400/45 bg-blue-500/10 px-12 py-3.5 text-sm font-semibold tracking-wide text-white backdrop-blur-sm transition-all duration-300 hover:border-blue-400/75 hover:bg-blue-500/20 hover:shadow-[0_0_36px_-6px_rgba(59,130,246,0.6)]"
          >
            GloventGlobal ile Görüş
          </a>
        </div>
      </section>
    </main>
  );
}