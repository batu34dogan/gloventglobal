// Her hizmet detay sayfasının içeriği bu objede tutulur. Bu dosya sade bir veri modülü — "use
// client" işareti YOK — bu sayede hem sunucu component'i (app/hizmetler/[slug]/page.tsx,
// generateStaticParams + notFound kontrolü için) hem client component'i (ServiceDetailContent.tsx,
// render için) aynı veriyi sorunsuz import edebiliyor. Yeni bir hizmet eklemek = bu objeye yeni
// bir key eklemek (şablon koduna dokunmadan).
export const serviceDetails: Record<
  string,
  {
    eyebrow: string;
    title: string;
    description: string;
    ctaLabel: string;
  }
> = {
  etsy: {
    eyebrow: 'ETSY MAĞAZA SİSTEMİ',
    title: 'Etsy’de Satışa Hazır Marka ve Mağaza Sistemi Kuruyoruz',
    description:
      'El yapımı, butik, tasarım ve niş ürünler için Etsy mağazanızı yalnızca açmakla kalmıyor; ürün sunumu, görsel dil, listeleme, SEO ve reklam altyapısıyla satışa hazır bir dijital satış sistemi olarak kurguluyoruz.',
    ctaLabel: 'Etsy Hizmet Planı Oluştur',
  },
};