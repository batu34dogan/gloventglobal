import type { Metadata } from 'next';
import RDProcessPage from '@/components/redesign/process/RDProcessPage';
import JsonLd from '@/components/seo/JsonLd';

// Route kendi metadata'sını tanımlamadığı için root layout'un homepage title/description/canonical
// ("/") ve OG/Twitter değerlerini miras alıyordu. Next.js metadata'yı yüzeysel birleştirdiği için
// openGraph/twitter nesneleri burada tam tanımlanıyor (aksi halde root'taki image/siteName düşerdi).
const TITLE = 'Nasıl Çalışıyoruz | GloventGlobal';
const DESCRIPTION =
  'GloventGlobal’in analiz, strateji, sistem kurulumu, operasyon, veri ve sürekli optimizasyon yaklaşımını keşfedin.';
const URL = 'https://gloventglobal.com/nasil-calisiyoruz';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/nasil-calisiyoruz' },
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

export default function NasilCalisiyoruzPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://gloventglobal.com' },
            { '@type': 'ListItem', position: 2, name: 'Nasıl Çalışıyoruz', item: 'https://gloventglobal.com/nasil-calisiyoruz' },
          ],
        }}
      />
      {/* Onaylanan redesign (preview /redesign/nasil-calisiyoruz ile aynı ağaç). Metadata ve BreadcrumbList
          yukarıda aynen korunuyor; robots index,follow — preview'deki noindex,nofollow buraya taşınmadı.
          Eski ProcessContent rollback/referans için repoda duruyor, burada artık render edilmiyor. */}
      <RDProcessPage />
    </>
  );
}