// Arc 1 outline from docs/07-learning-path.md, section 7. Units with written
// content live in /content/course; the rest show on the path as "coming".

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

