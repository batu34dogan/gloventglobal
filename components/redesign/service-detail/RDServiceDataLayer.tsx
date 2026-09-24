import Image from 'next/image';
import { RDRail, RDSectionHeader, sectionShell } from './RDServiceDetailPrimitives';
import type { ServiceData } from './serviceDetailAdapter';

// "Veriyle yönetilen sistem" — serviceDetailsData.dataSystem 12 hizmetin hepsinde gerçek içerik
// olarak var; bu yüzden koyu katman sırf tasarım için eklenmiyor, kaynaktaki bölümün karşılığı.
// Gerçek dashboard görselleri olan hizmetlerde (Etsy, Amazon) görseller native kaydırılabilir
// şerit olarak (auto-marquee yok), diğerlerinde kaynaktaki dataCards metin modülleri olarak.
// insight (şu an Etsy/Amazon) yalnızca tanımlıysa render edilir.
export default function RDServiceDataLayer({ dataSystem }: { dataSystem: ServiceData['dataSystem'] }) {
  const images = dataSystem.dashboardImages ?? [];
  const cards = dataSystem.dataCards ?? [];
  const contain = dataSystem.imageFit === 'contain';

  return (
    <section aria-labelledby="sd-data" className="relative overflow-hidden bg-[#0F1E3C] py-14 sm:py-20">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          WebkitMaskImage: 'radial-gradient(ellipse at 30% 20%, black 0%, transparent 70%)',
          maskImage: 'radial-gradient(ellipse at 30% 20%, black 0%, transparent 70%)',
        }}
      />
      <div className={`${sectionShell} relative`}>
        <RDSectionHeader id="sd-data" tone="dark" eyebrow={dataSystem.eyebrow} title={dataSystem.title} description={dataSystem.description} />

        {images.length > 0 && (
          <div className="mt-10">
            <RDRail label="Anonimleştirilmiş panel görünümleri" className="lg:ml-0 lg:w-full lg:px-0">
              {images.map((src) => {
                const wide = src.includes('ads-roas');
                return (
                  <div
                    key={src}
                    className={`relative shrink-0 snap-start overflow-hidden rounded-xl border border-white/10 bg-[#0A1428] p-1 ${
                      contain ? (wide ? 'h-[220px] w-[330px]' : 'h-[270px] w-[230px]') : 'h-[200px] w-[300px]'
                    }`}
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-lg">
                      <Image
                        src={src}
                        alt="Mağaza performans panelinden anonimleştirilmiş örnek görünüm"
                        fill
                        sizes="330px"
                        className={contain ? 'object-contain' : 'object-cover'}
                      />
                    </div>
                  </div>
                );
              })}
            </RDRail>
            {dataSystem.note && <p className="mt-4 max-w-[60ch] text-[12.5px] leading-relaxed text-white/50">{dataSystem.note}</p>}
          </div>
        )}

        {images.length === 0 && cards.length > 0 && (
          <ul className="mt-10 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((c) => (
              <li key={c.title} className="border-t border-white/10 py-6">
                <span aria-hidden="true" className="mb-4 flex items-end gap-1">
                  <span className="h-2.5 w-1 rounded-full bg-[#1B5CD6]/60" />
                  <span className="h-4 w-1 rounded-full bg-[#1B5CD6]/80" />
                  <span className="h-3 w-1 rounded-full bg-[#C9A876]/70" />
                </span>
                <h3 className="text-[16px] font-bold text-white">{c.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-white/60">{c.description}</p>
              </li>
            ))}
          </ul>
        )}

        {dataSystem.insight && (
          <div className="mt-10 max-w-[760px] rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <h3 className="text-[11.5px] font-bold uppercase tracking-[0.2em] text-[#C9A876]">{dataSystem.insight.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-white/70">{dataSystem.insight.text}</p>
            {dataSystem.insight.chips && dataSystem.insight.chips.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2">
                {dataSystem.insight.chips.map((chip) => (
                  <li key={chip} className="rounded-full border border-white/15 px-3 py-1.5 text-[12px] font-medium text-white/75">
                    {chip}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
