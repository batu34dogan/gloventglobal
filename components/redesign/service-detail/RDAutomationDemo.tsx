'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { RDSectionHeader, focusRing, sectionShell } from './RDServiceDetailPrimitives';

// "Örnek iş akışı" — Otomasyon & n8n hizmet sayfasına bağlı, önceden tanımlı iki örnek talebi adım adım
// gösteren demo. Gerçek bir entegrasyon, yapay zekâ analizi veya gönderim yoktur: veriler sabittir,
// ağ isteği/çerez/localStorage kullanılmaz. JS yoksa başlangıç örneği ve adımların açıklaması okunur;
// etkileşimli kontroller yalnız JS çalışırken görünür (html.rd-js).

type ExampleKey = 'complete' | 'missing';
const NOT_GIVEN = 'Belirtilmedi';

const EXAMPLES: Record<
  ExampleKey,
  {
    label: string;
    message: string;
    fields: { label: string; value: string }[];
    route: string;
    ready: string;
    draft?: string;
  }
> = {
  complete: {
    label: 'Bilgiler tamam',
    message:
      'Almanya’daki mağazamız için 120 adet dekoratif seramik ürünle ilgileniyoruz. Teslimatı kasım ayında planlıyoruz. Toptan teklif sürecinizi öğrenmek istiyoruz.',
    fields: [
      { label: 'Ürün', value: 'Dekoratif seramik' },
      { label: 'Kullanım', value: 'Mağaza' },
      { label: 'Ülke', value: 'Almanya' },
      { label: 'Adet', value: '120' },
      { label: 'Planlanan teslimat', value: 'Kasım' },
    ],
    route: 'Toptan satış değerlendirmesi',
    ready: 'Talep özeti teklif değerlendirmesine hazır.',
  },
  missing: {
    label: 'Bilgi eksik',
    message: 'Mağazamız için dekoratif seramik ürünlerinizle ilgileniyoruz. Toptan teklif alabilir miyiz?',
    fields: [
      { label: 'Ürün', value: 'Dekoratif seramik' },
      { label: 'Kullanım', value: 'Mağaza' },
      { label: 'Ülke', value: NOT_GIVEN },
      { label: 'Adet', value: NOT_GIVEN },
      { label: 'Planlanan teslimat', value: NOT_GIVEN },
    ],
    route: 'Eksik bilgi kontrolü',
    ready: 'Yanıt taslağı kontrol için hazır.',
    draft:
      'Teklifinizi değerlendirebilmemiz için teslimat ülkesini, yaklaşık adedi ve planlanan teslimat dönemini paylaşabilir misiniz?',
  },
};

// Adımlar ve JS olmadan da okunabilen kısa açıklamaları.
const STEPS = [
  { title: 'Talep alındı', note: 'Gelen mesaj akışa alınır.' },
  { title: 'Bilgiler düzenlendi', note: 'Mesajdaki bilgiler ayrı alanlara ayrılır.' },
  { title: 'Uygun akış belirlendi', note: 'Talep, içeriğine uygun iş akışına yönlendirilir.' },
  { title: 'İnsan değerlendirmesine hazır', note: 'Sonraki adım için bir kişinin kontrolüne sunulur.' },
];

// Anlatım temposu (ticari performans ölçümü değildir): 4 adım ≈ 1,5 sn.
const STEP_MS = 480;

export default function RDAutomationDemo({ bg }: { bg: string }) {
  const uid = useId();
  const [example, setExample] = useState<ExampleKey>('complete');
  const [stage, setStage] = useState(0); // 0: başlamadı, 1–4: ulaşılan adım
  const [announce, setAnnounce] = useState('');
  const timers = useRef<number[]>([]);
  const primaryRef = useRef<HTMLButtonElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const ex = EXAMPLES[example];
  const running = stage > 0 && stage < STEPS.length;
  const done = stage === STEPS.length;

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);
  useEffect(() => clearTimers, [clearTimers]);

  const finish = useCallback(
    (key: ExampleKey) => {
      clearTimers();
      // "Sonucu göster" yalnız akış çalışırken var; odak üzerindeyse kaybolmasın: bitince yanındaki
      // birincil düğmeye ("Yeniden oynat") geçer, sayfa kaydırılmaz.
      if (skipRef.current && document.activeElement === skipRef.current) primaryRef.current?.focus({ preventScroll: true });
      setStage(STEPS.length);
      const e = EXAMPLES[key];
      setAnnounce(`Akış tamamlandı. Belirlenen akış: ${e.route}. ${e.ready} Bu örnekte süreç burada durur.`);
    },
    [clearTimers],
  );

  const start = () => {
    if (running) return; // tekrarlı tıklama paralel akış başlatmaz
    clearTimers();
    setAnnounce('');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish(example);
      return;
    }
    setStage(1);
    for (let i = 2; i <= STEPS.length; i++) {
      timers.current.push(
        window.setTimeout(() => {
          if (i === STEPS.length) finish(example);
          else setStage(i);
        }, (i - 1) * STEP_MS),
      );
    }
  };

  const choose = (key: ExampleKey) => {
    if (key === example) return;
    clearTimers();
    setExample(key);
    setStage(0);
    setAnnounce('');
  };

  const primaryLabel = done ? 'Yeniden oynat' : 'Akışı incele';

  return (
    <section aria-labelledby="sd-demo" className={`border-t border-[#E5E5EC] py-14 sm:py-20 ${bg}`}>
      <style>{`
        .rd-demo-js { display: none; }
        .rd-js .rd-demo-js { display: flex; }
        .rd-js .rd-demo-nojs { display: none; }
        .rd-demo-detail { animation: rd-demo-in .24s cubic-bezier(0.22, 1, 0.36, 1) both; }
        @keyframes rd-demo-in { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
        .rd-demo-rail { transform-origin: top; transition: transform .45s cubic-bezier(0.22, 1, 0.36, 1); }
        .rd-demo-dot { transition: background-color .2s ease, border-color .2s ease, color .2s ease, box-shadow .2s ease; }
        @media (prefers-reduced-motion: reduce) {
          .rd-demo-detail { animation: none; }
          .rd-demo-rail, .rd-demo-dot { transition: none; }
        }
      `}</style>
      <div className={sectionShell}>
        <RDSectionHeader
          id="sd-demo"
          eyebrow="Örnek iş akışı"
          title="Bir talep geldiğinde, sonraki adım hazır olsun."
          description="Talebin nasıl düzenlendiğini, ilgili akışa ayrıldığını ve değerlendirmeye hazırlandığını inceleyin."
          accent
        />

        <div className="mt-10 overflow-hidden rounded-2xl border border-[#E5E5EC] bg-white lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          {/* Sol: örnek seçimi, örnek talep, kontroller */}
          <div className="border-b border-[#E5E5EC] p-5 sm:p-8 lg:border-r lg:border-b-0 lg:p-10">
            <fieldset className="rd-demo-js flex-col">
              <legend className="text-[13px] font-semibold text-[#14213F]">Örnek durum</legend>
              {/* Dar ekranda alt alta, tam genişlik; sm+ yan yana (masaüstü düzeni aynı). */}
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {(Object.keys(EXAMPLES) as ExampleKey[]).map((key) => {
                  const on = key === example;
                  return (
                    <label
                      key={key}
                      className={`relative flex min-h-[48px] cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 text-[14.5px] font-semibold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#1B5CD6] ${
                        on ? 'border-[#14213F] bg-[#F6F4EF] text-[#14213F]' : 'border-[#D6D6DC] text-[#4A4A5A] hover:border-[#1B5CD6]'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`${uid}-example`}
                        value={key}
                        checked={on}
                        onChange={() => choose(key)}
                        className="sr-only"
                      />
                      {/* Seçili durum yalnız renkle değil: dolu/boş daire */}
                      <span
                        aria-hidden="true"
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${on ? 'border-[#14213F]' : 'border-[#A9A9B4]'}`}
                      >
                        {on && <span className="h-1.5 w-1.5 rounded-full bg-[#14213F]" />}
                      </span>
                      {EXAMPLES[key].label}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <figure className="mt-6">
              <figcaption className="text-[11.5px] font-bold uppercase tracking-[0.2em] text-[#84683E]">
                Örnek talep · {ex.label}
              </figcaption>
              <blockquote className="mt-3 border-l-2 border-[#C9A876] pl-4 text-[16px] leading-relaxed text-[#14213F] sm:text-[17px]">
                “{ex.message}”
              </blockquote>
            </figure>

            <div className="rd-demo-js mt-7 flex-wrap gap-3">
              <button
                ref={primaryRef}
                type="button"
                onClick={start}
                aria-disabled={running || undefined}
                className={`inline-flex min-h-[48px] items-center justify-center rounded-full px-6 text-[15px] font-semibold transition-colors ${focusRing} ${
                  running ? 'cursor-default bg-[#14213F]/55 text-white' : 'bg-[#14213F] text-white hover:bg-[#1B5CD6]'
                }`}
              >
                {primaryLabel}
              </button>
              {running && (
                <button
                  ref={skipRef}
                  type="button"
                  onClick={() => finish(example)}
                  className={`inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#D6D6DC] px-6 text-[15px] font-semibold text-[#14213F] transition-colors hover:border-[#1B5CD6] hover:text-[#1B5CD6] ${focusRing}`}
                >
                  Sonucu göster
                </button>
              )}
            </div>
            <p className="mt-4 text-[13.5px] leading-relaxed text-[#5A5A6A]">
              Örnek verilerle çalışır. Kayıt oluşturmaz veya mesaj göndermez.
            </p>
            <p className="rd-demo-nojs mt-2 text-[13.5px] leading-relaxed text-[#5A5A6A]">
              Adımları etkileşimli incelemek için JavaScript gerekir; akışın adımları aşağıda özetlenmiştir.
            </p>
          </div>

          {/* Sağ: dört adımlı akış + sonuç */}
          <div className="p-5 sm:p-8 lg:p-10">
            <ol className="relative" aria-label="Akış adımları">
              {/* Bağlantı çizgisi: taban + ilerleme */}
              <span aria-hidden="true" className="absolute top-4 bottom-4 left-[15px] w-px bg-[#E5E5EC]" />
              <span
                aria-hidden="true"
                className="rd-demo-rail absolute top-4 bottom-4 left-[15px] w-px bg-[#C9A876]"
                style={{ transform: `scaleY(${stage <= 1 ? 0 : (stage - 1) / (STEPS.length - 1)})` }}
              />
              {STEPS.map((s, i) => {
                const n = i + 1;
                const reached = stage >= n;
                const active = running && stage === n;
                const complete = reached && !active;
                return (
                  <li key={s.title} className="relative grid grid-cols-[32px_minmax(0,1fr)] gap-x-4 pb-6 last:pb-0" aria-current={active ? 'step' : undefined}>
                    <span
                      className={`rd-demo-dot relative z-10 flex h-8 w-8 items-center justify-center rounded-full border text-[12.5px] font-bold ${
                        active
                          ? 'border-[#C9A876] bg-white text-[#14213F] shadow-[0_0_0_4px_rgba(201,168,118,0.18)]'
                          : complete
                            ? 'border-[#14213F] bg-[#14213F] text-white'
                            : 'border-[#D6D6DC] bg-white text-[#71717D]'
                      }`}
                    >
                      {complete ? <span aria-hidden="true">✓</span> : n}
                      {complete && <span className="sr-only">{n}, tamamlandı</span>}
                    </span>
                    <div className="pt-1">
                      <p className={`text-[16px] font-bold leading-snug ${reached ? 'text-[#14213F]' : 'text-[#4A4A5A]'}`}>{s.title}</p>
                      {!reached && <p className="mt-1 text-[14px] leading-relaxed text-[#5A5A6A]">{s.note}</p>}

                      {reached && n === 1 && <p className="rd-demo-detail mt-1 text-[14.5px] leading-relaxed text-[#4A4A5A]">Örnek talep akışa alındı.</p>}

                      {/* Alanlar — mobil: her alan kendi satırında (etiket | değer, gerekirse alt satıra kayar); sm+: iki sütunlu liste. */}
                      {reached && n === 2 && (
                        <dl className="rd-demo-detail mt-3 grid gap-y-1.5 rounded-xl border border-[#EFEBE3] bg-[#FEFCF9] px-4 py-3 text-[14.5px] sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-x-5">
                          {ex.fields.map((f) => (
                            <div key={f.label} className="flex flex-wrap items-baseline justify-between gap-x-4 sm:contents">
                              <dt className="text-[#5A5A6A]">{f.label}</dt>
                              <dd className={f.value === NOT_GIVEN ? 'font-medium text-[#84683E] italic' : 'font-semibold text-[#14213F]'}>{f.value}</dd>
                            </div>
                          ))}
                        </dl>
                      )}

                      {reached && n === 3 && (
                        <p className="rd-demo-detail mt-1.5 inline-flex rounded-full border border-[#14213F]/15 bg-[#F5F8FE] px-3 py-1 text-[14px] font-semibold text-[#14213F]">
                          {ex.route}
                        </p>
                      )}

                      {reached && n === 4 && (
                        <div className="rd-demo-detail mt-1.5">
                          <p className="text-[14.5px] font-semibold leading-relaxed text-[#14213F]">{ex.ready}</p>
                          {ex.draft && (
                            <div className="mt-3 rounded-xl border border-[#E9DCC3] bg-[#FBF7EF] p-4">
                              <p className="text-[11.5px] font-bold uppercase tracking-[0.18em] text-[#84683E]">Yanıt taslağı · kontrol bekliyor</p>
                              <p className="mt-2 text-[14.5px] leading-relaxed text-[#14213F]">{ex.draft}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>

            {done && (
              <p className="rd-demo-detail mt-6 border-t border-[#E5E5EC] pt-5 text-[14.5px] leading-relaxed text-[#4A4A5A]">
                Bu örnekte süreç burada durur. Sonraki adımı yetkili kişi değerlendirir.
              </p>
            )}
          </div>
        </div>

        {/* Yalnız anlamlı durum değişikliği (sonuç) duyurulur; ara kareler duyurulmaz. */}
        <p role="status" aria-live="polite" className="sr-only">
          {announce}
        </p>
      </div>
    </section>
  );
}
