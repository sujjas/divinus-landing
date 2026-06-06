// Minimal Portable Text helpers. The site renders three block kinds only —
// paragraphs, H2 subheads and pull-quotes — so we flatten Sanity's block
// content into the existing `Section[]` shape the article renderer expects.

type PTSpan = { _type: string; text?: string };
type PTBlock = { _type: string; style?: string; children?: PTSpan[] };

export type FlatSection =
  | { kind: 'p'; text: string }
  | { kind: 'h2'; text: string }
  | { kind: 'pull'; text: string };

function blockText(block: PTBlock): string {
  return (block.children ?? [])
    .filter((c) => c._type === 'span' && typeof c.text === 'string')
    .map((c) => c.text)
    .join('');
}

export function portableTextToSections(blocks: unknown): FlatSection[] {
  if (!Array.isArray(blocks)) return [];
  const out: FlatSection[] = [];
  for (const raw of blocks as PTBlock[]) {
    if (!raw || raw._type !== 'block') continue;
    const text = blockText(raw).trim();
    if (!text) continue;
    if (raw.style === 'h2') out.push({ kind: 'h2', text });
    else if (raw.style === 'blockquote') out.push({ kind: 'pull', text });
    else out.push({ kind: 'p', text });
  }
  return out;
}
