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

function GuideCard({
  guide,
  widthClassName,
  surfaceClassName,
  titleClassName,
}: {
  guide: (typeof topGuides)[number];
  widthClassName?: string;
  surfaceClassName?: string;
  titleClassName?: string;
}) {
  return (
    <Link
      href={`/rehberler/${guide.slug}`}
      className={`rd-guide-card flex flex-col p-7 ${surfaceClassName ?? 'rounded-2xl border border-[#E5E5EC] bg-white'} ${widthClassName ?? ''}`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#1B5CD6]">
          {guide.category}
        </span>
        <span className="text-[11.5px] font-medium text-[#757580]">{guide.readTime}</span>
      </div>

      <h3 className={titleClassName ?? 'mt-4 text-[18px] font-bold leading-snug text-[#14213F]'}>{guide.title}</h3>
      <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-[#6A6A7A]">{guide.excerpt}</p>

      <div className="mt-6 flex items-center justify-between gap-3 border-t border-[#E5E5EC] pt-5">
        <span className="text-[11px] font-medium uppercase tracking-[0.04em] text-[#757580]">
          {guide.updatedAt ? `Güncelleme: ${guide.updatedAt}` : `Yayın: ${formatPublished(guide.publishedAt)}`}
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 text-[13.5px] font-semibold text-[#1B5CD6]">
          Rehberi Oku
          <span aria-hidden="true" className="rd-guide-arrow">→</span>
        </span>
      </div>
    </Link>
  );
}

export default function RDGuides() {
  return (
    <section className="overflow-x-hidden bg-[#FAF9F6] py-16 sm:py-20">
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
        .rd-guide-rail { scrollbar-width: none; -ms-overflow-style: none; }
        .rd-guide-rail::-webkit-scrollbar { display: none; }
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
            className="inline-flex w-fit shrink-0 items-center gap-2 text-[15px] font-bold text-[#1B5CD6] transition-colors hover:text-[#14213F] sm:text-[14.5px] sm:font-semibold"
          >
            Tüm Rehberleri Gör →
          </Link>
        </div>

        {/* Desktop/tablet (768px+) — mevcut 3'lü grid birebir korunuyor */}
        <div className="mt-12 hidden gap-6 sm:grid-cols-2 md:grid lg:grid-cols-3">
          {topGuides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </div>

      {/* Mobil (0-767px) — 3 kart alt alta değil, yatay swipe/scroll-snap rail; full-bleed
          (mx-auto max-w-[1400px] sınırının dışına taşıyor) ki ikinci kartın kenarı net görünsün. */}
      <div className="rd-guide-rail mt-10 flex w-screen snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 ml-[calc(50%-50vw)] md:hidden">
        {topGuides.map((guide) => (
          <GuideCard
            key={guide.slug}
            guide={guide}
            widthClassName="w-[87vw] shrink-0 snap-center"
            surfaceClassName="rounded-2xl border border-[#EDEDF2] bg-white shadow-[0_1px_3px_rgba(20,33,63,0.05)]"
            titleClassName="mt-4 text-[19px] font-extrabold leading-snug tracking-tight text-[#14213F]"
          />
        ))}
        <div aria-hidden className="w-px shrink-0" />
      </div>
    </section>
  );
}
