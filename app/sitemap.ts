import type { MetadataRoute } from "next";

const baseUrl = "https://gloventglobal.com";

// /hizmetler/[slug] altındaki 12 hizmet detay sayfasının slug listesi. serviceDetailsData.ts
// içindeki gerçek anahtarlarla birebir aynı tutuluyor — yeni bir hizmet eklenirse burası da
// güncellenmeli.
const serviceSlugs = [
  "etsy",
  "amazon",
  "shopify",
  "ebay",
  "b2b-dijital-showroom",
  "otomasyon-n8n",
  "reklam-optimizasyon",
  "gorsel-icerik-sistemi",
  "yapay-zeka-entegrasyonu",
  "marka-konumlandirma",
  "sosyal-medya-yonetimi",
  "global-pazara-giris-stratejisi",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/hizmetler`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/hakkimizda`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/farkimiz`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/nasil-calisiyoruz`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/iletisim`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/analiz`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/hizmetler/${slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...servicePages];
}