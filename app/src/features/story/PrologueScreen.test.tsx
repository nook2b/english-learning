import { fireEvent, render, screen, within } from '@testing-library/react'
import { db } from '../../data/db'
import { useClub } from '../../data/store'
import { PrologueScreen } from './PrologueScreen'

beforeEach(async () => {
  await db.delete()
  await db.open()
  await useClub.getState().init()
})

const click = (name: string | RegExp) => fireEvent.click(screen.getByRole('button', { name }))
const next = () => screen.findByRole('button', { name: /^(Дальше|Завершить занятие)$/ })

test('the prologue: survey, wrong door, ask the way again, introduce yourself, then the check and the way back', async () => {
  render(<PrologueScreen />)
  // The survey comes first, once.
  fireEvent.click(screen.getByRole('radio', { name: '15 мин' }))
  fireEvent.click(within(screen.getByRole('radiogroup', { name: /Понимать речь/ })).getByRole('radio', { name: 'С трудом' }))
  click('Дальше')
  await screen.findByText('Пролог')
  expect(useClub.getState().settings).toMatchObject({ dailyGoalMinutes: 15, survey: { self: { listening: 'hard' } } })
  for (let i = 0; i < 3; i++) click('Дальше')
  // Ask for the way again, built from the tiles on the screen.
  click('Попросить повторить маршрут')
  const bank = within(document.querySelector<HTMLElement>('.tiles-bank')!)
  for (const w of ['Could', 'you', 'say', 'that', 'again,', 'please?']) fireEvent.click(bank.getAllByRole('button', { name: w }).find((b) => !b.hasAttribute('disabled'))!)
  click('Проверить')
  fireEvent.click(await next())
  // Introduce yourself with your own name: any name is fine and is kept for later.
  click('Представиться')
  fireEvent.change(screen.getByRole('textbox'), { target: { value: "Nice to meet you. I'm Ivan." } })
  click('Проверить')
  expect(await screen.findByText('Верно')).toBeInTheDocument()
  click('Завершить занятие')
  for (let i = 0; i < 3; i++) click('Дальше')
  expect(await screen.findByText('Кабинет 70, новый корпус')).toBeInTheDocument()
  click('Начать проверку')
  expect(await screen.findByText('Вступительная проверка')).toBeInTheDocument()
  // The check itself is covered in PlacementCheck.test.tsx.
  await useClub.getState().remember('placement_completed')
  expect(useClub.getState().flags).toMatchObject({ prologue_asked_again: true, prologue_introduced: true, prologue_completed: true, placement_completed: true })
  expect(useClub.getState().settings.name).toBe('Ivan')
})

test('coming back after the prologue resumes at the check, not at the meeting', async () => {
  await useClub.getState().remember('prologue_completed')
  render(<PrologueScreen />)
  expect(screen.getByText('Кабинет 70, новый корпус')).toBeInTheDocument()
})
