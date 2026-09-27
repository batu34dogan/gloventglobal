import RDLegalPage, { LegalLink, type LegalSection } from '@/components/redesign/legal/RDLegalPage';
import { LegalJsonLd, legalMetadata, type LegalPageMeta } from '@/components/redesign/legal/legalSeo';

const META: LegalPageMeta = {
  path: '/kvkk',
  name: 'KVKK Aydınlatma Metni',
  title: 'KVKK Aydınlatma Metni | GloventGlobal',
  description: 'GloventGlobal’ın iletişim ve analiz formları üzerinden topladığı kişisel verilerin hangi amaçla işlendiğini açıklayan KVKK aydınlatma metni.',
};

export const metadata = legalMetadata(META);

// Hukuki metin önceki sürümle birebir aynı; onaylı değişiklikler: WhatsApp ifadeleri kaldırıldı,
// "iletişim sayfamız" → /iletisim linki.
const sections: LegalSection[] = [
  {
    id: 'veri-sorumlusu',
    heading: 'Veri Sorumlusu',
    content: (
      <p>
        Kişisel verileriniz, veri sorumlusu sıfatıyla GloventGlobal tarafından işlenmektedir. Bizimle{' '}
        <LegalLink href="mailto:info@gloventglobal.com">info@gloventglobal.com</LegalLink>{' '}
        adresinden iletişime geçebilirsiniz.
      </p>
    ),
  },
  {
    id: 'islenen-kisisel-veriler',
    heading: 'İşlenen Kişisel Veriler',
    content: (
      <p>
        Ad soyad, firma adı, telefon, e-posta, web sitesi / mağaza linki, mesaj/not, analiz formu cevapları,
        pazarlama iletişimi izin tercihi, IP adresi ve site kullanım/veri analitiği bilgileri işlenebilir.
      </p>
    ),
  },
  {
    id: 'isleme-amaclari',
    heading: 'Kişisel Verilerin İşlenme Amaçları',
    content: (
      <>
        <p>
          Talebinizin değerlendirilmesi, ön analiz hazırlanması, sizinle iletişime geçilmesi, hizmet planlama,
          teklif süreci, müşteri kaydı takibi, site deneyiminin iyileştirilmesi, güvenlik ve yasal
          yükümlülüklerin yerine getirilmesi amaçlarıyla işlenir.
        </p>
        <p>
          Ayrıca açık rızanız bulunması halinde; hizmetler, kampanyalar, dijital büyüme içerikleri,
          bilgilendirmeler ve ticari elektronik ileti süreçleri kapsamında e-posta ve telefon
          üzerinden sizinle iletişim kurulabilir.
        </p>
      </>
    ),
  },
  {
    id: 'toplanma-yontemi',
    heading: 'Kişisel Verilerin Toplanma Yöntemi',
    content: (
      <p>
        Kişisel verileriniz, internet sitemizdeki iletişim formu ve ücretsiz analiz formu aracılığıyla
        elektronik ortamda doğrudan sizin tarafınızdan paylaşılarak toplanır.
      </p>
    ),
  },
  {
    id: 'hukuki-sebep',
    heading: 'Kişisel Verilerin İşlenme Hukuki Sebebi',
    content: (
      <p>
        Verileriniz; bir sözleşmenin kurulması veya ifasıyla ilgili olması, hukuki yükümlülüklerin yerine
        getirilmesi, meşru menfaatimiz ve (pazarlama iletişimi için) açık rızanız hukuki sebeplerine dayanarak
        işlenir.
      </p>
    ),
  },
  {
    id: 'aktarim',
    heading: 'Kişisel Verilerin Aktarılması',
    content: (
      <p>
        Verileriniz; e-posta, Google Sheets, n8n, Vercel, Google Analytics gibi teknik altyapı ve hizmet
        sağlayıcılarıyla, yalnızca yukarıda belirtilen süreçlerin yürütülmesi amacıyla sınırlı olarak
        paylaşılabilir.
      </p>
    ),
  },
  {
    id: 'saklama-suresi',
    heading: 'Kişisel Verilerin Saklama Süresi',
    content: (
      <p>
        Talep ve iletişim kayıtlarınız makul bir süre boyunca saklanır; talebiniz halinde mevzuata uygun
        şekilde silinmesi veya anonimleştirilmesi değerlendirilir. Pazarlama izni kayıtları, izninizi geri
        çekene kadar veya mevzuatın gerektirdiği süre boyunca saklanabilir.
      </p>
    ),
  },
  {
    id: 'ilgili-kisinin-haklari',
    heading: 'İlgili Kişinin Hakları',
    content: (
      <p>
        KVKK kapsamında; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi
        talep etme, verilerinizin düzeltilmesini veya silinmesini isteme ve pazarlama iletişimi izninizi geri
        çekme haklarına sahipsiniz.
      </p>
    ),
  },
  {
    id: 'basvuru-ve-iletisim',
    heading: 'Başvuru ve İletişim',
    content: (
      <p>
        Yukarıdaki haklarınızı kullanmak için{' '}
        <LegalLink href="mailto:info@gloventglobal.com">info@gloventglobal.com</LegalLink>{' '}
        adresine veya <LegalLink href="/iletisim">iletişim sayfamız</LegalLink> üzerinden bize ulaşabilirsiniz.
      </p>
    ),
  },
  {
    id: 'ticari-elektronik-ileti',
    heading: 'Ticari Elektronik İleti ve Pazarlama İzni',
    content: (
      <p>
        Formlarımızda yer alan pazarlama iletişimi onay kutusunu işaretlemeniz halinde, hizmetler,
        kampanyalar, dijital büyüme içerikleri ve bilgilendirmeler hakkında e-posta ve telefon
        üzerinden sizinle iletişim kurabiliriz. Bu izin tamamen isteğe bağlıdır ve dilediğiniz zaman geri
        çekilebilir.
      </p>
    ),
  },
];

export default function KvkkPage() {
  return (
    <>
      <LegalJsonLd {...META} />
      <RDLegalPage
        title="KVKK Aydınlatma Metni"
        intro={
          <p>
            Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) kapsamında,
            GloventGlobal internet sitesi üzerinden kişisel verilerinizin işlenmesine ilişkin sizi bilgilendirmek
            amacıyla hazırlanmıştır.
          </p>
        }
        sections={sections}
      />
    </>
  );
}
