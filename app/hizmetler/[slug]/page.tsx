import { notFound } from 'next/navigation';
import ServiceDetailContent from '@/components/services/ServiceDetailContent';
import { serviceDetails } from '@/components/services/serviceDetailsData';

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

  return <ServiceDetailContent slug={slug} />;
}