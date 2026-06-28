import type { ReactNode } from 'react';

// 4 legal sayfanın (KVKK, Gizlilik, Çerez, Kullanım Şartları) paylaştığı sade shell — mevcut
// dark premium tasarım diliyle uyumlu, ama bilerek ağır glow/animasyon kullanmıyor (metin
// odaklı sayfalarda dikkat dağıtmasın diye).
export default function LegalPageLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="relative min-h-screen bg-[#070d18] px-6 pb-20 pt-28 text-white sm:px-10 md:pt-32">
      <div className="relative mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        <div className="mt-8 space-y-5 text-sm leading-relaxed text-blue-100/75 sm:text-base">{children}</div>
      </div>
    </main>
  );
}