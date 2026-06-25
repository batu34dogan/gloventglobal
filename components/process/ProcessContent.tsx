'use client';

import { useEffect, useRef, useState } from 'react';
import { trackEvent } from '@/lib/analytics';

// Bir elementin viewport'a girip girmediğini takip eder (native IntersectionObserver, yeni paket yok).
// Diğer sayfalardaki aynı desenin bu dosyaya özel, bağımsız bir kopyası.
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

// Diğer sayfalardaki aynı görsel dil — ama bu dosyaya özel, bağımsız kopya.
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

// Büyük başlıkların arkasına oturan, diğer sayfalardaki Hero glow'uyla aynı kanıtlanmış teknik —
// bağımsız kopya (sayfa izolasyonu prensibi korunuyor).
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

// 6 adımlı çalışma sistemi — 3x2 grid (lg:grid-cols-3 + 6 kart otomatik 2 satıra bölünüyor,
// ek bir merkezleme hilesi gerekmiyor). /farkimiz sayfasındaki aynı kanıtlanmış teknik.
const systemSteps = [
  {
    number: '01',
    title: 'İşletmeyi Analiz Ederiz',
    description: 'Markanın mevcut ürün yapısını, satış kanallarını, dijital varlığını, operasyon gücünü, hedef kitlesini ve büyüme potansiyelini inceleriz.',
  },
  {
    number: '02',
    title: 'Büyüme Stratejisini Oluştururuz',
    description: 'Hedef pazarı, satış kanalını, marka konumunu, ürün önceliğini, fiyat algısını ve büyüme yolunu netleştiririz.',
  },
  {
    number: '03',
    title: 'Doğru Sistemleri Seçeriz',
    description: 'Markanın hedeflerine göre hangi kanal, altyapı ve büyüme bileşenlerinin öncelikli olması gerektiğini belirler; Amazon, Etsy, Shopify, B2B, yapay zeka, otomasyon ve reklam gibi parçaları tek bir sistem mantığıyla kurgularız.',
  },
  {
    number: '04',
    title: 'Kurulumu Yaparız',
    description: 'Seçilen sistemleri marka yapısına göre kurar; sayfa, içerik, ürün, kanal, otomasyon, reklam veya operasyon altyapılarını çalışır hale getiririz.',
  },
  {
    number: '05',
    title: 'Verilerle Yönetiriz',
    description: 'Satış, trafik, dönüşüm, reklam, müşteri, teklif, operasyon ve içerik performansını takip ederek kararları veriye dayalı hale getiririz.',
  },
  {
    number: '06',
    title: 'Büyütürüz',
    description: 'Sistem çalışmaya başladıktan sonra optimizasyon, yeni kanal denemeleri, içerik geliştirme, reklam ölçekleme ve operasyon iyileştirme adımlarıyla büyümeyi sürdürürüz.',
  },
];

const systemStepDelays = [
  'delay-[300ms]',
  'delay-[360ms]',
  'delay-[420ms]',
  'delay-[480ms]',
  'delay-[540ms]',
  'delay-[600ms]',
];

// "Tek Seferlik İş Değil, Geliştirilebilir Sistem" bölümü için 3 çalışma modeli kartı — diğer
// hizmet sayfalarındaki workModel kartlarının aynı görsel dili, 3 sütun (sm:grid-cols-3).
const continuityCards = [
  {
    number: '01',
    title: 'Sistem Kurulumu',
    description: 'Markanızın ihtiyacına göre dijital büyüme sistemini kurar, gerekli altyapıyı hazırlar ve ekibinizin kullanabileceği hale getiririz.',
  },
  {
    number: '02',
    title: 'Yönetim ve Operasyon',
    description: 'İçerik, reklam, ürün, teklif, müşteri, raporlama ve operasyon süreçlerini düzenli olarak yönetilebilir hale getiririz.',
  },
  {
    number: '03',
    title: 'Büyüme Partnerliği',
    description: 'Sistemin performansını takip eder, yeni fırsatları analiz eder ve büyümeyi sürdürülebilir hale getirecek adımları birlikte geliştiririz.',
  },
];

// Sistem bileşenleri — bilerek "hizmet listesi" değil, markaya göre değişen bileşen kümesi gibi
// kurgulandı. Her chip kendi hizmet detay sayfasına bağlı (iç linkleme), ama görsel olarak klasik
// mavi link gibi değil, mevcut chip/pill diliyle aynı kalıyor — sadece hover'da belirginleşiyor.
const systemComponents = [
  { label: 'Amazon', href: '/hizmetler/amazon' },
  { label: 'Etsy', href: '/hizmetler/etsy' },
  { label: 'eBay', href: '/hizmetler/ebay' },
  { label: 'Shopify', href: '/hizmetler/shopify' },
  { label: 'B2B Satış Sistemi', href: '/hizmetler/b2b-dijital-showroom' },
  { label: 'Yapay Zeka', href: '/hizmetler/yapay-zeka-entegrasyonu' },
  { label: 'Otomasyon', href: '/hizmetler/otomasyon-n8n' },
  { label: 'Performans Pazarlama', href: '/hizmetler/reklam-optimizasyon' },
  { label: 'Sosyal Medya', href: '/hizmetler/sosyal-medya-yonetimi' },
  { label: 'Marka Konumlandırma', href: '/hizmetler/marka-konumlandirma' },
  { label: 'Görsel ve İçerik Sistemi', href: '/hizmetler/gorsel-icerik-sistemi' },
  { label: 'Global Büyüme Stratejisi', href: '/hizmetler/global-pazara-giris-stratejisi' },
];

export default function ProcessContent() {
  const [mounted, setMounted] = useState(false);
  const [systemRef, systemInView] = useInView<HTMLElement>();
  const [continuityRef, continuityInView] = useInView<HTMLElement>();
  const [componentsRef, componentsInView] = useInView<HTMLElement>();
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

  // 6 Adımlı Sistem bölümü Hero'nun altında, ekran dışında başlıyor — kendi viewport girişine bağlı, ayrı reveal.
  const systemReveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      systemInView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
    }`;

  // "Tek Seferlik İş Değil" bölümü kendi viewport girişine bağlı, ayrı reveal.
  const continuityReveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      continuityInView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
    }`;

  // Sistem Bileşenleri bölümü kendi viewport girişine bağlı, ayrı reveal.
  const componentsReveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      componentsInView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
    }`;

  // Final CTA sayfanın en sonunda — kendi viewport girişine bağlı, ayrı reveal.
  const ctaReveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      ctaInView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
    }`;

  return (
    <main className="relative overflow-hidden bg-[#070d18] font-sans text-white">
      {/* ============ 1. HERO ============
          Üst padding (pt-24/md:pt-28), diğer sayfaların Hero'larıyla birebir aynı — sabit
          navbar'ın yüksekliğini rahatça karşılıyor, çakışma olmuyor. */}
      <section className="relative px-6 pb-14 pt-24 sm:px-10 md:pb-16 md:pt-28">
        <Glow visible={mounted} targetOpacity="opacity-70" className="left-1/2 top-[-120px] h-[560px] w-[860px] -translate-x-1/2" />
        <Glow visible={mounted} targetOpacity="opacity-50" className="right-[-200px] top-[180px] h-[380px] w-[380px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className={`text-xs font-semibold uppercase tracking-[0.35em] text-blue-300/80 ${reveal('delay-[100ms]')}`}>
            NASIL ÇALIŞIYORUZ
          </p>
          <div className="relative isolate mx-auto mt-8 max-w-3xl">
            <TitleGlow tone="hero" />
            <h1
              className={`relative z-10 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl ${reveal(
                'delay-[200ms]',
              )}`}
            >
              Markanız İçin Ölçülebilir Bir Büyüme Sistemi Kuruyoruz
            </h1>
          </div>
          <p
            className={`mx-auto mt-7 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg ${reveal(
              'delay-[300ms]',
            )}`}
          >
            Analiz, strateji, teknoloji, operasyon ve optimizasyon süreçlerini tek seferlik projeler olarak değil,
            birlikte çalışan bir büyüme sistemi olarak kuruyor ve geliştiriyoruz.
          </p>
        </div>
      </section>

      {/* ============ 2. ÇALIŞMA SİSTEMİ (6 ADIM) ============ */}
      <section ref={systemRef} className="relative px-6 pb-20 pt-14 sm:px-10">
        <Glow visible={systemInView} targetOpacity="opacity-40" className="left-1/2 top-0 h-[420px] w-[800px] -translate-x-1/2" />

        <div className="relative mx-auto max-w-3xl text-center">
          <p
            className={`text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/80 ${systemReveal(
              'delay-[0ms]',
            )}`}
          >
            ÇALIŞMA SİSTEMİ
          </p>
          <div className="relative isolate mx-auto mt-4 max-w-2xl">
            <TitleGlow tone="section" />
            <h2 className={`relative z-10 text-3xl font-bold tracking-tight sm:text-4xl ${systemReveal('delay-[100ms]')}`}>
              Büyümeyi Parçalara Ayırmadan, Sistem Olarak Kurarız
            </h2>
          </div>
          <p
            className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg ${systemReveal(
              'delay-[200ms]',
            )}`}
          >
            Her markanın ihtiyacı farklıdır. Bu yüzden önce mevcut yapıyı analiz eder, sonra doğru strateji, kanal,
            teknoloji ve operasyon modelini birlikte tasarlarız.
          </p>
        </div>

        {/* 6 adım, 3+3 grid (lg:grid-cols-3 + 6 kart otomatik olarak 2 satıra bölünüyor, ek bir
            merkezleme hilesi gerekmiyor) — /farkimiz sayfasındaki aynı kanıtlanmış teknik, bağlantı
            çizgisi index % 3 !== 2 kontrolüyle satır sonunda yanlışlıkla satırlar arası atlamıyor. */}
        <div className="relative mx-auto mt-10 grid max-w-5xl items-stretch gap-6 lg:grid-cols-3">
          {systemSteps.map((step, index) => (
            <div key={step.number} className={systemReveal(systemStepDelays[index])}>
              <div className="relative flex h-full min-h-[190px] flex-col rounded-xl border border-white/[0.075] bg-white/[0.037] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-white/[0.06] hover:shadow-[0_0_40px_-12px_rgba(59,130,246,0.45)]">
                <span
                  aria-hidden="true"
                  className="absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-blue-400/60 via-blue-400/20 to-transparent"
                />
                {index < systemSteps.length - 1 && index % 3 !== 2 && (
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

      {/* ============ 3. TEK SEFERLİK İŞ DEĞİL, SÜREÇ ============ */}
      <section ref={continuityRef} className="relative px-6 pb-20 pt-14 sm:px-10">
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="relative isolate mx-auto mt-4 max-w-2xl">
            <TitleGlow tone="section" />
            <h2
              className={`relative z-10 text-3xl font-bold tracking-tight sm:text-4xl ${continuityReveal(
                'delay-[0ms]',
              )}`}
            >
              Tek Seferlik Kurulum Değil, Geliştirilebilir Sistem
            </h2>
          </div>
          <p
            className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg ${continuityReveal(
              'delay-[100ms]',
            )}`}
          >
            GloventGlobal&apos;da süreç yalnızca bir sayfa, mağaza veya kampanya kurmakla bitmez. Kurulan yapının
            ölçülebilir, yönetilebilir ve geliştirilebilir olması hedeflenir.
          </p>
        </div>

        <div className="relative mx-auto mt-10 grid max-w-4xl items-stretch gap-6 sm:grid-cols-3">
          {continuityCards.map((card, index) => (
            <div key={card.number} className={continuityReveal(['delay-[200ms]', 'delay-[280ms]', 'delay-[360ms]'][index])}>
              <div className="relative flex h-full min-h-[180px] flex-col rounded-xl border border-white/[0.08] bg-white/[0.035] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-white/[0.06] hover:shadow-[0_0_40px_-12px_rgba(59,130,246,0.45)]">
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

      {/* ============ 4. SİSTEM BİLEŞENLERİ ============
          Bilerek "hizmet listesi" gibi değil, markaya göre değişen bileşen kümesi gibi — tek bir
          küçük panel içinde chip/pill bulutu, büyük section gibi ağırlaşmıyor. */}
      <section ref={componentsRef} className="relative px-6 pb-20 pt-2 sm:px-10">
        <div className="relative mx-auto max-w-3xl text-center">
          <p
            className={`text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/80 ${componentsReveal(
              'delay-[0ms]',
            )}`}
          >
            SİSTEM BİLEŞENLERİ
          </p>
          <div className="relative isolate mx-auto mt-4 max-w-2xl">
            <TitleGlow tone="section" />
            <h2
              className={`relative z-10 text-3xl font-bold tracking-tight sm:text-4xl ${componentsReveal(
                'delay-[100ms]',
              )}`}
            >
              Doğru Büyüme Sistemi Her Marka İçin Aynı Değildir
            </h2>
          </div>
          <p
            className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg ${componentsReveal(
              'delay-[200ms]',
            )}`}
          >
            Bazı markalar için öncelik Amazon veya Etsy olabilir. Bazı markalar için Shopify, B2B showroom, yapay
            zeka, otomasyon veya reklam sistemi daha kritik olabilir. GloventGlobal, markanın ihtiyacına göre doğru
            bileşenleri bir araya getirir.
          </p>
        </div>

        <div
          className={`relative mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2.5 ${componentsReveal(
            'delay-[300ms]',
          )}`}
        >
          {systemComponents.map((component) => (
            <a
              key={component.label}
              href={component.href}
              className="rounded-full border border-blue-400/25 bg-blue-500/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.04em] text-blue-200/80 transition-all duration-300 hover:border-blue-400/55 hover:bg-blue-500/15 hover:text-blue-100"
            >
              {component.label}
            </a>
          ))}
        </div>
      </section>

      {/* ============ 5. FİNAL CTA ============ */}
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
              Markanız İçin Hangi Sistemin Öncelikli Olduğunu Birlikte Belirleyelim
            </h2>
          </div>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-blue-100/70 sm:text-lg">
            Amazon, Etsy, Shopify, B2B, yapay zeka, otomasyon veya reklam tarafında nereden başlamanız
            gerektiğini bilmiyorsanız, mevcut yapınızı analiz ederek en doğru büyüme önceliğini birlikte
            netleştirebiliriz.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                trackEvent('free_analysis_cta_click', { location: 'nasil_calisiyoruz_cta' });
                window.dispatchEvent(new Event('open-analysis-widget'));
              }}
              className="inline-block rounded-full border border-blue-400/45 bg-blue-500/10 px-12 py-3.5 text-sm font-semibold tracking-wide text-white backdrop-blur-sm transition-all duration-300 hover:border-blue-400/75 hover:bg-blue-500/20 hover:shadow-[0_0_36px_-6px_rgba(59,130,246,0.6)]"
            >
              Ücretsiz Analiz Al
            </button>
            <a
              href="/iletisim"
              className="inline-block rounded-full border border-white/15 px-12 py-3.5 text-sm font-semibold tracking-wide text-white/85 backdrop-blur-sm transition-all duration-300 hover:border-white/35 hover:text-white"
            >
              İletişime Geç
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}