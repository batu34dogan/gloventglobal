'use client';

import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

export default function RDServicesFinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#0F1E3C] py-16 sm:py-20">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 72%)',
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 72%)',
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[560px] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgba(27,92,214,0.35), rgba(201,168,118,0.12) 55%, transparent 75%)' }}
      />

      <div className="relative mx-auto max-w-[720px] px-6 text-center sm:px-10">
        <span
          aria-hidden="true"
          className="mx-auto mb-6 block h-px w-16 bg-gradient-to-r from-[#1B5CD6] to-[#C9A876]"
        />
        <h2 className="text-[2rem] font-extrabold leading-tight tracking-tight text-white sm:text-[2.6rem]">
          Hangi Sisteme İhtiyacınız Olduğunu Birlikte Belirleyelim.
        </h2>
        <p className="mx-auto mt-5 max-w-[52ch] text-[15.5px] leading-relaxed text-white/60">
          Markanızı, satış kanallarınızı ve hedeflerinizi analiz ederek doğru hizmet kombinasyonunu birlikte
          planlayalım.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              trackEvent('free_analysis_cta_click', { location: 'redesign_services_final_cta' });
              window.dispatchEvent(new Event('open-analysis-widget'));
            }}
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-[15.5px] font-semibold text-[#0F1E3C] transition-all hover:bg-[#C9A876] hover:text-white"
          >
            Ücretsiz Analiz Al →
          </button>
          <Link
            href="/iletisim"
            onClick={() => trackEvent('contact_cta_click', { location: 'redesign_services_final_cta' })}
            className="inline-flex items-center rounded-full border border-white/25 px-8 py-3.5 text-[15.5px] font-semibold text-white transition-all hover:bg-white hover:text-[#0F1E3C]"
          >
            İletişime Geç
          </Link>
        </div>
      </div>
    </section>
  );
}
