import { fireEvent, render, screen } from '@testing-library/react'
import { db } from '../../data/db'
import { useClub } from '../../data/store'
import { HeroineScreen } from './HeroineScreen'
import { line } from '../../test/line'

beforeEach(async () => {
  await db.delete()
  await db.open()
  await useClub.getState().init()
  await useClub.getState().updateSettings({ voice: false })
})

test('before the first unit there is little to see, quests show their windows', () => {
  render(<HeroineScreen id="rei" />)
  expect(screen.getByText('Пока ничего. Узнаешь по ходу истории.')).toBeInTheDocument()
  expect(screen.getByText('откроется в юнитах 033–036')).toBeInTheDocument()
})

test('a finished unit and a scene choice open facts, a memory and chat', async () => {
  await useClub.getState().markUnit('001', 'done')
  await useClub.getState().remember('u001_asked_rei')
  render(<HeroineScreen id="rei" />)
  expect(screen.getByText(/Проверяет уровни звука/)).toBeInTheDocument()
  expect(screen.getByText(line(/You asked Rei what she was doing/))).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: 'Поболтать' }))
  expect(screen.getByText('Перевод')).toBeInTheDocument()
})

test('a memory that either of two choices opens shows once after a replay with the other choice', async () => {
  await useClub.getState().remember('u016_take_students')
  await useClub.getState().remember('u016_take_sound')
  render(<HeroineScreen id="rei" />)
  expect(screen.getAllByText(line(/You finally recorded ten seconds of the courtyard/))).toHaveLength(1)
})
