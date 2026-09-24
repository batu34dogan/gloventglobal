import { Fragment } from 'react';
import Link from 'next/link';

// Kaynak: components/services/ServicesContent.tsx (deliveryModels) — eski /hizmetler'deki "Hizmeti
// Nasıl Alabilirsiniz?" bölümünün aynı üç gerçek modeli, kompakt bir "system flow" bridge olarak.
// Homepage'in Growth Engine'i (RDSystem.tsx) birebir kopyalanmadı — burada sadece 3 adım arasında
// ince bir bağlantı çizgisi var, ayrı bir büyük süreç diyagramı değil.
const models = [
  {
    n: '01',
    title: 'Sistem Kurulumu',
    desc: 'Markanız için gerekli dijital altyapıyı, pazaryeri yapısını, Shopify / B2B sistemini veya otomasyonları kurar ve uygulanabilir şekilde teslim ederiz.',
  },
  {
    n: '02',
    title: 'Yönetim ve Operasyon',
    desc: 'Kurulan sistemin ürün, içerik, reklam, kampanya ve günlük dijital operasyon süreçlerini birlikte yönetiriz.',
  },
  {
    n: '03',
    title: 'Büyüme Partnerliği',
    desc: 'Markanızın uzun vadeli büyüme hedefleri için strateji, teknoloji, performans ve operasyon süreçlerini düzenli olarak geliştiririz.',
  },
];

export default function RDServicesWorkModel() {
  return (
    <section className="border-t border-[#E5E5EC] bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-[48ch]">
            <p className="text-[11px] font-bold tracking-[0.28em] text-[#1B5CD6] uppercase">Çalışma Modeli</p>
            <h2 className="mt-3 text-[1.9rem] font-extrabold leading-tight tracking-tight text-[#14213F] sm:text-[2.2rem]">
              İhtiyaca Göre Kuruyor, Yönetiyor ve Geliştiriyoruz.
            </h2>
          </div>
          <Link
            href="/nasil-calisiyoruz"
            className="inline-flex w-fit shrink-0 items-center gap-2 text-[14.5px] font-semibold text-[#1B5CD6] transition-colors hover:text-[#14213F]"
          >
            Nasıl Çalışıyoruz →
          </Link>
        </div>

        {/* 640px+ (sm) — mevcut yatay flow birebir korunuyor */}
        <div className="mt-10 hidden sm:grid sm:grid-cols-[1fr_32px_1fr_32px_1fr] sm:items-start sm:gap-x-3 sm:gap-y-8">
          {models.map((m, i) => (
            <Fragment key={m.n}>
              <div>
                <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#1B5CD6]/50 text-[14px] font-bold text-[#1B5CD6]">
                  {m.n}
                </span>
                <h3 className="mt-4 text-[17.5px] font-extrabold text-[#14213F]">{m.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-[#6A6A7A]">{m.desc}</p>
              </div>
              {i < models.length - 1 && (
                <div aria-hidden="true" className="relative flex h-11 items-center justify-center">
                  <span className="h-[1.5px] w-full bg-gradient-to-r from-[#1B5CD6]/55 to-[#C9A876]/55" />
                  <span className="absolute text-[15px] font-semibold text-[#C9A876]">→</span>
                </div>
              )}
            </Fragment>
          ))}
        </div>

        {/* 0-639px — yatay flow'un stack yerine, ince vertical path + node circle ile premium
            dikey akış. Büyük card stack değil, homepage RDSystem'daki teknikle aynı dil. */}
        <div className="mt-10 flex flex-col sm:hidden">
          {models.map((m, i) => (
            <div key={m.n} className="flex gap-5">
              <div className="flex shrink-0 flex-col items-center">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#1B5CD6]/50 text-[14px] font-bold text-[#1B5CD6]">
                  {m.n}
                </span>
                {i < models.length - 1 && (
                  <span aria-hidden="true" className="mt-1 w-[1.5px] flex-1 bg-gradient-to-b from-[#1B5CD6]/55 to-[#C9A876]/55" />
                )}
              </div>
              <div className={i < models.length - 1 ? 'pb-8' : ''}>
                <h3 className="pt-2 text-[17.5px] font-extrabold text-[#14213F]">{m.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-[#6A6A7A]">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
