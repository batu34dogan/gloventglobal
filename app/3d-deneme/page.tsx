import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: 'GloventGlobal 3D Hero Denemesi',
  description:
    'Bu sayfa GloventGlobal için 3D hero, dünya, orbit ve marketplace kartları deneylerini test etmek amacıyla hazırlanmıştır.',
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

// Dynamic import — ssr: false ile SSR bypass, sadece client'ta yüklenir.
const HeroGlobe = dynamic(
  () => import('@/components/home/HeroGlobe'),
  { ssr: false }
);

export default function HeroDeneme3DPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070d18] px-6 pt-28 text-white">
      {/* Sayfa başlığı */}
      <div className="relative z-10 mx-auto max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/70">
          LAB / DENEME
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          3D Hero Denemesi
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-blue-100/55">
          GloventGlobal için 3D hero, dijital dünya, orbit ve marketplace kartları
          deneylerini test etmek amacıyla hazırlanmıştır. Bu sayfa canlı sitede
          indekslenmez.
        </p>
      </div>

      {/* 3D Glob sahne — tam boyutlu test alanı */}
      <div className="relative mx-auto mt-10 max-w-4xl">
        <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#060f1d]/60">
          <div className="relative h-[480px] w-full sm:h-[560px]">
            <HeroGlobe />
          </div>
        </div>

        {/* Notlar */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            { label: 'Engine', value: 'Native Canvas 2D' },
            { label: 'Bundle artışı', value: '0 KB (Three.js yok)' },
            { label: 'Mobil', value: 'CSS ile gizlenebilir' },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3"
            >
              <p className="text-[10px] font-semibold uppercase tracking-widest text-blue-300/60">
                {item.label}
              </p>
              <p className="mt-1 text-sm text-white/80">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}