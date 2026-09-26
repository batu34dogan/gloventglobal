import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { guides } from '@/components/guides/guidesData';
import { guideMetaDescription } from '@/lib/guides/helpers';
import RDGuideDetailPage from '@/components/redesign/guides/RDGuideDetailPage';
import JsonLd from '@/components/seo/JsonLd';

// Onaylanan redesign: 36 rehber preview (/redesign/rehberler/[slug]) ile aynı tek RDGuideDetailPage
// şablonunu kullanır. Eski GuideDetailContent rollback/referans için repoda duruyor.
// Tarihler (publishedAt/updatedAt) doğrulanamadığı için ne UI'da ne schema'da kullanılıyor; data
// alanları olduğu gibi duruyor. Rehbere özel görsel olmadığı için Article'a image eklenmiyor.
export function generateStaticParams() {
  return Object.keys(guides).map((slug) => ({ slug }));
}

// "{title} | GloventGlobal" 70 karakteri aşarsa marka eki düşülür (başlık asla kesilmez; H1 aynı).
function seoTitle(title: string) {
  const full = `${title} | GloventGlobal`;
  return full.length > 70 ? title : full;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides[slug];
  if (!guide) return {};
  const url = `https://gloventglobal.com/rehberler/${slug}`;
  const description = guideMetaDescription(guide);
  return {
    title: seoTitle(guide.title),
    description,
    alternates: { canonical: `/rehberler/${slug}` },
    openGraph: {
      title: guide.title,
      description,
      url,
      siteName: 'GloventGlobal',
      locale: 'tr_TR',
      type: 'article',
      images: [{ url: '/glovent-platform-hero.png', width: 1534, height: 1025, alt: 'GloventGlobal' }],
    },
    twitter: { card: 'summary_large_image', title: guide.title, description, images: ['/glovent-platform-hero.png'] },
    robots: { index: true, follow: true },
  };
}

export default async function RehberDetayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guides[slug];
  if (!guide) notFound();

  const url = `https://gloventglobal.com/rehberler/${slug}`;
  const blocks: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: guide.title,
      description: guideMetaDescription(guide),
      author: { '@type': 'Organization', name: guide.author ?? 'GloventGlobal' },
      publisher: { '@type': 'Organization', name: 'GloventGlobal', url: 'https://gloventglobal.com' },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      url,
      inLanguage: 'tr-TR',
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
  ];
  // FAQPage yalnızca gerçek FAQ verisi varsa; sayfadaki FAQ ile birebir aynı kaynak.
  if (guide.faq && guide.faq.items.length > 0) {
    blocks.push({
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
      <JsonLd data={blocks} />
      <RDGuideDetailPage guide={guide} />
    </>
  );
}
