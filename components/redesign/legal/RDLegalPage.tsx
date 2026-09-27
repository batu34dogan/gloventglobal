import type { ReactNode } from 'react';
import Link from 'next/link';
import RDNavbar from '@/components/redesign/RDNavbar';
import RDFooter from '@/components/redesign/RDFooter';
import { focusRing } from '@/components/redesign/service-detail/RDServiceDetailPrimitives';

// 4 legal sayfanın (KVKK, Gizlilik, Çerez, Kullanım Şartları) TEK ortak şablonu — SERVER component.
// Hukuki metin her route'un page.tsx'inde JSX olarak durur (adapter: sections dizisi); şablon yalnızca
// sunumu (hero, breadcrumb, okunabilir makale sütunu, koşullu içindekiler) sağlar. Satış CTA'sı yok.

export type LegalSection = { id: string; heading: string; content: ReactNode };

// İçindekiler yalnızca gerçekten uzun metinlerde (bu kadar veya daha fazla H2) gösterilir.
const TOC_MIN_SECTIONS = 8;

const h2Cls = 'scroll-mt-28 text-[1.35rem] font-extrabold leading-snug tracking-tight text-[#14213F] sm:text-[1.55rem]';

// Paylaşılan metin stilleri — sayfalar p / ul / ol / a için bunları kullanır.
export const legalText = {
  // Uzun e-posta/URL'ler dar ekranlarda taşmasın diye overflow-wrap:anywhere.
  body: 'space-y-5 text-[17px] leading-[1.75] text-[#2F2F3B] [overflow-wrap:anywhere]',
  link: `rounded font-semibold text-[#1B5CD6] underline decoration-[#1B5CD6]/40 underline-offset-[3px] hover:text-[#14213F] hover:decoration-[#14213F] ${focusRing}`,
};

export function LegalLink({ href, children }: { href: string; children: ReactNode }) {
  if (href.startsWith('/')) {
    return (
      <Link href={href} className={legalText.link}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={legalText.link}>
      {children}
    </a>
  );
}

export default function RDLegalPage({
  title,
  eyebrow = 'Yasal',
  intro,
  sections = [],
  children,
}: {
  title: string;
  eyebrow?: string;
  intro?: ReactNode;
  sections?: LegalSection[];
  /** Başlıksız (H2'siz) metin — sections'tan önce render edilir. */
  children?: ReactNode;
}) {
  const hasToc = sections.length >= TOC_MIN_SECTIONS;
  const tocList = (
    <ol className="space-y-0.5">
      {sections.map((s) => (
        <li key={s.id}>
          <a
            href={`#${s.id}`}
            className={`block rounded-md py-1.5 text-[14.5px] leading-snug text-[#4A4A5A] transition-colors hover:text-[#1B5CD6] ${focusRing}`}
          >
            {s.heading}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-geist-sans),system-ui,sans-serif' }}>
      <RDNavbar />
      <main className="bg-[#FAF9F6]">
        {/* ============ HERO (kompakt) ============ */}
        <header className="border-b border-[#E5E5EC] pb-9 pt-[96px] sm:pb-11 sm:pt-28 lg:pt-32">
          <div className="mx-auto max-w-[1120px] px-6 sm:px-10">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] text-[#5A5A6A]">
                <li>
                  <Link href="/" className={`rounded hover:text-[#1B5CD6] ${focusRing}`}>
                    Ana Sayfa
                  </Link>
                </li>
                <li aria-hidden="true" className="text-[#9A9AA6]">
                  /
                </li>
                <li aria-current="page" className="font-medium text-[#14213F]">
                  {title}
                </li>
              </ol>
            </nav>
            <p className="mt-8 text-[12.5px] font-bold uppercase tracking-[0.2em] text-[#1B5CD6] sm:mt-10">{eyebrow}</p>
            <h1 className="mt-3 max-w-[24ch] text-[2rem] font-extrabold leading-[1.12] tracking-[-0.02em] text-[#14213F] sm:text-[2.5rem] lg:text-[2.85rem]">
              {title}
            </h1>
            <span aria-hidden="true" className="mt-6 block h-px w-12 bg-[#C9A876]" />
            {intro && (
              <div className="mt-6 max-w-[760px] text-[17px] leading-[1.75] text-[#4A4A5A] [overflow-wrap:anywhere] sm:text-[18px]">
                {intro}
              </div>
            )}
          </div>
        </header>

        <div
          className={`mx-auto max-w-[1120px] px-6 pb-20 pt-10 sm:px-10 sm:pt-12 lg:pt-14 ${
            hasToc ? 'grid gap-10 lg:grid-cols-[minmax(0,760px)_240px] lg:justify-between lg:gap-12' : ''
          }`}
        >
          <div className="min-w-0 max-w-[760px]">
            {/* Mobil/tablet içindekiler — native details, kapalı başlar; sticky değil */}
            {hasToc && (
              <details className="group mb-10 rounded-2xl border border-[#E5E5EC] bg-white lg:hidden">
                <summary
                  className={`flex min-h-[52px] cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-5 text-[16px] font-semibold text-[#14213F] [&::-webkit-details-marker]:hidden ${focusRing}`}
                >
                  Bu Sayfada
                  <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4 transition-transform group-open:rotate-180">
                    <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <nav aria-label="Bu sayfada" className="border-t border-[#E5E5EC] px-5 py-3">
                  {tocList}
                </nav>
              </details>
            )}

            {/* ============ HUKUKİ METİN ============ */}
            <article aria-label={title} data-legal-body="1">
              {children && <div className={legalText.body}>{children}</div>}
              {sections.map((s) => (
                <section key={s.id} aria-labelledby={s.id} className="mt-12 first:mt-0 sm:mt-14">
                  <h2 id={s.id} className={h2Cls}>
                    {s.heading}
                  </h2>
                  <div className={`mt-4 ${legalText.body}`}>{s.content}</div>
                </section>
              ))}
            </article>
          </div>

          {/* Desktop sticky içindekiler — yalnızca uzun metinlerde */}
          {hasToc && (
            <aside className="hidden lg:block">
              <nav aria-label="Bu sayfada" className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto border-l border-[#E5E5EC] pl-5">
                <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#14213F]">Bu Sayfada</p>
                <div className="mt-3">{tocList}</div>
              </nav>
            </aside>
          )}
        </div>
      </main>
      <RDFooter />
    </div>
  );
}
