import Link from 'next/link';

const SYSTEM = ['Strategy', 'Commerce', 'Technology', 'Operations'];

export default function RDHero() {
  return (
    <section className="relative overflow-hidden bg-[#FAF9F6]">
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid min-h-[92vh] items-center gap-12 py-24 lg:min-h-[88vh] lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-28">
          {/* Left — content */}
          <div className="max-w-[46ch]">
            <p className="text-[11px] font-bold tracking-[0.3em] text-[#1B5CD6] uppercase">Global Growth Partner</p>

            <h1 className="mt-6 text-[3rem] font-extrabold leading-[1.04] tracking-[-0.03em] text-[#14213F] sm:text-[3.6rem] lg:text-[4.2rem]">
              Dünya Sizin İçin<br />Daha Büyük.
            </h1>

            <p className="mt-7 max-w-[42ch] text-[1.08rem] leading-[1.7] text-[#4A4A5A]">
              Global büyümeniz için strateji vermekle kalmıyor; satış, teknoloji, yapay zeka ve operasyon sistemini kuruyoruz.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-bold tracking-[0.16em] text-[#8A8A98] uppercase">
              {SYSTEM.map((s, i) => (
                <span key={s} className="flex items-center gap-3">
                  {i > 0 && <span className="text-[#C9A876]">·</span>}
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/analiz" className="inline-flex items-center gap-2 rounded-full bg-[#14213F] px-7 py-3.5 text-[14px] font-semibold text-white transition-all hover:bg-[#1B5CD6]">
                Ücretsiz Strateji Görüşmesi →
              </Link>
              <Link href="#hizmetler" className="inline-flex items-center rounded-full border border-[#D6D6DC] bg-transparent px-7 py-3.5 text-[14px] font-semibold text-[#14213F] transition-all hover:border-[#1B5CD6] hover:text-[#1B5CD6]">
                Hizmetlerimizi Keşfet
              </Link>
            </div>
          </div>

          {/* Right — premium image container (placeholder until real photography is added) */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.25rem] lg:aspect-auto lg:h-full lg:min-h-[520px]">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: 'linear-gradient(155deg,#1B2E5E 0%,#2E4A78 42%,#7C8CA6 68%,#C9B79A 100%)' }}
            />
            <div
              aria-hidden
              className="absolute inset-0 opacity-40"
              style={{ background: 'radial-gradient(circle at 78% 18%,rgba(255,255,255,0.35),transparent 45%)' }}
            />
            <div aria-hidden className="absolute inset-0 ring-1 ring-inset ring-white/10" />
            <div className="absolute inset-x-6 bottom-6 flex items-center justify-between rounded-xl bg-white/10 px-4 py-3 backdrop-blur-[2px]">
              <span className="text-[11px] font-semibold tracking-[0.08em] text-white/90">İstanbul · Global Ticaret</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#C9A876]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
