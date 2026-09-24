import { RDRail, RDSectionHeader, railItemClass, sectionShell } from './RDServiceDetailPrimitives';
import type { ServiceData } from './serviceDetailAdapter';

// "Kimler İçin?" — serviceDetailsData.audience (12 hizmetin hepsinde gerçek 4 kart). Kompakt:
// desktop'ta tek satır, mobilde native swipe rail — uzun bir kart yığını oluşmasın.
export default function RDServiceAudience({ audience, bg }: { audience: ServiceData['audience']; bg: string }) {
  const card = (c: ServiceData['audience']['cards'][number]) => (
    <>
      <span className="text-[12px] font-bold text-[#1B5CD6]">{c.number}</span>
      <h3 className="mt-3 text-[16.5px] font-bold leading-snug text-[#14213F]">{c.title}</h3>
      <p className="mt-2.5 text-[13.5px] leading-relaxed text-[#5A5A6A]">{c.description}</p>
    </>
  );

  return (
    <section aria-labelledby="sd-audience" className={`overflow-x-hidden border-t border-[#E5E5EC] py-14 sm:py-20 ${bg}`}>
      <div className={sectionShell}>
        <RDSectionHeader id="sd-audience" eyebrow={audience.eyebrow} title={audience.title} description={audience.description} />

        <ul className="mt-12 hidden gap-4 lg:grid lg:grid-cols-4">
          {audience.cards.map((c) => (
            <li key={c.number} className="relative rounded-2xl border border-[#E5E5EC] bg-white p-6">
              <span aria-hidden="true" className="absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-[#1B5CD6] via-[#C9A876] to-transparent" />
              {card(c)}
            </li>
          ))}
        </ul>

        <div className="mt-10 lg:hidden">
          <RDRail label={audience.title}>
            {audience.cards.map((c) => (
              <div key={c.number} className={`${railItemClass} relative rounded-2xl border border-[#E5E5EC] bg-white p-6`}>
                <span aria-hidden="true" className="absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-[#1B5CD6] via-[#C9A876] to-transparent" />
                {card(c)}
              </div>
            ))}
          </RDRail>
        </div>
      </div>
    </section>
  );
}
