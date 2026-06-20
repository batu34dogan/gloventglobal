'use client';

import { useEffect, useState } from 'react';
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
        <IntroBackground />
      </div>

      <span className="absolute left-6 top-4 text-sm font-semibold tracking-[0.25em] text-white sm:left-10 sm:top-8 sm:text-base">
        GLOVENTGLOBAL
      </span>

      <button
        type="button"
        onClick={handleEnter}
        disabled={phase !== 'idle'}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 rounded-full border border-white/40 px-8 py-3 text-xs font-semibold tracking-[0.2em] text-white transition-colors hover:bg-white/10 sm:bottom-14 sm:text-sm"
      >
        ENTER GLOBAL NETWORK
      </button>
    </section>
  );
}