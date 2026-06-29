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
      // Next.js'in metadata birleştirmesinde nested openGraph objesi child route'ta tanımlıysa
      // parent'tan (root layout) görsel kalıtımı garanti olmuyor — bu yüzden bilinen, gerçekten
      // var olan görseli açıkça buraya da bağlıyoruz (kırık path yok, kontrol ettim).
      images: [{ url: '/glovent-platform-hero.png', width: 1534, height: 1025, alt: guide.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description,
      images: ['/glovent-platform-hero.png'],
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

  const jsonLdBlocks: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: guide.title,
      description,
      author: { '@type': 'Organization', name: guide.author ?? 'GloventGlobal' },
      datePublished: guide.publishedAt,
      dateModified: guide.updatedAtISO ?? guide.publishedAt,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      publisher: {
        '@type': 'Organization',
        name: 'GloventGlobal',
        url: 'https://gloventglobal.com',
      },
      url,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://gloventglobal.com' },
        { '@type': 'ListItem', position: 2, name: 'Rehberler', item: 'https://gloventglobal.com/rehberler' },
        { '@type': 'ListItem', position: 3, name: guide.category, item: 'https://gloventglobal.com/rehberler' },
        { '@type': 'ListItem', position: 4, name: guide.title, item: url },
      ],
    },
  ];

  // FAQ verisi yoksa FAQPage şeması hiç üretilmiyor (sadece guide.faq doluysa eklenir).
  if (guide.faq) {
    jsonLdBlocks.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: guide.faq.items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    });
  }

  return (
    <>
      <JsonLd data={jsonLdBlocks} />
      <GuideDetailContent guide={guide} />
    </>
  );
}