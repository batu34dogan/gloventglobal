import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { focusRing } from '@/components/redesign/service-detail/RDServiceDetailPrimitives';
import { CookiePreferencesButton, FooterAnalysisButton } from './RDFooterActions';

const EXPLORE = [
  { label: 'Hizmetler', href: '/hizmetler' },
  { label: 'Nasıl Çalışıyoruz', href: '/nasil-calisiyoruz' },
  { label: 'Projeler', href: '/#hikayeler' },
  { label: 'Hakkımızda', href: '/hakkimizda' },
];

const LEGAL = [
  { label: 'KVKK', href: '/kvkk' },
  { label: 'Gizlilik Politikası', href: '/gizlilik-politikasi' },
  { label: 'Çerez Politikası', href: '/cerez-politikasi' },
  { label: 'Kullanım Şartları', href: '/kullanim-sartlari' },
];

// Yalnızca doğrulanmış hesaplar. LinkedIn kişisel profildir (şirket sayfası değil) — adı buna göre.
const SOCIALS: { label: string; title: string; href: string; icon: ReactNode }[] = [
  {
    label: 'GloventGlobal Instagram',
    title: 'Instagram — @gloventglobal',
    href: 'https://www.instagram.com/gloventglobal',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'GloventGlobal X',
    title: 'X — @GloventGlobal',
    href: 'https://x.com/gloventglobal',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
        <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78L17.75 3Zm-1.08 16.18h1.7L7.4 4.73H5.58l11.09 14.45Z" />
      </svg>
    ),
  },
  {
    label: 'Batuhan Doğan LinkedIn',
    title: 'LinkedIn — Batuhan Doğan (kişisel profil)',
    href: 'https://www.linkedin.com/in/batuhandoganai/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.83v1.54h.05c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.13V21h-4v-4.99c0-1.19-.02-2.72-1.66-2.72-1.66 0-1.91 1.3-1.91 2.63V21h-4V9.75Z" />
      </svg>
    ),
  },
];

// Mobilde en az 44px dokunma alanı; masaüstünde daha sıkı satır aralığı.
const linkCls = `inline-flex min-h-[44px] items-center rounded text-[15px] text-[#4A4A5A] transition-colors hover:text-[#1B5CD6] sm:min-h-[36px] sm:text-[14.5px] ${focusRing}`;
const headCls = 'text-[12px] font-bold uppercase tracking-[0.18em] text-[#6F6F79]';
const legalCls = `inline-flex min-h-[44px] items-center rounded text-[13.5px] text-[#6A6A7A] transition-colors hover:text-[#1B5CD6] sm:min-h-[32px] sm:text-[13px] ${focusRing}`;

export default function RDFooter() {
  return (
    // data-site-footer: sabit "Ücretsiz Analiz" butonu (RDAnalysisCTA) footer görünürken gizlenir.
    <footer data-site-footer className="border-t border-[#E5E5EC] bg-[#FAF9F6]">
      <div className="mx-auto max-w-[1400px] px-6 pb-8 pt-12 sm:px-10 sm:pt-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-9 md:grid-cols-[1.5fr_1fr_1fr_1.2fr] md:gap-x-10 lg:gap-x-14">
          {/* Marka */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className={`inline-flex rounded-md ${focusRing}`}>
              <Image
                src="/redesign/gloventglobal-logo-full.svg"
                alt="GloventGlobal"
                width={1454}
                height={717}
                className="h-[56px] w-auto sm:h-[62px]"
              />
            </Link>
            <p className="mt-3 max-w-[34ch] text-[14.5px] leading-relaxed text-[#6A6A7A]">
              Türk markalarının global pazarlarda büyümesi için strateji, ticaret, teknoloji ve operasyon sistemini tek çatıda kuruyoruz.
            </p>
          </div>

          {/* Keşfet */}
          <nav aria-label="Keşfet">
            <p className={headCls}>Keşfet</p>
            <ul className="mt-2 sm:mt-3 sm:space-y-1">
              {EXPLORE.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={linkCls}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Kaynaklar */}
          <nav aria-label="Kaynaklar">
            <p className={headCls}>Kaynaklar</p>
            <ul className="mt-2 sm:mt-3 sm:space-y-1">
              <li>
                <Link href="/rehberler" className={linkCls}>Rehberler</Link>
              </li>
              <li>
                <FooterAnalysisButton className={`${linkCls} text-left`} />
              </li>
            </ul>
          </nav>

          {/* İletişim + sosyal */}
          <div className="col-span-2 md:col-span-1">
            <p className={headCls}>İletişim</p>
            <ul className="mt-2 sm:mt-3 sm:space-y-1">
              <li>
                <a href="mailto:info@gloventglobal.com" className={`${linkCls} break-all`}>info@gloventglobal.com</a>
              </li>
              <li className="flex min-h-[44px] items-center text-[15px] text-[#4A4A5A] sm:min-h-[36px] sm:text-[14.5px]">İstanbul, Türkiye</li>
            </ul>
            <ul className="mt-3 flex items-center gap-2.5" aria-label="Sosyal medya">
              {SOCIALS.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} (yeni sekmede açılır)`}
                    title={s.title}
                    className={`flex h-11 w-11 items-center justify-center rounded-full border border-[#DCDCE4] text-[#3A3A52] transition-colors hover:border-[#1B5CD6] hover:text-[#1B5CD6] ${focusRing}`}
                  >
                    <span aria-hidden="true">{s.icon}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Alt satır */}
        <div className="mt-10 flex flex-col gap-3 border-t border-[#E5E5EC] pt-5 sm:mt-14 sm:flex-row sm:items-center sm:justify-between sm:pt-6">
          <p className="text-[13px] text-[#6A6A7A]">© {new Date().getFullYear()} GloventGlobal</p>
          <nav aria-label="Yasal">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-0 sm:justify-end">
              {LEGAL.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={legalCls}>{l.label}</Link>
                </li>
              ))}
              <li>
                <CookiePreferencesButton className={legalCls} />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
