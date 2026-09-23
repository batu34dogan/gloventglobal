'use client';

import { useEffect, useRef, useState } from 'react';

// Homepage'te (RDSystem.tsx) doğrulanmış aynı altı node — yeni bir AI ürünü/etiketi uydurulmadı.
const aiNodes = ['Otomasyon', 'İçerik', 'Veri', 'Karar Desteği', 'Operasyon', 'İş Akışları'];

export default function RDServicesAILayer() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      const id = window.setTimeout(() => setInView(true), 0);
      return () => window.clearTimeout(id);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[#0F1E3C] py-16 sm:py-20">
      <style>{`
        .rd-ai-node {
          opacity: 0;
          transform: translateY(8px);
          transition: opacity .5s ease, transform .5s ease, border-color .25s ease, background-color .25s ease;
        }
        .rd-ai-node.rd-in { opacity: 1; transform: translateY(0); }
        @media (hover: hover) and (pointer: fine) {
          .rd-ai-node:hover { border-color: rgba(201,168,118,0.55); background-color: rgba(255,255,255,0.06); }
        }
        @media (prefers-reduced-motion: reduce) {
          .rd-ai-node, .rd-ai-node.rd-in { opacity: 1 !important; transform: none !important; transition: none !important; }
        }
      `}</style>

      <div ref={ref} className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <p className="text-[11px] font-bold tracking-[0.28em] text-[#C9A876] uppercase">AI + Data Layer</p>
        <h2 className="mt-4 max-w-[24ch] text-[2rem] font-extrabold leading-tight tracking-tight text-white sm:text-[2.6rem]">
          Her Sistemin İçinde Çalışan Katman.
        </h2>
        <p className="mt-5 max-w-[62ch] text-[15px] leading-relaxed text-white/60">
          Ürün açıklamaları, listeleme içerikleri, teklif ve müşteri akışları, raporlama ile n8n tabanlı
          otomasyonlar bu katman üzerinden çalışır. Amazon’dan Shopify’a, reklamdan operasyona kadar her sistemde
          aynı veri ve karar desteği altyapısını kullanırız — ayrı bir “AI ürünü” değil, sistemin kendisidir.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          {aiNodes.map((node, i) => (
            <span
              key={node}
              style={{ transitionDelay: inView ? `${i * 60}ms` : '0ms' }}
              className={`rd-ai-node ${inView ? 'rd-in' : ''} rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-[13.5px] font-semibold text-white/85`}
            >
              {node}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
