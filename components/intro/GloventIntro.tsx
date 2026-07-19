'use client';

import { useCallback, useEffect, useState } from 'react';
import IntroBackground from './IntroBackground';

type Phase = 'idle' | 'leaving' | 'done';

const TRANSITION_MS = 850;
const SESSION_KEY   = 'glovent_intro_seen';

export default function GloventIntro() {
  const [phase, setPhase] = useState<Phase>(() => {
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem(SESSION_KEY)) {
      return 'done';
    }
    return 'idle';
  });

  // idle → scroll kilitle
  useEffect(() => {
    if (phase !== 'idle') return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [phase]);

  // leaving → done
  useEffect(() => {
    if (phase !== 'leaving') return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = window.setTimeout(
      () => setPhase('done'),
      prefersReducedMotion ? 0 : TRANSITION_MS,
    );
    return () => window.clearTimeout(t);
  }, [phase]);

  // done → scroll aç + sessionStorage
  useEffect(() => {
    if (phase !== 'done') return;
    document.body.style.overflow = '';
    try { sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* private mode */ }
  }, [phase]);

  const enter = useCallback(() => {
    setPhase((prev) => (prev === 'idle' ? 'leaving' : prev));
  }, []);

  if (phase === 'done') return null;

  const leaving = phase === 'leaving';

  return (
    <section
      className={`fixed inset-0 z-50 overflow-hidden transition-opacity duration-[850ms] ease-out motion-reduce:transition-none motion-reduce:duration-0 ${
        leaving ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Video/arka plan alanı — tıklayınca giriş yapılır */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Global sisteme giriş için tıklayın"
        onClick={enter}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') enter(); }}
        className={`absolute inset-0 cursor-pointer transition-transform duration-[850ms] ease-out motion-reduce:transition-none motion-reduce:duration-0 ${
          leaving ? 'scale-[1.04]' : 'scale-100'
        }`}
      >
        <IntroBackground />
      </div>

      {/* Marka adı */}
      <span className="absolute left-1/2 top-[37svh] z-20 -translate-x-1/2 -translate-y-1/2 text-sm font-semibold tracking-[0.25em] text-white pointer-events-none md:left-10 md:top-8 md:translate-x-0 md:translate-y-0 md:text-base">
        GLOVENTGLOBAL
      </span>

      {/* Yönlendirme notu — çok küçük, premium */}
      <span className="absolute bottom-[calc(4.5rem+1px)] left-1/2 z-20 -translate-x-1/2 text-[10px] tracking-[0.18em] text-white/40 pointer-events-none md:hidden">
        dünyaya dokunarak devam edin
      </span>

      {/* Giriş butonu */}
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