const services = [
  { icon:'📈', title:'Pazar Stratejisi', desc:'Doğru pazar, doğru ürün, doğru model.' },
  { icon:'🛒', title:'Pazaryeri Danışmanlığı', desc:'Amazon, Etsy, eBay, Shopify ve daha fazlası.' },
  { icon:'💻', title:'Dijital Altyapı', desc:'Web sitesi, marka, içerik ve teknik kurulum.' },
  { icon:'📊', title:'Büyüme & Ölçüm', desc:'Veri odaklı, sürdürülebilir büyüme.' },
];

export default function RDServices() {
  return (
    <section id="hizmetler" className="bg-[#FAFAF8] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Header row */}
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div>
            <p className="text-[10.5px] font-bold tracking-[0.24em] text-[#1B5CD6] uppercase">Global Başarı İçin Her Adımda Yanınızdayız</p>
            <h2 className="mt-3 text-[2.2rem] font-extrabold leading-tight tracking-tight text-[#1B2E5E] sm:text-[2.6rem]">Neler Yapıyoruz?</h2>
          </div>
          <div className="max-w-[32ch]">
            <p className="text-[1rem] leading-relaxed text-[#5A5A6A]">Markanızı global pazarlara taşımak için uçtan uca çözümler sunuyoruz.</p>
            <a href="#" className="mt-2 inline-block text-[13.5px] font-semibold text-[#1B5CD6] hover:underline">Tüm Hizmetler →</a>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(s => (
            <div key={s.title} className="group rounded-2xl border border-[#E5E5EC] bg-white p-6 transition-all hover:border-[#1B5CD6]/30 hover:shadow-[0_4px_24px_rgba(27,92,214,0.08)]">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF3FD] text-xl">{s.icon}</div>
              <h3 className="mt-4 text-[15px] font-bold text-[#1B2E5E]">{s.title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-[#6A6A7A]">{s.desc}</p>
              <a href="#" className="mt-4 inline-block text-[12.5px] font-semibold text-[#1B5CD6] group-hover:underline">Detaylı İncele →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}