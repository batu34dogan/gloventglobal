import { RDNumberedRows, RDSectionHeader, focusRing, sectionShell } from './RDServiceDetailPrimitives';
import type { ServiceData } from './serviceDetailAdapter';

// "Ne kuruyoruz?" — serviceDetailsData.deliverables (6 gerçek çıktı). Desktop'ta başlık solda,
// çıktılar sağda 2 sütun yapılandırılmış satır. Mobilde bu, sayfanın en uzun listesi olduğu için
// progressive disclosure: tüm çıktı başlıkları her zaman görünür, açıklamalar native <details>
// ile açılır (ilk ikisi varsayılan açık). İçerik DOM'da her zaman mevcut.
export default function RDServiceScope({ deliverables, bg }: { deliverables: ServiceData['deliverables']; bg: string }) {
  return (
    <section aria-labelledby="sd-scope" className={`border-t border-[#E5E5EC] py-16 sm:py-24 ${bg}`}>
      <style>{`
        .rd-sd-acc > summary { list-style: none; }
        .rd-sd-acc > summary::-webkit-details-marker { display: none; }
        .rd-sd-acc[open] .rd-sd-acc-chev { transform: rotate(180deg); }
        .rd-sd-acc-chev { transition: transform .25s ease; }
        @media (prefers-reduced-motion: reduce) { .rd-sd-acc-chev { transition: none; } }
      `}</style>
      <div className={`${sectionShell} grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16`}>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <RDSectionHeader accent id="sd-scope" eyebrow={deliverables.eyebrow} title={deliverables.title} description={deliverables.description} />
        </div>

        <div className="hidden md:block">
          <RDNumberedRows items={deliverables.items} columns={2} />
        </div>

        <ul className="flex flex-col md:hidden">
          {deliverables.items.map((it, i) => (
            <li key={it.number} className="border-t border-[#E5E5EC] last:border-b">
              <details className="rd-sd-acc group" open={i < 2}>
                <summary className={`flex cursor-pointer items-center gap-4 py-4 ${focusRing}`}>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#DCE3F3] bg-[#F5F8FE] text-[11.5px] font-bold text-[#1B5CD6]">
                    {it.number}
                  </span>
                  <h3 className="flex-1 text-[15.5px] font-bold leading-snug text-[#14213F]">{it.title}</h3>
                  <svg aria-hidden="true" className="rd-sd-acc-chev h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="none" stroke="#71717D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 7.5l5 5 5-5" />
                  </svg>
                </summary>
                <p className="pb-5 pl-12 text-[14px] leading-relaxed text-[#5A5A6A]">{it.description}</p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
