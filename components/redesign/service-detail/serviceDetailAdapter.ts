// Redesign hizmet detay template'i için READ-ONLY adapter. Source of truth her zaman
// components/services/serviceDetailsData.ts — buradaki hiçbir fonksiyon hizmet içeriğini kopyalamaz
// ya da değiştirmez, yalnızca template'in ihtiyaç duyduğu şekle getirir. Buradaki küçük mapping'ler
// hizmet içeriği değil, navigasyon/ilişki bilgisidir ve kaynakları yanlarında belirtilmiştir.
import { serviceDetails } from '@/components/services/serviceDetailsData';
import { guides } from '@/components/guides/guidesData';

export type ServiceData = (typeof serviceDetails)[string];
export type Pillar = 'Strateji' | 'Ticaret' | 'Teknoloji' | 'Operasyon';

// Yetkinlik (pillar) ve kısa hizmet adı — /hizmetler overview'deki Service Explorer
// (components/redesign/services/RDServicesDirectory.tsx) gruplamasıyla birebir aynı.
const SERVICE_META: Record<string, { pillar: Pillar; name: string }> = {
  'marka-konumlandirma': { pillar: 'Strateji', name: 'Marka Konumlandırma' },
  'global-pazara-giris-stratejisi': { pillar: 'Strateji', name: 'Global Pazara Giriş Stratejisi' },
  amazon: { pillar: 'Ticaret', name: 'Amazon Global Satış Sistemi' },
  etsy: { pillar: 'Ticaret', name: 'Etsy Marka Sistemi' },
  ebay: { pillar: 'Ticaret', name: 'eBay Global Satış Sistemi' },
  shopify: { pillar: 'Ticaret', name: 'Shopify Commerce Sistemi' },
  'b2b-dijital-showroom': { pillar: 'Ticaret', name: 'B2B Dijital Showroom' },
  'otomasyon-n8n': { pillar: 'Teknoloji', name: 'Otomasyon & n8n Sistemleri' },
  'yapay-zeka-entegrasyonu': { pillar: 'Teknoloji', name: 'Yapay Zeka Entegrasyonu' },
  'reklam-optimizasyon': { pillar: 'Operasyon', name: 'Reklam & Optimizasyon' },
  'gorsel-icerik-sistemi': { pillar: 'Operasyon', name: 'Görsel & İçerik Sistemi' },
  'sosyal-medya-yonetimi': { pillar: 'Operasyon', name: 'Sosyal Medya Yönetimi' },
};

// Gerçek proje ↔ hizmet eşleşmesi — /hizmetler overview'deki "Gerçek Uygulamalar"
// (components/redesign/services/RDServicesProjects.tsx) ile aynı 4 onaylı eşleşme ve aynı metin.
// Eşleşmesi olmayan 8 hizmette proje bölümü hiç render edilmez.
export type ServiceProject = {
  brand: string;
  capability: string;
  desc: string;
  tone: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  logoMaxWidthPct: number;
};
const PROJECT_BY_SERVICE: Record<string, ServiceProject> = {
  shopify: {
    brand: 'ASL Çanta',
    capability: 'Shopify · Commerce Infrastructure',
    desc: 'Geniş ürün kataloğu için ürün mimarisinden kullanıcı deneyimine uzanan modern e-ticaret ve dijital operasyon altyapısı.',
    tone: 'linear-gradient(160deg,#EFE9DD 0%,#E6DFD0 100%)',
    logo: '/redesign/logos/asl-canta.png',
    logoWidth: 2195,
    logoHeight: 944,
    logoMaxWidthPct: 46,
  },
  amazon: {
    brand: 'BERD',
    capability: 'Amazon · Market Entry',
    desc: 'Türkiye’den global pazarlara açılma sürecinde pazaryeri, satış ve büyüme yapısının oluşturulması.',
    tone: 'linear-gradient(160deg,#E4E6EA 0%,#D8DBE1 100%)',
    logo: '/redesign/logos/berd.png',
    logoWidth: 1720,
    logoHeight: 849,
    logoMaxWidthPct: 58,
  },
  'b2b-dijital-showroom': {
    brand: 'Ziynet Bijüteri',
    capability: 'B2B · Digital Showroom',
    desc: 'Türkiye’den global alıcılara ulaşmayı destekleyen dijital B2B satış ve marka sunum yapısı.',
    tone: 'linear-gradient(160deg,#E7EAED 0%,#DCE0E5 100%)',
    logo: '/redesign/logos/ziynet-bijuteri.png',
    logoWidth: 1691,
    logoHeight: 793,
    logoMaxWidthPct: 56,
  },
  etsy: {
    brand: 'RituelCo',
    capability: 'Etsy · Commerce',
    desc: 'Global dijital müşterilere ulaşmak için Etsy odaklı satış ve commerce yapısı.',
    tone: 'linear-gradient(160deg,#F0ECE3 0%,#E7E1D3 100%)',
    logo: '/redesign/logos/rituelco.png',
    logoWidth: 1692,
    logoHeight: 1689,
    logoMaxWidthPct: 46,
  },
};

// İlgili hizmetler — küçük, açık, elle yazılmış ilişki haritası. Her ilişki, kaynak hizmetin kendi
// içeriğinde (serviceDetailsData: problem/approach/deliverables/finalCta.supportText) doğrudan
// geçen bir ihtiyaca dayanıyor (örn. Amazon → reklam kurgusu, Shopify → teklif/otomasyon akışı).
const RELATED: Record<string, string[]> = {
  amazon: ['reklam-optimizasyon', 'gorsel-icerik-sistemi', 'global-pazara-giris-stratejisi'],
  etsy: ['gorsel-icerik-sistemi', 'reklam-optimizasyon', 'marka-konumlandirma'],
  ebay: ['global-pazara-giris-stratejisi', 'reklam-optimizasyon', 'gorsel-icerik-sistemi'],
  shopify: ['b2b-dijital-showroom', 'otomasyon-n8n', 'gorsel-icerik-sistemi'],
  'b2b-dijital-showroom': ['shopify', 'otomasyon-n8n', 'marka-konumlandirma'],
  'otomasyon-n8n': ['yapay-zeka-entegrasyonu', 'shopify', 'b2b-dijital-showroom'],
  'yapay-zeka-entegrasyonu': ['otomasyon-n8n', 'gorsel-icerik-sistemi', 'reklam-optimizasyon'],
  'reklam-optimizasyon': ['amazon', 'etsy', 'gorsel-icerik-sistemi'],
  'gorsel-icerik-sistemi': ['etsy', 'sosyal-medya-yonetimi', 'yapay-zeka-entegrasyonu'],
  'marka-konumlandirma': ['global-pazara-giris-stratejisi', 'gorsel-icerik-sistemi', 'sosyal-medya-yonetimi'],
  'sosyal-medya-yonetimi': ['gorsel-icerik-sistemi', 'marka-konumlandirma', 'reklam-optimizasyon'],
  'global-pazara-giris-stratejisi': ['marka-konumlandirma', 'amazon', 'ebay'],
};

export function getServiceSlugs() {
  return Object.keys(serviceDetails);
}

export function getServiceDetailView(slug: string) {
  const data = serviceDetails[slug];
  const meta = SERVICE_META[slug];
  if (!data || !meta) return null;

  // finalCta.supportText gerçek kapsam anahtar kelimelerini "•" ile ayrılmış tutuyor
  // (örn. "Mağaza Kurulumu • Ürün Listeleme • Amazon SEO …") — yeni kelime üretilmiyor.
  const scopeKeywords = data.finalCta.supportText
    .split('•')
    .map((s) => s.trim())
    .filter(Boolean);

  // guidesData.ts'teki gerçek relatedServiceSlug alanı üzerinden, rehber listesindeki stratejik
  // sıralamayla (order) ilk 3 rehber. Eşleşme yoksa boş dizi → bölüm render edilmez.
  const relatedGuides = Object.values(guides)
    .filter((g) => g.relatedServiceSlug === slug)
    .sort((a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER))
    .slice(0, 3)
    .map((g) => ({ slug: g.slug, title: g.title, excerpt: g.excerpt, category: g.category, readTime: g.readTime }));

  const relatedServices = (RELATED[slug] ?? [])
    .filter((s) => serviceDetails[s] && SERVICE_META[s])
    .map((s) => ({ slug: s, name: SERVICE_META[s].name, pillar: SERVICE_META[s].pillar, description: serviceDetails[s].description }));

  return {
    slug,
    data,
    pillar: meta.pillar,
    name: meta.name,
    scopeKeywords,
    project: PROJECT_BY_SERVICE[slug] ?? null,
    relatedGuides,
    relatedServices,
  };
}

export type ServiceDetailView = NonNullable<ReturnType<typeof getServiceDetailView>>;
export type RelatedGuide = ServiceDetailView['relatedGuides'][number];
export type RelatedService = ServiceDetailView['relatedServices'][number];

// /redesign/nasil-calisiyoruz gibi diğer redesign sayfaları için READ-ONLY yardımcılar — aynı
// SERVICE_META ve PROJECT_BY_SERVICE kaynaklarını yeniden kullanır, ikinci bir mapping oluşturmaz.
export const PILLAR_ORDER: Pillar[] = ['Strateji', 'Ticaret', 'Teknoloji', 'Operasyon'];

export function getServicesByPillar() {
  return PILLAR_ORDER.map((pillar) => ({
    pillar,
    services: Object.entries(SERVICE_META)
      .filter(([slug, m]) => m.pillar === pillar && serviceDetails[slug])
      .map(([slug, m]) => ({ slug, name: m.name })),
  }));
}

export function getServiceProject(slug: string) {
  const project = PROJECT_BY_SERVICE[slug];
  const meta = SERVICE_META[slug];
  return project && meta ? { slug, serviceName: meta.name, project } : null;
}
