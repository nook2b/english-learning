import { type ComponentType, useEffect } from 'react'
import { useClub } from '../data/store'
import { HeroinesScreen } from '../features/heroines/HeroinesScreen'
import { LessonScreen } from '../features/lesson/LessonScreen'
import { PathScreen } from '../features/path/PathScreen'
import { ProfileScreen } from '../features/profile/ProfileScreen'
import { ReviewScreen } from '../features/review/ReviewScreen'
import { StoryScreen } from '../features/story/StoryScreen'
import { BottomNav } from './BottomNav'
import { type Route, useRoute } from './router'
import { TopBar } from './TopBar'

const SCREENS: Record<Route, ComponentType> = {
  path: PathScreen,
  lesson: LessonScreen,
  review: ReviewScreen,
  story: StoryScreen,
  heroines: HeroinesScreen,
  profile: ProfileScreen,
}

export function App() {
  const route = useRoute()
  const { ready, init } = useClub()

  useEffect(() => {
    void init()
  }, [init])

  if (!ready) return <div className="loading">Загрузка…</div>

  const Screen = SCREENS[route]
  return (
    <div className="app">
      <TopBar />
      <main>
        <Screen />
      </main>
      {route !== 'lesson' && <BottomNav current={route} />}
    </div>
  )
}
