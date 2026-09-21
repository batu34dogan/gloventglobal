const cases = [
  {
    brand: 'ASL Çanta',
    desc: 'Marka için uçtan uca ticaret altyapısının kurulumu.',
    tags: ['Commerce Infrastructure', 'Shopify', 'UX', 'Product Architecture'],
    gradient: 'linear-gradient(150deg,#2E4A78 0%,#7C8CA6 60%,#C9B79A 100%)',
  },
  {
    brand: 'GermaniciaLeather',
    desc: "Etsy'de sürdürülebilir organik büyüme ve marka konumlandırma.",
    tags: ['Etsy Growth', 'SEO', 'Creative', 'Advertising'],
    gradient: 'linear-gradient(150deg,#3A3226 0%,#8B7355 55%,#D9C9AE 100%)',
  },
  {
    brand: 'Güvenli Adımlar',
    desc: "Amazon'da güçlü bir marketplace operasyonu kurulumu.",
    tags: ['Amazon', 'Listing', 'Marketplace Operations'],
    gradient: 'linear-gradient(150deg,#14213F 0%,#2A4A7A 55%,#8FA8C9 100%)',
  },
];

export default function RDCases() {
  return (
    <section id="hikayeler" className="bg-[#FAF9F6] py-16 sm:py-20">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[11.5px] font-bold tracking-[0.26em] text-[#1B5CD6] uppercase">Gerçek Projeler</p>
            <h2 className="mt-3 text-[2.6rem] font-extrabold tracking-tight text-[#14213F] sm:text-[3.1rem]">Başarı Hikayelerimiz</h2>
          </div>
        </div>

        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map(c => (
            <div key={c.brand} className="group overflow-hidden rounded-2xl bg-white transition-shadow hover:shadow-[0_8px_36px_rgba(20,33,63,0.1)]">
              {/* Image container — sized for next/image (fill + object-cover) once real photography replaces the gradient */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <div aria-hidden className="absolute inset-0" style={{ background: c.gradient }} />
                <div aria-hidden className="absolute inset-0 ring-1 ring-inset ring-black/5" />
              </div>
              <div className="p-6">
                <h3 className="text-[19px] font-bold text-[#14213F]">{c.brand}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-[#6A6A7A]">{c.desc}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {c.tags.map(t => (
                    <span key={t} className="rounded-full border border-[#E0E0E6] px-2.5 py-1 text-[12px] font-semibold text-[#5A5A6A]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
