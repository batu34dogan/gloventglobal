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

const serviceCards = [
  {
    tag: '01 AMAZON',
    title: 'Amazon Danışmanlığı',
    description: 'Amazon’da doğru kategori, listeleme, SEO, reklam ve operasyon yapısıyla satışa hazır bir sistem kurarız.',
  },
  {
    tag: '02 ETSY',
    title: 'Etsy Mağaza Sistemi',
    description: 'El yapımı, butik, tasarım ve niş ürünler için Etsy mağaza yapısı, görsel dili ve listeleme stratejisi oluştururuz.',
  },
  {
    tag: '03 EBAY',
    title: 'eBay Global Satış',
    description: 'Farklı pazarlara açılmak isteyen markalar için eBay listeleme, kategori ve satış altyapısını hazırlarız.',
  },
  {
    tag: '04 SHOPIFY',
    title: 'Shopify Satış Altyapısı',
    description: 'Markanıza özel vitrin, ürün yönetimi, koleksiyon yapısı, ödeme ve satış deneyimi için Shopify altyapısı kurarız.',
  },
  {
    tag: '05 B2B',
    title: 'B2B Dijital Showroom',
    description: 'Toptan satış yapan markalar için dijital katalog, teklif listesi, müşteri odaklı ürün sunumu ve showroom sistemi oluştururuz.',
  },
  {
    tag: '06 MARKA',
    title: 'Marka Konumlandırma',
    description: 'Ürününüzü yalnızca satılacak bir ürün olarak değil, pazarda algısı olan bir marka yapısı içinde konumlandırırız.',
  },
  {
    tag: '07 GÖRSEL',
    title: 'Görsel & İçerik Sistemi',
    description: 'Ürün fotoğrafı, yapay zeka destekli görsel konsept, açıklama, başlık ve marka dili bütünlüğünü kurarız.',
  },
  {
    tag: '08 SOSYAL MEDYA',
    title: 'Sosyal Medya Yönetimi',
    description: 'Markanızın Instagram, TikTok ve diğer sosyal kanallarda tutarlı görünmesi için içerik planı, görsel dil ve paylaşım stratejisi oluştururuz.',
  },
  {
    tag: '09 REKLAM',
    title: 'Reklam & Optimizasyon',
    description: 'Amazon, Etsy, Google ve Meta reklamlarını veri, dönüşüm ve kârlılık odağında optimize ederiz.',
  },
  {
    tag: '10 STRATEJİ',
    title: 'Global Pazara Giriş Stratejisi',
    description: 'Ürününüz için doğru ülke, kanal, fiyat, rekabet ve büyüme yol haritasını belirleriz.',
  },
];

const audienceSegments = [
  {
    number: '01',
    title: 'Üreticiler',
    description: 'Ürününü ilk kez global pazarlara taşımak isteyen üreticiler için pazar, kanal ve satış sistemi planı oluştururuz.',
  },
  {
    number: '02',
    title: 'Toptan Satış Yapan Markalar',
    description: 'Toptan çalışan markalar için dijital katalog, B2B showroom, teklif listesi ve müşteri odaklı ürün sunumu kurgularız.',
  },
  {
    number: '03',
    title: 'Pazaryerlerine Girmek İsteyen Markalar',
    description: 'Pazaryerlerine giriş yapmak isteyen markalar için mağaza kurulumu, listeleme, SEO, görsel dil ve reklam altyapısını hazırlarız.',
  },
  {
    number: '04',
    title: 'Shopify ile Kendi Sistemini Kurmak İsteyenler',
    description: 'Kendi markasına ait satış kanalı kurmak isteyen işletmeler için Shopify tabanlı vitrin, ürün yönetimi ve satış deneyimi oluştururuz.',
  },
  {
    number: '05',
    title: 'Globalde Marka Algısını Güçlendirmek İsteyenler',
    description: 'Yalnızca satış değil, marka algısı, görsel bütünlük, sosyal medya ve içerik diliyle global pazarda daha güçlü görünmek isteyen markalara sistem kurarız.',
  },
];

const audienceDelays = ['delay-[0ms]', 'delay-[80ms]', 'delay-[160ms]', 'delay-[240ms]', 'delay-[320ms]'];

const platformSolutions = [
  {
    name: 'Amazon',
    description:
      'Amazon’da ürün araştırması, kategori seçimi, listeleme, SEO, reklam, operasyon ve marka koruma süreçlerini satışa hazır bir yapıya dönüştürürüz.',
  },
  {
    name: 'Etsy',
    description:
      'Etsy’de butik, el yapımı, tasarım ve niş ürünler için mağaza konsepti, ürün sunumu, görsel dil, listeleme ve SEO sistemini kurarız.',
  },
  {
    name: 'eBay',
    description: 'eBay üzerinden farklı pazarlara açılmak isteyen markalar için listeleme, kategori, fiyatlandırma ve satış altyapısını hazırlarız.',
  },
  {
    name: 'Shopify',
    description:
      'Markanın kendi dijital vitrinini kurması için Shopify tabanlı ürün yönetimi, koleksiyon yapısı, satış deneyimi ve büyüme altyapısı oluştururuz.',
  },
  {
    name: 'B2B Dijital Showroom',
    description:
      'Toptan satış yapan markalar için ürün katalogları, teklif listeleri, müşteri odaklı sunum alanları ve dijital showroom deneyimi tasarlarız.',
  },
];

const platformDelays = ['delay-[0ms]', 'delay-[80ms]', 'delay-[160ms]', 'delay-[240ms]', 'delay-[320ms]'];

const serviceCardDelays = [
  'delay-[0ms]',
  'delay-[50ms]',
  'delay-[100ms]',
  'delay-[150ms]',
  'delay-[200ms]',
  'delay-[250ms]',
  'delay-[300ms]',
  'delay-[350ms]',
  'delay-[400ms]',
  'delay-[450ms]',
];

export default function ServicesContent() {
  const [mounted, setMounted] = useState(false);
  const [systemRef, systemInView] = useInView<HTMLElement>();
  const [servicesRef, servicesInView] = useInView<HTMLElement>();
  const [audienceRef, audienceInView] = useInView<HTMLElement>();
  const [platformsRef, platformsInView] = useInView<HTMLElement>();
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

  // Sistem Mantığı bölümü Hero'nun altında, ekran dışında başlıyor — bu yüzden "mounted"a değil,
  // bu section'ın gerçekten viewport'a girip girmediğine (systemInView) bağlı, ayrı bir reveal.
  const systemReveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      systemInView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
    }`;

  // Hizmet Kartları bölümü, Sistem Mantığı'nın daha da altında — kendi viewport girişine bağlı, ayrı reveal.
  const servicesReveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      servicesInView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
    }`;

  // "Hangi Marka İçin Hangi Hizmet?" bölümü Hizmet Kartları'nın altında — kendi viewport girişine bağlı, ayrı reveal.
  const audienceReveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      audienceInView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
    }`;

  // Platform Bazlı Çözümler bölümü en altta — kendi viewport girişine bağlı, ayrı reveal.
  const platformsReveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      platformsInView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
    }`;

  // Final CTA, sayfanın en sonunda — kendi viewport girişine bağlı, ayrı reveal.
  const ctaReveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      ctaInView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
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

      {/* ============ 3. HİZMETLERİMİZ (8 hizmet kartı) ============ */}
      <section id="hizmetlerimiz" ref={servicesRef} className="relative px-6 pb-20 pt-14 sm:px-10">
        <Glow visible={servicesInView} targetOpacity="opacity-45" className="right-[-200px] top-0 h-[440px] w-[440px]" />
        <Glow visible={servicesInView} targetOpacity="opacity-35" className="left-[-200px] bottom-0 h-[420px] w-[420px]" />

        <div className="relative mx-auto max-w-3xl text-center">
          <p className={`text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/80 ${servicesReveal('delay-[0ms]')}`}>
            Hizmetlerimiz
          </p>
          <h2
            className={`mx-auto mt-4 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl ${servicesReveal(
              'delay-[100ms]',
            )}`}
          >
            Global Satış Sistemini Oluşturan Hizmetler
          </h2>
          <p
            className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg ${servicesReveal(
              'delay-[200ms]',
            )}`}
          >
            Her hizmeti tek başına bir işlem olarak değil, markanızın global pazarda sürdürülebilir satış
            üretebilmesi için birbirini tamamlayan sistem parçaları olarak ele alıyoruz.
          </p>
        </div>

        <div className="relative mx-auto mt-10 grid max-w-6xl items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {serviceCards.map((service, index) => (
            <div
              key={service.title}
              className={`${servicesReveal(serviceCardDelays[index])} ${index === 8 ? 'lg:col-start-2' : ''}`}
            >
              <div className="relative flex h-full min-h-[180px] flex-col rounded-xl border border-white/[0.08] bg-white/[0.035] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-white/[0.06] hover:shadow-[0_0_40px_-12px_rgba(59,130,246,0.45)]">
                <span
                  aria-hidden="true"
                  className="absolute left-5 right-5 top-0 h-px bg-gradient-to-r from-blue-400/55 via-blue-400/20 to-transparent"
                />
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-300/80">
                  {service.tag}
                </span>
                <h3 className="mt-2.5 text-base font-semibold text-white">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-blue-100/70">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ 4. KİMLER İÇİN? (5 segment kartı, 3+2 ortalı) ============ */}
      <section ref={audienceRef} className="relative px-6 pb-20 pt-14 sm:px-10">
        <Glow visible={audienceInView} targetOpacity="opacity-40" className="left-1/2 top-0 h-[400px] w-[760px] -translate-x-1/2" />

        <div className="relative mx-auto max-w-3xl text-center">
          <p className={`text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/80 ${audienceReveal('delay-[0ms]')}`}>
            Kimler İçin?
          </p>
          <h2
            className={`mx-auto mt-4 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl ${audienceReveal(
              'delay-[100ms]',
            )}`}
          >
            Hangi Marka İçin Hangi Sistem Doğru?
          </h2>
          <p
            className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg ${audienceReveal(
              'delay-[200ms]',
            )}`}
          >
            Her markanın ihtiyacı aynı değildir. GloventGlobal; ürün yapısı, satış kanalı, hedef pazar ve büyüme
            aşamasına göre doğru hizmet kombinasyonunu belirler.
          </p>
        </div>

        {/* 6 sanal sütun (lg:grid-cols-6) + her kart 2 sütun kaplıyor (lg:col-span-2):
            ilk 3 kart tam satırı dolduruyor (3x2=6), 4. karta lg:col-start-2 verilince
            5. kart otomatik onun yanına geliyor — son sırada 1 sütunluk boşluk her iki kenarda
            eşit kalıyor, böylece 2 kart simetrik şekilde ortalanmış oluyor. */}
        <div className="relative mx-auto mt-10 grid max-w-6xl items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {audienceSegments.map((segment, index) => (
            <div
              key={segment.title}
              className={`${audienceReveal(audienceDelays[index])} lg:col-span-2 ${
                index === 3 ? 'lg:col-start-2' : ''
              }`}
            >
              <div className="relative flex h-full min-h-[190px] flex-col rounded-xl border border-white/[0.08] bg-white/[0.035] p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-white/[0.06] hover:shadow-[0_0_40px_-12px_rgba(59,130,246,0.45)]">
                <span
                  aria-hidden="true"
                  className="absolute left-7 right-7 top-0 h-px bg-gradient-to-r from-blue-400/55 via-blue-400/20 to-transparent"
                />
                <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-blue-400/45 bg-blue-500/10 text-xs font-semibold text-blue-300 shadow-[0_0_16px_-2px_rgba(59,130,246,0.6)]">
                  {segment.number}
                </span>
                <h3 className="mt-4 text-base font-semibold text-white">{segment.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-blue-100/75">{segment.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ 5. PLATFORM ÇÖZÜMLERİ (5 platform kartı, 3+2 ortalı) ============
          Bilinçli olarak Hizmet Kartları'ndan farklı bir kart dili kullanılıyor: numara rozeti yok,
          platform adı büyük bir "wordmark" gibi öne çıkıyor, altında ince bir ayraç çizgisi var. */}
      <section ref={platformsRef} className="relative px-6 pb-20 pt-14 sm:px-10">
        <Glow visible={platformsInView} targetOpacity="opacity-40" className="right-[-200px] top-0 h-[420px] w-[420px]" />
        <Glow visible={platformsInView} targetOpacity="opacity-30" className="left-[-200px] bottom-0 h-[400px] w-[400px]" />

        <div className="relative mx-auto max-w-3xl text-center">
          <p
            className={`text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/80 ${platformsReveal(
              'delay-[0ms]',
            )}`}
          >
            Platform Çözümleri
          </p>
          <h2
            className={`mx-auto mt-4 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl ${platformsReveal(
              'delay-[100ms]',
            )}`}
          >
            Her Kanal İçin Ayrı, Tek Sistem İçinde Bağlı Çözümler
          </h2>
          <p
            className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg ${platformsReveal(
              'delay-[200ms]',
            )}`}
          >
            Amazon, Etsy, eBay, Shopify ve B2B dijital yapılar farklı dinamiklere sahiptir. GloventGlobal her kanalı
            ayrı planlar, ancak tamamını markanın global satış sistemi içinde birbirine bağlı şekilde kurgular.
          </p>
        </div>

        {/* "Kimler İçin?" bölümündeki aynı 6 sanal sütun + col-span-2 + col-start-2 tekniği — 3+2 ortalı düzen. */}
        <div className="relative mx-auto mt-10 grid max-w-6xl items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {platformSolutions.map((platform, index) => (
            <div
              key={platform.name}
              className={`${platformsReveal(platformDelays[index])} lg:col-span-2 ${
                index === 3 ? 'lg:col-start-2' : ''
              }`}
            >
              <div className="relative flex h-full min-h-[190px] flex-col rounded-xl border border-white/[0.08] bg-white/[0.035] p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-white/[0.06] hover:shadow-[0_0_40px_-12px_rgba(59,130,246,0.45)]">
                <span
                  aria-hidden="true"
                  className="absolute left-7 right-7 top-0 h-px bg-gradient-to-r from-blue-400/55 via-blue-400/20 to-transparent"
                />
                <h3 className="text-xl font-bold uppercase tracking-[0.08em] text-white">{platform.name}</h3>
                <span aria-hidden="true" className="mt-3 h-px w-8 bg-blue-400/45" />
                <p className="mt-3 text-sm leading-relaxed text-blue-100/75">{platform.description}</p>
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

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Markanız İçin Doğru Satış Sistemini Birlikte Belirleyelim
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-blue-100/70 sm:text-lg">
            Ürününüzü, mevcut satış kanallarınızı ve hedef pazarınızı analiz ederek GloventGlobal hizmetlerinden
            hangilerinin markanız için doğru sistem oluşturacağını birlikte planlayalım.
          </p>

          <p className="mt-6 text-xs font-medium uppercase tracking-[0.25em] text-blue-100/45">
            Amazon • Etsy • eBay • Shopify • B2B • Sosyal Medya • Reklam
          </p>

          <a
            href="/#contact"
            className="mt-9 inline-block rounded-full border border-blue-400/45 bg-blue-500/10 px-12 py-3.5 text-sm font-semibold tracking-wide text-white backdrop-blur-sm transition-all duration-300 hover:border-blue-400/75 hover:bg-blue-500/20 hover:shadow-[0_0_36px_-6px_rgba(59,130,246,0.6)]"
          >
            Hizmet Planı Oluştur
          </a>
        </div>
      </section>
    </main>
  );
}