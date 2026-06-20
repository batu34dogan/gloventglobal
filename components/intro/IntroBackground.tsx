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
        // scale (1.15x) ile büyütülür — taşan kısım üstteki overflow-hidden tarafından kırpılır.
        // Bu, object-cover'ın o ekran oranında ne kadar aşırı zoom yapacağını öngöremediğimiz
        // sorunu ortadan kaldırıyor: büyütme miktarı artık tek bir sabit sayı (1.15) ile bizim kontrolümüzde.
        // md ve üstü (desktop): hiçbir değişiklik yok, mevcut object-cover birebir korunuyor.
        className="scale-[1.15] object-contain object-center md:scale-100 md:object-cover"
      />
    </div>
  );
}