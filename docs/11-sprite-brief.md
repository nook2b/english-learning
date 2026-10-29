# English Club — бриф на генерацию спрайтов

Версия 1 · 29.10.2026. Пошаговая инструкция и готовые промпты для всех спрайтов героинь. Что и зачем нужно, описано в [`10-sprites.md`](10-sprites.md), внешность — в [реестре референсов](09-heroine-references.md).

Промпты написаны по-английски: генераторы картинок понимают его точнее. Пояснения — по-русски.

## Коротко: как пользоваться

1. Для каждой **позы** генерируете одну **базовую картинку** — героиня целиком, лицо из первой колонки чек-листа.
2. Из базовой картинки делаете остальные **эмоции**: выделяете только лицо и меняете выражение. Тело, одежда и поза остаются неизменными.
3. Сохраняете файл с именем из чек-листа (раздел 9).
4. Проверяете по списку контроля (раздел 10).

Начинать с арки 1: это 51 спрайт, по 17 на героиню.

---

## 1. Технические требования

| Параметр | Значение |
|---|---|
| Размер | 1024 × 1536, вертикально (2:3) |
| Фон | Прозрачный |
| Формат | PNG при генерации, WebP в репозитории |
| Положение | Героиня по центру; макушка примерно в 60 px от верха, подошвы примерно в 40 px от низа. У сидячей позы `seated` внизу — ножки стула |
| На картинке | Одна героиня, без пола, без тени на земле, без текста, логотипов и водяных знаков |
| Имя файла | `{героиня}/{наряд}/{поза}/{эмоция}.png`, например `rei/base/recorder/smirk.png` |

PNG можно присылать как есть: я переведу их в WebP, проверю размер и прозрачность и разложу по папкам `assets/characters/`.

---

## 2. Процесс

### Шаг A. Базовая картинка позы

1. Прикрепите **фронтальный референс** `assets/refs/ref_02_front.webp` — по нему берётся внешность. Для поз `cheer`, `playful` и `turn` прикрепите ещё **выразительный** `assets/refs/ref_01_expressive.webp` — по нему берётся поза.
2. Соберите промпт по шаблону из раздела 8: стиль + героиня + наряд + поза + базовое лицо + холст.
3. Сгенерируйте 3–4 варианта, выберите тот, где внешность ближе всего к референсу (раздел 10).
4. Сохраните как файл с эмоцией из колонки «База» чек-листа.

### Шаг B. Остальные эмоции этой позы

1. Откройте базовую картинку в режиме редактирования (в ChatGPT — выделение области; в Stable Diffusion — inpaint).
2. **Выделите только лицо**: от бровей до подбородка, без волос и чёлки. Для `blush`, `tender`, `teary` захватите щёки. Для `laugh` и `pout` — подбородок. У Айрис оправа очков попадает в выделение — в промпте сказано сохранить её.
3. Вставьте промпт редактирования (раздел 7) с нужной эмоцией.
4. Сравните результат с базой: всё вне лица должно остаться точно таким же.

**Если генератор всё же сдвинул тело или поменял цвета**, подойдёт бесплатный онлайн-редактор Photopea:
1. Положите базу нижним слоем, а новую картинку — верхним.
2. Добавьте верхнему слою маску и оставьте видимым только лицо.
3. Экспортируйте результат в PNG.

Так все эмоции одной позы совпадают попиксельно, и смена лица в сцене не дёргается.

### Шаг C. Прозрачность

Если генератор отдал белый фон, удалите его — например, в Photopea или remove.bg. Проверьте, что вокруг контура нет белой каймы.

---

## 3. Блок стиля (одинаковый для всех)

```
Visual novel character sprite in the exact art style of the attached reference image:
2D anime illustration, clean confident dark outlines, flat cel-shaded color fills,
simple soft shadows, no grain, no texture, no painterly effects.
Single character only, full body from the top of the head to the shoes, centered,
front-facing camera at chest height. Adult woman, 20 years old, mature adult
proportions, natural non-suggestive stance.
```

## 4. Блоки героинь

Вставляются целиком. Последняя строка привязывает к референсу.

**Рэй**
```
Character: Rei. Long straight black hair with blunt bangs and magenta-purple strands
in the lower layer, pink-burgundy eyes, pale skin, multiple ear piercings with silver
cross earrings, black O-ring choker, slim build. Calm, slightly sleepy-looking eyes.
She is the character on the LEFT in the reference image; keep her face, hair and
colors exactly the same.
```

**Мика**
```
Character: Mika. Long blonde hair in a high ponytail with a pink scrunchie, bright
blue eyes, warm light skin, large pink hoop earrings, heart pendant necklace.
Energetic, expressive face.
She is the character in the CENTER of the reference image; keep her face, hair and
colors exactly the same.
```

**Айрис**
```
Character: Iris. Dark brown hair in a messy bun with loose strands framing the face,
round glasses with thin black frames, brown eyes, light skin. Calm, intelligent face.
She is the character on the RIGHT in the reference image; keep her face, hair,
glasses and colors exactly the same.
```

---

## 5. Позы

Колонка «Реф» — какой референс прикрепить для позы (фронтальный прикрепляется всегда).

### Мика

| Поза | Реф | Промпт |
|---|---|---|
| `stand` | фронт. | `Pose: standing relaxed, facing the viewer, left hand on her hip, right arm relaxed at her side, weight slightly on one leg.` |
| `phone` | фронт. | `Pose: standing, holding a smartphone in her right hand at chest height, screen turned toward herself, left hand on her hip, head slightly tilted toward the phone.` |
| `cheer` | выраз. | `Pose: leaning forward slightly, right hand making a V sign next to her face, left hand resting on her knee, same as the center character in the expressive reference.` |
| `quiet` | фронт. | `Pose: standing with both hands loosely clasped in front of her, shoulders slightly lowered, feet close together, calm and still.` |

### Рэй

| Поза | Реф | Промпт |
|---|---|---|
| `stand` | фронт. | `Pose: standing straight, facing the viewer, arms relaxed at her sides, hands partly hidden in the jacket sleeves.` |
| `recorder` | фронт. | `Pose: standing, wearing black over-ear headphones on her head, holding a small handheld audio recorder at chest height in her right hand, left hand touching one headphone cup.` |
| `arms_crossed` | фронт. | `Pose: arms crossed over her chest, body turned three-quarters to her right, weight on one leg, head facing the viewer.` |
| `playful` | выраз. | `Pose: V sign next to her face, slight lean, tongue sticking out playfully, one eye slightly narrowed, same as the left character in the expressive reference.` |

### Айрис

| Поза | Реф | Промпт |
|---|---|---|
| `stand` | фронт. | `Pose: standing, holding two hardcover books against her chest with her left arm, right hand touching the side of her glasses, shoulder bag on her left shoulder.` |
| `notebook` | фронт. | `Pose: standing, holding an open notebook in her left hand and a pen in her right hand as if writing, shoulder bag on her shoulder, head slightly lowered toward the notebook.` |
| `turn` | выраз. | `Pose: three-quarter turn to her left, adjusting her glasses with her right hand, books held under her left arm, same as the right character in the expressive reference.` |
| `seated` | фронт. | `Pose: sitting on a simple wooden café chair at a small round café table, a cup of tea on the table, both hands near the cup, legs crossed at the ankles. Chair and table are part of the image, nothing else.` |

---

## 6. Наряды

Каждый наряд сохраняет узнаваемые детали героини. Блок `base` — как на референсах.

### Рэй

| Наряд | Промпт |
|---|---|
| `base` | `Outfit exactly as in the reference: black crop top, oversized black jacket worn off the shoulders, black mini skirt with belt and silver chain, black thigh-high stockings with garter straps, black platform boots with buckles, silver cross necklace.` |
| `street` | `Outfit: black cropped biker jacket over a black turtleneck, black mini skirt with belt and silver chain, opaque black tights, black platform boots with buckles, O-ring choker worn over the turtleneck.` |
| `casual` | `Outfit: oversized plain black t-shirt with no print, black shorts, black knee socks, black sneakers.` |
| `winter` | `Outfit: long black wool coat, black and dark purple striped scarf, black gloves, opaque black tights, black platform boots.` |
| `date` | `Outfit: knee-length black slip dress with a sheer black cardigan, opaque black tights, black platform Mary Jane shoes, small silver ring.` |
| `stage` | `Outfit: black mesh long-sleeve top under a black tank top, black tailored shorts with a studded belt, opaque black tights, black platform boots, over-ear headphones around her neck.` |
| `formal` | `Outfit: black blazer over a black high-neck top, black tailored trousers, black platform boots.` |

### Мика

| Наряд | Промпт |
|---|---|
| `base` | `Outfit exactly as in the reference: pink crop top with a small bow, pink wrap mini skirt with a side tie, small pink shoulder bag, white slouch socks, white platform sneakers with pink hearts.` |
| `street` | `Outfit: pastel pink cropped puffer jacket over a white top, white pleated mini skirt, white slouch socks, white platform sneakers with pink hearts.` |
| `casual` | `Outfit: oversized pastel pink hoodie with a small heart on the chest, white shorts, white socks, white sneakers.` |
| `winter` | `Outfit: white fluffy knee-length coat, pink knit scarf, pink knit beanie with her ponytail coming out of it, pink mittens, white winter boots.` |
| `date` | `Outfit: knee-length light pink sundress with small heart-shaped buttons, white cropped cardigan, white platform sneakers with pink hearts.` |
| `stage` | `Outfit: hot pink blazer over a white crop top, pink pleated skirt, staff lanyard with a blank badge, thin headset microphone, white platform sneakers.` |
| `formal` | `Outfit: pale pink blazer over a white blouse, knee-length pink pencil skirt, white loafers, small heart-shaped hair clip.` |

### Айрис

| Наряд | Промпт |
|---|---|
| `base` | `Outfit exactly as in the reference: cream blouse with rolled-up sleeves, dark brown pencil skirt with a belt, brown tights, black loafers, dark leather shoulder bag.` |
| `street` | `Outfit: belted beige trench coat over the cream blouse and dark brown pencil skirt, brown tights, black loafers, dark leather shoulder bag.` |
| `casual` | `Outfit: oversized grey knit sweater, brown corduroy skirt, brown tights, warm grey socks, black loafers.` |
| `winter` | `Outfit: camel wool coat, dark green knit scarf, brown leather gloves, brown tights, dark brown ankle boots.` |
| `date` | `Outfit: knee-length dark green knit dress, cream cardigan, brown tights, black loafers, small dark bag.` |
| `stage` | `Outfit: cream blouse with a dark brown waistcoat, dark brown trousers, black loafers, holding a few index cards with notes (no readable text).` |
| `formal` | `Outfit: dark brown blazer with a matching knee-length skirt, cream blouse, brown tights, black loafers.` |

---

## 7. Эмоции (редактирование лица)

### Промпт редактирования

```
Edit only the selected face area. Keep the same character, the same art style,
line weight and colors, the same hair, the same head position and angle
[for Iris: the same round black glasses]. Do not change anything outside the
selected area.
New facial expression: <ВСТАВИТЬ ЭМОЦИЮ ИЗ ТАБЛИЦЫ>.
```

### Амплитуда у каждой героини

Одна и та же эмоция у героинь выглядит по-разному. Это часть характера.

| Героиня | Амплитуда | Добавить в конец эмоции |
|---|---|---|
| Мика | Большая: эмоции яркие, открытые | `Expressive and big, like an energetic person.` |
| Рэй | Маленькая: всё сдержанно, даже смех | `Understated and restrained, small movements of the face.` |
| Айрис | Средняя, сдержанная | `Composed and subtle.` |

### Общие эмоции

| Эмоция | Промпт |
|---|---|
| `neutral` | `calm neutral expression, relaxed eyebrows, mouth closed, looking at the viewer` |
| `listening` | `attentive listening expression, eyes on the viewer, eyebrows slightly raised, lips softly closed, interested` |
| `happy` | `warm friendly smile, relaxed happy eyes looking at the viewer` |
| `laugh` | `laughing, eyes closed in happy upward arcs, mouth open in a laugh` |
| `surprised` | `surprised, eyes wide open, eyebrows raised high, small round open mouth` |
| `thinking` | `thoughtful, eyes looking up and to the side, slight frown of concentration, lips pressed together` |
| `embarrassed` | `awkward embarrassed smile, eyes glancing down and away, eyebrows slightly worried, small sweat drop near the temple, no blush` |
| `annoyed` | `annoyed, eyebrows drawn together, narrowed eyes, mouth in a flat line with a slight frown` |
| `sad` | `sad, eyebrows angled up in the middle, eyes lowered, small downturned mouth, no tears` |
| `worried` | `worried, eyebrows raised and pinched together, eyes slightly wide, lips pressed, uneasy` |
| `focused` | `concentrated, eyes looking down toward her hands, calm serious mouth` |

### Фирменные эмоции

| Героиня | Эмоция | Промпт |
|---|---|---|
| Мика | `excited` | `excited, sparkling wide eyes, big open smile, eyebrows raised, full of energy` |
| Мика | `pout` | `playful mock pout, cheeks slightly puffed, lips pushed forward, eyebrows mock-offended, eyes half-closed` |
| Мика | `forced_smile` | `forced cheerful smile: wide smile on the mouth but tense, strained eyes; the smile does not reach the eyes` |
| Рэй | `smirk` | `one-sided smirk, one corner of the mouth raised, half-lidded amused eyes` |
| Рэй | `deadpan` | `deadpan, completely flat expression, half-lidded bored eyes, straight mouth` |
| Рэй | `guarded` | `guarded and closed off, eyes looking away to the side, slight frown, tight lips` |
| Айрис | `dry_smile` | `subtle dry smile, one corner of the mouth slightly up, calm half-lidded eyes, understated humor` |
| Айрис | `skeptical` | `skeptical, one eyebrow raised, eyes looking over the top of her glasses, lips pressed` |
| Айрис | `guilty` | `guilty, eyes looking down and away, eyebrows tilted up, small apologetic grimace` |

`playful` у Рэй не редактируется отдельно: лицо задано в промпте позы.

### Эмоции маршрута

| Эмоция | Промпт |
|---|---|
| `blush` | `romantic blush, soft pink flush across the cheeks and nose, shy small smile, eyes glancing to the side` |
| `tender` | `tender gentle smile, soft half-lidded warm eyes, relaxed eyebrows, faint pink on the cheeks` |
| `teary` | `moved to tears, eyes glistening with tears at the edges, small trembling smile, eyebrows raised in the middle` |

---

## 8. Сборка промпта для базы

Шаблон:

```
[блок стиля]
[блок героини]
[наряд]
[поза]
Facial expression: [эмоция из колонки «База» чек-листа].
Vertical 1024x1536 image, transparent background, no floor, no ground shadow,
no text, no logos, no watermark. Top of the head about 60 px from the top edge,
soles of the shoes about 40 px from the bottom edge.
```

### Пример: Рэй, базовый наряд, рекордер

Прикрепить `ref_02_front.webp`.

```
Visual novel character sprite in the exact art style of the attached reference image:
2D anime illustration, clean confident dark outlines, flat cel-shaded color fills,
simple soft shadows, no grain, no texture, no painterly effects.
Single character only, full body from the top of the head to the shoes, centered,
front-facing camera at chest height. Adult woman, 20 years old, mature adult
proportions, natural non-suggestive stance.
Character: Rei. Long straight black hair with blunt bangs and magenta-purple strands
in the lower layer, pink-burgundy eyes, pale skin, multiple ear piercings with silver
cross earrings, black O-ring choker, slim build. Calm, slightly sleepy-looking eyes.
She is the character on the LEFT in the reference image; keep her face, hair and
colors exactly the same.
Outfit exactly as in the reference: black crop top, oversized black jacket worn off
the shoulders, black mini skirt with belt and silver chain, black thigh-high stockings
with garter straps, black platform boots with buckles, silver cross necklace.
Pose: standing, wearing black over-ear headphones on her head, holding a small
handheld audio recorder at chest height in her right hand, left hand touching one
headphone cup.
Facial expression: concentrated, eyes looking down toward her hands, calm serious
mouth. Understated and restrained, small movements of the face.
Vertical 1024x1536 image, transparent background, no floor, no ground shadow,
no text, no logos, no watermark. Top of the head about 60 px from the top edge,
soles of the shoes about 40 px from the bottom edge.
```

Сохранить как `rei/base/recorder/focused.png`. Затем из неё по промпту редактирования — `neutral`, `listening`, `smirk`, `happy`.

### Пример: эмоция Мики из базы

Открыть `mika/base/stand/neutral.png`, выделить лицо:

```
Edit only the selected face area. Keep the same character, the same art style,
line weight and colors, the same hair, the same head position and angle.
Do not change anything outside the selected area.
New facial expression: forced cheerful smile: wide smile on the mouth but tense,
strained eyes; the smile does not reach the eyes. Expressive and big, like an
energetic person.
```

Сохранить как `mika/base/stand/forced_smile.png`.

---

## 9. Чек-листы файлов

Колонка «База» — с каким лицом генерировать базовую картинку позы (шаг A). Остальные эмоции — редактированием лица (шаг B).

### Арка 1 — 51 спрайт

| Героиня | Наряд / поза | База | Остальные эмоции | Всего |
|---|---|---|---|---:|
| Мика | `base/stand` | `neutral` | `listening`, `happy`, `laugh`, `surprised`, `thinking`, `embarrassed`, `annoyed`, `focused`, `excited`, `pout`, `forced_smile` | 12 |
| Мика | `base/phone` | `focused` | `neutral`, `happy`, `thinking`, `embarrassed` | 5 |
| Рэй | `base/stand` | `neutral` | `listening`, `happy`, `laugh`, `surprised`, `thinking`, `embarrassed`, `annoyed`, `focused`, `smirk`, `deadpan`, `guarded` | 12 |
| Рэй | `base/recorder` | `focused` | `neutral`, `listening`, `smirk`, `happy` | 5 |
| Айрис | `base/stand` | `neutral` | `listening`, `happy`, `laugh`, `surprised`, `thinking`, `embarrassed`, `annoyed`, `focused`, `dry_smile`, `skeptical`, `guilty` | 12 |
| Айрис | `base/notebook` | `focused` | `thinking`, `skeptical`, `dry_smile`, `surprised` | 5 |

Второстепенный персонаж арки 1 — новичок из кульминации (раздел 11): одна поза, 4 эмоции.

### Арка 2 — 56 спрайтов

| Героиня | Наряд / поза | База | Эмоции | Всего |
|---|---|---|---|---:|
| Все трое | `base/stand` | — | добавить `sad`, `worried` | 6 |
| Мика | `base/cheer` | `laugh` | `excited`, `happy`, `pout` | 4 |
| Мика | `base/phone` | — | добавить `excited`, `forced_smile`, `surprised` | 3 |
| Рэй | `base/arms_crossed` | `annoyed` | `guarded`, `deadpan`, `thinking`, `sad` | 5 |
| Рэй | `base/recorder` | — | добавить `annoyed` | 1 |
| Рэй | `base/playful` | `playful` | — | 1 |
| Айрис | `base/turn` | `dry_smile` | `embarrassed`, `happy`, `thinking` | 4 |
| Айрис | `base/notebook` | — | добавить `annoyed`, `guilty` | 2 |
| Каждая | `street/stand` | `neutral` | `listening`, `happy`, `laugh`, `surprised`, `thinking`, `embarrassed`, `annoyed`, `sad` + фирменная: Мика `forced_smile`, Рэй `smirk`, Айрис `dry_smile` | 10 × 3 = 30 |

### Арки 3–4 — 80 спрайтов

| Героиня | Наряд / поза | База | Эмоции | Всего |
|---|---|---|---|---:|
| Мика | `base/quiet` | `neutral` | `thinking`, `sad`, `worried` | 4 |
| Айрис | `base/seated` | `neutral` | `happy`, `embarrassed`, `worried` | 4 |
| Мика | `street/phone` | `focused` | `neutral`, `happy`, `thinking` | 4 |
| Рэй | `street/recorder` | `focused` | `neutral`, `smirk`, `happy` | 4 |
| Айрис | `street/notebook` | `focused` | `thinking`, `dry_smile`, `surprised` | 4 |
| Каждая | `casual/stand` | `neutral` | тот же набор из 10, что у `street/stand` | 30 |
| Каждая | `winter/stand` | `neutral` | тот же набор из 10 | 30 |

### Арка 5 и дальше

**Выбранная героиня** (к юниту 081). Остальным то же самое — только если позже проходить их маршруты.

| Героиня | Что | Эмоции | Всего |
|---|---|---|---:|
| Каждая | `base/stand` | `blush`, `tender`, `teary` | 3 |
| Мика | `base/phone`, `base/quiet` | `phone`: `blush`; `quiet`: `tender`, `blush` | 3 |
| Айрис | `base/turn`, `base/seated` | `turn`: `blush`; `seated`: `tender`, `blush`, `teary` | 4 |
| Рэй | `base/recorder` | `blush`, `tender` | 2 |
| Каждая | `date/stand` (база `neutral`) | набор из 10 + `blush`, `tender`, `teary` | 13 |
| Мика | `date/quiet` (база `tender`) | `blush`, `happy`, `thinking` | 4 |
| Рэй | `date/recorder` (база `focused`) | `neutral`, `blush`, `tender` | 4 |
| Айрис | `date/seated` (база `tender`) | `blush`, `happy`, `teary` | 4 |

**Все трое**, по мере сюжета:

| Арка | Наряд | Что | Всего |
|---|---|---|---:|
| 6 | `stage` | `stand` — набор из 10; рабочая поза (`phone`, `recorder`, `notebook`) — 4 эмоции | 42 |
| 7 | `formal` | так же | 42 |

---

## 10. Контроль качества

Проверять каждую базу и выборочно эмоции.

**Внешность**
- [ ] Рэй: чёлка, пурпурные пряди снизу, розово-бордовые глаза, серьги-кресты, чокер с кольцом.
- [ ] Мика: высокий хвост с розовой резинкой, голубые глаза, большие розовые серьги-кольца, кулон-сердце.
- [ ] Айрис: пучок с выбившимися прядями, круглые чёрные очки, карие глаза.
- [ ] Взрослые пропорции, лицо не детское.
- [ ] Руки: по пять пальцев, предметы (телефон, рекордер, блокнот, книги) держатся естественно.

**Техника**
- [ ] 1024 × 1536, прозрачный фон, без белой каймы по контуру.
- [ ] Макушка и подошвы примерно на заданных отступах; рост героини такой же, как на её других спрайтах.
- [ ] Нет текста, логотипов, водяных знаков, второго персонажа.

**Эмоции**
- [ ] Вне лица ничего не изменилось: при переключении между базой и эмоцией тело не дёргается.
- [ ] Эмоцию можно узнать на маленьком экране телефона. Проверка — уменьшить картинку до 25%.
- [ ] `happy` и `forced_smile` у Мики отличаются глазами; `embarrassed` и `blush` отличаются румянцем.
- [ ] Амплитуда в характере: у Рэй даже смех сдержанный, у Мики всё ярко.

---

## 11. Второстепенные персонажи

Тот же блок стиля, одна поза `stand`, 4 эмоции: `neutral`, `happy`, `surprised` и одна по роли. Палитра спокойнее, чем у героинь, чтобы не спорить с ними в кадре. Внешность ниже — предложение, её можно поменять.

**Новичок, арка 1** (кульминация: игрок помогает ему найти аудиторию). Эмоция по роли — `worried`. Файлы: `newcomer/base/stand/{neutral,worried,happy,surprised}.png`.

```
Character: a new international student, young man, 19-20 years old, short messy dark
hair, friendly face, slightly lost look. Outfit: grey hoodie under an open green
jacket, jeans, white sneakers, big backpack, holding a printed campus map.
Pose: standing, facing the viewer, one hand holding the map, the other holding a
backpack strap.
```

Остальные второстепенные персонажи (сосед по общежитию, работница кафе, Элли и Ноа, владелец магазина пластинок, музейный координатор) описываются по этому же шаблону, когда до них дойдёт сюжет.


---

## 12. Кадры речи (`_talk`)

Пока героиня говорит, приложение переключает её лицо между обычной эмоцией и кадром «рот открыт». Для озвученных файлов рот открывается по громкости голоса (простой липсинк), для браузерного голоса — по таймеру. Пока кадра нет, героиня только слегка покачивается.

Нужен **один дополнительный кадр на каждую эмоцию**: то же самое изображение, у которого изменён только рот.

### Правила

- Имя файла: `{эмоция}_talk.png` в той же папке. Например, `rei/base/recorder/smirk_talk.png`.
- Исходник — готовый спрайт этой эмоции, а не база позы. Глаза, брови, румянец и всё остальное должны совпадать попиксельно.
- **Маска только на рот:** от кончика носа до подбородка, по ширине щёк. Глаза и брови в маску не попадают.
- Если у эмоции рот закрыт или почти закрыт — в кадре он **приоткрыт на середине слова** (мягкая «а»/«э»). Если рот уже широко открыт (`laugh`, `excited`, `surprised`) — в кадре он **наполовину прикрыт**. Тогда при смене кадров губы двигаются в обе стороны.
- Характер улыбки сохраняется: у `smirk` уголок рта остаётся приподнятым с одной стороны, у `forced_smile` улыбка остаётся натянутой, у `dry_smile` — сдержанной.
- Амплитуда как в эмоциях: у Мики рот открыт заметнее, у Рэй и Айрис — меньше.

### Промпт редактирования

```
Edit only the selected mouth area. Keep the same character, the same art style,
line weight and colors, the same eyes, eyebrows, blush and head position
[for Iris: the same round black glasses]. Do not change anything outside the
selected area.
The character is in the middle of speaking a word: mouth slightly open in a soft
"ah" shape, the same emotion as before (<ЭМОЦИЯ>), teeth barely visible or not
visible, natural for talking.
```

Для `laugh`, `excited`, `surprised` вместо второго абзаца:

```
The character is in the middle of speaking: the mouth is half closed compared to
the original, the same emotion as before (<ЭМОЦИЯ>), natural for talking.
```

### Проверка

- Наложить `_talk` на исходный кадр и переключить: двигается только рот.
- Размер 1024 × 1536, прозрачный фон, без белой каймы.
- На маленьком экране рот читается как открытый, но не как крик.

### Список: арка 1

Первая колонка — эмоции, в которых героини уже говорят в юните 001 и на своих страницах. Их стоит сделать первыми (18 кадров). Остальные понадобятся по мере новых сцен. Всего 51 кадр — по одному на каждый готовый спрайт.

| Героиня | Папка | Сначала (уже говорят) | Потом |
|---|---|---|---|
| Мика | `mika/base/phone/` | `happy`, `thinking` | `embarrassed`, `focused`, `neutral` |
| Мика | `mika/base/stand/` | `excited`, `happy`, `laugh`, `listening` | `annoyed`, `embarrassed`, `focused`, `forced_smile`, `neutral`, `pout`, `surprised`, `thinking` |
| Рэй | `rei/base/recorder/` | `focused`, `happy`, `listening`, `neutral`, `smirk` | — |
| Рэй | `rei/base/stand/` | `neutral`, `smirk` | `annoyed`, `deadpan`, `embarrassed`, `focused`, `guarded`, `happy`, `laugh`, `listening`, `surprised`, `thinking` |
| Айрис | `iris/base/notebook/` | `dry_smile`, `focused` | `skeptical`, `surprised`, `thinking` |
| Айрис | `iris/base/stand/` | `dry_smile`, `happy`, `neutral` | `annoyed`, `embarrassed`, `focused`, `guilty`, `laugh`, `listening`, `skeptical`, `surprised`, `thinking` |

PNG можно присылать как есть. Скрипт `scripts/import_talk_frames.py` сравнивает кадр речи с исходным спрайтом и сохраняет только изменённый участок рта — маленький WebP без потерь `{эмоция}_talk@x,y,w,h.webp` рядом со спрайтом. Приложение накладывает его поверх лица на слогах. Поэтому кадр речи обязательно должен совпадать с исходником попиксельно везде, кроме рта.

Готово: все три героини — по 17 кадров, вся арка 1.
