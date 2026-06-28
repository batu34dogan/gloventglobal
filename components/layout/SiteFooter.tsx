const legalLinks = [
  { label: 'KVKK', href: '/kvkk' },
  { label: 'Gizlilik Politikası', href: '/gizlilik-politikasi' },
  { label: 'Çerez Politikası', href: '/cerez-politikasi' },
  { label: 'Kullanım Şartları', href: '/kullanim-sartlari' },
];

export default function SiteFooter() {
  return (
    <footer className="relative border-t border-white/[0.06] px-6 py-6 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-xs text-blue-100/40">© {new Date().getFullYear()} GloventGlobal</p>
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {legalLinks.map((link) => (
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