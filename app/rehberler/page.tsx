import type { Metadata } from 'next';
import RDGuidesOverview from '@/components/redesign/guides/RDGuidesOverview';
import JsonLd from '@/components/seo/JsonLd';
import { guides } from '@/components/guides/guidesData';
import { sortGuides } from '@/lib/guides/helpers';

// Onaylanan redesign (preview /redesign/rehberler ile aynı RDGuidesOverview ağacı, server-first).
// Eski GuidesContent rollback/referans için repoda duruyor, burada artık render edilmiyor.
// openGraph/twitter tam tanımlı (Next.js metadata yüzeysel birleştirir — root görseli düşmesin).
const TITLE = 'Global Büyüme Rehberleri | GloventGlobal';
const DESCRIPTION =
  'Global satış, Amazon, Etsy, Shopify, B2B, teknoloji, otomasyon ve operasyon sistemleri hakkında uygulanabilir GloventGlobal rehberlerini keşfedin.';
const URL = 'https://gloventglobal.com/rehberler';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/rehberler' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: 'GloventGlobal',
    locale: 'tr_TR',
    type: 'website',
    images: [{ url: '/glovent-platform-hero.png', width: 1534, height: 1025, alt: 'GloventGlobal' }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: ['/glovent-platform-hero.png'] },
  robots: { index: true, follow: true },
};

export default function RehberlerPage() {
  // ItemList sırası sayfadaki liste sırasıyla aynı (order).
  const list = sortGuides(Object.values(guides));
  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Global Büyüme Rehberleri',
            url: URL,
            description: DESCRIPTION,
            inLanguage: 'tr-TR',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: list.map((g, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: `${URL}/${g.slug}`,
              name: g.title,
            })),
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://gloventglobal.com' },
              { '@type': 'ListItem', position: 2, name: 'Rehberler', item: URL },
            ],
          },
        ]}
      />
      <RDGuidesOverview />
    </>
  );
}
