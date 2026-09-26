'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';
import { focusRing } from '@/components/redesign/service-detail/RDServiceDetailPrimitives';
import {
  CONTACT_LIMITS,
  CONTACT_SUBJECTS,
  normalizeContactInput,
  validateContact,
  type ContactErrors,
  type ContactField,
} from '@/lib/leads/contact';
import { contactFacts } from './contactData';

// Doğrudan İletişim formu → POST /api/contact-lead. Client doğrulaması yalnızca kullanıcı deneyimi
// içindir; yetkili doğrulama server'da (aynı lib/leads/contact kuralları). Analiz quiz'inden bağımsız.
// analyticsPrefix: preview'de 'redesign_', production'da '' (location: iletisim_form).

type Status = 'idle' | 'submitting' | 'success' | 'error';

const EMPTY = { fullName: '', company: '', email: '', phone: '', subject: '', message: '' };
const FIELD_ORDER: ContactField[] = ['fullName', 'company', 'contactMethod', 'email', 'phone', 'subject', 'message'];
const FOCUS_TARGET: Record<ContactField, string> = {
  fullName: 'ct-fullName', company: 'ct-company', contactMethod: 'ct-email', email: 'ct-email', phone: 'ct-phone', subject: 'ct-subject', message: 'ct-message',
};

export default function RDContactForm({ analyticsPrefix = '' }: { analyticsPrefix?: string }) {
  const [values, setValues] = useState(EMPTY);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [hp, setHp] = useState(''); // gerçek honeypot
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  const set = (field: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const v = e.target.value;
    setValues((prev) => ({ ...prev, [field]: v }));
    // Alan düzeltilince o alanın (ve e-posta/telefon için ortak) hatasını temizle
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field as ContactField];
      if (field === 'email' || field === 'phone') delete next.contactMethod;
      return next;
    });
  };

  const focusFirstError = (errs: ContactErrors) => {
    const first = FIELD_ORDER.find((f) => errs[f]);
    if (first) document.getElementById(FOCUS_TARGET[first])?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;
    setServerMessage(null);

    const input = normalizeContactInput({ contact: values, subject: values.subject, message: values.message, marketingConsent });
    const clientErrors = validateContact(input);
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length > 0) {
      focusFirstError(clientErrors);
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/contact-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact: { fullName: input.fullName, company: input.company, email: input.email, phone: input.phone },
          subject: input.subject,
          message: input.message,
          marketingConsent,
          pageUrl: window.location.href,
          _hp: hp,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        trackEvent('contact_form_submit_success', { location: `${analyticsPrefix}iletisim_form`, subject: input.subject || 'belirtilmedi' });
        setStatus('success');
        setValues(EMPTY);
        setMarketingConsent(false);
        setErrors({});
        return;
      }
      if (res.status === 400 && data.errors) {
        setErrors(data.errors as ContactErrors);
        setStatus('error');
        setServerMessage('Lütfen işaretli alanları kontrol edin.');
        focusFirstError(data.errors as ContactErrors);
        return;
      }
      setStatus('error');
      setServerMessage(
        res.status === 429
          ? 'Çok fazla deneme yapıldı. Lütfen birkaç dakika sonra tekrar deneyin.'
          : 'Mesajınız şu anda gönderilemedi. Lütfen tekrar deneyin veya info@gloventglobal.com adresinden bize ulaşın.',
      );
    } catch {
      setStatus('error');
      setServerMessage('Mesajınız şu anda gönderilemedi. Lütfen tekrar deneyin veya info@gloventglobal.com adresinden bize ulaşın.');
    }
  };

  const labelCls = 'block text-[13.5px] font-semibold text-[#14213F]';
  const inputCls = (invalid: boolean) =>
    `mt-2 block w-full rounded-xl border bg-white px-4 py-3 text-[16px] text-[#14213F] outline-none transition-colors placeholder:text-[#8A8A96] focus:border-[#1B5CD6] focus:ring-4 focus:ring-[#1B5CD6]/15 ${
      invalid ? 'border-[#B42318]' : 'border-[#D6D6DC] hover:border-[#B8B8C2]'
    }`;
  const errText = (id: string, msg?: string) =>
    msg ? (
      <p id={id} className="mt-1.5 text-[13px] font-medium text-[#B42318]">
        {msg}
      </p>
    ) : null;
  const describe = (...ids: (string | false)[]) => ids.filter(Boolean).join(' ') || undefined;

  if (status === 'success') {
    return (
      <div role="status" aria-live="polite" className="rounded-3xl border border-[#E5E5EC] bg-white p-8 text-center sm:p-12">
        <span aria-hidden="true" className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#1B5CD6]/50 text-[#1B5CD6]">
          <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
            <path d="M4 10.5L8 14.5L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 ref={successRef} tabIndex={-1} className="mt-5 text-[1.5rem] font-extrabold text-[#14213F] outline-none">
          Mesajınız alındı.
        </h3>
        <p className="mx-auto mt-3 max-w-[44ch] text-[15.5px] leading-relaxed text-[#4A4A5A]">Bilgileriniz GloventGlobal ekibine iletildi.</p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className={`mt-7 inline-flex items-center rounded-full border border-[#D6D6DC] px-7 py-3 text-[15px] font-semibold text-[#14213F] transition-all hover:border-[#1B5CD6] hover:text-[#1B5CD6] ${focusRing}`}
        >
          Yeni mesaj gönder
        </button>
      </div>
    );
  }

  const submitting = status === 'submitting';
  return (
    <form noValidate onSubmit={handleSubmit} aria-describedby="ct-required-note" className="rounded-3xl border border-[#E5E5EC] bg-white p-6 sm:p-9">
      {/* Gerçek honeypot: görünmez (sr-only kırpma), tab sırasına girmez, ekran okuyucudan gizli. */}
      <div aria-hidden="true" className="sr-only">
        <label>
          Şirket web sitesi
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
        </label>
      </div>

      <p id="ct-required-note" className="text-[13px] text-[#5A5A6A]">
        <span aria-hidden="true">*</span> ile işaretli alanlar zorunludur. E-posta veya telefonun en az biri gereklidir.
      </p>

      {serverMessage && (
        <div role="alert" className="mt-5 rounded-xl border border-[#F3C9C5] bg-[#FEF3F2] px-4 py-3 text-[14px] font-medium text-[#912018]">
          {serverMessage.includes(contactFacts.email) ? (
            <>
              {serverMessage.split(contactFacts.email)[0]}
              <a href={`mailto:${contactFacts.email}`} className="underline underline-offset-2">{contactFacts.email}</a>
              {serverMessage.split(contactFacts.email)[1]}
            </>
          ) : (
            serverMessage
          )}
        </div>
      )}

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="ct-fullName" className={labelCls}>
            Ad Soyad <span aria-hidden="true" className="text-[#B42318]">*</span>
          </label>
          <input
            id="ct-fullName" name="fullName" type="text" autoComplete="name" required maxLength={CONTACT_LIMITS.fullName}
            value={values.fullName} onChange={set('fullName')} aria-invalid={!!errors.fullName} aria-describedby={describe(!!errors.fullName && 'ct-fullName-err')}
            className={inputCls(!!errors.fullName)}
          />
          {errText('ct-fullName-err', errors.fullName)}
        </div>
        <div>
          <label htmlFor="ct-company" className={labelCls}>
            Firma Adı <span aria-hidden="true" className="text-[#B42318]">*</span>
          </label>
          <input
            id="ct-company" name="company" type="text" autoComplete="organization" required maxLength={CONTACT_LIMITS.company}
            value={values.company} onChange={set('company')} aria-invalid={!!errors.company} aria-describedby={describe(!!errors.company && 'ct-company-err')}
            className={inputCls(!!errors.company)}
          />
          {errText('ct-company-err', errors.company)}
        </div>
        <div>
          <label htmlFor="ct-email" className={labelCls}>E-posta</label>
          <input
            id="ct-email" name="email" type="email" inputMode="email" autoComplete="email" maxLength={CONTACT_LIMITS.email}
            value={values.email} onChange={set('email')} aria-invalid={!!(errors.email || errors.contactMethod)}
            aria-describedby={describe(!!errors.email && 'ct-email-err', !!errors.contactMethod && 'ct-method-err')}
            className={inputCls(!!(errors.email || errors.contactMethod))}
          />
          {errText('ct-email-err', errors.email)}
        </div>
        <div>
          <label htmlFor="ct-phone" className={labelCls}>Telefon</label>
          <input
            id="ct-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={CONTACT_LIMITS.phone}
            value={values.phone} onChange={set('phone')} aria-invalid={!!(errors.phone || errors.contactMethod)}
            aria-describedby={describe(!!errors.phone && 'ct-phone-err', !!errors.contactMethod && 'ct-method-err')}
            className={inputCls(!!(errors.phone || errors.contactMethod))}
          />
          {errText('ct-phone-err', errors.phone)}
        </div>
        {errors.contactMethod && (
          <p id="ct-method-err" className="-mt-2 text-[13px] font-medium text-[#B42318] md:col-span-2">
            {errors.contactMethod}
          </p>
        )}
        <div className="md:col-span-2">
          <label htmlFor="ct-subject" className={labelCls}>Konu / İlgilendiğiniz Alan</label>
          <select
            id="ct-subject" name="subject" value={values.subject} onChange={set('subject')}
            aria-invalid={!!errors.subject} aria-describedby={describe(!!errors.subject && 'ct-subject-err')}
            className={`${inputCls(!!errors.subject)} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='%2371717D' stroke-width='1.8'%3E%3Cpath d='M5 7.5l5 5 5-5'/%3E%3C/svg%3E")] bg-[length:18px] bg-[right_14px_center] bg-no-repeat pr-11`}
          >
            <option value="">Seçiniz (opsiyonel)</option>
            {CONTACT_SUBJECTS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errText('ct-subject-err', errors.subject)}
        </div>
        <div className="md:col-span-2">
          <label htmlFor="ct-message" className={labelCls}>
            Mesaj <span aria-hidden="true" className="text-[#B42318]">*</span>
          </label>
          <textarea
            id="ct-message" name="message" required rows={6} maxLength={CONTACT_LIMITS.message}
            value={values.message} onChange={set('message')} aria-invalid={!!errors.message} aria-describedby={describe(!!errors.message && 'ct-message-err')}
            className={`${inputCls(!!errors.message)} resize-y`}
          />
          {errText('ct-message-err', errors.message)}
        </div>
      </div>

      <div className="mt-6 flex items-start gap-3">
        <input
          id="ct-consent" name="marketingConsent" type="checkbox" checked={marketingConsent} onChange={(e) => setMarketingConsent(e.target.checked)}
          className="mt-0.5 h-5 w-5 shrink-0 rounded border-[#B8B8C2] accent-[#1B5CD6]"
        />
        <label htmlFor="ct-consent" className="text-[13.5px] leading-relaxed text-[#4A4A5A]">
          GloventGlobal’in hizmetler ve büyüme içerikleri hakkında e-posta ve telefon yoluyla benimle iletişime geçmesini kabul ediyorum. (Opsiyonel)
        </label>
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={submitting}
          aria-disabled={submitting}
          className={`inline-flex w-full items-center justify-center rounded-full bg-[#14213F] px-8 py-3.5 text-[15.5px] font-semibold text-white transition-all hover:bg-[#1B5CD6] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto ${focusRing}`}
        >
          {submitting ? 'Gönderiliyor…' : 'Mesajı Gönder'}
        </button>
      </div>
      <p className="mt-4 text-[12.5px] leading-relaxed text-[#5A5A6A]">
        Formu göndererek bilgilerinizin talebinizin değerlendirilmesi ve sizinle iletişime geçilmesi amacıyla işlenmesini kabul etmiş
        olursunuz. Detaylı bilgi için{' '}
        <Link href="/kvkk" className={`rounded font-semibold text-[#1B5CD6] underline underline-offset-2 hover:text-[#14213F] ${focusRing}`}>KVKK Aydınlatma Metni</Link>{' '}
        ve{' '}
        <Link href="/gizlilik-politikasi" className={`rounded font-semibold text-[#1B5CD6] underline underline-offset-2 hover:text-[#14213F] ${focusRing}`}>Gizlilik Politikası</Link>
        ’nı inceleyebilirsiniz.
      </p>
    </form>
  );
}
