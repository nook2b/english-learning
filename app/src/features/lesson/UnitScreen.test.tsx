import { render, screen } from '@testing-library/react'
import { db } from '../../data/db'
import { useClub } from '../../data/store'
import { UnitScreen } from './UnitScreen'

beforeEach(async () => {
  await db.delete()
  await db.open()
  await useClub.getState().init()
})

test('the unit notebook shows key phrases with examples and the grammar, not the session list', () => {
  const { container } = render(<UnitScreen unitId="002" />)
  expect(screen.getByRole('heading', { name: 'Уточнить вопрос' })).toBeInTheDocument()
  expect(screen.getByText('Ключевые фразы')).toBeInTheDocument()
  expect(container.querySelectorAll('.guide-phrase').length).toBe(10)
  expect(screen.getByText('Грамматика')).toBeInTheDocument()
  expect(container.querySelector('.unit-list')).toBeNull()
})
