import { sectionShell } from '@/components/redesign/service-detail/RDServiceDetailPrimitives';
import { aboutFounder, aboutStory } from './aboutData';

// Hikâye + kurucu — saha deneyimi ana mesajı, "Neden Kurulduk?" kaynağının özgün paragrafları ve aynı
// bölümün içinde sakin bir "Kurucudan" satırı. Editorial: kart, portre, sayaç veya alıntı kartı yok
// (doğrulanmış kurucu portresi yok; stok/üretilmiş görsel kullanılmıyor). "7 yıl" kurucunun e-ticaret
// deneyimidir, şirketin kuruluş yaşı olarak sunulmaz.
export default function RDAboutStory() {
  return (
    <section aria-labelledby="ab-story" className="border-t border-[#E5E5EC] bg-[#FAF9F6] py-16 sm:py-24">
      <div className={`${sectionShell} grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#1B5CD6]">{aboutStory.eyebrow}</p>
          <h2 id="ab-story" className="mt-4 max-w-[16ch] text-[2.1rem] font-extrabold leading-[1.08] tracking-[-0.02em] text-[#14213F] sm:text-[2.9rem] lg:text-[3.2rem]">
            {aboutStory.title}
          </h2>
        </div>
        <div>
          {/* "e-ticaret" kısa çizgiden bölünmesin (dar ekranda "e- / ticaret" kırılımı). */}
          <p className="text-[17px] font-semibold leading-relaxed text-[#14213F] sm:text-[19px]">
            {aboutStory.lead.split('e-ticaret').map((part, i) => (
              <span key={i}>
                {i > 0 && <span className="whitespace-nowrap">e-ticaret</span>}
                {part}
              </span>
            ))}
          </p>
          <div className="mt-5 space-y-4 text-[16px] leading-relaxed text-[#4A4A5A] sm:text-[17.5px]">
            {aboutStory.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Kurucudan — aynı bölümün devamı; ince ayırıcı, tipografik isim, kurucunun kendi anlatımı. */}
      <div className={`${sectionShell} mt-12 sm:mt-16`}>
        <div className="grid gap-6 border-t border-[#E3DDD1] pt-10 sm:pt-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#84683E]">{aboutFounder.eyebrow}</p>
            <h3 className="mt-3 text-[1.6rem] font-extrabold leading-tight tracking-tight text-[#14213F] sm:text-[1.9rem]">{aboutFounder.name}</h3>
            <p className="mt-1.5 text-[15px] text-[#5A5A6A]">{aboutFounder.role}</p>
            <span aria-hidden="true" className="mt-5 block h-[2px] w-12 rounded-full bg-gradient-to-r from-[#1B5CD6] to-[#C9A876]" />
          </div>
          <div>
            <div className="space-y-4 text-[16px] leading-relaxed text-[#2F3547] sm:text-[17.5px]">
              {aboutFounder.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <dl className="mt-7 grid gap-1.5 border-t border-[#E3DDD1] pt-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-x-6">
              <dt className="text-[11.5px] font-bold uppercase tracking-[0.18em] text-[#84683E] sm:pt-1">{aboutFounder.operations.label}</dt>
              <dd className="text-[15px] leading-relaxed text-[#4A4A5A] sm:text-[15.5px]">{aboutFounder.operations.text}</dd>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
