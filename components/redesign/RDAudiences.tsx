// Production ana sayfada (components/home/HomeContent.tsx) "Kimlerle Çalışıyoruz?" bölümünde
// doğrulanmış 5 segment — aynı başlık ve anlam korunarak taşındı, yeni segment/vaat/metrik
// eklenmedi.
const audiences = [
  {
    number: '01',
    title: 'Üreticiler',
    description:
      'Ürünlerini dijital kanallara taşımak, marka görünürlüğünü artırmak ve yeni satış kanalları oluşturmak isteyen üretici işletmeler.',
  },
  {
    number: '02',
    title: 'Toptancılar',
    description:
      'B2B satış süreçlerini dijitalleştirmek, ürün sunumunu güçlendirmek ve bayi / müşteri erişimini kolaylaştırmak isteyen toptan firmalar.',
  },
  {
    number: '03',
    title: 'E-Ticaret Markaları',
    description:
      'Web sitesi, pazaryeri, reklam, içerik, veri ve operasyon süreçlerini daha yönetilebilir bir büyüme sistemine dönüştürmek isteyen markalar.',
  },
  {
    number: '04',
    title: 'B2B Firmalar',
    description:
      'Teklif, katalog, ürün gösterimi, müşteri akışı ve dijital showroom ihtiyaçlarını profesyonel bir altyapıya taşımak isteyen işletmeler.',
  },
  {
    number: '05',
    title: 'Global Pazara Açılmak İsteyen İşletmeler',
    description:
      'Amazon, Etsy, eBay, Shopify veya farklı dijital kanallar üzerinden yeni pazarlara kontrollü şekilde açılmak isteyen markalar.',
  },
];

export default function RDAudiences() {
  return (
    <section className="border-t border-[#E8E8EC] bg-white py-16 sm:py-20">
      <style>{`
        .rd-aud-field {
          position: relative;
        }
        .rd-aud-bgpattern {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.04;
          background-image:
            linear-gradient(#14213F 1px, transparent 1px),
            linear-gradient(90deg, #14213F 1px, transparent 1px);
          background-size: 32px 32px;
          transition: opacity .4s ease;
        }
        .rd-aud-row {
          position: relative;
          z-index: 1;
          outline: none;
          transition: background-color .3s ease;
        }
        .rd-aud-accent {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, #1B5CD6, #C9A876);
          opacity: 0;
          transform: scaleY(0);
          transform-origin: top;
          transition: opacity .3s ease, transform .3s ease;
        }
        .rd-aud-number {
          transition: color .3s ease;
        }
        .rd-aud-title {
          transition: color .3s ease, transform .3s ease;
        }
        .rd-aud-desc {
          opacity: .93;
          transition: opacity .3s ease, color .3s ease;
        }
        .rd-aud-row:focus-visible {
          outline: 2px solid rgba(27,92,214,0.5);
          outline-offset: 6px;
          border-radius: 4px;
        }
        @media (hover: hover) and (pointer: fine) {
          .rd-aud-field:hover .rd-aud-bgpattern { opacity: .07; }
          .rd-aud-field:has(.rd-aud-row:hover, .rd-aud-row:focus-visible)
            .rd-aud-row:not(:hover):not(:focus-visible) {
            opacity: .55;
          }
          .rd-aud-row:hover, .rd-aud-row:focus-visible {
            background-color: rgba(27,92,214,0.035);
          }
          .rd-aud-row:hover .rd-aud-accent, .rd-aud-row:focus-visible .rd-aud-accent {
            opacity: 1;
            transform: scaleY(1);
          }
          .rd-aud-row:hover .rd-aud-number, .rd-aud-row:focus-visible .rd-aud-number {
            color: #8A6E43;
          }
          .rd-aud-row:hover .rd-aud-title, .rd-aud-row:focus-visible .rd-aud-title {
            color: #1B5CD6;
            transform: translateX(6px);
          }
          .rd-aud-row:hover .rd-aud-desc, .rd-aud-row:focus-visible .rd-aud-desc {
            opacity: 1;
            color: #3A3A4A;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .rd-aud-row, .rd-aud-accent, .rd-aud-title, .rd-aud-desc, .rd-aud-bgpattern {
            transition: none !important;
          }
          .rd-aud-row:not(:hover):not(:focus-visible) { opacity: 1 !important; }
        }
      `}</style>

      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-bold tracking-[0.28em] text-[#1B5CD6] uppercase">Kimlerle Çalışıyoruz?</p>
          <h2 className="mt-5 text-[2rem] font-extrabold leading-[1.15] tracking-tight text-[#14213F] sm:text-[2.4rem]">
            Büyümeye Hazır İşletmelerle.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#6A6A7A]">
            İş modeliniz farklı olabilir. İhtiyacınıza göre strateji, satış, teknoloji ve operasyon sistemini
            birlikte kuruyoruz.
          </p>
        </div>

        <div className="rd-aud-field mt-14">
          <span aria-hidden="true" className="rd-aud-bgpattern" />
          {audiences.map((a) => (
            <div key={a.number} tabIndex={0} className="rd-aud-row border-b border-[#E5E5EC] last:border-0">
              <span aria-hidden="true" className="rd-aud-accent" />
              <div className="grid grid-cols-1 gap-3 py-[25px] pl-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] sm:items-baseline sm:gap-10 sm:py-[29px]">
                <div className="flex items-baseline gap-4">
                  <span className="rd-aud-number shrink-0 text-[13px] font-bold text-[#757580]">{a.number}</span>
                  <h3 className="rd-aud-title text-[1.4rem] font-bold leading-snug text-[#14213F] sm:text-[1.7rem]">
                    {a.title}
                  </h3>
                </div>
                <p className="rd-aud-desc max-w-[600px] text-[14.5px] leading-relaxed text-[#6A6A7A]">
                  {a.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
