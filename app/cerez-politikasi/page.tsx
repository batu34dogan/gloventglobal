import RDLegalPage, { LegalLink, type LegalSection } from '@/components/redesign/legal/RDLegalPage';
import { LegalJsonLd, legalMetadata, type LegalPageMeta } from '@/components/redesign/legal/legalSeo';

const META: LegalPageMeta = {
  path: '/cerez-politikasi',
  name: 'Çerez Politikası',
  title: 'Çerez Politikası | GloventGlobal',
  description: 'GloventGlobal sitesinde kullanılan zorunlu çerezler, analitik çerezler ve çerez tercihlerinin yönetimi hakkında açıklama.',
};

export const metadata = legalMetadata(META);

// Hukuki metin önceki sürümle birebir aynı; onaylı tek değişiklik: tercih seçenekleri gerçek çerez
// bildirimindeki (components/legal/CookieConsent.tsx) buton adlarıyla eşitlendi —
// "Kabul Et" → "Tümünü Kabul Et", "Reddet" → "Sadece Zorunlu". Banner davranışı değişmedi.
const sections: LegalSection[] = [
  {
    id: 'cerez-nedir',
    heading: 'Çerez Nedir?',
    content: (
      <p>
        Çerezler, bir internet sitesini ziyaret ettiğinizde tarayıcınıza kaydedilen küçük metin
        dosyalarıdır. Sitenin düzgün çalışmasını sağlamak ve kullanım deneyimini ölçmek için kullanılır.
      </p>
    ),
  },
  {
    id: 'kullanilan-cerez-turleri',
    heading: 'Kullanılan Çerez Türleri',
    content: (
      <p>
        GloventGlobal sitesinde sınırlı sayıda zorunlu çerez ve analitik amaçlı takip teknolojisi
        kullanılmaktadır.
      </p>
    ),
  },
  {
    id: 'zorunlu-cerezler',
    heading: 'Zorunlu Çerezler',
    content: (
      <p>
        Sitenin temel işlevlerinin (sayfa gezinme, form alanlarının doğru çalışması, çerez tercihinizin
        hatırlanması gibi) çalışabilmesi için gerekli olan çerezlerdir.
      </p>
    ),
  },
  {
    id: 'analitik-cerezler',
    heading: 'Analitik Çerezler',
    content: (
      <p>
        Hangi sayfaların ziyaret edildiğini, hangi butonların kullanıldığını anlamak için temel analitik ölçüm
        araçları kullanılabilir. Bu ölçümler siteyi geliştirmek amacıyla kullanılır.
      </p>
    ),
  },
  {
    id: 'cerez-tercihleri',
    heading: 'Çerez Tercihleri',
    content: (
      <p>
        Siteyi ilk ziyaretinizde karşınıza çıkan çerez bildirimi üzerinden &quot;Tümünü Kabul Et&quot; veya
        &quot;Sadece Zorunlu&quot; seçeneklerinden birini seçerek tercihinizi belirtebilirsiniz.
      </p>
    ),
  },
  {
    id: 'cerezleri-yonetme',
    heading: 'Çerezleri Yönetme',
    content: (
      <p>
        Tarayıcı ayarlarınız üzerinden çerezleri yönetebilir veya engelleyebilirsiniz; ancak bu durumda
        sitenin bazı bölümleri beklendiği gibi çalışmayabilir.
      </p>
    ),
  },
  {
    id: 'iletisim',
    heading: 'İletişim',
    content: (
      <p>
        Çerez politikamızla ilgili sorularınız için{' '}
        <LegalLink href="mailto:info@gloventglobal.com">info@gloventglobal.com</LegalLink>{' '}
        adresinden bize ulaşabilirsiniz.
      </p>
    ),
  },
];

export default function CerezPolitikasiPage() {
  return (
    <>
      <LegalJsonLd {...META} />
      <RDLegalPage title="Çerez Politikası" sections={sections} />
    </>
  );
}
