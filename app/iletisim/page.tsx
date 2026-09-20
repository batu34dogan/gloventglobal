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
      {/* pt-28 → fixed navbar clearance (navbar ~72px + nefes boşluğu)
          min-h-screen → footer her zaman viewport altında kalır
          pb-20 → footer ile form arası alt boşluk                        */}
      <main className="min-h-screen bg-[#070d18] px-6 pb-20 pt-28 text-white sm:px-10 md:pt-32">
        <div className="mx-auto max-w-3xl">
          <ContactContent />
        </div>
      </main>
    </>
  );
}
