// Word-level difference between the learner's answer and the right one, so
// the feedback can show where the mistake is instead of only the answer.
// Case, punctuation and apostrophes are ignored, as in answer checking.

export interface DiffWord {
  text: string
  /** In the learner's answer: a word that is wrong or extra. In the right answer: a word that was missing or different. */
  changed: boolean
}

const key = (w: string) => w.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '')

export function wordDiff(given: string, expected: string): { given: DiffWord[]; expected: DiffWord[] } {
  const a = given.trim().split(/\s+/).filter(Boolean)
  const b = expected.trim().split(/\s+/).filter(Boolean)
  // Longest common subsequence of normalised words.
  const lcs = Array.from({ length: a.length + 1 }, () => new Array<number>(b.length + 1).fill(0))
  for (let i = a.length - 1; i >= 0; i--)
    for (let j = b.length - 1; j >= 0; j--) lcs[i]![j] = key(a[i]!) === key(b[j]!) ? lcs[i + 1]![j + 1]! + 1 : Math.max(lcs[i + 1]![j]!, lcs[i]![j + 1]!)
  const keepA = new Set<number>()
  const keepB = new Set<number>()
  let i = 0
  let j = 0
  while (i < a.length && j < b.length) {
    if (key(a[i]!) === key(b[j]!)) {
      keepA.add(i++)
      keepB.add(j++)
    } else if (lcs[i + 1]![j]! >= lcs[i]![j + 1]!) i++
    else j++
  }
  return {
    given: a.map((text, k) => ({ text, changed: !keepA.has(k) })),
    expected: b.map((text, k) => ({ text, changed: !keepB.has(k) })),
  }
}
