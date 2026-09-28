import type { Metadata } from 'next';
import RDNotFound from '@/components/redesign/RDNotFound';

// Geçersiz /hizmetler/[slug] → notFound(). /hizmetler/* altında eski SiteNavbar/SiteFooter gizli olduğu
// için bu segment kendi markalı 404'ünü render eder. HTTP 404 + noindex Next.js tarafından verilir;
// geçerli 12 hizmet sayfası bu dosyadan etkilenmez. Root title/OG değerleri 404'e miras kalmasın.
export const metadata: Metadata = {
  title: 'Hizmet Bulunamadı | GloventGlobal',
  alternates: { canonical: null },
  openGraph: null,
  twitter: null,
  robots: { index: false, follow: false },
};

export default function ServiceNotFound() {
  return (
    <RDNotFound
      eyebrow="Hizmetler"
      title="Bu Hizmeti Bulamadık."
      text="Aradığınız hizmet kaldırılmış, taşınmış veya adresi değişmiş olabilir."
      primary={{ href: '/hizmetler', label: 'Tüm Hizmetlere Dön' }}
      secondary={{ href: '/', label: 'Ana Sayfaya Git' }}
    />
  );
}
