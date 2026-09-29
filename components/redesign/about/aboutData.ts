// /redesign/hakkimizda içerik kaynağı.
// BİREBİR kaynak metinler (production, bu görevde değiştirilmedi):
//   - components/about/AboutContent.tsx: "Neden Kurulduk?" hikâyesi, "Biz Kimiz?" yaklaşım paragrafı,
//     "GloventGlobal Bugün" cümlesi, kitle segmentleri ve "Sistem Kurarız" açıklaması.
//   - components/difference/DifferenceContent.tsx (/farkimiz): prensip açıklamaları.
// ONAYLI YENİDEN İFADE (Global Growth Partner konumlandırması — "dijital büyüme" ve "ajans değil"
// dili ana mesaj olarak kullanılmıyor): Hero başlığı/alt metni, "Biz Kimiz?" başlığı, yetkinlik kısa
// açıklamaları, AI + DATA katmanı cümlesi ve final CTA.
// KURUCU / SAHA DENEYİMİ: yalnız kullanıcının doğruladığı bilgiler (kurucu Batuhan Doğan; 7 yıllık
// e-ticaret deneyimi — kurucunun deneyimidir, şirketin kuruluş yaşı DEĞİLDİR; yurt içi/yurt dışı farklı
// satış modelleri; Türkiye'den yurt dışına açılım ve Çin'den farklı pazarlara uzanan operasyonlar; ABD,
// Kanada, Avustralya, BAE bağlamı — ofis/depo/şube değildir). Kuruluş yılı, ekip büyüklüğü, unvan dışı
// kişisel bilgi veya sayısal başarı iddiası yok.

export const aboutHero = {
  eyebrow: 'HAKKIMIZDA',
  title: 'Global Büyümeyi Parçalar Halinde Değil, Tek Bir Sistem Olarak Kuruyoruz.',
  // Kaynak: "dağınık araçları, kanalları ve süreçleri birlikte çalışan bir sisteme dönüştürmek"
  // + Biz Kimiz partner cümlesi ("birlikte kuran, yöneten ve geliştiren").
  description:
    'GloventGlobal; strateji, ticaret, teknoloji ve operasyonu birlikte kuran, yöneten ve geliştiren bir Global Growth Partner’dır. Dağınık araçları, kanalları ve süreçleri markanın büyümesini taşıyan tek bir sisteme dönüştürürüz.',
};

// Hikâye: saha deneyimi ana mesajı + "Neden Kurulduk?" kaynağının iki özgün paragrafı (birebir).
// Kaynağın "Oysa sürdürülebilir büyüme…" paragrafı ve vurgu cümlesi "Biz Kimiz?" gövdesi ile
// "Ticareti Bir Bütün Olarak Ele Alırız" prensibini tekrar ettiği için burada kullanılmıyor.
export const aboutStory = {
  eyebrow: 'Hikâyemiz',
  title: 'Kararlarımızın arkasında saha deneyimi var.',
  lead: 'GloventGlobal’ın yaklaşımı, kurucusu Batuhan Doğan’ın 7 yıllık yurt içi ve uluslararası e-ticaret deneyimine dayanır. Bu birikimi markalar için geliştirdiğimiz strateji, altyapı ve operasyon çalışmalarına taşıyoruz.',
  paragraphs: [
    'Birçok işletmenin dijital dünyaya yalnızca web sitesi, reklam veya pazaryeri kurulumu olarak baktığını gördük.',
    'GloventGlobal bu nedenle kuruldu: işletmelerin dijitalde büyümesi için dağınık araçları, kanalları ve süreçleri birlikte çalışan bir sisteme dönüştürmek.',
  ],
};

// Kurucu anlatımı — kurucunun kendi ifadesi (röportaj/alıntı/testimonial biçimi değil).
export const aboutFounder = {
  eyebrow: 'Kurucudan',
  name: 'Batuhan Doğan',
  role: 'GloventGlobal Kurucusu',
  paragraphs: [
    'Bir ürünü satmaya çalışırken fiyatın, sunumun, satış kanalının ve operasyonun birbirinden bağımsız olmadığını sahada gördüm. Bugün bir projeye başlarken önce ürünün kim için anlamlı olduğunu, hangi pazarda nasıl sunulacağını ve arkasındaki işleyişin nasıl kurulacağını değerlendiriyorum.',
    'GloventGlobal’da bu deneyimi markaya özel kararlarla birleştiriyoruz. Hazır bir çözüm yeterliyse onu kullanıyor, ihtiyaç gerektiriyorsa özel bir sistem geliştiriyoruz. Teknolojiyi, işin gerektirdiği yerde devreye alıyoruz.',
  ],
  // Operasyon bağlamı — ülkeler çalışma bağlamıdır; ofis, depo veya şube değildir.
  operations: {
    label: 'Operasyon deneyimi',
    text: 'Türkiye’den yurt dışına açılım ve Çin’den farklı pazarlara uzanan ticaret operasyonlarında çalışıyoruz. Deneyimimiz ABD, Kanada, Avustralya ve Birleşik Arap Emirlikleri’ni kapsıyor.',
  },
};

export const aboutWho = {
  eyebrow: 'BİZ KİMİZ?',
  // Yeniden ifade — eski başlık "Ajans Değil, Dijital Büyüme Sistemleri Kuran Bir Partneriz".
  title: 'Bir Hizmet Sağlayıcıdan Fazlası: Global Büyüme Partneri.',
  // Birebir kaynak (AboutContent "Biz Kimiz?" 2. paragraf).
  body: 'Bizim yaklaşımımızda strateji, teknoloji, yapay zeka, otomasyon, içerik, reklam ve operasyon birbirinden kopuk işler değildir. Her biri işletmenin büyümesini destekleyen aynı sistemin parçasıdır.',
  // Kaynak partner cümlesi; yalnızca "dijital" niteleyicisi yeni konumlandırma gereği çıkarıldı.
  partner:
    'Bu yüzden markalarla yalnızca proje teslim eden bir ekip gibi değil; büyüme sistemini birlikte kuran, yöneten ve geliştiren bir partner gibi çalışırız.',
  roles: ['Kurar', 'Yönetir', 'Geliştirir'],
};

// Kısa, şirket içi rol açıklamaları (hizmet listesi değil). /hizmetler'deki 4 yetkinlikle aynı yapı.
export const aboutCapabilities = [
  { en: 'Strategy', title: 'Strateji', desc: 'Markanın hangi pazarda, hangi kanalda ve hangi konumda büyüyeceğine karar verdiğimiz katman.' },
  { en: 'Commerce', title: 'Ticaret', desc: 'Pazaryerlerinde, kendi mağazasında ve B2B kanallarında satışın kurulduğu katman.' },
  { en: 'Technology', title: 'Teknoloji', desc: 'Commerce altyapısı, otomasyon ve entegrasyonlarla sistemi birbirine bağlayan katman.' },
  { en: 'Operations', title: 'Operasyon', desc: 'Reklam, içerik ve günlük yürütmeyi veriyle sürekli geliştirdiğimiz katman.' },
];
export const aboutDataLayer =
  'Dört yetkinliğin içinde birlikte çalışan yatay katman: veri, raporlama, içerik, otomasyon ve karar desteği.';

// Prensipler (id="prensipler" — ileride /farkimiz buraya yönlenecek). 6 konsolide prensip;
// açıklamalar birebir kaynak metin.
export const aboutPrinciples = [
  {
    n: '01',
    title: 'Üründen Başlarız',
    desc: 'Satış kanalını seçmeden önce ürünü, hedef alıcıyı ve işletmenin kapasitesini birlikte değerlendiririz. Hazır paketlerle başlamayız; mevcut dijital yapıyı ve büyüme potansiyelini de bu değerlendirmeye katarız.',
    source: '/farkimiz',
  },
  {
    n: '02',
    title: 'Stratejiyi Hizmetten Önce Kurarız',
    desc: 'Önce hangi kanalın, hangi ürünün, hangi hedef pazarın ve hangi mesajın doğru olduğunu belirleriz. Hizmetleri bu stratejiye göre konumlandırırız.',
    source: '/farkimiz',
  },
  {
    n: '03',
    title: 'Ticareti Bir Bütün Olarak Ele Alırız',
    desc: 'Ürün sunumu, fiyatlandırma, dijital altyapı ve operasyon kararlarını birbirinden koparmayız. İçerik, reklam ve otomasyonu da aynı sistemin parçası olarak kurgularız.',
    source: '/hakkimizda',
  },
  {
    n: '04',
    title: 'Teknolojiyi İhtiyaca Göre Seçeriz',
    desc: 'Hazır araçları, özel geliştirmeyi ve otomasyonu işin gerektirdiği ölçüde bir araya getiririz. Shopify, headless commerce ve pazaryeri sistemleri bizim için tek başına hedef değil, araçtır.',
    source: '/farkimiz',
  },
  {
    n: '05',
    title: 'Yapay Zekâ, Günlük Çalışma Biçimimizin Bir Parçası',
    desc: 'Araştırma, içerik ve görsel hazırlama, yazılım geliştirme ve süreç tasarımı çalışmalarımızda yapay zekâdan aktif olarak yararlanıyoruz. Üretilen çıktıları ürünün gerçekleri, marka dili ve işin ihtiyaçlarıyla karşılaştırarak değerlendiriyoruz.',
    source: '/farkimiz',
  },
  {
    n: '06',
    title: 'Veriye Göre Karar Verir, Sürekli Geliştiririz',
    desc: 'Trafik, dönüşüm, reklam, satış, kullanıcı davranışı ve operasyon verilerini takip ederek sistemi düzenli olarak iyileştiririz.',
    source: '/farkimiz',
  },
];

// Birebir kaynak (AboutContent "GloventGlobal Bugün").
export const aboutToday =
  'Amazon, Etsy, eBay, Shopify ve B2B projelerinde edindiğimiz deneyimleri; üreticilerden toptan firmalara, e-ticaret markalarından global pazara açılmak isteyen işletmelere kadar farklı yapılara uygulanabilir dijital büyüme sistemleri kurmak için kullanıyoruz.';
export const aboutProofServiceSlugs = ['amazon', 'shopify', 'b2b-dijital-showroom'];

// Birebir kaynak (AboutContent "Kimlerle Çalışmayı Seviyoruz?").
export const aboutAudience = {
  eyebrow: 'Kimlerle Çalışıyoruz?',
  title: 'Sistemli Büyümek İsteyen Markalarla Çalışıyoruz',
  description:
    'GloventGlobal; dijitalde büyümeyi yalnızca kısa vadeli satış hedefi olarak değil, işletmenin uzun vadeli yapısını güçlendiren bir süreç olarak gören markalarla çalışmayı tercih eder.',
  segments: [
    { n: '01', title: 'Üreten Markalar', desc: 'Ürününü dijital kanallarda daha doğru sunmak, görünürlüğünü artırmak ve yeni satış yapıları kurmak isteyen üreticiler.' },
    { n: '02', title: 'Toptan ve B2B İşletmeler', desc: 'Ürün sunumu, teklif, katalog, bayi ve müşteri süreçlerini dijitalleştirmek isteyen toptan satış yapan firmalar.' },
    { n: '03', title: 'E-Ticaretini Büyütmek İsteyen Markalar', desc: 'Pazaryeri, web sitesi, reklam, içerik ve operasyon süreçlerini daha yönetilebilir hale getirmek isteyen işletmeler.' },
    { n: '04', title: 'Global Pazara Açılmak İsteyenler', desc: 'Amazon, Etsy, eBay, Shopify veya farklı dijital kanallar üzerinden yeni pazarlara kontrollü şekilde açılmak isteyen markalar.' },
    { n: '05', title: 'Sistem Kurmaya Hazır İşletmeler', desc: 'Tek seferlik çözümler yerine, ölçülebilir ve geliştirilebilir bir dijital büyüme sistemi kurmak isteyen işletmeler.' },
  ],
};

export const aboutCta = {
  title: 'Global Büyüme Sisteminizi Birlikte Kuralım.',
  // Kaynak final CTA metni; yalnızca "dijital" niteleyicisi yeni konumlandırma gereği çıkarıldı.
  description:
    'Her işletmenin ihtiyacı farklıdır. GloventGlobal; işletmenizin mevcut yapısını analiz eder, hedeflerinize uygun stratejiyi oluşturur ve sürdürülebilir büyüme sisteminizi birlikte kurar.',
};
