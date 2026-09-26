import type { Metadata } from 'next';
import RDAnalysisPage from '@/components/redesign/analysis/RDAnalysisPage';
import { ANALYSIS_DESCRIPTION, ANALYSIS_TITLE, ANALYSIS_URL } from '@/components/redesign/analysis/analysisPageData';

// PREVIEW — production /analiz değil (production UI hâlâ eski AnalysisContent). Title/description
// production ile aynı; canonical ve og:url production route'u gösteriyor, robots noindex,nofollow.
// JSON-LD bilinçli olarak YOK (production migration'da WebPage + BreadcrumbList). Sitemap'e eklenmedi.
// Floating analiz tetikleyicisi yok (AnalysisWidget /redesign/* altında gizli). Gönderimler
// /api/analysis-lead'de pageUrl'e göre "analysis-page-preview" leadSource'u alır.
export const metadata: Metadata = {
  title: ANALYSIS_TITLE,
  description: ANALYSIS_DESCRIPTION,
  alternates: { canonical: '/analiz' },
  openGraph: {
    title: ANALYSIS_TITLE,
    description: ANALYSIS_DESCRIPTION,
    url: ANALYSIS_URL,
    siteName: 'GloventGlobal',
    locale: 'tr_TR',
    type: 'website',
    images: [{ url: '/glovent-platform-hero.png', width: 1534, height: 1025, alt: 'GloventGlobal' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: ANALYSIS_TITLE,
    description: ANALYSIS_DESCRIPTION,
    images: ['/glovent-platform-hero.png'],
  },
  robots: { index: false, follow: false },
};

export default function RedesignAnalizPage() {
  return <RDAnalysisPage analyticsPrefix="redesign_" />;
}
