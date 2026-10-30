import { navigate } from '../../app/router'
import { CHARACTERS } from '../../content/characters'
import { useClub } from '../../data/store'
import { HEROINE_IDS } from '../../story/sprites'
import { Card } from '../../ui/kit'

/**
 * Quests: why come back today. Daily quests and Rei's weekly challenge
 * arrive with gamification (stage 6); the heroines' personal quests are
 * already in the content, so each heroine shows her nearest one.
 */
export function QuestsScreen() {
  const flags = useClub((s) => s.flags)
  return (
    <div className="screen">
      <Card title="Задания дня">
        <p className="muted">Три задания на день — «Пройди 2 занятия», «Повтори 20 карточек», «Скажи 3 фразы в микрофон» — с кристаллами в награду. Появятся вместе с магазином.</p>
      </Card>
      <Card title="Недельный челлендж с Рэй">
        <p className="muted">Рэй ставит цель чуть выше твоего среднего за прошлую неделю. Проиграть не страшно. Тоже появится вместе с магазином.</p>
      </Card>
      <Card title="Личные квесты героинь">
        <ul className="list quests">
          {HEROINE_IDS.map((id) => {
            const c = CHARACTERS[id]!
            const next = c.quests.find((q) => !flags[q.flag])
            return (
              <li key={id}>
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
