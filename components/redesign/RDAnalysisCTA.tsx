'use client';

import Image from 'next/image';
import { trackEvent } from '@/lib/analytics';

// Mevcut AnalysisWidget'ın modalını/formunu/API'sini/event sistemini aynen kullanır — burada
// sadece /redesign'e uygun premium bir tetikleyici (trigger) render edilir, ayrı bir analiz
// sistemi veya form yok. Modal, global AnalysisWidget'ın zaten dinlediği 'open-analysis-widget'
// custom event'i ile açılır (aynı yerden analysis_widget_open de otomatik tetiklenir).
export default function RDAnalysisCTA() {
  const openAnalysis = () => {
    trackEvent('free_analysis_cta_click', { location: 'redesign_floating_button' });
    window.dispatchEvent(new Event('open-analysis-widget'));
  };

  return (
    <>
      <style>{`
        .rd-analysis-cta {
          transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
          box-shadow: 0 8px 24px -14px rgba(0,0,0,0.45);
        }
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
        type="button"
        onClick={openAnalysis}
        className="rd-analysis-cta fixed z-[45] flex items-center gap-3 overflow-hidden rounded-[17px] border border-white/[0.08] bg-[#14213F] px-4 py-3 text-left text-white bottom-[calc(16px+env(safe-area-inset-bottom))] right-[calc(16px+env(safe-area-inset-right))] sm:h-[68px] sm:w-[244px] sm:bottom-[calc(30px+env(safe-area-inset-bottom))] sm:right-[calc(30px+env(safe-area-inset-right))] sm:px-4"
      >
        <span aria-hidden="true" className="rd-analysis-cta-grid" />

        {/* Gerçek GloventGlobal globe+arrow marka işareti (public/apple-touch-icon.svg ile aynı
            sanat çalışması, beyaz zemini şeffaflaştırılıp public/redesign/gloventglobal-mark.png'ye
            işlenmiş hali — yeni tasarım değil). Logonun lacivert kısmı koyu navy zeminde kaybolmasın
            diye arkasına redesign'in mevcut ivory tonundan (#FAF9F6, bkz. RDHero/RDFooter) küçük bir
            daire eklendi; logonun kendi renklerine hiçbir filtre/opacity/blend-mode uygulanmıyor. */}
        <span
          aria-hidden="true"
          className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/[0.06] bg-[#FAF9F6]"
        >
          <Image
            src="/redesign/gloventglobal-mark.png"
            alt=""
            width={474}
            height={455}
            sizes="24px"
            className="h-[24px] w-[24px] object-contain"
          />
        </span>

        {/* Mobil: tek satırlı kompakt versiyon */}
        <span className="relative text-[13.5px] font-semibold leading-tight sm:hidden">
          Ücretsiz Analiz →
        </span>

        {/* Desktop: label + ana ifade, iki satır */}
        <span className="relative hidden flex-col sm:flex">
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#C9A876]">
            Ücretsiz Analiz
          </span>
          <span className="mt-1 text-[13.5px] font-bold leading-snug text-white">
            Markanızı birlikte inceleyelim →
          </span>
        </span>
      </button>
    </>
  );
}
