import GloventIntro from "@/components/intro/GloventIntro";
import HomeContent from "@/components/home/HomeContent";
import JsonLd from "@/components/seo/JsonLd";
import { organizationJsonLd } from "@/components/seo/organizationSchema";

export default function Home() {
  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <GloventIntro />
      <HomeContent />
    </>
  );
}