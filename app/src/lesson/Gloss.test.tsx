import { fireEvent, render, screen } from '@testing-library/react'
import { Gloss } from './Gloss'
import { GlossaryContext } from './glossary'

const entries = [
  { en: 'right now', ru: 'прямо сейчас', target: true },
  { en: 'dining hall', ru: 'столовая', target: false },
]

test('only unit expressions are underlined and say so; any word translates', () => {
  const { container } = render(
    <GlossaryContext.Provider value={entries}>
      <Gloss text="Right now we're in the dining hall." />
    </GlossaryContext.Provider>,
  )
  expect([...container.querySelectorAll('.gloss-target')].map((e) => e.textContent)).toEqual(['Right now'])
  fireEvent.click(screen.getByRole('button', { name: 'Right now' }))
  expect(screen.getByRole('note')).toHaveTextContent('Учим в этом юнитеright now — прямо сейчас')
  // A set phrase is not marked but translates as a whole.
  fireEvent.click(screen.getByRole('button', { name: 'dining hall' }))
  expect(screen.getByRole('note')).toHaveTextContent(/^dining hall — столовая$/)
  fireEvent.click(screen.getByRole('button', { name: "we're" }))
  expect(screen.getByRole('note')).toHaveTextContent("we're — we are")
})
