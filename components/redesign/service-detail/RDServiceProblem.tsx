import { RDNumberedRows, RDSectionHeader, sectionShell } from './RDServiceDetailPrimitives';
import type { ServiceData } from './serviceDetailAdapter';

// "Bu sistem neyi çözer?" — serviceDetailsData.problem. Kaynağın kendi terminolojisi (eyebrow
// "SİSTEM EKSİKLERİ", hizmete özel başlık) korunuyor; yeni sorun maddesi eklenmiyor.
export default function RDServiceProblem({ problem, bg }: { problem: ServiceData['problem']; bg: string }) {
  return (
    <section aria-labelledby="sd-problem" className={`border-t border-[#E5E5EC] py-14 sm:py-20 ${bg}`}>
      <div className={`${sectionShell} grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20`}>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <RDSectionHeader id="sd-problem" eyebrow={problem.eyebrow} title={problem.title} description={problem.description} />
        </div>
        <RDNumberedRows items={problem.cards} />
      </div>
    </section>
  );
}
