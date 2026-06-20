'use client';

import Image from 'next/image';

// Bu component SADECE desktop (md ve üstü) için kullanılıyor.
// Mobil görsel artık GloventIntro.tsx içinde kendi akış (flow) bölgesinde, ayrı render ediliyor.
export default function IntroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050b14]">
      <Image
        src="/glovent-platform-hero.png"
        alt=""
        fill
        priority
        quality={100}
        sizes="100vw"
        className="object-cover object-center"
      />
    </div>
  );
}