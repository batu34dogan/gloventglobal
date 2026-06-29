import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { guides } from '@/components/guides/guidesData';
import GuideDetailContent from '@/components/guides/GuideDetailContent';
import JsonLd from '@/components/seo/JsonLd';

export function generateStaticParams() {
  return Object.keys(guides).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides[slug];
  if (!guide) return {};

  const url = `https://gloventglobal.com/rehberler/${slug}`;
  // summary doluysa (artık 6 rehberin hepsinde) description için tercih edilir, yoksa excerpt'e
  // düşer — mevcut metadata yapısı bozulmuyor, sadece daha kaliteli bir description kaynağı.
  const description = guide.summary ?? guide.excerpt;

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
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description,
    },
  };
}

export default async function RehberDetayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guides[slug];

  if (!guide) {
    notFound();
  }

  const url = `https://gloventglobal.com/rehberler/${slug}`;
  const description = guide.summary ?? guide.excerpt;

  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: guide.title,
            description,
            datePublished: guide.publishedAt,
            url,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://gloventglobal.com' },
              { '@type': 'ListItem', position: 2, name: 'Rehberler', item: 'https://gloventglobal.com/rehberler' },
              { '@type': 'ListItem', position: 3, name: guide.title, item: url },
            ],
          },
        ]}
      />
      <GuideDetailContent guide={guide} />
    </>
  );
}