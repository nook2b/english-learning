import { Sprite } from '../../story/Stage'
import type { HeroineId } from '../../story/sprites'
import { Card } from '../../ui/kit'

const HEROINES: { id: HeroineId; name: string; about: string }[] = [
  { id: 'mika', name: 'Мика', about: 'Организует, договаривается, считает бюджет. Хочет стать продюсером культурных событий.' },
  { id: 'rei', name: 'Рэй', about: 'Звук и музыка. Знает город по акустике дворов и остановок.' },
  { id: 'iris', name: 'Айрис', about: 'Тексты и редактура. Хочет писать прозу и подать рассказ на конкурс.' },
]

export function HeroinesScreen() {
  return (
    <div className="screen">
      {HEROINES.map((h) => (
        <Card key={h.id} title={h.name}>
          <div className="heroine">
            <Sprite heroine={h.id} expr="happy" size="avatar" />
            <div>
              <p>{h.about}</p>
              <p className="muted">Этап: знакомые</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
