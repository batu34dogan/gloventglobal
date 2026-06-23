'use client';

import { useEffect, useRef, useState } from 'react';

// Bir elementin viewport'a girip girmediğini takip eder (native IntersectionObserver, yeni paket yok).
// HomeContent.tsx / ServicesContent.tsx'teki aynı desenin bu dosyaya özel, bağımsız bir kopyası.
function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView] as const;
}

// Ana sayfadaki (HomeContent.tsx) / hizmetler sayfasındaki (ServicesContent.tsx) aynı görsel dil —
// ama bu dosyaya özel, bağımsız kopya. O dosyalara dokunmamak / import etmemek için bilerek
// burada yeniden tanımlandı.
function Glow({
  className,
  targetOpacity,
  visible,
}: {
  className: string;
  targetOpacity: string;
  visible: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full transition-opacity duration-[1200ms] ease-out motion-reduce:transition-none ${className} ${
        visible ? targetOpacity : 'opacity-0'
      }`}
      style={{ background: 'radial-gradient(closest-side, rgba(59,130,246,0.22), transparent)' }}
    />
  );
}

// Hero başlığının arkasına oturan, ana sayfa/hakkımızda sayfalarındaki Hero glow'uyla aynı kanıtlanmış
// teknik — bağımsız kopya (sayfa izolasyonu prensibi korunuyor). Başlığın KENDİ (relative isolate)
// kutusuna sıkıca bağlı, çevresindeki içeriği kapsamıyor.
function TitleGlow({ tone }: { tone: 'hero' | 'section' | 'cta' }) {
  const sizeClass =
    tone === 'hero'
      ? 'h-[300px] w-[min(820px,92vw)] sm:h-[360px] sm:w-[min(940px,90vw)]'
      : tone === 'section'
        ? 'h-[200px] w-[min(560px,85vw)] sm:h-[230px] sm:w-[min(620px,82vw)]'
        : 'h-[170px] w-[min(480px,80vw)] sm:h-[190px] sm:w-[min(520px,78vw)]';
  const opacityClass = tone === 'hero' ? 'opacity-50' : tone === 'section' ? 'opacity-[0.26]' : 'opacity-[0.16]';

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 ${sizeClass} rounded-full ${opacityClass} blur-2xl`}
      style={{
        background: 'radial-gradient(closest-side, rgba(255,255,255,0.9), rgba(96,165,250,0.5) 45%, transparent 75%)',
      }}
    />
  );
}

// Koyu zeminli, ince border'lı form alanı kabuğu — input/textarea/select hepsi aynı çerçeveyi kullanır.
const fieldInputClass =
  'w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-blue-100/30 outline-none transition-colors duration-200 focus:border-blue-400/55 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.15)]';
const fieldLabelClass = 'mb-1.5 block text-xs font-medium uppercase tracking-[0.1em] text-blue-100/70';

function TextField({
  label,
  type = 'text',
  value,
  onChange,
  fullWidth,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  fullWidth?: boolean;
}) {
  return (
    <label className={`block ${fullWidth ? 'sm:col-span-2' : ''}`}>
      <span className={fieldLabelClass}>{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className={fieldInputClass} />
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block sm:col-span-2">
      <span className={fieldLabelClass}>{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className={`${fieldInputClass} resize-none`}
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  fullWidth,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  fullWidth?: boolean;
}) {
  return (
    <label className={`block ${fullWidth ? 'sm:col-span-2' : ''}`}>
      <span className={fieldLabelClass}>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={fieldInputClass}>
        <option value="" className="bg-[#070d18]">
          Seçiniz
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="bg-[#070d18]">
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

const targetChannelOptions = [
  'Amazon',
  'Etsy',
  'eBay',
  'Shopify',
  'B2B',
  'Kurumsal Website',
  'Dijital Showroom',
  'Yapay Zeka',
  'Otomasyon',
  'Reklam & Optimizasyon',
  'Sosyal Medya',
  'Birden Fazlası',
  'Henüz Emin Değilim',
];

// "Ana Hedefiniz" alanı — opsiyonel, formu zorunlu alanlarla şişirmemek için. Ziyaretçinin
// "öncelikli kanal/alan" sorusundan ayrı olarak, ulaşmak istediği sonucu (marka bilinirliği, satış
// artışı, dönüşüm vb.) tanımlamasını sağlar.
const mainGoalOptions = [
  'Marka Bilinirliği',
  'Satış Artışı',
  'E-Ticaret Altyapısı Kurulumu',
  'B2B Satış Sistemi',
  'Dijital Dönüşüm',
  'Global Pazara Açılmak',
  'Yapay Zeka Entegrasyonu',
  'Otomasyon Sistemi Kurulumu',
  'Operasyon Yönetimi',
  'Henüz Net Değil',
];

const quickContactCards = [
  {
    label: 'E-posta',
    value: 'info@gloventglobal.com',
    description: 'Proje, hizmet ve iş birliği talepleriniz için bize e-posta gönderebilirsiniz.',
    href: 'mailto:info@gloventglobal.com',
  },
  {
    label: 'WhatsApp',
    value: '0536 834 88 97',
    description: 'Markanız, ürünleriniz ve hedef pazarınızla ilgili hızlı ön görüşme için WhatsApp üzerinden ulaşabilirsiniz.',
    href: 'https://wa.me/905368348897',
  },
  {
    label: 'Instagram',
    value: '@gloventglobal',
    description: 'Güncel çalışmalar, içerikler ve marka duyuruları için Instagram hesabımızı takip edebilirsiniz.',
    href: 'https://www.instagram.com/gloventglobal',
  },
  {
    label: 'Görüşme Planı',
    value: 'Ön Değerlendirme',
    description: 'Markanız, ürünleriniz, mevcut satış kanallarınız ve hedef pazarınız üzerinden ilk değerlendirme yapılır.',
  },
  {
    label: 'Yanıt Süreci',
    value: 'Yol Haritası',
    description: 'Başvurular ön analiz sonrası uygun hizmet kombinasyonu ve yol haritası için değerlendirilir.',
  },
];

const quickContactDelays = ['delay-[80ms]', 'delay-[130ms]', 'delay-[180ms]', 'delay-[230ms]', 'delay-[280ms]'];

const processSteps = [
  {
    number: '01',
    title: 'Ön Analiz',
    description: 'Markanız, ürün kategoriniz, mevcut satış kanallarınız ve hedef pazarınız ilk aşamada değerlendirilir.',
  },
  {
    number: '02',
    title: 'Sistem Planı',
    description:
      'Amazon, Etsy, eBay, Shopify, B2B, sosyal medya, reklam veya otomasyon ihtiyaçlarınıza göre uygun hizmet kombinasyonu belirlenir.',
  },
  {
    number: '03',
    title: 'Görüşme ve Yol Haritası',
    description: 'Ön analiz sonrası markanız için uygulanabilir bir yol haritası ve sonraki adımlar netleştirilir.',
  },
];

const processDelays = ['delay-[0ms]', 'delay-[100ms]', 'delay-[200ms]'];

export default function ContactContent() {
  const [mounted, setMounted] = useState(false);
  const [formRef, formInView] = useInView<HTMLElement>();
  const [processRef, processInView] = useInView<HTMLElement>();
  const [trustRef, trustInView] = useInView<HTMLElement>();
  const [submitted, setSubmitted] = useState(false);

  const [formValues, setFormValues] = useState({
    fullName: '',
    company: '',
    phone: '',
    email: '',
    website: '',
    targetChannel: '',
    mainGoal: '',
    notes: '',
  });

  const updateField = (field: keyof typeof formValues) => (value: string) =>
    setFormValues((previous) => ({ ...previous, [field]: value }));

  // Bu fazda gerçek gönderim/backend yok — sadece sayfa içi geçici bir bilgilendirme gösteriliyor.
  // mailto açılmıyor, hiçbir ağ isteği yapılmıyor, konsola hata düşürmeden form state'i sıfırlanmadan kalıyor.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Hero içindeki elementler için kademeli giriş (delay class'ları literal/sabit olmalı —
  // Tailwind derleme zamanında metni tarayarak class üretir, dinamik string birleştirme çalışmaz).
  const reveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      mounted ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
    }`;

  // Form + Hızlı İletişim Kartları bölümü Hero'nun altında, ekran dışında başlıyor — kendi
  // viewport girişine bağlı, ayrı bir reveal.
  const formReveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      formInView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
    }`;

  // Süreç bölümü form bölümünün altında, ekran dışında başlıyor — kendi viewport girişine bağlı, ayrı reveal.
  const processReveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      processInView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
    }`;

  // Final güven paneli sayfanın en sonunda — kendi viewport girişine bağlı, ayrı reveal.
  const trustReveal = (delayClass: string) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delayClass} ${
      trustInView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
    }`;

  return (
    <main className="relative overflow-hidden bg-[#070d18] font-sans text-white">
      {/* ============ 1. İLETİŞİM HERO ============
          Üst padding (pt-24/md:pt-28), /hizmetler Hero'suyla birebir aynı — sabit navbar'ın (z-40)
          yüksekliğini (~64-72px) rahatça karşılıyor, çakışma olmuyor. Intro yok, sayfa direkt başlıyor. */}
      <section className="relative px-6 pb-14 pt-24 sm:px-10 md:pb-16 md:pt-28">
        <Glow visible={mounted} targetOpacity="opacity-70" className="left-1/2 top-[-120px] h-[560px] w-[860px] -translate-x-1/2" />
        <Glow visible={mounted} targetOpacity="opacity-50" className="left-[-200px] top-[200px] h-[380px] w-[380px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className={`text-xs font-semibold uppercase tracking-[0.35em] text-blue-300/80 ${reveal('delay-[100ms]')}`}>
            İletişim
          </p>
          <div className="relative isolate mx-auto mt-8 max-w-3xl">
            <TitleGlow tone="hero" />
            <h1
              className={`relative z-10 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl ${reveal(
                'delay-[200ms]',
              )}`}
            >
              Markanızın Dijital Büyüme Yol Haritasını Birlikte Oluşturalım
            </h1>
          </div>
          <p
            className={`mx-auto mt-7 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg ${reveal(
              'delay-[300ms]',
            )}`}
          >
            İşletmenizin mevcut yapısını, hedeflerini ve dijital ihtiyaçlarını anlayarak; strateji, teknoloji,
            yapay zeka, otomasyon, e-ticaret ve operasyon süreçleri için uygulanabilir bir yol haritası
            oluşturalım.
          </p>
        </div>
      </section>

      {/* ============ 2. BAŞVURU FORMU + HIZLI İLETİŞİM ============ */}
      <section ref={formRef} className="relative px-6 pb-20 pt-14 sm:px-10">
        <Glow visible={formInView} targetOpacity="opacity-40" className="right-[-220px] top-0 h-[460px] w-[460px]" />
        <Glow visible={formInView} targetOpacity="opacity-30" className="left-[-220px] bottom-0 h-[420px] w-[420px]" />

        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_320px]">
          {/* Form — desktop'ta sol/geniş kolon, mobilde önce gelir (DOM sırası zaten bu) */}
          <div
            className={`relative rounded-2xl border border-white/[0.08] bg-white/[0.035] p-6 backdrop-blur-sm sm:p-8 ${formReveal(
              'delay-[0ms]',
            )}`}
          >
            <span
              aria-hidden="true"
              className="absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-blue-400/55 via-blue-400/20 to-transparent"
            />

            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Başvuru Bilgileri</h2>
            <p className="mt-3 text-sm leading-relaxed text-blue-100/70 sm:text-base">
              Markanızla ilgili temel bilgileri paylaşın; ilgilendiğiniz alanı, hedeflerinizi ve ihtiyaçlarınızı
              birlikte değerlendirerek doğru dijital büyüme yol haritasını planlayalım.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
              <TextField label="Ad Soyad" value={formValues.fullName} onChange={updateField('fullName')} />
              <TextField label="Firma / Marka Adı" value={formValues.company} onChange={updateField('company')} />
              <TextField label="Telefon" type="tel" value={formValues.phone} onChange={updateField('phone')} />
              <TextField label="E-posta" type="email" value={formValues.email} onChange={updateField('email')} />
              <TextField
                label="Web Sitesi / Sosyal Medya Hesabı"
                value={formValues.website}
                onChange={updateField('website')}
                fullWidth
              />
              <SelectField
                label="İlgilendiğiniz Alan / Öncelikli İhtiyaç"
                value={formValues.targetChannel}
                onChange={updateField('targetChannel')}
                options={targetChannelOptions}
              />
              <SelectField
                label="Ana Hedefiniz"
                value={formValues.mainGoal}
                onChange={updateField('mainGoal')}
                options={mainGoalOptions}
              />
              <TextAreaField
                label="Kısa Açıklama"
                value={formValues.notes}
                onChange={updateField('notes')}
                placeholder="Markanız, ürünleriniz, mevcut dijital yapınız ve ulaşmak istediğiniz hedefler hakkında kısa bilgi paylaşın."
              />

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="mt-2 rounded-full border border-blue-400/45 bg-blue-500/10 px-10 py-3 text-sm font-semibold tracking-wide text-white backdrop-blur-sm transition-all duration-300 hover:border-blue-400/75 hover:bg-blue-500/20 hover:shadow-[0_0_36px_-6px_rgba(59,130,246,0.6)]"
                >
                  Başvuruyu Hazırla
                </button>

                {submitted && (
                  <p className="mt-4 text-sm leading-relaxed text-blue-100/75">
                    Başvuru gönderim altyapısı yakında aktif edilecektir. Şimdilik{' '}
                    <span className="text-white">info@gloventglobal.com</span> üzerinden bize ulaşabilirsiniz.
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* Hızlı iletişim kartları — desktop'ta sağ/dar kolon, mobilde formun altında.
              Tıklanabilir kartlar (href varsa) tüm yüzeyiyle link; diğerleri sade bilgi kartı. */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {quickContactCards.map((card, index) => {
              const isExternal = card.href?.startsWith('http');
              const cardClassName = `relative block rounded-xl border border-white/[0.08] bg-white/[0.035] p-4 backdrop-blur-sm transition-all duration-300 ${
                card.href
                  ? 'hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-white/[0.06] hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.45)]'
                  : ''
              } ${formReveal(quickContactDelays[index])}`;

              const cardContent = (
                <>
                  <span
                    aria-hidden="true"
                    className="absolute left-4 right-4 top-0 h-px bg-gradient-to-r from-blue-400/50 via-blue-400/15 to-transparent"
                  />
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300/80">{card.label}</p>
                  <p className="mt-2 text-sm font-semibold text-white">{card.value}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-blue-100/60">{card.description}</p>
                </>
              );

              return card.href ? (
                <a
                  key={card.label}
                  href={card.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className={cardClassName}
                >
                  {cardContent}
                </a>
              ) : (
                <div key={card.label} className={cardClassName}>
                  {cardContent}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ 3. SÜREÇ — Başvurudan Sonra Ne Olur? ============ */}
      <section ref={processRef} className="relative px-6 pb-20 pt-14 sm:px-10">
        <Glow visible={processInView} targetOpacity="opacity-40" className="left-1/2 top-0 h-[420px] w-[800px] -translate-x-1/2" />

        <div className="relative mx-auto max-w-3xl text-center">
          <p className={`text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/80 ${processReveal('delay-[0ms]')}`}>
            Süreç
          </p>
          <h2 className={`mt-4 text-3xl font-bold tracking-tight sm:text-4xl ${processReveal('delay-[100ms]')}`}>
            Başvurudan Sonra Ne Olur?
          </h2>
          <p
            className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg ${processReveal(
              'delay-[200ms]',
            )}`}
          >
            Başvurunuzu yalnızca bir iletişim talebi olarak değil, markanız için doğru dijital büyüme yol
            haritasını belirlemenin ilk adımı olarak değerlendiriyoruz.
          </p>
        </div>

        <div className="relative mx-auto mt-10 grid max-w-5xl items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, index) => (
            <div key={step.number} className={processReveal(processDelays[index])}>
              <div className="relative flex h-full min-h-[170px] flex-col rounded-xl border border-white/[0.08] bg-white/[0.035] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-white/[0.06] hover:shadow-[0_0_40px_-12px_rgba(59,130,246,0.45)]">
                <span
                  aria-hidden="true"
                  className="absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-blue-400/55 via-blue-400/20 to-transparent"
                />
                <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-blue-400/45 bg-blue-500/10 text-xs font-semibold text-blue-300 shadow-[0_0_16px_-2px_rgba(59,130,246,0.6)]">
                  {step.number}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-blue-100/75">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ 4. FİNAL GÜVEN MESAJI ============
          Final CTA değil — buton yok, sadece sakin/küçük bir kapanış paneli. */}
      <section ref={trustRef} className="relative px-6 pb-20 pt-2 sm:px-10">
        <div
          className={`relative mx-auto max-w-2xl rounded-2xl border border-white/[0.08] bg-white/[0.035] px-6 py-8 text-center backdrop-blur-sm sm:px-10 sm:py-9 ${trustReveal(
            'delay-[0ms]',
          )}`}
        >
          <span
            aria-hidden="true"
            className="absolute left-10 right-10 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"
          />

          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">Her Marka İçin Aynı Hizmet Paketini Sunmuyoruz</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-blue-100/70 sm:text-base">
            Ürününüz, satış kanalınız, hedef pazarınız ve büyüme aşamanıza göre GloventGlobal hizmetlerinden
            hangilerinin markanız için doğru dijital büyüme yol haritasını oluşturacağını birlikte belirliyoruz.
          </p>
          <p className="mt-5 text-xs font-medium uppercase tracking-[0.25em] text-blue-100/45">
            Strateji • Altyapı • İçerik • Reklam • Otomasyon
          </p>
          <p className="mt-1.5 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.3em] text-blue-200/60">
            Global Büyüme
          </p>
        </div>
      </section>
    </main>
  );
}