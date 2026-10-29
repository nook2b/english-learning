/** Local calendar date as YYYY-MM-DD. */
export function dayKey(date: Date = new Date()): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function addDays(key: string, delta: number): string {
  const [y, m, d] = key.split('-').map(Number) as [number, number, number]
  return dayKey(new Date(y, m - 1, d + delta))
}
