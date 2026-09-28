'use client';

import { useEffect } from 'react';

// Ana sayfa hareket dili — yalnız app/page.tsx'te render edilir; <main className="rd-home"> içindeki
// [data-hm] gruplarını tek bir IntersectionObserver ile izler ve ilk girişte bir kez data-hm-in ekler.
// Gizli başlangıç durumu yalnız html.rd-js varken (boyamadan önce) uygulanır (bkz. home-motion.css);
// uygulama hydrate olmazsa rd-js kalkar ve içerik görünür kalır.
// - Görünür alanın üstünde kalan gruplar (bölüm bağlantısı, geri dönüş, hızlı kaydırma) animasyonsuz açılır.
// - Klavye odağı henüz açılmamış bir grubun içine gelirse grup hemen görünür olur.
// - Hareket azaltma tercihinde her şey hemen görünür.
export default function RDHomeMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.rd-home');
    if (!root) return;
    const groups = Array.from(root.querySelectorAll<HTMLElement>('[data-hm]'));
    const reveal = (el: Element, instant: boolean) => {
      if (!el.hasAttribute('data-hm-in')) el.setAttribute('data-hm-in', instant ? 'instant' : '');
    };

    // Klavye odağı: grup henüz açılmamışsa ya da hâlâ açılıyorsa hemen son hâline geçer.
    const onFocusIn = (e: FocusEvent) => {
      const group = (e.target as Element | null)?.closest?.('[data-hm]');
      if (group && group.getAttribute('data-hm-in') !== 'instant') group.setAttribute('data-hm-in', 'instant');
    };
    root.addEventListener('focusin', onFocusIn);

    if (typeof IntersectionObserver === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      groups.forEach((g) => reveal(g, true));
      return () => root.removeEventListener('focusin', onFocusIn);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) reveal(entry.target, false);
          else if (entry.boundingClientRect.bottom <= 0) reveal(entry.target, true);
          else continue;
          observer.unobserve(entry.target);
        }
        // Hızlı kaydırmada gözlemcinin hiç yakalamadan geçtiği (görünür alanın üstünde kalan) gruplar
        // geri dönüldüğünde boş kalmasın: animasyonsuz açılır. Yalnız geri çağrı anında, tek sefer ölçülür.
        for (const g of groups) {
          if (!g.hasAttribute('data-hm-in') && g.getBoundingClientRect().bottom <= 0) {
            reveal(g, true);
            observer.unobserve(g);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    groups.forEach((g) => observer.observe(g));
    return () => {
      observer.disconnect();
      root.removeEventListener('focusin', onFocusIn);
    };
  }, []);

  return null;
}
