import { notFound } from 'next/navigation';
import ServiceDetailContent from '@/components/services/ServiceDetailContent';
import { serviceDetails } from '@/components/services/serviceDetailsData';
import JsonLd from '@/components/seo/JsonLd';

// Şu an veri objesinde sadece "etsy" var. Object.keys kullanmak (sabit bir dizi yazmak yerine)
// her yeni hizmet eklendiğinde bu dosyaya dokunma ihtiyacını ortadan kaldırıyor — yeni hizmet =
// sadece ServiceDetailContent.tsx'teki veri objesine yeni bir key eklemek.
export function generateStaticParams() {
  return Object.keys(serviceDetails).map((slug) => ({ slug }));
}

export default async function HizmetDetayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!serviceDetails[slug]) {
    notFound();
  }

  const service = serviceDetails[slug];
  const url = `https://gloventglobal.com/hizmetler/${slug}`;

  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: service.title,
            description: service.description,
            provider: { '@type': 'Organization', name: 'GloventGlobal', url: 'https://gloventglobal.com' },
            areaServed: ['Global', 'Türkiye'],
            url,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://gloventglobal.com' },
              { '@type': 'ListItem', position: 2, name: 'Hizmetler', item: 'https://gloventglobal.com/hizmetler' },
              { '@type': 'ListItem', position: 3, name: service.title, item: url },
            ],
          },
        ]}
      />
      <ServiceDetailContent slug={slug} />
    </>
  );
}