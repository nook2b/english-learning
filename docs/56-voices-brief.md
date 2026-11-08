# English Club — бриф: голоса второстепенных персонажей (ElevenLabs)

Версия 1 · 08.11.2026. Для Ивана: подобрать в ElevenLabs голоса второстепенным персонажам и прислать мне их **Voice ID**. Озвучку сгенерирую сам: скрипт `scripts/generate_audio.py`, модель `eleven_v4` (`content/voices.json`).

## 1. Зачем разные акценты

Героини говорят чисто и понятно. Второстепенные — **с разными акцентами английского**: так игрок с первых юнитов слышит, как английский звучит в жизни, а не только в учебнике. Но это аудирование для уровня B1, поэтому акцент — **лёгкий**: каждое слово должно быть разборчиво с первого раза, темп обычный или чуть медленнее.

Академия — в Великобритании (цены в фунтах), поэтому трое — британские и ирландский акценты, а новичок — иностранный студент.

## 2. Кому какой голос

| Персонаж | Где звучит | Кто он | **Акцент** | Голос |
|---|---|---|---|---|
| **Нора** (`nora`) | 009–012, столовая | работница столовой, 40–50 лет; тёплая, деловая, всё проверяет | **ирландский** (Дублин), мягкий | женский, средний по высоте, тёплый, приветливый |
| **Сэм** (`sam`) | 011, магазин техники | продавец, около 25 лет; дружелюбный, любит объяснять | **северо-английский** (Манчестер / Йоркшир), лёгкий | мужской, молодой, живой, разговорный |
| **Алекс** (`alex`) | 006–007, техник академии | техник, около 35 лет; спокойный, точный, вежливый | **шотландский** (Эдинбург), мягкий | мужской, средний по высоте, ровный, уверенный |
| **Рабочий двора** (`worker`) | 013–016, двор | рабочий бригады, 50+ лет; немного грубоватый, но вежливый | **лондонский** (эстуарный английский, лёгкий кокни) | мужской, ниже среднего, хрипловатый, неторопливый |
| **Новичок** (020) — *позже* | 020, финал арки | иностранный студент, только приехал | **испанский или бразильский** акцент (английский не родной) | молодой; пол и имя — когда будет сценарий 017–020 |

Голоса, которые уже есть и **не меняются**: Мика, Рэй, Айрис и диктор международного отдела (вступительная проверка).

## 3. Как подобрать

**Вариант А — библиотека голосов** (Voices → Library):
1. Фильтры: Language — English; **Accent** — из таблицы (Irish, Northern English / Manchester, Scottish, London / Cockney); Gender и Age — из таблицы; Use case — Conversational или Narrative.
2. Прослушай 3–5 голосов, вставь проверочную фразу (раздел 4), выбери самый разборчивый.
3. Add to My Voices.

**Вариант Б — создать голос по описанию** (Voices → Create → Voice Design), если в библиотеке нет подходящего. Описания для поля промпта:

| Персонаж | Описание (вставить как есть) |
|---|---|
| Нора | `A warm, friendly woman in her forties with a soft Dublin Irish accent. Clear, efficient canteen worker. Medium pitch, natural pace, easy to understand.` |
| Сэм | `A cheerful young man in his mid-twenties with a light Manchester accent. Friendly electronics shop assistant who likes explaining things. Conversational, clear, natural pace.` |
| Алекс | `A calm, polite man in his thirties with a soft Edinburgh Scottish accent. Precise technician. Even, confident tone, clear articulation, moderate pace.` |
| Рабочий | `A man in his fifties with a light London Estuary accent, slightly husky. Builder on a work site, a bit gruff but polite. Unhurried, clear enough for English learners.` |

## 4. Проверочные фразы (реплики из приложения)

Проверь, что фразу понятно с первого раза, без субтитров:

- **Нора:** What would you like? We can check ingredients before I send the order through.
- **Сэм:** We can check the clamp and the height. Which first?
- **Алекс:** Hello. Could you show me which problem you want checked first?
- **Рабочий:** Next Wednesday at five. Then the noisy work is finished.

Если акцент мешает понять хоть одно слово — ищи голос мягче.

## 5. Что прислать мне

Для каждого: **имя персонажа → Voice ID** (Voices → My Voices → «⋯» у голоса → Copy voice ID). Например:

```
nora: XXXXXXXXXXXXXXXXXXXX
sam: XXXXXXXXXXXXXXXXXXXX
alex: XXXXXXXXXXXXXXXXXXXX
worker: XXXXXXXXXXXXXXXXXXXX
```

Voice ID — не секрет, его можно писать в чат. **API-ключ в чат не присылай**: он уже настроен в окружении.

Я впишу ID в `content/voices.json`, перегенерирую все реплики этих персонажей и проверю на слух несколько фраз.
