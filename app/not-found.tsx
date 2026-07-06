import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sayfa Bulunamadı | GloventGlobal',
  description:
    'Aradığınız sayfa bulunamadı. GloventGlobal hizmetleri ve rehberleri üzerinden devam edin.',
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#070d18] px-6 py-24 text-white">
      {/* Arka plan glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-[520px] w-[520px] rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* 404 Numara */}
        <p className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-[96px] font-black leading-none tracking-tight text-transparent sm:text-[128px]">
          404
        </p>

        {/* Başlık */}
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Aradığınız sayfa bulunamadı
        </h1>

        {/* Açıklama */}
        <p className="mt-4 max-w-md text-sm leading-relaxed text-blue-100/60">
          Bu sayfa taşınmış, kaldırılmış veya hatalı bir bağlantı üzerinden açılmış olabilir.
          GloventGlobal sistemlerini inceleyerek devam edebilirsiniz.
        </p>

        {/* CTA Butonları */}
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/"
            className="w-full rounded-full bg-blue-600 px-7 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-500 hover:shadow-[0_0_28px_-4px_rgba(59,130,246,0.7)] sm:w-auto"
          >
            Ana Sayfaya Dön
          </Link>
          <Link
            href="/hizmetler"
            className="w-full rounded-full border border-white/15 px-7 py-3 text-sm font-semibold text-white/85 transition-all duration-200 hover:border-white/30 hover:text-white sm:w-auto"
          >
            Hizmetleri İncele
          </Link>
          <Link
            href="/rehberler"
            className="w-full rounded-full border border-white/15 px-7 py-3 text-sm font-semibold text-white/85 transition-all duration-200 hover:border-white/30 hover:text-white sm:w-auto"
          >
            Rehberleri İncele
          </Link>
        </div>
      </div>
    </main>
  );
}