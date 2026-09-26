// /hizmetler overview Service Explorer verisi (RDServicesDirectory) — başka yerlerde de (ör. analiz
// önerileri, lib/analysis/services.ts) aynı gerçek hizmet adı/açıklamasını kullanmak için ayrı modülde.
// "use client" yok: server ve client component'ler güvenle import edebilir.
// Kaynak: components/services/serviceDetailsData.ts (audience/approach/problem/deliverables
// alanları) + components/services/ServicesContent.tsx (serviceCards). Başlıklar kullanıcının
// verdiği 12 gerçek hizmet adıyla birebir aynı; açıklamalar ve capability label'lar her hizmetin
// kendi serviceDetailsData içeriğinden derlendi — yeni hizmet, vaat ya da platform uydurulmadı.
// Kategori grupları, kullanıcının verdiği pillar eşleştirmesiyle aynı; her hizmet tek birincil
// kategoriye yerleştirildi (Shopify/B2B pillar bölümünde Teknoloji'ye de değiniyor ama burada
// tekrar satır oluşturmamak için Ticaret altında listeleniyor).
export type ServiceDirectoryItem = { title: string; desc: string; labels: string[]; slug: string };

export const serviceDirectoryGroups: {
  category: string;
  items: ServiceDirectoryItem[];
}[] = [
  {
    category: 'Strateji',
    items: [
      {
        title: 'Marka Konumlandırma',
        desc: 'Ürününüzü yalnızca satılacak bir ürün olarak değil, hedef müşteri ve rakip ayrışmasına göre net bir pazar konumunda konumlandırırız.',
        labels: ['Hedef Müşteri', 'Rakip Ayrışması', 'Değer Önerisi', 'Kanal Dili'],
        slug: 'marka-konumlandirma',
      },
      {
        title: 'Global Pazara Giriş Stratejisi',
        desc: 'Ürününüz için doğru ülke, kanal, fiyat ve operasyon hazırlığını değerlendirip uygulanabilir bir global büyüme yol haritası çıkarırız.',
        labels: ['Pazar & Kanal Seçimi', 'Fiyat & Rekabet', 'Operasyon Hazırlığı', '12 Aylık Plan'],
        slug: 'global-pazara-giris-stratejisi',
      },
    ],
  },
  {
    category: 'Ticaret',
    items: [
      {
        title: 'Amazon Global Satış Sistemi',
        desc: 'Kategori seçiminden listeleme, reklam ve stok/operasyon takibine kadar Amazon satışını uçtan uca kurar ve yönetiriz.',
        labels: ['Listeleme & SEO', 'Reklam', 'Marka Kaydı', 'Stok & Operasyon'],
        slug: 'amazon',
      },
      {
        title: 'Etsy Marka Sistemi',
        desc: 'El yapımı, butik ve niş ürünler için mağaza dili, görsel sunum, listeleme ve SEO’yu tek bir satış sistemi olarak kurarız.',
        labels: ['Mağaza Kurulumu', 'Görsel Sunum', 'Etsy SEO', 'Reklam & Test'],
        slug: 'etsy',
      },
      {
        title: 'eBay Global Satış Sistemi',
        desc: 'Doğru ülke ve kategori seçiminden kargo, fiyatlandırma ve mağaza güven sinyallerine kadar global eBay satışını kurgularız.',
        labels: ['Ülke Stratejisi', 'Fiyat & Kargo', 'Listeleme', 'Mağaza Güveni'],
        slug: 'ebay',
      },
      {
        title: 'Shopify Commerce Sistemi',
        desc: 'Vitrin ve ürün yönetiminin yanında B2B showroom ve teklif akışını da kapsayan bağımsız bir commerce altyapısı kurarız.',
        labels: ['Ürün & Koleksiyon', 'B2B Showroom', 'Teklif Akışı', 'Dönüşüm Optimizasyonu'],
        slug: 'shopify',
      },
      {
        title: 'B2B Dijital Showroom',
        desc: 'Toptan satış yapan markalar için dijital katalog, teklif toplama akışı ve müşteri odaklı ürün sunumunu showroom mantığıyla kurarız.',
        labels: ['Dijital Katalog', 'Teklif Listesi', 'Müşteri Segmentasyonu', 'Showroom Deneyimi'],
        slug: 'b2b-dijital-showroom',
      },
    ],
  },
  {
    category: 'Teknoloji',
    items: [
      {
        title: 'Otomasyon & n8n Sistemleri',
        desc: 'Form, teklif, sipariş ve raporlama süreçlerini n8n ve API bağlantılarıyla birbirine bağlı, tek merkezden izlenebilir hale getiririz.',
        labels: ['n8n & API', 'Form / Teklif Akışı', 'Bildirim & Görev', 'Raporlama'],
        slug: 'otomasyon-n8n',
      },
      {
        title: 'Yapay Zeka Entegrasyonu',
        desc: 'Ürün, içerik, raporlama ve operasyon süreçlerine yapay zeka destekli sistemleri; ayrı bir araç değil, satış sisteminin parçası olarak entegre ederiz.',
        labels: ['İçerik Üretimi', 'Raporlama', 'Operasyon Otomasyonu', 'Karar Desteği'],
        slug: 'yapay-zeka-entegrasyonu',
      },
    ],
  },
  {
    category: 'Operasyon',
    items: [
      {
        title: 'Reklam & Optimizasyon',
        desc: 'Amazon, Etsy, Google ve Meta reklamlarını dönüşüm, ROAS ve kârlılık verisine göre düzenli olarak optimize ederiz.',
        labels: ['Amazon & Etsy Ads', 'Google & Meta', 'ROAS Takibi', 'Kampanya Optimizasyonu'],
        slug: 'reklam-optimizasyon',
      },
      {
        title: 'Görsel & İçerik Sistemi',
        desc: 'Ürün fotoğrafından başlık, açıklama ve SEO yapısına kadar kanal bazlı görsel ve içerik sistemini kurarız.',
        labels: ['Ürün Fotoğrafı', 'AI Görsel Konsept', 'Listeleme Metni', 'SEO'],
        slug: 'gorsel-icerik-sistemi',
      },
      {
        title: 'Sosyal Medya Yönetimi',
        desc: 'Instagram, TikTok ve diğer kanallarda markanızın satış kanallarıyla uyumlu, tutarlı bir içerik ve paylaşım sistemi kurarız.',
        labels: ['Instagram & TikTok', 'İçerik Planı', 'Ürün Anlatımı', 'Satış Kanalı Uyumu'],
        slug: 'sosyal-medya-yonetimi',
      },
    ],
  },
];
