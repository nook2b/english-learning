import { useState } from 'react'
import { DAILY_GOALS, type DailyGoal, type SelfRating, type Skill, SKILLS, STRUGGLES, type SurveyAnswers } from '../../data/db'
import { useClub } from '../../data/store'
import { Button, Card } from '../../ui/kit'

const SKILL_LABELS: Record<Skill, string> = {
  reading: 'Читать короткие тексты: объявления, письма',
  listening: 'Понимать речь на слух',
  speaking: 'Говорить: рассказать о себе, спросить',
  writing: 'Писать короткие сообщения',
}
const RATINGS: { id: SelfRating; label: string }[] = [
  { id: 'can', label: 'Могу' },
  { id: 'hard', label: 'С трудом' },
  { id: 'cannot', label: 'Пока нет' },
]
const STRUGGLE_LABELS: Record<(typeof STRUGGLES)[number], string> = {
  tenses: 'Времена и грамматика',
  listening: 'Понимать на слух',
  speaking: 'Заговорить',
  writing: 'Писать без ошибок',
}

/**
 * The first-launch survey (plan 3.1), before the prologue: a name, a daily
 * goal and how the player rates their skills. With the placement check it
 * decides whether support mode is turned on.
 */
export function SurveyStep({ onDone }: { onDone: () => void }) {
  const { settings, updateSettings } = useClub()
  const [name, setName] = useState(settings.name)
  const [goal, setGoal] = useState<DailyGoal>(settings.dailyGoalMinutes)
  const [answers, setAnswers] = useState<SurveyAnswers>(settings.survey ?? { self: {} })

  const save = async () => {
    await updateSettings({ name: name.trim(), dailyGoalMinutes: goal, survey: answers })
    onDone()
  }

  return (
    <div className="screen">
      <Card title="Перед началом">
        <p>Пара вопросов, чтобы курс подстроился под тебя. Всё можно поменять потом в профиле.</p>
        <label className="field">
          Как к тебе обращаться
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Имя (можно латиницей)" />
        </label>
      </Card>

      <Card title="Сколько времени в день">
        <Chips label="Дневная цель" options={DAILY_GOALS.map((g) => ({ id: g, label: `${g} мин` }))} value={goal} onPick={setGoal} />
      </Card>

      <Card title="Что уже получается по-английски">
        {SKILLS.map((s) => (
          <div key={s} className="survey-row">
            <p>{SKILL_LABELS[s]}</p>
            <Chips label={SKILL_LABELS[s]} options={RATINGS} value={answers.self[s]} onPick={(r) => setAnswers({ ...answers, self: { ...answers.self, [s]: r } })} />
          </div>
        ))}
      </Card>

      <Card title="Что даётся труднее всего">
        <Chips
          label="Что труднее всего"
          options={STRUGGLES.map((s) => ({ id: s, label: STRUGGLE_LABELS[s] }))}
          value={answers.struggle}
          onPick={(s) => setAnswers({ ...answers, struggle: s })}
        />
      </Card>

      <Button onClick={save}>Дальше</Button>
    </div>
  )
}

function Chips<T extends string | number>({ label, options, value, onPick }: { label: string; options: readonly { id: T; label: string }[]; value?: T; onPick: (id: T) => void }) {
  return (
    <div className="chips" role="radiogroup" aria-label={label}>
      {options.map((o) => (
        <button key={o.id} role="radio" aria-checked={value === o.id} className={`chip ${value === o.id ? 'active' : ''}`} onClick={() => onPick(o.id)}>
          {o.label}
        </button>
      ))}
    </div>
  )
}
