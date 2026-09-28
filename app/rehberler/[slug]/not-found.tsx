import type { Metadata } from 'next';
import RDNotFound from '@/components/redesign/RDNotFound';

// Geçersiz /rehberler/[slug] → notFound(). Bu segment kendi markalı 404'ünü (RDNotFound) render eder.
// HTTP 404 + noindex Next.js tarafından verilir; geçerli rehber sayfaları bu dosyadan etkilenmez.
// Root layout'un title/OG değerleri 404'e miras kalmasın.
export const metadata: Metadata = {
  title: 'Rehber Bulunamadı | GloventGlobal',
  alternates: { canonical: null },
  openGraph: null,
  twitter: null,
  robots: { index: false, follow: false },
};

export default function GuideNotFound() {
  return (
    <RDNotFound
      eyebrow="Rehberler"
      title="Bu Rehberi Bulamadık."
      text="Aradığınız rehber kaldırılmış, taşınmış veya adresi değişmiş olabilir."
      primary={{ href: '/rehberler', label: 'Tüm Rehberlere Dön' }}
      secondary={{ href: '/', label: 'Ana Sayfaya Git' }}
    />
  );
}
