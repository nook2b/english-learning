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

test('the route marks done, current and locked stations; an open one starts its session', () => {
  const s = { id: '001-1', unitId: '001', index: 1, correct: 1, total: 1, seconds: 60, completedAt: 1 }
  act(() => useClub.setState({ sessions: { '001-1': s } }))
  const { container } = render(<PathScreen />)
  const stops = [...container.querySelectorAll('.route-unit')][0]!.querySelectorAll('.route-stop')
  expect(stops[0]).toHaveClass('route-stop-done')
  expect(stops[1]).toHaveClass('route-stop-next')
  expect(stops[2]).toHaveClass('route-stop-locked')
  expect(stops[2]!.querySelector('button')).toBeDisabled()
  fireEvent.click(screen.getAllByRole('button', { name: /1\. Письмо академии/ })[0]!)
  expect(location.hash).toBe('#/session/001/1')
})
