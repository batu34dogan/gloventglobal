'use client';

import { useEffect, useState } from 'react';

const services = [
  {
    title: 'Pazar ve Ürün Analizi',
    description: 'Ürünün hangi pazarda, hangi müşteri kitlesine ve hangi fiyat yapısıyla sunulacağını analiz ederiz.',
  },
  {
    title: 'Marka Konumlandırma',
    description: 'Ürününüzü yalnızca satılacak bir ürün değil, pazarda algısı olan bir marka yapısına dönüştürürüz.',
  },
  {
    title: 'Pazaryeri Sistemleri',
    description: 'Amazon, Etsy ve eBay için listeleme, SEO, kategori, fiyatlandırma ve reklam altyapısını kurarız.',
  },
  {
    title: 'Shopify ve B2B Altyapı',
    description: 'Markanıza özel vitrin, dijital katalog, B2B teklif sistemi ve ürün yönetim yapıları oluştururuz.',
  },
  {
    title: 'Görsel ve İçerik Sistemi',
    description: 'Ürün fotoğrafı, yapay zeka destekli görsel konsept, açıklama, başlık ve marka dili bütünlüğünü kurarız.',
  },
  {
    title: 'Reklam ve Optimizasyon',
    description: 'Pazar yeri, Google ve Meta reklamlarını veri, dönüşüm ve kârlılık odağında optimize ederiz.',
  },
];

const whyHighlights = ['Önce Pazarı ve Ürünü Okuruz', 'Sonra Markayı Konumlandırırız', 'Ardından Satış Sistemini Kurarız'];

const processSteps = [
  { number: '01', title: 'Keşif', description: 'Ürünü, hedef pazarı, rakipleri, marjı ve satış potansiyelini analiz ederiz.' },
  {
    number: '02',
    title: 'Strateji',
    description: 'Hangi pazara, hangi kanalla, hangi fiyat ve hangi mesajla girileceğini planlarız.',
  },
  {
    number: '03',
    title: 'Altyapı',
    description: 'Pazaryeri, Shopify, B2B katalog veya dijital showroom yapısını kurarız.',
  },
  {
    number: '04',
    title: 'İçerik',
    description: 'Ürün görselleri, listeleme metinleri, SEO, kategori ve marka anlatımını hazırlarız.',
  },
  {
    number: '05',
    title: 'Yayın',
    description: 'Sistemi kontrollü şekilde yayına alır, ilk verileri toplamaya başlarız.',
  },
  {
    number: '06',
    title: 'Büyüme',
    description: 'Reklam, dönüşüm, fiyat ve yeni kanal optimizasyonlarıyla sistemi ölçekleriz.',
  },
];

// GloventGlobal Network bölümü için marka verisi. İlk 4'ü 2x2 grid, 5.'si (Boncukcu Amca) altta ayrı geniş kart.
const networkBrands = [
  {
    name: 'BERD',
    description: 'Amazon Australia ve eBay Australia pazaryerlerinde ürün listeleme, reklam ve operasyon deneyimi.',
  },
  {
    name: 'Ziynet Bijuteri',
    description: 'Toptan bijuteri markası için B2B dijital showroom ve Shopify tabanlı katalog sistemi.',
  },
  {
    name: 'GermaniaLeather',
    description: 'Deri ürünleri için Etsy odaklı görsel dil, ürün sunumu ve global mağaza hazırlığı.',
  },
  {
    name: 'Ritüelco',
    description: 'Etsy için ritüel, mum, tütsü ve dijital ürün odaklı marka dili ve mağaza konsepti.',
  },
  {
    name: 'Boncukcu Amca',
    description: 'Toptan ve perakende takı malzemeleri için Shopify tabanlı ürün yönetimi ve satış sistemi kurgusu.',
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

// Cam panel kart: ince üst ışık çizgisi + hover'da mavi glow. "Network panel" hissi için.
function Panel({ title, description }: { title: string; description: string }) {
  return (
    <div className="relative rounded-xl border border-white/[0.07] bg-white/[0.035] p-6 backdrop-blur-sm transition-all duration-300 hover:border-blue-400/40 hover:bg-white/[0.06] hover:shadow-[0_0_40px_-12px_rgba(59,130,246,0.45)]">
      <span
        aria-hidden="true"
        className="absolute left-5 right-5 top-0 h-px bg-gradient-to-r from-blue-400/50 via-blue-400/15 to-transparent"
      />
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-blue-100/70">{description}</p>
    </div>
  );
}

export default function HomeContent() {
  const [mounted, setMounted] = useState(false);

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

  return (
    <main
      className={`relative overflow-hidden bg-[#070d18] font-sans text-white transition-all duration-[800ms] ease-out motion-reduce:transition-none ${
        mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      {/* ============ 1. HERO ============ */}
      <section id="hero" className="relative px-6 py-32 sm:px-10 md:py-40">
        <Glow visible={mounted} targetOpacity="opacity-70" className="left-1/2 top-[-120px] h-[640px] w-[960px] -translate-x-1/2" />
        <Glow visible={mounted} targetOpacity="opacity-60" className="left-[-200px] top-[280px] h-[420px] w-[420px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className={`text-xs font-semibold uppercase tracking-[0.35em] text-blue-300/80 ${reveal('delay-[100ms]')}`}>
            GloventGlobal — Global Growth Systems
          </p>
          <h1
            className={`mx-auto mt-8 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl ${reveal(
              'delay-[200ms]',
            )}`}
          >
            Markalar İçin Global Satış Sistemleri Kuruyoruz
          </h1>
          <p
            className={`mx-auto mt-7 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg ${reveal(
              'delay-[300ms]',
            )}`}
          >
            Ürününüzü yalnızca bir pazaryerine yüklemiyoruz. Markanızı; doğru pazar, doğru görsel dil, doğru satış
            kanalı ve sürdürülebilir büyüme sistemiyle global ticarete hazırlıyoruz.
          </p>

          <div className={`mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row ${reveal('delay-[400ms]')}`}>
            <a
              href="#contact"
              className="rounded-full border border-blue-400/40 bg-blue-500/10 px-8 py-3 text-sm font-semibold tracking-wide text-white backdrop-blur-sm transition-all duration-300 hover:border-blue-400/70 hover:bg-blue-500/20 hover:shadow-[0_0_30px_-6px_rgba(59,130,246,0.55)]"
            >
              Büyüme Sistemini Planla
            </a>
            <a
              href="#why"
              className="rounded-full border border-white/15 px-8 py-3 text-sm font-semibold tracking-wide text-white/90 transition-colors duration-300 hover:border-white/35 hover:bg-white/5"
            >
              Nasıl Çalışıyoruz?
            </a>
          </div>

          <p className={`mt-14 text-xs font-medium uppercase tracking-[0.3em] text-blue-100/45 ${reveal('delay-[500ms]')}`}>
            Amazon • Etsy • eBay • Shopify • B2B Dijital Altyapılar
          </p>
        </div>
      </section>

      {/* ============ 2. SİSTEM (marka bölümü) ============ */}
      <section className="relative px-6 py-24 sm:px-10">
        <Glow visible={mounted} targetOpacity="opacity-45" className="left-1/2 top-0 h-[460px] w-[820px] -translate-x-1/2" />

        <div className="relative mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/80">Sistem</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Farklı Markalar İçin Farklı Global Sistemler
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg">
              Her marka için aynı şablonu değil; ürün, hedef pazar, satış kanalı ve büyüme hedeflerine göre
              özelleştirilmiş dijital satış sistemleri tasarlıyoruz.
            </p>
          </div>

          {/* İlk 4 marka: düzenli 2x2 grid (mobilde tek sütun stack) */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {networkBrands.slice(0, 4).map((brand) => (
              <Panel key={brand.name} title={brand.name} description={brand.description} />
            ))}
          </div>

          {/* 5. marka (Boncukcu Amca): gridin altında ayrı, geniş kart — aynı tasarım dili */}
          <div className="mt-6">
            <Panel title={networkBrands[4].name} description={networkBrands[4].description} />
          </div>
        </div>
      </section>

      {/* ============ 3. FARKIMIZ ============ */}
      <section id="why" className="relative px-6 py-24 sm:px-10">
        <Glow visible={mounted} targetOpacity="opacity-40" className="left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2" />

        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/80">Farkımız</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Parça Parça Hizmet Değil, Bütün Bir Satış Sistemi
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg">
            Birçok marka ürününü dijitale taşır ama sistem kurmadığı için sürdürülebilir satış üretemez.
            GloventGlobal; strateji, marka, altyapı, içerik, reklam ve operasyonu birbirinden kopuk parçalar olarak
            değil, tek bir büyüme sistemi olarak ele alır.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-0">
            {whyHighlights.map((item, index) => (
              <div key={item} className="flex items-center">
                {index > 0 && <span className="mx-6 hidden h-8 w-px bg-white/10 sm:block" />}
                <p className="text-sm font-medium uppercase tracking-[0.15em] text-white/80">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 4. SÜREÇ ============ */}
      <section className="relative px-6 py-28 sm:px-10">
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-0 h-px w-2/3 max-w-lg -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"
        />
        <Glow visible={mounted} targetOpacity="opacity-65" className="right-[-200px] top-[-80px] h-[560px] w-[560px]" />
        <Glow visible={mounted} targetOpacity="opacity-45" className="left-[-180px] bottom-[-120px] h-[420px] w-[420px]" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/80">Süreç</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Üründen Sisteme, Sistemden Global Satışa
            </h2>
          </div>

          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
            {processSteps.map((step, index) => (
              <div key={step.number} className="relative flex flex-col items-center text-center">
                {index < processSteps.length - 1 && (
                  <span className="absolute left-1/2 top-[22px] hidden h-[2px] w-full bg-gradient-to-r from-blue-400/60 to-transparent lg:block" />
                )}
                <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 border-blue-400/50 bg-white/[0.04] text-sm font-semibold text-blue-300 shadow-[0_0_22px_-2px_rgba(59,130,246,0.7)] backdrop-blur-sm">
                  {step.number}
                </span>
                <h3 className="mt-4 text-base font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-blue-100/60">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 5. GLOBAL SATIŞ ALTYAPISI ============ */}
      <section id="services" className="relative px-6 py-24 sm:px-10">
        <Glow visible={mounted} targetOpacity="opacity-50" className="right-[-180px] top-10 h-[460px] w-[460px]" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/80">Sistem</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Global Satış Altyapısını Birlikte Kuruyoruz
            </h2>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Panel key={service.title} title={service.title} description={service.description} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ 6. FİNAL CTA ============ */}
      <section id="contact" className="relative px-6 py-32 sm:px-10">
        <Glow visible={mounted} targetOpacity="opacity-60" className="left-1/2 top-0 h-[500px] w-[860px] -translate-x-1/2" />
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-0 h-px w-2/3 max-w-md -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"
        />

        <div className="relative mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/80">Başlayalım</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Markanızı Global Satışa Hazırlayalım
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-blue-100/70 sm:text-lg">
            Ürününüz, hedef pazarınız ve mevcut dijital yapınız üzerinden size özel bir global büyüme sistemi
            planlayalım.
          </p>
          <button
            type="button"
            className="mt-10 rounded-full border border-blue-400/40 bg-blue-500/10 px-12 py-3.5 text-sm font-semibold tracking-wide text-white backdrop-blur-sm transition-all duration-300 hover:border-blue-400/70 hover:bg-blue-500/20 hover:shadow-[0_0_30px_-6px_rgba(59,130,246,0.55)]"
          >
            GloventGlobal ile Görüş
          </button>
        </div>
      </section>
    </main>
  );
}