import Link from 'next/link';

export default function RDHero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#FAFAF8]">
      {/* Right half background — şehir kompozisyonu (fotoğraf olmadan CSS ile) */}
      <div aria-hidden className="absolute inset-y-0 right-0 w-full lg:w-[52%]">
        {/* Sky gradient */}
        <div className="absolute inset-0" style={{background:'linear-gradient(160deg,#d6e4f7 0%,#bdd3ee 25%,#e8d5c0 55%,#c9b8a5 75%,#a89080 100%)'}} />
        {/* World map dots — CSS pattern */}
        <div aria-hidden className="absolute inset-0 opacity-20" style={{backgroundImage:'radial-gradient(circle,#1B2E5E 1px,transparent 1px)',backgroundSize:'18px 18px'}} />
        {/* City pins */}
        {[
          {label:'New York',top:'30%',left:'8%'},
          {label:'London',top:'22%',left:'38%'},
          {label:'İstanbul',top:'28%',left:'55%'},
          {label:'Dubai',top:'42%',left:'65%'},
          {label:'Singapore',top:'52%',left:'82%'},
        ].map(c => (
          <div key={c.label} className="absolute flex flex-col items-center" style={{top:c.top,left:c.left}}>
            <div className="h-2 w-2 rounded-full bg-[#1B5CD6] shadow-[0_0_6px_2px_rgba(27,92,214,0.5)]" />
            <span className="mt-0.5 whitespace-nowrap rounded bg-white/80 px-1.5 py-0.5 text-[9px] font-semibold text-[#1B2E5E]">{c.label}</span>
          </div>
        ))}
        {/* Handwritten note */}
        <div className="absolute right-8 top-8 text-right leading-tight">
          <svg viewBox="0 0 120 80" className="w-24 opacity-70" fill="none">
            <text x="60" y="22" textAnchor="middle" fontSize="13" fontStyle="italic" fill="#1B2E5E" fontFamily="Georgia,serif">Local</text>
            <text x="60" y="40" textAnchor="middle" fontSize="13" fontStyle="italic" fill="#1B2E5E" fontFamily="Georgia,serif">Brands</text>
            <text x="60" y="58" textAnchor="middle" fontSize="13" fontStyle="italic" fill="#1B5CD6" fontFamily="Georgia,serif">Global</text>
            <text x="60" y="74" textAnchor="middle" fontSize="13" fontStyle="italic" fill="#1B5CD6" fontFamily="Georgia,serif">Impact</text>
          </svg>
        </div>
        {/* Book stack */}
        <div className="absolute bottom-20 right-10 hidden sm:block">
          {['Strategy','E-Commerce','Global Expansion'].map((t,i) => (
            <div key={t} className="mb-0.5 rounded border-l-[3px] border-[#1B5CD6] bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-[#1B2E5E] shadow-sm" style={{marginLeft:`${i*4}px`}}>{t}</div>
          ))}
        </div>
        {/* Dark overlay on left edge for text readability */}
        <div aria-hidden className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#FAFAF8] to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10">
        <div className="flex min-h-screen flex-col justify-center py-32 lg:max-w-[52%]">
          <p className="text-[10.5px] font-bold tracking-[0.28em] text-[#6A6A7A] uppercase">Sınırları Aşan Büyüme</p>

          <h1 className="mt-5 text-[2.6rem] font-extrabold leading-[1.05] tracking-[-0.025em] text-[#1B2E5E] sm:text-[3.2rem] lg:text-[3.6rem]">
            Dünyada Markanız İçin{' '}
            <span className="text-[#1B5CD6]">Daha Fazlası</span>{' '}
            Mümkün.
          </h1>

          <p className="mt-6 max-w-[40ch] text-[1.02rem] leading-[1.7] text-[#5A5A6A]">
            Türk markalarının global pazarlarda büyümesini sağlayan strateji, teknoloji ve deneyim.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/analiz" className="inline-flex items-center gap-2 rounded-full bg-[#1B2E5E] px-7 py-3.5 text-[14px] font-semibold text-white transition-all hover:bg-[#1B5CD6] hover:shadow-[0_6px_20px_rgba(27,92,214,0.3)]">
              Ücretsiz Strateji Görüşmesi →
            </Link>
            <Link href="#hizmetler" className="inline-flex items-center rounded-full border border-[#CDCDD8] bg-white px-7 py-3.5 text-[14px] font-semibold text-[#1B2E5E] transition-all hover:border-[#1B5CD6] hover:text-[#1B5CD6]">
              Hizmetlerimizi Keşfet
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}