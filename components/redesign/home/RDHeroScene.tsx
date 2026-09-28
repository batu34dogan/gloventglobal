'use client';

import { useEffect, useRef, type ReactNode } from 'react';

// Ana sayfa sahne geçişi — yalnız app/page.tsx'te kullanılır.
// Hero, uzunluğu P olan bir "pin" alanında CSS sticky ile tutulur; sonraki içerik (kapak yüzeyi) normal
// akışta −P üst boşlukla gelir ve hero'nun üzerine yükselir. +P / −P birbirini götürür: sayfa yüksekliği ve
// tüm bölüm konumları değişmez (bağlantılar, geri dönüş, aşağıda yenileme aynı yere gelir).
// JS yalnız ölçer (başlangıç + yeniden boyutlanma) ve hero metnine kaydırmaya bağlı küçük bir kalkış/solma
// değişkeni yazar. JS yoksa, hareket azaltma açıksa veya ekran kısaysa sahne hiç etkinleşmez: normal akış.
export default function RDHeroScene({ hero, children }: { hero: ReactNode; children: ReactNode }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const stage = stageRef.current;
    const pin = pinRef.current;
    const probe = probeRef.current;
    if (!scene || !stage || !pin || !probe) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const tall = window.matchMedia('(min-height: 560px)');
    let on = false;
    let start = 0; // hero'nun tutulmaya başladığı kaydırma (uzun hero'da alt kenarı ekranın altına gelince)
    let len = 1; // tutma uzunluğu P (px)
    let heroH = 0;
    let coverAt = 0; // kapağın üst kenarı bu kaydırmada navbar'ın alt kenarına ulaşır: hero görünür alanda bitmiştir
    let lastP = -1;
    let lastCovered = false;
    let raf = 0;

    const measure = () => {
      // Hero yüksekliği ve navbar çubuğunun yüksekliği CSS değişkenlerine; P ile küçük viewport (svh) CSS'ten
      // okunur. Navbar: yalnız çubuk (açık mobil menü ölçümü bozmasın).
      const bar = document.querySelector<HTMLElement>('header.fixed nav');
      const navH = bar ? Math.round(bar.getBoundingClientRect().bottom) : 76;
      heroH = stage.offsetHeight;
      scene.style.setProperty('--scene-h', `${heroH}px`);
      scene.style.setProperty('--scene-nav', `${navH}px`);
      const vh = probe.offsetHeight;
      start = Math.max(0, heroH - vh);
      len = Math.max(1, pin.offsetHeight);
      coverAt = Math.max(0, heroH - navH);
      lastP = -1;
    };

    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const p = Math.min(1, Math.max(0, (y - start) / len));
      if (p !== lastP) {
        lastP = p;
        scene.style.setProperty('--scene-p', p.toFixed(4));
      }
      // Kapak navbar'a ulaşınca hero etkileşim dışı ve boyanmaz: navbar arkasında şerit, görünmez
      // tıklama/odak alanı kalmaz.
      const covered = y >= coverAt;
      if (covered !== lastCovered) {
        lastCovered = covered;
        stage.toggleAttribute('data-scene-covered', covered);
      }
    };
    const onScroll = () => {
      // Sahne tamamen geride kaldıysa iş yapma.
      if (lastP === 1 && lastCovered && window.scrollY >= coverAt) return;
      if (!raf) raf = requestAnimationFrame(update);
    };

    // Klavye odağı hero içine gelir ve kontrol kapağın altında kalıyorsa, odağı taşımadan sahneyi o
    // kontrolün göründüğü konuma döndür.
    const onFocusIn = (e: FocusEvent) => {
      if (!on || lastP <= 0.02) return;
      const el = e.target as HTMLElement;
      const y = el.getBoundingClientRect().top - stage.getBoundingClientRect().top;
      window.scrollTo({ top: Math.min(start, Math.max(0, y - 120)), behavior: 'auto' });
    };

    const enable = () => {
      const want = !reduce.matches && tall.matches;
      if (want === on) {
        if (on) { measure(); update(); }
        return;
      }
      on = want;
      if (on) {
        scene.setAttribute('data-scene', 'on');
        measure();
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        stage.addEventListener('focusin', onFocusIn);
      } else {
        scene.removeAttribute('data-scene');
        stage.removeAttribute('data-scene-covered');
        lastCovered = false;
        window.removeEventListener('scroll', onScroll);
        stage.removeEventListener('focusin', onFocusIn);
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    enable();
    const ro = new ResizeObserver(() => { if (on) { measure(); update(); } });
    ro.observe(stage);
    ro.observe(probe);
    reduce.addEventListener('change', enable);
    tall.addEventListener('change', enable);
    return () => {
      ro.disconnect();
      reduce.removeEventListener('change', enable);
      tall.removeEventListener('change', enable);
      window.removeEventListener('scroll', onScroll);
      stage.removeEventListener('focusin', onFocusIn);
      if (raf) cancelAnimationFrame(raf);
      scene.removeAttribute('data-scene');
    };
  }, []);

  return (
    <div ref={sceneRef} className="rd-scene">
      <div ref={probeRef} aria-hidden="true" className="rd-scene-probe" />
      <div className="rd-scene-pin">
        <div ref={stageRef} className="rd-scene-stage">
          {hero}
        </div>
        {/* Tutma alanı: sticky öğe ebeveyninin içerik kutusunda kalır (padding sayılmaz), bu yüzden ayrı boşluk. */}
        <div ref={pinRef} aria-hidden="true" className="rd-scene-spacer" />
      </div>
      <div className="rd-scene-cover">{children}</div>
    </div>
  );
}
