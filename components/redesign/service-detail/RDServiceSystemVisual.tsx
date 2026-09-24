import type { Pillar } from './serviceDetailAdapter';

// 12 hizmetin hepsinde aynı ortak görsel dil: merkezde hizmet, çevresinde o hizmetin GERÇEK
// yaklaşım adımları (serviceDetailsData → approach.steps), dış yörüngede ise hizmetin dört
// yetkinlikten hangisine oturduğunu gösteren champagne işaret. Yetkinlik yönleri /hizmetler
// Hero diyagramıyla aynı (Strateji üst, Ticaret sağ, Teknoloji alt, Operasyon sol). Dekoratif:
// aria-hidden — aynı adımlar sayfada "Yaklaşım" bölümünde metin olarak zaten var.
const PILLAR_ANGLE: Record<Pillar, number> = { Strateji: -90, Ticaret: 0, Teknoloji: 90, Operasyon: 180 };
const PILLARS: Pillar[] = ['Strateji', 'Ticaret', 'Teknoloji', 'Operasyon'];
const ORBIT_R = 40;
const NODE_ANGLES = [-135, -45, 45, 135];
const CYCLE_S = 6.4;

function polar(angleDeg: number, r: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: 50 + r * Math.cos(rad), y: 50 + r * Math.sin(rad) };
}

function arcPath(centerDeg: number, spanDeg: number, r: number) {
  const a = polar(centerDeg - spanDeg / 2, r);
  const b = polar(centerDeg + spanDeg / 2, r);
  return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} A ${r} ${r} 0 0 1 ${b.x.toFixed(2)} ${b.y.toFixed(2)}`;
}

const PILLAR_LABEL_POS: Record<Pillar, string> = {
  Strateji: 'left-1/2 top-[3.5%] -translate-x-1/2',
  Ticaret: 'right-[1.5%] top-1/2 -translate-y-1/2',
  Teknoloji: 'left-1/2 bottom-[3.5%] -translate-x-1/2',
  Operasyon: 'left-[1.5%] top-1/2 -translate-y-1/2',
};

export default function RDServiceSystemVisual({
  name,
  pillar,
  steps,
}: {
  name: string;
  pillar: Pillar;
  steps: { number: string; title: string }[];
}) {
  const nodes = steps.slice(0, 4);
  const slot = CYCLE_S / nodes.length;

  return (
    <div aria-hidden="true" className="rd-sdv relative mx-auto aspect-square w-full max-w-[520px]">
      <style>{`
        .rd-sdv-spoke { stroke: #CFCBC2; stroke-width: 1; vector-effect: non-scaling-stroke; animation: rd-sdv-spoke-kf ${CYCLE_S}s ease-in-out infinite; }
        @keyframes rd-sdv-spoke-kf {
          0%, 100% { stroke: #CFCBC2; stroke-width: 1; }
          3%, 22% { stroke: #1B5CD6; stroke-width: 1.7; }
          25% { stroke: #CFCBC2; stroke-width: 1; }
        }
        .rd-sdv-card { border-color: #E3E1DA; animation: rd-sdv-card-kf ${CYCLE_S}s ease-in-out infinite; }
        @keyframes rd-sdv-card-kf {
          0%, 100% { border-color: #E3E1DA; box-shadow: 0 1px 0 rgba(20,33,63,0.03); }
          3%, 22% { border-color: rgba(27,92,214,0.55); box-shadow: 0 14px 30px -22px rgba(27,92,214,0.55); }
          25% { border-color: #E3E1DA; box-shadow: 0 1px 0 rgba(20,33,63,0.03); }
        }
        .rd-sdv-dot { background: #fff; border-color: #CFCBC2; animation: rd-sdv-dot-kf ${CYCLE_S}s ease-in-out infinite; }
        @keyframes rd-sdv-dot-kf {
          0%, 100% { background: #fff; border-color: #CFCBC2; }
          3%, 22% { background: #C9A876; border-color: #C9A876; }
          25% { background: #fff; border-color: #CFCBC2; }
        }
        .rd-sdv-breathe { transform-origin: 50px 50px; animation: rd-sdv-breathe-kf 4.5s ease-in-out infinite; }
        @keyframes rd-sdv-breathe-kf {
          0%, 100% { transform: scale(1); opacity: .55; }
          50% { transform: scale(1.035); opacity: .3; }
        }
        @media (prefers-reduced-motion: reduce) {
          .rd-sdv-spoke, .rd-sdv-card, .rd-sdv-dot, .rd-sdv-breathe { animation: none !important; }
        }
      `}</style>

      <div className="absolute inset-0 overflow-hidden rounded-[28px] border border-[#E5E5EC] bg-[#FAF9F6]">
        <span
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(20,33,63,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(20,33,63,0.045) 1px, transparent 1px)',
            backgroundSize: '26px 26px',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 10%, transparent 78%)',
            maskImage: 'radial-gradient(ellipse at center, black 10%, transparent 78%)',
          }}
        />
      </div>

      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" focusable="false">
        <circle cx="50" cy="50" r={ORBIT_R} fill="none" stroke="#D9D5CB" strokeWidth="1" strokeDasharray="2 3" vectorEffect="non-scaling-stroke" />
        {PILLARS.map((p) => {
          const t = polar(PILLAR_ANGLE[p], ORBIT_R);
          return <circle key={p} cx={t.x} cy={t.y} r="0.9" fill={p === pillar ? '#C9A876' : '#D2CEC4'} />;
        })}
        <path d={arcPath(PILLAR_ANGLE[pillar], 34, ORBIT_R)} fill="none" stroke="#C9A876" strokeWidth="2.4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        {nodes.map((n, i) => {
          const p = polar(NODE_ANGLES[i], ORBIT_R);
          return (
            <line
              key={n.number}
              x1="50"
              y1="50"
              x2={p.x}
              y2={p.y}
              className="rd-sdv-spoke"
              style={{ animationDelay: `${i * slot}s` }}
            />
          );
        })}
        <circle cx="50" cy="50" r="20" fill="none" stroke="#C9A876" strokeWidth="1" vectorEffect="non-scaling-stroke" className="rd-sdv-breathe" />
        <circle cx="50" cy="50" r="17" fill="#FFFFFF" stroke="#1B5CD6" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>

      <span
        className={`absolute rounded-full bg-[#FAF9F6] px-2 text-[9.5px] font-bold uppercase tracking-[0.16em] text-[#8A6E43] sm:text-[10.5px] ${PILLAR_LABEL_POS[pillar]}`}
      >
        {pillar}
      </span>

      <div className="absolute left-1/2 top-1/2 flex w-[28%] -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
        <span className="text-[8.5px] font-bold uppercase tracking-[0.18em] text-[#8A6E43] sm:text-[10px]">Sistem</span>
        <span className="mt-1 text-[10.5px] font-extrabold leading-[1.18] text-[#14213F] sm:text-[13.5px]">{name}</span>
      </div>

      {nodes.map((n, i) => {
        const p = polar(NODE_ANGLES[i], ORBIT_R);
        return (
          <div
            key={n.number}
            // Üstteki kartlar yukarı, alttakiler aşağı doğru büyür — uzun (3 satır) adım başlıklarında
            // ekstra yükseklik merkezdeki hub'a değil dışa gider.
            className={`absolute w-[37%] -translate-x-1/2 ${p.y < 50 ? '-translate-y-[68%]' : '-translate-y-[32%]'}`}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            <div className="rd-sdv-card relative rounded-xl border bg-white px-2.5 py-2 sm:px-3.5 sm:py-3" style={{ animationDelay: `${i * slot}s` }}>
              <span
                className="rd-sdv-dot absolute -top-[5px] left-3 h-[9px] w-[9px] rounded-full border-[1.5px]"
                style={{ animationDelay: `${i * slot}s` }}
              />
              <span className="block text-[9.5px] font-bold tracking-[0.1em] text-[#1B5CD6] sm:text-[10.5px]">{n.number}</span>
              <span className="mt-0.5 block text-[10.5px] font-semibold leading-[1.25] text-[#14213F] sm:text-[12.5px]">{n.title}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
