'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

// Kaynak: components/services/serviceDetailsData.ts + components/services/ServicesContent.tsx
// (serviceCards). Başlıklar kullanıcının brief'inde verdiği 12 gerçek hizmet adıyla birebir aynı;
// açıklamalar mevcut serviceCards.description metinlerinden alındı — yeni hizmet/metin uydurulmadı.
// Kategori grupları, kullanıcının audit sonrası verdiği pillar eşleştirmesiyle aynı (Strateji /
// Ticaret / Teknoloji / Operasyon); her hizmet, dizin içinde tekrar etmemesi için TEK birincil
// kategoriye yerleştirildi (Shopify ve B2B ana yetkinlik bölümünde hem Ticaret hem Teknoloji'ye
// değiniyor, ama burada — tekrarlı satır oluşmasın diye — asıl ticari nitelikleri gereği Ticaret
// altında listeleniyor).
const groups: { category: string; items: { title: string; desc: string; slug: string }[] }[] = [
  {
    category: 'Strateji',
    items: [
      {
        title: 'Marka Konumlandırma',
        desc: 'Ürününüzü yalnızca satılacak bir ürün olarak değil, pazarda algısı olan bir marka yapısı içinde konumlandırırız.',
        slug: 'marka-konumlandirma',
      },
      {
        title: 'Global Pazara Giriş Stratejisi',
        desc: 'Ürününüz için doğru ülke, kanal, fiyat, rekabet ve büyüme yol haritasını belirleriz.',
        slug: 'global-pazara-giris-stratejisi',
      },
    ],
  },
  {
    category: 'Ticaret',
    items: [
      {
        title: 'Amazon Global Satış Sistemi',
        desc: 'Amazon’u yalnızca ürün listeleme alanı olarak değil; kategori, içerik, reklam ve operasyon süreçleriyle birlikte çalışan global satış sistemi olarak kurgularız.',
        slug: 'amazon',
      },
      {
        title: 'Etsy Marka Sistemi',
        desc: 'El yapımı, butik, tasarım ve niş ürünler için Etsy mağaza yapısı, görsel dili ve listeleme stratejisi oluştururuz.',
        slug: 'etsy',
      },
      {
        title: 'eBay Global Satış Sistemi',
        desc: 'Farklı pazarlara açılmak isteyen markalar için eBay listeleme, kategori ve satış altyapısını hazırlarız.',
        slug: 'ebay',
      },
      {
        title: 'Shopify Commerce Sistemi',
        desc: 'Markanıza özel vitrin, ürün yönetimi, koleksiyon yapısı, ödeme ve satış deneyimi için Shopify altyapısı kurarız.',
        slug: 'shopify',
      },
      {
        title: 'B2B Dijital Showroom',
        desc: 'Toptan satış yapan markalar için dijital katalog, teklif listesi, müşteri odaklı ürün sunumu ve showroom sistemi oluştururuz.',
        slug: 'b2b-dijital-showroom',
      },
    ],
  },
  {
    category: 'Teknoloji',
    items: [
      {
        title: 'Otomasyon & n8n Sistemleri',
        desc: 'Form, teklif, müşteri, ürün, sipariş ve raporlama süreçlerini n8n, API ve entegrasyon yapılarıyla birbirine bağlayan otomasyon sistemleri kurarız.',
        slug: 'otomasyon-n8n',
      },
      {
        title: 'Yapay Zeka Entegrasyonu',
        desc: 'Ürün, içerik, görsel konsept, raporlama, operasyon ve karar süreçlerine yapay zeka destekli sistemler entegre ederiz.',
        slug: 'yapay-zeka-entegrasyonu',
      },
    ],
  },
  {
    category: 'Operasyon',
    items: [
      {
        title: 'Reklam & Optimizasyon',
        desc: 'Amazon, Etsy, Google ve Meta reklamlarını veri, dönüşüm ve kârlılık odağında optimize ederiz.',
        slug: 'reklam-optimizasyon',
      },
      {
        title: 'Görsel & İçerik Sistemi',
        desc: 'Ürün fotoğrafı, yapay zeka destekli görsel konsept, açıklama, başlık ve marka dili bütünlüğünü kurarız.',
        slug: 'gorsel-icerik-sistemi',
      },
      {
        title: 'Sosyal Medya Yönetimi',
        desc: 'Markanızın Instagram, TikTok ve diğer sosyal kanallarda tutarlı görünmesi için içerik planı, görsel dil ve paylaşım stratejisi oluştururuz.',
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
        .rd-dir-row { transition: background-color .25s ease; }
        .rd-dir-arrow { display: inline-block; transition: transform .25s ease; }
        @media (hover: hover) and (pointer: fine) {
          .rd-dir-row:hover { background-color: rgba(27,92,214,0.03); }
          .rd-dir-row:hover .rd-dir-title { color: #1B5CD6; }
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
          .rd-dir-arrow { transition: none !important; }
        }
      `}</style>

      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="max-w-[52ch]">
          <p className="text-[11.5px] font-bold tracking-[0.26em] text-[#1B5CD6] uppercase">Çözümler</p>
          <h2 className="mt-3 text-[2.2rem] font-extrabold leading-tight tracking-tight text-[#14213F] sm:text-[2.7rem]">
            İhtiyacınıza Göre Kurduğumuz Sistemler.
          </h2>
        </div>

        <div ref={ref} className="mt-12 flex flex-col gap-12">
          {groups.map((group, gi) => (
            <div
              key={group.category}
              style={{ transitionDelay: inView ? `${gi * 90}ms` : '0ms' }}
              className={`rd-dir-group ${inView ? 'rd-in' : ''}`}
            >
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A6E43]">{group.category}</h3>
              <div className="mt-4 divide-y divide-[#E5E5EC] border-y border-[#E5E5EC]">
                {group.items.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/hizmetler/${item.slug}`}
                    className="rd-dir-row group flex items-center justify-between gap-6 py-6"
                  >
                    <div>
                      <h4 className="rd-dir-title text-[17.5px] font-bold text-[#14213F] transition-colors duration-300">
                        {item.title}
                      </h4>
                      <p className="mt-1.5 max-w-[62ch] text-[14px] leading-relaxed text-[#6A6A7A]">{item.desc}</p>
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
