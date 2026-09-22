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
      'GloventGlobal, markalar için e-ticaret, dijital büyüme, yapay zeka ve otomasyon sistemleri kuran bir dijital büyüme partneridir.',
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
