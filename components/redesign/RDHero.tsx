'use client';

import Image from 'next/image';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

const SYSTEM = ['Strategy', 'Commerce', 'Technology', 'Operations'];

export default function RDHero() {
  return (
    <section className="relative overflow-hidden bg-[#FAF9F6] lg:min-h-[90vh]">
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="max-w-[46ch] py-20 lg:flex lg:min-h-[90vh] lg:max-w-[54%] lg:flex-col lg:justify-center lg:py-28">
          <p className="text-[12px] font-bold tracking-[0.3em] text-[#1B5CD6] uppercase">Global Growth Partner</p>

          <h1 className="mt-6 text-[2.625rem] font-extrabold leading-[1.03] tracking-[-0.03em] text-[#14213F] sm:text-[4rem] lg:text-[4.8rem]">
            Dünya Sizin İçin<br />Daha Büyük.
          </h1>

          <p className="mt-7 max-w-[42ch] text-[1.2rem] leading-[1.7] text-[#4A4A5A]">
            Global büyümeniz için strateji vermekle kalmıyor; satış, teknoloji, yapay zeka ve operasyon sistemini kuruyoruz.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12.5px] font-bold tracking-[0.16em] text-[#8A8A98] uppercase">
            {SYSTEM.map((s, i) => (
              <span key={s} className="flex items-center gap-3">
                {i > 0 && <span className="text-[#C9A876]">·</span>}
                {s}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/analiz"
              onClick={() => trackEvent('free_analysis_cta_click', { location: 'redesign_hero' })}
              className="inline-flex items-center gap-2 rounded-full bg-[#14213F] px-7 py-3.5 text-[15.5px] font-semibold text-white transition-all hover:bg-[#1B5CD6]"
            >
              Ücretsiz Strateji Görüşmesi →
            </Link>
            <Link
              href="#hizmetler"
              onClick={() => trackEvent('services_anchor_click', { location: 'redesign_hero' })}
              className="inline-flex items-center rounded-full border border-[#D6D6DC] bg-transparent px-7 py-3.5 text-[15.5px] font-semibold text-[#14213F] transition-all hover:border-[#1B5CD6] hover:text-[#1B5CD6]"
            >
              Hizmetlerimizi Keşfet
            </Link>
          </div>
        </div>
      </div>

      {/* Cinematic composition — bleeds full-width on desktop so it reads as part of the hero, not a card. */}
      <div className="relative mx-6 mt-2 aspect-[4/5] overflow-hidden rounded-2xl sm:mx-10 lg:absolute lg:inset-y-0 lg:right-0 lg:mx-0 lg:mt-0 lg:aspect-auto lg:w-[54%] lg:rounded-none">
        <Image
          src="/redesign/hero-istanbul.jpg"
          alt="İstanbul Boğazı manzaralı bir terasta, dizüstü bilgisayarıyla çalışan biri"
          fill
          priority
          sizes="(min-width: 1024px) 54vw, 100vw"
          className="object-cover object-[62%_center] lg:object-[65%_center]"
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-20"
          style={{ background: 'radial-gradient(circle at 76% 18%,rgba(255,255,255,0.32),transparent 45%)' }}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-40 lg:h-56"
          style={{ background: 'linear-gradient(to top,rgba(15,21,45,0.55),transparent)' }}
        />
        <div aria-hidden className="absolute inset-y-0 left-0 hidden w-56 bg-gradient-to-r from-[#FAF9F6] to-transparent lg:block" />
      </div>
    </section>
  );
}
