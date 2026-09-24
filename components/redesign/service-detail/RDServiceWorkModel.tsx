import Link from 'next/link';
import { RDSectionHeader, focusRing, sectionShell } from './RDServiceDetailPrimitives';
import type { ServiceData } from './serviceDetailAdapter';

// Opsiyonel — serviceDetailsData.workModel (Görsel & İçerik Sistemi hariç 11 hizmette dolu).
export default function RDServiceWorkModel({
  workModel,
  bg,
}: {
  workModel: NonNullable<ServiceData['workModel']>;
  bg: string;
}) {
  return (
    <section aria-labelledby="sd-workmodel" className={`border-t border-[#E5E5EC] py-14 sm:py-20 ${bg}`}>
      <div className={sectionShell}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <RDSectionHeader id="sd-workmodel" eyebrow={workModel.eyebrow} title={workModel.title} description={workModel.description} />
          <Link
            href="/nasil-calisiyoruz"
            className={`inline-flex w-fit shrink-0 items-center gap-2 rounded text-[14.5px] font-semibold text-[#1B5CD6] transition-colors hover:text-[#14213F] ${focusRing}`}
          >
            Nasıl Çalışıyoruz →
          </Link>
        </div>
        <ol className="mt-10 grid gap-4 md:grid-cols-2 md:gap-6">
          {workModel.cards.map((c) => (
            <li key={c.number} className="rounded-2xl border border-[#E5E5EC] bg-white p-6 sm:p-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#1B5CD6]/50 text-[14px] font-bold text-[#1B5CD6]">
                {c.number}
              </span>
              <h3 className="mt-5 text-[18.5px] font-extrabold text-[#14213F]">{c.title}</h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-[#5A5A6A]">{c.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
