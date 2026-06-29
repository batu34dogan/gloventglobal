'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { guides, type Guide } from './guidesData';
import { serviceDetails } from '@/components/services/serviceDetailsData';

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9ığüşöç\s-]/gi, '')
    .replace(/\s+/g, '-');
}

// Aynı kategoriden rehberleri önce sırala, yoksa farklı kategorilerden tamamla — en fazla 3,
// kendisi hariç. 6 rehberlik kataloğu önceden bilmeden, ileride rehber sayısı artsa da çalışır.
function getRelatedGuides(current: Guide): Guide[] {
  const others = Object.values(guides).filter((g) => g.slug !== current.slug);
  const sameCategory = others.filter((g) => g.category === current.category);
  const otherCategory = others.filter((g) => g.category !== current.category);
  return [...sameCategory, ...otherCategory].slice(0, 3);
}

export default function GuideDetailContent({ guide }: { guide: Guide }) {
  const relatedService = serviceDetails[guide.relatedServiceSlug];
  const relatedGuides = getRelatedGuides(guide);
  const [activeId, setActiveId] = useState<string | null>(null);

  // İçindekiler'deki aktif başlık göstergesi — scroll ettikçe hangi bölümün görünür olduğunu
  // takip eden hafif bir IntersectionObserver. Büyük bir refactor değil, mevcut codebase'de zaten
  // kullanılan aynı teknik (bkz. useInView pattern'leri).
  useEffect(() => {
    const headings = guide.sections.map((s) => document.getElementById(slugify(s.heading))).filter(Boolean) as HTMLElement[];
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-15% 0px -70% 0px' },
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [guide.sections]);

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

      {/* ============ KİMLER OKUMALI? ============ */}
      {guide.whoShouldRead && guide.whoShouldRead.length > 0 && (
        <div className="relative mx-auto mt-5 max-w-2xl rounded-2xl border border-white/[0.08] bg-white/[0.035] p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-300/80">Kimler Okumalı?</p>
          <ul className="mt-3 space-y-2">
            {guide.whoShouldRead.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-blue-100/80 sm:text-base">
                <span aria-hidden="true" className="mt-0.5 flex-shrink-0 text-blue-400">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ============ İÇİNDEKİLER (sade) ============ */}
      <div className="relative mx-auto mt-10 max-w-2xl rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-300/75">Bu Rehberde</p>
        <ul className="mt-2.5 space-y-1.5">
          {guide.sections.map((section) => {
            const id = slugify(section.heading);
            const isActive = activeId === id;
            return (
              <li key={section.heading}>
                <a
                  href={`#${id}`}
                  className={`text-sm underline-offset-2 transition-colors duration-200 hover:text-blue-200 hover:underline focus-visible:text-blue-200 focus-visible:underline ${
                    isActive ? 'font-semibold text-blue-300 drop-shadow-[0_0_8px_rgba(96,165,250,0.55)]' : 'text-blue-100/70'
                  }`}
                >
                  {isActive && <span aria-hidden="true">→ </span>}
                  {section.heading}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ============ İÇERİK ============ */}
      <article className="relative mx-auto mt-10 max-w-2xl space-y-8">
        {guide.sections.map((section, index) => {
          const sectionNode = (
            <div key={section.heading} id={slugify(section.heading)}>
              <h2 className="text-xl font-semibold text-white sm:text-2xl">{section.heading}</h2>
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-blue-100/75 sm:text-base">{section.body}</p>
            </div>
          );

          // Uzman Notu — veri odaklı yerleşim. guide.expertNoteAfterHeading belirtilmişse o
          // başlıktan sonra; belirtilmemişse (ama expertNote doluysa) ana içerik başlangıcından
          // hemen sonra görünmesin diye 3. bölümden sonra (ya da daha az bölüm varsa son
          // bölümden sonra) gösterilir. Başlık metnine bağımlı bir arama YOK.
          const fallbackIndex = Math.min(2, guide.sections.length - 1);
          const showExpertNoteHere = guide.expertNote
            ? guide.expertNoteAfterHeading
              ? section.heading === guide.expertNoteAfterHeading
              : index === fallbackIndex
            : false;

          if (showExpertNoteHere) {
            return (
              <div key={section.heading}>
                {sectionNode}
                <div className="mt-6 rounded-2xl border border-cyan-400/30 bg-cyan-500/[0.05] p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan-300/85">Uzman Notu</p>
                  <p className="mt-2.5 text-sm leading-relaxed text-blue-100/85 sm:text-base">{guide.expertNote}</p>
                </div>
              </div>
            );
          }

          return sectionNode;
        })}
      </article>

      {/* ============ KARŞILAŞTIRMA (varsa) ============
          Veri odaklı: guide.comparison doluysa gösterilir, değilse bölüm hiç render edilmez. */}
      {guide.comparison && (() => {
        const comparison = guide.comparison;
        return (
        <div className="relative mx-auto mt-10 max-w-2xl">
          <h2 className="text-xl font-semibold text-white sm:text-2xl">{comparison.heading}</h2>

          {/* Desktop: gerçek tablo */}
          <div className="mt-4 hidden overflow-hidden rounded-2xl border border-white/[0.08] sm:block">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-white/[0.04] text-[11px] font-semibold uppercase tracking-[0.04em] text-blue-300/80">
                  {comparison.headers.map((header) => (
                    <th key={header} className="px-4 py-3">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row, i) => (
                  <tr key={row.criterion} className={i % 2 === 0 ? 'bg-white/[0.015]' : ''}>
                    <td className="px-4 py-3 font-medium text-white">{row.criterion}</td>
                    <td className="px-4 py-3 text-blue-100/75">{row.individual}</td>
                    <td className="px-4 py-3 text-blue-100/75">{row.company}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobil: her kriter ayrı kart, taşma yapmaz */}
          <div className="mt-4 space-y-3 sm:hidden">
            {comparison.rows.map((row) => (
              <div key={row.criterion} className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
                <p className="text-sm font-semibold text-white">{row.criterion}</p>
                <div className="mt-2.5 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="font-semibold uppercase tracking-[0.03em] text-blue-300/70">
                      {comparison.headers[1]}
                    </p>
                    <p className="mt-1 text-blue-100/75">{row.individual}</p>
                  </div>
                  <div>
                    <p className="font-semibold uppercase tracking-[0.03em] text-blue-300/70">
                      {comparison.headers[2]}
                    </p>
                    <p className="mt-1 text-blue-100/75">{row.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        );
      })()}

      {/* ============ KONTROL LİSTESİ (varsa) ============
          Veri odaklı: guide.checklist doluysa gösterilir, değilse bölüm hiç render edilmez. */}
      {guide.checklist && (
        <div className="relative mx-auto mt-10 max-w-2xl">
          <h2 className="text-xl font-semibold text-white sm:text-2xl">{guide.checklist.heading}</h2>
          <div className="mt-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 sm:p-6">
            <ul className="space-y-2.5">
              {guide.checklist.items.map((item) => (
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
      )}

      {/* ============ FAQ (varsa) ============
          Veri odaklı: guide.faq doluysa gösterilir, değilse bölüm hiç render edilmez. */}
      {guide.faq && (
        <div className="relative mx-auto mt-10 max-w-2xl">
          <h2 className="text-xl font-semibold text-white sm:text-2xl">{guide.faq.heading}</h2>
          <div className="mt-4 space-y-3">
            {guide.faq.items.map((item) => (
              <div key={item.question} className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 sm:p-5">
                <p className="text-sm font-semibold text-white sm:text-base">{item.question}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-blue-100/75">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

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

      {/* ============ İLGİLİ REHBERLER ============ */}
      {relatedGuides.length > 0 && (
        <div className="relative mx-auto mt-10 max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-300/80">İlgili Rehberler</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {relatedGuides.map((related) => (
              <Link
                key={related.slug}
                href={`/rehberler/${related.slug}`}
                className="group flex flex-col rounded-xl border border-white/[0.08] bg-white/[0.035] p-4 transition-all duration-300 hover:border-blue-400/40 hover:bg-white/[0.06]"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.05em] text-blue-300/75">
                  {related.category}
                </span>
                <h4 className="mt-1.5 text-sm font-semibold text-white group-hover:text-blue-200">{related.title}</h4>
                <p className="mt-1.5 flex-1 text-xs leading-relaxed text-blue-100/65">{related.excerpt}</p>
                <span className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-semibold text-blue-300/90">
                  Rehberi Oku <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ============ BİR SONRAKİ ADIM ============ */}
      {guide.nextSteps && guide.nextSteps.length > 0 && (
        <div className="relative mx-auto mt-10 max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-300/80">Bir Sonraki Adım</p>
          <div className="relative mt-4">
            {/* Adımları birbirine bağlayan dikey çizgi — sade bir yol haritası hissi verir. */}
            <span
              aria-hidden="true"
              className="absolute left-[13px] top-2 bottom-2 w-px bg-gradient-to-b from-blue-400/50 via-blue-400/20 to-transparent"
            />
            <div className="space-y-5">
              {guide.nextSteps.map((step, index) => (
                <div key={step} className="relative flex items-start gap-3">
                  <span className="relative z-10 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-blue-400/45 bg-[#0b1322] text-xs font-semibold text-blue-300">
                    {index + 1}
                  </span>
                  <p className="mt-0.5 text-sm leading-relaxed text-blue-100/85 sm:text-base">{step}</p>
                </div>
              ))}
            </div>
          </div>
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