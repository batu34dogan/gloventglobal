'use client';

import { useId, useMemo, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { focusRing } from '@/components/redesign/service-detail/RDServiceDetailPrimitives';
import type { GuideListItem } from '@/lib/guides/helpers';

// Overview'daki tek client island: kategori filtresi + arama + liste. Yalnızca minimal liste verisini
// (GuideListItem) alır — rehber gövdeleri/FAQ vb. tarayıcıya gönderilmez.
// featured: server'da render edilen 'Öne Çıkan Rehberler' bloğu (prop olarak geçer, client'a veri taşımaz).
// Sıra — tek arama/filtre state'i, DOM'da tek örnek; yalnızca CSS order:
//   mobil  : arama + kategori → öne çıkanlar → liste (arama öne çıkan 3 kartın arkasında kalmasın)
//   desktop: öne çıkanlar → başlık + arama + kategori → liste (onaylı editoryal kompozisyon)
export default function RDGuideCollection({
  items,
  categories,
  basePath = '/rehberler',
  featured,
}: {
  featured?: ReactNode;
  items: GuideListItem[];
  categories: { name: string; count: number }[];
  basePath?: string;
}) {
  const uid = useId();
  const [active, setActive] = useState<string>('Tümü');
  const [query, setQuery] = useState('');

  const visible = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('tr');
    return items.filter((g) => (active === 'Tümü' || g.category === active) && (!q || g.search.includes(q)));
  }, [items, active, query]);

  const pills = [{ name: 'Tümü', count: items.length }, ...categories];

  const reset = () => {
    setQuery('');
    setActive('Tümü');
  };

  const kicker = <p className="text-[11.5px] font-bold uppercase tracking-[0.26em] text-[#1B5CD6]">Kütüphane</p>;
  const headingCls = 'mt-3 text-[1.75rem] font-extrabold leading-tight tracking-tight text-[#14213F] sm:text-[2.2rem]';

  return (
    <div className="flex flex-col">
      {/* Arama + kategori — mobilde hero'dan hemen sonra, desktop'ta öne çıkanlardan sonra */}
      <section aria-label="Rehberlerde ara ve filtrele" className="order-1 border-t border-[#E5E5EC] bg-white pb-2 pt-7 sm:pt-10 lg:order-2 lg:pb-0 lg:pt-20">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            {/* Desktop başlığı (mobilde liste üstünde ayrı başlık var; görünmeyen örnek display:none) */}
            <div className="hidden lg:block">
              {kicker}
              <h2 className={headingCls}>Tüm Rehberler</h2>
            </div>
            <div className="w-full lg:w-[380px]">
              <label htmlFor={`${uid}-search`} className="text-[14px] font-semibold text-[#14213F]">
                Rehberlerde ara
              </label>
              <div className="relative mt-2">
                <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#71717D]">
                  <circle cx="9" cy="9" r="5.5" />
                  <path d="M13.2 13.2L17 17" strokeLinecap="round" />
                </svg>
                <input
                  id={`${uid}-search`}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Örn. FBA, Etsy SEO, B2B"
                  className="block min-h-[48px] w-full rounded-full border border-[#D6D6DC] bg-white pl-11 pr-4 text-[16px] text-[#14213F] outline-none transition-colors placeholder:text-[#8A8A96] hover:border-[#B8B8C2] focus:border-[#1B5CD6] focus:ring-4 focus:ring-[#1B5CD6]/15"
                />
              </div>
            </div>
          </div>

          {/* Kategori rayı — mobilde yatay kaydırma, lg'de satıra sarılır. */}
          <div
            role="group"
            aria-label="Kategoriye göre filtrele"
            className="-mx-6 mt-5 flex gap-2 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:-mx-10 sm:mt-7 sm:px-10 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {pills.map((c) => {
              const on = active === c.name;
              return (
                <button
                  key={c.name}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setActive(c.name)}
                  className={`inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full border px-4 text-[14.5px] font-semibold transition-colors ${focusRing} ${
                    on ? 'border-[#14213F] bg-[#14213F] text-white' : 'border-[#D6D6DC] bg-white text-[#14213F] hover:border-[#1B5CD6] hover:text-[#1B5CD6]'
                  }`}
                >
                  {c.name}
                  <span className={`text-[12.5px] font-bold ${on ? 'text-[#C9A876]' : 'text-[#71717D]'}`}>{c.count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {featured && <div className="order-2 lg:order-1">{featured}</div>}

      {/* Liste */}
      <section aria-label="Tüm rehberler listesi" className="order-3 bg-white pb-12 pt-10 sm:pb-16 lg:pb-20 lg:pt-0">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <div className="lg:hidden">
            {kicker}
            <h2 className={headingCls}>Tüm Rehberler</h2>
          </div>
          <p aria-live="polite" className="mt-5 text-[13.5px] font-medium text-[#5A5A6A]">
            {visible.length} rehber
          </p>

          {visible.length === 0 ? (
            <div className="mt-6">
              <p className="max-w-[48ch] text-[15.5px] leading-relaxed text-[#4A4A5A]">
                Aramanıza veya seçtiğiniz kategoriye uygun bir rehber bulunamadı.
              </p>
              <button
                type="button"
                onClick={reset}
                className={`mt-4 inline-flex min-h-[44px] items-center rounded-full border border-[#D6D6DC] px-5 text-[14.5px] font-semibold text-[#14213F] transition-colors hover:border-[#1B5CD6] hover:text-[#1B5CD6] ${focusRing}`}
              >
                Aramayı ve filtreyi temizle
              </button>
            </div>
          ) : (
            <ul className="mt-3 grid border-t border-[#E5E5EC] lg:grid-cols-2 lg:gap-x-14">
              {visible.map((g) => (
                <li key={g.slug} className="border-b border-[#E5E5EC]">
                  <Link href={`${basePath}/${g.slug}`} className={`group block rounded-lg py-5 sm:py-6 ${focusRing}`}>
                    <p className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-[#1B5CD6]">
                      <span className="normal-case tracking-[0.02em]">{g.category}</span> <span aria-hidden="true" className="px-1 text-[#B8B8C2]">·</span>{' '}
                      <span className="font-semibold normal-case tracking-normal text-[#5A5A6A]">{g.minutes} dk okuma</span>
                    </p>
                    <h3 className="mt-2 text-[1.12rem] font-bold leading-snug text-[#14213F] transition-colors group-hover:text-[#1B5CD6] sm:text-[1.2rem]">
                      {g.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-[15px] leading-relaxed text-[#4A4A5A]">{g.excerpt}</p>
                    <p className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-[13.5px]">
                      {g.service && <span className="text-[#5A5A6A]">İlgili hizmet: {g.service}</span>}
                      <span className="font-semibold text-[#1B5CD6]">
                        Rehberi Oku <span aria-hidden="true">→</span>
                      </span>
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
