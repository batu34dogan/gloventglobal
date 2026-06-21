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
    dataSystem: {
      eyebrow: string;
      title: string;
      description: string;
      // Gerçek dashboard görselleri hazır olan hizmetlerde dolu, görsel yokken boş/yok bırakılır.
      note?: string;
      dashboardImages?: string[];
      // Görsel henüz hazır olmayan hizmetler için geçici, metin tabanlı veri kartları. Görseller
      // eklendiğinde bu alanın silinmesi yeterli — şablon otomatik olarak görsel moduna döner.
      dataCards?: { title: string; description: string }[];
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
      title: 'Etsy’de Satışa Hazır Mağaza Kurmak İsteyenler İçin',
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
          title: 'Yeni Başlayan veya Sonuç Alamayan Mağazalar',
          description: 'Etsy mağazası açmak isteyen ya da mağazası açık olduğu halde yeterli görüntülenme, favori veya satış alamayan işletmeler için uygundur.',
        },
      ],
    },
    problem: {
      eyebrow: 'SİSTEM EKSİKLERİ',
      title: 'Etsy’de Satış İçin Mağaza Açmak Değil, Sunum Sistemi Kurmak Gerekir',
      description:
        'Birçok marka Etsy’ye ürün yükler, hatta mağazasını açıp satış bekler; ancak mağaza dili, görsel sunum, SEO, kategori seçimi ve ürün açıklamaları birlikte çalışmadığında görünürlük, favori ve satış potansiyeli sınırlı kalır.',
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
    dataSystem: {
      eyebrow: 'VERİYLE YÖNETİLEN SİSTEM',
      title: 'Etsy Mağazanızı Verilerle Geliştirilen Bir Satış Sistemine Dönüştürüyoruz',
      description:
        'Mağaza yayına alındıktan sonra görüntülenme, tıklama, favori, reklam, fiyat ve dönüşüm sinyallerini birlikte takip ederiz. Etsy mağazasını yalnızca kurulmuş bir vitrin olarak değil, verilerle geliştirilen bir satış sistemi olarak ele alırız.',
      note: 'Görseller, performans takibi mantığını temsil eden anonimleştirilmiş dashboard örnekleridir.',
      dashboardImages: [
        '/dashboards/etsy-dashboard-01.jpg',
        '/dashboards/etsy-dashboard-02.webp',
        '/dashboards/etsy-dashboard-03.jpg',
        '/dashboards/etsy-dashboard-04.jpg',
        '/dashboards/etsy-dashboard-05.webp',
      ],
    },
    process: {
      eyebrow: 'SÜREÇ',
      title: 'Etsy Mağazanızı Satışa Hazırlayan Yol Haritası',
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
      eyebrow: 'HAZIRLANAN SİSTEM',
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
  amazon: {
    eyebrow: 'AMAZON DANIŞMANLIĞI',
    title: 'Amazon’da Satışa Hazır Ürün ve Mağaza Sistemi Kuruyoruz',
    description:
      'Amazon’da yalnızca ürün listelemek yeterli değildir. Doğru kategori, güçlü ürün sunumu, SEO uyumlu listeleme, fiyatlandırma, reklam ve operasyon yapısı birlikte planlandığında sürdürülebilir bir satış sistemi oluşur.',
    ctaLabel: 'Amazon Hizmet Planı Oluştur',
    audience: {
      eyebrow: 'KİMLER İÇİN?',
      title: 'Amazon’da Satış Sistemi Kurmak veya Güçlendirmek İsteyen Markalar İçin',
      description:
        'Amazon, doğru ürün seçimi, listeleme kalitesi, reklam yönetimi ve operasyon disiplini isteyen bir pazaryeridir. Ürün, kategori, fiyat, rekabet ve reklam yapısı birlikte planlandığında daha güçlü bir satış zemini oluşur.',
      cards: [
        {
          number: '01',
          title: 'Üreticiler ve Marka Sahipleri',
          description: 'Ürünlerini Amazon Türkiye veya global Amazon pazarlarında daha sistemli şekilde satışa açmak isteyen üreticiler için uygundur.',
        },
        {
          number: '02',
          title: 'Amazon’a Doğru Altyapıyla Başlamak İsteyenler',
          description: 'Hesap açılışı, ürün listeleme, kategori seçimi, SEO ve ilk reklam yapısını baştan doğru kurmak isteyen işletmeler için uygundur.',
        },
        {
          number: '03',
          title: 'Satışı Olan Ama Büyümek İsteyen Markalar',
          description: 'Mevcut ürünlerini daha doğru listeleme, reklam ve fiyat stratejisiyle geliştirmek isteyen markalar için uygundur.',
        },
        {
          number: '04',
          title: 'Marka Koruma ve Listeleme Sorunu Yaşayanlar',
          description: 'Ürün sayfası, marka kaydı, yanlış kategori, hatalı listeleme veya başka satıcı sorunları yaşayan markalar için uygundur.',
        },
      ],
    },
    problem: {
      eyebrow: 'SİSTEM EKSİKLERİ',
      title: 'Amazon’da Ürün Yüklemek Değil, Satış Sistemi Kurmak Gerekir',
      description:
        'Birçok marka Amazon’a ürün yükler ama kategori, listeleme kalitesi, fiyat, rekabet, reklam ve operasyon yapısı birlikte çalışmadığında görünürlük ve satış potansiyeli sınırlı kalır.',
      cards: [
        {
          number: '01',
          title: 'Yetersiz Listeleme Kurgusu',
          description: 'Başlık, açıklama, bullet point, görsel ve ürün detayları doğru kurgulanmadığında ürün güçlü bir satış algısı oluşturamayabilir.',
        },
        {
          number: '02',
          title: 'Yanlış Kategori ve Rekabet Konumu',
          description: 'Ürünün doğru kategori, fiyat aralığı ve rakip yapısı içinde konumlanması satış performansı için kritiktir.',
        },
        {
          number: '03',
          title: 'Veriye Dayanmayan Reklam Kurgusu',
          description: 'Amazon reklamları ürün, bütçe, anahtar kelime ve dönüşüm verileriyle birlikte planlanmadığında maliyet artabilir.',
        },
        {
          number: '04',
          title: 'Operasyon ve Stok Takibi Eksikliği',
          description: 'Sipariş, stok, teslimat, iade ve müşteri deneyimi süreçleri kontrol edilmediğinde mağaza performansı zayıflayabilir.',
        },
      ],
    },
    approach: {
      eyebrow: 'GLOVENTGLOBAL YAKLAŞIMI',
      title: 'Amazon Mağazasını Tek Tek İşler Değil, Bir Satış Sistemi Olarak Kurarız',
      description:
        'Amazon’da sürdürülebilir satış için ürün, kategori, listeleme, reklam, fiyatlandırma ve operasyon süreçlerinin birlikte çalışması gerekir. GloventGlobal bu parçaları tek bir satış sistemi içinde kurgular.',
      steps: [
        {
          number: '01',
          title: 'Ürün ve Rekabet Analizi',
          description: 'Ürünün kategori, fiyat, rakip, talep ve kârlılık açısından Amazon’a uygunluğunu değerlendiririz.',
        },
        {
          number: '02',
          title: 'Listeleme ve SEO Yapısı',
          description: 'Başlık, bullet point, açıklama, görsel sıralaması ve anahtar kelime yapısını Amazon arama mantığına göre planlarız.',
        },
        {
          number: '03',
          title: 'Reklam ve Büyüme Kurgusu',
          description: 'Sponsorlu ürün reklamları, anahtar kelime testleri, bütçe ve dönüşüm verilerini birlikte değerlendiririz.',
        },
        {
          number: '04',
          title: 'Operasyon ve Performans Takibi',
          description: 'Stok, sipariş, iade, müşteri deneyimi ve mağaza performansını satış sisteminin parçası olarak ele alırız.',
        },
      ],
    },
    dataSystem: {
      eyebrow: 'VERİYLE YÖNETİLEN SİSTEM',
      title: 'Amazon Mağazanızı Verilerle Geliştirilen Bir Satış Sistemine Dönüştürüyoruz',
      description:
        'Mağaza yayına alındıktan sonra trafik, tıklama, reklam, dönüşüm, stok ve satış sinyallerini birlikte takip ederiz. Amazon mağazasını yalnızca kurulmuş bir vitrin olarak değil, verilerle geliştirilen bir satış sistemi olarak ele alırız.',
      // Amazon için gerçek dashboard görselleri henüz hazır değil — Etsy'deki görsel carousel'i
      // taklit eden sahte/placeholder görsel KOYMUYORUZ. Bunun yerine geçici, metin tabanlı veri
      // kartları kullanılıyor. Gerçek görseller hazır olduğunda buraya sadece `dashboardImages`
      // eklenmesi yeterli olacak — şablon otomatik olarak görsel moduna geçecek (kod değişikliği gerekmez).
      dataCards: [
        {
          title: 'Trafik ve Görünürlük',
          description: 'Ürünlerin hangi arama ve kategori alanlarında görünürlük aldığını takip ederiz.',
        },
        {
          title: 'Reklam Performansı',
          description: 'Tıklama, bütçe, anahtar kelime ve dönüşüm sinyallerini birlikte değerlendiririz.',
        },
        {
          title: 'Listeleme Kalitesi',
          description: 'Başlık, görsel, bullet point ve açıklama yapısının etkisini analiz ederiz.',
        },
        {
          title: 'Stok ve Operasyon Takibi',
          description: 'Stok, sipariş, iade ve teslimat süreçlerini satış performansının parçası olarak takip ederiz.',
        },
        {
          title: 'Gelişim Alanları',
          description: 'Hangi ürünlerin, fiyatların, reklamların veya içerik alanlarının geliştirilmesi gerektiğini belirleriz.',
        },
      ],
    },
    process: {
      eyebrow: 'SÜREÇ',
      title: 'Amazon Mağazanızı Satışa Hazırlayan Yol Haritası',
      description:
        'Amazon mağazasını yalnızca teknik olarak açmakla kalmayız; ürün, kategori, listeleme, reklam ve operasyon sürecini birlikte planlayarak mağazayı yönetilebilir bir satış yapısına dönüştürürüz.',
      steps: [
        {
          number: '01',
          title: 'Keşif ve Ürün Analizi',
          description: 'Ürünlerinizi, hedef pazarınızı, fiyat aralığınızı, rakiplerinizi ve Amazon’a uygunluk durumunu analiz ederiz.',
        },
        {
          number: '02',
          title: 'Kategori ve Mağaza Kurgusu',
          description: 'Kategori seçimi, mağaza yapısı, ürün grupları ve satış stratejisini markanızla uyumlu hale getiririz.',
        },
        {
          number: '03',
          title: 'Ürün Listeleme ve SEO',
          description: 'Başlık, açıklama, bullet point, görsel sıralaması ve anahtar kelime yapısını Amazon arama mantığına göre hazırlarız.',
        },
        {
          number: '04',
          title: 'Reklam ve Yayın Süreci',
          description: 'İlk ürünler yayına alındıktan sonra reklam, bütçe, anahtar kelime ve dönüşüm verilerine göre test sürecini başlatırız.',
        },
        {
          number: '05',
          title: 'Takip ve Optimizasyon',
          description: 'Stok, satış, reklam, trafik ve dönüşüm verilerine göre mağaza yapısını düzenli olarak geliştiririz.',
        },
      ],
    },
    deliverables: {
      eyebrow: 'HAZIRLANAN SİSTEM',
      title: 'Amazon Mağazanız İçin Hazırlanan Sistem Çıktıları',
      description:
        'Amazon hizmeti sonunda yalnızca açılmış bir mağaza değil; ürünlerinizi daha doğru konumlandıran, listeleme kalitesini güçlendiren ve satış sürecini yönetilebilir hale getiren bir yapı hazırlanır.',
      items: [
        {
          number: '01',
          title: 'Mağaza ve Kategori Yapısı',
          description: 'Amazon mağaza yapısı, kategori seçimi ve ürün gruplama mantığı markanızla uyumlu şekilde düzenlenir.',
        },
        {
          number: '02',
          title: 'Ürün Listeleme Kurgusu',
          description: 'Başlık, bullet point, açıklama, görsel sıralaması, varyasyon ve ürün detayları Amazon arama mantığına uygun şekilde hazırlanır.',
        },
        {
          number: '03',
          title: 'SEO ve Anahtar Kelime Yapısı',
          description: 'Ürünlerin doğru alıcıya ulaşması için Amazon SEO, arama terimleri ve kategori yapısı oluşturulur.',
        },
        {
          number: '04',
          title: 'Reklam Test Yol Haritası',
          description: 'İlk reklam kampanyaları için ürün, bütçe, anahtar kelime ve dönüşüm odaklı test planı belirlenir.',
        },
        {
          number: '05',
          title: 'Operasyon Kontrol Planı',
          description: 'Stok, sipariş, iade, teslimat ve müşteri deneyimi süreçleri için kontrol alanları netleştirilir.',
        },
        {
          number: '06',
          title: 'Gelişim Önerileri',
          description: 'Mağazanın sonraki aşamada nasıl iyileştirileceği, hangi ürünlerin öne çıkarılacağı ve hangi alanların optimize edileceği belirlenir.',
        },
      ],
    },
    finalCta: {
      title: 'Amazon Mağazanız İçin Doğru Satış Sistemini Birlikte Kuralım',
      description:
        'Ürünlerinizi, mevcut satış yapınızı ve hedef pazarınızı birlikte değerlendirerek Amazon mağazanız için doğru listeleme, reklam, operasyon ve büyüme yol haritasını planlayalım.',
      ctaLabel: 'Amazon Hizmet Planı Oluştur',
      supportText: 'Mağaza Kurulumu • Ürün Listeleme • Amazon SEO • Reklam • Operasyon • Optimizasyon',
    },
  },
};