import { sectionShell } from '@/components/redesign/service-detail/RDServiceDetailPrimitives';
import { workModels, workModelsHeader } from './processData';

// 3 çalışma modeli — kaynak production /hizmetler overview (tek copy versiyonu). Desktop'ta
// bağlantılı 3 aşama, mobilde dikey akış.
export default function RDProcessWorkModels() {
  const last = workModels.length - 1;
  return (
    <section aria-labelledby="pr-models" className="border-t border-[#E5E5EC] bg-white py-16 sm:py-24">
      <div className={sectionShell}>
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#1B5CD6]">{workModelsHeader.eyebrow}</p>
        <h2 id="pr-models" className="mt-3 max-w-[24ch] text-[1.9rem] font-extrabold leading-[1.1] tracking-tight text-[#14213F] sm:text-[2.5rem]">
          {workModelsHeader.title}
        </h2>

        <div className="relative mt-12 hidden md:block">
          {/* Kurulum → yönetim → partnerlik ilerleyişi: daha belirgin sistem çizgisi, dolu düğümler
              (beyaz halka çizgiyi düğüm arkasında keser) ve aralarda küçük champagne yön işareti. */}
          <span
            aria-hidden="true"
            style={{ right: 'calc((100% - 48px) / 3 - 22px)' }}
            className="absolute left-[22px] top-[21px] h-[2px] bg-gradient-to-r from-[#1B5CD6]/80 via-[#1B5CD6]/50 to-[#C9A876]/85"
          />
          <ol className="grid grid-cols-3 gap-6">
          {workModels.map((m, i) => (
            <li key={m.n} className="relative">
              {i < last && (
                <span
                  aria-hidden="true"
                  className="absolute left-[calc(50%+34px)] top-[22px] z-10 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#E9DCC3] bg-white text-[13px] font-bold leading-none text-[#C9A876]"
                >
                  ›
                </span>
              )}
              <span
                className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 text-[14px] font-bold shadow-[0_0_0_5px_#fff] ${
                  i === last ? 'border-[#C9A876] bg-[#FFFCF6] text-[#8A6E43]' : 'border-[#1B5CD6] bg-[#1B5CD6] text-white'
                }`}
              >
                {m.n}
              </span>
              <div className="mt-6 rounded-2xl border border-[#E5E5EC] bg-[#FCFBF8] p-6">
                <h3 className="text-[18.5px] font-extrabold text-[#14213F]">{m.title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-[#4A4A5A]">{m.desc}</p>
              </div>
            </li>
          ))}
          </ol>
        </div>

        <ol className="mt-10 flex flex-col md:hidden">
          {workModels.map((m, i) => (
            <li key={m.n} className="flex gap-5">
              <div className="flex shrink-0 flex-col items-center">
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-full border-2 text-[14px] font-bold ${
                    i === last ? 'border-[#C9A876] bg-[#FFFCF6] text-[#8A6E43]' : 'border-[#1B5CD6]/55 bg-white text-[#1B5CD6]'
                  }`}
                >
                  {m.n}
                </span>
                {i < last && <span aria-hidden="true" className="mt-1 w-[1.5px] flex-1 bg-gradient-to-b from-[#1B5CD6]/55 to-[#C9A876]/55" />}
              </div>
              <div className={i < last ? 'pb-8' : ''}>
                <h3 className="pt-2 text-[17px] font-extrabold text-[#14213F]">{m.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#4A4A5A]">{m.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
