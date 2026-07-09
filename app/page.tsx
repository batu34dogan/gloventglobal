import GloventIntro from "@/components/intro/GloventIntro";
import HomeContent from "@/components/home/HomeContent";
import JsonLd from "@/components/seo/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "GloventGlobal",
            url: "https://gloventglobal.com",
            logo: "https://gloventglobal.com/icon-512.png",
            email: "info@gloventglobal.com",
            description:
              "GloventGlobal, markalar için e-ticaret, dijital büyüme, yapay zeka ve otomasyon sistemleri kuran bir dijital büyüme partneridir.",
            sameAs: [
              "https://www.instagram.com/gloventglobal",
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "GloventGlobal",
            url: "https://gloventglobal.com",
            inLanguage: "tr-TR",
          },
        ]}
      />
      <GloventIntro />
      <HomeContent />
    </>
  );
}