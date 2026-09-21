export default function RDChannels() {
  const channels = ['amazon','Etsy','ebay','shopify','Walmart','TikTok Shop'];
  const colors: Record<string,string> = {
    amazon:'#FF9900', Etsy:'#F1641E', ebay:'#E53238', shopify:'#96BF48', Walmart:'#0071CE', 'TikTok Shop':'#000000',
  };
  return (
    <section className="border-y border-[#E8E8EC] bg-white py-6">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          {channels.map(ch => (
            <span key={ch} className="text-[15px] font-bold" style={{color:colors[ch]??'#333'}}>{ch}</span>
          ))}
          <a href="#" className="ml-auto text-[13px] font-semibold text-[#1B5CD6] hover:underline whitespace-nowrap">Daha Fazlası →</a>
        </div>
      </div>
    </section>
  );
}