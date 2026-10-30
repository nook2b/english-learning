import { fireEvent, render, screen } from '@testing-library/react'
import { PLACEMENT, scorePlacement } from '../../content/placement'
import type { Exercise } from '../../content/schema'
import { db } from '../../data/db'
import { useClub } from '../../data/store'
import type { Attempt } from '../../lesson/ExerciseRun'
import { hasVoice } from '../../speech/voice'
import { PlacementCheck } from './PlacementCheck'

beforeEach(async () => {
  await db.delete()
  await db.open()
  await useClub.getState().init()
})

const click = (name: string | RegExp) => fireEvent.click(screen.getByRole('button', { name }))
const all = PLACEMENT.parts.flatMap((p) => p.items.map((i) => i.exercise))
const attempt = (exercise: Exercise, correct: boolean): Attempt => ({ exercise, outcome: { correct, given: '', expected: '' } })
/** One attempt per answer: a reading or listening task has one per question. */
const answers = (correct: (e: Exercise) => boolean) =>
  all.flatMap((e) => Array.from({ length: e.type === 'reading' || e.type === 'listening' ? e.questions.length : 1 }, () => attempt(e, correct(e))))

test('the check has 15 grammar items from A2 to B2 and four parts', () => {
  expect(PLACEMENT.parts.map((p) => p.id)).toEqual(['grammar', 'reading', 'listening', 'writing'])
  const levels = PLACEMENT.parts[0]!.items.map((i) => i.level)
  expect(levels.filter((l) => l === 'A2')).toHaveLength(5)
  expect(levels.filter((l) => l === 'B1')).toHaveLength(5)
  expect(levels.filter((l) => l === 'B2')).toHaveLength(5)
  for (const e of all) if (e.type === 'choice') expect(e.options).toContain(e.answer)
  // The announcement is voiced (scripts/generate_audio.py): without a clip the transcript would show.
  for (const e of all) if (e.type === 'listening') expect(hasVoice(e.audio, e.speaker, e)).toBe(true)
})

test('scoring: levels are reached in order, mistakes name the topics', () => {
  const perfect = scorePlacement(answers(() => true))
  expect(perfect.grammarLevel).toBe('B2')
  expect(perfect.parts.reading).toEqual({ correct: 3, total: 3 })
  expect(perfect.weak).toEqual([])
  // B2 items right but A2 wrong: the level does not jump over A2.
  const b2only = scorePlacement(answers((e) => !['pl-g01', 'pl-g02', 'pl-g03'].includes(e.id)))
  expect(b2only.grammarLevel).toBe('below A2')
  expect(b2only.weak).toEqual(expect.arrayContaining(['third_person', 'questions_do', 'present_continuous']))
  const b1 = scorePlacement(answers((e) => !['pl-g11', 'pl-g12', 'pl-g13'].includes(e.id)))
  expect(b1.grammarLevel).toBe('B1')
})

test('taking the check: no marking during it, then the profile; a weak result turns support on', async () => {
  render(<PlacementCheck onExit={() => {}} onClose={() => {}} closeLabel="Готово" />)
  click('Начать')
  for (const part of PLACEMENT.parts) {
    click('Дальше')
    for (const { exercise } of part.items) {
      const steps = exercise.type === 'reading' || exercise.type === 'listening' ? exercise.questions.length : 1
      for (let q = 0; q < steps; q++) {
        if (exercise.type === 'choice' || exercise.type === 'reading' || exercise.type === 'listening') {
          // Always the first option: mostly wrong.
          fireEvent.click(document.querySelector<HTMLElement>('.option')!)
        } else {
          fireEvent.change(screen.getByRole('textbox'), { target: { value: 'I do not know' } })
          click('Проверить')
        }
        expect(await screen.findByText('Ответ принят')).toBeInTheDocument()
        expect(document.querySelector('.option.right, .option.wrong')).toBeNull()
        expect(screen.queryByText('Правильно так')).toBeNull()
        click(/^(Дальше|К следующей части|Закончить проверку)$/)
      }
    }
  }
  expect(await screen.findByText('Результат проверки')).toBeInTheDocument()
  expect(screen.getByText('Режим поддержки включён')).toBeInTheDocument()
  const { settings } = useClub.getState()
  expect(settings.support).toBe(true)
  expect(settings.placements).toHaveLength(1)
  expect(settings.placements![0]!.parts.writing).toEqual({ correct: 0, total: 3 })
})
