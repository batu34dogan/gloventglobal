'use client';

import Image from 'next/image';

export default function IntroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050b14]">
      {/* Mobil (md altı): özel dikey görsel — sade object-cover, hack yok */}
      <Image
        src="/glovent-platform-hero-mobile.png"
        alt=""
        fill
        priority
        quality={100}
        sizes="100vw"
        className="block object-cover object-center md:hidden"
      />

      {/* Desktop (md ve üstü): mevcut yatay görsel — DOKUNULMADI */}
      <Image
        src="/glovent-platform-hero.png"
        alt=""
        fill
        priority
        quality={100}
        sizes="100vw"
        className="hidden object-cover object-center md:block"
      />
    </div>
  );
}