// /redesign/iletisim içerik kaynağı.
// - İletişim bilgileri yalnızca doğrulanmış kaynaklardan: RDFooter (info@gloventglobal.com,
//   İstanbul, Türkiye, Instagram) ve components/seo/organizationSchema.ts. Telefon/WhatsApp/adres
//   kaynakta olmadığı için kullanılmıyor.
// - "Ücretsiz Analiz" açıklaması mevcut quiz'in gerçek davranışından (kısa sorular → ön
//   değerlendirme → öncelikli sistem önerileri) türetildi.
// - Yanıt süresi vaadi YOK (genel iletişim için kaynakta doğrulanmış bir süre bulunmuyor).

export const contactHero = {
  eyebrow: 'İLETİŞİM',
  title: 'Birlikte Ne Kurabileceğimizi Konuşalım.',
  description:
    'Yeni bir proje, global büyüme planı ya da mevcut sistemlerinizin geliştirilmesi için bize doğrudan yazabilir veya ücretsiz analizle başlayabilirsiniz.',
};

export const contactIntents = {
  analysis: {
    n: '01',
    title: 'Ücretsiz Analiz',
    desc: 'İşletmenizi ve büyüme ihtiyacınızı birkaç kısa soruyla değerlendirin; cevaplarınıza göre ön değerlendirme ve öncelikli sistem önerilerini görün.',
    cta: 'Ücretsiz Analiz Al →',
  },
  direct: {
    n: '02',
    title: 'Doğrudan İletişim',
    desc: 'Proje, iş birliği, mevcut çalışmamız veya genel bir sorunuz için formu doldurun; mesajınız doğrudan GloventGlobal ekibine iletilsin.',
    cta: 'Mesaj Gönder',
  },
};

export const CONTACT_FORM_ID = 'iletisim-formu';

export const contactFacts = {
  email: 'info@gloventglobal.com',
  location: 'İstanbul, Türkiye',
  instagramUrl: 'https://www.instagram.com/gloventglobal',
  instagramHandle: '@gloventglobal',
};
