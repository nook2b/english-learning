import { Stage } from '../../story/Stage'
import { DialogueBox } from '../../ui/kit'

export function StoryScreen() {
  return (
    <div className="screen story">
      <Stage cast={{ rei: 'annoyed', mika: 'excited', iris: 'dry_smile' }} speaking="mika" />
      <DialogueBox speaker="Mika">Are you here for us? Great. We need someone who doesn't know anything yet.</DialogueBox>
      <p className="muted">Пролог «Не тот кабинет» и отдельный экран истории появятся на этапе 5. Пока сцены идут внутри занятий.</p>
    </div>
  )
}
