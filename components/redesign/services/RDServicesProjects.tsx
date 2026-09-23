import Image from 'next/image';
import Link from 'next/link';

// Kaynak: components/redesign/RDCases.tsx — aynı gerçek proje verisi (logo/oran/açıklama), ama
// marquee tekrar edilmiyor: hizmetlerle ilişkiyi daha net göstermek için 4 seçili proje, sade bir
// grid içinde. `system` alanı, projenin RDCases'teki gerçek capability etiketinin (örn. "Shopify ·
// Commerce Infrastructure") doğrudan karşılığı olan gerçek /hizmetler/[slug] sayfasına işaret
// ediyor — yeni proje/iddia/metrik uydurulmadı. GermaniaLeather ayrı eklenmedi (GLC ile aynı
// güncel marka), Boncukcu Amca eklenmedi.
const projects = [
  {
    brand: 'ASL Çanta',
    capability: 'Shopify · Commerce Infrastructure',
    desc: 'Geniş ürün kataloğu için ürün mimarisinden kullanıcı deneyimine uzanan modern e-ticaret ve dijital operasyon altyapısı.',
    tone: 'linear-gradient(160deg,#EFE9DD 0%,#E6DFD0 100%)',
    logo: '/redesign/logos/asl-canta.png',
    logoWidth: 2195,
    logoHeight: 944,
    logoMaxWidthPct: 46,
    system: { title: 'Shopify Commerce Sistemi', slug: 'shopify' },
  },
  {
    brand: 'BERD',
    capability: 'Amazon · Market Entry',
    desc: 'Türkiye’den global pazarlara açılma sürecinde pazaryeri, satış ve büyüme yapısının oluşturulması.',
    tone: 'linear-gradient(160deg,#E4E6EA 0%,#D8DBE1 100%)',
    logo: '/redesign/logos/berd.png',
    logoWidth: 1720,
    logoHeight: 849,
    logoMaxWidthPct: 58,
    system: { title: 'Amazon Global Satış Sistemi', slug: 'amazon' },
  },
  {
    brand: 'Ziynet Bijüteri',
    capability: 'B2B · Digital Showroom',
    desc: 'Türkiye’den global alıcılara ulaşmayı destekleyen dijital B2B satış ve marka sunum yapısı.',
    tone: 'linear-gradient(160deg,#E7EAED 0%,#DCE0E5 100%)',
    logo: '/redesign/logos/ziynet-bijuteri.png',
    logoWidth: 1691,
    logoHeight: 793,
    logoMaxWidthPct: 56,
    system: { title: 'B2B Dijital Showroom', slug: 'b2b-dijital-showroom' },
  },
  {
    brand: 'RituelCo',
    capability: 'Etsy · Commerce',
    desc: 'Global dijital müşterilere ulaşmak için Etsy odaklı satış ve commerce yapısı.',
    tone: 'linear-gradient(160deg,#F0ECE3 0%,#E7E1D3 100%)',
    logo: '/redesign/logos/rituelco.png',
    logoWidth: 1692,
    logoHeight: 1689,
    logoMaxWidthPct: 46,
    system: { title: 'Etsy Marka Sistemi', slug: 'etsy' },
  },
];

export default function RDServicesProjects() {
  return (
    <section className="border-t border-[#E5E5EC] bg-[#FAF9F6] py-16 sm:py-20">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="max-w-[48ch]">
          <p className="text-[11.5px] font-bold tracking-[0.26em] text-[#1B5CD6] uppercase">Gerçek Uygulamalar</p>
          <h2 className="mt-3 text-[2.2rem] font-extrabold leading-tight tracking-tight text-[#14213F] sm:text-[2.7rem]">
            Hizmetten Çalışan Sisteme.
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((p) => (
            <article key={p.brand} className="rounded-2xl border border-[#E5E5EC] bg-white p-5">
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                <div aria-hidden="true" className="absolute inset-0" style={{ background: p.tone }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={p.logo}
                    alt={`${p.brand} logosu`}
                    width={p.logoWidth}
                    height={p.logoHeight}
                    sizes="(min-width: 1024px) 260px, 45vw"
                    className="h-auto w-auto object-contain"
                    style={{ maxWidth: `${p.logoMaxWidthPct}%`, maxHeight: '70%' }}
                  />
                </div>
                <div aria-hidden="true" className="absolute inset-0 ring-1 ring-inset ring-black/5" />
              </div>
              <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.1em] text-[#1B5CD6]">{p.capability}</p>
              <h3 className="mt-1.5 text-[15.5px] font-bold text-[#14213F]">{p.brand}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[#6A6A7A]">{p.desc}</p>
              <Link
                href={`/hizmetler/${p.system.slug}`}
                className="mt-3 inline-flex items-center gap-1 border-t border-[#E5E5EC] pt-3 text-[12px] font-semibold text-[#8A6E43] transition-colors hover:text-[#1B5CD6]"
              >
                Uygulanan sistem: {p.system.title} →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
