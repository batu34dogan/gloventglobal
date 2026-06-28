import DifferenceContent from '@/components/difference/DifferenceContent';
import JsonLd from '@/components/seo/JsonLd';

export default function FarkimizPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://gloventglobal.com' },
            { '@type': 'ListItem', position: 2, name: 'Farkımız', item: 'https://gloventglobal.com/farkimiz' },
          ],
        }}
      />
      <DifferenceContent />
    </>
  );
}