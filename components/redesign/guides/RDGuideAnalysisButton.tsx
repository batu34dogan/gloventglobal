'use client';

import { trackEvent } from '@/lib/analytics';
import { focusRing } from '@/components/redesign/service-detail/RDServiceDetailPrimitives';

// Rehber sayfalarındaki tek interaktif CTA: mevcut global AnalysisWidget modalını açar (yeni form yok).
// location: preview'de 'redesign_rehberler_overview' / 'redesign_rehber_detail', production'da öneksiz.
export default function RDGuideAnalysisButton({ location, tone = 'dark' }: { location: string; tone?: 'dark' | 'light' }) {
  return (
    <button
      type="button"
      onClick={() => {
        trackEvent('free_analysis_cta_click', { location });
        window.dispatchEvent(new Event('open-analysis-widget'));
      }}
      className={`inline-flex min-h-[48px] items-center justify-center rounded-full px-7 py-3 text-[15.5px] font-semibold transition-colors ${
        tone === 'dark'
          ? 'bg-white text-[#14213F] hover:bg-[#C9A876] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
          : `bg-[#14213F] text-white hover:bg-[#1B5CD6] ${focusRing}`
      }`}
    >
      Ücretsiz Analiz Al <span aria-hidden="true" className="ml-1.5">→</span>
    </button>
  );
}
