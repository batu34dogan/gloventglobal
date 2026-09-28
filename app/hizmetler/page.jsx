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

// Route-specific metadata tam tanımlı: Next.js metadata'yı yüzeysel birleştirdiği için openGraph/twitter
// eksik kalırsa root (ana sayfa) değerleri miras alınıyordu (Twitter başlığı/açıklaması, og:image).
// Açıklama sayfanın kendi hero metninden, ≤160 karakter.
const TITLE = 'Hizmetler | GloventGlobal';
const DESCRIPTION =
  'Stratejiden satış kanallarına, teknolojiden operasyona kadar markanızın ihtiyaç duyduğu yapıyı birlikte çalışan bir global büyüme sistemi olarak kuruyoruz.';
const URL = 'https://gloventglobal.com/hizmetler';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/hizmetler' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: 'GloventGlobal',
    locale: 'tr_TR',
    type: 'website',
    images: [{ url: '/glovent-platform-hero.png', width: 1534, height: 1025, alt: 'GloventGlobal' }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: ['/glovent-platform-hero.png'] },
  robots: { index: true, follow: true },
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
      {/* Onaylanan /redesign/hizmetler UI'ı — section sırası preview ile birebir.
          /redesign/hizmetler'deki noindex,nofollow buraya taşınmadı; robots açıkça index,follow. */}
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
