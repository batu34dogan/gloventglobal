import { sectionShell } from '@/components/redesign/service-detail/RDServiceDetailPrimitives';
import { aboutWho } from './aboutData';

// "Biz Kimiz?" — Global Growth Partner konumlandırması. Partner rolü (kurar · yönetir · geliştirir)
// kaynak cümleden türetilmiş küçük bir tipografik vurgu; süreç diyagramı değil.
export default function RDAboutWho() {
  return (
    <section aria-labelledby="ab-who" className="border-t border-[#E5E5EC] bg-white py-16 sm:py-24">
      <div className={`${sectionShell} grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20`}>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#1B5CD6]">{aboutWho.eyebrow}</p>
          <h2 id="ab-who" className="mt-3 max-w-[22ch] text-[1.9rem] font-extrabold leading-[1.1] tracking-tight text-[#14213F] sm:text-[2.6rem]">
            {aboutWho.title}
          </h2>
          <p className="mt-5 max-w-[58ch] text-[15.5px] leading-relaxed text-[#4A4A5A] sm:text-[16.5px]">{aboutWho.body}</p>
        </div>
        <div className="rounded-3xl border border-[#E5E5EC] bg-[#FCFBF8] p-6 sm:p-9">
          {/* Dikey liste: kart genişliği breakpoint'lere göre çok değiştiği için yatay "·" satırı
              bazı genişliklerde kötü kırılıyordu. */}
          <ul className="flex flex-col gap-1.5" aria-label="Partner rolü">
            {aboutWho.roles.map((r) => (
              <li key={r} className="flex items-center gap-3">
                <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-[#C9A876]" />
                <span className="text-[1.5rem] font-extrabold leading-tight tracking-tight text-[#14213F] sm:text-[1.9rem]">{r}</span>
              </li>
            ))}
          </ul>
          <span aria-hidden="true" className="mt-5 block h-[2px] w-14 rounded-full bg-gradient-to-r from-[#1B5CD6] to-[#C9A876]" />
          <p className="mt-5 text-[15.5px] leading-relaxed text-[#4A4A5A] sm:text-[16.5px]">{aboutWho.partner}</p>
        </div>
      </div>
    </section>
  );
}
