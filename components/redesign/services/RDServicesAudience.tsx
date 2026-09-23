// Kaynak: components/services/ServicesContent.tsx (audienceSegments) — production /hizmetler'in
// "Kimler İçin?" bölümündeki 5 gerçek segment birebir aynı, homepage'in RDAudiences'ı (farklı bir
// segmentasyon/interaksiyon) tekrar edilmiyor. Kompakt bir "bridge" — tam bölüm değil.
const segments = [
  { title: 'Üreticiler', desc: 'Ürününü ilk kez global pazarlara taşımak isteyen üreticiler.' },
  { title: 'Toptan Satış Yapan Markalar', desc: 'Dijital katalog, B2B showroom ve teklif listesi ihtiyacı olanlar.' },
  { title: 'Pazaryerlerine Girmek İsteyenler', desc: 'Mağaza kurulumu, listeleme ve reklam altyapısına ihtiyaç duyanlar.' },
  { title: 'Shopify ile Kendi Sistemini Kurmak İsteyenler', desc: 'Kendi markasına ait satış kanalı kurmak isteyenler.' },
  { title: 'Marka Algısını Güçlendirmek İsteyenler', desc: 'Görsel bütünlük ve içerik diliyle global pazarda öne çıkmak isteyenler.' },
];

export default function RDServicesAudience() {
  return (
    <section className="border-t border-[#E5E5EC] bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold tracking-[0.28em] text-[#1B5CD6] uppercase">Kimler İçin</p>
            <h2 className="mt-3 text-[1.7rem] font-extrabold leading-tight tracking-tight text-[#14213F] sm:text-[2rem]">
              Hangi Hizmet Sizin İçin Doğru?
            </h2>
          </div>
          <p className="max-w-[42ch] text-[14.5px] leading-relaxed text-[#6A6A7A]">
            Her markanın ihtiyacı aynı değildir — GloventGlobal doğru sistemi ürün yapınıza ve büyüme aşamanıza göre
            belirler.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {segments.map((s) => (
            <div key={s.title} className="rounded-xl border border-[#E5E5EC] p-5">
              <h3 className="text-[14.5px] font-bold leading-snug text-[#14213F]">{s.title}</h3>
              <p className="mt-2 text-[12.5px] leading-relaxed text-[#6A6A7A]">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
