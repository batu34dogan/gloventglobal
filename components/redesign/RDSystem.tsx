const steps = [
  { n: '01', title: 'Strategy' },
  { n: '02', title: 'Commerce' },
  { n: '03', title: 'Technology' },
  { n: '04', title: 'Operations' },
  { n: '05', title: 'Growth', outcome: true },
];

export default function RDSystem() {
  return (
    <section className="border-t border-[#E8E8EC] bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="max-w-[44ch]">
          <p className="text-[10.5px] font-bold tracking-[0.26em] text-[#1B5CD6] uppercase">Büyüme Sistemi</p>
          <h2 className="mt-3 text-[2.3rem] font-extrabold leading-tight tracking-tight text-[#14213F] sm:text-[2.8rem]">
            Stratejiden çalışan sisteme.
          </h2>
        </div>

        {/* Flow */}
        <div className="relative mt-16">
          <div aria-hidden className="absolute left-0 right-0 top-6 hidden h-px bg-[#E0E0E6] lg:block" />
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {steps.map(s => (
              <div key={s.n} className="relative">
                <div
                  className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full text-[12.5px] font-bold ${
                    s.outcome ? 'bg-[#1B5CD6] text-white' : 'border border-[#DCDCE2] bg-white text-[#14213F]'
                  }`}
                >
                  {s.n}
                </div>
                <h3 className={`mt-5 text-[16px] font-bold ${s.outcome ? 'text-[#1B5CD6]' : 'text-[#14213F]'}`}>{s.title}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* AI + DATA — runs across the whole system */}
        <div className="mt-14 flex flex-wrap items-center gap-4 rounded-2xl bg-[#0F1E3C] px-6 py-5">
          <span className="text-[11px] font-bold tracking-[0.28em] text-[#C9A876] uppercase">AI + Data</span>
          <span aria-hidden className="hidden h-px flex-1 bg-white/15 sm:block" />
          <span className="text-[13px] text-white/60">Sistemin tamamında, stratejiden büyümeye kadar sürekli çalışan yatay katman.</span>
        </div>
      </div>
    </section>
  );
}
