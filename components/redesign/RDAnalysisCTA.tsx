'use client';

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
          box-shadow: 0 0 22px -10px rgba(27,92,214,0.35);
        }
        @media (hover: hover) and (pointer: fine) {
          .rd-analysis-cta:hover {
            transform: translateY(-2px) scale(1.015);
            border-color: rgba(91,140,238,0.55);
            box-shadow: 0 0 30px -8px rgba(27,92,214,0.55);
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
        className="rd-analysis-cta fixed z-[45] flex items-center gap-2.5 rounded-full border border-white/10 bg-[#14213F] px-4 py-3 text-left text-white bottom-[calc(16px+env(safe-area-inset-bottom))] right-[calc(16px+env(safe-area-inset-right))] sm:bottom-[calc(28px+env(safe-area-inset-bottom))] sm:right-[calc(28px+env(safe-area-inset-right))] sm:px-5 sm:py-3.5"
      >
        <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-[#5B8CEE]" />
        <span className="flex flex-col">
          <span className="text-[13.5px] font-semibold leading-tight sm:text-[14.5px]">Ücretsiz Analiz</span>
          <span className="hidden text-[11.5px] font-normal leading-tight text-white/55 sm:block">
            Markanızı analiz edelim →
          </span>
        </span>
      </button>
    </>
  );
}
