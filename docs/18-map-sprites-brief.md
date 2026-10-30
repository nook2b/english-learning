# English Club — бриф: героини в полный рост для карты пути

**Выполнено 30.10.2026:** все 12 поз подключены (`assets/map/`, WebP 512 × 768).

Версия 1 · 30.10.2026. Общие правила стиля и описания героинь — в [`11-sprite-brief.md`](11-sprite-brief.md). Правило закрытого рта — из [`17-closed-mouth-sprites-brief.md`](17-closed-mouth-sprites-brief.md).

## 1. Зачем

На главном экране путь нарисован как маршрут: у каждого юнита линия из восьми станций-занятий, а справа от неё стоит героиня этого юнита. Сейчас там обычный спрайт из сцен — ровная стойка лицом к зрителю. Для карты нужны **живые картинки в полный рост: движение, предметы, характер**. Это открытка из жизни героини, а не спрайт для диалога.

**Чем отличаются от спрайтов сцен:**
- одна картинка на позу: без набора эмоций и без кадров речи;
- позы динамичные: идёт, бежит, сидит, присела, тянется; в руках предметы;
- тело можно развернуть на три четверти, но лицо должно быть хорошо видно.

## 2. Где и как их видно

- Картинка стоит **справа от линии станций** и занимает примерно 40% ширины экрана телефона: около 150–170 точек в ширину, до 250 в высоту.
- Поэтому важен **силуэт**: поза и предмет должны читаться даже в таком размере. Мелкие детали пропадут.
- Линия маршрута слева, поэтому героиня **слегка повёрнута влево (от зрителя) или смотрит влево**, как будто на маршрут или на игрока. Не строго: несколько поз могут смотреть прямо на зрителя.
- Фон прозрачный; на светлой и тёмной теме картинка должна смотреться одинаково.

## 3. Технические требования

- **1024 × 1536, вертикально, PNG, прозрачный фон**, без белой каймы.
- Фигура целиком, с предметом: макушка примерно в 60 px от верхнего края, нижняя точка (обувь или предмет, на котором она сидит) — примерно в 40 px от нижнего. Фигура по центру по горизонтали.
- Наряд — `base` из `11-sprite-brief.md`, тот же, что на референсах.
- **Рот закрыт** или губы едва разомкнуты, без зубов: правило из брифа 17. Эмоция — глазами, бровями и позой.
- Без пола, тени на полу, текста, логотипов и водяных знаков. Предмет, на котором она сидит (табурет, стопка книг), — часть картинки.
- Каждая поза — **одна генерация от оригинального референса**. Не перерисовывать результат повторно, чтобы не терялось качество.

## 4. Позы

По четыре на героиню, всего **12 картинок**. Приложение раздаёт их юнитам по очереди: у соседних юнитов одной героини позы разные. Когда юнитов станет больше, позы начнут повторяться — это нормально.

### Мика — энергия и общение

| Файл | Поза |
|---|---|
| `mika/wave_mic.png` | Шагает вперёд, машет свободной рукой, в другой — ручной микрофон с розовой ветрозащитой |
| `mika/clipboard_run.png` | Бежит, планшет-клипборд с вопросами прижат к груди, хвост развевается |
| `mika/phone_show.png` | Стоит в полуобороте, вытянула руку с телефоном экраном к зрителю, как будто показывает сообщение |
| `mika/lunch_bags.png` | Несёт два бумажных пакета с обедом, один чуть съезжает, подмигивает |

### Рэй — звук и спокойствие

| Файл | Поза |
|---|---|
| `rei/recorder_crouch.png` | Присела на корточки, держит портативный рекордер вытянутой рукой к земле, как будто записывает звук комнаты; наушники на шее |
| `rei/headphones_listen.png` | Стоит, обеими руками прижимает большие наушники к ушам, глаза закрыты, слушает |
| `rei/cable_coil.png` | Сматывает чёрный кабель кольцами через локоть, взгляд в сторону, чуть недовольный |
| `rei/mic_stand.png` | Несёт микрофонную стойку на плече, как гитару, свободная рука в кармане куртки |

### Айрис — тексты и порядок

| Файл | Поза |
|---|---|
| `iris/book_walk.png` | Идёт, читая раскрытую книгу на ходу, вторая книга под мышкой |
| `iris/timetable_point.png` | Держит лист расписания, другой рукой показывает на него ручкой, смотрит на зрителя поверх очков |
| `iris/notebook_write.png` | Стоит, пишет в блокноте на весу, карандаш за ухом |
| `iris/books_sit.png` | Сидит на стопке толстых книг, на коленях кружка чая, нога на ногу, ноги вниз до пола |

## 5. Промпт

Прикрепить **оригинальный фронтальный референс** «Три героини» — тот, что использовался для новой Мики.

```
Full-body character illustration in the exact art style of the attached reference image:
2D anime illustration, clean confident dark outlines, flat cel-shaded color fills,
simple soft shadows, no grain, no noise, no texture, no painterly effects.
Single character only, the whole figure from the top of the head to the shoes,
including any object she holds or sits on. Adult woman, 20 years old, mature adult
proportions, natural non-suggestive pose.
<ГЕРОИНЯ>
<НАРЯД>
Dynamic pose: <ПОЗА>
The body can be turned three-quarters toward the viewer's left, but the face is clearly
visible. Clear readable silhouette, the pose and the object read well at small size.
Facial expression matches the pose; MOUTH CLOSED, lips together or barely parted,
no teeth.
Vertical 1024x1536 image, transparent background, no floor, no ground shadow,
no text, no logos, no watermark. Top of the head about 60 px from the top edge,
the lowest point about 40 px from the bottom edge, figure centered horizontally.
```

- `<ГЕРОИНЯ>` — блок героини из раздела 4 брифа 11 целиком, со строкой о положении на референсе.
- `<НАРЯД>` — строка `base` из раздела 6 брифа 11 (начинается с «Outfit exactly as in the reference»).
- `<ПОЗА>` — из таблицы ниже.

| Файл | `<ПОЗА>` |
|---|---|
| `mika/wave_mic` | `striding forward mid-step, waving happily with her free hand, holding a handheld microphone with a pink foam windscreen in the other hand, bright excited eyes` |
| `mika/clipboard_run` | `running toward the viewer's left, hugging a clipboard with papers to her chest, ponytail flying behind her, cheerful determined face` |
| `mika/phone_show` | `standing half-turned, stretching one arm forward to show her smartphone screen to the viewer, other hand on her hip, proud smile with closed lips` |
| `mika/lunch_bags` | `walking while carrying two paper lunch bags, one bag slipping a little in her arm, winking playfully` |
| `rei/recorder_crouch` | `crouching low on the balls of her feet, holding a small portable audio recorder out toward the ground as if recording the sound of the room, black over-ear headphones around her neck, calm focused face` |
| `rei/headphones_listen` | `standing, pressing large black over-ear headphones to her ears with both hands, eyes closed, listening carefully, a faint content smile with closed lips` |
| `rei/cable_coil` | `standing, coiling a long black audio cable in loops over her elbow, glancing to the side with a slightly unimpressed face` |
| `rei/mic_stand` | `walking, carrying a black microphone stand over her shoulder like a guitar, her free hand in her jacket pocket, cool relaxed face` |
| `iris/book_walk` | `walking while reading an open book held in one hand, a second book tucked under her arm, absorbed calm face` |
| `iris/timetable_point` | `standing, holding a printed timetable sheet in one hand and pointing at it with a pen in the other, looking at the viewer over her glasses with a dry little smile` |
| `iris/notebook_write` | `standing, writing in a small notebook held in one hand, a pencil tucked behind her ear, thoughtful face` |
| `iris/books_sit` | `sitting on a tall stack of thick hardcover books, legs crossed, feet reaching the floor, holding a mug of tea on her knee, relaxed gentle face` |

Для Айрис добавить в конец: `Keep the same round black glasses exactly as they are.`

## 6. Проверка перед отправкой

- [ ] Лицо, причёска и цвета совпадают с референсом; у Айрис очки на месте.
- [ ] Поза и предмет понятны, если уменьшить картинку до 15% (примерно как на телефоне).
- [ ] Рот закрыт, зубов не видно.
- [ ] Фигура целиком: ничего не обрезано, предмет в кадре.
- [ ] 1024 × 1536, прозрачный фон, без белой каймы, PNG.

## 7. Как прислать

Один архив `map/` с папками героинь: `map/mika/wave_mic.png`, `map/rei/recorder_crouch.png` и т. д. — 12 файлов. Можно частями.

Я переведу их в WebP и положу в `assets/map/{героиня}/{поза}.webp`. Приложение подхватит каждую нарисованную позу само. Пока позы нет, на карте стоит обычный спрайт героини.
