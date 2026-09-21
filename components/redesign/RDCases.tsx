const cases = [
  { brand:'ASL Çanta', desc:'Global pazarlara açılım stratejisi ve dijital dönüşüm.', bg:'bg-[#F5EEE6]', accent:'#8B6A50' },
  { brand:'GermaniciaLeather', desc:'Etsy&apos;de sürdürülebilir büyüme ve marka konumlandırma.', bg:'bg-[#EAE6DE]', accent:'#5A4A30' },
  { brand:'Güvenli Adımlar', desc:'Amazon Türkiye&apos;de başarılı ürün lansmanı ve ölçekleme.', bg:'bg-[#E8EEF5]', accent:'#2A4A7A' },
];

export default function RDCases() {
  return (
    <section id="hikayeler" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[10.5px] font-bold tracking-[0.24em] text-[#1B5CD6] uppercase">Gerçek Projeler, Somut Sonuçlar</p>
            <h2 className="mt-3 text-[2.2rem] font-extrabold tracking-tight text-[#1B2E5E] sm:text-[2.6rem]">Başarı Hikayelerimiz</h2>
          </div>
          <a href="#" className="text-[13.5px] font-semibold text-[#1B5CD6] hover:underline">Tüm Projeler →</a>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {cases.map(c => (
            <div key={c.brand} className="group overflow-hidden rounded-2xl border border-[#E5E5EC] bg-white transition-all hover:shadow-[0_6px_32px_rgba(0,0,0,0.08)]">
              {/* Image placeholder */}
              <div className={`${c.bg} flex h-40 items-center justify-center`}>
                <span className="text-[2rem] font-black opacity-20" style={{color:c.accent}}>{c.brand[0]}</span>
              </div>
              <div className="p-5">
                <h3 className="text-[15px] font-bold text-[#1B2E5E]">{c.brand}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#6A6A7A]">{c.desc}</p>
                <a href="#" className="mt-3 inline-block text-[12.5px] font-semibold text-[#1B5CD6] group-hover:underline">Case Study →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}