import Link from 'next/link';
import RDNavbar from '@/components/redesign/RDNavbar';
import RDFooter from '@/components/redesign/RDFooter';
import { focusRing, sectionShell } from '@/components/redesign/service-detail/RDServiceDetailPrimitives';
import { guides } from '@/components/guides/guidesData';
import { deriveCategories, readingMinutes, sortGuides, toListItem } from '@/lib/guides/helpers';
import RDGuideCollection from './RDGuideCollection';
import RDGuideAnalysisButton from './RDGuideAnalysisButton';

// Rehberler overview — SERVER component. guidesData yalnızca server'da okunur; client island'a
// (RDGuideCollection) sadece minimal liste verisi gider. basePath: preview '/redesign/rehberler',
// production migration'da '/rehberler'. analyticsPrefix: preview 'redesign_', production ''.
const FEATURED = ['turkiyeden-yurtdisina-urun-satmak-icin-nereden-baslamali', 'amazon-seller-central-nedir', 'etsy-seo-rehberi'];

export default function RDGuidesOverview({ basePath = '/rehberler', analyticsPrefix = '' }: { basePath?: string; analyticsPrefix?: string }) {
  const all = sortGuides(Object.values(guides));
  const categories = deriveCategories(all);
  const [main, ...support] = FEATURED.map((s) => guides[s]).filter(Boolean);
  const meta = (slug: string) => {
    const g = guides[slug];
    return `${readingMinutes(g)} dk okuma`;
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-geist-sans),system-ui,sans-serif' }}>
      <RDNavbar />
      <main className="bg-[#FAF9F6]">
        {/* Hero — kompakt editorial */}
        <section aria-labelledby="rh-title" className="bg-white pb-10 pt-[100px] sm:pb-12 sm:pt-32 lg:pb-14">
          <div className={sectionShell}>
            <p className="text-[11.5px] font-bold uppercase tracking-[0.3em] text-[#1B5CD6]">Rehberler</p>
            <h1 id="rh-title" className="mt-3 max-w-[20ch] text-[2.1rem] font-extrabold leading-[1.06] tracking-[-0.02em] text-[#14213F] sm:mt-4 sm:text-[3rem] lg:text-[3.4rem]">
              Global Büyüme Rehberleri
            </h1>
            <div className="mt-4 flex flex-col gap-4 sm:mt-5 lg:flex-row lg:items-end lg:justify-between">
              <p className="max-w-[58ch] text-[16px] leading-relaxed text-[#4A4A5A] sm:text-[17.5px]">
                Global satış, pazaryerleri, e-ticaret sistemleri, teknoloji ve operasyon hakkında uygulanabilir rehberler.
              </p>
              <p className="flex items-center gap-3 text-[13.5px] font-semibold text-[#5A5A6A]">
                <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-[#1B5CD6] to-[#C9A876]" />
                {all.length} rehber · {categories.length} kategori
              </p>
            </div>
          </div>
        </section>

        {/* Öne çıkanlar — 1 büyük + 2 destek */}
        {main && (
          <section aria-labelledby="rh-featured" className="border-t border-[#E5E5EC] py-12 sm:py-16 lg:py-20">
            <div className={sectionShell}>
              <h2 id="rh-featured" className="text-[11.5px] font-bold uppercase tracking-[0.26em] text-[#1B5CD6]">
                Öne Çıkan Rehberler
              </h2>
              <div className="mt-6 grid gap-5 lg:grid-cols-[1.35fr_1fr] lg:gap-6">
                <Link
                  href={`${basePath}/${main.slug}`}
                  className="group relative flex flex-col overflow-hidden rounded-3xl bg-[#0F1E3C] p-7 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B5CD6] sm:p-10 lg:min-h-[400px] lg:p-12"
                >
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1B5CD6] to-[#C9A876]" />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/[0.07]"
                  />
                  <span aria-hidden="true" className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full border border-[#C9A876]/20" />
                  <p className="relative text-[12.5px] font-bold uppercase tracking-[0.16em] text-[#C9A876]">
                    <span className="normal-case tracking-[0.02em]">{main.category}</span> <span aria-hidden="true" className="px-1 text-white/30">·</span>{' '}
                    <span className="font-semibold normal-case tracking-normal text-white/70">{meta(main.slug)}</span>
                  </p>
                  <h3 className="relative mt-4 max-w-[22ch] text-[1.6rem] font-extrabold leading-[1.15] tracking-tight sm:text-[2.2rem]">{main.title}</h3>
                  <p className="relative mt-4 max-w-[54ch] text-[15.5px] leading-relaxed text-white/75 sm:text-[16.5px]">{main.excerpt}</p>
                  <span className="relative mt-auto pt-8 text-[15px] font-semibold text-white">
                    Rehberi Oku <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </Link>
                <div className="grid gap-5 lg:gap-6">
                  {support.map((g) => (
                    <Link
                      key={g.slug}
                      href={`${basePath}/${g.slug}`}
                      className={`group flex flex-col rounded-3xl border border-[#E5E5EC] bg-white p-6 transition-colors hover:border-[#1B5CD6] sm:p-8 ${focusRing}`}
                    >
                      <p className="text-[12.5px] font-bold uppercase tracking-[0.16em] text-[#1B5CD6]">
                        <span className="normal-case tracking-[0.02em]">{g.category}</span> <span aria-hidden="true" className="px-1 text-[#B8B8C2]">·</span>{' '}
                        <span className="font-semibold normal-case tracking-normal text-[#5A5A6A]">{meta(g.slug)}</span>
                      </p>
                      <h3 className="mt-3 text-[1.25rem] font-bold leading-snug text-[#14213F] group-hover:text-[#1B5CD6] sm:text-[1.35rem]">{g.title}</h3>
                      <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-[#4A4A5A]">{g.excerpt}</p>
                      <span className="mt-auto pt-4 text-[14.5px] font-semibold text-[#1B5CD6]">
                        Rehberi Oku <span aria-hidden="true">→</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <RDGuideCollection items={all.map(toListItem)} categories={categories} basePath={basePath} />

        {/* Analiz köprüsü — kompakt, mevcut AnalysisWidget */}
        <section aria-labelledby="rh-bridge" className="py-12 sm:py-16">
          <div className={sectionShell}>
            <div className="relative overflow-hidden rounded-3xl bg-[#0F1E3C] px-7 py-9 sm:px-10 sm:py-11 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:px-14">
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1B5CD6] to-[#C9A876]" />
              <div>
                <h2 id="rh-bridge" className="text-[1.45rem] font-extrabold leading-tight text-white sm:text-[1.8rem]">
                  Nereden Başlayacağınızdan Emin Değilseniz
                </h2>
                <p className="mt-3 max-w-[56ch] text-[15.5px] leading-relaxed text-white/75">
                  7 kısa soruyla mevcut yapınızı, önceliklerinizi ve büyüme alanlarınızı değerlendirin.
                </p>
              </div>
              <div className="mt-6 shrink-0 lg:mt-0">
                <RDGuideAnalysisButton location={`${analyticsPrefix}rehberler_overview`} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <RDFooter />
    </div>
  );
}
