import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import { organizationJsonLd } from '@/components/seo/organizationSchema';
import RDNavbar from '@/components/redesign/RDNavbar';
import RDHero from '@/components/redesign/RDHero';
import RDChannels from '@/components/redesign/RDChannels';
import RDServices from '@/components/redesign/RDServices';
import RDSystem from '@/components/redesign/RDSystem';
import RDAudiences from '@/components/redesign/RDAudiences';
import RDCases from '@/components/redesign/RDCases';
import RDGuides from '@/components/redesign/RDGuides';
import RDWhy from '@/components/redesign/RDWhy';
import RDFooter from '@/components/redesign/RDFooter';
import RDAnalysisCTA from '@/components/redesign/RDAnalysisCTA';

export const metadata: Metadata = {
  title: 'GloventGlobal | Global Growth Partner',
  description:
    'GloventGlobal; strateji, global ticaret, teknoloji, yapay zeka ve operasyon sistemlerini bir araya getirerek markaların sürdürülebilir global büyüme altyapısını kurar.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'GloventGlobal | Global Growth Partner',
    description:
      'GloventGlobal; strateji, global ticaret, teknoloji, yapay zeka ve operasyon sistemlerini bir araya getirerek markaların sürdürülebilir global büyüme altyapısını kurar.',
    url: 'https://gloventglobal.com',
    siteName: 'GloventGlobal',
    locale: 'tr_TR',
    type: 'website',
    images: [
      {
        url: '/glovent-platform-hero.png',
        width: 1534,
        height: 1025,
        alt: 'GloventGlobal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GloventGlobal | Global Growth Partner',
    description:
      'GloventGlobal; strateji, global ticaret, teknoloji, yapay zeka ve operasyon sistemlerini bir araya getirerek markaların sürdürülebilir global büyüme altyapısını kurar.',
    images: ['/glovent-platform-hero.png'],
  },
  // Bilinçli: robots override YOK — production ana sayfa index,follow olan global varsayılan
  // davranışı kullanır. /redesign'deki noindex,nofollow buraya kesinlikle taşınmadı.
};

export default function Home() {
  return (
    <div className="min-h-screen" style={{fontFamily:'var(--font-geist-sans),system-ui,sans-serif'}}>
      <JsonLd data={organizationJsonLd} />
      <RDNavbar />
      <main>
        <RDHero />
        <RDChannels />
        <RDServices />
        <RDSystem />
        <RDAudiences />
        <RDCases />
        <RDGuides />
        <RDWhy />
      </main>
      <RDFooter />
      <RDAnalysisCTA />
    </div>
  );
}
