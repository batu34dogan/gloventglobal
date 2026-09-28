import Link from 'next/link';
import RDNavbar from '@/components/redesign/RDNavbar';
import RDFooter from '@/components/redesign/RDFooter';
import { focusRing, sectionShell } from '@/components/redesign/service-detail/RDServiceDetailPrimitives';

// Markalı 404 gövdesi — /rehberler/[slug] not-found'u ile aynı görsel desen (warm ivory, RDNavbar/RDFooter).
// HTTP 404 + noindex Next.js tarafından verilir; bu bileşen yalnızca sunumdur.
type Action = { href: string; label: string };

export default function RDNotFound({
  eyebrow,
  title,
  text,
  primary,
  secondary,
}: {
  eyebrow: string;
  title: string;
  text: string;
  primary: Action;
  secondary: Action;
}) {
  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-geist-sans),system-ui,sans-serif' }}>
      <RDNavbar />
      <main className="bg-[#FAF9F6]">
        <section aria-labelledby="rd-404" className="pb-20 pt-[120px] sm:pb-28 sm:pt-40 lg:pb-32">
          <div className={sectionShell}>
            <div className="max-w-[640px]">
              <span aria-hidden="true" className="block h-[2px] w-12 rounded-full bg-gradient-to-r from-[#1B5CD6] to-[#C9A876]" />
              <p className="mt-5 text-[11.5px] font-bold uppercase tracking-[0.3em] text-[#1B5CD6]">{eyebrow}</p>
              <h1 id="rd-404" className="mt-4 text-[2.1rem] font-extrabold leading-[1.08] tracking-[-0.02em] text-[#14213F] sm:text-[3rem]">
                {title}
              </h1>
              <p className="mt-5 max-w-[52ch] text-[16.5px] leading-relaxed text-[#4A4A5A] sm:text-[18px]">{text}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={primary.href}
                  className={`inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#14213F] px-7 py-3 text-[15.5px] font-semibold text-white transition-colors hover:bg-[#1B5CD6] ${focusRing}`}
                >
                  {primary.label} <span aria-hidden="true" className="ml-1.5">→</span>
                </Link>
                <Link
                  href={secondary.href}
                  className={`inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#D6D6DC] bg-white px-7 py-3 text-[15.5px] font-semibold text-[#14213F] transition-colors hover:border-[#1B5CD6] hover:text-[#1B5CD6] ${focusRing}`}
                >
                  {secondary.label}
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
