import type { Metadata } from 'next';
import GuidesContent from '@/components/guides/GuidesContent';
import JsonLd from '@/components/seo/JsonLd';
import { guides } from '@/components/guides/guidesData';

export const metadata: Metadata = {
  title: 'Rehberler | GloventGlobal',
  description:
    'Amazon, Etsy, Shopify, B2B, global satış ve yapay zeka konularında e-ticaret ve dijital büyüme rehberleri.',
  alternates: { canonical: '/rehberler' },
  openGraph: {
    title: 'Rehberler | GloventGlobal',
    description:
      'Amazon, Etsy, Shopify, B2B, global satış ve yapay zeka konularında e-ticaret ve dijital büyüme rehberleri.',
    url: 'https://gloventglobal.com/rehberler',
    siteName: 'GloventGlobal',
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rehberler | GloventGlobal',
    description:
      'Amazon, Etsy, Shopify, B2B, global satış ve yapay zeka konularında e-ticaret ve dijital büyüme rehberleri.',
  },
};

export default function RehberlerPage() {
  const slugs = Object.keys(guides);

  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: slugs.map((slug, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: `https://gloventglobal.com/rehberler/${slug}`,
              name: guides[slug].title,
            })),
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://gloventglobal.com' },
              { '@type': 'ListItem', position: 2, name: 'Rehberler', item: 'https://gloventglobal.com/rehberler' },
            ],
          },
        ]}
      />
      <GuidesContent />
    </>
  );
}