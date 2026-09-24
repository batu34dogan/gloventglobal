import Link from 'next/link';
import { RDRail, RDSectionHeader, focusRing, railItemClass, sectionShell } from './RDServiceDetailPrimitives';
import type { RelatedGuide, RelatedService } from './serviceDetailAdapter';

// İlgili rehberler — guidesData.relatedServiceSlug gerçek eşleşmesi. Boşsa page.tsx render etmez.
export function RDServiceRelatedGuides({ guides, bg }: { guides: RelatedGuide[]; bg: string }) {
  const card = (g: RelatedGuide, extra = '') => (
    <Link
      key={g.slug}
      href={`/rehberler/${g.slug}`}
      className={`group flex flex-col rounded-2xl border border-[#E5E5EC] bg-white p-6 transition-colors hover:border-[#1B5CD6]/40 ${focusRing} ${extra}`}
    >
      <span className="flex items-center justify-between gap-3 text-[11px] font-bold uppercase tracking-[0.1em]">
        <span className="text-[#1B5CD6]">{g.category}</span>
        <span className="font-medium normal-case tracking-normal text-[#6A6A7A]">{g.readTime}</span>
      </span>
      <h3 className="mt-4 text-[17.5px] font-bold leading-[1.35] text-[#14213F] group-hover:text-[#1B5CD6]">{g.title}</h3>
      <p className="mt-2.5 line-clamp-3 text-[13.5px] leading-relaxed text-[#5A5A6A]">{g.excerpt}</p>
      <span className="mt-auto pt-5 text-[13.5px] font-bold text-[#8A6E43] group-hover:text-[#1B5CD6]">Rehberi Oku →</span>
    </Link>
  );

  return (
    <section aria-labelledby="sd-guides" className={`overflow-x-hidden border-t border-[#E5E5EC] py-14 sm:py-20 ${bg}`}>
      <div className={sectionShell}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <RDSectionHeader id="sd-guides" eyebrow="İlgili Rehberler" title="Karar Vermeden Önce Okuyun." />
          <Link href="/rehberler" className={`inline-flex w-fit shrink-0 rounded text-[14.5px] font-semibold text-[#1B5CD6] hover:text-[#14213F] ${focusRing}`}>
            Tüm Rehberler →
          </Link>
        </div>
        <div className={`mt-10 hidden gap-5 md:grid ${guides.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
          {guides.map((g) => card(g))}
        </div>
        <div className="mt-10 md:hidden">
          {guides.length > 1 ? (
            <RDRail label="İlgili rehberler">{guides.map((g) => card(g, railItemClass))}</RDRail>
          ) : (
            guides.map((g) => card(g))
          )}
        </div>
      </div>
    </section>
  );
}

// İlgili hizmetler — adapter'daki küçük, açık ilişki haritası. Linkler gerçek production detay
// route'larına (/hizmetler/[slug]) gider; preview route'u oluşturulmaz/yayılmaz.
export function RDServiceRelatedServices({ services, bg }: { services: RelatedService[]; bg: string }) {
  const card = (s: RelatedService, extra = '') => (
    <Link
      key={s.slug}
      href={`/hizmetler/${s.slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-[#E5E5EC] bg-white p-6 transition-[border-color,box-shadow] duration-300 hover:border-[#1B5CD6]/45 hover:shadow-[0_18px_40px_-30px_rgba(20,33,63,0.45)] focus-visible:border-[#1B5CD6]/60 motion-reduce:transition-none ${focusRing} ${extra}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#1B5CD6] to-[#C9A876] transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
      />
      <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8A6E43]">{s.pillar}</span>
      <h3 className="mt-3 text-[19.5px] font-extrabold leading-snug tracking-tight text-[#14213F] group-hover:text-[#1B5CD6]">{s.name}</h3>
      <p className="mt-2.5 line-clamp-3 text-[13.5px] leading-relaxed text-[#5A5A6A]">{s.description}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 border-t border-[#EDEDF1] pt-4 text-[14px] font-bold text-[#1B5CD6]">
        Detayları İncele
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none">→</span>
      </span>
    </Link>
  );

  return (
    <section aria-labelledby="sd-related" className={`overflow-x-hidden border-t border-[#E5E5EC] py-14 sm:py-20 ${bg}`}>
      <div className={sectionShell}>
        <RDSectionHeader id="sd-related" eyebrow="İlgili Hizmetler" title="Bu Sistemle Birlikte Çalışan Hizmetler." />
        <div className="mt-10 hidden gap-5 md:grid md:grid-cols-3">{services.map((s) => card(s))}</div>
        <div className="mt-10 md:hidden">
          <RDRail label="İlgili hizmetler">{services.map((s) => card(s, railItemClass))}</RDRail>
        </div>
      </div>
    </section>
  );
}
