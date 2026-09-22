import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import { organizationJsonLd } from '@/components/seo/organizationSchema';
import RDNavbar from '@/components/redesign/RDNavbar';
import RDHero from '@/components/redesign/RDHero';
import RDChannels from '@/components/redesign/RDChannels';
import RDServices from '@/components/redesign/RDServices';
import RDSystem from '@/components/redesign/RDSystem';
import RDCases from '@/components/redesign/RDCases';
import RDGuides from '@/components/redesign/RDGuides';
import RDWhy from '@/components/redesign/RDWhy';
import RDFooter from '@/components/redesign/RDFooter';
import RDAnalysisCTA from '@/components/redesign/RDAnalysisCTA';

export const metadata: Metadata = {
  title: 'GloventGlobal | Global Growth Partner',
  description:
    'GloventGlobal; strateji, global ticaret, teknoloji, yapay zeka ve operasyon sistemlerini bir araya getirerek markaların sürdürülebilir global büyüme altyapısını kurar.',
  // Bilinçli: bu preview, production ana sayfanın (/) nihai halini gösteriyor. Redesign
  // production'a alındığında bu route zaten / olacağı için canonical şimdiden / olarak
  // sabitleniyor — Next.js metadata inheritance (root layout'un alternates.canonical:"/"'i)
  // zaten aynı sonucu üretiyordu, burada yalnızca kodda açık/kalıcı hale getiriliyor.
  // robots noindex,nofollow ile birlikte olduğu için şu an herhangi bir indeksleme riski yok.
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
  // ÇOK ÖNEMLİ: /redesign yalnızca preview aşamasında. Bu ayar yalnızca redesign gerçekten
  // production / olduğunda kaldırılacak — bu görevde KALDIRILMADI, aynen korunuyor.
  robots: { index: false, follow: false },
};

export default function RedesignPage() {
  return (
    <div className="min-h-screen" style={{fontFamily:'var(--font-geist-sans),system-ui,sans-serif'}}>
      <JsonLd data={organizationJsonLd} />
      <RDNavbar />
      <main>
        <RDHero />
        <RDChannels />
        <RDServices />
        <RDSystem />
        <RDCases />
        <RDGuides />
        <RDWhy />
      </main>
      <RDFooter />
      <RDAnalysisCTA />
    </div>
  );
}