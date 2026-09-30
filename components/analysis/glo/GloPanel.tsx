'use client';

import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import './glo-avatar.css';
import { focusRing } from '@/components/redesign/service-detail/RDServiceDetailPrimitives';
import { parseAnswers, type Answers, type QuestionId } from '@/lib/analysis/questions';
import { GLO_WELCOME, type GloField, type GloMessage, type GloState } from '@/lib/glo/state';
import {
  FIELD_LABEL,
  MESSAGE_LIMIT,
  NOTES_LIMIT,
  composeNotes,
  contextValue,
  formatAnswer,
  notesExtra,
  promptFor,
  respond,
  showsTarget,
  shortSummary,
  AI_FAILURE_TEXT,
  applyAiFailure,
  applyAiResult,
  buildTurnRequest,
  type GloInput,
  type Prompt,
} from '@/lib/glo/prototype';
import { checkAiResult } from '@/lib/glo/ai/schema';
import type { GloAiMode, GloSurface } from '@/lib/glo/flag';

// Glo etkileşim prototipi paneli (Aşama A) + yerel AI denemesi (Aşama B1, aiMode !== 'off'). Storage veya
// analitik YOK; tüm durum AnalysisFlow'daki bellek state'inde. AI modunda yalnızca serbest metin
// /api/glo/turn'e gider (seçenek düğmeleri model çağırmaz); aynı anda tek istek, panel kapanınca iptal. Yalnızca GLO_PROTOTYPE izni + ?glo=1 ile AnalysisFlow tarafından
// lazy yüklenir. Geçmiş (log) ile güncel soru ayrıdır: yeni soru her zaman altta görünür, log yalnızca
// kullanıcı en alttaysa kaydırılır.

const chipBase = `inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 py-2 text-left text-[14.5px] font-medium leading-snug text-[#14213F] motion-safe:transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${focusRing}`;
const chipIdle = 'border-[#D6D6DC] bg-white hover:border-[#1B5CD6]/60 hover:bg-[#F6F8FD]';
const chipOn = 'border-[#1B5CD6] bg-[#EEF3FD] shadow-[inset_0_0_0_1px_#1B5CD6]';
const primaryBtn = `inline-flex items-center justify-center rounded-full bg-[#14213F] px-6 py-3 text-[15px] font-semibold text-white motion-safe:transition-colors hover:bg-[#1B5CD6] disabled:cursor-not-allowed disabled:bg-[#14213F]/35 ${focusRing}`;
const linkBtn = `rounded text-[13px] font-semibold text-[#1B5CD6] underline decoration-[#1B5CD6]/35 underline-offset-4 hover:text-[#14213F] ${focusRing}`;

export default function GloPanel({
  answers,
  glo,
  headingLevel,
  onChange,
  onSwitchToForm,
  onComplete,
  aiMode = 'off',
  surface = 'prototype',
  variant = 'modal',
  autoFocus = false,
}: {
  aiMode?: GloAiMode;
  /** 'live': canlı erken erişim (etiket "Erken erişim"); 'prototype': yerel test etiketleri. */
  surface?: GloSurface;
  /** 'page': /analiz kartı (xl+ iki sütunlu karşılama); 'modal': üst üste. */
  variant?: 'page' | 'modal';
  /** Panel kullanıcı eylemiyle açıldıysa ilk seçeneğe odaklan. */
  autoFocus?: boolean;
  answers: Answers;
  glo: GloState;
  headingLevel: 'h2' | 'h3';
  onChange: (next: { answers: Answers; glo: GloState }) => void;
  onSwitchToForm: () => void;
  onComplete: (notes: string) => void;
}) {
  const uid = useId().replace(/:/g, '');
  const id = (n: string) => `glo-${uid}-${n}`;
  const prompt = promptFor(answers, glo);
  const messages = glo.messages;

  const [text, setText] = useState('');
  // Avatarın açılış hareketi panel her açıldığında bir kez oynar; bitince (veya AI beklemesi başlayınca) kapanır.
  const [greeted, setGreeted] = useState(false);
  // Özetteki "Tüm cevaplar" listesi, bir cevap düzenlenip özete dönülünce açık kalır.
  const [showAll, setShowAll] = useState(false);
  const over = text.length > MESSAGE_LIMIT;

  const logRef = useRef<HTMLDivElement>(null);
  const atBottomRef = useRef(true);
  const [atBottom, setAtBottom] = useState(true);
  const [seen, setSeen] = useState(messages.length);
  const liveRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLDivElement>(null);
  const focusAfter = useRef(false);

  const apply = (input: GloInput, moveFocus: boolean) => {
    if (pendingText !== null) return;
    focusAfter.current = moveFocus;
    onChange(respond(answers, glo, input));
  };

  // AI isteği: tek seferde bir tane; forma geçiş / modal kapanması (unmount) isteği iptal eder ve geç gelen
  // yanıt yazılmaz. Hata, zaman aşımı, kota veya geçersiz çıktıda cevaplar değişmez; otomatik tekrar yok.
  const [pendingText, setPendingText] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  useEffect(() => () => abortRef.current?.abort(), []);
  const aiSend = async (t: string) => {
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    const snapshot = { answers, glo };
    setPendingText(t);
    setGreeted(true);
    setText('');
    let result = null;
    try {
      const res = await fetch('/api/glo/turn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildTurnRequest(snapshot.answers, snapshot.glo, t)),
        signal: ctrl.signal,
      });
      if (res.ok) result = checkAiResult(((await res.json()) as { result?: unknown }).result);
    } catch {
      result = null;
    }
    if (ctrl.signal.aborted || abortRef.current !== ctrl) return;
    abortRef.current = null;
    setPendingText(null);
    focusAfter.current = false;
    onChange(result ? applyAiResult(snapshot.answers, snapshot.glo, t, result) : applyAiFailure(snapshot.answers, snapshot.glo, t));
  };
  const busy = pendingText !== null;

  // Yalnızca kullanıcı logun sonundaysa yeni mesajlara kaydır; eski mesajları okuyorsa yerinde bırak.
  useLayoutEffect(() => {
    const el = logRef.current;
    if (el && atBottomRef.current) el.scrollTop = el.scrollHeight;
  }, [messages.length, pendingText]);

  const onLogScroll = () => {
    const el = logRef.current;
    if (!el) return;
    const bottom = el.scrollHeight - el.scrollTop - el.clientHeight < 24;
    atBottomRef.current = bottom;
    setAtBottom(bottom);
    if (bottom) setSeen(messages.length);
  };
  const showNew = !atBottom && messages.length > seen;

  // Ekran okuyucu: yalnızca bu turda eklenen Glo mesajları + güncel soru (tüm geçmiş yeniden okunmaz).
  let lastUser = -1;
  messages.forEach((m, i) => {
    if (m.from === 'user') lastUser = i;
  });
  const announcement = [...messages.slice(lastUser + 1).filter((m) => m.from === 'glo').map((m) => m.text), prompt.text].join(' ');
  useEffect(() => {
    const t = window.setTimeout(() => {
      if (liveRef.current) liveRef.current.textContent = announcement;
    }, 120);
    return () => window.clearTimeout(t);
  }, [announcement]);

  // Seçenekle cevap verildiyse (buton DOM'dan kalktı) odak yeni sorunun ilk seçeneğine / özete geçer.
  // Metin gönderildiyse odak giriş alanında kalır (mobil klavye kapanmaz).
  useEffect(() => {
    if (!focusAfter.current) return;
    focusAfter.current = false;
    promptRef.current?.querySelector<HTMLElement>('button:not([disabled]), textarea, [tabindex="-1"]')?.focus();
  }, [messages.length]);

  // Kullanıcı Glo'yu kendisi açtıysa ilk seçenek odaklanır (grubun etiketi soru metnidir). Otomatik açılışta
  // (sayfa yüklenirken) odak çalınmaz ve sayfa kaydırılmaz; modal kendi odağını yönetir.
  useEffect(() => {
    if (autoFocus) promptRef.current?.querySelector<HTMLElement>('button')?.focus();
  }, [autoFocus]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const t = text.trim();
    if (!t || over || busy) return;
    if (aiMode !== 'off') {
      void aiSend(t);
      return;
    }
    apply({ type: 'text', text: t }, false);
    setText('');
  };

  const Heading = headingLevel;
  // Konuşma başladı mı: ilk kullanıcı cevabı (veya formdan gelen cevap) sonrası karşılama kompakt başlığa döner.
  const started = messages.some((m) => m.from === 'user') || Object.keys(answers).length > 0;
  // Masaüstü analiz sayfasında (xl+) karşılama solda, soru/yanıt sağda; modal ve mobilde üst üste.
  const twoCol = variant === 'page' && !started;
  // Sohbet geçmişi grupları: ardışık Glo mesajları tek grup (avatar bir kez); kullanıcı mesajları tek tek.
  const groups: { from: 'glo' | 'user'; items: GloMessage[] }[] = [];
  for (const m of messages) {
    const last = groups[groups.length - 1];
    if (last && m.from === 'glo' && last.from === 'glo') last.items.push(m);
    else groups.push({ from: m.from, items: [m] });
  }
  const modeLabel = (
    <p className="inline-flex max-w-full rounded-full border border-[#C9A876]/70 bg-[#F6F1E7] px-3 py-1 text-left text-[12.5px] font-semibold text-[#6B5A36]">
      {surface === 'live'
        ? 'Erken erişim'
        : aiMode === 'gemini'
        ? 'Yerel AI denemesi · Başvuru gönderilmez'
        : aiMode === 'mock'
          ? 'Yerel AI denemesi (test sağlayıcısı, gerçek model değil) · Başvuru gönderilmez'
          : 'Etkileşim prototipi · AI bağlı değil'}
    </p>
  );
  const formButton = (extra: string) => (
    <button
      type="button"
      onClick={onSwitchToForm}
      className={`items-center justify-center rounded-full border border-[#D6D6DC] bg-white px-5 py-2.5 text-[14px] font-semibold text-[#14213F] motion-safe:transition-colors hover:border-[#1B5CD6] hover:text-[#1B5CD6] ${focusRing} ${extra}`}
    >
      Form ile devam et
    </button>
  );
  return (
    <div className={`min-w-0 ${twoCol ? 'xl:grid xl:grid-cols-[264px_minmax(0,1fr)] xl:items-start xl:gap-10' : ''}`}>
      {/* Karşılama (başlamadan önce) → kompakt başlık (ilk cevaptan sonra). Görsel aynı öğe kalır: yeniden
          yüklenmez, açılış hareketi tekrar oynamaz. Etrafına kart/çerçeve eklenmez. */}
      <div
        className={
          started
            ? 'flex items-center gap-3 sm:gap-4'
            : `flex flex-col items-center text-center ${twoCol ? 'xl:items-start xl:text-left' : ''}`
        }
      >
        {/* Onaylı Glo karakteri — büyük karşılama (112/160 px) yalnız konuşma başlamadan. Konuşma başlayınca
            Glo, mesajların yanında küçük avatar olarak görünür (ayrı sütun yok). Dekoratif (alt=""). */}
        {!started && (
          <span className="relative block h-28 w-28 shrink-0 sm:h-40 sm:w-40">
            <Image
              src="/images/glo/glo-avatar-480.webp"
              alt=""
              width={160}
              height={160}
              sizes="(min-width: 640px) 160px, 112px"
              quality={100}
              loading="eager"
              onAnimationEnd={(e) => {
                if (e.animationName === 'glo-greet') setGreeted(true);
              }}
              className={`glo-avatar h-full w-full object-contain ${busy ? 'is-waiting' : greeted ? '' : 'is-greet'}`}
            />
          </span>
        )}
        <div className={started ? 'min-w-0 flex-1' : 'mt-3 sm:mt-4'}>
          <Heading className={started ? 'text-[1.1rem] font-extrabold leading-tight text-[#14213F]' : 'text-[1.35rem] font-extrabold leading-tight text-[#14213F] sm:text-[1.6rem]'}>
            {started ? 'Glo' : GLO_WELCOME.title}
          </Heading>
          <p className={started ? 'text-[13px] leading-snug text-[#5A5A6A]' : 'mt-1.5 text-[15px] leading-relaxed text-[#4A4A5A] sm:text-[16px]'}>
            {started ? 'Dijital ön analiz asistanı' : GLO_WELCOME.text}
          </p>
          {!started && <div className={`mt-3 ${twoCol ? 'xl:hidden' : ''}`}>{modeLabel}</div>}
          {twoCol && formButton('mt-4 hidden xl:inline-flex')}
        </div>
        {started && (
          <button type="button" onClick={onSwitchToForm} className={`${linkBtn} shrink-0 whitespace-nowrap text-[13.5px]`}>
            Form ile devam et
          </button>
        )}
      </div>

      <div className={`min-w-0 ${started ? '' : twoCol ? 'mt-6 xl:mt-0' : 'mt-6'}`}>
      {started && <div className="mt-3">{modeLabel}</div>}
      {twoCol && <div className="mb-5 hidden xl:block">{modeLabel}</div>}

      {messages.length > 0 && (
      <div
        ref={logRef}
        onScroll={onLogScroll}
        tabIndex={0}
        role="region"
        aria-label="Glo konuşma geçmişi"
        className={`mt-3 max-h-[min(40dvh,360px)] overflow-y-auto overscroll-contain rounded-2xl border border-[#E5E5EC] bg-[#FAF9F6] p-2.5 outline-none focus-visible:ring-2 focus-visible:ring-[#1B5CD6] sm:p-4`}
      >
        <ol className="space-y-3">
          {groups.map((grp, gi) =>
            grp.from === 'glo' ? (
              // Ardışık Glo mesajları tek grup: avatar grubun son balonunun yanında bir kez. Sohbetin son grubu
              // aktif soruyla aynı konuşmanın devamıdır → avatar orada (aktif soru balonunda) gösterilir.
              <li key={grp.items[0].id} className="flex items-end gap-2">
                <GloFace hidden={gi === groups.length - 1 && pendingText === null} />
                <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
                  {grp.items.map((m) => (
                    <p key={m.id} className={m.tone === 'note' ? 'max-w-[92%] break-words px-1 text-[13.5px] leading-relaxed text-[#4A4A5A]' : gloBubble}>
                      <span className="sr-only">Glo: </span>
                      {m.text}
                    </p>
                  ))}
                </div>
              </li>
            ) : (
              grp.items.map((m) => {
            const live = (m.fields ?? []).filter((f) => !(m.replaced ?? []).includes(f));
            const replacedAll = Boolean(m.fields?.length) && live.length === 0;
            return (
              <li key={m.id} className={`flex flex-col ${m.from === 'user' ? 'items-end' : 'items-start'}`}>
                <p
                  className={
                    m.from === 'user'
                      ? `max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-tr-md px-3.5 py-2.5 text-[14.5px] leading-relaxed ${replacedAll ? 'bg-[#14213F]/45 text-white' : 'bg-[#14213F] text-white'}`
                      : m.tone === 'note'
                        ? 'max-w-[92%] break-words px-1 text-[13.5px] leading-relaxed text-[#4A4A5A]'
                        : 'max-w-[92%] break-words rounded-2xl rounded-tl-md border border-[#E5E5EC] bg-white px-3.5 py-2.5 text-[14.5px] leading-relaxed text-[#14213F]'
                  }
                >
                  <span className="sr-only">{m.from === 'user' ? 'Siz: ' : 'Glo: '}</span>
                  {m.text}
                </p>
                {m.from === 'user' && replacedAll && <span className="mt-1 text-[12px] text-[#5A5A6A]">Güncellendi</span>}
                {m.from === 'user' && live.length > 2 && (
                  // Tek mesajda çok alan kaydedildiyse bağlantılar tek açılır listede toplanır.
                  <details className="mt-1 max-w-full text-right">
                    <summary className={`cursor-pointer list-none ${linkBtn}`}>Kaydedilenleri düzenle</summary>
                    <span className="mt-1.5 flex flex-col items-end gap-1.5">
                      {live.map((f) => (
                        <button key={f} type="button" onClick={() => apply({ type: 'edit', field: f }, true)} disabled={busy} className={linkBtn}>
                          {FIELD_LABEL[f]}: değiştir
                        </button>
                      ))}
                    </span>
                  </details>
                )}
                {m.from === 'user' && live.length > 0 && live.length <= 2 && (
                  <span className="mt-1 flex max-w-full flex-wrap justify-end gap-x-3">
                    {live.map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => apply({ type: 'edit', field: f }, true)}
                        disabled={busy}
                        aria-label={`${FIELD_LABEL[f]} bilgisini değiştir`}
                        className={linkBtn}
                      >
                        {live.length > 1 ? `${FIELD_LABEL[f]}: değiştir` : 'Değiştir'}
                      </button>
                    ))}
                  </span>
                )}
              </li>
            );
              })
            ),
          )}
          {pendingText !== null && (
            <li className="flex flex-col items-end">
              <p className="max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-tr-md bg-[#14213F] px-3.5 py-2.5 text-[14.5px] leading-relaxed text-white">
                <span className="sr-only">Siz: </span>
                {pendingText}
              </p>
            </li>
          )}
        </ol>
      </div>
      )}
      {showNew && (
        <button
          type="button"
          onClick={() => {
            const el = logRef.current;
            if (el) el.scrollTop = el.scrollHeight;
          }}
          className={`mt-2 ${linkBtn}`}
        >
          Yeni mesajlar var ↓
        </button>
      )}
      <div ref={liveRef} aria-live="polite" className="sr-only" />

      {/* Sağlayıcı/kota hatası: kullanıcı beklemede kalmaz; cevaplar korunur, forma tek dokunuşla geçilir. */}
      {pendingText === null && messages[messages.length - 1]?.text === AI_FAILURE_TEXT && (
        <div className="mt-2 pl-11 sm:pl-12">{formButton('inline-flex')}</div>
      )}
      <div ref={promptRef} className={started ? 'mt-4' : 'mt-5'}>
        {prompt.kind === 'summary' ? (
          <GloSummary
            answers={answers}
            glo={glo}
            prompt={prompt}
            id={id}
            showAll={showAll}
            onToggleAll={() => setShowAll((v) => !v)}
            onEdit={(f) => apply({ type: 'edit', field: f }, true)}
            onChange={onChange}
            onComplete={onComplete}
            face={<GloFace eager />}
          />
        ) : (
          <>
            {started ? (
              // Aktif soru Glo'ya ait: avatarlı balon. Geçmişte tekrar edilmez (cevaplanınca geçmişe taşınır).
              // Bekleme hareketi yalnız bu avatarda; aynı öğe kaldığı için her mesajda yeniden oynamaz.
              <div className="flex items-end gap-2">
                <GloFace waiting={busy} eager />
                <div className={gloBubble}>
                  <span className="sr-only">Glo: </span>
                  <p id={id('q')} className="text-[15.5px] font-bold leading-snug text-[#14213F]">
                    {prompt.text}
                  </p>
                  {prompt.hint && (
                    <p id={id('hint')} className="mt-1 text-[13px] leading-relaxed text-[#5A5A6A]">
                      {prompt.hint}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <>
                <p id={id('q')} className="text-[1.08rem] font-bold leading-snug text-[#14213F]">
                  {prompt.text}
                </p>
                {prompt.hint && (
                  <p id={id('hint')} className="mt-1.5 text-[13.5px] leading-relaxed text-[#5A5A6A]">
                    {prompt.hint}
                  </p>
                )}
              </>
            )}
            <GloOptions
              key={`${prompt.step}-${glo.nextId}`}
              prompt={prompt}
              labelId={id('q')}
              hintId={prompt.hint ? id('hint') : undefined}
              onPick={(value, label) => apply({ type: 'choice', value, label }, true)}
              onMulti={(values) => apply({ type: 'multi', values }, true)}
              disabled={busy}
            />

            <form onSubmit={send} className="mt-4">
              <label htmlFor={id('input')} className="block px-1 text-[13px] font-semibold text-[#4A4A5A]">
                Ya da kendi cümlelerinizle yazın
              </label>
              <div className="mt-1.5 flex items-center gap-2">
                <input
                  id={id('input')}
                  type="text"
                  enterKeyHint="send"
                  autoComplete="off"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  readOnly={busy}
                  aria-busy={busy}
                  placeholder="Mesajınız"
                  aria-invalid={over}
                  aria-describedby={text.length > MESSAGE_LIMIT - 100 ? id('count') : undefined}
                  className={`block min-w-0 flex-1 rounded-full border bg-white px-4 py-3 text-[16px] text-[#14213F] outline-none motion-safe:transition-colors placeholder:text-[#8A8A96] focus:border-[#1B5CD6] focus:ring-4 focus:ring-[#1B5CD6]/15 ${
                    over ? 'border-[#B42318]' : 'border-[#D6D6DC] hover:border-[#B8B8C2]'
                  }`}
                />
                <button type="submit" disabled={!text.trim() || over || busy} className={`${primaryBtn} shrink-0 px-5`}>
                  Gönder
                </button>
              </div>
              {busy && (
                <p role="status" className="mt-1.5 px-2 text-[12.5px] font-medium text-[#5A5A6A]">
                  Glo yanıtlıyor…
                </p>
              )}
              {text.length > MESSAGE_LIMIT - 100 && (
                <p id={id('count')} className={`mt-1.5 px-2 text-[12.5px] font-medium ${over ? 'text-[#B42318]' : 'text-[#5A5A6A]'}`}>
                  {text.length} / {MESSAGE_LIMIT} karakter{over ? ' — mesaj çok uzun, göndermek için kısaltın.' : ''}
                </p>
              )}
            </form>
          </>
        )}
      </div>
      {!started && prompt.kind !== 'summary' && (
        <div className={`mt-5 text-center ${twoCol ? 'xl:hidden' : ''}`}>{formButton('inline-flex')}</div>
      )}
      </div>
    </div>
  );
}

function GloOptions({
  prompt,
  labelId,
  hintId,
  onPick,
  onMulti,
  disabled = false,
}: {
  disabled?: boolean;
  prompt: Prompt;
  labelId: string;
  hintId?: string;
  onPick: (value: string, label: string) => void;
  onMulti: (values: string[]) => void;
}) {
  const [picked, setPicked] = useState<string[]>([]);
  // Mobilde uzun listeler ilk 4 seçenekle açılır; diğerleri "Tüm seçenekleri göster" ile gelir. Masaüstünde
  // (sm+) tümü görünür ve kontrol gizlidir. Seçili bir seçenek hiçbir zaman gizlenmez. Kontrol DOM'da
  // yerinde kaldığı için aç/kapat sonrası odak kaybolmaz.
  const [expanded, setExpanded] = useState(false);
  const collapsible = prompt.options.length > 5;
  const groupId = `${labelId}-opts`;
  const hide = (i: number, on = false) => (collapsible && !expanded && i >= VISIBLE_OPTIONS && !on ? 'max-sm:hidden' : '');
  const toggleMore = collapsible ? (
    <button type="button" aria-expanded={expanded} aria-controls={groupId} onClick={() => setExpanded((v) => !v)} className={`mt-2.5 sm:hidden ${linkBtn}`}>
      {expanded ? 'Daha az seçenek göster' : `Tüm seçenekleri göster (${prompt.options.length})`}
    </button>
  ) : null;
  if (prompt.kind === 'multi') {
    const toggle = (value: string, exclusive?: boolean) =>
      setPicked((prev) => {
        if (prev.includes(value)) return prev.filter((v) => v !== value);
        if (exclusive) return [value];
        const exclusives = prompt.options.filter((o) => o.exclusive).map((o) => o.value);
        return [...prev.filter((v) => !exclusives.includes(v)), value];
      });
    return (
      <>
        <div id={groupId} role="group" aria-labelledby={labelId} aria-describedby={hintId} className="mt-3 flex flex-wrap gap-2">
          {prompt.options.map((o, i) => {
            const on = picked.includes(o.value);
            return (
              <button key={o.value} type="button" role="checkbox" aria-checked={on} disabled={disabled} onClick={() => toggle(o.value, o.exclusive)} className={`${chipBase} ${on ? chipOn : chipIdle} ${hide(i, on)}`}>
                <span aria-hidden="true" className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border-2 ${on ? 'border-[#1B5CD6] bg-[#1B5CD6]' : 'border-[#A9ABB6]'}`}>
                  {on && (
                    <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3">
                      <path d="M3.5 8.5l3 3 6-7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                {o.label}
              </button>
            );
          })}
        </div>
        {toggleMore}
        <div>
          <button type="button" disabled={picked.length === 0 || disabled} onClick={() => onMulti(picked)} className={`mt-3 ${primaryBtn} px-5 py-2.5 text-[14.5px]`}>
            Devam
          </button>
        </div>
      </>
    );
  }
  return (
    <>
      <div id={groupId} role="group" aria-labelledby={labelId} aria-describedby={hintId} className="mt-3 flex flex-wrap gap-2">
        {prompt.options.map((o, i) => (
          <button key={o.value} type="button" disabled={disabled} onClick={() => onPick(o.value, o.label)} className={`${chipBase} ${chipIdle} ${hide(i)}`}>
            {o.label}
          </button>
        ))}
      </div>
      {toggleMore}
    </>
  );
}

const VISIBLE_OPTIONS = 4;


const ALL_FIELDS: GloField[] = ['start', 'product', 'channels', 'target', 'goal', 'businessType', 'problem', 'infraLevel', 'salesVolume', 'budget'];

function GloSummary({
  answers,
  glo,
  prompt,
  id,
  showAll,
  onToggleAll,
  onEdit,
  onChange,
  onComplete,
  face,
}: {
  face: React.ReactNode;
  answers: Answers;
  glo: GloState;
  prompt: Prompt;
  id: (n: string) => string;
  showAll: boolean;
  onToggleAll: () => void;
  onEdit: (f: GloField) => void;
  onChange: (next: { answers: Answers; glo: GloState }) => void;
  onComplete: (notes: string) => void;
}) {
  // Kullanıcı yalnızca kendi ek metnini görür; bağlam satırları sonuç ekranındaki not alanına eklenir.
  const raw = glo.notesRaw !== undefined;
  const value = raw ? (glo.notesRaw ?? '') : notesExtra(glo);
  const full = composeNotes(glo);
  const max = NOTES_LIMIT - (full.length - value.length);
  const over = full.length > NOTES_LIMIT;
  const complete = parseAnswers(answers) !== null;
  const rows = ALL_FIELDS.filter((f) => f !== 'target' || showsTarget(answers, glo));
  const fieldValue = (f: GloField) => (f === 'start' || f === 'product' || f === 'target' ? contextValue(f, glo) : formatAnswer(answers, f as QuestionId));

  return (
    <div>
      <div className="flex items-end gap-2">
        {face}
        <p tabIndex={-1} className={`${gloBubble} font-bold outline-none`}>
          <span className="sr-only">Glo: </span>
          {prompt.text}
        </p>
      </div>
      <dl className="mt-4 grid gap-x-6 gap-y-3 rounded-2xl border border-[#E5E5EC] bg-white p-4 sm:grid-cols-2 sm:p-5">
        {shortSummary(answers, glo).map((r) => (
          <div key={r.label} className="min-w-0">
            <dt className="text-[12.5px] font-semibold text-[#5A5A6A]">{r.label}</dt>
            <dd className="mt-0.5 break-words text-[14.5px] font-medium leading-snug text-[#14213F]">{r.value}</dd>
          </div>
        ))}
      </dl>

      <button type="button" aria-expanded={showAll} aria-controls={id('all')} onClick={onToggleAll} className={`mt-3 ${linkBtn} text-[13.5px]`}>
        {showAll ? 'Tüm cevapları gizle' : 'Tüm cevapları incele ve düzenle'}
      </button>
      <dl id={id('all')} hidden={!showAll} className="mt-3 divide-y divide-[#E5E5EC] rounded-2xl border border-[#E5E5EC] bg-white">
        {rows.map((f) => (
          <div key={f} className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1 px-4 py-3">
            <div className="min-w-0 flex-1">
              <dt className="text-[12.5px] font-semibold text-[#5A5A6A]">{FIELD_LABEL[f]}</dt>
              <dd className="mt-0.5 break-words text-[14.5px] font-medium leading-snug text-[#14213F]">{fieldValue(f)}</dd>
            </div>
            <button type="button" onClick={() => onEdit(f)} aria-label={`${FIELD_LABEL[f]} bilgisini değiştir`} className={`mt-0.5 ${linkBtn}`}>
              Değiştir
            </button>
          </div>
        ))}
      </dl>

      <div className="mt-5">
        <label htmlFor={id('notes')} className="block text-[14px] font-semibold text-[#14213F]">
          Eklemek istediğiniz bir şey var mı?
        </label>
        <textarea
          id={id('notes')}
          rows={3}
          value={value}
          onChange={(e) => onChange({ answers, glo: raw ? { ...glo, notesRaw: e.target.value } : { ...glo, notesExtra: e.target.value } })}
          placeholder="İsteğe bağlı"
          aria-invalid={over}
          aria-describedby={over || value.length > max - 200 ? id('notes-count') : undefined}
          className={`mt-2 block w-full resize-y rounded-xl border bg-white px-4 py-3 text-[16px] leading-relaxed text-[#14213F] outline-none placeholder:text-[#8A8A96] focus:border-[#1B5CD6] focus:ring-4 focus:ring-[#1B5CD6]/15 ${
            over ? 'border-[#B42318]' : 'border-[#D6D6DC] hover:border-[#B8B8C2]'
          }`}
        />
        {(over || value.length > max - 200) && (
          <p id={id('notes-count')} className={`mt-1.5 text-[12.5px] font-medium ${over ? 'text-[#B42318]' : 'text-[#5A5A6A]'}`}>
            {value.length} / {Math.max(0, max)} karakter{over ? ` — devam etmek için ${full.length - NOTES_LIMIT} karakter kısaltın.` : ''}
          </p>
        )}
      </div>

      <p className="mt-5 text-[12.5px] leading-relaxed text-[#5A5A6A]">
        Etkileşim prototipi · AI bağlı değil. Sonraki adımdaki değerlendirme, mevcut analiz formunun kurallarıyla hesaplanır.
      </p>
      {!complete && (
        <p role="alert" className="mt-3 text-[13.5px] font-medium text-[#B42318]">
          Bazı analiz cevapları eksik; önce eksik alanları tamamlayın.
        </p>
      )}
      <button type="button" disabled={!complete || over} onClick={() => onComplete(full)} className={`mt-4 w-full sm:w-auto ${primaryBtn}`}>
        Ön değerlendirmeyi gör
      </button>
    </div>
  );
}

/** Sohbet avatarı: onaylı Glo görseli, masaüstünde 40, mobilde 36 px; oran korunur (object-contain, kırpma yok).
 *  `hidden`: aynı gruptaki balonlar hizalı kalsın diye yer tutar ama görseli göstermez. */
function GloFace({ waiting = false, hidden = false, eager = false }: { waiting?: boolean; hidden?: boolean; eager?: boolean }) {
  return (
    <span aria-hidden="true" className="relative block h-9 w-9 shrink-0 sm:h-10 sm:w-10">
      {!hidden && (
        <Image
          src="/images/glo/glo-avatar-216.webp"
          alt=""
          width={40}
          height={40}
          sizes="(min-width: 640px) 40px, 36px"
          quality={100}
          loading={eager ? 'eager' : 'lazy'}
          className={`glo-avatar h-full w-full object-contain ${waiting ? 'is-waiting' : ''}`}
        />
      )}
    </span>
  );
}

const gloBubble = 'min-w-0 max-w-[88%] break-words rounded-2xl rounded-bl-md border border-[#E5E5EC] bg-white px-3.5 py-2 text-[14.5px] leading-relaxed text-[#14213F]';
