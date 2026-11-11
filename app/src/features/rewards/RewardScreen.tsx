import { useState } from 'react'
import { navigate } from '../../app/router'
import { rewardLine } from '../../content/rewards'
import { dayKey } from '../../data/dates'
import { type Reward, useClub } from '../../data/store'
import { plural } from '../review/pairs'
import { RewardArt } from '../../story/RewardArt'
import { Icon } from '../../ui/Icon'
import { Button } from '../../ui/kit'

/** What a reward screen says: title, what happened, crystals, art and whose line. */
function describe(r: Reward) {
  switch (r.kind) {
    case 'quest':
      return { heroine: r.heroine, moment: 'quest' as const, title: 'Задание дня выполнено', text: r.quest.title, crystals: r.quest.crystals }
    case 'streak':
      return { heroine: 'mika' as const, moment: 'streak' as const, trio: 'streak' as const, title: `${r.days} ${plural(r.days, 'день', 'дня', 'дней')} подряд`, text: 'Серия дней без пропусков. Так и держать.' }
    case 'welcome':
      return { heroine: r.heroine, moment: 'welcome' as const, title: 'С возвращением', text: `Тебя не было ${r.away} ${plural(r.away, 'день', 'дня', 'дней')}. Можно начать с короткого повторения или сразу продолжить путь.` }
    case 'challenge_win':
      return { heroine: 'rei' as const, moment: 'challenge_win' as const, title: 'Челлендж Рэй выигран', text: `${r.minutes} мин за неделю, цель была ${r.target}.`, crystals: 50 }
    case 'challenge_next':
      return { heroine: 'rei' as const, moment: 'challenge_next' as const, title: 'Челлендж Рэй: в другой раз', text: `${r.minutes} из ${r.target} мин за прошлую неделю. Проиграть не страшно: новая неделя уже идёт.` }
  }
}

/** The first waiting reward, over the whole screen; "Продолжить" shows the next one. */
export function RewardScreen() {
  const reward = useClub((s) => s.rewards[0])
  const dismiss = useClub((s) => s.dismissReward)
  const [ru, setRu] = useState(false)
  if (!reward) return null
  const d = describe(reward)
  const line = rewardLine(d.moment, d.heroine, dayKey().split('-').reduce((n, p) => n + Number(p), 0))
  const close = () => {
    setRu(false)
    dismiss()
  }
  return (
    <div className={`reward-screen route-${d.heroine}`} role="dialog" aria-modal="true" aria-label={d.title}>
      <RewardArt heroine={d.heroine} moment={d.moment === 'streak' ? 'quest' : d.moment} trio={'trio' in d ? d.trio : undefined} label={d.title} />
      <h1 className="summary-title">{d.title}</h1>
      <p className="muted">{d.text}</p>
      {d.crystals ? (
        <p className="reward-crystals">
          <Icon name="crystal" size={22} /> +{d.crystals}
        </p>
      ) : null}
      {line && (
        <button className="reward-line" onClick={() => setRu(!ru)}>
          <span lang="en">{line.en}</span>
          {ru ? <span className="muted">{line.ru}</span> : <span className="chat-link">Перевод</span>}
        </button>
      )}
      {reward.kind === 'welcome' ? (
        <div className="actions">
          <Button onClick={() => (close(), navigate({ name: 'review' }))}>Короткое повторение</Button>
          <Button variant="secondary" onClick={close}>
            Продолжить путь
          </Button>
        </div>
      ) : (
        <Button onClick={close}>Продолжить</Button>
      )}
    </div>
  )
}
