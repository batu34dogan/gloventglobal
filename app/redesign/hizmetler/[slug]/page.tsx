import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import RDServiceDetailPage from '@/components/redesign/service-detail/RDServiceDetailPage';
import { getServiceDetailView, getServiceSlugs } from '@/components/redesign/service-detail/serviceDetailAdapter';

// PREVIEW (rollback/referans) — production /hizmetler/[slug] artık aynı RDServiceDetailPage
// ağacını render ediyor. Title/description production ile aynı; canonical ve og:url gerçek
// production detay route'unu gösteriyor, robots noindex,nofollow. JSON-LD bilinçli olarak YOK:
// Service/BreadcrumbList schema production sayfasında var. Sitemap'e eklenmedi.
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

  return <RDServiceDetailPage view={view} analyticsPrefix="redesign_" />;
}
