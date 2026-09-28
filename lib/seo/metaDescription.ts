// Uzun kaynak metinden deterministik meta description (≤ max karakter). guideMetaDescription ile aynı
// kural: sığan tam cümleler; yeterince uzun değilse kelime sınırında kesip "…". Yeni metin üretmez.
export function shortMetaDescription(text: string, max = 160): string {
  const src = text.trim();
  if (src.length <= max) return src;
  const sentences = src.match(/[^.!?]+[.!?]+/g) ?? [src];
  let out = '';
  for (const s of sentences) {
    const next = (out + s).trim();
    if (next.length > max) break;
    out = next + ' ';
  }
  out = out.trim();
  if (out.length >= 90) return out;
  const cut = src.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:]$/, '') + '…';
}
