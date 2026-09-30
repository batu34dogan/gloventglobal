'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { trackEvent } from '@/lib/analytics';
import '@/components/analysis/glo/glo-avatar.css';

// Sağ alttaki Glo tanıtım düğmesi (Glo açıkken RDAnalysisCTA yerine). Tıklama mevcut analiz modalını
// ('open-analysis-widget') açar — ayrı sohbet sistemi yok.
// - Karakter düğmenin üst kenarından hafifçe taşar; düğmenin içinde olduğu için tamamı tıklanabilir.
// - İlk görünüşte bir kez ~600 ms selam (glo-greet); gizlenip yeniden görününce tekrarlanmaz. Reduced-motion: yok.
// - Çakışma: footer görünürken; [data-fab-avoid] (hero CTA'ları) veya klavye odağı düğme+karakter alanına
//   girerken gizlenir (eski davranış korunur, alan karakteri de kapsar).
// - Tanışma balonu: ~5 sn sonra, koşullar uygunsa (çerez banner'ı/modal/menü yok, düğme görünür, balon sayfadaki
//   bir işlemi veya odağı örtmüyor) sekme oturumunda bir kez. Gösterilmeden hak tüketilmez. Odak çalmaz,
//   canlı bölge duyurusu yapmaz. Kapatma modalı açmaz; modal açılınca balon kapanır ve bir daha gelmez.

const INTRO_KEY = 'glo_intro_bubble_seen';
const INTRO_DELAY_MS = 5000;
let memorySeen = false; // sessionStorage kullanılamazsa bellek içi yedek

function introSeen(): boolean {
  try {
    return window.sessionStorage.getItem(INTRO_KEY) === '1' || memorySeen;
  } catch {
    return memorySeen;
  }
}
function markIntroSeen() {
  memorySeen = true;
  try {
    window.sessionStorage.setItem(INTRO_KEY, '1');
  } catch {
    /* bellek içi yedek yeterli */
  }
}

type Rect = { left: number; right: number; top: number; bottom: number };
const union = (a: DOMRect, b?: DOMRect | null): Rect =>
  b ? { left: Math.min(a.left, b.left), right: Math.max(a.right, b.right), top: Math.min(a.top, b.top), bottom: Math.max(a.bottom, b.bottom) } : a;
const hits = (r: DOMRect, z: Rect, pad = 8) => r.width > 0 && r.height > 0 && r.left < z.right && r.right > z.left && r.top < z.bottom + pad && r.bottom > z.top - pad;
const INTERACTIVE = 'a[href], button, input, select, textarea, [role="button"], [tabindex]:not([tabindex="-1"])';

type Bubble = 'idle' | 'measure' | 'open' | 'done';

export default function GloLauncher({ analyticsLocation }: { analyticsLocation: string }) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const charRef = useRef<HTMLSpanElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [overFooter, setOverFooter] = useState(false);
  const [overContent, setOverContent] = useState(false);
  const [greeted, setGreeted] = useState(false);
  const [bubble, setBubble] = useState<Bubble>('idle');
  const [suppressed, setSuppressed] = useState(false); // açık balon geçici gizli (çakışma/footer/menü/çerez)
  const suppressedNow = useRef(false);
  const bubbleNow = useRef<Bubble>('idle');
  const delayPassed = useRef(false);
  const footerNow = useRef(false);
  const hidden = overFooter || overContent;

  // Footer görünürken gizle (eski davranış).
  useEffect(() => {
    const footer = document.querySelector('[data-site-footer]');
    if (!footer || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => {
      footerNow.current = entry.isIntersecting;
      setOverFooter(entry.isIntersecting);
    });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  // Tanışma balonu: oturumda daha önce gösterildiyse hiç başlamaz; değilse ~5 sn sonra aday olur.
  useEffect(() => {
    const t = window.setTimeout(() => {
      if (introSeen()) {
        bubbleNow.current = 'done';
        setBubble('done');
      } else delayPassed.current = true;
    }, INTRO_DELAY_MS);
    return () => window.clearTimeout(t);
  }, []);

  // Modal açılınca balon kapanır ve tekrar belirmez.
  useEffect(() => {
    const onOpen = () => {
      markIntroSeen();
      bubbleNow.current = 'done';
      setBubble('done');
    };
    window.addEventListener('open-analysis-widget', onOpen);
    return () => window.removeEventListener('open-analysis-widget', onOpen);
  }, []);

  // Çakışma ve balon koşulları — kaydırma/boyut/odak değişimlerinde ve periyodik (balon beklerken).
  useEffect(() => {
    let raf = 0;
    const setB = (next: Bubble) => {
      if (bubbleNow.current === next) return;
      bubbleNow.current = next;
      setBubble(next);
    };
    const check = () => {
      raf = 0;
      const btn = btnRef.current;
      if (!btn) return;
      // Düğme alanı = kutu + dışarı taşan karakter (gizliyken de ölçü geçerli: visibility:hidden).
      const zone = union(btn.getBoundingClientRect(), charRef.current?.getBoundingClientRect());
      const bubbleEl = bubbleRef.current;
      const own = (el: Element) => btn.contains(el) || Boolean(bubbleEl?.contains(el));
      const active = document.activeElement;
      // Açık bir iletişim kutusunun (Glo modalı) içindeki odak sayılmaz: modal düğmeyi zaten örter; düğme gizlenirse
      // modal kapanınca odak ona geri dönemez (mobilde alt sayfa düğme alanıyla çakışıyordu).
      const focusEl =
        active instanceof HTMLElement && active !== document.body && !own(active) && !active.closest('[role="dialog"]') && active.matches(':focus-visible')
          ? active
          : null;
      const fabCovers =
        Boolean(focusEl && hits(focusEl.getBoundingClientRect(), zone)) ||
        [...document.querySelectorAll('[data-fab-avoid]')].some((el) => hits(el.getBoundingClientRect(), zone));
      setOverContent(fabCovers);
      const fabHidden = fabCovers || footerNow.current;

      const state = bubbleNow.current;
      if (state === 'done') return;
      const blocked =
        fabHidden ||
        Boolean(document.querySelector('[role="region"][aria-label="Çerez tercihleri"]')) ||
        Boolean(document.querySelector('[role="dialog"]')) ||
        Boolean(document.querySelector('header [aria-expanded="true"]'));
      if (state === 'idle') {
        // Aday: gecikme geçti, engel yok → görünmez yerleşip ölçülür (hak henüz tüketilmez).
        if (delayPassed.current && !blocked) setB('measure');
        return;
      }
      if (!bubbleEl) return;
      const b = bubbleEl.getBoundingClientRect();
      const fits = b.left >= 8 && b.right <= document.documentElement.clientWidth - 8 && b.top >= 8;
      const coversAction =
        [...document.querySelectorAll(INTERACTIVE)].some((el) => !own(el) && hits(el.getBoundingClientRect(), b, 4) && isVisible(el) && isHitTestable(el, own)) ||
        Boolean(focusEl && hits(focusEl.getBoundingClientRect(), b, 4));
      if (state === 'measure') {
        if (blocked) setB('idle');
        else if (fits && !coversAction) {
          markIntroSeen(); // hak yalnız gerçekten gösterilince tüketilir
          setB('open');
        }
        return;
      }
      // Açıkken koşul bozulursa (sayfa kaydırılırken altından bir işlem geçmesi, footer, menü, çerez alanı…) balon
      // KALICI kapanmaz, yalnız geçici gizlenir ve koşul düzelince aynı yerde yeniden görünür. Süreye bağlı kapanma
      // yok; balonu yalnız kullanıcının kapatması veya Glo modalının açılması sonlandırır.
      const suppress = blocked || coversAction || !fits;
      if (suppressedNow.current !== suppress) {
        suppressedNow.current = suppress;
        setSuppressed(suppress);
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    schedule();
    const poll = window.setInterval(schedule, 700);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    document.addEventListener('focusin', schedule);
    document.addEventListener('focusout', schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(poll);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      document.removeEventListener('focusin', schedule);
      document.removeEventListener('focusout', schedule);
    };
  }, []);

  const openAnalysis = () => {
    trackEvent('free_analysis_cta_click', { location: analyticsLocation });
    window.dispatchEvent(new Event('open-analysis-widget'));
  };
  const dismiss = () => {
    markIntroSeen();
    bubbleNow.current = 'done';
    setBubble('done');
  };

  const showBubble = bubble === 'measure' || bubble === 'open';
  return (
    <>
      <style>{`
        .glo-launcher {
          transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease, opacity .2s ease, visibility .2s;
          box-shadow: 0 8px 24px -14px rgba(0,0,0,0.45);
        }
        .glo-launcher.is-hidden, .glo-intro.is-hidden { opacity: 0; visibility: hidden; pointer-events: none; }
        /* Balon metni bir kerede, kısa ve yumuşak geçişle görünür (daktilo/kayan yazı yok). */
        .glo-intro { transition: opacity .25s ease, transform .25s ease, visibility .25s; }
        .glo-intro.is-hidden { transform: translateY(4px); }
        /* Klavye odağı butonun (taşan karakter dahil) altında kalmasın. */
        html { scroll-padding-bottom: calc(124px + env(safe-area-inset-bottom)); }
        @media (min-width: 640px) { html { scroll-padding-bottom: calc(156px + env(safe-area-inset-bottom)); } }
        .glo-launcher-grid {
          position: absolute; inset: 0; pointer-events: none; border-radius: inherit; overflow: hidden;
          background-image:
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 11px 11px;
        }
        @media (hover: hover) and (pointer: fine) {
          .glo-launcher:hover { transform: translateY(-2px); border-color: rgba(27,92,214,0.45); box-shadow: 0 10px 26px -14px rgba(0,0,0,0.5); }
        }
        @media (prefers-reduced-motion: reduce) {
          .glo-launcher, .glo-launcher:hover, .glo-intro { transition: none !important; transform: none !important; }
        }
      `}</style>

      {showBubble && (
        <div
          ref={bubbleRef}
          aria-hidden={bubble === 'measure' ? true : undefined}
          className={`glo-intro fixed z-[45] w-[min(280px,calc(100vw-32px))] rounded-2xl border border-[#E5E5EC] bg-[#FAF9F6] py-3 pl-4 pr-10 text-left shadow-[0_12px_32px_-18px_rgba(15,30,60,0.45)] right-[calc(16px+env(safe-area-inset-right))] bottom-[calc(118px+env(safe-area-inset-bottom))] sm:right-[calc(30px+env(safe-area-inset-right))] sm:bottom-[calc(152px+env(safe-area-inset-bottom))] ${
            bubble === 'measure' || hidden || suppressed ? 'is-hidden' : ''
          }`}
        >
          <p className="text-[14px] leading-snug text-[#14213F]">
            <strong className="font-bold">Merhaba, ben Glo.</strong> İşinizin bir sonraki adımını birlikte netleştirelim.
          </p>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Tanışma mesajını kapat"
            className="absolute right-1.5 top-1.5 flex h-8 w-8 items-center justify-center rounded-full text-[#4A4A5A] hover:bg-[#14213F]/[0.06] hover:text-[#14213F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#1B5CD6]"
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
              <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}

      <button
        ref={btnRef}
        type="button"
        onClick={openAnalysis}
        aria-label="Glo ile konuş — Ücretsiz ön analiz"
        className={`glo-launcher ${hidden ? 'is-hidden' : ''} fixed z-[45] flex items-center rounded-[17px] border border-white/[0.08] bg-[#14213F] gap-2.5 py-2.5 pl-[17px] pr-[13px] text-left text-white bottom-[calc(16px+env(safe-area-inset-bottom))] right-[calc(16px+env(safe-area-inset-right))] sm:h-[68px] sm:w-[244px] sm:gap-[14px] sm:py-0 sm:pl-[26px] sm:pr-5 sm:bottom-[calc(30px+env(safe-area-inset-bottom))] sm:right-[calc(30px+env(safe-area-inset-right))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B5CD6]`}
      >
        <span aria-hidden="true" className="glo-launcher-grid" />
        {/* Onaylı Glo karakteri — beyaz daire/renk değişimi yok; gövdesinin büyük kısmı düğmenin üstünde, açık
            zeminde durur, alt kısmı düğmeyle ~14–18 px örtüşür. Düğmenin içinde olduğu için tamamı tıklanabilir. */}
        <span ref={charRef} aria-hidden="true" className="absolute bottom-[44px] left-2 block h-[50px] w-[50px] sm:bottom-[50px] sm:left-3 sm:h-16 sm:w-16">
          <Image
            src="/images/glo/glo-avatar-216.webp"
            alt=""
            width={64}
            height={64}
            sizes="(min-width: 640px) 64px, 50px"
            quality={100}
            onAnimationEnd={(e) => {
              if (e.animationName === 'glo-greet') setGreeted(true);
            }}
            className={`glo-avatar h-full w-full object-contain ${!hidden && !greeted ? 'is-greet' : ''}`}
          />
        </span>
        {/* GloventGlobal marka işareti (projede kullanılan işaret; tam logo değil) — karakterin tam altında, eski
            düğmedeki kırık beyaz küçük zeminde (mobil 32 px / masaüstü 36 px; işaret 25 / 28 px);
            Glo'dan belirgin biçimde küçük. Karakterin yatay merkeziyle hizalı. */}
        <span
          aria-hidden="true"
          className="relative flex h-8 w-8 shrink-0 translate-y-[2px] items-center justify-center rounded-full bg-[#FAF9F6] sm:h-9 sm:w-9 sm:translate-y-[3px] shadow-[0_0_0_1px_rgba(201,168,118,0.45)]"
        >
          <Image src="/redesign/gloventglobal-mark.png" alt="" width={474} height={455} sizes="(min-width: 640px) 28px, 25px" quality={100} className="h-[25px] w-[25px] object-contain sm:h-7 sm:w-7" />
        </span>
        <span className="relative flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#C9A876]">Ücretsiz ön analiz</span>
          <span className="mt-0.5 text-[14px] font-bold leading-snug text-white sm:mt-1">Glo ile konuş →</span>
        </span>
      </button>
    </>
  );
}

function isVisible(el: Element) {
  const cs = getComputedStyle(el);
  return el.getClientRects().length > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' && parseFloat(cs.opacity) > 0.05;
}
/** Öğe gerçekten ekranda mı: merkezindeki tıklama katmanında yer alıyor mu (kapalı menü gibi kırpılmış ya da başka
 *  bir öğenin altında kalmış öğeleri eler). Glo düğmesi/balonu katmanda üstte olsa da altındaki öğe sayılır. */
function isHitTestable(el: Element, own: (el: Element) => boolean) {
  const r = el.getBoundingClientRect();
  const x = Math.min(Math.max(r.left + r.width / 2, 0), window.innerWidth - 1);
  const y = Math.min(Math.max(r.top + r.height / 2, 0), window.innerHeight - 1);
  for (const top of document.elementsFromPoint(x, y)) {
    if (own(top)) continue; // Glo düğmesi/balonu — altına bak
    return top === el || el.contains(top);
  }
  return false;
}
