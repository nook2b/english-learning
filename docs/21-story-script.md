# English Club — весь написанный сюжет

Собрано скриптом `scripts/export_story.py` из `content/`: все реплики, сцены, тексты и аудио юнитов, страницы героинь и реплики «После уроков». Документ для чтения и правок: правки переносятся в контент, после чего документ собирается заново. В скобках — id задания в файлах юнитов, курсивом — эмоция спрайта и теги голоса.

Общий замысел, герои и сезоны — в [сюжетной библии](06-story-bible.md); хронология, правила сцен и контракт сохранений — в [23-story-rules.md](23-story-rules.md).

## Содержание

- [Пролог. Не тот кабинет](#пролог-не-тот-кабинет)
- [Юнит 001. Представиться](#юнит-001-представиться)
- [Юнит 002. Уточнить вопрос](#юнит-002-уточнить-вопрос)
- [Юнит 003. Прочитать расписание](#юнит-003-прочитать-расписание)
- [Юнит 004. Объяснить свой день](#юнит-004-объяснить-свой-день)
- [Юнит 005. Найти комнату](#юнит-005-найти-комнату)
- [Юнит 006. Описать проблему](#юнит-006-описать-проблему)
- [Юнит 007. Договориться о помощи](#юнит-007-договориться-о-помощи)
- [Юнит 008. Рассказать о предпочтениях](#юнит-008-рассказать-о-предпочтениях)
- [Страницы героинь](#страницы-героинь)
- [После уроков](#после-уроков)

---

## Пролог. Не тот кабинет

**Цель:** безопасно попробовать переспрос и представление (вводная с подсказками); понедельник, около 9:40, до проверки в 10:00

**Итог пролога:** игрока позвали вернуться в комнату 17 после проверки; дальше — кабинет 70 и переход «Вернуться в комнату 17»


_В сообщении международного отдела прозвучало «Room seventy, New Building». Ты расслышал «seventeen» и вошёл в старый корпус. На двери — 17. Здесь стоят микрофоны, на столе лежит спутанный кабель._

- **Рэй:** The cable. Careful. — Кабель. Осторожно. _(recorder/neutral)_
- **Мика:** Are you here for the guide? Great! We need someone who is new here. — Ты к нам насчёт гида? Отлично! Нам как раз нужен кто-то новенький. _(excited)_
- **Айрис:** One question first. Which room do you need? — Сначала один вопрос. Какой кабинет тебе нужен? _(neutral)_

**Сцена [pro-e1]**

_Ты показываешь сообщение международного отдела на телефоне. Айрис прослушивает номер._

- **Айрис:** Seventy. Your check is in Room 70, in the New Building. This is Room 17. — Семьдесят. Твоя проверка в кабинете 70 нового корпуса. Здесь комната 17. _(neutral)_
- **Рэй:** Through the courtyard. Then the glass doors. — Через двор. Потом стеклянные двери. _(neutral)_

Выбор намерения:
- _Попросить повторить маршрут_ → «Could you say that again, please?» · флаг `prologue_asked_again`
  - **Айрис:** Of course. Cross the courtyard. Go through the glass doors. Room 70 is on the ground floor. — Конечно. Перейди двор. Пройди через стеклянные двери. Кабинет 70 на первом этаже. _(neutral)_

Если ответ непонятен:
- **Айрис:** Take your time. You can use the words on the screen. — Не торопись. Можешь использовать слова на экране. _(listening)_

**Сцена [pro-e2]**

_Айрис пишет маршрут на свободной стороне старого листа. На обороте — схема радиокомнаты и пометка «Before You Go». Ты замечаешь её, но расспрашивать некогда. Айрис отдаёт лист тебе._

- **Мика:** I'm Mika. This is Rei, and this is Iris. What's your name? — Я Мика. Это Рэй, а это Айрис. Как тебя зовут? _(happy)_

Выбор намерения:
- _Представиться_ → «Nice to meet you. I'm {player_name}.» · флаг `prologue_introduced`
  - **Мика:** Nice to meet you! You have time. The New Building is five minutes away. — Рада познакомиться! Ты успеваешь. До нового корпуса пять минут. _(happy)_

Если ответ непонятен:
- **Айрис:** Take your time. You can use the words on the screen. — Не торопись. Можешь использовать слова на экране. _(listening)_

_Итог занятия:_

- **Мика:** We're making an audio guide for new students. Come back after your check if you have time. — Мы делаем аудиогид для новых студентов. Возвращайся после проверки, если будет время. _(happy)_
- **Айрис:** You can tell us which parts aren't clear. That's useful. — Можешь сказать, что в нём непонятно. Это полезно. _(neutral)_
- **Рэй:** And the door will still say seventeen. — А на двери всё ещё будет семнадцать. _(smirk)_

---

## Юнит 001. Представиться

**Цель:** Представиться, сказать, откуда ты и чем занят сейчас, и не притворяться, что всё понял.

**Итог юнита:** Твоя строчка сохранена в рабочей сборке аудиогида. На стене комнаты 17 появился листок «New voices» — и на нём твоё имя. Это первый небольшой вклад, а не автоматическое вступление в постоянную редакцию.

### Занятие 1. Памятка первой недели (понимание)

_Понедельник, после проверки. Ты возвращаешься в комнату 17. Листок Айрис всё ещё у тебя; на телефоне открыта новая памятка международного отдела. Результат проверки остаётся личным — его не нужно показывать команде._

- **Мика:** You're back! How was the check? — Ты вернулся! Как прошла проверка? _(happy)_
- **Айрис:** You can tell us later. First, check the welcome note on your phone. The important parts are short. — Расскажешь потом. Сначала посмотри памятку на телефоне. Важное там короткое. _(dry_smile)_

**Чтение [u001-s1-e1]: «Welcome to Bellwether Academy»** (письмо)

> Dear exchange student,
>
> Welcome to Bellwether Academy! Your placement check is complete. Classes start on Tuesday. Your timetable is in the student app. Please bring your student card to class.
>
> Most exchange students live in the East Dorm. The dining hall opens at 7:30 every morning. The library has quiet places to study.
>
> The International Office is open every day except Sunday. If you have a question, just ask us!
>
> Best wishes,
>
> International Office

_Перевод:_ Дорогой студент по обмену! Добро пожаловать в академию Bellwether! Твоя вступительная проверка завершена. Занятия начинаются во вторник. Расписание находится в студенческом приложении. Пожалуйста, возьми студенческий билет на занятия. Большинство студентов по обмену живут в Восточном общежитии. Столовая открывается в 7:30 каждое утро. В библиотеке есть тихие места для учёбы. Международный отдел работает каждый день, кроме воскресенья. Если есть вопрос — просто спроси нас! С наилучшими пожеланиями, Международный отдел

_Итог занятия:_

- **Айрис:** Classes start on Tuesday. Your timetable is in the app. That's what you need next. — Занятия начинаются во вторник. Расписание в приложении. Вот что тебе понадобится дальше. _(neutral)_
- **Мика:** Can you listen to our guide and record one short line? Just a draft for us. — Послушаешь наш гид и запишешь одну короткую фразу? Пока только черновик для нас. _(happy)_

### Занятие 2. Голоса комнаты 17 (понимание)

_Комната 17. На столе рекордер и три телефона. Ты согласился помочь. Мика объясняет: сейчас прозвучат пробные представления команды будущим слушателям, а не новое знакомство._

- **Мика:** These are our intros for new students. Listen and tell me if we're clear! — Это наши представления для новых студентов. Послушай и скажи, понятно ли мы говорим! _(excited)_
- **Рэй:** Headphones are on the table. Don't drop them. — Наушники на столе. Не урони. _(recorder/neutral, [deadpan])_

**Аудирование [u001-s2-e1]**

- **Мика:** Hi, new students! I'm Mika. I'm in the prep program, like you. I usually spend my mornings in Room 17. We make radio shows there. Right now we're working on an audio guide for new students, so I'm asking everyone the same question: what's your first day like? — Привет, новички! Я Мика. Я в подготовительной программе, как и ты. Обычно я провожу утро в комнате 17 — мы делаем там радиопередачи. Сейчас мы работаем над аудиогидом для новичков, поэтому я задаю всем один вопрос: каким получается твой первый день? _([slightly out of breath, cheerful])_

**Аудирование [u001-s2-e2]**

- **Рэй:** I'm Rei. I record sound for the guide. I don't talk much when the microphone is on. And please, don't touch the cables. — Я Рэй. Я записываю звук для гида. Когда микрофон включён, я мало говорю. И пожалуйста, не трогай кабели. _([flat, quiet])_

**Аудирование [u001-s2-e3]**

- **Айрис:** Hello. I'm Iris. I write and check the texts for the guide. If something isn't clear, just ask me. I'm usually in the library after four. — Привет. Я Айрис. Я пишу и проверяю тексты для гида. Если что-то непонятно, просто спроси меня. После четырёх я обычно в библиотеке. _([calm, clear])_

**Диктант [u001-s2-e4]** · Расшифровка записи для гида

- **Мика:** I'm in the prep program, like you.

**Диктант [u001-s2-e5]** · Расшифровка записи для гида

- **Рэй:** Please don't touch the cables. _([deadpan])_

_Итог занятия:_

- **Рэй:** You understood all three of us. That's more than the mic does. — Ты понял нас всех троих. Это больше, чем удаётся микрофону. _(recorder/smirk)_

### Занятие 3. Обычно или сейчас (форма)

_Айрис раскладывает по столу карточки с заметками для гида._

- **Айрис:** These are notes for the guide. Some are about every day, some are about right now. Help me sort them? — Это заметки для гида. Одни — про каждый день, другие — про прямо сейчас. Поможешь разобрать? _(notebook/focused)_

_Итог занятия:_

- **Айрис:** Good. Now the guide knows the difference too. — Хорошо. Теперь и гид знает разницу. _(notebook/dry_smile)_

### Занятие 4. Как задать вопрос (форма)

_Мика готовит вопросы для интервью с новичками._

- **Мика:** I have questions for the newcomers, but some of them look… strange. Can you check them? — У меня есть вопросы для новичков, но некоторые выглядят… странно. Проверишь? _(phone/thinking, [hesitant])_

_Итог занятия:_

- **Мика:** Fixed! Now nobody will laugh at my questions. Probably. — Исправлено! Теперь никто не будет смеяться над моими вопросами. Наверное. _(phone/happy)_

### Занятие 5. Скажи о себе (продукция)

_Рэй проверяет микрофон перед записью._

- **Рэй:** Before we record you, practise your lines. Short and clear. — Прежде чем записывать, отрепетируй свои фразы. Коротко и понятно. _(recorder/neutral)_

_Итог занятия:_

- **Рэй:** Okay. That I can record. — Ладно. Такое я могу записать. _(recorder/happy)_

### Занятие 6. Голосом (продукция)

_Рэй включает запись._

- **Рэй:** Your turn. Say it to the mic, not to me. — Твоя очередь. Говори в микрофон, а не мне. _(recorder/listening)_

_Итог занятия:_

- **Рэй:** The mic likes you. Don't let it go to your head. — Ты нравишься микрофону. Только не зазнавайся. _(smirk)_

### Занятие 7. Быстрый круг (беглость)

_Перерыв. Мика достаёт из сумки печенье._

- **Мика:** Quick round before the real recording! No pressure. Well, a little pressure. — Быстрый круг перед настоящей записью! Без давления. Ну, чуть-чуть давления. _(happy, [playfully])_

**Диктант [u001-s7-e6]** · Расшифровка записи для гида

- **Мика:** What's your first day like?

_Итог занятия:_

- **Мика:** You're ready. I'm a little scared for us. — Ты готов. Мне даже немного страшно за нас. _(laugh)_

### Занятие 8. Миссия: строчка для гида (беглость · миссия)

**Сцена [u001-s8-e1]**

_Комната 17. Красная лампочка над дверью горит. Рэй пишет пробный фрагмент для внутренней сборки. Ты уже согласился записать короткое представление._

- **Мика:** Okay, the mic is on. Can you introduce yourself for the guide? Just a few words. — Так, микрофон включён. Можешь представиться для гида? Пару слов. _(excited, [excited, keeping her voice down])_
- **Рэй:** Speak normally. The mic hears everything. — Говори как обычно. Микрофон всё слышит. _(recorder/focused, [whispers])_

Выбор намерения:
- _Сказать, что ты новенький и ищешь тихое место для учёбы_ → «I'm new here, and I'm looking for a quiet place to study.» · флаг `u001_intro_quiet_place`
  - **Мика:** Let's keep that. Other new students need a quiet place too. — Оставим. Другим новичкам тоже нужно тихое место. _(happy)_
- _Сказать, что ты здесь по обмену и пока не всё понимаешь_ → «I'm here on an exchange program, and I don't understand everything yet.» · флаг `u001_intro_exchange_honest`
  - **Айрис:** Honest. I like that. Let's keep it. — Честно. Мне нравится. Оставим. _(dry_smile)_

Если ответ непонятен:
- **Мика:** Sorry, one more time? Slowly is fine. — Прости, ещё раз? Можно медленно. _(listening, [gently, keeping her voice down])_

**Сцена [u001-s8-e2]**

_Рэй оставляет запись включённой для следующего короткого фрагмента. Мика поворачивается к тебе._

- **Мика:** And now one question for us. Ask us anything! — А теперь один вопрос нам. Спрашивай что угодно! _(excited)_

Выбор намерения:
- _Спросить Рэй, что она сейчас делает_ → «What are you doing?» · флаг `u001_asked_rei`
  - **Рэй:** Checking the levels. You sound fine, by the way. — Проверяю уровни. Кстати, звучишь нормально. _(recorder/focused)_
- _Спросить Айрис, где она обычно бывает после четырёх_ → «Where are you usually after four?» · флаг `u001_asked_iris`
  - **Айрис:** In the library. Second floor, by the window. — В библиотеке. Второй этаж, у окна. _(dry_smile)_
- _Спросить Мику, что она изучает_ → «What do you study?» · флаг `u001_asked_mika`
  - **Мика:** Event production! Well, I want to study it. Right now I study everything. — Продюсирование событий! Ну, хочу изучать. Пока изучаю всё подряд. _(laugh)_

Если ответ непонятен:
- **Мика:** Sorry? Can you say it again? — Что-что? Можешь повторить? _(listening)_

_Итог занятия:_

- **Мика:** That's it! You're officially in the guide. — Всё! Ты официально в гиде. _(happy)_
- **Айрис:** I'll put your name on the wall. Spelled correctly. — Я напишу твоё имя на стене. Без ошибок. _(dry_smile)_

---

## Юнит 002. Уточнить вопрос

**Цель:** Переспросить, попросить говорить медленнее, уточнить значение слова и задать простой вопрос.

**Итог юнита:** В аудиогиде появилась страница «Как переспросить» — по твоей идее. А Рэй впервые дала тебе подержать рекордер.

### Занятие 1. Вопросы для новичков (понимание)

_Комната 17. Айрис кладёт перед тобой распечатку._

- **Айрис:** These are the questions for today's interviews. Can you read them first? — Это вопросы для сегодняшних интервью. Можешь сначала их прочитать? _(notebook/focused)_
- **Айрис:** If a question isn't clear to you, it won't be clear to them. — Если вопрос непонятен тебе, он будет непонятен и им. _(dry_smile)_

**Чтение [u002-s1-e1]: «Interview questions for new students»** (тетрадный лист)

> 1. Where are you from?
>
> 2. What do you study here?
>
> 3. How do you usually get to the academy?
>
> 4. What is the most difficult thing about your first week?
>
> 5. Who do you ask when you don't understand something?
>
> 6. What does "home" mean to you in a new city?
>
> Note for the team: speak slowly, and always check that the student understands the question.

_Перевод:_ 1. Откуда ты? 2. Что ты здесь изучаешь? 3. Как ты обычно добираешься до академии? 4. Что самое трудное в твоей первой неделе? 5. К кому ты обращаешься, когда что-то не понимаешь? 6. Что для тебя значит «дом» в новом городе? Заметка для команды: говорите медленно и всегда проверяйте, понял ли студент вопрос.

_Итог занятия:_

- **Айрис:** Good. Two of these questions are too long. I'll fix them. — Хорошо. Два вопроса слишком длинные. Я их исправлю. _(notebook/skeptical)_

### Занятие 2. Слишком быстро (понимание)

_Вторник, после первых занятий. Двор академии. После вчерашней пробной записи команда проверяет вопросы на настоящих новичках. Мика уже держит микрофон._

- **Мика:** Okay, quick test before the real interviews! I'll ask you, you tell me if it's too fast. — Так, быстрая проверка перед настоящими интервью! Я спрашиваю — ты говоришь, если слишком быстро. _(excited)_

**Аудирование [u002-s2-e1]**

- **Мика:** Hi, welcome to the academy! So, where are you from, what do you study, and how do you like the campus so far? Oh, and do you live in the East Dorm or somewhere in town? — Привет, добро пожаловать в академию! Итак, откуда ты, что изучаешь и как тебе пока кампус? Ой, и ты живёшь в Восточном общежитии или где-то в городе? _([fast, excited, talking quickly])_

**Аудирование [u002-s2-e2]**

- **Рэй:** Before you speak, check the levels. If the green light jumps to red, you're too loud. Then turn the gain down. Gain means how much the microphone hears. — Перед тем как говорить, проверь уровни. Если зелёный индикатор прыгает в красный — ты слишком громко. Тогда убавь gain. Gain — это то, сколько слышит микрофон. _([flat, matter-of-fact])_

**Диктант [u002-s2-e3]**

- **Мика:** Could you speak more slowly?

**Диктант [u002-s2-e4]**

- **Рэй:** Gain means how much the microphone hears. _([deadpan])_

_Итог занятия:_

- **Рэй:** You asked her to slow down. Nobody ever does that. Respect. — Ты попросил её говорить медленнее. Никто так не делает. Уважаю. _(smirk)_

### Занятие 3. Вопросы с do и does (форма)

_Мика переписывает свои вопросы на карточки._

- **Мика:** I want my questions to sound right. Help me with do and does? — Хочу, чтобы мои вопросы звучали правильно. Поможешь с do и does? _(phone/thinking)_

_Итог занятия:_

- **Мика:** Perfect! Now I sound like I know what I'm doing. — Идеально! Теперь звучу так, будто знаю, что делаю. _(phone/happy)_

### Занятие 4. Как переспросить (форма)

_Рэй показывает тебе рекордер. Слов много, и все технические._

- **Рэй:** Gain, levels, input, clipping. Questions? — Gain, уровни, вход, клиппинг. Вопросы? _(recorder/neutral)_
- **Рэй:** You can ask. I don't bite. Usually. — Можешь спрашивать. Я не кусаюсь. Обычно. _(smirk)_

_Итог занятия:_

- **Рэй:** Good questions. Most people just nod. — Хорошие вопросы. Большинство просто кивает. _(recorder/happy)_

### Занятие 5. Свои вопросы (продукция)

_Мика репетирует интервью и просит тебя быть интервьюером._

- **Мика:** You ask, I answer. And you can stop me if I'm too fast. — Ты спрашиваешь, я отвечаю. И можешь остановить меня, если я слишком быстро. _(happy)_

_Итог занятия:_

- **Мика:** You're a good interviewer. Maybe better than me. Don't tell anyone. — Ты хороший интервьюер. Может, лучше меня. Никому не говори. _(embarrassed)_

### Занятие 6. Голосом (продукция)

_Рэй протягивает тебе микрофон._

- **Рэй:** Ask your questions to the mic. Clear and slow. — Задай свои вопросы микрофону. Чётко и медленно. _(recorder/listening)_

_Итог занятия:_

- **Рэй:** Clean recording. No clipping. — Чистая запись. Без клиппинга. _(recorder/smirk)_

### Занятие 7. Быстрый круг (беглость)

_Перерыв во дворе. Айрис проверяет, что ты запомнил._

- **Айрис:** Five minutes, then the real interviews. Quick check? — Пять минут — и настоящие интервью. Быстрая проверка? _(dry_smile)_

**Диктант [u002-s7-e6]**

- **Айрис:** How do you spell your name?

_Итог занятия:_

- **Айрис:** You're ready. More ready than Mika, honestly. — Ты готов. Честно говоря, готовее Мики. _(dry_smile)_

### Занятие 8. Миссия: настоящее интервью (беглость · миссия)

**Сцена [u002-s8-e1]**

_Двор. Рэй держит рекордер, Мика — список вопросов._

- **Рэй:** Before we start. Is your gain at eight or at ten? — Перед началом. У тебя gain на восьми или на десяти? _(recorder/neutral)_
- **Рэй:** Need the word or the button? You can ask. — Объяснить слово или показать кнопку? Можешь спросить. _(recorder/smirk)_

Выбор намерения:
- _Честно спросить, что значит gain_ → «What does "gain" mean?» · флаг `u002_asked_gain`
  - **Рэй:** How much the mic hears. Here, hold it. You're on eight. — Сколько слышит микрофон. Держи. У тебя восемь. _(recorder/happy)_
- _Уточнить, про какую кнопку она говорит_ → «Do you mean this button?» · флаг `u002_asked_button`
  - **Рэй:** That one. Turn it slowly. Good. You can hold it today. — Эту. Крути медленно. Хорошо. Сегодня можешь подержать его ты. _(recorder/happy)_

Если ответ непонятен:
- **Рэй:** Say it again? The wind is loud. — Повтори? Ветер громкий. _(recorder/listening)_

**Сцена [u002-s8-e2]**

_К вам подходит новичок с картой. Он согласился на короткое пробное интервью для внутреннего черновика. Мика начинает — очень быстро._

- **Мика:** Hi! Welcome! Where-are-you-from-what-do-you-study-and-do-you-like-it-here? — Привет! Добро пожаловать! Откуда-ты-что-изучаешь-и-тебе-здесь-нравится? _(excited, [very fast, excited, all in one breath])_
- **Новичок:** Sorry… what? — Извините… что?

Выбор намерения:
- _Попросить Мику говорить медленнее_ → «Could you speak more slowly?» · флаг `u002_slowed_mika`
  - **Мика:** Oops. Sorry! Okay. Where… are… you… from? — Ой. Прости! Так. Откуда… ты? _(embarrassed)_
- _Помочь новичку: задать один простой вопрос_ → «Where are you from?» · флаг `u002_helped_newcomer`
  - **Мика:** Yes! One question at a time. Why didn't I think of that? — Да! По одному вопросу. Почему я сама не догадалась? _(laugh)_

Если ответ непонятен:
- **Мика:** Sorry? One more time? — Что? Ещё раз? _(listening)_

_Итог занятия:_

- **Мика:** First real interview! And nobody ran away. — Первое настоящее интервью! И никто не сбежал. _(happy)_
- **Айрис:** I'm adding a page to the guide: "How to ask again". Your idea. — Добавляю в гид страницу «Как переспросить». Твоя идея. _(dry_smile)_

---

## Юнит 003. Прочитать расписание

**Цель:** Прочитать расписание, спросить и сказать, когда что начинается, и договориться о времени.

**Итог юнита:** У команды есть общий час: среда, час дня, двор. На доске в комнате 17 появилась первая общая таблица.

### Занятие 1. Твоё расписание (понимание)

_Вторник, ближе к вечеру. Короткое интервью состоялось, но общую встречу команда пока не назначала. Мика рисует на доске четыре колонки: нужен постоянный час со следующей недели._

- **Мика:** We need a regular hour from next week. When are all four of us free? Let's check your timetable! — Со следующей недели нам нужен постоянный час. Когда свободны все четверо? Посмотрим твоё расписание! _(excited)_

**Чтение [u003-s1-e1]: «Your timetable — First full week»** (текст)

> Monday: English 9:00–12:00, Room 70
>
> Tuesday: City Studies 10:00–11:30, Room 12; Media Lab 14:00–16:00
>
> Wednesday: English 9:00–11:00; free afternoon
>
> Thursday: Writing Workshop 13:00–15:00, Library
>
> Friday: English 9:00–12:00; Club Fair 16:00 in the Main Hall
>
> The bus to the city leaves every 20 minutes from Gate B. The last bus leaves at 23:10.

_Перевод:_ Понедельник: английский 9:00–12:00, кабинет 70. Вторник: городоведение 10:00–11:30, кабинет 12; медиалаборатория 14:00–16:00. Среда: английский 9:00–11:00; свободная вторая половина дня. Четверг: письменный практикум 13:00–15:00, библиотека. Пятница: английский 9:00–12:00; ярмарка клубов в 16:00 в главном зале. Автобус в город отходит каждые 20 минут от ворот B. Последний автобус — в 23:10.

_Итог занятия:_

- **Мика:** So you're free on Wednesday afternoon. Noted! — Значит, в среду днём ты свободен. Записала! _(phone/happy)_

### Занятие 2. Голосовые сообщения (понимание)

_Вечер. На телефоне три голосовых сообщения._

- **Мика:** I asked everyone to send their timetable by voice message. Listen and find our free hour! — Я попросила всех прислать расписание голосовыми. Послушай и найди наш свободный час! _(phone/happy)_

**Аудирование [u003-s2-e1]**

- **Мика:** Hi! My timetable is crazy. Club meetings on Monday and Thursday evenings, the student office on Tuesday morning, and on Wednesday I'm free after twelve. Friday is the Club Fair, so don't even ask! — Привет! У меня безумное расписание. Встречи клубов в понедельник и четверг вечером, студенческий офис во вторник утром, а в среду я свободна после двенадцати. В пятницу ярмарка клубов, так что даже не спрашивай! _([cheerful, a little rushed])_

**Аудирование [u003-s2-e2]**

- **Рэй:** Rei here. I'm in the sound lab every day from two to five. Except Wednesday. On Wednesday the lab closes at one, so I'm free from one to three. — Это Рэй. Я в звуковой лаборатории каждый день с двух до пяти. Кроме среды. В среду лаборатория закрывается в час, так что я свободна с часу до трёх. _([flat, quiet])_

**Аудирование [u003-s2-e3]**

- **Айрис:** Hello, it's Iris. I work in the library on Monday, Wednesday and Friday, from three to seven. On Tuesday and Thursday I have seminars in the morning. So Wednesday before three is fine for me. — Привет, это Айрис. Я работаю в библиотеке в понедельник, среду и пятницу с трёх до семи. Во вторник и четверг у меня утром семинары. Так что среда до трёх мне подходит. _([calm, clear])_

**Диктант [u003-s2-e4]**

- **Рэй:** On Wednesday the lab closes at one. _([deadpan])_

_Итог занятия:_

- **Айрис:** Wednesday from one to three works for everyone. Let's check the courtyard. — Среда с часу до трёх подходит всем. Проверим, свободен ли двор. _(notebook/focused)_

### Занятие 3. At, on, in (форма)

_Айрис составляет общую таблицу для доски._

- **Айрис:** Before I write it on the board: at, on or in? Let's not make mistakes in public. — Прежде чем писать на доске: at, on или in? Давай не ошибаться у всех на виду. _(notebook/skeptical)_

_Итог занятия:_

- **Айрис:** No mistakes. The board looks almost professional. — Ни одной ошибки. Доска выглядит почти профессионально. _(notebook/dry_smile)_

### Занятие 4. Когда начинается? (форма)

_Мика звонит в студенческий офис узнать, свободен ли двор._

- **Мика:** I need to ask the office about the courtyard. Can you help me with the questions? — Мне нужно спросить в офисе про двор. Поможешь с вопросами? _(phone/thinking)_

_Итог занятия:_

- **Мика:** The courtyard is free on Wednesday from one to two. We have a slot! — Двор свободен в среду с часу до двух. У нас есть окно! _(excited)_

### Занятие 5. Договориться о времени (продукция)

_Общий чат команды. Пора предложить время._

- **Айрис:** Someone has to write the message. Mika's messages have twelve exclamation marks. — Кто-то должен написать сообщение. У Мики в сообщениях по двенадцать восклицательных знаков. _(dry_smile)_
- **Мика:** Only eleven! — Всего одиннадцать! _(pout)_

_Итог занятия:_

- **Мика:** Clear and short. And only one exclamation mark. I'm learning! — Коротко и ясно. И всего один восклицательный знак. Я учусь! _(happy)_

### Занятие 6. Голосом (продукция)

_Мика записывает голосовое сообщение для команды и просит тебя._

- **Мика:** You record the message this time. I always talk too long. — В этот раз сообщение запишешь ты. Я всегда говорю слишком долго. _(phone/embarrassed)_

_Итог занятия:_

- **Мика:** Eight seconds! My record is two minutes. — Восемь секунд! Мой рекорд — две минуты. _(laugh)_

### Занятие 7. Быстрый круг (беглость)

_Рэй проверяет, не перепутал ли ты время._

- **Рэй:** If you come at the wrong time, I record the silence without you. Quick check. — Если придёшь не вовремя, я запишу тишину без тебя. Быстрая проверка. _(deadpan)_

**Диктант [u003-s7-e5]**

- **Мика:** I'm free after twelve on Wednesday.

_Итог занятия:_

- **Рэй:** Wednesday. One. Courtyard. Don't be late. — Среда. Час. Двор. Не опаздывай. _(smirk)_

### Занятие 8. Миссия: общий час (беглость · миссия)

**Сцена [u003-s8-e1]**

_Комната 17. На доске четыре колонки расписаний._

- **Мика:** Monday evening! Everyone loves Monday evening. — Понедельник вечером! Все любят понедельник вечером. _(excited)_
- **Айрис:** I work until seven on Monday. — Я работаю до семи в понедельник. _(annoyed)_
- **Рэй:** I can come after five, but Iris can't come before seven. Let's try another day. — Я могу после пяти, но Айрис не может до семи. Попробуем другой день. _(deadpan)_

Выбор намерения:
- _Предложить среду в час_ → «How about Wednesday at one?» · флаг `u003_proposed_wednesday`
  - **Айрис:** Wednesday at one. That works for everyone. I checked twice. — Среда, час. Подходит всем. Я проверила дважды. _(dry_smile)_
- _Спросить, кто свободен в среду днём_ → «Who is free on Wednesday afternoon?» · флаг `u003_asked_who_free`
  - **Рэй:** Me. From one. Iris until three. Mika after twelve. So… one o'clock. — Я. С часу. Айрис до трёх. Мика после двенадцати. Значит… в час. _(focused)_

Если ответ непонятен:
- **Мика:** Sorry, which day? — Прости, какой день? _(listening)_

**Сцена [u003-s8-e2]**

_Мика уже пишет в общий чат._

- **Мика:** Okay, I'm writing it in the chat. Wednesday… at… what time again? — Так, пишу в чат. Среда… в… во сколько, ещё раз? _(phone/focused)_

Выбор намерения:
- _Подтвердить время и место_ → «Wednesday at one, in the courtyard.» · флаг `u003_confirmed_slot`
  - **Мика:** Sent! Our first real plan. I'm a little emotional. — Отправила! Наш первый настоящий план. Я немного растрогана. _(happy)_

Если ответ непонятен:
- **Мика:** Sorry? Day and time, please. — Что? День и время, пожалуйста. _(phone/thinking)_

_Итог занятия:_

- **Рэй:** Wednesday, one o'clock. I'll bring the recorder. — Среда, час. Я возьму рекордер. _(recorder/neutral)_
- **Мика:** And I'll bring snacks. Recording is hungry work. — А я возьму перекус. Запись — дело голодное. _(laugh)_

---

## Юнит 004. Объяснить свой день

**Цель:** Рассказать про свой обычный день по порядку и сказать, чем сегодня отличается от обычного.

**Итог юнита:** Первая целая страница гида записана: «A day of a new student». Модуль 001–004 закрыт, и Мика уже зовёт всех на общий обед.

### Занятие 1. Обычный день новичка (понимание)

_Следующая неделя, до назначенной встречи в среду. Библиотека, второй этаж, у окна. После первых учебных дней ты уже можешь сравнить черновик с собственным опытом. Айрис протягивает тебе лист._

- **Айрис:** I wrote a page about a typical day here. Is it true for you? — Я написала страницу про обычный день здесь. Это правда про тебя? _(notebook/focused)_

**Чтение [u004-s1-e1]: «A typical day at Bellwether»** (текст)

> Most new students get up at about seven. They usually have breakfast in the dining hall, and then they take the bus to the New Building. Classes start at nine. At one o'clock everyone has lunch, and in the afternoon students often go to the library or to a club. In the evening they sometimes go to the city, but they never miss the last bus.

_Перевод:_ Большинство новичков встают около семи. Обычно они завтракают в столовой, а потом едут на автобусе в новый корпус. Занятия начинаются в девять. В час все обедают, а днём студенты часто ходят в библиотеку или в клуб. Вечером они иногда ездят в город, но никогда не пропускают последний автобус.

_Итог занятия:_

- **Айрис:** That's a draft, not everyone's routine. We'll use your real day for the recording. — Это черновик, а не общий распорядок. Для записи возьмём твой настоящий день. _(notebook/skeptical)_

### Занятие 2. Их дни (понимание)

_Комната 17. Рэй включает запись: «Расскажите про свой день»._

- **Рэй:** For the guide. Everyone describes their day. Mika, short version, please. — Для гида. Каждый описывает свой день. Мика, короткую версию, пожалуйста. _(recorder/neutral)_
- **Мика:** I don't have a short version. — У меня нет короткой версии. _(pout)_

**Аудирование [u004-s2-e1]**

- **Мика:** Okay! I get up at six, I always check my messages first, then I run to the student office. I usually have lunch with the club people, and after that I go to Room 17. I never go to bed before midnight. I know, I know. — Так! Я встаю в шесть, всегда сначала проверяю сообщения, потом бегу в студенческий офис. Обычно обедаю с ребятами из клуба, а после этого иду в комнату 17. Я никогда не ложусь спать до полуночи. Знаю, знаю. _([cheerful, fast, a little out of breath])_

**Аудирование [u004-s2-e2]**

- **Рэй:** I get up late. I go to the sound lab. I listen to things. I go home. Sometimes I record the night bus. — Я встаю поздно. Иду в звуковую лабораторию. Слушаю всякое. Иду домой. Иногда записываю ночной автобус. _([flat, quiet])_

**Диктант [u004-s2-e3]**

- **Мика:** I always check my messages first.

**Диктант [u004-s2-e4]**

- **Рэй:** Sometimes I record the night bus. _([deadpan])_

_Итог занятия:_

- **Рэй:** Mika's day took four minutes. Mine took ten seconds. Balance. — День Мики занял четыре минуты. Мой — десять секунд. Баланс. _(smirk)_

### Занятие 3. Как часто (форма)

_Айрис правит черновик «Обычный день» и показывает тебе карточки._

- **Айрис:** Where does "usually" go? People put it everywhere. — Куда ставится «usually»? Люди ставят его куда попало. _(notebook/skeptical)_

_Итог занятия:_

- **Айрис:** Every adverb in its place. This is my favourite kind of order. — Каждое наречие на своём месте. Мой любимый вид порядка. _(notebook/dry_smile)_

### Занятие 4. Обычно — и сегодня (форма)

_Мика читает твой черновик рассказа о дне._

- **Мика:** Your day is a list. Let's make it a story! First, then, after that… — Твой день — это список. Давай сделаем из него историю! Сначала, потом, после этого… _(phone/thinking)_

_Итог занятия:_

- **Мика:** Now it's a story. A short one. But a story! — Теперь это история. Короткая. Но история! _(phone/happy)_

### Занятие 5. Мой день (продукция)

_Айрис открывает пустую страницу «A day of a new student»._

- **Айрис:** This page is yours. Your day, your words. I'll only check the grammar. — Эта страница — твоя. Твой день, твои слова. Я проверю только грамматику. _(dry_smile)_

_Итог занятия:_

- **Айрис:** Your words stay. I only marked the grammar. That's a compliment, by the way. — Твои слова остаются. Я только отметила грамматику. Это комплимент, между прочим. _(dry_smile)_

### Занятие 6. Голосом (продукция)

_Рэй готовит запись для страницы «A day of a new student»._

- **Рэй:** Read your day to the mic. Normal speed. I can fix noise, not panic. — Прочитай свой день в микрофон. Обычная скорость. Шум я исправлю, панику — нет. _(recorder/listening)_

_Итог занятия:_

- **Рэй:** No panic detected. Good take. — Паники не обнаружено. Хороший дубль. _(recorder/happy)_

### Занятие 7. Проверка модуля 001–004 (беглость · проверка модуля)

_Комната 17. Айрис кладёт на стол чистый лист и чашку чая._

- **Айрис:** Small check before the recording. New texts, same English. You know all of it. — Небольшая проверка перед записью. Тексты новые, английский тот же. Ты всё это знаешь. _(notebook/focused)_

**Чтение [u004-s7-e1]: «Notice: Library hours»** (объявление)

> The library is open from Monday to Friday, from 8:00 to 22:00. On Saturday it opens at 10:00 and closes at 18:00. It is closed on Sunday. Students usually need a student card to borrow books. Right now, the second floor is closed for repairs.

_Перевод:_ Библиотека открыта с понедельника по пятницу с 8:00 до 22:00. В субботу открывается в 10:00 и закрывается в 18:00. В воскресенье закрыта. Чтобы брать книги, студентам обычно нужен студенческий билет. Сейчас второй этаж закрыт на ремонт.

**Аудирование [u004-s7-e2]**

- **Айрис:** Hi, it's Iris. I'm not in the library today, I'm working in Room 17. Can we meet there at four? If that's a problem, send me a message. — Привет, это Айрис. Сегодня я не в библиотеке, я работаю в комнате 17. Можем встретиться там в четыре? Если неудобно, напиши мне. _([calm, clear])_

_Итог занятия:_

- **Айрис:** You understood texts you've never seen. That's the whole point. — Ты понял тексты, которых раньше не видел. В этом весь смысл. _(dry_smile)_

### Занятие 8. Миссия: день новичка (беглость · миссия)

**Сцена [u004-s8-e1]**

_Среда, час дня. Во дворе начался дождь, поэтому команда собралась в комнате 17. Все пришли на согласованную встречу; её время сохраняется. Красная лампочка горит. Мика держит лист с вопросами._

- **Мика:** Rain outside. Quiet in here. Tell us about a normal day. What do you usually do in the morning? — Снаружи дождь. Здесь тихо. Расскажи про обычный день. Что ты обычно делаешь утром? _(listening, [warmly, keeping her voice down])_
- **Рэй:** Mic's on. Take your time. — Микрофон включён. Не торопись. _(recorder/listening, [whispers])_

Выбор намерения:
- _Рассказать утро по порядку: встаю, завтракаю, еду на занятия_ → «I get up at seven, then I have breakfast and take the bus.» · флаг `u004_morning_story`
  - **Мика:** Clear and simple. New students will love it. — Понятно и просто. Новичкам понравится. _(happy)_
- _Признаться, что утро обычно хаотичное_ → «I usually get up late and run to class.» · флаг `u004_honest_morning`
  - **Рэй:** Honest. Half of the guide's listeners will feel better. — Честно. Половине слушателей гида станет легче. _(recorder/smirk)_

Если ответ непонятен:
- **Мика:** Sorry, a bit slower? It's for new students. — Прости, чуть медленнее? Это для новичков. _(listening, [gently, keeping her voice down])_

**Сцена [u004-s8-e2]**

_Айрис поднимает лист с последним вопросом._

- **Айрис:** Last question. Is today a normal day for you? — Последний вопрос. Сегодня для тебя обычный день? _(notebook/focused, [quietly])_

Выбор намерения:
- _Сказать, что сегодня необычный день: ты записываешь гид_ → «No. Today I'm recording an audio guide.» · флаг `u004_not_normal_day`
  - **Айрис:** Good answer. Keep it in the final version. — Хороший ответ. Оставим в финальной версии. _(dry_smile)_

Если ответ непонятен:
- **Айрис:** Sorry? Just one sentence. — Что? Всего одно предложение. _(listening)_

_Итог занятия:_

- **Рэй:** First full story page. Saved twice. — Первая целая страница с историей. Сохранено дважды. _(recorder/happy)_
- **Мика:** Module one is done! We should celebrate. With lunch. All four of us. — Первый модуль готов! Надо отметить. Обедом. Вчетвером. _(excited)_
- **Айрис:** She's already planning the order. Run. — Она уже планирует заказ. Беги. _(dry_smile)_

---

## Юнит 005. Найти комнату

**Цель:** Спросить и объяснить, где что находится в здании.

**Итог юнита:** Найден пункт выдачи мебели в старом корпусе. Для комнаты 17 забронированы стул, узкая полка и две мягкие переносные панели; на доске есть проверенный маршрут к пункту выдачи. Ничего ещё не перевезено.

### Занятие 1. На плане есть не всё (понимание)

_Пятница, 12:10. Вы собрались ненадолго перед следующими делами. В комнате 17 коробки занимают один из стульев; Мика предлагает взять недостающую мебель в академии. На стене нового корпуса висит план с двумя похожими обозначениями._

- **Мика:** We need another chair. A person should sit on it, not a box. — Нам нужен ещё один стул. На нём должен сидеть человек, а не коробка. _(phone/focused)_
- **Айрис:** There are two storage rooms on this notice. Read the small print. — В этом объявлении два склада. Прочитай мелкий шрифт. _(notebook/focused)_

**Чтение [u005-s1-e1]: «Equipment and furniture»** (объявление)

> Looking for equipment? There is a technical storage room upstairs in the New Building. It is next to the lift, opposite the language lab. Only staff can collect equipment there.
>
> Student clubs can borrow furniture from the equipment desk in the Old Building. Go through the courtyard and enter the Old Building. Stay on the ground floor. The desk is at the end of the corridor, between the stairs and the noticeboard. There are chairs, small shelves and soft recording panels. Please read the borrowing instructions before taking anything.

_Перевод:_ Ищете оборудование? В новом корпусе наверху есть технический склад. Он рядом с лифтом, напротив языковой лаборатории. Получать там оборудование могут только сотрудники. Студенческие клубы могут брать мебель в пункте выдачи старого корпуса. Перейдите двор и войдите в старый корпус. Оставайтесь на первом этаже. Пункт выдачи находится в конце коридора, между лестницей и доской объявлений. Там есть стулья, небольшие полки и мягкие панели для записи. Прежде чем что-либо брать, прочитайте правила выдачи.

_Итог занятия:_

- **Мика:** Old Building, ground floor. Good thing we read past the word “storage”. — Старый корпус, первый этаж. Хорошо, что прочитали дальше слова «склад». _(phone/happy)_

### Занятие 2. Между лестницей и доской (понимание)

_Айрис пересылает план в общий чат «Room 17». Команда слушает две маршрутные заметки перед выходом; это рабочие голосовые для всех, не личная переписка._

- **Айрис:** Check these directions against the notice. We only need one route today. — Сверь эти указания с объявлением. Сегодня нам нужен только один маршрут. _(notebook/thinking)_

**Аудирование [u005-s2-e1]** · Голосовое Мики в чате «Room 17»

- **Мика:** Start at the glass doors of the New Building. Cross the courtyard and enter the Old Building. There are stairs on your left. Don't go upstairs. The equipment desk is further along the corridor. — Начни у стеклянных дверей нового корпуса. Перейди двор и войди в старый корпус. Слева будет лестница. Не поднимайся. Пункт выдачи дальше по коридору. _([quietly, focused])_

**Аудирование [u005-s2-e2]** · Голосовое Айрис в чате «Room 17»

- **Айрис:** The equipment desk is between the stairs and the noticeboard, at the end of the corridor. There is a borrowing sheet by the door. The furniture has coloured labels on it. — Пункт выдачи между лестницей и доской объявлений, в конце коридора. У двери лежит лист выдачи. На мебели есть цветные наклейки.

**Диктант [u005-s2-e3]**

- **Айрис:** The equipment desk is at the end of the corridor.

**Диктант [u005-s2-e4]**

- **Мика:** There are stairs on your left. _([quietly, focused])_

_Итог занятия:_

- **Рэй:** Right building. Right floor. Progress. — Нужный корпус. Нужный этаж. Уже хорошо. _(deadpan)_

### Занятие 3. Что есть на этаже (форма)

_У входа в старый корпус Айрис показывает схему. Игрок проверяет, какие объекты на ней обозначены._

- **Айрис:** These notes describe the floor. Check each one against the plan. — Эти заметки описывают этаж. Сверь каждую с планом. _(notebook/focused)_

_Итог занятия:_

- **Айрис:** One desk, several shelves. The notes match the plan. — Один пункт выдачи, несколько полок. Заметки совпадают со схемой. _(notebook/focused)_

### Занятие 4. Не просто «там» (форма)

_Мика пишет маршрут для доски комнаты 17. В первой версии три раза встречается «там»._

- **Мика:** “Over there” is doing too much work. Let's give it some help. — На «вон там» слишком много работы. Давай ему поможем. _(phone/thinking)_

_Итог занятия:_

- **Мика:** Now “there” has an address. — Теперь у «там» есть адрес. _(phone/happy)_

### Занятие 5. Уточнить ориентир (продукция)

**Сцена [u005-s5-e1]** · Куда идти от входа

_Рэй несёт только рекордер. У поворота она останавливается: игроку нужно выбрать, какую часть маршрута уточнить. Ни один вариант не означает, что он потерялся заново._

- **Рэй:** Which bit shall we check? — Какую часть проверим? _(listening)_

Выбор намерения:
- _Уточнить этаж пункта выдачи_ → «Is the equipment desk on the ground floor?»
  - **Рэй:** Ground floor. No stairs today. — Первый этаж. Сегодня без лестниц. _(neutral)_
- _Уточнить, между какими ориентирами он находится_ → «Is it between the stairs and the noticeboard?»
  - **Айрис:** Yes. The noticeboard is on its other side. — Да. С другой стороны от него доска объявлений. _(neutral)_

Если ответ непонятен:
- **Рэй:** The floor or the landmarks? — Этаж или ориентиры? _(listening)_

_Итог занятия:_

- **Айрис:** That's a useful question for the guide, too. — Для гида это тоже полезный вопрос. _(notebook/thinking)_

### Занятие 6. Голосом (продукция)

_У пункта выдачи игрок репетирует короткое объяснение маршрута. Рэй сохраняет пробу отдельно от готовых страниц._

- **Рэй:** Directions first. Recording second. — Сначала маршрут. Потом запись. _(recorder/listening)_

_Итог занятия:_

- **Рэй:** Clear enough to follow. — Достаточно понятно, чтобы дойти. _(recorder/happy)_

### Занятие 7. Быстрый круг (беглость)

_На двери пункта выдачи есть небольшая схема. Команда быстро соотносит ориентиры со своими заметками, не уходит в другие части здания._

- **Мика:** Quick check: the stairs, the desk, the noticeboard. In that order? — Быстрая проверка: лестница, пункт выдачи, доска. В таком порядке? _(thinking)_

**Диктант [u005-s7-e6]**

- **Айрис:** The noticeboard is on its other side.

_Итог занятия:_

- **Мика:** Yes! Three things I can point at. Better than three arrows on my phone. — Да! Три вещи, которые можно показать. Лучше трёх стрелок в телефоне. _(phone/happy)_

### Занятие 8. Миссия: место для четвёртого стула (беглость · миссия)

**Сцена [u005-s8-e1]** · Что можно взять

_Пункт выдачи виден через открытый дверной проём. На листе: «Green labels: club furniture. Sign with your room number to reserve. Collect after the equipment check». — «Зелёные наклейки: мебель для клубов. Для брони укажите номер своей комнаты. Получать после проверки оборудования». В зелёном списке — стул, узкая полка и две мягкие панели. На тяжёлой большой полке зелёной наклейки нет._

- **Мика:** A chair, a narrow shelf, two panels. Can you check where they are? — Стул, узкая полка, две панели. Проверишь, где они? _(phone/focused)_

Выбор намерения:
- _Указать сначала стул_ → «There is a green label on the chair by the door.»
  - **Мика:** Great. One less box pretending to be a chair. — Отлично. На одну коробку, притворяющуюся стулом, меньше. _(happy)_
- _Указать сначала полку и панели_ → «There are two panels next to the narrow shelf.»
  - **Рэй:** Two panels. That may help. — Две панели. Могут пригодиться. _(neutral)_

Если ответ непонятен:
- **Айрис:** Which object do you mean? — Какой предмет ты имеешь в виду? _(listening)_

**Сцена [u005-s8-e2]** · Первая строка маршрута

_По дороге обратно команда проверяет маршрут в обратном направлении. У пункта выдачи Айрис предлагает игроку выбрать первую строку карточки для доски комнаты 17. Полная информация сохранится в обоих вариантах, но порядок действительно будет разным._

- **Айрис:** What should come first: the building or the landmarks? — Что поставить первым: корпус или ориентиры? _(notebook/thinking)_

Выбор намерения:
- _Сначала назвать корпус и этаж_ → «The equipment desk is on the ground floor of the Old Building.» · флаг `u005_route_building`
  - **Айрис:** Building first. Then the stairs and the noticeboard. — Сначала корпус. Затем лестница и доска объявлений. _(notebook/focused)_
- _Сначала описать ориентиры внутри старого корпуса_ → «In the Old Building, find the stairs and the noticeboard.» · флаг `u005_route_landmarks`
  - **Айрис:** Landmarks first. The next line will confirm the floor. — Сначала ориентиры. Следующая строка уточнит этаж. _(notebook/focused)_

Если ответ непонятен:
- **Айрис:** Which part would you put first? — Какую часть ты поставишь первой? _(thinking)_

_Итог занятия:_

- **Мика:** Reserved! We collect everything after the room check. — Забронировано! Заберём всё после проверки комнаты. _(phone/happy)_
- **Рэй:** First, that buzzing cable. — Сначала этот гудящий кабель. _(recorder/neutral)_

---

## Юнит 006. Описать проблему

**Цель:** Описать наблюдаемую неполадку и отличить её от предположения о причине.

**Итог юнита:** Составлена заявка с тремя наблюдениями: гул при подключении микрофона, мигающий индикатор записи и эхо. Выбрано, с какой проверки попросить техника начать; диагноз и ремонт ещё впереди.

### Занятие 1. Заявка без слова «всё» (понимание)

_Понедельник, 12:10. Встреча короткая: Рэй должна уйти до лаборатории, Айрис — позже в библиотеку. Команда проверяет комнату перед получением мебели. Мика открывает памятку к электронной заявке._

- **Мика:** “Everything is broken” won't fit in this box. Also, it isn't true. — «Всё сломано» в это поле не влезет. И это неправда. _(phone/thinking)_
- **Рэй:** The recorder works. Start there. — Рекордер работает. С этого начнём. _(recorder/neutral)_

**Чтение [u006-s1-e1]: «Before you send a repair request»** (объявление)

> Please tell us what is happening now and where you notice it. “The microphone isn't working” is a useful start, but a short description is better. Is it silent, or is it making a noise? Is a light flashing? Does the problem happen all the time?
>
> Write what you can observe. You do not need to name the cause. Leave damaged equipment switched off. Do not open sockets or repair cables yourself. Add your room number and a time when someone can let the technician in.

_Перевод:_ Расскажите, что происходит сейчас и где вы это замечаете. «Микрофон не работает» — полезное начало, но лучше добавить короткое описание. Звука нет или слышен шум? Мигает индикатор? Проблема возникает постоянно? Пишите то, что можете наблюдать. Называть причину не нужно. Оставляйте повреждённое оборудование выключенным. Не вскрывайте розетки и не ремонтируйте кабели самостоятельно. Добавьте номер комнаты и время, когда кто-нибудь сможет впустить техника.

_Итог занятия:_

- **Айрис:** Symptoms first. Guesses can wait. — Сначала признаки. Догадки подождут. _(notebook/focused)_

### Занятие 2. Что именно слышно (понимание)

_Общий чат «Room 17». Рэй и Мика сохраняют два коротких наблюдения для заявки. Рэй уже отключила подозрительный кабель; повторного включения ради упражнения нет. Запись сухого голоса воспроизводится через исправный рекордер._

- **Рэй:** Earlier test. Listen to this. — Предыдущая проба. Послушай это. _(recorder/neutral)_

**Аудирование [u006-s2-e1]** · Голосовое Рэй в чате «Room 17»

- **Рэй:** The recorder is working. The noise starts when we connect the microphone with the old cable. I'm leaving that cable unplugged. The room is also making our voices echo. — Рекордер работает. Шум начинается, когда мы подключаем микрофон старым кабелем. Я оставляю этот кабель отключённым. А ещё в комнате эхо от наших голосов. _([quietly, focused])_

**Аудирование [u006-s2-e2]** · Голосовое Мики в чате «Room 17»

- **Мика:** The small recording light by the door is flashing. It isn't staying red. The main ceiling light is working normally. I'm taking a photo of the small light for our request. — Маленький индикатор записи у двери мигает. Он не горит ровным красным светом. Основной потолочный свет работает нормально. Я фотографирую маленький индикатор для заявки. _([quietly, focused])_

**Диктант [u006-s2-e3]**

- **Мика:** The small recording light is flashing.

**Диктант [u006-s2-e4]**

- **Рэй:** The recorder is working. _([quietly, focused])_

_Итог занятия:_

- **Айрис:** Two electrical symptoms. The echo goes in a separate note. — Два признака неполадок оборудования. Эхо — отдельным примечанием. _(notebook/focused)_

### Занятие 3. Сейчас происходит (форма)

_Айрис разделяет текущие наблюдения и запись предыдущей пробы. В упражнения идут предложения, которые можно использовать в описании._

- **Айрис:** These lines describe a test in progress. Keep “now” in mind. — Эти строки описывают идущую проверку. Помни о «сейчас». _(notebook/focused)_

_Итог занятия:_

- **Айрис:** A description of the test, not a theory about the building. — Описание проверки, а не теория о здании. _(notebook/dry_smile)_

### Занятие 4. Состояние или действие (форма)

_На столе лежит отключённый микрофонный кабель. Никто не снимает с него изоляцию. Айрис сопоставляет слова состояния с наблюдаемым действием._

- **Айрис:** “Dusty” and “buzzing” tell us different things. We may need both. — «Пыльный» и «гудит» сообщают разное. Могут пригодиться оба. _(notebook/thinking)_

_Итог занятия:_

- **Рэй:** Dust isn't a diagnosis. — Пыль — не диагноз. _(deadpan)_

### Занятие 5. Что вписать в заявку (продукция)

**Сцена [u006-s5-e1]** · Наблюдение вместо догадки

_Мика открыла поле «Описание». Для первой строки можно выбрать любой из двух реальных симптомов; после ответа она добавит второй._

- **Мика:** What should I write first? Something we can actually check. — Что написать первым? То, что действительно можно проверить. _(phone/thinking)_

Выбор намерения:
- _Описать шум микрофона_ → «The microphone is making a buzzing noise.»
  - **Мика:** The noise first. I'll add when it happens. — Сначала шум. Добавлю, когда он возникает. _(phone/focused)_
- _Описать мигающий индикатор_ → «The small recording light is flashing.»
  - **Мика:** The small light, not the ceiling light. I'll make that clear. — Маленький индикатор, а не потолочный свет. Это уточню. _(phone/focused)_

Если ответ непонятен:
- **Мика:** Do you mean the noise or the light? — Ты про шум или про индикатор? _(thinking)_

_Итог занятия:_

- **Айрис:** Both symptoms are in the request. Neither one says “the building is broken”. — Оба признака в заявке. Ни один не говорит «здание сломалось». _(notebook/dry_smile)_

### Занятие 6. Голосом (продукция)

_Игрок репетирует, как объяснить проблему технику. Используется встроенный исправный микрофон рекордера, без старого кабеля. Это учебная репетиция, а не состоявшийся звонок._

- **Рэй:** Use the recorder's own mic. — Используй встроенный микрофон рекордера. _(recorder/neutral)_

_Итог занятия:_

- **Рэй:** Specific. That helps. — Конкретно. Это поможет. _(recorder/happy)_

### Занятие 7. Быстрый круг (беглость)

_Команда сверяет фото индикатора, фрагмент прежней записи и три строки заметки. На фото комнаты видна пустая стена: эхо осталось, хотя кабель уже отключён._

- **Айрис:** Match each observation to its source. Then we can send the request. — Сопоставь каждое наблюдение с его источником. Потом отправим заявку. _(notebook/focused)_

**Диктант [u006-s7-e6]**

- **Мика:** It isn't staying red. _([quietly, focused])_

_Итог занятия:_

- **Мика:** Three observations. No dramatic headline. Ready. — Три наблюдения. Без драматичного заголовка. Готово. _(phone/happy)_

### Занятие 8. Миссия: понятная заявка (беглость · миссия)

**Сцена [u006-s8-e1]** · С чего начать проверку

_В заявке уже есть номер комнаты, оба симптома оборудования и отдельная заметка об эхе. Рэй предлагает указать удобный порядок проверки; это не исключает вторую неполадку._

- **Рэй:** Cable or light first? — Сначала кабель или индикатор? _(recorder/listening)_

Выбор намерения:
- _Попросить сначала проверить шум микрофона_ → «Please check the microphone noise first.» · флаг `u006_check_sound_first`
  - **Рэй:** Sound first. Light stays listed. — Сначала звук. Индикатор остаётся в списке. _(recorder/neutral)_
- _Попросить сначала проверить мигающий индикатор_ → «Please check the flashing light first.» · флаг `u006_check_light_first`
  - **Мика:** Light first. And we still need the microphone checked. — Сначала индикатор. И микрофон всё равно нужно проверить. _(phone/focused)_

Если ответ непонятен:
- **Рэй:** Which one first? Both stay. — Что первым? Оба остаются. _(listening)_

**Сцена [u006-s8-e2]** · Отдельное примечание

_Айрис просит добавить уточнение: что команда уже сделала или какая проблема останется после проверки техники._

- **Айрис:** One more detail. What should the technician know? — Ещё одна деталь. Что должен знать техник? _(notebook/thinking)_

Выбор намерения:
- _Сказать, что старый кабель оставлен отключённым_ → «We are leaving the old cable unplugged.»
  - **Айрис:** Added. They can bring a replacement for the test. — Добавила. Можно будет принести замену для проверки. _(notebook/focused)_
- _Сказать, что в комнате также слышно эхо_ → «Our voices are echoing in the room.»
  - **Айрис:** Added. A working cable won't change an empty wall. — Добавила. Исправный кабель не изменит пустую стену. _(notebook/focused)_

Если ответ непонятен:
- **Айрис:** The cable's current state, or the echo? — Текущее состояние кабеля или эхо? _(listening)_

_Итог занятия:_

- **Мика:** Sent. Now we ask for a visit, not a miracle. — Отправлено. Теперь просим о визите, а не о чуде. _(phone/happy)_
- **Рэй:** Keep the old cable aside. — Старый кабель пока отложим. _(recorder/neutral)_

---

## Юнит 007. Договориться о помощи

**Цель:** Вежливо попросить о помощи, предложить посильную задачу и уточнить границы договорённости.

**Итог юнита:** Алекс проверил оборудование в выбранном порядке, заменил неисправный микрофонный кабель и батарейки индикатора. Команда получила разрешение пользоваться комплектом; забронированные предметы доставлены в комнату 17. Расстановка ещё не выбрана.

### Занятие 1. Когда техник может прийти (понимание)

_Вторник, 12:10. Мика показывает игроку ответ на вчерашнюю заявку. Айрис присоединяется после утренних семинаров; Рэй зайдёт на короткое согласование до лаборатории. Новый общий час не придумывают: проверяют уже существующую среду, 13:00._

- **Мика:** We have a reply! Wednesday at one. That is actually our time. — Нам ответили! Среда, час. Как раз наше время. _(phone/happy)_
- **Айрис:** Read what Alex can do before we add three more requests. — Прочитай, что Алекс может сделать, прежде чем добавлять ещё три просьбы. _(notebook/focused)_

**Чтение [u007-s1-e1]: «Room 17 — equipment check»** (письмо)

> Hello, Room 17 team,
>
> I can visit on Wednesday at 13:00. Could someone let me in and show me the equipment? Please leave the old microphone cable unplugged. I'll bring a replacement cable and batteries for the recording light.
>
> I can check the equipment and the power supply, but I can't put up shelves during this visit. After the check, you can collect your reserved furniture. There is a small trolley at the equipment desk. Please move the shelf together and keep the door clear.
>
> Thanks,
>
> Alex, academy technician

_Перевод:_ Здравствуйте, команда комнаты 17! Я могу прийти в среду в 13:00. Может кто-нибудь впустить меня и показать оборудование? Пожалуйста, оставьте старый микрофонный кабель отключённым. Я принесу кабель для замены и батарейки для индикатора записи. Могу проверить оборудование и питание, но не смогу устанавливать полки во время этого визита. После проверки можно забрать забронированную мебель. В пункте выдачи есть маленькая тележка. Пожалуйста, переносите полку вдвоём и не загромождайте дверь. Алекс, техник академии.

_Итог занятия:_

- **Айрис:** A visit has a time and a limit. Both are useful. — У визита есть время и границы. И то и другое полезно. _(notebook/dry_smile)_

### Занятие 2. Кто что может (понимание)

_В общем чате «Room 17» лежат две короткие заметки, записанные для распределения задач. В обоих случаях речь о предстоящей среде, не о том, что помощь уже оказана._

- **Мика:** Listen before we put names next to jobs. — Сначала послушаем, потом впишем имена рядом с задачами. _(phone/focused)_

**Аудирование [u007-s2-e1]** · Голосовое Мики в чате «Room 17»

- **Мика:** I can meet Alex at the door at one. Could someone keep the repair request open on their phone? After the check, I'll bring the trolley. We need two people to move the shelf. — Я могу встретить Алекса у двери в час. Кто-нибудь может держать заявку открытой на телефоне? После проверки я привезу тележку. Чтобы перевезти полку, нужны двое.

**Аудирование [u007-s2-e2]** · Голосовое Айрис в чате «Room 17»

- **Айрис:** I'll bring the borrowing sheet and clear the writing table. I can help move light boxes, but I can't carry the shelf alone. Would you mind keeping the doorway clear? — Я принесу лист выдачи и освобожу письменный стол. Могу помочь перенести лёгкие коробки, но не могу нести полку одна. Не мог бы ты оставить дверной проём свободным?

**Диктант [u007-s2-e3]**

- **Айрис:** Would you mind keeping the doorway clear?

**Диктант [u007-s2-e4]**

- **Мика:** I can meet Alex at the door at one. _([quietly, focused])_

_Итог занятия:_

- **Рэй:** Ask first. Assign second. — Сначала спросить. Потом распределять. _(neutral)_

### Занятие 3. Попросить конкретно (форма)

_Айрис делает короткую карточку просьб: один адресат, одно понятное действие. Просьбы репетируются, оборудование пока никто не перемещает._

- **Айрис:** A polite request still needs a clear action. — Даже вежливой просьбе нужно понятное действие. _(notebook/focused)_

_Итог занятия:_

- **Айрис:** Now nobody has to guess what “help” means. — Теперь никому не нужно угадывать, что значит «помочь». _(notebook/focused)_

### Занятие 4. Предложить и отказаться (форма)

_Мика распределяет ещё не выполненные задачи на среду. У каждой есть реальное время; отказ от одной задачи не означает отказ от всей команды._

- **Мика:** You can say what you can do. And what you can't. I need both. — Можно сказать, что ты можешь сделать. И чего не можешь. Мне нужно и то и другое. _(phone/thinking)_

_Итог занятия:_

- **Мика:** A smaller promise I can actually put on the list. Useful. — Небольшое обещание, которое можно действительно внести в список. Полезно. _(phone/happy)_

### Занятие 5. Выбрать свою задачу (продукция)

**Сцена [u007-s5-e1]** · Помочь так, как можешь

_Две реальные задачи на среду ещё свободны. Игрок выбирает одну. Во второй задаче его заменит Мика; роли показаны явно._

- **Мика:** Can you handle one of these? Meeting Alex, or keeping the list during the check? — Возьмёшь что-то одно? Встретить Алекса или вести список во время проверки? _(phone/thinking)_

Выбор намерения:
- _Предложить встретить техника_ → «I'll meet Alex at the door.» · флаг `u007_role_door`
  - **Мика:** Thanks. I'll keep the request open and note the results. — Спасибо. Я открою заявку и запишу результаты. _(phone/focused)_
- _Предложить вести список и попросить Мику встретить техника_ → «I'll keep the list. Could you meet Alex?» · флаг `u007_role_notes`
  - **Мика:** Sure. I'll meet Alex, and you'll keep the list. — Конечно. Я встречу Алекса, а ты будешь вести список. _(phone/focused)_

Если ответ непонятен:
- **Мика:** Which task would you like: the door or the list? — Какую задачу ты выбираешь: дверь или список? _(thinking)_

_Итог занятия:_

- **Айрис:** One name per task. Two people are no longer both “doing everything”. — На каждую задачу по имени. Два человека больше не «делают всё» одновременно. _(notebook/dry_smile)_

### Занятие 6. Голосом (продукция)

_Игрок репетирует просьбы для встречи и перемещения мебели. Это ещё не разговор с техником._

- **Рэй:** Requests for tomorrow. Try them. — Просьбы на завтра. Попробуй. _(listening)_

_Итог занятия:_

- **Рэй:** Clear requests. No guessing. — Понятные просьбы. Без угадывания. _(happy)_

### Занятие 7. Быстрый круг (беглость)

_Перед отправкой подтверждения Мика показывает список: среда, 13:00; роли игрока и Мики; техника проверяют до выдачи мебели._

- **Мика:** Last check. Does every job have a person, and every request an answer? — Последняя проверка. У каждой задачи есть исполнитель, а у каждой просьбы — ответ? _(phone/focused)_

**Диктант [u007-s7-e6]**

- **Айрис:** I can't carry the shelf alone.

_Итог занятия:_

- **Мика:** Confirmed for Wednesday at one. Same hour, a different plan. — Подтвердили среду, час дня. Тот же час, другой план. _(phone/happy)_

### Занятие 8. Миссия: помощь по договорённости (беглость · миссия)

**Сцена [u007-s8-e1]** · Проверка

_Среда третьей недели, ровно 13:00. Алекс приходит в комнату 17. Каждый делает задачу, которую выбрал: один впускает техника, другой ведёт список результатов на телефоне. Рэй показывает отключённый кабель, Мика — индикатор._

- **Алекс:** Hello. Could you show me which problem you want checked first? — Здравствуйте. Покажете, какую проблему вы хотите проверить первой?

Выбор намерения:
- _Попросить объяснить результат проверки_ → «Could you explain what you find?»
  - **Алекс:** Of course. I'll explain each result before we move on. — Конечно. Объясню каждый результат, прежде чем двигаться дальше.
- _Попросить проверить также питание_ → «Could you check the power supply too?»
  - **Алекс:** Yes. That is part of the check. I'll include the result in your notes. — Да. Это часть проверки. Я добавлю результат в ваши заметки.

Если ответ непонятен:
- **Алекс:** Do you want an explanation, or an extra check? — Вы хотите объяснение или дополнительную проверку?

Общее продолжение:
- **Алекс:** The microphone cable has a faulty connector. I'll replace the cable. — У микрофонного кабеля неисправен разъём. Заменю кабель. _(если нет `u006_check_light_first`)_
- **Алекс:** This small light runs on batteries. They are low. I'll replace them. — Этот маленький индикатор работает от батареек. Они садятся. Заменю их.
- **Алекс:** The microphone cable has a faulty connector. I'll replace the cable. — У микрофонного кабеля неисправен разъём. Заменю кабель. _(если `u006_check_light_first`)_
- **Алекс:** The socket and power supply are working normally. The echo needs a different solution. — Розетка и питание работают нормально. Для эха нужно другое решение.
- **Рэй:** So, not the whole building. — Значит, не всё здание. _(deadpan)_
- **Алекс:** Put the soft panels around the recording corner. Leave space to walk. — Поставьте мягкие панели вокруг угла записи. Оставьте место для прохода.

**Сцена [u007-s8-e2]** · Тележка у двери

_Около 13:15. Алекс закончил визит и ушёл. Мика привезла тележку из пункта выдачи, Рэй идёт с игроком к уже отмеченным предметам; Айрис остаётся подписать опись и освободить место в комнате. Пункт выдачи близко, на том же этаже._

- **Рэй:** Shelf first. Need a hand? — Сначала полка. Нужна помощь? _(neutral)_

Выбор намерения:
- _Попросить Рэй помочь поставить полку на тележку_ → «Could you help me put the shelf on the trolley?»
  - **Рэй:** Yes. One side each. — Да. Каждому по стороне. _(focused)_
- _Предложить держать тележку и попросить Мику помочь Рэй_ → «I'll hold the trolley. Could you help Rei with the shelf, Mika?»
  - **Мика:** Sure. You hold it steady; we'll lift together. — Конечно. Ты придерживаешь, мы поднимаем вдвоём. _(focused)_

Если ответ непонятен:
- **Рэй:** Helping lift, or holding the trolley? — Помогаешь поднять или держишь тележку? _(listening)_

_Итог занятия:_

- **Айрис:** Four borrowed items, one working microphone, and a clear doorway. — Четыре взятых предмета, один работающий микрофон и свободный дверной проём. _(notebook/focused)_
- **Мика:** Now we can argue about where everything goes. — Теперь можно спорить о том, куда всё поставить. _(happy)_
- **Рэй:** Quietly. — Тихо. _(deadpan)_

---

## Юнит 008. Рассказать о предпочтениях

**Цель:** Высказать предпочтение, объяснить его и договориться о варианте, учитывающем остальных.

**Итог юнита:** Комната 17 обустроена для работы вчетвером. Угол записи закрыт мягкими панелями, письменный стол стоит в выбранном игроком месте, коробки убраны на напольную полку, четвёртый стул свободен. Короткая проверка подтверждает: гул исчез, эха стало меньше. Карточка проверенного маршрута добавлена в локальный черновик гида.

### Занятие 1. Четыре человека, одна комната (понимание)

_Та же среда, около 13:20. Мебель внутри, но пока стоит у свободной стены. У команды сорок минут до конца обычной встречи. Айрис записала пожелания, прежде чем кто-нибудь начал всё двигать._

- **Мика:** I want the board where people can see it. Otherwise it is a secret plan. — Хочу доску там, где её видно. Иначе получится тайный план. _(phone/thinking)_
- **Рэй:** I want less echo. — Я хочу меньше эха. _(neutral)_
- **Айрис:** And somewhere to put a sentence down without moving a microphone. — А я — место, где можно записать предложение, не переставляя микрофон. _(notebook/dry_smile)_

**Чтение [u008-s1-e1]: «Room 17 — what we need»** (тетрадный лист)

> Mika likes planning with everyone around one table. She would prefer a clear board near the entrance, so nobody misses the next meeting.
>
> Rei prefers recording in a quiet corner to recording beside the door. The two soft panels can stand near the inside wall, away from the entrance.
>
> Iris likes writing with enough room for her notebook. She can work by the window or against the other wall. The narrow wooden shelf can hold the boxes.
>
> We also need a fourth chair, a clear doorway and space to walk between the two work areas.

_Перевод:_ Мика любит планировать, когда все сидят за одним столом. Она предпочла бы хорошо видимую доску рядом со входом, чтобы никто не пропустил следующую встречу. Рэй предпочитает записывать в тихом углу, а не возле двери. Две мягкие панели можно поставить у внутренней стены, подальше от входа. Айрис любит писать, когда хватает места для блокнота. Она может работать у окна или у другой стены. Узкая деревянная полка подойдёт для коробок. Также нам нужны четвёртый стул, свободный дверной проём и проход между двумя рабочими зонами.

_Итог занятия:_

- **Айрис:** Two possible desk positions. Neither is a personal insult. — Два возможных места для стола. Ни одно не является личным оскорблением. _(notebook/dry_smile)_

### Занятие 2. Что важнее в расстановке (понимание)

_Мика сохраняет в общий чат «Room 17» две короткие записи с пожеланиями. Они помогут свериться при перестановке; никто не отправляет личное приглашение._

- **Мика:** Let's record the reasons too. Arrows on a plan don't explain everything. — Запишем и причины. Стрелки на плане объясняют не всё. _(phone/focused)_

**Аудирование [u008-s2-e1]** · Голосовое Мики в чате «Room 17»

- **Мика:** I like working around one table. I'd prefer the board near the door, where everyone can read it. The photo can wait until we're finished. I don't want a pretty room that nobody can use. — Мне нравится работать всем за одним столом. Я предпочла бы доску рядом с дверью, чтобы все могли её прочитать. Фото подождёт до конца. Мне не нужна красивая комната, которой невозможно пользоваться.

**Аудирование [u008-s2-e2]** · Голосовое Айрис в чате «Room 17»

- **Айрис:** I'd rather keep the writing table separate from the recording corner. I like writing by the window, but the other wall works too. We need enough room for four people, not just for my notebook. — Я предпочла бы держать письменный стол отдельно от угла записи. Мне нравится писать у окна, но другая стена тоже подходит. Нам нужно место для четырёх человек, а не только для моего блокнота.

**Диктант [u008-s2-e3]**

- **Айрис:** I'd rather keep the doorway clear.

**Диктант [u008-s2-e4]**

- **Мика:** I like working around one table.

_Итог занятия:_

- **Рэй:** Pretty can stay. Echo can't. — Красоту оставим. Эхо — нет. _(smirk)_

### Занятие 3. Что нравится и что предпочитаешь (форма)

_На двух бумажных вариантах плана пока только стрелки. Айрис добавляет короткие объяснения предпочтений._

- **Айрис:** Say what you prefer. “Fine” doesn't tell us which plan to use. — Скажи, что предпочитаешь. «Нормально» не объясняет, какой план выбрать. _(notebook/thinking)_

_Итог занятия:_

- **Айрис:** A preference and a reason. Now we can compare plans. — Предпочтение и причина. Теперь можно сравнивать планы. _(notebook/focused)_

### Занятие 4. Какую именно полку (форма)

_На полку нужно убрать коробки. Айрис подписывает схему, чтобы «эта штука» не означала три разных предмета. Маленькая старая лампа уже была в комнате: её не покупали в этом модуле._

- **Мика:** We have three things called “that thing”. Let's give them better names. — У нас три предмета называются «та штука». Дадим им имена получше. _(phone/thinking)_

_Итог занятия:_

- **Рэй:** The shelf now has a name. — Теперь у полки есть название. _(deadpan)_

### Занятие 5. Предложить расстановку (продукция)

**Сцена [u008-s5-e1]** · Два рабочих варианта

_На плане в обоих вариантах есть тихий угол у внутренней стены, доска рядом со входом и свободный проход. Отличается место письменного стола. Игрок выбирает его сейчас; в финале мебель действительно поставят по выбранному варианту._

- **Мика:** Window or wall for the writing table? Both leave the door clear. — Письменный стол у окна или у стены? Оба варианта оставляют дверь свободной. _(phone/thinking)_

Выбор намерения:
- _Выбрать письменный стол у окна_ → «I'd prefer the writing table by the window.» · флаг `u008_layout_window`
  - **Айрис:** Window it is. The shelf can stand beside it. — Значит, у окна. Полка встанет рядом. _(notebook/focused)_
- _Выбрать письменный стол у другой стены_ → «I'd rather put the writing table against the other wall.» · флаг `u008_layout_wall`
  - **Айрис:** That works. We'll leave the window area open. — Подходит. Место у окна оставим свободным. _(notebook/focused)_

Если ответ непонятен:
- **Мика:** Which place would you prefer for the writing table? — Какое место ты предпочитаешь для письменного стола? _(thinking)_

_Итог занятия:_

- **Рэй:** Recording corner stays over here. — Угол записи остаётся здесь. _(neutral)_

### Занятие 6. Голосом (продукция)

_Перед перестановкой игрок пробует вслух объяснить выбранный план. Для второй строки берётся только его сохранённый вариант. Остальные строки общие._

- **Айрис:** Explain the plan before we move the furniture. Less lifting that way. — Объясни план, прежде чем двигать мебель. Так придётся меньше таскать. _(notebook/dry_smile)_

_Итог занятия:_

- **Мика:** Good. We can all point to our own bit of the plan. — Хорошо. Каждый может показать свою часть плана. _(happy)_

### Занятие 7. Проверка модуля 005–008 (беглость · проверка модуля)

_Айрис достаёт новую учебную карточку. Это вымышленная ситуация другого клуба, а не сообщение о новых поломках комнаты 17. Проверка не создаёт сюжетных событий и не ставит новые флаги._

- **Айрис:** A different club, a different room. Use the same skills. — Другой клуб, другая комната. Используй те же навыки. _(notebook/focused)_

**Чтение [u008-s7-e1]: «Art club — Room 24»** (тетрадный лист)

> The art club is in Room 24 on the ground floor of the New Building. It is opposite the lift, between a classroom and a small office. Today the desk lamp is making a noise, so it is switched off. The club prefers drawing by the window. They need help moving a narrow wooden table there. Please keep the door clear. There are two spare chairs beside the office if anyone needs them.

_Перевод:_ Художественный клуб находится в кабинете 24 на первом этаже нового корпуса. Он напротив лифта, между аудиторией и маленьким офисом. Сегодня настольная лампа шумит, поэтому она выключена. Участники клуба предпочитают рисовать у окна. Им нужна помощь: передвинуть туда узкий деревянный стол. Пожалуйста, оставьте дверь свободной. Возле офиса есть два свободных стула, если кому-нибудь нужны.

**Аудирование [u008-s7-e2]** · Учебное сообщение Айрис

- **Айрис:** Could you help the art club after lunch? They need two people to move the table. If you can't lift it, you can hold the door. Please don't turn the noisy lamp on. — Можешь помочь художественному клубу после обеда? Нужны двое, чтобы передвинуть стол. Если не можешь поднимать, можно подержать дверь. Пожалуйста, не включай шумящую лампу.

_Итог занятия:_

- **Айрис:** New room, familiar skills. Back to ours. — Новая комната, знакомые навыки. Вернёмся к нашей. _(notebook/focused)_

### Занятие 8. Миссия: комната, которой можно пользоваться (беглость · миссия)

**Сцена [u008-s8-e1]** · Что делать первым

_Около 13:40. Бумажный план выбран, техника исправна, мебель ещё можно передвинуть. Задачи небольшие: поставить панели, передвинуть стол вдвоём, убрать коробки на полку. Все решения уже согласованы; игрок выбирает порядок работы, а не право отменить чужое рабочее место._

- **Мика:** Plan agreed. What would you rather start with? — План согласован. С чего ты предпочёл бы начать? _(focused)_

Выбор намерения:
- _Сначала подготовить угол записи_ → «I'd rather put the soft panels in place first.» · флаг `u008_setup_sound_first`
  - **Рэй:** Panels first. I'll show you. — Сначала панели. Я покажу. _(focused)_
- _Сначала освободить письменный стол_ → «I'd prefer to clear the writing table first.» · флаг `u008_setup_table_first`
  - **Айрис:** Table first. These boxes go on the shelf. — Сначала стол. Эти коробки — на полку. _(notebook/focused)_

Если ответ непонятен:
- **Мика:** The recording corner or the writing table first? — Сначала угол записи или письменный стол? _(thinking)_

Общее продолжение:
- **Мика:** Four chairs. All available for actual people. — Четыре стула. Все доступны настоящим людям. _(happy)_
- **Рэй:** Try one normal sentence. — Попробуй одно обычное предложение. _(recorder/listening)_
- **Рэй:** Less echo. No buzz. Better. — Меньше эха. Без гула. Лучше. _(recorder/happy)_

**Сцена [u008-s8-e2]** · Карточка, которую можно проверить

_Около 13:55. Айрис прикрепляет карточку маршрута рядом с общей таблицей на среду. Первая строка — та, что ты выбрал в юните 005._

- **Диктор:** The equipment desk is on the ground floor of the Old Building. — Пункт выдачи на первом этаже старого корпуса. _(если `u005_route_building`)_
- **Диктор:** Find it between the stairs and the noticeboard, at the end of the corridor. — Он между лестницей и доской объявлений, в конце коридора. _(если `u005_route_building`)_
- **Диктор:** In the Old Building, find the stairs and the noticeboard. — В старом корпусе найди лестницу и доску объявлений. _(если нет `u005_route_building`)_
- **Диктор:** The equipment desk is between them, on the ground floor, at the end of the corridor. — Пункт выдачи между ними, на первом этаже, в конце коридора. _(если нет `u005_route_building`)_
- **Айрис:** The route is checked. What reminder should go underneath? — Маршрут проверен. Какую памятку добавить снизу? _(notebook/thinking)_

Выбор намерения:
- _Напомнить, что вещи сначала нужно забронировать_ → «Please reserve the furniture before you collect it.» · флаг `u008_card_reservation`
  - **Айрис:** Reservation first. I'll add that below the route. — Сначала бронь. Добавлю под маршрутом. _(notebook/focused)_
- _Напомнить, что нужно сверять наклейки_ → «Please check the green labels before taking anything.» · флаг `u008_card_labels`
  - **Мика:** Labels first. Much better than “take whatever looks nice”. — Сначала наклейки. Лучше, чем «берите всё красивое». _(phone/happy)_

Если ответ непонятен:
- **Айрис:** The reservation or the labels? Which reminder do you want to add? — Бронь или наклейки? Какую памятку ты хочешь добавить? _(listening)_

_Итог занятия:_

- **Мика:** We can actually work in here now! Four chairs, no boxes in the doorway. — Теперь здесь правда можно работать! Четыре стула, никаких коробок в дверях. _(phone/happy)_
- **Айрис:** Room photo, no people. The table is finally visible. — Фото комнаты, без людей. Стол наконец-то видно. _(notebook/dry_smile)_
- **Рэй:** Equipment off. Cable put away. — Оборудование выключено. Кабель убран. _(recorder/neutral)_
- **Мика:** Next meeting: that lunch I promised. We should ask what everyone actually wants. — Следующая встреча — тот обед, который я обещала. Стоит спросить, чего все действительно хотят. _(phone/thinking)_
- **Айрис:** Put your own answer on the list too. — Свой ответ тоже внеси в список. _(notebook/dry_smile)_
- **Мика:** Right. Four people. Four answers. — Точно. Четыре человека. Четыре ответа. _(happy)_

---

# Страницы героинь

## Мика

Организует, договаривается, считает бюджет. Хочет стать продюсером культурных событий.

**Что ты о ней знаешь:**

- В подготовительной программе, как и ты. Утро обычно проводит в комнате 17. _(после юнита 001)_
- Хочет изучать продюсирование событий. «Пока изучаю всё подряд». _(флаг `u001_asked_mika`)_
- Встречи клубов — в понедельник и четверг вечером. В среду свободна после двенадцати. _(после юнита 003)_
- Встаёт в шесть, первым делом проверяет сообщения и никогда не ложится до полуночи. _(после юнита 004)_
- Для общей работы ей нужна хорошо видимая доска; красивое фото может подождать, пока комнатой действительно можно пользоваться. _(после юнита 008)_

**Общие воспоминания:**

- Your first line for the guide: “I'm new here, and I'm looking for a quiet place to study.” — Твоя первая строчка для гида: «Я здесь новенький и ищу тихое место для учёбы». _(флаг `u001_intro_quiet_place`)_
- Your first line became part of the guide draft. — Твоя первая строчка стала частью черновика гида. _(флаг `u001_intro_looking_for_room`)_
- Your first line for the guide: honest about not understanding everything yet. — Твоя первая строчка для гида — честно о том, что пока не всё понимаешь. _(флаг `u001_intro_exchange_honest`)_
- You asked Mika to speak more slowly in the first real interview. She laughed — and slowed down. — Ты попросил Мику говорить медленнее на первом настоящем интервью. Она рассмеялась — и замедлилась. _(флаг `u002_slowed_mika`)_
- You helped a newcomer with one simple question. "One question at a time" is now Mika's rule. — Ты помог новичку одним простым вопросом. «По одному вопросу» — теперь правило Мики. _(флаг `u002_helped_newcomer`)_
- Mika sent the team's first real plan: Wednesday, one o'clock, the courtyard. — Мика отправила первый настоящий план команды: среда, час дня, двор. _(флаг `u003_confirmed_slot`)_
- Before Alex's visit you took the door, and Mika kept the list of results. — Перед визитом техника ты взял на себя встречу у двери, а Мика вела список результатов. _(флаг `u007_role_door`)_
- Before Alex's visit you kept the list of results, and Mika let him in. You both did exactly those jobs. — Перед визитом техника ты выбрал список результатов, а Мика встретила техника. Вы выполнили именно эти роли. _(флаг `u007_role_notes`)_

**Реплики «Поболтать»:**

- **Мика:** Room 17 is the best room in the building. Don't tell the others. — Комната 17 — лучшая в здании. Только другим не говори. _(happy)_ _(после юнита 001)_
- **Мика:** I have a plan for today. Actually, I have three. — У меня есть план на сегодня. Вообще-то три. _(excited)_ _(после юнита 001)_
- **Мика:** One question at a time. I'm writing it on my hand. — По одному вопросу. Пишу это себе на руке. _(laugh)_ _(после юнита 002)_
- **Мика:** Lunch, all four of us. I already have a plan. Two plans. — Обед, вчетвером. У меня уже есть план. Два плана. _(excited)_ _(после юнита 004)_

**Личные квесты:**

- **Четыре обеда и один лишний план** (юниты 009–012): Спрашивает предпочтения, помнит конкретную деталь
- **Самая бесполезная вещь на рынке** (юниты 057–060): Разделяет с тобой удовольствие без программы
- **Тридцать секунд без чужих аплодисментов** (юниты 093–096): Показывает собственный вклад и сама отправляет заявку
- **Вечер без программы** (юниты 097–100): Прямо обозначает личное приглашение
- **Завтрак в двух городах** (юниты 149–152): Согласовывает контакт без постоянной доступности
- **Ключ от шкафа** (юниты 205–208): Делегирует и остаётся рядом без роли организатора

## Рэй

Звук и музыка. Знает город по акустике дворов и остановок.

**Что ты о ней знаешь:**

- Записывает звук для гида. Когда микрофон включён, говорит мало. _(после юнита 001)_
- Проверяет уровни звука даже посреди разговора. _(флаг `u001_asked_rei`)_
- В звуковой лаборатории каждый день с двух до пяти. Кроме среды. _(после юнита 003)_
- Встаёт поздно. Иногда записывает ночной автобус. _(после юнита 004)_
- Она предпочитает записывать подальше от двери; две мягкие панели для неё полезнее, чем пустой красивый угол. _(после юнита 008)_

**Общие воспоминания:**

- You asked Rei what she was doing. “Checking the levels. You sound fine, by the way.” — Ты спросил Рэй, что она делает. «Проверяю уровни. Кстати, звучишь нормально». _(флаг `u001_asked_rei`)_
- You asked Rei what "gain" means. She let you hold the recorder. — Ты спросил Рэй, что значит «gain». Она дала тебе подержать рекордер. _(флаг `u002_asked_gain`)_
- You asked Rei which button she meant. She let you hold the recorder. — Ты уточнил у Рэй, о какой кнопке речь. Она дала тебе подержать рекордер. _(флаг `u002_asked_button`)_
- You admitted your mornings are chaos. Rei kept it in the guide. — Ты признался, что утро у тебя — хаос. Рэй оставила это в гиде. _(флаг `u004_honest_morning`)_
- You suggested starting with the recording corner. You and Rei put up the panels, then cleared the writing table. Less echo on the test. — Ты предложил начать обустройство с угла записи. Вы с Рэй поставили панели, а затем освободили письменный стол. На пробе стало меньше эха. _(флаг `u008_setup_sound_first`)_
- You suggested clearing the writing table first, then helped Rei with the panels. Less echo on the test. — Ты предложил сначала освободить письменный стол, а затем помог Рэй поставить панели. На пробе стало меньше эха. _(флаг `u008_setup_table_first`)_

**Реплики «Поболтать»:**

- **Рэй:** Don't touch the cables. I'm saying it nicely. — Не трогай кабели. Я прошу вежливо. _(smirk)_ _(после юнита 001)_
- **Рэй:** Every room has its own sound. This one hums. — У каждой комнаты свой звук. Эта гудит. _(neutral)_ _(после юнита 001)_
- **Рэй:** Gain at eight. Remember that and we can work together. — Gain на восьми. Запомни — и мы сработаемся. _(recorder/smirk)_ _(после юнита 002)_
- **Рэй:** The night bus sounds better than most music. Don't tell Mika. — Ночной автобус звучит лучше большинства музыки. Мике не говори. _(smirk)_ _(после юнита 004)_

**Личные квесты:**

- **Чехол с красной молнией** (юниты 033–036): Принимает конкретную помощь и замечает надёжность
- **Пять секунд дождя** (юниты 053–056): Доверяет маленькое творческое решение
- **Место для имени** (юниты 093–096): Сама определяет атрибуцию и разрешённый показ
- **После кнопки Stop** (юниты 097–100): Отличает рабочую прогулку от личной встречи
- **Не твоя любимая песня** (юниты 129–132): Принимает конкретный отзыв без смешения работы и чувств
- **Перед дверью** (юниты 213–216): Просит сопровождения и сама выбирает профессиональный шаг

## Айрис

Тексты и редактура. Хочет писать прозу и подать рассказ на конкурс.

**Что ты о ней знаешь:**

- Пишет и проверяет тексты для гида. После четырёх обычно в библиотеке. _(после юнита 001)_
- Её место в библиотеке — второй этаж, у окна. _(флаг `u001_asked_iris`)_
- Работает в библиотеке в понедельник, среду и пятницу с трёх до семи. Во вторник и четверг утром — семинары. _(после юнита 003)_
- Любит, когда каждое наречие стоит на своём месте. _(после юнита 004)_
- Ей нужен отдельный письменный стол с местом для блокнота; она любит писать у окна, но принимает и другой удобный вариант. _(после юнита 008)_

**Общие воспоминания:**

- After the check, Iris helped you read the welcome note. “The important parts are short.” — После проверки Айрис помогла тебе прочитать памятку. «Важное там короткое». _(после юнита 001)_
- Iris told you where to find her: second floor, by the window. — Айрис сказала, где её найти: второй этаж, у окна. _(флаг `u001_asked_iris`)_
- Iris added a page to the guide: "How to ask again". It was your idea. — Айрис добавила в гид страницу «Как переспросить». Это была твоя идея. _(после юнита 002)_
- You suggested Wednesday at one. Iris checked it twice. It worked. — Ты предложил среду в час. Айрис проверила дважды. Подошло. _(флаг `u003_proposed_wednesday`)_
- Iris kept your wording and only marked the grammar. "That's a compliment." — Айрис сохранила твои формулировки и только отметила грамматику. «Это комплимент». _(после юнита 004)_
- On your suggestion the writing table went by the window, with the shelf beside it. The boxes finally stopped sitting on a chair. — По твоему предложению письменный стол поставили у окна, а полку — рядом. Коробки наконец перестали занимать стул. _(флаг `u008_layout_window`)_
- On your suggestion the writing table went against the other wall, and the window area stayed open. The boxes went on the shelf. — По твоему предложению письменный стол поставили у другой стены, оставив место у окна свободным. Коробки убрали на полку рядом со столом. _(флаг `u008_layout_wall`)_

**Реплики «Поболтать»:**

- **Айрис:** If something isn't clear, ask. That's the whole rule. — Если что-то непонятно — спрашивай. Вот и всё правило. _(dry_smile)_ _(после юнита 001)_
- **Айрис:** I'm reading three books at once. It's going well. Mostly. — Я читаю три книги одновременно. Всё идёт хорошо. В основном. _(happy)_ _(после юнита 001)_
- **Айрис:** At, on, in. Three small words, a hundred small mistakes. — At, on, in. Три маленьких слова, сто маленьких ошибок. _(dry_smile)_ _(после юнита 003)_
- **Айрис:** Your page is still my favourite. Don't let it go to your head. — Твоя страница всё ещё моя любимая. Только не зазнавайся. _(notebook/dry_smile)_ _(после юнита 004)_

**Личные квесты:**

- **Граф, который потерял свой замок** (юниты 025–028): Общается как читательница со вкусом и юмором
- **Слишком хорошее письмо** (юниты 061–064): Принимает непонимание как полезный сигнал
- **Две страницы, один вопрос** (юниты 093–096): Допускает развёрнутый отзыв на свой текст
- **Книжный без списка** (юниты 097–100): Выбирает личную встречу без редакторского задания
- **Мне не понравился финал** (юниты 181–184): Сохраняет близость и свой замысел при разных мнениях
- **Три строки ответа** (юниты 193–196): Сама решает, какие редакторские условия принять

---

# После уроков

Реплики на вкладке «Повторение»: говорит первая из пары дня.

**Мика**

- **Мика:** A few mistakes? That's nothing. Let's go! — Пара ошибок? Ерунда. Погнали! _(excited)_ · _есть что разобрать_
- **Мика:** Not now, I'm busy. Very busy with my phone. Tomorrow! — Не сейчас, я занята. Очень занята телефоном. Завтра! _(phone/happy, [distracted, cheerful])_ · _всё ждёт своего дня_
- **Мика:** No mistakes at all? Okay, now you're just showing off. — Совсем без ошибок? Ладно, это ты уже хвастаешься. _(pout)_ · _ничего не накопилось_
- **Мика:** Done! See? Mistakes are just practice in disguise. — Готово! Видишь? Ошибки — это просто тренировка под прикрытием. _(happy)_ · _раунд окончен_

**Рэй**

- **Рэй:** Wake me up when it's my turn. Or just start. — Разбуди, когда будет моя очередь. Или просто начинай. _(smirk)_ · _есть что разобрать_
- **Рэй:** Come back tomorrow. I'll still be here. Probably asleep. — Приходи завтра. Я буду здесь. Наверное, буду спать. _(neutral, [sleepily])_ · _всё ждёт своего дня_
- **Рэй:** No mistakes. Good. Then I'm sleeping. — Ошибок нет. Хорошо. Тогда я сплю. _(deadpan, [sleepily, deadpan])_ · _ничего не накопилось_
- **Рэй:** Clean take. Not bad. — Чистый дубль. Неплохо. _(smirk)_ · _раунд окончен_

**Айрис**

- **Айрис:** Let's look at your mistakes. They're the most interesting part. — Давай посмотрим на твои ошибки. Это самое интересное. _(notebook/focused)_ · _есть что разобрать_
- **Айрис:** Not today. A mistake needs a day before you check it again. — Не сегодня. Ошибке нужен день, прежде чем проверять её снова. _(thinking)_ · _всё ждёт своего дня_
- **Айрис:** Nothing to fix today. I'm almost disappointed. — Сегодня нечего исправлять. Я почти разочарована. _(notebook/dry_smile)_ · _ничего не накопилось_
- **Айрис:** Good. I'll write that down: fixed. — Хорошо. Так и запишу: исправлено. _(happy)_ · _раунд окончен_

