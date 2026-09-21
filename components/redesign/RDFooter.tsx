import Link from 'next/link';
const NAV = ['Hizmetler','Kaynaklar','İletişim'];
export default function RDFooter() {
  return (
    <footer className="border-t border-[#E5E5EC] bg-[#FAFAF8] py-10">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6 sm:px-10">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#1B5CD6] text-[13px] font-black text-[#1B2E5E]">G</div>
          <span className="text-[14px] font-bold text-[#1B2E5E]">GloventGlobal</span>
        </div>
        {/* Nav */}
        <ul className="flex flex-wrap gap-6">
          {NAV.map(l => <li key={l}><Link href="#" className="text-[13px] text-[#6A6A7A] hover:text-[#1B5CD6]">{l}</Link></li>)}
        </ul>
        {/* Social */}
        <div className="flex items-center gap-4">
          {['in','ig','yt'].map(s => (
            <a key={s} href="#" className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E0E0E8] text-[11px] font-bold text-[#3A3A52] transition hover:border-[#1B5CD6] hover:text-[#1B5CD6]">{s}</a>
          ))}
          <span className="ml-4 text-[13px] text-[#6A6A7A]">Daha Büyük Yarınlar İçin.</span>
        </div>
      </div>
    </footer>
  );
}