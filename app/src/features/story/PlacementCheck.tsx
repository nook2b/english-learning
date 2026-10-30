import { useRef, useState } from 'react'
import { LEVEL_TEXT, needsSupport, overall, PARTS, type Part, PLACEMENT, scorePlacement } from '../../content/placement'
import { TAGS } from '../../content/tags'
import type { PlacementResult } from '../../data/db'
import { useClub } from '../../data/store'
import { type Attempt, ExerciseRun } from '../../lesson/ExerciseRun'
import { playSfx } from '../../speech/sfx'
import { Button, Card, LearnPanel, ProgressBar } from '../../ui/kit'

const PART_LABELS: Record<Part, string> = { grammar: 'Грамматика', reading: 'Чтение', listening: 'Аудирование', writing: 'Письмо' }

/**
 * The placement check in Room 70: four parts in exam mode (no marking during
 * the check), then the skill profile. The result is saved to settings and
 * turns support mode on when needed; units are never skipped.
 */
export function PlacementCheck({ onExit, onClose, closeLabel }: { onExit: () => void; onClose: () => void; closeLabel: string }) {
  const { settings, updateSettings } = useClub()
  const [part, setPart] = useState(-1)
  const [running, setRunning] = useState(false)
  const attempts = useRef<Attempt[]>([])
  const [result, setResult] = useState<PlacementResult>()
  const previous = useRef(settings.placements?.at(-1))
  const supportBefore = useRef(settings.support)

  const finishPart = async (a: Attempt[]) => {
    attempts.current.push(...a)
    setRunning(false)
    if (part < PLACEMENT.parts.length - 1) return setPart(part + 1)
    const r = scorePlacement(attempts.current)
    await updateSettings({ placements: [...(settings.placements ?? []), r], support: settings.support || needsSupport(r, settings.survey) })
    if (settings.sounds) playSfx('done')
    setResult(r)
  }

  if (result)
    return (
      <div className="screen">
        <PlacementCard result={result} previous={previous.current} title="Результат проверки" />
        {!supportBefore.current && useClub.getState().settings.support && (
          <LearnPanel title="Режим поддержки включён">
            Переводы реплик будут видны сразу, фразы можно собирать из слов, озвучка сначала звучит медленнее. Выключить можно в профиле, когда станет легко.
          </LearnPanel>
        )}
        {supportBefore.current && !needsSupport(result, settings.survey) && <p className="muted">Режим поддержки, похоже, больше не нужен — его можно выключить в профиле.</p>}
        <Button onClick={onClose}>{closeLabel}</Button>
      </div>
    )

  if (part === -1)
    return (
      <div className="screen">
        <Card title="Вступительная проверка">
          <p lang="en">{PLACEMENT.intro}</p>
          <p className="muted">Около десяти минут, четыре части: {PLACEMENT.parts.map((p) => p.title.toLowerCase()).join(', ')}. Во время проверки ответы не отмечаются — результат покажем в конце.</p>
        </Card>
        <Button onClick={() => setPart(0)}>Начать</Button>
        <Button variant="secondary" onClick={onExit}>
          Позже
        </Button>
      </div>
    )

  const current = PLACEMENT.parts[part]!
  const heading = `Проверка · ${part + 1}/${PLACEMENT.parts.length} · ${current.title}`
  if (!running)
    return (
      <div className="screen">
        <ProgressBar value={part} max={PLACEMENT.parts.length} label="Части проверки" />
        <Card title={heading}>
          <p>{current.intro}</p>
        </Card>
        <Button onClick={() => setRunning(true)}>Дальше</Button>
      </div>
    )
  return (
    <ExerciseRun
      key={current.id}
      exam
      exercises={current.items.map((i) => i.exercise)}
      heading={heading}
      finishLabel={part < PLACEMENT.parts.length - 1 ? 'К следующей части' : 'Закончить проверку'}
      onFinish={finishPart}
      onExit={onExit}
    />
  )
}

/** The skill profile from a placement check, with the change since the previous one. */
export function PlacementCard({ result, previous, title }: { result: PlacementResult; previous?: PlacementResult; title: string }) {
  const weak = result.weak.map((t) => TAGS[t]?.ru).filter(Boolean)
  return (
    <Card title={title}>
      <p>
        Грамматика: <strong>{result.grammarLevel === 'below A2' ? 'ниже A2' : result.grammarLevel}</strong> — {LEVEL_TEXT[result.grammarLevel]}.
      </p>
      <div className="skill-bars">
        {PARTS.map((p) => {
          const { correct, total } = result.parts[p]
          const before = previous?.parts[p]
          return (
            <div key={p} className="skill-bar">
              <span>{PART_LABELS[p]}</span>
              <ProgressBar value={correct} max={total} label={PART_LABELS[p]} />
              <span className="muted">
                {correct}/{total}
                {before && before.correct !== correct && ` (было ${before.correct})`}
              </span>
            </div>
          )
        })}
      </div>
      <p className="muted">Всего верно: {Math.round(overall(result) * 100)}%</p>
      {weak.length > 0 && (
        <>
          <p>Над чем поработать:</p>
          <ul>
            {weak.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </>
      )}
      <p className="muted">Проверка не пропускает юниты: история идёт по порядку, а то, что уже знакомо, будет просто быстрее.</p>
    </Card>
  )
}
