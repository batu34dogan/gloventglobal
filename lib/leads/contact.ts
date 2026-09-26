// Genel iletişim formu (Doğrudan İletişim) için ortak alan tanımları ve doğrulama. Saf fonksiyonlar —
// hem /api/contact-lead (yetkili, server-side) hem de form (kullanıcı deneyimi için client-side)
// aynı kuralları kullanır. Burada gizli bilgi yok; client bundle'a girmesi güvenli.

// Yalnızca iletişim yönlendirme etiketleri — yeni hizmet iddiası değil.
export const CONTACT_SUBJECTS = [
  'Global Büyüme',
  'E-Ticaret / Pazaryerleri',
  'Web / Teknoloji',
  'Yapay Zeka / Otomasyon',
  'Reklam / Büyüme',
  'İş Birliği',
  'Diğer',
] as const;

export const CONTACT_LIMITS = {
  fullName: 120,
  company: 160,
  email: 254,
  phone: 40,
  subject: 160,
  message: 3000,
  pageUrl: 500,
} as const;

export type ContactInput = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  marketingConsent: boolean;
};

export type ContactField = 'fullName' | 'company' | 'email' | 'phone' | 'contactMethod' | 'subject' | 'message';
export type ContactErrors = Partial<Record<ContactField, string>>;

// Pragmatik e-posta kontrolü (RFC'nin tamamı değil): tek @, boşluk yok, alan adında nokta.
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Telefon: rakam, boşluk, +, -, (, ) — en az 7 rakam.
export const PHONE_RE = /^[+\d\s\-()]+$/;

const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');

export function normalizeContactInput(raw: Record<string, unknown>): ContactInput {
  const contact = (raw.contact && typeof raw.contact === 'object' ? raw.contact : {}) as Record<string, unknown>;
  return {
    fullName: str(contact.fullName),
    company: str(contact.company),
    email: str(contact.email),
    phone: str(contact.phone),
    subject: str(raw.subject),
    message: str(raw.message),
    marketingConsent: raw.marketingConsent === true,
  };
}

export function validateContact(input: ContactInput): ContactErrors {
  const e: ContactErrors = {};
  if (!input.fullName) e.fullName = 'Lütfen ad soyad alanını doldurun.';
  else if (input.fullName.length > CONTACT_LIMITS.fullName) e.fullName = `Ad soyad en fazla ${CONTACT_LIMITS.fullName} karakter olabilir.`;

  if (!input.company) e.company = 'Lütfen firma adı alanını doldurun.';
  else if (input.company.length > CONTACT_LIMITS.company) e.company = `Firma adı en fazla ${CONTACT_LIMITS.company} karakter olabilir.`;

  if (!input.email && !input.phone) e.contactMethod = 'Lütfen e-posta veya telefon alanlarından en az birini doldurun.';
  if (input.email) {
    if (input.email.length > CONTACT_LIMITS.email || !EMAIL_RE.test(input.email)) e.email = 'Lütfen geçerli bir e-posta adresi girin.';
  }
  if (input.phone) {
    const digits = input.phone.replace(/\D/g, '').length;
    if (input.phone.length > CONTACT_LIMITS.phone || !PHONE_RE.test(input.phone) || digits < 7) e.phone = 'Lütfen geçerli bir telefon numarası girin.';
  }

  if (input.subject && !(CONTACT_SUBJECTS as readonly string[]).includes(input.subject)) e.subject = 'Lütfen listeden bir konu seçin.';

  if (!input.message) e.message = 'Lütfen mesajınızı yazın.';
  else if (input.message.length > CONTACT_LIMITS.message) e.message = `Mesaj en fazla ${CONTACT_LIMITS.message} karakter olabilir.`;
  return e;
}
