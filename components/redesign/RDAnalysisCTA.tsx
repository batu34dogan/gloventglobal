'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { trackEvent } from '@/lib/analytics';
import GloLauncher from './GloLauncher';

// Mevcut AnalysisWidget'ın modalını/formunu/API'sini/event sistemini aynen kullanır — burada
// sadece /redesign'e uygun premium bir tetikleyici (trigger) render edilir, ayrı bir analiz
// sistemi veya form yok. Modal, global AnalysisWidget'ın zaten dinlediği 'open-analysis-widget'
// custom event'i ile açılır (aynı yerden analysis_widget_open de otomatik tetiklenir).
// analyticsLocation: production ana sayfa 'homepage_floating_button', /redesign preview 'redesign_floating_button'.
// gloIcon: Glo prototip izni (lib/glo/flag, production'da hiçbir zaman açık değil) varken logo yerine onaylı Glo
// karakteri gösterilir. Yazı, boyut ve tıklama davranışı aynıdır; modalın Glo ile açılıp açılmayacağına
// mevcut prototip koşulları (izin + ?glo=1) karar verir.
export default function RDAnalysisCTA({
  analyticsLocation = 'homepage_floating_button',
  gloIcon = false,
}: {
  analyticsLocation?: string;
  gloIcon?: boolean;
}) {
  // Footer (data-site-footer) görünür alandayken buton gizlenir: footer'ın sağ alt linklerini örtmesin.
  // visibility:hidden → tıklanamaz, Tab sırasından ve erişilebilirlik ağacından çıkar.
  const [overFooter, setOverFooter] = useState(false);
  useEffect(() => {
    const footer = document.querySelector('[data-site-footer]');
    if (!footer || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => setOverFooter(entry.isIntersecting));
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  // Çakışma kaçınması: sayfadaki [data-fab-avoid] öğeleri (ör. hero CTA'ları, dar/kısa ekranlarda ilk
  // açılışta düğmenin altına denk gelir) veya klavyeyle odaklanan bir öğe butonun alanına girdiğinde buton
  // footer'daki gibi geçici olarak gizlenir; kaydırınca geri gelir. Kaldırılmaz, metin küçültülmez.
  const btnRef = useRef<HTMLButtonElement>(null);
  const [overContent, setOverContent] = useState(false);
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const btn = btnRef.current;
      if (!btn) return;
      const c = btn.getBoundingClientRect(); // gizliyken de konum/boyut geçerli (visibility:hidden)
      const covers = (el: Element | null) => {
        if (!el || el === document.body || btn.contains(el)) return false;
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.left < c.right && r.right > c.left && r.top < c.bottom + 8 && r.bottom > c.top - 8;
      };
      const active = document.activeElement;
      const focusCovered = active instanceof HTMLElement && active.matches(':focus-visible') && covers(active);
      setOverContent(focusCovered || [...document.querySelectorAll('[data-fab-avoid]')].some(covers));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    document.addEventListener('focusin', schedule);
    document.addEventListener('focusout', schedule);
    return () => {
      cancelAnimationFrame(raf);
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

  // Glo açıkken karakterli tanıtım düğmesi + tanışma balonu (aynı modal, aynı çakışma kuralları).
  if (gloIcon) return <GloLauncher analyticsLocation={analyticsLocation} />;

  return (
    <>
      <style>{`
        .rd-analysis-cta {
          transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease, opacity .2s ease, visibility .2s;
          box-shadow: 0 8px 24px -14px rgba(0,0,0,0.45);
        }
        .rd-analysis-cta.rd-analysis-cta-hidden { opacity: 0; visibility: hidden; pointer-events: none; }
        /* Klavye odağı sabit butonun altında kalmasın: odak/kaydırma, butonun kapladığı alt şeridin üstünde durur. */
        html { scroll-padding-bottom: calc(88px + env(safe-area-inset-bottom)); }
        @media (min-width: 640px) { html { scroll-padding-bottom: calc(110px + env(safe-area-inset-bottom)); } }
        .rd-analysis-cta-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 11px 11px;
        }
        @media (hover: hover) and (pointer: fine) {
          .rd-analysis-cta:hover {
            transform: translateY(-2px);
            border-color: rgba(27,92,214,0.45);
            box-shadow: 0 10px 26px -14px rgba(0,0,0,0.5);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .rd-analysis-cta, .rd-analysis-cta:hover {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>
      <button
        ref={btnRef}
        type="button"
        onClick={openAnalysis}
        className={`rd-analysis-cta ${overFooter || overContent ? 'rd-analysis-cta-hidden' : ''} fixed z-[45] flex items-center gap-2 overflow-hidden rounded-[17px] border border-white/[0.08] bg-[#14213F] px-2.5 py-3 text-left text-white bottom-[calc(16px+env(safe-area-inset-bottom))] right-[calc(16px+env(safe-area-inset-right))] sm:h-[68px] sm:w-[244px] sm:gap-3 sm:bottom-[calc(30px+env(safe-area-inset-bottom))] sm:right-[calc(30px+env(safe-area-inset-right))] sm:px-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B5CD6]`}
      >
        <span aria-hidden="true" className="rd-analysis-cta-grid" />

        {/* Gerçek GloventGlobal globe+arrow marka işareti (public/apple-touch-icon.svg ile aynı
            sanat çalışması, beyaz zemini şeffaflaştırılıp public/redesign/gloventglobal-mark.png'ye
            işlenmiş hali — yeni tasarım değil). Logonun lacivert kısmı koyu navy zeminde kaybolmasın
            diye arkasına redesign'in mevcut ivory tonundan (#FAF9F6, bkz. RDHero/RDFooter) küçük bir
            daire eklendi; logonun kendi renklerine hiçbir filtre/opacity/blend-mode uygulanmıyor. */}
        {gloIcon ? (
          // Onaylı Glo karakteri — lacivert gövde lacivert düğmede kaybolmasın diye mevcut ivory daire korunur;
          // karakter kırpılmaz (object-contain). Sabit görsel: zıplama/rozet/balon yok.
          <span
            aria-hidden="true"
            className="relative flex h-[33px] w-[33px] shrink-0 items-center justify-center rounded-full border border-black/[0.06] bg-[#FAF9F6] sm:h-11 sm:w-11"
          >
            <Image
              src="/images/glo/glo-avatar-216.webp"
              alt=""
              width={40}
              height={40}
              sizes="(min-width: 640px) 38px, 29px"
              quality={100}
              className="h-[29px] w-[29px] object-contain sm:h-[38px] sm:w-[38px]"
            />
          </span>
        ) : (
          <span
            aria-hidden="true"
            className="relative flex h-[33px] w-[33px] shrink-0 items-center justify-center rounded-full border border-black/[0.06] bg-[#FAF9F6] sm:h-9 sm:w-9"
          >
            <Image
              src="/redesign/gloventglobal-mark.png"
              alt=""
              width={474}
              height={455}
              sizes="24px"
              className="h-[23px] w-[23px] object-contain sm:h-[24px] sm:w-[24px]"
            />
          </span>
        )}

        {/* Mobil: tek satırlı kompakt versiyon */}
        <span className="relative text-[13.5px] font-semibold leading-tight sm:hidden">
          Ücretsiz Ön Analiz →
        </span>

        {/* Desktop: label + ana ifade, iki satır */}
        <span className="relative hidden flex-col sm:flex">
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#C9A876]">
            Ücretsiz Ön Analiz
          </span>
          <span className="mt-1 text-[13.5px] font-bold leading-snug text-white">
            Markanızı birlikte inceleyelim →
          </span>
        </span>
      </button>
    </>
  );
}
