import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import RDProjectDetailPage from '@/components/redesign/projects/RDProjectDetailPage';
import { PROJECT_DETAILS, PROJECT_SLUGS } from '@/components/redesign/projects/projectDetails';

// Seçili çalışmaların ayrıntılı anlatımları (şimdilik ASL Çanta ve BERD). Listeleme sayfası yok;
// giriş noktası ana sayfadaki "Seçili çalışmalar" paneli. Sahte Review/puan/sonuç schema'sı yok.
export function generateStaticParams() {
  return PROJECT_SLUGS.map((slug) => ({ slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECT_DETAILS[slug];
  if (!project) notFound();
  const url = `https://gloventglobal.com/projeler/${slug}`;
  return {
    title: project.metaTitle,
    description: project.metaDescription,
    alternates: { canonical: `/projeler/${slug}` },
    openGraph: {
      title: project.metaTitle,
      description: project.metaDescription,
      url,
      siteName: 'GloventGlobal',
      locale: 'tr_TR',
      type: 'website',
      images: [{ url: '/glovent-platform-hero.png', width: 1534, height: 1025, alt: 'GloventGlobal' }],
    },
    twitter: { card: 'summary_large_image', title: project.metaTitle, description: project.metaDescription, images: ['/glovent-platform-hero.png'] },
    robots: { index: true, follow: true },
  };
}

export default async function ProjeDetayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECT_DETAILS[slug];
  if (!project) notFound();
  const url = `https://gloventglobal.com/projeler/${slug}`;
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://gloventglobal.com' },
            { '@type': 'ListItem', position: 2, name: project.brand, item: url },
          ],
        }}
      />
      <RDProjectDetailPage project={project} />
    </>
  );
}
