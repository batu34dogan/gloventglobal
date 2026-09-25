import { sectionShell } from '@/components/redesign/service-detail/RDServiceDetailPrimitives';
import { aboutStory } from './aboutData';

// Sayfanın en özgün içeriği — production "Neden Kurulduk?" hikâyesi birebir. Editorial: büyük
// başlık + okunaklı paragraflar + büyük pull-quote. Tarih/zaman çizelgesi yok (kaynakta yok).
export default function RDAboutStory() {
  return (
    <section aria-labelledby="ab-story" className="border-t border-[#E5E5EC] bg-[#FAF9F6] py-16 sm:py-24">
      <div className={`${sectionShell} grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#1B5CD6]">Hikâyemiz</p>
          <h2 id="ab-story" className="mt-4 text-[2.3rem] font-extrabold leading-[1.05] tracking-[-0.02em] text-[#14213F] sm:text-[3.2rem] lg:text-[3.6rem]">
            {aboutStory.title}
          </h2>
        </div>
        <div>
          <div className="space-y-4 text-[16px] leading-relaxed text-[#4A4A5A] sm:text-[17.5px]">
            {aboutStory.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <blockquote className="mt-8 border-l-2 border-[#C9A876] pl-5 text-[1.3rem] font-bold leading-snug tracking-tight text-[#14213F] sm:mt-10 sm:text-[1.65rem]">
            {aboutStory.emphasis}
          </blockquote>
        </div>
      </div>
    </section>
  );
}
