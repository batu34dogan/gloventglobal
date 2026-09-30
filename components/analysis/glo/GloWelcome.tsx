'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { focusRing } from '@/components/redesign/service-detail/RDServiceDetailPrimitives';
import { GLO_WELCOME } from '@/lib/glo/state';
import './glo-avatar.css';

// Canlı erken erişimde gerçek AI sağlayıcısı hazır DEĞİLKEN gösterilen Glo karşılaması: onaylı karakter +
// kısa karşılama, ardından mevcut normal analiz formuna geçiş. Sohbet yok, yapay yanıt üretilmez.
export default function GloWelcome({
  headingLevel,
  onStart,
  autoFocus = false,
}: {
  headingLevel: 'h2' | 'h3';
  onStart: () => void;
  autoFocus?: boolean;
}) {
  const [greeted, setGreeted] = useState(false);
  const startRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (autoFocus) startRef.current?.focus();
  }, [autoFocus]);
  const Heading = headingLevel;
  return (
    <div className="flex flex-col items-center py-2 text-center">
      <span className="relative block h-28 w-28 shrink-0 sm:h-40 sm:w-40">
        <Image
          src="/images/glo/glo-avatar-480.webp"
          alt=""
          width={160}
          height={160}
          sizes="(min-width: 640px) 160px, 112px"
          quality={100}
          loading="eager"
          onAnimationEnd={(e) => {
            if (e.animationName === 'glo-greet') setGreeted(true);
          }}
          className={`glo-avatar h-full w-full object-contain ${greeted ? '' : 'is-greet'}`}
        />
      </span>
      <Heading className="mt-3 text-[1.35rem] font-extrabold leading-tight text-[#14213F] sm:mt-4 sm:text-[1.6rem]">{GLO_WELCOME.title}</Heading>
      <p className="mt-1.5 max-w-[42ch] text-[15px] leading-relaxed text-[#4A4A5A] sm:text-[16px]">
        {GLO_WELCOME.text} Kısa analiz formuyla başlayalım.
      </p>
      <p className="mt-3 inline-flex rounded-full border border-[#C9A876]/70 bg-[#F6F1E7] px-2.5 py-0.5 text-[12px] font-semibold text-[#6B5A36]">Erken erişim</p>
      <button
        ref={startRef}
        type="button"
        onClick={onStart}
        className={`mt-5 inline-flex items-center justify-center rounded-full bg-[#14213F] px-7 py-3 text-[15px] font-semibold text-white motion-safe:transition-colors hover:bg-[#1B5CD6] ${focusRing}`}
      >
        Analize başla
      </button>
    </div>
  );
}
