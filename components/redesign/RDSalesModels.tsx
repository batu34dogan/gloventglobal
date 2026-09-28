'use client';

import { useId, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
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
            className={`mt-6 inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#14213F] px-6 text-[15px] font-semibold text-white transition-colors hover:bg-[#1B5CD6] ${focusRing}`}
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
    <div className="rd-sm-region mt-14 sm:mt-20" aria-labelledby={`${uid}-title`} role="region">
      <style>{`
        @keyframes rd-sm-fade-kf { from { opacity: 0; } to { opacity: 1; } }
        .rd-sm-fade { animation: rd-sm-fade-kf .22s ease-out both; }
        @media (prefers-reduced-motion: reduce) { .rd-sm-fade { animation: none; } }
        /* Klavye odağıyla kaydırmada kontroller sabit navbar'ın (üst) ve sabit analiz CTA'sının (alt) altında kalmasın. */
        .rd-sm-region :is(button, input, a) { scroll-margin-top: 104px; scroll-margin-bottom: 120px; }
      `}</style>

      <div>
        <p className="inline-flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.26em] text-[#1B5CD6]">
          <span aria-hidden="true" className="h-px w-6 bg-[#C9A876]" />
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
      <div role="tablist" aria-label="Satış modeli" className="mt-7 grid grid-cols-3 gap-1 rounded-2xl border border-[#E5E5EC] bg-white p-1.5 sm:inline-flex sm:gap-1.5 sm:rounded-full">
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
              className={`min-h-[48px] rounded-xl px-1.5 text-[13.5px] font-semibold leading-tight transition-colors sm:min-h-[44px] sm:whitespace-nowrap sm:rounded-full sm:px-5 sm:text-[14.5px] ${focusRing} ${
                on ? 'bg-[#14213F] text-white' : 'text-[#14213F] hover:bg-[#F4F1EA]'
              }`}
            >
              {m.label}
            </button>
          );
        })}
      </div>

      {/* Ana sunum kartı: ~2/3 konsept arayüz + ~1/3 "Neden böyle?" (mobilde açıklama altta) */}
      <div ref={cardRef} className="mt-4 scroll-mt-28 overflow-hidden rounded-2xl border border-[#E5E5EC] bg-[#FEFCF9]">
        {MODELS.map((m, i) => (
          <div
            key={m.key}
            id={`${uid}-panel-${m.key}`}
            role="tabpanel"
            aria-labelledby={`${uid}-tab-${m.key}`}
            hidden={i !== active}
            // Asgari yükseklik grid'in kendisinde: iki sütun da kartın altına kadar uzar (sağ sütun zemini ve
            // ayırıcı çizgi kesintisiz). Yalnız masaüstü; mobilde paneller doğal yükseklikte.
            className="grid lg:min-h-[560px] lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]"
          >
            {i === active && (
              <>
                <div className="rd-sm-fade p-5 sm:p-8 lg:flex lg:flex-col lg:justify-center lg:p-10">
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
      <ul className="mt-4 hidden gap-4 sm:grid sm:grid-cols-3" aria-label="Satış modeli önizlemeleri">
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
