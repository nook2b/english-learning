import { act, fireEvent, render, screen } from '@testing-library/react'
import { db } from '../../data/db'
import { useClub } from '../../data/store'
import { PathScreen } from './PathScreen'

beforeEach(async () => {
  await db.delete()
  await db.open()
  await useClub.getState().init()
})

test('the route marks done, current and locked stations; an open one starts its session', () => {
  const s = { id: '001-1', unitId: '001', index: 1, correct: 1, total: 1, seconds: 60, completedAt: 1 }
  // Session 2 opens after the invitation of session 1 is accepted.
  act(() => useClub.setState({ sessions: { '001-1': s }, flags: { u001_guide_trial_accepted: true } }))
  const { container } = render(<PathScreen />)
  const stops = [...container.querySelectorAll('.route-unit')][0]!.querySelectorAll('.route-stop')
  expect(stops[0]).toHaveClass('route-stop-done')
  expect(stops[1]).toHaveClass('route-stop-next')
  expect(stops[2]).toHaveClass('route-stop-locked')
  expect(stops[2]!.querySelector('button')).toBeDisabled()
  fireEvent.click(screen.getAllByRole('button', { name: /1\. Памятка первой недели/ })[0]!)
  expect(location.hash).toBe('#/session/001/1')
})
