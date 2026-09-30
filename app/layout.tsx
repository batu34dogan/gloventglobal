import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AnalysisWidget from "@/components/analysis/AnalysisWidget";
import CookieConsent from "@/components/legal/CookieConsent";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import HydrationMark from "@/components/layout/HydrationMark";
import { gloAiMode, gloSurface } from "@/lib/glo/flag";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gloventglobal.com"),
  title: "GloventGlobal | Global Growth Partner",
  description:
    "GloventGlobal; strateji, global ticaret, teknoloji, yapay zeka ve operasyon sistemlerini bir araya getirerek markaların sürdürülebilir global büyüme altyapısını kurar.",
  // Root canonical/og:url bilinçli olarak YOK: her production route kendi self canonical'ını tanımlıyor;
  // root değerleri 404 ve tanımsız sayfalara ana sayfa canonical'ı olarak sızıyordu.
  icons: {
    icon: [
      { url: "/favicon.svg?v=2", type: "image/svg+xml" },
      { url: "/favicon.ico?v=2", sizes: "any" },
      { url: "/favicon-96x96.png?v=2", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=2",
    apple: [{ url: "/apple-touch-icon.png?v=2", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "GloventGlobal | Global Growth Partner",
    description:
      "GloventGlobal; strateji, global ticaret, teknoloji, yapay zeka ve operasyon sistemlerini bir araya getirerek markaların sürdürülebilir global büyüme altyapısını kurar.",
    siteName: "GloventGlobal",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/glovent-platform-hero.png",
        width: 1534,
        height: 1025,
        alt: "GloventGlobal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GloventGlobal | Global Growth Partner",
    description:
      "GloventGlobal; strateji, global ticaret, teknoloji, yapay zeka ve operasyon sistemlerini bir araya getirerek markaların sürdürülebilir global büyüme altyapısını kurar.",
    images: ["/glovent-platform-hero.png"],
  },
};

// GA4 Measurement ID — Vercel'de NEXT_PUBLIC_GA_ID env set edilmişse oradan okunur,
// yoksa sabit ID kullanılır.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-KY8GWDRR7G";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      // rd-js sınıfı head script'i tarafından hydration öncesi eklenir.
      suppressHydrationWarning
    >
      <head>
        {/* Progressive enhancement: JS varsa reveal animasyonlarının gizli başlangıç durumu (html.rd-js)
            etkinleşir; uygulama 4 sn içinde hydrate olmazsa sınıf kaldırılır ve içerik görünür kalır. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('rd-js');setTimeout(function(){if(!window.__rdHydrated)document.documentElement.classList.remove('rd-js')},4000);",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {/* Navbar/footer root layout'ta değil: her route (ve 404'ler) kendi RDNavbar/RDFooter'ını render eder. */}
        {children}
        <AnalysisWidget gloSurface={gloSurface()} gloAi={gloAiMode()} />
        <CookieConsent />
        <HydrationMark />
        {/* GA4 — sadece kullanıcı cookie'yi kabul ettikten sonra yüklenir.
            Client component olduğu için SSR'de hiç render edilmez. */}
        {process.env.NODE_ENV === "production" && <GoogleAnalytics gaId={GA_ID} />}
      </body>
    </html>
  );
}