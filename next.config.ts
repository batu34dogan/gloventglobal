import type { NextConfig } from "next";

// Tüm rehber slug'larının exact redirect listesi.
// Next.js'de ":slug*" pattern'i tek-segment URL'lerde güvenilir çalışmıyor;
// exact match her zaman garanti çalışır.
const guideRedirects = [
  // Amazon rehberleri
  "amazon-a-plus-content-nedir",
  "amazon-account-health-nedir",
  "amazon-anahtar-kelime-arastirmasi-nasil-yapilir",
  "amazon-brand-analytics-nedir",
  "amazon-brand-registry-nedir",
  "amazon-buy-box-nedir",
  "amazon-envanter-yonetimi-nasil-yapilir",
  "amazon-fba-nedir",
  "amazon-fbm-mi-fba-mi",
  "amazon-fiyatlandirma-stratejisi-nasil-kurulur",
  "amazon-hesabi-askiya-alinirsa-ne-yapilir",
  "amazon-komisyonlari-ve-maliyetler",
  "amazon-listing-nasil-hazirlanir",
  "amazon-ppc-nasil-calisir",
  "amazon-private-label-nedir",
  "amazon-seller-account-nasil-acilir",
  "amazon-seller-central-nedir",
  "amazon-wholesale-nedir",
  "amazonda-satis-yapmak-icin-sirket-gerekir-mi",
  "amazonda-urun-arastirmasi-nasil-yapilir",
  // Etsy rehberleri
  "etsy-basligi-nasil-yazilir",
  "etsy-fotograf-rehberi",
  "etsy-hesabi-askiya-alinirsa-ne-yapilir",
  "etsy-kargo-rehberi",
  "etsy-reklamlari-nasil-calisir",
  "etsy-seo-rehberi",
  "etsy-tag-nasil-yazilir",
  "etsy-urun-aciklamasi-nasil-yazilir",
  "etsyde-ilk-satis-nasil-alinir",
  // Diğer rehberler
  "b2b-dijital-showroom-nedir-ve-toptan-satista-neden-onemlidir",
  "e-ticaret-otomasyonu-nedir-ve-nasil-kurulur",
  "e-ticarette-dijital-pazarlama-nasil-yapilir",
  "e-ticarette-operasyon-sistemi-nasil-kurulur",
  "e-ticarette-yapay-zeka-gercekten-nerelerde-kullanilir",
  "shopify-mi-etsy-mi-hangi-isletme-icin-hangisi-daha-mantikli",
  "turkiyeden-yurtdisina-urun-satmak-icin-nereden-baslamali",
].map((slug) => ({
  source: `/${slug}`,
  destination: `/rehberler/${slug}`,
  permanent: true,
}));

const nextConfig: NextConfig = {
  images: {
    qualities: [100],
  },

  async redirects() {
    return guideRedirects;
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;