const navLinks = [
  { label: 'Hizmetler', href: '/hizmetler' },
  { label: 'Farkımız', href: '/#why' },
  { label: 'Süreç', href: '/#process' },
  { label: 'Sistem', href: '/#services' },
  { label: 'İletişim', href: '/#contact' },
];

// Intro (GloventIntro.tsx) "fixed inset-0 z-50" ile çalışıyor. SiteNavbar'a bilerek daha düşük bir
// z-index (z-40) veriliyor — intro açıkken navbar'ın arkasında kalır (görünmez), intro fade-out
// olurken doğal şekilde belirir. Bu sayede GloventIntro.tsx'e hiç dokunulmadan çakışma önleniyor.
export default function SiteNavbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
        <a href="/" className="text-sm font-semibold uppercase tracking-[0.25em] text-white">
          GloventGlobal
        </a>

        <div className="hidden items-center gap-8 sm:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-medium uppercase tracking-[0.15em] text-blue-100/75 transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}