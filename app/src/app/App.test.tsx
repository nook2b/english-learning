import { act, fireEvent, render, screen } from '@testing-library/react'
import { db } from '../data/db'
import { useClub } from '../data/store'
import { App } from './App'
import { line } from '../test/line'

beforeEach(async () => {
  await db.delete()
  await db.open()
  useClub.setState({ ready: false })
  window.location.hash = ''
})

test('a newcomer starts with the prologue', async () => {
  render(<App />)
  expect(await screen.findByRole('button', { name: /Начать: пролог «Не тот кабинет»/ })).toBeInTheDocument()
})

const afterPrologue = () => db.flags.bulkPut([{ id: 'prologue_completed', at: 1 }, { id: 'placement_completed', at: 1 }])

test('after the prologue and the check, continue opens the first session', async () => {
  await afterPrologue()
  render(<App />)
  expect(await screen.findByRole('button', { name: /Продолжить: юнит 001, занятие 1/ })).toBeInTheDocument()
})

test('continue opens the session player', async () => {
  await afterPrologue()
  render(<App />)
  fireEvent.click(await screen.findByRole('button', { name: /Продолжить/ }))
  expect(await screen.findByText(line(/You're back!/))).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: 'Дальше' }))
  fireEvent.click(screen.getByRole('button', { name: 'Начать' }))
  expect(await screen.findByText(/Занятие 1\. Понимание/)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Выйти из занятия' })).toBeInTheDocument()
})

test('daily goal choice is saved', async () => {
  render(<App />)
  await screen.findByRole('button', { name: /Начать: пролог/ })
  act(() => {
    window.location.hash = '/profile'
  })
  await act(async () => {
    fireEvent.click(await screen.findByRole('radio', { name: '30 мин' }))
  })
  expect((await db.settings.get('settings'))?.dailyGoalMinutes).toBe(30)
})

test('a locked session stays locked from a direct link', async () => {
  window.location.hash = '/session/003/1'
  render(<App />)
  expect(await screen.findByText(/Это занятие пока закрыто/)).toBeInTheDocument()
})

test('a new player cannot open unit 001 before the prologue and the check, even by link', async () => {
  window.location.hash = '/session/001/1'
  render(<App />)
  expect(await screen.findByText(/Это занятие пока закрыто/)).toBeInTheDocument()
})
