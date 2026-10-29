// Pre-generated voice clips (ElevenLabs) live in /assets/audio/{speaker}/{key}.mp3.
// The key is a hash of speaker and text, so a clip follows its line and a
// changed line simply loses its clip until it is regenerated
// (scripts/generate_audio.py computes the same key).

const files = import.meta.glob<string>('../../../assets/audio/**/*.mp3', { eager: true, query: '?url', import: 'default' })

const CLIPS: Record<string, string> = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.replace(/^.*assets\/audio\//, '').replace(/\.mp3$/, ''), url]),
)

/** FNV-1a, 32 bit, hex. */
export function clipKey(speaker: string, text: string): string {
  let h = 0x811c9dc5
  for (const ch of new TextEncoder().encode(`${speaker}|${text.trim()}`)) {
    h ^= ch
    h = Math.imul(h, 0x01000193) >>> 0
  }
  return h.toString(16).padStart(8, '0')
}

export function clipUrl(speaker: string, text: string, clips: Record<string, string> = CLIPS): string | undefined {
  return clips[`${speaker}/${clipKey(speaker, text)}`]
}
