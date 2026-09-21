const steps = [
  { n: '01', title: 'Opportunity', desc: 'Pazar fırsatı ve doğru konumlanma.' },
  { n: '02', title: 'Channel', desc: 'Doğru kanal ve pazar yeri seçimi.' },
  { n: '03', title: 'Infrastructure', desc: 'Teknik altyapı ve sistem kurulumu.' },
  { n: '04', title: 'Operations', desc: 'Günlük yürütme ve optimizasyon.' },
  { n: '05', title: 'Growth', desc: 'Ölçekli, sürdürülebilir büyüme.', outcome: true },
];

export default function RDSystem() {
  return (
    <section className="border-t border-[#E8E8EC] bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="max-w-[44ch]">
          <p className="text-[11.5px] font-bold tracking-[0.26em] text-[#1B5CD6] uppercase">Gerçek Çalışma Süreci</p>
          <h2 className="mt-3 text-[2.6rem] font-extrabold leading-tight tracking-tight text-[#14213F] sm:text-[3.1rem]">
            Stratejiden Çalışan Sisteme.
          </h2>
        </div>

        {/* Process flow */}
        <div className="relative mt-16">
          <div aria-hidden className="absolute left-0 right-0 top-6 hidden h-px bg-[#E0E0E6] lg:block" />
          {/* Progress overlay — structurally ready for a scroll-linked fill; static at rest until the interaction ships */}
          <div
            aria-hidden
            data-growth-progress
            className="absolute left-0 top-6 hidden h-px w-full origin-left scale-x-0 bg-[#1B5CD6] lg:block"
          />
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {steps.map(s => (
              <div key={s.n} className="relative">
                <div
                  className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full text-[13px] font-bold ${
                    s.outcome ? 'bg-[#1B5CD6] text-white' : 'border border-[#DCDCE2] bg-white text-[#14213F]'
                  }`}
                >
                  {s.n}
                </div>
                <h3 className={`mt-5 text-[17.5px] font-bold ${s.outcome ? 'text-[#1B5CD6]' : 'text-[#14213F]'}`}>{s.title}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#6A6A7A]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI + DATA — continuous layer running underneath the whole process */}
        <div className="mt-14 flex flex-wrap items-center gap-4 rounded-2xl bg-[#0F1E3C] px-6 py-5">
          <span className="text-[12px] font-bold tracking-[0.28em] text-[#C9A876] uppercase">AI + Data</span>
          <span aria-hidden className="hidden h-px flex-1 bg-white/15 sm:block" />
          <span className="text-[14px] text-white/60">Opportunity&apos;den Growth&apos;a kadar sürecin tamamında sürekli çalışan yatay katman.</span>
        </div>
      </div>
    </section>
  );
}
