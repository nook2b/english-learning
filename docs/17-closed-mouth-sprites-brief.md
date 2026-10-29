# English Club — бриф: спрайты с закрытым ртом и кадры речи к ним

Версия 1 · 29.10.2026. Заменяет [`16-talk-frames-redo-brief.md`](16-talk-frames-redo-brief.md). Общие требования к спрайтам — в [`11-sprite-brief.md`](11-sprite-brief.md).

## 1. Зачем переделываем

Во время речи приложение накладывает на лицо кадр «рот открыт». Если у основной эмоции рот уже открыт (широкая улыбка, смех, «о»), контраста нет: при речи одна открытая улыбка меняется на другую, и это выглядит странно.

**Новое правило для всех героинь:**
- **спрайт эмоции — рот закрыт** или губы едва разомкнуты: без зубов и без языка;
- **открытый рот бывает только в кадре речи** `_talk`.

Эмоцию передают глаза, брови, щёки и форма губ, а не открытый рот. Смех — закрытая улыбка с зажмуренными глазами, удивление — круглые глаза и поднятые брови с сомкнутыми губами.

## 2. Как не допустить деградации картинки

Каждая перегенерация чуть портит изображение, поэтому цепочка всегда короткая и всегда начинается с самого раннего исходника.

| Уровень | Что это | Из чего делается |
|---|---|---|
| 0 | **Оригинальный референс** — PNG из библиотеки ChatGPT, а не WebP из репозитория | — |
| 1 | База позы (лицо `neutral`, рот закрыт) | Одна генерация из уровня 0 |
| 2 | Спрайт эмоции | Одна правка лица на уровне 1 |
| 3 | Кадр речи `_talk` | Одна правка рта на уровне 2 |

Правила:
- **Только PNG, без сжатия, на всех шагах.** Не брать файлы из приложения или репозитория (`.webp`): они уже сжаты с потерями.
- **После каждой правки — склейка.** Из результата генерации берём только область маски и накладываем её на исходник этого шага. Всё вне маски должно совпадать с исходником попиксельно. Так вы делали в прошлых пакетах (база + маска через ImageMagick) — так и оставить.
- **Не править результат правки.** Если эмоция не получилась, повторить с уровня 1, а не исправлять неудачный вариант. Если не получился кадр речи — повторить с уровня 2.
- Маска эмоции — лицо от бровей до подбородка, без волос и очков. Маска кадра речи — только рот: от кончика носа до подбородка, по ширине щёк.

## 3. Что делать

### Мика — заново, целиком (17 спрайтов + 17 кадров речи)

Новые базы обеих поз из **оригинального фронтального референса** «Три героини_ готика, поп и классика.png» (Мика в центре). Старые спрайты и кадры речи Мики не использовать вовсе.

| Поза | База (уровень 1) | Эмоции (уровень 2) |
|---|---|---|
| `stand` | `neutral` | `listening`, `happy`, `laugh`, `surprised`, `thinking`, `embarrassed`, `annoyed`, `focused`, `excited`, `pout`, `forced_smile` |
| `phone` | `focused` | `neutral`, `happy`, `thinking`, `embarrassed` |

И к каждой из 17 эмоций — кадр речи `{эмоция}_talk.png`.

### Рэй — только лица с открытым ртом (3 спрайта + 3 кадра речи)

Тело и позы не меняются. Исходник уровня 1 — **оригинальный PNG базы позы из первого пакета Рэй**: `rei/base/stand/neutral.png`.

| Файл | Было | Станет |
|---|---|---|
| `rei/base/stand/laugh.png` | смех с открытым ртом | закрытый смешок, глаза зажмурены |
| `rei/base/stand/surprised.png` | рот «о» | широкие глаза, губы сомкнуты |
| `rei/base/stand/embarrassed.png` | видны зубы | неловкая сомкнутая улыбка |

И к ним три новых `_talk`.

### Айрис — только лица с открытым ртом (4 спрайта + 4 кадра речи)

Исходники уровня 1 — **оригинальные PNG баз из первого пакета Айрис**: `iris/base/stand/neutral.png` и `iris/base/notebook/focused.png`.

| Файл | Было | Станет |
|---|---|---|
| `iris/base/stand/laugh.png` | смех с открытым ртом | закрытый смешок, глаза зажмурены |
| `iris/base/stand/surprised.png` | рот «о» | широкие глаза, губы сомкнуты |
| `iris/base/notebook/surprised.png` | рот «о» | то же |
| `iris/base/stand/guilty.png` | гримаса с зубами | виноватая сжатая улыбка |

И к ним четыре новых `_talk`.

**Итого:** 24 спрайта и 24 кадра речи.

## 4. Промпты

### 4.1. База позы Мики (уровень 1)

Прикрепить оригинальный фронтальный референс. Для позы `phone` можно приложить и выразительный референс.

```
Visual novel character sprite in the exact art style of the attached reference image:
2D anime illustration, clean confident dark outlines, flat cel-shaded color fills,
simple soft shadows, no grain, no noise, no texture, no painterly effects.
Single character only, full body from the top of the head to the shoes, centered,
front-facing camera at chest height. Adult woman, 20 years old, mature adult
proportions, natural non-suggestive stance.
Character: Mika. Long blonde hair in a high ponytail with a pink scrunchie, bright
blue eyes, warm light skin, large pink hoop earrings, heart pendant necklace.
She is the character in the CENTER of the reference image; keep her face, hair and
colors exactly the same.
Outfit exactly as in the reference: pink crop top with a small bow, pink wrap mini
skirt with a side tie, small pink shoulder bag, white slouch socks, white platform
sneakers with pink hearts.
<POSE>
Facial expression: calm neutral expression, relaxed eyebrows, MOUTH CLOSED, lips
relaxed and together, looking at the viewer.
Vertical 1024x1536 image, transparent background, no floor, no ground shadow,
no text, no logos, no watermark. Top of the head about 60 px from the top edge,
soles of the shoes about 40 px from the bottom edge.
```

`<POSE>` для `stand`:
```
Pose: standing relaxed, facing the viewer, left hand on her hip, right arm relaxed at her side, weight slightly on one leg. No V sign.
```

`<POSE>` для `phone` (в этой позе база — `focused`; строку про лицо заменить на `Facial expression: concentrated, eyes looking down at the phone, MOUTH CLOSED.`):
```
Pose: standing, holding a smartphone in her right hand at chest height, screen turned toward herself, left hand on her hip, head slightly tilted toward the phone.
```

### 4.2. Эмоция (уровень 2)

Общая часть:
```
Edit only the selected face area. Keep the same character, the same art style,
line weight and colors, the same hair, the same head position and angle
[for Iris: the same round black glasses]. Do not change anything outside the
selected area. The MOUTH STAYS CLOSED: lips together or barely parted, no teeth,
no tongue visible.
New facial expression: <ЭМОЦИЯ>.
```

| Эмоция | `<ЭМОЦИЯ>` |
|---|---|
| `neutral` | `calm neutral expression, relaxed eyebrows, lips relaxed and closed, looking at the viewer` |
| `listening` | `attentive listening expression, eyebrows slightly raised, eyes on the viewer, lips softly closed` |
| `happy` | `warm happy smile with closed lips, cheeks slightly raised, soft happy eyes` |
| `laugh` | `laughing with the mouth closed, eyes squeezed shut in happy upward arcs, cheeks raised, a wide closed-lip grin, like holding back a giggle` |
| `surprised` | `surprised, eyes wide open, eyebrows raised high, lips closed in a small round pout` |
| `thinking` | `thoughtful, eyes looking up and to the side, slight frown of concentration, lips pressed together` |
| `embarrassed` | `awkward embarrassed smile with closed lips, eyes glancing down and away, eyebrows slightly worried, small sweat drop near the temple, no blush` |
| `annoyed` | `annoyed, eyebrows drawn together, narrowed eyes, lips pressed into a flat line` |
| `focused` | `concentrated, eyes looking down toward her hands, lips closed, calm` |
| `excited` | `excited, sparkling wide eyes, eyebrows raised, a big beaming smile with closed lips, cheeks raised` |
| `pout` | `playful mock pout, cheeks slightly puffed, lips pushed forward and closed, eyebrows mock-offended` |
| `forced_smile` | `forced cheerful smile: wide stretched smile with closed lips, tense eyes and strained eyebrows; the smile does not reach the eyes` |
| `guilty` (Айрис) | `guilty, eyes looking down and away, eyebrows tilted up, lips pressed into an apologetic tight smile` |

Амплитуда — в конец строки эмоции: Мика `Expressive and big, like an energetic person.`; Рэй `Understated and restrained, small movements of the face.`; Айрис `Composed and subtle.`

### 4.3. Кадр речи (уровень 3)

Общая часть:
```
Edit only the selected mouth area. Keep the same character, the same art style,
line weight and colors, the same eyes, eyebrows, blush and head position
[for Iris: the same round black glasses]. Do not change anything outside the
selected area.
The character is in the middle of speaking: <РОТ>.
```

| Эмоция | `<РОТ>` |
|---|---|
| Все, кроме перечисленных ниже | `mouth open in a soft "ah" shape mid-word, the same emotion as before, upper teeth barely visible, natural for talking` |
| `happy`, `excited` | `the same smile opens while talking: mouth open in a cheerful "ah", same smile corners turned up, upper teeth visible` |
| `laugh` | `the closed grin opens into a short laugh while talking: open happy mouth, same smile corners, eyes stay shut` |
| `surprised` | `the lips open into a small round "oh" while talking, the same surprised eyes` |
| `forced_smile` | `talking through the same tense stretched smile: lips part to show clenched teeth slightly apart, the smile still looks strained` |
| `pout` | `the pout opens slightly while talking, lips still pushed forward` |

## 5. Проверка перед отправкой

- [ ] У всех спрайтов эмоций рот закрыт: нет зубов и языка.
- [ ] Эмоция читается по глазам и бровям на маленьком экране: уменьшить до 25%.
- [ ] Спрайт эмоции и база позы совпадают вне лица попиксельно.
- [ ] Кадр речи и его эмоция совпадают вне рта попиксельно; при переключении двигается только рот, ширина и уголки улыбки на месте.
- [ ] У новых баз Мики внешность совпадает с оригинальным референсом: хвост с резинкой, голубые глаза, большие розовые кольца, кулон-сердце.
- [ ] 1024 × 1536, прозрачный фон, без белой каймы, PNG.

## 6. Как прислать

Один архив на героиню с той же структурой папок: `mika/base/stand/neutral.png`, `mika/base/stand/neutral_talk.png` и т. д.
- **Мика:** вся папка `mika/` — 17 спрайтов и 17 кадров речи. Старые файлы Мики я удалю целиком.
- **Рэй и Айрис:** только изменённые спрайты и их `_talk`. Остальное у них остаётся как есть.

Я переведу спрайты в WebP, скриптом вырежу кадры речи как участки рта и подключу всё в приложение. Менять код не нужно.
