import { act, fireEvent, render, screen } from '@testing-library/react'
import { db } from '../../data/db'
import { dayKey } from '../../data/dates'
import { dailyQuests } from '../../data/rewards'
import { useClub } from '../../data/store'
import { RewardScreen } from './RewardScreen'

beforeEach(async () => {
  await db.delete()
  await db.open()
  await useClub.getState().init()
})

test('sessions earn crystals, and the daily sessions quest shows its reward screen once', async () => {
  const quest = dailyQuests(dayKey())[0]!
  await act(async () => {
    for (let i = 1; i <= quest.need; i++) await useClub.getState().finishSession({ unitId: '001', index: i, correct: 3, total: 3, seconds: 60 })
  })
  const { wallet, rewards } = useClub.getState()
  // 5 + 5 for each perfect session, plus the quest
  expect(wallet.crystals).toBeGreaterThanOrEqual(10 * quest.need + quest.crystals)
  expect(rewards.filter((r) => r.kind === 'quest' && r.quest.id === quest.id)).toHaveLength(1)
  useClub.setState({ rewards: rewards.filter((r) => r.kind === 'quest' && r.quest.id === quest.id) })
  render(<RewardScreen />)
  expect(screen.getByText('Задание дня выполнено')).toBeInTheDocument()
  expect(screen.getByText(quest.title)).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: 'Продолжить' }))
  expect(screen.queryByText('Задание дня выполнено')).toBeNull()
  // Settling again pays nothing twice.
  const crystals = useClub.getState().wallet.crystals
  await act(async () => useClub.getState().settle())
  expect(useClub.getState().rewards.filter((r) => r.kind === 'quest')).toHaveLength(0)
  expect(useClub.getState().wallet.crystals).toBe(crystals)
})

test('a streak freeze costs 50 crystals and at most two are kept', async () => {
  await act(async () => {
    await db.wallet.put({ ...useClub.getState().wallet, crystals: 200 })
    await useClub.getState().init()
  })
  expect(await useClub.getState().buyFreeze()).toBe(true)
  expect(await useClub.getState().buyFreeze()).toBe(true)
  expect(await useClub.getState().buyFreeze()).toBe(false)
  expect(useClub.getState().wallet).toMatchObject({ crystals: 100, freezes: 2 })
})
