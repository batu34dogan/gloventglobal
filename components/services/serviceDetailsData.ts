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
    audience: {
      eyebrow: string;
      title: string;
      description: string;
      cards: { number: string; title: string; description: string }[];
    };
  }
> = {
  etsy: {
    eyebrow: 'ETSY MAĞAZA SİSTEMİ',
    title: 'Etsy’de Satışa Hazır Marka ve Mağaza Sistemi Kuruyoruz',
    description:
      'El yapımı, butik, tasarım ve niş ürünler için Etsy mağazanızı yalnızca açmakla kalmıyor; ürün sunumu, görsel dil, listeleme, SEO ve reklam altyapısıyla satışa hazır bir dijital satış sistemi olarak kurguluyoruz.',
    ctaLabel: 'Etsy Hizmet Planı Oluştur',
    audience: {
      eyebrow: 'KİMLER İÇİN?',
      title: 'Etsy’de Doğru Ürün Sunumu ve Mağaza Yapısı Kurmak İsteyen Markalar İçin',
      description:
        'Etsy, yalnızca ürün listelemekten ibaret değildir. Ürünün hikâyesi, görsel dili, kategori seçimi, anahtar kelimeleri ve mağaza bütünlüğü birlikte çalıştığında daha güçlü bir satış zemini oluşur.',
      cards: [
        {
          number: '01',
          title: 'Butik Üreticiler',
          description: 'El yapımı, tasarım veya sınırlı üretim ürünlerini dijital satış kanallarına taşımak isteyen üreticiler için uygundur.',
        },
        {
          number: '02',
          title: 'Deri, Takı ve Aksesuar Markaları',
          description: 'Ürün kalitesi kadar görsel sunum, detay fotoğrafları, açıklama dili ve mağaza konseptiyle öne çıkması gereken markalar için uygundur.',
        },
        {
          number: '03',
          title: 'Niş Ürün Satan Markalar',
          description: 'Ritüel ürünleri, dekorasyon, kişiselleştirilebilir ürünler, dijital ürünler veya özel konseptli koleksiyonlar için Etsy stratejisi oluşturulur.',
        },
        {
          number: '04',
          title: 'Etsy’ye Yeni Başlayacak İşletmeler',
          description: 'Mağaza kurulumu, ürün listeleme, SEO, görsel dil ve ilk reklam yapısını baştan doğru kurmak isteyen işletmeler için uygundur.',
        },
      ],
    },
  },
};