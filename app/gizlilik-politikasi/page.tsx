import RDLegalPage, { LegalLink, type LegalSection } from '@/components/redesign/legal/RDLegalPage';
import { LegalJsonLd, legalMetadata, type LegalPageMeta } from '@/components/redesign/legal/legalSeo';

const META: LegalPageMeta = {
  path: '/gizlilik-politikasi',
  name: 'Gizlilik Politikası',
  title: 'Gizlilik Politikası | GloventGlobal',
  description: 'GloventGlobal sitesinin form verileri, pazarlama izni, analytics, çerezler ve üçüncü taraf servisler konusundaki gizlilik politikası.',
};

export const metadata = legalMetadata(META);

// Hukuki metin önceki sürümle birebir aynı; onaylı değişiklikler: WhatsApp ifadesi kaldırıldı,
// "KVKK Aydınlatma Metni" → /kvkk ve "Çerez Politikası" → /cerez-politikasi linkleri.
const sections: LegalSection[] = [
  {
    id: 'toplanan-bilgiler',
    heading: 'Toplanan Bilgiler',
    content: (
      <p>
        İletişim formu ve ücretsiz analiz formu üzerinden ad soyad, firma adı, telefon, e-posta, web sitesi /
        mağaza linki, mesaj/not ve analiz cevaplarınızı topluyoruz. Ayrıca site kullanımına ilişkin temel
        analitik bilgiler ve IP adresi gibi teknik veriler de toplanabilir.
      </p>
    ),
  },
  {
    id: 'kullanim-amaclari',
    heading: 'Bilgilerin Kullanım Amaçları',
    content: (
      <p>
        Bu bilgiler; talebinizin değerlendirilmesi, sizinle iletişime geçilmesi, ön analiz hazırlanması, hizmet
        planlama, site deneyiminin iyileştirilmesi ve güvenlik amaçlarıyla kullanılır.
      </p>
    ),
  },
  {
    id: 'form-verileri',
    heading: 'Form Verileri',
    content: (
      <p>
        İletişim ve ücretsiz analiz formlarını doldurduğunuzda paylaştığınız bilgiler, talebinizin
        değerlendirilmesi ve sizinle iletişime geçilmesi amacıyla işlenir. Detaylı bilgi için{' '}
        <LegalLink href="/kvkk">KVKK Aydınlatma Metni</LegalLink>&apos;ni inceleyebilirsiniz.
      </p>
    ),
  },
  {
    id: 'pazarlama-iletisimi-izni',
    heading: 'Pazarlama İletişimi İzni',
    content: (
      <p>
        Formlarımızda yer alan pazarlama iletişimi onay kutusunu işaretlemeniz halinde, hizmetler,
        kampanyalar, dijital büyüme içerikleri ve bilgilendirmeler hakkında e-posta ve telefon
        üzerinden sizinle iletişim kurabiliriz. Bu kutu işaretlenmediği takdirde formunuz normal şekilde
        işleme alınır; pazarlama izni vermeniz form gönderiminin bir şartı değildir.
      </p>
    ),
  },
  {
    id: 'analitik-ve-cerezler',
    heading: 'Analitik ve Çerezler',
    content: (
      <p>
        Hangi sayfaların ziyaret edildiğini ve hangi butonların kullanıldığını anlamak için temel analytics
        event ölçümleri ve sınırlı sayıda çerez kullanılabilir. Detaylar için{' '}
        <LegalLink href="/cerez-politikasi">Çerez Politikası</LegalLink> sayfamızı inceleyebilirsiniz.
      </p>
    ),
  },
  {
    id: 'ucuncu-taraf-hizmetler',
    heading: 'Üçüncü Taraf Hizmetler',
    content: (
      <p>
        Site; form süreçlerinin yürütülmesi ve analitik ölçüm gibi sınırlı amaçlarla e-posta, Google Sheets,
        n8n, Vercel ve Google Analytics gibi üçüncü taraf hizmet sağlayıcılardan destek alabilir. Bu servisler
        kendi gizlilik politikalarına tabidir.
      </p>
    ),
  },
  {
    id: 'veri-guvenligi',
    heading: 'Veri Güvenliği',
    content: <p>Paylaştığınız bilgilerin güvenliğini sağlamak için makul teknik ve idari önlemler alınır.</p>,
  },
  {
    id: 'kullanici-haklari',
    heading: 'Kullanıcı Hakları',
    content: (
      <p>
        Kişisel verilerinize ilişkin bilgi talep etme, düzeltme, silinmesini isteme ve pazarlama iletişimi
        izninizi geri çekme haklarına sahipsiniz.
      </p>
    ),
  },
  {
    id: 'iletisim',
    heading: 'İletişim',
    content: (
      <p>
        Sorularınız için{' '}
        <LegalLink href="mailto:info@gloventglobal.com">info@gloventglobal.com</LegalLink>{' '}
        adresinden bize ulaşabilirsiniz.
      </p>
    ),
  },
];

export default function GizlilikPolitikasiPage() {
  return (
    <>
      <LegalJsonLd {...META} />
      <RDLegalPage
        title="Gizlilik Politikası"
        intro={
          <p>
            Bu sayfa, GloventGlobal internet sitesini kullanırken hangi bilgilerin toplandığını ve nasıl
            kullanıldığını açıklar.
          </p>
        }
        sections={sections}
      />
    </>
  );
}
