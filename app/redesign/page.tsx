import type { Metadata } from 'next';
import RDNavbar from '@/components/redesign/RDNavbar';
import RDHero from '@/components/redesign/RDHero';
import RDChannels from '@/components/redesign/RDChannels';
import RDServices from '@/components/redesign/RDServices';
import RDCases from '@/components/redesign/RDCases';
import RDWhy from '@/components/redesign/RDWhy';
import RDFooter from '@/components/redesign/RDFooter';

export const metadata: Metadata = {
  title: 'GloventGlobal — Premium Redesign Preview',
  description: 'Design preview — not indexed.',
  robots: { index: false, follow: false },
};

export default function RedesignPage() {
  return (
    <div className="min-h-screen" style={{fontFamily:'var(--font-geist-sans),system-ui,sans-serif'}}>
      <RDNavbar />
      <main>
        <RDHero />
        <RDChannels />
        <RDServices />
        <RDCases />
        <RDWhy />
      </main>
      <RDFooter />
    </div>
  );
}