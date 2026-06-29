'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { guides } from './guidesData';
import { serviceDetails } from '@/components/services/serviceDetailsData';

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView] as const;
}

function TitleGlow() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[300px] w-[min(820px,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-2xl sm:h-[360px] sm:w-[min(940px,90vw)]"
      style={{
        background: 'radial-gradient(closest-side, rgba(255,255,255,0.9), rgba(96,165,250,0.5) 45%, transparent 75%)',
      }}
    />
  );
}

// Filtre listesi bilerek sabit tutuldu (veri kategorilerinden otomatik türetilmedi) — 6 rehberin
// her biri tam olarak bu 6 kategoriden birine ait, "Hepsi" ile birlikte 7 seçenek.
const CATEGORY_FILTERS = ['Hepsi', 'Amazon', 'Etsy', 'Shopify', 'Global Satış', 'B2B', 'Yapay Zeka', 'Otomasyon', 'Operasyon', 'Pazarlama'];

export default function GuidesContent() {
  const [mounted, setMounted] = useState(false);
  const [gridRef, gridInView] = useInView<HTMLDivElement>();
  const [activeCategory, setActiveCategory] = useState('Hepsi');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const reveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      mounted ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
    }`;

  const gridReveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      gridInView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
    }`;

  const guideList = Object.values(guides)
    .sort((a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER))
    .filter((guide) => activeCategory === 'Hepsi' || guide.category === activeCategory)
    .filter((guide) => {
      const q = searchQuery.trim().toLowerCase();
      if (!q) return true;
      const haystack = [guide.title, guide.excerpt, guide.category, guide.targetAudience, guide.searchIntent]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });

  return (
    <main className="relative overflow-hidden bg-[#070d18] font-sans text-white">
      <section className="relative px-6 pb-14 pt-24 sm:px-10 md:pb-16 md:pt-28">
        <div className="relative mx-auto max-w-3xl text-center">
          <p className={`text-xs font-semibold uppercase tracking-[0.35em] text-blue-300/80 ${reveal('delay-[100ms]')}`}>
            REHBERLER
          </p>
          <div className="relative isolate mx-auto mt-7 max-w-2xl">
            <TitleGlow />
            <h1
              className={`relative z-10 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl ${reveal(
                'delay-[200ms]',
              )}`}
            >
              E-Ticaret ve Dijital Büyüme Rehberleri
            </h1>
          </div>
          <p
            className={`mx-auto mt-6 max-w-xl text-base leading-relaxed text-blue-100/70 sm:text-lg ${reveal(
              'delay-[300ms]',
            )}`}
          >
            E-ticaret, global satış, B2B, yapay zeka, otomasyon, operasyon ve pazarlama konularında
            gerçekten sorulan sorulara cevap veren uygulanabilir rehberler.
          </p>
        </div>
      </section>

      {/* ============ FİLTRE + ARAMA ============ */}
      <section className="relative px-6 pb-8 sm:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORY_FILTERS.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? 'border-blue-400/55 bg-blue-500/15 text-white'
                    : 'border-white/10 bg-white/[0.03] text-blue-100/65 hover:border-white/25 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative mx-auto mt-5 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rehberlerde ara..."
              className="w-full rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-white placeholder:text-blue-100/35 outline-none transition-colors duration-200 focus:border-blue-400/55 focus:bg-white/[0.05]"
            />
          </div>
        </div>
      </section>

      <section ref={gridRef} className="relative px-6 pb-24 pt-2 sm:px-10">
        {guideList.length === 0 && (
          <p className="mx-auto max-w-md text-center text-sm text-blue-100/50">
            Aramanıza veya seçtiğiniz kategoriye uygun bir rehber bulunamadı.
          </p>
        )}
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
          {guideList.map((guide, index) => {
            const relatedService = serviceDetails[guide.relatedServiceSlug];
            const delays = ['delay-[0ms]', 'delay-[80ms]', 'delay-[160ms]', 'delay-[240ms]', 'delay-[320ms]', 'delay-[400ms]'];
            return (
              <Link
                key={guide.slug}
                href={`/rehberler/${guide.slug}`}
                className={`group relative flex flex-col rounded-xl border border-white/[0.08] bg-white/[0.035] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-white/[0.06] hover:shadow-[0_0_40px_-12px_rgba(59,130,246,0.45)] ${gridReveal(
                  delays[index] ?? 'delay-[0ms]',
                )}`}
              >
                <span
                  aria-hidden="true"
                  className="absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-blue-400/55 via-blue-400/20 to-transparent"
                />
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.05em] text-blue-200/90">
                    {guide.category}
                  </span>
                  <span className="text-[11px] font-medium text-blue-100/45">{guide.readTime}</span>
                </div>

                <h2 className="mt-4 text-lg font-semibold text-white group-hover:text-blue-200 sm:text-xl">
                  {guide.title}
                </h2>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-blue-100/70">{guide.excerpt}</p>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
                  {relatedService && (
                    <span className="text-[11px] font-medium uppercase tracking-[0.04em] text-blue-300/70">
                      İlgili Sistem: {relatedService.eyebrow}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-300/90">
                    Rehberi Oku
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
                {guide.updatedAt && (
                  <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.04em] text-blue-100/35">
                    Son Güncelleme: {guide.updatedAt}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}