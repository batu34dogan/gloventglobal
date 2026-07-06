import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteNavbar from "@/components/layout/SiteNavbar";
import SiteFooter from "@/components/layout/SiteFooter";
import AnalysisWidget from "@/components/analysis/AnalysisWidget";
import CookieConsent from "@/components/legal/CookieConsent";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
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
  title: "GloventGlobal | Dijital Büyüme, E-Ticaret ve Yapay Zeka Sistemleri",
  description:
    "GloventGlobal; markalar için e-ticaret, yapay zeka, otomasyon, global satış ve dijital büyüme sistemleri kuran stratejik büyüme partneridir.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "any" },
      { url: "/favicon.svg?v=2", type: "image/svg+xml" },
      { url: "/favicon-96x96.png?v=2", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=2",
    apple: [{ url: "/apple-touch-icon.png?v=2", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "GloventGlobal | Dijital Büyüme, E-Ticaret ve Yapay Zeka Sistemleri",
    description:
      "GloventGlobal; markalar için e-ticaret, yapay zeka, otomasyon, global satış ve dijital büyüme sistemleri kuran stratejik büyüme partneridir.",
    url: "https://gloventglobal.com",
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
    title: "GloventGlobal | Dijital Büyüme, E-Ticaret ve Yapay Zeka Sistemleri",
    description:
      "GloventGlobal; markalar için e-ticaret, yapay zeka, otomasyon, global satış ve dijital büyüme sistemleri kuran stratejik büyüme partneridir.",
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
    >
      <body className="min-h-full flex flex-col">
        <SiteNavbar />
        {children}
        <SiteFooter />
        <AnalysisWidget />
        <CookieConsent />
        {/* GA4 — sadece kullanıcı cookie'yi kabul ettikten sonra yüklenir.
            Client component olduğu için SSR'de hiç render edilmez. */}
        {process.env.NODE_ENV === "production" && <GoogleAnalytics gaId={GA_ID} />}
      </body>
    </html>
  );
}