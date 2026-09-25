import type { Metadata } from 'next';
import RDProcessPage from '@/components/redesign/process/RDProcessPage';

// PREVIEW (rollback/referans) — production /nasil-calisiyoruz artık aynı RDProcessPage ağacını render ediyor. Title/description
// production ile aynı; canonical ve og:url production route'u gösteriyor, robots noindex,nofollow.
// BreadcrumbList JSON-LD bilinçli olarak YOK (production'da var). Sitemap'e eklenmedi. Floating
// analiz tetikleyicisi yok — Hero ve Final CTA mevcut global AnalysisWidget'ı açıyor.
const TITLE = 'Nasıl Çalışıyoruz | GloventGlobal';
const DESCRIPTION =
  'GloventGlobal’in analiz, strateji, sistem kurulumu, operasyon, veri ve sürekli optimizasyon yaklaşımını keşfedin.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/nasil-calisiyoruz' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://gloventglobal.com/nasil-calisiyoruz',
    siteName: 'GloventGlobal',
    locale: 'tr_TR',
    type: 'website',
    images: [{ url: '/glovent-platform-hero.png', width: 1534, height: 1025, alt: 'GloventGlobal' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/glovent-platform-hero.png'],
  },
  robots: { index: false, follow: false },
};

export default function RedesignNasilCalisiyoruzPage() {
  return <RDProcessPage analyticsPrefix="redesign_" />;
}
