'use client';

import { useEffect, useState } from 'react';
import { GLO_MODE_EVENT, GLO_NEUTRAL_INTRO, type GloModeDetail } from '@/lib/glo/state';

// Analiz akışının üst açıklaması. Normalde verilen metni (ör. "7 kısa soruyla …") gösterir; aynı
// variant'taki AnalysisFlow'da Glo görünümü açıkken nötr metne döner. `hideInGlo`: Glo görünümünde
// tekrarları azaltmak için metin görsel olarak gizlenir, ekran okuyucu için (ör. aria-describedby) kalır.
// Prototip kapalıyken olay hiç "active" yayınlanmadığı için metin değişmez. Modal kapanınca unmount olur.
export default function GloAwareIntro({
  text,
  variant,
  hideInGlo = false,
  className,
  ...rest
}: { text: string; variant: GloModeDetail['variant']; hideInGlo?: boolean } & React.HTMLAttributes<HTMLParagraphElement>) {
  const [gloActive, setGloActive] = useState(false);
  useEffect(() => {
    const onMode = (e: Event) => {
      const d = (e as CustomEvent<GloModeDetail>).detail;
      if (d?.variant === variant) setGloActive(d.active);
    };
    window.addEventListener(GLO_MODE_EVENT, onMode);
    return () => window.removeEventListener(GLO_MODE_EVENT, onMode);
  }, [variant]);
  return (
    <p {...rest} className={gloActive && hideInGlo ? 'sr-only' : className}>
      {gloActive ? GLO_NEUTRAL_INTRO : text}
    </p>
  );
}
