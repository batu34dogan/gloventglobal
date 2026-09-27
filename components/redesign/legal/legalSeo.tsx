import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';

// 4 legal route'un ortak metadata + JSON-LD üreticisi. openGraph/twitter tam tanımlı (Next.js metadata
// yüzeysel birleştirir — root görseli/siteName düşmesin). Schema: yalnızca WebPage + BreadcrumbList
// (Organization homepage'te zaten var, burada tekrarlanmaz).
const BASE = 'https://gloventglobal.com';

export type LegalPageMeta = { path: string; name: string; title: string; description: string };

export function legalMetadata({ path, title, description }: LegalPageMeta): Metadata {
  const url = `${BASE}${path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      siteName: 'GloventGlobal',
      locale: 'tr_TR',
      type: 'website',
      images: [{ url: '/glovent-platform-hero.png', width: 1534, height: 1025, alt: 'GloventGlobal' }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/glovent-platform-hero.png'] },
    robots: { index: true, follow: true },
  };
}

export function LegalJsonLd({ path, name, description }: LegalPageMeta) {
  const url = `${BASE}${path}`;
  return (
    <JsonLd
      data={[
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name,
          url,
          description,
          inLanguage: 'tr-TR',
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: BASE },
            { '@type': 'ListItem', position: 2, name, item: url },
          ],
        },
      ]}
    />
  );
}
