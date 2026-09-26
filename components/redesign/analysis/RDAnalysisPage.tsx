import Link from 'next/link';
import RDNavbar from '@/components/redesign/RDNavbar';
import RDFooter from '@/components/redesign/RDFooter';
import { focusRing, sectionShell } from '@/components/redesign/service-detail/RDServiceDetailPrimitives';
import AnalysisFlow from '@/components/analysis/AnalysisFlow';
import { analysisBenefits, analysisHero } from './analysisPageData';

// "Ücretsiz Global Büyüme Analizi" ortak sayfa ağacı — şu an preview /redesign/analiz; production
// migration'da /analiz de aynı component'i render edecek. Metadata/JSON-LD route'lara aittir.
// Quiz-first: kısa hero → quiz kartı; destek bilgisi desktop'ta yanda, mobilde quiz'in altında.

const ICONS = [
  // Pazaryeri
  <path key="a" d="M4 9h16l-1.2 9.2a2 2 0 0 1-2 1.8H7.2a2 2 0 0 1-2-1.8L4 9Zm4 0V7a4 4 0 0 1 8 0v2" />,
  // Operasyon
  <path key="b" d="M4 7h10M4 12h16M4 17h7m6-10h3m-6 10h6" />,
  // Yol haritası
  <path key="c" d="M5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm14-10a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM7 17h6a3 3 0 0 0 0-6h-2a3 3 0 0 1 0-6h6" />,
];

export default function RDAnalysisPage({ analyticsPrefix = '' }: { analyticsPrefix?: string }) {
  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-geist-sans),system-ui,sans-serif' }}>
      <RDNavbar />
      <main className="bg-[#FAF9F6]">
        <section aria-labelledby="an-title" className="pb-16 pt-[92px] sm:pb-20 sm:pt-28 lg:pb-24 lg:pt-32">
          <div className={sectionShell}>
            <p className="text-[11.5px] font-bold uppercase tracking-[0.28em] text-[#1B5CD6]">{analysisHero.eyebrow}</p>
            <h1
              id="an-title"
              className="mt-3 max-w-[22ch] text-[1.85rem] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#14213F] sm:mt-4 sm:text-[2.6rem] lg:text-[3rem]"
            >
              {analysisHero.title}
            </h1>
            <p className="mt-3 max-w-[56ch] text-[15.5px] leading-relaxed text-[#4A4A5A] sm:mt-4 sm:text-[17px]">{analysisHero.description}</p>

            <div className="mt-6 grid items-start gap-6 sm:mt-8 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-14">
              <div className="rounded-3xl border border-[#E5E5EC] bg-white p-5 shadow-[0_1px_2px_rgba(20,33,63,0.04),0_12px_40px_-24px_rgba(20,33,63,0.18)] sm:p-8 lg:p-10">
                <AnalysisFlow variant="page" leadSource="analysis-page" analyticsPrefix={analyticsPrefix} />
              </div>

              <aside aria-labelledby="an-aside" className="lg:sticky lg:top-28">
                <div className="rounded-3xl border border-[#E5E5EC] bg-white p-6 sm:p-7">
                  <span aria-hidden="true" className="block h-[2px] w-10 rounded-full bg-gradient-to-r from-[#1B5CD6] to-[#C9A876]" />
                  <h2 id="an-aside" className="mt-4 text-[1.15rem] font-extrabold text-[#14213F]">
                    Analizde Neleri Değerlendiriyoruz?
                  </h2>
                  <ul className="mt-5 space-y-5">
                    {analysisBenefits.map((b, i) => (
                      <li key={b.title} className="flex gap-3.5">
                        <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EEF3FD] text-[#1B5CD6]">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
                            {ICONS[i]}
                          </svg>
                        </span>
                        <div>
                          <h3 className="text-[15px] font-bold text-[#14213F]">{b.title}</h3>
                          <p className="mt-1 text-[14px] leading-relaxed text-[#5A5A6A]">{b.text}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="mt-4 px-1 text-[13px] leading-relaxed text-[#5A5A6A]">
                  Bilgileriniz yalnızca ön analiz talebinizi değerlendirmek ve sizinle iletişime geçmek için kullanılır. Detaylar için{' '}
                  <Link href="/kvkk" className={`rounded font-semibold text-[#1B5CD6] underline underline-offset-2 hover:text-[#14213F] ${focusRing}`}>
                    KVKK
                  </Link>{' '}
                  ve{' '}
                  <Link href="/gizlilik-politikasi" className={`rounded font-semibold text-[#1B5CD6] underline underline-offset-2 hover:text-[#14213F] ${focusRing}`}>
                    Gizlilik Politikası
                  </Link>{' '}
                  sayfalarımızı inceleyebilirsiniz.
                </p>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <RDFooter />
    </div>
  );
}
