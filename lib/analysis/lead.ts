// Analiz lead formu için ortak alan tanımları ve doğrulama. Saf fonksiyonlar — hem /api/analysis-lead
// (yetkili, server-side) hem AnalysisFlow formu (kullanıcı deneyimi) aynı kuralları kullanır. E-posta /
// telefon kuralları iletişim formuyla (lib/leads/contact) aynı. Gizli bilgi yok; client'a girmesi güvenli.
import { CONTACT_LIMITS, EMAIL_RE, PHONE_RE } from '@/lib/leads/contact';

export const ANALYSIS_LEAD_SOURCES = ['analysis-widget', 'analysis-page', 'contact-page'] as const;
export type AnalysisLeadSource = (typeof ANALYSIS_LEAD_SOURCES)[number];

export function isAnalysisLeadSource(v: unknown): v is AnalysisLeadSource {
  return typeof v === 'string' && (ANALYSIS_LEAD_SOURCES as readonly string[]).includes(v);
}

export const ANALYSIS_LIMITS = {
  fullName: CONTACT_LIMITS.fullName,
  company: CONTACT_LIMITS.company,
  email: CONTACT_LIMITS.email,
  phone: CONTACT_LIMITS.phone,
  website: 300,
  notes: 2000,
  pageUrl: CONTACT_LIMITS.pageUrl,
} as const;

export type AnalysisContact = {
  fullName: string;
  company: string;
  phone: string;
  email: string;
  website: string;
  notes: string;
};

export type AnalysisField = 'fullName' | 'company' | 'contactMethod' | 'email' | 'phone' | 'website' | 'notes';
export type AnalysisErrors = Partial<Record<AnalysisField, string>>;

const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');

export function normalizeAnalysisContact(raw: unknown): AnalysisContact {
  const c = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  return {
    fullName: str(c.fullName),
    company: str(c.company),
    phone: str(c.phone),
    email: str(c.email),
    website: str(c.website),
    notes: str(c.notes),
  };
}

export function validateAnalysisContact(input: AnalysisContact): AnalysisErrors {
  const e: AnalysisErrors = {};
  const L = ANALYSIS_LIMITS;
  if (!input.fullName) e.fullName = 'Lütfen ad soyad alanını doldurun.';
  else if (input.fullName.length > L.fullName) e.fullName = `Ad soyad en fazla ${L.fullName} karakter olabilir.`;

  if (!input.company) e.company = 'Lütfen firma adı alanını doldurun.';
  else if (input.company.length > L.company) e.company = `Firma adı en fazla ${L.company} karakter olabilir.`;

  if (!input.email && !input.phone) e.contactMethod = 'Lütfen telefon veya e-posta alanlarından en az birini doldurun.';
  if (input.email && (input.email.length > L.email || !EMAIL_RE.test(input.email))) e.email = 'Lütfen geçerli bir e-posta adresi girin.';
  if (input.phone) {
    const digits = input.phone.replace(/\D/g, '').length;
    if (input.phone.length > L.phone || !PHONE_RE.test(input.phone) || digits < 7) e.phone = 'Lütfen geçerli bir telefon numarası girin.';
  }

  if (input.website.length > L.website) e.website = `Link en fazla ${L.website} karakter olabilir.`;
  if (input.notes.length > L.notes) e.notes = `Not en fazla ${L.notes} karakter olabilir.`;
  return e;
}
