import { RDSectionHeader, sectionShell } from './RDServiceDetailPrimitives';
import type { ServiceData } from './serviceDetailAdapter';

// Hizmete özel süreç — serviceDetailsData.process (5 gerçek adım). Homepage Growth Engine'in
// kopyası değil: desktop'ta numaralı yatay yol haritası, 1024px altında dikey bağlı akış.
export default function RDServiceProcess({ process, bg }: { process: ServiceData['process']; bg: string }) {
  const last = process.steps.length - 1;
  return (
    <section aria-labelledby="sd-process" className={`border-t border-[#E5E5EC] py-14 sm:py-20 ${bg}`}>
      <div className={sectionShell}>
        <RDSectionHeader id="sd-process" eyebrow={process.eyebrow} title={process.title} description={process.description} />

        {/* Desktop (1024px+): yatay yol haritası */}
        <ol className="relative mt-14 hidden lg:grid" style={{ gridTemplateColumns: `repeat(${process.steps.length}, minmax(0, 1fr))` }}>
          <span aria-hidden="true" className="pointer-events-none absolute left-[22px] right-[10%] top-[22px] h-[1.5px] bg-gradient-to-r from-[#1B5CD6]/60 via-[#1B5CD6]/35 to-[#C9A876]/60" />
          {process.steps.map((s, i) => (
            <li key={s.number} className="relative pr-6">
              <span
                className={`relative flex h-11 w-11 items-center justify-center rounded-full border-2 text-[14px] font-bold ${
                  i === last ? 'border-[#C9A876] bg-[#FFFCF6] text-[#8A6E43]' : 'border-[#1B5CD6]/55 bg-white text-[#1B5CD6]'
                }`}
              >
                {s.number}
              </span>
              <h3 className="mt-5 text-[16.5px] font-extrabold leading-snug text-[#14213F]">{s.title}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[#5A5A6A]">{s.description}</p>
            </li>
          ))}
        </ol>

        {/* 0-1023px: dikey bağlı akış */}
        <ol className="mt-10 flex flex-col lg:hidden">
          {process.steps.map((s, i) => (
            <li key={s.number} className="flex gap-5">
              <div className="flex shrink-0 flex-col items-center">
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 text-[14px] font-bold ${
                    i === last ? 'border-[#C9A876] bg-[#FFFCF6] text-[#8A6E43]' : 'border-[#1B5CD6]/55 bg-white text-[#1B5CD6]'
                  }`}
                >
                  {s.number}
                </span>
                {i < last && <span aria-hidden="true" className="mt-1 w-[1.5px] flex-1 bg-gradient-to-b from-[#1B5CD6]/55 to-[#C9A876]/55" />}
              </div>
              <div className={i < last ? 'pb-8' : ''}>
                <h3 className="pt-2 text-[16.5px] font-extrabold leading-snug text-[#14213F]">{s.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#5A5A6A]">{s.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
