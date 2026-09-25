import { sectionShell } from '@/components/redesign/service-detail/RDServiceDetailPrimitives';
import { aboutPrinciples } from './aboutData';

// Koyu imza bölüm — /farkimiz'in benzersiz prensipleri + Hakkımızda çalışma prensipleri, 6 konsolide
// prensip (açıklamalar kaynak metin). id="prensipler": ileride /farkimiz → /hakkimizda#prensipler
// kalıcı yönlendirmesinin hedefi. Homepage'teki "X değil → Y" formatı bilerek kullanılmadı.
// Dekoratif hareket yok.
export default function RDAboutPrinciples() {
  const lead = aboutPrinciples.slice(0, 2);
  const rest = aboutPrinciples.slice(2);
  return (
    <section id="prensipler" aria-labelledby="ab-principles" className="relative scroll-mt-20 overflow-hidden bg-[#0F1E3C] py-16 sm:py-24">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          WebkitMaskImage: 'radial-gradient(ellipse at 20% 10%, black 0%, transparent 70%)',
          maskImage: 'radial-gradient(ellipse at 20% 10%, black 0%, transparent 70%)',
        }}
      />
      <div className={`${sectionShell} relative`}>
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#C9A876]">Prensiplerimiz</p>
        <h2 id="ab-principles" className="mt-4 max-w-[22ch] text-[1.95rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-[2.7rem]">
          Her Kararın Arkasındaki Prensipler.
        </h2>

        {/* En güçlü iki prensip — büyük editorial modüller */}
        <ol className="mt-10 grid gap-4 md:grid-cols-2 md:gap-6">
          {lead.map((p) => (
            <li key={p.n} className="relative rounded-3xl border border-white/10 bg-white/[0.035] p-6 sm:p-9">
              <span aria-hidden="true" className="absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-[#1B5CD6] via-[#C9A876] to-transparent sm:left-9 sm:right-9" />
              <span className="text-[2.4rem] font-extrabold leading-none tracking-tight text-[#C9A876] sm:text-[3.2rem]">{p.n}</span>
              <h3 className="mt-4 text-[1.35rem] font-extrabold leading-snug text-white sm:text-[1.7rem]">{p.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/70 sm:text-[16px]">{p.desc}</p>
            </li>
          ))}
        </ol>

        {/* Diğer dört prensip — kompakt modüller */}
        <ol className="mt-4 grid gap-x-8 sm:grid-cols-2 md:mt-10 lg:grid-cols-4">
          {rest.map((p) => (
            <li key={p.n} className="border-t border-white/10 py-5 sm:py-6">
              <span className="text-[13px] font-bold text-[#C9A876]">{p.n}</span>
              <h3 className="mt-2 text-[17px] font-bold leading-snug text-white">{p.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-white/65">{p.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
