import { useEffect } from 'react'
import { getUnit, isSessionOpen } from '../content/course'
import { useClub } from '../data/store'
import { HeroineScreen } from '../features/heroines/HeroineScreen'
import { HeroinesScreen } from '../features/heroines/HeroinesScreen'
import { UnitScreen } from '../features/lesson/UnitScreen'
import { PathScreen } from '../features/path/PathScreen'
import { ProfileScreen } from '../features/profile/ProfileScreen'
import { ReviewScreen } from '../features/review/ReviewScreen'
import { ReviewSession } from '../features/review/ReviewSession'
import { PlacementCheck } from '../features/story/PlacementCheck'
import { PrologueScreen } from '../features/story/PrologueScreen'
import { QuestsScreen } from '../features/quests/QuestsScreen'
import { SessionPlayer } from '../lesson/SessionPlayer'
import { BottomNav } from './BottomNav'
import { type Route, navigate, useRoute } from './router'
import { Button, Card } from '../ui/kit'
import { TopBar } from './TopBar'

function Screen({ route }: { route: Route }) {
  const { sessions, units, settings, flags } = useClub()
  const unlockAll = settings.unlockAll
  switch (route.name) {
    case 'path':
      return <PathScreen />
    case 'unit':
      return <UnitScreen unitId={route.unitId} />
    case 'session': {
      const unit = getUnit(route.unitId)
      if (!unit) return <UnitScreen unitId={route.unitId} />
      if (!isSessionOpen(route, sessions, units, unlockAll, flags)) return <LockedSession unitId={unit.id} index={route.index} />
      return <SessionPlayer key={`${route.unitId}-${route.index}`} unit={unit} index={route.index} />
    }
    case 'review':
      return <ReviewScreen />
    case 'practice':
      return <ReviewSession />
    case 'prologue':
      return <PrologueScreen />
    case 'placement':
      return <PlacementCheck onExit={() => navigate({ name: 'profile' })} onClose={() => navigate({ name: 'profile' })} closeLabel="В профиль" />
    case 'quests':
      return <QuestsScreen />
    case 'heroines':
      return <HeroinesScreen />
    case 'heroine':
      return <HeroineScreen key={route.id} id={route.id} />
    case 'profile':
      return <ProfileScreen />
  }
}

/** Sessions, review rounds, the prologue and the placement retake take the whole screen. */
const FULL_SCREEN = new Set(['session', 'practice', 'prologue', 'placement'])

function LockedSession({ unitId, index }: { unitId: string; index: number }) {
  return (
    <div className="screen">
      <Card title={`Юнит ${unitId}, занятие ${index}`}>
        <p className="muted">Это занятие пока закрыто: оно откроется после предыдущих.</p>
        <Button variant="secondary" onClick={() => navigate({ name: 'path' })}>
          На путь
        </Button>
      </Card>
    </div>
  )
}

export function App() {
  const route = useRoute()
  const { ready, init } = useClub()

  useEffect(() => {
    void init()
  }, [init])

  if (!ready) return <div className="loading">Загрузка…</div>

  return (
    <div className="app">
      {!FULL_SCREEN.has(route.name) && <TopBar />}
      <main>
        <Screen route={route} />
      </main>
      {!FULL_SCREEN.has(route.name) && <BottomNav current={route.name === 'heroine' ? 'heroines' : route.name} />}
    </div>
  )
}
