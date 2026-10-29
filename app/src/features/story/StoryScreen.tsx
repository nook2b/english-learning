import { DialogueBox, SpriteStub } from '../../ui/kit'

export function StoryScreen() {
  return (
    <div className="screen story">
      <div className="stage">
        <SpriteStub heroine="rei" pose="stand" expr="annoyed" />
        <SpriteStub heroine="mika" pose="stand" expr="excited" />
        <SpriteStub heroine="iris" pose="stand" expr="dry_smile" />
      </div>
      <DialogueBox speaker="Mika">Are you here for us? Great. We need someone who doesn't know anything yet.</DialogueBox>
      <p className="muted">Пролог «Не тот кабинет» и движок новеллы появятся на этапе 5.</p>
    </div>
  )
}
