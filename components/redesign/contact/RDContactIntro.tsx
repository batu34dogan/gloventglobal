'use client';

import { trackEvent } from '@/lib/analytics';
import { focusRing, sectionShell } from '@/components/redesign/service-detail/RDServiceDetailPrimitives';
import { CONTACT_FORM_ID, contactHero, contactIntents } from './contactData';

// Compact Hero + iki niyet. 01 mevcut AnalysisWidget'ı açar (quiz), 02 aynı sayfadaki forma kayar.
// analyticsPrefix: preview'de 'redesign_' (redesign_iletisim_analysis), production'da ''.
export default function RDContactIntro({ analyticsPrefix = '' }: { analyticsPrefix?: string }) {
  const { analysis, direct } = contactIntents;
  return (
    <section className="bg-white pb-12 pt-28 sm:pb-16 sm:pt-32 lg:pb-14">
      <div className={sectionShell}>
        <p className="text-[11.5px] font-bold uppercase tracking-[0.3em] text-[#1B5CD6]">{contactHero.eyebrow}</p>
        <h1 className="mt-5 max-w-[20ch] text-[2.15rem] font-extrabold leading-[1.08] tracking-[-0.02em] text-[#14213F] sm:text-[3rem] lg:text-[3.35rem]">
          {contactHero.title}
        </h1>
        <p className="mt-5 max-w-[60ch] text-[16px] leading-relaxed text-[#4A4A5A] sm:text-[17.5px]">{contactHero.description}</p>

        <ul className="mt-10 grid gap-4 md:grid-cols-2 md:gap-5" aria-label="İletişim seçenekleri">
          <li className="relative flex flex-col rounded-2xl border border-[#E5E5EC] bg-[#FAF9F6] p-6 sm:p-8">
            <span aria-hidden="true" className="absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-[#1B5CD6] via-[#C9A876] to-transparent sm:left-8 sm:right-8" />
            <span className="text-[13px] font-bold text-[#1B5CD6]">{analysis.n}</span>
            <h2 className="mt-2 text-[1.35rem] font-extrabold text-[#14213F] sm:text-[1.55rem]">{analysis.title}</h2>
            <p className="mt-2.5 max-w-[52ch] text-[15px] leading-relaxed text-[#4A4A5A]">{analysis.desc}</p>
            <div className="mt-auto pt-6">
              <button
                type="button"
                onClick={() => {
                  trackEvent('free_analysis_cta_click', { location: `${analyticsPrefix}iletisim_analysis` });
                  window.dispatchEvent(new Event('open-analysis-widget'));
                }}
                className={`inline-flex w-full items-center justify-center rounded-full bg-[#14213F] px-7 py-3.5 text-[15.5px] font-semibold text-white transition-all hover:bg-[#1B5CD6] sm:w-auto lg:border lg:border-transparent ${focusRing}`}
              >
                {analysis.cta}
              </button>
            </div>
          </li>
          <li className="relative flex flex-col rounded-2xl border border-[#E5E5EC] bg-white p-6 sm:p-8">
            <span aria-hidden="true" className="absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-[#1B5CD6] via-[#C9A876] to-transparent sm:left-8 sm:right-8" />
            <span className="text-[13px] font-bold text-[#1B5CD6]">{direct.n}</span>
            <h2 className="mt-2 text-[1.35rem] font-extrabold text-[#14213F] sm:text-[1.55rem]">{direct.title}</h2>
            <p className="mt-2.5 max-w-[52ch] text-[15px] leading-relaxed text-[#4A4A5A]">{direct.desc}</p>
            <div className="mt-auto pt-6">
              <a
                href={`#${CONTACT_FORM_ID}`}
                className={`inline-flex w-full items-center justify-center rounded-full border border-[#D6D6DC] px-7 py-3.5 text-[15.5px] font-semibold text-[#14213F] transition-all hover:border-[#1B5CD6] hover:text-[#1B5CD6] sm:w-auto ${focusRing}`}
              >
                {direct.cta}
              </a>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
