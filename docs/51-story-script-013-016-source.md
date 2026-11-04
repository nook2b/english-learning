# Сценарий 013–016. Десять секунд двора

## Синопсис

На следующей встрече Мика приносит чай, Айрис — печенье, а Рэй — воду и рекордер. Четверо выходят во двор записать фон и короткое описание для гида. Дрель за стеной, звонок Мики и скрип тетради Айрис превращают десять секунд тишины в целое дело. Игрок записывает полезную фразу про обычный и сегодняшний двор, но шум мешает оставить дубль. На второй попытке команда узнаёт у рабочего, что ремонт закончится только в среду следующей недели. Вместо отмены они находят одно время после занятий и подтверждают, кто что принесёт. В новом дубле наконец слышно речь; далёкий чих остаётся за её пределами и вызывает последний комментарий Рэй.

## Календарь

| Юнит | Время | Событие |
|---|---|---|
| 013 | Среда шестой недели, 13:00–13:25 | Обычная встреча после 012, первая попытка во дворе |
| 014 | Пятница шестой недели, 16:00–16:30 | Заранее согласованная вторая попытка после занятий; разговор с рабочим |
| 015 | Понедельник седьмой недели, 16:00–16:25 | Сравнение расписаний, разовый перенос следующей записи |
| 016, занятия 1–7 | Четверг седьмой недели, 16:00–16:25 | Подтверждения и подготовка после окончания ремонта |
| 016, миссия | Пятница седьмой недели, 16:00 **или** суббота, 11:00 | Одна встреча по выбору 015, удачная запись |

_Примечание для переноса:_ «Неделя» — относительная неделя истории, без реальных дат. Выбор времени хранить одним значением `u015_recording_slot`: `fri16` / `sat11`. Везде ниже `{slot_en}` = Friday at four / Saturday at eleven; `{slot_ru}` = в пятницу в четыре / в субботу в одиннадцать. `{day_en}` = Friday / Saturday; `{time_en}` = four / eleven; `{day_ru}` = в пятницу / в субботу; `{time_ru}` = в четыре / в одиннадцать. Это видимые подстановки перед озвучкой, не слова для игрока. После разового переноса регулярный час возвращается к среде, 13:00, восьмой недели. Занятия — шаги эпизода, не отдельные дни.

## Состояние и правила переноса

На полке две общие чашки — жёлтая и серо-синяя, в бюджете £2; покупок в модуле нет. Подставка, зажим и ветрозащита уже куплены; микрофон исправен. Мика приносит чай из дома, Айрис — печенье; Рэй — воду. Статус — знакомые, гид хранится локально. Слово «первый» в финале означает первый готовый **натурный фрагмент двора**: домашние записи и страница «A day of a new student» никуда не исчезают.

_Примечание для переноса:_ Все текстовые ремарки ниже предназначены игроку. Этот раздел, таблицы флагов и условия веток предназначены разработчику. Запись 013 — забракованный технический дубль, 014 — вторая неудачная сессия, 016 — готовый фрагмент. Учебные повторы не создают новых попыток по сюжету. Непонятый ответ вызывает уточнение, после принятого ответа продолжается выбранная ветка. Повторное прохождение сохраняет первый принятый выбор. Флирт не влияет на оценки, не блокирует маршруты, его отсутствие не уменьшает доверие. Второстепенный персонаж — только рабочий двора, без спрайта; его эмоции обозначают подачу. Голоса из аудирования внутри сцены не превращать автоматически в дополнительные сообщения чата.

## Юнит 013. Обычно и сейчас

**Цель:** Различить обычное положение дел и то, что происходит сейчас.

**Итог юнита:** Описание двора записано на пробу, но дрель перекрывает голос. Вы назначаете вторую попытку на пятницу после занятий.

**Выражения юнита:** usually — обычно; right now — прямо сейчас; at the moment — в данный момент; today — сегодня; every Wednesday — каждую среду; It's usually quiet — Обычно здесь тихо; We're recording — Мы записываем; They're repairing the wall — Они ремонтируют стену; Can you hear…? — Ты слышишь…?; ten seconds — десять секунд; in the background — на фоне; Let's try again — Давай попробуем ещё раз.

### Занятие 1. У окна во двор (понимание)

**Место:** room17

_Среда, час дня. Мика ставит чай рядом с двумя чашками. Айрис кладёт печенье на стол, Рэй достаёт бутылку воды. За окном гремит металл._

- **Мика:** Tea first, courtyard next. I brought enough for four. — Сначала чай, потом двор. Я принесла на четверых. _(phone/happy)_

**Чтение: «Courtyard notes»** (слов: 85)

> Students usually use the courtyard between classes. Some eat lunch on the benches, and others read or talk near the wall. It is usually quiet during lessons. Today, workers are repairing part of the wall. They are using a drill, and their tools are lying beside a ladder. We are checking the sound before we record a short guide. We need an honest description of the place. The guide should help new students understand what they can usually do here and what is happening today.

_Перевод:_ Между занятиями студенты обычно проводят время во дворе. Кто-то обедает на скамейках, другие читают или разговаривают у стены. Во время занятий здесь обычно тихо. Сегодня рабочие ремонтируют часть стены. Они пользуются дрелью, а рядом со стремянкой лежат инструменты. Перед записью короткого фрагмента гида мы проверяем звук. Нам нужно правдивое описание места. Гид должен помочь новичкам понять, что здесь обычно можно делать и что происходит сегодня.

1. What do students usually do here? — Что студенты обычно здесь делают? Варианты: Read and eat / Repair walls / Sell tools; верно: Read and eat.

2. What is happening today? — Что происходит сегодня? Варианты: An exam / Wall repairs / A concert; верно: Wall repairs.

3. Where are the tools? — Где инструменты? Варианты: Beside a ladder / In Room 17 / Under a bench; верно: Beside a ladder.

_Итог занятия:_

- **Айрис:** Keep both parts: the usual courtyard and today’s courtyard. — Оставим обе части: какой двор обычно и какой он сегодня. _(notebook/focused)_

### Занятие 2. Послушай эту тишину (понимание)

**Место:** courtyard

_У стены стоит стремянка. Рэй отправляет в общий чат запись двора, затем фотографирует инструменты._

- **Рэй:** Listen. This is our quiet courtyard. — Послушай. Вот наш тихий двор. _(recorder/smirk)_

**Чат «Room 17» · среда, после выхода во двор**

**Аудирование — Рэй [голосовое]** (слов: 34)

- **Рэй [голосовое]:** Listen. This is our quiet courtyard. Usually, you can hear people talking near the benches. Right now, the drill is louder than everyone. I'm standing by the wall, with the recorder facing the middle. — Послушайте. Вот наш тихий двор. Обычно слышно, как у скамеек разговаривают люди. Сейчас дрель громче всех. Я стою у стены, рекордер направлен в центр двора. _(recorder/neutral)_

1. What is loudest right now? — Что сейчас громче всего? Варианты: The drill / Students / Music; верно: The drill.

- **Рэй [фото: стремянка и инструменты у стены, людей нет]:** Not our equipment. — Это оборудование не наше. _(recorder/neutral)_

**Аудирование — Айрис** (слов: 33)

- **Айрис:** I usually take notes in the library, but today I'm writing outside. These notes are for the courtyard page. Please don't describe it as silent. Someone may believe us and bring a book. — Обычно я делаю заметки в библиотеке, но сегодня пишу на улице. Это заметки для страницы про двор. Только не называй его бесшумным. Кто-нибудь поверит и придёт с книжкой. _(notebook/dry_smile)_

1. Where is Iris writing today? — Где Айрис сегодня пишет? Варианты: In the library / Outside / In a shop; верно: Outside.

**Диктант:** It is usually quiet, but today they are repairing the wall. — Обычно здесь тихо, но сегодня ремонтируют стену.

_Итог занятия:_

- **Рэй:** We have a very clear drill. — Дрель записалась отлично. _(recorder/smirk)_

### Занятие 3. Каждую среду (форма)

**Место:** courtyard

_Айрис делит страницу тетради на две колонки: «обычно» и «сейчас»._

- **Айрис:** Start with what happens regularly. — Начни с того, что происходит регулярно. _(notebook/focused)_

**Материал для заданий:**

1. Students usually read here. — Студенты обычно здесь читают.
2. We meet every Wednesday. — Мы встречаемся каждую среду.
3. Rei checks the sound before each recording. — Рэй проверяет звук перед каждой записью.
4. Mika usually brings her phone. — Мика обычно приносит телефон.
5. Does the courtyard get busy at lunch? — Во дворе бывает людно в обед?
6. It does not usually sound like this. — Обычно здесь звучит не так.

_Итог занятия:_

- **Айрис:** That is the usual day. Now listen to this one. — Это обычный день. А теперь послушай сегодняшний. _(notebook/thinking)_

### Занятие 4. Сегодня у стены (форма)

**Место:** courtyard

_Дрель ненадолго замолкает. Рэй показывает на стену, затем на рекордер._

- **Рэй:** What is happening now? — Что происходит сейчас? _(recorder/listening)_

**Материал для заданий:**

1. Workers are repairing the wall. — Рабочие ремонтируют стену.
2. We are testing the recorder. — Мы проверяем рекордер.
3. Mika is putting her phone away. — Мика убирает телефон.
4. Iris is writing outside today. — Айрис сегодня пишет на улице.
5. Are they using the drill now? — Они сейчас пользуются дрелью?
6. We are not recording the final version yet. — Мы пока не записываем окончательную версию.

_Итог занятия:_

- **Рэй:** Good. Nobody is repairing the recorder. — Хорошо. Рекордер никто не ремонтирует. _(recorder/smirk)_

### Занятие 5. Второй наушник (продукция)

**Место:** courtyard

_Рэй протягивает тебе свободный наушник. Мика и Айрис сверяют заметки у скамейки._

- **Рэй:** Try this one. — Попробуй этот. _(recorder/neutral)_

**Сцена · Только для проверки

- **Рэй:** You can use the other earphone. Only for the test. Don't get used to it. — Можешь взять второй наушник. Только для проверки. Не привыкай. _(recorder/smirk)_

Выбор намерения:

- _Поддержать флирт_ → «Too late. I like listening with you.» / «Good sound. Better company.» — «Поздно. Мне нравится слушать с тобой.» / «Звук хороший. Компания ещё лучше.».
  - **Рэй:** Then listen carefully. — Тогда слушай внимательно. _(recorder/smirk)_ · флаг `flirt_rei_013`

- _Отшутиться_ → «Does the drill get an earphone too?» / «The drill sounds very confident.» — «Дрели тоже дадим наушник?» / «Дрель звучит очень уверенно.».
  - **Рэй:** It doesn't need one. — Ей не нужен. _(recorder/smirk)_

- _По делу_ → «Thanks. I can hear the drill.» / «The voice is too quiet.» — «Спасибо. Я слышу дрель.» / «Голос слишком тихий.».
  - **Рэй:** Yes. That's the problem. — Да. В этом и проблема. _(recorder/smirk)_

Если ответ непонятен:

- **Рэй:** Could you say that another way? — Можешь сказать это иначе? _(listening)_

_Итог занятия:_

- **Рэй:** We need a quieter moment. — Нужен момент потише. _(recorder/focused)_

### Занятие 6. Голосом: два двора (продукция)

**Место:** courtyard

_Айрис держит перед тобой карточку. Рэй пока не включает запись._

- **Айрис:** Try both sentences together. You can take your time. — Попробуй сказать оба предложения вместе. Не спеши. _(notebook/focused)_

**Фразы вслух:**

1. Students usually study here. — Студенты обычно здесь занимаются.
2. Right now, workers are repairing the wall. — Сейчас рабочие ремонтируют стену.
3. It is usually quiet here. — Обычно здесь тихо.
4. Today, it is noisy. — Сегодня здесь шумно.

_Итог занятия:_

- **Айрис:** I can hear the difference between usually and now. — Слышно, где «обычно», а где «сейчас». _(notebook/dry_smile)_

### Занятие 7. Быстрый круг: что слышно (беглость)

**Место:** courtyard

_Рэй показывает по очереди на скамейку, стену и рекордер. Айрис держит карточки со словами времени._

- **Рэй:** Usually or right now? — Обычно или прямо сейчас? _(recorder/listening)_

**Материал для заданий:**

1. Every Wednesday: we meet here. — Каждую среду: мы встречаемся здесь.
2. Right now: we are waiting. — Прямо сейчас: мы ждём.
3. Usually: students sit on these benches. — Обычно: студенты сидят на этих скамейках.
4. Today: the drill is making a lot of noise. — Сегодня: дрель сильно шумит.
5. At the moment: Iris is holding the cards. — В данный момент: Айрис держит карточки.
6. Before each recording: Rei checks the sound. — Перед каждой записью: Рэй проверяет звук.

_Итог занятия:_

- **Мика:** Ready? Ten seconds. Surely we can manage ten. — Готовы? Десять секунд. Уж десять-то мы осилим. _(happy)_

### Занятие 8. Десять секунд тишины (миссия)

**Место:** courtyard

_Рэй ставит рекордер на подставку. Айрис раскрывает тетрадь. Мика оглядывает двор._

- **Мика:** It's usually quiet here. — Здесь обычно тихо. _(neutral)_

_За стеной включается дрель._

- **Рэй:** Usually. Useful word. Saves our reputation. — «Обычно». Полезное слово. Спасает репутацию. _(recorder/smirk)_

- **Айрис:** Shall we record somewhere else? — Может, запишем в другом месте? _(notebook/thinking)_

- **Рэй:** I need ten seconds here. Nobody talking. — Нужно десять секунд здесь. Без разговоров. _(recorder/focused)_

- **Мика:** Why record silence? — Зачем записывать тишину? _(thinking)_

- **Рэй:** For the gaps where you breathe. — Для пауз, когда ты вдыхаешь. _(recorder/smirk)_

- **Мика:** My breathing has character. — У моих вдохов есть характер. _(happy)_

_Рэй поднимает палец. На шестой секунде у Мики звонит телефон. Она торопливо выключает звук._

- **Мика:** Sorry. Again. — Простите. Ещё раз. _(phone/embarrassed)_

_На четвёртой секунде Айрис закрывает тетрадь. Переплёт громко скрипит._

- **Айрис:** I'm starting to understand your job. — Начинаю понимать, какая у тебя работа. _(notebook/dry_smile)_

**Сцена · Строчка о дворе

- **Рэй:** Tell us what it is usually like. Then what is happening today. — Скажи, как здесь обычно. А потом — что происходит сегодня. _(recorder/listening)_

Выбор намерения:

- _Сказать о студентах и ремонте_ → «Students usually study here. Today, workers are repairing the wall.» / «Students usually read here. Right now, workers are repairing the wall.» — «Студенты обычно здесь занимаются. Сегодня рабочие ремонтируют стену.» / «Студенты обычно здесь читают. Сейчас рабочие ремонтируют стену.».
  - **Рэй:** Got it. Listen back. — Записала. Послушаем. _(recorder/listening)_ · флаг `u013_description_students`

- _Сказать о тишине и шуме_ → «It is usually quiet here. It is noisy today.» / «It's usually quiet, but today the workers are making noise.» — «Обычно здесь тихо. Сегодня здесь шумно.» / «Обычно здесь тихо, но сегодня рабочие шумят.».
  - **Рэй:** Got it. Listen back. — Записала. Послушаем. _(recorder/listening)_ · флаг `u013_description_sound`

Если ответ непонятен:

- **Рэй:** Could you say that another way? — Можешь сказать это иначе? _(listening)_

_Примечание для переноса:_ Дополнительное уточнение о времени — - **Рэй:** Every day, or right now? — Каждый день или прямо сейчас? _(recorder/listening)_

- **Айрис:** You sound slow, but clear. Keep the words. Try them again without the drill. — Ты говоришь медленно, но понятно. Слова оставим. Попробуем ещё раз без дрели. _(notebook/focused)_

**Сцена · Без микрофона

- **Айрис:** You listen when I speak. That's a rare skill around a microphone. — Ты слушаешь, когда я говорю. Рядом с микрофоном это редкий навык. _(dry_smile)_

Выбор намерения:

- _Поддержать флирт_ → «I'd listen to you without a microphone too.» / «You make listening easy.» — «Я бы и без микрофона тебя слушал.» / «Тебя легко слушать.».
  - **Айрис:** Then I'll try to say something worth hearing. — Тогда постараюсь сказать что-нибудь стоящее. _(dry_smile)_ · флаг `flirt_iris_013`

- _Отшутиться_ → «The drill hasn't learned that skill.» / «The notebook wants a turn too.» — «Дрель этому пока не научилась.» / «Тетрадь тоже хочет высказаться.».
  - **Айрис:** The notebook has had enough turns. — Тетрадь уже достаточно высказалась. _(dry_smile)_

- _По делу_ → «Thanks. Let's keep the words and record again.» / «The text works. We need less noise.» — «Спасибо. Оставим слова и запишем ещё раз.» / «Текст подходит. Нужно поменьше шума.».
  - **Айрис:** Agreed. Same words, quieter day. — Согласна. Те же слова, более тихий день. _(dry_smile)_

Если ответ непонятен:

- **Айрис:** Could you say that another way? — Можешь сказать это иначе? _(listening)_

- **Мика:** Let's try Friday at four, after classes. Does that work? — Давайте попробуем в пятницу в четыре, после занятий. Подходит? _(phone/thinking)_

- **Айрис:** Yes. I finish at half past three. — Да. Я заканчиваю в половине четвёртого. _(neutral)_

- **Рэй:** Four works. — В четыре подходит. _(neutral)_

**Игрок:** Friday at four works for me. — В пятницу в четыре мне подходит.

_Итог занятия:_

- **Мика:** Friday, then. Phone on silent. Mine, especially. — Тогда в пятницу. Телефоны без звука. Особенно мой. _(phone/happy)_

## Юнит 014. Что мешает записи

**Цель:** Описать помеху и вежливо узнать, когда шум закончится.

**Итог юнита:** Вторая попытка срывается. Рабочий сообщает, что шумные работы закончатся в среду следующей недели к пяти вечера.

**Выражения юнита:** It's too loud — Слишком громко; It's getting louder — Становится громче; They keep moving chairs — Они всё время двигают стулья; Could you…, please? — Не могли бы вы…?; I'm sorry to bother you, but… — Извините, что беспокою, но…; How long will it take? — Сколько это займёт?; When does the work finish? — Когда заканчиваются работы?; We're trying to record — Мы пытаемся записать; the ventilation fan — вентилятор системы вентиляции; a short break — короткий перерыв; until Wednesday — до среды; after five — после пяти.

### Занятие 1. Объявление у стены (понимание)

**Место:** courtyard

_Пятница, четыре часа. Рядом со стеной появилось объявление. Из открытой двери доносится скрежет стульев._

- **Айрис:** There is a finish time. Let’s read that first. — Тут есть время окончания. Начнём с него. _(notebook/focused)_

**Чтение: «Courtyard work»** (слов: 84)

> Work on the courtyard wall continues this week and next week. The team works from nine until five on weekdays. Noisy work will finish next Wednesday at five. The benches remain available, but please keep bags away from the tools. Staff may move chairs through the courtyard while the wall is being repaired. If you are planning a recording, ask a worker about the day's work before you set up. Short breaks are possible, but we cannot promise a quiet courtyard during working hours.

_Перевод:_ Работы на стене двора продолжаются на этой и следующей неделе. Бригада работает по будням с девяти до пяти. Шумные работы закончатся в следующую среду в пять. Скамейками можно пользоваться, но не оставляйте сумки возле инструментов. Пока ремонтируют стену, сотрудники могут переносить стулья через двор. Если планируете запись, спросите рабочего о сегодняшних работах до установки оборудования. Короткие перерывы возможны, но гарантировать тишину в рабочее время мы не можем.

1. When does noisy work finish? — Когда закончатся шумные работы? Варианты: This Friday / Next Wednesday at five / Next Saturday; верно: Next Wednesday at five.

2. Can students use the benches? — Можно пользоваться скамейками? Варианты: Yes / Only at night / No; верно: Yes.

3. What should the team do before setting up? — Что сделать до установки оборудования? Варианты: Ask a worker / Buy a chair / Call the library; верно: Ask a worker.

_Итог занятия:_

- **Рэй:** Wednesday at one is inside working hours. — Среда, час дня — работы ещё идут. _(thinking)_

### Занятие 2. Не только дрель (понимание)

**Место:** courtyard

_В общем чате появляется голосовое Мики. На фоне гудит вентиляция, затем кто-то берёт на трубе длинную ноту._

- **Мика:** I found two more sounds. Neither is us. — Нашла ещё два звука. Ни один не наш. _(phone/neutral)_

**Чат «Room 17» · пятница, перед второй попыткой**

**Аудирование — Мика [голосовое]** (слов: 35)

- **Мика [голосовое]:** I'm near the door. They keep moving chairs behind me, and the fan is running above it. Someone is practising the trumpet upstairs too. Can you hear me? I'm coming back to the bench now. — Я возле двери. За мной всё время двигают стулья, а над дверью работает вентилятор. Наверху ещё кто-то упражняется на трубе. Вы меня слышите? Сейчас вернусь к скамейке. _(phone/neutral)_

1. Where is Mika going? — Куда идёт Мика? Варианты: To the bench / Upstairs / To the shop; верно: To the bench.

- **Айрис [фото: крупный план объявления без людей; видны Wed и 17:00]:** The important part. — Самое важное. _(notebook/focused)_

**Аудирование — Рэй** (слов: 32)

- **Рэй:** The fan is making a steady low sound. The chairs are louder, but they stop sometimes. The trumpet is coming from an open window. Moving the microphone won't remove all three sounds. — Вентилятор ровно гудит на низкой ноте. Стулья громче, но иногда затихают. Труба звучит из открытого окна. Одной перестановкой микрофона все три звука не убрать. _(recorder/focused)_

1. Which sound is steady? — Какой звук постоянный? Варианты: The chairs / The fan / The trumpet; верно: The fan.

**Диктант:** They keep moving chairs near the door. — Они всё время двигают стулья возле двери.

_Итог занятия:_

- **Рэй:** Three sounds. One microphone. — Три звука. Один микрофон. _(recorder/smirk)_

### Занятие 3. Что происходит и что повторяется (форма)

**Место:** courtyard

_Айрис записывает источники шума в отдельные строки._

- **Айрис:** One sound can continue. Another can stop and start. — Один звук может тянуться. Другой — то стихать, то возникать снова. _(notebook/focused)_

**Материал для заданий:**

1. The fan is running above the door. — Над дверью работает вентилятор.
2. They keep moving chairs. — Они всё время двигают стулья.
3. Someone is practising the trumpet. — Кто-то упражняется на трубе.
4. The drill is getting louder. — Дрель шумит всё громче.
5. We keep hearing the same note. — Мы всё время слышим одну и ту же ноту.
6. The workers are not using the drill at the moment. — Сейчас рабочие не пользуются дрелью.

_Итог занятия:_

- **Айрис:** Write what you hear. We don’t need to guess why. — Запиши, что слышишь. Гадать о причинах не нужно. _(notebook/thinking)_

### Занятие 4. Вежливая просьба (форма)

**Место:** courtyard

_Рабочий убирает дрель на стол. Мика показывает на него и опускает голос._

- **Мика:** Let’s wait until he puts that down. — Подождём, пока он это положит. _(thinking)_

**Материал для заданий:**

1. I'm sorry to bother you, but we're trying to record. — Извините, что беспокою, но мы пытаемся записать.
2. Could you tell us when the work finishes, please? — Не могли бы вы сказать, когда закончатся работы?
3. Could we use this bench during your break? — Можно нам занять эту скамейку во время вашего перерыва?
4. How long will the noisy work take? — Сколько ещё продлятся шумные работы?
5. Is there a quieter time to come back? — В какое время можно вернуться, чтобы было тише?
6. Thank you. We can come back another day. — Спасибо. Мы можем вернуться в другой день.

_Итог занятия:_

- **Рэй:** Ask for a time. Not a miracle. — Спроси про время. Чуда не надо. _(smirk)_

### Занятие 5. Тихая правка (продукция)

**Место:** courtyard

_Вы с Айрис отходите от двери, чтобы разобрать вопрос перед разговором. Она перечитывает твою строчку._

- **Айрис:** That sounds polite already. — Уже звучит вежливо. _(notebook/focused)_

**Сцена · Непривычная пауза

- **Айрис:** You're making this difficult. I was looking for something to correct. — Ты усложняешь мне задачу. Я искала, что поправить. _(dry_smile)_

Выбор намерения:

- _Поддержать флирт_ → «Then stay. I might surprise you again.» / «I like having you check my words.» — «Тогда оставайся. Может, ещё удивлю.» / «Мне нравится, когда ты проверяешь мои слова.».
  - **Айрис:** I'll read the next sentence too. — Прочитаю и следующее предложение. _(dry_smile)_ · флаг `flirt_iris_014`

- _Отшутиться_ → «I can add a mistake if you need one.» / «Don't worry. There is another sentence.» — «Могу добавить ошибку, если нужно.» / «Не волнуйся. Есть ещё предложение.».
  - **Айрис:** Let's not order extra mistakes. — Не будем заказывать дополнительные ошибки. _(dry_smile)_

- _По делу_ → «Thanks. Shall we ask him now?» / «Could you check the time question too?» — «Спасибо. Спросим его сейчас?» / «Проверишь ещё вопрос про время?».
  - **Айрис:** Yes. That's the one we need. — Да. Он нам и нужен. _(dry_smile)_

Если ответ непонятен:

- **Айрис:** Could you say that another way? — Можешь сказать это иначе? _(listening)_

_Итог занятия:_

- **Айрис:** He has put the drill down. Your turn. — Он положил дрель. Твой выход. _(notebook/focused)_

### Занятие 6. Голосом: обратиться к рабочему (продукция)

**Место:** courtyard

_Ты останавливаешься в нескольких шагах от рабочего. Айрис держит тетрадь наготове._

- **Айрис:** Try the opening first. — Попробуй сначала начало. _(neutral)_

**Фразы вслух:**

1. I'm sorry to bother you, but we're trying to record. — Извините, что беспокою, но мы пытаемся записать.
2. Could you tell us when the work finishes? — Не могли бы вы сказать, когда закончатся работы?
3. They keep moving chairs near the microphone. — Возле микрофона всё время двигают стулья.
4. Is there a quieter time to come back? — Когда можно вернуться, чтобы было тише?

_Итог занятия:_

- **Мика:** Short and clear. He can answer that. — Коротко и понятно. На это он сможет ответить. _(happy)_

### Занятие 7. Быстрый круг: звук и просьба (беглость)

**Место:** courtyard

_Рэй по очереди называет звуки. Ты подбираешь к каждому описание и вопрос._

- **Рэй:** Fan. Chairs. Trumpet. Your words. — Вентилятор. Стулья. Труба. Твои слова. _(recorder/listening)_

**Материал для заданий:**

1. The fan is too loud. — Вентилятор слишком громко гудит.
2. Could we move away from the door? — Можем отойти от двери?
3. They keep moving chairs. — Они всё время двигают стулья.
4. When do they finish? — Когда они закончат?
5. Someone is practising upstairs. — Кто-то репетирует наверху.
6. Could we come back later? — Можем вернуться позже?

_Итог занятия:_

- **Рэй:** Now ask the person with the answers. — Теперь спроси того, кто знает ответы. _(recorder/neutral)_

### Занятие 8. Вторая попытка (миссия)

**Место:** courtyard

_Рабочий вытирает руки и смотрит на рекордер. У двери снова скребут ножки стульев._

- **Рабочий (второстепенный):** Are you trying to record something? — Вы пытаетесь что-то записать? _(neutral)_

**Сцена · Спросить, когда станет тише

- **Рабочий (второстепенный):** What do you need to know? — Что вы хотите узнать? _(neutral)_

Выбор намерения:

- _Узнать окончание работ_ → «Could you tell us when the noisy work finishes?» / «When does the work finish, please?» — «Не могли бы вы сказать, когда закончатся шумные работы?» / «Подскажите, когда закончатся работы?».
  - **Рабочий (второстепенный):** Next Wednesday at five. Then the noisy work is finished. — В следующую среду в пять. На этом шумные работы закончатся. _(neutral)_ · флаг `u014_ask_finish`

- _Узнать про перерыв_ → «Is there a short break soon?» / «Could we record during your break?» — «Скоро будет короткий перерыв?» / «Можно записать во время вашего перерыва?».
  - **Рабочий (второстепенный):** We can pause the drill now. The noisy work finishes next Wednesday at five. — Можем сейчас выключить дрель. Шумные работы закончатся в следующую среду в пять. _(neutral)_ · флаг `u014_ask_break`

Если ответ непонятен:

- **Рабочий (второстепенный):** Could you say that another way? — Можешь сказать это иначе? _(listening)_

- **Рабочий (второстепенный):** The chairs and the fan are still going. I can't promise silence today. — Стулья всё ещё двигают, вентилятор работает. Сегодня тишины не обещаю. _(neutral)_

_Рэй включает короткий тест. В паузе между стульями сверху тянется нота трубы. Она снимает наушники._

- **Рэй:** Not today. — Сегодня не выйдет. _(recorder/neutral)_

**Сцена · Сквозь шум

- **Мика:** You could still hear me in that voice message? I hope I was worth the effort. — Ты всё-таки расслышал меня в том голосовом? Надеюсь, старания того стоили. _(happy)_

Выбор намерения:

- _Поддержать флирт_ → «I'd listen to you even with the trumpet.» / «Your voice was the best part.» — «Я бы тебя и с трубой послушал.» / «Твой голос был лучше всего.».
  - **Мика:** I'll take that. Next time, no trumpet. — Принимается. В следующий раз без трубы. _(happy)_ · флаг `flirt_mika_014`

- _Отшутиться_ → «The trumpet almost answered for you.» / «It sounded like a very small concert.» — «Труба чуть за тебя не ответила.» / «Звучало как очень маленький концерт.».
  - **Мика:** Terrible tickets. No seats. — Ужасные билеты. Даже мест нет. _(happy)_

- _По делу_ → «Yes. You were going back to the bench.» / «I heard you. The fan was loud, though.» — «Да. Ты возвращалась к скамейке.» / «Я тебя расслышал. Но вентилятор был громкий.».
  - **Мика:** Good. Next recording needs less background. — Хорошо. Для следующей записи нужно меньше шума. _(happy)_

Если ответ непонятен:

- **Мика:** Could you say that another way? — Можешь сказать это иначе? _(listening)_

- **Мика:** I'll tell the chat: no recording today. We'll check new times on Monday. — Напишу в чат: сегодня не записать. В понедельник выберем другое время. _(phone/focused)_

_Итог занятия:_

- **Айрис:** Next Wednesday at five. I’ve written it down. — Следующая среда, пять вечера. Записала. _(notebook/focused)_

## Юнит 015. Найти другое время

**Цель:** Предложить время, объяснить занятость и договориться о разовой встрече.

**Итог юнита:** Вы выбираете пятницу, 16:00, или субботу, 11:00. Регулярные встречи по средам сохраняются.

**Выражения юнита:** We're meeting on… — Мы встречаемся в…; Can we move it to…? — Можем перенести на…?; How about…? — Как насчёт…?; I'm afraid I can't — Боюсь, не могу; I'm busy then — В это время я занят; That works for me — Мне подходит; after class — после занятия; this time only — только в этот раз; Are you free on…? — Ты свободен в…?; I'm having a class — У меня занятие; Let's check — Давай проверим; another time — другое время.

### Занятие 1. Четыре расписания (понимание)

**Место:** room17

_Понедельник, четыре часа. Мика рисует на доске пятницу и субботу. Айрис сверяет время окончания ремонта._

- **Мика:** Two options. Both after the work finishes. — Два варианта. Оба после окончания работ. _(phone/focused)_

**Чтение: «One recording, another day»** (слов: 91)

> The courtyard work finishes on Wednesday at five. Our usual Wednesday meeting is at one, so we need another time for this recording. Mika has a class on Thursday until five. Rei is helping in the sound room on Friday until half past three. Iris is studying in the library on Saturday afternoon, but she is free in the morning. Everyone is free on Friday at four and Saturday at eleven. Please choose one of these times. We are moving this recording only. Our regular meetings stay on Wednesdays at one.

_Перевод:_ Работы во дворе закончатся в среду в пять. Наша обычная встреча в среду в час, поэтому для этой записи нужно другое время. В четверг Мика на занятии до пяти. Рэй в пятницу помогает в звуковой комнате до половины четвёртого. Айрис в субботу после обеда занимается в библиотеке, но утром свободна. Всем подходят пятница в четыре и суббота в одиннадцать. Выберите одно из этих времён. Мы переносим только эту запись. Обычные встречи остаются по средам в час.

1. Why not Wednesday at one? — Почему не среда в час? Варианты: The work is still going / Iris is away / The recorder is broken; верно: The work is still going.

2. When is Rei free on Friday? — Когда Рэй свободна в пятницу? Варианты: After 3:30 / Only at noon / After six; верно: After 3:30.

3. What stays the same? — Что остаётся прежним? Варианты: Regular Wednesday meetings / The repair schedule changes / Both options are booked; верно: Regular Wednesday meetings.

_Итог занятия:_

- **Мика:** Nobody needs to miss a class. — Никому не придётся пропускать занятия. _(phone/happy)_

### Занятие 2. Два предложения (понимание)

**Место:** room17

_В общий чат приходят два голосовых. На доске пока пустые клетки напротив пятницы и субботы._

- **Мика:** Listen before you pick. Both are real options. — Прежде чем выбрать, послушай. Оба варианта подходят. _(phone/thinking)_

**Чат «Room 17» · понедельник, сверка расписаний**

**Аудирование — Мика [голосовое]** (слов: 34)

- **Мика [голосовое]:** How about Friday at four? My classes finish at three, so I can bring the tea first. I can't do Thursday at four because I'm having a class. Saturday morning works for me too. — Как насчёт пятницы в четыре? У меня занятия заканчиваются в три, так что сначала занесу чай. В четверг в четыре не могу: у меня занятие. Суббота утром мне тоже подходит. _(phone/neutral)_

1. Which time is impossible for Mika? — Какое время Мике не подходит? Варианты: Thursday at four / Friday at four / Saturday morning; верно: Thursday at four.

**Аудирование — Айрис [голосовое]** (слов: 36)

- **Айрис [голосовое]:** I'm studying in the library on Saturday afternoon, but eleven in the morning is fine. Friday at four also works. Could we choose just one? I don't want to put two recording sessions in my notebook. — В субботу после обеда я занимаюсь в библиотеке, но в одиннадцать утра могу. Пятница в четыре тоже подходит. Выберем что-то одно? Не хочу записывать в тетрадь две встречи для записи. _(neutral)_

1. How many sessions does Iris want to arrange? — Сколько встреч хочет назначить Айрис? Варианты: One / Two / Three; верно: One.

- **Рэй:** Friday after three thirty. Or Saturday morning. Both work. — В пятницу после половины четвёртого. Или в субботу утром. Оба подходят. _(neutral)_

**Диктант:** Can we move it to Friday at four? — Можем перенести на пятницу в четыре?

_Итог занятия:_

- **Айрис:** We have two options, not two bookings. — У нас два варианта, а не две назначенные встречи. _(notebook/dry_smile)_

### Занятие 3. Что уже в расписании (форма)

**Место:** room17

_Айрис обводит занятия и дела, которые уже стоят у всех в расписаниях._

- **Айрис:** These are arrangements. The days are already in the diary. — Это договорённости. Даты уже записаны. _(notebook/focused)_

**Материал для заданий:**

1. Mika is having a class on Thursday afternoon. — В четверг после обеда у Мики занятие.
2. Rei is helping in the sound room on Friday. — В пятницу Рэй помогает в звуковой комнате.
3. Iris is studying in the library on Saturday afternoon. — В субботу после обеда Айрис занимается в библиотеке.
4. We are meeting after the repairs finish. — Мы встречаемся после окончания ремонта.
5. Are you doing anything on Saturday morning? — У тебя есть дела в субботу утром?
6. We are not recording this Wednesday at one. — В эту среду в час мы не записываем.

_Итог занятия:_

- **Рэй:** The recorder can wait. Classes first. — Рекордер подождёт. Сначала занятия. _(neutral)_

### Занятие 4. Не могу, но могу иначе (форма)

**Место:** room17

_Мика зачёркивает четверг и оставляет два свободных окошка._

- **Мика:** A no is useful if we know what works instead. — Отказ тоже полезен, если понятно, что подходит взамен. _(phone/thinking)_

**Материал для заданий:**

1. I'm afraid I can't come on Thursday. — Боюсь, в четверг я не смогу прийти.
2. I'm busy then, but Friday works. — В это время я занят, но пятница подходит.
3. How about Saturday at eleven? — Как насчёт субботы в одиннадцать?
4. Can we move it to Friday? — Можем перенести на пятницу?
5. That works for me. — Мне подходит.
6. Are you free after class? — Ты свободен после занятия?

_Итог занятия:_

- **Мика:** Good. Two boxes left. — Хорошо. Осталось два окошка. _(phone/happy)_

### Занятие 5. Важное уточнение Мики (продукция)

**Место:** room17

_Мика разворачивает телефон к тебе. В календаре открыта суббота._

- **Мика:** I can do either. What about you? — Я могу в оба дня. А ты? _(phone/happy)_

**Сцена · Очень рабочий вопрос

- **Мика:** If we pick Saturday, I get to see you at the weekend. For work, obviously. — Если выберем субботу, увижу тебя на выходных. По работе, разумеется. _(happy)_

Выбор намерения:

- _Поддержать флирт_ → «That sounds like a good reason to come.» / «Seeing you is a good part of the plan.» — «Звучит как хороший повод прийти.» / «Увидеть тебя — хорошая часть плана.».
  - **Мика:** I'll put that under team spirit. — Запишу в раздел «командный дух». _(happy)_ · флаг `flirt_mika_015`

- _Отшутиться_ → «Does the recorder know it's working Saturday?» / «I hope the drill has the weekend off.» — «Рекордер знает, что работает в субботу?» / «Надеюсь, у дрели выходной.».
  - **Мика:** The drill is definitely not invited. — Дрель точно не приглашена. _(happy)_

- _По делу_ → «Both times work. Let's check the list.» / «Let's choose a time after we check everyone.» — «Оба времени подходят. Давай сверим список.» / «Давай выберем время, когда всех проверим.».
  - **Мика:** Right. One time for all four. — Верно. Одно время на четверых. _(happy)_

Если ответ непонятен:

- **Мика:** Could you say that another way? — Можешь сказать это иначе? _(listening)_

_Примечание для переноса:_ Эта сцена не выбирает день. Даже поддержав флирт, игрок вправе выбрать пятницу в миссии.

_Итог занятия:_

- **Мика:** No booking yet. One final check. — Пока ничего не назначаю. Последняя проверка. _(phone/focused)_

### Занятие 6. Голосом: предложить и отказаться (продукция)

**Место:** room17

_Айрис закрывает нижнюю часть расписания листком. Тебе видны день и время._

- **Айрис:** Say the whole arrangement, including the time. — Назови договорённость целиком, вместе со временем. _(notebook/focused)_

**Фразы вслух:**

1. I'm afraid I can't come on Thursday. — Боюсь, в четверг я не смогу прийти.
2. How about Friday at four? — Как насчёт пятницы в четыре?
3. Saturday at eleven works for me. — Суббота в одиннадцать мне подходит.
4. We are moving this recording only. — Мы переносим только эту запись.

_Итог занятия:_

- **Рэй:** Day and time. Both there. — День и время. Всё на месте. _(happy)_

### Занятие 7. Быстрый круг: свободен или занят (беглость)

**Место:** room17

_Мика по очереди указывает на три имени и два свободных дня._

- **Мика:** Who can come, and when? — Кто может прийти и когда? _(phone/focused)_

**Материал для заданий:**

1. Mika cannot come on Thursday at four. — Мика не может прийти в четверг в четыре.
2. Rei is busy until half past three on Friday. — Рэй занята до половины четвёртого в пятницу.
3. Iris is free on Saturday morning. — Айрис свободна в субботу утром.
4. Friday at four works for everyone. — Пятница в четыре подходит всем.
5. Saturday at eleven works for everyone too. — Суббота в одиннадцать тоже подходит всем.
6. We need one extra meeting. — Нам нужна одна дополнительная встреча.

_Итог занятия:_

- **Айрис:** Now choose the one that suits you. — Теперь выбери, какой вариант удобен тебе. _(neutral)_

### Занятие 8. Одна встреча вместо двух (миссия)

**Место:** room17

_На доске остаются два времени. Мика держит телефон над календарём._

- **Мика:** Which one shall I book? — Какое время записать? _(phone/thinking)_

**Сцена · Выбрать разовый перенос

- **Мика:** Friday at four or Saturday at eleven? — Пятница в четыре или суббота в одиннадцать? _(phone/happy)_

Выбор намерения:

- _Пятница, 16:00_ → «Let's meet on Friday at four.» / «Friday at four works for me.» — «Давайте встретимся в пятницу в четыре.» / «Пятница в четыре мне подходит.».
  - **Мика:** Friday at four. I'll cross out Saturday. — Пятница в четыре. Субботу зачёркиваю. _(phone/happy)_ · флаг `u015_slot_fri16`

- _Суббота, 11:00_ → «Let's meet on Saturday at eleven.» / «Saturday at eleven works for me.» — «Давайте встретимся в субботу в одиннадцать.» / «Суббота в одиннадцать мне подходит.».
  - **Мика:** Saturday at eleven. I'll cross out Friday. — Суббота в одиннадцать. Пятницу зачёркиваю. _(phone/happy)_ · флаг `u015_slot_sat11`

Если ответ непонятен:

- **Мика:** Could you say that another way? — Можешь сказать это иначе? _(listening)_

_Примечание для переноса:_ Флаги времени — алиасы одного enum `u015_recording_slot`. Ставится только один, после принятого ответа. Мика фотографирует доску только после выбора, с выбранным временем и зачёркнутой альтернативой.

**Чат «Room 17» · после выбора**

- **Мика [фото: доска с выбранным временем и зачёркнутой альтернативой; людей нет]:** One time, four people. — Одно время, четыре человека. _(phone/happy)_

**Сцена · Уточнить регулярную встречу

- **Айрис:** And our regular Wednesday meeting? — А наша обычная встреча по средам? _(notebook/thinking)_

Выбор намерения:

- _Подтвердить прежний час_ → «We still meet on Wednesdays at one.» / «Wednesday at one stays the same.» — «Мы по-прежнему встречаемся по средам в час.» / «Среда, час дня — без изменений.».
  - **Айрис:** Good. I'll keep that line. — Хорошо. Эту строку оставлю. _(notebook/thinking)_ · флаг `u015_regular_confirmed`

- _Уточнить разовый характер_ → «We're only moving this recording.» / «This change is for one recording only.» — «Мы переносим только эту запись.» / «Это изменение только для одной записи.».
  - **Айрис:** Exactly. Wednesdays stay in the diary. — Именно. Среды остаются в расписании. _(notebook/thinking)_ · флаг `u015_one_off_confirmed`

Если ответ непонятен:

- **Айрис:** Could you say that another way? — Можешь сказать это иначе? _(listening)_

_Итог занятия:_

- **Мика:** We're meeting {slot_en}. I'll send a reminder on Thursday. — Встречаемся {slot_ru}. В четверг пришлю напоминание. _(phone/happy)_

## Юнит 016. Подтвердить и записать

**Цель:** Подтвердить договорённость и распределить подготовку.

**Итог юнита:** В выбранное время вы записываете десять секунд фона и описание двора. Первый натурный фрагмент готов для локального гида.

**Выражения юнита:** Just to confirm… — Уточню напоследок…; So we're meeting at…, right? — Значит, встречаемся в…, верно?; I'll bring… — Я принесу…; I'll check… — Я проверю…; See you on… — Увидимся в…; Have you got…? — У тебя с собой…?; We're all here — Все в сборе; ready to record — готовы записывать; one more take — ещё один дубль; That’s confirmed — Договорились; back to our usual time — возвращаемся к обычному времени; keep this version — оставить эту версию.

### Занятие 1. Напоминание (понимание)

**Место:** room17

_Четверг, четыре часа. Мика открывает общий чат. Айрис кладёт рядом тетрадь с выбранным временем._

- **Мика:** One reminder. Same plan. — Одно напоминание. План прежний. _(phone/focused)_

**Чтение: «Recording reminder»** (слов: 84)

> Just to confirm: we are meeting in the courtyard on {day_en} at {time_en}. The wall work finished on Wednesday at five. Please bring the recorder, microphone and stand. Mika is bringing tea from home. Iris is bringing the short description, and Rei is checking the equipment. We need ten seconds of background sound before we record the words. Please put your phones on silent before we start. This is our one-off recording session. Next week, our regular meeting is back on Wednesday at one.

_Перевод:_ Уточним напоследок: встречаемся во дворе {slot_ru}. Работы на стене закончились в среду в пять. Принесите рекордер, микрофон и подставку. Мика принесёт чай из дома. Айрис принесёт короткое описание, а Рэй проверит оборудование. До записи слов нам нужны десять секунд фонового звука. Пожалуйста, заранее отключите звук телефонов. Это наша разовая встреча для записи. На следующей неделе возвращаемся к обычной встрече в среду в час.

1. Where is the recording? — Где будет запись? Варианты: In the courtyard / In the shop / In the library; верно: In the courtyard.

2. What happens before the words? — Что записывают до слов? Варианты: Ten seconds of background / A song / An interview; верно: Ten seconds of background.

3. When is next week’s regular meeting? — Когда обычная встреча на следующей неделе? Варианты: Wednesday at one / Friday at four / Saturday at eleven; верно: Wednesday at one.

_Итог занятия:_

- **Айрис:** The courtyard. I’ve underlined it. — Во дворе. Подчеркнула. _(notebook/focused)_

### Занятие 2. Подтверждения (понимание)

**Место:** room17

_Под напоминанием появляются ответы. На экране три коротких сообщения._

- **Рэй:** Check the place as well. — Место тоже проверь. _(neutral)_

**Чат «Room 17» · четверг, подтверждения**

- **Мика:** Confirmed: {slot_en}, courtyard. I'll bring tea. — Подтверждаю: {slot_ru}, двор. Принесу чай. _(phone/happy)_

- **Айрис:** That works. I'll bring the text. See you on {day_en}. — Подходит. Принесу текст. Увидимся {day_ru}. _(neutral)_

- **Рэй:** Confirmed. I'll check the recorder and bring the stand. — Подтверждаю. Проверю рекордер и принесу подставку. _(neutral)_

_Примечание для переноса:_ Три сообщения выше — единственный новый эпизод чата до миссии. Два аудио ниже — озвученные устные реплики при совместной проверке в комнате 17, не повторные голосовые в чате.

**Аудирование — Мика** (слов: 34)

- **Мика:** We're meeting in the courtyard, not in this room. I'll bring the tea from home, and I'll put my phone on silent before we start. Please remind me if I forget that last part. — Встречаемся во дворе, не в этой комнате. Принесу чай из дома и отключу звук телефона до начала. Если забуду последний пункт, напомните. _(phone/neutral)_

1. What will Mika do before the recording? — Что Мика сделает до записи? Варианты: Silence her phone / Buy a microphone / Call the worker; верно: Silence her phone.

**Аудирование — Айрис** (слов: 34)

- **Айрис:** I've got the short text from our first attempt. I'll bring it with me, but I'll keep the notebook closed while Rei records the background. Apparently, my notebook has a voice of its own. — У меня короткий текст с первой попытки. Я принесу его, но пока Рэй пишет фон, тетрадь будет закрыта. У неё, оказывается, собственный голос. _(notebook/dry_smile)_

1. What will Iris keep closed? — Что Айрис оставит закрытым? Варианты: Her notebook / The gate / The recorder case; верно: Her notebook.

**Диктант:** Just to confirm, we are meeting in the courtyard. — Уточню напоследок: встречаемся во дворе.

_Итог занятия:_

- **Рэй:** Text, stand, silent phone. Good. — Текст, подставка, телефон без звука. Хорошо. _(happy)_

### Занятие 3. Так мы договорились? (форма)

**Место:** room17

_Айрис сверяет напоминание с записью в тетради._

- **Айрис:** Confirm what we agreed. Don’t invent a new time. — Подтверди, о чём договорились. Новое время придумывать не надо. _(notebook/focused)_

**Материал для заданий:**

1. So we're meeting on {day_en}, right? — Значит, встречаемся {day_ru}, верно?
2. We're meeting at {time_en}, right? — Встречаемся {time_ru}, верно?
3. Just to confirm, the meeting is in the courtyard. — Уточню напоследок: встреча во дворе.
4. The work finished on Wednesday. — Работы закончились в среду.
5. That is confirmed in the group chat. — Это подтверждено в общем чате.
6. Next week, we are meeting on Wednesday at one. — На следующей неделе встречаемся в среду в час.

_Итог занятия:_

- **Айрис:** Same time in both places. A relief. — В обоих местах одно время. Можно выдохнуть. _(notebook/dry_smile)_

### Занятие 4. Я принесу, я проверю (форма)

**Место:** room17

_Рэй кладёт рекордер рядом с подставкой. На листке остаются свободные строки для мелких дел._

- **Рэй:** I’ll take the equipment. What else? — Я возьму оборудование. Что ещё? _(recorder/neutral)_

**Материал для заданий:**

1. I'll bring the recorder. — Я принесу рекордер.
2. I'll check the battery. — Я проверю батарею.
3. I'll put my phone on silent. — Я отключу звук телефона.
4. I'll hold the text while you speak. — Я подержу текст, пока ты говоришь.
5. I'll check the sound before we start. — Я проверю звук до начала.
6. I'll leave the notebook closed. — Я оставлю тетрадь закрытой.

_Итог занятия:_

- **Мика:** I’ll bring the tea. Still no shopping required. — Принесу чай. Покупать по-прежнему ничего не нужно. _(phone/happy)_

### Занятие 5. Понятно с первого раза (продукция)

**Место:** room17

_Рэй прокручивает пробную запись с твоей медленной фразой. После неё слышно дрель._

- **Рэй:** Your words are clear. The wall is louder. — Слова понятные. Стена громче. _(recorder/neutral)_

**Сцена · Ещё одно прослушивание

- **Рэй:** I listened twice. Didn't need to. Wanted to. — Послушала два раза. Не потому что не поняла. Захотелось. _(recorder/smirk)_

Выбор намерения:

- _Поддержать флирт_ → «Then I'll record another one for you.» / «I like having you listen.» — «Тогда запишу тебе ещё одну.» / «Мне нравится, когда ты слушаешь.».
  - **Рэй:** Make it clear. I'll listen. — Говори понятно. Послушаю. _(recorder/smirk)_ · флаг `flirt_rei_016`

- _Отшутиться_ → «The drill has fans already.» / «Should we give the wall a microphone?» — «У дрели уже есть поклонники.» / «Может, дадим стене микрофон?».
  - **Рэй:** No. It's loud enough. — Нет. Она и так громкая. _(recorder/smirk)_

- _По делу_ → «Let's use the same words again.» / «Can we check the battery now?» — «Давай снова используем те же слова.» / «Можем теперь проверить батарею?».
  - **Рэй:** Yes. Let's get ready. — Да. Давай готовиться. _(recorder/smirk)_

Если ответ непонятен:

- **Рэй:** Could you say that another way? — Можешь сказать это иначе? _(listening)_

_Итог занятия:_

- **Рэй:** The words can stay. New recording. — Слова оставим. Запись сделаем новую. _(recorder/focused)_

### Занятие 6. Голосом: всё подтвердить (продукция)

**Место:** room17

_Мика держит телефон с напоминанием. Ты сверяешь с ним свой ответ._

- **Мика:** Your confirmation, then we’re done. — Твоё подтверждение — и закончили. _(phone/happy)_

**Фразы вслух:**

1. Just to confirm, we are meeting {slot_en}. — Уточню напоследок: встречаемся {slot_ru}.
2. We are meeting in the courtyard. — Мы встречаемся во дворе.
3. I'll put my phone on silent. — Я отключу звук телефона.
4. See you on {day_en}. — Увидимся {day_ru}.

_Итог занятия:_

- **Айрис:** That matches the notebook. — Совпадает с тетрадью. _(notebook/focused)_

### Занятие 7. Проверка модуля: запись в саду (беглость)

**Место:** room17

_Айрис кладёт на стол карточку с вымышленным садом и расписанием клуба._

- **Айрис:** A different place. Same problem: people need a clear plan. — Другое место. Та же задача: людям нужен понятный план. _(notebook/focused)_

**Новая ситуация:** школьный сад вымышленного языкового клуба, не Bellwether. В саду обычно читают; сегодня там стригут траву. Клуб собирается во вторник в два. Стрижка закончится во вторник в четыре. Элла занята в среду до трёх, Том свободен после двух. Всем подходит среда в половине четвёртого. Для записи нужны телефон и лист с текстом.

**Задания и принимаемые ответы:**

1. Опиши обычное и текущее. «People usually read here. Today, someone is cutting the grass.» / «It is usually quiet, but they are cutting the grass now.» — «Люди обычно здесь читают. Сегодня кто-то стрижёт траву» / «Обычно здесь тихо, но сейчас стригут траву».
2. Вежливо узнай время окончания. «Could you tell us when the work finishes?» / «When does the work finish, please?» — «Не могли бы вы сказать, когда закончится работа?» / «Подскажите, когда закончится работа?»
3. Отклони вторник, предложи среду. «I'm afraid we can't record on Tuesday at two. How about Wednesday at half past three?» / «Tuesday at two is too noisy. Can we meet on Wednesday at three thirty?» — «Боюсь, во вторник в два не записать. Как насчёт среды в половине четвёртого?» / «Во вторник в два слишком шумно. Можем встретиться в среду в три тридцать?»
4. Подтверди место и помощь. «We're meeting in the garden on Wednesday at three thirty. I'll bring the text.» / «Just to confirm: Wednesday at half past three, in the garden. I'll bring my phone.» — «Встречаемся в саду в среду в три тридцать. Я принесу текст» / «Уточню: среда, половина четвёртого, сад. Я принесу телефон».

_Примечание для переноса:_ Принимаются смысловые эквиваленты. Это независимая проверка четырёх навыков, не событие кампании. Не менять расписание Room 17, флаги выбора и инвентарь.

Если ответ непонятен:

- **Айрис:** Which day and time do you mean? — Какой день и время ты имеешь в виду? _(listening)_

_Итог занятия:_

- **Айрис:** They can find each other. That’s a plan. — Они смогут найти друг друга. Значит, договорились. _(notebook/dry_smile)_

### Занятие 8. Получилось (миссия)

**Место:** courtyard

_Наступает выбранный день. На стене больше нет стремянки. Мика ставит чай на скамейку, Айрис держит текст. Рэй проверяет подставку._

- **Мика:** All four here. And no drill. — Все четверо здесь. И дрели нет. _(happy)_

_Примечание для переноса:_ Заголовок времени этой сцены — пятница, 16:00 при `fri16`, суббота, 11:00 при `sat11`. Никакого повторного выбора даты. Выполнен только один вариант.

**Сцена · Последняя проверка

- **Рэй:** Before I press record: what will you check? — Прежде чем нажму запись: что проверишь ты? _(recorder/listening)_

Выбор намерения:

- _Проверить телефоны_ → «I'll check that our phones are on silent.» / «I'll remind everyone to silence their phones.» — «Проверю, что звук на телефонах выключен.» / «Напомню всем отключить звук телефонов.».
  - **Рэй:** Good. Including Mika's. — Хорошо. И на телефоне Мики тоже. _(recorder/listening)_ · флаг `u016_check_phones`

- _Проверить фон_ → «I'll listen for background noise.» / «I'll check that the courtyard is quiet enough.» — «Послушаю, нет ли фонового шума.» / «Проверю, что во дворе достаточно тихо.».
  - **Рэй:** Good. I'll check the phones. — Хорошо. Телефоны проверю я. _(recorder/listening)_ · флаг `u016_check_background`

Если ответ непонятен:

- **Рэй:** Could you say that another way? — Можешь сказать это иначе? _(listening)_

- **Мика:** Already on silent. I remember. — Уже без звука. Я помню. _(phone/happy)_

- **Айрис:** Notebook closed. Also remembered. — Тетрадь закрыта. Тоже помню. _(dry_smile)_

_Рэй поднимает палец. Вы молчите десять секунд. Слышно ветер в листьях и далёкие шаги. Она опускает руку._

- **Рэй:** Background done. Now your line. — Фон есть. Теперь твоя строчка. _(recorder/focused)_

**Сцена · Фрагмент для гида

- **Рэй:** Keep the usual courtyard and this quiet moment in the description. — Скажи, какой двор обычно и какой он сейчас, когда тихо. _(recorder/listening)_

Выбор намерения:

- _Сказать о студентах_ → «Students usually study here. Right now, we're recording a guide.» / «Students usually read here. Today, we're making a recording.» — «Студенты обычно здесь занимаются. Прямо сейчас мы записываем гид.» / «Студенты обычно здесь читают. Сегодня мы делаем запись.».
  - **Рэй:** Clear. Keep this take. — Понятно. Этот дубль оставим. _(recorder/listening)_ · флаг `u016_take_students`

- _Сказать о звуке_ → «It is usually quiet here. Today, you can hear the wind in the trees.» / «It's usually quiet. Right now, the wind is moving the leaves.» — «Обычно здесь тихо. Сегодня слышно ветер в деревьях.» / «Обычно здесь тихо. Сейчас ветер шевелит листья.».
  - **Рэй:** Clear. Keep this take. — Понятно. Этот дубль оставим. _(recorder/listening)_ · флаг `u016_take_sound`

Если ответ непонятен:

- **Рэй:** Could you say that another way? — Можешь сказать это иначе? _(listening)_

_Примечание для переноса:_ При `u013_description_students` первым предложить намерение про студентов, при `u013_description_sound` — про звук. Оба остаются доступны. Старую фразу про идущий ремонт не подставлять: он закончился.

_Рэй останавливает запись. Где-то вдалеке кто-то чихает._

- **Мика:** Did that get in? — Это попало в запись? _(surprised)_

- **Рэй:** After the end. The academy is alive. Breaking news. — После конца. Академия живая. Сенсация. _(recorder/smirk)_

- **Айрис:** Then we can keep the courtyard. — Тогда двор можно оставить. _(notebook/dry_smile)_

**Чат «Room 17» · после записи**

- **Рэй [фото: экран рекордера с длиной отдельного фонового клипа 00:10; людей и отражений нет]:** Ten seconds. Finally. — Десять секунд. Наконец-то. _(recorder/happy)_

_Примечание для переноса:_ На фото длительность именно фонового клипа. Фраза игрока — отдельный речевой клип. `u016_courtyard_fragment_ready` ставится после принятого ответа и окончания сцены; фото не подменяет речевой клип десятисекундным.

_Итог занятия:_

- **Мика:** Next Wednesday at one. Back to our usual time. I'll bring tea again. — В следующую среду в час. Возвращаемся к обычному времени. Снова принесу чай. _(phone/happy)_

## Страницы героинь

| Героиня | Новый факт | Общее воспоминание | Условие |
|---|---|---|---|
| Мика | Приносит чай из дома на общие встречи | «Ты слышал, как её телефон сорвал почти удавшуюся запись тишины» | После 013/8 |
| Мика | По четвергам у неё занятие до пяти | «Вы нашли другое время, и никто не пропустил занятия» | После 015/8 |
| Рэй | Сначала записывает фон места, затем речь | «Она дала тебе второй наушник послушать двор» | После 013/5, во всех ветках |
| Рэй | Отличает постоянный гул от повторяющегося шума | «Вы наконец записали десять секунд двора, а чих прозвучал уже после остановки» | `u016_courtyard_fragment_ready` |
| Айрис | В субботу после обеда занимается в библиотеке | «Её тетрадь оказалась громче, чем хотелось при записи» | После 013/8 |
| Айрис | Приносит короткий текст к записи | «Вы сверили напоминание с тетрадью: день, время и двор совпали» | После 016/3 |

Флирт-воспоминания добавляются отдельно и только при соответствующем флаге: Рэй 013 — «Ты ответил на её шутку про второй наушник»; Айрис 013 — «Вы пошутили о том, что её стоит слушать и без микрофона»; Айрис 014 — «Ты предложил ей остаться и проверить следующую фразу»; Мика 014 — «Ты заметил, что её всё равно приятно слушать сквозь шум»; Мика 015 — «Ты назвал встречу с ней хорошей частью плана»; Рэй 016 — «Ты поддержал её желание ещё раз послушать твою запись». Общие воспоминания не утверждают, что флирт был взаимным.

## Флаги и возвраты

| Выбор | Место | Возврат |
|---|---|---|
| `u013_description_students` / `u013_description_sound` | 013/8, сцена 1 | Порядок намерений в 016/8, сцена 2; смысловая перекличка без старой фразы о ремонте |
| `u014_ask_finish` / `u014_ask_break` | 014/8, сцена 1 | Разная реакция рабочего; обе ветки сообщают точное время окончания |
| `u015_slot_fri16` / `u015_slot_sat11` | 015/8, сцена 1 | Enum времени, фото доски, напоминание, подтверждения, календарь и миссия 016 |
| `u015_regular_confirmed` / `u015_one_off_confirmed` | 015/8, сцена 2 | Обе ветки сохраняют среду 13:00; финал 016 |
| `u016_check_phones` / `u016_check_background` | 016/8, сцена 1 | Рэй проверяет оставшуюся часть подготовки; оба пункта выполнены до дубля |
| `u016_take_students` / `u016_take_sound` | 016/8, сцена 2 | Конкретная фраза в локальном фрагменте гида |
| `u016_courtyard_fragment_ready` | После финала 016/8 | Открывается готовый натурный фрагмент; последующее продолжение начинает с завершённой записи |
| Шесть `flirt_*` | 013/5, 013/8; 014/5, 014/8; 015/5; 016/5 | Условные воспоминания выше и подбор ранних знаков внимания по действующим правилам; без дополнительных обязательных сцен |

_Примечание для переноса:_ Взаимоисключающие пары хранятся одним значением выбора. Ветки «отшутиться» и «по делу» тоже сохраняются как ответ сцены, но флаг флирта не ставят. Из старых модулей: чашки не размножать, £2 не тратить. При `u012_supply_clips` крепление кабеля во дворе показано зажимом; при `u012_supply_tape` — бумажной лентой. Это вариант реквизита, не новая покупка и не обязательный новый кадр. Старый выбор расположения стола сохраняется. Все прежние флаги флирта остаются; никакая сцена не утверждает взаимность на основании отсутствующего флага.

## Общий чат и арт

| Юнит | Материал | Подпись / задача |
|---|---|---|
| 013/2 | Голосовое Рэй, текст в занятии | Различить usually / right now; дрель слышна, речь разборчива |
| 013/2 | Фото стремянки и инструментов | Not our equipment. — Это оборудование не наше; узнать источник шума |
| 014/2 | Голосовое Мики, текст в занятии | Понять, куда она возвращается; стулья, вентиляция и труба на фоне, речь остаётся понятной |
| 014/2 | Фото объявления | The important part. — Самое важное; Wed / 17:00, длинный текст дан отдельно в чтении |
| 015/2 | Два голосовых, Мика и Айрис | Сравнить доступность; полный текст в занятии |
| 015/8 | Фото доски после выбора | One time, four people. — Одно время, четыре человека; выбранное время читается, альтернатива зачёркнута |
| 016/2 | Три текстовых подтверждения | Кто что берёт, день и место |
| 016/8 | Фото рекордера с 00:10 | Ten seconds. Finally. — Десять секунд. Наконец-то; длительность фонового клипа |

Все фото без людей, отражений лиц, личных кадров и кружочков. Только общий чат. Длинный текст объявления не просить рисовать: он выводится интерфейсом. Фото доски — два варианта или текстовый слой поверх одного фона. Фоны и звуки не требуют новых персонажных спрайтов.

## Свод выражений

По 12 выражений на юнит; полный список с переводами стоит в начале каждого юнита. 013 — привычки / текущие события; 014 — помехи / просьбы; 015 — будущее расписание / вежливый отказ; 016 — подтверждение / обещание помощи. Present Continuous будущего вводится на конкретных договорённостях. `will` в 016 — решение и обещание, не замена всему будущему времени.

## Самопроверка и редактура

- [x] Четыре юнита по восемь занятий; в каждом — чтение, два аудио, два блока формы, сцена продукции, устная продукция, беглость и миссия с двумя сценами.
- [x] В 016/7 — отдельная вымышленная ситуация: её расписание не меняет историю.
- [x] Чтение — 60–140 слов, учебные аудио — 25–60; вопросы, ответы и переводы приложены. По 12 целевых выражений в начале каждого юнита.
- [x] Ровно шесть инициатив флирта: 013 — Рэй и Айрис, 014 — Айрис и Мика, 015 — Мика, 016 — Рэй. По два момента у каждой. В каждой сцене три равноправных намерения, флаг только у взаимного флирта.
- [x] Эмоции и позы сверены со списком; для уточнений используется listening. Ошибка не вызывает насмешку.
- [x] В 013 сохранены дрель, звонок Мики, скрип тетради и шутка про вдохи. Удачный фон и чих перенесены в 016 по новому брифу.
- [x] Два неудачных выезда, один разовый перенос, один удачный выезд. Пятница шестой недели и пятница седьмой недели — разные встречи.
- [x] Окончание работ: среда седьмой недели, 17:00. Оба варианта следующей записи позже этого срока. Занятия героинь не пропускаются.
- [x] В обеих временных ветках один итог; следующий регулярный час — среда восьмой недели, 13:00.
- [x] Две чашки, £2, исправное оборудование, локальный гид и прежние страницы сохранены. Новых покупок нет.
- [x] Только общий чат. Фото без людей. Фото 00:10 показывает фон, а не длину всего фрагмента с речью.
- [x] Все 12 сцен выбора имеют 2–3 намерения и по две английские формулировки на каждое. Альтернативы одного смысла принимаются без новой сюжетной ветки.

При вычитке уточнены: значение «первого фрагмента», разделение фонового и речевого клипов, единый выбор времени, ранний показ фото доски только после выбора, обновление фразы о дворе после окончания ремонта. Схема времени, количество занятий, длины материалов и допустимость эмоций дополнительно проверены скриптом. Это проверка документа; импорт в приложение и озвучка ещё не выполнены.
