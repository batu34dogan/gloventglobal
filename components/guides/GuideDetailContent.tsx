'use client';

import Link from 'next/link';
import type { Guide } from './guidesData';
import { serviceDetails } from '@/components/services/serviceDetailsData';

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9ığüşöç\s-]/gi, '')
    .replace(/\s+/g, '-');
}

export default function GuideDetailContent({ guide }: { guide: Guide }) {
  const relatedService = serviceDetails[guide.relatedServiceSlug];

  return (
    <main className="relative overflow-hidden bg-[#070d18] px-6 pb-24 pt-24 font-sans text-white sm:px-10 md:pt-28">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-100px] h-[420px] w-[760px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgba(96,165,250,0.5), transparent 75%)' }}
      />

      {/* ============ HERO ============ */}
      <div className="relative mx-auto max-w-2xl text-center">
        <Link
          href="/rehberler"
          className="text-[11px] font-semibold uppercase tracking-[0.15em] text-blue-300/70 hover:text-blue-200"
        >
          ← Tüm Rehberler
        </Link>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/80">{guide.category}</p>
        <h1 className="mt-4 text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl">{guide.title}</h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-blue-100/70">{guide.excerpt}</p>
        <p className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] font-medium uppercase tracking-[0.05em] text-blue-100/40">
          <span>{guide.readTime} okuma</span>
          {guide.updatedAt && (
            <>
              <span aria-hidden="true">•</span>
              <span>Son Güncelleme: {guide.updatedAt}</span>
            </>
          )}
          {guide.author && (
            <>
              <span aria-hidden="true">•</span>
              <span>Hazırlayan: {guide.author}</span>
            </>
          )}
        </p>
      </div>

      {/* ============ ÖZET ============ */}
      {guide.summary && (
        <div className="relative mx-auto mt-8 max-w-2xl rounded-2xl border border-white/[0.08] bg-white/[0.035] p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-300/80">Özet</p>
          <p className="mt-2.5 text-sm leading-relaxed text-blue-100/80 sm:text-base">{guide.summary}</p>
        </div>
      )}

      {/* ============ KISA CEVAP (featured snippet kartı) ============ */}
      {guide.quickAnswer && (
        <div className="relative mx-auto mt-5 max-w-2xl rounded-2xl border border-blue-400/30 bg-blue-500/[0.08] p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-300/85">Kısa Cevap</p>
          <p className="mt-2.5 text-base font-medium leading-relaxed text-white sm:text-lg">{guide.quickAnswer}</p>
        </div>
      )}

      {/* ============ İÇİNDEKİLER (sade) ============ */}
      <div className="relative mx-auto mt-10 max-w-2xl rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-300/75">Bu Rehberde</p>
        <ul className="mt-2.5 space-y-1.5">
          {guide.sections.map((section) => (
            <li key={section.heading}>
              <a
                href={`#${slugify(section.heading)}`}
                className="text-sm text-blue-100/70 underline-offset-2 hover:text-blue-200 hover:underline"
              >
                {section.heading}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* ============ İÇERİK ============ */}
      <article className="relative mx-auto mt-10 max-w-2xl space-y-8">
        {guide.sections.map((section) => {
          // "Kontrol listesi" başlıklı bölümler (şu an sadece Amazon rehberinde) PDF/checklist
          // hissi veren, tik işaretli bir kutu içinde gösterilir. Diğer bölümler ve diğer
          // rehberler bu koşula girmediği için eskisi gibi düz paragraf olarak kalır.
          const isChecklist = section.heading.toLowerCase().includes('kontrol listesi');

          if (isChecklist) {
            const items = section.body
              .split('\n')
              .map((line) => line.replace(/^✓\s*/, '').trim())
              .filter(Boolean);

            return (
              <div key={section.heading} id={slugify(section.heading)}>
                <h2 className="text-xl font-semibold text-white sm:text-2xl">{section.heading}</h2>
                <div className="mt-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 sm:p-6">
                  <ul className="space-y-2.5">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-blue-100/85 sm:text-base">
                        <span
                          aria-hidden="true"
                          className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border border-blue-400/40 bg-blue-500/10 text-[11px] text-blue-300"
                        >
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          }

          return (
            <div key={section.heading} id={slugify(section.heading)}>
              <h2 className="text-xl font-semibold text-white sm:text-2xl">{section.heading}</h2>
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-blue-100/75 sm:text-base">{section.body}</p>
            </div>
          );
        })}
      </article>

      {/* ============ İLGİLİ HİZMETE YÖNLENDİRME ============ */}
      {relatedService && (
        <div className="relative mx-auto mt-12 max-w-2xl rounded-xl border border-blue-400/25 bg-blue-500/[0.06] p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-300/80">İlgili Hizmet</p>
          <h3 className="mt-2 text-lg font-semibold text-white">{relatedService.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-blue-100/70">{relatedService.description}</p>
          <Link
            href={`/hizmetler/${guide.relatedServiceSlug}`}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-300/90 hover:text-blue-200"
          >
            Hizmet Detayını Gör <span aria-hidden="true">→</span>
          </Link>
        </div>
      )}

      {/* ============ ÜCRETSİZ ANALİZ CTA ============ */}
      <div className="relative mx-auto mt-10 max-w-2xl rounded-2xl border border-white/[0.08] bg-white/[0.035] px-6 py-9 text-center backdrop-blur-sm">
        <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
          Hâlâ hangi başlangıç yolunun sizin için doğru olduğundan emin değil misiniz?
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-blue-100/70">
          Ürününüzü, hedef pazarınızı ve mevcut hazırlık seviyenizi birlikte değerlendirelim.
        </p>
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event('open-analysis-widget'))}
          className="mt-6 inline-block rounded-full border border-blue-400/45 bg-blue-500/10 px-9 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:border-blue-400/75 hover:bg-blue-500/20 hover:shadow-[0_0_36px_-6px_rgba(59,130,246,0.6)]"
        >
          Ücretsiz Analiz Al
        </button>
      </div>
    </main>
  );
}