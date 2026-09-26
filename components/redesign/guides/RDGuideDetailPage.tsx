import Link from 'next/link';
import RDNavbar from '@/components/redesign/RDNavbar';
import RDFooter from '@/components/redesign/RDFooter';
import { focusRing, sectionShell } from '@/components/redesign/service-detail/RDServiceDetailPrimitives';
import { guides, type Guide } from '@/components/guides/guidesData';
import { parseBody, type BodyBlock } from '@/lib/guides/body';
import { headingId, readingMinutes, resolveRelatedGuides, serviceName } from '@/lib/guides/helpers';
import RDGuideAnalysisButton from './RDGuideAnalysisButton';

// 36 rehberin TEK ortak detay şablonu — SERVER component (guidesData tarayıcıya gönderilmez).
// İçerik guidesData.ts'ten olduğu gibi okunur; yalnızca sunum (sıra, semantic HTML) değişir.
// Tarih gösterilmez (yayın/güncelleme tarihleri doğrulanamadı). Opsiyonel bloklar yalnızca veri
// doluysa render edilir. basePath: preview '/redesign/rehberler', production '/rehberler'.

const EXTRA_IDS = { comparison: 'karsilastirma', checklist: 'kontrol-listesi', faq: 'sik-sorulan-sorular' };

const pCls = 'text-[17px] leading-[1.75] text-[#2F2F3B] sm:text-[18px]';
const liCls = 'relative pl-6 text-[17px] leading-[1.7] text-[#2F2F3B] sm:text-[18px]';
const dot = 'before:absolute before:left-1 before:top-[0.72em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#1B5CD6]';
const labelCls = 'text-[12px] font-bold uppercase tracking-[0.2em]';
const h2Cls = 'scroll-mt-28 text-[1.5rem] font-extrabold leading-snug tracking-tight text-[#14213F] sm:text-[1.75rem]';

function Blocks({ blocks }: { blocks: BodyBlock[] }) {
  return (
    <div className="mt-4 space-y-4">
      {blocks.map((b, i) => {
        if (b.type === 'p') return <p key={i} className={pCls}>{b.text}</p>;
        if (b.type === 'ul')
          return (
            <ul key={i} className="space-y-2">
              {b.items.map((t, j) => (
                <li key={j} className={`${liCls} ${dot}`}>{t}</li>
              ))}
            </ul>
          );
        return (
          <ol key={i} className="space-y-2 pl-7">
            {b.items.map((t, j) => (
              <li key={j} value={t.n} className="list-decimal pl-1.5 text-[17px] leading-[1.7] text-[#2F2F3B] marker:font-bold marker:text-[#1B5CD6] sm:text-[18px]">
                {t.text}
              </li>
            ))}
          </ol>
        );
      })}
    </div>
  );
}

function Check() {
  return (
    <span aria-hidden="true" className="mt-[5px] flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#EEF3FD] text-[#1B5CD6]">
      <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
        <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function RDGuideDetailPage({ guide, basePath = '/rehberler', analyticsPrefix = '' }: { guide: Guide; basePath?: string; analyticsPrefix?: string }) {
  const minutes = readingMinutes(guide);
  const related = resolveRelatedGuides(guide, guides);
  const service = serviceName(guide.relatedServiceSlug);
  // İlgili rehber yoksa (0 sonuç) hizmet bloğu dar 1/3 sütunda kalmasın: lg+ makale sütunuyla aynı
  // genişlikte (700px) yatay bir kompozisyon. İlgili rehber varsa onaylı 1/3 + 2/3 grid aynen.
  const hasRelated = related.length > 0;
  // Uzman Notu yerleşimi production şablonuyla aynı: expertNoteAfterHeading, yoksa 3. bölüm sonrası.
  const expertIndex = guide.expertNote
    ? guide.expertNoteAfterHeading
      ? guide.sections.findIndex((s) => s.heading === guide.expertNoteAfterHeading)
      : Math.min(2, guide.sections.length - 1)
    : -1;

  const toc = [
    ...guide.sections.map((s) => ({ id: headingId(s.heading), label: s.heading })),
    ...(guide.comparison ? [{ id: EXTRA_IDS.comparison, label: guide.comparison.heading }] : []),
    ...(guide.checklist ? [{ id: EXTRA_IDS.checklist, label: guide.checklist.heading }] : []),
    ...(guide.faq ? [{ id: EXTRA_IDS.faq, label: guide.faq.heading }] : []),
  ];
  const tocList = (
    <ol className="space-y-1">
      {toc.map((t) => (
        <li key={t.id}>
          <a href={`#${t.id}`} className={`block rounded-md py-1.5 text-[14.5px] leading-snug text-[#4A4A5A] transition-colors hover:text-[#1B5CD6] ${focusRing}`}>
            {t.label}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-geist-sans),system-ui,sans-serif' }}>
      <RDNavbar />
      <main className="bg-[#FAF9F6]">
        {/* ============ HERO ============ */}
        <header className="border-b border-[#E5E5EC] bg-white pb-10 pt-[96px] sm:pb-12 sm:pt-28 lg:pb-14 lg:pt-32">
          <div className={sectionShell}>
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13.5px] text-[#5A5A6A]">
                <li>
                  <Link href="/" className={`rounded hover:text-[#1B5CD6] ${focusRing}`}>Ana Sayfa</Link>
                </li>
                <li aria-hidden="true" className="text-[#B8B8C2]">/</li>
                <li>
                  <Link href={basePath} className={`rounded hover:text-[#1B5CD6] ${focusRing}`}>Rehberler</Link>
                </li>
                <li aria-hidden="true" className="text-[#B8B8C2]">/</li>
                <li aria-current="page" className="max-w-full truncate font-medium text-[#14213F] sm:max-w-[48ch]">{guide.title}</li>
              </ol>
            </nav>
            <p className="mt-8 text-[12.5px] font-bold uppercase tracking-[0.2em] text-[#1B5CD6] sm:mt-10">
              <span className="normal-case tracking-[0.02em]">{guide.category}</span> <span aria-hidden="true" className="px-1 text-[#B8B8C2]">·</span>{' '}
              <span className="font-semibold normal-case tracking-normal text-[#5A5A6A]">{minutes} dk okuma</span>
            </p>
            <h1 className="mt-3 max-w-[26ch] text-[1.95rem] font-extrabold leading-[1.12] tracking-[-0.02em] text-[#14213F] sm:text-[2.6rem] lg:text-[3.05rem]">
              {guide.title}
            </h1>
            <p className="mt-5 max-w-[62ch] text-[17px] leading-relaxed text-[#4A4A5A] sm:text-[19px]">{guide.excerpt}</p>
            {guide.author && (
              <p className="mt-6 flex items-center gap-3 text-[14px] text-[#5A5A6A]">
                <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-[#1B5CD6] to-[#C9A876]" />
                Hazırlayan: <span className="font-semibold text-[#14213F]">{guide.author}</span>
              </p>
            )}
          </div>
        </header>

        <div className={`${sectionShell} grid gap-10 pb-16 pt-10 sm:pt-12 lg:grid-cols-[minmax(0,700px)_260px] lg:justify-between lg:gap-12 lg:pt-14 xl:grid-cols-[minmax(0,700px)_280px]`}>
          <div className="min-w-0">
            {/* ============ AÇILIŞ: Özet + Kısa Cevap + Kimler Okumalı ============ */}
            {(guide.summary || guide.quickAnswer) && (
              <section aria-label="Rehber özeti" className="relative overflow-hidden rounded-3xl border border-[#E5E5EC] bg-white p-6 sm:p-8">
                <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#1B5CD6] to-[#C9A876]" />
                {guide.summary && (
                  <>
                    <p className={`${labelCls} text-[#1B5CD6]`}>Özet</p>
                    <p className="mt-2.5 text-[16.5px] leading-[1.7] text-[#2F2F3B] sm:text-[17px]">{guide.summary}</p>
                  </>
                )}
                {guide.quickAnswer && (
                  <div className={guide.summary ? 'mt-6 border-t border-[#E5E5EC] pt-6' : ''}>
                    <p className={`${labelCls} text-[#8A6D3B]`}>Kısa Cevap</p>
                    <p className="mt-2.5 text-[18px] font-semibold leading-[1.6] text-[#14213F] sm:text-[19px]">{guide.quickAnswer}</p>
                  </div>
                )}
              </section>
            )}
            {guide.whoShouldRead && guide.whoShouldRead.length > 0 && (
              <section aria-label="Kimler okumalı" className="mt-5 rounded-3xl bg-[#F1EDE4]/60 p-6 sm:p-7">
                <p className={`${labelCls} text-[#14213F]`}>Kimler Okumalı?</p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2 sm:gap-x-6">
                  {guide.whoShouldRead.map((w) => (
                    <li key={w} className="flex gap-2.5 text-[15.5px] leading-relaxed text-[#2F2F3B]">
                      <Check />
                      {w}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Mobil/tablet içindekiler — native details, kapalı başlar; sticky değil */}
            <details className="group mt-6 rounded-2xl border border-[#E5E5EC] bg-white lg:hidden">
              <summary className={`flex min-h-[52px] cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-5 text-[15px] font-semibold text-[#14213F] [&::-webkit-details-marker]:hidden ${focusRing}`}>
                Bu Rehberde
                <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4 transition-transform group-open:rotate-180">
                  <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <nav aria-label="Bu rehberde" className="border-t border-[#E5E5EC] px-5 py-3">
                {tocList}
              </nav>
            </details>

            {/* ============ MAKALE ============ */}
            <article className="mt-10 sm:mt-12">
              {guide.sections.map((s, i) => (
                <section key={s.heading} aria-labelledby={headingId(s.heading)} className="mt-11 first:mt-0 sm:mt-14">
                  <h2 id={headingId(s.heading)} className={h2Cls}>{s.heading}</h2>
                  <Blocks blocks={parseBody(s.body)} />
                  {i === expertIndex && guide.expertNote && (
                    <aside aria-label="Uzman notu" className="mt-8 rounded-2xl bg-[#0F1E3C] p-6 text-white sm:p-7">
                      <p className={`${labelCls} text-[#C9A876]`}>Uzman Notu</p>
                      <p className="mt-2.5 text-[16.5px] leading-[1.7] text-white/90 sm:text-[17px]">{guide.expertNote}</p>
                    </aside>
                  )}
                </section>
              ))}

              {/* Karşılaştırma — desktop semantic table, mobil satır kartları */}
              {guide.comparison && (
                <section aria-labelledby={EXTRA_IDS.comparison} className="mt-14">
                  <h2 id={EXTRA_IDS.comparison} className={h2Cls}>{guide.comparison.heading}</h2>
                  <div className="mt-5 hidden overflow-hidden rounded-2xl border border-[#E5E5EC] bg-white sm:block">
                    <table className="w-full text-left">
                      <thead className="bg-[#14213F] text-white">
                        <tr>
                          {guide.comparison.headers.map((h) => (
                            <th key={h} scope="col" className="px-5 py-3.5 text-[14px] font-bold">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E5E5EC]">
                        {guide.comparison.rows.map((r) => (
                          <tr key={r.criterion}>
                            <th scope="row" className="px-5 py-3.5 text-[15.5px] font-semibold text-[#14213F]">{r.criterion}</th>
                            <td className="px-5 py-3.5 text-[15.5px] text-[#2F2F3B]">{r.individual}</td>
                            <td className="px-5 py-3.5 text-[15.5px] text-[#2F2F3B]">{r.company}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <ul className="mt-5 space-y-3 sm:hidden">
                    {guide.comparison.rows.map((r) => (
                      <li key={r.criterion} className="rounded-2xl border border-[#E5E5EC] bg-white p-4">
                        <p className="text-[15.5px] font-bold text-[#14213F]">{r.criterion}</p>
                        <dl className="mt-2.5 grid grid-cols-2 gap-3">
                          <div>
                            <dt className="text-[13px] font-bold text-[#1B5CD6]">{guide.comparison!.headers[1]}</dt>
                            <dd className="mt-1 text-[15px] text-[#2F2F3B]">{r.individual}</dd>
                          </div>
                          <div>
                            <dt className="text-[13px] font-bold text-[#1B5CD6]">{guide.comparison!.headers[2]}</dt>
                            <dd className="mt-1 text-[15px] text-[#2F2F3B]">{r.company}</dd>
                          </div>
                        </dl>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {guide.checklist && (
                <section aria-labelledby={EXTRA_IDS.checklist} className="mt-14">
                  <h2 id={EXTRA_IDS.checklist} className={h2Cls}>{guide.checklist.heading}</h2>
                  <ul className="mt-5 divide-y divide-[#E5E5EC] border-y border-[#E5E5EC]">
                    {guide.checklist.items.map((it) => (
                      <li key={it} className="flex gap-3 py-3 text-[16.5px] leading-relaxed text-[#2F2F3B] sm:text-[17px]">
                        <Check />
                        {it}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {guide.keyTakeaway && (
                <aside aria-label="Bilmeniz gereken" className="mt-12 border-l-4 border-[#C9A876] bg-white py-5 pl-6 pr-5 sm:pl-7">
                  <p className={`${labelCls} text-[#8A6D3B]`}>Bilmeniz Gereken</p>
                  <p className="mt-2.5 text-[17px] font-medium leading-[1.7] text-[#14213F] sm:text-[18px]">{guide.keyTakeaway}</p>
                </aside>
              )}

              {guide.audienceSplit && (
                <div className="mt-12 grid gap-4 sm:grid-cols-2">
                  {[
                    [guide.audienceSplit.titleA, guide.audienceSplit.itemsA],
                    [guide.audienceSplit.titleB, guide.audienceSplit.itemsB],
                  ].map(([title, items]) => (
                    <section key={title as string} className="rounded-2xl border border-[#E5E5EC] bg-white p-5 sm:p-6">
                      <h3 className="text-[1.08rem] font-bold text-[#14213F]">{title as string}</h3>
                      <ul className="mt-3 space-y-2">
                        {(items as string[]).map((it) => (
                          <li key={it} className="flex gap-2.5 text-[15.5px] leading-relaxed text-[#2F2F3B]">
                            <Check />
                            {it}
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              )}

              {guide.decisionTree && guide.decisionTree.length > 0 && (
                <aside aria-label="Basit karar ağacı" className="mt-6 rounded-2xl border border-[#1B5CD6]/25 bg-[#EEF3FD]/60 p-6 sm:p-7">
                  <p className={`${labelCls} text-[#1B5CD6]`}>Basit Karar Ağacı</p>
                  <ul className="mt-3 space-y-2.5">
                    {guide.decisionTree.map((d) => (
                      <li key={d} className="flex gap-2.5 text-[16px] leading-relaxed text-[#2F2F3B]">
                        <span aria-hidden="true" className="font-bold text-[#1B5CD6]">→</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </aside>
              )}

              {/* FAQ — native details/summary (klavye + ekran okuyucu desteği yerleşik) */}
              {guide.faq && (
                <section aria-labelledby={EXTRA_IDS.faq} className="mt-14">
                  <h2 id={EXTRA_IDS.faq} className={h2Cls}>{guide.faq.heading}</h2>
                  <div className="mt-5 divide-y divide-[#E5E5EC] border-y border-[#E5E5EC]">
                    {guide.faq.items.map((f) => (
                      <details key={f.question} className="group">
                        <summary className={`flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 rounded-md py-4 text-[16.5px] font-semibold leading-snug text-[#14213F] hover:text-[#1B5CD6] sm:text-[17px] [&::-webkit-details-marker]:hidden ${focusRing}`}>
                          {f.question}
                          <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#D6D6DC] text-[#1B5CD6] transition-transform group-open:rotate-45">
                            <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
                              <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            </svg>
                          </span>
                        </summary>
                        <p className="pb-5 pr-10 text-[16.5px] leading-[1.7] text-[#2F2F3B] sm:text-[17px]">{f.answer}</p>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              {guide.nextSteps && guide.nextSteps.length > 0 && (
                <section aria-labelledby="bir-sonraki-adim" className="mt-14">
                  <h2 id="bir-sonraki-adim" className={h2Cls}>Bir Sonraki Adım</h2>
                  <ol className="mt-5 space-y-3">
                    {guide.nextSteps.map((s, i) => (
                      <li key={s} className="flex items-start gap-3.5 text-[16.5px] leading-relaxed text-[#2F2F3B] sm:text-[17px]">
                        <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#14213F] text-[13px] font-bold text-white">
                          {i + 1}
                        </span>
                        <span className="pt-0.5">{s}</span>
                      </li>
                    ))}
                  </ol>
                </section>
              )}
            </article>
          </div>

          {/* Desktop sticky içindekiler — navbar altında */}
          <aside className="hidden lg:block">
            <nav aria-label="Bu rehberde" className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto border-l border-[#E5E5EC] pl-5">
              <p className={`${labelCls} text-[#14213F]`}>Bu Rehberde</p>
              <div className="mt-3">{tocList}</div>
            </nav>
          </aside>
        </div>

        {/* ============ İLGİLİ HİZMET + İLGİLİ REHBERLER ============ */}
        <section aria-label="İlgili içerikler" className="border-t border-[#E5E5EC] bg-white py-12 sm:py-16">
          <div className={hasRelated ? `${sectionShell} grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-14` : sectionShell}>
            <div className={hasRelated ? 'contents' : 'lg:max-w-[700px]'}>
            {service && (
              <div>
                <h2 className={`${labelCls} text-[#1B5CD6]`}>İlgili Hizmet</h2>
                <Link
                  href={`/hizmetler/${guide.relatedServiceSlug}`}
                  className={`group mt-4 flex flex-col rounded-3xl border border-[#E5E5EC] bg-[#FAF9F6] p-6 transition-colors hover:border-[#1B5CD6] sm:p-7 ${hasRelated ? '' : 'lg:flex-row lg:items-center lg:justify-between lg:gap-8'} ${focusRing}`}
                >
                  <span className="text-[1.3rem] font-extrabold leading-snug text-[#14213F] group-hover:text-[#1B5CD6]">{service}</span>
                  <span className={`mt-4 text-[14.5px] font-semibold text-[#1B5CD6] ${hasRelated ? '' : 'lg:mt-0 lg:shrink-0'}`}>
                    Hizmet Detayını Gör <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </div>
            )}
            {related.length > 0 && (
              <div>
                <h2 className={`${labelCls} text-[#1B5CD6]`}>İlgili Rehberler</h2>
                <ul className="mt-4 divide-y divide-[#E5E5EC] border-y border-[#E5E5EC]">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link href={`${basePath}/${r.slug}`} className={`group block rounded-md py-4 ${focusRing}`}>
                        <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#1B5CD6]">
                          <span className="normal-case tracking-[0.02em]">{r.category}</span> <span aria-hidden="true" className="px-1 text-[#B8B8C2]">·</span>{' '}
                          <span className="font-semibold normal-case tracking-normal text-[#5A5A6A]">{readingMinutes(r)} dk okuma</span>
                        </p>
                        <h3 className="mt-1.5 text-[1.08rem] font-bold leading-snug text-[#14213F] group-hover:text-[#1B5CD6]">
                          {r.title} <span aria-hidden="true" className="text-[#1B5CD6]">→</span>
                        </h3>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            </div>
          </div>
        </section>

        {/* ============ ANALİZ CTA ============ */}
        <section aria-labelledby="rh-detail-cta" className="py-12 sm:py-16">
          <div className={sectionShell}>
            <div className="relative overflow-hidden rounded-3xl bg-[#0F1E3C] px-7 py-9 sm:px-10 sm:py-11 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:px-14">
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1B5CD6] to-[#C9A876]" />
              <div>
                <h2 id="rh-detail-cta" className="text-[1.45rem] font-extrabold leading-tight text-white sm:text-[1.8rem]">
                  Hâlâ hangi başlangıç yolunun sizin için doğru olduğundan emin değil misiniz?
                </h2>
                <p className="mt-3 max-w-[56ch] text-[15.5px] leading-relaxed text-white/75">
                  Ürününüzü, hedef pazarınızı ve mevcut hazırlık seviyenizi birlikte değerlendirelim.
                </p>
              </div>
              <div className="mt-6 shrink-0 lg:mt-0">
                <RDGuideAnalysisButton location={`${analyticsPrefix}rehber_detail`} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <RDFooter />
    </div>
  );
}
