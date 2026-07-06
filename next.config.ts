import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [100],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Sitenin iframe içinde açılmasını engeller (clickjacking koruması)
          { key: "X-Frame-Options", value: "DENY" },
          // Tarayıcının MIME tipini tahmin etmesini engeller
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Dış linklerde tam URL yerine sadece origin gider
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Kamera, mikrofon, konum, ödeme API'lerini varsayılan kapalı tutar
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          // HTTPS kullanımını güçlendirir (Vercel HTTPS aktif olduğu için güvenli)
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          // CSP bu turda eklenmedi — GA4 inline script, n8n webhook ve
          // Next.js runtime scriptleriyle çakışma riski var. Ayrı turda planlanacak.
        ],
      },
    ];
  },
};

export default nextConfig;