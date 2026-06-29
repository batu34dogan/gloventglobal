export type GuideSection = {
  heading: string;
  body: string;
};

export type ComparisonTable = {
  heading: string;
  headers: [string, string, string];
  rows: { criterion: string; individual: string; company: string }[];
};

export type Checklist = {
  heading: string;
  items: string[];
};

export type Faq = {
  heading: string;
  items: { question: string; answer: string }[];
};

export type Guide = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  targetAudience: string;
  searchIntent: string;
  // NOT: serviceDetailsData.ts içindeki gerçek hizmet slug'larıyla birebir eşleşmeli — kırık
  // link oluşmasın diye buraya her zaman gerçek, var olan bir slug yazılmalı.
  relatedServiceSlug: string;
  readTime: string;
  publishedAt: string;
  // Rehber liste sayfasındaki stratejik (publishedAt'ten bağımsız) sıralama için. Küçük sayı
  // önce gösterilir. Belirtilmezse listenin en sonuna düşer (Number.MAX_SAFE_INTEGER fallback).
  order?: number;
  // Aşağıdaki alanlar opsiyonel — henüz doldurulmamış rehberlerde (diğer 5 rehber, bazı alanlar
  // için) hiç görünmez, sayfa bu alanlar olmadan da eskisi gibi çalışır.
  updatedAt?: string;
  // updatedAt ("Haziran 2026" gibi) insan-okunur bir gösterim metni — schema.org dateModified
  // ISO 8601 formatı gerektirir. Bu yüzden ayrı, makine-okunur bir alan: görsel metne (updatedAt)
  // hiç dokunmadan sadece JSON-LD için kullanılır.
  updatedAtISO?: string;
  author?: string;
  summary?: string;
  quickAnswer?: string;
  whoShouldRead?: string[];
  expertNote?: string;
  // expertNote hangi bölüm başlığından sonra gösterilsin. Belirtilmezse (ve expertNote doluysa)
  // ana içerik başlangıcından hemen sonra görünmesin diye 3. bölümden sonra gösterilir (ya da
  // daha az bölüm varsa son bölümden sonra) — veri odaklı, başlık metnine bağımlı olmayan
  // bir varsayılan.
  expertNoteAfterHeading?: string;
  comparison?: ComparisonTable;
  checklist?: Checklist;
  faq?: Faq;
  nextSteps?: string[];
  sections: GuideSection[];
};

export const guides: Record<string, Guide> = {
  'amazonda-satis-yapmak-icin-sirket-gerekir-mi': {
    title: 'Amazon’da Satış Yapmak İçin Şirket Gerekir mi?',
    slug: 'amazonda-satis-yapmak-icin-sirket-gerekir-mi',
    excerpt:
      'Amazon’da satışa başlamadan önce şirket kurmanın gerekip gerekmediğini, hangi durumda şahıs şirketinin yeterli olabileceğini ve hangi durumda daha kurumsal bir yapının gerekli olduğunu özetliyoruz.',
    category: 'Amazon',
    targetAudience: 'Amazon’da satışa başlamayı düşünen üretici ve marka sahipleri',
    searchIntent: 'amazon satış şirket gerekli mi, amazon satıcı olmak için şirket şartı',
    relatedServiceSlug: 'amazon',
    readTime: '4 dk',
    publishedAt: '2026-01-15',
    order: 1,
    updatedAt: 'Haziran 2026',
    updatedAtISO: '2026-06-01',
    author: 'GloventGlobal Global Commerce Team',
    summary:
      'Amazon’da satış yapmak için her durumda şirket zorunlu olmayabilir. Ancak sürdürülebilir satış hedefleyen markalar için şirket, vergi, lojistik, ödeme ve operasyon planlaması en baştan düşünülmelidir. Bu rehber hangi durumda bireysel başlangıcın, hangi durumda şirketli yapının daha doğru olabileceğini açıklar.',
    quickAnswer:
      'Amazon’da bazı pazarlarda bireysel satıcı hesabı açmak mümkün olabilir. Ancak ciddi, sürdürülebilir ve ölçeklenebilir satış yapmak isteyen işletmeler için şirket, vergi, fatura, ödeme alma, lojistik ve marka yönetimi birlikte planlanmalıdır.',
    whoShouldRead: [
      'Amazon’da satışa başlamayı düşünenler',
      'Şirket kurmadan önce süreci anlamak isteyenler',
      'Türkiye’den global pazarlara açılmak isteyen üretici ve markalar',
      'Bireysel başlangıç ile şirketli satış arasındaki farkı öğrenmek isteyenler',
    ],
    expertNote:
      'Amazon’da bireysel başlangıç bazı durumlarda mümkün olabilir. Ancak uzun vadeli marka oluşturmak, düzenli reklam yönetmek, fatura/vergi düzenini sağlamak ve operasyonu ölçeklemek isteyen işletmeler için şirketli yapı çoğu senaryoda daha sağlıklı bir temel oluşturur.',
    expertNoteAfterHeading: 'Profesyonel satış için şirket neden önemlidir?',
    comparison: {
      heading: 'Bireysel başlamak mı, şirketle başlamak mı?',
      headers: ['Kriter', 'Bireysel Başlangıç', 'Şirketli Başlangıç'],
      rows: [
        { criterion: 'Başlangıç maliyeti', individual: 'Daha düşük', company: 'Daha yüksek' },
        { criterion: 'Güvenilirlik', individual: 'Sınırlı', company: 'Daha güçlü' },
        { criterion: 'Ölçekleme', individual: 'Zorlaşabilir', company: 'Daha kolay' },
        { criterion: 'Fatura / vergi düzeni', individual: 'Basit', company: 'Kurumsal' },
        { criterion: 'Marka oluşturma', individual: 'Sınırlı', company: 'Uygun' },
        { criterion: 'Uzun vadeli operasyon', individual: 'Zorlaşabilir', company: 'Sürdürülebilir' },
      ],
    },
    checklist: {
      heading: 'Amazon’da satışa başlamadan önce kontrol listesi',
      items: [
        'Satılacak ürün belirlendi mi?',
        'Hedef pazar seçildi mi?',
        'Rakip ve fiyat analizi yapıldı mı?',
        'Ürün kârlılığı hesaplandı mı?',
        'Kargo / FBA / FBM modeli seçildi mi?',
        'Gerekli belgeler kontrol edildi mi?',
        'Listeleme ve görsel stratejisi hazır mı?',
        'Reklam bütçesi planlandı mı?',
        'Operasyon takibi nasıl yapılacak?',
      ],
    },
    faq: {
      heading: 'Sık Sorulan Sorular',
      items: [
        {
          question: 'Amazon’da satış yapmak için şirket zorunlu mu?',
          answer:
            'Çoğu pazarda kesin bir zorunluluk yoktur ve bazı durumlarda bireysel başlangıç mümkün olabilir. Ancak ciddi, düzenli ve sürdürülebilir satış hedefleyen markalar için şirket yapısı genellikle daha sağlıklı bir temel sağlar. Güncel gereklilik, başvuru yapılacak pazara ve hesap türüne göre değişebilir.',
        },
        {
          question: 'Amazon’da bireysel hesapla satış yapılabilir mi?',
          answer:
            'Bazı pazarlarda bireysel hesapla satışa başlamak mümkün olabilir. Ancak istenen belgeler ve hesap türü, satış yapılacak ülkeye ve ürün kategorisine göre farklılık gösterebilir. Başvuru öncesinde ilgili pazarın güncel şartlarının kontrol edilmesi önemlidir.',
        },
        {
          question: 'Türkiye’den Amazon’da satış yapmak için ne gerekir?',
          answer:
            'Hedef pazar seçimi, ürün uygunluğu, lojistik modeli ve gerekli belgelerin netleştirilmesi gerekir. Bu adımlar; başvuru yapılacak Amazon pazarına, ürün kategorisine ve hesap türüne göre değişebileceği için önceden araştırılmalıdır. Kârlılık ve operasyon planı da bu aşamada birlikte değerlendirilmelidir.',
        },
        {
          question: 'Amazon’da şirket kurmadan başlamak mantıklı mı?',
          answer:
            'Küçük ölçekli bir pazar testi veya ürün fikrini doğrulama aşamasında mantıklı bir seçenek olabilir. Ancak satış hacmi ve hedefler büyüdükçe; fatura, vergi ve tedarikçi ilişkileri için şirketleşme genellikle gerekli hale gelir. Bu karar, ürün kategorisi ve hedef pazara göre de değişebilir.',
        },
        {
          question: 'Amazon’da satışa başlamak için en önemli hazırlık nedir?',
          answer:
            'Ürün, pazar ve kârlılık analizinin; listeleme, reklam ve operasyon planıyla birlikte yapılması en önemli hazırlıktır. Bu unsurlardan biri eksik kaldığında satış süreci dengesiz ilerleyebilir. Hazırlık adımları, hedeflenen pazara ve ürün grubuna göre küçük farklılıklar gösterebilir.',
        },
        {
          question: 'Amazon FBA için şirket gerekir mi?',
          answer:
            'FBA programına katılım şartları pazara, ürün kategorisine ve hesap türüne göre değişebilir; bazı durumlarda kesin bir şirket şartı aranmayabilir. Yine de düzenli stok, lojistik ve finansal takip gerektiren bir model olduğu için kurumsal bir yapı çoğu zaman süreci kolaylaştırır. Güncel gereklilikler başvuru yapılacak Amazon pazarına göre kontrol edilmelidir.',
        },
      ],
    },
    nextSteps: [
      'Ürün ve pazar uygunluğunu değerlendirin',
      'Kârlılık ve operasyon modelinizi netleştirin',
      'Listeleme, reklam ve lojistik planınızı hazırlayın',
      'Amazon Global Satış Sistemi hizmetini inceleyin',
      'Ücretsiz analiz ile başlangıç seviyenizi değerlendirin',
    ],
    sections: [
      {
        heading: 'Bu soruyu neden soruyorsunuz?',
        body: 'Amazon’a başlamadan önce bu soruyu soran kişiler genellikle maliyet, şirket kurma zorunluluğu, vergi, ödeme alma, fatura düzeni, kargo ve olası riskleri anlamaya çalışır. Bu rehber, bu soruları netleştirmek için hazırlandı.',
      },
      {
        heading: 'Amazon’da bireysel satıcı hesabı açılabilir mi?',
        body: 'Bazı pazarlarda bireysel hesap açmak mümkün olabilir. Ancak istenen belgeler, hesap türü ve satış yapılacak ülkeye göre değişebilir; güncel gereklilikler başvuru yapılacak Amazon pazarına göre kontrol edilmelidir.',
      },
      {
        heading: 'Şirket olmadan Amazon’da satış yapmak ne zaman mantıklı olabilir?',
        body: 'Bazı durumlarda şirketsiz başlamak makul bir seçenek olabilir:\n- Küçük çaplı bir pazar testi yapmak\n- Ürün fikrini doğrulamak\n- Düşük hacimli bir başlangıç yapmak\n- Operasyonu öğrenmek\n\nAncak uzun vadeli marka oluşturma, düzenli satış, reklam, fatura, ödeme ve tedarikçi ilişkileri için şirketleşme çoğu zaman daha sağlıklı bir yapıdır.',
      },
      {
        heading: 'Profesyonel satış için şirket neden önemlidir?',
        body: '- Fatura ve vergi düzeni\n- Ödeme alma süreçleri\n- Tedarikçi ve marka ilişkileri\n- Lojistik / gümrük süreçleri\n- Reklam ve ölçekleme\n- Finansal takip\n- Marka güvenilirliği',
      },
      {
        heading: 'Türkiye’den Amazon’da satış yaparken hangi konular planlanmalı?',
        body: '- Hedef pazar seçimi\n- Ürün uygunluğu\n- Rekabet analizi\n- Kargo / FBA / FBM kararı\n- Ürün listeleme\n- Reklam bütçesi\n- Kârlılık hesabı\n- Operasyon yönetimi\n- İade ve müşteri hizmetleri',
      },
      {
        heading: 'Örnek Başlangıç Senaryosu',
        body: 'Örnek senaryo: Amazon’a yeni başlayacak bir üretici, önce 5-10 ürün fikrini pazar ve rekabet açısından değerlendirir. Kârlılık, kargo modeli, listeleme ihtiyacı ve reklam bütçesi netleşmeden doğrudan stok yatırımı yapmak yerine, ürün uygunluğunu ve operasyon kapasitesini analiz ederek ilerler. İlk 30 gün genellikle bu hazırlık ve analiz dönemine ayrılır; bu süreçte ürün, pazar, kârlılık, lojistik ve reklam olmak üzere 5 temel alan birlikte değerlendirilir. Bu senaryo bir satış garantisi değil, daha kontrollü başlangıç planı örneğidir.',
      },
      {
        heading: 'En sık yapılan hata',
        body: 'Amazon’a sadece bir hesap açma işi gibi bakmak en sık yapılan hatadır. Asıl mesele; ürün, pazar, fiyat, lojistik, listeleme, reklam ve operasyon sisteminin birlikte kurulmasıdır.',
      },
      {
        heading: 'GloventGlobal bu süreçte nasıl yardımcı olur?',
        body: 'GloventGlobal; ürün, pazar, şirketleşme ihtiyacı, listeleme, reklam, lojistik ve operasyon adımlarını birlikte değerlendirerek Amazon satış sürecini bir sisteme dönüştürür. Amazon’da satışa başlamadan önce ürününüzü, hedef pazarınızı ve mevcut hazırlık seviyenizi birlikte değerlendirebiliriz.',
      },
    ],
  },

  'etsyde-ilk-satis-nasil-alinir': {
    title: 'Etsy’de İlk Satış Nasıl Alınır?',
    slug: 'etsyde-ilk-satis-nasil-alinir',
    excerpt:
      'Yeni açılan bir Etsy mağazasının ilk satışını almasını geciktiren en yaygın hatalar ve ilk satışı hızlandıran temel adımlar.',
    category: 'Etsy',
    targetAudience: 'Etsy’de yeni mağaza açan veya açacak marka sahipleri',
    searchIntent: 'etsy ilk satış nasıl alınır, etsy mağaza satış yapmıyor, etsy mağazam neden satış almıyor, etsy seo nasıl yapılır, etsy reklam açmalı mıyım, etsy ilk 30 gün, etsy yeni mağaza nasıl büyür',
    relatedServiceSlug: 'etsy',
    readTime: '4 dk',
    publishedAt: '2026-01-18',
    order: 2,
    updatedAt: 'Haziran 2026',
    updatedAtISO: '2026-06-01',
    author: 'GloventGlobal Global Commerce Team',
    summary:
      'Etsy’de ilk satış almak için yalnızca mağaza açmak yeterli değildir. Ürün seçimi, listeleme kalitesi, görseller, SEO, fiyatlandırma, mağaza güveni ve ilk trafik stratejisi birlikte çalışmalıdır. Bu rehber yeni Etsy mağazalarının ilk satışa giden süreçte hangi adımlara odaklanması gerektiğini açıklar.',
    quickAnswer:
      'Etsy’de ilk satış almak için ürününüzün doğru müşteriye görünmesi, tıklanınca güven vermesi ve satın alma kararını kolaylaştırması gerekir. Başlık, etiket, kategori, açıklama, fotoğraf, fiyat, kargo ve mağaza profili birlikte optimize edilmeden ilk satış süreci uzayabilir.',
    whoShouldRead: [
      'Yeni Etsy mağazası açanlar',
      'Etsy’de ürün yükleyip satış alamayanlar',
      'El yapımı, tasarım veya niş ürünlerini yurtdışına satmak isteyenler',
      'Etsy SEO ve ürün fotoğrafı konusunda nereden başlayacağını bilmeyenler',
    ],
    expertNote:
      'Etsy’de ilk satış çoğu zaman tek bir ayarın sonucu değildir. Başlık, etiket veya reklam tek başına yeterli olmayabilir; ürünün arama niyeti, görsel dili, fiyat algısı ve mağaza güveni aynı anda değerlendirilmelidir.',
    expertNoteAfterHeading: 'Etsy reklamları ilk satış için gerekli mi?',
    sections: [
      {
        heading: 'Bu soruyu neden soruyorsunuz?',
        body: 'Bu soruyu soran kişiler genellikle mağazasını açmış, ürün yüklemiş ama görüntülenme, favori veya satış alamadığını fark etmiştir. İlk satış sadece ürün yüklemekle gelmez; doğru görünürlük ve güven sistemini birlikte kurmakla ilgilidir.',
      },
      {
        heading: 'Etsy’de ilk satış neden hemen gelmeyebilir?',
        body: '- Ürün, arama niyetine tam uymuyor olabilir\n- Başlık ve etiketler alıcı diliyle yazılmamış olabilir\n- Fotoğraflar ürünü yeterince anlatmıyor olabilir\n- Fiyat, kargo veya teslimat algısı zayıf olabilir\n- Mağaza profili güven vermiyor olabilir\n- Rekabet yoğun olabilir\n- Listeleme yeni olduğu için yeterli veri oluşmamış olabilir',
      },
      {
        heading: 'Etsy arama sistemi yeni mağazaları nasıl değerlendirir?',
        body: 'Etsy, alıcının arama sorgusuyla listeleme bilgilerinin ne kadar uyumlu olduğuna bakar. Başlık, etiketler, kategori, özellikler, açıklama, görseller ve kullanıcı davranışları görünürlüğü etkileyebilir; kesin bir algoritma formülü yoktur ve bu mantık zamanla değişebilir.',
      },
      {
        heading: 'İlk satış için ürün seçimi neden önemlidir?',
        body: '- Her ürün Etsy için uygun değildir\n- Niş ürün daha avantajlı olabilir\n- Hediye, kişiselleştirme, el yapımı, tasarım ve özel kullanım alanları güçlü olabilir\n- Çok genel ürünlerde rekabet yüksektir\n- İlk ürünler test edilebilir olmalı',
      },
      {
        heading: 'Etsy SEO’da ilk yapılması gerekenler',
        body: '- Alıcının kullandığı kelimeleri düşünmek\n- Başlığı okunabilir ve arama niyetine uygun yazmak\n- 13 etiketi mantıklı kullanmak\n- Kategori ve özellikleri eksiksiz doldurmak\n- Açıklamada ürünün ne olduğunu, kime uygun olduğunu ve nasıl kullanılacağını net anlatmak\n- Anahtar kelime doldurma yerine doğal açıklama kullanmak',
      },
      {
        heading: 'Ürün fotoğrafları ilk satışı nasıl etkiler?',
        body: '- İlk fotoğraf tıklama kararını etkiler\n- Ürün net anlaşılmalı\n- Ölçek / kullanım / detay görselleri önemli\n- Arka plan ürünle yarışmamalı\n- Güven veren ve gerçekçi fotoğraf dili kullanılmalı\n- Yapay zeka arka plan kullanılıyorsa ürün gerçekliği bozulmamalı',
      },
      {
        heading: 'Fiyat, kargo ve güven algısı',
        body: '- Yeni mağazada müşteri risk algısı daha yüksektir\n- Fiyat çok yüksek veya çok düşük görünmemeli\n- Kargo süresi ve maliyeti net olmalı\n- Mağaza hakkında bölümü doldurulmalı\n- Politika ve profil alanları eksik bırakılmamalı',
      },
      {
        heading: 'Etsy reklamları ilk satış için gerekli mi?',
        body: 'Reklam bazı ürünlerde görünürlük sağlayabilir ama zayıf listelemeyi kurtarmaz. Önce ürün sayfası, fotoğraf, SEO ve fiyat yapısı düzeltilmeli; sonra düşük bütçeyle test mantığıyla reklam kullanılabilir.',
      },
      {
        heading: 'Etsy’de ilk 30 gün nasıl planlanmalı?',
        body: '1. hafta: mağaza profili, politika, ilk ürünler\n2. hafta: başlık, etiket, fotoğraf kontrolü\n3. hafta: görüntülenme ve favori verilerini analiz etme\n4. hafta: düşük performanslı listelemeleri iyileştirme, gerekirse reklam testi',
      },
      {
        heading: 'Örnek Başlangıç Senaryosu',
        body: 'Örnek senaryo: Yeni açılan bir Etsy mağazası, ilk etapta 10 güçlü ürünle başlayabilir. Her ürün için net başlık, doğru kategori, mantıklı etiketler, 8-10 kaliteli görsel ve güven veren açıklama hazırlanır. İlk 30 gün boyunca görüntülenme, favori ve tıklama verileri takip edilerek düşük performanslı listelemeler iyileştirilir. Bu süreçte ürün, SEO, fotoğraf, fiyat ve mağaza güveni olmak üzere 5 temel alan birlikte değerlendirilir. Bu senaryo bir satış garantisi değil, daha kontrollü başlangıç planı örneğidir.',
      },
      {
        heading: 'En sık yapılan hata',
        body: 'Etsy’de en sık hata, mağazayı açıp ürün yüklemeyi satış için yeterli sanmaktır. Asıl mesele ürün, arama niyeti, görsel kalite, güven, fiyat ve trafik sisteminin birlikte kurulmasıdır.',
      },
      {
        heading: 'GloventGlobal bu süreçte nasıl yardımcı olur?',
        body: 'GloventGlobal, Etsy mağazalarını yalnızca ürün yükleme alanı olarak değil; ürün seçimi, görsel dil, SEO, fiyatlandırma, reklam ve operasyon adımlarının birlikte çalıştığı bir marka sistemi olarak ele alır.',
      },
    ],
    comparison: {
      heading: 'Yeni Etsy mağazasında organik başlangıç mı, reklamlı başlangıç mı?',
      headers: ['Kriter', 'Organik Başlangıç', 'Reklamlı Başlangıç'],
      rows: [
        { criterion: 'Başlangıç maliyeti', individual: 'Daha düşük', company: 'Daha yüksek' },
        { criterion: 'Öğrenme', individual: 'Daha doğal veri sağlar', company: 'Daha hızlı test verisi sağlar' },
        { criterion: 'Risk', individual: 'Daha kontrollü', company: 'Zayıf listelemede bütçe boşa gidebilir' },
        { criterion: 'Hız', individual: 'Daha yavaş', company: 'Daha hızlı görünürlük sağlayabilir' },
        { criterion: 'Uygun kullanım', individual: 'Mağaza ve listeleme temeli kurmak', company: 'Hazır listelemeleri test etmek' },
      ],
    },
    checklist: {
      heading: 'Etsy’de ilk satış öncesi kontrol listesi',
      items: [
        'Ürün Etsy müşteri kitlesine uygun mu?',
        'Başlık alıcının arama niyetine göre yazıldı mı?',
        '13 etiket mantıklı şekilde kullanıldı mı?',
        'Kategori ve özellikler eksiksiz mi?',
        'İlk fotoğraf tıklama alabilecek kadar güçlü mü?',
        'Ürün açıklaması net ve güven verici mi?',
        'Fiyat ve kargo müşteriye anlaşılır görünüyor mu?',
        'Mağaza profili ve politikalar dolduruldu mu?',
        'İlk 30 gün için optimizasyon planı var mı?',
      ],
    },
    faq: {
      heading: 'Sık Sorulan Sorular',
      items: [
        {
          question: 'Etsy’de ilk satış ne kadar sürede gelir?',
          answer:
            'Bu süre üründen ürüne, kategoriye ve rekabet yoğunluğuna göre değişir; kesin bir süre vermek mümkün değildir. Doğru ürün, listeleme kalitesi ve mağaza güveni birlikte kurulduğunda süreç genellikle daha öngörülebilir hale gelir.',
        },
        {
          question: 'Etsy’de satış almak için reklam şart mı?',
          answer:
            'Reklam şart değildir; öncelik ürün sayfası, fotoğraf, SEO ve fiyat yapısının doğru kurulmasıdır. Bu temel sağlandıktan sonra düşük bütçeli reklam testleri görünürlüğü destekleyebilir.',
        },
        {
          question: 'Etsy SEO’da en önemli alanlar nelerdir?',
          answer:
            'Başlık, etiketler, kategori ve özellikler alıcının arama niyetiyle uyumlu olmalıdır. Açıklama da anahtar kelime doldurma yerine ürünü doğal bir dille anlatmalıdır.',
        },
        {
          question: 'Yeni Etsy mağazasında kaç ürünle başlamak gerekir?',
          answer:
            'Kesin bir sayı yoktur; az sayıda ama doğru seçilmiş 5-10 ürünle başlamak çoğu zaman daha yönetilebilir bir test süreci sağlar. Önemli olan ürünlerin mağaza kimliğiyle ve hedef müşteriyle uyumlu olmasıdır.',
        },
        {
          question: 'Etsy’de ürün fotoğrafları satışları etkiler mi?',
          answer:
            'Evet, ilk fotoğraf tıklama kararını doğrudan etkiler ve ürünün net, güven veren şekilde anlatılması önemlidir. Zayıf veya belirsiz görseller, diğer her şey doğru olsa bile satışı zorlaştırabilir.',
        },
        {
          question: 'Etsy mağazam görüntülenme alıyor ama satış almıyorsa ne yapmalıyım?',
          answer:
            'Bu durumda genellikle fotoğraf, açıklama, fiyat veya mağaza güveni alanlarından biri alıcıyı satın almaya ikna edemiyordur. Listelemeleri tek tek gözden geçirip bu alanları güçlendirmek mantıklı bir ilk adımdır.',
        },
      ],
    },
    nextSteps: [
      'Ürünlerinizin Etsy müşteri kitlesine uygun olup olmadığını değerlendirin',
      'En güçlü 5-10 ürünle mağazanızı sade şekilde başlatın',
      'Başlık, etiket, kategori ve açıklamaları arama niyetine göre düzenleyin',
      'Ürün fotoğraflarınızı güven ve tıklama odaklı hazırlayın',
      'İlk trafik ve optimizasyon planınızı oluşturun',
    ],
  },

  'shopify-mi-etsy-mi-hangi-isletme-icin-hangisi-daha-mantikli': {
    title: 'Shopify mı Etsy mi? Hangi İşletme İçin Hangisi Daha Mantıklı?',
    slug: 'shopify-mi-etsy-mi-hangi-isletme-icin-hangisi-daha-mantikli',
    excerpt:
      'Shopify ve Etsy birbirinin yerine geçen değil, farklı ihtiyaçlara hizmet eden iki farklı satış modelidir. Hangi işletme için hangisinin daha mantıklı olduğunu karşılaştırıyoruz.',
    category: 'Shopify',
    targetAudience: 'İlk satış kanalını seçmeye çalışan marka sahipleri',
    searchIntent: 'shopify mı etsy mi, etsy mi kendi web sitesi mi, shopify mı pazaryeri mi, yeni başlayanlar için etsy mi shopify mı daha iyi, etsy’den shopify’a geçilmeli mi, marka kurmak için shopify mı etsy mi, global satış için etsy mi shopify mı',
    relatedServiceSlug: 'shopify',
    readTime: '5 dk',
    publishedAt: '2026-01-21',
    order: 3,
    updatedAt: 'Haziran 2026',
    updatedAtISO: '2026-06-01',
    author: 'GloventGlobal Global Commerce Team',
    summary:
      'Shopify ve Etsy farklı amaçlara hizmet eder. Etsy, hazır pazaryeri trafiği ve niş ürün keşfiyle başlangıç için avantajlı olabilirken; Shopify, marka kontrolü, müşteri verisi, mağaza deneyimi ve uzun vadeli büyüme için daha güçlü bir yapı sunar. Bu rehber, hangi işletme için hangi kanalın daha mantıklı olduğunu karar kriterleriyle açıklar.',
    quickAnswer:
      'Yeni başlayan ve ürün talebini test etmek isteyen markalar için Etsy daha hızlı bir başlangıç kanalı olabilir. Kendi markasını kurmak, müşteri verisini yönetmek, mağaza deneyimini kontrol etmek ve uzun vadeli büyüme sistemi oluşturmak isteyen işletmeler için Shopify daha stratejik bir tercih olabilir.',
    whoShouldRead: [
      'Etsy ile Shopify arasında karar veremeyenler',
      'Kendi markası için e-ticaret altyapısı kurmak isteyenler',
      'Etsy’de satış yapıp Shopify’a geçmeyi düşünenler',
      'Pazaryeri mi kendi web sitesi mi daha mantıklı diye araştıran işletmeler',
      'Global satış için doğru kanal stratejisi arayan markalar',
    ],
    expertNote:
      'Etsy ve Shopify birbirinin alternatifi olmak zorunda değildir. Birçok marka Etsy’yi ürün ve pazar talebini test etmek için, Shopify’ı ise uzun vadeli marka mağazası ve müşteri ilişkisi kurmak için birlikte kullanabilir.',
    expertNoteAfterHeading: 'Etsy ve Shopify birlikte kullanılabilir mi?',
    sections: [
      {
        heading: 'Bu soruyu neden soruyorsunuz?',
        body: 'Bu soruyu soran kişiler genellikle e-ticarete başlamak, yurtdışına satış yapmak veya markasını büyütmek ister. Etsy ve Shopify aynı işi yapmaz; biri pazaryeri, diğeri kendi marka mağazası altyapısıdır ve doğru seçim işletmenin ihtiyacına göre değişir.',
      },
      {
        heading: 'Shopify ve Etsy arasındaki temel fark nedir?',
        body: '- Etsy bir pazaryeridir\n- Shopify kendi e-ticaret mağazanızı kurmanızı sağlar\n- Etsy’de hazır trafik olabilir ama rekabet ve platform kuralları vardır\n- Shopify’da kontrol daha fazladır ama trafiği sizin getirmeniz gerekir',
      },
      {
        heading: 'Örnek Karar Senaryosu',
        body: 'Örnek senaryo: El yapımı veya niş ürünleri olan yeni bir marka, ilk etapta 10 güçlü ürünle Etsy’de talep testi yapabilir. En çok görüntülenen, favori alan veya dönüşüm potansiyeli gösteren ürünler belirlendikten sonra, Shopify tarafında daha kurumsal bir marka mağazası planlanabilir. Bu senaryo satış garantisi değil, daha kontrollü kanal seçimi için örnek bir başlangıç yaklaşımıdır.',
      },
      {
        heading: 'Etsy hangi işletmeler için daha mantıklı olabilir?',
        body: '- El yapımı, tasarım, niş ve kişiselleştirilebilir ürünler\n- Yeni başlayan ve talep test etmek isteyen markalar\n- Pazaryeri trafiğinden yararlanmak isteyenler\n- Kendi web sitesi trafiği olmayan işletmeler\n- Küçük ürün portföyüyle başlamak isteyenler',
      },
      {
        heading: 'Shopify hangi işletmeler için daha mantıklı olabilir?',
        body: '- Marka kontrolü isteyen işletmeler\n- Kendi müşteri verisini yönetmek isteyenler\n- Uzun vadeli marka mağazası kurmak isteyenler\n- Reklam, SEO, e-posta ve içerik trafiği oluşturabilecek markalar\n- B2B veya özel ürün sunumu isteyen işletmeler',
      },
      {
        heading: 'Etsy mi Shopify mı? 5 karar kriteri',
        body: '- Ürün tipi: El yapımı, niş veya kişiselleştirilebilir ürünler Etsy’ye; kurumsal/çeşitli ürün grupları Shopify’a daha uygun olabilir\n- Bütçe: Trafiği kendiniz oluşturacaksanız reklam/SEO bütçesi gerekir; Etsy’de bu daha sınırlı olabilir\n- Marka hedefi: Uzun vadeli marka kimliği hedefliyorsanız Shopify; hızlı talep testi istiyorsanız Etsy öne çıkabilir\n- Trafik kaynağı: Kendi trafiğiniz yoksa Etsy’nin pazaryeri trafiği avantaj sağlayabilir\n- Operasyon kapasitesi: İki kanalı birlikte yönetmek ek operasyon kapasitesi gerektirir',
      },
      {
        heading: 'Yeni başlayanlar için hangisi daha doğru?',
        body: 'Eğer marka henüz ürün talebini test etmediyse Etsy daha hızlı geri bildirim sağlayabilir. Eğer marka kimliği, müşteri deneyimi ve uzun vadeli büyüme hedefi daha netse Shopify daha doğru altyapı olabilir.',
      },
      {
        heading: 'Etsy ve Shopify birlikte kullanılabilir mi?',
        body: 'Evet, bazı işletmeler için birlikte kullanmak mantıklı olabilir.\nEtsy → keşif ve talep testi\nShopify → marka mağazası, müşteri ilişkisi, uzun vadeli büyüme\nAncak iki kanalı aynı anda yönetmek operasyon kapasitesi gerektirir.',
      },
      {
        heading: 'En sık yapılan hata',
        body: 'En sık hata, Shopify’ı sadece “site açmak”, Etsy’yi ise sadece “ürün yüklemek” olarak görmektir. Asıl mesele doğru ürünü doğru kanalda, doğru trafik ve operasyon sistemiyle konumlandırmaktır.',
      },
      {
        heading: 'GloventGlobal bu süreçte nasıl yardımcı olur?',
        body: 'GloventGlobal, markanın ürün yapısını, hedef pazarını, satış kanalını, operasyon kapasitesini ve büyüme hedefini analiz ederek Etsy, Shopify veya hibrit kanal yapısının hangisinin daha doğru olduğunu belirlemeye yardımcı olur.',
      },
    ],
    comparison: {
      heading: 'Etsy mi Shopify mı? Kanal Karşılaştırması',
      headers: ['Kriter', 'Etsy', 'Shopify'],
      rows: [
        { criterion: 'Trafik', individual: 'Hazır pazaryeri trafiğinden faydalanabilir', company: 'Trafiği marka kendi oluşturmalıdır' },
        { criterion: 'Marka kontrolü', individual: 'Platform sınırları vardır', company: 'Kontrol daha yüksektir' },
        { criterion: 'Başlangıç kolaylığı', individual: 'Daha hızlı başlayabilir', company: 'Kurulum ve yapılandırma gerektirir' },
        { criterion: 'Müşteri verisi', individual: 'Daha sınırlıdır', company: 'Daha fazla kontrol sağlar' },
        { criterion: 'Uzun vadeli büyüme', individual: 'Pazaryeri içinde büyüme sağlar', company: 'Marka varlığı oluşturmaya daha uygundur' },
        { criterion: 'Operasyon', individual: 'Listeleme ve pazaryeri yönetimi önemlidir', company: 'Site, trafik, ödeme, dönüşüm ve müşteri yönetimi birlikte gerekir' },
      ],
    },
    checklist: {
      heading: 'Shopify mı Etsy mi karar vermeden önce kontrol listesi',
      items: [
        'Ürününüz Etsy müşteri kitlesine uygun mu?',
        'Kendi markanızı uzun vadede büyütmek istiyor musunuz?',
        'Trafiği kendiniz getirebilecek bütçe veya içerik planınız var mı?',
        'Ürün portföyünüz test aşamasında mı, olgun mu?',
        'Görsel, açıklama ve kategori sisteminiz hazır mı?',
        'Reklam ve operasyon takibi yapabilecek misiniz?',
        'Müşteri verisini ve tekrar satışları yönetmek istiyor musunuz?',
        'Hangi kanalın önce test edileceği net mi?',
      ],
    },
    faq: {
      heading: 'Sık Sorulan Sorular',
      items: [
        {
          question: 'Yeni başlayanlar için Shopify mı Etsy mi daha iyi?',
          answer:
            'Bu, ürün tipinize ve test etmek istediğiniz talebe göre değişir. Hazır bir alıcı kitlesine ihtiyaç duyuyorsanız Etsy, kendi marka altyapınızı kurmak istiyorsanız Shopify daha uygun bir başlangıç noktası olabilir.',
        },
        {
          question: 'Etsy’de satış yaparken Shopify mağazası açmak mantıklı mı?',
          answer:
            'Evet, birçok marka için bu hibrit yaklaşım mantıklı olabilir. Etsy talep testi ve keşif sağlarken, Shopify uzun vadeli marka mağazası ve müşteri ilişkisi kurmaya yardımcı olur.',
        },
        {
          question: 'Shopify’da satış almak Etsy’den daha mı zor?',
          answer:
            'Zor olmaktan çok farklı bir çalışma gerektirir; Shopify’da trafiği markanın kendisi oluşturmalıdır. Etsy’de ise platformun hazır trafiğinden bir ölçüde faydalanmak mümkündür.',
        },
        {
          question: 'Etsy hazır trafik sağlar mı?',
          answer:
            'Etsy pazaryeri içi arama trafiğinden faydalanma imkanı sunar, ancak bu trafik rekabet ve platform kurallarına bağlı olarak değişebilir. Görünürlük garanti edilmez, doğru listeleme ve ürün uyumu önemlidir.',
        },
        {
          question: 'Shopify için reklam bütçesi gerekir mi?',
          answer:
            'Kesin bir zorunluluk değildir, ancak Shopify’da trafiği büyük ölçüde marka kendisi oluşturduğu için reklam, SEO veya içerik genellikle gereklidir. Bütçe ihtiyacı; ürün, hedef pazar ve büyüme hızına göre değişir.',
        },
        {
          question: 'Hangi ürünler Etsy için daha uygundur?',
          answer:
            'El yapımı, tasarım, niş ve kişiselleştirilebilir ürünler Etsy’de genellikle daha avantajlı olabilir. Çok genel veya yüksek rekabetli ürün gruplarında görünürlük daha zor olabilir.',
        },
        {
          question: 'Marka kurmak için Shopify daha mı avantajlı?',
          answer:
            'Marka kontrolü, müşteri verisi ve mağaza deneyimi açısından Shopify genellikle daha avantajlı bir altyapı sunar. Ancak bu avantajın gerçekleşmesi, trafik ve operasyon yatırımının da yapılmasına bağlıdır.',
        },
      ],
    },
    nextSteps: [
      'Ürün tipinizi ve hedef müşterinizi netleştirin',
      'Kısa vadede trafik mi, uzun vadede marka kontrolü mü öncelikli karar verin',
      'Etsy’de ürün talebi test edilecekse başlangıç ürünlerinizi seçin',
      'Shopify kurulacaksa marka, kategori ve dönüşüm altyapısını planlayın',
      'Ücretsiz analiz ile işletmeniz için doğru kanal yapısını değerlendirin',
    ],
  },

  'turkiyeden-yurtdisina-urun-satmak-icin-nereden-baslamali': {
    title: 'Türkiye’den Yurtdışına Ürün Satmak İçin Nereden Başlamalı?',
    slug: 'turkiyeden-yurtdisina-urun-satmak-icin-nereden-baslamali',
    excerpt:
      'Global pazara açılmak isteyen Türkiye merkezli markaların ilk olarak hangi soruları cevaplaması, hangi kararları önce vermesi gerektiğini özetliyoruz.',
    category: 'Global Satış',
    targetAudience: 'Yurtdışına satış yapmayı planlayan Türkiye merkezli üretici ve markalar',
    searchIntent: 'yurtdışına ürün satmak nereden başlanır, global pazara açılma',
    relatedServiceSlug: 'global-pazara-giris-stratejisi',
    readTime: '5 dk',
    publishedAt: '2026-01-24',
    order: 4,
    updatedAt: 'Haziran 2026',
    updatedAtISO: '2026-06-01',
    author: 'GloventGlobal Global Commerce Team',
    summary:
      'Global pazara açılmak isteyen Türkiye merkezli markaların ilk olarak hangi soruları cevaplaması, hangi kararları önce vermesi gerektiğini özetleyen bu rehber; pazar seçimi, operasyon hazırlığı ve kanal stratejisini bir araya getirir.',
    quickAnswer:
      'Doğru başlangıç noktası önce platform değil, hedef pazar ve müşteri seçimidir. Talep ve rekabet analizi yapılmadan seçilen kanal, doğru olsa bile beklenen sonucu vermeyebilir.',
    whoShouldRead: [
      'Yurtdışına satış yapmayı planlayan Türkiye merkezli üretici ve markalar',
      'Hangi pazardan başlayacağını netleştirmek isteyenler',
      'Global satış operasyonunu önceden planlamak isteyenler',
    ],
    sections: [
      {
        heading: 'Önce pazar, sonra kanal',
        body: 'Çoğu marka ilk olarak "hangi platform" sorusuyla başlar; ama doğru sıralama önce "hangi ülke ve hangi müşteri" sorusunu cevaplamaktır. Talep ve rekabet analizi yapılmadan seçilen kanal, doğru olsa bile sonuç vermeyebilir.',
      },
      {
        heading: 'Operasyon hazırlığı gözden kaçırılmamalı',
        body: 'Kargo, gümrük, iade ve müşteri iletişimi gibi operasyonel detaylar, global satışta ürün veya fiyattan önce markanın sürdürülebilirliğini belirleyen unsurlardır.',
      },
      {
        heading: 'Tek kanal değil, sistem yaklaşımı',
        body: 'Amazon EU, Amazon US, Etsy, Shopify veya B2B Showroom arasından markaya en uygun başlangıç noktası, ürün grubuna ve hedef pazara göre değişir.',
      },
      {
        heading: 'GloventGlobal nasıl yardımcı olur?',
        body: 'Global Büyüme Stratejisi kapsamında doğru ülke, kanal, fiyat ve operasyon hazırlığını birlikte değerlendirip ilk 12 aylık uygulanabilir bir büyüme planı oluşturuyoruz.',
      },
    ],
  },

  'b2b-dijital-showroom-nedir-ve-toptan-satista-neden-onemlidir': {
    title: 'B2B Dijital Showroom Nedir ve Toptan Satışta Neden Önemlidir?',
    slug: 'b2b-dijital-showroom-nedir-ve-toptan-satista-neden-onemlidir',
    excerpt:
      'Toptan satış yapan markaların PDF katalog ve e-posta trafiğinden, ölçülebilir bir dijital showroom yapısına geçmesi neden önemlidir, bunu açıklıyoruz.',
    category: 'B2B',
    targetAudience: 'Toptan satış yapan üretici ve distribütör firmalar',
    searchIntent: 'b2b dijital showroom nedir, toptan satış dijital katalog',
    relatedServiceSlug: 'b2b-dijital-showroom',
    readTime: '4 dk',
    publishedAt: '2026-01-27',
    order: 5,
    updatedAt: 'Haziran 2026',
    updatedAtISO: '2026-06-01',
    author: 'GloventGlobal Global Commerce Team',
    summary:
      'Toptan satış yapan markaların PDF katalog ve e-posta trafiğinden, ölçülebilir bir dijital showroom yapısına geçmesinin neden önemli olduğunu özetleyen bu rehber; teklif takibi, müşteri grupları ve satış görünürlüğü konularına odaklanır.',
    quickAnswer:
      'PDF katalog ve e-posta üzerinden yürüyen bir toptan satış süreci, hangi müşterinin hangi ürüne ilgi gösterdiğini izlemeyi zorlaştırır. Dijital showroom, ürün sunumu ve teklif sürecini tek bir görünür sisteme dönüştürür.',
    whoShouldRead: [
      'Toptan satış yapan üretici ve distribütör firmalar',
      'PDF katalog ve e-posta ile çalışmaktan sıkılan satış ekipleri',
      'Teklif sürecini dijitalleştirmek isteyen markalar',
    ],
    sections: [
      {
        heading: 'Klasik PDF katalogun sınırı',
        body: 'PDF katalog ve e-posta üzerinden yürüyen bir toptan satış süreci, hangi müşterinin hangi ürüne ilgi gösterdiğini, teklifin hangi aşamada kaldığını izlemeyi neredeyse imkansız hale getirir.',
      },
      {
        heading: 'Dijital showroom bunu nasıl değiştirir?',
        body: 'Dijital showroom; ürün sunumu, teklif toplama, müşteri grupları ve özel fiyat yapılarını tek bir sistemde birleştirerek satış ekibinin neye, ne zaman odaklanması gerektiğini görünür hale getirir.',
      },
      {
        heading: 'Sadece büyük firmalar için mi?',
        body: 'Hayır. Az sayıda toptan müşterisi olan küçük bir üretici için de teklif sürecini ve müşteri takibini düzenli hale getirmek, satış kapanış oranını doğrudan etkiler.',
      },
      {
        heading: 'GloventGlobal nasıl yardımcı olur?',
        body: 'B2B Satış Sistemi kapsamında ürün sunumu, teklif akışı, müşteri grupları ve satış takibini birlikte çalışan bir yapıya dönüştürüyoruz.',
      },
    ],
  },

  'e-ticarette-yapay-zeka-gercekten-nerelerde-kullanilir': {
    title: 'E-Ticarette Yapay Zeka Gerçekten Nerelerde Kullanılır?',
    slug: 'e-ticarette-yapay-zeka-gercekten-nerelerde-kullanilir',
    excerpt:
      '"Yapay zeka kullanıyoruz" demek yeterli değildir. E-ticarette yapay zekanın gerçek anlamda değer ürettiği somut kullanım alanlarını özetliyoruz.',
    category: 'Yapay Zeka',
    targetAudience: 'Operasyonunu ve içerik süreçlerini hızlandırmak isteyen e-ticaret markaları',
    searchIntent: 'e-ticarette yapay zeka kullanım alanları, ai e-ticaret nerede kullanılır',
    relatedServiceSlug: 'yapay-zeka-entegrasyonu',
    readTime: '4 dk',
    publishedAt: '2026-01-30',
    order: 6,
    updatedAt: 'Haziran 2026',
    updatedAtISO: '2026-06-01',
    author: 'GloventGlobal Global Commerce Team',
    summary:
      '"Yapay zeka kullanıyoruz" demek yeterli değildir. Bu rehber, e-ticarette yapay zekanın gerçek anlamda değer ürettiği somut kullanım alanlarını; içerik üretimi, müşteri iletişimi ve raporlama başlıkları üzerinden özetler.',
    quickAnswer:
      'E-ticarette yapay zeka en çok ürün/içerik üretimi, müşteri iletişimi ve raporlama / karar desteği alanlarında gerçek değer üretir. Asıl fark, yapay zekanın kontrol ve onay yapısıyla satış sistemine entegre edilmesidir.',
    whoShouldRead: [
      'Operasyonunu ve içerik süreçlerini hızlandırmak isteyen e-ticaret markaları',
      'Yapay zekayı nereden başlayarak kullanacağını netleştirmek isteyenler',
      'İçerik ve raporlama süreçlerini sistemli hale getirmek isteyenler',
    ],
    sections: [
      {
        heading: 'Ürün ve içerik üretiminde',
        body: 'Ürün açıklamaları, listeleme metinleri ve kanal bazlı içerik üretiminde yapay zeka, marka diline uygun kontrollü bir hızlandırıcı olarak kullanılabilir.',
      },
      {
        heading: 'Müşteri iletişiminde',
        body: 'Sık gelen sorular, teklif talepleri ve destek mesajlarının daha hızlı ve tutarlı yanıtlanmasında yapay zeka destekli akışlar zaman kazandırır.',
      },
      {
        heading: 'Raporlama ve karar desteğinde',
        body: 'Satış, reklam ve müşteri davranışı verilerini okunabilir raporlara ve karar destek çıktılarına dönüştürmek, yapay zekanın en az konuşulan ama en değerli kullanım alanlarından biridir.',
      },
      {
        heading: 'GloventGlobal nasıl yardımcı olur?',
        body: 'Yapay zekayı tek başına bir araç olarak değil, satış ve operasyon sisteminizin parçası olarak; kontrol ve onay yapısıyla güvenli şekilde entegre ediyoruz.',
      },
    ],
  },
};