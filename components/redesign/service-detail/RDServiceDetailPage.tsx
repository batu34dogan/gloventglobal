import type { ReactNode } from 'react';
import RDNavbar from '@/components/redesign/RDNavbar';
import RDFooter from '@/components/redesign/RDFooter';
import RDServiceDetailHero from './RDServiceDetailHero';
import RDServiceAudience from './RDServiceAudience';
import RDServiceProblem from './RDServiceProblem';
import RDServiceApproach from './RDServiceApproach';
import RDServiceModules from './RDServiceModules';
import RDServiceScope from './RDServiceScope';
import RDServiceProcess from './RDServiceProcess';
import RDServiceDataLayer from './RDServiceDataLayer';
import RDServiceWorkModel from './RDServiceWorkModel';
import RDServiceProof from './RDServiceProof';
import { RDServiceRelatedGuides, RDServiceRelatedServices } from './RDServiceRelated';
import RDServiceDetailCTA from './RDServiceDetailCTA';
import type { ServiceDetailView } from './serviceDetailAdapter';

// 12 hizmetin ortak detay sayfası ağacı — production /hizmetler/[slug] ve preview
// /redesign/hizmetler/[slug] aynı component'i render eder. Metadata/JSON-LD route'lara aittir.
// analyticsPrefix: production'da '' (mevcut "service_detail_*" konum taksonomisi), preview'de
// 'redesign_' — preview tıklamaları production verisine karışmasın.
export default function RDServiceDetailPage({ view, analyticsPrefix = '' }: { view: ServiceDetailView; analyticsPrefix?: string }) {
  const { data, slug } = view;

  // Açık zeminli bölümler, gerçekten render edilen sıraya göre ivory/beyaz dönüşümlü alır —
  // opsiyonel bir bölüm yoksa aynı renkte iki bölüm yan yana gelmez. Koyu katmanlar sabit.
  const blocks: ReactNode[] = [];
  let lightCount = 0;
  const pushLight = (render: (bg: string) => ReactNode) => {
    blocks.push(render(lightCount++ % 2 === 0 ? 'bg-[#FAF9F6]' : 'bg-white'));
  };

  pushLight((bg) => <RDServiceAudience key="audience" audience={data.audience} bg={bg} />);
  pushLight((bg) => <RDServiceProblem key="problem" problem={data.problem} bg={bg} />);
  pushLight((bg) => <RDServiceApproach key="approach" approach={data.approach} bg={bg} />);
  if (data.useCases) {
    const block = data.useCases;
    pushLight((bg) => <RDServiceModules key="usecases" id="sd-usecases" block={block} bg={bg} />);
  }
  pushLight((bg) => <RDServiceScope key="scope" deliverables={data.deliverables} bg={bg} />);
  if (data.systemComposition) {
    const block = data.systemComposition;
    pushLight((bg) => <RDServiceModules key="composition" id="sd-composition" block={block} bg={bg} />);
  }
  pushLight((bg) => <RDServiceProcess key="process" process={data.process} bg={bg} />);
  blocks.push(<RDServiceDataLayer key="data" dataSystem={data.dataSystem} />);
  if (data.workModel) {
    const workModel = data.workModel;
    pushLight((bg) => <RDServiceWorkModel key="workmodel" workModel={workModel} bg={bg} />);
  }
  if (view.project) {
    const project = view.project;
    pushLight((bg) => <RDServiceProof key="proof" project={project} bg={bg} />);
  }
  if (view.relatedGuides.length > 0) {
    pushLight((bg) => <RDServiceRelatedGuides key="guides" guides={view.relatedGuides} bg={bg} />);
  }
  if (view.relatedServices.length > 0) {
    pushLight((bg) => <RDServiceRelatedServices key="related" services={view.relatedServices} bg={bg} />);
  }

  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-geist-sans),system-ui,sans-serif' }}>
      <RDNavbar />
      <main>
        <RDServiceDetailHero
          slug={slug}
          name={view.name}
          pillar={view.pillar}
          eyebrow={data.eyebrow}
          title={data.title}
          description={data.description}
          scopeKeywords={view.scopeKeywords}
          steps={data.approach.steps}
          analyticsPrefix={analyticsPrefix}
        />
        {blocks}
        <RDServiceDetailCTA slug={slug} description={data.finalCta.description} analyticsPrefix={analyticsPrefix} />
      </main>
      <RDFooter />
    </div>
  );
}
