// Rehber sistemi için saf yardımcılar. Kaynak veri her zaman components/guides/guidesData.ts —
// burada içerik kopyalanmaz/değiştirilmez; yalnızca türetilmiş (hesaplanan) değerler üretilir.
// Tip importu derleme sonrası silinir: bu modül guidesData'yı client bundle'a TAŞIMAZ.
import type { Guide } from '@/components/guides/guidesData';
import { serviceDirectoryGroups } from '@/components/redesign/services/servicesDirectoryData';

// Bölüm başlığı → anchor id. Production şablonuyla (GuideDetailContent) birebir aynı kural, böylece
// mevcut #anchor linkleri migration sonrasında da çalışır.
export function headingId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9ığüşöç\s-]/gi, '')
    .replace(/\s+/g, '-');
}

// ---------------------------------------------------------------------------
// Okuma süresi — data'daki readTime yerine sayfada gerçekten okunan metnin kelime sayısından.
// ~220 kelime/dk, yukarı yuvarlama, en az 1 dk. Deterministik.
// ---------------------------------------------------------------------------
const WORDS_PER_MINUTE = 220;

export function guideReadableText(g: Guide): string[] {
  return [
    g.summary,
    g.quickAnswer,
    ...(g.whoShouldRead ?? []),
    ...g.sections.flatMap((s) => [s.heading, s.body]),
    g.expertNote,
    g.comparison && [g.comparison.heading, ...g.comparison.headers, ...g.comparison.rows.flatMap((r) => [r.criterion, r.individual, r.company])].join(' '),
    g.checklist && [g.checklist.heading, ...g.checklist.items].join(' '),
    g.keyTakeaway,
    g.audienceSplit && [g.audienceSplit.titleA, ...g.audienceSplit.itemsA, g.audienceSplit.titleB, ...g.audienceSplit.itemsB].join(' '),
    ...(g.decisionTree ?? []),
    g.faq && [g.faq.heading, ...g.faq.items.flatMap((i) => [i.question, i.answer])].join(' '),
    ...(g.nextSteps ?? []),
  ].filter((x): x is string => Boolean(x));
}

export function readingMinutes(g: Guide): number {
  const words = guideReadableText(g).join(' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

// ---------------------------------------------------------------------------
// Kategoriler — sabit liste yerine veriden türetilir (sayı ↓, eşitlikte ilk görünen rehberin order'ı).
// ---------------------------------------------------------------------------
const byOrder = (a: Guide, b: Guide) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER);

export function sortGuides(list: Guide[]) {
  return [...list].sort(byOrder);
}

export function deriveCategories(list: Guide[]): { name: string; count: number }[] {
  const map = new Map<string, { count: number; first: number }>();
  for (const g of sortGuides(list)) {
    const e = map.get(g.category);
    if (e) e.count += 1;
    else map.set(g.category, { count: 1, first: g.order ?? Number.MAX_SAFE_INTEGER });
  }
  return [...map.entries()].sort((a, b) => b[1].count - a[1].count || a[1].first - b[1].first).map(([name, v]) => ({ name, count: v.count }));
}

// ---------------------------------------------------------------------------
// İlgili rehberler (yalnızca render seçimi): 1) nextReadingSlugs sırasıyla, 2) aynı kategoride order'ı
// en yakın olanlar. Başka kategoriden rehber EKLENMEZ (alaka > kart sayısı): 0–3 sonuç olabilir; 0 ise
// bölüm hiç render edilmez. Mevcut rehber hariç, tekrar yok, en fazla 3.
// ---------------------------------------------------------------------------
export function resolveRelatedGuides(current: Guide, all: Record<string, Guide>, max = 3): Guide[] {
  const picked: Guide[] = [];
  const add = (g: Guide | undefined) => {
    if (g && g.slug !== current.slug && !picked.some((p) => p.slug === g.slug) && picked.length < max) picked.push(g);
  };
  (current.nextReadingSlugs ?? []).forEach((s) => add(all[s]));
  const o = current.order ?? 0;
  const nearest = (list: Guide[]) =>
    [...list].sort((a, b) => Math.abs((a.order ?? 0) - o) - Math.abs((b.order ?? 0) - o) || (a.order ?? 0) - (b.order ?? 0));
  const others = Object.values(all).filter((g) => g.slug !== current.slug);
  nearest(others.filter((g) => g.category === current.category)).forEach(add);
  return picked;
}

// ---------------------------------------------------------------------------
// Hizmet adı — relatedServiceSlug'ın production /hizmetler verisindeki gerçek adı (eyebrow ya da
// uzun hero başlığı değil).
// ---------------------------------------------------------------------------
const SERVICE_NAMES = new Map(serviceDirectoryGroups.flatMap((g) => g.items).map((i) => [i.slug, i.title]));

export function serviceName(slug: string): string | null {
  return SERVICE_NAMES.get(slug) ?? null;
}

// ---------------------------------------------------------------------------
// Meta description (production migration için hazırlık) — summary'den deterministik ≤160 karakter:
// sığan tam cümleler; ilk cümle bile sığmıyorsa kelime sınırında kesilip "…" eklenir. Yeni metin yok.
// ---------------------------------------------------------------------------
export function guideMetaDescription(g: Guide, max = 160): string {
  const src = (g.summary ?? g.excerpt).trim();
  if (src.length <= max) return src;
  const sentences = src.match(/[^.!?]+[.!?]+/g) ?? [src];
  let out = '';
  for (const s of sentences) {
    const next = (out + s).trim();
    if (next.length > max) break;
    out = next + ' ';
  }
  out = out.trim();
  if (out.length >= 90) return out;
  const cut = src.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:]$/, '') + '…';
}

// ---------------------------------------------------------------------------
// Overview client island'ına giden minimal liste verisi (tam içerik değil).
// ---------------------------------------------------------------------------
export type GuideListItem = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  minutes: number;
  service: string | null;
  search: string;
};

export function toListItem(g: Guide): GuideListItem {
  return {
    slug: g.slug,
    title: g.title,
    excerpt: g.excerpt,
    category: g.category,
    minutes: readingMinutes(g),
    service: serviceName(g.relatedServiceSlug),
    search: [g.title, g.excerpt, g.category, g.targetAudience, g.searchIntent].join(' ').toLocaleLowerCase('tr'),
  };
}
