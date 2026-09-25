'use client';

import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';
import { focusRing } from '@/components/redesign/service-detail/RDServiceDetailPrimitives';
import { aboutCta } from './aboutData';

// Final CTA — form yok; mevcut AnalysisWidget açılıyor. analyticsPrefix: preview'de 'redesign_'.
export default function RDAboutCTA({ analyticsPrefix = '' }: { analyticsPrefix?: string }) {
  return (
    <section aria-labelledby="ab-cta" className="relative overflow-hidden bg-[#0F1E3C] py-16 sm:py-20">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[560px] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgba(27,92,214,0.35), rgba(201,168,118,0.12) 55%, transparent 75%)' }}
      />
      <div className="relative mx-auto max-w-[760px] px-6 text-center sm:px-10">
        <span aria-hidden="true" className="mx-auto mb-6 block h-px w-16 bg-gradient-to-r from-[#1B5CD6] to-[#C9A876]" />
        <h2 id="ab-cta" className="text-[1.95rem] font-extrabold leading-tight tracking-tight text-white sm:text-[2.6rem]">
          {aboutCta.title}
        </h2>
        <p className="mx-auto mt-5 max-w-[56ch] text-[15.5px] leading-relaxed text-white/65">{aboutCta.description}</p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              trackEvent('free_analysis_cta_click', { location: `${analyticsPrefix}hakkimizda_final_cta` });
              window.dispatchEvent(new Event('open-analysis-widget'));
            }}
            className={`inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-[15.5px] font-semibold text-[#0F1E3C] transition-all hover:bg-[#C9A876] hover:text-white ${focusRing} focus-visible:outline-white`}
          >
            Ücretsiz Analiz Al →
          </button>
          <Link
            href="/iletisim"
            onClick={() => trackEvent('contact_cta_click', { location: `${analyticsPrefix}hakkimizda_final_cta` })}
            className={`inline-flex items-center rounded-full border border-white/25 px-8 py-3.5 text-[15.5px] font-semibold text-white transition-all hover:bg-white hover:text-[#0F1E3C] ${focusRing} focus-visible:outline-white`}
          >
            İletişime Geç
          </Link>
        </div>
        <Link
          href="/nasil-calisiyoruz"
          className={`mt-7 inline-flex rounded text-[14px] font-semibold text-[#C9A876] transition-colors hover:text-white ${focusRing} focus-visible:outline-white`}
        >
          Nasıl Çalışıyoruz →
        </Link>
      </div>
    </section>
  );
}
