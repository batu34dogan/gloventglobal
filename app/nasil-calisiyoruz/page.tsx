import ProcessContent from '@/components/process/ProcessContent';
import JsonLd from '@/components/seo/JsonLd';

export default function NasilCalisiyoruzPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://gloventglobal.com' },
            { '@type': 'ListItem', position: 2, name: 'Nasıl Çalışıyoruz', item: 'https://gloventglobal.com/nasil-calisiyoruz' },
          ],
        }}
      />
      <ProcessContent />
    </>
  );
}