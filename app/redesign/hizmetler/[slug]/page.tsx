import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import RDNavbar from '@/components/redesign/RDNavbar';
import RDFooter from '@/components/redesign/RDFooter';
import RDServiceDetailHero from '@/components/redesign/service-detail/RDServiceDetailHero';
import RDServiceAudience from '@/components/redesign/service-detail/RDServiceAudience';
import RDServiceProblem from '@/components/redesign/service-detail/RDServiceProblem';
import RDServiceApproach from '@/components/redesign/service-detail/RDServiceApproach';
import RDServiceModules from '@/components/redesign/service-detail/RDServiceModules';
import RDServiceScope from '@/components/redesign/service-detail/RDServiceScope';
import RDServiceProcess from '@/components/redesign/service-detail/RDServiceProcess';
import RDServiceDataLayer from '@/components/redesign/service-detail/RDServiceDataLayer';
import RDServiceWorkModel from '@/components/redesign/service-detail/RDServiceWorkModel';
import RDServiceProof from '@/components/redesign/service-detail/RDServiceProof';
import { RDServiceRelatedGuides, RDServiceRelatedServices } from '@/components/redesign/service-detail/RDServiceRelated';
import RDServiceDetailCTA from '@/components/redesign/service-detail/RDServiceDetailCTA';
import { getServiceDetailView, getServiceSlugs } from '@/components/redesign/service-detail/serviceDetailAdapter';

// PREVIEW — production /hizmetler/[slug] değil. Title/description production detay sayfasıyla
// aynı; canonical ve og:url gerçek production detay route'unu gösteriyor, robots noindex,nofollow.
// JSON-LD bilinçli olarak YOK: Service/BreadcrumbList schema production sayfasında zaten var,
// preview'de tekrarlamak aynı hizmet için ikinci bir sinyal üretirdi. Sitemap'e eklenmedi.
export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const view = getServiceDetailView(slug);
  if (!view) return {};
  return {
    title: `${view.data.title} | GloventGlobal`,
    description: view.data.description,
    alternates: { canonical: `/hizmetler/${slug}` },
    openGraph: {
      title: `${view.data.title} | GloventGlobal`,
      description: view.data.description,
      url: `https://gloventglobal.com/hizmetler/${slug}`,
    },
    robots: { index: false, follow: false },
  };
}

export default async function RedesignServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const view = getServiceDetailView(slug);
  if (!view) notFound();

  const { data } = view;

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
        />
        {blocks}
        <RDServiceDetailCTA slug={slug} description={data.finalCta.description} />
      </main>
      <RDFooter />
    </div>
  );
}
