// app/page.tsx (production ana sayfa) ve app/redesign/page.tsx için ortak, tek kaynaktan
// Organization + WebSite JSON-LD verisi — ikisi de aynı gerçek şirket bilgilerini kullanır,
// bağımsız birer hardcoded kopya olarak tutulmaz.
export const organizationJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GloventGlobal',
    url: 'https://gloventglobal.com',
    logo: 'https://gloventglobal.com/icon-512.png',
    email: 'info@gloventglobal.com',
    description:
      'GloventGlobal; strateji, global ticaret, teknoloji, yapay zeka ve operasyon sistemlerini bir araya getirerek markaların sürdürülebilir global büyüme altyapısını kurar.',
    sameAs: ['https://www.instagram.com/gloventglobal'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'GloventGlobal',
    url: 'https://gloventglobal.com',
    inLanguage: 'tr-TR',
  },
];
