// Rehber bölüm body'lerini (components/guides/guidesData.ts, düz metin) semantic bloklara çeviren
// saf parser. Metin DEĞİŞTİRİLMEZ; yalnızca sarmalanır:
//   boş satır            → paragraf sınırı
//   "- " ile başlayanlar → ardışık satırlar tek <ul>
//   "1. ", "2. " …       → ardışık satırlar tek <ol> (numara <li value> ile korunur)
//   diğer satırlar       → her satır ayrı <p> (eski whitespace-pre-line satır kırılımıyla aynı ayrım)
// Markdown bağımlılığı yok.

export type BodyBlock =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: { n: number; text: string }[] };

const BULLET = /^- (.*)$/;
const NUMBERED = /^(\d+)\. (.*)$/;

export function parseBody(body: string): BodyBlock[] {
  const blocks: BodyBlock[] = [];
  let ul: string[] | null = null;
  let ol: { n: number; text: string }[] | null = null;
  const flush = () => {
    if (ul) blocks.push({ type: 'ul', items: ul });
    if (ol) blocks.push({ type: 'ol', items: ol });
    ul = null;
    ol = null;
  };

  for (const raw of body.split('\n')) {
    const line = raw.trim();
    if (!line) {
      flush();
      continue;
    }
    const b = BULLET.exec(line);
    if (b) {
      if (ol) flush();
      (ul ??= []).push(b[1]);
      continue;
    }
    const n = NUMBERED.exec(line);
    if (n) {
      if (ul) flush();
      (ol ??= []).push({ n: Number(n[1]), text: n[2] });
      continue;
    }
    flush();
    blocks.push({ type: 'p', text: line });
  }
  flush();
  return blocks;
}
