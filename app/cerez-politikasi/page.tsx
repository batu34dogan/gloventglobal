import type { Metadata } from 'next';
import LegalPageLayout from '@/components/legal/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Çerez Politikası | GloventGlobal',
  description: 'GloventGlobal sitesinde kullanılan zorunlu çerezler ve analitik takip teknolojilerinin açıklaması.',
};

export default function CerezPolitikasiPage() {
  return (
    <LegalPageLayout title="Çerez Politikası">
      <p>
        GloventGlobal internet sitesi, kullanım deneyimini sağlamak ve sitenin nasıl kullanıldığını ölçmek
        amacıyla sınırlı sayıda çerez ve benzeri takip teknolojisi kullanır.
      </p>
      <p>
        <strong className="text-white">Zorunlu Çerezler:</strong> Sitenin temel işlevlerinin (sayfa gezinme,
        form alanlarının doğru çalışması gibi) çalışabilmesi için gerekli olan çerezlerdir.
      </p>
      <p>
        <strong className="text-white">Analitik Araçlar:</strong> Hangi sayfaların ziyaret edildiğini, hangi
        butonların kullanıldığını anlamak için temel analitik ölçüm araçları kullanılabilir. Bu ölçümler
        siteyi geliştirmek amacıyla kullanılır.
      </p>
      <p>
        Tarayıcı ayarlarınız üzerinden çerezleri yönetebilir veya engelleyebilirsiniz; ancak bu durumda sitenin
        bazı bölümleri beklendiği gibi çalışmayabilir.
      </p>
    </LegalPageLayout>
  );
}