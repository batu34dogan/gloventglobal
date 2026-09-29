// Proje detay sayfaları (/projeler/[slug]) için tek içerik kaynağı. Ana sayfadaki "Seçili çalışmalar"
// paneli "Çalışmanın detayları" bağlantısını da buradan alır (yalnız detay sayfası olan markalar).
//
// Kapsam yalnız doğrulanmış bilgilere dayanır (kullanıcının onayladığı proje kapsamı ve ana sayfadaki
// onaylı proje metinleri). Eski, daha genel pazarlama cümleleri teslimat kanıtı sayılmaz. Satış, ciro,
// ROAS, sipariş, ürün adedi, süre, ekip, müşteri yorumu veya sonuç iddiası yoktur; "Sonuçlar" başlığı
// kullanılmaz. Gerçekleşmiş çalışma ile genel yaklaşım ayrı başlıklarla sunulur. BERD bir müşteri
// projesi değil, kurucunun kendi marka ve ticaret deneyimidir (aşağıdaki kayıt).

export type ProjectSection =
  | { kind: 'text'; title: string; body: string; note?: string; link?: { href: string; label: string } }
  | { kind: 'rows'; title: string; rows: { title: string; desc: string }[] };

export type ProjectDetail = {
  slug: string;
  showcaseId: string; // ana sayfadaki seçili çalışmalar sekmesinin kimliği
  brand: string;
  logo: { src: string; width: number; height: number; maxWidthPct: number };
  tone: string;
  tagline: string;
  title: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  // Opsiyonel kısa proje bilgileri (ince ayırıcılı liste) ve kapanış vurgusu — yalnız doğrulanmış bilgi.
  facts?: { label: string; value: string }[];
  sections: ProjectSection[];
  closing?: string;
};

export const PROJECT_DETAILS: Record<string, ProjectDetail> = {
  'asl-canta': {
    slug: 'asl-canta',
    showcaseId: 'asl',
    brand: 'ASL Çanta',
    logo: { src: '/redesign/logos/asl-canta.png', width: 2195, height: 944, maxWidthPct: 52 },
    tone: 'linear-gradient(160deg,#EFE9DD 0%,#E6DFD0 100%)',
    tagline: 'ASL Çanta · E-ticaret altyapısı',
    title: 'Geniş katalogdan markaya özel alışveriş deneyimine.',
    intro:
      'ASL Çanta çalışmasında ürün ve kategori yapısını, veri aktarımını ve Shopify bağlantılı web deneyimini birlikte ele aldık. Ürün keşfinden varyant seçimine kadar alışveriş akışının detayları üzerinde çalıştık.',
    metaTitle: 'ASL Çanta — E-ticaret Altyapısı Çalışması | GloventGlobal',
    metaDescription:
      'ASL Çanta için ürün ve kategori yapısı, veri aktarımı ve Shopify bağlantılı markaya özel web deneyimini birlikte ele aldığımız e-ticaret altyapısı çalışması.',
    sections: [
      {
        kind: 'text',
        title: 'Çalışmanın odağı',
        body: 'Geniş bir ürün kataloğunu dijital ortamda sunarken kategori düzeni, ürün bilgisi ve alışveriş deneyimini birlikte düşünmek gerekir. Bu çalışmada tasarımı, ürün yapısı ve satış altyapısıyla birlikte ele aldık.',
      },
      {
        kind: 'rows',
        title: 'Ele aldığımız alanlar',
        rows: [
          { title: 'Ürün ve kategori yapısı', desc: 'Kataloğun düzenlenmesi ve ürün keşfinin kurgulanması.' },
          { title: 'Veri ve Shopify bağlantısı', desc: 'Ürün bilgilerinin düzenlenmesi, aktarımı ve satış altyapısıyla ilişkilendirilmesi.' },
          { title: 'Markaya özel web deneyimi', desc: 'Ürün sunumu ve alışveriş arayüzü üzerinde çalışma.' },
          { title: 'Ürün ve varyant seçimi', desc: 'Alıcının ürün seçeneklerini değerlendirdiği akışın geliştirilmesi.' },
        ],
      },
      {
        kind: 'text',
        title: 'Yaklaşımımız',
        body: 'Arayüz kararlarını ürün ve kategori mimarisinden ayrı ele almadık. Çalışmayı, ürün bilgisi ile alışveriş deneyiminin birlikte ilerlediği bir yapı etrafında şekillendirdik.',
      },
    ],
  },
  berd: {
    slug: 'berd',
    showcaseId: 'berd',
    brand: 'BERD',
    logo: { src: '/redesign/logos/berd.png', width: 1720, height: 849, maxWidthPct: 52 },
    tone: 'linear-gradient(160deg,#E4E6EA 0%,#D8DBE1 100%)',
    // BERD, kurucu Batuhan Doğan'ın kendi markası ve ticaret deneyimidir; GloventGlobal'ın hizmet verdiği
    // bir müşteri projesi değildir. Doğrulanan: kendi markasını oluşturdu, yeni popülerleşen ürünleri bu
    // marka altında Amazon Avustralya'da sattı, operasyonun tamamını kendisi yürüttü. Markanın veya
    // operasyonun bugün sürdüğü varsayılmaz. Ürün kategorisi/sayısı, tarih, ciro, büyüme, kârlılık, yorum,
    // tedarik yeri, FBA, özel üretim, tescil, A+ içerik, reklam sonucu ve diğer pazarlar eklenmez.
    tagline: 'Kendi marka deneyimimiz',
    title: 'Kendi markamızla, ticaretin her aşamasında.',
    intro:
      'BERD, kurucumuz Batuhan Doğan’ın oluşturduğu ve Amazon Avustralya’da kendi markası altında yeni popülerleşen ürünler sattığı girişimdir. Markanın oluşturulmasından satış operasyonuna kadar tüm süreçleri bizzat yürüttüğü bu deneyim, bugün markalar için geliştirdiğimiz yaklaşımın saha temelini oluşturuyor.',
    metaTitle: 'BERD — Kurucumuzun Kendi Marka Deneyimi | GloventGlobal',
    metaDescription:
      'BERD, kurucumuz Batuhan Doğan’ın oluşturduğu ve Amazon Avustralya’da yeni popülerleşen ürünler sattığı kendi markası. Marka oluşturmadan satış operasyonuna kadar süreci bizzat yürüttü.',
    facts: [
      { label: 'Marka', value: 'BERD' },
      { label: 'Pazar', value: 'Avustralya' },
      { label: 'Satış kanalı', value: 'Amazon' },
      { label: 'Bağlam', value: 'Kurucunun kendi marka ve ticaret deneyimi' },
    ],
    sections: [
      {
        kind: 'text',
        title: 'Üründen önce fırsatı görmek',
        body: 'Yeni popülerleşen ürünleri belirleyerek kendi markamız altında satışa sunduk. Çalışmanın başlangıç noktası, pazardaki ilgiyi takip etmek ve hangi ürünlerle ilerleyeceğimize karar vermekti.',
      },
      {
        kind: 'text',
        title: 'Kendi markasını oluşturmak',
        body: 'BERD markasını oluşturduk ve seçtiğimiz ürünleri bu marka altında sunduk. Ürün seçimi ile marka oluşturmayı aynı ticaret girişiminin parçaları olarak ele aldık.',
      },
      {
        kind: 'text',
        title: 'Operasyonu baştan sona yürütmek',
        body: 'Markanın oluşturulmasından Amazon Avustralya’daki satış operasyonuna kadar sürecin tamamını kurucumuz yürüttü. Deneyimimiz, kendi ticaretimizde karar almanın ve bu kararları uygulamanın sorumluluğuna dayanıyor.',
      },
    ],
    closing: 'Bugün markalarla çalışırken, kendi ticaretimizde üstlendiğimiz sorumluluğun deneyimini de masaya getiriyoruz.',
  },
};

export const PROJECT_SLUGS = Object.keys(PROJECT_DETAILS);

// Ana sayfa seçili çalışmalar sekmesi → detay sayfası (yalnız detayı hazır olanlar).
export const PROJECT_HREF_BY_SHOWCASE: Record<string, string> = Object.fromEntries(
  Object.values(PROJECT_DETAILS).map((p) => [p.showcaseId, `/projeler/${p.slug}`]),
);
