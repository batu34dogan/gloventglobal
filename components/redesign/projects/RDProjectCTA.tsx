'use client';

import { trackEvent } from '@/lib/analytics';
import { focusRing } from '@/components/redesign/service-detail/RDServiceDetailPrimitives';

// Proje detayındaki tek CTA — yeni form yok; mevcut analiz akışı (AnalysisWidget) açılır.
export default function RDProjectCTA({ slug }: { slug: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        trackEvent('free_analysis_cta_click', { location: 'project_detail_cta', project: slug });
        window.dispatchEvent(new Event('open-analysis-widget'));
      }}
      className={`inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-[15.5px] font-semibold text-[#0F1E3C] transition-colors hover:bg-[#C9A876] hover:text-white ${focusRing} focus-visible:outline-white`}
    >
      Ücretsiz Ön Analize Başla →
    </button>
  );
}
