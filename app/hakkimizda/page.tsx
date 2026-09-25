import type { Metadata } from 'next';
import AboutContent from '@/components/about/AboutContent';
import JsonLd from '@/components/seo/JsonLd';

// Route kendi metadata'sını tanımlamadığı için root layout'un homepage title/description/canonical
// ("/") ve OG/Twitter değerlerini miras alıyordu. Next.js metadata'yı yüzeysel birleştirdiği için
// openGraph/twitter nesneleri burada tam tanımlanıyor (aksi halde root'taki image/siteName düşerdi).
const TITLE = 'Hakkımızda | GloventGlobal';
const DESCRIPTION =
  'GloventGlobal; strateji, ticaret, teknoloji, yapay zeka ve operasyonu birlikte çalışan global büyüme sistemlerine dönüştüren bir Global Growth Partner’dır.';
const URL = 'https://gloventglobal.com/hakkimizda';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/hakkimizda' },
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

export default function HakkimizdaPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://gloventglobal.com' },
            { '@type': 'ListItem', position: 2, name: 'Hakkımızda', item: 'https://gloventglobal.com/hakkimizda' },
          ],
        }}
      />
      <AboutContent />
    </>
  );
}