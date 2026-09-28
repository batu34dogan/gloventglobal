'use client';

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties, type FormEvent, type KeyboardEvent } from 'react';
import Image from 'next/image';
import { focusRing } from '@/components/redesign/service-detail/RDServiceDetailPrimitives';

// "Bir ürün. Üç satış modeli." — aynı (hayali) ürünün pazaryeri, marka mağazası ve B2B showroom'da nasıl
// farklı sunulduğunu gösteren konsept. Gerçek müşteri projesi değildir; fiyat/yorum/stok gibi veri ve
// Product/Offer schema bilinçli olarak YOK. B2B örnek talebi yalnızca tarayıcıda özetlenir — ağ isteği yok.

const IMG = {
  front: {
    src: '/images/commerce-demo/vase-front.png',
    alt: 'Kum tonlu mat seramik vazonun sade fon üzerinde önden görünümü',
    w: 1254,
    h: 1254,
  },
  angle: {
    src: '/images/commerce-demo/vase-angle.png',
    alt: 'Kum tonlu seramik vazonun farklı bir açıdan görünümü',
    w: 1254,
    h: 1254,
  },
  detail: {
    src: '/images/commerce-demo/vase-detail.png',
    alt: 'Vazonun boyun kısmı ve mat, kumlu yüzey dokusunun yakın planı',
    w: 1254,
    h: 1254,
  },
  lifestyle: {
    src: '/images/commerce-demo/vase-lifestyle.png',
    alt: 'Kum tonlu seramik vazo, gün ışığı alan bir odada traverten konsol üzerinde',
    w: 1536,
    h: 1024,
  },
} as const;
type ImgKey = keyof typeof IMG;

type Reason = { title: string; text: string };
type Model = { key: string; label: string; purpose: string; preview: ImgKey; reasons: Reason[] };

const MODELS: Model[] = [
  {
    key: 'pazaryeri',
    label: 'Pazaryeri',
    purpose: 'Ürünü hızlı ve net değerlendirmek.',
    preview: 'front',
    reasons: [
      { title: 'Ürün ilk bakışta anlaşılır.', text: 'Sade fon, form ve yüzeyi öne çıkarır.' },
      { title: 'Karar için gerekli bilgi yakındır.', text: 'Görseller ve kısa ürün bilgisi birlikte okunur.' },
      { title: 'Görsel sırası soruları yanıtlar.', text: 'Genel görünümden açıya ve dokuya ilerler.' },
    ],
  },
  {
    key: 'magaza',
    label: 'Kendi Mağazanız',
    purpose: 'Ürünle birlikte marka deneyimini anlatmak.',
    preview: 'lifestyle',
    reasons: [
      { title: 'Ürün bir bağlam kazanır.', text: 'Mekân içi sunum, kullanımını hayal etmeyi kolaylaştırır.' },
      { title: 'Marka dili tutarlı ilerler.', text: 'Fotoğraf, tipografi ve anlatım aynı hissi taşır.' },
      { title: 'Detay, algıyı destekler.', text: 'Yakın plan yüzeyi ve formu görünür kılar.' },
    ],
  },
  {
    key: 'b2b',
    label: 'B2B Showroom',
    purpose: 'Proje ihtiyacını anlaşılır bir talebe dönüştürmek.',
    preview: 'front',
    reasons: [
      { title: 'İhtiyaç önce netleşir.', text: 'Kullanım alanı ve miktar aynı yerde toplanır.' },
      { title: 'Görüşmeye uygun bilgi oluşur.', text: 'Talep, değerlendirmeye elverişli bir özete dönüşür.' },
      { title: 'Sonraki adım açıktır.', text: 'B2B deneyimi proje ve teklif görüşmesine hazırlanır.' },
    ],
  },
];

const eyebrow = 'text-[12px] font-bold uppercase tracking-[0.2em] text-[#8A6E43]';

// Küçük görsel seçici — açıklayıcı adlı gerçek düğmeler; seçili olan aria-pressed ile bildirilir.
function ThumbButton({ k, label, selected, onSelect, size = 'h-16 w-16' }: { k: ImgKey; label: string; selected: boolean; onSelect: () => void; size?: string }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={label}
      className={`relative shrink-0 overflow-hidden rounded-xl border bg-white transition-colors ${size} ${
        selected ? 'border-[#14213F] ring-2 ring-[#14213F]/15' : 'border-[#E5E5EC] hover:border-[#1B5CD6]'
      } ${focusRing}`}
    >
      <Image src={IMG[k].src} alt="" width={IMG[k].w} height={IMG[k].h} sizes="72px" className="h-full w-full object-cover" />
    </button>
  );
}

function MarketplacePanel() {
  // Görsel sırası: genel görünüm → açı → doku. Seçili görsel, küçük görsel düğmelerinde aria-pressed ile bildirilir.
  const views: { k: ImgKey; name: string }[] = [
    { k: 'front', name: 'Ön görünüm' },
    { k: 'angle', name: 'Farklı açı' },
    { k: 'detail', name: 'Doku detayı' },
  ];
  const [sel, setSel] = useState(0);
  const cur = views[sel];
  return (
    <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] sm:gap-8">
      <div>
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-[#EFEBE3] bg-white">
          <Image
            key={cur.k}
            src={IMG[cur.k].src}
            alt={IMG[cur.k].alt}
            fill
            sizes="(min-width: 1280px) 440px, (min-width: 640px) 45vw, 100vw"
            className="rd-sm-fade object-contain"
          />
        </div>
        <div className="mt-3 flex gap-2.5" role="group" aria-label="Ürün görselleri">
          {views.map((v, i) => (
            <ThumbButton key={v.k} k={v.k} label={`${v.name} görselini göster`} selected={i === sel} onSelect={() => setSel(i)} />
          ))}
        </div>
      </div>
      {/* Ürün başlığı görselin yanında dikey olarak ortalanır (sm+); mobilde galerinin altında. */}
      <div className="flex flex-col sm:justify-center sm:pb-[76px]">
        <p className={eyebrow}>Pazaryeri konsepti</p>
        <p className="mt-3 text-[1.5rem] font-extrabold leading-tight tracking-tight text-[#14213F] sm:text-[1.9rem]">Kum Tonlu Seramik Vazo</p>
        <p className="mt-2 text-[15.5px] text-[#5A5A6A] sm:mt-3 sm:text-[16.5px]">Mat yüzey • Heykelsi form</p>
      </div>
    </div>
  );
}

function StorePanel() {
  const views: { k: ImgKey; name: string }[] = [
    { k: 'lifestyle', name: 'Mekânda' },
    { k: 'front', name: 'Ön görünüm' },
    { k: 'detail', name: 'Doku detayı' },
  ];
  const [sel, setSel] = useState(0);
  const cur = views[sel];
  // Masaüstünde (lg) görsel + metin yan yana: görsel sütunu sınırlı, 3:2 oranı korunur; panel diğer
  // sekmelerle yakın yükseklikte kalır. lg altında görsel tam genişlik, metin ve galeri altında.
  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:items-center lg:gap-8">
      {/* 3:2 çerçeve = mekân görselinin kendi oranı (kırpılmaz); kare görseller contain ile sığar. */}
      <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-[#F3EEE6]">
        <Image
          key={cur.k}
          src={IMG[cur.k].src}
          alt={IMG[cur.k].alt}
          fill
          sizes="(min-width: 1280px) 480px, (min-width: 1024px) 38vw, 100vw"
          className={`rd-sm-fade ${cur.k === 'lifestyle' ? 'object-cover' : 'object-contain'}`}
        />
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end lg:mt-0 lg:grid-cols-1 lg:items-start">
        <div>
          <p className={eyebrow}>Marka mağazası konsepti</p>
          <p className="mt-3 text-[1.6rem] font-light leading-[1.15] tracking-tight text-[#14213F] sm:text-[2rem]">Mekâna sakin bir karakter.</p>
          <p className="mt-2 max-w-[42ch] text-[15.5px] leading-relaxed text-[#5A5A6A]">Formu, dokuyu ve kullanım bağlamını birlikte keşfedin.</p>
        </div>
        <div className="flex gap-2.5" role="group" aria-label="Mağaza görselleri">
          {views.map((v, i) => (
            <ThumbButton key={v.k} k={v.k} label={`${v.name} görselini göster`} selected={i === sel} onSelect={() => setSel(i)} size="h-14 w-14" />
          ))}
        </div>
      </div>
    </div>
  );
}

const USES = ['Mağaza', 'Otel', 'İç mimari proje'] as const;

function B2BPanel() {
  const uid = useId();
  const [use, setUse] = useState<string>('');
  const [qty, setQty] = useState('');
  const [error, setError] = useState<{ use?: string; qty?: string }>({});
  const [summary, setSummary] = useState<{ use: string; qty: number | null } | null>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault(); // yalnızca yerel özet — ağ isteği / kayıt yok
    const next: { use?: string; qty?: string } = {};
    if (!use) next.use = 'Lütfen bir kullanım alanı seçin.';
    const q = qty.trim();
    if (q && !/^[1-9]\d{0,5}$/.test(q)) next.qty = 'Adet pozitif bir tam sayı olmalıdır.';
    setError(next);
    setSummary(Object.keys(next).length ? null : { use, qty: q ? Number(q) : null });
  };

  return (
    <div className="grid gap-6 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-8">
      {/* Katalog kartı: mobilde kompakt yatay (88px görsel + bilgi), sm+ dikey kart. Siluet contain ile tam. */}
      <div className="flex items-center gap-3.5 self-start rounded-2xl border border-[#E5E5EC] bg-white p-2.5 sm:block sm:max-w-[220px] sm:p-3">
        <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-xl bg-white sm:aspect-square sm:h-auto sm:w-full">
          <Image src={IMG.front.src} alt={IMG.front.alt} fill sizes="(min-width: 640px) 200px, 96px" className="object-contain" />
        </div>
        <div className="min-w-0">
          <p className="text-[15px] font-bold leading-snug text-[#14213F] sm:mt-3 sm:text-[14.5px]">Kum Tonlu Seramik Vazo</p>
          <p className="mt-1 text-[13.5px] text-[#5A5A6A] sm:text-[13px]">Mat yüzey • Heykelsi form</p>
        </div>
      </div>
      <div>
        <p className={eyebrow}>B2B showroom konsepti</p>
        <p className="mt-3 text-[1.5rem] font-extrabold leading-tight tracking-tight text-[#14213F] sm:text-[1.7rem]">Projeniz için değerlendirin.</p>
        <form onSubmit={onSubmit} noValidate className="mt-5">
          <fieldset aria-describedby={error.use ? `${uid}-use-err` : undefined}>
            <legend className="text-[14px] font-semibold text-[#14213F]">Kullanım alanı</legend>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {USES.map((u) => (
                <label
                  key={u}
                  className={`relative inline-flex min-h-[44px] cursor-pointer items-center rounded-full border px-4 text-[14.5px] font-semibold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#1B5CD6] ${
                    use === u ? 'border-[#14213F] bg-[#14213F] text-white' : 'border-[#D6D6DC] bg-white text-[#14213F] hover:border-[#1B5CD6]'
                  }`}
                >
                  <input type="radio" name={`${uid}-use`} value={u} checked={use === u} onChange={() => setUse(u)} className="sr-only" />
                  {u}
                </label>
              ))}
            </div>
            {error.use && <p id={`${uid}-use-err`} className="mt-2 text-[13.5px] font-medium text-[#B42318]">{error.use}</p>}
          </fieldset>
          <div className="mt-5">
            <label htmlFor={`${uid}-qty`} className="text-[14px] font-semibold text-[#14213F]">
              Adet <span className="font-normal text-[#5A5A6A]">(isteğe bağlı)</span>
            </label>
            <input
              id={`${uid}-qty`}
              type="text"
              inputMode="numeric"
              autoComplete="off"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              aria-invalid={!!error.qty}
              aria-describedby={error.qty ? `${uid}-qty-err` : undefined}
              placeholder="Örn. 24"
              className="mt-2 block min-h-[48px] w-full max-w-[200px] rounded-xl border border-[#D6D6DC] bg-white px-4 text-[16px] text-[#14213F] outline-none placeholder:text-[#8A8A96] focus:border-[#1B5CD6] focus:ring-4 focus:ring-[#1B5CD6]/15"
            />
            {error.qty && <p id={`${uid}-qty-err`} className="mt-2 text-[13.5px] font-medium text-[#B42318]">{error.qty}</p>}
          </div>
          <button
            type="submit"
            className={`rd-sm-cta mt-6 inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#14213F] px-6 text-[15px] font-semibold text-white hover:bg-[#1B5CD6] ${focusRing}`}
          >
            Örnek talep özetini gör
          </button>
        </form>
        <div role="status" aria-live="polite" className="mt-5">
          {summary && (
            <div className="rounded-2xl border border-[#E9DCC3] bg-[#FBF7EF] p-4 sm:p-5">
              <p className="text-[14px] font-bold text-[#14213F]">Örnek talep özeti</p>
              <dl className="mt-2 grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-1 text-[15px]">
                <dt className="text-[#5A5A6A]">Ürün</dt>
                <dd className="font-medium text-[#14213F]">Kum Tonlu Seramik Vazo</dd>
                <dt className="text-[#5A5A6A]">Kullanım alanı</dt>
                <dd className="font-medium text-[#14213F]">{summary.use}</dd>
                {summary.qty !== null && (
                  <>
                    <dt className="text-[#5A5A6A]">Adet</dt>
                    <dd className="font-medium text-[#14213F]">{summary.qty}</dd>
                  </>
                )}
              </dl>
              <p className="mt-3 text-[13.5px] font-semibold text-[#6B5634]">Bu bir örnek gösterimdir. Talep gönderilmedi.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RDSalesModels() {
  const uid = useId();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);
  const regionRef = useRef<HTMLDivElement>(null);
  const tablistRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const placedOnce = useRef(false);
  const [revealed, setRevealed] = useState(false);

  // İlk giriş (yalnız bir kez): mevcut html.rd-js + IntersectionObserver deseni. Gizli başlangıç durumu
  // yalnız JS çalışırken ve boyamadan önce uygulanır; hydrate olmazsa rd-js kalkar, içerik görünür kalır.
  useEffect(() => {
    const el = regionRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      const id = window.setTimeout(() => setRevealed(true), 0);
      return () => window.clearTimeout(id);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Kayan sekme göstergesi: sekmelerin üstünde, beyaz etiket kopyalarını taşıyan lacivert katman; yalnız
  // clip-path bölgesi seçili sekmenin kutusuna kayar. Beyaz yazı yalnız lacivertin olduğu yerde görünür, alttaki
  // gerçek etiketler hep lacivert kalır — geçişin her karesinde (ve yarıda kesilen geçişlerde) okunur.
  // İlk yerleşim ve yeniden boyutlanma geçişsiz; ölçüm yalnız seçim değişince ve şerit/sekmeler boyut değiştirince.
  const placeIndicator = useCallback((animate: boolean) => {
    const list = tablistRef.current;
    const ind = indicatorRef.current;
    const tab = tabRefs.current[activeRef.current];
    if (!list || !ind || !tab) return;
    if (!animate) ind.style.transition = 'none';
    // Kesirli ölçü (mobil 3 sütunlu ızgarada sekme genişlikleri tam sayı değil); ikisi de aynı transform altında.
    const box = ind.getBoundingClientRect();
    const t = tab.getBoundingClientRect();
    const radius = getComputedStyle(tab).borderTopLeftRadius;
    ind.style.clipPath = `inset(${t.top - box.top}px ${box.right - t.right}px ${box.bottom - t.bottom}px ${t.left - box.left}px round ${radius})`;
    if (!animate) {
      void ind.offsetWidth;
      ind.style.transition = '';
    }
    list.dataset.indicator = 'on';
  }, []);

  useLayoutEffect(() => {
    activeRef.current = active;
    placeIndicator(placedOnce.current);
    placedOnce.current = true;
  }, [active, placeIndicator]);

  useEffect(() => {
    const list = tablistRef.current;
    if (!list || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => placeIndicator(false));
    ro.observe(list);
    tabRefs.current.forEach((t) => t && ro.observe(t));
    return () => ro.disconnect();
  }, [placeIndicator]);

  const select = (i: number, focus: boolean) => {
    setActive(i);
    if (focus) tabRefs.current[i]?.focus();
  };

  // WAI-ARIA tabs: sol/sağ oklar, Home/End — otomatik etkinleştirme.
  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = MODELS.length - 1;
    const to = e.key === 'ArrowRight' ? (i === last ? 0 : i + 1) : e.key === 'ArrowLeft' ? (i === 0 ? last : i - 1) : e.key === 'Home' ? 0 : e.key === 'End' ? last : null;
    if (to === null) return;
    e.preventDefault();
    select(to, true);
  };

  // Alt önizlemeden seçim: sekmeyi aç, odağı sekmeye taşı ve kart görünür değilse ona kaydır.
  const fromPreview = (i: number) => {
    setActive(i);
    tabRefs.current[i]?.focus({ preventScroll: true });
    const top = cardRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 80) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      cardRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    }
  };

  return (
    <div ref={regionRef} className={`rd-sm-region mt-14 sm:mt-20${revealed ? ' rd-in' : ''}`} aria-labelledby={`${uid}-title`} role="region">
      <style>{`
        /* Hareket dili denemesi — yalnız bu bölüm kapsamında. */
        .rd-sm-region {
          --rd-sm-ease: cubic-bezier(0.22, 1, 0.36, 1);
          --rd-sm-reveal: 600ms; /* ilk giriş: başlık grubu, sekmeler, sunum alanı */
          --rd-sm-step: 80ms;    /* ilk giriş öğeleri arası gecikme (en fazla 160 ms) */
          --rd-sm-line: 400ms;   /* altın çizginin açılması */
          --rd-sm-tab: 220ms;    /* sekme göstergesi (lacivert zemin + beyaz etiketler) */
          --rd-sm-panel: 200ms;  /* panel içeriği */
          --rd-sm-btn: 160ms;    /* B2B butonu */
        }
        /* 1) İlk giriş — tek sefer. Yalnız html.rd-js varken (boyamadan önce) gizli başlar; sonra .rd-in. */
        .rd-sm-rv {
          transition: opacity var(--rd-sm-reveal) var(--rd-sm-ease), transform var(--rd-sm-reveal) var(--rd-sm-ease);
          transition-delay: calc(var(--rd-sm-i, 0) * var(--rd-sm-step));
        }
        /* Mesafeler ana sayfanın ortak değişkenlerinden (home-motion.css); mobilde kısalır. */
        .rd-js .rd-sm-region:not(.rd-in) .rd-sm-rv { opacity: 0; transform: translateY(var(--hm-body-y, 14px)); }
        .rd-js .rd-sm-region:not(.rd-in) .rd-sm-head { transform: translateY(var(--hm-head-y, 18px)); }
        /* 2) Altın çizgi — soldan sağa bir kez açılır. */
        .rd-sm-line { transform-origin: left center; transition: transform var(--rd-sm-line) var(--rd-sm-ease) 120ms; }
        .rd-js .rd-sm-region:not(.rd-in) .rd-sm-line { transform: scaleX(0); }
        /* 3) Sekmeler — gösterge ölçülüp yerleşince seçili sekmenin kendi zemini devreden çıkar. */
        .rd-sm-tab { transition: background-color var(--rd-sm-tab) var(--rd-sm-ease); }
        .rd-sm-ind { opacity: 0; transition: clip-path var(--rd-sm-tab) var(--rd-sm-ease); }
        .rd-sm-tabs[data-indicator] .rd-sm-ind { opacity: 1; }
        .rd-sm-tabs[data-indicator] .rd-sm-tab[aria-selected="true"] { background-color: transparent; color: #14213F; }
        @keyframes rd-sm-panel-kf { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
        .rd-sm-panel:not([hidden]) { animation: rd-sm-panel-kf var(--rd-sm-panel) var(--rd-sm-ease) backwards; }
        /* Galeri görsel değişimi (mevcut davranış). */
        @keyframes rd-sm-fade-kf { from { opacity: 0; } to { opacity: 1; } }
        .rd-sm-fade { animation: rd-sm-fade-kf .22s ease-out both; }
        /* 4) B2B butonu — yükselme yalnız hover destekli, hassas işaretçili cihazlarda. */
        .rd-sm-cta {
          transition: background-color var(--rd-sm-btn) var(--rd-sm-ease), box-shadow var(--rd-sm-btn) var(--rd-sm-ease), transform var(--rd-sm-btn) var(--rd-sm-ease);
        }
        @media (hover: hover) and (pointer: fine) {
          .rd-sm-cta:hover { transform: translateY(-1px); box-shadow: 0 8px 18px -10px rgba(20, 33, 63, 0.55); }
        }
        .rd-sm-cta:active { transform: scale(0.99); box-shadow: none; transition-duration: 90ms; }
        @media (prefers-reduced-motion: reduce) {
          .rd-js .rd-sm-region:not(.rd-in) .rd-sm-rv { opacity: 1; transform: none; }
          .rd-js .rd-sm-region:not(.rd-in) .rd-sm-line { transform: none; }
          .rd-sm-rv, .rd-sm-line, .rd-sm-ind { transition: none; }
          .rd-sm-panel:not([hidden]), .rd-sm-fade { animation: none; }
          .rd-sm-cta:hover, .rd-sm-cta:active { transform: none; }
        }
        /* Klavye odağıyla kaydırmada kontroller sabit navbar'ın (üst) ve sabit analiz CTA'sının (alt) altında kalmasın. */
        .rd-sm-region :is(button, input, a) { scroll-margin-top: 104px; scroll-margin-bottom: 120px; }
      `}</style>

      <div className="rd-sm-rv rd-sm-head">
        <p className="inline-flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.26em] text-[#1B5CD6]">
          <span aria-hidden="true" className="rd-sm-line h-px w-6 bg-[#C9A876]" />
          Örnek Senaryo
        </p>
        <h3 id={`${uid}-title`} className="mt-3 text-[2rem] font-extrabold leading-tight tracking-tight text-[#14213F] sm:text-[2.4rem]">
          Bir ürün. Üç satış modeli.
        </h3>
        <p className="mt-3 max-w-[56ch] text-[16px] leading-relaxed text-[#4A4A5A] sm:text-[17px]">
          Aynı ürün, farklı satın alma kararları. Sunumu, bilgiyi ve aksiyonu satış modeline göre tasarlıyoruz.
        </p>
      </div>

      {/* Sekmeler */}
      {/* Mobilde 3 eşit sütun (etiketler sarılabilir, hepsi her zaman görünür); sm+ tek satır pill bar. */}
      <div
        ref={tablistRef}
        role="tablist"
        aria-label="Satış modeli"
        className="rd-sm-rv rd-sm-tabs relative mt-7 grid grid-cols-3 gap-1 rounded-2xl border border-[#E5E5EC] bg-white p-1.5 sm:inline-flex sm:gap-1.5 sm:rounded-full"
        style={{ '--rd-sm-i': 1 } as CSSProperties}
      >
        {MODELS.map((m, i) => {
          const on = i === active;
          return (
            <button
              key={m.key}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`${uid}-tab-${m.key}`}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls={`${uid}-panel-${m.key}`}
              tabIndex={on ? 0 : -1}
              onClick={() => select(i, false)}
              onKeyDown={(e) => onTabKey(e, i)}
              className={`rd-sm-tab relative min-h-[48px] rounded-xl px-1.5 text-[13.5px] font-semibold leading-tight sm:min-h-[44px] sm:whitespace-nowrap sm:rounded-full sm:px-5 sm:text-[14.5px] ${focusRing} ${
                on ? 'bg-[#14213F] text-white' : 'text-[#14213F] hover:bg-[#F4F1EA]'
              }`}
            >
              {m.label}
            </button>
          );
        })}
        {/* Gösterge katmanı: sekmelerle aynı yerleşim ve tipografi (etiketler üst üste oturur). */}
        <div
          ref={indicatorRef}
          aria-hidden="true"
          className="rd-sm-ind pointer-events-none absolute inset-0 grid grid-cols-3 gap-1 bg-[#14213F] p-1.5 sm:flex sm:gap-1.5"
        >
          {MODELS.map((m) => (
            <span
              key={m.key}
              className="flex min-h-[48px] items-center justify-center px-1.5 text-center text-[13.5px] font-semibold leading-tight text-white sm:min-h-[44px] sm:whitespace-nowrap sm:px-5 sm:text-[14.5px]"
            >
              {m.label}
            </span>
          ))}
        </div>
      </div>

      {/* Ana sunum kartı: ~2/3 konsept arayüz + ~1/3 "Neden böyle?" (mobilde açıklama altta) */}
      <div
        ref={cardRef}
        className="rd-sm-rv mt-4 scroll-mt-28 overflow-hidden rounded-2xl border border-[#E5E5EC] bg-[#FEFCF9]"
        style={{ '--rd-sm-i': 2 } as CSSProperties}
      >
        {MODELS.map((m, i) => (
          <div
            key={m.key}
            id={`${uid}-panel-${m.key}`}
            role="tabpanel"
            aria-labelledby={`${uid}-tab-${m.key}`}
            hidden={i !== active}
            // Asgari yükseklik grid'in kendisinde: iki sütun da kartın altına kadar uzar (sağ sütun zemini ve
            // ayırıcı çizgi kesintisiz). Yalnız masaüstü; mobilde paneller doğal yükseklikte.
            className="rd-sm-panel grid lg:min-h-[560px] lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]"
          >
            {i === active && (
              <>
                <div className="p-5 sm:p-8 lg:flex lg:flex-col lg:justify-center lg:p-10">
                  {m.key === 'pazaryeri' && <MarketplacePanel />}
                  {m.key === 'magaza' && <StorePanel />}
                  {m.key === 'b2b' && <B2BPanel />}
                </div>
                <div className="border-t border-[#E5E5EC] bg-white p-5 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
                  <h4 className="flex items-center gap-2.5 text-[1.15rem] font-bold text-[#14213F]">
                    <span aria-hidden="true" className="h-5 w-[3px] rounded-full bg-gradient-to-b from-[#1B5CD6] to-[#C9A876]" />
                    Neden böyle?
                  </h4>
                  <ul className="mt-5 space-y-5">
                    {m.reasons.map((r) => (
                      <li key={r.title}>
                        <p className="text-[15.5px] font-semibold leading-snug text-[#14213F]">{r.title}</p>
                        <p className="mt-1 text-[15px] leading-relaxed text-[#5A5A6A]">{r.text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Karşılaştırma önizlemeleri — tıklanınca ilgili sekmeyi açar. Mobilde (<640px) gösterilmez: üstteki
          sekmeler yeterli; display:none olduğu için düğmeler odak sırasına da girmez. */}
      <ul
        className="rd-sm-rv mt-4 hidden gap-4 sm:grid sm:grid-cols-3"
        aria-label="Satış modeli önizlemeleri"
        style={{ '--rd-sm-i': 2 } as CSSProperties}
      >
        {MODELS.map((m, i) => {
          const on = i === active;
          return (
            <li key={m.key}>
              <button
                type="button"
                onClick={() => fromPreview(i)}
                aria-pressed={on}
                className={`flex w-full items-center gap-3.5 rounded-2xl border p-2.5 text-left transition-colors sm:items-start sm:p-3 ${focusRing} ${
                  on ? 'border-[#14213F] bg-white' : 'border-[#E5E5EC] bg-white/60 hover:border-[#1B5CD6]'
                }`}
              >
                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white sm:h-20 sm:w-20">
                  <Image
                    src={IMG[m.preview].src}
                    alt=""
                    width={IMG[m.preview].w}
                    height={IMG[m.preview].h}
                    sizes="80px"
                    className={`h-full w-full ${m.preview === 'lifestyle' ? 'object-cover object-[62%_50%]' : 'object-contain'}`}
                  />
                </span>
                <span className="min-w-0">
                  <span className="block text-[15px] font-bold text-[#14213F]">{m.label}</span>
                  <span className="mt-0.5 block text-[14px] leading-snug text-[#5A5A6A]">{m.purpose}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
