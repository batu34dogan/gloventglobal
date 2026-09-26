import { sectionShell } from '@/components/redesign/service-detail/RDServiceDetailPrimitives';
import { dataSignals, growthActions, processContinuity, processSteps } from './processData';

// Koyu imza bölüm — yalnızca 05 "Verilerle Yönetiriz" ve 06 "Büyütürüz" adımlarının kendi
// metninde geçen kavramlar + production'daki "Tek Seferlik Kurulum Değil, Geliştirilebilir Sistem"
// mesajı. Homepage AI network'ünün kopyası değil: Measure → Learn → Optimize veri döngüsü
// (İngilizce etiketler dekoratif, aria-hidden). Tek veri noktası çember üzerinde akar.
const LOOP_R = 92;
const LOOP_PATH = `M 150 ${150 - LOOP_R} A ${LOOP_R} ${LOOP_R} 0 1 1 149.99 ${150 - LOOP_R}`;
const LOOP_NODES = [
  { label: 'Measure', sub: '05 · Takip', angle: -90 },
  { label: 'Learn', sub: "05 · Karar", angle: 30 },
  { label: 'Optimize', sub: '06 · Optimizasyon', angle: 150 },
];

export default function RDProcessDataLoop() {
  const step05 = processSteps[4];
  const step06 = processSteps[5];

  return (
    <section aria-labelledby="pr-data" className="relative overflow-hidden bg-[#0F1E3C] py-16 sm:py-24">
      <style>{`
        .rd-pl-pulse { offset-path: path('${LOOP_PATH}'); animation: rd-pl-travel 8s linear infinite; }
        @keyframes rd-pl-travel { from { offset-distance: 0%; } to { offset-distance: 100%; } }
        .rd-pl-ring { transform-origin: 150px 150px; animation: rd-pl-breathe 5s ease-in-out infinite; }
        @keyframes rd-pl-breathe { 0%, 100% { opacity: .5; transform: scale(1); } 50% { opacity: .25; transform: scale(1.03); } }
        @media (prefers-reduced-motion: reduce) {
          .rd-pl-pulse { animation: none !important; opacity: 0; }
          .rd-pl-ring { animation: none !important; }
        }
      `}</style>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          WebkitMaskImage: 'radial-gradient(ellipse at 70% 40%, black 0%, transparent 70%)',
          maskImage: 'radial-gradient(ellipse at 70% 40%, black 0%, transparent 70%)',
        }}
      />

      <div className={`${sectionShell} relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16`}>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#C9A876]">Veri ve Optimizasyon</p>
          <h2 id="pr-data" className="mt-4 max-w-[22ch] text-[1.9rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-[2.5rem]">
            {processContinuity.title}
          </h2>
          <p className="mt-5 max-w-[56ch] text-[15.5px] leading-relaxed text-white/65">{processContinuity.description}</p>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 sm:gap-10">
            <div className="border-t border-white/10 pt-5">
              <h3 className="flex items-baseline gap-3 text-[16px] font-bold text-white">
                <span className="text-[12px] font-bold text-[#C9A876]">{step05.number}</span>
                {step05.title}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Takip edilen performans alanları">
                {dataSignals.map((d) => (
                  <li key={d} className="rounded-full border border-white/15 px-3 py-1.5 text-[12.5px] font-medium text-white/80">
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-white/10 pt-5">
              <h3 className="flex items-baseline gap-3 text-[16px] font-bold text-white">
                <span className="text-[12px] font-bold text-[#C9A876]">{step06.number}</span>
                {step06.title}
              </h3>
              <ul className="mt-4 space-y-2" aria-label="Sürekli geliştirme adımları">
                {growthActions.map((a) => (
                  <li key={a} className="flex items-center gap-2.5 text-[14px] text-white/75">
                    <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#1B5CD6]" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[320px] sm:max-w-[400px]">
          <svg viewBox="0 0 300 300" className="absolute inset-0 h-full w-full" focusable="false">
            <circle cx="150" cy="150" r={LOOP_R} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" />
            <circle cx="150" cy="150" r={LOOP_R - 14} fill="none" stroke="#C9A876" strokeWidth="1" strokeDasharray="2 6" className="rd-pl-ring" />
            <circle cx="150" cy="150" r="46" fill="#0F1E3C" stroke="#1B5CD6" strokeWidth="1.4" />
            {LOOP_NODES.map((n) => {
              const rad = (n.angle * Math.PI) / 180;
              return <circle key={n.label} cx={150 + LOOP_R * Math.cos(rad)} cy={150 + LOOP_R * Math.sin(rad)} r="6" fill="#0F1E3C" stroke="#C9A876" strokeWidth="1.6" />;
            })}
            <circle r="4" fill="#C9A876" className="rd-pl-pulse" />
          </svg>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A876]">Data</span>
            <span className="block text-[15px] font-extrabold tracking-[0.06em] text-white">LOOP</span>
          </div>
          {LOOP_NODES.map((n) => {
            const rad = (n.angle * Math.PI) / 180;
            const x = (150 + (LOOP_R + 32) * Math.cos(rad)) / 3;
            const y = (150 + (LOOP_R + 30) * Math.sin(rad)) / 3;
            return (
              <span key={n.label} className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center" style={{ left: `${x}%`, top: `${y}%` }}>
                <span lang="en" className="block text-[11px] font-bold uppercase tracking-[0.2em] text-white">{n.label}</span>
                <span className="block text-[10.5px] text-white/55">{n.sub}</span>
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
