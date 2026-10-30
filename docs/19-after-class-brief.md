# English Club — бриф: «После уроков» (экран повторения ошибок)

**Выполнено 30.10.2026:** фон и три героини за партами подключены (`assets/after-class/`); варианты `_done` пока не сделаны.

Версия 1 · 30.10.2026. Общие правила стиля и блоки героинь — в [`11-sprite-brief.md`](11-sprite-brief.md); правило закрытого рта — из [`17-closed-mouth-sprites-brief.md`](17-closed-mouth-sprites-brief.md). Как устроен сам экран — в [полном плане, раздел 3.6](00-full-plan.md).

## 1. Что это за экран

Вкладка «Повторение» — это **пустой класс после занятий**. За партами сидят две героини (пара меняется каждый день). Под ними — что накопилось: ошибки по темам и отложенные задания с микрофоном, и кнопка «Разобрать».

Каждая героиня сидит по-своему — это её характер:
- **Айрис** увлечённо подпёрла щёку рукой: ей правда интересно разбирать ошибки;
- **Рэй** развалилась на парте, голова на вытянутой руке, но одним глазом следит;
- **Мика** скучает, откинувшись на стуле, листает телефон.

## 2. Как картинки складываются на экране

```
┌──────────────────────────────┐
│  фон: пустой класс           │  ← classroom (3:2, по ширине экрана)
│                              │
│   ┌─────────┐  ┌─────────┐   │
│   │ героиня │  │ героиня │   │  ← две картинки «героиня за партой»
│   │ за      │  │ за      │   │     поверх нижней части фона,
│   │ партой  │  │ партой  │   │     каждая ~48% ширины
└───┴─────────┴──┴─────────┴───┘
  реплика героини, темы, кнопка «Разобрать»
```

- **Фон** — отдельная картинка без людей.
- **Каждая героиня — отдельная картинка вместе со своей партой и стулом**, на прозрачном фоне. Так любые две героини встают рядом в любом порядке.
- Все три картинки «за партой» — **с одной точки зрения**: камера на уровне глаз сидящего, прямо спереди, парта одинакового размера и на одной высоте. Иначе пара будет выглядеть склеенной из разных сцен.

## 3. Технические требования

**Фон `classroom`:**
- 1536 × 1024 (3:2), PNG, без прозрачности;
- пустой учебный класс старого корпуса академии, вечер после занятий: тёплый свет из окон, на доске недотёртые английские фразы (неразборчиво, без читаемого текста), несколько пустых парт, стулья задвинуты;
- **нижняя треть — спокойная** (пол, задний ряд парт в мягком фокусе): туда встанут героини;
- тот же стиль, что у героинь: чистые контуры, плоская заливка, мягкие тени, без зерна и текстуры.

**Героини за партой** (3 картинки):
- 1024 × 1024, PNG, **прозрачный фон**, без белой каймы;
- героиня сидит за **одиночной школьной партой** (светлое дерево, металлические ножки) на стуле; парта и стул в кадре целиком;
- камера спереди на уровне глаз сидящего; парта занимает нижнюю треть кадра, её верхний край — примерно на 62% высоты; ширина парты — около 70% ширины кадра;
- макушка — примерно в 60 px от верха; ножки парты — в 30–40 px от низа;
- наряд `base` (как на референсах);
- **рот закрыт** или губы едва разомкнуты, без зубов;
- без пола, тени на полу, текста, логотипов.

## 4. Позы

| Файл | Героиня | Поза |
|---|---|---|
| `after-class/iris_attentive.png` | Айрис | Сидит прямо, локоть на парте, подбородок на ладони; увлечённо смотрит на зрителя, лёгкая улыбка. На парте раскрытый блокнот и ручка |
| `after-class/rei_sprawled.png` | Рэй | Развалилась на парте: голова лежит на вытянутой руке, вторая рука свисает; глаза полуприкрыты, но смотрит на зрителя. Наушники на шее, на парте рекордер |
| `after-class/mika_phone.png` | Мика | Откинулась на спинку стула, ноги вытянуты под партой, держит телефон двумя руками и скучающе листает; взгляд в телефон. На парте розовая сумочка |

**Необязательно, второй заход** — когда все ошибки разобраны, экран может показать довольных героинь:

| Файл | Поза |
|---|---|
| `after-class/iris_done.png` | Сидит, тихо хлопает в ладоши, довольная улыбка с закрытыми губами |
| `after-class/rei_done.png` | Всё так же лежит на парте, но лениво показывает большой палец |
| `after-class/mika_done.png` | Выпрямилась, радостно показывает зрителю экран телефона с сердечком |

## 5. Промпты

### Фон

Прикрепить любой спрайт героини как образец стиля.

```
Background illustration for a visual novel in the exact art style of the attached
reference: 2D anime illustration, clean dark outlines, flat cel-shaded colors, simple
soft shadows, no grain, no noise, no texture, no painterly effects.
An empty classroom in an old university building in the evening after classes:
warm sunset light through tall windows on the left, a green chalkboard with
half-erased handwriting (unreadable, no real letters), a few empty wooden single
desks with metal legs, chairs pushed in, a wall clock, a notice board with blank
papers. No people.
The lower third of the image is calm and simple (floor and the back row of desks
softly out of focus) because characters will be placed there.
Landscape 1536x1024, no text, no logos, no watermark.
```

### Героиня за партой

Прикрепить **оригинальный фронтальный референс** «Три героини».

```
Character illustration in the exact art style of the attached reference image:
2D anime illustration, clean confident dark outlines, flat cel-shaded color fills,
simple soft shadows, no grain, no noise, no texture, no painterly effects.
Single character only. Adult woman, 20 years old, mature adult proportions,
natural non-suggestive pose.
<ГЕРОИНЯ>
<НАРЯД>
She is sitting on a chair at a single school desk (light wood top, thin metal legs),
the desk and the chair fully in frame. Camera straight in front at the eye level of
a seated person. The desk fills the lower third of the image, its top edge at about
62% of the image height, desk width about 70% of the image width.
Pose: <ПОЗА>
MOUTH CLOSED, lips together or barely parted, no teeth.
Square 1024x1024 image, transparent background, no floor, no ground shadow,
no text, no logos, no watermark. Top of the head about 60 px from the top edge,
the desk legs end about 35 px from the bottom edge.
```

`<ГЕРОИНЯ>` и `<НАРЯД>` — блоки из разделов 4 и 6 брифа 11 (наряд `base`). Для Айрис в конец: `Keep the same round black glasses exactly as they are.`

| Файл | `<ПОЗА>` |
|---|---|
| `iris_attentive` | `sitting upright, one elbow on the desk and her chin resting on her palm, looking at the viewer with keen interest and a small closed-lip smile; an open notebook and a pen on the desk` |
| `rei_sprawled` | `slumped forward over the desk, her head lying on one outstretched arm, the other arm hanging down beside the desk, eyes half-closed but looking at the viewer, black over-ear headphones around her neck, a small audio recorder on the desk` |
| `mika_phone` | `leaning back in the chair, legs stretched out under the desk, holding her smartphone with both hands and scrolling it, looking at the phone with a bored face, a small pink shoulder bag lying on the desk` |
| `iris_done` | `sitting upright, clapping her hands softly in front of her chest, a pleased closed-lip smile; an open notebook on the desk` |
| `rei_done` | `still slumped over the desk with her head on one arm, lazily giving a thumbs-up with the other hand, a faint smirk with closed lips` |
| `mika_done` | `sitting up straight and excited, holding her phone out to show the viewer a screen with a big pink heart, sparkling eyes, big closed-lip smile` |

## 6. Проверка перед отправкой

- [ ] Три картинки «за партой» с одной точки зрения: если поставить любые две рядом, парты на одной высоте и одного размера.
- [ ] Лица, причёски и цвета совпадают с референсом; у Айрис очки.
- [ ] Рот закрыт.
- [ ] Поза читается при уменьшении до 20%.
- [ ] Героини — прозрачный фон без белой каймы; фон — без людей, нижняя треть спокойная.

## 7. Как прислать

Архив `after-class/`: `classroom.png`, `iris_attentive.png`, `rei_sprawled.png`, `mika_phone.png` (и при желании три `_done`). Я переведу их в WebP и положу в `assets/after-class/`. Экран подхватит их сам; пока картинок нет, вместо фона — простая заливка, вместо героинь за партой — их обычные спрайты.
