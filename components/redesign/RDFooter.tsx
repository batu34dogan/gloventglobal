import Link from 'next/link';

const NAV = [
  { label: 'Hizmetler', href: '#hizmetler' },
  { label: 'Projeler', href: '#hikayeler' },
  { label: 'Hakkımızda', href: '/hakkimizda' },
  { label: 'İletişim', href: '/iletisim' },
];

const RESOURCES = [{ label: 'Rehberler', href: '/rehberler' }];

const LEGAL = [
  { label: 'KVKK', href: '/kvkk' },
  { label: 'Gizlilik Politikası', href: '/gizlilik-politikasi' },
  { label: 'Çerez Politikası', href: '/cerez-politikasi' },
  { label: 'Kullanım Şartları', href: '/kullanim-sartlari' },
];

export default function RDFooter() {
  return (
    <footer className="border-t border-[#E5E5EC] bg-[#FAF9F6]">
      <div className="mx-auto max-w-[1400px] px-6 py-16 sm:px-10">
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.2fr_0.8fr_0.6fr_0.8fr_0.7fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#1B5CD6] text-[16px] font-black text-[#14213F]">G</div>
              <span className="text-[16.5px] font-bold text-[#14213F]">GloventGlobal</span>
            </div>
            <p className="mt-4 max-w-[32ch] text-[14.5px] leading-relaxed text-[#6A6A7A]">
              Türk markalarının global pazarlarda büyümesi için strateji, ticaret, teknoloji ve operasyon sistemini tek çatıda kuruyoruz.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] text-[#757580] uppercase">Navigasyon</p>
            <ul className="mt-4 space-y-2.5">
              {NAV.map(l => (
                <li key={l.label}>
                  <Link href={l.href} className="text-[14.5px] text-[#4A4A5A] transition-colors hover:text-[#1B5CD6]">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] text-[#757580] uppercase">Kaynaklar</p>
            <ul className="mt-4 space-y-2.5">
              {RESOURCES.map(l => (
                <li key={l.label}>
                  <Link href={l.href} className="text-[14.5px] text-[#4A4A5A] transition-colors hover:text-[#1B5CD6]">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] text-[#757580] uppercase">İletişim</p>
            <ul className="mt-4 space-y-2.5">
              <li><a href="mailto:info@gloventglobal.com" className="break-words text-[14.5px] text-[#4A4A5A] transition-colors hover:text-[#1B5CD6]">info@gloventglobal.com</a></li>
              <li><span className="text-[14.5px] text-[#4A4A5A]">İstanbul, Türkiye</span></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] text-[#757580] uppercase">Sosyal</p>
            <div className="mt-4 flex items-center gap-3">
              <a href="https://www.instagram.com/gloventglobal" target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E0E0E8] text-[11.5px] font-bold text-[#3A3A52] transition hover:border-[#1B5CD6] hover:text-[#1B5CD6]">ig</a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E0E0E8] text-[11.5px] font-bold text-[#3A3A52] transition hover:border-[#1B5CD6] hover:text-[#1B5CD6]">in</a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E0E0E8] text-[11.5px] font-bold text-[#3A3A52] transition hover:border-[#1B5CD6] hover:text-[#1B5CD6]">yt</a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[#E5E5EC] pt-7 sm:flex-row">
          <p className="text-[13px] text-[#71717D]">© {new Date().getFullYear()} GloventGlobal</p>
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {LEGAL.map(l => (
              <a key={l.label} href={l.href} className="text-[13px] text-[#71717D] transition-colors hover:text-[#1B5CD6]">{l.label}</a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
