import type { Metadata } from 'next';
import LegalPageLayout from '@/components/legal/LegalPageLayout';

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni | GloventGlobal',
  description: 'GloventGlobal’ın iletişim ve analiz formları üzerinden topladığı kişisel verilerin hangi amaçla işlendiğini açıklayan KVKK aydınlatma metni.',
};

const sectionTitleClass = 'mt-2 text-lg font-semibold text-white';

export default function KvkkPage() {
  return (
    <LegalPageLayout title="KVKK Aydınlatma Metni">
      <p>
        Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) kapsamında,
        GloventGlobal internet sitesi üzerinden kişisel verilerinizin işlenmesine ilişkin sizi bilgilendirmek
        amacıyla hazırlanmıştır.
      </p>

      <h2 className={sectionTitleClass}>Veri Sorumlusu</h2>
      <p>
        Kişisel verileriniz, veri sorumlusu sıfatıyla GloventGlobal tarafından işlenmektedir. Bizimle{' '}
        <a href="mailto:info@gloventglobal.com" className="underline hover:text-blue-200">
          info@gloventglobal.com
        </a>{' '}
        adresinden iletişime geçebilirsiniz.
      </p>

      <h2 className={sectionTitleClass}>İşlenen Kişisel Veriler</h2>
      <p>
        Ad soyad, firma adı, telefon, e-posta, web sitesi / mağaza linki, mesaj/not, analiz formu cevapları,
        pazarlama iletişimi izin tercihi, IP adresi ve site kullanım/veri analitiği bilgileri işlenebilir.
      </p>

      <h2 className={sectionTitleClass}>Kişisel Verilerin İşlenme Amaçları</h2>
      <p>
        Talebinizin değerlendirilmesi, ön analiz hazırlanması, sizinle iletişime geçilmesi, hizmet planlama,
        teklif süreci, müşteri kaydı takibi, site deneyiminin iyileştirilmesi, güvenlik ve yasal
        yükümlülüklerin yerine getirilmesi amaçlarıyla işlenir.
      </p>
      <p>
        Ayrıca açık rızanız bulunması halinde; hizmetler, kampanyalar, dijital büyüme içerikleri,
        bilgilendirmeler ve ticari elektronik ileti süreçleri kapsamında e-posta, telefon ve WhatsApp
        üzerinden sizinle iletişim kurulabilir.
      </p>

      <h2 className={sectionTitleClass}>Kişisel Verilerin Toplanma Yöntemi</h2>
      <p>
        Kişisel verileriniz, internet sitemizdeki iletişim formu ve ücretsiz analiz formu aracılığıyla
        elektronik ortamda doğrudan sizin tarafınızdan paylaşılarak toplanır.
      </p>

      <h2 className={sectionTitleClass}>Kişisel Verilerin İşlenme Hukuki Sebebi</h2>
      <p>
        Verileriniz; bir sözleşmenin kurulması veya ifasıyla ilgili olması, hukuki yükümlülüklerin yerine
        getirilmesi, meşru menfaatimiz ve (pazarlama iletişimi için) açık rızanız hukuki sebeplerine dayanarak
        işlenir.
      </p>

      <h2 className={sectionTitleClass}>Kişisel Verilerin Aktarılması</h2>
      <p>
        Verileriniz; e-posta, Google Sheets, n8n, Vercel, Google Analytics gibi teknik altyapı ve hizmet
        sağlayıcılarıyla, yalnızca yukarıda belirtilen süreçlerin yürütülmesi amacıyla sınırlı olarak
        paylaşılabilir.
      </p>

      <h2 className={sectionTitleClass}>Kişisel Verilerin Saklama Süresi</h2>
      <p>
        Talep ve iletişim kayıtlarınız makul bir süre boyunca saklanır; talebiniz halinde mevzuata uygun
        şekilde silinmesi veya anonimleştirilmesi değerlendirilir. Pazarlama izni kayıtları, izninizi geri
        çekene kadar veya mevzuatın gerektirdiği süre boyunca saklanabilir.
      </p>

      <h2 className={sectionTitleClass}>İlgili Kişinin Hakları</h2>
      <p>
        KVKK kapsamında; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi
        talep etme, verilerinizin düzeltilmesini veya silinmesini isteme ve pazarlama iletişimi izninizi geri
        çekme haklarına sahipsiniz.
      </p>

      <h2 className={sectionTitleClass}>Başvuru ve İletişim</h2>
      <p>
        Yukarıdaki haklarınızı kullanmak için{' '}
        <a href="mailto:info@gloventglobal.com" className="underline hover:text-blue-200">
          info@gloventglobal.com
        </a>{' '}
        adresine veya iletişim sayfamız üzerinden bize ulaşabilirsiniz.
      </p>

      <h2 className={sectionTitleClass}>Ticari Elektronik İleti ve Pazarlama İzni</h2>
      <p>
        Formlarımızda yer alan pazarlama iletişimi onay kutusunu işaretlemeniz halinde, hizmetler,
        kampanyalar, dijital büyüme içerikleri ve bilgilendirmeler hakkında e-posta, telefon ve WhatsApp
        üzerinden sizinle iletişim kurabiliriz. Bu izin tamamen isteğe bağlıdır ve dilediğiniz zaman geri
        çekilebilir.
      </p>
    </LegalPageLayout>
  );
}