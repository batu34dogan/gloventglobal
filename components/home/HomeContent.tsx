'use client';

import { useEffect, useRef, useState } from 'react';
import { trackEvent } from '@/lib/analytics';

// Bir elementin viewport'a girip girmediğini takip eder (native IntersectionObserver, yeni paket yok).
// Bir kez göründükten sonra gözlemeyi durdurur — sürekli tetiklenen bir "marquee" değil, tek seferlik giriş efekti.
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

const heroPlatforms = [
  { name: 'YAPAY ZEKA', tone: 'text-blue-100/85' },
  { name: 'OTOMASYON', tone: 'text-blue-200/72' },
  { name: 'E-TİCARET', tone: 'text-blue-300/72' },
  { name: 'B2B', tone: 'text-blue-100/85' },
  { name: 'DİJİTAL BÜYÜME', tone: 'text-blue-200/72' },
  { name: 'VERİ ANALİZİ', tone: 'text-blue-300/72' },
  { name: 'DİJİTAL OPERASYON', tone: 'text-blue-100/85' },
  { name: 'TEKNOLOJİ ALTYAPISI', tone: 'text-blue-200/72' },
];

// "Markanız İçin Kurduğumuz Dijital Ekosistem" bölümü için 6 modül kartı — her biri kısa bir
// açıklama + küçük "chip" alt etiketler ile (Shopify, Amazon, AI İçerik vb.). Önceki "Global Satış
// Altyapısı" bölümünün dönüştürülmüş hali; yeni bölüm değil, mevcut veri/markup güncellendi.
const services = [
  {
    tag: '01 WEB & COMMERCE',
    title: 'Web & Commerce Altyapısı',
    description: 'Shopify, headless commerce, B2B showroom, ürün sayfaları ve marka web platformlarını satışa ve büyümeye uygun şekilde kurgularız.',
    chips: ['Shopify', 'Headless', 'B2B', 'Showroom'],
  },
  {
    tag: '02 PAZARYERİ',
    title: 'Pazaryeri Sistemleri',
    description: 'Amazon, Etsy, eBay ve yerel pazaryerlerinde ürün listeleme, mağaza yapısı, görünürlük, reklam ve operasyon süreçlerini yönetilebilir hale getiririz.',
    chips: ['Amazon', 'Etsy', 'eBay', 'Trendyol', 'Hepsiburada'],
  },
  {
    tag: '03 YAPAY ZEKA',
    title: 'Yapay Zeka Entegrasyonu',
    description: 'Yapay zekayı içerik üretimi, görsel konsept, ürün sunumu, analiz, raporlama ve operasyon süreçlerine entegre ederiz.',
    chips: ['AI İçerik', 'AI Görsel', 'AI Analiz', 'AI Operasyon'],
  },
  {
    tag: '04 OTOMASYON',
    title: 'Otomasyon & Entegrasyonlar',
    description: 'Form, teklif, müşteri, ürün, sipariş, WhatsApp, e-mail ve raporlama süreçlerini otomasyon sistemleriyle birbirine bağlarız.',
    chips: ['n8n', 'CRM', 'WhatsApp', 'E-mail', 'API'],
  },
  {
    tag: '05 PERFORMANS',
    title: 'Performans & Veri Analizi',
    description: 'Trafik, dönüşüm, reklam, satış ve kullanıcı davranışı verilerini takip ederek dijital büyüme kararlarını ölçülebilir hale getiririz.',
    chips: ['SEO', 'Analytics', 'CRO', 'Reklam', 'Raporlama'],
  },
  {
    tag: '06 OPERASYON',
    title: 'Dijital Operasyon',
    description: 'Ürün yönetimi, kategori yapısı, banner, kampanya, içerik güncelleme ve günlük dijital operasyon süreçlerini sürdürülebilir hale getiririz.',
    chips: ['Ürün', 'Kategori', 'Kampanya', 'Banner', 'İçerik'],
  },
];

const whySteps = [
  {
    number: '01',
    title: 'İşletmeyi Analiz Ederiz',
    description: 'İşletmenin mevcut dijital yapısını, ürünlerini, hedef müşterisini, satış kanallarını ve büyüme potansiyelini analiz ederiz.',
  },
  {
    number: '02',
    title: 'Stratejiyi Oluştururuz',
    description: 'Hangi pazarda, hangi kanalda, hangi ürün ve mesajla ilerlenmesi gerektiğini uygulanabilir bir dijital büyüme planına dönüştürürüz.',
  },
  {
    number: '03',
    title: 'Teknolojiyi Kurarız',
    description: 'Shopify, headless yapılar, B2B showroom, pazaryeri sistemleri, veri takibi ve dijital altyapı çözümlerini markaya uygun şekilde kurarız.',
  },
  {
    number: '04',
    title: 'Yapay Zekayı Entegre Ederiz',
    description: 'Yapay zekayı içerik, görsel konsept, raporlama, analiz, operasyon ve karar süreçlerine entegre ederek markanın çalışma sistemini güçlendiririz.',
  },
  {
    number: '05',
    title: 'Operasyonu Yönetiriz',
    description: 'Ürün yönetimi, kategori yapısı, kampanya, reklam, içerik, müşteri akışı ve günlük dijital operasyon süreçlerini yönetilebilir hale getiririz.',
  },
  {
    number: '06',
    title: 'Büyümeyi Ölçer ve Geliştiririz',
    description: 'Trafik, dönüşüm, reklam, satış, müşteri davranışı ve operasyon verilerini takip ederek sistemi düzenli olarak geliştiririz.',
  },
];

const processSteps = [
  { number: '01', title: 'Keşif', description: 'İşletmenin mevcut yapısını, hedeflerini, ürünlerini, satış kanallarını ve dijital ihtiyaçlarını birlikte netleştiririz.' },
  {
    number: '02',
    title: 'Analiz',
    description: 'Pazar, rakip, ürün, müşteri, kanal, veri ve mevcut operasyon yapısını değerlendirerek fırsat ve eksikleri belirleriz.',
  },
  {
    number: '03',
    title: 'Strateji',
    description: 'Marka için doğru pazar, kanal, konumlandırma, teknoloji ve operasyon yol haritasını oluştururuz.',
  },
  {
    number: '04',
    title: 'Kurulum',
    description: 'Web altyapısı, Shopify, pazaryeri, B2B showroom, veri takibi ve gerekli dijital sistemleri markaya uygun şekilde kurarız.',
  },
  {
    number: '05',
    title: 'Yapay Zeka ve Otomasyon',
    description: 'İçerik, görsel, raporlama, teklif, müşteri akışı, ürün yönetimi ve operasyon süreçlerinde yapay zeka ve otomasyon entegrasyonları kurgularız.',
  },
  {
    number: '06',
    title: 'Yayın',
    description: 'Hazırlanan dijital sistemi test eder, gerekli kontrolleri yapar ve markayı yayına veya satışa hazır hale getiririz.',
  },
  {
    number: '07',
    title: 'Operasyon',
    description: 'Ürün, kategori, kampanya, içerik, reklam, müşteri akışı ve günlük dijital operasyon süreçlerini yönetilebilir hale getiririz.',
  },
  {
    number: '08',
    title: 'Büyüme',
    description: 'Trafik, dönüşüm, satış, reklam, müşteri davranışı ve operasyon verilerini takip ederek sistemi düzenli olarak geliştiririz.',
  },
];

// GloventGlobal Network bölümü için marka verisi — 6 kart, hepsi aynı boyutta, kayan şeritte.
// Her kart 3 kısa alan: marka adı, sektör/iş alanı (muted, küçük), GloventGlobal'ın katkısı.
const networkBrands = [
  {
    name: 'BERD',
    sector: 'Amazon Australia & eBay Australia',
    contribution: 'Ürün listeleme, reklam, SEO ve pazaryeri operasyon sistemi.',
  },
  {
    name: 'Ziynet Bijuteri',
    sector: 'Toptan Bijuteri / B2B',
    contribution: 'Headless Shopify, dijital showroom ve B2B ürün sunum sistemi.',
  },
  {
    name: 'GermaniaLeather',
    sector: 'Deri Ürünleri / Etsy',
    contribution: 'Etsy odaklı ürün sunumu, görsel dil ve global mağaza hazırlığı.',
  },
  {
    name: 'Ritüelco',
    sector: 'Ritüel, Mum ve Tütsü Ürünleri',
    contribution: 'Etsy için marka dili, ürün hikayesi ve dijital mağaza konsepti.',
  },
  {
    name: 'Boncukcu Amca',
    sector: 'Takı Malzemeleri / Toptan & Perakende',
    contribution: 'Shopify tabanlı ürün yönetimi, kategori ve satış altyapısı kurgusu.',
  },
  {
    name: 'Güvenli Adımlar',
    sector: 'Amazon Türkiye',
    contribution: 'Amazon listeleme, marka görünürlüğü, operasyon ve pazaryeri süreçleri.',
  },
];

// "Kimlerle Çalışıyoruz?" bölümü için hedef kitle kartları — bilerek hizmet kartı (tag/etiket)
// dilinden farklı, dairesel numara rozeti kullanılıyor; "kimlere uygun" sorusuna cevap veriyor.
const audienceGroups = [
  {
    number: '01',
    title: 'Üreticiler',
    description: 'Ürünlerini dijital kanallara taşımak, marka görünürlüğünü artırmak ve yeni satış kanalları oluşturmak isteyen üretici işletmeler.',
  },
  {
    number: '02',
    title: 'Toptancılar',
    description: 'B2B satış süreçlerini dijitalleştirmek, ürün sunumunu güçlendirmek ve bayi / müşteri erişimini kolaylaştırmak isteyen toptan firmalar.',
  },
  {
    number: '03',
    title: 'E-Ticaret Markaları',
    description: 'Web sitesi, pazaryeri, reklam, içerik, veri ve operasyon süreçlerini daha yönetilebilir bir büyüme sistemine dönüştürmek isteyen markalar.',
  },
  {
    number: '04',
    title: 'B2B Firmalar',
    description: 'Teklif, katalog, ürün gösterimi, müşteri akışı ve dijital showroom ihtiyaçlarını profesyonel bir altyapıya taşımak isteyen işletmeler.',
  },
  {
    number: '05',
    title: 'Global Pazara Açılmak İsteyen İşletmeler',
    description: 'Amazon, Etsy, eBay, Shopify veya farklı dijital kanallar üzerinden yeni pazarlara kontrollü şekilde açılmak isteyen markalar.',
  },
];

// "Teknoloji Ekosistemimiz" bölümü için 5 kategori — logo YOK, sadece küçük premium chip/glass
// tag'ler. Marka algısı "teknoloji kullanan ajans" değil, "teknolojiyle büyüme sistemi kuran
// şirket" olsun diye bilerek araç listesi gibi değil, kategori haritası gibi kurgulandı.
const techStack = [
  {
    number: '01',
    title: 'Commerce & Web',
    chips: ['Shopify', 'Headless Commerce', 'Next.js', 'Vercel', 'Cloudflare'],
  },
  {
    number: '02',
    title: 'Yapay Zeka',
    chips: ['OpenAI', 'Claude', 'AI İçerik', 'AI Görsel', 'AI Analiz'],
  },
  {
    number: '03',
    title: 'Otomasyon & Entegrasyon',
    chips: ['n8n', 'Zapier', 'API', 'CRM', 'WhatsApp', 'E-mail'],
  },
  {
    number: '04',
    title: 'Pazaryeri & Satış Kanalları',
    chips: ['Amazon', 'Etsy', 'eBay', 'Trendyol', 'Hepsiburada', 'B2B'],
  },
  {
    number: '05',
    title: 'Veri & Performans',
    chips: ['Google Analytics', 'Search Console', 'Meta', 'SEO', 'CRO', 'Reklam Raporlama'],
  },
];

// Tek, sürekli koyu lacivert taban — section'lar arasında sert renk/sınır geçişi yok.
// Section kimliği, arka planda dağılmış yumuşak mavi glow'larla veriliyor (intro'nun network temasıyla aynı dil).
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


export default function HomeContent() {
  const [mounted, setMounted] = useState(false);
  const [brandsGridRef, brandsInView] = useInView<HTMLDivElement>();
  const [whyRef, whyInView] = useInView<HTMLElement>();
  const [audienceRef, audienceInView] = useInView<HTMLElement>();
  const [techRef, techInView] = useInView<HTMLElement>();

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Hero içindeki tek tek elementler için kademeli giriş (delay class'ları sabit/literal olmalı,
  // Tailwind derleme zamanında metni tarayarak class üretir — dinamik string birleştirme çalışmaz).
  const reveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      mounted ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
    }`;

  // Farkımız section'ı için ayrı bir reveal — Hero'nun "mounted" durumuna değil, bu section'ın
  // viewport'a girip girmediğine (whyInView) bağlı. /#why ile direkt bu bölüme inilse de
  // IntersectionObserver mevcut görünürlüğü algılayıp animasyonu doğru tetikler.
  const whyReveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      whyInView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
    }`;
  const whyCardDelays = [
    'delay-[320ms]',
    'delay-[380ms]',
    'delay-[440ms]',
    'delay-[500ms]',
    'delay-[560ms]',
    'delay-[620ms]',
  ];

  // "Kimlerle Çalışıyoruz?" bölümü için ayrı reveal — kendi viewport girişine (audienceInView) bağlı.
  const audienceReveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      audienceInView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
    }`;
  const audienceCardDelays = ['delay-[0ms]', 'delay-[60ms]', 'delay-[120ms]', 'delay-[180ms]', 'delay-[240ms]'];

  // "Teknoloji Ekosistemimiz" bölümü için ayrı reveal — kendi viewport girişine (techInView) bağlı.
  const techReveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      techInView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
    }`;
  const techCardDelays = ['delay-[0ms]', 'delay-[60ms]', 'delay-[120ms]', 'delay-[180ms]', 'delay-[240ms]'];

  return (
    <main
      className={`relative overflow-hidden bg-[#070d18] font-sans text-white transition-all duration-[800ms] ease-out motion-reduce:transition-none ${
        mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      {/* ============ 1. HERO ============ */}
      <section id="hero" className="relative px-6 pb-24 pt-32 sm:px-10 md:pb-32 md:pt-40">
        <Glow visible={mounted} targetOpacity="opacity-70" className="left-1/2 top-[-120px] h-[640px] w-[960px] -translate-x-1/2" />
        <Glow visible={mounted} targetOpacity="opacity-60" className="left-[-200px] top-[280px] h-[420px] w-[420px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className={`text-xs font-semibold uppercase tracking-[0.35em] text-blue-300/80 ${reveal('delay-[100ms]')}`}>
            GLOVENTGLOBAL — DIGITAL GROWTH SYSTEMS
          </p>
          <div className="relative isolate mx-auto mt-8 max-w-3xl">
            <TitleGlow tone="hero" />
            <h1
              className={`relative z-10 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl ${reveal(
                'delay-[200ms]',
              )}`}
            >
              İşletmenizin Dijitalde Büyümesi İçin Gerekli Sistemi Kuruyoruz
            </h1>
          </div>
          <p
            className={`mx-auto mt-7 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg ${reveal(
              'delay-[300ms]',
            )}`}
          >
            Markanızın mevcut yapısını analiz ediyor; strateji, teknoloji, yapay zeka, otomasyon, e-ticaret
            altyapısı ve dijital operasyon süreçlerini birlikte çalışan bir büyüme sistemine dönüştürüyoruz.
          </p>

          <div className={`mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row ${reveal('delay-[400ms]')}`}>
            <button
              type="button"
              onClick={() => {
                trackEvent('free_analysis_cta_click', { location: 'home_hero' });
                window.dispatchEvent(new Event('open-analysis-widget'));
              }}
              className="rounded-full border border-blue-400/40 bg-blue-500/10 px-8 py-3 text-sm font-semibold tracking-wide text-white backdrop-blur-sm transition-all duration-300 hover:border-blue-400/70 hover:bg-blue-500/20 hover:shadow-[0_0_30px_-6px_rgba(59,130,246,0.55)]"
            >
              Ücretsiz Analiz Al
            </button>
            <a
              href="#process"
              className="rounded-full border border-white/15 px-8 py-3 text-sm font-semibold tracking-wide text-white/90 transition-colors duration-300 hover:border-white/35 hover:bg-white/5"
            >
              Nasıl Çalışıyoruz?
            </a>
          </div>

          {/* İki ana CTA'nın altında, onlar kadar baskın olmayan küçük bir üçüncü/ikincil link —
              mobilde hamburger menüyü açmayan kullanıcıların da /hakkimizda'yı fark etmesi için. */}
          <div className={`mt-5 text-center ${reveal('delay-[450ms]')}`}>
            <a
              href="/hakkimizda"
              className="inline-block py-1 text-xs font-medium text-blue-100/55 transition-colors duration-200 hover:text-blue-200"
            >
              GloventGlobal nedir? →
            </a>
          </div>

          <div className={`relative mt-14 ${reveal('delay-[500ms]')}`}>
            <div className="relative mx-auto max-w-[420px] overflow-hidden sm:max-w-[520px]">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-3 bg-gradient-to-r from-[#070d18] to-transparent opacity-15 sm:w-5" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-3 bg-gradient-to-l from-[#070d18] to-transparent opacity-15 sm:w-5" />
              <div className="flex w-max animate-[hero-platform-marquee_50s_linear_infinite] items-center gap-5 motion-reduce:animate-none">
                {[...heroPlatforms, ...heroPlatforms].map((platform, index) => (
                  <span
                    key={`${platform.name}-${index}`}
                    className={`flex shrink-0 items-center gap-5 text-[11px] font-medium uppercase tracking-[0.3em] ${platform.tone}`}
                  >
                    {platform.name}
                    <span aria-hidden="true" className="text-blue-400/45">
                      •
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hero platform bandı için @keyframes — globals.css'e dokunmamak için component içinde tanımlı.
            Marka kartları marquee'sinden tamamen ayrı, kendi keyframe adıyla (hero-platform-marquee). */}
        <style>{`
          @keyframes hero-platform-marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* ============ 2. SİSTEM (marka bölümü) — tek sıra, çok yavaş sağdan sola kayan premium bant ============ */}
      <section className="relative overflow-hidden px-6 py-20 sm:px-10">
        <Glow visible={mounted} targetOpacity="opacity-35" className="left-1/2 top-0 h-[460px] w-[820px] -translate-x-1/2" />

        <div className="relative mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/80">Sistem</p>
            <div className="relative isolate mx-auto mt-4 max-w-2xl">
              <TitleGlow tone="section" />
              <h2 className="relative z-10 text-3xl font-bold tracking-tight sm:text-4xl">
                Farklı Markalar İçin Farklı Dijital Satış Sistemleri
              </h2>
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg">
              Her marka için aynı şablonu değil; ürün, hedef pazar, satış kanalı ve büyüme hedeflerine göre
              özelleştirilmiş dijital satış sistemleri tasarlıyoruz.
            </p>
          </div>
        </div>

        {/* Bant, mx-auto max-w-5xl'in dışında — section'ın tam genişliğini kullanıyor (kenarlardaki fade mask için). */}
        <div
          ref={brandsGridRef}
          className={`relative mt-14 overflow-hidden transition-opacity duration-700 ease-out motion-reduce:transition-none ${
            brandsInView ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Sol/sağ fade mask: kartlar kenarlara yumuşak girip çıksın.
              Mobilde (sm altı) daha dar ve daha şeffaf — desktop'ta (sm ve üstü) mevcut görünüm aynı. */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#070d18] to-transparent opacity-40 sm:w-28 sm:opacity-100" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#070d18] to-transparent opacity-40 sm:w-28 sm:opacity-100" />

          {/* Kart dizisi iki kez art arda render edilir — translateX(-50%) tam bir set genişliği kadar kayınca
              ikinci set ilkinin başladığı yere denk gelir, kopma/zıplama olmadan kesintisiz döngü oluşur. */}
          <div className="flex w-max animate-[brand-marquee_55s_linear_infinite] gap-6 motion-reduce:animate-none hover:[animation-play-state:paused]">
            {[...networkBrands, ...networkBrands].map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="flex h-[180px] w-[280px] flex-shrink-0 flex-col justify-start rounded-xl border border-white/[0.07] bg-white/[0.035] p-6 backdrop-blur-sm transition-all duration-300 hover:border-blue-400/40 hover:bg-white/[0.06] hover:shadow-[0_0_40px_-12px_rgba(59,130,246,0.45)] sm:w-[340px]"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-5 right-5 top-0 h-px bg-gradient-to-r from-blue-400/50 via-blue-400/15 to-transparent"
                />
                <h3 className="text-lg font-semibold text-white">{brand.name}</h3>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.08em] text-blue-100/45">
                  {brand.sector}
                </p>
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-blue-100/70">{brand.contribution}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee için @keyframes — globals.css'e dokunmamak için component içinde tanımlı. */}
        <style>{`
          @keyframes brand-marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* ============ 3. FARKIMIZ ============ */}
      <section id="why" ref={whyRef} className="relative px-6 py-20 sm:px-10">
        <Glow visible={mounted} targetOpacity="opacity-40" className="left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2" />

        <div className="relative mx-auto max-w-3xl text-center">
          <p className={`text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/80 ${whyReveal('delay-[0ms]')}`}>
            NEDEN GLOVENTGLOBAL?
          </p>
          <div className="relative isolate mx-auto mt-4 max-w-2xl">
            <TitleGlow tone="section" />
            <h2 className={`relative z-10 text-3xl font-bold tracking-tight sm:text-4xl ${whyReveal('delay-[100ms]')}`}>
              Parça Parça Hizmet Değil, Birlikte Çalışan Dijital Büyüme Sistemi
            </h2>
          </div>
          <p
            className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg ${whyReveal(
              'delay-[200ms]',
            )}`}
          >
            İşletmelerin dijitalde büyümesi için yalnızca araçlar kurmuyoruz. Strateji, teknoloji, yapay zeka,
            otomasyon, operasyon ve veri odaklı büyüme adımlarını birlikte çalışan tek bir sistem olarak
            tasarlıyoruz.
          </p>
        </div>

        {/* 6 katmanlı sistem kartı, 3+3 grid (lg:grid-cols-3 + 6 kart otomatik olarak 2 satıra
            bölünüyor, ek bir merkezleme hilesi gerekmiyor). Giriş animasyonu DIŞ div'de (whyReveal),
            hover ise İÇ div'de (duration-300) — ikisi farklı transition-duration kullandığı için
            aynı elementte çakışmasın diye bilerek ayrıldı. Eskiden ortadaki (3 kartlık) kart
            vurgulanıyordu; 6 eşit ağırlıklı adımlık bir sistem akışı olduğu için bu vurgu kaldırıldı,
            6 kart da aynı stilde. */}
        <div className="relative mx-auto mt-9 grid max-w-5xl items-stretch gap-6 lg:grid-cols-3">
          {whySteps.map((step, index) => (
            <div key={step.number} className={whyReveal(whyCardDelays[index])}>
              <div className="relative flex h-full min-h-[190px] flex-col rounded-xl border border-white/[0.075] bg-white/[0.037] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-white/[0.06] hover:shadow-[0_0_40px_-12px_rgba(59,130,246,0.45)]">
                <span
                  aria-hidden="true"
                  className="absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-blue-400/60 via-blue-400/20 to-transparent"
                />
                {/* Bağlantı çizgisi sadece AYNI satırdaki bir sonraki karta uzanır — 3+3 grid'de
                    satır sonunda (index 2, 5) bir sonraki kart farklı satırda olduğu için çizgi
                    yanlışlıkla satırlar arası atlamasın diye index % 3 !== 2 kontrolü eklendi. */}
                {index < whySteps.length - 1 && index % 3 !== 2 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-full top-[44px] hidden h-px w-6 bg-gradient-to-r from-blue-400/45 to-transparent lg:block"
                  />
                )}
                <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-blue-400/45 bg-blue-500/10 text-xs font-semibold text-blue-300 shadow-[0_0_18px_-2px_rgba(59,130,246,0.65)]">
                  {step.number}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white sm:text-xl">{step.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-blue-100/75">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ 4. SÜREÇ ============ */}
      <section id="process" className="relative px-6 pb-16 pt-20 sm:px-10">
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-0 h-px w-2/3 max-w-lg -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"
        />
        <Glow visible={mounted} targetOpacity="opacity-65" className="right-[-200px] top-[-80px] h-[560px] w-[560px]" />
        <Glow visible={mounted} targetOpacity="opacity-45" className="left-[-180px] bottom-[-120px] h-[420px] w-[420px]" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/80">Süreç</p>
            <div className="relative isolate mx-auto mt-4 max-w-2xl">
              <TitleGlow tone="section" />
              <h2 className="relative z-10 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                GloventGlobal Çalışma Metodolojisi
              </h2>
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg">
              Her marka için aynı paketleri kullanmayız. Önce işletmenin mevcut durumunu, hedeflerini ve dijital
              potansiyelini analiz eder; ardından strateji, teknoloji, yapay zeka, otomasyon ve operasyon
              adımlarını birlikte çalışan bir büyüme sistemine dönüştürürüz.
            </p>
          </div>

          <div className="relative mt-14 grid gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Mobilde (sm altı): tek sütun stack olduğunda adımları bağlayan ince dikey çizgi.
                Konteynerin gerçek yüksekliğine göre otomatik uzar (sabit piksel tahmini yok). */}
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-6 bottom-6 block w-px -translate-x-1/2 bg-gradient-to-b from-blue-400/45 via-blue-400/25 to-blue-400/45 sm:hidden"
            />

            {processSteps.map((step, index) => (
              <div key={step.number} className="group relative flex flex-col items-center text-center">
                {/* Bağlantı çizgisi sadece AYNI satırdaki bir sonraki düğüme uzanır — 4+4 grid'de
                    satır sonunda (index 3) bir sonraki adım farklı satırda olduğu için çizgi
                    yanlışlıkla satırlar arası atlamasın diye index % 4 !== 3 kontrolü eklendi. */}
                {index < processSteps.length - 1 && index % 4 !== 3 && (
                  <span className="absolute left-1/2 top-[24px] hidden h-px w-full bg-gradient-to-r from-blue-400/70 to-transparent lg:block" />
                )}
                <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-blue-400/55 bg-white/[0.045] text-sm font-semibold text-blue-300 shadow-[0_0_24px_-2px_rgba(59,130,246,0.75)] backdrop-blur-sm transition-all duration-300 group-hover:border-blue-400/85 group-hover:shadow-[0_0_32px_-2px_rgba(59,130,246,0.95)]">
                  {step.number}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-blue-100/65 transition-colors duration-300 group-hover:text-blue-100/85">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 5. GLOBAL SATIŞ ALTYAPISI ============ */}
      <section id="services" className="relative px-6 py-20 sm:px-10">
        <Glow visible={mounted} targetOpacity="opacity-50" className="right-[-180px] top-10 h-[460px] w-[460px]" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/80">Ekosistem</p>
            <div className="relative isolate mx-auto mt-4 max-w-2xl">
              <TitleGlow tone="section" />
              <h2 className="relative z-10 text-3xl font-bold tracking-tight sm:text-4xl">
                Markanız İçin Kurduğumuz Dijital Ekosistem
              </h2>
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg">
              Web altyapısı, pazaryerleri, yapay zeka, otomasyon, veri analizi ve dijital operasyon süreçlerini
              birbirinden kopuk araçlar olarak değil; markanın büyümesini destekleyen tek bir sistemin parçaları
              olarak kurgularız.
            </p>
          </div>
          {/* Ekosistem modülü kartları: küçük modül etiketi (01 WEB & COMMERCE vb.) + başlık +
              açıklama + alt kısımda küçük "chip" etiketler (Shopify, Amazon, AI İçerik vb.) —
              klasik hizmet kutusu değil, "kurulan dijital ekosistemin haritası" gibi okunsun. */}
          <div className="mt-14 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="group relative flex h-full flex-col rounded-xl border border-white/[0.08] bg-white/[0.035] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-white/[0.06] hover:shadow-[0_0_40px_-12px_rgba(59,130,246,0.45)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-blue-400/55 via-blue-400/20 to-transparent transition-colors duration-300 group-hover:from-blue-400/75"
                />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-300/80">
                  {service.tag}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-white">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-blue-100/70">{service.description}</p>
                {/* Chip / alt etiketler — tek tip mavi/premium ton, marka logosu veya çok renkli
                    rozet hissi vermesin diye sadece monokromatik mavi tonlarda. */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {service.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-blue-400/25 bg-blue-500/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.05em] text-blue-200/75"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 5.5 KİMLERLE ÇALIŞIYORUZ? ============ */}
      <section ref={audienceRef} className="relative px-6 py-20 sm:px-10">
        <Glow visible={audienceInView} targetOpacity="opacity-45" className="left-[-160px] top-10 h-[420px] w-[420px]" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className={`text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/80 ${audienceReveal('delay-[0ms]')}`}>
              Hedef Kitle
            </p>
            <div className="relative isolate mx-auto mt-4 max-w-2xl">
              <TitleGlow tone="section" />
              <h2 className={`relative z-10 text-3xl font-bold tracking-tight sm:text-4xl ${audienceReveal('delay-[60ms]')}`}>
                Kimlerle Çalışıyoruz?
              </h2>
            </div>
            <p
              className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg ${audienceReveal(
                'delay-[120ms]',
              )}`}
            >
              Her işletmenin dijital büyüme ihtiyacı aynı değildir. GloventGlobal; üretim yapan, toptan satış
              yapan, e-ticaret kanallarını büyütmek isteyen veya global pazarlara açılmayı hedefleyen işletmeler
              için uygulanabilir dijital büyüme sistemleri kurar.
            </p>
          </div>

          {/* 5 hedef kitle kartı, 8 sanal sütun (lg:grid-cols-8) + her kart 2 sütun (lg:col-span-2):
              5 kart 4'e tam bölünmediği için (3 üst + 2 alt) iki satır da BAĞIMSIZ olarak ortalanıyor:
              0. karta lg:col-start-2 verilince üst satırdaki 3 kart (6 sütun kullanır) 8 sütun
              içinde simetrik ortalanır (1 sütun sol + 1 sütun sağ boşluk); 3. karta lg:col-start-3
              verilince alt satırdaki 2 kart (4 sütun kullanır) yine simetrik ortalanır (2 sütun
              sol + 2 sütun sağ boşluk). */}
          <div className="relative mt-14 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-8">
            {audienceGroups.map((group, index) => (
              <div
                key={group.title}
                className={`${audienceReveal(audienceCardDelays[index])} lg:col-span-2 ${
                  index === 0 ? 'lg:col-start-2' : index === 3 ? 'lg:col-start-3' : ''
                }`}
              >
                <div className="group relative flex h-full min-h-[170px] flex-col rounded-xl border border-white/[0.08] bg-white/[0.035] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-white/[0.06] hover:shadow-[0_0_40px_-12px_rgba(59,130,246,0.45)]">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-400/45 bg-blue-500/10 text-xs font-semibold text-blue-300 shadow-[0_0_18px_-2px_rgba(59,130,246,0.65)]">
                    {group.number}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-white">{group.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-blue-100/70">{group.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 5.6 TEKNOLOJİ EKOSİSTEMİMİZ ============ */}
      <section ref={techRef} className="relative px-6 py-20 sm:px-10">
        <Glow visible={techInView} targetOpacity="opacity-45" className="right-[-160px] bottom-[-100px] h-[420px] w-[420px]" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className={`text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/80 ${techReveal('delay-[0ms]')}`}>
              Teknoloji
            </p>
            <div className="relative isolate mx-auto mt-4 max-w-2xl">
              <TitleGlow tone="section" />
              <h2 className={`relative z-10 text-3xl font-bold tracking-tight sm:text-4xl ${techReveal('delay-[60ms]')}`}>
                Teknoloji Ekosistemimiz
              </h2>
            </div>
            <p
              className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg ${techReveal(
                'delay-[120ms]',
              )}`}
            >
              Strateji ve operasyonu yalnızca manuel süreçlerle değil; doğru teknoloji, yapay zeka, otomasyon,
              analiz ve dijital satış altyapılarıyla destekleriz.
            </p>
          </div>

          {/* 5 teknoloji kategorisi — Kimlerle Çalışıyoruz bölümündeki aynı kanıtlanmış 3+2 merkezli
              grid tekniği (8 sanal sütun, col-span-2, 0. karta col-start-2 / 3. karta col-start-3
              ile her iki satır bağımsız ortalanıyor). Logo YOK, sadece küçük monokromatik mavi
              chip/glass tag'ler — "araç listesi" değil, "teknoloji kategorisi haritası" hissi. */}
          <div className="relative mt-14 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-8">
            {techStack.map((category, index) => (
              <div
                key={category.title}
                className={`${techReveal(techCardDelays[index])} lg:col-span-2 ${
                  index === 0 ? 'lg:col-start-2' : index === 3 ? 'lg:col-start-3' : ''
                }`}
              >
                <div className="group relative flex h-full min-h-[190px] flex-col rounded-xl border border-white/[0.08] bg-white/[0.035] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-white/[0.06] hover:shadow-[0_0_40px_-12px_rgba(59,130,246,0.45)]">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-400/45 bg-blue-500/10 text-xs font-semibold text-blue-300 shadow-[0_0_18px_-2px_rgba(59,130,246,0.65)]">
                    {category.number}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-white">{category.title}</h3>
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
        </div>
      </section>

      {/* ============ 6. FİNAL CTA ============ */}
      <section id="contact" className="relative px-6 pb-28 pt-16 sm:px-10">
        <Glow visible={mounted} targetOpacity="opacity-60" className="left-1/2 top-0 h-[500px] w-[860px] -translate-x-1/2" />
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-0 h-px w-2/3 max-w-md -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"
        />

        {/* Kapanış paneli: cam panel hissinde, ortalı, kontrollü genişlikte — "growth system start" hissi için */}
        <div className="relative mx-auto max-w-2xl rounded-2xl border border-white/[0.08] bg-white/[0.035] px-6 py-10 text-center backdrop-blur-sm sm:px-12 sm:py-12">
          <span
            aria-hidden="true"
            className="absolute left-10 right-10 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent"
          />

          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/80">Başlayalım</p>
          <div className="relative isolate mx-auto mt-4 max-w-2xl">
            <TitleGlow tone="cta" />
            <h2 className="relative z-10 text-3xl font-bold tracking-tight sm:text-4xl">
              İşletmeniz İçin Doğru Dijital Büyüme Sistemini Birlikte Kuralım
            </h2>
          </div>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-blue-100/70 sm:text-lg">
            Ürününüzü, hedef pazarınızı, mevcut satış kanallarınızı ve dijital altyapınızı analiz ederek markanız
            için doğru dijital büyüme sistemini birlikte planlayalım.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
            {['Strateji', 'Altyapı', 'Pazaryeri', 'Reklam', 'Büyüme'].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.1em] text-blue-100/70"
              >
                {chip}
              </span>
            ))}
          </div>

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