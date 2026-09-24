import JsonLd from '@/components/seo/JsonLd';
import { serviceDetails } from '@/components/services/serviceDetailsData';
import RDNavbar from '@/components/redesign/RDNavbar';
import RDFooter from '@/components/redesign/RDFooter';
import RDServicesHero from '@/components/redesign/services/RDServicesHero';
import RDServicesPillars from '@/components/redesign/services/RDServicesPillars';
import RDServicesAILayer from '@/components/redesign/services/RDServicesAILayer';
import RDServicesDirectory from '@/components/redesign/services/RDServicesDirectory';
import RDServicesAudience from '@/components/redesign/services/RDServicesAudience';
import RDServicesProjects from '@/components/redesign/services/RDServicesProjects';
import RDServicesWorkModel from '@/components/redesign/services/RDServicesWorkModel';
import RDServicesFinalCTA from '@/components/redesign/services/RDServicesFinalCTA';

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
      {/* Onaylanan /redesign/hizmetler UI'ı — section sırası preview ile birebir. Eski
          ServicesContent rollback/referans için repoda duruyor, burada artık render edilmiyor.
          Global SiteNavbar/SiteFooter/floating analiz butonu bu route'ta pathname ile gizleniyor.
          Bilinçli: robots override YOK — /redesign/hizmetler'deki noindex,nofollow buraya taşınmadı. */}
      <div className="min-h-screen" style={{ fontFamily: 'var(--font-geist-sans),system-ui,sans-serif' }}>
        <RDNavbar />
        <main>
          <RDServicesHero />
          <RDServicesPillars />
          <RDServicesAILayer />
          <RDServicesDirectory />
          <RDServicesAudience />
          <RDServicesProjects />
          <RDServicesWorkModel />
          <RDServicesFinalCTA />
        </main>
        <RDFooter />
      </div>
    </>
  );
}
