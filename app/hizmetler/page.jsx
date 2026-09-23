import ServicesContent from '@/components/services/ServicesContent';
import JsonLd from '@/components/seo/JsonLd';
import { serviceDetails } from '@/components/services/serviceDetailsData';

// Route kendi canonical/metadata'sını tanımlamazsa root layout'unkini (homepage) miras alıyordu —
// /hizmetler'in <link rel="canonical"> homepage'i göstermesine sebep olan bug buradan kaynaklanıyordu.
export const metadata = {
  title: 'Hizmetler | GloventGlobal',
  description:
    'GloventGlobal; markanızın hedeflerine göre strateji, teknoloji, yapay zeka, otomasyon, e-ticaret altyapısı, pazaryeri yönetimi ve dijital operasyon süreçlerini birlikte çalışan bir büyüme sistemi olarak kurgular.',
  alternates: {
    canonical: '/hizmetler',
  },
  openGraph: {
    title: 'Hizmetler | GloventGlobal',
    description:
      'GloventGlobal; markanızın hedeflerine göre strateji, teknoloji, yapay zeka, otomasyon, e-ticaret altyapısı, pazaryeri yönetimi ve dijital operasyon süreçlerini birlikte çalışan bir büyüme sistemi olarak kurgular.',
    url: 'https://gloventglobal.com/hizmetler',
  },
};

export default function HizmetlerPage() {
  const slugs = Object.keys(serviceDetails);

  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: slugs.map((slug, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: `https://gloventglobal.com/hizmetler/${slug}`,
              name: serviceDetails[slug].title,
            })),
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://gloventglobal.com' },
              { '@type': 'ListItem', position: 2, name: 'Hizmetler', item: 'https://gloventglobal.com/hizmetler' },
            ],
          },
        ]}
      />
      <ServicesContent />
    </>
  );
}