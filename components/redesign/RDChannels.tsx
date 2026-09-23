import Image from 'next/image';

export default function RDChannels() {
  return (
    <section className="border-y border-[#E8E8EC] bg-white py-10">
      <style>{`
        .rd-eco-scroll{scrollbar-width:none;-ms-overflow-style:none;}
        .rd-eco-scroll::-webkit-scrollbar{display:none;}
      `}</style>
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="flex items-center justify-center gap-3">
          <span aria-hidden className="h-px w-8 bg-[#C9A876]" />
          <p className="text-[12px] font-bold tracking-[0.28em] text-[#1B5CD6] uppercase">Global Commerce Ecosystem</p>
          <span aria-hidden className="h-px w-8 bg-[#C9A876]" />
        </div>
        <div className="relative mt-6">
          {/* Mobil/tablet'te içerik gerçekten taşıp kaydırılabilir olduğunda, kullanıcının bunu fark
              etmesi için sağ kenarda hafif bir "devamı var" ipucu — masaüstünde (lg+) görsel zaten
              container'a sığdığı için hiçbir görsel etkisi yok. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-white to-transparent lg:hidden" />
          <div className="rd-eco-scroll flex justify-start overflow-x-auto overscroll-x-contain sm:justify-center">
            <Image
              src="/redesign/channels/commerce-ecosystem.png"
              alt="Amazon, Alibaba, Etsy, eBay, Shopify, Walmart, TikTok Shop, Trendyol"
              width={2163}
              height={171}
              sizes="(min-width: 1024px) 1100px, (min-width: 768px) 860px, 1050px"
              className="h-auto w-[1050px] shrink-0 md:w-[860px] lg:w-[1100px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
