'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react';
import { PROJECT_HREF_BY_SHOWCASE } from '@/components/redesign/projects/projectDetails';

const focusRing = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B5CD6]';

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

// Seçili çalışmalar — onaylı kopya, birebir. Metrik/sonuç iddiası yok; projeye ait gerçek ekran
// görüntüsü olmadığı için panel logo sunumuyla kurulu. Ayrıntılı anlatımı hazır olan markalarda
// (projectDetails.ts) panele "Çalışmanın detayları" bağlantısı eklenir; diğerlerinde bağlantı yok.
// Bu markalar aşağıdaki "Diğer çalışmalar" şeridinde tekrar anlatılmaz.
type Showcase = {
  id: string;
  brand: string;
  // Logo yoksa marka adı tipografik gösterilir.
  logo?: { src: string; width: number; height: number; tabClassName: string; maxWidthPct: number };
  tone: string;
  category: string;
  title: string;
  desc: string;
  approach?: string;
};

const showcases: Showcase[] = [
  {
    id: 'asl',
    brand: 'ASL Çanta',
    logo: { src: '/redesign/logos/asl-canta.png', width: 2195, height: 944, tabClassName: 'h-6 sm:h-7', maxWidthPct: 44 },
    tone: 'linear-gradient(160deg,#EFE9DD 0%,#E6DFD0 100%)',
    category: 'E-ticaret altyapısı',
    title: 'Geniş katalog. Markaya özel alışveriş deneyimi.',
    desc: 'Ürün ve kategori yapısını, veri aktarımını ve Shopify bağlantılı web deneyimini birlikte ele aldık. Ürün keşfinden varyant seçimine kadar alışveriş akışının detayları üzerinde çalıştık.',
    approach: 'Tasarımı, ürün ve kategori mimarisiyle birlikte ele almak.',
  },
  {
    id: 'germanicialeather',
    brand: 'GermaniciaLeather',
    tone: 'linear-gradient(160deg,#EEE6DA 0%,#E3D8C7 100%)',
    category: 'Etsy mağaza ve ürün sunumu',
    title: 'Ürünün işçiliğini dijitalde görünür kılmak.',
    desc: 'Deri cüzdan ve aksesuarların Etsy sunumunu, ürün özellikleri ve alıcının arama niyeti üzerinden ele aldık. Listeleme metinlerini, görsel sıralamasını ve fiyatlandırmayı mağaza anlatımıyla birlikte değerlendirdik.',
    approach: 'Ürün sunumunu, alıcının arama niyetiyle birlikte kurgulamak.',
  },
  {
    id: 'ziynet',
    brand: 'Ziynet Bijüteri',
    logo: { src: '/redesign/logos/ziynet-bijuteri.png', width: 1691, height: 793, tabClassName: 'h-8 sm:h-9', maxWidthPct: 48 },
    tone: 'linear-gradient(160deg,#E7EAED 0%,#DCE0E5 100%)',
    category: 'B2B dijital showroom',
    title: 'Toptan ticaretin dijital vitrini.',
    desc: 'Shopify bağlantılı bir dijital showroom üzerinde çalıştık. Ürün ve kategori sunumunu, toptan alıcının inceleme ve teklif isteme ihtiyacı etrafında ele aldık.',
    approach: 'Deneyimi, toptan alıcının karar sürecine göre şekillendirmek.',
  },
  {
    id: 'berd',
    brand: 'BERD',
    logo: { src: '/redesign/logos/berd.png', width: 1720, height: 849, tabClassName: 'h-8 sm:h-9', maxWidthPct: 48 },
    tone: 'linear-gradient(160deg,#E4E6EA 0%,#D8DBE1 100%)',
    category: 'Amazon Avustralya',
    title: 'Yeni bir pazara girişin arkasındaki operasyon.',
    // Kurucunun kendi markası — müşteri projesi olarak anlatılmaz.
    desc: 'Kurucumuzun oluşturduğu BERD markasıyla Amazon Avustralya’da yeni popülerleşen ürünleri satışa sunduk. Marka oluşturma ve satış operasyonunun tamamını bizzat yürüttük.',
  },
];

function Wordmark({ large }: { large?: boolean }) {
  return (
    <span className={`font-bold tracking-[0.04em] text-[#14213F] ${large ? 'text-[24px] sm:text-[32px]' : 'text-[14px] sm:text-[15px]'}`}>
      Germanicia<span className="font-medium">Leather</span>
    </span>
  );
}

function SelectedWork() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  // WAI-ARIA tabs: sol/sağ oklar, Home/End — otomatik etkinleştirme. Sayfa yalnızca odaklanan sekme
  // sabit navbar/analiz butonunun altında kalıyorsa scroll-margin kadar kayar.
  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    const last = showcases.length - 1;
    const to = e.key === 'ArrowRight' ? (i === last ? 0 : i + 1) : e.key === 'ArrowLeft' ? (i === 0 ? last : i - 1) : e.key === 'Home' ? 0 : e.key === 'End' ? last : null;
    if (to === null) return;
    e.preventDefault();
    setActive(to);
    tabRefs.current[to]?.focus();
  };

  return (
    <div data-hm="body" className="mt-10 sm:mt-12">
      <div role="tablist" aria-label="Seçili çalışmalar" className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">
        {showcases.map((s, i) => {
          const selected = i === active;
          return (
            <button
              key={s.id}
              ref={(el) => { tabRefs.current[i] = el; }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${s.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${s.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onTabKey(e, i)}
              className={`rd-sw-tab relative flex h-[60px] items-center justify-center rounded-xl border px-3 transition-colors duration-200 sm:h-[72px] ${focusRing} ${
                selected ? 'border-[#14213F] bg-white shadow-[0_1px_2px_rgba(20,33,63,0.06)]' : 'border-[#E5E5EC] bg-transparent hover:border-[#B9BCC6] hover:bg-white/60'
              }`}
            >
              {s.logo ? (
                <Image
                  src={s.logo.src}
                  alt={s.brand}
                  width={s.logo.width}
                  height={s.logo.height}
                  sizes="96px"
                  draggable={false}
                  className={`${s.logo.tabClassName} w-auto object-contain transition-opacity duration-200 ${selected ? 'opacity-100' : 'opacity-60'}`}
                />
              ) : (
                <Wordmark />
              )}
              {selected && <span aria-hidden className="absolute inset-x-5 -bottom-px h-[2px] rounded-full bg-[#C9A876]" />}
            </button>
          );
        })}
      </div>

      {showcases.map((s, i) => (
        <div
          key={s.id}
          role="tabpanel"
          id={`${baseId}-panel-${s.id}`}
          aria-labelledby={`${baseId}-tab-${s.id}`}
          hidden={i !== active}
          tabIndex={0}
          className={`rd-sw-panel mt-4 overflow-hidden rounded-2xl border border-[#E5E5EC] bg-white md:mt-5 md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] ${focusRing}`}
        >
          <div aria-hidden className="relative flex h-[150px] items-center justify-center sm:h-[200px] md:h-auto md:min-h-[320px]" style={{ background: s.tone }}>
            {s.logo ? (
              <Image
                src={s.logo.src}
                alt=""
                width={s.logo.width}
                height={s.logo.height}
                sizes="(min-width: 768px) 320px, 60vw"
                draggable={false}
                className="h-auto w-auto object-contain"
                style={{ maxWidth: `${s.logo.maxWidthPct}%`, maxHeight: '58%' }}
              />
            ) : (
              <Wordmark large />
            )}
            <div className="absolute inset-0 ring-1 ring-inset ring-black/5" />
          </div>
          <div className="p-6 sm:p-8 md:flex md:flex-col md:justify-center lg:p-12">
            <p className="text-[11px] font-bold tracking-[0.2em] text-[#71717D] uppercase">{s.category}</p>
            <h3 className="mt-2.5 text-[22px] leading-snug font-bold text-[#14213F] sm:text-[26px]">{s.title}</h3>
            <p className="mt-3 max-w-[58ch] text-[15px] leading-relaxed text-[#5A5A6A] sm:text-[16px]">{s.desc}</p>
            {s.approach && (
              <p className="mt-6 max-w-[58ch] border-t border-[#E5E5EC] pt-5 text-[15px] leading-snug text-[#14213F] sm:text-[16px]">
                <span className="mr-2 text-[11px] font-bold tracking-[0.18em] text-[#8A6E43] uppercase">Yaklaşımımız</span>
                <span className="font-semibold">{s.approach}</span>
              </p>
            )}
            {PROJECT_HREF_BY_SHOWCASE[s.id] && (
              <Link
                href={PROJECT_HREF_BY_SHOWCASE[s.id]}
                className={`mt-5 inline-flex w-fit rounded text-[15px] font-semibold text-[#1B5CD6] transition-colors hover:text-[#14213F] ${focusRing}`}
              >
                Çalışmanın detayları →
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// Genel GloventGlobal kapsamı — tek bir projeye veya tek bir çıkış noktasına bağlı değil. Rota,
// ofis, depo veya aktif ticaret hattı ima etmez; yalnızca tipografik ülke listesi.
const COUNTRIES = ['Türkiye', 'Çin', 'ABD', 'Kanada', 'Avustralya', 'BAE'];

function InternationalScope() {
  return (
    <div data-hm="fade" className="mt-10 border-t border-[#E5E5EC] pt-8 sm:mt-12 sm:pt-10 xl:grid xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] xl:items-center xl:gap-12">
      <div>
        <h3 className="text-[1.45rem] leading-tight font-extrabold tracking-tight text-[#14213F] sm:text-[1.7rem]">
          Tek bir rota değil. İşinize uygun ticaret modeli.
        </h3>
        <p className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-[#5A5A6A] sm:text-[16px]">
          Türkiye’den yurt dışına açılım, Çin’den tedarik veya farklı ülkelerde pazaryeri operasyonları… Ürüne, hedef pazara ve iş modeline göre operasyon kuruyoruz.
        </p>
      </div>
      {/* Mobil: 3 sütunlu ızgara (satır başında ayırıcı nokta kalmasın); sm+: tek satır, noktalı. */}
      <ul aria-label="Ülkeler" className="mt-6 grid grid-cols-3 gap-x-4 gap-y-2 sm:flex sm:flex-nowrap sm:items-center sm:gap-3 xl:mt-0 xl:justify-end">
        {COUNTRIES.map((c, i) => (
          <li key={c} className="flex items-center gap-3 text-[16px] font-semibold text-[#14213F] sm:text-[17px]">
            {i > 0 && <span aria-hidden className="hidden text-[#C9A876] sm:inline">·</span>}
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Diğer referanslar — ASL Çanta, BERD ve Ziynet Bijüteri yukarıda seçili çalışmalar olarak
// anlatıldığı için burada tekrar edilmez.
const projects: Project[] = [
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
        <h4 className="mt-2 text-[24px] font-bold text-[#14213F] sm:text-[26px]">{p.brand}</h4>
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
  // WCAG 2.2.2: 5 sn'den uzun süren otomatik hareket için kalıcı duraklatma kontrolü (hover/focus/drag
  // duraklatması geçici; dokunmatik tablet kullanıcıları için yeterli değil).
  const [userPaused, setUserPaused] = useState(false);
  const userPausedRef = useRef(false);
  const toggleUserPaused = () => {
    const next = !userPausedRef.current;
    userPausedRef.current = next;
    setUserPaused(next);
    if (next) paused.current = true;
    else maybeResume();
  };

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
    if (!userPausedRef.current && !hovering.current && !focused.current && !drag.current.active) paused.current = false;
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
    <>
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
        {/* 3 kopya: rail 4 karta indiği için geniş ekranlarda döngü sırasında sağda boşluk kalmasın. */}
        {[...projects, ...projects, ...projects].map((p, i) => (
          <ProjectCard key={`${p.brand}-${i}`} p={p} hidden={i >= projects.length} />
        ))}
      </div>
    </div>
    <div className="mx-auto mt-5 flex max-w-[1400px] justify-start px-6 sm:px-8">
      <button
        type="button"
        onClick={toggleUserPaused}
        aria-label={userPaused ? 'Proje galerisi animasyonunu devam ettir' : 'Proje galerisi animasyonunu duraklat'}
        className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-[#D6D6DC] px-4 text-[13.5px] font-semibold text-[#14213F] transition-colors hover:border-[#1B5CD6] hover:text-[#1B5CD6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B5CD6]"
      >
        <svg aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
          {userPaused ? <path d="M4 2.5v11l9-5.5-9-5.5Z" /> : <path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" />}
        </svg>
        {userPaused ? 'Devam Et' : 'Duraklat'}
      </button>
    </div>
    </>
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
// scroll'u + CSS snap. Öne çıkanlar dışındaki gerçek referanslar.
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
        .rd-sw-tab { scroll-margin-top: 104px; scroll-margin-bottom: 120px; }
        .rd-sw-panel:not([hidden]) { animation: rd-sw-in 200ms ease-out; }
        @keyframes rd-sw-in { from { opacity: 0; } to { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) { .rd-sw-panel:not([hidden]) { animation: none; } }
      `}</style>
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        {/* data-hm işaretleri yalnız ana sayfada (home-motion.css) etkin. */}
        <div data-hm="head" className="max-w-[52ch]">
          <p className="text-[11.5px] font-bold tracking-[0.26em] text-[#1B5CD6] uppercase">Seçili çalışmalar</p>
          <h2 className="mt-3 text-[2.2rem] leading-[1.1] font-extrabold tracking-tight text-[#14213F] sm:text-[2.85rem]">Farklı işler. İşe özel kararlar.</h2>
          <p className="mt-4 text-[1.1rem] leading-relaxed text-[#5A5A6A]">
            Markanın ürününü, satış kanalını ve operasyonunu birlikte ele aldığımız çalışmalardan seçmeler.
          </p>
        </div>

        <SelectedWork />

        <InternationalScope />

        <h3 className="mt-14 text-[11.5px] font-bold tracking-[0.26em] text-[#71717D] uppercase sm:mt-16">Diğer çalışmalar</h3>
      </div>

      {/* Desktop/tablet (768px+) — mevcut full-bleed marquee/StaticRail birebir korunuyor. */}
      <div className="mt-6 hidden w-screen ml-[calc(50%-50vw)] px-0 sm:px-7 md:block">
        {reducedMotion ? <StaticRail /> : <Marquee />}
      </div>

      {/* Mobil (0-767px) — auto-scroll'suz, kullanıcı kontrollü native swipe rail, full-bleed
          (mx-auto max-w-[1400px] sınırının dışına taşıyor, desktop marquee ile aynı teknik). */}
      <div className="mt-5 w-screen ml-[calc(50%-50vw)] md:hidden">
        <MobileRail />
      </div>
    </section>
  );
}
