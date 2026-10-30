import { act, render, screen } from '@testing-library/react'
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
