import { useState } from 'react'
import { navigate } from '../../app/router'
import { ARC_CHECKS, type BlockScore, scoreArcCheck } from '../../content/arcChecks'
import { useClub } from '../../data/store'
import { type Attempt, ExerciseRun } from '../../lesson/ExerciseRun'
import { Gloss, Translation } from '../../lesson/Gloss'
import { SPEAKER_NAMES } from '../../lesson/model'
import { LineVoice } from '../../speech/AudioControls'
import { haptic } from '../../speech/haptics'
import { playSfx } from '../../speech/sfx'
import { Button, Card, DialogueBox, ProgressBar } from '../../ui/kit'

/** XP for the check, as for a module's end task (plan 3.9). */
const ARC_CHECK_XP = 30

/**
 * The check at the end of an arc: a new place and new material on every skill
 * of the arc, answers marked as usual, then the result per block and a line
 * from a heroine. It never holds the story back; it can be taken again.
 */
export function ArcCheckScreen({ id }: { id: string }) {
  const check = ARC_CHECKS[id]
  const { settings, updateSettings, recordSession, noteMistake } = useClub()
  const [running, setRunning] = useState(false)
  const [result, setResult] = useState<Record<string, BlockScore>>()
  const always = settings.translation === 'always' || settings.support
  if (!check) return <div className="screen"><Card title="Проверка не найдена"><Button onClick={() => navigate({ name: 'path' })}>На путь</Button></Card></div>
  const previous = settings.arcChecks?.[id]?.at(-1)

  const finish = async (attempts: Attempt[], seconds: number) => {
    const blocks = scoreArcCheck(check, attempts)
    await updateSettings({ arcChecks: { ...settings.arcChecks, [id]: [...(settings.arcChecks?.[id] ?? []), { at: Date.now(), blocks }] } })
    await recordSession(Math.max(1, Math.round(Math.min(seconds, 30 * 60) / 60)), ARC_CHECK_XP)
    if (settings.sounds) playSfx('done')
    haptic('done')
    setRunning(false)
    setResult(blocks)
  }

  if (result)
    return (
      <div className="screen">
        <Card title={`${check.title}: результат`}>
          <div className="skill-bars">
            {check.blocks.map((b) => {
              const { correct, total } = result[b.id]!
              const before = previous?.blocks[b.id]
              return (
                <div key={b.id} className="skill-bar">
                  <span>{b.title}</span>
                  <ProgressBar value={correct} max={total} label={b.title} />
                  <span className="muted">
                    {correct}/{total}
                    {before && before.correct !== correct && ` (было ${before.correct})`}
                  </span>
                </div>
              )
            })}
          </div>
          <p className="muted">Ошибки ушли в повторение по темам. Проверка ничего не закрывает: история идёт дальше, а пройти её снова можно с пути.</p>
        </Card>
        <DialogueBox speaker={SPEAKER_NAMES[check.outro.speaker] || undefined}>
          <LineVoice text={check.outro.text} speaker={check.outro.speaker} expr={check.outro.expr} delivery={check.outro.delivery} />
          <Gloss text={check.outro.text} />
          <Translation ru={check.outro.ru} always={always} />
        </DialogueBox>
        <Button onClick={() => navigate({ name: 'path' })}>На путь</Button>
      </div>
    )

  if (!running)
    return (
      <div className="screen">
        <Card title={check.title}>
          <p>{check.setting}</p>
          <p className="muted">
            {check.blocks.reduce((n, b) => n + b.exercises.length, 0)} заданий, {check.blocks.length} частей: {check.blocks.map((b) => b.title.toLowerCase()).join('; ')}. Ответы отмечаются сразу, в конце — результат по каждой части.
          </p>
        </Card>
        <Button onClick={() => setRunning(true)}>Начать</Button>
        <Button variant="secondary" onClick={() => navigate({ name: 'path' })}>
          Позже
        </Button>
      </div>
    )

  return (
    <ExerciseRun
      exercises={check.blocks.flatMap((b) => b.exercises)}
      heading={check.title}
      finishLabel="Закончить проверку"
      // A wrong first answer goes to review by its topic, as in the sessions.
      onAnswer={(exercise, o, retry) => {
        if (!retry && o.correct === false) void noteMistake({ exerciseId: exercise.id, tags: exercise.tags, given: o.given, expected: o.shown ?? o.expected, at: Date.now() }).catch(() => {})
      }}
      onFinish={finish}
      onExit={() => navigate({ name: 'path' })}
      resumeKey={`arc-${id}`}
    />
  )
}
