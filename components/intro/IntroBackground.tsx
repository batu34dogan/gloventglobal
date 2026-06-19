'use client';

import Image from 'next/image';

export default function IntroBackground() {
  return (
    // Dark navy fallback zemin: mobilde object-contain devreye girince görselin
    // sağında/altında kalan boşlukta bu renk görünür (beyaz flaş / boşluk olmasın diye).
    // GloventIntro.tsx'e dokunmadan, bu kapsayıcı sadece bu dosyanın içinde.
    <div className="absolute inset-0 bg-[#050b14]">
      <Image
        src="/glovent-platform-hero.png"
        alt=""
        fill
        priority
        quality={100}
        sizes="100vw"
        // Mobilde (md altı): object-contain -> görsel hiç kırpılmadan küçülür, dünya/kartlar tam görünür.
        // md ve üstü (desktop): mevcut object-cover davranışı birebir korunuyor.
        className="object-contain object-center md:object-cover"
      />
    </div>
  );
}