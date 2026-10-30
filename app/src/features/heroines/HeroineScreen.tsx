import { useEffect, useState } from 'react'
import { navigate } from '../../app/router'
import { CHARACTERS, isOpen } from '../../content/characters'
import { useClub } from '../../data/store'
import { Gloss, Translation } from '../../lesson/Gloss'
import { LineVoice } from '../../speech/AudioControls'
import { play, preload } from '../../speech/voice'
import { Sprite } from '../../story/Stage'
import type { HeroineId } from '../../story/sprites'
import { Button, Card, DialogueBox } from '../../ui/kit'

export function HeroineScreen({ id }: { id: HeroineId }) {
  const { units, flags, settings } = useClub()
  const c = CHARACTERS[id]!
  const open = <T extends { unlock: Parameters<typeof isOpen>[0] }>(items: T[]) => items.filter((x) => isOpen(x.unlock, units, flags, settings.unlockAll))
  const facts = open(c.facts)
  const memories = open(c.memories)
  const lines = open(c.lines)
  const [said, setSaid] = useState<number>()
  const line = said === undefined ? undefined : lines[said]

  useEffect(() => {
    if (settings.voice) preload(lines.map((l) => ({ ...l, speaker: id })))
  }, [settings.voice, lines, id])

  // "Поболтать": a different unlocked line each tap, read aloud when voice is on.
  const chat = () => {
    if (lines.length === 0) return
    const next = lines.length === 1 ? 0 : (((said ?? -1) + 1 + Math.floor(Math.random() * (lines.length - 1))) % lines.length)
    setSaid(next)
    if (settings.voice) play(lines[next]!.text, id, false, lines[next]!)
  }

  return (
    <div className="screen">
      <button className="link muted" onClick={() => navigate({ name: 'heroines' })}>
        ← Все героини
      </button>
      <div className="heroine-hero">
        <button className="heroine-tap" onClick={chat} aria-label={`Поболтать с ${c.name}`}>
          <Sprite heroine={id} expr={line?.expr ?? 'neutral'} />
        </button>
      </div>
      {line ? (
        <DialogueBox speaker={c.name}>
          <LineVoice text={line.text} speaker={id} expr={line.expr} delivery={line.delivery} />
          <Gloss text={line.text} />
          <Translation key={said} ru={line.ru} always={settings.translation === 'always'} />
        </DialogueBox>
      ) : (
        <Button variant="secondary" onClick={chat} disabled={lines.length === 0}>
          {lines.length ? 'Поболтать' : 'Поболтать можно после первого юнита'}
        </Button>
      )}

      <Card title={c.name}>
        <p>{c.about}</p>
      </Card>

      <Card title="Что ты о ней знаешь">
        {facts.length ? (
          <ul className="list">
            {facts.map((f) => (
              <li key={f.ru}>{f.ru}</li>
            ))}
          </ul>
        ) : (
          <p className="muted">Пока ничего. Узнаешь по ходу истории.</p>
        )}
        {c.facts.length > facts.length && <p className="muted">Ещё откроется: {c.facts.length - facts.length}</p>}
      </Card>

      <Card title="Общие воспоминания">
        {memories.length ? (
          <ul className="list memories">
            {memories.map((m) => (
              <li key={m.en}>
                <span>
                  <Gloss text={m.en} />
                </span>
                <span className="muted">{m.ru}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="muted">Появятся после общих событий и твоих выборов в сценах.</p>
        )}
      </Card>

      <Card title="Личные квесты">
        <ul className="list quests">
          {c.quests.map((q) => {
            // "Open everything" shows what each quest changes, for testing.
            const open = !!flags[q.flag] || settings.unlockAll
            return (
              <li key={q.id} className={open ? 'quest-done' : 'quest-locked'}>
                <span>
                  {flags[q.flag] ? '✓ ' : ''}
                  {q.title}
                </span>
                <span className="muted">{open ? q.change : `откроется в юнитах ${q.window}`}</span>
              </li>
            )
          })}
        </ul>
      </Card>
    </div>
  )
}
