import Link from 'next/link';

// Kaynak: components/services/ServicesContent.tsx (deliveryModels) — eski /hizmetler'deki "Hizmeti
// Nasıl Alabilirsiniz?" bölümünün aynı üç gerçek modeli, kompakt bridge formatında.
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
            <h2 className="mt-3 text-[1.7rem] font-extrabold leading-tight tracking-tight text-[#14213F] sm:text-[2rem]">
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

        <div className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {models.map((m) => (
            <div key={m.n}>
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1B5CD6]/40 text-[13px] font-bold text-[#1B5CD6]">
                {m.n}
              </span>
              <h3 className="mt-4 text-[16px] font-bold text-[#14213F]">{m.title}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[#6A6A7A]">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
