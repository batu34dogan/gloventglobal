'use client';

import Image from 'next/image';

export default function IntroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050b14]">

      {/* ── DESKTOP (md+): video background ─────────────────────────────
          Video tam ekranı kapsar, mute/autoplay/loop standart.
          preload="metadata" → sadece ilk kare + süre bilgisi önceden yüklenir,
          tam video stream intro görünürken devreye girer.                    */}
      <video
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/glovent-platform-hero.png"
        className="absolute inset-0 hidden h-full w-full object-cover md:block"
      >
        <source src="/videos/hero-global-earth.webm" type="video/webm" />
        <source src="/videos/hero-global-earth.mp4"  type="video/mp4"  />
      </video>

      {/* Mobil (md altı): özel dikey görsel, tam ekran object-cover
          Video mobilde ağır olabileceği için mevcut görsel fallback korunuyor */}
      <Image
        src="/glovent-platform-hero-mobile.png"
        alt=""
        fill
        priority
        quality={100}
        sizes="100vw"
        className="block object-cover object-center md:hidden"
      />

      {/* ── Overlay gradient katmanları ────────────────────────────────
          1. Genel koyu örtü — metnin her yerde okunabilirliği
          2. Alt fade — alt yazı/buton alanını netleştirir
          3. Üst fade — GLOVENTGLOBAL yazısının arkası                        */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(5,11,20,0.55) 0%, rgba(5,11,20,0.30) 40%, rgba(5,11,20,0.50) 70%, rgba(5,11,20,0.85) 100%)',
        }}
      />
    </div>
  );
}