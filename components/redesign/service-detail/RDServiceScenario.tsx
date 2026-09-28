import { RDSectionHeader, sectionShell } from './RDServiceDetailPrimitives';
import type { ServiceData } from './serviceDetailAdapter';

// "Bu durumda nasıl yaklaşırız?" — serviceDetailsData.scenario (opsiyonel). Yaklaşım bölümünün
// hemen ardından tek bir örnek durum: durum → kararımız → gerekçe. Gerçek müşteri vakası değildir;
// kart/katalog yerine ince ayırıcılı üç satır. Veri yoksa sayfada hiç render edilmez.
const ROWS = [
  { key: 'situation', label: 'Durum' },
  { key: 'decision', label: 'Kararımız' },
  { key: 'rationale', label: 'Gerekçe' },
] as const;

export default function RDServiceScenario({ scenario, bg }: { scenario: NonNullable<ServiceData['scenario']>; bg: string }) {
  return (
    <section aria-labelledby="sd-scenario" className={`border-t border-[#E5E5EC] py-14 sm:py-20 ${bg}`}>
      <div className={`${sectionShell} grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20`}>
        <RDSectionHeader id="sd-scenario" eyebrow="Örnek durum" title="Bu durumda nasıl yaklaşırız?" accent />
        <dl className="border-b border-[#E5E5EC]">
          {ROWS.map(({ key, label }) => (
            <div key={key} className="grid gap-2 border-t border-[#E5E5EC] py-5 sm:grid-cols-[132px_minmax(0,1fr)] sm:gap-6 sm:py-6">
              <dt className="pt-0.5 text-[11.5px] font-bold uppercase tracking-[0.2em] text-[#84683E]">{label}</dt>
              <dd
                className={`text-[15.5px] leading-relaxed sm:text-[16px] ${
                  key === 'decision' ? 'font-semibold text-[#14213F]' : 'text-[#4A4A5A]'
                }`}
              >
                {scenario[key]}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
