'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';
import { questions, type Answers, type QuestionId } from '@/lib/analysis/questions';
import { PRIORITY_LABELS, getGrowthScore as getGrowthPotentialScore, getReasonText, getRecommendations } from '@/lib/analysis/engine';
import { getAnalysisService } from '@/lib/analysis/services';

// ESKİ (production /analiz) quiz UI'ı — /analiz yeni AnalysisFlow'a promote edilene kadar görünümü
// korunuyor. Sorular, skor, öneriler ve hizmet adları artık lib/analysis'ten (modal ve /redesign/analiz
// ile tek kaynak). Hizmet adı/açıklaması production /hizmetler verisinden gelir.
const serviceInfo = (tag: Parameters<typeof getAnalysisService>[0]) => {
  const s = getAnalysisService(tag);
  return { title: s.name, description: s.summary };
};
const serviceHref = (tag: Parameters<typeof getAnalysisService>[0]) => `/hizmetler/${tag}`;


type Stage = 'quiz' | 'results' | 'success';

// leadSource: lead'in gerçek kaynağı — modal "analysis-widget", /analiz "analysis-page", eski /iletisim
// quiz'i "contact-page". n8n payload'ı ve analytics lead_source aynı değeri kullanır.
export default function AnalysisContent({
  onRequestClose,
  onSuccess,
  leadSource = 'analysis-widget',
}: {
  onRequestClose?: () => void;
  onSuccess?: () => void;
  leadSource?: 'analysis-widget' | 'analysis-page' | 'contact-page';
}) {
  const [stage, setStage] = useState<Stage>('quiz');
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [formValues, setFormValues] = useState({
    fullName: '',
    company: '',
    phone: '',
    email: '',
    website: '',
    notes: '',
  });
  // Pazarlama iletişimi izni — opsiyonel, varsayılan işaretsiz, form gönderimini engellemiyor.
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  // Gerçek honeypot değeri — gizli input'a bağlı; gerçek kullanıcıda her zaman boş kalır.
  const [hp, setHp] = useState('');

  const currentQuestion = questions[stepIndex];
  const isLastQuestion = stepIndex === questions.length - 1;

  const recommendations = useMemo(() => getRecommendations(answers), [answers]);
  const reasonText = useMemo(() => getReasonText(answers), [answers]);
  const growthScore = useMemo(() => getGrowthPotentialScore(answers), [answers]);

  const updateField = (field: keyof typeof formValues) => (value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectSingle = (questionId: QuestionId, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleToggleMulti = (questionId: QuestionId, option: string) => {
    setAnswers((prev) => {
      const current = (prev[questionId] as string[]) ?? [];
      const next = current.includes(option) ? current.filter((o) => o !== option) : [...current, option];
      return { ...prev, [questionId]: next };
    });
  };

  const isOptionSelected = (questionId: QuestionId, option: string) => {
    const value = answers[questionId];
    if (Array.isArray(value)) return value.includes(option);
    return value === option;
  };

  const isCurrentAnswered = () => {
    const value = answers[currentQuestion.id];
    if (Array.isArray(value)) return value.length > 0;
    return Boolean(value);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setStage('results');
      return;
    }
    setStepIndex((i) => Math.min(i + 1, questions.length - 1));
  };

  const handleBack = () => {
    if (stepIndex === 0) return;
    setStepIndex((i) => Math.max(i - 1, 0));
  };

  const resetAll = () => {
    setStage('quiz');
    setStepIndex(0);
    setAnswers({});
    setFormValues({ fullName: '', company: '', phone: '', email: '', website: '', notes: '' });
    setMarketingConsent(false);
    setFormError(null);
  };

  const handleClose = () => {
    onRequestClose?.();
    // Widget tekrar açıldığında analiz baştan başlasın (ilk faz için bu davranış yeterli).
    resetAll();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValues.fullName.trim()) {
      setFormError('Lütfen ad soyad alanını doldurun.');
      return;
    }
    if (!formValues.company.trim()) {
      setFormError('Lütfen firma adı alanını doldurun.');
      return;
    }
    if (!formValues.phone.trim() && !formValues.email.trim()) {
      setFormError('Lütfen telefon veya e-posta alanlarından en az birini doldurun.');
      return;
    }
    setFormError(null);
    setSubmitError(null);
    setIsSubmitting(true);

    const payload = {
      contact: formValues,
      marketingConsent,
      answers,
      growthScore,
      recommendations: recommendations.map(({ tag }, index) => ({
        tag,
        title: serviceInfo(tag).title,
        priority: PRIORITY_LABELS[index] ?? 'Destekleyici Öncelik',
      })),
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
      createdAt: new Date().toISOString(),
      leadSource,
      _hp: hp, // honeypot — gizli input; gerçek kullanıcıda boş, bot doldurursa API sessizce reddeder
    };

    try {
      const res = await fetch('/api/analysis-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.status === 429) {
        setSubmitError('Çok fazla deneme yapıldı. Lütfen birkaç dakika sonra tekrar deneyin.');
        return;
      }
      const data = await res.json().catch(() => ({}));
      // Server doğrulaması (ör. geçersiz e-posta/telefon) alan hatası döndürürse ilkini göster.
      if (res.status === 400 && data.errors) {
        setSubmitError(String(Object.values(data.errors)[0]));
        return;
      }
      if (res.ok && data.success) {
        trackEvent('analysis_form_submit_success', {
          lead_source: leadSource,
          page_path: typeof window !== 'undefined' ? window.location.pathname : '',
          growth_score: growthScore,
          // DebugView yalnızca development'ta — production dönüşümleri DebugView'a zorlanmıyor.
          ...(process.env.NODE_ENV !== 'production' ? { debug_mode: true } : {}),
        });
        setStage('success');
        onSuccess?.();
      } else {
        setSubmitError('Analiz talebiniz gönderilemedi. Lütfen daha sonra tekrar deneyin veya iletişim sayfasından bize ulaşın.');
      }
    } catch {
      setSubmitError('Analiz talebiniz gönderilemedi. Lütfen daha sonra tekrar deneyin veya iletişim sayfasından bize ulaşın.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldLabelClass = 'mb-1.5 block text-xs font-medium uppercase tracking-[0.1em] text-blue-100/70';
  const fieldInputClass =
    'w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-blue-100/30 outline-none transition-colors duration-200 focus:border-blue-400/55 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.15)]';

  return (
    <div className="text-white">
      {stage === 'quiz' && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300/80">
            Adım {stepIndex + 1} / {questions.length}
          </p>
          {/* İnce ilerleme çubuğu — adım göstergesini görsel olarak da güçlendiriyor. */}
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-blue-400/70 transition-all duration-500"
              style={{ width: `${((stepIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          <h3 className="mt-5 text-xl font-semibold text-white sm:text-2xl">{currentQuestion.title}</h3>
          {currentQuestion.subtitle && (
            <p className="mt-1.5 text-xs leading-relaxed text-blue-100/55">{currentQuestion.subtitle}</p>
          )}
          {currentQuestion.multi && (
            <p className="mt-1.5 text-xs text-blue-100/55">Birden fazla seçenek işaretleyebilirsiniz.</p>
          )}

          <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {currentQuestion.options.map((option) => {
              const selected = isOptionSelected(currentQuestion.id, option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() =>
                    currentQuestion.multi
                      ? handleToggleMulti(currentQuestion.id, option)
                      : handleSelectSingle(currentQuestion.id, option)
                  }
                  className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
                    selected
                      ? 'border-blue-400/60 bg-blue-500/15 text-white shadow-[0_0_24px_-8px_rgba(59,130,246,0.6)]'
                      : 'border-white/10 bg-white/[0.03] text-blue-100/80 hover:border-white/25 hover:bg-white/[0.06]'
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          <div className="mt-7 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleBack}
              disabled={stepIndex === 0}
              className="rounded-full border border-white/15 px-6 py-2.5 text-sm font-semibold text-white/75 transition-all duration-200 hover:border-white/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              Geri
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={!isCurrentAnswered()}
              className="rounded-full border border-blue-400/45 bg-blue-500/10 px-7 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:border-blue-400/75 hover:bg-blue-500/20 disabled:cursor-not-allowed disabled:opacity-30"
            >
              {isLastQuestion ? 'Ön Analizi Gör' : 'İleri'}
            </button>
          </div>
        </div>
      )}

      {stage === 'results' && (
        <div>
          {/* "İlk Değerlendirme Tamamlandı" + Büyüme Potansiyeli skoru — formdan önce, sonuç
              kartlarından önce gösterilen güçlü ön değerlendirme bloğu. */}
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300/80">İlk Değerlendirme Tamamlandı</p>
          <p className="mt-3 text-sm leading-relaxed text-blue-100/70 sm:text-base">
            Cevaplarınıza göre markanızın mevcut dijital büyüme öncelikleri ve potansiyel gelişim alanları
            aşağıdaki gibi görünüyor.
          </p>

          <div className="mt-4 flex items-center gap-4 rounded-xl border border-blue-400/25 bg-blue-500/[0.06] px-5 py-4">
            <div className="flex-shrink-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-blue-300/75">Tahmini Büyüme Potansiyeli</p>
              <p className="mt-0.5 text-3xl font-bold text-white">
                {growthScore}
                <span className="text-base font-medium text-blue-200/60"> / 100</span>
              </p>
            </div>
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-blue-100/45">
            Bu skor; mevcut satış kanallarınız, hedefleriniz, dijital altyapınız, satış hacminiz ve büyüme
            bütçenize göre oluşturulan ön değerlendirmedir.
          </p>

          <div className="mt-4 rounded-lg border border-blue-400/20 bg-blue-500/[0.05] px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-300/80">
              Markanızın En Büyük Fırsat Alanı
            </p>
            <p className="mt-1.5 text-xs text-blue-100/70">Cevaplarınıza göre ilk odaklanmanız gereken alanlar şunlar olabilir:</p>
            <ul className="mt-1.5 space-y-1">
              {recommendations.map(({ tag }) => (
                <li key={tag} className="flex items-start gap-1.5 text-xs leading-relaxed text-blue-100/85 sm:text-sm">
                  <span className="text-blue-400">✓</span>
                  {serviceInfo(tag).title}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-3 rounded-lg border border-blue-400/20 bg-blue-500/[0.05] px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-300/80">
              Neden Bu Sistemler Önerildi?
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-blue-100/75 sm:text-sm">{reasonText}</p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {recommendations.map(({ tag }, index) => (
              <a
                key={tag}
                href={serviceHref(tag)}
                className="group relative rounded-xl border border-white/[0.08] bg-white/[0.035] p-4 pt-9 transition-all duration-300 hover:border-blue-400/40 hover:bg-white/[0.06]"
              >
                <span className="absolute right-3 top-3 rounded-full border border-blue-400/35 bg-blue-500/10 px-2.5 py-1 text-[10px] font-semibold text-blue-200/90">
                  {PRIORITY_LABELS[index] ?? 'Destekleyici Öncelik'}
                </span>
                <h4 className="text-sm font-semibold text-white group-hover:text-blue-200">{serviceInfo(tag).title}</h4>
                <p className="mt-1.5 text-xs leading-relaxed text-blue-100/65">{serviceInfo(tag).description}</p>
                <span className="mt-2 inline-block text-[11px] font-semibold uppercase tracking-[0.05em] text-blue-300/80">
                  Detayları Gör →
                </span>
              </a>
            ))}
          </div>

          <p className="mt-3 text-[11px] leading-relaxed text-blue-100/45">
            Bu öncelik seviyeleri, verdiğiniz cevaplara göre oluşturulan ön değerlendirmedir; kesin bir analiz
            sonucu değildir.
          </p>

          {/* 5. madde: Ücretsiz Detaylı Analizde Ne Alacaksınız? — formdan önce değer kutusu. */}
          <div className="mt-8 rounded-lg border border-blue-400/20 bg-blue-500/[0.05] px-4 py-3.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-300/80">
              Ücretsiz Detaylı Analizde Ne Alacaksınız?
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-blue-100/70 sm:text-sm">
              Bilgilerinizi bıraktığınızda markanızın mevcut yapısını daha detaylı inceleyerek size uygulanabilir
              bir büyüme yönü sunabiliriz.
            </p>
            <ul className="mt-2 grid gap-1 sm:grid-cols-2">
              {['Rakip ve pazar görünümü', 'Kanal önceliklendirme', 'İlk 90 gün yol haritası', 'Büyüme fırsatları', 'Sistem önerileri'].map((item) => (
                <li key={item} className="flex items-start gap-1.5 text-xs leading-relaxed text-blue-100/80">
                  <span className="text-blue-400">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 border-t border-white/[0.08] pt-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300/80">
              Detaylı Analiz İçin Bilgilerinizi Bırakın
            </p>
            <p className="mt-2 text-xs leading-relaxed text-blue-100/65 sm:text-sm">
              Ön değerlendirme sonucunuza göre markanızı daha detaylı inceleyip size uygulanabilir bir büyüme yol
              haritası sunabiliriz.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 grid gap-4 sm:grid-cols-2">
              {/* Gerçek honeypot: görünmez (sr-only kırpma), tab sırasına girmez, ekran okuyucudan gizli. */}
              <div aria-hidden="true" className="sr-only">
                <label>
                  Şirket web sitesi
                  <input type="text" name="company_website" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
                </label>
              </div>
              <label className="block">
                <span className={fieldLabelClass}>Ad Soyad</span>
                <input
                  value={formValues.fullName}
                  onChange={(e) => updateField('fullName')(e.target.value)}
                  className={fieldInputClass}
                />
              </label>
              <label className="block">
                <span className={fieldLabelClass}>Firma Adı</span>
                <input
                  value={formValues.company}
                  onChange={(e) => updateField('company')(e.target.value)}
                  className={fieldInputClass}
                />
              </label>
              <label className="block">
                <span className={fieldLabelClass}>Telefon</span>
                <input
                  type="tel"
                  value={formValues.phone}
                  onChange={(e) => updateField('phone')(e.target.value)}
                  className={fieldInputClass}
                />
              </label>
              <label className="block">
                <span className={fieldLabelClass}>E-posta</span>
                <input
                  type="email"
                  value={formValues.email}
                  onChange={(e) => updateField('email')(e.target.value)}
                  className={fieldInputClass}
                />
              </label>
              <label className="block sm:col-span-2">
                <span className={fieldLabelClass}>Web Sitesi / Mağaza Linki</span>
                <input
                  value={formValues.website}
                  onChange={(e) => updateField('website')(e.target.value)}
                  className={fieldInputClass}
                />
              </label>
              <label className="block sm:col-span-2">
                <span className={fieldLabelClass}>Notunuz</span>
                <textarea
                  value={formValues.notes}
                  onChange={(e) => updateField('notes')(e.target.value)}
                  rows={3}
                  className={`${fieldInputClass} resize-none`}
                />
              </label>

              {formError && <p className="text-xs font-medium text-red-300/90 sm:col-span-2">{formError}</p>}
              {submitError && <p className="text-xs font-medium text-red-300/90 sm:col-span-2">{submitError}</p>}

              <label className="flex items-start gap-2.5 sm:col-span-2">
                <input
                  type="checkbox"
                  checked={marketingConsent}
                  onChange={(e) => setMarketingConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-white/20 bg-white/[0.03] text-blue-500 accent-blue-500"
                />
                <span className="text-xs leading-relaxed text-blue-100/65">
                  GloventGlobal tarafından hizmetler, kampanyalar, dijital büyüme içerikleri ve
                  bilgilendirmeler hakkında e-posta, telefon ve WhatsApp üzerinden benimle iletişime
                  geçilmesini kabul ediyorum.
                </span>
              </label>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full border border-blue-400/45 bg-blue-500/10 px-8 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:border-blue-400/75 hover:bg-blue-500/20 hover:shadow-[0_0_36px_-6px_rgba(59,130,246,0.6)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {isSubmitting ? 'Gönderiliyor...' : 'Analiz Talebimi Gönder'}
                </button>
                <p className="mt-3 text-[10px] leading-relaxed text-blue-100/40 sm:col-span-2">
                  Formu göndererek bilgilerinizin talebinizin değerlendirilmesi ve sizinle iletişime geçilmesi
                  amacıyla işlenmesini kabul etmiş olursunuz. Detaylı bilgi için{' '}
                  <a href="/kvkk" className="underline hover:text-blue-200">
                    KVKK Aydınlatma Metni
                  </a>
                  &apos;ni inceleyebilirsiniz.
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

      {stage === 'success' && (
        <div className="py-2 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-blue-400/45 bg-blue-500/10 text-blue-300">
            <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
              <path d="M4 10.5L8 14.5L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <h3 className="mt-4 text-xl font-semibold text-white">Analiz talebiniz alındı.</h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-blue-100/70">
            Cevaplarınıza göre markanız için ön değerlendirme oluşturuldu. Ekibimiz 24-48 saat içinde detaylı analiz
            için sizinle iletişime geçecektir.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-full border border-white/15 px-8 py-2.5 text-sm font-semibold text-white/85 transition-all duration-200 hover:border-white/35 hover:text-white"
            >
              Kapat
            </button>
            <Link
              href="/hizmetler"
              className="rounded-full border border-blue-400/45 bg-blue-500/10 px-8 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:border-blue-400/75 hover:bg-blue-500/20"
            >
              Hizmetleri İncele
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}