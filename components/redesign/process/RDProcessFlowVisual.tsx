import { processSteps } from './processData';

// Hero'nun dekoratif/özet "Growth Operating Flow" görseli: 6 gerçek adımın kısa adları serpantin
// bir yol üzerinde, Büyüme → Analiz arası kesik çizgili "Sürekli Optimizasyon" dönüşü ve yol
// boyunca akan tek bir veri noktası. aria-hidden — adımların tam metni sayfada zaten var.
// Düğüm vurguları, noktanın o düğüme vardığı ana negatif animation-delay ile senkron (ilk döngü dahil).
const W = 400;
const H = 340;
const Y1 = 95;
const Y2 = 245;
const XL = 70;
const XM = 200;
const XR = 330;
const CYCLE = 10;

const NODES = [
  { x: XL, y: Y1 },
  { x: XM, y: Y1 },
  { x: XR, y: Y1 },
  { x: XR, y: Y2 },
  { x: XM, y: Y2 },
  { x: XL, y: Y2 },
];

const MAIN = `M${XL} ${Y1} L${XR} ${Y1} C${XR + 55} ${Y1} ${XR + 55} ${Y2} ${XR} ${Y2} L${XL} ${Y2}`;
const RETURN = `M${XL} ${Y2} C${XL - 55} ${Y2} ${XL - 55} ${Y1} ${XL} ${Y1}`;
const LOOP = `${MAIN} C${XL - 55} ${Y2} ${XL - 55} ${Y1} ${XL} ${Y1}`;

// Kübik bezier uzunluğu (örnekleyerek) — düğüm varış zamanlarını hesaplamak için.
function bezierLength(p0: number[], p1: number[], p2: number[], p3: number[]) {
  let len = 0;
  let prev = p0;
  for (let i = 1; i <= 40; i++) {
    const t = i / 40;
    const mt = 1 - t;
    const pt = [0, 1].map((k) => mt ** 3 * p0[k] + 3 * mt ** 2 * t * p1[k] + 3 * mt * t ** 2 * p2[k] + t ** 3 * p3[k]);
    len += Math.hypot(pt[0] - prev[0], pt[1] - prev[1]);
    prev = pt;
  }
  return len;
}
const SIDE = bezierLength([XR, Y1], [XR + 55, Y1], [XR + 55, Y2], [XR, Y2]);
const STRAIGHT = XR - XL;
const TOTAL = STRAIGHT * 2 + SIDE * 2;
const ARRIVAL = [0, XM - XL, STRAIGHT, STRAIGHT + SIDE, STRAIGHT + SIDE + (XR - XM), STRAIGHT * 2 + SIDE].map((d) => (d / TOTAL) * CYCLE);

export default function RDProcessFlowVisual() {
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-[40/34] w-full max-w-[560px]">
      <style>{`
        .rd-pf-dot { fill: #fff; stroke: #CFCBC2; animation: rd-pf-dot-kf ${CYCLE}s linear infinite; }
        @keyframes rd-pf-dot-kf {
          0% { fill: #1B5CD6; stroke: #1B5CD6; }
          9% { fill: #1B5CD6; stroke: #1B5CD6; }
          14%, 100% { fill: #fff; stroke: #CFCBC2; }
        }
        .rd-pf-label { color: #6A6A7A; animation: rd-pf-label-kf ${CYCLE}s linear infinite; }
        @keyframes rd-pf-label-kf {
          0%, 9% { color: #14213F; }
          14%, 100% { color: #6A6A7A; }
        }
        .rd-pf-pulse { offset-path: path('${LOOP}'); animation: rd-pf-travel ${CYCLE}s linear infinite; }
        @keyframes rd-pf-travel { from { offset-distance: 0%; } to { offset-distance: 100%; } }
        @media (prefers-reduced-motion: reduce) {
          .rd-pf-dot, .rd-pf-label { animation: none !important; }
          .rd-pf-pulse { animation: none !important; opacity: 0; }
        }
      `}</style>

      <div className="absolute inset-0 overflow-hidden rounded-[28px] border border-[#E5E5EC] bg-[#FAF9F6]">
        <span
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(20,33,63,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(20,33,63,0.045) 1px, transparent 1px)',
            backgroundSize: '26px 26px',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 15%, transparent 80%)',
            maskImage: 'radial-gradient(ellipse at center, black 15%, transparent 80%)',
          }}
        />
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" focusable="false">
        <path d={MAIN} fill="none" stroke="#1B5CD6" strokeOpacity="0.35" strokeWidth="1.6" strokeLinecap="round" />
        <path d={RETURN} fill="none" stroke="#C9A876" strokeWidth="1.4" strokeDasharray="3 5" strokeLinecap="round" />
        {NODES.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r="7"
            strokeWidth="1.8"
            className="rd-pf-dot"
            style={{ animationDelay: `${(ARRIVAL[i] - CYCLE).toFixed(2)}s` }}
          />
        ))}
        <circle r="4" fill="#C9A876" className="rd-pf-pulse" />
      </svg>

      <span className="absolute left-5 top-4 text-[9.5px] font-bold uppercase tracking-[0.2em] text-[#8A6E43] sm:left-6 sm:top-5 sm:text-[10.5px]">
        Growth Operating Flow
      </span>
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-[#E9DCC3] bg-white/80 px-3 py-1 text-[9.5px] font-bold uppercase tracking-[0.16em] text-[#8A6E43] sm:text-[10.5px]">
        Sürekli Optimizasyon
      </span>

      {processSteps.map((s, i) => {
        const n = NODES[i];
        const top = i < 3;
        return (
          <span
            key={s.number}
            className="absolute flex -translate-x-1/2 flex-col items-center text-center"
            style={{ left: `${(n.x / W) * 100}%`, top: `${(n.y / H) * 100}%`, transform: `translate(-50%, ${top ? 'calc(-100% - 16px)' : '16px'})` }}
          >
            <span className="text-[9.5px] font-bold tracking-[0.1em] text-[#1B5CD6] sm:text-[10.5px]">{s.number}</span>
            <span
              className="rd-pf-label text-[12px] font-bold sm:text-[14px]"
              style={{ animationDelay: `${(ARRIVAL[i] - CYCLE).toFixed(2)}s` }}
            >
              {s.short}
            </span>
          </span>
        );
      })}
    </div>
  );
}
