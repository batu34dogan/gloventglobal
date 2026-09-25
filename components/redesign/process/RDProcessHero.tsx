'use client';

import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';
import { focusRing, sectionShell } from '@/components/redesign/service-detail/RDServiceDetailPrimitives';
import RDProcessFlowVisual from './RDProcessFlowVisual';
import { processHero } from './processData';

// analyticsPrefix: production'da '' (nasil_calisiyoruz_*), preview'de 'redesign_'.
export default function RDProcessHero({ analyticsPrefix = '' }: { analyticsPrefix?: string }) {
  return (
    <section className="bg-white pb-14 pt-28 sm:pb-20 sm:pt-32">
      <div className={`${sectionShell} grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14`}>
        <div>
          <p className="text-[11.5px] font-bold uppercase tracking-[0.3em] text-[#1B5CD6]">{processHero.eyebrow}</p>
          <h1 className="mt-5 max-w-[18ch] text-[2.2rem] font-extrabold leading-[1.08] tracking-[-0.02em] text-[#14213F] sm:text-[3rem] lg:text-[3.4rem]">
            {processHero.title}
          </h1>
          <p className="mt-6 max-w-[56ch] text-[16px] leading-relaxed text-[#4A4A5A] sm:text-[17.5px]">{processHero.description}</p>
          <div className="mt-9 grid gap-3 sm:flex sm:flex-wrap sm:items-center [&>*]:justify-center">
            <button
              type="button"
              onClick={() => {
                trackEvent('free_analysis_cta_click', { location: `${analyticsPrefix}nasil_calisiyoruz_hero` });
                window.dispatchEvent(new Event('open-analysis-widget'));
              }}
              className={`inline-flex items-center gap-2 rounded-full bg-[#14213F] px-7 py-3.5 text-[15.5px] font-semibold text-white transition-all hover:bg-[#1B5CD6] ${focusRing}`}
            >
              Ücretsiz Analiz Al →
            </button>
            <Link
              href="/iletisim"
              onClick={() => trackEvent('contact_cta_click', { location: `${analyticsPrefix}nasil_calisiyoruz_hero` })}
              className={`inline-flex items-center rounded-full border border-[#D6D6DC] px-7 py-3.5 text-[15.5px] font-semibold text-[#14213F] transition-all hover:border-[#1B5CD6] hover:text-[#1B5CD6] ${focusRing}`}
            >
              İletişime Geç
            </Link>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[460px] lg:max-w-[560px]">
          <RDProcessFlowVisual />
        </div>
      </div>
    </section>
  );
}
