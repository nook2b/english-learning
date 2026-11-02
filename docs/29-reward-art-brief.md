# English Club — бриф: картинки «задание выполнено»

Версия 1 · 02.11.2026. Общие правила стиля, блоки героинь и наряды — в [`11-sprite-brief.md`](11-sprite-brief.md) (разделы 3, 4 и 6). Как выглядят экраны — холст дизайн-системы «Комната 17» (артборды «Занятие пройдено», «Задание выполнено», «Миссия юнита», «Стрик», «Челлендж Рэй», «С возвращением»). Механики наград — в [полном плане, раздел 3.9](00-full-plan.md#39-геймификация).

## 1. Зачем

Сейчас на экранах итогов стоит обычный спрайт из сцены: ровная стойка и эмоция `happy`. Награда так не ощущается. Нужны **отдельные праздничные картинки**: героиня реагирует на то, что игрок сделал, своим характером и со своим предметом. Это как у Duolingo, где персонаж радуется в конце урока, но героини наши и реагируют по-своему:

- **Мика** радуется громко, всем телом, и уже придумывает, что дальше;
- **Рэй** сдержанна: полуулыбка, короткий жест, наушники на шее. Её одобрение заметно именно потому, что оно маленькое;
- **Айрис** довольна тихо и по делу: отмечает в блокноте, поправляет очки, «вот теперь правильно».

**Чем отличаются от спрайтов сцен и поз для карты:**
- одна картинка на случай: без набора эмоций и без кадров речи. Губы шевелиться не будут, поэтому **рот можно открыть** в улыбке или возгласе (правило закрытого рта из брифа 17 здесь не действует), но без широкого оскала;
- кадр **по середину бедра**, а не в полный рост: картинку показывают крупно, лицо и руки должны читаться;
- поза праздничная, но взрослая и естественная.

## 2. Где и как их видно

```
┌──────────────────────────────┐
│                              │
│        ╭──────────╮          │  ← круг цвета героини рисует интерфейс
│       │  героиня   │         │     (Мика #FFE3EE, Рэй #EFE9FF, Айрис #DDF7EE)
│       │  по бедро  │         │
│        ╰────────── ╯         │  ← низ картинки обрезан по кругу
│    Занятие пройдено          │
│   [ 7 мин ] [ 88% ] [ +6 ]   │
│  [      ПРОДОЛЖИТЬ       ]   │
└──────────────────────────────┘
```

- Картинка стоит **по центру экрана, около 240 × 240 точек**. Интерфейс кладёт её на круг цвета героини и обрезает низ по кругу. Поэтому **голова и руки с предметом должны помещаться в верхние две трети кадра**, а по бокам не должно быть ничего важного.
- Конфетти, звёздочки, лучи и сердечки рисует интерфейс. **В картинке их нет**: так одна картинка годится и для обычного итога, и для праздника.
- Групповые картинки (все трое) стоят шире, около 340 × 230 точек, на светлой подложке.
- Фон прозрачный. На светлой теме и на вечернем фоне сцен (`#1B1D2E`) картинка должна смотреться одинаково.

## 3. Технические требования

**Одна героиня:**
- **1024 × 1024, PNG, прозрачный фон**, без белой каймы;
- кадр от макушки до середины бедра, нижний край обрезает фигуру; макушка — примерно в 70 px от верхнего края (поднятые руки и предмет могут быть выше, но не за краем);
- фигура по центру, плечи примерно на 40% ширины кадра; тело можно развернуть на три четверти, лицо — к зрителю;
- наряд `base` (как на референсах);
- без пола, тени, текста, логотипов, конфетти и других эффектов.

**Все трое (групповые):**
- **1536 × 1024, PNG, прозрачный фон**;
- те же правила кадра: по середину бедра, макушки примерно в 90 px от верха, головы на одной высоте (рост героинь по референсу);
- порядок как в сценах: **Рэй слева, Мика в центре, Айрис справа**, героини чуть заходят друг на друга;
- масштаб каждой героини одинаковый, как у одиночных картинок.

**Общее:** каждая картинка — одна генерация от оригинального референса, без повторной перерисовки результата.

## 4. Список картинок

### Одиночные (9)

| Файл | Где показывается | Героиня и поза |
|---|---|---|
| `reward/mika_session.png` | Итог занятия в юните Мики | Подпрыгнула, обе руки вверх, в одной — планшет с бумагами; большая открытая улыбка, глаза сияют |
| `reward/rei_session.png` | Итог занятия в юните Рэй | Стоит расслабленно, наушники на шее, одной рукой коротко показывает «ок» на уровне груди; лёгкая полуулыбка, один глаз чуть прищурен |
| `reward/iris_session.png` | Итог занятия в юните Айрис | Держит раскрытый блокнот, ставит в нём галочку ручкой; довольная улыбка с закрытыми губами, смотрит на зрителя поверх очков |
| `reward/mika_quest.png` | Выполнено задание дня или цель дня | Показывает зрителю телефон экраном вперёд, вторая рука — «пять!» ладонью к зрителю; радостная улыбка |
| `reward/rei_quest.png` | То же | Протягивает зрителю один наушник от своих наушников, как будто «послушай»; спокойная тёплая улыбка |
| `reward/iris_quest.png` | То же | Прижимает к груди стопку карточек, вторая рука поправляет очки; смущённо-довольная улыбка |
| `reward/mika_welcome.png` | Возвращение после перерыва в 3+ дня | Машет рукой, вторая на ремешке розовой сумочки; открытая дружелюбная улыбка, без укоризны |
| `reward/rei_welcome.png` | То же | Чуть наклонила голову, ладонь поднята в коротком приветствии; спокойное «а, ты вернулся» |
| `reward/iris_welcome.png` | То же | Держит два стаканчика кофе навынос, один протягивает зрителю; мягкая улыбка |

Героиню для задания дня и возвращения выбирает приложение (по очереди или героиня юнита, который сейчас идёт), поэтому нужны все три.

### Групповые (3)

| Файл | Где показывается | Поза |
|---|---|---|
| `reward/trio_mission.png` | Миссия юнита выполнена | Все трое смотрят на зрителя: Мика в центре держит над головой планшет с листом, Рэй слева подняла рекордер, Айрис справа хлопает в ладоши |
| `reward/trio_module.png` | Проверка модуля пройдена (порог 80%) | Мика и Айрис вместе держат лист с большой галочкой, Рэй слева показывает большой палец; все улыбаются |
| `reward/trio_streak.png` | Вехи стрика: 7, 30, 100 дней | Мика держит маленький торт с одной свечой, Айрис — бумажный колпак в руке, Рэй — хлопушку (ещё не взорванную); праздник в комнате 17 без фона |

### Недельный челлендж с Рэй (2)

| Файл | Где показывается | Поза |
|---|---|---|
| `reward/rei_challenge_win.png` | Неделя: игрок обогнал цель Рэй | Протягивает кулак для «бро-фиста» к зрителю, наушники на шее; редкая открытая улыбка |
| `reward/rei_challenge_next.png` | Неделя: цель не взята | Пожимает плечами, руки в карманах; лёгкая улыбка «в следующий раз». **Ни грусти, ни разочарования**: поражение ничего не отнимает (план, 3.9) |

Итого **14 картинок**. «После уроков» сюда не входит: довольные героини за партами — в брифе 19 (`*_done`).

## 5. Промпты

### Одна героиня

Прикрепить **оригинальный фронтальный референс** «Три героини».

```
Character illustration in the exact art style of the attached reference image:
2D anime illustration, clean confident dark outlines, flat cel-shaded color fills,
simple soft shadows, no grain, no noise, no texture, no painterly effects.
Single character only. Adult woman, 20 years old, mature adult proportions,
natural non-suggestive pose.
<ГЕРОИНЯ>
<НАРЯД>
Framing: from the top of the head down to mid-thigh, the bottom edge of the image
cuts the figure at mid-thigh. Centered, camera at chest height, face turned to the
viewer. Top of the head about 70 px from the top edge. Head, hands and the object
she holds stay within the upper two thirds of the image.
Pose: <ПОЗА>
Celebratory, warm, natural mood. No confetti, no sparkles, no effects.
Square 1024x1024 image, transparent background, no floor, no shadow, no text,
no logos, no watermark.
```

`<ГЕРОИНЯ>` и `<НАРЯД>` — блоки из разделов 4 и 6 брифа 11 (наряд `base`). Для Айрис в конец: `Keep the same round black glasses exactly as they are.`

| Файл | `<ПОЗА>` |
|---|---|
| `mika_session` | `jumping with joy, both arms raised high, a clipboard with papers in one hand, big open smile, sparkling eyes` |
| `rei_session` | `standing relaxed, black over-ear headphones around her neck, making a small OK sign with one hand at chest level, a faint half-smile, one eye slightly narrowed` |
| `iris_session` | `holding an open notebook and ticking a box in it with a pen, looking at the viewer over her glasses with a satisfied closed-lip smile` |
| `mika_quest` | `holding her smartphone out with the screen facing the viewer, the other hand raised for a high five with the palm to the viewer, joyful smile` |
| `rei_quest` | `offering one ear cup of her black over-ear headphones to the viewer as if saying "listen", calm warm smile` |
| `iris_quest` | `hugging a small stack of index cards to her chest, the other hand adjusting her glasses, shy pleased smile` |
| `mika_welcome` | `waving at the viewer with one hand, the other hand on the strap of a small pink shoulder bag, open friendly smile` |
| `rei_welcome` | `head slightly tilted, one hand raised in a short casual greeting, calm relaxed expression with a small smile` |
| `iris_welcome` | `holding two takeaway coffee cups, offering one to the viewer, soft gentle smile` |
| `rei_challenge_win` | `reaching one fist toward the viewer for a fist bump, black headphones around her neck, a rare open smile` |
| `rei_challenge_next` | `shrugging with both hands in her jacket pockets, easygoing small smile, relaxed and not sad` |

### Все трое

Прикрепить **оригинальный фронтальный референс** «Три героини».

```
Group illustration in the exact art style of the attached reference image:
2D anime illustration, clean confident dark outlines, flat cel-shaded color fills,
simple soft shadows, no grain, no noise, no texture, no painterly effects.
Exactly three characters, the same three as in the reference, in the same order:
Rei on the LEFT, Mika in the CENTER, Iris on the RIGHT. Adult women, 20 years old,
mature adult proportions, natural non-suggestive poses. Keep their faces, hair,
colors and relative heights exactly as in the reference. Iris keeps her round black
glasses. Base outfits as in the reference.
Framing: from the top of the heads down to mid-thigh, the bottom edge cuts the
figures at mid-thigh; they stand close together, slightly overlapping, all facing
the viewer. Tops of the heads about 90 px from the top edge.
Scene: <СЦЕНА>
Celebratory, warm mood. No confetti, no sparkles, no effects.
Landscape 1536x1024 image, transparent background, no floor, no shadow, no text,
no logos, no watermark.
```

| Файл | `<СЦЕНА>` |
|---|---|
| `trio_mission` | `Mika holds a clipboard with a sheet of paper high above her head, Rei raises a small audio recorder, Iris claps her hands; all three smile at the viewer` |
| `trio_module` | `Mika and Iris hold one large sheet of paper together with a big hand-drawn check mark on it, Rei gives a thumbs-up; all three smile` |
| `trio_streak` | `Mika holds a small cake with one lit candle, Iris holds a paper party hat, Rei holds an unpopped party popper; a small celebration` |

## 6. Проверка перед отправкой

- [ ] Лица, причёски и цвета совпадают с референсом; у Айрис очки.
- [ ] Кадр по середину бедра; голова, руки и предмет — в верхних двух третях.
- [ ] Если наложить на круг 240 × 240 и обрезать низ по кругу, ничего важного не пропадает.
- [ ] Характер читается: Мика громкая, Рэй сдержанная, Айрис тихая и деловая.
- [ ] `rei_challenge_next` не грустная.
- [ ] Нет конфетти, звёзд, фона, тени и текста; прозрачный фон без белой каймы.
- [ ] Групповые: порядок Рэй — Мика — Айрис, одинаковый масштаб, головы на своей высоте.

## 7. Как прислать

Архив `reward/` с PNG по списку из раздела 4. Я переведу их в WebP и положу в `assets/reward/`. Пока картинки нет, экран показывает спрайт героини: `excited` у Мики, `smirk` у Рэй, `dry_smile` у Айрис, а для групповых — три спрайта рядом.
