import type { Metadata } from 'next';
import LegalPageLayout from '@/components/legal/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Çerez Politikası | GloventGlobal',
  description: 'GloventGlobal sitesinde kullanılan zorunlu çerezler, analitik çerezler ve çerez tercihlerinin yönetimi hakkında açıklama.',
};

const sectionTitleClass = 'mt-2 text-lg font-semibold text-white';

export default function CerezPolitikasiPage() {
  return (
    <LegalPageLayout title="Çerez Politikası">
      <h2 className={sectionTitleClass}>Çerez Nedir?</h2>
      <p>
        Çerezler, bir internet sitesini ziyaret ettiğinizde tarayıcınıza kaydedilen küçük metin
        dosyalarıdır. Sitenin düzgün çalışmasını sağlamak ve kullanım deneyimini ölçmek için kullanılır.
      </p>

      <h2 className={sectionTitleClass}>Kullanılan Çerez Türleri</h2>
      <p>
        GloventGlobal sitesinde sınırlı sayıda zorunlu çerez ve analitik amaçlı takip teknolojisi
        kullanılmaktadır.
      </p>

      <h2 className={sectionTitleClass}>Zorunlu Çerezler</h2>
      <p>
        Sitenin temel işlevlerinin (sayfa gezinme, form alanlarının doğru çalışması, çerez tercihinizin
        hatırlanması gibi) çalışabilmesi için gerekli olan çerezlerdir.
      </p>

      <h2 className={sectionTitleClass}>Analitik Çerezler</h2>
      <p>
        Hangi sayfaların ziyaret edildiğini, hangi butonların kullanıldığını anlamak için temel analitik ölçüm
        araçları kullanılabilir. Bu ölçümler siteyi geliştirmek amacıyla kullanılır.
      </p>

      <h2 className={sectionTitleClass}>Çerez Tercihleri</h2>
      <p>
        Siteyi ilk ziyaretinizde karşınıza çıkan çerez bildirimi üzerinden &quot;Kabul Et&quot; veya
        &quot;Reddet&quot; seçeneklerinden birini seçerek tercihinizi belirtebilirsiniz.
      </p>

      <h2 className={sectionTitleClass}>Çerezleri Yönetme</h2>
      <p>
        Tarayıcı ayarlarınız üzerinden çerezleri yönetebilir veya engelleyebilirsiniz; ancak bu durumda
        sitenin bazı bölümleri beklendiği gibi çalışmayabilir.
      </p>

      <h2 className={sectionTitleClass}>İletişim</h2>
      <p>
        Çerez politikamızla ilgili sorularınız için{' '}
        <a href="mailto:info@gloventglobal.com" className="underline hover:text-blue-200">
          info@gloventglobal.com
        </a>{' '}
        adresinden bize ulaşabilirsiniz.
      </p>
    </LegalPageLayout>
  );
}