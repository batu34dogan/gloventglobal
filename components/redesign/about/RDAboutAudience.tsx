import { sectionShell } from '@/components/redesign/service-detail/RDServiceDetailPrimitives';
import { aboutAudience } from './aboutData';

// "Kimlerle çalışıyoruz?" — kaynak segmentler birebir; büyük kart grid'i değil, kompakt liste.
export default function RDAboutAudience() {
  return (
    <section aria-labelledby="ab-audience" className="border-t border-[#E5E5EC] bg-white py-16 sm:py-24">
      <div className={`${sectionShell} grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16`}>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#1B5CD6]">{aboutAudience.eyebrow}</p>
          <h2 id="ab-audience" className="mt-3 max-w-[20ch] text-[1.9rem] font-extrabold leading-[1.1] tracking-tight text-[#14213F] sm:text-[2.5rem]">
            {aboutAudience.title}
          </h2>
          <p className="mt-5 max-w-[56ch] text-[15.5px] leading-relaxed text-[#4A4A5A]">{aboutAudience.description}</p>
        </div>
        <ol className="grid gap-x-10 md:grid-cols-2">
          {aboutAudience.segments.map((s) => (
            <li key={s.n} className="grid grid-cols-[auto_1fr] gap-x-4 border-t border-[#E5E5EC] py-4 sm:py-5">
              <span className="pt-0.5 text-[12.5px] font-bold text-[#1B5CD6]">{s.n}</span>
              <div>
                <h3 className="text-[16px] font-bold leading-snug text-[#14213F]">{s.title}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-[#5A5A6A]">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
