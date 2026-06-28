import type { Metadata } from 'next';
import LegalPageLayout from '@/components/legal/LegalPageLayout';

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni | GloventGlobal',
  description: 'GloventGlobal’ın iletişim ve analiz formları üzerinden topladığı kişisel verilerin hangi amaçla işlendiğini açıklayan KVKK aydınlatma metni.',
};

export default function KvkkPage() {
  return (
    <LegalPageLayout title="KVKK Aydınlatma Metni">
      <p>
        GloventGlobal olarak, internet sitemizdeki iletişim formu ve ücretsiz analiz formu üzerinden bizimle
        paylaştığınız ad soyad, firma adı, telefon, e-posta, web sitesi / mağaza linki ve mesaj bilgilerinizi
        6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında işliyoruz.
      </p>
      <p>
        Paylaştığınız bilgiler; talebinizin değerlendirilmesi, sizinle iletişime geçilmesi, ön analiz sürecinin
        yürütülmesi, hizmet sunumu ve gerekli kayıtların takip edilmesi amacıyla kullanılır. Bilgileriniz bu
        amaçlar dışında kullanılmaz.
      </p>
      <p>
        Verileriniz, yalnızca yukarıdaki amaçların gerçekleştirilmesi için gerekli süre boyunca saklanır ve
        yasal zorunluluklar dışında üçüncü kişilerle paylaşılmaz.
      </p>
      <p>
        KVKK kapsamında kişisel verilerinize ilişkin bilgi talep etme, düzeltme veya silinmesini isteme
        haklarına sahipsiniz. Bu haklarınızı kullanmak için bizimle iletişim sayfamız üzerinden iletişime
        geçebilirsiniz.
      </p>
    </LegalPageLayout>
  );
}