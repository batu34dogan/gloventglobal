import type { Metadata } from 'next';
import RDNotFound from '@/components/redesign/RDNotFound';

// Genel 404 — yeni tasarım sistemiyle (RDNavbar/RDFooter, warm ivory). Metin önceki 404'ten korunuyor.
// Canonical/OG bilinçli olarak yok: 404'e ana sayfa canonical'ı verilmez; noindex + HTTP 404 Next.js'ten.
export const metadata: Metadata = {
  title: 'Sayfa Bulunamadı | GloventGlobal',
  description: 'Aradığınız sayfa bulunamadı. GloventGlobal hizmetleri ve rehberleri üzerinden devam edin.',
  alternates: { canonical: null },
  openGraph: null,
  twitter: null,
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <RDNotFound
      eyebrow="404"
      title="Aradığınız sayfa bulunamadı."
      text="Bu sayfa taşınmış, kaldırılmış veya hatalı bir bağlantı üzerinden açılmış olabilir. GloventGlobal sistemlerini inceleyerek devam edebilirsiniz."
      primary={{ href: '/', label: 'Ana Sayfaya Dön' }}
      secondary={{ href: '/hizmetler', label: 'Hizmetleri İncele' }}
    />
  );
}
