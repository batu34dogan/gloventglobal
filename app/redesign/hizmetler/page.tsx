import type { Metadata } from 'next';
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

// Preview aşamasında — production /hizmetler değil. Description, production /hizmetler için az
// önce tanımlanan gerçek açıklamayla aynı; canonical bilerek gerçek production route'unu
// (/hizmetler) gösteriyor, robots noindex,nofollow ile de bu sayfanın index edilmesi engelleniyor.
// Sitemap'e (app/sitemap.ts) hiç eklenmedi.
export const metadata: Metadata = {
  title: 'Hizmetler | GloventGlobal',
  description:
    'GloventGlobal; markanızın hedeflerine göre strateji, teknoloji, yapay zeka, otomasyon, e-ticaret altyapısı, pazaryeri yönetimi ve dijital operasyon süreçlerini birlikte çalışan bir büyüme sistemi olarak kurgular.',
  alternates: {
    canonical: '/hizmetler',
  },
  robots: { index: false, follow: false },
};

export default function RedesignHizmetlerPage() {
  return (
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
  );
}
