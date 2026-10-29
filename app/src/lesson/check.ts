// Answer checking for typed and spoken answers. Case, punctuation, curly
// quotes, contractions and digits are normalised away; grammar is not —
// "He live here" never matches "He lives here", so there is no typo tolerance.

const CONTRACTIONS: Record<string, string[]> = {
  "i'm": ['i am'],
  "you're": ['you are'],
  "we're": ['we are'],
  "they're": ['they are'],
  "i've": ['i have'],
  "you've": ['you have'],
  "we've": ['we have'],
  "they've": ['they have'],
  "i'll": ['i will'],
  "you'll": ['you will'],
  "he'll": ['he will'],
  "she'll": ['she will'],
  "we'll": ['we will'],
  "they'll": ['they will'],
  "it'll": ['it will'],
  "isn't": ['is not'],
  "aren't": ['are not'],
  "wasn't": ['was not'],
  "weren't": ['were not'],
  "don't": ['do not'],
  "doesn't": ['does not'],
  "didn't": ['did not'],
  "haven't": ['have not'],
  "hasn't": ['has not'],
  "hadn't": ['had not'],
  "won't": ['will not'],
  "wouldn't": ['would not'],
  "can't": ['cannot', 'can not'],
  "couldn't": ['could not'],
  "shouldn't": ['should not'],
  "let's": ['let us'],
  // Ambiguous: expand both ways and let either side match.
  "he's": ['he is', 'he has'],
  "she's": ['she is', 'she has'],
  "it's": ['it is', 'it has'],
  "that's": ['that is', 'that has'],
  "what's": ['what is', 'what has'],
  "where's": ['where is', 'where has'],
  "who's": ['who is', 'who has'],
  "there's": ['there is', 'there has'],
  "i'd": ['i would', 'i had'],
  "you'd": ['you would', 'you had'],
  "he'd": ['he would', 'he had'],
  "she'd": ['she would', 'she had'],
  "we'd": ['we would', 'we had'],
  "they'd": ['they would', 'they had'],
}

const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']

/** Integers 0–999 to words, so a recogniser's "17" matches "seventeen". */
export function numberToWords(n: number): string {
  if (n < 20) return ONES[n]!
  if (n < 100) return TENS[Math.floor(n / 10)]! + (n % 10 ? ' ' + ONES[n % 10] : '')
  const rest = n % 100
  return ONES[Math.floor(n / 100)] + ' hundred' + (rest ? ' ' + numberToWords(rest) : '')
}

function tokens(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[’‘`´]/g, "'")
    .replace(/\b(\d{1,3})\b/g, (_, d: string) => numberToWords(Number(d)))
    .replace(/(\d)(st|nd|rd|th)\b/g, '$1')
    .replace(/[^a-z0-9' ]+/g, ' ')
    .split(/\s+/)
    .map((t) => t.replace(/^'+|'+$/g, ''))
    .filter(Boolean)
}

/** All normalised readings of a text (contractions may expand several ways). */
export function variants(text: string): Set<string> {
  let acc = ['']
  for (const t of tokens(text)) {
    const options = CONTRACTIONS[t] ?? [t]
    acc = acc.flatMap((prefix) => options.map((o) => (prefix ? `${prefix} ${o}` : o)))
    if (acc.length > 64) acc = acc.slice(0, 64)
  }
  return new Set(acc)
}

export function normalize(text: string): string {
  return [...variants(text)][0] ?? ''
}

export function matches(given: string, accepted: readonly string[]): boolean {
  const mine = variants(given)
  return accepted.some((a) => [...variants(a)].some((v) => mine.has(v)))
}

function wordDistance(a: string[], b: string[]): number {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0]!
    row[0] = i
    for (let j = 1; j <= b.length; j++) {
      const cur = row[j]!
      row[j] = Math.min(row[j]! + 1, row[j - 1]! + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1))
      prev = cur
    }
  }
  return row[b.length]!
}

/**
 * Spoken answers: recognisers mishear short function words, so allow one
 * wrong word in five against the closest accepted answer. Every alternative
 * the recogniser returned is tried.
 */
export function matchesSpeech(alternatives: readonly string[], accepted: readonly string[]): boolean {
  if (alternatives.some((alt) => matches(alt, accepted))) return true
  for (const alt of alternatives) {
    for (const mine of variants(alt)) {
      const said = mine.split(' ')
      for (const a of accepted) {
        for (const target of variants(a)) {
          const words = target.split(' ')
          if (wordDistance(said, words) <= Math.floor(words.length / 5)) return true
        }
      }
    }
  }
  return false
}
