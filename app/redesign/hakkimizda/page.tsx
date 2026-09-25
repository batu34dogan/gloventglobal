import type { Metadata } from 'next';
import RDAboutPage from '@/components/redesign/about/RDAboutPage';

// PREVIEW — production /hakkimizda değil (production UI hâlâ AboutContent). Title/description
// production ile aynı; canonical ve og:url production route'u gösteriyor, robots noindex,nofollow.
// BreadcrumbList/AboutPage/Organization JSON-LD bilinçli olarak YOK (schema kararı production
// migration'da uygulanacak). Sitemap'e eklenmedi. Floating analiz tetikleyicisi yok.
const TITLE = 'Hakkımızda | GloventGlobal';
const DESCRIPTION =
  'GloventGlobal; strateji, ticaret, teknoloji, yapay zeka ve operasyonu birlikte çalışan global büyüme sistemlerine dönüştüren bir Global Growth Partner’dır.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/hakkimizda' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://gloventglobal.com/hakkimizda',
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

export default function RedesignHakkimizdaPage() {
  return <RDAboutPage analyticsPrefix="redesign_" />;
}
