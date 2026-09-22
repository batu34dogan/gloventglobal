import Link from 'next/link';
import { guides } from '@/components/guides/guidesData';

function formatPublished(dateStr: string) {
  try {
    return new Intl.DateTimeFormat('tr-TR', { year: 'numeric', month: 'long' }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

// GuidesContent.tsx (/rehberler) ile aynı stratejik sıralama: order alanına göre, homepage için
// yalnızca ilk 3. Yeni veri/tarih üretilmiyor — guidesData.ts'teki gerçek rehberler kullanılıyor.
const topGuides = Object.values(guides)
  .sort((a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER))
  .slice(0, 3);

export default function RDGuides() {
  return (
    <section className="bg-[#FAF9F6] py-16 sm:py-20">
      <style>{`
        .rd-guide-card {
          transition: transform .25s ease, border-color .25s ease;
        }
        .rd-guide-arrow {
          display: inline-block;
          transition: transform .25s ease;
        }
        @media (hover: hover) and (pointer: fine) {
          .rd-guide-card:hover {
            transform: translateY(-3px);
            border-color: rgba(27,92,214,0.35);
          }
          .rd-guide-card:hover .rd-guide-arrow {
            transform: translateX(3px);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .rd-guide-card, .rd-guide-card:hover, .rd-guide-arrow {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>

      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold tracking-[0.28em] text-[#1B5CD6] uppercase">İçgörüler</p>
            <h2 className="mt-4 text-[2rem] font-extrabold leading-[1.15] tracking-tight text-[#14213F] sm:text-[2.4rem]">
              Global Büyüme Rehberleri
            </h2>
            <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-[#6A6A7A]">
              Global satış, e-ticaret, teknoloji ve büyüme süreçlerinde uygulamaya dönük rehberler.
            </p>
          </div>
          <Link
            href="/rehberler"
            className="inline-flex w-fit shrink-0 items-center gap-2 text-[14.5px] font-semibold text-[#1B5CD6] transition-colors hover:text-[#14213F]"
          >
            Tüm Rehberleri Gör →
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {topGuides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/rehberler/${guide.slug}`}
              className="rd-guide-card flex flex-col rounded-2xl border border-[#E5E5EC] bg-white p-7"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#1B5CD6]">
                  {guide.category}
                </span>
                <span className="text-[11.5px] font-medium text-[#9A9AA8]">{guide.readTime}</span>
              </div>

              <h3 className="mt-4 text-[18px] font-bold leading-snug text-[#14213F]">{guide.title}</h3>
              <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-[#6A6A7A]">{guide.excerpt}</p>

              <div className="mt-6 flex items-center justify-between gap-3 border-t border-[#E5E5EC] pt-5">
                <span className="text-[11px] font-medium uppercase tracking-[0.04em] text-[#9A9AA8]">
                  {guide.updatedAt ? `Güncelleme: ${guide.updatedAt}` : `Yayın: ${formatPublished(guide.publishedAt)}`}
                </span>
                <span className="inline-flex shrink-0 items-center gap-1 text-[13.5px] font-semibold text-[#1B5CD6]">
                  Rehberi Oku
                  <span aria-hidden="true" className="rd-guide-arrow">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
