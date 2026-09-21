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
            <p className="text-[10.5px] font-bold tracking-[0.26em] text-[#1B5CD6] uppercase">Tek Sistem, Dört Katman</p>
            <h2 className="mt-3 text-[2.3rem] font-extrabold leading-tight tracking-tight text-[#14213F] sm:text-[2.8rem]">Neler Yapıyoruz?</h2>
          </div>
          <p className="max-w-[32ch] text-[1rem] leading-relaxed text-[#5A5A6A]">
            Dört katman birbirinden bağımsız hizmetler değil, tek bir büyüme sisteminin parçalarıdır.
          </p>
        </div>

        {/* Cards */}
        <div className="relative mt-14">
          <div aria-hidden className="absolute left-0 right-0 top-6 hidden h-px bg-[#E0E0E6] lg:block" />
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(s => (
              <div key={s.title} className="relative pr-4">
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[#DCDCE2] bg-[#FAF9F6] text-[12.5px] font-bold text-[#14213F]">
                  {s.n}
                </div>
                <h3 className="mt-5 text-[17px] font-bold text-[#14213F]">{s.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-[#6A6A7A]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI as a cross-cutting layer, not a separate card */}
        <div className="mt-10 flex flex-wrap items-center gap-4 rounded-2xl bg-[#14213F] px-6 py-4">
          <span className="text-[10.5px] font-bold tracking-[0.24em] text-[#C9A876] uppercase">AI Layer</span>
          <span aria-hidden className="hidden h-px flex-1 bg-white/15 sm:block" />
          <span className="text-[13px] text-white/65">Technology ve Operations boyunca sürekli çalışan yapay zeka katmanı.</span>
        </div>
      </div>
    </section>
  );
}
