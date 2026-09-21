type CaseItem = {
  brand: string;
  category: string;
  tags: string[];
  desc: string;
  gradient: string;
  featured?: boolean;
};

const cases: CaseItem[] = [
  {
    brand: 'ASL Çanta',
    category: 'E-Commerce',
    tags: ['Shopify', 'Commerce Infrastructure', 'UX', 'Product Architecture'],
    desc: 'Geniş ürün kataloğu için ürün mimarisinden kullanıcı deneyimine uzanan modern e-ticaret ve dijital operasyon altyapısı.',
    gradient: 'linear-gradient(155deg,#E4CBA8 0%,#C9A876 55%,#9C7C4D 100%)',
    featured: true,
  },
  {
    brand: 'BERD',
    category: 'Global Commerce',
    tags: ['Amazon', 'Market Entry', 'Commerce', 'Growth'],
    desc: 'Türkiye’den global pazarlara açılma sürecinde pazaryeri, satış ve büyüme yapısının oluşturulması.',
    gradient: 'linear-gradient(155deg,#1E2C4A 0%,#33486E 55%,#6B7FA0 100%)',
    featured: true,
  },
  {
    brand: 'Güvenli Adımlar',
    category: 'Amazon',
    tags: ['Amazon', 'Listing', 'Marketplace Operations'],
    desc: 'Amazon satış operasyonunun ürün konumlandırması, listeleme ve pazaryeri süreçleriyle yapılandırılması.',
    gradient: 'linear-gradient(160deg,#C9C4BA 0%,#A39C8E 100%)',
  },
  {
    brand: 'Ziynet Bijüteri',
    category: 'B2B',
    tags: ['B2B', 'Digital Showroom', 'Global'],
    desc: 'Türkiye’den global alıcılara ulaşmayı destekleyen dijital B2B satış ve marka sunum yapısı.',
    gradient: 'linear-gradient(160deg,#C7D6E5 0%,#9FB6CC 100%)',
  },
  {
    brand: 'RituelCo',
    category: 'Etsy',
    tags: ['Etsy', 'Digital Commerce', 'Global'],
    desc: 'Global dijital müşterilere ulaşmak için Etsy odaklı satış ve commerce yapısı.',
    gradient: 'linear-gradient(160deg,#F0EBDF 0%,#D9CFBA 100%)',
  },
  {
    brand: 'GLC',
    category: 'Etsy',
    tags: ['Etsy', 'Marketplace', 'Global'],
    desc: 'Etsy üzerinden global müşterilere ulaşmayı destekleyen pazaryeri ve dijital satış yapısı.',
    gradient: 'linear-gradient(200deg,#E7D2AE 0%,#BFA070 100%)',
  },
  {
    brand: 'Maxpace',
    category: 'Amazon',
    tags: ['Amazon', 'Marketplace', 'Global Expansion'],
    desc: 'Amazon üzerinden farklı küresel pazarlara açılmayı destekleyen satış ve pazaryeri yapılanması.',
    gradient: 'linear-gradient(200deg,#2A3A5C 0%,#5A6E90 100%)',
  },
];

const featured = cases.filter(c => c.featured);
const compact = cases.filter(c => !c.featured);

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

        {/* Featured — two large, visually weighted projects */}
        <div className="mt-12 grid gap-7 lg:grid-cols-2">
          {featured.map(c => (
            <article key={c.brand} className="group overflow-hidden rounded-2xl bg-white">
              {/* Image container — sized for next/image (fill + object-cover) once real project photography replaces the gradient */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <div aria-hidden className="absolute inset-0" style={{ background: c.gradient }} />
                <div aria-hidden className="absolute inset-0 ring-1 ring-inset ring-black/5" />
              </div>
              <div className="pt-6">
                <p className="text-[11px] font-bold tracking-[0.2em] text-[#8A8A98] uppercase">{c.category}</p>
                <h3 className="mt-2 text-[26px] font-bold text-[#14213F] sm:text-[30px]">{c.brand}</h3>
                <p className="mt-2.5 max-w-[52ch] text-[15px] leading-relaxed text-[#5A5A6A]">{c.desc}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {c.tags.map(t => (
                    <span key={t} className="rounded-full border border-[#E0E0E6] px-2.5 py-1 text-[12px] font-semibold text-[#5A5A6A]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Compact — five supporting projects */}
        <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {compact.map(c => (
            <article key={c.brand} className="group overflow-hidden rounded-2xl bg-white">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <div aria-hidden className="absolute inset-0" style={{ background: c.gradient }} />
                <div aria-hidden className="absolute inset-0 ring-1 ring-inset ring-black/5" />
              </div>
              <div className="pt-5">
                <p className="text-[10.5px] font-bold tracking-[0.18em] text-[#8A8A98] uppercase">{c.category}</p>
                <h3 className="mt-1.5 text-[17px] font-bold text-[#14213F]">{c.brand}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#6A6A7A]">{c.desc}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {c.tags.map(t => (
                    <span key={t} className="rounded-full border border-[#E0E0E6] px-2 py-0.5 text-[11px] font-semibold text-[#5A5A6A]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
