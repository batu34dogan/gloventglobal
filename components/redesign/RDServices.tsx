const services = [
  { n: '01', title: 'Strategy', desc: 'Pazar, ürün, fiyatlandırma ve büyüme modeli.' },
  { n: '02', title: 'Commerce', desc: 'Marketplace, Shopify, B2B ve satış kanalları.' },
  { n: '03', title: 'Technology', desc: 'Web, entegrasyon, API, AI ve otomasyon.' },
  { n: '04', title: 'Operations', desc: 'İçerik, ürün, reklam, veri ve günlük operasyon.' },
];

export default function RDServices() {
  return (
    <section id="hizmetler" className="bg-[#FAF9F6] py-16 sm:py-20">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        {/* Header row */}
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div>
            <p className="text-[11.5px] font-bold tracking-[0.26em] text-[#1B5CD6] uppercase">Çekirdek Yetkinlikler</p>
            <h2 className="mt-3 text-[2.6rem] font-extrabold leading-tight tracking-tight text-[#14213F] sm:text-[3.1rem]">Neler Yapıyoruz?</h2>
          </div>
          <p className="max-w-[32ch] text-[1.1rem] leading-relaxed text-[#5A5A6A]">
            Markanızı global pazarlara taşıyan dört temel yetkinlik.
          </p>
        </div>

        {/* Capability tiles */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(s => (
            <div key={s.title} className="rounded-2xl border border-[#E5E5EC] bg-white p-7">
              <span className="text-[11.5px] font-bold tracking-[0.2em] text-[#B8935A]">{s.n}</span>
              <h3 className="mt-4 text-[19px] font-bold text-[#14213F]">{s.title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-[#6A6A7A]">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
