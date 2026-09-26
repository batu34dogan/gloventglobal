import RDNavbar from '@/components/redesign/RDNavbar';
import RDFooter from '@/components/redesign/RDFooter';
import { sectionShell } from '@/components/redesign/service-detail/RDServiceDetailPrimitives';
import RDContactIntro from './RDContactIntro';
import RDContactForm from './RDContactForm';
import RDContactFacts from './RDContactFacts';
import { CONTACT_FORM_ID } from './contactData';

// "İletişim" ortak sayfa ağacı — şu an preview /redesign/iletisim; production migration'da /iletisim
// da aynı component'i render edecek. Metadata/JSON-LD route'lara aittir. Kısa, görev odaklı:
// Hero + iki niyet → form + doğrudan iletişim paneli.
export default function RDContactPage({ analyticsPrefix = '' }: { analyticsPrefix?: string }) {
  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-geist-sans),system-ui,sans-serif' }}>
      <RDNavbar />
      <main>
        <RDContactIntro analyticsPrefix={analyticsPrefix} />
        <section id={CONTACT_FORM_ID} aria-labelledby="ct-form-title" className="scroll-mt-20 border-t border-[#E5E5EC] bg-[#FAF9F6] py-14 sm:py-20">
          <div className={sectionShell}>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#1B5CD6]">Doğrudan İletişim</p>
            <h2 id="ct-form-title" className="mt-3 text-[1.9rem] font-extrabold leading-[1.1] tracking-tight text-[#14213F] sm:text-[2.4rem]">
              Mesajınızı Bize İletin.
            </h2>
            <div className="mt-8 grid items-start gap-5 lg:mt-10 lg:grid-cols-[1.55fr_0.8fr] lg:gap-8">
              <RDContactForm analyticsPrefix={analyticsPrefix} />
              <RDContactFacts />
            </div>
          </div>
        </section>
      </main>
      <RDFooter />
    </div>
  );
}
