import RDNavbar from '@/components/redesign/RDNavbar';
import RDFooter from '@/components/redesign/RDFooter';
import RDAboutHero from './RDAboutHero';
import RDAboutStory from './RDAboutStory';
import RDAboutWho from './RDAboutWho';
import RDAboutCapabilities from './RDAboutCapabilities';
import RDAboutPrinciples from './RDAboutPrinciples';
import RDAboutBridge from './RDAboutBridge';
import RDAboutToday from './RDAboutToday';
import RDAboutAudience from './RDAboutAudience';
import RDAboutCTA from './RDAboutCTA';

// "Hakkımızda" ortak sayfa ağacı — şu an preview /redesign/hakkimizda, production migration'da
// /hakkimizda da aynı component'i render edecek. Metadata/JSON-LD route'lara aittir.
// analyticsPrefix: preview'de 'redesign_' (redesign_hakkimizda_*), production'da ''.
export default function RDAboutPage({ analyticsPrefix = '' }: { analyticsPrefix?: string }) {
  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-geist-sans),system-ui,sans-serif' }}>
      <RDNavbar />
      <main>
        <RDAboutHero analyticsPrefix={analyticsPrefix} />
        <RDAboutStory />
        <RDAboutWho />
        <RDAboutCapabilities />
        <RDAboutPrinciples />
        <RDAboutBridge />
        <RDAboutToday />
        <RDAboutAudience />
        <RDAboutCTA analyticsPrefix={analyticsPrefix} />
      </main>
      <RDFooter />
    </div>
  );
}
