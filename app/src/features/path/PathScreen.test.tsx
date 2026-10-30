import { act, fireEvent, render, screen } from '@testing-library/react'
import { CHARACTERS } from '../../content/characters'
import { db } from '../../data/db'
import { useClub } from '../../data/store'
import { mouthStart, mouthStop } from '../../speech/mouth'
import { PathScreen } from './PathScreen'
import { line } from '../../test/line'

beforeEach(async () => {
  await db.delete()
  await db.open()
  await useClub.getState().init()
})

test('the heroine of the day moves her mouth while her greeting plays', () => {
  vi.useFakeTimers()
  const { container } = render(<PathScreen />)
  const host = (['mika', 'rei', 'iris'] as const).find((h) => screen.queryByText(line(CHARACTERS[h]!.greeting.text)))!
  expect(container.querySelector('.sprite-mouth')).toBeNull()
  act(() => mouthStart(host))
  act(() => void vi.advanceTimersByTime(150))
  expect(container.querySelector('.sprite-mouth')).not.toBeNull()
  act(() => mouthStop())
  expect(container.querySelector('.sprite-mouth')).toBeNull()
  vi.useRealTimers()
})

test('the path map marks done, current and locked stops, and a stop opens its session card', () => {
  const s = { id: '001-1', unitId: '001', index: 1, correct: 1, total: 1, seconds: 60, completedAt: 1 }
  act(() => useClub.setState({ sessions: { '001-1': s } }))
  render(<PathScreen />)
  const first = screen.getByRole('button', { name: 'Занятие 1. Письмо академии' })
  expect(first).toHaveClass('road-stop-done')
  expect(screen.getAllByRole('button', { name: /^Занятие 2\./ })[0]).toHaveClass('road-stop-next')
  expect(screen.getAllByRole('button', { name: /^Занятие 3\./ })[0]).toHaveClass('road-stop-locked')
  fireEvent.click(first)
  expect(screen.getByRole('button', { name: 'Пройти ещё раз' })).toBeInTheDocument()
})
