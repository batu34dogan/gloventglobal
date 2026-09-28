'use client';

import { useEffect } from 'react';

// Uygulama hydrate olduğunda işaret bırakır. layout.tsx'teki head script'i bu işareti göremezse
// (JS paketi yüklenemedi / hydration başarısız) html.rd-js sınıfını kaldırır ve JS'e bağlı
// reveal animasyonlarının gizli başlangıç durumları devre dışı kalır — içerik görünür olur.
export default function HydrationMark() {
  useEffect(() => {
    (window as unknown as { __rdHydrated?: boolean }).__rdHydrated = true;
  }, []);
  return null;
}
