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
    searchIntent: 'türkiye’den yurtdışına ürün satmak, yurtdışına ürün satmak için nereden başlamalı, internetten yurtdışına satış nasıl yapılır, türkiye’den avrupa’ya ürün satmak, yurtdışına satış için şirket gerekir mi, global pazara nasıl açılırım, ihracata başlamak için ne gerekir, amazon etsy shopify ile yurtdışına satış',
    relatedServiceSlug: 'global-pazara-giris-stratejisi',
    readTime: '5 dk',
    publishedAt: '2026-01-24',
    order: 4,
    updatedAt: 'Haziran 2026',
    updatedAtISO: '2026-06-01',
    author: 'GloventGlobal Global Commerce Team',
    summary:
      'Türkiye’den yurtdışına ürün satmak isteyen markalar için ilk adım, hangi ülkeye ve hangi satış kanalıyla açılacağını netleştirmektir. Ürün uygunluğu, pazar talebi, lojistik, ödeme, fiyatlandırma, gümrük ve dijital satış altyapısı birlikte planlanmadan global satış sürdürülebilir hale gelmez. Bu rehber, yurtdışına satışa başlamak isteyen işletmeler için temel yol haritasını açıklar.',
    quickAnswer:
      'Türkiye’den yurtdışına ürün satmaya başlamak için önce ürününüzün hangi pazarda talep görebileceğini, hangi kanalın daha uygun olduğunu ve operasyonu nasıl yöneteceğinizi belirlemelisiniz. Amazon, Etsy, Shopify, B2B satış veya sosyal medya kanalları farklı modellerdir; doğru seçim ürün tipi, bütçe, hedef ülke ve marka hedeflerine göre yapılmalıdır.',
    whoShouldRead: [
      'Türkiye’den yurtdışına ürün satmak isteyen üreticiler',
      'E-ticaretle global pazara açılmak isteyen markalar',
      'Amazon, Etsy veya Shopify üzerinden yurtdışı satış düşünen işletmeler',
      'İhracata nereden başlayacağını bilmeyen KOBİ’ler',
      'Ürününü global pazarda test etmek isteyen girişimciler',
    ],
    expertNote:
      'Yurtdışına satışta en sık hata, süreci sadece “mağaza açmak” veya “ürün göndermek” olarak görmektir. Global satış; ürün seçimi, pazar doğrulama, kanal stratejisi, lojistik, fiyatlandırma, ödeme, içerik ve müşteri operasyonunun birlikte çalıştığı bir sistem olarak ele alınmalıdır.',
    expertNoteAfterHeading: 'Lojistik, ödeme ve fiyatlandırma nasıl planlanmalı?',
    sections: [
      {
        heading: 'Bu soruyu neden soruyorsunuz?',
        body: 'Bu soruyu soran işletmeler genellikle ürününü yurtdışına satmak ister ama hangi ülke, hangi kanal, hangi lojistik modeli ve hangi başlangıç adımıyla ilerleyeceğini bilmez. Yurtdışına satış sadece ürün göndermek değil, kanal ve operasyon sistemi kurmaktır.',
      },
      {
        heading: 'Türkiye’den yurtdışına ürün satmak mümkün mü?',
        body: 'Evet, doğru ürün, doğru pazar ve doğru satış kanalıyla mümkündür. Ancak her ürün her pazarda aynı şekilde satılamaz. Ürün uygunluğu, fiyat rekabeti, kargo maliyeti, yasal gereklilikler ve müşteri beklentileri birlikte değerlendirilmelidir.',
      },
      {
        heading: 'Yurtdışına satışa başlamadan önce hangi sorular cevaplanmalı?',
        body: '- Ürün hangi ülkede talep görebilir?\n- Ürün B2C mi B2B mi daha uygun?\n- Pazaryeri mi, kendi site mi, toptan satış mı daha mantıklı?\n- Kargo ve iade süreci yönetilebilir mi?\n- Fiyatlandırma yurtdışı maliyetleri karşılıyor mu?\n- Ürün açıklaması, görseller ve marka dili global pazara uygun mu?',
      },
      {
        heading: 'Örnek Başlangıç Senaryosu',
        body: 'Örnek senaryo: Türkiye’de üretim yapan bir marka, yurtdışına açılmadan önce 10 ürününü hedef pazar, fiyat, kargo maliyeti ve rekabet açısından değerlendirir. Daha sonra ürün tipine göre Amazon, Etsy, Shopify veya B2B kanalından hangisinin daha uygun olduğunu belirler. Bu senaryo satış garantisi değil, global pazara daha kontrollü başlamak için örnek bir planlama yaklaşımıdır.',
      },
      {
        heading: 'Hangi satış kanalıyla başlamalı?',
        body: '- Amazon: daha büyük pazar ve rekabet\n- Etsy: niş, el yapımı, tasarım ve butik ürünler\n- Shopify: kendi marka mağazası\n- B2B: toptan satış, bayi, distribütör ve kurumsal alıcılar\n- Sosyal medya: destekleyici trafik ve marka bilinirliği',
      },
      {
        heading: 'Pazar seçimi neden ilk adımdır?',
        body: 'Yanlış pazara doğru ürünle girmek bile satış üretmeyebilir. Hedef ülke seçilirken talep, rekabet, fiyat seviyesi, kargo maliyeti, dil, tüketici alışkanlığı ve platform yaygınlığı değerlendirilmelidir.',
      },
      {
        heading: 'Ürün uygunluğu nasıl değerlendirilir?',
        body: '- Ürün hafif ve gönderilebilir mi?\n- Kırılma, bozulma veya iade riski var mı?\n- Hedef pazarda benzer ürünler satılıyor mu?\n- Ürünün fiyatı kargo sonrası rekabetçi kalıyor mu?\n- Ürün açıklaması ve görselleri global müşteriye güven veriyor mu?',
      },
      {
        heading: 'Lojistik, ödeme ve fiyatlandırma nasıl planlanmalı?',
        body: '- Kargo maliyeti\n- Teslimat süresi\n- İade yönetimi\n- Ödeme alma\n- Komisyonlar\n- Reklam bütçesi\n- Gümrük ve vergi gereklilikleri için uzman kontrolü',
      },
      {
        heading: 'Yeni başlayanlar için ilk 30 gün planı',
        body: '1. hafta: ürün ve pazar ön analizi\n2. hafta: satış kanalı kararı\n3. hafta: listeleme, görsel ve fiyatlandırma hazırlığı\n4. hafta: test yayını, veri takibi ve iyileştirme',
      },
      {
        heading: 'En sık yapılan hata',
        body: 'En sık hata, yurtdışına satışa sadece “ürünü bir platforma yüklemek” olarak bakmaktır. Asıl mesele ürünün hedef pazarda doğru konumlandırılması, kârlı fiyatlandırılması, güven veren içerikle sunulması ve sürdürülebilir operasyonla desteklenmesidir.',
      },
      {
        heading: 'GloventGlobal bu süreçte nasıl yardımcı olur?',
        body: 'GloventGlobal, markanın ürün yapısını, hedef pazarını, satış kanalını, operasyon kapasitesini ve global büyüme hedefini analiz ederek yurtdışı satış için en doğru başlangıç sistemini kurmaya yardımcı olur.',
      },
    ],
    comparison: {
      heading: 'Yurtdışına Satışta Kanal Karşılaştırması',
      headers: ['Kanal', 'Avantaj', 'Dikkat Edilmesi Gereken'],
      rows: [
        { criterion: 'Amazon', individual: 'Geniş müşteri kitlesi ve güçlü pazaryeri altyapısı', company: 'Yoğun rekabet, komisyonlar ve operasyon disiplini' },
        { criterion: 'Etsy', individual: 'Niş, el yapımı, tasarım ve butik ürünler için uygun yapı', company: 'Ürün fotoğrafı, SEO ve mağaza güveni kritik' },
        { criterion: 'Shopify', individual: 'Marka kontrolü ve müşteri deneyimi daha güçlü', company: 'Trafiği marka kendi oluşturmalıdır' },
        { criterion: 'B2B', individual: 'Toptan satış, bayi ve kurumsal alıcı ilişkileri kurulabilir', company: 'Güven, katalog, teklif ve iletişim sistemi gerekir' },
        { criterion: 'Sosyal Medya', individual: 'Marka bilinirliği ve trafik desteği sağlar', company: 'Tek başına satış sistemi yerine destekleyici kanal olarak düşünülmelidir' },
      ],
    },
    checklist: {
      heading: 'Yurtdışına satışa başlamadan önce kontrol listesi',
      items: [
        'Ürününüz hedef pazara uygun mu?',
        'Hangi ülke veya bölgeye açılacağınız belli mi?',
        'Satış kanalı seçildi mi?',
        'Kargo ve iade süreci planlandı mı?',
        'Fiyatlandırma tüm maliyetleri karşılıyor mu?',
        'Ürün görselleri ve açıklamaları global müşteriye uygun mu?',
        'Ödeme ve tahsilat yöntemi net mi?',
        'Gümrük/vergi gereklilikleri uzmanla kontrol edildi mi?',
        'İlk 30 gün test ve iyileştirme planı hazır mı?',
      ],
    },
    faq: {
      heading: 'Sık Sorulan Sorular',
      items: [
        {
          question: 'Türkiye’den yurtdışına ürün satmak için şirket gerekir mi?',
          answer:
            'Çoğu satış kanalı ve model için kurumsal bir yapı genellikle gereklidir, ancak bu ülkeye, ürün kategorisine ve satış hacmine göre değişebilir. Net gereklilikler için ilgili mevzuat ve uzman görüşü kontrol edilmelidir.',
        },
        {
          question: 'Yurtdışına satışa Amazon ile mi Etsy ile mi başlanmalı?',
          answer:
            'Bu, ürün tipinize ve hedef pazarınıza göre değişir; Amazon daha geniş bir pazar sunarken Etsy niş ve el yapımı ürünler için daha uygun olabilir. Kesin bir doğru cevap yoktur, ürün ve hedef müşteriye göre karar verilmelidir.',
        },
        {
          question: 'Shopify ile yurtdışına satış yapılabilir mi?',
          answer:
            'Evet, Shopify kendi marka mağazanızı kurarak global satış yapmanıza imkan verir. Ancak trafiği büyük ölçüde markanın kendisi oluşturmalıdır, bu yüzden reklam veya içerik stratejisi gerekir.',
        },
        {
          question: 'Hangi ürünler yurtdışına satış için daha uygundur?',
          answer:
            'Hafif, gönderilebilir, kırılma veya iade riski düşük ve hedef pazarda talep gören ürünler genellikle daha avantajlıdır. Her ürün her pazarda aynı şekilde satılmayabilir, bu yüzden ürün-pazar uygunluğu önceden değerlendirilmelidir.',
        },
        {
          question: 'Yurtdışına satışta kargo nasıl planlanmalı?',
          answer:
            'Kargo maliyeti, teslimat süresi ve iade süreci fiyatlandırmayla birlikte değerlendirilmelidir. Bu detaylar ülkeye ve taşıyıcıya göre değişebileceği için önceden araştırılması önemlidir.',
        },
        {
          question: 'Global satışa başlamak için en önemli adım nedir?',
          answer:
            'Ürün, pazar ve satış kanalı kararının operasyon planıyla birlikte netleştirilmesi en önemli adımdır. Bu adımlardan biri eksik kaldığında süreç dengesiz ilerleyebilir.',
        },
        {
          question: 'B2B yurtdışı satış ile pazaryeri satışı arasındaki fark nedir?',
          answer:
            'B2B satışta toptan, bayi ve kurumsal alıcı ilişkileri kurulurken, pazaryeri satışında bireysel son kullanıcıya doğrudan satış yapılır. İkisi farklı operasyon ve içerik yaklaşımı gerektirir.',
        },
      ],
    },
    nextSteps: [
      'Ürününüzün hedef pazara uygunluğunu değerlendirin',
      'Hangi ülke ve satış kanalının daha mantıklı olduğunu belirleyin',
      'Fiyat, kargo, vergi ve operasyon maliyetlerini hesaplayın',
      'Amazon, Etsy, Shopify veya B2B modelinden hangisinin uygun olduğunu seçin',
      'Ücretsiz analiz ile global satışa hazır olup olmadığınızı değerlendirin',
    ],
  },

  'b2b-dijital-showroom-nedir-ve-toptan-satista-neden-onemlidir': {
    title: 'B2B Dijital Showroom Nedir ve Toptan Satışta Neden Önemlidir?',
    slug: 'b2b-dijital-showroom-nedir-ve-toptan-satista-neden-onemlidir',
    excerpt:
      'Toptan satış yapan markaların PDF katalog ve e-posta trafiğinden, ölçülebilir bir dijital showroom yapısına geçmesi neden önemlidir, bunu açıklıyoruz.',
    category: 'B2B',
    targetAudience: 'Toptan satış yapan üretici ve distribütör firmalar',
    searchIntent: 'b2b dijital showroom nedir, dijital showroom ne işe yarar, toptan satışta dijital katalog nasıl kullanılır, b2b satış sistemi nasıl kurulur, dijital katalog mu web sitesi mi, bayi ve toptan müşteri sistemi nasıl kurulur, toptan ürünleri online göstermek mantıklı mı',
    relatedServiceSlug: 'b2b-dijital-showroom',
    readTime: '4 dk',
    publishedAt: '2026-01-27',
    order: 5,
    updatedAt: 'Haziran 2026',
    updatedAtISO: '2026-06-01',
    author: 'GloventGlobal Global Commerce Team',
    summary:
      'B2B dijital showroom, toptan satış yapan markaların ürünlerini ve koleksiyonlarını dijital ortamda profesyonel şekilde sunmasını sağlayan bir satış altyapısıdır. PDF katalog, WhatsApp mesajları veya dağınık ürün görselleri yerine; kategori, ürün, teklif, iletişim ve müşteri yönlendirme süreçlerini daha düzenli hale getirir. Bu rehber, dijital showroom’un toptan satışta neden önemli olduğunu açıklar.',
    quickAnswer:
      'B2B dijital showroom, toptan alıcıların ürünleri online inceleyebilmesini, kategori bazlı gezebilmesini, teklif veya iletişim talebi oluşturabilmesini sağlayan dijital satış sistemidir. Toptan satış yapan markalar için daha düzenli ürün sunumu, daha hızlı müşteri bilgilendirme ve daha güçlü güven algısı oluşturur.',
    whoShouldRead: [
      'Toptan satış yapan üretici ve markalar',
      'Bayi, distribütör veya mağaza ağı kurmak isteyen işletmeler',
      'Ürünlerini hâlâ PDF katalog veya WhatsApp görselleriyle sunan firmalar',
      'B2B müşterilerine daha profesyonel ürün sunumu yapmak isteyenler',
      'Dijital katalog veya online showroom kurmayı düşünen markalar',
    ],
    expertNote:
      'B2B dijital showroom yalnızca ürün görsellerinin yayınlandığı bir web sayfası değildir. Doğru kurgulandığında ürün kategorileri, koleksiyon yapısı, teklif akışı, müşteri yönlendirme ve satış ekibi operasyonu birlikte çalışır. Bu yüzden showroom, tasarım kadar satış süreciyle de düşünülmelidir.',
    expertNoteAfterHeading: 'Dijital showroom satış ekibiyle nasıl çalışır?',
    sections: [
      {
        heading: 'Bu soruyu neden soruyorsunuz?',
        body: 'Bu soruyu soran işletmeler genellikle ürünlerini toptan müşterilere daha profesyonel göstermek, bayi/distribütör ağı kurmak veya WhatsApp/PDF katalog trafiğini daha düzenli hale getirmek ister. Dijital showroom sadece bir web sayfası değil, B2B satış sürecini destekleyen bir altyapıdır.',
      },
      {
        heading: 'B2B dijital showroom nedir?',
        body: '- Toptan ürünlerin dijital ortamda sergilenmesi\n- Kategori ve koleksiyon yapısı\n- Ürün detaylarının düzenli sunumu\n- Teklif veya iletişim talebi oluşturma\n- Satış ekibinin daha profesyonel sunum yapması',
      },
      {
        heading: 'B2B dijital showroom ne işe yarar?',
        body: '- Ürün sunumunu düzenler\n- Müşterinin ürünleri daha kolay incelemesini sağlar\n- PDF katalog ve dağınık görsel trafiğini azaltır\n- Teklif sürecini daha takip edilebilir hale getirir\n- Marka güvenini artırır\n- Bayi ve distribütör görüşmelerinde profesyonel görünüm sağlar',
      },
      {
        heading: 'Örnek Showroom Senaryosu',
        body: 'Örnek senaryo: Toptan satış yapan bir marka, ilk etapta en güçlü 30 ürününü kategori, ürün görseli, kısa açıklama ve teklif talebi yapısıyla dijital showroom’a aktarabilir. Satış ekibi, müşterilere dağınık görseller göndermek yerine bu showroom üzerinden ürünleri gösterebilir ve talepleri daha düzenli takip edebilir. Bu senaryo satış garantisi değil, daha kontrollü ve profesyonel bir B2B sunum yaklaşımıdır.',
      },
      {
        heading: 'Dijital showroom ile klasik web sitesi arasındaki fark nedir?',
        body: 'Klasik web sitesi genelde marka tanıtımı ve bilgi sunumu içindir. Dijital showroom ise ürünleri, kategorileri, koleksiyonları ve teklif sürecini B2B satış mantığıyla kurgular.',
      },
      {
        heading: 'Toptan satış yapan firmalar için neden önemlidir?',
        body: '- Toptan alıcılar hızlı ürün incelemek ister\n- Ürün çeşitliliği arttıkça manuel sunum zorlaşır\n- Satış ekibinin aynı ürünü tutarlı anlatması gerekir\n- Fiyat gizleme veya teklif sistemi gerekebilir\n- B2B müşteriler karar vermeden önce güvenilir dijital sunum görmek ister',
      },
      {
        heading: 'B2B dijital showroom hangi sektörler için uygundur?',
        body: '- Bijuteri ve aksesuar\n- Tekstil ve moda\n- Ev dekorasyon\n- Kozmetik\n- Hediyelik eşya\n- Endüstriyel ürünler\n- Toptan ürün grupları olan üreticiler\n\nHer sektör için kesin bir uygunluk garantisi yoktur; değerlendirme ürün yapısına göre yapılmalıdır.',
      },
      {
        heading: 'B2B showroom kurmadan önce hangi bilgiler hazırlanmalı?',
        body: '- Ürün kategorileri\n- Ürün görselleri\n- Kısa ürün açıklamaları\n- Minimum sipariş / teklif mantığı\n- İletişim akışı\n- Fiyat gösterilecek mi gizlenecek mi?\n- Bayi veya distribütör başvuru süreci\n- Stok ve koleksiyon yönetimi',
      },
      {
        heading: 'Dijital showroom satış ekibiyle nasıl çalışır?',
        body: 'Showroom, satış ekibinin yerine geçmek zorunda değildir. Doğru kurguda satış ekibinin müşteriye ürünleri daha hızlı göstermesini, doğru kategorilere yönlendirmesini ve talebi daha düzenli takip etmesini sağlar.',
      },
      {
        heading: 'En sık yapılan hata',
        body: 'En sık hata, dijital showroom’u sadece “ürün fotoğraflarını siteye koymak” olarak görmektir. Asıl mesele ürün sunumu, kategori yapısı, teklif akışı, müşteri yönlendirme ve satış operasyonunun birlikte çalışmasıdır.',
      },
      {
        heading: 'GloventGlobal bu süreçte nasıl yardımcı olur?',
        body: 'GloventGlobal, toptan satış yapan markaların ürün yapısını, müşteri tipini, satış ekibi sürecini ve dijital altyapı ihtiyacını analiz ederek B2B dijital showroom sistemini markaya özel şekilde kurgular.',
      },
    ],
    comparison: {
      heading: 'PDF Katalog mu, B2B Dijital Showroom mu?',
      headers: ['Kriter', 'PDF Katalog', 'B2B Dijital Showroom'],
      rows: [
        { criterion: 'Ürün güncelleme', individual: 'Güncelleme zordur, yeni dosya gerekir', company: 'Ürünler daha kolay güncellenebilir' },
        { criterion: 'Müşteri deneyimi', individual: 'Müşteri ürünü aramakta zorlanabilir', company: 'Kategori ve filtre yapısıyla daha kolay inceleme sağlar' },
        { criterion: 'Teklif süreci', individual: 'Talep genelde manuel takip edilir', company: 'Teklif veya iletişim akışı daha düzenli kurulabilir' },
        { criterion: 'Profesyonel algı', individual: 'Temel sunum sağlar', company: 'Daha modern ve güven veren bir yapı oluşturur' },
        { criterion: 'Satış ekibi kullanımı', individual: 'Dosya gönderimiyle sınırlı kalabilir', company: 'Satış ekibi müşteriyi doğrudan ilgili ürün/kategoriye yönlendirebilir' },
      ],
    },
    checklist: {
      heading: 'B2B dijital showroom kurmadan önce kontrol listesi',
      items: [
        'Ürün kategorileriniz net mi?',
        'En güçlü ürünleriniz seçildi mi?',
        'Ürün görselleri dijital sunuma uygun mu?',
        'Ürün açıklamaları kısa ve anlaşılır mı?',
        'Fiyat gösterilecek mi, teklif üzerinden mi ilerleyecek?',
        'Müşteri iletişim ve teklif akışı belli mi?',
        'Bayi veya distribütör başvuru süreci var mı?',
        'Satış ekibi showroom’u nasıl kullanacak?',
        'Showroom sonrası lead takibi nasıl yapılacak?',
      ],
    },
    faq: {
      heading: 'Sık Sorulan Sorular',
      items: [
        {
          question: 'B2B dijital showroom nedir?',
          answer:
            'B2B dijital showroom, toptan satış yapan markaların ürünlerini, kategorilerini ve teklif süreçlerini dijital ortamda profesyonel şekilde sunmasını sağlayan bir sistemdir. Amaç, bayi, distribütör ve kurumsal alıcıların ürünleri kolayca incelemesini ve talep oluşturmasını sağlamaktır.',
        },
        {
          question: 'Dijital showroom ile katalog arasındaki fark nedir?',
          answer:
            'PDF katalog statik bir dosyadır ve güncellenmesi zordur; dijital showroom ise ürünleri kategori ve filtre yapısıyla canlı olarak sunar. Showroom ayrıca teklif ve iletişim akışını daha düzenli takip edilebilir hale getirir.',
        },
        {
          question: 'Toptan satış yapan firmalar için dijital showroom gerekli mi?',
          answer:
            'Kesin bir zorunluluk değildir, ancak ürün çeşitliliği arttıkça manuel sunum ve takip zorlaşır. Bu noktada dijital showroom, ürün sunumu ve teklif sürecini düzenli hale getirmede yardımcı olabilir.',
        },
        {
          question: 'B2B showroom’da fiyatlar görünmeli mi?',
          answer:
            'Bu, markanın satış modeline göre değişir; bazı markalar fiyatı doğrudan gösterirken bazıları teklif sistemi üzerinden ilerler. Her iki yaklaşım da doğru kurgulandığında çalışabilir.',
        },
        {
          question: 'Dijital showroom satış ekibinin yerine geçer mi?',
          answer:
            'Hayır, showroom satış ekibinin yerine geçmek zorunda değildir. Doğru kurguda satış ekibinin müşteriye ürünleri daha hızlı göstermesini ve talebi daha düzenli takip etmesini sağlar.',
        },
        {
          question: 'Hangi sektörler dijital showroom kullanabilir?',
          answer:
            'Bijuteri, tekstil, dekorasyon, kozmetik, hediyelik eşya gibi toptan ürün grubuna sahip birçok sektör için uygun olabilir. Ancak her sektör için uygunluk, ürün yapısına göre ayrıca değerlendirilmelidir.',
        },
        {
          question: 'Dijital showroom kurmak için önce ne hazırlanmalı?',
          answer:
            'Ürün kategorileri, görseller, kısa açıklamalar ve teklif/iletişim akışının netleştirilmesi gerekir. Fiyat gösterimi ve bayi başvuru süreci gibi kararlar da önceden planlanmalıdır.',
        },
      ],
    },
    nextSteps: [
      'Ürün kategorilerinizi ve koleksiyon yapınızı netleştirin',
      'Toptan müşterilerinizin hangi bilgilere ihtiyaç duyduğunu belirleyin',
      'Ürün görselleri, açıklamalar ve teklif akışını düzenleyin',
      'Dijital showroom’un web sitesi, WhatsApp ve satış ekibiyle nasıl çalışacağını planlayın',
      'Ücretsiz analiz ile B2B dijital satış yapınızın hazır olup olmadığını değerlendirin',
    ],
  },

  'e-ticarette-yapay-zeka-gercekten-nerelerde-kullanilir': {
    title: 'E-Ticarette Yapay Zeka Gerçekten Nerelerde Kullanılır?',
    slug: 'e-ticarette-yapay-zeka-gercekten-nerelerde-kullanilir',
    excerpt:
      '"Yapay zeka kullanıyoruz" demek yeterli değildir. E-ticarette yapay zekanın gerçek anlamda değer ürettiği somut kullanım alanlarını özetliyoruz.',
    category: 'Yapay Zeka',
    targetAudience: 'Operasyonunu ve içerik süreçlerini hızlandırmak isteyen e-ticaret markaları',
    searchIntent: 'e-ticarette yapay zeka nasıl kullanılır, yapay zeka e-ticarette ne işe yarar, amazon etsy shopify için yapay zeka kullanılır mı, yapay zeka ile ürün açıklaması yazılır mı, yapay zeka ile ürün fotoğrafı hazırlanır mı, yapay zeka e-ticaret satışlarını artırır mı, e-ticarette otomasyon ve yapay zeka nasıl kurulur, yapay zeka ile pazar analizi yapılır mı',
    relatedServiceSlug: 'yapay-zeka-entegrasyonu',
    readTime: '4 dk',
    publishedAt: '2026-01-30',
    order: 6,
    updatedAt: 'Haziran 2026',
    updatedAtISO: '2026-06-01',
    author: 'GloventGlobal Global Commerce Team',
    summary:
      'E-ticarette yapay zeka, yalnızca içerik yazmak veya görsel üretmek için kullanılmaz. Doğru kurgulandığında ürün araştırması, listeleme, reklam analizi, müşteri iletişimi, operasyon takibi ve otomasyon süreçlerinde karar destek sistemi olarak çalışabilir. Bu rehber, e-ticarette yapay zekanın gerçekten nerelerde işe yaradığını açıklar.',
    quickAnswer:
      'Yapay zeka e-ticarette ürün açıklaması, başlık, görsel konsept, pazar analizi, reklam yorumu, müşteri segmentasyonu, otomasyon ve operasyon takibi gibi alanlarda kullanılabilir. Ancak tek başına satış getiren bir araç değildir; doğru strateji, veri, platform bilgisi ve insan kontrolüyle birlikte kullanılmalıdır.',
    whoShouldRead: [
      'E-ticarette yapay zekayı nerede kullanacağını bilmeyen işletmeler',
      'Amazon, Etsy veya Shopify operasyonlarını hızlandırmak isteyen markalar',
      'Ürün açıklaması, görsel, reklam ve analiz süreçlerini iyileştirmek isteyenler',
      'Yapay zeka araçlarını satış sistemine entegre etmek isteyen ekipler',
      'Manuel iş yükünü azaltmak isteyen e-ticaret işletmeleri',
    ],
    expertNote:
      'Yapay zeka, e-ticarette en iyi sonucu tek başına karar verdiğinde değil, doğru verilerle ve net iş akışlarıyla beslendiğinde verir. Marka dili, ürün bilgisi, platform kuralları ve ticari hedefler net değilse yapay zeka hızlı ama yanlış çıktılar üretebilir.',
    expertNoteAfterHeading: 'Yapay zeka ile içerik üretirken nelere dikkat edilmeli?',
    sections: [
      {
        heading: 'Bu soruyu neden soruyorsunuz?',
        body: 'Bu soruyu soran işletmeler genellikle yapay zekayı kullanmak ister ama nereden başlayacağını, hangi alanlarda gerçekten işe yaradığını ve hangi alanlarda dikkatli olunması gerektiğini bilmez. Yapay zeka tek başına satış sistemi değil, doğru iş akışlarına entegre edildiğinde değer üreten bir destek sistemidir.',
      },
      {
        heading: 'E-ticarette yapay zeka ne işe yarar?',
        body: '- Tekrar eden işleri hızlandırır\n- İçerik taslakları üretir\n- Veri yorumlamaya yardımcı olur\n- Görsel konsept geliştirmeyi destekler\n- Reklam ve listeleme analizinde fikir verir\n- Operasyon kararlarında destek sağlar',
      },
      {
        heading: 'Örnek AI Kullanım Senaryosu',
        body: 'Örnek senaryo: Shopify ve Etsy’de satış yapan bir marka, ilk etapta 10 ürününü seçerek başlık, açıklama, ürün faydaları, görsel konsept ve reklam metni önerilerini yapay zeka ile taslak olarak hazırlayabilir. Daha sonra bu çıktılar marka dili, ürün gerçekliği ve platform kurallarına göre insan kontrolünden geçirilir. Bu senaryo satış garantisi değil, yapay zekayı daha kontrollü kullanmak için örnek bir başlangıç yaklaşımıdır.',
      },
      {
        heading: 'Yapay zeka hangi e-ticaret alanlarında kullanılabilir?',
        body: '- Ürün araştırması\n- Başlık ve açıklama yazımı\n- SEO ve anahtar kelime fikirleri\n- Görsel konsept ve ürün fotoğrafı senaryosu\n- Reklam metni ve kampanya yorumu\n- Müşteri segmentasyonu\n- E-posta ve WhatsApp takip akışları\n- Stok, sipariş ve operasyon raporlaması',
      },
      {
        heading: 'Amazon, Etsy ve Shopify için yapay zeka nasıl kullanılabilir?',
        body: 'Amazon’da listeleme, başlık, bullet point, reklam analizi ve rakip karşılaştırması için destek olabilir.\nEtsy’de başlık, etiket fikri, açıklama, fotoğraf senaryosu ve mağaza dili için kullanılabilir.\nShopify’da ürün sayfası, kategori yapısı, e-posta, blog, kampanya ve müşteri yolculuğu için kullanılabilir.',
      },
      {
        heading: 'Yapay zeka ile içerik üretirken nelere dikkat edilmeli?',
        body: '- Ürün bilgisi doğru olmalı\n- Marka dili korunmalı\n- Abartılı vaatlerden kaçınılmalı\n- Platform kurallarına uygunluk kontrol edilmeli\n- Ürün özellikleri uydurulmamalı\n- İnsan kontrolü yapılmalı',
      },
      {
        heading: 'Yapay zeka ürün görsellerinde nasıl kullanılabilir?',
        body: 'Yapay zeka arka plan, konsept, sahne ve görsel fikir üretiminde yardımcı olabilir. Ancak ürünün rengi, formu, dokusu ve gerçek özellikleri bozulmamalıdır. Özellikle pazaryeri görsellerinde yanıltıcı görsel kullanımı marka güvenine zarar verebilir.',
      },
      {
        heading: 'Yapay zeka reklam ve veri analizinde nasıl işe yarar?',
        body: '- Kampanya performansını yorumlama\n- Düşük performanslı ürünleri ayırma\n- Reklam metni varyasyonları üretme\n- Anahtar kelime ve arama terimi fikirleri çıkarma\n- ACOS, ROAS, CTR gibi metrikleri anlamlandırma\n\nNihai reklam kararlarının insan kontrolüyle verilmesi gerekir.',
      },
      {
        heading: 'E-ticarette otomasyon ve yapay zeka birlikte nasıl çalışır?',
        body: 'Yapay zeka karar veya içerik desteği sağlar; otomasyon ise bu süreçlerin belirli kurallarla çalışmasını sağlar.\nÖrnekler:\n- Lead geldiğinde otomatik e-posta\n- Form cevabına göre öneri sistemi\n- Müşteri segmentine göre takip mesajı\n- Satış verisine göre rapor özeti\n- Ürün performansına göre görev listesi',
      },
      {
        heading: 'İlk 30 gün yapay zeka kullanım planı',
        body: '1. hafta: tekrar eden işleri ve içerik ihtiyaçlarını belirleme\n2. hafta: ürün bilgisi, marka dili ve veri yapısını düzenleme\n3. hafta: 10 ürün üzerinde başlık, açıklama ve görsel konsept testleri\n4. hafta: sonuçları insan kontrolüyle değerlendirip kalıcı iş akışı oluşturma',
      },
      {
        heading: 'En sık yapılan hata',
        body: 'En sık hata, yapay zekayı strateji yerine koymaktır. Yapay zeka hızlı çıktı üretebilir ama yanlış ürün, zayıf pazar seçimi, hatalı fiyatlandırma veya kötü operasyon modelini tek başına düzeltemez.',
      },
      {
        heading: 'GloventGlobal bu süreçte nasıl yardımcı olur?',
        body: 'GloventGlobal, e-ticaret markalarının mevcut operasyonlarını analiz ederek yapay zekanın hangi alanlarda gerçek değer üreteceğini belirler. İçerik, görsel, reklam, müşteri takip, analiz ve otomasyon süreçlerini markanın satış sistemiyle uyumlu hale getirir.',
      },
    ],
    comparison: {
      heading: 'Yapay Zeka Kullanımı: Basit Destek mi, Sistem Entegrasyonu mu?',
      headers: ['Kriter', 'Basit Destek', 'Sistem Entegrasyonu'],
      rows: [
        { criterion: 'İçerik üretimi', individual: 'Başlık ve açıklama taslakları üretir', company: 'Marka dili, ürün bilgisi ve SEO yapısıyla standart içerik akışı kurar' },
        { criterion: 'Görsel fikir', individual: 'Arka plan veya sahne fikri verir', company: 'Ürün gerçekliğini koruyan görsel üretim standardı oluşturur' },
        { criterion: 'Reklam analizi', individual: 'Metrikleri yorumlamaya yardımcı olur', company: 'Düzenli rapor, aksiyon listesi ve optimizasyon akışı üretir' },
        { criterion: 'Müşteri iletişimi', individual: 'E-posta veya mesaj taslağı oluşturur', company: 'Segment bazlı takip ve otomasyon yapısı kurar' },
        { criterion: 'Operasyon', individual: 'Manuel işleri hızlandırır', company: 'Tekrar eden süreçleri ölçülebilir iş akışına dönüştürür' },
      ],
    },
    checklist: {
      heading: 'E-ticarette yapay zeka kullanmadan önce kontrol listesi',
      items: [
        'Ürün bilgileriniz doğru ve düzenli mi?',
        'Marka diliniz net mi?',
        'Hangi süreçlerde zaman kaybettiğiniz belli mi?',
        'İçerik, görsel, reklam veya operasyon önceliğiniz net mi?',
        'Yapay zeka çıktıları insan kontrolünden geçiriliyor mu?',
        'Platform kuralları ve müşteri güveni korunuyor mu?',
        'Otomasyon kurulacaksa veri akışı belli mi?',
        'İlk 30 gün için test edilecek ürün veya süreçler seçildi mi?',
      ],
    },
    faq: {
      heading: 'Sık Sorulan Sorular',
      items: [
        {
          question: 'E-ticarette yapay zeka gerçekten işe yarar mı?',
          answer:
            'Evet, doğru alanlarda ve doğru verilerle kullanıldığında gerçek değer üretebilir; içerik, analiz ve operasyon süreçlerini hızlandırabilir. Ancak tek başına satış sistemi değildir, strateji ve insan kontrolüyle birlikte çalışmalıdır.',
        },
        {
          question: 'Yapay zeka ürün açıklaması yazabilir mi?',
          answer:
            'Evet, başlık ve açıklama taslakları üretebilir, ancak ürün bilgisinin doğru ve marka dilinin korunmuş olması gerekir. Çıktıların platform kurallarına uygunluğu insan kontrolüyle doğrulanmalıdır.',
        },
        {
          question: 'Yapay zeka ürün fotoğrafı hazırlamak için kullanılabilir mi?',
          answer:
            'Arka plan, sahne ve görsel konsept fikirlerinde yardımcı olabilir. Ancak ürünün rengi, formu ve gerçek özellikleri bozulmamalı; yanıltıcı görsel kullanımı marka güvenine zarar verebilir.',
        },
        {
          question: 'Amazon, Etsy ve Shopify için yapay zeka kullanılabilir mi?',
          answer:
            'Evet, her üçünde de listeleme, içerik, görsel fikir veya reklam analizi gibi alanlarda destekleyici şekilde kullanılabilir. Kullanım şekli platformun yapısına ve kurallarına göre farklılık gösterir.',
        },
        {
          question: 'Yapay zeka reklamları otomatik yönetebilir mi?',
          answer:
            'Yapay zeka kampanya performansını yorumlayabilir ve öneriler sunabilir, ancak nihai reklam kararlarının insan kontrolüyle verilmesi önerilir. Tamamen otomatik yönetim risk oluşturabilir.',
        },
        {
          question: 'Yapay zeka müşteri mesajlarında kullanılabilir mi?',
          answer:
            'Evet, sık gelen soruları ve destek mesajlarını daha hızlı yanıtlamada yardımcı olabilir. Ancak marka dili ve müşteri güveni için insan kontrolünün korunması önemlidir.',
        },
        {
          question: 'E-ticarette yapay zeka kullanırken en büyük risk nedir?',
          answer:
            'En büyük risk, yapay zekayı strateji yerine koymak ve çıktıları kontrolsüz kullanmaktır. Yanlış ürün bilgisi, zayıf marka dili veya hatalı veri, hızlı ama hatalı sonuçlar üretebilir.',
        },
      ],
    },
    nextSteps: [
      'E-ticaret operasyonunuzdaki tekrar eden işleri belirleyin',
      'Ürün, içerik, reklam ve müşteri süreçlerinde hangi alanların yapay zekayla desteklenebileceğini çıkarın',
      'Marka dili ve ürün bilgi yapınızı standartlaştırın',
      'Yapay zeka çıktılarını insan kontrolüyle test edin',
      'Ücretsiz analiz ile markanız için doğru AI entegrasyon alanlarını değerlendirin',
    ],
  },

  'e-ticaret-otomasyonu-nedir-ve-nasil-kurulur': {
    title: 'E-Ticaret Otomasyonu Nedir ve Nasıl Kurulur?',
    slug: 'e-ticaret-otomasyonu-nedir-ve-nasil-kurulur',
    excerpt:
      'E-ticaret operasyonunda tekrar eden lead, sipariş, iletişim ve raporlama işlerinin otomasyonla nasıl daha düzenli hale getirilebileceğini açıklıyoruz.',
    category: 'Otomasyon',
    targetAudience: 'E-ticaret operasyonunda manuel işleri azaltmak isteyen işletmeler',
    searchIntent: 'e-ticaret otomasyonu nedir, e-ticaret otomasyonu nasıl kurulur, sipariş otomasyonu nasıl yapılır, lead takip otomasyonu nedir, whatsapp otomasyonu e-ticarette nasıl kullanılır, crm otomasyonu nasıl kurulur, n8n e-ticarette nasıl kullanılır',
    relatedServiceSlug: 'otomasyon-n8n',
    readTime: '5 dk',
    publishedAt: '2026-02-02',
    order: 7,
    updatedAt: 'Haziran 2026',
    updatedAtISO: '2026-06-01',
    author: 'GloventGlobal Global Commerce Team',
    summary:
      'E-ticaret otomasyonu, tekrar eden operasyon, iletişim, lead takibi, raporlama ve müşteri süreçlerinin belirli kurallarla daha düzenli çalışmasını sağlayan sistemdir. Doğru kurgulandığında ekiplerin manuel iş yükünü azaltır, verileri daha takip edilebilir hale getirir ve satış süreçlerinin daha kontrollü yönetilmesine yardımcı olur. Bu rehber, e-ticaret otomasyonunun ne olduğunu ve nasıl kurulabileceğini açıklar.',
    quickAnswer:
      'E-ticaret otomasyonu; form, sipariş, müşteri mesajı, e-posta, WhatsApp, CRM, raporlama ve görev takip gibi tekrar eden süreçlerin belirli kurallarla otomatik çalışmasını sağlar. Ancak otomasyon tek başına satış sistemi değildir; doğru veri, net süreç, insan kontrolü ve düzenli optimizasyonla birlikte değer üretir.',
    whoShouldRead: [
      'E-ticaret operasyonunda manuel işleri azaltmak isteyen işletmeler',
      'Amazon, Etsy, Shopify veya kendi sitesinde satış yapan markalar',
      'Lead, müşteri, sipariş ve teklif süreçlerini daha düzenli takip etmek isteyen ekipler',
      'WhatsApp, e-posta, CRM veya Google Sheets süreçlerini otomatikleştirmek isteyenler',
      'Yapay zeka ve otomasyonu satış sistemine entegre etmek isteyen işletmeler',
    ],
    expertNote:
      'E-ticaret otomasyonunda en kritik nokta araç seçimi değil, iş akışının doğru tasarlanmasıdır. Süreç net değilse n8n, Make, Zapier veya CRM sistemleri yalnızca dağınıklığı daha hızlı hale getirir. Önce süreç, sonra otomasyon kurulmalıdır.',
    expertNoteAfterHeading: 'n8n, Make ve Zapier arasındaki temel fark nedir?',
    sections: [
      {
        heading: 'Bu soruyu neden soruyorsunuz?',
        body: 'Bu soruyu soran işletmeler genellikle tekrar eden işleri azaltmak, müşteri takibini düzenlemek, satış fırsatlarını kaçırmamak ve e-ticaret operasyonunu daha ölçülebilir hale getirmek ister. Otomasyon yalnızca teknik bir araç değil, iş akışı ve süreç yönetimidir.',
      },
      {
        heading: 'E-ticaret otomasyonu nedir?',
        body: '- Tekrar eden işlerin belirli kurallarla otomatik çalışması\n- Form, sipariş, müşteri, e-posta, WhatsApp, CRM ve raporlama süreçlerinin bağlanması\n- Manuel takibi azaltması\n- Süreçlerin daha ölçülebilir hale gelmesi\n- Satış ve operasyon ekiplerini desteklemesi',
      },
      {
        heading: 'E-ticaret otomasyonu ne işe yarar?',
        body: '- Lead takibini düzenler\n- Müşteri iletişimini hızlandırır\n- Sipariş ve operasyon süreçlerini takip edilebilir hale getirir\n- E-posta ve WhatsApp akışlarını standartlaştırır\n- Raporlama süreçlerini kolaylaştırır\n- Ekip içi görev takibini düzenler',
      },
      {
        heading: 'Örnek Otomasyon Senaryosu',
        body: 'Örnek senaryo: Bir e-ticaret markası, web sitesinden gelen ücretsiz analiz formunu otomatik olarak Google Sheets’e kaydedebilir, satış ekibine e-posta bildirimi gönderebilir ve müşteriye otomatik bilgilendirme maili iletebilir. Bu senaryo satış garantisi değil, manuel lead takibini daha düzenli hale getirmek için örnek bir otomasyon yaklaşımıdır.',
      },
      {
        heading: 'E-ticarette hangi süreçler otomatikleştirilebilir?',
        body: '- Lead ve form takibi\n- E-posta bilgilendirmeleri\n- WhatsApp yönlendirmeleri\n- CRM kayıtları\n- Sipariş bildirimleri\n- Stok ve ürün raporları\n- Reklam ve satış raporları\n- Görev ve takip listeleri\n- Müşteri segmentasyonu',
      },
      {
        heading: 'Otomasyon kurmadan önce hangi sorular cevaplanmalı?',
        body: '- Hangi süreçte zaman kaybediliyor?\n- Hangi veri nereden geliyor?\n- Hangi kişi veya ekip bu veriyi kullanıyor?\n- Müşteriye hangi mesaj ne zaman gitmeli?\n- Hangi işlem otomatik, hangisi manuel kalmalı?\n- Hatalı veri geldiğinde süreç ne yapmalı?\n- Raporlama hangi periyotla yapılmalı?',
      },
      {
        heading: 'E-ticaret otomasyonu hangi araçlarla kurulabilir?',
        body: '- n8n\n- Make\n- Zapier\n- CRM sistemleri\n- Google Sheets\n- E-posta servisleri\n- WhatsApp Business çözümleri\n- Shopify / WooCommerce / pazaryeri entegrasyonları\n\nKesin bir araç önerisi veya garanti yoktur; seçim işletmenin ihtiyacına göre yapılmalıdır.',
      },
      {
        heading: 'n8n, Make ve Zapier arasındaki temel fark nedir?',
        body: '- Zapier: daha basit kullanım ve hızlı bağlantılar\n- Make: görsel akış ve esnek senaryolar\n- n8n: daha teknik ama esnek ve özelleştirilebilir yapı\n\nKesin bir “en iyisi budur” cevabı yoktur; ihtiyaca göre değişir.',
      },
      {
        heading: 'Yapay zeka ve otomasyon birlikte nasıl çalışır?',
        body: 'Otomasyon veriyi taşır, süreci tetikler ve akışı yönetir. Yapay zeka ise içerik üretimi, özetleme, sınıflandırma, öneri üretme veya karar destek aşamasında kullanılabilir.\nÖrnekler:\n- Lead formunu analiz edip satış önceliği vermek\n- Müşteri mesajını özetlemek\n- Ürün performans raporunu yorumlamak\n- E-posta taslağı oluşturmak\n- Satış ekibine aksiyon önerisi üretmek',
      },
      {
        heading: 'İlk 30 gün e-ticaret otomasyonu planı',
        body: '1. hafta: tekrar eden süreçleri ve veri kaynaklarını belirleme\n2. hafta: lead, sipariş veya raporlama için bir pilot akış seçme\n3. hafta: küçük bir otomasyon kurup test etme\n4. hafta: hataları kontrol edip kalıcı iş akışına dönüştürme',
      },
      {
        heading: 'En sık yapılan hata',
        body: 'En sık hata, otomasyona araç seçerek başlamaktır. Asıl başlangıç noktası, işletmenin hangi süreci neden otomatikleştirmek istediğini netleştirmesidir. Süreç net değilse otomasyon hatalı veriyi, yanlış mesajı veya eksik takibi daha hızlı hale getirebilir.',
      },
      {
        heading: 'GloventGlobal bu süreçte nasıl yardımcı olur?',
        body: 'GloventGlobal, e-ticaret markalarının satış, lead, müşteri iletişimi, raporlama ve operasyon süreçlerini analiz ederek otomasyona uygun alanları belirler. Ardından markanın mevcut altyapısına uygun, ölçülebilir ve insan kontrolünü koruyan otomasyon akışları tasarlar.',
      },
    ],
    comparison: {
      heading: 'Basit Otomasyon mu, Sistemli Otomasyon mu?',
      headers: ['Kriter', 'Basit Otomasyon', 'Sistemli Otomasyon'],
      rows: [
        { criterion: 'Lead takibi', individual: 'Form geldiğinde e-posta bildirimi gönderir', company: 'Lead’i kaydeder, sınıflandırır, ekibe bildirir ve takip süreci başlatır' },
        { criterion: 'Müşteri iletişimi', individual: 'Otomatik e-posta gönderir', company: 'Müşteri segmentine göre farklı mesaj ve takip akışı oluşturur' },
        { criterion: 'Raporlama', individual: 'Veriyi tabloya aktarır', company: 'Veriyi özetler, yorumlar ve aksiyon listesine dönüştürür' },
        { criterion: 'Sipariş süreci', individual: 'Sipariş bildirimi oluşturur', company: 'Sipariş, stok, müşteri ve görev takibini birlikte yönetir' },
        { criterion: 'Yapay zeka kullanımı', individual: 'Tek seferlik metin üretir', company: 'Sürece bağlı özet, sınıflandırma ve karar destek akışı kurar' },
      ],
    },
    checklist: {
      heading: 'E-ticaret otomasyonu kurmadan önce kontrol listesi',
      items: [
        'Tekrar eden süreçleriniz belli mi?',
        'Hangi verinin nereden geldiği net mi?',
        'Lead, sipariş veya müşteri takibi nasıl yapılıyor?',
        'E-posta, WhatsApp, CRM veya tablo yapınız hazır mı?',
        'Hangi adımlar otomatik, hangileri manuel kalacak?',
        'Hatalı veya eksik veri senaryosu düşünüldü mü?',
        'Otomasyon sonrası kim takip edecek?',
        'İlk pilot akış seçildi mi?',
        'Test ve iyileştirme planı hazır mı?',
      ],
    },
    faq: {
      heading: 'Sık Sorulan Sorular',
      items: [
        {
          question: 'E-ticaret otomasyonu nedir?',
          answer:
            'E-ticaret otomasyonu, tekrar eden form, sipariş, müşteri iletişimi ve raporlama gibi süreçlerin belirli kurallarla otomatik çalışmasını sağlayan sistemdir. Amaç, manuel iş yükünü azaltarak süreçleri daha düzenli ve takip edilebilir hale getirmektir.',
        },
        {
          question: 'E-ticaret otomasyonu hangi işler için kullanılır?',
          answer:
            'Lead takibi, e-posta ve WhatsApp bildirimleri, CRM kayıtları, sipariş bildirimleri ve raporlama gibi tekrar eden işler için kullanılabilir. Hangi sürecin otomatikleştirileceği işletmenin ihtiyacına göre değişir.',
        },
        {
          question: 'n8n e-ticarette kullanılabilir mi?',
          answer:
            'Evet, n8n form, sipariş, müşteri ve raporlama süreçlerini bağlamak için kullanılabilen teknik ama esnek bir otomasyon aracıdır. Kurulumu, işletmenin teknik kapasitesine ve ihtiyacına göre planlanmalıdır.',
        },
        {
          question: 'Make ve Zapier e-ticaret için uygun mu?',
          answer:
            'Evet, ikisi de farklı sistemleri birbirine bağlamak için kullanılabilir; Zapier daha basit, Make daha görsel ve esnek bir yapı sunar. Hangisinin daha uygun olduğu işletmenin süreç karmaşıklığına göre değişir.',
        },
        {
          question: 'Otomasyon satışları artırır mı?',
          answer:
            'Otomasyon doğrudan bir satış garantisi sağlamaz; tekrar eden işleri azaltarak ekiplerin daha stratejik işlere odaklanmasına yardımcı olur. Satış sonucu; ürün, pazar ve operasyonun bütünüyle ilişkilidir.',
        },
        {
          question: 'Yapay zeka ile otomasyon aynı şey mi?',
          answer:
            'Hayır, otomasyon veriyi taşır ve süreci tetiklerken, yapay zeka içerik üretimi, özetleme veya karar destek gibi alanlarda kullanılır. İkisi birlikte çalıştığında daha güçlü bir sistem oluşturabilir.',
        },
        {
          question: 'E-ticaret otomasyonuna nereden başlanmalı?',
          answer:
            'Önce hangi süreçte zaman kaybedildiğinin ve verinin nereden geldiğinin netleştirilmesi gerekir. Küçük bir pilot akışla başlamak, süreci araçtan önce netleştirmenin en güvenli yoludur.',
        },
      ],
    },
    nextSteps: [
      'E-ticaret operasyonunuzdaki tekrar eden işleri listeleyin',
      'Lead, sipariş, müşteri iletişimi ve raporlama süreçlerini haritalayın',
      'Hangi adımların manuel, hangilerinin otomatik çalışacağını belirleyin',
      'Küçük bir otomasyon akışıyla test yapın',
      'Ücretsiz analiz ile markanız için doğru otomasyon alanlarını değerlendirin',
    ],
  },

  'e-ticarette-operasyon-sistemi-nasil-kurulur': {
    title: 'E-Ticarette Operasyon Sistemi Nasıl Kurulur?',
    slug: 'e-ticarette-operasyon-sistemi-nasil-kurulur',
    excerpt:
      'Sipariş, kargo, stok, iade, müşteri hizmetleri ve çok kanallı satış süreçlerini düzenli yönetmek isteyen e-ticaret işletmeleri için operasyon sisteminin nasıl kurulabileceğini açıklıyoruz.',
    category: 'Operasyon',
    targetAudience: 'E-ticaret operasyonunda dağınıklık yaşayan işletmeler',
    searchIntent: 'e-ticaret operasyonu nedir, e-ticarette operasyon sistemi nasıl kurulur, sipariş yönetimi nasıl yapılır, kargo yönetimi nasıl planlanır, iade süreci nasıl yönetilir, stok ve envanter yönetimi nasıl yapılır, çok kanallı satış operasyonu nedir, e-ticarette müşteri hizmetleri nasıl yönetilir',
    relatedServiceSlug: 'global-pazara-giris-stratejisi',
    readTime: '5 dk',
    publishedAt: '2026-02-05',
    order: 8,
    updatedAt: 'Haziran 2026',
    updatedAtISO: '2026-06-01',
    author: 'GloventGlobal Global Commerce Team',
    summary:
      'E-ticarette operasyon sistemi; sipariş, kargo, stok, iade, müşteri iletişimi, pazaryeri süreçleri ve ekip takibinin düzenli şekilde yönetilmesini sağlayan yapıdır. Doğru kurulduğunda işletmenin yalnızca satışa değil, satış sonrası sürece de hakim olmasına yardımcı olur. Bu rehber, e-ticaret operasyon sisteminin nasıl kurulabileceğini açıklar.',
    quickAnswer:
      'E-ticarette operasyon sistemi; siparişlerin alınması, stokların takip edilmesi, kargonun yönetilmesi, iadelerin işlenmesi, müşteri mesajlarının yanıtlanması ve satış kanallarının düzenli kontrol edilmesi için kurulan iş akışıdır. Tek başına satış garantisi vermez; ancak büyüyen e-ticaret işletmelerinde hataları azaltmaya, süreçleri ölçülebilir hale getirmeye ve müşteri deneyimini iyileştirmeye yardımcı olur.',
    whoShouldRead: [
      'E-ticaret operasyonunda dağınıklık yaşayan işletmeler',
      'Amazon, Etsy, Shopify veya kendi sitesinde satış yapan markalar',
      'Sipariş, kargo, stok ve iade süreçlerini daha düzenli yönetmek isteyen ekipler',
      'Çok kanallı satış yapan ve süreç takibi zorlaşan işletmeler',
      'Global satışa hazırlanırken operasyon altyapısını güçlendirmek isteyen markalar',
    ],
    expertNote:
      'E-ticarette operasyon sistemi kurarken en sık yapılan hata, sadece satış kanalına odaklanmaktır. Oysa siparişten teslimata, iadeden müşteri iletişimine kadar her adım satış deneyiminin parçasıdır. Operasyon zayıfsa reklam, SEO veya pazaryeri görünürlüğü tek başına sürdürülebilir büyüme sağlamaz.',
    expertNoteAfterHeading: 'Çok kanallı satışta operasyon neden zorlaşır?',
    sections: [
      {
        heading: 'Bu soruyu neden soruyorsunuz?',
        body: 'Bu soruyu soran işletmeler genellikle satış alıyor ama sipariş, kargo, stok, iade, müşteri mesajı ve kanal takibinde dağınıklık yaşıyordur. Operasyon sistemi sadece arka ofis işi değil, müşteri deneyimi ve sürdürülebilir büyüme için temel bir altyapıdır.',
      },
      {
        heading: 'E-ticaret operasyonu nedir?',
        body: '- Siparişin alınmasından teslimata kadar olan süreç\n- Stok, ürün, paketleme, kargo, iade ve müşteri iletişimi yönetimi\n- Pazaryeri, web sitesi ve sosyal medya satış kanallarının takibi\n- Ekip sorumluluklarının netleşmesi\n- Sürecin ölçülebilir hale gelmesi',
      },
      {
        heading: 'E-ticaret operasyon sistemi ne işe yarar?',
        body: '- Sipariş takibini düzenler\n- Stok hatalarını azaltmaya yardımcı olur\n- Kargo ve teslimat sürecini görünür hale getirir\n- İade süreçlerini standartlaştırır\n- Müşteri mesajlarının kaçmasını önler\n- Ekip içi görev dağılımını netleştirir\n- Çok kanallı satışta kontrol sağlar',
      },
      {
        heading: 'Örnek Operasyon Senaryosu',
        body: 'Örnek senaryo: Aynı anda Shopify, Etsy ve Instagram üzerinden satış yapan bir marka, siparişlerini tek bir takip tablosunda toplar; her sipariş için ödeme, stok, paketleme, kargo, teslimat ve iade durumunu ayrı ayrı izler. Bu yapı satış garantisi değil, operasyonun daha kontrollü ve takip edilebilir hale gelmesi için örnek bir başlangıç yaklaşımıdır.',
      },
      {
        heading: 'E-ticarette hangi operasyon alanları yönetilmeli?',
        body: '- Sipariş yönetimi\n- Stok ve envanter yönetimi\n- Paketleme ve hazırlık süreci\n- Kargo ve teslimat takibi\n- İade ve değişim süreci\n- Müşteri hizmetleri\n- Pazaryeri performans takibi\n- Raporlama ve görev yönetimi',
      },
      {
        heading: 'Operasyon sistemi kurmadan önce hangi sorular cevaplanmalı?',
        body: '- Siparişler nereden geliyor?\n- Stok bilgisi nerede tutuluyor?\n- Kargo süreci kim tarafından takip ediliyor?\n- İade ve değişim kararları nasıl veriliyor?\n- Müşteri mesajlarına kim cevap veriyor?\n- Hangi işlem hangi ekip üyesinin sorumluluğunda?\n- Günlük, haftalık ve aylık hangi raporlar takip ediliyor?\n- Hangi süreçler manuel, hangileri otomasyonla desteklenebilir?',
      },
      {
        heading: 'Amazon, Etsy ve Shopify operasyonunda nelere dikkat edilmeli?',
        body: 'Amazon’da performans metrikleri, teslimat, stok ve müşteri deneyimi önemlidir.\nEtsy’de ürün hazırlığı, kargo, müşteri mesajları ve mağaza güveni öne çıkar.\nShopify’da sipariş, ödeme, kargo entegrasyonu, e-posta iletişimi ve müşteri yolculuğu daha fazla markanın kontrolündedir.',
      },
      {
        heading: 'Çok kanallı satışta operasyon neden zorlaşır?',
        body: 'Birden fazla satış kanalı olduğunda sipariş, stok, mesaj, kargo ve raporlama farklı yerlerden akar. Bu yapı sistemli takip edilmezse stok hatası, gecikme, yanlış iletişim ve müşteri memnuniyetsizliği oluşabilir.',
      },
      {
        heading: 'E-ticarette stok ve envanter yönetimi nasıl düşünülmeli?',
        body: '- Ürünlerin hangi kanalda satışta olduğu bilinmeli\n- Stok güncellemeleri düzenli yapılmalı\n- Çok kanallı satışta stok çakışması riski düşünülmeli\n- Hızlı satılan ve yavaş hareket eden ürünler ayrılmalı\n- Stok kararları satış verisiyle birlikte değerlendirilmelidir',
      },
      {
        heading: 'E-ticarette kargo ve iade süreci nasıl planlanmalı?',
        body: '- Paketleme standardı\n- Kargo süresi\n- Takip numarası\n- Müşteri bilgilendirmesi\n- İade şartları\n- Değişim süreci\n- Uluslararası satışta gümrük/vergi gereklilikleri için uzman kontrolü',
      },
      {
        heading: 'İlk 30 gün e-ticaret operasyon planı',
        body: '1. hafta: mevcut operasyon süreçlerini listeleme\n2. hafta: sipariş, stok, kargo ve iade sorumluluklarını netleştirme\n3. hafta: takip tablosu, CRM veya operasyon aracı seçme\n4. hafta: süreçleri test edip raporlama ve iyileştirme düzeni kurma',
      },
      {
        heading: 'En sık yapılan hata',
        body: 'En sık hata, operasyonu yalnızca sipariş geldikten sonra başlayan bir süreç olarak görmektir. Operasyon, ürün bilgisinden stok durumuna, satış kanalından müşteri iletişimine kadar satış öncesi ve sonrası tüm akışı kapsar.',
      },
      {
        heading: 'GloventGlobal bu süreçte nasıl yardımcı olur?',
        body: 'GloventGlobal, e-ticaret işletmelerinin mevcut satış kanallarını, sipariş akışını, stok ve kargo süreçlerini, müşteri iletişimini ve raporlama yapısını analiz ederek daha sistemli bir operasyon altyapısı kurulmasına yardımcı olur.',
      },
    ],
    comparison: {
      heading: 'Manuel Operasyon mu, Sistemli Operasyon mu?',
      headers: ['Kriter', 'Manuel Operasyon', 'Sistemli Operasyon'],
      rows: [
        { criterion: 'Sipariş takibi', individual: 'Siparişler farklı kanallarda ayrı ayrı takip edilir', company: 'Siparişler tek bir süreç mantığıyla izlenir' },
        { criterion: 'Stok yönetimi', individual: 'Stok takibi gecikmeli veya dağınık olabilir', company: 'Stok bilgisi düzenli güncellenir ve kontrol edilir' },
        { criterion: 'Kargo süreci', individual: 'Kargo bilgisi elle takip edilir', company: 'Kargo durumu, takip numarası ve müşteri bilgilendirmesi standartlaşır' },
        { criterion: 'İade yönetimi', individual: 'Her iade ayrı kararlarla yönetilir', company: 'İade şartları ve takip akışı daha net ilerler' },
        { criterion: 'Raporlama', individual: 'Veriler sonradan toparlanır', company: 'Satış, stok, iade ve performans düzenli takip edilir' },
      ],
    },
    checklist: {
      heading: 'E-ticaret operasyon sistemi kurmadan önce kontrol listesi',
      items: [
        'Siparişlerin hangi kanallardan geldiği belli mi?',
        'Stok takibi nerede yapılıyor?',
        'Kargo süreci standart mı?',
        'İade ve değişim kuralları net mi?',
        'Müşteri mesajları düzenli takip ediliyor mu?',
        'Hangi ekip üyesinin hangi süreçten sorumlu olduğu belli mi?',
        'Günlük ve haftalık operasyon raporları hazırlanıyor mu?',
        'Çok kanallı satış varsa stok çakışması önleniyor mu?',
        'Otomasyon veya entegrasyon ihtiyacı belirlendi mi?',
      ],
    },
    faq: {
      heading: 'Sık Sorulan Sorular',
      items: [
        {
          question: 'E-ticaret operasyonu nedir?',
          answer:
            'E-ticaret operasyonu, siparişin alınmasından teslimata kadar olan sipariş, stok, kargo, iade ve müşteri iletişimi süreçlerinin yönetilmesidir. Amaç, satış sonrası sürecin de düzenli ve takip edilebilir olmasını sağlamaktır.',
        },
        {
          question: 'E-ticarette operasyon sistemi neden önemlidir?',
          answer:
            'Operasyon zayıfsa reklam, SEO veya pazaryeri görünürlüğü tek başına sürdürülebilir büyüme sağlamaz. Sipariş, stok ve müşteri iletişiminde oluşan hatalar müşteri deneyimini ve marka güvenini doğrudan etkiler.',
        },
        {
          question: 'Sipariş yönetimi nasıl yapılır?',
          answer:
            'Siparişlerin hangi kanaldan geldiğinin, hangi aşamada olduğunun ve kimin sorumlu olduğunun net olması gerekir. Çok kanallı satışta siparişlerin tek bir süreç mantığıyla takip edilmesi hata riskini azaltır.',
        },
        {
          question: 'E-ticarette stok takibi nasıl yapılır?',
          answer:
            'Stok bilgisinin düzenli güncellenmesi ve tüm satış kanallarında tutarlı olması gerekir. Çok kanallı satışta stok çakışması riski özellikle dikkat edilmesi gereken bir noktadır.',
        },
        {
          question: 'Kargo ve iade süreci nasıl yönetilir?',
          answer:
            'Paketleme standardı, kargo süresi, takip numarası ve müşteri bilgilendirmesinin net olması gerekir. İade ve değişim şartlarının da önceden tanımlanmış olması süreci daha öngörülebilir hale getirir.',
        },
        {
          question: 'Çok kanallı satışta operasyon nasıl takip edilir?',
          answer:
            'Sipariş, stok, mesaj ve kargo bilgisinin farklı kanallardan tek bir sürece bağlanması önemlidir. Bu sistemli takip edilmezse stok hatası, gecikme veya yanlış iletişim oluşabilir.',
        },
        {
          question: 'Operasyon sistemi kurmak için hangi araçlar kullanılabilir?',
          answer:
            'Takip tabloları, CRM sistemleri ve otomasyon/entegrasyon araçları işletmenin ihtiyacına göre kullanılabilir. Kesin bir araç önerisi yoktur; seçim sipariş hacmine ve kanal sayısına göre değişir.',
        },
      ],
    },
    nextSteps: [
      'Mevcut sipariş, kargo, stok ve iade süreçlerinizi listeleyin',
      'Hangi adımda zaman kaybı veya hata oluştuğunu belirleyin',
      'Satış kanallarınızı ve operasyon sorumluluklarını netleştirin',
      'Takip için tablo, CRM, otomasyon veya entegrasyon yapınızı planlayın',
      'Ücretsiz analiz ile e-ticaret operasyon yapınızın ne kadar hazır olduğunu değerlendirin',
    ],
  },
};