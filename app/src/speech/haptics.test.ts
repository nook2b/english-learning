import { haptic, setHapticsEnabled } from './haptics'

test('vibration patterns per event, and the setting turns them off', () => {
  const vibrate = vi.fn()
  Object.defineProperty(navigator, 'vibrate', { value: vibrate, configurable: true })
  haptic('right')
  haptic('wrong')
  expect(vibrate).toHaveBeenNthCalledWith(1, 18)
  expect(vibrate).toHaveBeenNthCalledWith(2, [35, 50, 35])
  setHapticsEnabled(false)
  haptic('tap')
  expect(vibrate).toHaveBeenCalledTimes(2)
  setHapticsEnabled(true)
})
