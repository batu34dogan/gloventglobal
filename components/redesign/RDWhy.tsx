const points = [
  { icon:'🎯', title:'Deneyim Odaklı Ekip', desc:'E-ticarette global deneyim.' },
  { icon:'🔗', title:'Uçtan Uca Destek', desc:'Stratejiden teknik kuruluma.' },
  { icon:'📊', title:'Veri ve Sonuç Odaklı', desc:'Ölçülebilir, sürdürülebilir büyüme.' },
  { icon:'🤝', title:'Güvenilir İş Ortağı', desc:'Uzun vadeli başarı için yanınızda.' },
];

export default function RDWhy() {
  return (
    <section className="overflow-hidden bg-[#0F1E3C]">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid min-h-[520px] lg:grid-cols-2">

          {/* Left dark panel */}
          <div className="flex flex-col justify-center py-16 pr-0 lg:pr-16">
            <p className="text-[10px] font-bold tracking-[0.28em] text-[#1B5CD6] uppercase">Türkiye&apos;den Dünyaya</p>
            <h2 className="mt-5 text-[2.2rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-[2.8rem]">
              Siz Büyürseniz<br />Biz Başarılıyız.
            </h2>
            <p className="mt-5 max-w-[36ch] text-[1rem] leading-relaxed text-white/60">
              Yerel gücünüzü global fırsatlarla buluşturuyoruz. Daha büyük pazarlar, daha sürdürülebilir başarılar.
            </p>
            <a href="/iletisim" className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-[14px] font-semibold text-white transition-all hover:bg-white hover:text-[#0F1E3C]">
              İletişime Geç →
            </a>
          </div>

          {/* Right light panel */}
          <div className="border-t border-white/10 bg-white/[0.04] py-16 pl-0 lg:border-l lg:border-t-0 lg:pl-16">
            <p className="text-[10px] font-bold tracking-[0.28em] text-[#5B8CEE] uppercase">Neden GloventGlobal?</p>
            <div className="mt-8 space-y-6">
              {points.map(p => (
                <div key={p.title} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-lg">{p.icon}</div>
                  <div>
                    <p className="text-[14px] font-bold text-white">{p.title}</p>
                    <p className="mt-0.5 text-[13px] text-white/55">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Founder quote */}
            <div className="mt-8 border-t border-white/10 pt-7">
              <p className="text-[1rem] italic leading-relaxed text-white/80">
                &ldquo;Sadece danışmanlık değil, uzun vadeli bir büyüme ortaklığı.&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-[#1B5CD6]/40 flex items-center justify-center text-xs font-bold text-white">BD</div>
                <div>
                  <p className="text-[13px] font-bold text-white">Batuhan Doğan</p>
                  <p className="text-[11px] text-white/50">Kurucu, GloventGlobal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}