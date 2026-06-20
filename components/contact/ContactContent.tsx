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

function TextAreaField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block sm:col-span-2">
      <span className={fieldLabelClass}>{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
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

const targetChannelOptions = ['Amazon', 'Etsy', 'eBay', 'Shopify', 'B2B Dijital Showroom', 'Sosyal Medya', 'Henüz Belirsiz'];

const quickContactCards = [
  { label: 'E-posta', value: 'info@gloventglobal.com', href: 'mailto:info@gloventglobal.com' },
  { label: 'Instagram', value: '@gloventglobal', href: 'https://instagram.com/gloventglobal' },
  {
    label: 'Görüşme Planı',
    value: 'Markanız, ürünleriniz ve hedef pazarınız üzerinden ilk değerlendirme yapılır.',
  },
  {
    label: 'Yanıt Süreci',
    value: 'Başvurular ön analiz sonrası uygun yol haritası için değerlendirilir.',
  },
];

export default function ContactContent() {
  const [mounted, setMounted] = useState(false);
  const [formRef, formInView] = useInView<HTMLElement>();
  const [submitted, setSubmitted] = useState(false);

  const [formValues, setFormValues] = useState({
    fullName: '',
    company: '',
    phone: '',
    email: '',
    website: '',
    category: '',
    currentChannels: '',
    targetChannel: '',
    targetMarket: '',
    neededServices: '',
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
          <h1
            className={`mx-auto mt-8 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl ${reveal(
              'delay-[200ms]',
            )}`}
          >
            Markanız İçin Global Satış Sistemini Birlikte Planlayalım
          </h1>
          <p
            className={`mx-auto mt-7 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg ${reveal(
              'delay-[300ms]',
            )}`}
          >
            Ürününüzü, mevcut satış kanallarınızı ve hedef pazarınızı analiz ederek GloventGlobal&apos;ın sizin için
            nasıl bir sistem kurabileceğini birlikte değerlendirelim.
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
              Markanızı, ürünlerinizi ve hedeflerinizi daha doğru anlayabilmemiz için aşağıdaki bilgileri
              paylaşabilirsiniz.
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
              />
              <TextField label="Ürün Kategorisi" value={formValues.category} onChange={updateField('category')} />
              <TextField
                label="Mevcut Satış Kanalları"
                value={formValues.currentChannels}
                onChange={updateField('currentChannels')}
              />
              <SelectField
                label="Hedeflenen Satış Kanalı"
                value={formValues.targetChannel}
                onChange={updateField('targetChannel')}
                options={targetChannelOptions}
              />
              <TextField
                label="Hedef Pazar / Ülke"
                value={formValues.targetMarket}
                onChange={updateField('targetMarket')}
                fullWidth
              />
              <TextAreaField
                label="İhtiyaç Duyulan Hizmetler"
                value={formValues.neededServices}
                onChange={updateField('neededServices')}
              />
              <TextAreaField label="Kısa Açıklama" value={formValues.notes} onChange={updateField('notes')} />

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

          {/* Hızlı iletişim kartları — desktop'ta sağ/dar kolon, mobilde formun altında */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {quickContactCards.map((card, index) => (
              <div
                key={card.label}
                className={`relative rounded-xl border border-white/[0.08] bg-white/[0.035] p-5 backdrop-blur-sm ${formReveal(
                  ['delay-[80ms]', 'delay-[140ms]', 'delay-[200ms]', 'delay-[260ms]'][index],
                )}`}
              >
                <span
                  aria-hidden="true"
                  className="absolute left-5 right-5 top-0 h-px bg-gradient-to-r from-blue-400/50 via-blue-400/15 to-transparent"
                />
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300/80">{card.label}</p>
                {card.href ? (
                  <a
                    href={card.href}
                    className="mt-2 block text-sm font-medium text-white transition-colors duration-200 hover:text-blue-300"
                  >
                    {card.value}
                  </a>
                ) : (
                  <p className="mt-2 text-sm leading-relaxed text-blue-100/75">{card.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}