import { sectionShell } from '@/components/redesign/service-detail/RDServiceDetailPrimitives';
import { processManifesto } from './processData';

// Kart değil, büyük editorial statement — production'daki "Çalışma Sistemi" başlığı ve açıklaması.
export default function RDProcessManifesto() {
  return (
    <section aria-labelledby="pr-manifesto" className="border-t border-[#E5E5EC] bg-[#FAF9F6] py-16 sm:py-24">
      <div className={`${sectionShell} grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-end lg:gap-16`}>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#1B5CD6]">{processManifesto.eyebrow}</p>
          <h2
            id="pr-manifesto"
            className="mt-5 max-w-[20ch] text-[2.1rem] font-extrabold leading-[1.08] tracking-[-0.02em] text-[#14213F] sm:text-[3rem] lg:text-[3.6rem]"
          >
            {processManifesto.title}
          </h2>
        </div>
        <div className="border-l-2 border-[#C9A876]/70 pl-5 lg:mb-2">
          <p className="text-[16px] leading-relaxed text-[#4A4A5A] sm:text-[17px]">{processManifesto.description}</p>
        </div>
      </div>
    </section>
  );
}
