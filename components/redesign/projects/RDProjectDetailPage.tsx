import Image from 'next/image';
import Link from 'next/link';
import RDNavbar from '@/components/redesign/RDNavbar';
import RDFooter from '@/components/redesign/RDFooter';
import { focusRing, sectionShell } from '@/components/redesign/service-detail/RDServiceDetailPrimitives';
import RDProjectCTA from './RDProjectCTA';
import type { ProjectDetail } from './projectDetails';

// Proje detay sayfası — kompakt, editoryal akış: başlık + kısa metin + ince ayırıcılı bölümler.
// Ekran görüntüsü yok (projede doğrulanmış görsel bulunmuyor); yalnız markanın gerçek logosu, küçük
// bir yüzeyde. Sonuç/metrik/yorum yok. Metinler projectDetails.ts'ten gelir.
export default function RDProjectDetailPage({ project }: { project: ProjectDetail }) {
  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-geist-sans),system-ui,sans-serif' }}>
      <RDNavbar />
      <main>
        <section className="bg-white pb-12 pt-28 sm:pb-16 sm:pt-32">
          <div className={sectionShell}>
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12.5px] font-medium text-[#6A6A7A]">
                <li>
                  <Link href="/" className={`rounded transition-colors hover:text-[#1B5CD6] ${focusRing}`}>Ana Sayfa</Link>
                </li>
                <li aria-hidden="true" className="text-[#B8B8C2]">/</li>
                <li>
                  <Link href="/#hikayeler" className={`rounded transition-colors hover:text-[#1B5CD6] ${focusRing}`}>Seçili çalışmalar</Link>
                </li>
                <li aria-hidden="true" className="text-[#B8B8C2]">/</li>
                <li aria-current="page" className="text-[#14213F]">{project.brand}</li>
              </ol>
            </nav>

            <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:items-center lg:gap-16">
              <div>
                <p className="text-[11.5px] font-bold uppercase tracking-[0.22em] text-[#1B5CD6]">{project.tagline}</p>
                <h1 className="mt-4 max-w-[22ch] text-[2rem] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#14213F] sm:text-[2.8rem] lg:text-[3.1rem]">
                  {project.title}
                </h1>
                <p className="mt-6 max-w-[60ch] text-[16px] leading-relaxed text-[#4A4A5A] sm:text-[17.5px]">{project.intro}</p>
              </div>
              {/* Kompakt logo yüzeyi — büyük boş alan yok */}
              <div
                className="relative flex h-[140px] items-center justify-center overflow-hidden rounded-2xl ring-1 ring-inset ring-black/5 sm:h-[180px] lg:h-[220px]"
                style={{ background: project.tone }}
              >
                <Image
                  src={project.logo.src}
                  alt={`${project.brand} logosu`}
                  width={project.logo.width}
                  height={project.logo.height}
                  sizes="(min-width: 1024px) 240px, 50vw"
                  priority
                  className="h-auto w-auto object-contain"
                  style={{ maxWidth: `${project.logo.maxWidthPct}%`, maxHeight: '58%' }}
                />
              </div>
            </div>
          </div>
        </section>

        <div className="border-t border-[#E5E5EC] bg-[#FAF9F6] py-4 sm:py-8">
          {project.facts && (
            <section aria-labelledby="pj-facts" className={sectionShell}>
              <div className="grid gap-4 py-10 sm:py-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
                <h2 id="pj-facts" className="text-[1.45rem] font-extrabold leading-tight tracking-tight text-[#14213F] sm:text-[1.75rem]">
                  Proje bilgileri
                </h2>
                <dl className="border-b border-[#E3DDD1]">
                  {project.facts.map((f) => (
                    <div key={f.label} className="grid gap-1 border-t border-[#E3DDD1] py-3.5 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:gap-6">
                      <dt className="text-[11.5px] font-bold uppercase tracking-[0.18em] text-[#84683E] sm:pt-1">{f.label}</dt>
                      <dd className="text-[16px] font-semibold leading-snug text-[#14213F]">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </section>
          )}
          {project.sections.map((s, i) => (
            <section key={s.title} aria-labelledby={`pj-s${i}`} className={sectionShell}>
              <div className={`grid gap-4 py-10 sm:py-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20 ${i > 0 || project.facts ? 'border-t border-[#E3DDD1]' : ''}`}>
                <h2 id={`pj-s${i}`} className="text-[1.45rem] font-extrabold leading-tight tracking-tight text-[#14213F] sm:text-[1.75rem]">
                  {s.title}
                </h2>
                {s.kind === 'text' ? (
                  <div>
                    <p className="max-w-[62ch] text-[16px] leading-relaxed text-[#2F3547] sm:text-[17px]">{s.body}</p>
                    {s.note && <p className="mt-4 max-w-[62ch] text-[14px] leading-relaxed text-[#6A6A7A]">{s.note}</p>}
                    {s.link && (
                      <Link href={s.link.href} className={`mt-5 inline-flex rounded text-[15px] font-semibold text-[#1B5CD6] transition-colors hover:text-[#14213F] ${focusRing}`}>
                        {s.link.label}
                      </Link>
                    )}
                  </div>
                ) : (
                  <ul className="border-b border-[#E3DDD1]">
                    {s.rows.map((r) => (
                      <li key={r.title} className="grid gap-1.5 border-t border-[#E3DDD1] py-4 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:gap-6 sm:py-5">
                        <h3 className="text-[16px] font-bold leading-snug text-[#14213F]">{r.title}</h3>
                        <p className="text-[15px] leading-relaxed text-[#4A4A5A] sm:text-[15.5px]">{r.desc}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
          {project.closing && (
            <div className={sectionShell}>
              {/* Kapanış vurgusu — şirketin kendi ifadesi; alıntı/testimonial biçimi değil. */}
              <div className="border-t border-[#E3DDD1] py-10 sm:py-12 lg:grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
                <span aria-hidden="true" className="hidden lg:block" />
                <p className="max-w-[40ch] text-[1.3rem] font-bold leading-snug tracking-tight text-[#14213F] sm:text-[1.55rem]">
                  <span aria-hidden="true" className="mb-4 block h-[2px] w-12 rounded-full bg-gradient-to-r from-[#1B5CD6] to-[#C9A876]" />
                  {project.closing}
                </p>
              </div>
            </div>
          )}
          <div className={`${sectionShell} pb-8 pt-2 sm:pb-10`}>
            <Link href="/#hikayeler" className={`inline-flex rounded text-[15px] font-semibold text-[#14213F] transition-colors hover:text-[#1B5CD6] ${focusRing}`}>
              ← Seçili çalışmalara dön
            </Link>
          </div>
        </div>

        <section aria-labelledby="pj-cta" className="bg-[#0F1E3C] py-14 sm:py-20">
          <div className="mx-auto max-w-[760px] px-6 text-center sm:px-10">
            <span aria-hidden="true" className="mx-auto mb-6 block h-px w-16 bg-gradient-to-r from-[#1B5CD6] to-[#C9A876]" />
            <h2 id="pj-cta" className="text-[1.9rem] font-extrabold leading-tight tracking-tight text-white sm:text-[2.4rem]">
              Benzer bir ihtiyacınız mı var?
            </h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-[15.5px] leading-relaxed text-white/65">
              Ürününüzü, satış kanalınızı ve operasyonunuzu birlikte değerlendirelim.
            </p>
            <div className="mt-8">
              <RDProjectCTA slug={project.slug} />
            </div>
          </div>
        </section>
      </main>
      <RDFooter />
    </div>
  );
}
