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
      // Görselin kart içine nasıl sığacağı. Belirtilmezse 'cover' (Etsy'nin mevcut davranışı,
      // dokunulmadı). Dashboard ekranlarında üst metrik satırının kırpılmaması gerektiğinde
      // 'contain' kullanılır (örn. Amazon) — görselin tamamı görünür, kart zemini koyu kalır.
      imageFit?: 'cover' | 'contain';
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
      note: 'Dashboard görselleri, takip edilen performans metriklerini temsil eden anonimleştirilmiş ekran örnekleridir.',
      // Dashboard ekranlarında üst metrik satırı (ciro/sales/orders/conversion) çok önemli —
      // 'cover' bu alanları kırpabileceği için Amazon'da bilerek 'contain' kullanılıyor.
      imageFit: 'contain',
      dashboardImages: [
        '/dashboards/amazon-dashboard-01.jpg',
        '/dashboards/amazon-dashboard-02.png',
        '/dashboards/amazon-dashboard-03.jpg',
        '/dashboards/amazon-dashboard-04.png',
        '/dashboards/amazon-dashboard-05.webp',
        '/dashboards/amazon-ads-roas-01.png',
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
  shopify: {
    eyebrow: 'SHOPIFY SATIŞ ALTYAPISI',
    title: 'Markanız İçin Shopify Tabanlı Satış Altyapısı Kuruyoruz',
    description:
      'Shopify yalnızca bir web sitesi değil; ürün yönetimi, koleksiyon yapısı, ödeme deneyimi, teklif akışı, içerik dili ve büyüme kanallarıyla birlikte çalışan bir satış altyapısıdır.',
    ctaLabel: 'Shopify Hizmet Planı Oluştur',
    audience: {
      eyebrow: 'KİMLER İÇİN?',
      title: 'Kendi Satış Kanalını Kurmak veya Güçlendirmek İsteyen Markalar İçin',
      description:
        'Shopify, markanın yalnızca pazaryerlerine bağlı kalmadan kendi dijital vitrini, ürün yönetimi ve müşteri deneyimi üzerinden satış sistemi kurmasını sağlar.',
      cards: [
        {
          number: '01',
          title: 'Kendi Satış Kanalını Kurmak İsteyen Markalar',
          description: 'Pazaryerlerine ek olarak kendi markasına ait bağımsız bir satış kanalı kurmak isteyen işletmeler için uygundur.',
        },
        {
          number: '02',
          title: 'Ürün Yönetimini Merkezileştirmek İsteyenler',
          description: 'Ürünlerini, koleksiyonlarını, stoklarını ve içeriklerini daha kontrollü bir dijital altyapı üzerinden yönetmek isteyen markalar için uygundur.',
        },
        {
          number: '03',
          title: 'B2B veya Toptan Satış Yapısı Kurmak İsteyenler',
          description: 'Dijital katalog, teklif listesi, müşteri odaklı ürün sunumu ve toptan satış akışı oluşturmak isteyen markalar için uygundur.',
        },
        {
          number: '04',
          title: 'Mevcut Sitesini Güçlendirmek İsteyen Markalar',
          description: 'Mevcut web sitesinde dönüşüm, hız, ürün sunumu, kategori yapısı veya kullanıcı deneyimi sorunları yaşayan markalar için uygundur.',
        },
      ],
    },
    problem: {
      eyebrow: 'SİSTEM EKSİKLERİ',
      title: 'Shopify’da Başarılı Satış İçin Sadece Site Değil, Sistem Gerekir',
      description:
        'Birçok marka Shopify sitesi kurar ama ürün yapısı, kategori mantığı, içerik dili, ödeme deneyimi, teklif akışı ve dönüşüm sistemi birlikte çalışmadığında site satış üreten bir altyapı yerine yalnızca dijital vitrin olarak kalır.',
      cards: [
        {
          number: '01',
          title: 'Dağınık Ürün ve Kategori Yapısı',
          description: 'Ürünler, koleksiyonlar ve kategori mantığı doğru kurulmadığında kullanıcıların aradığı ürüne ulaşması zorlaşır.',
        },
        {
          number: '02',
          title: 'Zayıf Ürün Sunumu',
          description: 'Görseller, açıklamalar, varyasyonlar ve ürün detayları doğru kurgulanmadığında satış algısı yeterince güçlenmez.',
        },
        {
          number: '03',
          title: 'Dönüşüm Odaklı Olmayan Altyapı',
          description: 'Sepet, teklif, ödeme, iletişim ve yönlendirme akışları net değilse ziyaretçi satışa veya başvuruya dönüşmeyebilir.',
        },
        {
          number: '04',
          title: 'Yönetilebilir Olmayan Sistem',
          description: 'Ürün ekleme, içerik güncelleme, stok takibi ve kampanya yönetimi kolay değilse marka dijital kanalı sürdürülebilir şekilde kullanamaz.',
        },
      ],
    },
    approach: {
      eyebrow: 'GLOVENTGLOBAL YAKLAŞIMI',
      title: 'Shopify Altyapısını Tek Bir Satış Sistemi Olarak Kurgularız',
      description:
        'Shopify tarafında yalnızca tasarım veya tema kurulumu yapmayız. Ürün yapısı, koleksiyon mantığı, kullanıcı deneyimi, teklif akışı, içerik dili ve büyüme kanallarını birlikte çalışan bir sistem olarak ele alırız.',
      steps: [
        {
          number: '01',
          title: 'Ürün ve Satış Modeli Analizi',
          description: 'Ürün yapısını, hedef müşteriyi, satış kanalını, B2B veya B2C ihtiyacını ve operasyon kapasitesini birlikte değerlendiririz.',
        },
        {
          number: '02',
          title: 'Mağaza ve Kategori Kurgusu',
          description: 'Koleksiyonlar, ürün grupları, menü yapısı, filtreleme mantığı ve kullanıcı akışını markaya uygun şekilde planlarız.',
        },
        {
          number: '03',
          title: 'İçerik ve Ürün Sunumu',
          description: 'Ürün görselleri, açıklamalar, kategori metinleri, marka dili ve sayfa içeriklerini satış algısını destekleyecek şekilde kurgularız.',
        },
        {
          number: '04',
          title: 'Dönüşüm ve Yönetim Altyapısı',
          description: 'Sepet, teklif, iletişim, ödeme, ürün yönetimi ve takip araçlarını yönetilebilir bir satış altyapısı haline getiririz.',
        },
      ],
    },
    dataSystem: {
      eyebrow: 'VERİYLE YÖNETİLEN SİSTEM',
      title: 'Shopify Mağazanızı Verilerle Geliştirilen Bir Satış Sistemine Dönüştürüyoruz',
      description:
        'Mağaza yayına alındıktan sonra trafik, ürün görüntülenmeleri, sepet davranışı, teklif talepleri, dönüşüm ve kanal performansını birlikte takip ederiz. Shopify altyapısını yalnızca kurulmuş bir site olarak değil, verilerle geliştirilen bir satış sistemi olarak ele alırız.',
      // Shopify için gerçek dashboard/analytics görselleri henüz hazır değil — Etsy/Amazon'daki
      // görsel carousel'i taklit eden sahte/placeholder görsel KOYMUYORUZ. Bunun yerine geçici,
      // metin tabanlı veri kartları kullanılıyor. Gerçek görseller hazır olduğunda buraya sadece
      // `dashboardImages` eklenmesi yeterli olacak — şablon otomatik olarak görsel moduna geçecek.
      dataCards: [
        {
          title: 'Trafik ve Kanal Kaynakları',
          description: 'Ziyaretçilerin hangi kanal, kampanya veya yönlendirmeler üzerinden geldiğini takip ederiz.',
        },
        {
          title: 'Ürün Görüntülenmeleri',
          description: 'Hangi ürünlerin daha fazla ilgi gördüğünü ve hangi ürünlerin güçlendirilmesi gerektiğini analiz ederiz.',
        },
        {
          title: 'Sepet ve Teklif Davranışı',
          description: 'Sepete ekleme, teklif talebi, iletişim tıklamaları ve dönüşüm sinyallerini değerlendiririz.',
        },
        {
          title: 'İçerik ve Kategori Performansı',
          description: 'Kategori, koleksiyon, ürün açıklaması ve sayfa içeriklerinin kullanıcı davranışına etkisini takip ederiz.',
        },
        {
          title: 'Optimizasyon Alanları',
          description: 'Hız, kullanıcı deneyimi, ürün sunumu, kampanya ve dönüşüm akışlarında geliştirilecek alanları belirleriz.',
        },
      ],
    },
    process: {
      eyebrow: 'SÜREÇ',
      title: 'Shopify Mağazanızı Satışa Hazırlayan Yol Haritası',
      description:
        'Shopify mağazasını yalnızca teknik olarak kurmakla kalmayız; ürün, kategori, içerik, kullanıcı deneyimi ve yönetim süreçlerini birlikte planlayarak mağazayı sürdürülebilir bir satış altyapısına dönüştürürüz.',
      steps: [
        {
          number: '01',
          title: 'Keşif ve Satış Modeli Analizi',
          description: 'Markanızı, ürün yapınızı, hedef müşterinizi, satış kanalınızı ve B2B/B2C ihtiyacınızı analiz ederiz.',
        },
        {
          number: '02',
          title: 'Altyapı ve Mağaza Kurgusu',
          description: 'Shopify mağaza yapısı, sayfa düzeni, menü, koleksiyon ve ürün yönetim mantığını planlarız.',
        },
        {
          number: '03',
          title: 'Ürün ve İçerik Sistemi',
          description: 'Ürün görselleri, açıklamalar, varyasyonlar, kategori içerikleri ve marka anlatımını satışa uygun hale getiririz.',
        },
        {
          number: '04',
          title: 'Dönüşüm Akışı',
          description: 'Sepet, ödeme, teklif, iletişim ve yönlendirme adımlarını kullanıcıyı aksiyon almaya götürecek şekilde düzenleriz.',
        },
        {
          number: '05',
          title: 'Yayın ve Optimizasyon',
          description: 'Mağaza yayına alındıktan sonra trafik, dönüşüm, ürün ilgisi ve kullanıcı davranışlarına göre sistemi geliştiririz.',
        },
      ],
    },
    deliverables: {
      eyebrow: 'HAZIRLANAN SİSTEM',
      title: 'Shopify Mağazanız İçin Hazırlanan Sistem Çıktıları',
      description:
        'Shopify hizmeti sonunda yalnızca açılmış bir web sitesi değil; ürünlerinizi daha doğru sunan, satış akışını netleştiren ve yönetilebilir bir dijital satış altyapısı hazırlanır.',
      items: [
        {
          number: '01',
          title: 'Mağaza ve Sayfa Yapısı',
          description: 'Shopify mağaza yapısı, ana sayfa, kategori, ürün ve temel sayfa düzenleri markanızla uyumlu şekilde hazırlanır.',
        },
        {
          number: '02',
          title: 'Koleksiyon ve Ürün Kurgusu',
          description: 'Ürün grupları, koleksiyon yapısı, varyasyonlar, filtreleme mantığı ve ürün sunum akışı oluşturulur.',
        },
        {
          number: '03',
          title: 'Ürün İçerik Sistemi',
          description: 'Başlık, açıklama, görsel sıralaması, ürün detayları ve marka dili satış algısını destekleyecek şekilde düzenlenir.',
        },
        {
          number: '04',
          title: 'Dönüşüm Akışı',
          description: 'Sepet, ödeme, teklif, iletişim ve yönlendirme yapıları kullanıcıyı satışa veya başvuruya götürecek şekilde kurgulanır.',
        },
        {
          number: '05',
          title: 'Yönetim Planı',
          description: 'Ürün ekleme, içerik güncelleme, stok takibi, kampanya ve operasyon süreçleri için yönetilebilir bir yapı hazırlanır.',
        },
        {
          number: '06',
          title: 'Gelişim Önerileri',
          description: 'Mağazanın sonraki aşamada nasıl büyütüleceği, hangi ürünlerin öne çıkarılacağı ve hangi alanların optimize edileceği belirlenir.',
        },
      ],
    },
    finalCta: {
      title: 'Shopify Mağazanız İçin Doğru Satış Altyapısını Birlikte Kuralım',
      description:
        'Ürünlerinizi, mevcut dijital yapınızı ve hedef satış modelinizi birlikte değerlendirerek Shopify mağazanız için doğru ürün, içerik, dönüşüm ve büyüme yol haritasını planlayalım.',
      ctaLabel: 'Shopify Hizmet Planı Oluştur',
      supportText: 'Mağaza Kurulumu • Ürün Yönetimi • Koleksiyon Yapısı • Dönüşüm Akışı • Teklif Sistemi • Optimizasyon',
    },
  },
  ebay: {
    eyebrow: 'EBAY GLOBAL SATIŞ',
    title: 'eBay’de Farklı Pazarlara Açılan Satış Kanalı Kuruyoruz',
    description:
      'eBay yalnızca ürün listeleme alanı değil; doğru pazar seçimi, kategori yapısı, ürün sunumu, fiyatlandırma, kargo stratejisi ve mağaza güveniyle birlikte çalışan bir global satış kanalıdır.',
    ctaLabel: 'eBay Hizmet Planı Oluştur',
    audience: {
      eyebrow: 'KİMLER İÇİN?',
      title: 'eBay Üzerinden Farklı Pazarlara Açılmak İsteyen Markalar İçin',
      description:
        'eBay; farklı ülkelere ürün satmak, niş ürünleri daha geniş alıcı kitlesine ulaştırmak ve pazaryeri üzerinden global satış deneyimi oluşturmak isteyen markalar için güçlü bir kanaldır.',
      cards: [
        {
          number: '01',
          title: 'Farklı Ülkelere Satış Yapmak İsteyenler',
          description: 'Ürünlerini yalnızca yerel pazarda değil, farklı ülkelerdeki alıcılara da sunmak isteyen markalar için uygundur.',
        },
        {
          number: '02',
          title: 'Niş Ürün Satan Markalar',
          description: 'Koleksiyon, yedek parça, aksesuar, özel üretim, el yapımı veya sınırlı ürünlerini doğru alıcı kitlesine ulaştırmak isteyen markalar için uygundur.',
        },
        {
          number: '03',
          title: 'Pazaryeri Deneyimini Genişletmek İsteyenler',
          description: 'Amazon, Etsy veya Shopify dışında yeni bir satış kanalı kurarak farklı müşteri kitlesine ulaşmak isteyen markalar için uygundur.',
        },
        {
          number: '04',
          title: 'Kargo ve Operasyon Yapısını Planlamak İsteyenler',
          description: 'Uluslararası gönderim, teslimat süresi, iade, ürün kondisyonu ve müşteri deneyimi süreçlerini doğru planlamak isteyen işletmeler için uygundur.',
        },
      ],
    },
    problem: {
      eyebrow: 'SİSTEM EKSİKLERİ',
      title: 'eBay’de Ürün Yayına Almak Değil, Güven Veren Satış Sistemi Kurmak Gerekir',
      description:
        'Birçok marka eBay’e ürün yükler ama pazar seçimi, kategori, ürün açıklaması, fiyatlandırma, kargo politikası ve mağaza güveni birlikte planlanmadığında satış potansiyeli sınırlı kalır.',
      cards: [
        {
          number: '01',
          title: 'Yanlış Pazar ve Kategori Seçimi',
          description: 'Ürünün doğru ülke, kategori, fiyat aralığı ve rakip yapısı içinde konumlanması satış performansı için kritiktir.',
        },
        {
          number: '02',
          title: 'Eksik Ürün Sunumu',
          description: 'Başlık, açıklama, ürün kondisyonu, görsel sıralaması ve teknik detaylar net olmadığında alıcı güveni zayıflayabilir.',
        },
        {
          number: '03',
          title: 'Plansız Kargo ve İade Politikası',
          description: 'Uluslararası satışta kargo ücreti, teslimat süresi, iade koşulları ve müşteri beklentileri doğru planlanmadığında dönüşüm düşebilir.',
        },
        {
          number: '04',
          title: 'Güven Oluşturmayan Mağaza Yapısı',
          description: 'Mağaza profili, ürün açıklamaları, satış politikaları ve müşteri iletişimi güven vermediğinde alıcı karar süreci zorlaşır.',
        },
      ],
    },
    approach: {
      eyebrow: 'GLOVENTGLOBAL YAKLAŞIMI',
      title: 'eBay Mağazasını Listeleme Değil, Satış Kanalı Olarak Kurgularız',
      description:
        'eBay’de sürdürülebilir satış için ürün, pazar, kategori, fiyat, kargo, açıklama ve mağaza güveni birlikte çalışmalıdır. GloventGlobal bu parçaları tek bir satış sistemi içinde ele alır.',
      steps: [
        {
          number: '01',
          title: 'Ürün ve Pazar Analizi',
          description: 'Ürünün hangi ülke, kategori, fiyat aralığı ve alıcı kitlesi için daha uygun olduğunu analiz ederiz.',
        },
        {
          number: '02',
          title: 'Listeleme ve Mağaza Kurgusu',
          description: 'Başlık, açıklama, ürün detayları, görsel sıralaması, mağaza profili ve kategori yapısını güven veren bir satış diliyle planlarız.',
        },
        {
          number: '03',
          title: 'Fiyat ve Kargo Stratejisi',
          description: 'Ürün fiyatı, kargo maliyeti, teslimat süresi, iade koşulları ve rekabet yapısını birlikte değerlendiririz.',
        },
        {
          number: '04',
          title: 'Performans ve Optimizasyon',
          description: 'Görüntülenme, tıklama, satış, mesaj, iade ve mağaza performansı sinyallerine göre satış sistemini geliştiririz.',
        },
      ],
    },
    dataSystem: {
      eyebrow: 'VERİYLE YÖNETİLEN SİSTEM',
      title: 'eBay Mağazanızı Verilerle Geliştirilen Bir Satış Kanalına Dönüştürüyoruz',
      description:
        'Mağaza yayına alındıktan sonra görüntülenme, tıklama, mesaj, satış, kargo ve mağaza performansı sinyallerini birlikte takip ederiz. eBay mağazasını yalnızca kurulmuş bir vitrin olarak değil, verilerle geliştirilen bir satış kanalı olarak ele alırız.',
      // eBay için gerçek dashboard/analytics görselleri henüz hazır değil — Shopify'daki gibi
      // geçici, metin tabanlı kayan veri kartları kullanılıyor. Gerçek görseller hazır olduğunda
      // buraya sadece `dashboardImages` eklenmesi yeterli olacak.
      dataCards: [
        {
          title: 'Görüntülenme ve Trafik',
          description: 'Ürünlerin hangi pazarlarda ve hangi arama alanlarında görünürlük aldığını takip ederiz.',
        },
        {
          title: 'Listeleme Performansı',
          description: 'Başlık, açıklama, görsel, kategori ve ürün detaylarının performansını analiz ederiz.',
        },
        {
          title: 'Fiyat ve Kargo Sinyalleri',
          description: 'Ürün fiyatı, kargo maliyeti, teslimat süresi ve rekabet yapısının satışa etkisini değerlendiririz.',
        },
        {
          title: 'Mesaj ve Alıcı Davranışı',
          description: 'Alıcı soruları, teklif talepleri, favoriler ve etkileşim sinyallerini takip ederiz.',
        },
        {
          title: 'Optimizasyon Alanları',
          description: 'Hangi ürünlerin, açıklamaların, fiyatların veya kargo politikalarının geliştirilmesi gerektiğini belirleriz.',
        },
      ],
    },
    process: {
      eyebrow: 'SÜREÇ',
      title: 'eBay Mağazanızı Satışa Hazırlayan Yol Haritası',
      description:
        'eBay mağazasını yalnızca teknik olarak açmakla kalmayız; ürün, pazar, kategori, listeleme, fiyat, kargo ve güven yapısını birlikte planlayarak mağazayı yönetilebilir bir satış kanalına dönüştürürüz.',
      steps: [
        {
          number: '01',
          title: 'Keşif ve Ürün Analizi',
          description: 'Ürünlerinizi, hedef pazarınızı, kategori uygunluğunu, fiyat aralığını ve rekabet durumunu analiz ederiz.',
        },
        {
          number: '02',
          title: 'Pazar ve Kategori Kurgusu',
          description: 'Hangi ülkelerde, hangi kategori yapısıyla ve hangi satış diliyle ilerlenmesi gerektiğini planlarız.',
        },
        {
          number: '03',
          title: 'Ürün Listeleme Sistemi',
          description: 'Başlık, açıklama, ürün detayları, görsel sıralaması, kondisyon bilgisi ve anahtar kelime yapısını hazırlarız.',
        },
        {
          number: '04',
          title: 'Fiyat, Kargo ve Politika Planı',
          description: 'Fiyatlandırma, kargo maliyeti, teslimat süresi, iade koşulları ve müşteri beklentilerini satış sistemine dahil ederiz.',
        },
        {
          number: '05',
          title: 'Yayın ve Optimizasyon',
          description: 'Ürünler yayına alındıktan sonra görünürlük, tıklama, mesaj, satış ve performans verilerine göre sistemi geliştiririz.',
        },
      ],
    },
    deliverables: {
      eyebrow: 'HAZIRLANAN SİSTEM',
      title: 'eBay Mağazanız İçin Hazırlanan Sistem Çıktıları',
      description:
        'eBay hizmeti sonunda yalnızca açılmış bir mağaza değil; ürünlerinizi doğru pazarda konumlandıran, listeleme kalitesini güçlendiren ve satış sürecini yönetilebilir hale getiren bir yapı hazırlanır.',
      items: [
        {
          number: '01',
          title: 'Mağaza ve Kategori Yapısı',
          description: 'eBay mağaza yapısı, kategori seçimi, ürün gruplama mantığı ve satış dili markanızla uyumlu şekilde düzenlenir.',
        },
        {
          number: '02',
          title: 'Ürün Listeleme Kurgusu',
          description: 'Başlık, açıklama, görsel sıralaması, ürün detayları, kondisyon bilgisi ve anahtar kelime yapısı hazırlanır.',
        },
        {
          number: '03',
          title: 'Fiyat ve Kargo Planı',
          description: 'Ürün fiyatlandırması, kargo stratejisi, teslimat süresi, iade koşulları ve rekabet yapısı planlanır.',
        },
        {
          number: '04',
          title: 'Güven ve Mağaza Politikaları',
          description: 'Mağaza profili, açıklama dili, iade politikası, teslimat bilgisi ve müşteri iletişimi güven verecek şekilde kurgulanır.',
        },
        {
          number: '05',
          title: 'Performans Takip Alanları',
          description: 'Görüntülenme, tıklama, mesaj, satış, iade ve müşteri davranışlarını takip edecek kontrol alanları belirlenir.',
        },
        {
          number: '06',
          title: 'Gelişim Önerileri',
          description: 'Mağazanın sonraki aşamada nasıl iyileştirileceği, hangi ürünlerin öne çıkarılacağı ve hangi alanların optimize edileceği netleştirilir.',
        },
      ],
    },
    finalCta: {
      title: 'eBay Mağazanız İçin Doğru Satış Kanalını Birlikte Kuralım',
      description:
        'Ürünlerinizi, mevcut satış yapınızı ve hedef pazarınızı birlikte değerlendirerek eBay mağazanız için doğru listeleme, fiyatlandırma, kargo ve büyüme yol haritasını planlayalım.',
      ctaLabel: 'eBay Hizmet Planı Oluştur',
      supportText: 'Pazar Seçimi • Ürün Listeleme • Fiyatlandırma • Kargo Stratejisi • Mağaza Güveni • Optimizasyon',
    },
  },
  'b2b-dijital-showroom': {
    eyebrow: 'B2B DİJİTAL SHOWROOM',
    title: 'Toptan Satış Yapan Markalar İçin Dijital Showroom Kuruyoruz',
    description:
      'B2B satışta ürünleri yalnızca listelemek yeterli değildir. Dijital katalog, ürün grupları, teklif listesi, müşteri odaklı sunum ve yönetilebilir ürün altyapısı birlikte çalıştığında daha güçlü bir toptan satış sistemi oluşur.',
    ctaLabel: 'B2B Showroom Planı Oluştur',
    audience: {
      eyebrow: 'KİMLER İÇİN?',
      title: 'Toptan Satışını Dijitalleştirmek İsteyen Markalar İçin',
      description:
        'B2B Dijital Showroom; ürünlerini müşterilere daha düzenli sunmak, teklif sürecini kolaylaştırmak ve satış ekibinin ürün anlatımını dijital olarak güçlendirmek isteyen markalar için uygundur.',
      cards: [
        {
          number: '01',
          title: 'Toptan Satış Yapan Markalar',
          description: 'Ürünlerini bayi, mağaza, distribütör veya kurumsal müşterilere daha düzenli sunmak isteyen markalar için uygundur.',
        },
        {
          number: '02',
          title: 'Fiziksel Showroom’u Dijitale Taşımak İsteyenler',
          description: 'Mağaza, atölye veya showroom deneyimini dijital katalog ve ürün sunumu ile desteklemek isteyen işletmeler için uygundur.',
        },
        {
          number: '03',
          title: 'Ürün Çeşidi Fazla Olan İşletmeler',
          description: 'Çok sayıda model, kategori, varyasyon veya sezon ürünü olan markaların ürünlerini daha yönetilebilir hale getirir.',
        },
        {
          number: '04',
          title: 'Teklif ve Sipariş Sürecini Kolaylaştırmak İsteyenler',
          description: 'Müşterilerin ürün seçmesini, favorilere eklemesini, teklif listesi oluşturmasını veya satış ekibiyle daha hızlı iletişim kurmasını isteyen markalar için uygundur.',
        },
      ],
    },
    problem: {
      eyebrow: 'SİSTEM EKSİKLERİ',
      title: 'B2B Satışta Ürün Göstermek Değil, Yönetilebilir Satış Sunumu Kurmak Gerekir',
      description:
        'Birçok marka ürünlerini WhatsApp, PDF, katalog fotoğrafı veya dağınık dosyalarla paylaşır. Ancak ürün yapısı, kategori mantığı, görsel sunum, teklif süreci ve müşteri deneyimi birlikte planlanmadığında satış süreci yavaşlar.',
      cards: [
        {
          number: '01',
          title: 'Dağınık Ürün Sunumu',
          description: 'Ürünler farklı dosyalarda, mesajlarda veya kataloglarda kaldığında müşteri doğru ürüne ulaşmakta zorlanabilir.',
        },
        {
          number: '02',
          title: 'Zayıf Kategori ve Koleksiyon Yapısı',
          description: 'Kategori, koleksiyon, sezon veya ürün grubu mantığı net değilse ürünlerin algısı ve satış süreci zayıflar.',
        },
        {
          number: '03',
          title: 'Zorlaşan Teklif Süreci',
          description: 'Müşterilerin ürün seçimi, adet bilgisi, varyasyon tercihi ve teklif talebi net akmadığında satış ekibinin işi zorlaşır.',
        },
        {
          number: '04',
          title: 'Yönetilemeyen Ürün Altyapısı',
          description: 'Ürün ekleme, güncelleme, stok bilgisi, görsel düzenleme ve katalog yönetimi kolay değilse sistem sürdürülebilir olmaz.',
        },
      ],
    },
    approach: {
      eyebrow: 'GLOVENTGLOBAL YAKLAŞIMI',
      title: 'B2B Showroom’u Sadece Katalog Değil, Satış Sistemi Olarak Kurgularız',
      description:
        'B2B satışta dijital showroom yalnızca ürünlerin sergilendiği bir sayfa değildir. Ürün yapısı, kategori mantığı, teklif akışı, müşteri deneyimi ve satış ekibinin kullanım kolaylığı birlikte ele alınmalıdır.',
      steps: [
        {
          number: '01',
          title: 'Ürün ve Satış Modeli Analizi',
          description: 'Ürün gruplarını, müşteri tiplerini, satış modelini, kategori yapısını ve teklif sürecini birlikte değerlendiririz.',
        },
        {
          number: '02',
          title: 'Katalog ve Kategori Kurgusu',
          description: 'Ürünleri kategori, koleksiyon, sezon, kullanım alanı veya müşteri ihtiyacına göre düzenli bir showroom yapısına yerleştiririz.',
        },
        {
          number: '03',
          title: 'Teklif ve Müşteri Akışı',
          description: 'Müşterinin ürün seçmesini, favorilere eklemesini, teklif listesi oluşturmasını ve satış ekibiyle iletişim kurmasını kolaylaştırırız.',
        },
        {
          number: '04',
          title: 'Yönetim ve Gelişim Altyapısı',
          description: 'Ürün ekleme, güncelleme, görsel düzenleme, katalog yönetimi ve müşteri geri bildirimlerini sürdürülebilir bir sistem haline getiririz.',
        },
      ],
    },
    dataSystem: {
      eyebrow: 'VERİYLE YÖNETİLEN SİSTEM',
      title: 'B2B Showroom’unuzu Verilerle Geliştirilen Bir Satış Sistemine Dönüştürüyoruz',
      description:
        'Showroom yayına alındıktan sonra ürün görüntülenmeleri, kategori ilgisi, teklif talepleri, favoriler, müşteri davranışı ve satış ekibi geri bildirimlerini birlikte takip ederiz. Dijital showroom’u yalnızca katalog olarak değil, gelişen bir B2B satış sistemi olarak ele alırız.',
      // B2B showroom için gerçek dashboard/katalog görselleri henüz hazır değil — Shopify/eBay'deki
      // gibi geçici, metin tabanlı kayan veri kartları kullanılıyor. Gerçek görseller hazır
      // olduğunda buraya sadece `dashboardImages` eklenmesi yeterli olacak.
      dataCards: [
        {
          title: 'Ürün Görüntülenmeleri',
          description: 'Hangi ürünlerin daha fazla ilgi gördüğünü ve hangi ürünlerin öne çıkarılması gerektiğini analiz ederiz.',
        },
        {
          title: 'Kategori ve Koleksiyon İlgisi',
          description: 'Müşterilerin hangi kategori, koleksiyon veya ürün gruplarında daha fazla zaman geçirdiğini takip ederiz.',
        },
        {
          title: 'Teklif Listesi Davranışı',
          description: 'Müşterilerin hangi ürünleri seçtiğini, hangi ürünleri teklif listesine eklediğini ve hangi gruplarda yoğunlaştığını değerlendiririz.',
        },
        {
          title: 'Müşteri Etkileşimi',
          description: 'WhatsApp tıklamaları, form talepleri, favoriler ve iletişim davranışlarını satış sürecinin parçası olarak takip ederiz.',
        },
        {
          title: 'Gelişim Alanları',
          description: 'Hangi ürün gruplarının, görsellerin, kategori yapısının veya teklif akışının geliştirilmesi gerektiğini belirleriz.',
        },
      ],
    },
    process: {
      eyebrow: 'SÜREÇ',
      title: 'B2B Showroom’unuzu Satışa Hazırlayan Yol Haritası',
      description:
        'Dijital showroom’u yalnızca teknik olarak kurmakla kalmayız; ürün, kategori, müşteri akışı, teklif sistemi ve yönetim altyapısını birlikte planlayarak markaya özel bir B2B satış yapısına dönüştürürüz.',
      steps: [
        {
          number: '01',
          title: 'Keşif ve Ürün Analizi',
          description: 'Ürün gruplarınızı, hedef müşterilerinizi, satış kanalınızı, toptan süreçlerinizi ve mevcut katalog yapınızı analiz ederiz.',
        },
        {
          number: '02',
          title: 'Katalog ve Showroom Kurgusu',
          description: 'Kategori, koleksiyon, ürün grubu, filtreleme ve müşteri gezinme yapısını markanızla uyumlu şekilde planlarız.',
        },
        {
          number: '03',
          title: 'Ürün Sunum Sistemi',
          description: 'Ürün görselleri, açıklamalar, varyasyonlar, ölçü bilgileri, minimum adet veya teklif notlarını showroom mantığına göre hazırlarız.',
        },
        {
          number: '04',
          title: 'Teklif ve İletişim Akışı',
          description: 'Müşterinin ürün seçmesi, teklif listesi oluşturması, satış ekibine ulaşması ve sürecin takip edilmesi için net bir akış kurarız.',
        },
        {
          number: '05',
          title: 'Yayın ve Optimizasyon',
          description: 'Showroom yayına alındıktan sonra ürün ilgisi, müşteri davranışı, teklif talepleri ve geri bildirimlere göre sistemi geliştiririz.',
        },
      ],
    },
    deliverables: {
      eyebrow: 'HAZIRLANAN SİSTEM',
      title: 'B2B Showroom’unuz İçin Hazırlanan Sistem Çıktıları',
      description:
        'B2B Dijital Showroom hizmeti sonunda yalnızca açılmış bir katalog değil; ürünlerinizi düzenli sunan, müşteri seçimini kolaylaştıran ve teklif sürecini yönetilebilir hale getiren bir satış altyapısı hazırlanır.',
      items: [
        {
          number: '01',
          title: 'Dijital Katalog Yapısı',
          description: 'Kategori, koleksiyon, sezon, ürün grubu ve filtreleme mantığı markanızla uyumlu şekilde düzenlenir.',
        },
        {
          number: '02',
          title: 'Ürün Sunum Kurgusu',
          description: 'Ürün görselleri, açıklamalar, varyasyonlar, ölçüler, minimum adet ve teknik detaylar düzenli şekilde hazırlanır.',
        },
        {
          number: '03',
          title: 'Teklif Listesi Akışı',
          description: 'Müşterilerin ürün seçmesi, favorilere eklemesi, teklif listesi oluşturması ve satış ekibine ulaşması için akış kurgulanır.',
        },
        {
          number: '04',
          title: 'Müşteri Odaklı Gezinme',
          description: 'Bayi, mağaza, kurumsal alıcı veya perakende müşterinin ürünleri kolay incelemesi için sayfa yapısı oluşturulur.',
        },
        {
          number: '05',
          title: 'Yönetim Planı',
          description: 'Ürün ekleme, güncelleme, kategori düzenleme, kampanya ve sezon yönetimi için sürdürülebilir bir yapı hazırlanır.',
        },
        {
          number: '06',
          title: 'Gelişim Önerileri',
          description: 'Showroom’un sonraki aşamada nasıl geliştirileceği, hangi ürün gruplarının öne çıkarılacağı ve hangi alanların optimize edileceği netleştirilir.',
        },
      ],
    },
    finalCta: {
      title: 'B2B Showroom’unuz İçin Doğru Satış Sistemini Birlikte Kuralım',
      description:
        'Ürünlerinizi, mevcut satış sürecinizi ve müşteri yapınızı birlikte değerlendirerek B2B showroom’unuz için doğru katalog, teklif, ürün sunumu ve büyüme yol haritasını planlayalım.',
      ctaLabel: 'B2B Showroom Planı Oluştur',
      supportText: 'Dijital Katalog • Ürün Sunumu • Teklif Listesi • B2B Akış • Müşteri Deneyimi • Optimizasyon',
    },
  },
  'otomasyon-n8n': {
    eyebrow: 'OTOMASYON & N8N SİSTEMLERİ',
    title: 'Satış ve Operasyon Süreçleri İçin Otomasyon Sistemleri Kuruyoruz',
    description:
      'Teklif, müşteri, ürün, sipariş, raporlama ve takip süreçleri manuel ilerlediğinde zaman kaybı ve hata riski artar. GloventGlobal, bu süreçleri n8n, API ve entegrasyon yapılarıyla daha yönetilebilir hale getirir.',
    ctaLabel: 'Otomasyon Planı Oluştur',
    audience: {
      eyebrow: 'KİMLER İÇİN?',
      title: 'Tekrarlayan İşlerini Otomasyona Taşımak İsteyen Markalar İçin',
      description:
        'Otomasyon sistemleri; müşteri taleplerini, teklif akışlarını, ürün verilerini, sipariş süreçlerini ve raporlama işlerini daha düzenli yönetmek isteyen markalar için güçlü bir altyapı sağlar.',
      cards: [
        {
          number: '01',
          title: 'Teklif ve Başvuru Süreci Olan Markalar',
          description: 'Form, WhatsApp, e-posta veya web sitesi üzerinden gelen talepleri daha düzenli toplamak ve takip etmek isteyen markalar için uygundur.',
        },
        {
          number: '02',
          title: 'Ürün ve Sipariş Süreci Yoğun İşletmeler',
          description: 'Ürün bilgisi, stok, sipariş, kargo veya müşteri takip süreçlerinde manuel iş yükünü azaltmak isteyen işletmeler için uygundur.',
        },
        {
          number: '03',
          title: 'Pazaryeri ve Shopify Kullanan Markalar',
          description: 'Amazon, Etsy, eBay, Shopify veya B2B katalog yapılarındaki verileri daha kontrollü takip etmek isteyen markalar için uygundur.',
        },
        {
          number: '04',
          title: 'Raporlama ve Takip Sistemi Kurmak İsteyenler',
          description: 'Satış, reklam, ürün, teklif, müşteri ve operasyon verilerini düzenli raporlamak isteyen ekipler için uygundur.',
        },
      ],
    },
    problem: {
      eyebrow: 'SİSTEM EKSİKLERİ',
      title: 'Manuel İş Takibi Değil, Birbirine Bağlı Operasyon Sistemi Gerekir',
      description:
        'Birçok işletmede müşteri talepleri, sipariş bilgileri, ürün güncellemeleri ve raporlar farklı dosyalarda veya mesajlarda takip edilir. Bu yapı büyüdükçe süreçler yavaşlar, hata riski artar ve ekipler aynı işi tekrar tekrar yapmak zorunda kalır.',
      cards: [
        {
          number: '01',
          title: 'Dağınık Müşteri ve Talep Takibi',
          description: 'Form, e-posta, WhatsApp veya sosyal medya üzerinden gelen talepler tek bir akışta toplanmadığında takip zorlaşır.',
        },
        {
          number: '02',
          title: 'Tekrarlayan Manuel İşler',
          description: 'Ürün, sipariş, rapor, müşteri veya teklif bilgilerini sürekli elle taşımak zaman kaybına ve hata riskine yol açar.',
        },
        {
          number: '03',
          title: 'Kopuk Sistemler',
          description: 'Shopify, pazaryeri, form, CRM, e-posta veya raporlama araçları birbirine bağlı değilse veri akışı sürdürülebilir olmaz.',
        },
        {
          number: '04',
          title: 'Görünmeyen Operasyon Verisi',
          description: 'Satış, teklif, sipariş, müşteri, ürün ve reklam verileri düzenli raporlanmadığında karar almak zorlaşır.',
        },
      ],
    },
    approach: {
      eyebrow: 'GLOVENTGLOBAL YAKLAŞIMI',
      title: 'Otomasyonu Tek Bir Araç Değil, Operasyon Sistemi Olarak Kurgularız',
      description:
        'Otomasyon yalnızca bir aracı birbirine bağlamak değildir. İş akışı, veri yapısı, tetikleyiciler, bildirimler, raporlar ve ekip kullanım kolaylığı birlikte planlandığında sürdürülebilir bir operasyon sistemi oluşur.',
      steps: [
        {
          number: '01',
          title: 'Süreç ve Veri Analizi',
          description: 'Müşteri, ürün, sipariş, teklif, reklam ve raporlama süreçlerinin nerede başladığını, nasıl ilerlediğini ve nerede tıkandığını analiz ederiz.',
        },
        {
          number: '02',
          title: 'Akış ve Entegrasyon Kurgusu',
          description: 'Form, CRM, Google Sheets, Shopify, pazaryeri, e-posta, WhatsApp, Slack veya diğer araçlar arasındaki veri akışını planlarız.',
        },
        {
          number: '03',
          title: 'n8n ve API Yapısı',
          description: 'Uygun süreçlerde n8n, webhook, API, otomatik bildirim, görev oluşturma ve veri güncelleme yapıları kurarız.',
        },
        {
          number: '04',
          title: 'Test ve Gelişim Planı',
          description: 'Otomasyonların doğru çalışmasını test eder, hata risklerini azaltır ve süreç büyüdükçe geliştirilebilecek alanları belirleriz.',
        },
      ],
    },
    dataSystem: {
      eyebrow: 'VERİYLE YÖNETİLEN SİSTEM',
      title: 'Operasyon Süreçlerinizi Verilerle Geliştirilen Bir Sisteme Dönüştürüyoruz',
      description:
        'Otomasyon yayına alındıktan sonra talep sayısı, görev akışı, form dönüşleri, teklif durumları, sipariş takibi ve raporlama çıktıları birlikte izlenir. Böylece operasyon yalnızca çalışan bir akış değil, geliştirilebilir bir sistem haline gelir.',
      // Otomasyon & n8n için gerçek dashboard/analytics görselleri henüz hazır değil — Shopify/eBay/
      // B2B'deki gibi geçici, metin tabanlı kayan veri kartları kullanılıyor. Gerçek görseller hazır
      // olduğunda buraya sadece `dashboardImages` eklenmesi yeterli olacak.
      dataCards: [
        {
          title: 'Talep ve Form Akışı',
          description: 'Gelen müşteri taleplerinin hangi kanaldan geldiğini ve nasıl işlendiğini takip ederiz.',
        },
        {
          title: 'Görev ve Bildirim Takibi',
          description: 'Ekip içi görevlerin, bildirimlerin ve takip süreçlerinin doğru tetiklenip tetiklenmediğini kontrol ederiz.',
        },
        {
          title: 'Teklif ve Sipariş Durumu',
          description: 'Teklif, sipariş, ödeme, kargo veya müşteri yanıtı gibi süreçlerin hangi aşamada olduğunu izlenebilir hale getiririz.',
        },
        {
          title: 'Veri Senkronizasyonu',
          description: 'Form, tablo, CRM, Shopify, pazaryeri veya raporlama araçları arasında veri akışının sağlıklı çalışmasını takip ederiz.',
        },
        {
          title: 'Optimizasyon Alanları',
          description: 'Hangi manuel işlerin azaltılabileceğini, hangi akışların hızlandırılabileceğini ve hangi raporların geliştirileceğini belirleriz.',
        },
      ],
    },
    process: {
      eyebrow: 'SÜREÇ',
      title: 'Otomasyon Sisteminizi Kurma Yol Haritası',
      description:
        'Otomasyon sistemini yalnızca teknik bağlantılar olarak kurmayız; iş akışını, veri yapısını, ekip kullanımını, hata senaryolarını ve gelişim planını birlikte ele alırız.',
      steps: [
        {
          number: '01',
          title: 'Süreç Keşfi',
          description: 'Mevcut iş akışlarını, manuel yapılan işleri, kullanılan araçları ve veri kaynaklarını analiz ederiz.',
        },
        {
          number: '02',
          title: 'Akış Tasarımı',
          description: 'Hangi verinin nereden alınacağını, hangi araca aktarılacağını, hangi tetikleyicilerin çalışacağını ve hangi bildirimlerin gönderileceğini planlarız.',
        },
        {
          number: '03',
          title: 'Entegrasyon Kurulumu',
          description: 'n8n, API, webhook, Google Sheets, CRM, Shopify, form veya diğer araçlarla gerekli bağlantıları kurarız.',
        },
        {
          number: '04',
          title: 'Test ve Hata Kontrolü',
          description: 'Akışların doğru çalıştığını, tekrar eden kayıtların oluşmadığını, eksik veri taşınmadığını ve kritik hataların yakalandığını test ederiz.',
        },
        {
          number: '05',
          title: 'Yayın ve Optimizasyon',
          description: 'Sistem çalışmaya başladıktan sonra süreçleri izler, eksik noktaları geliştirir ve ihtiyaç oldukça yeni otomasyon alanları ekleriz.',
        },
      ],
    },
    deliverables: {
      eyebrow: 'HAZIRLANAN SİSTEM',
      title: 'Otomasyon Süreçleriniz İçin Hazırlanan Sistem Çıktıları',
      description:
        'Otomasyon hizmeti sonunda yalnızca çalışan birkaç bağlantı değil; iş yükünü azaltan, veri akışını düzenleyen ve operasyonu daha yönetilebilir hale getiren bir sistem hazırlanır.',
      items: [
        {
          number: '01',
          title: 'Süreç ve Akış Haritası',
          description: 'Mevcut iş akışları, manuel tekrarlar, veri kaynakları ve otomasyon fırsatları netleştirilir.',
        },
        {
          number: '02',
          title: 'n8n Otomasyon Akışları',
          description: 'Belirlenen süreçlere göre n8n tabanlı tetikleyici, veri taşıma, bildirim ve görev akışları oluşturulur.',
        },
        {
          number: '03',
          title: 'API ve Entegrasyon Yapısı',
          description: 'Shopify, form, tablo, CRM, e-posta, pazaryeri veya diğer araçlar arasında gerekli bağlantılar kurulur.',
        },
        {
          number: '04',
          title: 'Raporlama ve Takip Alanları',
          description: 'Talep, teklif, sipariş, görev, müşteri ve operasyon verilerini izlemek için raporlama alanları hazırlanır.',
        },
        {
          number: '05',
          title: 'Test ve Hata Kontrol Planı',
          description: 'Otomasyonların doğru çalışmasını takip etmek, veri hatalarını azaltmak ve kritik durumları görmek için kontrol mantığı oluşturulur.',
        },
        {
          number: '06',
          title: 'Gelişim Önerileri',
          description: 'Sonraki aşamada hangi manuel işlerin azaltılacağı, hangi araçların bağlanacağı ve hangi raporların geliştirileceği belirlenir.',
        },
      ],
    },
    finalCta: {
      title: 'Operasyon Süreçlerinizi Otomasyonla Birlikte Güçlendirelim',
      description:
        'Mevcut iş akışlarınızı, kullandığınız araçları ve tekrar eden manuel süreçlerinizi birlikte değerlendirerek markanız için doğru otomasyon ve entegrasyon yol haritasını planlayalım.',
      ctaLabel: 'Otomasyon Planı Oluştur',
      supportText: 'n8n • API • Form Akışları • CRM • Raporlama • Bildirim • Entegrasyon',
    },
  },
};