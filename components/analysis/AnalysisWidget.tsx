'use client';

import { useEffect, useState } from 'react';
import AnalysisContent from './AnalysisContent';

export default function AnalysisWidget() {
  const [open, setOpen] = useState(false);

  // Modal açıkken: ESC ile kapatma + arka sayfa scroll'unu kilitleme. İkisi de "olursa güzel"
  // seviyesinde isteniyordu, basit ve düşük riskli oldukları için ekledik.
  // Sayfanın başka yerlerindeki ("Ücretsiz Analiz Al" CTA'ları vb.) butonların, küçük bir
  // dependency-free custom event ile bu modalı açabilmesi için.
  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener('open-analysis-widget', handleOpen);
    return () => window.removeEventListener('open-analysis-widget', handleOpen);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      {/* ============ SAĞ ALT SABİT BUTON ============
          Cookie banner gibi öğelerle çakışmaması için dipten biraz yukarıda (bottom-5/6).
          z-[45] bilerek navbar'ın (z-40) üstünde ama intro ekranının (z-50) ALTINDA — intro
          oynarken bu buton üzerinde görünmesin, intro kapandıktan sonra (DOM'dan kalkınca)
          buton doğal olarak görünür hale gelir. */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-4 z-[45] flex items-center gap-2 rounded-full border border-blue-400/45 bg-[#0a1326]/90 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_8px_32px_-8px_rgba(59,130,246,0.55)] backdrop-blur-md transition-all duration-300 hover:border-blue-400/75 hover:shadow-[0_8px_40px_-6px_rgba(59,130,246,0.75)] sm:bottom-6 sm:right-6"
        >
          <span
            aria-hidden="true"
            className="h-2 w-2 flex-shrink-0 rounded-full bg-blue-400 shadow-[0_0_10px_2px_rgba(96,165,250,0.85)]"
          />
          {/* Mobilde kısa metin, desktop'ta tam metin — buton küçük ekranda fazla yer kaplamasın. */}
          <span className="sm:hidden">Analiz Al</span>
          <span className="hidden sm:inline">Ücretsiz Analiz</span>
        </button>
      )}

      {/* ============ MODAL / PANEL ============ */}
      {open && (
        <div className="fixed inset-0 z-[45] flex items-end justify-center sm:items-center sm:p-6">
          <div
            aria-hidden="true"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-[#040810]/75 backdrop-blur-sm"
          />

          <div className="relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-2xl border border-white/[0.08] bg-[#0a1120] shadow-[0_24px_80px_-20px_rgba(0,0,0,0.7)] sm:max-h-[88vh] sm:max-w-2xl sm:rounded-2xl">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 h-[220px] w-[420px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
              style={{
                background: 'radial-gradient(closest-side, rgba(96,165,250,0.55), transparent 75%)',
              }}
            />

            <div className="relative flex items-start justify-between gap-4 border-b border-white/[0.07] px-6 py-5 sm:px-8">
              <div>
                <h2 className="text-lg font-bold tracking-tight text-white sm:text-xl">Dijital Büyüme Analizi</h2>
                <p className="mt-1 text-xs leading-relaxed text-blue-100/65 sm:text-sm">
                  6 kısa soruya cevap verin; markanız için hangi büyüme sistemlerinin öncelikli olabileceğini
                  görelim.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Kapat"
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all duration-200 hover:border-white/30 hover:text-white"
              >
                <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                  <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="relative flex-1 overflow-y-auto px-6 py-6 sm:px-8">
              <AnalysisContent onRequestClose={() => setOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}