# English Club — бриф: переделать кадры речи с открытым ртом

> **Устарел.** Заменён брифом [`17-closed-mouth-sprites-brief.md`](17-closed-mouth-sprites-brief.md): вместо исправления кадров речи переделываем сами спрайты с открытым ртом.

Версия 1 · 29.10.2026. Отдельный бриф на перегенерацию нескольких кадров речи (`_talk`). Общие правила кадров речи — в [`11-sprite-brief.md`](11-sprite-brief.md), раздел 12.

## Что не так

Для эмоций, где рот уже открыт, первая версия брифа просила «наполовину прикрыть рот». Генератор нарисовал вместо этого **маленький узкий рот**. Во время речи широкая улыбка сменяется крошечной, и это выглядит странно.

Правильно: кадр речи — **тот же рот на другом слоге**. Ширина рта, уголки и форма улыбки остаются прежними, меняется только раскрытие.

## Что сделать

| Файл | Исходник | Что не так сейчас | Промпт |
|---|---|---|---|
| `mika/base/stand/excited_talk.png` | `mika/base/stand/excited.png` | Широкая улыбка схлопывается в узкий ротик | A |
| `mika/base/stand/laugh_talk.png` | `mika/base/stand/laugh.png` | То же | A |
| `mika/base/stand/surprised_talk.png` | `mika/base/stand/surprised.png` | Круглое «о» превращается в щёлочку | B |
| `mika/base/stand/forced_smile_talk.png` | `mika/base/stand/forced_smile.png` | Натянутая улыбка с зубами становится обычным открытым ртом | C |
| `iris/base/stand/laugh_talk.png` | `iris/base/stand/laugh.png` | Рот при смехе заметно уменьшается | A (с припиской про очки) |

Остальные кадры речи в порядке, их не трогать.

## Как делать

1. Открыть **исходник** — готовый спрайт этой эмоции из пакета арки 1, а не базу позы и не старый кадр речи.
2. Выделить **только рот**: от кончика носа до подбородка, по ширине щёк. Глаза, брови, румянец и волосы в маску не попадают.
3. Вставить промпт: общая часть плюс абзац A, B или C.
4. Сохранить PNG 1024 × 1536 с прозрачным фоном, с именем из таблицы.
5. Проверить по списку ниже.

## Промпты

### Общая часть — всегда первой

```
Edit only the selected mouth area. Keep the same character, the same art style,
line weight and colors, the same eyes, eyebrows, blush and head position.
Do not change anything outside the selected area.
```

Для Айрис добавить в конец общей части:

```
Keep the same round black glasses exactly as they are.
```

### A — широкая открытая улыбка (`excited`, `laugh`)

```
The character is in the middle of speaking with the SAME wide open smile:
keep exactly the same mouth width, the same smile corners turned up and the same
upper lip and upper teeth. Only the jaw is raised a little: the lower lip moves up
so the mouth is about two thirds as open as before, the tongue is less visible.
Do NOT make the mouth smaller or narrower. Same cheerful emotion.
```

### B — круглое «о» (`surprised`)

```
The character is in the middle of speaking while surprised: the mouth stays a
small ROUND "oo" shape, the same position and roundness, just slightly smaller
and a little taller, as when saying "oo". Do NOT turn it into a flat line or a
slit. Same surprised emotion.
```

### C — натянутая улыбка со сжатыми зубами (`forced_smile`)

```
The character is talking through the SAME tense forced grin: keep the same wide
mouth width, the same stretched corners and the same visible upper teeth; the
teeth part slightly, showing a thin dark gap between upper and lower teeth, as
when saying "eh". Do NOT turn it into a relaxed open mouth. The smile must still
look strained.
```

## Проверка перед отправкой

- [ ] Переключить исходник и новый кадр: **ширина рта и уголки на месте**, двигается только нижняя губа (у `forced_smile` — нижние зубы).
- [ ] Улыбка осталась улыбкой: у `excited` и `laugh` по-прежнему радостная, у `forced_smile` по-прежнему натянутая.
- [ ] У `surprised` рот круглый, а не щёлочка.
- [ ] Вне рта ничего не изменилось: глаза, брови, румянец, волосы, серьги, у Айрис — очки.
- [ ] 1024 × 1536, прозрачный фон, без белой каймы.

## Как отправить

PNG можно прислать архивом с той же структурой папок (`mika/base/stand/...`, `iris/base/stand/...`). Скрипт `scripts/import_talk_frames.py` сам вырежет участок рта и подключит его: приложение подхватит новые кадры без изменений в коде.
