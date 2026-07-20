'use client';

export default function IntroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050b14]">

      {/* Video background — tüm cihazlarda */}
      <video
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/glovent-platform-hero-mobile.png"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/hero-global-earth.webm" type="video/webm" />
        <source src="/videos/hero-global-earth.mp4"  type="video/mp4"  />
      </video>

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