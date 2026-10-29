import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { db } from '../data/db'
import { useClub } from '../data/store'
import { App } from './App'

beforeEach(async () => {
  await db.delete()
  await db.open()
  useClub.setState({ ready: false })
  window.location.hash = ''
})

test('opens on the path screen with the first unit', async () => {
  render(<App />)
  expect(await screen.findByRole('button', { name: /Продолжить: юнит 001/ })).toBeInTheDocument()
})

test('stub session records minutes, and finishing a unit moves the path on', async () => {
  render(<App />)
  fireEvent.click(await screen.findByRole('button', { name: /Продолжить/ }))
  for (let i = 1; i <= 8; i++) {
    const finish = await screen.findByRole('button', { name: /Завершить занятие/ })
    await waitFor(() => expect(finish).toBeEnabled())
    fireEvent.click(finish)
    if (i < 8) await screen.findByText(`Занятие ${i + 1} из 8`, { exact: false })
  }
  expect(await screen.findByRole('button', { name: /Продолжить: юнит 002/ })).toBeInTheDocument()
  expect(await db.units.get('001')).toMatchObject({ status: 'done' })
  expect(useClub.getState().days[0]?.minutes).toBe(64)
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
