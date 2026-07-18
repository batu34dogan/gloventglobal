import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [100],
  },

  // /rehberler/ prefix'i olmadan erişilen rehber URL'lerini doğru adrese yönlendir.
  // Örnek: /amazon-fba-nedir → /rehberler/amazon-fba-nedir (308 kalıcı)
  // Google geçmişte bu tarz URL'leri taramış olabilir; 404 yerine redirect vermek
  // hem crawl bütçesini korur hem SEO sinyali aktarır.
  async redirects() {
    return [
      {
        source: "/amazon-:slug*",
        destination: "/rehberler/amazon-:slug*",
        permanent: true,
      },
      {
        source: "/amazonda-:slug*",
        destination: "/rehberler/amazonda-:slug*",
        permanent: true,
      },
      {
        source: "/etsy-:slug*",
        destination: "/rehberler/etsy-:slug*",
        permanent: true,
      },
      {
        source: "/etsyde-:slug*",
        destination: "/rehberler/etsyde-:slug*",
        permanent: true,
      },
    ];
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