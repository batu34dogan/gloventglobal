import RDLegalPage from '@/components/redesign/legal/RDLegalPage';
import { LegalJsonLd, legalMetadata, type LegalPageMeta } from '@/components/redesign/legal/legalSeo';

const META: LegalPageMeta = {
  path: '/kullanim-sartlari',
  name: 'Kullanım Şartları',
  title: 'Kullanım Şartları | GloventGlobal',
  description: 'GloventGlobal internet sitesinin kullanım şartları ve içerik kullanım koşulları.',
};

export const metadata = legalMetadata(META);

// Hukuki metin önceki sürümle birebir aynı (başlıksız 4 paragraf).
export default function KullanimSartlariPage() {
  return (
    <>
      <LegalJsonLd {...META} />
      <RDLegalPage title="Kullanım Şartları">
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
      </RDLegalPage>
    </>
  );
}
