import { useMemo } from 'react'
import { navigate } from '../../app/router'
import { getUnit, nextSession } from '../../content/course'
import { ARC1_UNITS } from '../../content/outline'
import { useClub } from '../../data/store'
import { Gloss, Translation } from '../../lesson/Gloss'
import { GlossaryContext } from '../../lesson/glossary'
import { LineVoice } from '../../speech/AudioControls'
import { Button, Card } from '../../ui/kit'
import { MapFigure } from '../path/MapFigure'
import { mapFigure } from '../path/roadmap'
import { keyPhrases } from './guide'

const sameText = (a: string, b: string) => a.toLowerCase().replace(/[^a-z' ]/g, '').trim() === b.toLowerCase().replace(/[^a-z' ]/g, '').trim()

/**
 * The unit's page from Iris's notebook, opened from the notebook button on the
 * route: what the unit is for, its key phrases with an example sentence each
 * (heard in a heroine's voice when the story has it) and the grammar focus.
 * The sessions themselves live on the route, not here.
 */
export function UnitScreen({ unitId }: { unitId: string }) {
  const { units, sessions } = useClub()
  const unit = getUnit(unitId)
  const outline = ARC1_UNITS.find((u) => u.id === unitId)
  const phrases = useMemo(() => (unit ? keyPhrases(unit) : []), [unit])
  const glossary = useMemo(() => unit?.expressions.map((e) => ({ ...e, target: true })) ?? [], [unit])

  if (!unit) {
    return (
      <div className="screen">
        <Card title={`Юнит ${unitId}${outline ? `. ${outline.title}` : ''}`}>
          <p className="muted">Контент этого юнита ещё пишется.</p>
          <Button variant="secondary" onClick={() => navigate({ name: 'path' })}>
            На путь
          </Button>
        </Card>
      </div>
    )
  }

  const next = nextSession(sessions, units)
  const done = !!units[unit.id]
  return (
    <GlossaryContext.Provider value={glossary}>
      <div className="screen guide">
        <button className="link muted guide-close" onClick={() => navigate({ name: 'path' })}>
          ✕ К маршруту
        </button>
        <header className="guide-hero">
          <div className="guide-figure" aria-hidden>
            <MapFigure {...mapFigure(unit)} />
          </div>
          <div>
            <p className="guide-kicker">Юнит {unit.id} · из тетради Айрис</p>
            <h1 className="guide-title">{unit.title}</h1>
            <p>{unit.goal}</p>
          </div>
        </header>

        <section className="guide-section">
          <h2 className="guide-heading">Ключевые фразы</h2>
          <ul className="guide-phrases">
            {phrases.map((p) => (
              <li key={p.en} className="guide-phrase">
                {p.example ? (
                  <>
                    <LineVoice text={p.example.text} speaker={p.example.speaker} expr={p.example.expr} delivery={p.example.delivery} />
                    <p className="guide-example">
                      <Gloss text={p.example.text} />
                    </p>
                    {p.example.ru ? <Translation ru={p.example.ru} always /> : null}
                    {/* When the example is the phrase itself, its meaning is enough. */}
                    <p className="guide-gist">
                      {sameText(p.example.text, p.en) ? (
                        p.ru
                      ) : (
                        <>
                          <span lang="en">{p.en}</span> — {p.ru}
                        </>
                      )}
                    </p>
                  </>
                ) : (
                  <>
                    <LineVoice text={p.en} speaker="narrator" />
                    <p className="guide-example">
                      <Gloss text={p.en} />
                    </p>
                    <p className="guide-gist">{p.ru}</p>
                  </>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="guide-section">
          <h2 className="guide-heading">Грамматика</h2>
          <p>{unit.focus}</p>
        </section>

        {done && (
          <section className="guide-section">
            <h2 className="guide-heading">Что изменилось в истории</h2>
            <p>{unit.outcome}</p>
          </section>
        )}

        {next?.unitId === unit.id && <Button onClick={() => navigate({ name: 'session', ...next })}>Продолжить: занятие {next.index}</Button>}
      </div>
    </GlossaryContext.Provider>
  )
}
