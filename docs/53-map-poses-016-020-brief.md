# English Club — бриф: позы на пути для юнитов 016, 017, 019, 020

Версия 1 · 07.11.2026. Продолжение [брифа 43](43-map-poses-brief.md). У юнитов 016, 017, 019 и 020 на пути пока стоят **общие позы из первой партии**: V-жест, «наклонилась», «через плечо», «встречает». К темам юнитов они не подходят. Нужны 4 новые позы по темам. 018 (`manual_read`) уже по теме, её не трогаем.

Приложено: `map_poses_53_kit.zip`:
- `refs/` — героини, как они выглядят сейчас (`mika_stand.png`, `rei_stand.png`, `iris_stand.png`) и общий референс трёх героинь;
- `style/` — уже принятые позы на пути (`mika_lunch_bags`, `rei_mic_stand`, `iris_two_mugs`, `rei_manual_read`): так должны выглядеть и новые.

## 1. Требования (как в брифах 18 и 43)

- **Лица — от мастер-референсов героинь**, которые у тебя есть. Не от прошлых поз и не цепочкой правок. Айрис — в новом образе, как на `refs/iris_stand.png`.
- 1024 × 1536, **полный рост**, прозрачный фон; наряд `base`, как на `refs/*_stand.png`.
- Героиня слегка повёрнута или смотрит **влево**: там идёт линия маршрута.
- Лицо видно; рот закрыт или губы едва разомкнуты.
- Предмет в руках **крупный** и читается при уменьшении до ~160 × 240.
- Без читаемого текста: на картах, записках и экранах — только линии, стрелки и значки.
- Без свечения и белой каймы вокруг фигуры; внутри фигуры альфа 255; край сглажен 1–2 px.

## 2. Что нарисовать (4 картинки)

| Файл | Юнит и тема | Что в сюжете | Поза (промпт) |
|---|---|---|---|
| `map/mika/tea_thermos.png` | 016 Подтвердить и записать | в день записи Мика приносит чай из дома; все подтвердили в общем чате | `standing, holding a small thermos and a stack of paper cups against her chest with one arm, the other hand raised with her phone, its screen showing a big check mark, cheerful closed-mouth smile` |
| `map/iris/route_map.png` | 017 Объяснить маршрут | команда описывает путь для гида новичков | `walking, holding an open folded campus map with a route drawn as a dotted line with arrows, pointing ahead along the route with the other hand, glancing back at the viewer over her glasses, small helpful smile` |
| `map/mika/note_question.png` | 019 Уточнить непонятное | местные инструкции понятны только тем, кто и так всё знает | `standing, holding a small handwritten note with arrows in both hands, head tilted, one finger on a line of the note, puzzled questioning look, lips pressed` |
| `map/rei/this_way.png` | 020 Провести новичка | игрок помогает настоящему новичку найти аудиторию | `walking forward, looking back over her shoulder, beckoning "this way" with one hand, a small audio recorder in the other hand, headphones around her neck, calm half-smile` |

## 3. Что сдать

- Архив `map_poses_53.zip` с папками `map/mika/`, `map/iris/`, `map/rei/` и файлами по именам из таблицы.
- **`Preview.html`** (без сервера): каждая поза на трёх фонах (светлый, тёмный, клетка) в полный размер и в уменьшении до 160 × 240, рядом — принятая поза из `style/` той же героини для сравнения.

## 4. Проверка

- [ ] Лицо — то же, что на мастере и на `refs/*_stand.png`; Айрис — в новом образе.
- [ ] Поза и предмет читаются при 160 × 240.
- [ ] Героиня смотрит или повёрнута влево; рот закрыт.
- [ ] Фон прозрачный, без каймы и свечения.
- [ ] Нет читаемого текста.

Я переведу картинки в WebP 512 × 768, и они встанут на свои юниты сами. Пока поза не нарисована, у юнита стоит обычный стоячий спрайт героини.
