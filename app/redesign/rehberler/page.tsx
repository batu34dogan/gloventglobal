import type { Metadata } from 'next';
import RDGuidesOverview from '@/components/redesign/guides/RDGuidesOverview';

// PREVIEW — production /rehberler değil (production UI hâlâ eski GuidesContent). Title/description
// production ile aynı; canonical ve og:url production route'u gösteriyor, robots noindex,nofollow.
// JSON-LD bilinçli olarak YOK; sitemap'e eklenmedi. Floating analiz tetikleyicisi /redesign/* altında gizli.
const TITLE = 'Rehberler | GloventGlobal';
const DESCRIPTION =
  'Amazon, Etsy, Shopify, B2B, global satış ve yapay zeka konularında e-ticaret ve dijital büyüme rehberleri.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/rehberler' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://gloventglobal.com/rehberler',
    siteName: 'GloventGlobal',
    locale: 'tr_TR',
    type: 'website',
    images: [{ url: '/glovent-platform-hero.png', width: 1534, height: 1025, alt: 'GloventGlobal' }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: ['/glovent-platform-hero.png'] },
  robots: { index: false, follow: false },
};

export default function RedesignRehberlerPage() {
  return <RDGuidesOverview basePath="/redesign/rehberler" analyticsPrefix="redesign_" />;
}
