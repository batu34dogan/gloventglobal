'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

type Project = {
  brand: string;
  category: string;
  capability: string;
  desc: string;
  tone: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  // Per-brand cap (% of the image area's width) — logos differ enough in shape/density
  // that a single uniform rule made some read too small and others too large.
  logoMaxWidthPct: number;
};

const projects: Project[] = [
  {
    brand: 'ASL Çanta',
    category: 'E-Commerce',
    capability: 'Shopify · Commerce Infrastructure · UX',
    desc: 'Geniş ürün kataloğu için ürün mimarisinden kullanıcı deneyimine uzanan modern e-ticaret ve dijital operasyon altyapısı.',
    tone: 'linear-gradient(160deg,#EFE9DD 0%,#E6DFD0 100%)',
    logo: '/redesign/logos/asl-canta.png',
    logoWidth: 2195,
    logoHeight: 944,
    logoMaxWidthPct: 38,
  },
  {
    brand: 'BERD',
    category: 'Global Commerce',
    capability: 'Amazon · Market Entry · Growth',
    desc: 'Türkiye’den global pazarlara açılma sürecinde pazaryeri, satış ve büyüme yapısının oluşturulması.',
    tone: 'linear-gradient(160deg,#E4E6EA 0%,#D8DBE1 100%)',
    logo: '/redesign/logos/berd.png',
    logoWidth: 1720,
    logoHeight: 849,
    logoMaxWidthPct: 51,
  },
  {
    brand: 'Güvenli Adımlar',
    category: 'Amazon',
    capability: 'Amazon · Listing · Marketplace Operations',
    desc: 'Amazon satış operasyonunun ürün konumlandırması, listeleme ve pazaryeri süreçleriyle yapılandırılması.',
    tone: 'linear-gradient(160deg,#EDEBE6 0%,#E3E0D8 100%)',
    logo: '/redesign/logos/guvenli-adimlar.png',
    logoWidth: 1292,
    logoHeight: 577,
    logoMaxWidthPct: 58,
  },
  {
    brand: 'Ziynet Bijüteri',
    category: 'B2B',
    capability: 'B2B · Digital Showroom · Global',
    desc: 'Türkiye’den global alıcılara ulaşmayı destekleyen dijital B2B satış ve marka sunum yapısı.',
    tone: 'linear-gradient(160deg,#E7EAED 0%,#DCE0E5 100%)',
    logo: '/redesign/logos/ziynet-bijuteri.png',
    logoWidth: 1691,
    logoHeight: 793,
    logoMaxWidthPct: 49,
  },
  {
    brand: 'RituelCo',
    category: 'Etsy',
    capability: 'Etsy · Commerce · Global',
    desc: 'Global dijital müşterilere ulaşmak için Etsy odaklı satış ve commerce yapısı.',
    tone: 'linear-gradient(160deg,#F0ECE3 0%,#E7E1D3 100%)',
    logo: '/redesign/logos/rituelco.png',
    logoWidth: 1692,
    logoHeight: 1689,
    logoMaxWidthPct: 40,
  },
  {
    brand: 'GLC',
    category: 'Etsy',
    capability: 'Etsy · Marketplace · Global',
    desc: 'Etsy üzerinden global müşterilere ulaşmayı destekleyen pazaryeri ve dijital satış yapısı.',
    tone: 'linear-gradient(160deg,#ECE7DC 0%,#E1DACB 100%)',
    logo: '/redesign/logos/glc.png',
    logoWidth: 1254,
    logoHeight: 1254,
    logoMaxWidthPct: 35,
  },
  {
    brand: 'Maxpace',
    category: 'Amazon',
    capability: 'Amazon · Marketplace · Global Expansion',
    desc: 'Amazon üzerinden farklı küresel pazarlara açılmayı destekleyen satış ve pazaryeri yapılanması.',
    tone: 'linear-gradient(160deg,#E3E5E8 0%,#D7DAE0 100%)',
    logo: '/redesign/logos/maxpace.png',
    logoWidth: 2048,
    logoHeight: 555,
    logoMaxWidthPct: 60,
  },
];

const CARD_CLASS = 'w-[85vw] shrink-0 sm:w-[450px]';

function ProjectCard({
  p,
  hidden,
  widthClassName,
  imageAspectClassName,
}: {
  p: Project;
  hidden?: boolean;
  widthClassName?: string;
  imageAspectClassName?: string;
}) {
  return (
    <article className={widthClassName ?? CARD_CLASS} aria-hidden={hidden || undefined}>
      <div className={`relative overflow-hidden rounded-2xl ${imageAspectClassName ?? 'aspect-[16/10]'}`}>
        <div aria-hidden className="absolute inset-0" style={{ background: p.tone }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={p.logo}
            alt=""
            width={p.logoWidth}
            height={p.logoHeight}
            draggable={false}
            sizes="(min-width: 640px) 280px, 45vw"
            className="h-auto w-auto object-contain"
            style={{ maxWidth: `${p.logoMaxWidthPct}%`, maxHeight: '75%' }}
          />
        </div>
        <div aria-hidden className="absolute inset-0 ring-1 ring-inset ring-black/5" />
      </div>
      <div className="pt-6">
        <p className="text-[11px] font-bold tracking-[0.2em] text-[#71717D] uppercase">{p.category}</p>
        <h3 className="mt-2 text-[24px] font-bold text-[#14213F] sm:text-[26px]">{p.brand}</h3>
        <p className="mt-2.5 text-[14.5px] leading-relaxed text-[#5A5A6A]">{p.desc}</p>
        <p className="mt-3.5 text-[12.5px] font-semibold tracking-[0.05em] text-[#71717D]">{p.capability}</p>
      </div>
    </article>
  );
}

const SPEED_PX_PER_S = 39;
const RESUME_DELAY_MS = 900;

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}
const getReducedMotionSnapshot = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const getReducedMotionServerSnapshot = () => false;

function useReducedMotion() {
  return useSyncExternalStore(subscribeReducedMotion, getReducedMotionSnapshot, getReducedMotionServerSnapshot);
}

function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useRef(0);
  const loopWidth = useRef(0);
  const rafId = useRef<number | undefined>(undefined);
  const lastTs = useRef<number | undefined>(undefined);
  const paused = useRef(false);
  const hovering = useRef(false);
  const focused = useRef(false);
  const drag = useRef({ active: false, startX: 0, baseX: 0, moved: false });
  const resumeTimer = useRef<number | undefined>(undefined);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const secondSetFirstCard = track.children[projects.length] as HTMLElement | undefined;
      if (secondSetFirstCard) loopWidth.current = secondSetFirstCard.offsetLeft;
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    const step = (ts: number) => {
      const track = trackRef.current;
      if (track) {
        if (lastTs.current == null) lastTs.current = ts;
        // Clamp dt so returning to a long-backgrounded tab resumes smoothly instead of jumping by the elapsed real time.
        const dt = Math.min((ts - lastTs.current) / 1000, 0.1);
        lastTs.current = ts;
        if (!paused.current && !drag.current.active) {
          x.current -= SPEED_PX_PER_S * dt;
          const w = loopWidth.current;
          if (w > 0 && x.current <= -w) x.current += w;
        }
        track.style.transform = `translate3d(${x.current}px,0,0)`;
      }
      rafId.current = requestAnimationFrame(step);
    };
    rafId.current = requestAnimationFrame(step);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      lastTs.current = undefined;
    };
  }, []);

  const wrap = (val: number) => {
    const w = loopWidth.current;
    if (w <= 0) return val;
    let v = val;
    while (v <= -w) v += w;
    while (v > 0) v -= w;
    return v;
  };

  const maybeResume = () => {
    if (!hovering.current && !focused.current && !drag.current.active) paused.current = false;
  };

  const scheduleResume = () => {
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(maybeResume, RESUME_DELAY_MS);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    paused.current = true;
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    drag.current = { active: true, startX: e.clientX, baseX: x.current, moved: false };
    setDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 3) drag.current.moved = true;
    x.current = wrap(drag.current.baseX + dx);
  };

  const endDrag = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setDragging(false);
    try { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); } catch { /* noop */ }
    scheduleResume();
  };

  const onWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    e.preventDefault();
    paused.current = true;
    x.current = wrap(x.current - e.deltaX);
    scheduleResume();
  };

  const onMouseEnter = () => {
    hovering.current = true;
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    paused.current = true;
  };
  const onMouseLeave = () => {
    hovering.current = false;
    if (!drag.current.active) maybeResume();
  };
  const onFocus = () => {
    focused.current = true;
    paused.current = true;
  };
  const onBlur = () => {
    focused.current = false;
    maybeResume();
  };

  return (
    <div
      className="overflow-hidden"
      onWheel={onWheel}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        ref={trackRef}
        role="region"
        aria-label="Proje galerisi"
        tabIndex={0}
        onFocus={onFocus}
        onBlur={onBlur}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={`flex w-max touch-pan-y gap-6 will-change-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B5CD6] ${dragging ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
      >
        {[...projects, ...projects].map((p, i) => (
          <ProjectCard key={`${p.brand}-${i}`} p={p} hidden={i >= projects.length} />
        ))}
      </div>
    </div>
  );
}

function StaticRail() {
  return (
    <div className="flex gap-6 overflow-x-auto pb-2">
      {projects.map(p => <ProjectCard key={p.brand} p={p} />)}
      <div aria-hidden className="w-px shrink-0 sm:w-4" />
    </div>
  );
}

// Mobil (0-767px): sürekli otomatik kayan marquee kapalı — kullanıcı kontrollü, native
// scroll-snap rail. Auto-scroll yok, JS-driven transform yok, sadece tarayıcının kendi yatay
// scroll'u + CSS snap. 7 gerçek proje aynen korunuyor.
function MobileRail() {
  return (
    <div className="rd-cases-mobile-rail flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2">
      {projects.map((p) => (
        <ProjectCard
          key={p.brand}
          p={p}
          widthClassName="w-[86vw] shrink-0 snap-center"
          imageAspectClassName="aspect-[4/3]"
        />
      ))}
      <div aria-hidden className="w-px shrink-0" />
    </div>
  );
}

export default function RDCases() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="hikayeler" className="scroll-mt-20 overflow-x-hidden bg-[#FAF9F6] py-16 sm:py-20">
      <style>{`
        .rd-cases-mobile-rail { scrollbar-width: none; -ms-overflow-style: none; }
        .rd-cases-mobile-rail::-webkit-scrollbar { display: none; }
      `}</style>
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="max-w-[52ch]">
          <p className="text-[11.5px] font-bold tracking-[0.26em] text-[#1B5CD6] uppercase">Projeler</p>
          <h2 className="mt-3 text-[2.6rem] font-extrabold tracking-tight text-[#14213F] sm:text-[2.85rem]">Birlikte Kurduğumuz Sistemler</h2>
          <p className="mt-4 text-[1.1rem] leading-relaxed text-[#5A5A6A]">
            Her marka için aynı reçeteyi değil; ihtiyacına göre strateji, teknoloji, commerce ve operasyon sistemleri kuruyoruz.
          </p>
        </div>
      </div>

      {/* Desktop/tablet (768px+) — mevcut full-bleed marquee/StaticRail birebir korunuyor. */}
      <div className="mt-[42px] hidden w-screen ml-[calc(50%-50vw)] px-0 sm:px-7 md:block">
        {reducedMotion ? <StaticRail /> : <Marquee />}
      </div>

      {/* Mobil (0-767px) — auto-scroll'suz, kullanıcı kontrollü native swipe rail, full-bleed
          (mx-auto max-w-[1400px] sınırının dışına taşıyor, desktop marquee ile aynı teknik). */}
      <div className="mt-[32px] w-screen ml-[calc(50%-50vw)] md:hidden">
        <MobileRail />
      </div>
    </section>
  );
}
