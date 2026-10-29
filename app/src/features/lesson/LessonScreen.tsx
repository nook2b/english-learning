import { useState } from 'react'
import { navigate } from '../../app/router'
import { useClub } from '../../data/store'
import { Button, Card, DialogueBox, LearnPanel, ProgressBar } from '../../ui/kit'
import { ARC1_UNITS, nextUnitId } from '../path/courseOutline'

const SESSIONS_PER_UNIT = 8
const SESSION_MINUTES = 8
const SESSION_XP = 10

/** Stub: stands in for the session engine of stage 2 and exercises local storage. */
export function LessonScreen() {
  const { units, recordSession, markUnit } = useClub()
  const unitId = nextUnitId(units)
  const unit = ARC1_UNITS.find((u) => u.id === unitId)
  const [session, setSession] = useState(0)
  const [saving, setSaving] = useState(false)

  if (!unit) {
    return (
      <div className="screen">
        <Card title="Всё пройдено">
          <Button onClick={() => navigate('path')}>На путь</Button>
        </Card>
      </div>
    )
  }

  // Disabled while saving so a quick double tap cannot count one session twice.
  const finishSession = async () => {
    setSaving(true)
    try {
      await recordSession(SESSION_MINUTES, SESSION_XP)
      if (session + 1 >= SESSIONS_PER_UNIT) {
        await markUnit(unit.id, 'done')
        setSession(0)
        navigate('path')
      } else {
        setSession(session + 1)
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="screen">
      <Card title={`Юнит ${unit.id}. ${unit.title}`}>
        <ProgressBar value={session} max={SESSIONS_PER_UNIT} label="Занятия юнита" />
        <p className="muted">
          Занятие {session + 1} из {SESSIONS_PER_UNIT}. Движок упражнений появится на этапе 2.
        </p>
      </Card>

      <DialogueBox speaker="Rei">Ten seconds. Nobody move.</DialogueBox>

      <LearnPanel title="Учебная панель">
        Здесь будут объяснения и разбор ошибок. Героини ошибки не комментируют.
      </LearnPanel>

      <div className="actions">
        <Button onClick={finishSession} disabled={saving}>Завершить занятие (заглушка, +{SESSION_MINUTES} мин)</Button>
        <Button variant="secondary" onClick={() => navigate('path')}>
          Выйти
        </Button>
      </div>
    </div>
  )
}
