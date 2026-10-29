import { act, renderHook } from '@testing-library/react'
import { mouthStart, mouthStop, useMouth } from './mouth'

test('the speaking heroine flaps her mouth, others stay silent', () => {
  vi.useFakeTimers()
  const rei = renderHook(() => useMouth('rei'))
  const mika = renderHook(() => useMouth('mika'))
  act(() => mouthStart('rei'))
  expect(rei.result.current).toBe('closed')
  act(() => void vi.advanceTimersByTime(150))
  expect(rei.result.current).toBe('open')
  expect(mika.result.current).toBeUndefined()
  act(() => mouthStop())
  expect(rei.result.current).toBeUndefined()
  vi.useRealTimers()
})
