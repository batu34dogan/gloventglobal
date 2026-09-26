'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import AnalysisFlow from './AnalysisFlow';
import { trackEvent } from '@/lib/analytics';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function AnalysisWidget() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const modalRef = useRef<HTMLDivElement>(null);
  // Modalı açan gerçek tetikleyici — kapanınca odak buraya döner.
  const triggerRef = useRef<HTMLElement | null>(null);
  const floatingRef = useRef<HTMLButtonElement>(null);

  // /analiz sayfasında form zaten tam sayfada gösteriliyor — floating buton tekrar etmesin.
  const isAnalysisPage = pathname === '/analiz';
  // /redesign kendi CTA'larını kullanıyor — eski global floating buton orada görünmesin.
  const isRedesignPage = pathname?.startsWith('/redesign') ?? false;
  // Yeni production ana sayfa (/) artık kendi premium RDAnalysisCTA'sını render ediyor —
  // eski floating buton orada ikinci bir tetikleyici olarak görünmesin. Modal/form/event
  // sistemi burada aynen kalıyor, RDAnalysisCTA da bu component'in dinlediği
  // 'open-analysis-widget' event'ini kullanıyor.
  const isHomepage = pathname === '/';
  // Production /hizmetler overview, onaylanan preview (/redesign/hizmetler) gibi floating trigger
  // göstermiyor — CTA'lar sayfa içindeki 'open-analysis-widget' butonları. Redesign detay sayfaları
  // (/hizmetler/[slug]) da preview'deki gibi floating trigger'sız; modal aynı.
  const isServicesOverview = pathname === '/hizmetler' || (pathname?.startsWith('/hizmetler/') ?? false);
  // Production /nasil-calisiyoruz: onaylı preview'de floating trigger yok — Hero ve Final CTA yeterli.
  const isProcessPage = pathname === '/nasil-calisiyoruz';
  // Production /hakkimizda: onaylı preview'de floating trigger yok — Hero ve Final CTA yeterli.
  const isAboutPage = pathname === '/hakkimizda';
  // Production /iletisim: sayfanın kendi "Ücretsiz Analiz" seçeneği var — floating trigger gösterilmiyor.
  const isContactPage = pathname === '/iletisim';
  // Production /rehberler ve /rehberler/[slug]: sayfa içi Analysis CTA'ları var — floating trigger gösterilmiyor.
  const isGuidesPage = pathname === '/rehberler' || (pathname?.startsWith('/rehberler/') ?? false);

  // Preview (/redesign/*) sayfalarından açılan modalın event'leri 'redesign_' önekli kaynak taşır.
  const analyticsPrefix = isRedesignPage ? 'redesign_' : '';

  const openModal = useCallback(() => {
    triggerRef.current = document.activeElement instanceof HTMLElement && document.activeElement !== document.body ? document.activeElement : null;
    setOpen(true);
  }, []);

  const closeModal = useCallback((opts?: { restoreFocus?: boolean }) => {
    setOpen(false);
    const trigger = triggerRef.current;
    triggerRef.current = null;
    // Akış içindeki bir linkle başka sayfaya gidiliyorsa odak eski sayfaya döndürülmez.
    if (opts?.restoreFocus === false) return;
    // Modal kapanınca odağı modalı açan tetikleyiciye geri ver. Floating buton modal açıkken DOM'dan
    // kalktığı için yeniden mount olduktan sonra (bir sonraki frame) ona odaklanılır.
    requestAnimationFrame(() => {
      if (trigger && trigger.isConnected) trigger.focus();
      else floatingRef.current?.focus();
    });
  }, []);

  // Modal hangi yoldan açılırsa açılsın (sağ alt buton veya sayfalardaki CTA'lar) tek yerden ölçülür.
  useEffect(() => {
    if (open) trackEvent('analysis_widget_open');
  }, [open]);

  // Başlangıç odağı: diyaloğun kendisi (aria-labelledby ile başlık + açıklama okunur).
  useEffect(() => {
    if (open) modalRef.current?.focus();
  }, [open]);

  // Sayfalardaki "Ücretsiz Analiz Al" CTA'ları dependency-free custom event ile modalı açar.
  useEffect(() => {
    window.addEventListener('open-analysis-widget', openModal);
    return () => window.removeEventListener('open-analysis-widget', openModal);
  }, [openModal]);

  // Açıkken: ESC kapatır, Tab/Shift+Tab diyalog içinde döner (focus trap), arka sayfa scroll'u kilitli.
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
        return;
      }
      if (e.key !== 'Tab' || !modalRef.current) return;
      const items = Array.from(modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );
      if (items.length === 0) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      const inside = modalRef.current.contains(active);
      if (e.shiftKey && (active === first || active === modalRef.current || !inside)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !inside)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, closeModal]);

  return (
    <>
      {/* ============ SAĞ ALT SABİT BUTON ============
          z-[45] bilerek navbar'ın (z-40) üstünde ama intro ekranının (z-50) ALTINDA — intro
          oynarken bu buton üzerinde görünmesin, intro kapandıktan sonra (DOM'dan kalkınca)
          buton doğal olarak görünür hale gelir. */}
      {!open && !isAnalysisPage && !isRedesignPage && !isHomepage && !isServicesOverview && !isProcessPage && !isAboutPage && !isContactPage && !isGuidesPage && (
        <button
          ref={floatingRef}
          type="button"
          onClick={() => {
            trackEvent('free_analysis_cta_click', { location: 'floating_button' });
            triggerRef.current = null;
            setOpen(true);
          }}
          className="fixed bottom-5 right-4 z-[45] flex items-center gap-2.5 rounded-full border border-blue-500/40 bg-slate-950/90 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_28px_-4px_rgba(59,130,246,0.50)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/70 hover:shadow-[0_0_38px_-4px_rgba(59,130,246,0.70)] md:bottom-8 md:right-8 md:px-5"
        >
          <span
            aria-hidden="true"
            className="h-2 w-2 flex-shrink-0 rounded-full bg-blue-400 shadow-[0_0_8px_2px_rgba(96,165,250,0.85)]"
          />
          Ücretsiz Analiz Al
        </button>
      )}


      {/* ============ MODAL ============
          z-[60]: RDNavbar (z-50) dahil her şeyin üstünde. Mobilde alttan açılan panel (dvh ile
          viewport'a sığar, içerik kendi içinde kayar), sm+ ortalanmış diyalog. */}
      {open && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6">
          <div aria-hidden="true" onClick={() => closeModal()} className="absolute inset-0 bg-[#0B1530]/60 backdrop-blur-[2px]" />

          <div
            ref={modalRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="analysis-dialog-title"
            aria-describedby="analysis-dialog-desc"
            className="relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-[0_24px_80px_-20px_rgba(15,30,60,0.45)] outline-none sm:max-h-[88dvh] sm:max-w-[720px] sm:rounded-3xl"
            style={{ fontFamily: 'var(--font-geist-sans),system-ui,sans-serif' }}
          >
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1B5CD6] to-[#C9A876]" />
            <div className="flex items-start justify-between gap-4 border-b border-[#E5E5EC] px-5 pb-4 pt-5 sm:px-8 sm:pt-6">
              <div>
                <h2 id="analysis-dialog-title" className="text-[1.15rem] font-extrabold tracking-tight text-[#14213F] sm:text-[1.3rem]">
                  Ücretsiz Global Büyüme Analizi
                </h2>
                <p id="analysis-dialog-desc" className="mt-1 text-[13.5px] leading-relaxed text-[#5A5A6A] sm:text-[14.5px]">
                  7 kısa soruyla mevcut yapınızı, önceliklerinizi ve büyüme alanlarınızı değerlendirin.
                </p>
              </div>
              <button
                type="button"
                onClick={() => closeModal()}
                aria-label="Kapat"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D6D6DC] text-[#14213F] transition-colors hover:border-[#1B5CD6] hover:text-[#1B5CD6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B5CD6]"
              >
                <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                  <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-8">
              <AnalysisFlow variant="modal" leadSource="analysis-widget" analyticsPrefix={analyticsPrefix} onRequestClose={closeModal} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
