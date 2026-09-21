const channels = ['Amazon', 'Etsy', 'eBay', 'Shopify', 'Walmart', 'TikTok Shop'];

export default function RDChannels() {
  return (
    <section className="border-y border-[#E8E8EC] bg-white py-9">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <p className="text-center text-[10px] font-bold tracking-[0.3em] text-[#9A9AA8] uppercase">Global Commerce Ecosystem</p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 divide-x divide-[#E5E5EA] sm:gap-x-10">
          {channels.map(ch => (
            <span key={ch} className="pl-8 text-[14.5px] font-bold tracking-tight text-[#4A4A5A] first:pl-0 sm:pl-10">{ch}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
