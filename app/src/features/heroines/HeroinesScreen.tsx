import { navigate } from '../../app/router'
import { CHARACTERS, isOpen } from '../../content/characters'
import { useClub } from '../../data/store'
import { Sprite } from '../../story/Stage'
import { HEROINE_IDS } from '../../story/sprites'
import { Icon } from '../../ui/Icon'
import { Card } from '../../ui/kit'

export function HeroinesScreen() {
  const { units, flags, settings } = useClub()
  return (
    <div className="screen">
      {HEROINE_IDS.map((id) => {
        const c = CHARACTERS[id]!
        const memories = c.memories.filter((m) => isOpen(m.unlock, units, flags, settings.unlockAll)).length
        const quests = c.quests.filter((q) => flags[q.flag]).length
        return (
          <button key={id} className={`card heroine-card route-${id}`} onClick={() => navigate({ name: 'heroine', id })}>
            <div className="heroine-card-text">
              <h2 className="card-title">{c.name}</h2>
              <p>{c.about}</p>
              <p className="heroine-counts" aria-label={`Воспоминаний: ${memories}, квестов: ${quests} из ${c.quests.length}`}>
                <span>
                  <Icon name="memory" size={18} />
                  {memories}
                </span>
                <span>
                  <Icon name="nav-quests" size={18} />
                  {quests}/{c.quests.length}
                </span>
              </p>
            </div>
            <Sprite heroine={id} expr="happy" size="avatar" />
          </button>
        )
      })}
      <Card>
        <p className="muted">Нажми на героиню: там то, что ты о ней узнал, общие воспоминания, личные квесты и можно поболтать.</p>
      </Card>
    </div>
  )
}
