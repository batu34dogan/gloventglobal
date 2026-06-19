'use client';

import Image from 'next/image';

export default function IntroBackground() {
  return (
    <Image
      src="/glovent-platform-hero.png"
      alt=""
      fill
      priority
      quality={100}
      sizes="100vw"
      className="object-cover object-center"
    />
  );
}