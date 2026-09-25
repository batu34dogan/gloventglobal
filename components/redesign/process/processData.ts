// /redesign/nasil-calisiyoruz içerik kaynağı. Metinler yeniden yazılmadı:
// - Hero, manifesto, 6 adım, süreklilik, "her marka için aynı değil" ve final CTA metinleri
//   production components/process/ProcessContent.tsx'ten BİREBİR alındı (o dosya production UI'da
//   kullanılmaya devam ettiği ve veriyi dışa açmadığı için bu görevde değiştirilmedi).
// - Çalışma modelleri: kaynak production /hizmetler overview
//   (components/redesign/services/RDServicesWorkModel.tsx) — iki farklı copy versiyonu gösterilmesin
//   diye eski /nasil-calisiyoruz açıklamaları kullanılmadı.
// - Growth Engine aşama etiketleri: homepage components/redesign/RDSystem.tsx ile aynı 5 kavram.

export const processHero = {
  eyebrow: 'NASIL ÇALIŞIYORUZ',
  title: 'Markanız İçin Ölçülebilir Bir Büyüme Sistemi Kuruyoruz',
  description:
    'Analiz, strateji, teknoloji, operasyon ve optimizasyon süreçlerini tek seferlik projeler olarak değil, birlikte çalışan bir büyüme sistemi olarak kuruyor ve geliştiriyoruz.',
};

export const processManifesto = {
  eyebrow: 'ÇALIŞMA SİSTEMİ',
  title: 'Büyümeyi Parçalara Ayırmadan, Sistem Olarak Kurarız',
  description:
    'Her markanın ihtiyacı farklıdır. Bu yüzden önce mevcut yapıyı analiz eder, sonra doğru strateji, kanal, teknoloji ve operasyon modelini birlikte tasarlarız.',
};

// Homepage Growth Engine (Fırsat → Kanal → Altyapı → Operasyon → Büyüme) bu sayfada ayrı bir
// diyagram değil, 6 adımın üst seviye aşama etiketi olarak kullanılıyor.
export const growthStages = ['Fırsat', 'Kanal', 'Altyapı', 'Operasyon', 'Büyüme'] as const;
export type GrowthStage = (typeof growthStages)[number];

export const processSteps: { number: string; title: string; short: string; stage: GrowthStage; description: string }[] = [
  {
    number: '01',
    title: 'İşletmeyi Analiz Ederiz',
    short: 'Analiz',
    stage: 'Fırsat',
    description: 'Markanın mevcut ürün yapısını, satış kanallarını, dijital varlığını, operasyon gücünü, hedef kitlesini ve büyüme potansiyelini inceleriz.',
  },
  {
    number: '02',
    title: 'Büyüme Stratejisini Oluştururuz',
    short: 'Strateji',
    stage: 'Fırsat',
    description: 'Hedef pazarı, satış kanalını, marka konumunu, ürün önceliğini, fiyat algısını ve büyüme yolunu netleştiririz.',
  },
  {
    number: '03',
    title: 'Doğru Sistemleri Seçeriz',
    short: 'Sistem',
    stage: 'Kanal',
    description:
      'Markanın hedeflerine göre hangi kanal, altyapı ve büyüme bileşenlerinin öncelikli olması gerektiğini belirler; Amazon, Etsy, Shopify, B2B, yapay zeka, otomasyon ve reklam gibi parçaları tek bir sistem mantığıyla kurgularız.',
  },
  {
    number: '04',
    title: 'Kurulumu Yaparız',
    short: 'Kurulum',
    stage: 'Altyapı',
    description: 'Seçilen sistemleri marka yapısına göre kurar; sayfa, içerik, ürün, kanal, otomasyon, reklam veya operasyon altyapılarını çalışır hale getiririz.',
  },
  {
    number: '05',
    title: 'Verilerle Yönetiriz',
    short: 'Veri',
    stage: 'Operasyon',
    description: 'Satış, trafik, dönüşüm, reklam, müşteri, teklif, operasyon ve içerik performansını takip ederek kararları veriye dayalı hale getiririz.',
  },
  {
    number: '06',
    title: 'Büyütürüz',
    short: 'Büyüme',
    stage: 'Büyüme',
    description:
      'Sistem çalışmaya başladıktan sonra optimizasyon, yeni kanal denemeleri, içerik geliştirme, reklam ölçekleme ve operasyon iyileştirme adımlarıyla büyümeyi sürdürürüz.',
  },
];

// Veri ve optimizasyon bölümü — yalnızca 05 ve 06 adımlarının kendi metninde geçen kavramlar.
export const dataSignals = ['Satış', 'Trafik', 'Dönüşüm', 'Reklam', 'Müşteri', 'Teklif', 'Operasyon', 'İçerik'];
export const growthActions = ['Optimizasyon', 'Yeni kanal denemeleri', 'İçerik geliştirme', 'Reklam ölçekleme', 'Operasyon iyileştirme'];

export const processContinuity = {
  title: 'Tek Seferlik Kurulum Değil, Geliştirilebilir Sistem',
  description:
    "GloventGlobal'da süreç yalnızca bir sayfa, mağaza veya kampanya kurmakla bitmez. Kurulan yapının ölçülebilir, yönetilebilir ve geliştirilebilir olması hedeflenir.",
};

export const processAdaptive = {
  eyebrow: 'SİSTEM BİLEŞENLERİ',
  title: 'Doğru Büyüme Sistemi Her Marka İçin Aynı Değildir',
  description:
    'Bazı markalar için öncelik Amazon veya Etsy olabilir. Bazı markalar için Shopify, B2B showroom, yapay zeka, otomasyon veya reklam sistemi daha kritik olabilir. GloventGlobal, markanın ihtiyacına göre doğru bileşenleri bir araya getirir.',
};

export const workModelsHeader = {
  eyebrow: 'Çalışma Modeli',
  title: 'İhtiyaca Göre Kuruyor, Yönetiyor ve Geliştiriyoruz.',
};

export const workModels = [
  {
    n: '01',
    title: 'Sistem Kurulumu',
    desc: 'Markanız için gerekli dijital altyapıyı, pazaryeri yapısını, Shopify / B2B sistemini veya otomasyonları kurar ve uygulanabilir şekilde teslim ederiz.',
  },
  {
    n: '02',
    title: 'Yönetim ve Operasyon',
    desc: 'Kurulan sistemin ürün, içerik, reklam, kampanya ve günlük dijital operasyon süreçlerini birlikte yönetiriz.',
  },
  {
    n: '03',
    title: 'Büyüme Partnerliği',
    desc: 'Markanızın uzun vadeli büyüme hedefleri için strateji, teknoloji, performans ve operasyon süreçlerini düzenli olarak geliştiririz.',
  },
];

export const processCta = {
  title: 'Markanız İçin Hangi Sistemin Öncelikli Olduğunu Birlikte Belirleyelim',
  description:
    'Amazon, Etsy, Shopify, B2B, yapay zeka, otomasyon veya reklam tarafında nereden başlamanız gerektiğini bilmiyorsanız, mevcut yapınızı analiz ederek en doğru büyüme önceliğini birlikte netleştirebiliriz.',
};

// Proje örnekleri — onaylı 4 eşleşmeden farklı iş modellerini gösteren 3'ü (pazaryeri, kendi
// commerce altyapısı, B2B). Veri serviceDetailAdapter.getServiceProject üzerinden, kopya yok.
export const proofServiceSlugs = ['amazon', 'shopify', 'b2b-dijital-showroom'];
