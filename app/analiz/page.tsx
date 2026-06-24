import AnalysisContent from '@/components/analysis/AnalysisContent';

export default function AnalizPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070d18] px-6 pb-20 pt-28 text-white sm:px-10 md:pt-32">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-100px] h-[420px] w-[700px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgba(96,165,250,0.5), transparent 75%)' }}
      />

      <div className="relative mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/80">DİJİTAL BÜYÜME ANALİZİ</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Markanız İçin Ücretsiz Ön Analiz</h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-blue-100/70">
          6 kısa soruya cevap verin; markanız için hangi büyüme sistemlerinin öncelikli olabileceğini görelim.
        </p>
      </div>

      <div className="relative mx-auto mt-10 max-w-2xl rounded-2xl border border-white/[0.08] bg-[#0a1120] p-6 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.55)] sm:p-8">
        <AnalysisContent />
      </div>
    </main>
  );
}