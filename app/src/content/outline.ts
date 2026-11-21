// The course outline: arc 1 from docs/07-learning-path.md, section 7; arc 2 from the
// author's plan (docs/64-arc2-plan.md). Units with written content live in
// /content/course; the rest show on the path as "coming".

export interface UnitOutline {
  id: string
  title: string
}

export interface ModuleOutline {
  id: string
  focus: string
  units: UnitOutline[]
}

const module = (from: number, focus: string, titles: [string, string, string, string]): ModuleOutline => {
  const id = (n: number) => String(n).padStart(3, '0')
  return {
    id: `${id(from)}–${id(from + 3)}`,
    focus,
    units: titles.map((title, i) => ({ id: id(from + i), title })),
  }
}

export const ARC1 = {
  title: 'Арка 1. Не тот кабинет',
  modules: [
    module(1, 'Present forms и вопросы', ['Представиться', 'Уточнить вопрос', 'Прочитать расписание', 'Объяснить свой день']),
    module(5, 'Пространство, просьбы, описания', ['Найти комнату', 'Описать проблему', 'Договориться о помощи', 'Рассказать о предпочтениях']),
    module(9, 'Количества, сравнение, ограничения', ['Заказать обед', 'Уточнить состав', 'Сравнить цены', 'Составить общий список']),
    module(13, 'Simple и Continuous, будущие договорённости', ['Различить привычное и текущее', 'Описать помеху', 'Перенести встречу', 'Подтвердить договорённость']),
    module(17, 'Понятная последовательность', ['Объяснить маршрут', 'Проверить инструкцию', 'Уточнить непонятное', 'Провести новичка']),
  ],
}

export const ARC1_UNITS = ARC1.modules.flatMap((m) => m.units)

// Titles of units 025–040 are working ones from the arc plan; the module briefs may rename them.
export const ARC2 = {
  title: 'Арка 2. Вчера всё было иначе',
  modules: [
    module(21, 'Past Simple: что было и что ты делал', ['Как прошли выходные', 'Что ты делал?', 'Спросить незнакомца', 'Что у нас есть']),
    module(25, 'Past Continuous, транспорт, опоздание', ['Спланировать поездку', 'Остановку перенесли', 'Где ты ждал?', 'Объяснить задержку']),
    module(29, 'Телефон и пересказ: said, told', ['Позвонить и спросить', 'Что он сказал?', 'Попросить повторить', 'Проверить на месте']),
    module(33, 'Последовательность в прошлом: before, after, while', ['Ещё одна запись', 'Забытый чехол', 'Две версии', 'Восстановить порядок']),
    module(37, 'Рассказать историю и дать отзыв', ['Выбрать порядок историй', 'Подготовить вечер', 'Вечер прослушивания', 'Что сказали слушатели']),
  ],
}

/** The arcs on the path, in course order; `check` is the end-of-arc check (content/arc-checks) when it exists. */
export const ARCS: { id: string; title: string; modules: ModuleOutline[]; check?: string }[] = [
  { id: 'arc1', ...ARC1, check: 'arc1' },
  { id: 'arc2', ...ARC2 },
]

/** Every unit of the course outline, in order. */
export const COURSE_UNITS = ARCS.flatMap((a) => a.modules.flatMap((m) => m.units))

