'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

// Kaynak: components/services/serviceDetailsData.ts (audience/approach/problem/deliverables
// alanları) + components/services/ServicesContent.tsx (serviceCards). Başlıklar kullanıcının
// brief'inde verdiği 12 gerçek hizmet adıyla birebir aynı; açıklamalar ve capability label'lar her
// hizmetin kendi serviceDetailsData içeriğinden (ilgili gerçek kavramlar: listeleme, SEO, reklam,
// n8n, ROAS, hedef müşteri, vb.) derlendi — yeni hizmet, vaat ya da platform uydurulmadı. Kategori
// grupları, kullanıcının verdiği pillar eşleştirmesiyle aynı; her hizmet tek birincil kategoriye
// yerleştirildi (Shopify/B2B pillar bölümünde Teknoloji'ye de değiniyor ama burada tekrar satır
// oluşturmamak için Ticaret altında listeleniyor).
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
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView] as const;
}

export default function RDServicesDirectory() {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <section id="hizmetler" className="scroll-mt-20 bg-[#FAF9F6] py-16 sm:py-20">
      <style>{`
        .rd-dir-row { position: relative; transition: background-color .25s ease; }
        .rd-dir-accent {
          position: absolute; left: -1px; top: 0; bottom: 0; width: 2px;
          background: linear-gradient(to bottom, #1B5CD6, #C9A876);
          transform: scaleY(0);
          transform-origin: top;
          transition: transform .3s ease;
        }
        .rd-dir-title { transition: color .25s ease, transform .25s ease; display: inline-block; }
        .rd-dir-arrow { display: inline-block; transition: transform .25s ease; }
        @media (hover: hover) and (pointer: fine) {
          .rd-dir-row:hover { background-color: rgba(27,92,214,0.035); }
          .rd-dir-row:hover .rd-dir-accent { transform: scaleY(1); }
          .rd-dir-row:hover .rd-dir-title { color: #1B5CD6; transform: translateX(3px); }
          .rd-dir-row:hover .rd-dir-arrow { transform: translateX(3px); }
        }
        .rd-dir-group {
          opacity: 0;
          transform: translateY(10px);
          transition: opacity .55s ease, transform .55s ease;
        }
        .rd-dir-group.rd-in { opacity: 1; transform: translateY(0); }
        @media (prefers-reduced-motion: reduce) {
          .rd-dir-group, .rd-dir-group.rd-in { opacity: 1 !important; transform: none !important; transition: none !important; }
          .rd-dir-arrow, .rd-dir-title { transition: none !important; }
          .rd-dir-row:hover .rd-dir-title { transform: none !important; }
          .rd-dir-row:hover .rd-dir-arrow { transform: none !important; }
        }
      `}</style>

      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="max-w-[52ch]">
          <p className="text-[11.5px] font-bold tracking-[0.26em] text-[#1B5CD6] uppercase">Çözümler</p>
          <h2 className="mt-3 text-[2.2rem] font-extrabold leading-tight tracking-tight text-[#14213F] sm:text-[2.7rem]">
            İhtiyacınıza Göre Kurduğumuz Sistemler.
          </h2>
        </div>

        <div ref={ref} className="mt-12 flex flex-col gap-14">
          {groups.map((group, gi) => (
            <div
              key={group.category}
              style={{ transitionDelay: inView ? `${gi * 90}ms` : '0ms' }}
              className={`rd-dir-group ${inView ? 'rd-in' : ''}`}
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
                  <Link
                    key={item.slug}
                    href={`/hizmetler/${item.slug}`}
                    className="rd-dir-row group flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                  >
                    <span aria-hidden="true" className="rd-dir-accent" />
                    <div className="max-w-[640px]">
                      <h4 className="rd-dir-title text-[17.5px] font-bold text-[#14213F]">{item.title}</h4>
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
                      Detayları İncele <span aria-hidden="true" className="rd-dir-arrow">→</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
