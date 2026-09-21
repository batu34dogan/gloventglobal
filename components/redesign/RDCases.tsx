type Project = {
  brand: string;
  category: string;
  capability: string;
  desc: string;
  tone: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    brand: 'ASL Çanta',
    category: 'E-Commerce',
    capability: 'Shopify · Commerce Infrastructure · UX',
    desc: 'Geniş ürün kataloğu için ürün mimarisinden kullanıcı deneyimine uzanan modern e-ticaret ve dijital operasyon altyapısı.',
    tone: 'linear-gradient(160deg,#EFE9DD 0%,#E6DFD0 100%)',
    featured: true,
  },
  {
    brand: 'BERD',
    category: 'Global Commerce',
    capability: 'Amazon · Market Entry · Growth',
    desc: 'Türkiye’den global pazarlara açılma sürecinde pazaryeri, satış ve büyüme yapısının oluşturulması.',
    tone: 'linear-gradient(160deg,#E4E6EA 0%,#D8DBE1 100%)',
    featured: true,
  },
  {
    brand: 'Güvenli Adımlar',
    category: 'Amazon',
    capability: 'Amazon · Listing · Marketplace Operations',
    desc: 'Amazon satış operasyonunun ürün konumlandırması, listeleme ve pazaryeri süreçleriyle yapılandırılması.',
    tone: 'linear-gradient(160deg,#EDEBE6 0%,#E3E0D8 100%)',
  },
  {
    brand: 'Ziynet Bijüteri',
    category: 'B2B',
    capability: 'B2B · Digital Showroom · Global',
    desc: 'Türkiye’den global alıcılara ulaşmayı destekleyen dijital B2B satış ve marka sunum yapısı.',
    tone: 'linear-gradient(160deg,#E7EAED 0%,#DCE0E5 100%)',
  },
  {
    brand: 'RituelCo',
    category: 'Etsy',
    capability: 'Etsy · Commerce · Global',
    desc: 'Global dijital müşterilere ulaşmak için Etsy odaklı satış ve commerce yapısı.',
    tone: 'linear-gradient(160deg,#F0ECE3 0%,#E7E1D3 100%)',
  },
  {
    brand: 'GLC',
    category: 'Etsy',
    capability: 'Etsy · Marketplace · Global',
    desc: 'Etsy üzerinden global müşterilere ulaşmayı destekleyen pazaryeri ve dijital satış yapısı.',
    tone: 'linear-gradient(160deg,#ECE7DC 0%,#E1DACB 100%)',
  },
  {
    brand: 'Maxpace',
    category: 'Amazon',
    capability: 'Amazon · Marketplace · Global Expansion',
    desc: 'Amazon üzerinden farklı küresel pazarlara açılmayı destekleyen satış ve pazaryeri yapılanması.',
    tone: 'linear-gradient(160deg,#E3E5E8 0%,#D7DAE0 100%)',
  },
];

const featured = projects.filter(p => p.featured);
const compactRow1 = projects.filter(p => !p.featured).slice(0, 3);
const compactRow2 = projects.filter(p => !p.featured).slice(3);

function ProjectImage({ brand, tone, large }: { brand: string; tone: string; large?: boolean }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
      {/* Neutral editorial placeholder — swap for next/image (fill + object-cover) once real project photography is ready */}
      <div aria-hidden className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]" style={{ background: tone }} />
      <span
        aria-hidden
        className={`absolute inset-0 flex items-center justify-center font-black leading-none text-[#14213F]/[0.06] ${large ? 'text-[9rem] sm:text-[11rem]' : 'text-[6rem]'}`}
      >
        {brand.charAt(0)}
      </span>
      <div aria-hidden className="absolute inset-0 ring-1 ring-inset ring-black/5" />
    </div>
  );
}

export default function RDCases() {
  return (
    <section id="hikayeler" className="bg-[#FAF9F6] py-16 sm:py-20">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="max-w-[52ch]">
          <p className="text-[11.5px] font-bold tracking-[0.26em] text-[#1B5CD6] uppercase">Projeler</p>
          <h2 className="mt-3 text-[2.6rem] font-extrabold tracking-tight text-[#14213F] sm:text-[3.1rem]">Birlikte Kurduğumuz Sistemler</h2>
          <p className="mt-4 text-[1.1rem] leading-relaxed text-[#5A5A6A]">
            Her marka için aynı reçeteyi değil; ihtiyacına göre strateji, teknoloji, commerce ve operasyon sistemleri kuruyoruz.
          </p>
        </div>

        {/* Featured — two flagship projects */}
        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          {featured.map(p => (
            <article key={p.brand} className="group overflow-hidden rounded-2xl bg-white">
              <ProjectImage brand={p.brand} tone={p.tone} large />
              <div className="pt-7">
                <p className="text-[11.5px] font-bold tracking-[0.2em] text-[#8A8A98] uppercase">{p.category}</p>
                <h3 className="mt-2.5 text-[28px] font-bold text-[#14213F] sm:text-[32px]">{p.brand}</h3>
                <p className="mt-3 max-w-[48ch] text-[15.5px] leading-relaxed text-[#5A5A6A]">{p.desc}</p>
                <p className="mt-4 text-[12.5px] font-semibold tracking-[0.06em] text-[#8A8A98]">{p.capability}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Supporting projects — 3 + 2, each row evenly filled */}
        <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
          {compactRow1.map(p => (
            <article key={p.brand} className="group overflow-hidden rounded-2xl bg-white">
              <ProjectImage brand={p.brand} tone={p.tone} />
              <div className="pt-6">
                <p className="text-[11px] font-bold tracking-[0.18em] text-[#8A8A98] uppercase">{p.category}</p>
                <h3 className="mt-2 text-[21px] font-bold text-[#14213F]">{p.brand}</h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-[#6A6A7A]">{p.desc}</p>
                <p className="mt-3.5 text-[12px] font-semibold tracking-[0.05em] text-[#8A8A98]">{p.capability}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2">
          {compactRow2.map(p => (
            <article key={p.brand} className="group overflow-hidden rounded-2xl bg-white">
              <ProjectImage brand={p.brand} tone={p.tone} />
              <div className="pt-6">
                <p className="text-[11px] font-bold tracking-[0.18em] text-[#8A8A98] uppercase">{p.category}</p>
                <h3 className="mt-2 text-[21px] font-bold text-[#14213F]">{p.brand}</h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-[#6A6A7A]">{p.desc}</p>
                <p className="mt-3.5 text-[12px] font-semibold tracking-[0.05em] text-[#8A8A98]">{p.capability}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
