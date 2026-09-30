'use client';

import { useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { trackEvent } from '@/lib/analytics';
import { focusRing } from '@/components/redesign/service-detail/RDServiceDetailPrimitives';
import { questions, isQuestionAnswered, parseAnswers, type Answers, type QuestionId } from '@/lib/analysis/questions';
import {
  GLO_MODE_EVENT,
  OTHER_CHANNEL,
  OTHER_CHANNEL_LIMIT,
  OTHER_CHANNEL_NOTE,
  createGloState,
  otherCurrentNames,
  upsertNoteLine,
  withProductNote,
  type GloState,
} from '@/lib/glo/state';
import type { GloAiMode, GloSurface } from '@/lib/glo/flag';
import {
  READINESS_COPY,
  READINESS_LEVELS,
  getGrowthScore,
  getReadinessLevel,
  getReasonText,
  getRecommendations,
  priorityLabel,
} from '@/lib/analysis/engine';
import { getAnalysisService } from '@/lib/analysis/services';
import {
  ANALYSIS_LIMITS,
  normalizeAnalysisContact,
  validateAnalysisContact,
  type AnalysisErrors,
  type AnalysisField,
} from '@/lib/analysis/lead';

// Ücretsiz Global Büyüme Analizi — /redesign/analiz sayfası (variant "page") ve AnalysisWidget modalı
// (variant "modal") için TEK ortak akış. Sorular/skor/öneriler lib/analysis'ten gelir; iç skor kullanıcıya
// sayı olarak gösterilmez, yalnızca "Global Büyüme Hazırlık Seviyesi"ne eşlenir.
// analyticsPrefix: preview'de 'redesign_', production'da ''. Event'lerde PII yok.

// Glo (lib/glo/flag gloSurface):
// - 'live' (canlı erken erişim): Glo sohbeti (GloPanel) varsayılan açılır; AI sağlayıcısına bağlı değildir. AI
//   kapalıyken sohbet sabit soru/seçeneklerle deterministik ilerler (genel serbest metin ve yapay yanıt yok; yalnız
//   ürün/hizmet sorusunda olduğu gibi saklanan kısa metin); AI açıksa
//   serbest metin gerçek sağlayıcıya gider. 7 adımlı form yalnız "Form ile devam et" ile açılır (cevaplar korunur).
//   Başvuru ve analitik normal akıştaki gibi çalışır.
// - 'prototype' (yalnız yerel, ?glo=1): Glo bir kez açıldıysa bu akıştan başvuru GÖNDERİLMEZ, analitik atılmaz.
// - 'off': akış aynen. Panel ayrı chunk olarak ancak açılınca yüklenir.
const GloPanel = dynamic(() => import('./glo/GloPanel'), {
  ssr: false,
  loading: () => <p className="py-10 text-center text-[14px] text-[#5A5A6A]">Glo yükleniyor…</p>,
});
const subscribeNoop = () => () => {};
const readGloParam = () => new URLSearchParams(window.location.search).get('glo') === '1';

type Stage = 'quiz' | 'results' | 'success';
type Variant = 'page' | 'modal';

const EMPTY_FORM = { fullName: '', company: '', phone: '', email: '', website: '', notes: '' };
const FIELD_ORDER: AnalysisField[] = ['fullName', 'company', 'contactMethod', 'email', 'phone', 'website', 'notes'];
const DETAIL_ITEMS = ['Rakip ve pazar görünümü', 'Kanal önceliklendirme', 'İlk 90 gün yol haritası', 'Büyüme fırsatları', 'Sistem önerileri'];
const GENERIC_ERROR = 'Analiz talebiniz şu anda gönderilemedi. Lütfen tekrar deneyin veya iletişim sayfasından bize ulaşın.';

export default function AnalysisFlow({
  variant,
  leadSource,
  analyticsPrefix = '',
  onRequestClose,
  onSuccess,
  gloSurface = 'off',
  gloAi = 'off',
}: {
  variant: Variant;
  leadSource: 'analysis-page' | 'analysis-widget';
  analyticsPrefix?: string;
  onRequestClose?: (opts?: { restoreFocus?: boolean }) => void;
  onSuccess?: () => void;
  /** Glo yüzeyi (lib/glo/flag). 'prototype' ayrıca URL'de ?glo=1 ister; 'live' herkese açılır. */
  gloSurface?: GloSurface;
  /** AI sohbet modu (lib/glo/flag gloAiMode). Canlıda 'off' → sohbet yok, karşılama + normal form. */
  gloAi?: GloAiMode;
}) {
  const uid = useId().replace(/:/g, '');
  const id = (name: string) => `af-${uid}-${name}`;
  const source = `${analyticsPrefix}${variant === 'modal' ? 'analysis_modal' : 'analysis_page'}`;

  const [stage, setStage] = useState<Stage>('quiz');
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [form, setForm] = useState(EMPTY_FORM);
  // Kanal sorusunda "Diğer" seçildiyse listede olmayan kanalın kısa adı (ör. Trendyol).
  const [otherChannel, setOtherChannel] = useState('');
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [hp, setHp] = useState(''); // gerçek honeypot
  const [errors, setErrors] = useState<AnalysisErrors>({});
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const gloRequested = useSyncExternalStore(subscribeNoop, readGloParam, () => false);
  const gloEnabled = gloSurface === 'live' || (gloSurface === 'prototype' && gloRequested);
  // Kullanıcının açıkça seçtiği mod (null = henüz seçmedi). Prototip açıkken varsayılan Glo'dur.
  const [modeChoice, setMode] = useState<'form' | 'glo' | null>(null);
  const mode: 'form' | 'glo' = modeChoice ?? (gloEnabled ? 'glo' : 'form');
  // null = Glo oturumu yok. Doluysa bu akış prototip oturumudur: gönderim ve analitik kapalı. Prototip
  // açıkken (bayrak + ?glo=1) Glo doğrudan açılır → oturum da ilk andan başlamış sayılır (autoGlo).
  const [gloState, setGloState] = useState<GloState | null>(null);
  const autoGlo = useMemo(() => createGloState(0, { ai: gloAi !== 'off' }), [gloAi]);
  const glo = gloState ?? (gloEnabled ? autoGlo : null);
  const setGlo = (next: GloState | null | ((g: GloState | null) => GloState | null)) =>
    setGloState((prev) => (typeof next === 'function' ? next(prev ?? (gloEnabled ? autoGlo : null)) : next));
  // Glo kullanıcı eylemiyle açıldıysa panel ilk seçeneğe odaklanır; otomatik açılışta odak çalınmaz.
  const [gloFocus, setGloFocus] = useState(false);
  // Yalnız yerel prototip oturumu başvuruyu ve analitiği kapatır; canlı erken erişimde normal akış geçerlidir.
  const prototypeSession = gloSurface === 'prototype' && Boolean(glo);

  const questionRef = useRef<HTMLHeadingElement>(null);
  const resultRef = useRef<HTMLHeadingElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const started = useRef(false);
  const mounted = useRef(false);

  // Modal root layout'ta yaşadığı için client-side navigation'da unmount olmaz. Modal variant'ta akış
  // içindeki bir link (öneri, Hizmetleri İncele, KVKK/Gizlilik) aynı sekmede açılırken modal kapatılır;
  // odak eski sayfadaki tetikleyiciye döndürülmez (yeni sayfaya gidiliyor). Yeni sekme/pencere
  // tıklamalarında (Ctrl/Cmd/Shift/orta tuş) modal açık kalır. Page variant'ta handler yok.
  const closeOnNavigate =
    variant === 'modal' && onRequestClose
      ? (e: React.MouseEvent<HTMLAnchorElement>) => {
          if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
          onRequestClose({ restoreFocus: false });
        }
      : undefined;

  const question = questions[stepIndex];
  const isLast = stepIndex === questions.length - 1;
  const answered = isQuestionAnswered(answers, question);

  const score = useMemo(() => getGrowthScore(answers), [answers]);
  const level = getReadinessLevel(score);
  const recommendations = useMemo(() => getRecommendations(answers).map(({ tag }) => getAnalysisService(tag)), [answers]);
  const reason = useMemo(() => getReasonText(answers), [answers]);

  // Odak yönetimi: adım değişince yeni soru başlığına, sonuç/başarı ekranında o ekranın başlığına.
  // İlk render'da odak çalınmaz (sayfada kullanıcı henüz akışa girmedi; modal kendi odağını yönetir).
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (stage === 'quiz' && mode === 'form') questionRef.current?.focus();
    if (stage === 'results') resultRef.current?.focus();
    if (stage === 'success') successRef.current?.focus();
  }, [stage, stepIndex, mode]);

  // Prototip oturumunda analitik olay atılmaz.
  const track = (name: string, params?: Record<string, unknown>) => {
    if (prototypeSession) return;
    trackEvent(name, params);
  };

  const markStarted = () => {
    if (started.current) return;
    started.current = true;
    track('analysis_start', { source });
  };

  const select = (qid: QuestionId, option: string, multi: boolean) => {
    markStarted();
    // Glo'nun kanal cevabından türettiği satış hacmi, kanal formda değişince geçersizleşir.
    const clearInferred = qid === 'channels' && Boolean(glo?.inferredVolume);
    setAnswers((prev) => {
      let next: Answers;
      if (!multi) next = { ...prev, [qid]: option };
      else {
        const current = Array.isArray(prev[qid]) ? (prev[qid] as string[]) : [];
        next = { ...prev, [qid]: current.includes(option) ? current.filter((o) => o !== option) : [...current, option] };
      }
      if (clearInferred) delete next.salesVolume;
      return next;
    });
    if (clearInferred) setGlo((g) => g && { ...g, inferredVolume: false });
  };

  // Glo paneli görünürken modal/sayfa üst metni sadeleşir (GLO_MODE_EVENT; yalnız olay yayınlanır).
  const gloVisible = stage === 'quiz' && mode === 'glo' && Boolean(glo);
  useEffect(() => {
    window.dispatchEvent(new CustomEvent(GLO_MODE_EVENT, { detail: { variant, active: gloVisible } }));
  }, [gloVisible, variant]);
  const changeMode = (next: 'form' | 'glo') => setMode(next);

  const openGlo = () => {
    const answeredCount = questions.filter((q) => isQuestionAnswered(answers, q)).length;
    // Formda/sonuç ekranında yazılmış kendi notu varsa elle düzenlenmiş not olarak Glo özetine taşınır (ezilmez).
    const ownNotes = (g: GloState | null) => (form.notes && form.notes !== g?.notesSent ? { notesRaw: form.notes } : {});
    // Formda yazılan "Diğer" kanal adı Glo'ya taşınır (Glo aynı adı tekrar sormaz).
    const name = isSelected('channels', OTHER_CHANNEL) ? otherChannel.replace(/\s+/g, ' ').trim().slice(0, OTHER_CHANNEL_LIMIT) : '';
    const withOther = (g: GloState): GloState =>
      name ? { ...g, otherChannels: [...(g.otherChannels ?? []).filter((o) => o.status !== 'current'), { name, status: 'current' }] } : g;
    setGlo((g) =>
      g
        ? {
            ...withOther(g),
            ...ownNotes(g),
            messages: [...g.messages, { id: g.nextId, from: 'glo', tone: 'note', text: 'Formdaki cevaplarınızı da aldım; kaldığımız yerden devam edelim.' }],
            nextId: g.nextId + 1,
          }
        : { ...withOther(createGloState(answeredCount, { ai: gloAi !== 'off' })), ...ownNotes(null) },
    );
    setGloFocus(true);
    changeMode('glo');
  };

  // `notes`: Glo'da toplanan, forma karşılığı olmayan bağlam (başlangıç noktası, ürün/hizmet, hedef…). Formun not
  // alanı boşsa ya da son aktarılan Glo notunu taşıyorsa güncellenir; kullanıcının kendi notu varsa ezilmez, yalnız
  // ürün/hizmet satırı eklenir/güncellenir.
  const switchToForm = (notes?: string) => {
    const firstMissing = questions.findIndex((q) => !isQuestionAnswered(answers, q));
    setStepIndex(firstMissing === -1 ? questions.length - 1 : firstMissing);
    // Glo'da alınan "Diğer" kanal adı formdaki kısa alana taşınır.
    const gloOther = otherCurrentNames(glo);
    if (gloOther) setOtherChannel(gloOther);
    if (notes !== undefined) {
      const next =
        !form.notes || form.notes === glo?.notesSent
          ? notes
          : upsertNoteLine(withProductNote(form.notes, glo?.product), OTHER_CHANNEL_NOTE, gloOther || undefined);
      setForm((f) => ({ ...f, notes: next }));
      setGlo((g) => g && { ...g, notesSent: next });
    } else setGlo((g) => g); // otomatik açılan oturumu kalıcılaştır: forma dönülse de gönderim engeli sürer
    changeMode('form');
  };

  // Sonuç görüntüleme olayı aynı cevaplarla bir kez atılır (çift tıklama / sonuca tekrar dönüş mükerrer saymaz).
  // Parametreler formdaki olayla aynıdır: cevap veya serbest metin içermez. Çerez izni trackEvent'te denetlenir.
  const resultTracked = useRef<string | null>(null);
  const completeGlo = (notes: string) => {
    if (!parseAnswers(answers)) return;
    const key = JSON.stringify(answers);
    if (resultTracked.current !== key) {
      resultTracked.current = key;
      track('analysis_result_view', {
        source,
        readiness_level: level,
        recommended_services: recommendations.map((r) => r.tag).join(','),
      });
    }
    setForm((f) => ({ ...f, notes }));
    setGlo((g) => g && { ...g, notesSent: notes });
    setStage('results');
  };

  const isSelected = (qid: QuestionId, option: string) => {
    const v = answers[qid];
    return Array.isArray(v) ? v.includes(option) : v === option;
  };

  const next = () => {
    if (!answered) return;
    track('analysis_step_complete', { source, step_number: stepIndex + 1, question_id: question.id });
    if (isLast) {
      track('analysis_result_view', {
        source,
        readiness_level: level,
        recommended_services: recommendations.map((r) => r.tag).join(','),
      });
      // "Diğer" kanalın adı notta taşınır (mevcut not ezilmez; "Diğer" kaldırıldıysa satır da kalkar).
      const name = isSelected('channels', OTHER_CHANNEL) ? otherChannel.replace(/\s+/g, ' ').trim() : '';
      setForm((f) => ({ ...f, notes: upsertNoteLine(f.notes, OTHER_CHANNEL_NOTE, name || undefined) }));
      setStage('results');
      return;
    }
    setStepIndex((i) => i + 1);
  };

  const back = () => setStepIndex((i) => Math.max(0, i - 1));

  const editAnswers = () => {
    if (glo && mode === 'glo') {
      // Sonuç ekranındaki not düzenlemesi Glo özetine geri taşınır.
      if (form.notes !== glo.notesSent) setGlo({ ...glo, notesRaw: form.notes });
      setStage('quiz');
      return;
    }
    setStage('quiz');
    setStepIndex(questions.length - 1);
  };

  const restart = () => {
    setStage('quiz');
    setStepIndex(0);
    setAnswers({});
    setForm(EMPTY_FORM);
    setOtherChannel('');
    setMarketingConsent(false);
    setErrors({});
    setServerMessage(null);
  };

  const setField = (field: keyof typeof EMPTY_FORM) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const v = e.target.value;
    setForm((prev) => ({ ...prev, [field]: v }));
    setErrors((prev) => {
      const n = { ...prev };
      delete n[field as AnalysisField];
      if (field === 'email' || field === 'phone') delete n.contactMethod;
      return n;
    });
  };

  const focusFirstError = (errs: AnalysisErrors) => {
    const first = FIELD_ORDER.find((f) => errs[f]);
    if (first) document.getElementById(id(first === 'contactMethod' ? 'phone' : first))?.focus();
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || prototypeSession) return; // yerel prototip oturumu: başvuru gönderilmez
    setServerMessage(null);
    const contact = normalizeAnalysisContact(form);
    const clientErrors = validateAnalysisContact(contact);
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length > 0) {
      focusFirstError(clientErrors);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/analysis-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // growthScore / recommendations bilgi amaçlı gönderiliyor; server answers'tan yeniden hesaplar.
        body: JSON.stringify({
          contact,
          marketingConsent,
          answers,
          recommendations: recommendations.map((r, i) => ({ tag: r.tag, title: r.name, priority: priorityLabel(i) })),
          pageUrl: window.location.href,
          leadSource,
          _hp: hp,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        trackEvent('analysis_form_submit_success', {
          lead_source: leadSource,
          source,
          page_path: window.location.pathname,
          growth_score: score,
          readiness_level: level,
          // DebugView yalnızca development'ta — production'da debug_mode gönderilmez.
          ...(process.env.NODE_ENV !== 'production' ? { debug_mode: true } : {}),
        });
        setStage('success');
        onSuccess?.();
        return;
      }
      if (res.status === 400 && data.errors) {
        setErrors(data.errors as AnalysisErrors);
        setServerMessage('Lütfen işaretli alanları kontrol edin.');
        focusFirstError(data.errors as AnalysisErrors);
        return;
      }
      setServerMessage(res.status === 429 ? 'Çok fazla deneme yapıldı. Lütfen birkaç dakika sonra tekrar deneyin.' : GENERIC_ERROR);
    } catch {
      setServerMessage(GENERIC_ERROR);
    } finally {
      setSubmitting(false);
    }
  };

  // ---------------------------------------------------------------------------
  // Stil sabitleri
  // ---------------------------------------------------------------------------
  const eyebrow = 'text-[11.5px] font-bold uppercase tracking-[0.24em] text-[#1B5CD6]';
  const h3Cls = 'text-[1.2rem] font-extrabold leading-snug text-[#14213F] sm:text-[1.35rem]';
  const primaryBtn = `inline-flex items-center justify-center rounded-full bg-[#14213F] px-7 py-3 text-[15px] font-semibold text-white motion-safe:transition-colors hover:bg-[#1B5CD6] disabled:cursor-not-allowed disabled:bg-[#14213F]/35 ${focusRing}`;
  const secondaryBtn = `inline-flex items-center justify-center rounded-full border border-[#D6D6DC] bg-white px-6 py-3 text-[15px] font-semibold text-[#14213F] motion-safe:transition-colors hover:border-[#1B5CD6] hover:text-[#1B5CD6] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#D6D6DC] disabled:hover:text-[#14213F] ${focusRing}`;
  const labelCls = 'block text-[13.5px] font-semibold text-[#14213F]';
  const inputCls = (invalid: boolean) =>
    `mt-2 block w-full rounded-xl border bg-white px-4 py-3 text-[16px] text-[#14213F] outline-none motion-safe:transition-colors placeholder:text-[#8A8A96] focus:border-[#1B5CD6] focus:ring-4 focus:ring-[#1B5CD6]/15 ${
      invalid ? 'border-[#B42318]' : 'border-[#D6D6DC] hover:border-[#B8B8C2]'
    }`;
  const errText = (name: string, msg?: string) =>
    msg ? (
      <p id={id(`${name}-err`)} className="mt-1.5 text-[13px] font-medium text-[#B42318]">
        {msg}
      </p>
    ) : null;
  const describe = (...ids: (string | false)[]) => ids.filter(Boolean).join(' ') || undefined;

  // ---------------------------------------------------------------------------
  // QUIZ
  // ---------------------------------------------------------------------------
  if (stage === 'quiz' && mode === 'glo' && glo) {
    return (
      <GloPanel
        answers={answers}
        glo={glo}
        headingLevel={variant === 'page' ? 'h2' : 'h3'}
        onChange={(next) => {
          markStarted();
          setAnswers(next.answers);
          setGlo(next.glo);
        }}
        onSwitchToForm={switchToForm}
        onComplete={completeGlo}
        aiMode={gloAi}
        surface={gloSurface}
        variant={variant}
        autoFocus={gloFocus}
      />
    );
  }

  if (stage === 'quiz') {
    const progress = Math.round(((stepIndex + 1) / questions.length) * 100);
    return (
      <div>
        {variant === 'page' && <h2 className="sr-only">Ön Değerlendirme Soruları</h2>}
        <div className="flex items-center justify-between gap-4">
          <p id={id('step')} className={eyebrow}>
            Adım {stepIndex + 1} / {questions.length}
          </p>
          {gloEnabled && (
            <button
              type="button"
              onClick={openGlo}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full border border-[#E5E5EC] bg-white py-1.5 pl-1.5 pr-3.5 text-[13px] font-semibold text-[#14213F] motion-safe:transition-colors hover:border-[#1B5CD6] hover:text-[#1B5CD6] ${focusRing}`}
            >
              <Image src="/images/glo/glo-avatar-216.webp" alt="" width={24} height={24} sizes="24px" quality={100} className="h-6 w-6 object-contain" />
              Glo ile konuş
            </button>
          )}
        </div>
        <div
          role="progressbar"
          aria-labelledby={id('step')}
          aria-valuemin={1}
          aria-valuemax={questions.length}
          aria-valuenow={stepIndex + 1}
          aria-valuetext={`Adım ${stepIndex + 1} / ${questions.length}`}
          className="mt-3 h-1 w-full overflow-hidden rounded-full bg-[#E8E8EE]"
        >
          <div className="h-full rounded-full bg-[#1B5CD6] motion-safe:transition-[width] motion-safe:duration-300" style={{ width: `${progress}%` }} />
        </div>

        <h3 id={id('q')} ref={questionRef} tabIndex={-1} className="mt-6 scroll-mt-28 text-[1.35rem] font-extrabold leading-snug text-[#14213F] outline-none sm:text-[1.6rem]">
          {question.title}
        </h3>
        {(question.subtitle || question.multi) && (
          <p id={id('q-hint')} className="mt-2 text-[14px] leading-relaxed text-[#5A5A6A]">
            {question.multi ? 'Birden fazla seçenek işaretleyebilirsiniz.' : question.subtitle}
          </p>
        )}

        <div
          role="group"
          aria-labelledby={id('q')}
          aria-describedby={question.subtitle || question.multi ? id('q-hint') : undefined}
          className="mt-5 grid gap-2.5 sm:grid-cols-2"
        >
          {question.options.map((option) => {
            const selected = isSelected(question.id, option);
            return (
              <button
                key={option}
                type="button"
                onClick={() => select(question.id, option, question.multi)}
                {...(question.multi ? { role: 'checkbox', 'aria-checked': selected } : { 'aria-pressed': selected })}
                className={`flex min-h-[52px] w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-[15px] font-medium leading-snug text-[#14213F] motion-safe:transition-colors ${focusRing} ${
                  selected
                    ? 'border-[#1B5CD6] bg-[#EEF3FD] shadow-[inset_0_0_0_1px_#1B5CD6]'
                    : 'border-[#D6D6DC] bg-white hover:border-[#1B5CD6]/60 hover:bg-[#F6F8FD]'
                }`}
              >
                {question.multi ? (
                  <span
                    aria-hidden="true"
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border-2 ${selected ? 'border-[#1B5CD6] bg-[#1B5CD6]' : 'border-[#A9ABB6] bg-white'}`}
                  >
                    {selected && (
                      <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
                        <path d="M3.5 8.5l3 3 6-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                ) : (
                  <span
                    aria-hidden="true"
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${selected ? 'border-[#1B5CD6]' : 'border-[#A9ABB6]'}`}
                  >
                    {selected && <span className="h-2.5 w-2.5 rounded-full bg-[#1B5CD6]" />}
                  </span>
                )}
                <span>{option}</span>
              </button>
            );
          })}
        </div>
        {question.id === 'channels' && isSelected('channels', OTHER_CHANNEL) && (
          // Listede olmayan kanalın adı: hiçbir kanala eşlenmez, puana katılmaz; başvuru notunda taşınır.
          <div className="mt-4">
            <label htmlFor={id('other-channel')} className={labelCls}>
              Diğer kanalın adı <span className="font-normal text-[#5A5A6A]">(isteğe bağlı)</span>
            </label>
            <input
              id={id('other-channel')}
              type="text"
              autoComplete="off"
              maxLength={OTHER_CHANNEL_LIMIT}
              value={otherChannel}
              onChange={(e) => setOtherChannel(e.target.value)}
              placeholder="Örn. Trendyol"
              className={inputCls(false)}
            />
          </div>
        )}

        <div className="mt-7 flex items-center justify-between gap-3">
          <button type="button" onClick={back} disabled={stepIndex === 0} className={secondaryBtn}>
            Geri
          </button>
          <button type="button" onClick={next} disabled={!answered} aria-describedby={!answered ? id('next-hint') : undefined} className={primaryBtn}>
            {isLast ? 'Ön Değerlendirmeyi Gör' : 'İleri'}
          </button>
        </div>
        <p id={id('next-hint')} className="sr-only">
          Devam etmek için bir seçenek işaretleyin.
        </p>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SUCCESS
  // ---------------------------------------------------------------------------
  if (stage === 'success') {
    return (
      <div role="status" className="py-4 text-center sm:py-8">
        <span aria-hidden="true" className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#1B5CD6]/50 text-[#1B5CD6]">
          <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
            <path d="M4 10.5L8 14.5L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h2 ref={successRef} tabIndex={-1} className="mt-5 text-[1.5rem] font-extrabold text-[#14213F] outline-none">
          Analiz talebiniz alındı.
        </h2>
        <p className="mx-auto mt-3 max-w-[46ch] text-[15.5px] leading-relaxed text-[#4A4A5A]">
          Cevaplarınıza göre markanız için ön değerlendirme oluşturuldu. Ekibimiz 24-48 saat içinde detaylı analiz için sizinle
          iletişime geçecektir.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {variant === 'modal' && onRequestClose ? (
            <button type="button" onClick={() => onRequestClose()} className={secondaryBtn}>
              Kapat
            </button>
          ) : (
            <button type="button" onClick={restart} className={secondaryBtn}>
              Yeni analiz başlat
            </button>
          )}
          <Link href="/hizmetler" onClick={closeOnNavigate} className={primaryBtn}>
            Hizmetleri İncele
          </Link>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // RESULTS — sıra: değerlendirme (seviye + fırsat) → 3 sistem → form → neden → detaylı analiz
  // ---------------------------------------------------------------------------
  const levelIndex = READINESS_LEVELS.indexOf(level);
  return (
    <div>
      {prototypeSession && (
        <p className="mb-5 rounded-xl border border-[#C9A876]/70 bg-[#F6F1E7] px-4 py-3 text-[13.5px] leading-relaxed text-[#6B5A36]">
          <strong className="font-semibold">Etkileşim prototipi · AI bağlı değil.</strong> Bu akıştan başvuru gönderilmez. Aşağıdaki
          değerlendirme mevcut analiz formunun sabit kurallarıyla hesaplanır.
        </p>
      )}
      <p className="sr-only" aria-live="polite">
        Ön değerlendirme hazır. Global büyüme hazırlık seviyeniz: {level}.
      </p>

      {/* Signature koyu sonuç başlığı — skor paneli değil; seviye + fırsat alanı. */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0F1E3C] p-6 text-white sm:p-8">
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1B5CD6] to-[#C9A876]" />
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h2 ref={resultRef} tabIndex={-1} className="scroll-mt-28 text-[11.5px] font-bold uppercase tracking-[0.24em] text-[#C9A876] outline-none">
            İlk Değerlendirme Tamamlandı
          </h2>
          <button
            type="button"
            onClick={editAnswers}
            className="rounded text-[13px] font-semibold text-white/75 underline decoration-white/30 underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Cevaplarımı düzenle
          </button>
        </div>

        <p className="mt-5 text-[13.5px] font-semibold text-white/70">Global Büyüme Hazırlık Seviyesi</p>
        <p className="mt-1 text-[2rem] font-extrabold leading-tight tracking-tight sm:text-[2.3rem]">{level}</p>
        <ol aria-label="Hazırlık seviyeleri" className="mt-3 grid max-w-[360px] grid-cols-3 gap-1.5">
          {READINESS_LEVELS.map((l, i) => (
            <li key={l} aria-current={l === level ? 'step' : undefined}>
              <span aria-hidden="true" className={`block h-1.5 rounded-full ${i <= levelIndex ? 'bg-[#C9A876]' : 'bg-white/15'}`} />
              <span className={`mt-1.5 block text-[12px] ${l === level ? 'font-bold text-white' : 'text-white/55'}`}>{l}</span>
            </li>
          ))}
        </ol>
        <p className="mt-4 max-w-[60ch] text-[14.5px] leading-relaxed text-white/75">{READINESS_COPY[level]}</p>

        <div className="mt-6 border-t border-white/10 pt-5">
          <p className="text-[13.5px] font-semibold text-white/70">En Büyük Fırsat Alanı</p>
          <p className="mt-1.5 max-w-[62ch] text-[15.5px] font-medium leading-relaxed text-white">{reason}</p>
        </div>
      </div>

      {/* Size önerilen 3 sistem — sonuç lead-wall arkasında değil. */}
      <p className={`mt-8 ${eyebrow}`}>Size Önerilen 3 Sistem</p>
      <ol className="mt-3 grid gap-3 md:grid-cols-3">
        {recommendations.map((s, i) => (
          <li key={s.tag}>
            <Link
              href={s.href}
              onClick={closeOnNavigate}
              className={`group flex h-full flex-col rounded-2xl border border-[#E5E5EC] bg-white p-5 motion-safe:transition-colors hover:border-[#1B5CD6] ${focusRing}`}
            >
              <span className={`self-start rounded-full px-2.5 py-1 text-[11.5px] font-bold ${i === 0 ? 'bg-[#14213F] text-white' : 'bg-[#F1EDE4] text-[#6B5A36]'}`}>
                {priorityLabel(i)}
              </span>
              <h3 className="mt-3 text-[16.5px] font-bold leading-snug text-[#14213F] group-hover:text-[#1B5CD6]">{s.name}</h3>
              <span className="mt-auto pt-3 text-[13.5px] font-semibold text-[#1B5CD6]">
                Hizmeti İncele <span aria-hidden="true">→</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-[13px] leading-relaxed text-[#5A5A6A]">
        Bu sonuç, verdiğiniz cevaplara göre oluşturulan ön değerlendirmedir; kesin bir analiz sonucu değildir.
      </p>

      {/* Lead formu */}
      <section aria-labelledby={id('form-title')} className="mt-8 rounded-2xl border border-[#E5E5EC] bg-[#FAF9F6] p-5 sm:p-7">
        <h3 id={id('form-title')} className={h3Cls}>
          Detaylı Analiz İçin Bilgilerinizi Bırakın
        </h3>
        <p className="mt-2 max-w-[62ch] text-[15px] leading-relaxed text-[#4A4A5A]">
          Ön değerlendirme sonucunuza göre markanızı daha detaylı inceleyip size uygulanabilir bir büyüme yol haritası sunabiliriz.
        </p>

        <form noValidate onSubmit={submit} aria-describedby={id('req-note')} className="mt-5">
          {/* Gerçek honeypot: görünmez (sr-only kırpma), tab sırasına girmez, ekran okuyucudan gizli. */}
          <div aria-hidden="true" className="sr-only">
            <label>
              Şirket web sitesi
              <input type="text" name="company_website" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
            </label>
          </div>

          <p id={id('req-note')} className="text-[13px] text-[#5A5A6A]">
            <span aria-hidden="true">*</span> ile işaretli alanlar zorunludur. Telefon veya e-postanın en az biri gereklidir.
          </p>

          {serverMessage && (
            <div role="alert" className="mt-4 rounded-xl border border-[#F3C9C5] bg-[#FEF3F2] px-4 py-3 text-[14px] font-medium text-[#912018]">
              {serverMessage}
            </div>
          )}

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor={id('fullName')} className={labelCls}>
                Ad Soyad <span aria-hidden="true" className="text-[#B42318]">*</span>
              </label>
              <input
                id={id('fullName')} name="fullName" type="text" autoComplete="name" required maxLength={ANALYSIS_LIMITS.fullName}
                value={form.fullName} onChange={setField('fullName')} aria-invalid={!!errors.fullName}
                aria-describedby={describe(!!errors.fullName && id('fullName-err'))} className={inputCls(!!errors.fullName)}
              />
              {errText('fullName', errors.fullName)}
            </div>
            <div>
              <label htmlFor={id('company')} className={labelCls}>
                Firma Adı <span aria-hidden="true" className="text-[#B42318]">*</span>
              </label>
              <input
                id={id('company')} name="company" type="text" autoComplete="organization" required maxLength={ANALYSIS_LIMITS.company}
                value={form.company} onChange={setField('company')} aria-invalid={!!errors.company}
                aria-describedby={describe(!!errors.company && id('company-err'))} className={inputCls(!!errors.company)}
              />
              {errText('company', errors.company)}
            </div>
            <div>
              <label htmlFor={id('phone')} className={labelCls}>Telefon</label>
              <input
                id={id('phone')} name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={ANALYSIS_LIMITS.phone}
                value={form.phone} onChange={setField('phone')} aria-invalid={!!(errors.phone || errors.contactMethod)}
                aria-describedby={describe(!!errors.phone && id('phone-err'), !!errors.contactMethod && id('method-err'))}
                className={inputCls(!!(errors.phone || errors.contactMethod))}
              />
              {errText('phone', errors.phone)}
            </div>
            <div>
              <label htmlFor={id('email')} className={labelCls}>E-posta</label>
              <input
                id={id('email')} name="email" type="email" inputMode="email" autoComplete="email" maxLength={ANALYSIS_LIMITS.email}
                value={form.email} onChange={setField('email')} aria-invalid={!!(errors.email || errors.contactMethod)}
                aria-describedby={describe(!!errors.email && id('email-err'), !!errors.contactMethod && id('method-err'))}
                className={inputCls(!!(errors.email || errors.contactMethod))}
              />
              {errText('email', errors.email)}
            </div>
            {errors.contactMethod && (
              <p id={id('method-err')} className="-mt-2 text-[13px] font-medium text-[#B42318] sm:col-span-2">
                {errors.contactMethod}
              </p>
            )}
            <div className="sm:col-span-2">
              <label htmlFor={id('website')} className={labelCls}>Web Sitesi / Mağaza Linki</label>
              <input
                id={id('website')} name="website" type="text" inputMode="url" autoComplete="url" maxLength={ANALYSIS_LIMITS.website}
                value={form.website} onChange={setField('website')} aria-invalid={!!errors.website}
                aria-describedby={describe(!!errors.website && id('website-err'))} className={inputCls(!!errors.website)}
              />
              {errText('website', errors.website)}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor={id('notes')} className={labelCls}>Notunuz</label>
              <textarea
                id={id('notes')} name="notes" rows={3} maxLength={ANALYSIS_LIMITS.notes}
                value={form.notes} onChange={setField('notes')} aria-invalid={!!errors.notes}
                aria-describedby={describe(!!errors.notes && id('notes-err'))} className={`${inputCls(!!errors.notes)} resize-y`}
              />
              {errText('notes', errors.notes)}
            </div>
          </div>

          <div className="mt-5 flex items-start gap-3">
            <input
              id={id('consent')} name="marketingConsent" type="checkbox" checked={marketingConsent}
              onChange={(e) => setMarketingConsent(e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 rounded border-[#B8B8C2] accent-[#1B5CD6]"
            />
            <label htmlFor={id('consent')} className="text-[13.5px] leading-relaxed text-[#4A4A5A]">
              GloventGlobal’in hizmetler, kampanyalar ve dijital büyüme içerikleri hakkında e-posta ve telefon yoluyla benimle iletişime
              geçmesini kabul ediyorum. (Opsiyonel)
            </label>
          </div>

          {prototypeSession ? (
            <p className="mt-6 inline-flex w-full justify-center rounded-full border-2 border-dashed border-[#6B5A36]/60 px-6 py-3 text-[15px] font-semibold text-[#6B5A36] sm:w-auto">
              Prototip — başvuru gönderilmez
            </p>
          ) : (
            <button type="submit" disabled={submitting} className={`mt-6 w-full sm:w-auto ${primaryBtn}`}>
              {submitting ? 'Gönderiliyor…' : 'Analiz Talebimi Gönder'}
            </button>
          )}
          <p className="mt-4 text-[12.5px] leading-relaxed text-[#5A5A6A]">
            Formu göndererek bilgilerinizin talebinizin değerlendirilmesi ve sizinle iletişime geçilmesi amacıyla işlenmesini kabul etmiş
            olursunuz. Detaylı bilgi için{' '}
            <Link href="/kvkk" onClick={closeOnNavigate} className={`rounded font-semibold text-[#1B5CD6] underline underline-offset-2 hover:text-[#14213F] ${focusRing}`}>
              KVKK Aydınlatma Metni
            </Link>{' '}
            ve{' '}
            <Link href="/gizlilik-politikasi" onClick={closeOnNavigate} className={`rounded font-semibold text-[#1B5CD6] underline underline-offset-2 hover:text-[#14213F] ${focusRing}`}>
              Gizlilik Politikası
            </Link>
            ’nı inceleyebilirsiniz.
          </p>
        </form>
      </section>

      {/* Neden bu sistemler? — her önerinin gerçek hizmet açıklaması (/hizmetler verisi). */}
      <section aria-labelledby={id('why')} className="mt-10">
        <h3 id={id('why')} className={h3Cls}>
          Neden Bu Sistemler?
        </h3>
        <ol className="mt-4 divide-y divide-[#E5E5EC] border-y border-[#E5E5EC]">
          {recommendations.map((s, i) => (
            <li key={s.tag} className="flex gap-4 py-4">
              <span aria-hidden="true" className="pt-0.5 text-[13px] font-bold text-[#1B5CD6]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <p className="text-[15.5px] font-bold text-[#14213F]">{s.name}</p>
                <p className="mt-1 text-[14.5px] leading-relaxed text-[#4A4A5A]">{s.summary}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby={id('detail')} className="mt-10">
        <h3 id={id('detail')} className={h3Cls}>
          Detaylı Analizde Ne Alacaksınız?
        </h3>
        <p className="mt-2 max-w-[62ch] text-[15px] leading-relaxed text-[#4A4A5A]">
          Bilgilerinizi bıraktığınızda markanızın mevcut yapısını daha detaylı inceleyerek size uygulanabilir bir büyüme yönü sunabiliriz.
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {DETAIL_ITEMS.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[15px] text-[#14213F]">
              <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="mt-1 h-4 w-4 shrink-0 text-[#1B5CD6]">
                <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
