import { act, fireEvent, render, screen } from '@testing-library/react'
import { db } from '../data/db'
import { useClub } from '../data/store'
import { App } from './App'

beforeEach(async () => {
  await db.delete()
  await db.open()
  useClub.setState({ ready: false })
  window.location.hash = ''
})

test('opens on the path screen with the first session', async () => {
  render(<App />)
  expect(await screen.findByRole('button', { name: /Продолжить: юнит 001, занятие 1/ })).toBeInTheDocument()
})

test('continue opens the session player', async () => {
  render(<App />)
  fireEvent.click(await screen.findByRole('button', { name: /Продолжить/ }))
  expect(await screen.findByText(/Занятие 1\. Понимание/)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Выйти из занятия' })).toBeInTheDocument()
})

test('daily goal choice is saved', async () => {
  render(<App />)
  await screen.findByRole('button', { name: /Продолжить/ })
  act(() => {
    window.location.hash = '/profile'
  })
  await act(async () => {
    fireEvent.click(await screen.findByRole('radio', { name: '30 мин' }))
  })
  expect((await db.settings.get('settings'))?.dailyGoalMinutes).toBe(30)
})
