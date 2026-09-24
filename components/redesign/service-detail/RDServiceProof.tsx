import Image from 'next/image';
import { RDSectionHeader, sectionShell } from './RDServiceDetailPrimitives';
import type { ServiceProject } from './serviceDetailAdapter';

// Opsiyonel — yalnızca overview'de onaylı gerçek proje ↔ hizmet eşleşmesi olan 4 hizmette
// (Amazon/BERD, Etsy/RituelCo, Shopify/ASL Çanta, B2B/Ziynet Bijüteri). Metrik/iddia yok.
export default function RDServiceProof({ project, bg }: { project: ServiceProject; bg: string }) {
  return (
    <section aria-labelledby="sd-proof" className={`border-t border-[#E5E5EC] py-14 sm:py-20 ${bg}`}>
      <div className={`${sectionShell} grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16`}>
        <RDSectionHeader id="sd-proof" eyebrow="Gerçek Uygulama" title="Bu Sistemi Kurduğumuz Bir Marka." />
        <article className="grid overflow-hidden rounded-2xl border border-[#E5E5EC] bg-white sm:grid-cols-[0.9fr_1.1fr]">
          <div className="relative aspect-[3/2] sm:aspect-auto sm:min-h-[220px]">
            <div aria-hidden="true" className="absolute inset-0" style={{ background: project.tone }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={project.logo}
                alt={`${project.brand} logosu`}
                width={project.logoWidth}
                height={project.logoHeight}
                sizes="(min-width: 1024px) 300px, 80vw"
                className="h-auto w-auto object-contain"
                style={{ maxWidth: `${project.logoMaxWidthPct}%`, maxHeight: '64%' }}
              />
            </div>
          </div>
          <div className="p-6 sm:p-8">
            <p className="text-[11.5px] font-bold uppercase tracking-[0.1em] text-[#1B5CD6]">{project.capability}</p>
            <h3 className="mt-2 text-[20px] font-extrabold text-[#14213F]">{project.brand}</h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-[#5A5A6A]">{project.desc}</p>
          </div>
        </article>
      </div>
    </section>
  );
}
