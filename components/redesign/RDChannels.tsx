const channels = ['Amazon', 'Etsy', 'eBay', 'Shopify', 'Walmart', 'TikTok Shop'];

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
        <div className="rd-eco-scroll mt-6 flex flex-nowrap items-center justify-start gap-x-8 overflow-x-auto overscroll-x-contain sm:justify-center sm:gap-x-6 lg:gap-x-10">
          {channels.map(ch => (
            <span
              key={ch}
              className="shrink-0 text-[16px] font-semibold uppercase tracking-[0.06em] text-[#5A5A6A] transition-colors hover:text-[#14213F]"
            >
              {ch}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
