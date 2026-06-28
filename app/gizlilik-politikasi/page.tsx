import type { Metadata } from 'next';
import LegalPageLayout from '@/components/legal/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası | GloventGlobal',
  description: 'GloventGlobal sitesinin form verileri, pazarlama izni, analytics, çerezler ve üçüncü taraf servisler konusundaki gizlilik politikası.',
};

const sectionTitleClass = 'mt-2 text-lg font-semibold text-white';

export default function GizlilikPolitikasiPage() {
  return (
    <LegalPageLayout title="Gizlilik Politikası">
      <p>
        Bu sayfa, GloventGlobal internet sitesini kullanırken hangi bilgilerin toplandığını ve nasıl
        kullanıldığını açıklar.
      </p>

      <h2 className={sectionTitleClass}>Toplanan Bilgiler</h2>
      <p>
        İletişim formu ve ücretsiz analiz formu üzerinden ad soyad, firma adı, telefon, e-posta, web sitesi /
        mağaza linki, mesaj/not ve analiz cevaplarınızı topluyoruz. Ayrıca site kullanımına ilişkin temel
        analitik bilgiler ve IP adresi gibi teknik veriler de toplanabilir.
      </p>

      <h2 className={sectionTitleClass}>Bilgilerin Kullanım Amaçları</h2>
      <p>
        Bu bilgiler; talebinizin değerlendirilmesi, sizinle iletişime geçilmesi, ön analiz hazırlanması, hizmet
        planlama, site deneyiminin iyileştirilmesi ve güvenlik amaçlarıyla kullanılır.
      </p>

      <h2 className={sectionTitleClass}>Form Verileri</h2>
      <p>
        İletişim ve ücretsiz analiz formlarını doldurduğunuzda paylaştığınız bilgiler, talebinizin
        değerlendirilmesi ve sizinle iletişime geçilmesi amacıyla işlenir. Detaylı bilgi için KVKK Aydınlatma
        Metni&apos;ni inceleyebilirsiniz.
      </p>

      <h2 className={sectionTitleClass}>Pazarlama İletişimi İzni</h2>
      <p>
        Formlarımızda yer alan pazarlama iletişimi onay kutusunu işaretlemeniz halinde, hizmetler,
        kampanyalar, dijital büyüme içerikleri ve bilgilendirmeler hakkında e-posta, telefon ve WhatsApp
        üzerinden sizinle iletişim kurabiliriz. Bu kutu işaretlenmediği takdirde formunuz normal şekilde
        işleme alınır; pazarlama izni vermeniz form gönderiminin bir şartı değildir.
      </p>

      <h2 className={sectionTitleClass}>Analitik ve Çerezler</h2>
      <p>
        Hangi sayfaların ziyaret edildiğini ve hangi butonların kullanıldığını anlamak için temel analytics
        event ölçümleri ve sınırlı sayıda çerez kullanılabilir. Detaylar için Çerez Politikası sayfamızı
        inceleyebilirsiniz.
      </p>

      <h2 className={sectionTitleClass}>Üçüncü Taraf Hizmetler</h2>
      <p>
        Site; form süreçlerinin yürütülmesi ve analitik ölçüm gibi sınırlı amaçlarla e-posta, Google Sheets,
        n8n, Vercel ve Google Analytics gibi üçüncü taraf hizmet sağlayıcılardan destek alabilir. Bu servisler
        kendi gizlilik politikalarına tabidir.
      </p>

      <h2 className={sectionTitleClass}>Veri Güvenliği</h2>
      <p>Paylaştığınız bilgilerin güvenliğini sağlamak için makul teknik ve idari önlemler alınır.</p>

      <h2 className={sectionTitleClass}>Kullanıcı Hakları</h2>
      <p>
        Kişisel verilerinize ilişkin bilgi talep etme, düzeltme, silinmesini isteme ve pazarlama iletişimi
        izninizi geri çekme haklarına sahipsiniz.
      </p>

      <h2 className={sectionTitleClass}>İletişim</h2>
      <p>
        Sorularınız için{' '}
        <a href="mailto:info@gloventglobal.com" className="underline hover:text-blue-200">
          info@gloventglobal.com
        </a>{' '}
        adresinden bize ulaşabilirsiniz.
      </p>
    </LegalPageLayout>
  );
}