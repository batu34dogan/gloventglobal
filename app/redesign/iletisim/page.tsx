import type { Metadata } from 'next';
import RDContactPage from '@/components/redesign/contact/RDContactPage';

// PREVIEW — production /iletisim değil (production UI hâlâ eski ContactContent quiz'i). Title/description
// production ile aynı; canonical ve og:url production route'u gösteriyor, robots noindex,nofollow.
// ContactPage/BreadcrumbList JSON-LD bilinçli olarak YOK (production'da var). Sitemap'e eklenmedi.
// Floating analiz tetikleyicisi yok (AnalysisWidget /redesign/* altında gizli) — analiz yolu sayfa içinde.
// Form gönderimleri /api/contact-lead'de pageUrl'e göre leadSource "contact-page-preview" alır.
const TITLE = 'İletişim | GloventGlobal';
const DESCRIPTION =
  'GloventGlobal ile global büyüme, e-ticaret, teknoloji, yapay zeka ve operasyon projeleriniz hakkında iletişime geçin.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/iletisim' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://gloventglobal.com/iletisim',
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

export default function RedesignIletisimPage() {
  return <RDContactPage analyticsPrefix="redesign_" />;
}
