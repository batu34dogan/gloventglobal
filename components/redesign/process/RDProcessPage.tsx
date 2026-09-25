import RDNavbar from '@/components/redesign/RDNavbar';
import RDFooter from '@/components/redesign/RDFooter';
import RDProcessHero from './RDProcessHero';
import RDProcessManifesto from './RDProcessManifesto';
import RDProcessJourney from './RDProcessJourney';
import RDProcessDataLoop from './RDProcessDataLoop';
import RDProcessAdaptiveSystem from './RDProcessAdaptiveSystem';
import RDProcessWorkModels from './RDProcessWorkModels';
import RDProcessProof from './RDProcessProof';
import RDProcessCTA from './RDProcessCTA';

// "Nasıl Çalışıyoruz" ortak sayfa ağacı — production /nasil-calisiyoruz ve preview
// /redesign/nasil-calisiyoruz aynı component'i render eder. Metadata/JSON-LD route'lara aittir.
// analyticsPrefix: production'da '' (nasil_calisiyoruz_*), preview'de 'redesign_' — preview
// tıklamaları production verisine karışmasın.
export default function RDProcessPage({ analyticsPrefix = '' }: { analyticsPrefix?: string }) {
  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-geist-sans),system-ui,sans-serif' }}>
      <RDNavbar />
      <main>
        <RDProcessHero analyticsPrefix={analyticsPrefix} />
        <RDProcessManifesto />
        <RDProcessJourney />
        <RDProcessDataLoop />
        <RDProcessAdaptiveSystem />
        <RDProcessWorkModels />
        <RDProcessProof />
        <RDProcessCTA analyticsPrefix={analyticsPrefix} />
      </main>
      <RDFooter />
    </div>
  );
}
