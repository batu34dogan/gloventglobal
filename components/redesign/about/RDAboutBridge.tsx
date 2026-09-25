import Link from 'next/link';
import { focusRing, sectionShell } from '@/components/redesign/service-detail/RDServiceDetailPrimitives';

// Eski "Nasıl Düşünüyoruz?" süreç bölümünün yerine küçük bir köprü — süreç /nasil-calisiyoruz'da
// anlatılıyor, burada tekrar edilmiyor.
export default function RDAboutBridge() {
  return (
    <section aria-label="Metodoloji" className="border-t border-[#E5E5EC] bg-white py-10 sm:py-12">
      <div className={`${sectionShell} flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between`}>
        <p className="max-w-[60ch] text-[16px] font-semibold leading-snug text-[#14213F] sm:text-[18px]">
          Bu prensiplerin sahada nasıl uygulandığını 6 adımlı metodolojimizde anlatıyoruz.
        </p>
        <Link
          href="/nasil-calisiyoruz"
          className={`inline-flex w-fit shrink-0 items-center rounded-full border border-[#D6D6DC] px-6 py-3 text-[14.5px] font-semibold text-[#14213F] transition-all hover:border-[#1B5CD6] hover:text-[#1B5CD6] ${focusRing}`}
        >
          Metodolojimizi İnceleyin →
        </Link>
      </div>
    </section>
  );
}
