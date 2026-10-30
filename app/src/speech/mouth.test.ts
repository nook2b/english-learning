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

test('a clip moves the mouth only once it is really playing', () => {
  vi.useFakeTimers()
  const audio = document.createElement('audio')
  const mika = renderHook(() => useMouth('mika'))
  act(() => mouthStart('mika', audio))
  // Still loading: she is the speaker, but the mouth stays shut.
  act(() => void vi.advanceTimersByTime(500))
  expect(mika.result.current).toBe('closed')
  // jsdom has no AudioContext, so a playing clip falls back to the timer.
  act(() => void audio.dispatchEvent(new Event('playing')))
  act(() => void vi.advanceTimersByTime(150))
  expect(mika.result.current).toBe('open')
  act(() => void audio.dispatchEvent(new Event('waiting')))
  act(() => void vi.advanceTimersByTime(500))
  expect(mika.result.current).toBe('closed')
  act(() => mouthStop())
  vi.useRealTimers()
})
