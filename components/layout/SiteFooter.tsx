'use client';

import { usePathname } from 'next/navigation';

const siteLinks = [{ label: 'Rehberler', href: '/rehberler' }];

const legalLinks = [
  { label: 'KVKK', href: '/kvkk' },
  { label: 'Gizlilik Politikası', href: '/gizlilik-politikasi' },
  { label: 'Çerez Politikası', href: '/cerez-politikasi' },
  { label: 'Kullanım Şartları', href: '/kullanim-sartlari' },
];

export default function SiteFooter() {
  const pathname = usePathname();

  // Yeni production ana sayfa (/) artık kendi RDFooter'ını render ediyor — eski global footer
  // orada ikinci kez görünmesin. /redesign (rollback/preview amaçlı hâlâ ayakta) da aynı sebeple
  // hariç tutuluyor. Diğer tüm route'larda eski footer davranışı birebir korunuyor.
  // /hizmetler overview ve /hizmetler/[slug] detay sayfaları da artık kendi RDNavbar/RDFooter'ını render ediyor.
  // /nasil-calisiyoruz (tam eşleşme) da artık kendi RDNavbar/RDFooter'ını render ediyor.
  if (pathname === '/' || pathname === '/hizmetler' || pathname?.startsWith('/hizmetler/') || pathname === '/nasil-calisiyoruz' || pathname?.startsWith('/redesign')) return null;

  return (
    <footer className="relative border-t border-white/[0.06] px-6 py-6 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-xs text-blue-100/40">© {new Date().getFullYear()} GloventGlobal</p>
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {[...siteLinks, ...legalLinks].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs text-blue-100/50 transition-colors duration-200 hover:text-blue-200"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}