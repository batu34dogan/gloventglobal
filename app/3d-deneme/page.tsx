import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'GloventGlobal Video Hero Denemesi',
  description: 'Video arka plan hero testi — bu sayfa canlı sitede indekslenmez.',
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

export default function VideoDeneme3DPage() {
  return (
    <>
      {/* ── Hero — video arka plan ── */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-[#060d1a]">

        {/* Video arka plan — desktop */}
        <video
          aria-hidden="true"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/videos/hero-global-earth-poster.jpg"
          className="absolute inset-0 hidden h-full w-full object-cover md:block"
        >
          {/* WebM önce — daha iyi sıkıştırma */}
          <source src="/videos/hero-global-earth.webm" type="video/webm" />
          <source src="/videos/hero-global-earth.mp4"  type="video/mp4"  />
        </video>

        {/* Overlay — video üstüne koyu gradient katmanı
            Sol/metin tarafı daha güçlü karartılır, sağda video hissedilir */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              'linear-gradient(to right, rgba(6,13,26,0.96) 0%, rgba(6,13,26,0.82) 38%, rgba(6,13,26,0.45) 62%, rgba(6,13,26,0.18) 100%)',
          }}
        />
        {/* Üst/alt fade */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-28 hidden md:block"
          style={{ background: 'linear-gradient(to top, rgba(6,13,26,1) 0%, transparent 100%)' }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-20 hidden md:block"
          style={{ background: 'linear-gradient(to bottom, rgba(6,13,26,0.6) 0%, transparent 100%)' }}
        />

        {/* Mobil fallback arka plan — video yerine gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-0 md:hidden"
          style={{
            background:
              'radial-gradient(ellipse 120% 80% at 60% 40%, rgba(30,80,180,0.35) 0%, rgba(6,13,26,0) 70%), #060d1a',
          }}
        />

        {/* İçerik */}
        <div className="relative z-10 mx-auto max-w-6xl w-full px-6 py-32 sm:px-10 md:py-40">
          <div className="max-w-xl">
            {/* Üst etiket */}
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-blue-300/80">
              GloventGlobal — Digital Growth Systems
            </p>

            {/* Başlık */}
            <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-[3.4rem]">
              GloventGlobal{' '}
              <span className="text-blue-300">Digital</span>
              <br />
              Growth System
            </h1>

            {/* Alt metin */}
            <p className="mt-6 text-base leading-relaxed text-blue-100/70 sm:text-lg">
              Markalar, satış kanalları, operasyon, yapay zeka ve veri analizini
              birlikte çalışan tek bir dijital büyüme sisteminde birleştiriyoruz.
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/analiz"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-500 hover:shadow-[0_0_32px_-4px_rgba(59,130,246,0.75)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                Ücretsiz Analiz Al
              </Link>
              <Link
                href="/hizmetler"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white/85 transition-all duration-200 hover:border-white/40 hover:text-white"
              >
                Hizmetleri İncele
              </Link>
            </div>
          </div>
        </div>

        {/* Lab etiketi — sağ üst köşe */}
        <div className="absolute right-5 top-5 z-20 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-yellow-300/80">
          DENEME
        </div>
      </section>

      {/* Performans notu */}
      <section className="bg-[#060d1a] px-6 py-12 sm:px-10">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-blue-300/60">
            Video Performans Notları
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              {
                title: 'Önerilen Format',
                text: 'WebM (birincil) + MP4 (fallback). WebM ~%30 daha küçük dosya boyutu.',
              },
              {
                title: 'Önerilen Çözünürlük',
                text: '1920×1080px (1080p). 4K hero için gereksiz — arka plan bulanık görünür zaten.',
              },
              {
                title: 'Önerilen Süre',
                text: '10–15 saniye. Loop için başlangıç ve bitiş kareleri benzer olmalı.',
              },
              {
                title: 'Mobil Yaklaşımı',
                text: 'Video mobilde kapalı, CSS gradient fallback aktif. Sayfa hızı korunur.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-5 py-4"
              >
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-blue-100/55">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}