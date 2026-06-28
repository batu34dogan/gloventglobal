import type { Metadata } from 'next';
import LegalPageLayout from '@/components/legal/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Kullanım Şartları | GloventGlobal',
  description: 'GloventGlobal internet sitesinin kullanım şartları ve içerik kullanım koşulları.',
};

export default function KullanimSartlariPage() {
  return (
    <LegalPageLayout title="Kullanım Şartları">
      <p>
        Bu sayfada belirtilen kullanım şartları, GloventGlobal internet sitesini ziyaret eden ve kullanan
        herkes için geçerlidir.
      </p>
      <p>
        Sitedeki tüm içerikler (hizmet açıklamaları, süreç anlatımları, görseller ve metinler) yalnızca
        bilgilendirme amaçlıdır. Hizmetlere ilişkin kapsam, süre ve fiyat gibi detaylar, markanızla yapılacak
        görüşme sonrasında netleşir.
      </p>
      <p>
        Site içeriğinin tamamı veya bir kısmı, GloventGlobal&apos;ın yazılı izni olmadan kopyalanamaz,
        çoğaltılamaz veya başka bir mecrada izinsiz şekilde yayınlanamaz.
      </p>
      <p>
        GloventGlobal, site içeriğini, hizmet açıklamalarını ve bu kullanım şartlarını önceden bildirmeksizin
        güncelleme hakkını saklı tutar.
      </p>
    </LegalPageLayout>
  );
}