import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import type { Exercise, ExerciseOf, Line } from '../content/schema'
import { useExam } from './exam'
import { type Outcome, SPEAKER_NAMES, type Step, TIMELINE_LABELS, shuffled, supportTiles } from './model'
import { canRecognize, type ListenError, listen } from '../speech/recognition'
import { hasVoice, useVoicedLine } from '../speech/voice'
import { AudioControls, LineVoice } from '../speech/AudioControls'
import { Button, DialogueBox } from '../ui/kit'
import { checkTyped, matchesSpeech, checkWithName, NAME } from './check'
import { Options, TextAnswer, TileAnswer } from './inputs'
import { Gloss, Translation } from './Gloss'
import { Timeline } from './Timeline'
import { useClub, alwaysTranslate } from '../data/store'
import { castAt } from '../story/cast'
import { Stage } from '../story/Stage'

interface ViewProps<T extends Exercise['type']> {
  step: Step
  exercise: ExerciseOf<T>
  locked: boolean
  onAnswer: (o: Outcome) => void
}

export function ExerciseView({ step, locked, onAnswer }: { step: Step; locked: boolean; onAnswer: (o: Outcome) => void }) {
  return (
    <>
      {step.exercise.context && <p className="context">{step.exercise.context}</p>}
      <ExerciseBody step={step} locked={locked} onAnswer={onAnswer} />
    </>
  )
}

function ExerciseBody({ step, locked, onAnswer }: { step: Step; locked: boolean; onAnswer: (o: Outcome) => void }) {
  const ex = step.exercise
  switch (ex.type) {
    case 'choice':
      return <ChoiceView step={step} exercise={ex} locked={locked} onAnswer={onAnswer} />
    case 'timeline':
      return <TimelineView step={step} exercise={ex} locked={locked} onAnswer={onAnswer} />
    case 'fill':
    case 'translate':
    case 'fix':
    case 'transform':
    case 'write':
      return <TextView step={step} exercise={ex} locked={locked} onAnswer={onAnswer} />
    case 'sort':
      return <SortView step={step} exercise={ex} locked={locked} onAnswer={onAnswer} />
    case 'reading':
    case 'listening':
      return <QuestionView step={step} exercise={ex} locked={locked} onAnswer={onAnswer} />
    case 'scene':
      return <SceneView step={step} exercise={ex} locked={locked} onAnswer={onAnswer} />
    case 'speak':
      return <SpeakView step={step} exercise={ex} locked={locked} onAnswer={onAnswer} />
    case 'dictation':
      return <DictationView step={step} exercise={ex} locked={locked} onAnswer={onAnswer} />
    case 'pairs':
      return <PairsView step={step} exercise={ex} locked={locked} onAnswer={onAnswer} />
  }
}

function Prompt({ text }: { text: string }) {
  const parts = text.split('___')
  return (
    <p className="prompt" lang="en">
      {parts.map((p, i) => (
        <span key={i}>
          {p}
          {i < parts.length - 1 && <span className="gap">____</span>}
        </span>
      ))}
    </p>
  )
}

function ChoiceView({ exercise, locked, onAnswer }: ViewProps<'choice'>) {
  const [picked, setPicked] = useState<string>()
  return (
    <div className="exercise">
      <p className="task">Выбери подходящий вариант</p>
      <Prompt text={exercise.prompt} />
      <Options
        options={exercise.options}
        locked={locked}
        picked={picked}
        answer={exercise.answer}
        onPick={(o) => {
          setPicked(o)
          onAnswer({ correct: o === exercise.answer, given: o, expected: exercise.answer })
        }}
      />
    </div>
  )
}

function TimelineView({ exercise, locked, onAnswer }: ViewProps<'timeline'>) {
  const [picked, setPicked] = useState<string>()
  return (
    <div className="exercise">
      <p className="task">Какая схема подходит к предложению?</p>
      <p className="prompt" lang="en">
        {exercise.sentence}
      </p>
      <Options
        options={exercise.options}
        locked={locked}
        picked={picked}
        answer={exercise.answer}
        render={(k) => (
          <span className="timeline-option">
            <Timeline kind={k} />
            <span>{TIMELINE_LABELS[k]}</span>
          </span>
        )}
        onPick={(k) => {
          setPicked(k)
          onAnswer({ correct: k === exercise.answer, given: TIMELINE_LABELS[k], expected: TIMELINE_LABELS[exercise.answer] })
        }}
      />
    </div>
  )
}

function TextView({ step, exercise, locked, onAnswer }: ViewProps<'fill' | 'translate' | 'fix' | 'transform' | 'write'>) {
  const exam = useExam()
  const submit = (text: string) => onAnswer({ ...checkTyped(text, exercise.answers), given: text, expected: exercise.answers[0]! })
  let head: ReactNode
  switch (exercise.type) {
    case 'fill':
      head = (
        <>
          <p className="task">Впиши пропущенное{exercise.hint ? ` (${exercise.hint})` : ''}</p>
          <Prompt text={exercise.prompt} />
        </>
      )
      break
    case 'translate':
      head = (
        <>
          <p className="task">Переведи на английский</p>
          <p className="prompt">{exercise.ru}</p>
        </>
      )
      break
    case 'fix':
      head = (
        <>
          <p className="task">Найди и исправь ошибку</p>
          <p className="prompt" lang="en">
            {exercise.sentence}
          </p>
        </>
      )
      break
    case 'transform':
      head = (
        <>
          <p className="task">{exercise.instruction}</p>
          <p className="prompt" lang="en">
            {exercise.sentence}
          </p>
        </>
      )
      break
    case 'write':
      head = (
        <>
          <p className="task">Напиши по-английски</p>
          <p className="prompt">{exercise.situation}</p>
        </>
      )
      break
  }
  // Support mode builds sentences from tiles instead of typing (not for free writing).
  const support = useClub((s) => s.settings.support) && !exam
  const tiles =
    (exercise.type === 'translate' ? exercise.tiles : undefined) ??
    (support && exercise.type !== 'write' && exercise.type !== 'fill' ? supportTiles(exercise.answers[0]!, step.key) : undefined)
  return (
    <div className="exercise">
      {head}
      {tiles ? (
        <TileAnswer tiles={tiles} seed={step.key} locked={locked} onSubmit={submit} />
      ) : (
        <TextAnswer initial={exercise.type === 'fix' ? exercise.sentence : ''} locked={locked} onSubmit={submit} />
      )}
    </div>
  )
}

function SortView({ exercise, locked, onAnswer }: ViewProps<'sort'>) {
  const [choice, setChoice] = useState<Record<number, string>>({})
  const label = (id: string) => exercise.categories.find((c) => c.id === id)?.label ?? id
  const complete = exercise.items.every((_, i) => choice[i])
  const check = () => {
    const wrong = exercise.items.filter((item, i) => choice[i] !== item.category)
    onAnswer({
      correct: wrong.length === 0,
      given: wrong.map((w) => `${w.text}: ${label(choice[exercise.items.indexOf(w)]!)}`).join('; '),
      expected: wrong.map((w) => `${w.text}: ${label(w.category)}`).join('; '),
      retry: { ...exercise, items: wrong },
    })
  }
  return (
    <div className="exercise">
      <p className="task">{exercise.instruction}</p>
      <div className="sort">
        {exercise.items.map((item, i) => (
          <div key={item.text} className="sort-row">
            <span lang="en">{item.text}</span>
            <div className="sort-choices">
              {exercise.categories.map((c) => {
                const state = locked ? (c.id === item.category ? 'right' : choice[i] === c.id ? 'wrong' : '') : choice[i] === c.id ? 'active' : ''
                return (
                  <button key={c.id} className={`chip ${state}`} disabled={locked} onClick={() => setChoice({ ...choice, [i]: c.id })}>
                    {c.label}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
      {!locked && (
        <Button onClick={check} disabled={!complete}>
          Проверить
        </Button>
      )}
    </div>
  )
}

function QuestionView({ step, exercise, locked, onAnswer }: ViewProps<'reading' | 'listening'>) {
  const [picked, setPicked] = useState<string>()
  const q = exercise.questions[step.question ?? 0]!
  // In the placement check the transcript and translation never show.
  const exam = useExam()
  const last = (step.question ?? 0) === exercise.questions.length - 1 && !exam
  return (
    <div className="exercise">
      {exercise.type === 'reading' ? (
        <>
          <Passage exercise={exercise} />
          {locked && last && exercise.ru && <p className="translation">{exercise.ru}</p>}
        </>
      ) : (
        <div className="passage">
          <p className="task">Послушай{SPEAKER_NAMES[exercise.speaker] ? `: ${SPEAKER_NAMES[exercise.speaker]}` : ''}</p>
          <AudioControls text={exercise.audio} speaker={exercise.speaker} delivery={exercise.delivery} />
          {(!hasVoice(exercise.audio, exercise.speaker, exercise) || (locked && last)) && (
            <p className="transcript">
              <Gloss text={exercise.audio} />
            </p>
          )}
          {locked && last && exercise.ru && <p className="translation">{exercise.ru}</p>}
        </div>
      )}
      <p className="task">
        {q.prompt} <span className="muted">({(step.question ?? 0) + 1}/{exercise.questions.length})</span>
      </p>
      <Options
        options={q.options}
        locked={locked}
        picked={picked}
        answer={q.answer}
        onPick={(o) => {
          setPicked(o)
          onAnswer({ correct: o === q.answer, given: o, expected: q.answer })
        }}
      />
    </div>
  )
}

/** A reading text, dressed as what it is in the story: a letter, a notice, a notebook page. */
function Passage({ exercise }: { exercise: ExerciseOf<'reading'> }) {
  const lines = exercise.text.split('\n')
  const look = exercise.look
  // A letter ends with its closing and signature on the last two lines.
  const body = look === 'letter' ? lines.slice(0, -2) : lines
  return (
    <article className={look ? `passage paper paper-${look}` : 'passage'} lang="en">
      {look === 'letter' ? (
        <header className="letterhead">
          <span className="crest" aria-hidden>
            B
          </span>
          {/* "Bellwether Academy · International Office": the sender's department goes on a second line. */}
          <span>
            {(exercise.header ?? exercise.title).split(' · ')[0]}
            {exercise.header?.includes(' · ') && <small>{exercise.header.split(' · ')[1]}</small>}
          </span>
        </header>
      ) : (
        <h3>{exercise.title}</h3>
      )}
      {body.map((p, i) => (
        <p key={i}>
          <Gloss text={p} />
        </p>
      ))}
      {look === 'letter' && (
        <p className="signoff">
          <Gloss text={lines.at(-2) ?? ''} />
          <br />
          <span className="signature">
            <Gloss text={lines.at(-1) ?? ''} />
          </span>
        </p>
      )}
    </article>
  )
}

export function SceneLines({ lines, compact = false }: { lines: readonly Line[]; compact?: boolean }) {
  const always = useClub((s) => alwaysTranslate(s.settings))
  // The heroine whose line is being voiced is lit, with that line's face; in silence, the last speaker.
  const voiced = useVoicedLine()
  const playing = lines.findIndex((l) => `${l.speaker}|${l.text}` === voiced)
  const at = playing >= 0 ? playing : lines.length - 1
  return (
    <>
      <Stage cast={castAt(lines, at)} speaking={lines[at]?.speaker} compact={compact} />
      {lines.map((l, i) => (
        <DialogueBox key={i} speaker={SPEAKER_NAMES[l.speaker] || undefined}>
          <LineVoice text={l.text} speaker={l.speaker} expr={l.expr} delivery={l.delivery} />
          <Gloss text={l.text} />
          <Translation ru={l.ru} always={always} />
        </DialogueBox>
      ))}
    </>
  )
}

function SceneView({ step, exercise, locked, onAnswer }: ViewProps<'scene'>) {
  const [intent, setIntent] = useState<number>()
  const chosen = intent === undefined ? undefined : exercise.intents[intent]
  const playerName = useClub((s) => s.settings.name)
  const support = useClub((s) => s.settings.support)
  const sceneTiles = chosen && (chosen.tiles ?? (support && !chosen.answers[0]!.includes(NAME) ? supportTiles(chosen.answers[0]!, `${step.key}-${intent}`) : undefined))
  const updateSettings = useClub((s) => s.updateSettings)
  const submit = (text: string) => {
    if (!chosen) return
    const { correct: ok, spelling, name } = checkWithName(text, chosen.answers)
    // The player first gives their name here, in the prologue; it is kept when there is none yet (profile can change it).
    const remembered = name && !playerName ? name : undefined
    if (remembered) void updateSettings({ name: remembered })
    const expected = chosen.answers[0]!.replace(NAME, name || playerName || '…')
    // The story choice counts even after a language slip: the heroine clarifies and the scene goes on.
    onAnswer({
      correct: ok,
      spelling,
      given: text,
      expected,
      lines: ok ? [chosen.reaction] : [exercise.clarify, chosen.reaction],
      flag: chosen.flag,
      note: remembered && `Будем звать тебя ${remembered}. Поменять имя можно в профиле.`,
    })
  }
  return (
    <div className="exercise">
      <p className="muted">{exercise.setting}</p>
      <SceneLines lines={exercise.lines} />
      {!chosen ? (
        <>
          <p className="task">Что ты хочешь ответить?</p>
          <div className="options">
            {exercise.intents.map((it, i) => (
              <button key={it.label} className="option" onClick={() => setIntent(i)}>
                {it.label}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <p className="task">{chosen.label}. Скажи это по-английски</p>
          {chosen.answers[0]!.includes(NAME) && (
            <p className="muted">
              Например: <span lang="en">{chosen.answers[0]!.replace(NAME, playerName || 'Alex')}</span>
            </p>
          )}
          {sceneTiles ? (
            <TileAnswer tiles={sceneTiles} seed={`${step.key}-${intent}`} locked={locked} onSubmit={submit} />
          ) : (
            <TextAnswer locked={locked} onSubmit={submit} />
          )}
        </>
      )}
    </div>
  )
}

const LISTEN_ERRORS: Record<ListenError, string> = {
  'not-allowed': 'Нет доступа к микрофону. Разреши его в настройках браузера или пропусти задание.',
  'no-speech': 'Ничего не услышал. Попробуй ещё раз.',
  unsupported: 'Этот браузер не распознаёт речь. Открой приложение в Chrome или Safari или пропусти задание.',
  other: 'Распознавание не сработало. Попробуй ещё раз.',
}

function SpeakView({ exercise, locked, onAnswer }: ViewProps<'speak'>) {
  const [state, setState] = useState<'idle' | 'listening'>('idle')
  const [error, setError] = useState<ListenError>()
  const supported = canRecognize()
  const listening = useRef<{ stop: () => void }>(undefined)
  // Leaving the task (next task, closing the session) turns the microphone off.
  useEffect(() => () => listening.current?.stop(), [])

  const start = () => {
    setError(undefined)
    setState('listening')
    const l = listen()
    listening.current = l
    l.result.then((alts) => onAnswer({ correct: matchesSpeech(alts, exercise.answers), given: alts[0] ?? '', expected: exercise.answers[0]! }))
      .catch((e: ListenError) => setError(e))
      .finally(() => setState('idle'))
  }

  return (
    <div className="exercise">
      <p className="task">{exercise.show === 'ru' ? 'Скажи по-английски' : 'Прочитай вслух'}</p>
      <p className="prompt">{exercise.show === 'en' ? <Gloss text={exercise.text} /> : exercise.text}</p>
      {exercise.show === 'en' && hasVoice(exercise.text, exercise.voice ?? 'narrator', exercise) && (
        <AudioControls text={exercise.text} speaker={exercise.voice ?? 'narrator'} delivery={exercise.delivery} label="▶ Как звучит" />
      )}
      {!locked && (
        <div className="actions">
          {supported && (
            <Button onClick={start} disabled={state === 'listening'}>
              {state === 'listening' ? 'Слушаю…' : '🎤 Сказать'}
            </Button>
          )}
          {(error || !supported) && <p className="muted">{LISTEN_ERRORS[error ?? 'unsupported']}</p>}
          <Button variant="secondary" onClick={() => onAnswer({ correct: null, given: '', expected: exercise.answers[0]! })}>
            Сейчас не могу говорить
          </Button>
        </div>
      )}
    </div>
  )
}

function DictationView({ step, exercise, locked, onAnswer }: ViewProps<'dictation'>) {
  const exam = useExam()
  const support = useClub((s) => s.settings.support) && !exam
  const tiles = exercise.tiles ?? (support ? supportTiles(exercise.answers[0]!, step.key) : undefined)
  const submit = (text: string) => onAnswer({ ...checkTyped(text, exercise.answers), given: text, expected: exercise.answers[0]! })
  return (
    <div className="exercise">
      <p className="task">Напиши, что услышал</p>
      <AudioControls text={exercise.audio} speaker={exercise.speaker} delivery={exercise.delivery} />
      {!hasVoice(exercise.audio, exercise.speaker, exercise) && (
        <p className="transcript" lang="en">
          {exercise.audio}
        </p>
      )}
      {tiles ? (
        <TileAnswer tiles={tiles} seed={step.key} locked={locked} onSubmit={submit} />
      ) : (
        <TextAnswer locked={locked} onSubmit={submit} />
      )}
    </div>
  )
}

/** Tap an English item, then its translation. A wrong pair flashes and counts as one slip. */
function PairsView({ step, exercise, locked, onAnswer }: ViewProps<'pairs'>) {
  const left = exercise.pairs.map((p) => p.en)
  const right = useMemo(() => shuffled(exercise.pairs.map((p) => p.ru), step.key), [exercise.pairs, step.key])
  const [active, setActive] = useState<string>()
  const [done, setDone] = useState<string[]>([])
  const [slips, setSlips] = useState<string[]>([])
  const [flash, setFlash] = useState<string>()

  const pickRu = (ru: string) => {
    if (!active) return
    const pair = exercise.pairs.find((p) => p.en === active)!
    if (pair.ru === ru) {
      const next = [...done, active]
      setDone(next)
      setActive(undefined)
      if (next.length === exercise.pairs.length) {
        // Repeat only the pairs that slipped; matching needs at least two, so add one more if needed.
        const slipped = exercise.pairs.filter((p) => slips.some((s) => s.startsWith(`${p.en} — `)))
        const again = slipped.length > 1 ? slipped : [...slipped, exercise.pairs.find((p) => !slipped.includes(p))!]
        onAnswer({
          retry: { ...exercise, pairs: again },
          correct: slips.length === 0,
          given: slips.join('; '),
          expected: exercise.pairs
            .filter((p) => slips.some((s) => s.startsWith(`${p.en} — `)))
            .map((p) => `${p.en} — ${p.ru}`)
            .join('; '),
        })
      }
    } else {
      setSlips([...slips, `${active} — ${ru}`])
      setFlash(ru)
      setTimeout(() => setFlash(undefined), 400)
    }
  }

  return (
    <div className="exercise">
      <p className="task">Соедини пары</p>
      <div className="pairs">
        <div className="pairs-col" lang="en">
          {left.map((en) => (
            <button key={en} className={`option ${active === en ? 'active' : ''} ${done.includes(en) ? 'right' : ''}`} disabled={locked || done.includes(en)} onClick={() => setActive(en)}>
              {en}
            </button>
          ))}
        </div>
        <div className="pairs-col">
          {right.map((ru) => {
            const matched = exercise.pairs.some((p) => p.ru === ru && done.includes(p.en))
            return (
              <button key={ru} className={`option ${matched ? 'right' : ''} ${flash === ru ? 'wrong' : ''}`} disabled={locked || matched || !active} onClick={() => pickRu(ru)}>
                {ru}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

