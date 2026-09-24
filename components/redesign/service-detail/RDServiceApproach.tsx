import { RDNumberedRows, RDSectionHeader, sectionShell } from './RDServiceDetailPrimitives';
import type { ServiceData } from './serviceDetailAdapter';

// "GloventGlobal nasıl yaklaşır?" — serviceDetailsData.approach (4 adım). Süreçten (zaman sırası)
// bilinçli olarak farklı bir geometri: birbirine bağlı 2x2 sistem modülü. Hero görselindeki
// dört node'un metin karşılığı burası.
export default function RDServiceApproach({ approach, bg }: { approach: ServiceData['approach']; bg: string }) {
  return (
    <section aria-labelledby="sd-approach" className={`border-t border-[#E5E5EC] py-14 sm:py-20 ${bg}`}>
      <div className={sectionShell}>
        <RDSectionHeader id="sd-approach" eyebrow={approach.eyebrow} title={approach.title} description={approach.description} />

        {/* 0-767px: kart yığını yerine kompakt numaralı satırlar — mobil sayfa gereksiz uzamasın */}
        <div className="mt-8 md:hidden">
          <RDNumberedRows items={approach.steps} />
        </div>

        <div className="relative mt-12 hidden md:block">
          {/* Modülleri birbirine bağlayan ince sistem çizgileri + merkez düğüm (yalnızca 2 sütunda) */}
          <span aria-hidden="true" className="pointer-events-none absolute inset-x-[8%] top-1/2 hidden h-px bg-gradient-to-r from-transparent via-[#1B5CD6]/35 to-transparent md:block" />
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-[10%] left-1/2 hidden w-px bg-gradient-to-b from-transparent via-[#C9A876]/45 to-transparent md:block" />
          <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#1B5CD6] bg-white md:block" />

          <ol className="relative grid gap-4 md:grid-cols-2 md:gap-6">
            {approach.steps.map((s) => (
              <li key={s.number} className="relative overflow-hidden rounded-2xl border border-[#E5E5EC] bg-white p-6 sm:p-8">
                <span aria-hidden="true" className="absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-[#1B5CD6] via-[#C9A876] to-transparent" />
                <div className="flex items-baseline gap-4">
                  <span className="text-[13px] font-bold text-[#1B5CD6]">{s.number}</span>
                  <h3 className="text-[18.5px] font-extrabold leading-snug text-[#14213F] sm:text-[20px]">{s.title}</h3>
                </div>
                <p className="mt-3 text-[14.5px] leading-relaxed text-[#5A5A6A]">{s.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
