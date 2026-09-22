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
        <div className="rd-eco-scroll mt-6 flex justify-start overflow-x-auto overscroll-x-contain sm:justify-center">
          <Image
            src="/redesign/channels/commerce-ecosystem.png"
            alt="Amazon, Etsy, eBay, Shopify, Walmart, TikTok Shop"
            width={2042}
            height={179}
            className="h-5 w-auto shrink-0 sm:h-6"
          />
        </div>
      </div>
    </section>
  );
}
