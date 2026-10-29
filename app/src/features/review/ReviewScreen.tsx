import { Card } from '../../ui/kit'

export function ReviewScreen() {
  return (
    <div className="screen">
      <Card title="Повторение">
        <p>Карточек на сегодня: 0.</p>
        <p className="muted">Колоды выражений, неправильных глаголов и грамматики появятся на этапе 4.</p>
      </Card>
    </div>
  )
}
