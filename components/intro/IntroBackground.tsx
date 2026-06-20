'use client';

import Image from 'next/image';

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
        // Mobilde (md altı): "contain" ile görsel önce hiç kırpılmadan tam sığar, sonra ölçülü bir
        // scale (1.21x) ile büyütülür ve biraz yukarı kaydırılır (logo ile görsel, görsel ile buton
        // arası boşluğu azaltmak için) — taşan kısım üstteki overflow-hidden tarafından kırpılır.
        // md ve üstü (desktop): hiçbir değişiklik yok, mevcut object-cover birebir korunuyor.
        className="-translate-y-[55px] scale-[1.21] object-contain object-center md:translate-y-0 md:scale-100 md:object-cover"
      />
    </div>
  );
}