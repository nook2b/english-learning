import voices from '../../../content/voices.json'

// What the voice generator hears: audio tags for ElevenLabs v4 in front of
// the line. An explicit delivery (story context: out of breath, whispering
// by a live mic, coughing) wins; otherwise the sprite emotion picks a tag.
// The screen always shows the plain text. scripts/generate_audio.py applies
// the same rule, and clips are keyed by this voiced text.

const BY_EXPR: Record<string, string> = voices.deliveryByExpr

export interface Delivery {
  /** Sprite emotion, "pose/expr" or "expr". */
  expr?: string
  /** Explicit audio tags, e.g. "[whispers]". */
  delivery?: string
}

export function voicedText(text: string, d: Delivery = {}): string {
  const expr = d.expr?.split('/').pop()
  const tags = d.delivery ?? (expr ? BY_EXPR[expr] : undefined)
  return tags ? `${tags} ${text.trim()}` : text.trim()
}
