import { UNITS } from '../../content/course'
import { ARC1_UNITS } from '../../content/outline'
import type { Session, Unit } from '../../content/schema'
import { HEROINE_IDS, type HeroineId } from '../../story/sprites'
import type { IconName } from '../../ui/Icon'

// Path route helpers: what each station looks like and who stands by the unit.

/** White glyph on the station dot, by the session's kind or role. */
export function stopIcon(s: Session): IconName {
  if (s.role === 'mission') return 'g-star'
  if (s.role === 'check') return 'g-trophy'
  return ({ comprehension: 'g-book', form: 'g-pencil', production: 'g-bubble', fluency: 'g-stopwatch' } as const)[s.kind]
}

/**
 * Who stands by each unit on the route, and in what pose: chosen by the unit's
 * theme, so the picture says what the unit is about, and balanced so that no
 * heroine gets more units than the others before the route choice (unit 080).
 * New poses (docs/43-map-poses-brief.md) show a close existing pose until drawn.
 */
export const UNIT_FIGURES: Record<string, { heroine: HeroineId; pose: string; until?: string }> = {
  '001': { heroine: 'mika', pose: 'wave_mic' }, // Представиться: машет новичку
  '002': { heroine: 'rei', pose: 'headphones_listen' }, // Уточнить вопрос: вслушивается
  '003': { heroine: 'iris', pose: 'timetable_point' }, // Прочитать расписание
  '004': { heroine: 'mika', pose: 'clipboard_run' }, // Объяснить свой день: бегом по делам
  '005': { heroine: 'iris', pose: 'floor_plan', until: 'book_walk' }, // Найти комнату: план этажа
  '006': { heroine: 'rei', pose: 'cable_coil' }, // Описать проблему: гудящий кабель
  '007': { heroine: 'mika', pose: 'carry_chair', until: 'lunch_bags' }, // Договориться о помощи: несёт стул
  '008': { heroine: 'rei', pose: 'acoustic_panel', until: 'stool' }, // Предпочтения: панель для угла записи
  '009': { heroine: 'mika', pose: 'lunch_bags' }, // Заказать обед
  '010': { heroine: 'iris', pose: 'menu_check', until: 'notebook_write' }, // Уточнить состав: читает меню
  '011': { heroine: 'rei', pose: 'mic_stand' }, // Сравнить цены: новая стойка
  '012': { heroine: 'iris', pose: 'two_mugs', until: 'books_sit' }, // Общий список: две чашки
  '013': { heroine: 'rei', pose: 'recorder_crouch' }, // Привычное и текущее: десять секунд тишины
  '014': { heroine: 'mika', pose: 'phone_show' }, // Описать помеху: телефон зазвонил
  '015': { heroine: 'iris', pose: 'notebook_write' }, // Перенести встречу: правит план
  '016': { heroine: 'mika', pose: 'peace' }, // Подтвердить договорённость
  '017': { heroine: 'iris', pose: 'over_shoulder' }, // Объяснить маршрут: «за мной»
  '018': { heroine: 'rei', pose: 'manual_read', until: 'stool' }, // Проверить инструкцию
  '019': { heroine: 'mika', pose: 'leaning' }, // Уточнить непонятное: наклонилась, переспрашивает
  '020': { heroine: 'rei', pose: 'greeting' }, // Провести новичка: встречает
}

/** The heroine who speaks most in a unit's story beats: for units without a row above. */
function mostSpoken(unit: Unit): HeroineId {
  const count: Record<string, number> = {}
  const walk = (o: unknown): void => {
    if (Array.isArray(o)) return o.forEach(walk)
    if (!o || typeof o !== 'object') return
    const r = o as Record<string, unknown>
    if (typeof r.speaker === 'string' && typeof r.text === 'string') count[r.speaker] = (count[r.speaker] ?? 0) + 1
    Object.values(r).forEach(walk)
  }
  walk(unit.sessions)
  return [...HEROINE_IDS].sort((a, b) => (count[b] ?? 0) - (count[a] ?? 0))[0]!
}

/** The unit's heroine: by the table above, else the one who speaks most. */
export function unitHeroine(unit: Unit): HeroineId {
  return UNIT_FIGURES[unit.id]?.heroine ?? mostSpoken(unit)
}

/** Full-length route poses, see docs/18-map-sprites-brief.md. */
export const MAP_POSES: Record<HeroineId, readonly string[]> = {
  mika: ['wave_mic', 'clipboard_run', 'phone_show', 'lunch_bags', 'peace', 'leaning', 'cat_gesture'],
  rei: ['recorder_crouch', 'headphones_listen', 'cable_coil', 'mic_stand', 'stool', 'greeting', 'kneeling'],
  iris: ['book_walk', 'timetable_point', 'notebook_write', 'books_sit', 'peace', 'seated', 'over_shoulder'],
}

/** The figure by the unit: its row in the table, else the heroine's poses in turn along the course. */
export function mapFigure(unit: Unit): { heroine: HeroineId; pose: string; fallback?: string } {
  const row = UNIT_FIGURES[unit.id]
  if (row) return { heroine: row.heroine, pose: row.pose, fallback: row.until }
  const heroine = unitHeroine(unit)
  const before = ARC1_UNITS.findIndex((u) => u.id === unit.id)
  const turn = ARC1_UNITS.slice(0, Math.max(before, 0)).filter((u) => UNITS[u.id] && unitHeroine(UNITS[u.id]!) === heroine).length
  const poses = MAP_POSES[heroine]
  return { heroine, pose: poses[turn % poses.length]! }
}
