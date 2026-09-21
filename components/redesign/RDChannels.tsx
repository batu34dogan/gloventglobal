const channels = ['Amazon', 'Etsy', 'eBay', 'Shopify', 'Walmart', 'TikTok Shop'];

export default function RDChannels() {
  return (
    <section className="border-y border-[#E8E8EC] bg-white py-10">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="flex items-center justify-center gap-3">
          <span aria-hidden className="h-px w-8 bg-[#C9A876]" />
          <p className="text-[11px] font-bold tracking-[0.32em] text-[#9A9AA8] uppercase">Global Commerce Ecosystem</p>
          <span aria-hidden className="h-px w-8 bg-[#C9A876]" />
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 divide-x divide-[#E5E5EA] sm:gap-x-10">
          {channels.map(ch => (
            <span
              key={ch}
              className="pl-8 text-[14px] font-semibold uppercase tracking-[0.08em] text-[#5A5A6A] transition-colors first:pl-0 hover:text-[#14213F] sm:pl-10"
            >
              {ch}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
