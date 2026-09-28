// Rehber bölüm body'lerini (components/guides/guidesData.ts, düz metin) semantic bloklara çeviren
// saf parser. Metin DEĞİŞTİRİLMEZ; yalnızca sarmalanır:
//   boş satır            → paragraf sınırı
//   "- " ile başlayanlar → ardışık satırlar tek <ul>
//   "1. ", "2. " …       → ardışık satırlar tek <ol> (numara <li value> ile korunur)
//   diğer satırlar       → her satır ayrı <p> (eski whitespace-pre-line satır kırılımıyla aynı ayrım)
// Yalnızca açıkça belirlenebilen iki yapı ayrıca tanınır (tahmin yok):
//   kayıt tablosu → boş satırla ayrılmış ≥2 grup; her grup "Ad" satırı + aynı sırada aynı etiketli
//                   "Etiket: değer" satırları → <table> (ad = satır başlığı, etiketler = sütun başlıkları)
//   akış          → "Adım\n↓\nAdım\n↓\nAdım" (≥3 adım, yalnızca "↓" ayraçları) → sıralı adımlar (<ol>)
// Eşleşmeyen her şey eski satır kurallarıyla aynen işlenir. Markdown bağımlılığı yok.

export type BodyBlock =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: { n: number; text: string }[] }
  | { type: 'table'; labels: string[]; rows: { name: string; values: string[] }[] }
  | { type: 'flow'; steps: string[] };

const BULLET = /^- (.*)$/;
const NUMBERED = /^(\d+)\. (.*)$/;
// "Etiket: değer" — kısa etiket (≤40 karakter, iki nokta içermez), ardından boşluk ve değer.
const LABELED = /^([^:]{2,40}): (.+)$/;
const ARROW = '↓';

function parseLines(lines: string[], blocks: BodyBlock[]) {
  let ul: string[] | null = null;
  let ol: { n: number; text: string }[] | null = null;
  const flush = () => {
    if (ul) blocks.push({ type: 'ul', items: ul });
    if (ol) blocks.push({ type: 'ol', items: ol });
    ul = null;
    ol = null;
  };
  for (const line of lines) {
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
}

// Grup bir tablo kaydı mı? İlk satır ad (etiketli/liste satırı değil), kalanların hepsi etiketli.
function asRecord(lines: string[]): { name: string; labels: string[]; values: string[] } | null {
  if (lines.length < 2) return null;
  const [name, ...rest] = lines;
  if (LABELED.test(name) || BULLET.test(name) || NUMBERED.test(name) || name === ARROW) return null;
  const labels: string[] = [];
  const values: string[] = [];
  for (const l of rest) {
    const m = LABELED.exec(l);
    if (!m) return null;
    labels.push(m[1]);
    values.push(m[2]);
  }
  return { name, labels, values };
}

// Grup bir akış mı? Tek ve çift satırlar dönüşümlü: adım, "↓", adım, … (en az 3 adım).
function asFlow(lines: string[]): string[] | null {
  if (lines.length < 5 || lines.length % 2 === 0) return null;
  const steps: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    if (i % 2 === 1) {
      if (lines[i] !== ARROW) return null;
    } else {
      if (lines[i] === ARROW) return null;
      steps.push(lines[i]);
    }
  }
  return steps;
}

export function parseBody(body: string): BodyBlock[] {
  const groups = body
    .split(/\n\s*\n/)
    .map((g) => g.split('\n').map((l) => l.trim()).filter(Boolean))
    .filter((g) => g.length > 0);

  const blocks: BodyBlock[] = [];
  for (let i = 0; i < groups.length; i++) {
    const flow = asFlow(groups[i]);
    if (flow) {
      blocks.push({ type: 'flow', steps: flow });
      continue;
    }
    // Aynı etiket dizisine sahip ardışık ≥2 kayıt → tek tablo.
    const first = asRecord(groups[i]);
    if (first) {
      const key = first.labels.join('\u0000');
      const rows = [first];
      let j = i + 1;
      for (; j < groups.length; j++) {
        const r = asRecord(groups[j]);
        if (!r || r.labels.join('\u0000') !== key) break;
        rows.push(r);
      }
      if (rows.length >= 2) {
        blocks.push({ type: 'table', labels: first.labels, rows: rows.map((r) => ({ name: r.name, values: r.values })) });
        i = j - 1;
        continue;
      }
    }
    parseLines(groups[i], blocks);
  }
  return blocks;
}
