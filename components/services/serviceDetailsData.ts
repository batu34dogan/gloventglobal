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
  'reklam-optimizasyon': {
    eyebrow: 'REKLAM & OPTİMİZASYON',
    title: 'Satış Kanallarınızı Veriye Dayalı Reklamlarla Büyütüyoruz',
    description:
      'Reklam yalnızca bütçe harcamak değildir. Doğru ürün, doğru hedefleme, doğru kanal, dönüşüm takibi ve düzenli optimizasyon birlikte çalıştığında sürdürülebilir büyüme sistemi oluşur.',
    ctaLabel: 'Reklam Planı Oluştur',
    audience: {
      eyebrow: 'KİMLER İÇİN?',
      title: 'Reklam Bütçesini Daha Verimli Yönetmek İsteyen Markalar İçin',
      description:
        'Reklam & Optimizasyon hizmeti; pazaryeri, Shopify, sosyal medya veya Google üzerinden daha kontrollü büyümek isteyen markalar için satış kanallarını veriye göre geliştirmeyi hedefler.',
      cards: [
        {
          number: '01',
          title: 'Reklama Yeni Başlayacak Markalar',
          description: 'Amazon, Etsy, eBay, Shopify, Google veya Meta reklamlarına kontrollü bir başlangıç yapmak isteyen markalar için uygundur.',
        },
        {
          number: '02',
          title: 'Reklam Harcayıp Sonuç Alamayanlar',
          description: 'Bütçe harcadığı halde yeterli tıklama, dönüşüm veya satış elde edemeyen markalar için uygundur.',
        },
        {
          number: '03',
          title: 'Satışı Olan Ama Ölçeklenmek İsteyenler',
          description: 'Mevcut satışlarını daha doğru kampanya, hedefleme, ürün seçimi ve dönüşüm optimizasyonuyla büyütmek isteyen markalar için uygundur.',
        },
        {
          number: '04',
          title: 'Farklı Kanalları Birlikte Yönetmek İsteyenler',
          description: 'Pazaryeri, Shopify, sosyal medya ve Google reklamlarını tek büyüme mantığı içinde takip etmek isteyen işletmeler için uygundur.',
        },
      ],
    },
    problem: {
      eyebrow: 'SİSTEM EKSİKLERİ',
      title: 'Reklam Vermek Değil, Ölçülebilir Büyüme Sistemi Kurmak Gerekir',
      description:
        'Birçok marka reklam verir ama ürün seçimi, hedefleme, bütçe, kreatif, listeleme kalitesi ve dönüşüm takibi birlikte planlanmadığında reklam yalnızca maliyet üreten bir kanala dönüşebilir.',
      cards: [
        {
          number: '01',
          title: 'Plansız Bütçe Kullanımı',
          description: 'Bütçe, ürün önceliği, hedef kitle ve kanal yapısı netleşmeden reklam açıldığında maliyet kontrolü zorlaşır.',
        },
        {
          number: '02',
          title: 'Yanlış Hedefleme ve Kampanya Yapısı',
          description: 'Hedef kitle, anahtar kelime, kampanya türü veya ürün seçimi doğru kurgulanmadığında reklam performansı zayıflar.',
        },
        {
          number: '03',
          title: 'Eksik Dönüşüm Takibi',
          description: 'Tıklama, sepet, teklif, satış, ROAS, CPA veya dönüşüm verileri izlenmediğinde hangi reklamın işe yaradığı anlaşılamaz.',
        },
        {
          number: '04',
          title: 'Optimize Edilmeyen Reklamlar',
          description: 'Reklamlar düzenli analiz edilmediğinde düşük performanslı kampanyalar bütçe tüketmeye devam eder.',
        },
      ],
    },
    approach: {
      eyebrow: 'GLOVENTGLOBAL YAKLAŞIMI',
      title: 'Reklamı Tek Başına Değil, Satış Sisteminin Parçası Olarak Kurgularız',
      description:
        'Reklam performansı yalnızca kampanya ayarlarına bağlı değildir. Ürün sunumu, fiyat, listeleme kalitesi, görsel dil, satış kanalı ve dönüşüm akışı birlikte değerlendirildiğinde reklam daha anlamlı sonuç üretir.',
      steps: [
        {
          number: '01',
          title: 'Kanal ve Ürün Analizi',
          description: 'Hangi ürünün, hangi kanalda, hangi hedef kitleye ve hangi bütçeyle reklam almaya uygun olduğunu analiz ederiz.',
        },
        {
          number: '02',
          title: 'Kampanya ve Hedefleme Kurgusu',
          description: 'Anahtar kelime, hedef kitle, kampanya yapısı, bütçe dağılımı ve test mantığını satış hedeflerine göre planlarız.',
        },
        {
          number: '03',
          title: 'Kreatif ve Dönüşüm Uyumu',
          description: 'Görsel, metin, ürün sayfası, teklif akışı ve mağaza deneyiminin reklamla uyumlu çalışmasını değerlendiririz.',
        },
        {
          number: '04',
          title: 'Ölçüm ve Optimizasyon',
          description: 'Tıklama, maliyet, dönüşüm, ROAS, CPA, satış ve kanal performansına göre kampanyaları düzenli geliştiririz.',
        },
      ],
    },
    dataSystem: {
      eyebrow: 'VERİYLE YÖNETİLEN SİSTEM',
      title: 'Reklam Performansınızı Verilerle Geliştirilen Bir Büyüme Sistemine Dönüştürüyoruz',
      description:
        'Reklam yayına alındıktan sonra gösterim, tıklama, maliyet, dönüşüm, ROAS, satış ve kanal performansı birlikte takip edilir. Böylece reklam yalnızca harcama yapılan bir alan değil, geliştirilebilir bir büyüme sistemi haline gelir.',
      // Reklam & Optimizasyon için gerçek dashboard/analytics görselleri henüz hazır değil —
      // Shopify/eBay/B2B/Otomasyon'daki gibi geçici, metin tabanlı kayan veri kartları kullanılıyor.
      // Gerçek görseller hazır olduğunda buraya sadece `dashboardImages` eklenmesi yeterli olacak.
      dataCards: [
        {
          title: 'Gösterim ve Tıklama Verileri',
          description: 'Reklamların hangi ürün, hedef kitle veya anahtar kelime üzerinden ilgi aldığını takip ederiz.',
        },
        {
          title: 'Maliyet ve Bütçe Kontrolü',
          description: 'CPC, günlük bütçe, kampanya harcaması ve maliyet dağılımını düzenli analiz ederiz.',
        },
        {
          title: 'Dönüşüm ve Satış Takibi',
          description: 'Tıklamanın satışa, teklif talebine, sepete veya iletişime dönüşüp dönüşmediğini değerlendiririz.',
        },
        {
          title: 'ROAS ve Kârlılık Sinyalleri',
          description: 'Reklam harcamasının satışa ve kârlılığa etkisini kanal bazında takip ederiz.',
        },
        {
          title: 'Optimizasyon Alanları',
          description: 'Durdurulacak, güçlendirilecek, test edilecek veya yeniden yapılandırılacak kampanyaları belirleriz.',
        },
      ],
    },
    process: {
      eyebrow: 'SÜREÇ',
      title: 'Reklam ve Optimizasyon İçin Büyüme Yol Haritası',
      description:
        'Reklam sürecini yalnızca kampanya açmak olarak ele almayız; ürün, kanal, hedefleme, bütçe, kreatif, dönüşüm ve performans takibini birlikte planlarız.',
      steps: [
        {
          number: '01',
          title: 'Keşif ve Kanal Analizi',
          description: 'Markanın mevcut satış kanallarını, ürün yapısını, hedef müşterisini, reklam geçmişini ve büyüme hedeflerini analiz ederiz.',
        },
        {
          number: '02',
          title: 'Reklam Stratejisi',
          description: 'Hangi ürünlerin, hangi kanallarda, hangi hedefleme ve bütçe yapısıyla test edileceğini planlarız.',
        },
        {
          number: '03',
          title: 'Kampanya Kurulumu',
          description: 'Amazon, Etsy, eBay, Google, Meta veya Shopify satış akışına uygun kampanya yapılarını oluştururuz.',
        },
        {
          number: '04',
          title: 'Ölçüm ve Performans Takibi',
          description: 'Gösterim, tıklama, maliyet, dönüşüm, satış, ROAS ve kanal performansını düzenli izleriz.',
        },
        {
          number: '05',
          title: 'Optimizasyon ve Büyüme',
          description: 'Verilere göre bütçe dağılımını, hedeflemeyi, kreatifleri, ürün önceliklerini ve kampanya yapısını geliştiririz.',
        },
      ],
    },
    deliverables: {
      eyebrow: 'HAZIRLANAN SİSTEM',
      title: 'Reklam ve Optimizasyon İçin Hazırlanan Sistem Çıktıları',
      description:
        'Reklam hizmeti sonunda yalnızca açılmış kampanyalar değil; hangi kanalın, hangi ürünün ve hangi bütçenin daha verimli çalıştığını gösteren yönetilebilir bir büyüme sistemi hazırlanır.',
      items: [
        {
          number: '01',
          title: 'Reklam Stratejisi',
          description: 'Ürün, kanal, hedef kitle, kampanya türü, bütçe ve test mantığı için yol haritası oluşturulur.',
        },
        {
          number: '02',
          title: 'Kampanya Yapısı',
          description: 'Amazon, Etsy, eBay, Google, Meta veya diğer satış kanallarına uygun kampanya kurgusu hazırlanır.',
        },
        {
          number: '03',
          title: 'Hedefleme ve Anahtar Kelime Planı',
          description: 'Hedef kitle, anahtar kelime, ilgi alanı, ürün grubu veya yeniden pazarlama yapıları belirlenir.',
        },
        {
          number: '04',
          title: 'Performans Takip Alanları',
          description: 'Gösterim, tıklama, maliyet, dönüşüm, satış, ROAS ve CPA gibi metrikler için takip alanları netleştirilir.',
        },
        {
          number: '05',
          title: 'Optimizasyon Planı',
          description: 'Durdurulacak, artırılacak, test edilecek veya yeniden yapılandırılacak kampanyalar için kontrol mantığı oluşturulur.',
        },
        {
          number: '06',
          title: 'Gelişim Önerileri',
          description: 'Sonraki aşamada hangi kanalların büyütüleceği, hangi ürünlerin öne çıkarılacağı ve hangi kreatiflerin geliştirileceği belirlenir.',
        },
      ],
    },
    finalCta: {
      title: 'Reklam Bütçenizi Ölçülebilir Büyüme Sistemine Dönüştürelim',
      description:
        'Mevcut satış kanallarınızı, reklam geçmişinizi ve hedeflerinizi birlikte değerlendirerek markanız için doğru reklam, optimizasyon ve büyüme yol haritasını planlayalım.',
      ctaLabel: 'Reklam Planı Oluştur',
      supportText: 'Amazon Ads • Etsy Ads • Google • Meta • ROAS • Dönüşüm • Optimizasyon',
    },
  },
  'gorsel-icerik-sistemi': {
    eyebrow: 'GÖRSEL & İÇERİK SİSTEMİ',
    title: 'Ürünlerinizi Satışa Hazır Görsel ve İçerik Sistemiyle Hazırlıyoruz',
    description:
      'Dijital satışta ürün yalnızca listelenmez; doğru görsel dil, güçlü ürün sunumu, açıklama, başlık, SEO ve marka anlatımı birlikte çalıştığında alıcı için daha güven veren bir satış deneyimi oluşur.',
    ctaLabel: 'İçerik Planı Oluştur',
    audience: {
      eyebrow: 'KİMLER İÇİN?',
      title: 'Ürünlerini Dijital Kanallarda Daha Güçlü Sunmak İsteyen Markalar İçin',
      description:
        'Görsel & İçerik Sistemi; ürünlerini pazaryerlerinde, Shopify mağazasında, B2B katalogda veya sosyal medya kanallarında daha profesyonel ve satış odaklı sunmak isteyen markalar için uygundur.',
      cards: [
        {
          number: '01',
          title: 'Ürün Görsellerini Güçlendirmek İsteyenler',
          description: 'Ürün fotoğraflarını, lifestyle görsellerini, konsept sunumlarını ve mağaza görsel dilini daha profesyonel hale getirmek isteyen markalar için uygundur.',
        },
        {
          number: '02',
          title: 'Listeleme İçeriğini İyileştirmek İsteyenler',
          description: 'Başlık, açıklama, bullet point, etiket, kategori metni ve SEO yapısını daha satış odaklı düzenlemek isteyen işletmeler için uygundur.',
        },
        {
          number: '03',
          title: 'Pazaryeri ve Shopify Kullanan Markalar',
          description: 'Amazon, Etsy, eBay, Shopify veya B2B katalog sayfalarında ürün sunumunu daha güçlü hale getirmek isteyen markalar için uygundur.',
        },
        {
          number: '04',
          title: 'Marka Algısını Güçlendirmek İsteyenler',
          description: 'Ürünlerin yalnızca teknik özellikleriyle değil, görsel dili ve anlatımıyla da daha güvenilir görünmesini isteyen markalar için uygundur.',
        },
      ],
    },
    problem: {
      eyebrow: 'SİSTEM EKSİKLERİ',
      title: 'Ürünü Göstermek Değil, Satışa Hazır Sunum Sistemi Kurmak Gerekir',
      description:
        'Birçok marka ürününü dijital kanallara taşır ama görsel dil, açıklama, başlık, kategori, SEO ve marka anlatımı birlikte çalışmadığında ürün güçlü görünmez ve satış potansiyeli sınırlı kalır.',
      cards: [
        {
          number: '01',
          title: 'Zayıf Görsel Sunum',
          description: 'Ürün fotoğrafları, arka plan, açı, ışık, kompozisyon veya lifestyle kullanımı yetersiz olduğunda ürün algısı zayıflayabilir.',
        },
        {
          number: '02',
          title: 'Dağınık İçerik Dili',
          description: 'Başlık, açıklama, kategori metni ve marka anlatımı birbirinden kopuk olduğunda ürün profesyonel bir bütünlük oluşturmaz.',
        },
        {
          number: '03',
          title: 'SEO ve Listeleme Eksikleri',
          description: 'Anahtar kelime, etiket, kategori yapısı ve ürün açıklamaları doğru kurgulanmadığında görünürlük sınırlı kalabilir.',
        },
        {
          number: '04',
          title: 'Kanal Uyumsuzluğu',
          description: 'Aynı ürün Amazon, Etsy, Shopify, B2B katalog veya sosyal medya için farklı sunum ihtiyaçlarına sahipken tek tip içerik kullanmak performansı düşürebilir.',
        },
      ],
    },
    approach: {
      eyebrow: 'GLOVENTGLOBAL YAKLAŞIMI',
      title: 'Görsel ve İçeriği Satış Sisteminin Parçası Olarak Kurgularız',
      description:
        'Görsel ve içerik yalnızca estetik bir çalışma değildir. Ürün algısı, kanal beklentisi, müşteri davranışı, SEO, reklam ve dönüşüm hedefi birlikte ele alındığında satışa çalışan bir içerik sistemi oluşur.',
      steps: [
        {
          number: '01',
          title: 'Ürün ve Kanal Analizi',
          description: 'Ürünün hangi kanalda, hangi hedef kitleye, hangi görsel dil ve içerik yapısıyla sunulması gerektiğini analiz ederiz.',
        },
        {
          number: '02',
          title: 'Görsel Dil ve Konsept Kurgusu',
          description: 'Ürün fotoğrafı, lifestyle sahne, arka plan, renk dili, kompozisyon ve marka algısını destekleyen görsel sistem planlarız.',
        },
        {
          number: '03',
          title: 'Listeleme ve SEO İçeriği',
          description: 'Başlık, açıklama, bullet point, etiket, kategori metni ve anahtar kelime yapısını satış kanalına uygun şekilde hazırlarız.',
        },
        {
          number: '04',
          title: 'Test ve Optimizasyon',
          description: 'Görsel, başlık, açıklama ve içerik yapılarını performans verilerine, reklam dönüşlerine ve kullanıcı davranışına göre geliştiririz.',
        },
      ],
    },
    dataSystem: {
      eyebrow: 'VERİYLE YÖNETİLEN SİSTEM',
      title: 'Görsel ve İçerik Yapınızı Verilerle Geliştirilen Bir Satış Sistemine Dönüştürüyoruz',
      description:
        'İçerikler yayına alındıktan sonra görüntülenme, tıklama, favori, sepet, teklif, reklam ve dönüşüm sinyallerini birlikte takip ederiz. Böylece görsel ve içerik yalnızca hazırlanmış bir set değil, geliştirilebilir bir satış sistemi haline gelir.',
      // Görsel & İçerik Sistemi için gerçek dashboard/analytics görselleri henüz hazır değil —
      // Shopify/eBay/B2B/Otomasyon/Reklam'daki gibi geçici, metin tabanlı kayan veri kartları
      // kullanılıyor. Gerçek görseller hazır olduğunda buraya sadece `dashboardImages` eklenmesi
      // yeterli olacak.
      dataCards: [
        {
          title: 'Görsel Performansı',
          description: 'Hangi ürün görsellerinin daha fazla ilgi, tıklama veya dönüşüm sağladığını takip ederiz.',
        },
        {
          title: 'Listeleme Etkileşimi',
          description: 'Başlık, açıklama, etiket ve kategori yapısının ürün görünürlüğüne etkisini değerlendiririz.',
        },
        {
          title: 'Kanal Uyumu',
          description: 'Amazon, Etsy, eBay, Shopify, B2B katalog ve sosyal medya için içerik yapısının uygunluğunu analiz ederiz.',
        },
        {
          title: 'Reklam ve Dönüşüm Sinyalleri',
          description: 'Reklamdan gelen tıklama, sepet, teklif, favori veya satış sinyallerine göre içerik alanlarını geliştiririz.',
        },
        {
          title: 'Optimizasyon Alanları',
          description: 'Hangi görsellerin, başlıkların, açıklamaların veya kategori metinlerinin güçlendirilmesi gerektiğini belirleriz.',
        },
      ],
    },
    process: {
      eyebrow: 'SÜREÇ',
      title: 'Görsel ve İçerik Sisteminizi Hazırlayan Yol Haritası',
      description:
        'Görsel ve içerik sürecini yalnızca fotoğraf veya metin üretimi olarak ele almayız; ürün, kanal, hedef müşteri, marka dili, SEO ve dönüşüm hedefini birlikte planlarız.',
      steps: [
        {
          number: '01',
          title: 'Ürün ve Kanal Keşfi',
          description: 'Ürünlerinizi, hedef müşterinizi, satış kanalınızı, rakip sunumları ve mevcut görsel/içerik yapınızı analiz ederiz.',
        },
        {
          number: '02',
          title: 'Görsel Konsept Planı',
          description: 'Ürün fotoğrafı, lifestyle sahne, arka plan, açı, renk dili ve kullanım senaryolarını markaya uygun şekilde planlarız.',
        },
        {
          number: '03',
          title: 'İçerik ve Listeleme Kurgusu',
          description: 'Başlık, açıklama, bullet point, etiket, kategori metni ve SEO yapısını satış kanalına göre hazırlarız.',
        },
        {
          number: '04',
          title: 'Yayın ve Uyum Kontrolü',
          description: 'Hazırlanan görsel ve içeriklerin pazaryeri, Shopify, B2B katalog veya sosyal medya yapısına uygunluğunu kontrol ederiz.',
        },
        {
          number: '05',
          title: 'Optimizasyon',
          description: 'Performans verilerine, reklam sonuçlarına ve kullanıcı davranışına göre görsel ve içerik sistemini geliştiririz.',
        },
      ],
    },
    deliverables: {
      eyebrow: 'HAZIRLANAN SİSTEM',
      title: 'Görsel ve İçerik Süreciniz İçin Hazırlanan Sistem Çıktıları',
      description:
        'Görsel & İçerik Sistemi sonunda yalnızca ürün fotoğrafı veya açıklama değil; ürünlerinizi daha doğru sunan, kanal uyumunu güçlendiren ve satış algısını destekleyen bir içerik altyapısı hazırlanır.',
      items: [
        {
          number: '01',
          title: 'Görsel Dil ve Konsept Planı',
          description: 'Ürün fotoğrafı, lifestyle sahne, renk dili, arka plan, açı ve kompozisyon yapısı markaya uygun şekilde planlanır.',
        },
        {
          number: '02',
          title: 'Ürün Sunum Kurgusu',
          description: 'Ürünlerin hangi özelliklerinin, hangi görsellerle ve hangi anlatım sırasıyla öne çıkarılacağı belirlenir.',
        },
        {
          number: '03',
          title: 'Listeleme İçerikleri',
          description: 'Başlık, açıklama, bullet point, etiket, kategori metni ve ürün detayları satış kanalına uygun şekilde hazırlanır.',
        },
        {
          number: '04',
          title: 'SEO ve Anahtar Kelime Yapısı',
          description: 'Ürünlerin doğru alıcıya ulaşması için anahtar kelime, arama terimi, etiket ve kategori yapısı oluşturulur.',
        },
        {
          number: '05',
          title: 'Kanal Bazlı İçerik Uyumu',
          description: 'Amazon, Etsy, eBay, Shopify, B2B katalog ve sosyal medya için içeriklerin nasıl farklılaştırılacağı belirlenir.',
        },
        {
          number: '06',
          title: 'Gelişim Önerileri',
          description: 'Hangi görsellerin, ürün açıklamalarının, kategori metinlerinin veya marka anlatımının geliştirileceği netleştirilir.',
        },
      ],
    },
    finalCta: {
      title: 'Ürünlerinizi Daha Güçlü Görsel ve İçerik Sistemiyle Sunalım',
      description:
        'Ürünlerinizi, mevcut görsel dilinizi ve satış kanallarınızı birlikte değerlendirerek markanız için doğru görsel, içerik, SEO ve ürün sunumu yol haritasını planlayalım.',
      ctaLabel: 'İçerik Planı Oluştur',
      supportText: 'Ürün Görseli • Listeleme İçeriği • SEO • Marka Dili • Kanal Uyumu • Optimizasyon',
    },
  },
  'yapay-zeka-entegrasyonu': {
    eyebrow: 'YAPAY ZEKA ENTEGRASYONU',
    title: 'Yapay Zekayı Satış ve Operasyon Sistemlerinize Entegre Ediyoruz',
    description:
      'Yapay zeka yalnızca içerik üretmek için kullanılan bir araç değildir. Doğru kurgulandığında ürün analizi, görsel konsept, listeleme, raporlama, müşteri akışı, operasyon ve karar süreçlerini destekleyen bir satış sistemi parçasına dönüşür.',
    ctaLabel: 'AI Entegrasyon Planı Oluştur',
    audience: {
      eyebrow: 'KİMLER İÇİN?',
      title: 'İş Süreçlerine Yapay Zekayı Doğru Şekilde Entegre Etmek İsteyen Markalar İçin',
      description:
        'Yapay Zeka Entegrasyonu; ürünlerini, içeriklerini, operasyonlarını, raporlamalarını ve dijital satış süreçlerini daha hızlı, düzenli ve veriye dayalı yönetmek isteyen markalar için uygundur.',
      cards: [
        {
          number: '01',
          title: 'Ürün ve İçerik Süreci Yoğun Markalar',
          description: 'Çok sayıda ürün, açıklama, görsel, listeleme veya kategori içeriği hazırlayan markalar için yapay zeka destekli üretim ve kontrol sistemi kurulur.',
        },
        {
          number: '02',
          title: 'Pazaryeri ve Shopify Kullanan Markalar',
          description: 'Amazon, Etsy, eBay, Shopify veya B2B katalog süreçlerinde ürün sunumu, içerik, analiz ve optimizasyonu yapay zeka desteğiyle güçlendirmek isteyen markalar için uygundur.',
        },
        {
          number: '03',
          title: 'Operasyonel İş Yükünü Azaltmak İsteyenler',
          description: 'Tekrarlayan analiz, raporlama, veri düzenleme, müşteri sınıflandırma veya içerik kontrol süreçlerini daha yönetilebilir hale getirmek isteyen işletmeler için uygundur.',
        },
        {
          number: '04',
          title: 'Veriye Dayalı Karar Süreçlerini Güçlendirmek İsteyenler',
          description: 'Pazar, ürün, reklam, içerik ve müşteri verilerini daha anlamlı yorumlamak isteyen ekipler için yapay zeka destekli karar sistemleri oluşturulur.',
        },
      ],
    },
    problem: {
      eyebrow: 'SİSTEM EKSİKLERİ',
      title: 'Yapay Zeka Kullanmak Değil, İş Sürecine Entegre Etmek Gerekir',
      description:
        'Birçok marka yapay zekayı tekil içerik üretimi veya rastgele araç kullanımı olarak görür. Ancak ürün verisi, satış kanalı, operasyon akışı, müşteri ihtiyacı ve karar süreciyle bağlantı kurulmadığında yapay zeka sürdürülebilir fayda üretmez.',
      cards: [
        {
          number: '01',
          title: 'Dağınık AI Kullanımı',
          description: 'Farklı araçlar plansız kullanıldığında içerik dili, veri yapısı ve süreç çıktıları tutarsız hale gelebilir.',
        },
        {
          number: '02',
          title: 'Satış Sisteminden Kopuk İçerik',
          description: 'Yapay zeka ile üretilen metin, görsel veya analiz çıktıları satış kanalı, SEO, reklam ve müşteri beklentisiyle uyumlu değilse etkisi sınırlı kalır.',
        },
        {
          number: '03',
          title: 'Manuel Kontrol Yükü',
          description: 'AI çıktıları kontrol, düzenleme, sınıflandırma ve yayın süreciyle entegre edilmediğinde ekipler hâlâ aynı işi tekrar tekrar yapmak zorunda kalır.',
        },
        {
          number: '04',
          title: 'Ölçülmeyen Verimlilik',
          description: 'Yapay zekanın hangi süreçte zaman kazandırdığı, kaliteyi artırdığı veya satış sistemine katkı sağladığı ölçülmediğinde gelişim alanları görünmez.',
        },
      ],
    },
    approach: {
      eyebrow: 'GLOVENTGLOBAL YAKLAŞIMI',
      title: 'Yapay Zekayı Araç Olarak Değil, Satış Sisteminin Parçası Olarak Kurgularız',
      description:
        'GloventGlobal yapay zekayı yalnızca metin veya görsel üretimi için kullanmaz. Ürün, pazar, içerik, operasyon, reklam, raporlama ve müşteri akışlarını destekleyen uygulanabilir AI sistemleri kurgular.',
      steps: [
        {
          number: '01',
          title: 'Süreç ve İhtiyaç Analizi',
          description: 'Markanın ürün, içerik, operasyon, raporlama, müşteri ve satış süreçlerinde yapay zekanın nerede gerçek fayda sağlayacağını analiz ederiz.',
        },
        {
          number: '02',
          title: 'AI Kullanım Alanlarının Belirlenmesi',
          description: 'Görsel konsept, ürün açıklaması, listeleme, SEO, raporlama, müşteri sınıflandırma, veri analizi veya operasyon desteği için uygun kullanım alanlarını belirleriz.',
        },
        {
          number: '03',
          title: 'Araç ve Akış Entegrasyonu',
          description: 'Yapay zeka araçlarını n8n, API, Google Sheets, Shopify, pazaryeri verileri, CRM, form veya raporlama yapılarıyla uyumlu hale getiririz.',
        },
        {
          number: '04',
          title: 'Kontrol ve Gelişim Sistemi',
          description: 'AI çıktılarının kalite kontrolünü, marka diliyle uyumunu, insan onay adımlarını ve performans takibini birlikte planlarız.',
        },
      ],
    },
    dataSystem: {
      eyebrow: 'VERİYLE YÖNETİLEN SİSTEM',
      title: 'Yapay Zeka Kullanımınızı Verilerle Geliştirilen Bir İş Sistemine Dönüştürüyoruz',
      description:
        'Yapay zeka entegrasyonu yayına alındıktan sonra içerik kalitesi, süreç hızı, raporlama çıktıları, müşteri akışı, operasyon verimliliği ve satış sistemine katkısı takip edilir. Böylece AI kullanımı tek seferlik bir deneme değil, geliştirilebilir bir iş sistemi haline gelir.',
      // Yapay Zeka Entegrasyonu için gerçek dashboard/analytics görselleri henüz hazır değil —
      // diğer hizmetlerdeki gibi geçici, metin tabanlı kayan veri kartları kullanılıyor. Gerçek
      // görseller hazır olduğunda buraya sadece `dashboardImages` eklenmesi yeterli olacak.
      dataCards: [
        {
          title: 'İçerik Kalitesi',
          description: 'AI destekli içeriklerin marka dili, kanal uyumu, SEO ve satış algısı açısından kalitesini değerlendiririz.',
        },
        {
          title: 'Süreç Hızı',
          description: 'Ürün açıklaması, görsel konsept, raporlama, sınıflandırma veya veri düzenleme süreçlerinde kazanılan zamanı takip ederiz.',
        },
        {
          title: 'Operasyon Verimliliği',
          description: 'Tekrarlayan işlerin ne kadar azaldığını, ekiplerin hangi süreçlerde daha hızlı ilerlediğini analiz ederiz.',
        },
        {
          title: 'Karar Destek Sinyalleri',
          description: 'Ürün, pazar, reklam, müşteri ve içerik verilerinden çıkan AI destekli içgörüleri karar süreçlerine dahil ederiz.',
        },
        {
          title: 'Gelişim Alanları',
          description: 'Hangi AI akışlarının güçlendirileceğini, hangi süreçlerin otomasyona bağlanacağını ve hangi çıktılarda insan kontrolü gerektiğini belirleriz.',
        },
      ],
    },
    process: {
      eyebrow: 'SÜREÇ',
      title: 'Yapay Zeka Entegrasyonu İçin Uygulama Yol Haritası',
      description:
        'Yapay zeka entegrasyonunu yalnızca araç seçimi olarak ele almayız; iş süreci, veri yapısı, insan kontrolü, marka dili, otomasyon ve ölçüm mantığını birlikte planlarız.',
      steps: [
        {
          number: '01',
          title: 'Süreç Keşfi',
          description: 'Markanın ürün, içerik, satış, operasyon, raporlama ve müşteri süreçlerinde yapay zekanın nerede kullanılabileceğini analiz ederiz.',
        },
        {
          number: '02',
          title: 'Kullanım Senaryoları',
          description: 'İçerik üretimi, görsel konsept, pazar analizi, ürün sınıflandırma, raporlama, müşteri akışı veya operasyon desteği için net senaryolar belirleriz.',
        },
        {
          number: '03',
          title: 'Araç ve Entegrasyon Planı',
          description: 'Kullanılacak AI araçlarını, veri kaynaklarını, onay adımlarını, n8n/API bağlantılarını ve ekip kullanım akışını planlarız.',
        },
        {
          number: '04',
          title: 'Test ve Kalite Kontrol',
          description: 'AI çıktılarının doğruluğunu, marka diliyle uyumunu, insan onay noktalarını ve hata risklerini test ederiz.',
        },
        {
          number: '05',
          title: 'Yayın ve Optimizasyon',
          description: 'Sistem kullanıma alındıktan sonra süreç hızı, içerik kalitesi, operasyon verimliliği ve satış etkisine göre geliştirmeler yaparız.',
        },
      ],
    },
    deliverables: {
      eyebrow: 'HAZIRLANAN SİSTEM',
      title: 'Yapay Zeka Entegrasyonu İçin Hazırlanan Sistem Çıktıları',
      description:
        'Yapay Zeka Entegrasyonu sonunda yalnızca kullanılan araçlar değil; markanın iş süreçlerine uyarlanmış, kontrol edilebilir ve geliştirilebilir AI destekli bir çalışma sistemi hazırlanır.',
      items: [
        {
          number: '01',
          title: 'AI Kullanım Haritası',
          description: 'Markanın hangi süreçlerinde yapay zekadan faydalanılacağı, hangi işlerin AI destekli yürütüleceği ve hangi alanlarda insan kontrolü gerektiği belirlenir.',
        },
        {
          number: '02',
          title: 'İçerik ve Görsel Destek Akışları',
          description: 'Ürün açıklaması, başlık, SEO, görsel konsept, lifestyle fikirleri ve marka dili için AI destekli üretim akışları hazırlanır.',
        },
        {
          number: '03',
          title: 'Raporlama ve Analiz Akışları',
          description: 'Ürün, satış, reklam, müşteri, teklif veya operasyon verilerinden anlamlı raporlar üretmek için AI destekli analiz yapısı kurgulanır.',
        },
        {
          number: '04',
          title: 'Operasyon Destek Sistemi',
          description: 'Form, teklif, müşteri sınıflandırma, veri düzenleme, ürün bilgisi kontrolü veya tekrar eden işlerde AI destekli akışlar oluşturulur.',
        },
        {
          number: '05',
          title: 'Kontrol ve Onay Yapısı',
          description: 'AI çıktılarının marka dili, doğruluk, satış uygunluğu ve kalite açısından kontrol edilmesi için insan onay adımları planlanır.',
        },
        {
          number: '06',
          title: 'Gelişim Önerileri',
          description: 'Sonraki aşamada hangi süreçlerin otomasyona bağlanacağı, hangi AI akışlarının geliştirileceği ve hangi verilerin daha iyi kullanılacağı netleştirilir.',
        },
      ],
    },
    finalCta: {
      title: 'Yapay Zekayı Markanızın Satış Sistemine Entegre Edelim',
      description:
        'Mevcut ürün, içerik, operasyon, raporlama ve satış süreçlerinizi birlikte değerlendirerek markanız için doğru yapay zeka entegrasyonu ve uygulama yol haritasını planlayalım.',
      ctaLabel: 'AI Entegrasyon Planı Oluştur',
      supportText: 'AI • İçerik • Görsel Konsept • Raporlama • Operasyon • n8n • API • Karar Destek',
    },
  },
};