import { fireEvent, render, screen } from '@testing-library/react'
import { Unit } from '../content/schema'
import { db } from '../data/db'
import { useClub } from '../data/store'
import { SessionPlayer } from './SessionPlayer'

const filler = { kind: 'form', title: 'x', exercises: [{ id: 'f', type: 'choice', prompt: 'a ___', options: ['a', 'b'], answer: 'a' }] }

function unitWith(exercises: unknown[]) {
  return Unit.parse({
    id: '999',
    title: 'Test',
    goal: 'g',
    focus: 'f',
    outcome: 'o',
    expressions: [{ en: 'by the way', ru: 'кстати' }],
    sessions: [{ kind: 'form', title: 'Test session', exercises }, ...Array(7).fill(filler)],
  })
}

beforeEach(async () => {
  await db.delete()
  await db.open()
  await useClub.getState().init()
})

test('right and wrong answers, feedback, mistakes and summary', async () => {
  const unit = unitWith([
    { id: 't-1', type: 'choice', prompt: 'Look! It ___.', options: ['rains', 'is raining'], answer: 'is raining' },
    { id: 't-2', type: 'fill', prompt: 'She ___ here.', hint: 'live', answers: ['lives'], explain: 'She → -s.', tags: ['third_person'] },
  ])
  render(<SessionPlayer unit={unit} index={1} />)

  fireEvent.click(screen.getByRole('button', { name: 'is raining' }))
  expect(screen.getByText('Верно')).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: 'Дальше' }))

  fireEvent.change(screen.getByRole('textbox', { name: 'Ответ' }), { target: { value: 'live' } })
  fireEvent.click(screen.getByRole('button', { name: 'Проверить' }))
  expect(screen.getByText('Правильно так')).toBeInTheDocument()
  expect(screen.getByText('She → -s.')).toBeInTheDocument()

  // The wrong answer comes back at the end until it is right.
  fireEvent.click(screen.getByRole('button', { name: 'Дальше' }))
  expect(screen.getByText('Ещё раз: исправим ошибку')).toBeInTheDocument()
  fireEvent.change(screen.getByRole('textbox', { name: 'Ответ' }), { target: { value: 'lives' } })
  fireEvent.click(screen.getByRole('button', { name: 'Проверить' }))
  fireEvent.click(screen.getByRole('button', { name: 'Завершить занятие' }))
  expect(await screen.findByText(/Точность: 50%/)).toBeInTheDocument()

  expect(await db.sessions.get('999-1')).toMatchObject({ correct: 1, total: 2 })
  expect(await db.mistakes.where('tags').equals('third_person').count()).toBe(1)
  expect(useClub.getState().days[0]?.minutes).toBeGreaterThanOrEqual(1)
})

test('contractions are accepted in typed answers', () => {
  const unit = unitWith([{ id: 't-3', type: 'translate', ru: 'Я здесь новенький.', answers: ['I am new here.'] }])
  render(<SessionPlayer unit={unit} index={1} />)
  fireEvent.change(screen.getByRole('textbox', { name: 'Ответ' }), { target: { value: "i’m new here" } })
  fireEvent.click(screen.getByRole('button', { name: 'Проверить' }))
  expect(screen.getByText('Верно')).toBeInTheDocument()
})

test('a misunderstood scene reply gets a clarification, not annoyance', () => {
  const unit = unitWith([
    {
      id: 't-4',
      type: 'scene',
      setting: 'Room 17',
      lines: [{ speaker: 'mika', text: 'Introduce yourself!' }],
      intents: [{ label: 'Сказать, что новенький', answers: ["I'm new here."], reaction: { speaker: 'mika', text: 'Perfect.' } }],
      clarify: { speaker: 'mika', text: 'Sorry, one more time?' },
    },
  ])
  render(<SessionPlayer unit={unit} index={1} />)
  fireEvent.click(screen.getByRole('button', { name: 'Сказать, что новенький' }))
  fireEvent.change(screen.getByRole('textbox', { name: 'Ответ' }), { target: { value: 'I new here' } })
  fireEvent.click(screen.getByRole('button', { name: 'Проверить' }))
  expect(screen.getByText('Sorry, one more time?')).toBeInTheDocument()
  expect(screen.getByText('Perfect.')).toBeInTheDocument()
})

test("skipping a speaking task is neither right nor wrong", async () => {
  const unit = unitWith([
    { id: 't-5', type: 'speak', show: 'en', text: 'Nice to meet you.', answers: ['Nice to meet you.'] },
    { id: 't-6', type: 'choice', prompt: 'a ___', options: ['a', 'b'], answer: 'a' },
  ])
  render(<SessionPlayer unit={unit} index={1} />)
  fireEvent.click(screen.getByRole('button', { name: 'Сейчас не могу говорить' }))
  fireEvent.click(screen.getByRole('button', { name: 'Дальше' }))
  fireEvent.click(screen.getByRole('button', { name: 'a' }))
  fireEvent.click(screen.getByRole('button', { name: 'Завершить занятие' }))
  expect(await screen.findByText(/Точность: 100% \(1 из 1\)/)).toBeInTheDocument()
  expect(screen.getByText('Пропущено: 1')).toBeInTheDocument()
})

test('tapping a highlighted expression shows its translation', () => {
  const unit = unitWith([
    { id: 't-7', type: 'scene', setting: 's', lines: [{ speaker: 'rei', text: 'You sound fine, by the way.', ru: 'Кстати, звучишь нормально.' }], intents: [{ label: 'ok', answers: ['ok'], reaction: { speaker: 'rei', text: 'ok' } }], clarify: { speaker: 'rei', text: '?' } },
  ])
  render(<SessionPlayer unit={unit} index={1} />)
  fireEvent.click(screen.getByRole('button', { name: 'by the way' }))
  expect(screen.getByRole('note')).toHaveTextContent('кстати')
  fireEvent.click(screen.getByRole('button', { name: 'Перевод' }))
  expect(screen.getByText('Кстати, звучишь нормально.')).toBeInTheDocument()
})

test('a session opens with its story frame and ends with what changed', async () => {
  const unit = Unit.parse({
    id: '998',
    title: 'Frame',
    goal: 'g',
    focus: 'f',
    outcome: 'o',
    expressions: [],
    sessions: [
      {
        kind: 'form',
        title: 'Framed',
        frame: { setting: 'Room 17', lines: [{ speaker: 'iris', text: 'Help me sort these?', expr: 'notebook/focused' }] },
        wrap: [{ speaker: 'iris', text: 'Good. Now the guide knows.', expr: 'notebook/dry_smile' }],
        exercises: [{ id: 'fr-1', type: 'choice', prompt: 'a ___', options: ['a', 'b'], answer: 'a', context: 'Карточка Айрис' }],
      },
      ...Array(7).fill(filler),
    ],
  })
  render(<SessionPlayer unit={unit} index={1} />)
  expect(screen.getByText('Help me sort these?')).toBeInTheDocument()
  expect(screen.getByAltText('iris notebook/focused')).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: 'Начать' }))
  expect(screen.getByText('Карточка Айрис')).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: 'a' }))
  fireEvent.click(screen.getByRole('button', { name: 'Завершить занятие' }))
  expect(await screen.findByText('Good. Now the guide knows.')).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: 'Итоги занятия' }))
  expect(screen.getByText(/Точность: 100%/)).toBeInTheDocument()
})

test('a scene choice is remembered for later scenes', async () => {
  const unit = unitWith([
    { id: 't-8', type: 'scene', setting: 's', lines: [{ speaker: 'mika', text: 'Ask us anything!' }], intents: [{ label: 'Спросить Рэй', answers: ['What are you doing?'], flag: 'asked_rei', reaction: { speaker: 'rei', text: 'Checking levels.' } }], clarify: { speaker: 'mika', text: 'Sorry?' } },
  ])
  render(<SessionPlayer unit={unit} index={1} />)
  fireEvent.click(screen.getByRole('button', { name: 'Спросить Рэй' }))
  fireEvent.change(screen.getByRole('textbox', { name: 'Ответ' }), { target: { value: 'What are you doing?' } })
  fireEvent.click(screen.getByRole('button', { name: 'Проверить' }))
  await screen.findByText('Checking levels.')
  await new Promise((r) => setTimeout(r, 20))
  expect(await db.flags.get('asked_rei')).toBeTruthy()
})

test('a heroine speaking in a listening task appears on screen even if not in the frame', () => {
  const unit = Unit.parse({
    id: '997',
    title: 'Voices',
    goal: 'g',
    focus: 'f',
    outcome: 'o',
    expressions: [],
    sessions: [
      {
        kind: 'comprehension',
        title: 'Voices',
        frame: { setting: 'Room 17', lines: [{ speaker: 'mika', text: 'Listen!', expr: 'excited' }] },
        exercises: [{ id: 'v-1', type: 'listening', speaker: 'iris', audio: 'Hello. I am Iris.', questions: [{ prompt: 'Who?', options: ['Iris', 'Rei'], answer: 'Iris' }] }],
      },
      ...Array(7).fill(filler),
    ],
  })
  render(<SessionPlayer unit={unit} index={1} />)
  fireEvent.click(screen.getByRole('button', { name: 'Начать' }))
  expect(screen.getByAltText('iris stand/neutral')).toBeInTheDocument()
  expect(screen.getByAltText('mika stand/excited')).toBeInTheDocument()
})
