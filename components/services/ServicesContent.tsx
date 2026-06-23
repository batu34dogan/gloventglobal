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

// Büyük başlıkların arkasına oturan, hizmet detay sayfalarındaki (ServiceDetailContent.tsx) Hero
// glow'uyla aynı kanıtlanmış teknik — bağımsız kopya (sayfa izolasyonu prensibi korunuyor).
// Başlığın KENDİ (relative isolate) kutusuna sıkıca bağlı; eyebrow/açıklama gibi çevresindeki
// içeriği değil, SADECE başlığı kapsıyor. Sitedeki 3 sabit seviye: "hero" en geniş/belirgin,
// "section" orta, "cta" en hafif (ServiceDetailContent.tsx'teki Final CTA glow'uyla birebir aynı
// değerler — tüm site genelinde Final CTA glow'unun aynı seviyede algılanması için).
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

const systemPillars = [
  {
    number: '01',
    title: 'Strateji',
    description: 'Markanızın mevcut yapısını, hedef pazarını, ürünlerini, müşteri profilini ve büyüme potansiyelini analiz ederek doğru dijital yol haritasını oluştururuz.',
  },
  {
    number: '02',
    title: 'Teknoloji',
    description: 'Shopify, headless commerce, pazaryeri sistemleri, yapay zeka, otomasyon ve veri altyapılarını markanızın ihtiyacına göre entegre ederiz.',
  },
  {
    number: '03',
    title: 'Operasyon',
    description: 'Kurulan sistemin sürdürülebilir olması için ürün, kategori, içerik, reklam, kampanya, raporlama ve günlük dijital operasyon süreçlerini yönetilebilir hale getiririz.',
  },
];

// "Dijital Büyüme Sistemi Nelerden Oluşur?" bölümü için 5 ana sistem kategorisi — bilerek hizmet
// listesi değil, GloventGlobal'ın kurduğu sistemin "haritası" gibi kurgulandı. Her kategori kısa
// bir açıklama + küçük tek-tip mavi chip alt etiketlerle (Ekosistem/Teknoloji bölümlerindeki aynı dil).
const systemComposition = [
  {
    number: '01',
    title: 'Pazaryeri Sistemleri',
    description: 'Amazon, Etsy, eBay ve diğer satış kanallarında ürün görünürlüğü, listeleme, reklam ve mağaza operasyonunu sistemli hale getiririz.',
    chips: ['Amazon', 'Etsy', 'eBay', 'Pazaryeri Operasyonu'],
  },
  {
    number: '02',
    title: 'Commerce Altyapıları',
    description: 'Markaya ait satış altyapısını Shopify, B2B, dijital showroom ve headless commerce yapılarıyla kurarız.',
    chips: ['Shopify', 'B2B', 'Dijital Showroom', 'Headless Commerce'],
  },
  {
    number: '03',
    title: 'Büyüme ve Performans',
    description: 'SEO, reklam, dönüşüm optimizasyonu, veri analizi ve performans takibiyle büyüme kararlarını ölçülebilir hale getiririz.',
    chips: ['SEO', 'Reklam', 'CRO', 'Veri Analizi'],
  },
  {
    number: '04',
    title: 'Yapay Zeka ve Otomasyon',
    description: 'AI içerik, görsel, raporlama, n8n otomasyonları, CRM ve entegrasyonlarla süreçleri daha verimli hale getiririz.',
    chips: ['Yapay Zeka', 'n8n', 'CRM', 'Entegrasyon'],
  },
  {
    number: '05',
    title: 'Dijital Operasyon',
    description: 'Ürün, kategori, kampanya, banner, içerik ve günlük dijital yönetim süreçlerini sürdürülebilir hale getiririz.',
    chips: ['Ürün Yönetimi', 'Kategori', 'Kampanya', 'İçerik'],
  },
];

// "Hizmeti Nasıl Alabilirsiniz?" bölümü için 3 çalışma modeli — bilerek "satış paketi" değil, "GloventGlobal
// ile nasıl çalışılır" sorusuna cevap veren bir çalışma modeli gibi kurgulandı.
const deliveryModels = [
  {
    number: '01',
    title: 'Sistem Kurulumu',
    description: 'Markanız için gerekli dijital altyapıyı, pazaryeri yapısını, Shopify / B2B sistemini, otomasyonları veya operasyon akışını kurar ve uygulanabilir şekilde teslim ederiz.',
  },
  {
    number: '02',
    title: 'Yönetim ve Operasyon',
    description: 'Kurulan sistemin ürün, içerik, reklam, kampanya, kategori, müşteri akışı ve günlük dijital operasyon süreçlerini birlikte yönetiriz.',
  },
  {
    number: '03',
    title: 'Büyüme Partnerliği',
    description: 'Markanızın uzun vadeli büyüme hedefleri için strateji, teknoloji, performans, yapay zeka, otomasyon ve operasyon süreçlerini düzenli olarak geliştiririz.',
  },
];

const serviceCards = [
  {
    tag: '01 AMAZON',
    title: 'Amazon Danışmanlığı',
    description: 'Amazon’da doğru kategori, listeleme, SEO, reklam ve operasyon yapısıyla satışa hazır bir sistem kurarız.',
    href: '/hizmetler/amazon',
    ctaName: 'Amazon',
  },
  {
    tag: '02 ETSY',
    title: 'Etsy Mağaza Sistemi',
    description: 'El yapımı, butik, tasarım ve niş ürünler için Etsy mağaza yapısı, görsel dili ve listeleme stratejisi oluştururuz.',
    href: '/hizmetler/etsy',
    ctaName: 'Etsy',
  },
  {
    tag: '03 EBAY',
    title: 'eBay Global Satış',
    description: 'Farklı pazarlara açılmak isteyen markalar için eBay listeleme, kategori ve satış altyapısını hazırlarız.',
    href: '/hizmetler/ebay',
    ctaName: 'eBay',
  },
  {
    tag: '04 SHOPIFY',
    title: 'Shopify Satış Altyapısı',
    description: 'Markanıza özel vitrin, ürün yönetimi, koleksiyon yapısı, ödeme ve satış deneyimi için Shopify altyapısı kurarız.',
    href: '/hizmetler/shopify',
    ctaName: 'Shopify',
  },
  {
    tag: '05 B2B',
    title: 'B2B Dijital Showroom',
    description: 'Toptan satış yapan markalar için dijital katalog, teklif listesi, müşteri odaklı ürün sunumu ve showroom sistemi oluştururuz.',
    href: '/hizmetler/b2b-dijital-showroom',
    ctaName: 'B2B',
  },
  {
    tag: '06 MARKA',
    title: 'Marka Konumlandırma',
    description: 'Ürününüzü yalnızca satılacak bir ürün olarak değil, pazarda algısı olan bir marka yapısı içinde konumlandırırız.',
    href: '/hizmetler/marka-konumlandirma',
    ctaName: 'Marka',
  },
  {
    tag: '07 GÖRSEL',
    title: 'Görsel & İçerik Sistemi',
    description: 'Ürün fotoğrafı, yapay zeka destekli görsel konsept, açıklama, başlık ve marka dili bütünlüğünü kurarız.',
    href: '/hizmetler/gorsel-icerik-sistemi',
    ctaName: 'Görsel',
  },
  {
    tag: '08 AI',
    title: 'Yapay Zeka Entegrasyonu',
    description: 'Ürün, içerik, görsel konsept, raporlama, operasyon ve karar süreçlerine yapay zeka destekli sistemler entegre ederiz.',
    href: '/hizmetler/yapay-zeka-entegrasyonu',
    ctaName: 'AI',
  },
  {
    tag: '09 SOSYAL MEDYA',
    title: 'Sosyal Medya Yönetimi',
    description: 'Markanızın Instagram, TikTok ve diğer sosyal kanallarda tutarlı görünmesi için içerik planı, görsel dil ve paylaşım stratejisi oluştururuz.',
    href: '/hizmetler/sosyal-medya-yonetimi',
    ctaName: 'Sosyal Medya',
  },
  {
    tag: '10 REKLAM',
    title: 'Reklam & Optimizasyon',
    description: 'Amazon, Etsy, Google ve Meta reklamlarını veri, dönüşüm ve kârlılık odağında optimize ederiz.',
    href: '/hizmetler/reklam-optimizasyon',
    ctaName: 'Reklam',
  },
  {
    tag: '11 OTOMASYON',
    title: 'Otomasyon & n8n Sistemleri',
    description: 'Form, teklif, müşteri, ürün, sipariş ve raporlama süreçlerini n8n, API ve entegrasyon yapılarıyla birbirine bağlayan otomasyon sistemleri kurarız.',
    href: '/hizmetler/otomasyon-n8n',
    ctaName: 'Otomasyon',
  },
  {
    tag: '12 STRATEJİ',
    title: 'Global Pazara Giriş Stratejisi',
    description: 'Ürününüz için doğru ülke, kanal, fiyat, rekabet ve büyüme yol haritasını belirleriz.',
    href: '/hizmetler/global-pazara-giris-stratejisi',
    ctaName: 'Strateji',
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
    description: 'Rekabetçi pazarlarda doğru kategori, listeleme, reklam, görünürlük ve operasyon sistemi oluştururuz.',
  },
  {
    name: 'Etsy',
    description: 'Tasarım, butik, niş ve el yapımı ürünler için güçlü görsel dil, SEO ve mağaza sunumu kurgularız.',
  },
  {
    name: 'eBay',
    description: 'Farklı pazarlara açılmak isteyen markalar için listeleme, kategori ve satış operasyonu yapısını hazırlarız.',
  },
  {
    name: 'Shopify',
    description: 'Markaya ait müşteri, ürün, koleksiyon, kampanya ve satış altyapısını yönetilebilir hale getiririz.',
  },
  {
    name: 'B2B Dijital Showroom',
    description: 'Toptan satış, katalog, ürün sunumu, teklif toplama ve müşteri erişimi süreçlerini dijitalleştiririz.',
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
  'delay-[500ms]',
  'delay-[550ms]',
];

export default function ServicesContent() {
  const [mounted, setMounted] = useState(false);
  const [systemRef, systemInView] = useInView<HTMLElement>();
  const [compositionRef, compositionInView] = useInView<HTMLElement>();
  const [servicesRef, servicesInView] = useInView<HTMLElement>();
  const [deliveryRef, deliveryInView] = useInView<HTMLElement>();
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

  // "Dijital Büyüme Sistemi Nelerden Oluşur?" bölümü — kendi viewport girişine (compositionInView) bağlı.
  const compositionReveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      compositionInView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
    }`;

  // Hizmet Kartları bölümü, Sistem Mantığı'nın daha da altında — kendi viewport girişine bağlı, ayrı reveal.
  const servicesReveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      servicesInView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
    }`;

  // "Hizmeti Nasıl Alabilirsiniz?" bölümü — kendi viewport girişine (deliveryInView) bağlı.
  const deliveryReveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      deliveryInView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
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
          <div className="relative isolate mx-auto mt-8 max-w-3xl">
            <TitleGlow tone="hero" />
            <h1
              className={`relative z-10 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl ${reveal(
                'delay-[200ms]',
              )}`}
            >
              Her Marka İçin Farklı Bir Dijital Büyüme Sistemi Kuruyoruz
            </h1>
          </div>
          <p
            className={`mx-auto mt-7 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg ${reveal(
              'delay-[300ms]',
            )}`}
          >
            GloventGlobal; markanızın hedeflerine göre strateji, teknoloji, yapay zeka, otomasyon, e-ticaret
            altyapısı, pazaryeri yönetimi ve dijital operasyon süreçlerini birlikte çalışan bir büyüme sistemi
            olarak kurgular.
          </p>

          <div className={`mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row ${reveal('delay-[400ms]')}`}>
            <a
              href="/iletisim"
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
          <div className="relative isolate mx-auto mt-4 max-w-xl">
            <TitleGlow tone="section" />
            <h2 className={`relative z-10 text-3xl font-bold tracking-tight sm:text-4xl ${systemReveal('delay-[100ms]')}`}>
              Parça Parça Hizmet Değil, Birlikte Çalışan Büyüme Sistemi
            </h2>
          </div>
          <p
            className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg ${systemReveal(
              'delay-[200ms]',
            )}`}
          >
            Strateji olmadan reklam, içerik olmadan mağaza, altyapı olmadan büyüme sürdürülebilir olmaz.
            GloventGlobal; pazar analizi, marka konumlandırma, dijital altyapı, içerik üretimi, reklam, operasyon ve
            otomasyon süreçlerini tek bir dijital büyüme sistemi mantığıyla birleştirir.
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

      {/* ============ 2.5 DİJİTAL BÜYÜME SİSTEMİ NELERDEN OLUŞUR? ============
          Sistem Mantığı (3 ilke) ile 12 hizmet kartı arasında — "hizmet listesi" değil, GloventGlobal'ın
          kurduğu sistemin 5 ana kategorisinin haritası gibi okunsun. */}
      <section ref={compositionRef} className="relative px-6 pb-20 pt-14 sm:px-10">
        <Glow visible={compositionInView} targetOpacity="opacity-40" className="right-[-200px] top-0 h-[440px] w-[440px]" />
        <Glow visible={compositionInView} targetOpacity="opacity-30" className="left-[-200px] bottom-0 h-[420px] w-[420px]" />

        <div className="relative mx-auto max-w-3xl text-center">
          <p
            className={`text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/80 ${compositionReveal(
              'delay-[0ms]',
            )}`}
          >
            Sistem Haritası
          </p>
          <div className="relative isolate mx-auto mt-4 max-w-xl">
            <TitleGlow tone="section" />
            <h2
              className={`relative z-10 text-3xl font-bold tracking-tight sm:text-4xl ${compositionReveal(
                'delay-[100ms]',
              )}`}
            >
              Dijital Büyüme Sistemi Nelerden Oluşur?
            </h2>
          </div>
          <p
            className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg ${compositionReveal(
              'delay-[200ms]',
            )}`}
          >
            GloventGlobal&apos;da hizmetler tek tek sunulan bağımsız işler değildir. Pazaryeri, commerce
            altyapısı, yapay zeka, otomasyon, performans ve dijital operasyon süreçleri birlikte çalışan bir
            sistemin parçaları olarak ele alınır.
          </p>
        </div>

        {/* 5 ana sistem kategorisi, 8 sanal sütun (lg:grid-cols-8) + her kart 2 sütun (lg:col-span-2):
            5 kart 4'e tam bölünmediği için (3 üst + 2 alt) iki satır da BAĞIMSIZ olarak ortalanıyor —
            /hizmetler'deki "Kimler İçin?" bölümünde ve ana sayfa/hakkımızda'daki benzer 5 kartlı
            bölümlerde kullanılan aynı kanıtlanmış teknik. */}
        <div className="relative mx-auto mt-10 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-8">
          {systemComposition.map((category, index) => (
            <div
              key={category.title}
              className={`${compositionReveal(['delay-[300ms]', 'delay-[360ms]', 'delay-[420ms]', 'delay-[480ms]', 'delay-[540ms]'][index])} lg:col-span-2 ${
                index === 0 ? 'lg:col-start-2' : index === 3 ? 'lg:col-start-3' : ''
              }`}
            >
              <div className="relative flex h-full min-h-[210px] flex-col rounded-xl border border-white/[0.08] bg-white/[0.035] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-white/[0.06] hover:shadow-[0_0_40px_-12px_rgba(59,130,246,0.45)]">
                <span
                  aria-hidden="true"
                  className="absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-blue-400/55 via-blue-400/20 to-transparent"
                />
                <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-blue-400/45 bg-blue-500/10 text-xs font-semibold text-blue-300 shadow-[0_0_16px_-2px_rgba(59,130,246,0.6)]">
                  {category.number}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">{category.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-blue-100/75">{category.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {category.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-blue-400/25 bg-blue-500/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.05em] text-blue-200/75"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
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
          <div className="relative isolate mx-auto mt-4 max-w-xl">
            <TitleGlow tone="section" />
            <h2
              className={`relative z-10 text-3xl font-bold tracking-tight sm:text-4xl ${servicesReveal(
                'delay-[100ms]',
              )}`}
            >
              Uzmanlık Alanlarımız
            </h2>
          </div>
          <p
            className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg ${servicesReveal(
              'delay-[200ms]',
            )}`}
          >
            Her hizmet, markanız için kurulan dijital büyüme sisteminin bir parçasıdır. İhtiyaca göre pazaryeri,
            commerce altyapısı, yapay zeka, otomasyon, reklam, içerik ve operasyon alanlarını birlikte kurgularız.
          </p>
        </div>

        {/* 12 kart, 4'lü görünüm için 8 "sanal" sütun (lg:grid-cols-8) + her kart 2 sütun
            (lg:col-span-2): 12 kart 4'e tam bölündüğü için (3x4) hiçbir ortalama hilesi
            gerekmiyor, 3 satır da doğal olarak tam doluyor. */}
        <div className="relative mx-auto mt-10 grid max-w-6xl items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-8">
          {serviceCards.map((service, index) => {
            const cardClassName =
              'relative flex h-full min-h-[180px] flex-col rounded-xl border border-white/[0.08] bg-white/[0.035] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-white/[0.06] hover:shadow-[0_0_40px_-12px_rgba(59,130,246,0.45)]';

            const cardContent = (
              <>
                <span
                  aria-hidden="true"
                  className="absolute left-5 right-5 top-0 h-px bg-gradient-to-r from-blue-400/55 via-blue-400/20 to-transparent"
                />
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-300/80">
                  {service.tag}
                </span>
                <h3 className="mt-2.5 text-base font-semibold text-white">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-blue-100/70">{service.description}</p>
                {/* Sadece detay sayfası olan kartlarda (şimdilik tek Etsy) görünen mini CTA pill —
                    flex-col + mt-auto ile kartın altına sabitleniyor, tasarımı kalabalıklaştırmıyor.
                    İki satırlı yapı (hizmet adı / "Detayını İncele →") ileride diğer hizmet
                    kartlarına da aynı şablonla uygulanabilecek standart bir desen oluşturuyor. */}
                {service.href && (
                  <span className="mt-auto inline-flex w-fit flex-col items-start gap-0.5 self-start rounded-full border border-blue-400/40 bg-blue-500/10 px-3.5 py-2 text-[11px] font-semibold uppercase leading-tight tracking-[0.12em] text-blue-200 transition-all duration-300 group-hover:border-blue-400/70 group-hover:bg-blue-500/20 group-hover:text-white group-hover:shadow-[0_0_18px_-4px_rgba(59,130,246,0.6)]">
                    <span>{service.ctaName}</span>
                    <span>Detayını İncele →</span>
                  </span>
                )}
              </>
            );

            return (
              <div
                key={service.title}
                className={`${servicesReveal(serviceCardDelays[index])} lg:col-span-2`}
              >
                {service.href ? (
                  <a href={service.href} className={`group ${cardClassName}`}>
                    {cardContent}
                  </a>
                ) : (
                  <div className={cardClassName}>{cardContent}</div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ============ 3.5 HİZMETİ NASIL ALABİLİRSİNİZ? ============
          12 hizmet kartı ile "Hangi Marka İçin Hangi Sistem Doğru?" arasında — "satış paketi" değil,
          GloventGlobal ile çalışma modelini (kurulum / yönetim / partnerlik) anlatan sade 3 kart. */}
      <section ref={deliveryRef} className="relative px-6 pb-20 pt-14 sm:px-10">
        <Glow visible={deliveryInView} targetOpacity="opacity-40" className="left-1/2 top-0 h-[400px] w-[760px] -translate-x-1/2" />

        <div className="relative mx-auto max-w-3xl text-center">
          <p
            className={`text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/80 ${deliveryReveal(
              'delay-[0ms]',
            )}`}
          >
            ÇALIŞMA MODELİ
          </p>
          <div className="relative isolate mx-auto mt-4 max-w-xl">
            <TitleGlow tone="section" />
            <h2
              className={`relative z-10 text-3xl font-bold tracking-tight sm:text-4xl ${deliveryReveal(
                'delay-[100ms]',
              )}`}
            >
              Hizmeti Nasıl Alabilirsiniz?
            </h2>
          </div>
          <p
            className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg ${deliveryReveal(
              'delay-[200ms]',
            )}`}
          >
            Her marka aynı seviyede destek ihtiyacı duymaz. Bu yüzden GloventGlobal&apos;da hizmetler tek bir
            paket olarak değil; kurulum, yönetim veya uzun vadeli büyüme partnerliği şeklinde
            yapılandırılabilir.
          </p>
        </div>

        <div className="relative mx-auto mt-10 grid max-w-5xl items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {deliveryModels.map((model, index) => (
            <div key={model.number} className={deliveryReveal(['delay-[300ms]', 'delay-[380ms]', 'delay-[460ms]'][index])}>
              <div className="relative flex h-full min-h-[170px] flex-col rounded-xl border border-white/[0.08] bg-white/[0.035] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-white/[0.06] hover:shadow-[0_0_40px_-12px_rgba(59,130,246,0.45)]">
                <span
                  aria-hidden="true"
                  className="absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-blue-400/55 via-blue-400/20 to-transparent"
                />
                <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-blue-400/45 bg-blue-500/10 text-xs font-semibold text-blue-300 shadow-[0_0_16px_-2px_rgba(59,130,246,0.6)]">
                  {model.number}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">{model.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-blue-100/75">{model.description}</p>
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
          <div className="relative isolate mx-auto mt-4 max-w-xl">
            <TitleGlow tone="section" />
            <h2
              className={`relative z-10 text-3xl font-bold tracking-tight sm:text-4xl ${audienceReveal(
                'delay-[100ms]',
              )}`}
            >
              Hangi Marka İçin Hangi Sistem Doğru?
            </h2>
          </div>
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
          <div className="relative isolate mx-auto mt-4 max-w-xl">
            <TitleGlow tone="section" />
            <h2
              className={`relative z-10 text-3xl font-bold tracking-tight sm:text-4xl ${platformsReveal(
                'delay-[100ms]',
              )}`}
            >
              Her Kanal İçin Ayrı, Tek Sistem İçinde Bağlı Çözümler
            </h2>
          </div>
          <p
            className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg ${platformsReveal(
              'delay-[200ms]',
            )}`}
          >
            Amazon, Etsy, eBay, Shopify ve B2B dijital yapılar farklı dinamiklere sahiptir. GloventGlobal her kanalı
            ayrı planlar, ancak tamamını markanın dijital satış ve büyüme sistemi içinde birbirine bağlı şekilde
            kurgular.
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

          <div className="relative isolate mx-auto max-w-2xl">
            <TitleGlow tone="cta" />
            <h2 className="relative z-10 text-3xl font-bold tracking-tight sm:text-4xl">
              Markanız İçin Doğru Dijital Büyüme Sistemini Birlikte Belirleyelim
            </h2>
          </div>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-blue-100/70 sm:text-lg">
            Ürününüzü, mevcut satış kanallarınızı ve hedeflerinizi analiz ederek GloventGlobal hizmetlerinden
            hangilerinin markanız için doğru dijital büyüme sistemini oluşturacağını birlikte planlayalım.
          </p>

          <p className="mt-6 text-xs font-medium uppercase tracking-[0.25em] text-blue-100/45">
            Amazon • Etsy • eBay • Shopify • B2B • Sosyal Medya • Reklam • Otomasyon
          </p>

          <a
            href="/iletisim"
            className="mt-9 inline-block rounded-full border border-blue-400/45 bg-blue-500/10 px-12 py-3.5 text-sm font-semibold tracking-wide text-white backdrop-blur-sm transition-all duration-300 hover:border-blue-400/75 hover:bg-blue-500/20 hover:shadow-[0_0_36px_-6px_rgba(59,130,246,0.6)]"
          >
            Hizmet Planı Oluştur
          </a>
        </div>
      </section>
    </main>
  );
}