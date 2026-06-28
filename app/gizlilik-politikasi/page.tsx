import type { Metadata } from 'next';
import LegalPageLayout from '@/components/legal/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası | GloventGlobal',
  description: 'GloventGlobal sitesinin form verileri, analytics, çerezler ve üçüncü taraf servisler konusundaki gizlilik politikası.',
};

export default function GizlilikPolitikasiPage() {
  return (
    <LegalPageLayout title="Gizlilik Politikası">
      <p>
        Bu sayfa, GloventGlobal internet sitesini kullanırken hangi verilerin toplandığını ve nasıl
        kullanıldığını açıklar.
      </p>
      <p>
        <strong className="text-white">Form Verileri:</strong> İletişim ve ücretsiz analiz formlarını
        doldurduğunuzda paylaştığınız bilgiler, talebinizin değerlendirilmesi ve sizinle iletişime geçilmesi
        amacıyla işlenir. Detaylı bilgi için KVKK Aydınlatma Metni&apos;ni inceleyebilirsiniz.
      </p>
      <p>
        <strong className="text-white">Analytics ve Ölçüm:</strong> Sitenin nasıl kullanıldığını anlamak için
        (örneğin hangi sayfaların ziyaret edildiği, hangi butonların tıklandığı) temel analytics event
        ölçümleri kullanılabilir. Bu ölçümler kişisel kimlik tespiti amacı taşımaz.
      </p>
      <p>
        <strong className="text-white">Çerezler:</strong> Sitenin düzgün çalışması ve kullanım deneyiminin
        ölçülmesi için sınırlı sayıda çerez kullanılabilir. Detaylar için Çerez Politikası sayfamızı
        inceleyebilirsiniz.
      </p>
      <p>
        <strong className="text-white">Üçüncü Taraf Servisler:</strong> Site, analytics ölçümü gibi sınırlı
        amaçlarla üçüncü taraf servis sağlayıcılarından (örneğin Google Analytics benzeri araçlar) destek
        alabilir. Bu servisler kendi gizlilik politikalarına tabidir.
      </p>
      <p>
        <strong className="text-white">Veri Güvenliği:</strong> Paylaştığınız bilgilerin güvenliğini sağlamak
        için makul teknik ve idari önlemler alınır.
      </p>
    </LegalPageLayout>
  );
}