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

const focusAreas = [
  'Global Pazar Stratejisi',
  'Pazaryeri Sistemleri',
  'Shopify & B2B Altyapı',
  'Marka Konumlandırma',
  'Görsel & İçerik Sistemi',
  'Sosyal Medya Yönetimi',
  'Reklam & Optimizasyon',
  'Otomasyon & n8n Sistemleri',
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
];

export default function AboutContent() {
  const [mounted, setMounted] = useState(false);
  const [whoRef, whoInView] = useInView<HTMLElement>();

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
          <h1
            className={`mx-auto mt-8 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl ${reveal(
              'delay-[200ms]',
            )}`}
          >
            Markaları Global Satışa Hazırlayan Sistem Ortağı
          </h1>
          <p
            className={`mx-auto mt-7 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg ${reveal(
              'delay-[300ms]',
            )}`}
          >
            GloventGlobal; Amazon, Etsy, eBay, Shopify, B2B dijital altyapılar, sosyal medya, reklam ve otomasyon
            süreçlerini birbirine bağlayarak markalar için sürdürülebilir global satış sistemleri kurar.
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
              Ajans Değil, Global Satış Sistemi Kuruyoruz
            </h2>
            <p className={`mt-5 text-sm leading-relaxed text-blue-100/70 sm:text-base ${whoReveal('delay-[200ms]')}`}>
              GloventGlobal; markaların yalnızca reklam vermesini, sosyal medya yönetmesini veya pazaryerinde
              mağaza açmasını değil, tüm bu parçaların birlikte çalıştığı sürdürülebilir bir global satış sistemi
              kurmasını hedefler. Strateji, altyapı, içerik, reklam, operasyon ve otomasyon süreçlerini birbirinden
              kopuk hizmetler olarak değil; markanın büyümesini destekleyen tek bir yapı olarak ele alır.
            </p>
            <p className={`mt-4 text-sm leading-relaxed text-blue-100/70 sm:text-base ${whoReveal('delay-[280ms]')}`}>
              Bu yüzden her markaya hazır paketlerle yaklaşmayız. Ürünü, hedef pazarı, satış kanalını, fiyat
              yapısını, görsel dili, operasyon kapasitesini ve dijital altyapıyı birlikte analiz eder; markaya özel
              uygulanabilir bir yol haritası tasarlarız.
            </p>
            <p
              className={`mt-5 border-l-2 border-blue-400/40 pl-4 text-sm font-medium leading-relaxed text-blue-100/85 sm:text-base ${whoReveal(
                'delay-[360ms]',
              )}`}
            >
              Ürün var ama sistem yoksa, sürdürülebilir satış da zorlaşır. GloventGlobal bu sistemi kurmak için
              çalışır.
            </p>
          </div>

          <div className="lg:pt-1">
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
    </main>
  );
}