'use client';

import { useMemo, useState } from 'react';

// ============================================================================
// Soru tanımları — 6 soruluk akış. Sıra: işletme tipi -> mevcut satış kanalları
// (çoklu seçim) -> en büyük problem -> öncelikli hedef -> dijital altyapı durumu
// -> aylık büyüme/reklam bütçesi.
// ============================================================================

type QuestionId = 'businessType' | 'channels' | 'problem' | 'goal' | 'infraLevel' | 'budget';

type Question = {
  id: QuestionId;
  title: string;
  multi: boolean;
  options: string[];
};

const questions: Question[] = [
  {
    id: 'businessType',
    title: 'İşletme tipiniz nedir?',
    multi: false,
    options: ['Üretici / Marka Sahibi', 'Toptancı / B2B Firma', 'E-Ticaret Markası', 'Henüz Karar Vermedim'],
  },
  {
    id: 'channels',
    title: 'Şu anda nerede satış yapıyorsunuz?',
    multi: true,
    options: ['Amazon', 'Etsy', 'eBay', 'Shopify / Kendi Web Sitem', 'B2B / Toptan', 'Sosyal Medya', 'Henüz Satış Yapmıyorum'],
  },
  {
    id: 'problem',
    title: 'En büyük probleminiz nedir?',
    multi: false,
    options: [
      'Düşük Görünürlük / Trafik',
      'Düşük Dönüşüm Oranı',
      'Operasyon / Süreç Yönetimi',
      'Marka Algısı / Konumlandırma',
      'Global Pazara Açılma',
      'Henüz Net Değil',
    ],
  },
  {
    id: 'goal',
    title: 'Öncelikli hedefiniz nedir?',
    multi: false,
    options: [
      'Satışları Artırmak',
      'Yeni Pazara Açılmak',
      'Operasyonu Düzenli Hale Getirmek',
      'Marka Algısını Güçlendirmek',
      'Yapay Zeka / Otomasyon Entegre Etmek',
    ],
  },
  {
    id: 'infraLevel',
    title: 'Mevcut dijital altyapınız ne durumda?',
    multi: false,
    options: ['Hiç Yok / Yeni Kuracağım', 'Var Ama Zayıf', 'Orta Seviyede', 'Güçlü Ama Büyümüyor'],
  },
  {
    id: 'budget',
    title: 'Aylık büyüme / reklam bütçesi aralığınız nedir?',
    multi: false,
    options: ['Henüz Bütçem Yok', '0 - 50.000 TL', '50.000 - 150.000 TL', '150.000 TL ve Üzeri'],
  },
];

type Answers = Partial<Record<QuestionId, string | string[]>>;

// ============================================================================
// Cevap -> önerilen sistem eşleştirmesi. Her hizmet için sitedeki güncel
// konumlandırma diliyle birebir uyumlu başlık/açıklama kullanılıyor.
// ============================================================================

type ServiceTag =
  | 'amazon'
  | 'etsy'
  | 'ebay'
  | 'shopify'
  | 'b2b-dijital-showroom'
  | 'marka-konumlandirma'
  | 'gorsel-icerik-sistemi'
  | 'yapay-zeka-entegrasyonu'
  | 'sosyal-medya-yonetimi'
  | 'reklam-optimizasyon'
  | 'otomasyon-n8n'
  | 'global-pazara-giris-stratejisi';

const serviceInfo: Record<ServiceTag, { title: string; description: string }> = {
  amazon: { title: 'Amazon Global Satış Sistemi', description: 'Kategori, listeleme, reklam ve operasyon süreçlerini birlikte çalışan global satış sistemine dönüştürürüz.' },
  etsy: { title: 'Etsy Marka Sistemi', description: 'Ürün, görsel dil, marka hikayesi ve SEO’yu birlikte çalışan bir Etsy marka sistemine dönüştürürüz.' },
  ebay: { title: 'eBay Global Satış Sistemi', description: 'Ülke stratejisi, fiyatlama, kargo ve operasyonla global satış sistemine dönüştürürüz.' },
  shopify: { title: 'Shopify Commerce Sistemi', description: 'Bağımsız bir dijital ticaret sistemi kurarak markanızı yönetilebilir hale getiririz.' },
  'b2b-dijital-showroom': { title: 'B2B Satış Sistemi', description: 'Dijital showroom, teklif süreci ve müşteri yönetimini birlikte çalışan bir satış sistemine dönüştürürüz.' },
  'marka-konumlandirma': { title: 'Marka ve Konumlandırma Sistemi', description: 'Markanızı doğru müşterinin gözünde doğru konuma yerleştiririz.' },
  'gorsel-icerik-sistemi': { title: 'Görsel ve İçerik Sistemi', description: 'Ürünlerinizi satışa dönüşen bir görsel ve içerik sistemiyle hazırlarız.' },
  'yapay-zeka-entegrasyonu': { title: 'Yapay Zeka ve Karar Sistemleri', description: 'Yapay zekayı satış ve operasyon sistemlerinize entegre ederiz.' },
  'sosyal-medya-yonetimi': { title: 'Sosyal Medya Büyüme Sistemi', description: 'Satış kanallarıyla uyumlu bir sosyal medya iletişim sistemi kurarız.' },
  'reklam-optimizasyon': { title: 'Performans Pazarlama Sistemi', description: 'Reklam bütçenizi veriye dayalı, ölçülebilir bir büyüme sistemine dönüştürürüz.' },
  'otomasyon-n8n': { title: 'Otomasyon ve Entegrasyon Sistemleri', description: 'Tekrarlayan işleri azaltan, operasyonu hızlandıran sistemler kurarız.' },
  'global-pazara-giris-stratejisi': { title: 'Global Büyüme Stratejisi', description: 'Doğru ülke, kanal, fiyat ve operasyon planıyla global pazara giriş sistemi kurarız.' },
};

// Her hizmetin gerçek route slug'ı.
const serviceHref = (tag: ServiceTag) => `/hizmetler/${tag}`;

// Bilerek basit bir ağırlıklı etiketleme sistemi — karmaşık bir öneri motoru değil, sadece
// cevaplara göre 2-3 anlamlı sistemi öne çıkaran hafif bir mantık.
function getRecommendations(answers: Answers): ServiceTag[] {
  const tagScores: Partial<Record<ServiceTag, number>> = {};
  const addTags = (tags: ServiceTag[]) => {
    tags.forEach((tag) => {
      tagScores[tag] = (tagScores[tag] ?? 0) + 1;
    });
  };

  switch (answers.businessType) {
    case 'Üretici / Marka Sahibi':
      addTags(['marka-konumlandirma', 'gorsel-icerik-sistemi']);
      break;
    case 'Toptancı / B2B Firma':
      addTags(['b2b-dijital-showroom']);
      break;
    case 'E-Ticaret Markası':
      addTags(['shopify', 'reklam-optimizasyon']);
      break;
  }

  switch (answers.problem) {
    case 'Düşük Görünürlük / Trafik':
      addTags(['reklam-optimizasyon', 'gorsel-icerik-sistemi']);
      break;
    case 'Düşük Dönüşüm Oranı':
      addTags(['gorsel-icerik-sistemi', 'marka-konumlandirma']);
      break;
    case 'Operasyon / Süreç Yönetimi':
      addTags(['otomasyon-n8n']);
      break;
    case 'Marka Algısı / Konumlandırma':
      addTags(['marka-konumlandirma']);
      break;
    case 'Global Pazara Açılma':
      addTags(['global-pazara-giris-stratejisi']);
      break;
  }

  switch (answers.goal) {
    case 'Satışları Artırmak':
      addTags(['reklam-optimizasyon']);
      break;
    case 'Yeni Pazara Açılmak':
      addTags(['global-pazara-giris-stratejisi']);
      break;
    case 'Operasyonu Düzenli Hale Getirmek':
      addTags(['otomasyon-n8n']);
      break;
    case 'Marka Algısını Güçlendirmek':
      addTags(['marka-konumlandirma', 'sosyal-medya-yonetimi']);
      break;
    case 'Yapay Zeka / Otomasyon Entegre Etmek':
      addTags(['yapay-zeka-entegrasyonu']);
      break;
  }

  switch (answers.infraLevel) {
    case 'Hiç Yok / Yeni Kuracağım':
      addTags(['shopify']);
      break;
    case 'Var Ama Zayıf':
      addTags(['gorsel-icerik-sistemi']);
      break;
    case 'Güçlü Ama Büyümüyor':
      addTags(['reklam-optimizasyon', 'yapay-zeka-entegrasyonu']);
      break;
  }

  const sorted = (Object.entries(tagScores) as [ServiceTag, number][]).sort((a, b) => b[1] - a[1]).map(([tag]) => tag);

  // Yeterli sinyal yoksa (örn. "Henüz Net Değil" / "Henüz Karar Vermedim" cevapları) genel ve
  // güvenli 2 öneriyle tamamla — boş sonuç ekranı göstermemek için.
  const fallback: ServiceTag[] = ['marka-konumlandirma', 'yapay-zeka-entegrasyonu', 'reklam-optimizasyon'];
  const combined = [...sorted, ...fallback];
  const unique: ServiceTag[] = [];
  for (const tag of combined) {
    if (!unique.includes(tag)) unique.push(tag);
    if (unique.length === 3) break;
  }
  return unique;
}

type Stage = 'quiz' | 'results' | 'success';

export default function AnalysisContent({ onRequestClose }: { onRequestClose?: () => void }) {
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
  const [formError, setFormError] = useState<string | null>(null);

  const currentQuestion = questions[stepIndex];
  const isLastQuestion = stepIndex === questions.length - 1;

  const recommendations = useMemo(() => getRecommendations(answers), [answers]);

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
    setFormError(null);
  };

  const handleClose = () => {
    onRequestClose?.();
    // Widget tekrar açıldığında analiz baştan başlasın (ilk faz için bu davranış yeterli).
    resetAll();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValues.fullName.trim()) {
      setFormError('Lütfen ad soyad alanını doldurun.');
      return;
    }
    if (!formValues.phone.trim() && !formValues.email.trim()) {
      setFormError('Lütfen telefon veya e-posta alanlarından en az birini doldurun.');
      return;
    }
    setFormError(null);
    // Bu fazda mail / webhook / n8n entegrasyonu yok — sadece başarı ekranına geçiyoruz.
    setStage('success');
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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300/80">Öncelikli Büyüme Alanınız</p>
          <p className="mt-3 text-sm leading-relaxed text-blue-100/70 sm:text-base">
            Cevaplarınıza göre markanız için ilk aşamada aşağıdaki sistemlerin öncelikli olabileceğini görüyoruz.
            Detaylı analiz için markanızı daha yakından incelememiz gerekir.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {recommendations.map((tag) => (
              <a
                key={tag}
                href={serviceHref(tag)}
                className="group rounded-xl border border-white/[0.08] bg-white/[0.035] p-4 transition-all duration-300 hover:border-blue-400/40 hover:bg-white/[0.06]"
              >
                <h4 className="text-sm font-semibold text-white group-hover:text-blue-200">{serviceInfo[tag].title}</h4>
                <p className="mt-1.5 text-xs leading-relaxed text-blue-100/65">{serviceInfo[tag].description}</p>
                <span className="mt-2 inline-block text-[11px] font-semibold uppercase tracking-[0.05em] text-blue-300/80">
                  Detayları Gör →
                </span>
              </a>
            ))}
          </div>

          <div className="mt-8 border-t border-white/[0.08] pt-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300/80">
              Detaylı Analiz İçin Bilgilerinizi Bırakın
            </p>

            <form onSubmit={handleSubmit} className="mt-5 grid gap-4 sm:grid-cols-2">
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

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full rounded-full border border-blue-400/45 bg-blue-500/10 px-8 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:border-blue-400/75 hover:bg-blue-500/20 hover:shadow-[0_0_36px_-6px_rgba(59,130,246,0.6)] sm:w-auto"
                >
                  Analiz Talebimi Gönder
                </button>
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
            <a
              href="/hizmetler"
              className="rounded-full border border-blue-400/45 bg-blue-500/10 px-8 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:border-blue-400/75 hover:bg-blue-500/20"
            >
              Hizmetleri İncele
            </a>
          </div>
        </div>
      )}
    </div>
  );
}