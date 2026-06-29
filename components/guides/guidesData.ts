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
    sections: [
      {
        heading: 'Kısa cevap',
        body: 'Amazon, bireysel satıcı hesabına da izin verir; ancak düzenli, ölçeklenebilir ve markalı bir satış için bir şirket yapısı (şahıs veya limited) hem vergi hem de kurumsal güvenilirlik açısından avantaj sağlar.',
      },
      {
        heading: 'Hangi durumda şahıs şirketi yeterli olabilir?',
        body: 'Küçük hacimli, tek kategori ürünle başlayan ve süreci test eden markalar için şahıs şirketi başlangıç için yeterli olabilir. Bu modelde muhasebe ve vergi yükümlülükleri daha basittir.',
      },
      {
        heading: 'Ne zaman daha kurumsal bir yapı gerekir?',
        body: 'Birden fazla pazaryeri, birden fazla kategori veya yüksek hacimli satış planlanıyorsa; marka tescili, FBA stok yönetimi ve kurumsal faturalandırma gibi süreçler için limited şirket yapısı daha sürdürülebilir olur.',
      },
      {
        heading: 'GloventGlobal nasıl yardımcı olur?',
        body: 'Şirket yapısı bir muhasebe/hukuk kararıdır; ancak doğru kategori, listeleme, reklam ve operasyon sistemini bu yapının üzerine doğru şekilde kurmak GloventGlobal’ın işidir.',
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
    category: 'Karşılaştırma',
    targetAudience: 'İlk satış kanalını seçmeye çalışan marka sahipleri',
    searchIntent: 'shopify mı etsy mi, shopify etsy farkı, hangisi daha karlı',
    relatedServiceSlug: 'shopify',
    readTime: '5 dk',
    publishedAt: '2026-01-21',
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