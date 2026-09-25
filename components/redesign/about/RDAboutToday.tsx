import Image from 'next/image';
import Link from 'next/link';
import { RDRail, focusRing, railItemClass, sectionShell } from '@/components/redesign/service-detail/RDServiceDetailPrimitives';
import { getServiceProject } from '@/components/redesign/service-detail/serviceDetailAdapter';
import { aboutProofServiceSlugs, aboutToday } from './aboutData';

// "GloventGlobal Bugün" (kaynak cümle birebir) + 3 gerçek proje (BERD, ASL Çanta, Ziynet Bijüteri) —
// veri serviceDetailAdapter'dan (overview ile aynı metin). Metrik, testimonial, sonuç iddiası yok.
export default function RDAboutToday() {
  const items = aboutProofServiceSlugs.map(getServiceProject).filter((x): x is NonNullable<typeof x> => x !== null);

  const card = (it: (typeof items)[number], extra = '') => (
    <article key={it.slug} className={`flex flex-col overflow-hidden rounded-2xl border border-[#E5E5EC] bg-white ${extra}`}>
      <div className="relative aspect-[16/9]">
        <div aria-hidden="true" className="absolute inset-0" style={{ background: it.project.tone }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={it.project.logo}
            alt={`${it.project.brand} logosu`}
            width={it.project.logoWidth}
            height={it.project.logoHeight}
            sizes="(min-width: 768px) 360px, 84vw"
            className="h-auto w-auto object-contain"
            style={{ maxWidth: `${it.project.logoMaxWidthPct}%`, maxHeight: '62%' }}
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p lang="en" className="text-[11.5px] font-bold uppercase tracking-[0.1em] text-[#1B5CD6]">{it.project.capability}</p>
        <h3 className="mt-2 text-[19px] font-extrabold text-[#14213F]">{it.project.brand}</h3>
        <p className="mt-2.5 text-[14px] leading-relaxed text-[#5A5A6A]">{it.project.desc}</p>
        <Link
          href={`/hizmetler/${it.slug}`}
          className={`mt-auto inline-flex rounded border-t border-[#EDEDF1] pt-4 text-[13.5px] font-semibold text-[#8A6E43] transition-colors hover:text-[#1B5CD6] ${focusRing}`}
        >
          Uygulanan sistem: {it.serviceName} →
        </Link>
      </div>
    </article>
  );

  return (
    <section aria-labelledby="ab-today" className="overflow-x-hidden border-t border-[#E5E5EC] bg-[#FAF9F6] py-16 sm:py-24">
      <div className={sectionShell}>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#1B5CD6]">GloventGlobal Bugün</p>
            <h2 id="ab-today" className="mt-3 max-w-[22ch] text-[1.9rem] font-extrabold leading-[1.1] tracking-tight text-[#14213F] sm:text-[2.5rem]">
              Aynı Düşünce Yapısı, Farklı İş Modelleri.
            </h2>
          </div>
          <p className="max-w-[60ch] text-[15.5px] leading-relaxed text-[#4A4A5A] sm:text-[16.5px]">{aboutToday}</p>
        </div>
        {items.length > 0 && (
          <>
            <div className="mt-10 hidden gap-5 md:grid md:grid-cols-3">{items.map((it) => card(it))}</div>
            <div className="mt-8 md:hidden">
              <RDRail label="Gerçek uygulamalar">{items.map((it) => card(it, railItemClass))}</RDRail>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
