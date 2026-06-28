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
            description:
              "Markalar için e-ticaret, yapay zeka, otomasyon, global satış ve dijital büyüme sistemleri kuran stratejik büyüme partneri.",
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "GloventGlobal",
            url: "https://gloventglobal.com",
          },
        ]}
      />
      <GloventIntro />
      <HomeContent />
    </>
  );
}