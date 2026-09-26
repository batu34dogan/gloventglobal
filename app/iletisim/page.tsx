import type { Metadata } from 'next';
import RDContactPage from '@/components/redesign/contact/RDContactPage';
import JsonLd from '@/components/seo/JsonLd';

// Route kendi metadata'sını tanımlamadığı için root layout'un homepage title/description/canonical
// ("/") ve OG/Twitter değerlerini miras alıyordu. Next.js metadata'yı yüzeysel birleştirdiği için
// openGraph/twitter nesneleri burada tam tanımlanıyor (aksi halde root'taki image/siteName düşerdi).
const TITLE = 'İletişim | GloventGlobal';
const DESCRIPTION =
  'GloventGlobal ile global büyüme, e-ticaret, teknoloji, yapay zeka ve operasyon projeleriniz hakkında iletişime geçin.';
const URL = 'https://gloventglobal.com/iletisim';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/iletisim' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
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
  robots: { index: true, follow: true },
};

export default function IletisimPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'GloventGlobal İletişim',
            url: 'https://gloventglobal.com/iletisim',
            description: DESCRIPTION,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://gloventglobal.com' },
              { '@type': 'ListItem', position: 2, name: 'İletişim', item: 'https://gloventglobal.com/iletisim' },
            ],
          },
        ]}
      />
      {/* Onaylanan redesign (preview /redesign/iletisim ile aynı RDContactPage ağacı): Ücretsiz Analiz
          (mevcut AnalysisWidget) + Doğrudan İletişim formu (/api/contact-lead). Metadata yukarıda aynen
          korunuyor; robots index,follow. Eski ContactContent (analiz quiz kopyası) rollback/referans için
          repoda duruyor, burada artık render edilmiyor. */}
      <RDContactPage />
    </>
  );
}
