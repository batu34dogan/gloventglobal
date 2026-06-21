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
    problem: {
      eyebrow: string;
      title: string;
      description: string;
      cards: { number: string; title: string; description: string }[];
    };
    approach: {
      eyebrow: string;
      title: string;
      description: string;
      steps: { number: string; title: string; description: string }[];
    };
    process: {
      eyebrow: string;
      title: string;
      description: string;
      steps: { number: string; title: string; description: string }[];
    };
    deliverables: {
      eyebrow: string;
      title: string;
      description: string;
      items: { number: string; title: string; description: string }[];
    };
    finalCta: {
      title: string;
      description: string;
      ctaLabel: string;
      supportText: string;
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
    problem: {
      eyebrow: 'ÇÖZDÜĞÜ SORUN',
      title: 'Etsy’de Mağaza Açmak Yeterli Değil, Doğru Sunum Sistemi Gerekir',
      description:
        'Birçok marka Etsy’ye ürün yükler ama mağaza dili, görsel sunum, SEO, kategori seçimi ve ürün açıklamaları birlikte çalışmadığı için görünürlük ve satış potansiyeli sınırlı kalır.',
      cards: [
        {
          number: '01',
          title: 'Yetersiz Ürün Sunumu',
          description: 'Ürün kaliteli olsa bile görseller, başlıklar ve açıklamalar satış algısını yeterince güçlü şekilde desteklemeyebilir.',
        },
        {
          number: '02',
          title: 'Etsy SEO ve Anahtar Kelime Kurgusu',
          description: 'Ürünün doğru alıcıya ulaşması için başlık, etiket, açıklama ve kategori yapısının birlikte planlanması gerekir.',
        },
        {
          number: '03',
          title: 'Bütünlük Kurmayan Mağaza Algısı',
          description: 'Mağaza kapağı, ürün sıralaması, koleksiyon dili ve marka anlatımı bir bütün gibi görünmediğinde güven ve profesyonel algı zayıflar.',
        },
        {
          number: '04',
          title: 'Plansız Yayın ve Test Süreci',
          description: 'Ürünleri yayına almak tek başına yeterli değildir; görünürlük için reklam, fiyat, ürün seçimi ve test süreci birlikte planlanmalıdır.',
        },
      ],
    },
    approach: {
      eyebrow: 'GLOVENTGLOBAL YAKLAŞIMI',
      title: 'Etsy Mağazasını Tek Tek İşler Değil, Bir Satış Sistemi Olarak Kurarız',
      description:
        'Etsy’de başarılı bir mağaza yalnızca ürün yüklemekle oluşmaz. Ürün seçimi, görsel sunum, başlık, açıklama, SEO, mağaza bütünlüğü, fiyatlandırma ve reklam yapısı birlikte planlandığında daha güçlü bir satış zemini ortaya çıkar.',
      steps: [
        {
          number: '01',
          title: 'Ürün ve Pazar Okuması',
          description: 'Ürünün Etsy kitlesine, rekabet yapısına, fiyat aralığına ve kategori dinamiklerine uygunluğunu değerlendiririz.',
        },
        {
          number: '02',
          title: 'Görsel ve Mağaza Dili',
          description: 'Ürün fotoğrafları, kapak görselleri, mağaza düzeni ve marka anlatımını tek bir görsel kimlik içinde kurgularız.',
        },
        {
          number: '03',
          title: 'Listeleme ve SEO Yapısı',
          description: 'Başlık, açıklama, etiket, kategori ve ürün varyasyonlarını Etsy arama mantığına uygun şekilde planlarız.',
        },
        {
          number: '04',
          title: 'Reklam ve Test Süreci',
          description: 'İlk ürünlerin yayınlanması sonrası reklam, fiyat, ürün seçimi ve dönüşüm verilerine göre sistemi test edip geliştiririz.',
        },
      ],
    },
    process: {
      eyebrow: 'SÜREÇ',
      title: 'Etsy Mağazanızı Satışa Hazır Hale Getiren Yol Haritası',
      description:
        'Etsy mağazasını yalnızca teknik olarak açmakla kalmayız; ürün, sunum, listeleme, SEO ve test sürecini birlikte planlayarak mağazayı daha düzenli ve yönetilebilir bir satış yapısına dönüştürürüz.',
      steps: [
        {
          number: '01',
          title: 'Keşif ve Ürün Analizi',
          description: 'Ürünlerinizi, hedef kitlenizi, fiyat aralığınızı, rekabet ortamını ve Etsy’ye uygunluk durumunu analiz ederiz.',
        },
        {
          number: '02',
          title: 'Mağaza ve Marka Kurgusu',
          description: 'Mağaza adı, kapak alanı, profil dili, kategori mantığı ve genel mağaza algısını markanızla uyumlu hale getiririz.',
        },
        {
          number: '03',
          title: 'Ürün Listeleme ve SEO',
          description: 'Başlık, açıklama, etiket, kategori, varyasyon ve ürün detaylarını Etsy arama mantığına göre hazırlarız.',
        },
        {
          number: '04',
          title: 'Görsel Sunum Sistemi',
          description: 'Ürün fotoğrafları, kapak görselleri, detay kareleri ve mağaza içi görsel bütünlüğü satış algısını destekleyecek şekilde kurgularız.',
        },
        {
          number: '05',
          title: 'Yayın, Test ve Optimizasyon',
          description: 'İlk ürünler yayına alındıktan sonra reklam, fiyat, trafik ve dönüşüm verilerine göre mağaza yapısını test edip geliştiririz.',
        },
      ],
    },
    deliverables: {
      eyebrow: 'TESLİM / ÇIKTILAR',
      title: 'Etsy Mağazanız İçin Hazırlanan Sistem Çıktıları',
      description:
        'Etsy hizmeti sonunda yalnızca açılmış bir mağaza değil; ürünlerinizi daha doğru sunan, mağaza bütünlüğünü güçlendiren ve satış sürecini yönetilebilir hale getiren bir yapı hazırlanır.',
      items: [
        {
          number: '01',
          title: 'Mağaza Yapısı',
          description: 'Etsy mağaza profili, kapak alanı, mağaza dili ve genel görünüm markanızla uyumlu şekilde düzenlenir.',
        },
        {
          number: '02',
          title: 'Ürün Listeleme Kurgusu',
          description: 'Başlık, açıklama, etiket, kategori, varyasyon ve ürün detayları Etsy arama mantığına uygun şekilde hazırlanır.',
        },
        {
          number: '03',
          title: 'Görsel Sunum Planı',
          description: 'Ürün kapak görselleri, detay kareleri, lifestyle görsel ihtiyacı ve mağaza içi görsel bütünlük planlanır.',
        },
        {
          number: '04',
          title: 'SEO ve Anahtar Kelime Yapısı',
          description: 'Ürünlerin doğru alıcıya ulaşması için Etsy SEO, etiket yapısı ve kategori mantığı oluşturulur.',
        },
        {
          number: '05',
          title: 'Reklam ve Test Yol Haritası',
          description: 'İlk yayın sonrası reklam, fiyat, ürün seçimi ve dönüşüm verileri için izlenecek test süreci belirlenir.',
        },
        {
          number: '06',
          title: 'Gelişim Önerileri',
          description: 'Mağazanın sonraki aşamada nasıl iyileştirileceği, hangi ürünlerin öne çıkarılacağı ve hangi alanların optimize edileceği netleştirilir.',
        },
      ],
    },
    finalCta: {
      title: 'Etsy Mağazanız İçin Doğru Satış Sistemini Birlikte Kuralım',
      description:
        'Ürünlerinizi, mevcut görsel dilinizi ve hedef müşteri kitlenizi birlikte değerlendirerek Etsy mağazanız için doğru listeleme, sunum, SEO ve büyüme yol haritasını planlayalım.',
      ctaLabel: 'Etsy Hizmet Planı Oluştur',
      supportText: 'Mağaza Kurulumu • Ürün Listeleme • Etsy SEO • Görsel Sunum • Reklam • Optimizasyon',
    },
  },
};