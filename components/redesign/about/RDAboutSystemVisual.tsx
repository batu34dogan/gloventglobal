import { aboutCapabilities } from './aboutData';

// Hakkımızda Hero'nun kurumsal "company architecture" görseli — /hizmetler Hero'daki elmas/spoke
// diyagramının kopyası değil: dört yetkinlik köşelerde blok olarak, merkezde GLOBAL GROWTH çekirdeği,
// ortadan geçen koyu yatay AI + DATA katman bandı ve bloklardan çekirdeğe akan kesikli bağlantılar.
// Dekoratif (aria-hidden) — yetkinlikler sayfada metin olarak ayrıca anlatılıyor.
const TILE_POS = [
  { left: '4%', top: '6%' },
  { right: '4%', top: '6%' },
  { left: '4%', bottom: '6%' },
  { right: '4%', bottom: '6%' },
];
// Blokların iç köşeleri → çekirdek (viewBox 0 0 400 400)
const CONNECTORS = [
  'M 150 98 L 172 170',
  'M 250 98 L 228 170',
  'M 150 302 L 172 230',
  'M 250 302 L 228 230',
];

export default function RDAboutSystemVisual() {
  return (
    <div aria-hidden="true" className="rd-av relative mx-auto aspect-square w-full max-w-[540px]">
      <style>{`
        .rd-av-conn { stroke-dasharray: 3 5; animation: rd-av-flow 2.4s linear infinite; }
        @keyframes rd-av-flow { to { stroke-dashoffset: -16; } }
        .rd-av-pulse { animation: rd-av-travel 6s ease-in-out infinite; }
        @keyframes rd-av-travel {
          0% { left: 26%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { left: 74%; opacity: 0; }
        }
        .rd-av-core-ring { transform-origin: 200px 200px; animation: rd-av-breathe 5s ease-in-out infinite; }
        @keyframes rd-av-breathe { 0%, 100% { opacity: .55; transform: scale(1); } 50% { opacity: .25; transform: scale(1.035); } }
        @media (prefers-reduced-motion: reduce) {
          .rd-av-conn, .rd-av-core-ring { animation: none !important; }
          .rd-av-pulse { animation: none !important; opacity: 0 !important; }
        }
      `}</style>

      <div className="absolute inset-0 overflow-hidden rounded-[28px] border border-[#E5E5EC] bg-[#FAF9F6]">
        <span
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(20,33,63,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(20,33,63,0.045) 1px, transparent 1px)',
            backgroundSize: '26px 26px',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 85%)',
            maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 85%)',
          }}
        />
      </div>

      {/* Yatay AI + DATA katman bandı */}
      <div className="absolute inset-x-[4%] top-1/2 h-[9%] -translate-y-1/2 rounded-full bg-[#0F1E3C]">
        <span lang="en" className="absolute left-[5%] top-1/2 -translate-y-1/2 text-[8.5px] font-bold uppercase tracking-[0.2em] text-[#C9A876] sm:text-[10px]">
          AI + Data
        </span>
        <span lang="en" className="absolute right-[5%] top-1/2 -translate-y-1/2 text-[8.5px] font-bold uppercase tracking-[0.2em] text-white/55 sm:text-[10px]">
          Layer
        </span>
        <span className="rd-av-pulse absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A876] shadow-[0_0_0_3px_rgba(201,168,118,0.25)]" />
      </div>

      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" focusable="false">
        {CONNECTORS.map((d) => (
          <path key={d} d={d} fill="none" stroke="#1B5CD6" strokeOpacity="0.55" strokeWidth="1.6" strokeLinecap="round" className="rd-av-conn" />
        ))}
        <circle cx="200" cy="200" r="60" fill="none" stroke="#C9A876" strokeWidth="1.2" className="rd-av-core-ring" />
        <circle cx="200" cy="200" r="50" fill="#FFFFFF" stroke="#1B5CD6" strokeWidth="1.8" />
      </svg>

      <div className="absolute left-1/2 top-1/2 flex w-[22%] -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
        <span lang="en" className="text-[8.5px] font-bold uppercase tracking-[0.2em] text-[#8A6E43] sm:text-[10px]">Global</span>
        <span className="text-[12px] font-extrabold tracking-[0.04em] text-[#14213F] sm:text-[15px]">GROWTH</span>
      </div>

      {aboutCapabilities.map((c, i) => (
        <div
          key={c.en}
          className="absolute w-[38%] rounded-2xl border border-[#E3E1DA] bg-white px-3 py-3 shadow-[0_14px_30px_-26px_rgba(20,33,63,0.5)] sm:px-4 sm:py-4"
          style={TILE_POS[i]}
        >
          <span className="block h-[2px] w-8 rounded-full bg-gradient-to-r from-[#1B5CD6] to-[#C9A876]" />
          <span lang="en" className="mt-2.5 block text-[9px] font-bold uppercase tracking-[0.18em] text-[#1B5CD6] sm:text-[10.5px]">{c.en}</span>
          <span className="mt-0.5 block text-[13px] font-extrabold text-[#14213F] sm:text-[17px]">{c.title}</span>
        </div>
      ))}
    </div>
  );
}
