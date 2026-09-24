import { RDNumberedRows, RDSectionHeader, sectionShell } from './RDServiceDetailPrimitives';

// Opsiyonel alanlar için ortak bölüm: serviceDetailsData.useCases (şu an Yapay Zeka
// Entegrasyonu) ve systemComposition (şu an Shopify, B2B Dijital Showroom). Alan tanımlı değilse
// page.tsx bu component'i hiç render etmez.
export default function RDServiceModules({
  id,
  block,
  bg,
}: {
  id: string;
  block: { eyebrow: string; title: string; description: string; cards: { number: string; title: string; description: string }[] };
  bg: string;
}) {
  return (
    <section aria-labelledby={id} className={`border-t border-[#E5E5EC] py-14 sm:py-20 ${bg}`}>
      <div className={sectionShell}>
        <RDSectionHeader id={id} eyebrow={block.eyebrow} title={block.title} description={block.description} />
        <div className="mt-10">
          <RDNumberedRows items={block.cards} columns={2} />
        </div>
      </div>
    </section>
  );
}
