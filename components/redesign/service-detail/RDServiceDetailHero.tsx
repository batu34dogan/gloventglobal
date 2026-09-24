'use client';

import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';
import RDServiceSystemVisual from './RDServiceSystemVisual';
import { focusRing, sectionShell } from './RDServiceDetailPrimitives';
import type { Pillar } from './serviceDetailAdapter';

export default function RDServiceDetailHero({
  slug,
  name,
  pillar,
  eyebrow,
  title,
  description,
  scopeKeywords,
  steps,
}: {
  slug: string;
  name: string;
  pillar: Pillar;
  eyebrow: string;
  title: string;
  description: string;
  scopeKeywords: string[];
  steps: { number: string; title: string }[];
}) {
  return (
    <section className="bg-white pb-14 pt-28 sm:pb-20 sm:pt-32">
      <div className={`${sectionShell} grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 xl:grid-cols-[1.07fr_0.93fr] xl:gap-10`}>
        <div>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12.5px] font-medium text-[#6A6A7A]">
              <li>
                <Link href="/hizmetler" className={`rounded transition-colors hover:text-[#1B5CD6] ${focusRing}`}>
                  Hizmetler
                </Link>
              </li>
              <li aria-hidden="true" className="text-[#B8B8C2]">/</li>
              <li>{pillar}</li>
              <li aria-hidden="true" className="text-[#B8B8C2]">/</li>
              <li aria-current="page" className="text-[#14213F]">{name}</li>
            </ol>
          </nav>

          <p className="mt-7 text-[11.5px] font-bold uppercase tracking-[0.26em] text-[#1B5CD6]">{eyebrow}</p>
          <h1 className="mt-4 max-w-[22ch] text-[2rem] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#14213F] sm:text-[2.9rem] lg:text-[3.25rem]">
            {title}
          </h1>
          <p className="mt-6 max-w-[58ch] text-[16px] leading-relaxed text-[#4A4A5A] sm:text-[17px]">{description}</p>

          <div className="mt-9 grid gap-3 sm:flex sm:flex-wrap sm:items-center [&>*]:justify-center">
            <button
              type="button"
              onClick={() => {
                trackEvent('free_analysis_cta_click', { location: 'redesign_service_detail_hero', service: slug });
                window.dispatchEvent(new Event('open-analysis-widget'));
              }}
              className={`inline-flex items-center gap-2 rounded-full bg-[#14213F] px-7 py-3.5 text-[15.5px] font-semibold text-white transition-all hover:bg-[#1B5CD6] ${focusRing}`}
            >
              Ücretsiz Analiz Al →
            </button>
            <Link
              href="/iletisim"
              onClick={() => trackEvent('contact_cta_click', { location: 'redesign_service_detail_hero', service: slug })}
              className={`inline-flex items-center rounded-full border border-[#D6D6DC] px-7 py-3.5 text-[15.5px] font-semibold text-[#14213F] transition-all hover:border-[#1B5CD6] hover:text-[#1B5CD6] ${focusRing}`}
            >
              İletişime Geç
            </Link>
          </div>

          {scopeKeywords.length > 0 && (
            <div className="mt-10 border-t border-[#EDEDF1] pt-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#8A6E43]">Kapsam</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {scopeKeywords.map((k) => (
                  <li key={k} className="rounded-full border border-[#E0E0E8] bg-white px-3 py-1.5 text-[12px] font-medium text-[#4A4A5A]">
                    {k}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mx-auto w-full max-w-[440px] lg:max-w-[520px] xl:max-w-[560px]">
          <RDServiceSystemVisual name={name} pillar={pillar} steps={steps} />
        </div>
      </div>
    </section>
  );
}
