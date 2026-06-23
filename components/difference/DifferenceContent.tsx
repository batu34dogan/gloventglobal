'use client';

import { useEffect, useRef, useState } from 'react';

// Bir elementin viewport'a girip girmediğini takip eder (native IntersectionObserver, yeni paket yok).
// HomeContent.tsx / AboutContent.tsx / ServicesContent.tsx / ContactContent.tsx'teki aynı desenin bu
// dosyaya özel, bağımsız bir kopyası.
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

// Diğer sayfalardaki aynı görsel dil — ama bu dosyaya özel, bağımsız kopya. O dosyalara
// dokunmamak / import etmemek için bilerek burada yeniden tanımlandı.
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
// bağımsız kopya (sayfa izolasyonu prensibi korunuyor). Başlığın KENDİ (relative isolate) kutusuna
// sıkıca bağlı; eyebrow/açıklama gibi çevresindeki içeriği değil, SADECE başlığı kapsıyor. Sitedeki
// 3 sabit seviye: "hero" en geniş/belirgin, "section" orta, "cta" en hafif.
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

// 6 fark kartı — "Ana Fark Bölümü" içinde, 3+3 grid (ana sayfadaki Farkımız bölümünün aynı
// kanıtlanmış tekniği: 6 kart 3'e tam bölündüğü için ek bir merkezleme hilesi gerekmiyor).
const differenceCards = [
  {
    number: '01',
    title: 'Önce İşletmeyi Anlarız',
    description: 'Hazır paketlerle başlamayız. Markanın ürünlerini, hedef kitlesini, mevcut dijital yapısını, operasyon kapasitesini ve büyüme potansiyelini analiz ederiz.',
  },
  {
    number: '02',
    title: 'Stratejiyi Hizmetten Önce Kurarız',
    description: 'Önce hangi kanalın, hangi ürünün, hangi hedef pazarın ve hangi mesajın doğru olduğunu belirleriz. Hizmetleri bu stratejiye göre konumlandırırız.',
  },
  {
    number: '03',
    title: 'Teknolojiyi Amaç Değil, Araç Olarak Kullanırız',
    description: 'Shopify, headless commerce, pazaryeri sistemleri, yapay zeka ve otomasyon yapıları bizim için tek başına hedef değil; büyümeyi destekleyen araçlardır.',
  },
  {
    number: '04',
    title: 'Yapay Zekayı Sürece Entegre Ederiz',
    description: 'Yapay zekayı yalnızca içerik üretimi için değil; analiz, görsel konsept, raporlama, operasyon, karar destek ve süreç hızlandırma alanlarında kullanırız.',
  },
  {
    number: '05',
    title: 'Kurup Bırakmayız',
    description: 'İhtiyaca göre sistemi teslim eder, birlikte yönetir veya uzun vadeli büyüme partnerliğiyle geliştiririz. Kurulan yapının sürdürülebilir olmasını önemseriz.',
  },
  {
    number: '06',
    title: 'Büyümeyi Ölçer ve Geliştiririz',
    description: 'Trafik, dönüşüm, reklam, satış, kullanıcı davranışı ve operasyon verilerini takip ederek sistemi düzenli olarak iyileştiririz.',
  },
];

const differenceCardDelays = [
  'delay-[300ms]',
  'delay-[360ms]',
  'delay-[420ms]',
  'delay-[480ms]',
  'delay-[540ms]',
  'delay-[600ms]',
];

// Karşılaştırma bölümü için iki kolon — sol "eski/dağınık" yaklaşımı nötr/soluk bir bullet ile,
// sağ "GloventGlobal" yaklaşımını mavi check ile ayrıştırıyor. Kırmızı/yeşil gibi anlamsal renkler
// bilerek kullanılmadı (sitenin tek tip mavi/beyaz diliyle uyumlu kalsın diye).
const classicApproach = [
  'Hizmet odaklı ilerler.',
  'Web sitesi, reklam veya pazaryeri ayrı ayrı ele alınır.',
  'Proje teslimi sonrası süreç çoğu zaman müşteriye bırakılır.',
  'Teknoloji araç olarak değil, çoğu zaman ürün olarak sunulur.',
  'Performans ve operasyon birbirinden kopuk ilerler.',
];

const gloventApproach = [
  'Sistem odaklı ilerler.',
  'Strateji, teknoloji, yapay zeka, otomasyon ve operasyon birlikte kurgulanır.',
  'Kurulum, yönetim veya büyüme partnerliği modeliyle ilerlenebilir.',
  'Teknoloji markanın gerçek ihtiyacına göre seçilir ve entegre edilir.',
  'Performans, veri ve operasyon aynı büyüme sisteminin parçası olarak takip edilir.',
];

export default function DifferenceContent() {
  const [mounted, setMounted] = useState(false);
  const [coreRef, coreInView] = useInView<HTMLElement>();
  const [compareRef, compareInView] = useInView<HTMLElement>();
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

  // Ana Fark bölümü Hero'nun altında, ekran dışında başlıyor — kendi viewport girişine bağlı, ayrı reveal.
  const coreReveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      coreInView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
    }`;

  // Karşılaştırma bölümü Ana Fark'ın altında, ekran dışında başlıyor — kendi viewport girişine bağlı, ayrı reveal.
  const compareReveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      compareInView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
    }`;

  // Final CTA sayfanın en sonunda — kendi viewport girişine bağlı, ayrı reveal.
  const ctaReveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      ctaInView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
    }`;

  return (
    <main className="relative overflow-hidden bg-[#070d18] font-sans text-white">
      {/* ============ 1. FARKIMIZ HERO ============
          Üst padding (pt-24/md:pt-28), diğer sayfaların Hero'larıyla birebir aynı — sabit
          navbar'ın (z-40) yüksekliğini rahatça karşılıyor, çakışma olmuyor. Intro yok, sayfa
          direkt başlıyor. */}
      <section className="relative px-6 pb-14 pt-24 sm:px-10 md:pb-16 md:pt-28">
        <Glow visible={mounted} targetOpacity="opacity-70" className="left-1/2 top-[-120px] h-[560px] w-[860px] -translate-x-1/2" />
        <Glow visible={mounted} targetOpacity="opacity-50" className="left-[-200px] top-[200px] h-[380px] w-[380px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className={`text-xs font-semibold uppercase tracking-[0.35em] text-blue-300/80 ${reveal('delay-[100ms]')}`}>
            FARKIMIZ
          </p>
          <div className="relative isolate mx-auto mt-8 max-w-3xl">
            <TitleGlow tone="hero" />
            <h1
              className={`relative z-10 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl ${reveal(
                'delay-[200ms]',
              )}`}
            >
              Klasik Hizmet Mantığıyla Değil, Birlikte Çalışan Dijital Büyüme Sistemiyle İlerliyoruz
            </h1>
          </div>
          <p
            className={`mx-auto mt-7 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg ${reveal(
              'delay-[300ms]',
            )}`}
          >
            GloventGlobal; strateji, teknoloji, yapay zeka, otomasyon, e-ticaret altyapısı ve operasyon
            süreçlerini birbirinden kopuk hizmetler olarak değil, markanın büyümesini destekleyen tek bir
            sistemin parçaları olarak ele alır.
          </p>
        </div>
      </section>

      {/* ============ 2. ANA FARK BÖLÜMÜ + 6 FARK KARTI ============ */}
      <section ref={coreRef} className="relative px-6 pb-20 pt-14 sm:px-10">
        <Glow visible={coreInView} targetOpacity="opacity-45" className="left-1/2 top-0 h-[420px] w-[800px] -translate-x-1/2" />

        <div className="relative mx-auto max-w-3xl text-center">
          <p
            className={`text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/80 ${coreReveal(
              'delay-[0ms]',
            )}`}
          >
            NEDEN FARKLIYIZ?
          </p>
          <div className="relative isolate mx-auto mt-4 max-w-xl">
            <TitleGlow tone="section" />
            <h2 className={`relative z-10 text-3xl font-bold tracking-tight sm:text-4xl ${coreReveal('delay-[100ms]')}`}>
              Parça Parça Hizmet Değil, Sistem Yaklaşımı
            </h2>
          </div>
          <p
            className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg ${coreReveal(
              'delay-[200ms]',
            )}`}
          >
            Birçok işletme dijitalde büyümeye çalışırken web sitesi, reklam, pazaryeri, içerik ve operasyon
            süreçlerini ayrı ayrı yönetir. Bu yapı kısa vadede iş üretebilir ama uzun vadede dağınık ve
            ölçülmesi zor bir sisteme dönüşür.
          </p>
          <p
            className={`mx-auto mt-4 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg ${coreReveal(
              'delay-[260ms]',
            )}`}
          >
            GloventGlobal bu parçaları tek bir dijital büyüme sistemi olarak ele alır. Amaç yalnızca bir
            hizmet teslim etmek değil; markanın yönetebileceği, ölçebileceği ve geliştirebileceği
            sürdürülebilir bir yapı kurmaktır.
          </p>
        </div>

        {/* 6 fark kartı, 3+3 grid (lg:grid-cols-3 + 6 kart otomatik olarak 2 satıra bölünüyor,
            ek bir merkezleme hilesi gerekmiyor) — ana sayfadaki Farkımız bölümünün aynı
            kanıtlanmış tekniği, 6 kart da eşit ağırlıkta. */}
        <div className="relative mx-auto mt-10 grid max-w-5xl items-stretch gap-6 lg:grid-cols-3">
          {differenceCards.map((card, index) => (
            <div key={card.number} className={coreReveal(differenceCardDelays[index])}>
              <div className="relative flex h-full min-h-[190px] flex-col rounded-xl border border-white/[0.075] bg-white/[0.037] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-white/[0.06] hover:shadow-[0_0_40px_-12px_rgba(59,130,246,0.45)]">
                <span
                  aria-hidden="true"
                  className="absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-blue-400/60 via-blue-400/20 to-transparent"
                />
                {/* Bağlantı çizgisi sadece AYNI satırdaki bir sonraki karta uzanır — 3+3 grid'de
                    satır sonunda (index 2, 5) bir sonraki kart farklı satırda olduğu için çizgi
                    yanlışlıkla satırlar arası atlamasın diye index % 3 !== 2 kontrolü eklendi. */}
                {index < differenceCards.length - 1 && index % 3 !== 2 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-full top-[44px] hidden h-px w-6 bg-gradient-to-r from-blue-400/45 to-transparent lg:block"
                  />
                )}
                <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-blue-400/45 bg-blue-500/10 text-xs font-semibold text-blue-300 shadow-[0_0_18px_-2px_rgba(59,130,246,0.65)]">
                  {card.number}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white sm:text-xl">{card.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-blue-100/75">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ 3. KARŞILAŞTIRMA ============
          Sade iki kolonlu panel — sol "klasik" yaklaşım nötr/soluk bullet, sağ "GloventGlobal"
          yaklaşımı mavi check ile. Kırmızı/yeşil gibi anlamsal renkler bilerek kullanılmadı. */}
      <section ref={compareRef} className="relative px-6 pb-20 pt-14 sm:px-10">
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="relative isolate mx-auto mt-4 max-w-2xl">
            <TitleGlow tone="section" />
            <h2
              className={`relative z-10 text-3xl font-bold tracking-tight sm:text-4xl ${compareReveal(
                'delay-[0ms]',
              )}`}
            >
              Klasik Ajans Yaklaşımı ile GloventGlobal Yaklaşımı Arasındaki Fark
            </h2>
          </div>
        </div>

        <div className="relative mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2">
          <div className={`rounded-xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-7 ${compareReveal('delay-[100ms]')}`}>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-100/55">Klasik Yaklaşım</h3>
            <ul className="mt-5 space-y-3.5">
              {classicApproach.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-blue-100/65 sm:text-base">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white/25" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`rounded-xl border border-blue-400/25 bg-blue-500/[0.04] p-6 sm:p-7 ${compareReveal(
              'delay-[180ms]',
            )}`}
          >
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-300/85">GloventGlobal Yaklaşımı</h3>
            <ul className="mt-5 space-y-3.5">
              {gloventApproach.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-blue-100/85 sm:text-base">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-300"
                  >
                    <path
                      d="M4 10.5L8 14.5L16 6"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============ 4. FİNAL CTA ============ */}
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
              Markanız İçin Fark Yaratan Dijital Büyüme Sistemini Birlikte Kuralım
            </h2>
          </div>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-blue-100/70 sm:text-lg">
            İşletmenizin mevcut yapısını analiz ederek, hedeflerinize uygun strateji, teknoloji ve operasyon
            modelini birlikte belirleyelim.
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