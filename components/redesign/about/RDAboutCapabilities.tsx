import Link from 'next/link';
import { focusRing, sectionShell } from '@/components/redesign/service-detail/RDServiceDetailPrimitives';
import { aboutCapabilities, aboutDataLayer } from './aboutData';

// Şirketin yapısı: 4 yetkinlik + hepsinin altından geçen yatay AI + DATA katmanı. Service Explorer
// değil — hizmet listesi yok, yalnızca her yetkinliğin şirket içindeki rolü ve /hizmetler linki.
export default function RDAboutCapabilities() {
  return (
    <section aria-labelledby="ab-caps" className="border-t border-[#E5E5EC] bg-[#FAF9F6] py-16 sm:py-24">
      <div className={sectionShell}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#1B5CD6]">Tek Çatı Altında</p>
            <h2 id="ab-caps" className="mt-3 max-w-[22ch] text-[1.9rem] font-extrabold leading-[1.1] tracking-tight text-[#14213F] sm:text-[2.5rem]">
              Dört Yetkinlik, Tek Büyüme Sistemi.
            </h2>
          </div>
          <Link href="/hizmetler" className={`inline-flex w-fit shrink-0 rounded text-[14.5px] font-semibold text-[#1B5CD6] hover:text-[#14213F] ${focusRing}`}>
            Tüm Hizmetleri İncele →
          </Link>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {aboutCapabilities.map((c) => (
            <li key={c.en} className="relative rounded-2xl border border-[#E5E5EC] bg-white p-4 sm:p-6">
              <span aria-hidden="true" className="absolute left-4 right-4 top-0 h-px bg-gradient-to-r from-[#1B5CD6] via-[#C9A876] to-transparent sm:left-6 sm:right-6" />
              <p lang="en" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A6E43] sm:text-[11px]">{c.en}</p>
              <h3 className="mt-1.5 text-[17px] font-extrabold text-[#14213F] sm:text-[20px]">{c.title}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[#5A5A6A] sm:text-[14.5px]">{c.desc}</p>
            </li>
          ))}
        </ul>

        {/* Yatay katman: dört yetkinliğin hepsinin altından geçer */}
        <div className="relative mt-3 overflow-hidden rounded-2xl bg-[#0F1E3C] px-5 py-4 sm:mt-4 sm:flex sm:items-center sm:gap-6 sm:px-7 sm:py-5">
          <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#1B5CD6] to-[#C9A876]" />
          <p lang="en" className="shrink-0 text-[12px] font-bold uppercase tracking-[0.24em] text-[#C9A876]">AI + Data</p>
          <p className="mt-1.5 text-[14px] leading-relaxed text-white/75 sm:mt-0 sm:text-[15px]">{aboutDataLayer}</p>
        </div>
      </div>
    </section>
  );
}
