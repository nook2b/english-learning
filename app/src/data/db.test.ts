import { ClubDB, addActivity, loadSettings, resetProgress, saveSettings, setUnitStatus } from './db'

let database: ClubDB
let n = 0

beforeEach(() => {
  database = new ClubDB(`test-${n++}`)
})

afterEach(async () => {
  await database.delete()
})

test('returns defaults before anything is saved', async () => {
  const settings = await loadSettings(database)
  expect(settings.dailyGoalMinutes).toBe(10)
  expect(settings.name).toBe('')
})

test('saves settings patches', async () => {
  await saveSettings({ name: 'Ivan' }, database)
  await saveSettings({ dailyGoalMinutes: 30 }, database)
  const settings = await loadSettings(database)
  expect(settings.name).toBe('Ivan')
  expect(settings.dailyGoalMinutes).toBe(30)
})

test('accumulates activity within a day', async () => {
  await addActivity('2026-10-29', 8, 10, database)
  const day = await addActivity('2026-10-29', 8, 15, database)
  expect(day).toEqual({ date: '2026-10-29', minutes: 16, xp: 25 })
})

test('reset clears progress but keeps settings', async () => {
  await saveSettings({ name: 'Ivan' }, database)
  await setUnitStatus('001', 'done', database)
  await addActivity('2026-10-29', 8, 10, database)
  await resetProgress(database)
  expect(await database.units.count()).toBe(0)
  expect(await database.days.count()).toBe(0)
  expect((await loadSettings(database)).name).toBe('Ivan')
})
