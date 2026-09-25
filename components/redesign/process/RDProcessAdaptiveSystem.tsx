import Link from 'next/link';
import { focusRing, sectionShell } from '@/components/redesign/service-detail/RDServiceDetailPrimitives';
import { getServicesByPillar } from '@/components/redesign/service-detail/serviceDetailAdapter';
import { processAdaptive } from './processData';

// "Her marka için aynı değil" — eski 12-chip bulutu yerine production /hizmetler ile aynı 4 yetkinlik
// ve aynı hizmet adları (serviceDetailAdapter üzerinden, ikinci mapping yok). Service Explorer değil:
// yalnızca yetkinlik başına kısa link listesi.
export default function RDProcessAdaptiveSystem() {
  const groups = getServicesByPillar();
  return (
    <section aria-labelledby="pr-adaptive" className="border-t border-[#E5E5EC] bg-[#FAF9F6] py-16 sm:py-24">
      <div className={`${sectionShell} grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16`}>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#1B5CD6]">{processAdaptive.eyebrow}</p>
          <h2 id="pr-adaptive" className="mt-3 max-w-[22ch] text-[1.9rem] font-extrabold leading-[1.1] tracking-tight text-[#14213F] sm:text-[2.5rem]">
            {processAdaptive.title}
          </h2>
          <p className="mt-5 max-w-[56ch] text-[15.5px] leading-relaxed text-[#4A4A5A]">{processAdaptive.description}</p>
          <Link href="/hizmetler" className={`mt-7 inline-flex rounded text-[14.5px] font-semibold text-[#1B5CD6] hover:text-[#14213F] ${focusRing}`}>
            Tüm Hizmetler →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          {groups.map((g) => (
            <div key={g.pillar} className="border-t-2 border-[#14213F] pt-4">
              <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#8A6E43]">{g.pillar}</h3>
              <ul className="mt-3 space-y-2.5">
                {g.services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/hizmetler/${s.slug}`}
                      className={`group rounded text-[14px] font-semibold leading-snug text-[#14213F] transition-colors hover:text-[#1B5CD6] ${focusRing}`}
                    >
                      {s.name}
                      <span aria-hidden="true" className="ml-1 whitespace-nowrap text-[#B8B8C2] transition-colors group-hover:text-[#1B5CD6]">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
