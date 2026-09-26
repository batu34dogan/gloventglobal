import type { Metadata } from 'next';
import Link from 'next/link';
import RDNavbar from '@/components/redesign/RDNavbar';
import RDFooter from '@/components/redesign/RDFooter';
import { focusRing, sectionShell } from '@/components/redesign/service-detail/RDServiceDetailPrimitives';

// Geçersiz /rehberler/[slug] → notFound(). /rehberler/* altında eski SiteNavbar/SiteFooter gizli
// olduğu için bu segment kendi RDNavbar/RDFooter'lı 404'ünü render eder. HTTP 404 + noindex
// Next.js tarafından verilir; geçerli rehber sayfaları bu dosyadan etkilenmez.
// Root layout'un homepage title/canonical/OG değerleri 404'e miras kalmasın.
export const metadata: Metadata = {
  title: 'Rehber Bulunamadı | GloventGlobal',
  alternates: { canonical: null },
  openGraph: null,
  twitter: null,
  robots: { index: false, follow: false },
};

export default function GuideNotFound() {
  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-geist-sans),system-ui,sans-serif' }}>
      <RDNavbar />
      <main className="bg-[#FAF9F6]">
        <section aria-labelledby="rh-404" className="pb-20 pt-[120px] sm:pb-28 sm:pt-40 lg:pb-32">
          <div className={sectionShell}>
            <div className="max-w-[640px]">
              <span aria-hidden="true" className="block h-[2px] w-12 rounded-full bg-gradient-to-r from-[#1B5CD6] to-[#C9A876]" />
              <p className="mt-5 text-[11.5px] font-bold uppercase tracking-[0.3em] text-[#1B5CD6]">Rehberler</p>
              <h1 id="rh-404" className="mt-4 text-[2.1rem] font-extrabold leading-[1.08] tracking-[-0.02em] text-[#14213F] sm:text-[3rem]">
                Bu Rehberi Bulamadık.
              </h1>
              <p className="mt-5 max-w-[52ch] text-[16.5px] leading-relaxed text-[#4A4A5A] sm:text-[18px]">
                Aradığınız rehber kaldırılmış, taşınmış veya adresi değişmiş olabilir.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/rehberler"
                  className={`inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#14213F] px-7 py-3 text-[15.5px] font-semibold text-white transition-colors hover:bg-[#1B5CD6] ${focusRing}`}
                >
                  Tüm Rehberlere Dön <span aria-hidden="true" className="ml-1.5">→</span>
                </Link>
                <Link
                  href="/"
                  className={`inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#D6D6DC] bg-white px-7 py-3 text-[15.5px] font-semibold text-[#14213F] transition-colors hover:border-[#1B5CD6] hover:text-[#1B5CD6] ${focusRing}`}
                >
                  Ana Sayfaya Git
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <RDFooter />
    </div>
  );
}
