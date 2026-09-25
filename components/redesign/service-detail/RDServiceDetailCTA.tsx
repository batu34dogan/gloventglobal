'use client';

import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';
import { focusRing } from './RDServiceDetailPrimitives';

// 12 hizmette ortak final CTA. Başlık template'e ait; açıklama her hizmetin kendi
// serviceDetailsData.finalCta.description metni. Form yok — mevcut AnalysisWidget açılıyor.
export default function RDServiceDetailCTA({
  slug,
  description,
  analyticsPrefix = '',
}: {
  slug: string;
  description: string;
  analyticsPrefix?: string;
}) {
  return (
    <section aria-labelledby="sd-cta" className="relative overflow-hidden bg-[#0F1E3C] py-14 sm:py-20">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[560px] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgba(27,92,214,0.35), rgba(201,168,118,0.12) 55%, transparent 75%)' }}
      />
      <div className="relative mx-auto max-w-[760px] px-6 text-center sm:px-10">
        <span aria-hidden="true" className="mx-auto mb-6 block h-px w-16 bg-gradient-to-r from-[#1B5CD6] to-[#C9A876]" />
        <h2 id="sd-cta" className="text-[1.9rem] font-extrabold leading-tight tracking-tight text-white sm:text-[2.5rem]">
          Bu Sistemin Markanız İçin Doğru Olup Olmadığını Birlikte Değerlendirelim.
        </h2>
        <p className="mx-auto mt-5 max-w-[56ch] text-[15.5px] leading-relaxed text-white/65">{description}</p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              trackEvent('free_analysis_cta_click', { location: `${analyticsPrefix}service_detail_final_cta`, service: slug });
              window.dispatchEvent(new Event('open-analysis-widget'));
            }}
            className={`inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-[15.5px] font-semibold text-[#0F1E3C] transition-all hover:bg-[#C9A876] hover:text-white ${focusRing} focus-visible:outline-white`}
          >
            Ücretsiz Analiz Al →
          </button>
          <Link
            href="/iletisim"
            onClick={() => trackEvent('contact_cta_click', { location: `${analyticsPrefix}service_detail_final_cta`, service: slug })}
            className={`inline-flex items-center rounded-full border border-white/25 px-8 py-3.5 text-[15.5px] font-semibold text-white transition-all hover:bg-white hover:text-[#0F1E3C] ${focusRing} focus-visible:outline-white`}
          >
            İletişime Geç
          </Link>
        </div>
      </div>
    </section>
  );
}
