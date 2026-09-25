import type { Metadata } from 'next';
import DifferenceContent from '@/components/difference/DifferenceContent';
import JsonLd from '@/components/seo/JsonLd';

// Geçici SEO hotfix — route root layout'un homepage metadata/canonical ("/") değerlerini miras
// alıyordu. /farkimiz ileride /hakkimizda#prensipler'e kalıcı yönlendirilecek; o zamana kadar
// kendi URL'sine canonical veriyor. Açıklama sayfanın kendi Hero metninden türetildi.
const TITLE = 'Farkımız | GloventGlobal';
const DESCRIPTION =
  'GloventGlobal’in strateji, teknoloji, yapay zeka, otomasyon ve operasyonu ayrı hizmetler olarak değil, tek bir büyüme sisteminin parçaları olarak ele alan çalışma yaklaşımını keşfedin.';
const URL = 'https://gloventglobal.com/farkimiz';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/farkimiz' },
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

export default function FarkimizPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://gloventglobal.com' },
            { '@type': 'ListItem', position: 2, name: 'Farkımız', item: 'https://gloventglobal.com/farkimiz' },
          ],
        }}
      />
      <DifferenceContent />
    </>
  );
}