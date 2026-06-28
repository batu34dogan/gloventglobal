import AboutContent from '@/components/about/AboutContent';
import JsonLd from '@/components/seo/JsonLd';

export default function HakkimizdaPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://gloventglobal.com' },
            { '@type': 'ListItem', position: 2, name: 'Hakkımızda', item: 'https://gloventglobal.com/hakkimizda' },
          ],
        }}
      />
      <AboutContent />
    </>
  );
}