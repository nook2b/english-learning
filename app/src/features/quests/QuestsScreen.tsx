import { navigate } from '../../app/router'
import { CHARACTERS } from '../../content/characters'
import { dayKey } from '../../data/dates'
import { FREEZE_PRICE, MAX_FREEZES, challengeProgress, challengeTarget, dailyQuests, questDone, questKey, weekStart } from '../../data/rewards'
import { useClub } from '../../data/store'
import { HEROINE_IDS } from '../../story/sprites'
import { Icon } from '../../ui/Icon'
import { Button, Card, ProgressBar } from '../../ui/kit'

/**
 * Quests: why come back today. Three daily quests and Rei's weekly challenge
 * pay crystals (data/rewards.ts); crystals buy streak freezes. The heroines'
 * personal quests come from the story: each heroine shows her nearest one.
 */
export function QuestsScreen() {
  const { flags, days, settings, wallet, buyFreeze } = useClub()
  const today = dayKey()
  const day = days.find((d) => d.date === today)
  const quests = dailyQuests(today)
  const challengeOn = settings.challenge !== false
  const target = challengeTarget(days, today, settings.dailyGoalMinutes)
  const minutes = challengeProgress(days, today)
  const won = wallet.challengeWon.includes(weekStart(today))
  return (
    <div className="screen">
      <Card title={<><Icon name="nav-quests" />Задания дня</>}>
        <ul className="list daily-quests">
          {quests.map((q) => {
            const have = Math.min(day?.[q.counter] ?? 0, q.need)
            const done = questDone(day, q) || wallet.quests.includes(questKey(today, q))
            return (
              <li key={q.id} className={done ? 'quest-done' : undefined}>
                <span className="quest-title">
                  {done ? <Icon name="check" size={18} /> : null}
                  {q.title}
                </span>
                <ProgressBar value={have} max={q.need} label={`${q.title}: ${have} из ${q.need}`} />
                <span className="quest-pay">
                  <Icon name="crystal" size={16} />
                  {q.crystals}
                </span>
              </li>
            )
          })}
        </ul>
        <p className="muted">Новые задания — каждый день в полночь.</p>
      </Card>
      <Card title={<><Icon name="challenge" />Недельный челлендж с Рэй</>}>
        {challengeOn ? (
          <>
            <p className="muted">Цель Рэй — чуть больше, чем ты успел за прошлую неделю. Проиграть не страшно.</p>
            <ProgressBar value={Math.min(minutes, target)} max={target} label={`Челлендж: ${minutes} из ${target} мин`} />
            <p className="challenge-line">
              <span>{won ? 'Выигран на этой неделе ✓' : `${minutes} из ${target} мин за неделю`}</span>
              <span className="quest-pay">
                <Icon name="crystal" size={16} />
                50
              </span>
            </p>
          </>
        ) : (
          <p className="muted">Выключен. Включить можно в профиле.</p>
        )}
      </Card>
      <Card title={<><Icon name="shop" />Магазин</>}>
        <p className="shop-balance">
          <Icon name="crystal" size={20} /> {wallet.crystals} кристаллов
        </p>
        <div className="shop-item">
          <Icon name="freeze" size={32} />
          <div>
            <b>Заморозка серии</b>
            <p className="muted">Спасает серию за пропущенный день, срабатывает сама. В запасе: {wallet.freezes} из {MAX_FREEZES}.</p>
          </div>
          <Button variant="secondary" disabled={wallet.crystals < FREEZE_PRICE || wallet.freezes >= MAX_FREEZES} onClick={() => void buyFreeze()}>
            {FREEZE_PRICE}
          </Button>
        </div>
        <p className="muted">Кристаллы: 5 за занятие, +5 без ошибок, 10 за дневную цель, 10–15 за задание дня, 50 за челлендж Рэй.</p>
      </Card>
      <Card title={<><Icon name="star" />Личные квесты героинь</>}>
        <ul className="list quests">
          {HEROINE_IDS.map((id) => {
            const c = CHARACTERS[id]!
            const next = c.quests.find((q) => !flags[q.flag])
            return (
              <li key={id} className={`quest-row route-${id}`}>
                <button className="link" onClick={() => navigate({ name: 'heroine', id })}>
                  {c.name}: {next ? next.title : 'все квесты пройдены'}
                </button>
                {next && <span className="muted">юниты {next.window}</span>}
              </li>
            )
          })}
        </ul>
      </Card>
    </div>
  )
}
