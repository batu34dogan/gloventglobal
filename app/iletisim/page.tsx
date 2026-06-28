import ContactContent from '@/components/contact/ContactContent';
import JsonLd from '@/components/seo/JsonLd';

export default function IletisimPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'GloventGlobal İletişim',
            url: 'https://gloventglobal.com/iletisim',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://gloventglobal.com' },
              { '@type': 'ListItem', position: 2, name: 'İletişim', item: 'https://gloventglobal.com/iletisim' },
            ],
          },
        ]}
      />
      <ContactContent />
    </>
  );
}