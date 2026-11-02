import { shownWith } from './schema'

test('a line or task with a story condition shows only for that earlier choice', () => {
  const flags = { u006_check_light_first: true }
  expect(shownWith({}, flags)).toBe(true)
  expect(shownWith({ if: 'u006_check_light_first' }, flags)).toBe(true)
  expect(shownWith({ ifNot: 'u006_check_light_first' }, flags)).toBe(false)
  expect(shownWith({ if: 'u008_layout_window' }, flags)).toBe(false)
  expect(shownWith({ ifNot: 'u008_layout_window' }, flags)).toBe(true)
})
