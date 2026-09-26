import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { guides } from '@/components/guides/guidesData';
import { guideMetaDescription } from '@/lib/guides/helpers';
import RDGuideDetailPage from '@/components/redesign/guides/RDGuideDetailPage';

// PREVIEW — tek ortak şablonla 36 rehber. Production /rehberler/[slug] UI, metadata ve schema
// değişmedi. Canonical/og:url gerçek production URL'si, robots noindex,nofollow, JSON-LD YOK,
// sitemap dışında. Description: summary'den deterministik ≤160 karakter (migration için hazırlık).
export function generateStaticParams() {
  return Object.keys(guides).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides[slug];
  if (!guide) return {};
  const url = `https://gloventglobal.com/rehberler/${slug}`;
  const description = guideMetaDescription(guide);
  return {
    title: `${guide.title} | GloventGlobal`,
    description,
    alternates: { canonical: `/rehberler/${slug}` },
    openGraph: {
      title: guide.title,
      description,
      url,
      siteName: 'GloventGlobal',
      locale: 'tr_TR',
      type: 'article',
      images: [{ url: '/glovent-platform-hero.png', width: 1534, height: 1025, alt: guide.title }],
    },
    twitter: { card: 'summary_large_image', title: guide.title, description, images: ['/glovent-platform-hero.png'] },
    robots: { index: false, follow: false },
  };
}

export default async function RedesignRehberDetayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guides[slug];
  if (!guide) notFound();
  return <RDGuideDetailPage guide={guide} basePath="/redesign/rehberler" analyticsPrefix="redesign_" />;
}
