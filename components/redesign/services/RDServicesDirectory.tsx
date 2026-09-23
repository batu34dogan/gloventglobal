'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

// Kaynak: components/services/serviceDetailsData.ts (audience/approach/problem/deliverables
// alanları) + components/services/ServicesContent.tsx (serviceCards). Başlıklar kullanıcının
// verdiği 12 gerçek hizmet adıyla birebir aynı; açıklamalar ve capability label'lar her hizmetin
// kendi serviceDetailsData içeriğinden derlendi — yeni hizmet, vaat ya da platform uydurulmadı.
// Kategori grupları, kullanıcının verdiği pillar eşleştirmesiyle aynı; her hizmet tek birincil
// kategoriye yerleştirildi (Shopify/B2B pillar bölümünde Teknoloji'ye de değiniyor ama burada
// tekrar satır oluşturmamak için Ticaret altında listeleniyor).
const groups: {
  category: string;
  items: { title: string; desc: string; labels: string[]; slug: string }[];
}[] = [
  {
    category: 'Strateji',
    items: [
      {
        title: 'Marka Konumlandırma',
        desc: 'Ürününüzü yalnızca satılacak bir ürün olarak değil, hedef müşteri ve rakip ayrışmasına göre net bir pazar konumunda konumlandırırız.',
        labels: ['Hedef Müşteri', 'Rakip Ayrışması', 'Değer Önerisi', 'Kanal Dili'],
        slug: 'marka-konumlandirma',
      },
      {
        title: 'Global Pazara Giriş Stratejisi',
        desc: 'Ürününüz için doğru ülke, kanal, fiyat ve operasyon hazırlığını değerlendirip uygulanabilir bir global büyüme yol haritası çıkarırız.',
        labels: ['Pazar & Kanal Seçimi', 'Fiyat & Rekabet', 'Operasyon Hazırlığı', '12 Aylık Plan'],
        slug: 'global-pazara-giris-stratejisi',
      },
    ],
  },
  {
    category: 'Ticaret',
    items: [
      {
        title: 'Amazon Global Satış Sistemi',
        desc: 'Kategori seçiminden listeleme, reklam ve stok/operasyon takibine kadar Amazon satışını uçtan uca kurar ve yönetiriz.',
        labels: ['Listeleme & SEO', 'Reklam', 'Marka Kaydı', 'Stok & Operasyon'],
        slug: 'amazon',
      },
      {
        title: 'Etsy Marka Sistemi',
        desc: 'El yapımı, butik ve niş ürünler için mağaza dili, görsel sunum, listeleme ve SEO’yu tek bir satış sistemi olarak kurarız.',
        labels: ['Mağaza Kurulumu', 'Görsel Sunum', 'Etsy SEO', 'Reklam & Test'],
        slug: 'etsy',
      },
      {
        title: 'eBay Global Satış Sistemi',
        desc: 'Doğru ülke ve kategori seçiminden kargo, fiyatlandırma ve mağaza güven sinyallerine kadar global eBay satışını kurgularız.',
        labels: ['Ülke Stratejisi', 'Fiyat & Kargo', 'Listeleme', 'Mağaza Güveni'],
        slug: 'ebay',
      },
      {
        title: 'Shopify Commerce Sistemi',
        desc: 'Vitrin ve ürün yönetiminin yanında B2B showroom ve teklif akışını da kapsayan bağımsız bir commerce altyapısı kurarız.',
        labels: ['Ürün & Koleksiyon', 'B2B Showroom', 'Teklif Akışı', 'Dönüşüm Optimizasyonu'],
        slug: 'shopify',
      },
      {
        title: 'B2B Dijital Showroom',
        desc: 'Toptan satış yapan markalar için dijital katalog, teklif toplama akışı ve müşteri odaklı ürün sunumunu showroom mantığıyla kurarız.',
        labels: ['Dijital Katalog', 'Teklif Listesi', 'Müşteri Segmentasyonu', 'Showroom Deneyimi'],
        slug: 'b2b-dijital-showroom',
      },
    ],
  },
  {
    category: 'Teknoloji',
    items: [
      {
        title: 'Otomasyon & n8n Sistemleri',
        desc: 'Form, teklif, sipariş ve raporlama süreçlerini n8n ve API bağlantılarıyla birbirine bağlı, tek merkezden izlenebilir hale getiririz.',
        labels: ['n8n & API', 'Form / Teklif Akışı', 'Bildirim & Görev', 'Raporlama'],
        slug: 'otomasyon-n8n',
      },
      {
        title: 'Yapay Zeka Entegrasyonu',
        desc: 'Ürün, içerik, raporlama ve operasyon süreçlerine yapay zeka destekli sistemleri; ayrı bir araç değil, satış sisteminin parçası olarak entegre ederiz.',
        labels: ['İçerik Üretimi', 'Raporlama', 'Operasyon Otomasyonu', 'Karar Desteği'],
        slug: 'yapay-zeka-entegrasyonu',
      },
    ],
  },
  {
    category: 'Operasyon',
    items: [
      {
        title: 'Reklam & Optimizasyon',
        desc: 'Amazon, Etsy, Google ve Meta reklamlarını dönüşüm, ROAS ve kârlılık verisine göre düzenli olarak optimize ederiz.',
        labels: ['Amazon & Etsy Ads', 'Google & Meta', 'ROAS Takibi', 'Kampanya Optimizasyonu'],
        slug: 'reklam-optimizasyon',
      },
      {
        title: 'Görsel & İçerik Sistemi',
        desc: 'Ürün fotoğrafından başlık, açıklama ve SEO yapısına kadar kanal bazlı görsel ve içerik sistemini kurarız.',
        labels: ['Ürün Fotoğrafı', 'AI Görsel Konsept', 'Listeleme Metni', 'SEO'],
        slug: 'gorsel-icerik-sistemi',
      },
      {
        title: 'Sosyal Medya Yönetimi',
        desc: 'Instagram, TikTok ve diğer kanallarda markanızın satış kanallarıyla uyumlu, tutarlı bir içerik ve paylaşım sistemi kurarız.',
        labels: ['Instagram & TikTok', 'İçerik Planı', 'Ürün Anlatımı', 'Satış Kanalı Uyumu'],
        slug: 'sosyal-medya-yonetimi',
      },
    ],
  },
];

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      const id = window.setTimeout(() => setInView(true), 0);
      return () => window.clearTimeout(id);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView] as const;
}

// Desktop-only "system module" kartı (lg+, sağdaki explorer panelinde) — mobile hâlâ aynı
// ServiceRow'u kullanıyor, bu görevde mobile markup'a dokunulmadı.
function ServiceModule({ item }: { item: (typeof groups)[number]['items'][number] }) {
  return (
    <Link
      href={`/hizmetler/${item.slug}`}
      className="rd-exp-module group relative block overflow-hidden rounded-2xl border border-[#E5E5EC] bg-white p-8"
    >
      <span aria-hidden="true" className="rd-exp-module-accent" />
      <span aria-hidden="true" className="rd-exp-module-grid" />
      <div className="relative flex items-start justify-between gap-8">
        <div className="max-w-[600px]">
          <h4 className="rd-exp-module-title text-[20px] font-bold text-[#14213F]">{item.title}</h4>
          <p className="mt-2.5 text-[14.5px] leading-relaxed text-[#6A6A7A]">{item.desc}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {item.labels.map((label) => (
              <span
                key={label}
                className="rounded-full border border-[#E0E0E8] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.03em] text-[#6F6F79]"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
        <span className="mt-1 flex shrink-0 items-center gap-1 text-[13.5px] font-semibold text-[#1B5CD6]">
          Detayları İncele <span aria-hidden="true" className="rd-exp-arrow">→</span>
        </span>
      </div>
    </Link>
  );
}

function ServiceRow({ item }: { item: (typeof groups)[number]['items'][number] }) {
  return (
    <Link
      href={`/hizmetler/${item.slug}`}
      className="rd-exp-row group relative flex flex-col gap-3 py-7 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
    >
      <span aria-hidden="true" className="rd-exp-accent" />
      <div className="max-w-[640px]">
        <h4 className="rd-exp-title text-[18px] font-bold text-[#14213F]">{item.title}</h4>
        <p className="mt-1.5 text-[14px] leading-relaxed text-[#6A6A7A]">{item.desc}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.labels.map((label) => (
            <span
              key={label}
              className="rounded-full border border-[#E0E0E8] px-2.5 py-1 text-[10.5px] font-medium uppercase tracking-[0.03em] text-[#6F6F79]"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
      <span className="shrink-0 text-[13.5px] font-semibold text-[#1B5CD6]">
        Detayları İncele <span aria-hidden="true" className="rd-exp-arrow">→</span>
      </span>
    </Link>
  );
}

export default function RDServicesDirectory() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const [active, setActive] = useState(0);

  return (
    <section id="hizmetler" className="scroll-mt-20 bg-white py-16 sm:py-20">
      <style>{`
        .rd-exp-row { position: relative; transition: background-color .25s ease; }
        .rd-exp-accent {
          position: absolute; left: -1px; top: 0; bottom: 0; width: 2px;
          background: linear-gradient(to bottom, #1B5CD6, #C9A876);
          transform: scaleY(0); transform-origin: top; transition: transform .3s ease;
        }
        .rd-exp-title { transition: color .25s ease, transform .25s ease; display: inline-block; }
        .rd-exp-arrow { display: inline-block; transition: transform .25s ease; }
        @media (hover: hover) and (pointer: fine) {
          .rd-exp-row:hover { background-color: rgba(27,92,214,0.035); }
          .rd-exp-row:hover .rd-exp-accent { transform: scaleY(1); }
          .rd-exp-row:hover .rd-exp-title { color: #1B5CD6; transform: translateX(3px); }
          .rd-exp-row:hover .rd-exp-arrow { transform: translateX(3px); }
        }
        .rd-exp-nav-btn {
          position: relative; display: flex; width: 100%; align-items: center; justify-content: space-between;
          gap: 12px; border-radius: 12px; padding: 14px 16px; text-align: left;
          transition: background-color .25s ease, color .25s ease;
        }
        .rd-exp-nav-btn[aria-current="true"] { background-color: rgba(27,92,214,0.06); }
        .rd-exp-nav-btn:not([aria-current="true"]):hover { background-color: rgba(20,33,63,0.03); }
        .rd-exp-panel {
          opacity: 0; transform: translateY(8px);
          animation: rd-exp-fade .4s ease forwards;
        }
        @keyframes rd-exp-fade { to { opacity: 1; transform: translateY(0); } }
        .rd-exp-module { transition: border-color .3s ease, box-shadow .3s ease, background-color .3s ease; }
        .rd-exp-module-accent {
          position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
          background: linear-gradient(to bottom, #1B5CD6, #C9A876);
          opacity: .35; transition: opacity .3s ease;
        }
        .rd-exp-module-grid {
          position: absolute; inset: 0; opacity: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(27,92,214,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(27,92,214,0.05) 1px, transparent 1px);
          background-size: 22px 22px;
          transition: opacity .3s ease;
        }
        .rd-exp-module-title { transition: color .25s ease, transform .25s ease; display: inline-block; }
        @media (hover: hover) and (pointer: fine) {
          .rd-exp-module:hover {
            border-color: rgba(27,92,214,0.3); background-color: rgba(27,92,214,0.015);
            box-shadow: 0 16px 36px -28px rgba(20,33,63,0.35);
          }
          .rd-exp-module:hover .rd-exp-module-accent { opacity: 1; }
          .rd-exp-module:hover .rd-exp-module-grid { opacity: 1; }
          .rd-exp-module:hover .rd-exp-module-title { color: #1B5CD6; transform: translateX(3px); }
        }
        .rd-exp-group {
          opacity: 0; transform: translateY(10px);
          transition: opacity .55s ease, transform .55s ease;
        }
        .rd-exp-group.rd-in { opacity: 1; transform: translateY(0); }
        @media (prefers-reduced-motion: reduce) {
          .rd-exp-group, .rd-exp-group.rd-in { opacity: 1 !important; transform: none !important; transition: none !important; }
          .rd-exp-panel { animation: none !important; opacity: 1 !important; transform: none !important; }
          .rd-exp-title, .rd-exp-arrow, .rd-exp-module-title { transition: none !important; }
          .rd-exp-row:hover .rd-exp-title, .rd-exp-row:hover .rd-exp-arrow { transform: none !important; }
          .rd-exp-module:hover .rd-exp-module-title { transform: none !important; }
        }
      `}</style>

      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="max-w-[52ch]">
          <p className="text-[11.5px] font-bold tracking-[0.26em] text-[#1B5CD6] uppercase">Çözümler</p>
          <h2 className="mt-3 text-[2.4rem] font-extrabold leading-tight tracking-tight text-[#14213F] sm:text-[3rem]">
            İhtiyacınıza Göre Kurduğumuz Sistemler.
          </h2>
        </div>

        {/* Desktop — sticky category nav + active category panel */}
        <div className="mt-14 hidden lg:grid lg:grid-cols-[240px_1fr] lg:gap-14">
          <nav aria-label="Hizmet kategorileri" className="sticky top-24 flex h-fit flex-col gap-1.5">
            {groups.map((g, i) => (
              <button
                key={g.category}
                type="button"
                aria-current={active === i}
                onClick={() => setActive(i)}
                className="rd-exp-nav-btn"
              >
                <span className="flex items-center gap-3">
                  <span className="text-[12px] font-bold text-[#C4C4CE]">{String(i + 1).padStart(2, '0')}</span>
                  <span
                    className={`text-[15px] font-bold ${active === i ? 'text-[#1B5CD6]' : 'text-[#14213F]'}`}
                  >
                    {g.category}
                  </span>
                </span>
                <span className="text-[11px] font-medium text-[#B8B8C2]">{g.items.length}</span>
              </button>
            ))}
          </nav>

          <div key={active} className="rd-exp-panel flex flex-col gap-5 lg:min-h-[480px]">
            {groups[active].items.map((item) => (
              <ServiceModule key={item.slug} item={item} />
            ))}
          </div>
        </div>

        {/* Mobile / tablet — all categories stacked, normal scroll, no hover dependency */}
        <div ref={ref} className="mt-12 flex flex-col gap-12 lg:hidden">
          {groups.map((group, gi) => (
            <div
              key={group.category}
              style={{ transitionDelay: inView ? `${gi * 90}ms` : '0ms' }}
              className={`rd-exp-group ${inView ? 'rd-in' : ''}`}
            >
              <div className="flex items-center gap-4">
                <span className="text-[13px] font-bold text-[#C4C4CE]">{String(gi + 1).padStart(2, '0')}</span>
                <h3 className="text-[13px] font-bold uppercase tracking-[0.24em] text-[#8A6E43]">
                  {group.category}
                </h3>
                <span aria-hidden="true" className="h-px flex-1 bg-[#E5E5EC]" />
              </div>
              <div className="mt-5 divide-y divide-[#E5E5EC] border-y border-[#E5E5EC]">
                {group.items.map((item) => (
                  <ServiceRow key={item.slug} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
