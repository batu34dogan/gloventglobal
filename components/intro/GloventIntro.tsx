'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import IntroBackground from './IntroBackground';

type Phase = 'idle' | 'leaving' | 'done';

const TRANSITION_MS = 850;

export default function GloventIntro() {
  const [phase, setPhase] = useState<Phase>('idle');

  useEffect(() => {
    document.body.style.overflow = phase === 'done' ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [phase]);

  if (phase === 'done') return null;

  const handleEnter = () => {
    if (phase !== 'idle') return;
    setPhase('leaving');

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.setTimeout(() => setPhase('done'), prefersReducedMotion ? 0 : TRANSITION_MS);
  };

  const leaving = phase === 'leaving';

  return (
    <section
      className={`fixed inset-0 z-50 overflow-hidden transition-opacity duration-[850ms] ease-out motion-reduce:transition-none motion-reduce:duration-0 ${
        leaving ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div
        className={`absolute inset-0 transition-transform duration-[850ms] ease-out motion-reduce:transition-none motion-reduce:duration-0 ${
          leaving ? 'scale-[1.04]' : 'scale-100'
        }`}
      >
        {/* ===== DESKTOP (md ve üstü): mevcut full-bleed cover arka plan — DOKUNULMADI ===== */}
        <div className="hidden h-full w-full md:block">
          <IntroBackground />
        </div>

        {/* ===== MOBİL (md altı): tek ana görsel, ama overlay değil — logo / görsel / buton
             üç ayrı dikey bölge olarak (root min-height: 100svh, flex column) ===== */}
        <div className="flex h-full min-h-[100svh] w-full flex-col bg-[#050b14] md:hidden">
          <div className="px-6 pt-4">
            <span className="text-sm font-semibold tracking-[0.25em] text-white">GLOVENTGLOBAL</span>
          </div>

          <div className="relative flex flex-1 items-center justify-center overflow-hidden">
            <div className="w-[118vw] max-w-none -translate-y-5">
              <Image
                src="/glovent-platform-hero.png"
                alt=""
                width={1534}
                height={1025}
                priority
                quality={100}
                sizes="118vw"
                className="h-auto w-full object-contain"
              />
            </div>
          </div>

          <div className="flex items-center justify-center pb-10">
            <button
              type="button"
              onClick={handleEnter}
              disabled={phase !== 'idle'}
              className="rounded-full border border-white/40 px-8 py-3 text-xs font-semibold tracking-[0.2em] text-white transition-colors hover:bg-white/10"
            >
              ENTER GLOBAL NETWORK
            </button>
          </div>
        </div>
      </div>

      {/* ===== DESKTOP logo + buton (md ve üstü): mevcut absolute overlay — DOKUNULMADI ===== */}
      <span className="absolute left-10 top-8 hidden text-base font-semibold tracking-[0.25em] text-white md:block">
        GLOVENTGLOBAL
      </span>

      <button
        type="button"
        onClick={handleEnter}
        disabled={phase !== 'idle'}
        className="absolute bottom-14 left-1/2 hidden -translate-x-1/2 rounded-full border border-white/40 px-8 py-3 text-sm font-semibold tracking-[0.2em] text-white transition-colors hover:bg-white/10 md:block"
      >
        ENTER GLOBAL NETWORK
      </button>
    </section>
  );
}