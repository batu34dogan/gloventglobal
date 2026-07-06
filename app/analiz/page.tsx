import type { Metadata } from 'next';
import Link from 'next/link';
import AnalysisContent from '@/components/analysis/AnalysisContent';

export const metadata: Metadata = {
  title: 'Ücretsiz Dijital Büyüme Analizi | GloventGlobal',
  description:
    'Amazon, Etsy, Shopify ve eBay için markanızın global satış potansiyelini ve öncelikli büyüme adımlarını ücretsiz analiz edin.',
};

const benefitCards = [
  {
    icon: '🛒',
    title: 'Pazaryeri Uygunluğu',
    text: 'Amazon, Etsy, Shopify veya eBay için markanıza en uygun başlangıç yönünü belirleyin.',
  },
  {
    icon: '⚙️',
    title: 'Operasyon Eksikleri',
    text: 'Ürün, listeleme, reklam, lojistik ve otomasyon tarafındaki öncelikli açıkları görün.',
  },
  {
    icon: '🗺️',
    title: 'Öncelikli Yol Haritası',
    text: 'İlk etapta hangi adımların satış ve görünürlük için daha kritik olduğunu anlayın.',
  },
];

export default function AnalizPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070d18] px-6 pb-24 pt-28 text-white sm:px-10 md:pt-32">
      {/* Arka plan glow */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-100px] h-[420px] w-[700px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgba(96,165,250,0.5), transparent 75%)' }}
      />

      <div className="relative mx-auto max-w-3xl">
        {/* Hero */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/80">
            DİJİTAL BÜYÜME ANALİZİ
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Global Satış Potansiyelinizi Ücretsiz Analiz Edelim
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-blue-100/70">
            Amazon, Etsy, Shopify ve eBay için markanızın hangi pazarda, hangi stratejiyle ve hangi
            operasyon modeliyle büyüyebileceğini{' '}
            <span className="text-blue-300/90 font-medium">7 kısa adımda</span> ön analiz ediyoruz.
          </p>
        </div>

        {/* 3 Fayda Kartı */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {benefitCards.map((card) => (
            <div
              key={card.title}
              className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-5 backdrop-blur-sm"
            >
              <span className="text-2xl" aria-hidden="true">{card.icon}</span>
              <h2 className="mt-3 text-sm font-semibold text-white">{card.title}</h2>
              <p className="mt-1.5 text-xs leading-relaxed text-blue-100/60">{card.text}</p>
            </div>
          ))}
        </div>

        {/* Form kartı — hiçbir değişiklik yapılmadı */}
        <div className="mt-8 rounded-2xl border border-white/[0.08] bg-[#0a1120] p-6 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.55)] sm:p-8">
          <AnalysisContent />
        </div>

        {/* KVKK / Gizlilik notu */}
        <p className="mt-6 text-center text-xs leading-relaxed text-blue-100/40">
          Bilgileriniz yalnızca ön analiz talebinizi değerlendirmek ve sizinle iletişime geçmek için
          kullanılır. Detaylar için{' '}
          <Link href="/kvkk" className="underline hover:text-blue-200 transition-colors">
            KVKK
          </Link>{' '}
          ve{' '}
          <Link href="/gizlilik-politikasi" className="underline hover:text-blue-200 transition-colors">
            Gizlilik Politikası
          </Link>{' '}
          sayfalarımızı inceleyebilirsiniz.
        </p>
      </div>
    </main>
  );
}