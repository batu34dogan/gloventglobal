import type { Metadata } from 'next';
import RDAnalysisPage from '@/components/redesign/analysis/RDAnalysisPage';
import JsonLd from '@/components/seo/JsonLd';
import { ANALYSIS_DESCRIPTION, ANALYSIS_TITLE, ANALYSIS_URL } from '@/components/redesign/analysis/analysisPageData';

// Route kendi canonical/OG/Twitter değerlerini tanımlamadığı için root layout'un homepage değerlerini
// ("/") miras alıyordu. Next.js metadata'yı yüzeysel birleştirdiği için openGraph/twitter tam tanımlı.
// Metadata SEO hotfix ile aynı; preview (/redesign/analiz) noindex ayarı buraya taşınmıyor.
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
  robots: { index: true, follow: true },
};

export default function AnalizPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: ANALYSIS_TITLE,
            url: ANALYSIS_URL,
            description: ANALYSIS_DESCRIPTION,
            inLanguage: 'tr-TR',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://gloventglobal.com' },
              { '@type': 'ListItem', position: 2, name: 'Ücretsiz Global Büyüme Analizi', item: ANALYSIS_URL },
            ],
          },
        ]}
      />
      {/* Onaylanan redesign (preview /redesign/analiz ile aynı RDAnalysisPage ağacı): paylaşılan
          AnalysisFlow variant="page", leadSource "analysis-page", analytics öneksiz. Metadata yukarıda;
          robots index,follow. Eski koyu AnalysisContent rollback/referans için repoda duruyor, burada
          artık render edilmiyor. */}
      <RDAnalysisPage />
    </>
  );
}
