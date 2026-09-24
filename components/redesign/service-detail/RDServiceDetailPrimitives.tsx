import type { ReactNode } from 'react';

// Detail template'in tüm bölümlerinde ortak başlık bloğu — eyebrow / h2 / açıklama. Metinler her
// zaman serviceDetailsData'dan gelir; bu component yalnızca tipografiyi tek yerde tutar.
export function RDSectionHeader({
  eyebrow,
  title,
  description,
  tone = 'light',
  className = '',
  id,
  accent = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  tone?: 'light' | 'dark';
  className?: string;
  id?: string;
  // Uzun sayfada art arda gelen benzer bölümleri ayırmak için eyebrow üstünde kısa aksan çizgisi.
  accent?: boolean;
}) {
  const dark = tone === 'dark';
  return (
    <div className={className}>
      {accent && <span aria-hidden="true" className="mb-5 block h-[2px] w-12 rounded-full bg-gradient-to-r from-[#1B5CD6] to-[#C9A876]" />}
      <p className={`text-[11px] font-bold uppercase tracking-[0.26em] ${dark ? 'text-[#C9A876]' : 'text-[#1B5CD6]'}`}>
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`mt-3 max-w-[24ch] text-[1.85rem] font-extrabold leading-[1.12] tracking-tight sm:text-[2.35rem] ${
          dark ? 'text-white' : 'text-[#14213F]'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 max-w-[60ch] text-[15px] leading-relaxed ${dark ? 'text-white/65' : 'text-[#5A5A6A]'}`}>
          {description}
        </p>
      )}
    </div>
  );
}

// Mobil/tablet için native scroll-snap rail — overview'deki pillar/proje rail'leriyle aynı teknik
// (full-bleed, 84vw kart + sonraki kartın kenarı görünür, auto-scroll yok). Klavye ile de
// kaydırılabilsin diye odaklanabilir bir bölge (tabIndex + aria-label).
export function RDRail({ label, children, className = '' }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div
      role="region"
      aria-label={label}
      tabIndex={0}
      className={`ml-[calc(50%-50vw)] flex w-screen snap-x snap-mandatory scroll-pl-4 gap-3 overflow-x-auto px-4 pb-2 outline-none [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-[#1B5CD6]/40 [&::-webkit-scrollbar]:hidden ${className}`}
    >
      {children}
      <div aria-hidden="true" className="w-px shrink-0" />
    </div>
  );
}

export const railItemClass = 'w-[84vw] max-w-[420px] shrink-0 snap-start';

export const sectionShell = 'mx-auto max-w-[1400px] px-6 sm:px-10';

export const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B5CD6]';

// Numaralı yapılandırılmış satırlar — büyük SaaS kart grid'i yerine ince çizgiyle ayrılmış,
// taranabilir modüller. Problem, kullanım alanları, sistem haritası ve kapsam bölümlerinde ortak.
export function RDNumberedRows({
  items,
  columns = 1,
  tone = 'light',
  accent = 'blue',
}: {
  items: { number: string; title: string; description: string }[];
  columns?: 1 | 2;
  tone?: 'light' | 'dark';
  // Aynı satır yapısını kullanan bölümler arasında küçük ritim farkı: problem (warm/champagne),
  // kapsam/yaklaşım (blue), opsiyonel modüller (outline, biraz daha sıkı satır aralığı).
  accent?: 'blue' | 'warm' | 'outline';
}) {
  const dark = tone === 'dark';
  const badge = dark
    ? 'border-white/15 text-[#C9A876]'
    : accent === 'warm'
      ? 'border-[#E9DCC3] bg-[#FBF6EC] text-[#8A6E43]'
      : accent === 'outline'
        ? 'rounded-full border-[#1B5CD6]/35 bg-transparent text-[#1B5CD6]'
        : 'border-[#DCE3F3] bg-[#F5F8FE] text-[#1B5CD6]';
  return (
    <ol className={`grid gap-x-10 ${columns === 2 ? 'md:grid-cols-2' : ''}`}>
      {items.map((it) => (
        <li
          key={it.number + it.title}
          className={`grid grid-cols-[auto_1fr] gap-x-4 border-t sm:gap-x-5 ${accent === 'outline' ? 'py-5' : 'py-6'} ${
            dark ? 'border-white/10' : accent === 'warm' ? 'border-[#E9E2D4]' : 'border-[#E5E5EC]'
          }`}
        >
          <span className={`flex h-9 w-9 items-center justify-center rounded-lg border text-[12px] font-bold ${badge}`}>
            {it.number}
          </span>
          <div>
            <h3 className={`pt-1 text-[16.5px] font-bold leading-snug ${dark ? 'text-white' : 'text-[#14213F]'}`}>{it.title}</h3>
            <p className={`mt-2 text-[14px] leading-relaxed ${dark ? 'text-white/60' : 'text-[#5A5A6A]'}`}>{it.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
