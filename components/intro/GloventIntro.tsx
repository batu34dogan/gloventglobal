'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import IntroBackground from './IntroBackground';

type Phase = 'idle' | 'leaving' | 'done';

const TRANSITION_MS = 850;
const AUTO_ENTER_MS = 3000;
const SESSION_KEY   = 'glovent_intro_seen';

export default function GloventIntro() {
  // Aynı oturumda daha önce görüldüyse done ile başlat
  const [phase, setPhase] = useState<Phase>(() => {
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem(SESSION_KEY)) {
      return 'done';
    }
    return 'idle';
  });

  const autoTimerRef = useRef<number | null>(null);

  const enter = useCallback(() => {
    setPhase((prev) => {
      if (prev !== 'idle') return prev;
      return 'leaving';
    });
  }, []);

  // leaving → done geçişi
  useEffect(() => {
    if (phase === 'leaving') {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const t = window.setTimeout(
        () => setPhase('done'),
        prefersReducedMotion ? 0 : TRANSITION_MS,
      );
      return () => window.clearTimeout(t);
    }
  }, [phase]);

  // done → scroll aç, sessionStorage kaydet
  useEffect(() => {
    if (phase === 'done') {
      document.body.style.overflow = '';
      try { sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* private mode */ }
    }
  }, [phase]);

  // idle → scroll kilitle + otomatik geçiş
  useEffect(() => {
    if (phase !== 'idle') return;
    document.body.style.overflow = 'hidden';
    autoTimerRef.current = window.setTimeout(enter, AUTO_ENTER_MS) as unknown as number;
    return () => {
      if (autoTimerRef.current) window.clearTimeout(autoTimerRef.current);
      document.body.style.overflow = '';
    };
  }, [phase, enter]);

  if (phase === 'done') return null;

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

      <span className="absolute left-1/2 top-[37svh] z-20 -translate-x-1/2 -translate-y-1/2 text-sm font-semibold tracking-[0.25em] text-white md:left-10 md:top-8 md:translate-x-0 md:translate-y-0 md:text-base">
        GLOVENTGLOBAL
      </span>

      <button
        type="button"
        onClick={enter}
        disabled={phase !== 'idle'}
        className="absolute left-1/2 top-[50svh] z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 px-8 py-3 text-xs font-semibold tracking-[0.2em] text-white transition-colors hover:bg-white/10 md:bottom-14 md:top-auto md:translate-y-0 md:text-sm"
      >
        GLOBAL SİSTEME GİR
      </button>
    </section>
  );
}