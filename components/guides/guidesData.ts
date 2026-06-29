export type GuideSection = {
  heading: string;
  body: string;
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
  // Aşağıdaki 4 alan opsiyonel — henüz doldurulmamış rehberlerde (diğer 5 rehber) hiç görünmez,
  // sayfa bu alanlar olmadan da eskisi gibi çalışır.
  updatedAt?: string;
  author?: string;
  summary?: string;
  quickAnswer?: string;
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
    updatedAt: 'Haziran 2026',
    author: 'GloventGlobal Global Commerce Team',
    summary:
      'Amazon’da satış yapmak için her durumda şirket zorunlu olmayabilir. Ancak sürdürülebilir satış hedefleyen markalar için şirket, vergi, lojistik, ödeme ve operasyon planlaması en baştan düşünülmelidir. Bu rehber hangi durumda bireysel başlangıcın, hangi durumda şirketli yapının daha doğru olabileceğini açıklar.',
    quickAnswer:
      'Amazon’da bazı pazarlarda bireysel satıcı hesabı açmak mümkün olabilir. Ancak ciddi, sürdürülebilir ve ölçeklenebilir satış yapmak isteyen işletmeler için şirket, vergi, fatura, ödeme alma, lojistik ve marka yönetimi birlikte planlanmalıdır.',
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
        heading: 'Bireysel başlamak mı, şirketle başlamak mı?',
        body: 'Kriter — Bireysel Başlangıç — Şirketli Başlangıç\nBaşlangıç maliyeti — Daha düşük — Daha yüksek\nGüvenilirlik — Sınırlı — Daha güçlü\nÖlçekleme — Zorlaşabilir — Daha kolay\nFatura / vergi düzeni — Basit — Kurumsal\nMarka oluşturma — Sınırlı — Uygun\nUzun vadeli operasyon — Zorlaşabilir — Sürdürülebilir',
      },
      {
        heading: 'Amazon’da satışa başlamadan önce kontrol listesi',
        body: '✓ Satılacak ürün belirlendi mi?\n✓ Hedef pazar seçildi mi?\n✓ Rakip ve fiyat analizi yapıldı mı?\n✓ Ürün kârlılığı hesaplandı mı?\n✓ Kargo / FBA / FBM modeli seçildi mi?\n✓ Gerekli belgeler kontrol edildi mi?\n✓ Listeleme ve görsel stratejisi hazır mı?\n✓ Reklam bütçesi planlandı mı?\n✓ Operasyon takibi nasıl yapılacak?',
      },
      {
        heading: 'En sık yapılan hata',
        body: 'Amazon’a sadece bir hesap açma işi gibi bakmak en sık yapılan hatadır. Asıl mesele; ürün, pazar, fiyat, lojistik, listeleme, reklam ve operasyon sisteminin birlikte kurulmasıdır.',
      },
      {
        heading: 'GloventGlobal bu süreçte nasıl yardımcı olur?',
        body: 'GloventGlobal; ürün, pazar, şirketleşme ihtiyacı, listeleme, reklam, lojistik ve operasyon adımlarını birlikte değerlendirerek Amazon satış sürecini bir sisteme dönüştürür. Amazon’da satışa başlamadan önce ürününüzü, hedef pazarınızı ve mevcut hazırlık seviyenizi birlikte değerlendirebiliriz.',
      },
      {
        heading: 'Sık Sorulan Sorular',
        body: 'Amazon’da satış yapmak için şirket zorunlu mu?\nÇoğu pazarda kesin bir zorunluluk yoktur ve bazı durumlarda bireysel başlangıç mümkün olabilir. Ancak ciddi, düzenli ve sürdürülebilir satış hedefleyen markalar için şirket yapısı genellikle daha sağlıklı bir temel sağlar. Güncel gereklilik, başvuru yapılacak pazara ve hesap türüne göre değişebilir.\n\nAmazon’da bireysel hesapla satış yapılabilir mi?\nBazı pazarlarda bireysel hesapla satışa başlamak mümkün olabilir. Ancak istenen belgeler ve hesap türü, satış yapılacak ülkeye ve ürün kategorisine göre farklılık gösterebilir. Başvuru öncesinde ilgili pazarın güncel şartlarının kontrol edilmesi önemlidir.\n\nTürkiye’den Amazon’da satış yapmak için ne gerekir?\nHedef pazar seçimi, ürün uygunluğu, lojistik modeli ve gerekli belgelerin netleştirilmesi gerekir. Bu adımlar; başvuru yapılacak Amazon pazarına, ürün kategorisine ve hesap türüne göre değişebileceği için önceden araştırılmalıdır. Kârlılık ve operasyon planı da bu aşamada birlikte değerlendirilmelidir.\n\nAmazon’da şirket kurmadan başlamak mantıklı mı?\nKüçük ölçekli bir pazar testi veya ürün fikrini doğrulama aşamasında mantıklı bir seçenek olabilir. Ancak satış hacmi ve hedefler büyüdükçe; fatura, vergi ve tedarikçi ilişkileri için şirketleşme genellikle gerekli hale gelir. Bu karar, ürün kategorisi ve hedef pazara göre de değişebilir.\n\nAmazon’da satışa başlamak için en önemli hazırlık nedir?\nÜrün, pazar ve kârlılık analizinin; listeleme, reklam ve operasyon planıyla birlikte yapılması en önemli hazırlıktır. Bu unsurlardan biri eksik kaldığında satış süreci dengesiz ilerleyebilir. Hazırlık adımları, hedeflenen pazara ve ürün grubuna göre küçük farklılıklar gösterebilir.\n\nAmazon FBA için şirket gerekir mi?\nFBA programına katılım şartları pazara, ürün kategorisine ve hesap türüne göre değişebilir; bazı durumlarda kesin bir şirket şartı aranmayabilir. Yine de düzenli stok, lojistik ve finansal takip gerektiren bir model olduğu için kurumsal bir yapı çoğu zaman süreci kolaylaştırır. Güncel gereklilikler başvuru yapılacak Amazon pazarına göre kontrol edilmelidir.',
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
    searchIntent: 'etsy ilk satış nasıl alınır, etsy mağaza satış yapmıyor',
    relatedServiceSlug: 'etsy',
    readTime: '4 dk',
    publishedAt: '2026-01-18',
    updatedAt: 'Haziran 2026',
    author: 'GloventGlobal Global Commerce Team',
    summary:
      'Etsy’de ilk satışı almak genellikle teknik bir sorun değil; görsel kalite, başlık/SEO uyumu ve fiyat algısı sorunudur. Bu rehber, yeni açılan bir Etsy mağazasının ilk satışını geciktiren en yaygın nedenleri ve hızlandıran temel adımları özetler.',
    quickAnswer:
      'Etsy’de ilk satışı geciktiren en yaygın neden, ürün fotoğrafı ve başlık kalitesine yeterince yatırım yapılmamasıdır. Doğru kategori, anahtar kelime ve fiyat dengesi kurulduğunda ilk satış genellikle daha hızlı gelir.',
    sections: [
      {
        heading: 'İlk satışı geciktiren en yaygın hata',
        body: 'Çoğu yeni mağaza, ürün fotoğrafı ve başlık kalitesine yeterince yatırım yapmadan listeleme yapar. Etsy’de alıcı kararını büyük ölçüde görsel ve ilk üç kelimeden oluşan başlık üzerinden verir.',
      },
      {
        heading: 'Doğru kategori ve anahtar kelime seçimi',
        body: 'Etsy arama algoritması, başlık, etiket ve kategori uyumuna göre çalışır. Rastgele geniş kelimeler yerine, ürünü gerçekten arayan kişinin yazacağı spesifik ifadeler kullanmak görünürlüğü artırır.',
      },
      {
        heading: 'Fiyat ve sosyal kanıt dengesi',
        body: 'Yeni bir mağazada yorum olmadığı için fiyat, alıcının ilk güven sinyali haline gelir. Çok düşük veya çok yüksek fiyatlandırma, ilk satışı zorlaştırabilir.',
      },
      {
        heading: 'GloventGlobal nasıl yardımcı olur?',
        body: 'Etsy Marka Sistemi kapsamında ürün, görsel dil, başlık/SEO yapısı ve fiyat konumlandırmasını birlikte çalışan bir sisteme dönüştürüyoruz.',
      },
    ],
  },

  'shopify-mi-etsy-mi-hangi-isletme-icin-hangisi-daha-mantikli': {
    title: 'Shopify mı Etsy mi? Hangi İşletme İçin Hangisi Daha Mantıklı?',
    slug: 'shopify-mi-etsy-mi-hangi-isletme-icin-hangisi-daha-mantikli',
    excerpt:
      'Shopify ve Etsy birbirinin yerine geçen değil, farklı ihtiyaçlara hizmet eden iki farklı satış modelidir. Hangi işletme için hangisinin daha mantıklı olduğunu karşılaştırıyoruz.',
    category: 'Shopify',
    targetAudience: 'İlk satış kanalını seçmeye çalışan marka sahipleri',
    searchIntent: 'shopify mı etsy mi, shopify etsy farkı, hangisi daha karlı',
    relatedServiceSlug: 'shopify',
    readTime: '5 dk',
    publishedAt: '2026-01-21',
    updatedAt: 'Haziran 2026',
    author: 'GloventGlobal Global Commerce Team',
    summary:
      'Shopify ve Etsy birbirinin yerine geçen değil, farklı ihtiyaçlara hizmet eden iki satış modelidir. Bu rehber, hangi işletme için hangisinin daha mantıklı olduğunu ve ikisinin birlikte nasıl kullanılabileceğini özetler.',
    quickAnswer:
      'Hazır bir alıcı kitlesine ihtiyaç duyan markalar için Etsy, kendi marka varlığını ve müşteri verisini kontrol etmek isteyen markalar için Shopify genellikle daha mantıklıdır. Çoğu marka için en sürdürülebilir yaklaşım, ikisini birlikte ve aşamalı olarak kullanmaktır.',
    sections: [
      {
        heading: 'Etsy ne zaman daha mantıklı?',
        body: 'El yapımı, niş, koleksiyon temelli veya hazır bir alıcı kitlesine ihtiyaç duyan markalar için Etsy, kendi trafiğini kendisi getiren bir pazaryeri olduğu için daha hızlı bir başlangıç noktası olabilir.',
      },
      {
        heading: 'Shopify ne zaman daha mantıklı?',
        body: 'Markasını bağımsız bir dijital ticaret sistemi üzerinde büyütmek, kendi müşteri verisini toplamak ve uzun vadede reklam/CRM süreçlerini tam kontrol etmek isteyen markalar için Shopify daha sürdürülebilir bir altyapıdır.',
      },
      {
        heading: 'İkisi birlikte de kullanılabilir mi?',
        body: 'Evet. Çoğu marka için doğru yaklaşım, Etsy’de mevcut talebi değerlendirirken Shopify’da uzun vadeli marka varlığını paralel olarak inşa etmektir.',
      },
      {
        heading: 'GloventGlobal nasıl yardımcı olur?',
        body: 'Markanın ürün yapısına ve hedeflerine göre doğru kanal önceliğini birlikte belirliyor, Shopify Commerce Sistemi’ni markaya özel kurguluyoruz.',
      },
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
    updatedAt: 'Haziran 2026',
    author: 'GloventGlobal Global Commerce Team',
    summary:
      'Global pazara açılmak isteyen Türkiye merkezli markaların ilk olarak hangi soruları cevaplaması, hangi kararları önce vermesi gerektiğini özetleyen bu rehber; pazar seçimi, operasyon hazırlığı ve kanal stratejisini bir araya getirir.',
    quickAnswer:
      'Doğru başlangıç noktası önce platform değil, hedef pazar ve müşteri seçimidir. Talep ve rekabet analizi yapılmadan seçilen kanal, doğru olsa bile beklenen sonucu vermeyebilir.',
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
    updatedAt: 'Haziran 2026',
    author: 'GloventGlobal Global Commerce Team',
    summary:
      'Toptan satış yapan markaların PDF katalog ve e-posta trafiğinden, ölçülebilir bir dijital showroom yapısına geçmesinin neden önemli olduğunu özetleyen bu rehber; teklif takibi, müşteri grupları ve satış görünürlüğü konularına odaklanır.',
    quickAnswer:
      'PDF katalog ve e-posta üzerinden yürüyen bir toptan satış süreci, hangi müşterinin hangi ürüne ilgi gösterdiğini izlemeyi zorlaştırır. Dijital showroom, ürün sunumu ve teklif sürecini tek bir görünür sisteme dönüştürür.',
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
    updatedAt: 'Haziran 2026',
    author: 'GloventGlobal Global Commerce Team',
    summary:
      '"Yapay zeka kullanıyoruz" demek yeterli değildir. Bu rehber, e-ticarette yapay zekanın gerçek anlamda değer ürettiği somut kullanım alanlarını; içerik üretimi, müşteri iletişimi ve raporlama başlıkları üzerinden özetler.',
    quickAnswer:
      'E-ticarette yapay zeka en çok ürün/içerik üretimi, müşteri iletişimi ve raporlama / karar desteği alanlarında gerçek değer üretir. Asıl fark, yapay zekanın kontrol ve onay yapısıyla satış sistemine entegre edilmesidir.',
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