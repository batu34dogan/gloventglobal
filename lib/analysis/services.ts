// Analiz önerilerinde gösterilen hizmet bilgisi. Eski AnalysisContent'teki yerel serviceInfo başlıkları
// (ör. "B2B Satış Sistemi", "Yapay Zeka ve Karar Sistemleri") production ile uyuşmuyordu; artık ad ve
// kısa açıklama /hizmetler overview'deki gerçek hizmet verisinden (servicesDirectoryData) okunuyor.
// Yeni metin/vaat üretilmiyor. Hafif bir modül — büyük serviceDetailsData client bundle'a girmiyor.
import { serviceDirectoryGroups } from '@/components/redesign/services/servicesDirectoryData';

export const SERVICE_TAGS = [
  'amazon',
  'etsy',
  'ebay',
  'shopify',
  'b2b-dijital-showroom',
  'marka-konumlandirma',
  'gorsel-icerik-sistemi',
  'yapay-zeka-entegrasyonu',
  'sosyal-medya-yonetimi',
  'reklam-optimizasyon',
  'otomasyon-n8n',
  'global-pazara-giris-stratejisi',
] as const;

export type ServiceTag = (typeof SERVICE_TAGS)[number];

export function isServiceTag(v: unknown): v is ServiceTag {
  return typeof v === 'string' && (SERVICE_TAGS as readonly string[]).includes(v);
}

const BY_SLUG = new Map(serviceDirectoryGroups.flatMap((g) => g.items).map((item) => [item.slug, item]));

export type AnalysisService = { tag: ServiceTag; name: string; summary: string; href: string };

export function getAnalysisService(tag: ServiceTag): AnalysisService {
  const item = BY_SLUG.get(tag);
  // Her SERVICE_TAG için overview'de karşılık var; yine de veri kayarsa slug'la güvenli düşüş.
  return { tag, name: item?.title ?? tag, summary: item?.desc ?? '', href: `/hizmetler/${tag}` };
}
