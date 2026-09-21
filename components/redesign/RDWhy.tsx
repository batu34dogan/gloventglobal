import Link from 'next/link';

const diffs = [
  { not: 'Rapor değil,', is: 'çalışan sistem' },
  { not: 'AI eğitimi değil,', is: 'AI entegrasyonu' },
  { not: 'Tek kanal değil,', is: 'büyüme mimarisi' },
  { not: 'Teslim edip çıkmak değil,', is: 'sürekli optimizasyon' },
];

export default function RDWhy() {
  return (
    <section className="overflow-hidden bg-[#0F1E3C]">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid lg:grid-cols-2">
          {/* Left dark panel */}
          <div className="flex flex-col justify-center py-16 pr-0 lg:pr-16">
            <p className="text-[10px] font-bold tracking-[0.28em] text-[#1B5CD6] uppercase">Türkiye&apos;den Dünyaya</p>
            <h2 className="mt-5 text-[2.3rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-[2.8rem]">
              Yerel Gücü Global Büyümeye Dönüştürüyoruz.
            </h2>
            <Link
              href="/iletisim"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-[14px] font-semibold text-white transition-all hover:bg-white hover:text-[#0F1E3C]"
            >
              İletişime Geç →
            </Link>

            {/* Founder quote — small, secondary */}
            <div className="mt-14 flex items-center gap-3 border-t border-white/10 pt-6">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold text-white/80">BD</div>
              <p className="text-[12.5px] italic leading-snug text-white/45">
                &ldquo;Sadece danışmanlık değil, uzun vadeli bir büyüme ortaklığı.&rdquo; — Batuhan Doğan, Kurucu
              </p>
            </div>
          </div>

          {/* Right light panel */}
          <div className="border-t border-white/10 bg-white/[0.04] py-16 pl-0 lg:border-l lg:border-t-0 lg:pl-16">
            <p className="text-[10px] font-bold tracking-[0.28em] text-[#5B8CEE] uppercase">Neden GloventGlobal?</p>
            <div className="mt-8 space-y-5">
              {diffs.map(d => (
                <div key={d.is} className="border-b border-white/10 pb-5 last:border-0 last:pb-0">
                  <p className="text-[1.05rem] leading-snug">
                    <span className="text-white/40">{d.not}</span>{' '}
                    <span className="font-bold text-white">{d.is}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
