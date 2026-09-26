import { contactFacts } from './contactData';

// Küçük navy panel — yalnızca doğrulanmış iletişim bilgileri (telefon/WhatsApp/adres yok).
export default function RDContactFacts() {
  const item = 'border-t border-white/10 py-5 first:border-t-0 first:pt-0 last:pb-0';
  const label = 'text-[11px] font-bold uppercase tracking-[0.22em] text-[#C9A876]';
  const link =
    'mt-1.5 inline-block break-words rounded text-[16px] font-semibold text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-[#C9A876] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';
  return (
    <aside aria-labelledby="ct-facts" className="relative overflow-hidden rounded-3xl bg-[#0F1E3C] p-6 sm:p-8">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1B5CD6] to-[#C9A876]" />
      <h3 id="ct-facts" className="text-[1.3rem] font-extrabold text-white">Doğrudan Ulaşın</h3>
      <dl className="mt-6">
        <div className={item}>
          <dt className={label}>E-posta</dt>
          <dd>
            <a href={`mailto:${contactFacts.email}`} className={link}>{contactFacts.email}</a>
          </dd>
        </div>
        <div className={item}>
          <dt className={label}>Konum</dt>
          <dd className="mt-1.5 text-[16px] font-semibold text-white">{contactFacts.location}</dd>
        </div>
        <div className={item}>
          <dt className={label}>Instagram</dt>
          <dd>
            <a href={contactFacts.instagramUrl} target="_blank" rel="noopener noreferrer" className={link}>
              {contactFacts.instagramHandle}
              <span className="sr-only"> (yeni sekmede açılır)</span>
            </a>
          </dd>
        </div>
      </dl>
    </aside>
  );
}
