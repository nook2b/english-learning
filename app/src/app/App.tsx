import { useEffect } from 'react'
import { getUnit } from '../content/course'
import { useClub } from '../data/store'
import { HeroineScreen } from '../features/heroines/HeroineScreen'
import { HeroinesScreen } from '../features/heroines/HeroinesScreen'
import { UnitScreen } from '../features/lesson/UnitScreen'
import { PathScreen } from '../features/path/PathScreen'
import { ProfileScreen } from '../features/profile/ProfileScreen'
import { ReviewScreen } from '../features/review/ReviewScreen'
import { StoryScreen } from '../features/story/StoryScreen'
import { SessionPlayer } from '../lesson/SessionPlayer'
import { BottomNav } from './BottomNav'
import { type Route, useRoute } from './router'
import { TopBar } from './TopBar'

function Screen({ route }: { route: Route }) {
  switch (route.name) {
    case 'path':
      return <PathScreen />
    case 'unit':
      return <UnitScreen unitId={route.unitId} />
    case 'session': {
      const unit = getUnit(route.unitId)
      if (!unit) return <UnitScreen unitId={route.unitId} />
      return <SessionPlayer key={`${route.unitId}-${route.index}`} unit={unit} index={route.index} />
    }
    case 'review':
      return <ReviewScreen />
    case 'story':
      return <StoryScreen />
    case 'heroines':
      return <HeroinesScreen />
    case 'heroine':
      return <HeroineScreen key={route.id} id={route.id} />
    case 'profile':
      return <ProfileScreen />
  }
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
      {route.name !== 'session' && <TopBar />}
      <main>
        <Screen route={route} />
      </main>
      {route.name !== 'session' && <BottomNav current={route.name === 'heroine' ? 'heroines' : route.name} />}
    </div>
  )
}
