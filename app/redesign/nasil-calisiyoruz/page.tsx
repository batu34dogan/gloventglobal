import type { Metadata } from 'next';
import RDNavbar from '@/components/redesign/RDNavbar';
import RDFooter from '@/components/redesign/RDFooter';
import RDProcessHero from '@/components/redesign/process/RDProcessHero';
import RDProcessManifesto from '@/components/redesign/process/RDProcessManifesto';
import RDProcessJourney from '@/components/redesign/process/RDProcessJourney';
import RDProcessDataLoop from '@/components/redesign/process/RDProcessDataLoop';
import RDProcessAdaptiveSystem from '@/components/redesign/process/RDProcessAdaptiveSystem';
import RDProcessWorkModels from '@/components/redesign/process/RDProcessWorkModels';
import RDProcessProof from '@/components/redesign/process/RDProcessProof';
import RDProcessCTA from '@/components/redesign/process/RDProcessCTA';

// PREVIEW — production /nasil-calisiyoruz değil (production UI hâlâ ProcessContent). Title/description
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
  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-geist-sans),system-ui,sans-serif' }}>
      <RDNavbar />
      <main>
        <RDProcessHero />
        <RDProcessManifesto />
        <RDProcessJourney />
        <RDProcessDataLoop />
        <RDProcessAdaptiveSystem />
        <RDProcessWorkModels />
        <RDProcessProof />
        <RDProcessCTA />
      </main>
      <RDFooter />
    </div>
  );
}
