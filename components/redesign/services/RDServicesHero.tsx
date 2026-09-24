'use client';

import { useEffect, useState } from 'react';
import { trackEvent } from '@/lib/analytics';
import RDGrowthSystemDiagram from './RDGrowthSystemDiagram';

export default function RDServicesHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const reveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      mounted ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
    }`;

  return (
    <section className="bg-white px-6 pb-16 pt-28 sm:px-10 sm:pb-20 sm:pt-32">
      <div className="mx-auto grid max-w-[1400px] items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="text-center lg:text-left">
          <p className={`text-[12px] font-bold tracking-[0.3em] text-[#1B5CD6] uppercase ${reveal('delay-[80ms]')}`}>
            Hizmetler
          </p>
          <h1
            className={`mx-auto mt-6 max-w-[15ch] text-[2.625rem] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#14213F] sm:mx-0 sm:max-w-none sm:text-[3.2rem] lg:text-[3.5rem] ${reveal(
              'delay-[160ms]',
            )}`}
          >
            Global Büyüme İçin Birlikte Çalışan Sistemler.
          </h1>
          <p
            className={`mx-auto mt-6 max-w-[56ch] text-[16px] leading-relaxed text-[#4A4A5A] sm:text-[17.5px] lg:mx-0 ${reveal(
              'delay-[240ms]',
            )}`}
          >
            Stratejiden satış kanallarına, teknolojiden operasyona kadar ihtiyacınız olan yapıyı tek tek hizmetler
            olarak değil, birlikte çalışan bir büyüme sistemi olarak kuruyoruz.
          </p>
          <div className={`mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start ${reveal('delay-[320ms]')}`}>
            <button
              type="button"
              onClick={() => {
                trackEvent('free_analysis_cta_click', { location: 'redesign_services_hero' });
                window.dispatchEvent(new Event('open-analysis-widget'));
              }}
              className="inline-flex items-center gap-2 rounded-full bg-[#14213F] px-7 py-3.5 text-[15.5px] font-semibold text-white transition-all hover:bg-[#1B5CD6]"
            >
              Ücretsiz Analiz Al →
            </button>
            <a
              href="#hizmetler"
              className="inline-flex items-center rounded-full border border-[#D6D6DC] bg-transparent px-7 py-3.5 text-[15.5px] font-semibold text-[#14213F] transition-all hover:border-[#1B5CD6] hover:text-[#1B5CD6]"
            >
              Hizmetleri Keşfet
            </a>
          </div>
        </div>

        {/* 0-1023px: diyagram, Hero'nun ayrı yapıştırılmış bir eki değil devamı gibi görünsün diye
            altına çok hafif ivory/grid bir surface eklendi. 1024px+ (lg) tamamen dokunulmadı —
            surface/padding yok, diyagram doğrudan sağ kolonda. */}
        <div className={`${reveal('delay-[280ms]')} relative rounded-2xl bg-[#FAF9F6] p-3 sm:p-6 lg:rounded-none lg:bg-transparent lg:p-0`}>
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-2xl lg:hidden"
            style={{
              backgroundImage:
                'linear-gradient(rgba(20,33,63,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(20,33,63,0.04) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 75%)',
              maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 75%)',
            }}
          />
          <div className="relative">
            <RDGrowthSystemDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}
