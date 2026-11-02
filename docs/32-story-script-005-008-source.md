# English Club — продолжение сценария: юниты 005–008

Версия 1.0 · 02.11.2026. Передача в Claude для переноса в приложение.

Продолжение `21-story-script.md`; пролог и юниты 001–004 остаются без изменений. Основа: `29-story-writing-brief.md`, `23-story-rules.md`, `06-story-bible.md`, актуальный экспорт `21-story-script(1).md`. Файл `30-messenger-story.md` не приложен: переписка ограничена общим чатом и правилами, изложенными в брифе. Это сценарий и материал для авторинга, не готовые JSON и не изменения в коде приложения.

## Синопсис модуля

После первой тематической страницы команда понимает, что для следующей записи придётся освободить рабочее место: сейчас коробки занимают стулья, а кабели лежат на проходе. На плане нового корпуса игрок находит служебный склад, но из объявления узнаёт, что клубам нужен другой — пункт выдачи мебели в старом корпусе. Команда получает право взять отмеченные вещи, составляет опись и обнаруживает, что свободное место ещё не решает проблемы со звуком. Игрок помогает отделить наблюдаемые неполадки от догадок и составить понятную заявку технику. После проверки оборудования команда договаривается, как разместить письменный стол, угол записи и доску. Предложение игрока меняет расстановку, а выбранный им способ объяснять маршрут становится частью локального черновика гида. В финале комнатой можно пользоваться вчетвером: без коробки вместо стула, без гудящего микрофонного кабеля и без необходимости перекрикивать друг друга.

## Календарь и условия продолжения

| Эпизод | Сюжетное время | Что происходит |
|---|---|---|
| Конец 004 | Среда второй недели, встреча с 13:00 | Записана первая тематическая страница; прозвучало приглашение на общий обед |
| 005 | Пятница второй недели, 12:10–13:00 | Поиск пункта выдачи, опись и бронь вещей; до лаборатории Рэй в 14:00 и ярмарки клубов в 16:00 |
| 006 | Понедельник третьей недели, 12:10–13:00 | Короткая проверка комнаты и заявка о неполадках |
| 007, занятия 1–7 | Вторник третьей недели, 12:10–12:45 | Заявка и распределение помощи; утренние семинары Айрис закончились, медиалаборатория игрока ещё не началась |
| 007, занятие 8 | Среда третьей недели, 13:00–13:20 | Плановый визит техника в обычный общий час |
| 008 | Та же среда, 13:20–14:00 | Обустройство и проба рабочего места |

Внутри этих отрезков занятия — учебные шаги, а не восемь полноценных встреч. Вне сюжетного времени допустимы репетиции и повторение. Обед из 004 остаётся предложением на одну из следующих встреч: совместный заказ и сам квест начнутся в 009–012. Персонажи продолжают обычную жизнь между эпизодами; никто не ждёт неделю без еды.

**Общий статус:** знакомые. Работа идёт только в локальную сборку гида. Новых личных проблем, флирта и личных переписок нет.

**Единственный новый говорящий персонаж:** Алекс, техник академии; второстепенный, без спрайта. В его репликах `_(neutral)_` обозначает подачу голоса, а не требование нового изображения. Сотрудники офиса отдельно не озвучиваются: сведения даны объявлениями и заявкой.

---

## Юнит 005. Найти комнату

**Цель:** Спросить и объяснить, где что находится в здании.

**Итог юнита:** Найден пункт выдачи мебели в старом корпусе. Для комнаты 17 забронированы стул, узкая полка и две мягкие переносные панели; на доске есть проверенный маршрут к пункту выдачи. Ничего ещё не перевезено.

**Выражения юнита:** there is; there are; Is there…?; Where can I find…?; next to; opposite; between; at the end of; upstairs; on the ground floor; storage room; equipment desk.

### Занятие 1. На плане есть не всё (понимание)

**Место:** new_corridor

_Пятница, 12:10. Вы собрались ненадолго перед следующими делами. В комнате 17 коробки занимают один из стульев; Мика предлагает взять недостающую мебель в академии. На стене нового корпуса висит план с двумя похожими обозначениями._

- **Мика:** We need another chair. A person should sit on it, not a box. — Нам нужен ещё один стул. На нём должен сидеть человек, а не коробка. _(phone/focused)_
- **Айрис:** There are two storage rooms on this notice. Read the small print. — В этом объявлении два склада. Прочитай мелкий шрифт. _(notebook/focused)_

**Чтение: «Equipment and furniture»** (объявление, 89 слов)

> Looking for equipment? There is a technical storage room upstairs in the New Building. It is next to the lift, opposite the language lab. Only staff can collect equipment there.
>
> Student clubs can borrow furniture from the equipment desk in the Old Building. Go through the courtyard and enter the Old Building. Stay on the ground floor. The desk is at the end of the corridor, between the stairs and the noticeboard. There are chairs, small shelves and soft recording panels. Please read the borrowing instructions before taking anything.

_Перевод:_ Ищете оборудование? В новом корпусе наверху есть технический склад. Он рядом с лифтом, напротив языковой лаборатории. Получать там оборудование могут только сотрудники. Студенческие клубы могут брать мебель в пункте выдачи старого корпуса. Перейдите двор и войдите в старый корпус. Оставайтесь на первом этаже. Пункт выдачи находится в конце коридора, между лестницей и доской объявлений. Там есть стулья, небольшие полки и мягкие панели для записи. Прежде чем что-либо брать, прочитайте правила выдачи.

1. Who can collect equipment from the technical storage room? — варианты: Any student / Only staff / Only new students; верно: Only staff.
2. Where can student clubs borrow furniture? — варианты: In the language lab / In the Old Building / By the New Building lift; верно: In the Old Building.
3. Where is the equipment desk? — варианты: On the ground floor / Upstairs by the lift / Inside Room 17; верно: On the ground floor.
4. What must the team do before taking anything? — варианты: Record a message / Read the borrowing instructions / Buy a ticket; верно: Read the borrowing instructions.

_Итог занятия:_

- **Мика:** Old Building, ground floor. Good thing we read past the word “storage”. — Старый корпус, первый этаж. Хорошо, что прочитали дальше слова «склад». _(phone/happy)_

### Занятие 2. Между лестницей и доской (понимание)

**Место:** new_corridor

_Айрис пересылает план в общий чат «Room 17». Команда слушает две маршрутные заметки перед выходом; это рабочие голосовые для всех, не личная переписка._

- **Айрис:** Check these directions against the notice. We only need one route today. — Сверь эти указания с объявлением. Сегодня нам нужен только один маршрут. _(notebook/thinking)_

**Аудирование 1: маршрут Мики** (34 слова)

- **Мика:** Start at the glass doors of the New Building. Cross the courtyard and enter the Old Building. There are stairs on your left. Don't go upstairs. The equipment desk is further along the corridor. — Начни у стеклянных дверей нового корпуса. Перейди двор и войди в старый корпус. Слева будет лестница. Не поднимайся. Пункт выдачи дальше по коридору. _(phone/focused)_

1. Should the listener go upstairs? — варианты: Yes / No / Only after four; верно: No.
2. What does the listener cross? — варианты: The library / The courtyard / The language lab; верно: The courtyard.

**Аудирование 2: ориентиры Айрис** (31 слово)

- **Айрис:** The equipment desk is between the stairs and the noticeboard, at the end of the corridor. There is a borrowing sheet by the door. The furniture has coloured labels on it. — Пункт выдачи между лестницей и доской объявлений, в конце коридора. У двери лежит лист выдачи. На мебели есть цветные наклейки. _(neutral)_

1. Where is the borrowing sheet? — варианты: By the door / Under the stairs / In Room 17; верно: By the door.

**Диктант** · Строка для маршрута

- **Айрис:** The equipment desk is at the end of the corridor. — Пункт выдачи в конце коридора. _(neutral)_

_Итог занятия:_

- **Рэй:** Right building. Right floor. Progress. — Нужный корпус. Нужный этаж. Уже хорошо. _(deadpan)_

### Занятие 3. Что есть на этаже (форма)

**Место:** old_corridor

_У входа в старый корпус Айрис показывает схему. Игрок проверяет, какие объекты на ней обозначены._

- **Айрис:** These notes describe the floor. Check each one against the plan. — Эти заметки описывают этаж. Сверь каждую с планом. _(notebook/focused)_

**Материал для заданий** · схема этажа у пункта выдачи:

1. There is an equipment desk on the ground floor. — На первом этаже есть пункт выдачи.
2. There are two doors next to the stairs. — Рядом с лестницей две двери.
3. There isn't a lift in this part of the building. — В этой части здания нет лифта.
4. There aren't any chairs in the corridor. — В коридоре нет стульев.
5. Is there a borrowing sheet by the door? — У двери есть лист выдачи?
6. Are there any shelves we can borrow? — Есть полки, которые можно взять?
7. There is a borrowing sheet beside the entrance. — Рядом со входом лежит лист выдачи.

_Редактору: эти семь строк относятся к небольшой схеме данного этажа у пункта выдачи. Два дверных проёма и отсутствие лифта — детали схемы; новый фон не нужен._

_Итог занятия:_

- **Айрис:** One desk, several shelves. The notes match the plan. — Один пункт выдачи, несколько полок. Заметки совпадают со схемой. _(notebook/focused)_

### Занятие 4. Не просто «там» (форма)

**Место:** old_corridor

_Мика пишет маршрут для доски комнаты 17. В первой версии три раза встречается «там»._

- **Мика:** “Over there” is doing too much work. Let's give it some help. — На «вон там» слишком много работы. Давай ему поможем. _(phone/thinking)_

**Материал для заданий:**

1. The technical storage room is next to the lift. — Технический склад рядом с лифтом.
2. The language lab is opposite that storage room. — Языковая лаборатория напротив этого склада.
3. The equipment desk is between the stairs and the noticeboard. — Пункт выдачи между лестницей и доской объявлений.
4. It is at the end of the corridor. — Он в конце коридора.
5. The technical storage room is upstairs in the New Building. — Технический склад наверху в новом корпусе.
6. The equipment desk is on the ground floor of the Old Building. — Пункт выдачи на первом этаже старого корпуса.
7. Where can I find the borrowing sheet? — Где найти лист выдачи?

_Итог занятия:_

- **Мика:** Now “there” has an address. — Теперь у «там» есть адрес. _(phone/happy)_

### Занятие 5. Уточнить ориентир (продукция)

**Место:** old_corridor

**Сцена** · Куда идти от входа

_Рэй несёт только рекордер. У поворота она останавливается: игроку нужно выбрать, какую часть маршрута уточнить. Ни один вариант не означает, что он потерялся заново._

- **Рэй:** Which bit shall we check? — Какую часть проверим? _(listening)_

Выбор намерения:
- _Уточнить этаж пункта выдачи_ → «Is the equipment desk on the ground floor?» / «Do we stay on the ground floor?»
 - **Рэй:** Ground floor. No stairs today. — Первый этаж. Сегодня без лестниц. _(neutral)_
- _Уточнить, между какими ориентирами он находится_ → «Is it between the stairs and the noticeboard?» / «Is the desk next to the stairs?»
 - **Айрис:** Yes. The noticeboard is on its other side. — Да. С другой стороны от него доска объявлений. _(neutral)_

Если ответ непонятен:
- **Рэй:** The floor or the landmarks? — Этаж или ориентиры? _(listening)_

_Итог занятия:_

- **Айрис:** That's a useful question for the guide, too. — Для гида это тоже полезный вопрос. _(notebook/thinking)_

### Занятие 6. Голосом (продукция)

**Место:** old_corridor

_У пункта выдачи игрок репетирует короткое объяснение маршрута. Рэй сохраняет пробу отдельно от готовых страниц._

- **Рэй:** Directions first. Recording second. — Сначала маршрут. Потом запись. _(recorder/listening)_

**Фразы для произнесения:**

1. Where can I find the equipment desk? — Где найти пункт выдачи?
2. It is on the ground floor of the Old Building. — Он на первом этаже старого корпуса.
3. Go to the end of the corridor. — Иди до конца коридора.
4. It is between the stairs and the noticeboard. — Он между лестницей и доской объявлений.

_Итог занятия:_

- **Рэй:** Clear enough to follow. — Достаточно понятно, чтобы дойти. _(recorder/happy)_

### Занятие 7. Быстрый круг (беглость)

**Место:** old_corridor

_На двери пункта выдачи есть небольшая схема. Команда быстро соотносит ориентиры со своими заметками, не уходит в другие части здания._

- **Мика:** Quick check: the stairs, the desk, the noticeboard. In that order? — Быстрая проверка: лестница, пункт выдачи, доска. В таком порядке? _(thinking)_

_Материал для быстрого круга: схема и выражения занятий 1–6; новых грамматических заданий автор не добавляет._

_Итог занятия:_

- **Мика:** Yes! Three things I can point at. Better than three arrows on my phone. — Да! Три вещи, которые можно показать. Лучше трёх стрелок в телефоне. _(phone/happy)_

### Занятие 8. Миссия: место для четвёртого стула (беглость · миссия)

**Место:** old_corridor

**Сцена** · Что можно взять

_Пункт выдачи виден через открытый дверной проём. На листе: «Green labels: club furniture. Sign with your room number to reserve. Collect after the equipment check». — «Зелёные наклейки: мебель для клубов. Для брони укажите номер своей комнаты. Получать после проверки оборудования». В зелёном списке — стул, узкая полка и две мягкие панели. На тяжёлой большой полке зелёной наклейки нет._

- **Мика:** A chair, a narrow shelf, two panels. Can you check where they are? — Стул, узкая полка, две панели. Проверишь, где они? _(phone/focused)_

Выбор намерения:
- _Указать сначала стул_ → «There is a green label on the chair by the door.» / «The chair by the door has a green label.»
 - **Мика:** Great. One less box pretending to be a chair. — Отлично. На одну коробку, притворяющуюся стулом, меньше. _(happy)_
- _Указать сначала полку и панели_ → «There are two panels next to the narrow shelf.» / «The narrow shelf is beside the two panels.»
 - **Рэй:** Two panels. That may help. — Две панели. Могут пригодиться. _(neutral)_

Если ответ непонятен:
- **Айрис:** Which object do you mean? — Какой предмет ты имеешь в виду? _(listening)_

_Общее продолжение: Айрис сверяет все четыре предмета с зелёным списком и вписывает «Room 17» в лист бронирования. Выбор меняет порядок осмотра, не итоговую опись._

**Сцена** · Первая строка маршрута

_По дороге обратно команда проверяет маршрут в обратном направлении. У пункта выдачи Айрис предлагает игроку выбрать первую строку карточки для доски комнаты 17. Полная информация сохранится в обоих вариантах, но порядок действительно будет разным._

- **Айрис:** What should come first: the building or the landmarks? — Что поставить первым: корпус или ориентиры? _(notebook/thinking)_

Выбор намерения:
- _Сначала назвать корпус и этаж_ → «The equipment desk is on the ground floor of the Old Building.» / «Start in the Old Building and stay on the ground floor.»
 - **Айрис:** Building first. Then the stairs and the noticeboard. — Сначала корпус. Затем лестница и доска объявлений. _(notebook/focused)_ · флаг `u005_route_building`
- _Сначала описать ориентиры внутри старого корпуса_ → «In the Old Building, find the stairs and the noticeboard.» / «Look between the stairs and the noticeboard in the Old Building.»
 - **Айрис:** Landmarks first. The next line will confirm the floor. — Сначала ориентиры. Следующая строка уточнит этаж. _(notebook/focused)_ · флаг `u005_route_landmarks`

Если ответ непонятен:
- **Айрис:** Which part would you put first? — Какую часть ты поставишь первой? _(thinking)_

_Итог занятия:_

- **Мика:** Reserved! We collect everything after the room check. — Забронировано! Заберём всё после проверки комнаты. _(phone/happy)_
- **Рэй:** First, that buzzing cable. — Сначала этот гудящий кабель. _(recorder/neutral)_

**Изменение истории:** бронь оформлена; карточка маршрута на доске имеет выбранную игроком первую строку. Вещи всё ещё в пункте выдачи. Обе ветки дают одинаковый учебный прогресс.

---

## Юнит 006. Описать проблему

**Цель:** Описать наблюдаемую неполадку и отличить её от предположения о причине.

**Итог юнита:** Составлена заявка с тремя наблюдениями: гул при подключении микрофона, мигающий индикатор записи и эхо. Выбрано, с какой проверки попросить техника начать; диагноз и ремонт ещё впереди.

**Выражения юнита:** isn't working; is buzzing; is flashing; is making a noise; is getting louder; something is wrong with; broken; loose; dusty; too loud; at the moment; check the connection.

### Занятие 1. Заявка без слова «всё» (понимание)

**Место:** room17

_Понедельник, 12:10. Встреча короткая: Рэй должна уйти до лаборатории, Айрис — позже в библиотеку. Команда проверяет комнату перед получением мебели. Мика открывает памятку к электронной заявке._

- **Мика:** “Everything is broken” won't fit in this box. Also, it isn't true. — «Всё сломано» в это поле не влезет. И это неправда. _(phone/thinking)_
- **Рэй:** The recorder works. Start there. — Рекордер работает. С этого начнём. _(recorder/neutral)_

**Чтение: «Before you send a repair request»** (памятка, 86 слов)

> Please tell us what is happening now and where you notice it. “The microphone isn't working” is a useful start, but a short description is better. Is it silent, or is it making a noise? Is a light flashing? Does the problem happen all the time?
>
> Write what you can observe. You do not need to name the cause. Leave damaged equipment switched off. Do not open sockets or repair cables yourself. Add your room number and a time when someone can let the technician in.

_Перевод:_ Расскажите, что происходит сейчас и где вы это замечаете. «Микрофон не работает» — полезное начало, но лучше добавить короткое описание. Звука нет или слышен шум? Мигает индикатор? Проблема возникает постоянно? Пишите то, что можете наблюдать. Называть причину не нужно. Оставляйте повреждённое оборудование выключенным. Не вскрывайте розетки и не ремонтируйте кабели самостоятельно. Добавьте номер комнаты и время, когда кто-нибудь сможет впустить техника.

1. What should the request describe? — варианты: Only the equipment brand / What is happening and where / Everyone's timetable; верно: What is happening and where.
2. Do students need to name the cause? — варианты: No / Yes / Only for lights; верно: No.
3. What should happen to damaged equipment? — варианты: Leave it switched off / Open it / Test it all afternoon; верно: Leave it switched off.
4. Why must the team give a time? — варианты: So someone can let the technician in / To book lunch / To reserve the library; верно: So someone can let the technician in.

_Итог занятия:_

- **Айрис:** Symptoms first. Guesses can wait. — Сначала признаки. Догадки подождут. _(notebook/focused)_

### Занятие 2. Что именно слышно (понимание)

**Место:** room17

_Общий чат «Room 17». Рэй и Мика сохраняют два коротких наблюдения для заявки. Рэй уже отключила подозрительный кабель; повторного включения ради упражнения нет. Запись сухого голоса воспроизводится через исправный рекордер._

- **Рэй:** Earlier test. Listen to this. — Предыдущая проба. Послушай это. _(recorder/neutral)_

**Аудирование 1: заметка Рэй** (29 слов)

- **Рэй:** The recorder is working. The noise starts when we connect the microphone with the old cable. I'm leaving that cable unplugged. The room is also making our voices echo. — Рекордер работает. Шум начинается, когда мы подключаем микрофон старым кабелем. Я оставляю этот кабель отключённым. А ещё в комнате эхо от наших голосов. _(recorder/focused)_

1. When does the noise start? — варианты: When a door opens / When the old microphone cable is connected / When Mika types; верно: When the old microphone cable is connected.
2. Is the old cable connected now? — варианты: No / Yes / The message doesn't say; верно: No.

**Аудирование 2: заметка Мики** (31 слово)

- **Мика:** The small recording light by the door is flashing. It isn't staying red. The main ceiling light is working normally. I'm taking a photo of the small light for our request. — Маленький индикатор записи у двери мигает. Он не горит ровным красным светом. Основной потолочный свет работает нормально. Я фотографирую маленький индикатор для заявки. _(phone/focused)_

1. Which light is flashing? — варианты: The ceiling light / The small recording light / The corridor light; верно: The small recording light.

**Диктант** · Строка заявки

- **Мика:** The small recording light is flashing. — Маленький индикатор записи мигает. _(neutral)_

_Итог занятия:_

- **Айрис:** Two electrical symptoms. The echo goes in a separate note. — Два признака неполадок оборудования. Эхо — отдельным примечанием. _(notebook/focused)_

### Занятие 3. Сейчас происходит (форма)

**Место:** room17

_Айрис разделяет текущие наблюдения и запись предыдущей пробы. В упражнения идут предложения, которые можно использовать в описании._

- **Айрис:** These lines describe a test in progress. Keep “now” in mind. — Эти строки описывают идущую проверку. Помни о «сейчас». _(notebook/focused)_

**Материал для заданий** · Подписи к предыдущей пробе, а не новый запуск оборудования:

1. The microphone isn't working properly. — Микрофон работает неправильно.
2. Something is buzzing near the microphone. — Возле микрофона что-то гудит.
3. The small red light is flashing. — Маленький красный индикатор мигает.
4. The noise is getting louder. — Шум становится громче.
5. Rei is checking the recording. — Рэй проверяет запись.
6. Mika is taking a photo of the light. — Мика фотографирует индикатор.
7. We aren't recording a guide page at the moment. — Сейчас мы не записываем страницу гида.

_Итог занятия:_

- **Айрис:** A description of the test, not a theory about the building. — Описание проверки, а не теория о здании. _(notebook/dry_smile)_

### Занятие 4. Состояние или действие (форма)

**Место:** room17

_На столе лежит отключённый микрофонный кабель. Никто не снимает с него изоляцию. Айрис сопоставляет слова состояния с наблюдаемым действием._

- **Айрис:** “Dusty” and “buzzing” tell us different things. We may need both. — «Пыльный» и «гудит» сообщают разное. Могут пригодиться оба. _(notebook/thinking)_

**Материал для заданий:**

1. The shelf is dusty. — Полка пыльная.
2. The recording light is flashing. — Индикатор записи мигает.
3. The sound on this test recording is too loud. — Звук в этой пробной записи слишком громкий.
4. The cable connection may be loose. — Возможно, соединение кабеля неплотное.
5. The microphone isn't recording clearly. — Микрофон записывает нечётко.
6. We don't know if the cable is broken. — Мы не знаем, сломан ли кабель.
7. Something is wrong with the recording light. — С индикатором записи что-то не так.
8. Could someone check the connection? — Может кто-нибудь проверить соединение?

_Редактору: may be loose — предположение, не диагноз; broken и dusty — прилагательные состояния, не Present Continuous. Не собирать из этих строк правило «любое is + слово означает действие сейчас»._

_Итог занятия:_

- **Рэй:** Dust isn't a diagnosis. — Пыль — не диагноз. _(deadpan)_

### Занятие 5. Что вписать в заявку (продукция)

**Место:** room17

**Сцена** · Наблюдение вместо догадки

_Мика открыла поле «Описание». Для первой строки можно выбрать любой из двух реальных симптомов; после ответа она добавит второй._

- **Мика:** What should I write first? Something we can actually check. — Что написать первым? То, что действительно можно проверить. _(phone/thinking)_

Выбор намерения:
- _Описать шум микрофона_ → «The microphone is making a buzzing noise.» / «Something is buzzing when we connect the microphone.»
 - **Мика:** The noise first. I'll add when it happens. — Сначала шум. Добавлю, когда он возникает. _(phone/focused)_
- _Описать мигающий индикатор_ → «The small recording light is flashing.» / «The light by the door isn't staying red.»
 - **Мика:** The small light, not the ceiling light. I'll make that clear. — Маленький индикатор, а не потолочный свет. Это уточню. _(phone/focused)_

Если ответ непонятен:
- **Мика:** Do you mean the noise or the light? — Ты про шум или про индикатор? _(thinking)_

_Итог занятия:_

- **Айрис:** Both symptoms are in the request. Neither one says “the building is broken”. — Оба признака в заявке. Ни один не говорит «здание сломалось». _(notebook/dry_smile)_

### Занятие 6. Голосом (продукция)

**Место:** room17

_Игрок репетирует, как объяснить проблему технику. Используется встроенный исправный микрофон рекордера, без старого кабеля. Это учебная репетиция, а не состоявшийся звонок._

- **Рэй:** Use the recorder's own mic. — Используй встроенный микрофон рекордера. _(recorder/neutral)_

**Фразы для произнесения:**

1. The microphone isn't working properly. — Микрофон работает неправильно.
2. There is a buzzing noise on the recording. — На записи слышен гул.
3. The small light by the door is flashing. — Маленький индикатор у двери мигает.
4. Could you check the connection? — Не могли бы вы проверить соединение?

_Итог занятия:_

- **Рэй:** Specific. That helps. — Конкретно. Это поможет. _(recorder/happy)_

### Занятие 7. Быстрый круг (беглость)

**Место:** room17

_Команда сверяет фото индикатора, фрагмент прежней записи и три строки заметки. На фото комнаты видна пустая стена: эхо осталось, хотя кабель уже отключён._

- **Айрис:** Match each observation to its source. Then we can send the request. — Сопоставь каждое наблюдение с его источником. Потом отправим заявку. _(notebook/focused)_

_Материал для быстрого круга: шум — аудиопроба; мигание — фото; эхо — заметка о голосах в комнате. Никакого повторного включения кабеля._

_Итог занятия:_

- **Мика:** Three observations. No dramatic headline. Ready. — Три наблюдения. Без драматичного заголовка. Готово. _(phone/happy)_

### Занятие 8. Миссия: понятная заявка (беглость · миссия)

**Место:** room17

**Сцена** · С чего начать проверку

_В заявке уже есть номер комнаты, оба симптома оборудования и отдельная заметка об эхе. Рэй предлагает указать удобный порядок проверки; это не исключает вторую неполадку._

- **Рэй:** Cable or light first? — Сначала кабель или индикатор? _(recorder/listening)_

Выбор намерения:
- _Попросить сначала проверить шум микрофона_ → «Please check the microphone noise first.» / «Could you start with the buzzing microphone?»
 - **Рэй:** Sound first. Light stays listed. — Сначала звук. Индикатор остаётся в списке. _(recorder/neutral)_ · флаг `u006_check_sound_first`
- _Попросить сначала проверить мигающий индикатор_ → «Please check the flashing light first.» / «Could you start with the recording light?»
 - **Мика:** Light first. And we still need the microphone checked. — Сначала индикатор. И микрофон всё равно нужно проверить. _(phone/focused)_ · флаг `u006_check_light_first`

Если ответ непонятен:
- **Рэй:** Which one first? Both stay. — Что первым? Оба остаются. _(listening)_

**Сцена** · Отдельное примечание

_Айрис просит добавить уточнение: что команда уже сделала или какая проблема останется после проверки техники._

- **Айрис:** One more detail. What should the technician know? — Ещё одна деталь. Что должен знать техник? _(notebook/thinking)_

Выбор намерения:
- _Сказать, что старый кабель оставлен отключённым_ → «We are leaving the old cable unplugged.» / «The old microphone cable is unplugged now.»
 - **Айрис:** Added. They can bring a replacement for the test. — Добавила. Можно будет принести замену для проверки. _(notebook/focused)_
- _Сказать, что в комнате также слышно эхо_ → «Our voices are echoing in the room.» / «There is also an echo when we speak.»
 - **Айрис:** Added. A working cable won't change an empty wall. — Добавила. Исправный кабель не изменит пустую стену. _(notebook/focused)_

Если ответ непонятен:
- **Айрис:** The cable's current state, or the echo? — Текущее состояние кабеля или эхо? _(listening)_

_Общее продолжение: в итоговой заявке в любом случае остаются все три наблюдения и отметка об отключённом кабеле. Второй выбор определяет только произнесённое уточнение и ответ Айрис; отдельного воспоминания не создаёт._

_Итог занятия:_

- **Мика:** Sent. Now we ask for a visit, not a miracle. — Отправлено. Теперь просим о визите, а не о чуде. _(phone/happy)_
- **Рэй:** Keep the old cable aside. — Старый кабель пока отложим. _(recorder/neutral)_

**Изменение истории:** заявка отправлена. Порядок проверки сохранён. Старый кабель выведен из использования; причины неполадок ещё не установлены.

---

## Юнит 007. Договориться о помощи

**Цель:** Вежливо попросить о помощи, предложить посильную задачу и уточнить границы договорённости.

**Итог юнита:** Алекс проверил оборудование в выбранном порядке, заменил неисправный микрофонный кабель и батарейки индикатора. Команда получила разрешение пользоваться комплектом; забронированные предметы доставлены в комнату 17. Расстановка ещё не выбрана.

**Выражения юнита:** Can you…?; Could you…?; Would you mind…-ing?; Shall I…?; I'll…; Could we…?; Sure, I can; Sorry, I can't… because…; let someone in; give someone a hand; bring something; move something together.

### Занятие 1. Когда техник может прийти (понимание)

**Место:** student_office

_Вторник, 12:10. Мика показывает игроку ответ на вчерашнюю заявку. Айрис присоединяется после утренних семинаров; Рэй зайдёт на короткое согласование до лаборатории. Новый общий час не придумывают: проверяют уже существующую среду, 13:00._

- **Мика:** We have a reply! Wednesday at one. That is actually our time. — Нам ответили! Среда, час. Как раз наше время. _(phone/happy)_
- **Айрис:** Read what Alex can do before we add three more requests. — Прочитай, что Алекс может сделать, прежде чем добавлять ещё три просьбы. _(notebook/focused)_

**Чтение: «Room 17 — equipment check»** (ответ по заявке, 88 слов)

> Hello, Room 17 team,
>
> I can visit on Wednesday at 13:00. Could someone let me in and show me the equipment? Please leave the old microphone cable unplugged. I'll bring a replacement cable and batteries for the recording light.
>
> I can check the equipment and the power supply, but I can't put up shelves during this visit. After the check, you can collect your reserved furniture. There is a small trolley at the equipment desk. Please move the shelf together and keep the door clear.
>
> Alex, academy technician

_Перевод:_ Здравствуйте, команда комнаты 17! Я могу прийти в среду в 13:00. Может кто-нибудь впустить меня и показать оборудование? Пожалуйста, оставьте старый микрофонный кабель отключённым. Я принесу кабель для замены и батарейки для индикатора записи. Могу проверить оборудование и питание, но не смогу устанавливать полки во время этого визита. После проверки можно забрать забронированную мебель. В пункте выдачи есть маленькая тележка. Пожалуйста, переносите полку вдвоём и не загромождайте дверь. Алекс, техник академии.

1. When can Alex visit? — варианты: Tuesday at 14:00 / Wednesday at 13:00 / Wednesday at 15:00; верно: Wednesday at 13:00.
2. What does Alex need someone to do? — варианты: Let Alex in and show the equipment / Buy a new shelf / Record a guide page; верно: Let Alex in and show the equipment.
3. What is outside this visit's tasks? — варианты: Checking the power supply / Bringing a replacement cable / Putting up shelves; верно: Putting up shelves.
4. When can the team collect the furniture? — варианты: Before the check / After the check / Only next month; верно: After the check.

_Итог занятия:_

- **Айрис:** A visit has a time and a limit. Both are useful. — У визита есть время и границы. И то и другое полезно. _(notebook/dry_smile)_

### Занятие 2. Кто что может (понимание)

**Место:** student_office

_В общем чате «Room 17» лежат две короткие заметки, записанные для распределения задач. В обоих случаях речь о предстоящей среде, не о том, что помощь уже оказана._

- **Мика:** Listen before we put names next to jobs. — Сначала послушаем, потом впишем имена рядом с задачами. _(phone/focused)_

**Аудирование 1: предложение Мики** (34 слова)

- **Мика:** I can meet Alex at the door at one. Could someone keep the repair request open on their phone? After the check, I'll bring the trolley. We need two people to move the shelf. — Я могу встретить Алекса у двери в час. Кто-нибудь может держать заявку открытой на телефоне? После проверки я привезу тележку. Чтобы перевезти полку, нужны двое. _(phone/neutral)_

1. What can Mika do at one? — варианты: Meet Alex / Put up a shelf / Leave for the city; верно: Meet Alex.
2. How many people should move the shelf? — варианты: One / Two / Five; верно: Two.

**Аудирование 2: предложение Айрис** (30 слов)

- **Айрис:** I'll bring the borrowing sheet and clear the writing table. I can help move light boxes, but I can't carry the shelf alone. Would you mind keeping the doorway clear? — Я принесу лист выдачи и освобожу письменный стол. Могу помочь перенести лёгкие коробки, но не могу нести полку одна. Не мог бы ты оставить дверной проём свободным? _(neutral)_

1. What can't Iris do alone? — варианты: Bring the sheet / Clear the table / Carry the shelf; верно: Carry the shelf.

**Диктант** · Просьба команды

- **Айрис:** Would you mind keeping the doorway clear? — Не мог бы ты оставить дверной проём свободным? _(neutral)_

_Итог занятия:_

- **Рэй:** Ask first. Assign second. — Сначала спросить. Потом распределять. _(neutral)_

### Занятие 3. Попросить конкретно (форма)

**Место:** student_office

_Айрис делает короткую карточку просьб: один адресат, одно понятное действие. Просьбы репетируются, оборудование пока никто не перемещает._

- **Айрис:** A polite request still needs a clear action. — Даже вежливой просьбе нужно понятное действие. _(notebook/focused)_

**Материал для заданий:**

1. Can you bring the borrowing sheet? — Можешь принести лист выдачи?
2. Could you check the microphone cable? — Не могли бы вы проверить микрофонный кабель?
3. Would you mind opening the door? — Не мог бы ты открыть дверь?
4. Would you mind keeping this space clear? — Не мог бы ты оставить это место свободным?
5. Could we borrow the small trolley? — Можно нам взять маленькую тележку?
6. Can you give me a hand with these boxes? — Можешь помочь мне с этими коробками?
7. Could you show us where the panels go? — Не могли бы вы показать, куда поставить панели?

_Редактору: после Would you mind требуется -ing. Не вводить схему «Sure = да» для всех просьб: краткий ответ на Would you mind контекстно двусмыслен; в принимаемых ответах лучше полное “Of course, I'll open it” / «Конечно, открою»._

_Итог занятия:_

- **Айрис:** Now nobody has to guess what “help” means. — Теперь никому не нужно угадывать, что значит «помочь». _(notebook/focused)_

### Занятие 4. Предложить и отказаться (форма)

**Место:** student_office

_Мика распределяет ещё не выполненные задачи на среду. У каждой есть реальное время; отказ от одной задачи не означает отказ от всей команды._

- **Мика:** You can say what you can do. And what you can't. I need both. — Можно сказать, что ты можешь сделать. И чего не можешь. Мне нужно и то и другое. _(phone/thinking)_

**Материал для заданий:**

1. Shall I meet Alex at the door? — Мне встретить Алекса у двери?
2. I'll bring the trolley after the check. — Я привезу тележку после проверки.
3. Shall I clear the table first? — Мне сначала освободить стол?
4. Sure, I can help with the boxes. — Конечно, могу помочь с коробками.
5. Sorry, I can't carry the shelf alone because it's too heavy. — Прости, я не могу нести полку один, потому что она слишком тяжёлая.
6. I can hold the door instead. — Вместо этого я могу подержать дверь.
7. I'll help you move it together. — Я помогу тебе перевезти её вдвоём.
8. Could we do that after the equipment check? — Можно сделать это после проверки оборудования?

_Итог занятия:_

- **Мика:** A smaller promise I can actually put on the list. Useful. — Небольшое обещание, которое можно действительно внести в список. Полезно. _(phone/happy)_

### Занятие 5. Выбрать свою задачу (продукция)

**Место:** student_office

**Сцена** · Помочь так, как можешь

_Две реальные задачи на среду ещё свободны. Игрок выбирает одну. Во второй задаче его заменит Мика; роли показаны явно._

- **Мика:** Can you handle one of these? Meeting Alex, or keeping the list during the check? — Возьмёшь что-то одно? Встретить Алекса или вести список во время проверки? _(phone/thinking)_

Выбор намерения:
- _Предложить встретить техника_ → «I'll meet Alex at the door.» / «Shall I let Alex in at one?»
 - **Мика:** Thanks. I'll keep the request open and note the results. — Спасибо. Я открою заявку и запишу результаты. _(phone/focused)_ · флаг `u007_role_door`
- _Предложить вести список и попросить Мику встретить техника_ → «I'll keep the list. Could you meet Alex?» / «Can you let Alex in? I'll write down the results.»
 - **Мика:** Sure. I'll meet Alex, and you'll keep the list. — Конечно. Я встречу Алекса, а ты будешь вести список. _(phone/focused)_ · флаг `u007_role_notes`

Если ответ непонятен:
- **Мика:** Which task would you like: the door or the list? — Какую задачу ты выбираешь: дверь или список? _(thinking)_

_Итог занятия:_

- **Айрис:** One name per task. Two people are no longer both “doing everything”. — На каждую задачу по имени. Два человека больше не «делают всё» одновременно. _(notebook/dry_smile)_

### Занятие 6. Голосом (продукция)

**Место:** student_office

_Игрок репетирует просьбы для встречи и перемещения мебели. Это ещё не разговор с техником._

- **Рэй:** Requests for tomorrow. Try them. — Просьбы на завтра. Попробуй. _(listening)_

**Фразы для произнесения:**

1. Could you check this cable, please? — Не могли бы вы проверить этот кабель?
2. Would you mind holding the door? — Не мог бы ты подержать дверь?
3. Shall I bring the trolley? — Мне привезти тележку?
4. I can't move the shelf alone, but I can help you. — Я не могу перевезти полку один, но могу тебе помочь.

_Итог занятия:_

- **Рэй:** Clear requests. No guessing. — Понятные просьбы. Без угадывания. _(happy)_

### Занятие 7. Быстрый круг (беглость)

**Место:** student_office

_Перед отправкой подтверждения Мика показывает список: среда, 13:00; роли игрока и Мики; техника проверяют до выдачи мебели._

- **Мика:** Last check. Does every job have a person, and every request an answer? — Последняя проверка. У каждой задачи есть исполнитель, а у каждой просьбы — ответ? _(phone/focused)_

_Материал для быстрого круга: вежливая просьба → полное согласие либо отказ с причиной и посильной альтернативой. Канонические роли берутся из принятого выбора занятия 5._

_Итог занятия:_

- **Мика:** Confirmed for Wednesday at one. Same hour, a different plan. — Подтвердили среду, час дня. Тот же час, другой план. _(phone/happy)_

### Занятие 8. Миссия: помощь по договорённости (беглость · миссия)

**Место:** room17

**Сцена** · Проверка

_Среда третьей недели, ровно 13:00. Алекс приходит в комнату 17. При `u007_role_door` игрок впускает техника, Мика открывает заявку и ведёт список. При `u007_role_notes` Мика впускает техника, игрок открывает список на телефоне. Это выполнение выбранной задачи, не новый выбор._

- **Алекс (второстепенный):** Hello. Could you show me which problem you want checked first? — Здравствуйте. Покажете, какую проблему вы хотите проверить первой? _(neutral)_

_Возврат выбора 006: при `u006_check_sound_first` Рэй показывает отключённый кабель; при `u006_check_light_first` Мика указывает индикатор. Алекс реально проверяет их в таком порядке. Игрок выбирает дополнительную просьбу, не отменяющую сохранённый порядок._

Выбор намерения:
- _Попросить объяснить результат проверки_ → «Could you explain what you find?» / «Can you tell us what the problem is?»
 - **Алекс (второстепенный):** Of course. I'll explain each result before we move on. — Конечно. Объясню каждый результат, прежде чем двигаться дальше. _(neutral)_
- _Попросить проверить также питание_ → «Could you check the power supply too?» / «Can you also check the socket we use?»
 - **Алекс (второстепенный):** Yes. That is part of the check. I'll include the result in your notes. — Да. Это часть проверки. Я добавлю результат в ваши заметки. _(neutral)_

Если ответ непонятен:
- **Алекс (второстепенный):** Do you want an explanation, or an extra check? — Вы хотите объяснение или дополнительную проверку? _(neutral)_

_После принятого ответа — общая последовательность результатов ниже. Два первых результата выводятся в порядке, заданном в 006; проверка питания проводится в обоих вариантах._

- **Алекс (второстепенный):** The microphone cable has a faulty connector. I'll replace the cable. — У микрофонного кабеля неисправен разъём. Заменю кабель. _(neutral)_
- **Алекс (второстепенный):** This small light runs on batteries. They are low. I'll replace them. — Этот маленький индикатор работает от батареек. Они садятся. Заменю их. _(neutral)_
- **Алекс (второстепенный):** The socket and power supply are working normally. The echo needs a different solution. — Розетка и питание работают нормально. Для эха нужно другое решение. _(neutral)_
- **Рэй:** So, not the whole building. — Значит, не всё здание. _(deadpan)_
- **Алекс (второстепенный):** Put the soft panels around the recording corner. Leave space to walk. — Поставьте мягкие панели вокруг угла записи. Оставьте место для прохода. _(neutral)_

_Алекс заменяет кабель и батарейки, проверяет пробу и отмечает выдачу. Узкая полка из брони — напольная, сборки и крепления к стене не требует. Техник не устанавливает новую мебель и не обещает полностью убрать эхо._

**Сцена** · Тележка у двери

_Около 13:15. Алекс закончил визит и ушёл. Мика привезла тележку из пункта выдачи, Рэй идёт с игроком к уже отмеченным предметам; Айрис остаётся подписать опись и освободить место в комнате. Пункт выдачи близко, на том же этаже._

- **Рэй:** Shelf first. Need a hand? — Сначала полка. Нужна помощь? _(neutral)_

Выбор намерения:
- _Попросить Рэй помочь поставить полку на тележку_ → «Could you help me put the shelf on the trolley?» / «Can we move the shelf onto the trolley together?»
 - **Рэй:** Yes. One side each. — Да. Каждому по стороне. _(focused)_
- _Предложить держать тележку и попросить Мику помочь Рэй_ → «I'll hold the trolley. Could you help Rei with the shelf, Mika?» / «Can you two lift the shelf? I'll keep the trolley still.»
 - **Мика:** Sure. You hold it steady; we'll lift together. — Конечно. Ты придерживаешь, мы поднимаем вдвоём. _(focused)_

Если ответ непонятен:
- **Рэй:** Helping lift, or holding the trolley? — Помогаешь поднять или держишь тележку? _(listening)_

_Обе ветки исполняются по принятому ответу. Затем команда тем же способом перевозит стул и панели, освобождает дверной проём и возвращает тележку. Опись у Айрис; все предметы остаются собственностью академии._

_Итог занятия:_

- **Айрис:** Four borrowed items, one working microphone, and a clear doorway. — Четыре взятых предмета, один работающий микрофон и свободный дверной проём. _(notebook/focused)_
- **Мика:** Now we can argue about where everything goes. — Теперь можно спорить о том, куда всё поставить. _(happy)_
- **Рэй:** Quietly. — Тихо. _(deadpan)_

**Изменение истории:** техника проверена, кабель и батарейки заменены, мебель получена по описи. Игрок выполнил выбранную задачу; все остальные обязанности распределены явно. Гул устранён, эхо пока остаётся.

---

## Юнит 008. Рассказать о предпочтениях

**Цель:** Высказать предпочтение, объяснить его и договориться о варианте, учитывающем остальных.

**Итог юнита:** Комната 17 обустроена для работы вчетвером. Угол записи закрыт мягкими панелями, письменный стол стоит в выбранном игроком месте, коробки убраны на напольную полку, четвёртый стул свободен. Короткая проверка подтверждает: гул исчез, эха стало меньше. Карточка проверенного маршрута добавлена в локальный черновик гида.

**Выражения юнита:** like working; love planning; prefer writing; prefer…to…; I'd rather…; I'd prefer…; a small old lamp; a narrow wooden shelf; a quiet corner; enough room; leave space for; How about…?

### Занятие 1. Четыре человека, одна комната (понимание)

**Место:** room17

_Та же среда, около 13:20. Мебель внутри, но пока стоит у свободной стены. У команды сорок минут до конца обычной встречи. Айрис записала пожелания, прежде чем кто-нибудь начал всё двигать._

- **Мика:** I want the board where people can see it. Otherwise it is a secret plan. — Хочу доску там, где её видно. Иначе получится тайный план. _(phone/thinking)_
- **Рэй:** I want less echo. — Я хочу меньше эха. _(neutral)_
- **Айрис:** And somewhere to put a sentence down without moving a microphone. — А я — место, где можно записать предложение, не переставляя микрофон. _(notebook/dry_smile)_

**Чтение: «Room 17 — what we need»** (общая заметка, 95 слов)

> Mika likes planning with everyone around one table. She would prefer a clear board near the entrance, so nobody misses the next meeting.
>
> Rei prefers recording in a quiet corner to recording beside the door. The two soft panels can stand near the inside wall, away from the entrance.
>
> Iris likes writing with enough room for her notebook. She can work by the window or against the other wall. The narrow wooden shelf can hold the boxes.
>
> We also need a fourth chair, a clear doorway and space to walk between the two work areas.

_Перевод:_ Мика любит планировать, когда все сидят за одним столом. Она предпочла бы хорошо видимую доску рядом со входом, чтобы никто не пропустил следующую встречу. Рэй предпочитает записывать в тихом углу, а не возле двери. Две мягкие панели можно поставить у внутренней стены, подальше от входа. Айрис любит писать, когда хватает места для блокнота. Она может работать у окна или у другой стены. Узкая деревянная полка подойдёт для коробок. Также нам нужны четвёртый стул, свободный дверной проём и проход между двумя рабочими зонами.

1. Why does Mika want the board near the entrance? — варианты: To hide the plan / So people see meeting information / To cover the window; верно: So people see meeting information.
2. Where would Rei prefer to record? — варианты: Beside the door / In a quiet corner / In the corridor; верно: In a quiet corner.
3. Which two places could work for Iris? — варианты: By the window or against the other wall / In the doorway or outside / Only beside the microphone; верно: By the window or against the other wall.
4. What must stay clear? — варианты: The shelf / The doorway / The board; верно: The doorway.

_Итог занятия:_

- **Айрис:** Two possible desk positions. Neither is a personal insult. — Два возможных места для стола. Ни одно не является личным оскорблением. _(notebook/dry_smile)_

### Занятие 2. Что важнее в расстановке (понимание)

**Место:** room17

_Мика сохраняет в общий чат «Room 17» две короткие записи с пожеланиями. Они помогут свериться при перестановке; никто не отправляет личное приглашение._

- **Мика:** Let's record the reasons too. Arrows on a plan don't explain everything. — Запишем и причины. Стрелки на плане объясняют не всё. _(phone/focused)_

**Аудирование 1: предложение Мики** (35 слов)

- **Мика:** I like working around one table. I'd prefer the board near the door, where everyone can read it. The photo can wait until we're finished. I don't want a pretty room that nobody can use. — Мне нравится работать всем за одним столом. Я предпочла бы доску рядом с дверью, чтобы все могли её прочитать. Фото подождёт до конца. Мне не нужна красивая комната, которой невозможно пользоваться. _(phone/neutral)_

1. When does Mika want to take the photo? — варианты: Before moving anything / When the room is finished / During the equipment check; верно: When the room is finished.

**Аудирование 2: предложение Айрис** (35 слов)

- **Айрис:** I'd rather keep the writing table separate from the recording corner. I like writing by the window, but the other wall works too. We need enough room for four people, not just for my notebook. — Я предпочла бы держать письменный стол отдельно от угла записи. Мне нравится писать у окна, но другая стена тоже подходит. Нам нужно место для четырёх человек, а не только для моего блокнота. _(neutral)_

1. What would Iris rather keep separate? — варианты: The shelf and the boxes / The writing table and recording corner / The chair and the window; верно: The writing table and recording corner.
2. Does Iris accept only the window position? — варианты: Yes / No / She does not mention the window; верно: No.

**Диктант** · Пожелание к расстановке

- **Айрис:** I'd rather keep the doorway clear. — Я предпочла бы оставить дверной проём свободным. _(neutral)_

_Итог занятия:_

- **Рэй:** Pretty can stay. Echo can't. — Красоту оставим. Эхо — нет. _(smirk)_

### Занятие 3. Что нравится и что предпочитаешь (форма)

**Место:** room17

_На двух бумажных вариантах плана пока только стрелки. Айрис добавляет короткие объяснения предпочтений._

- **Айрис:** Say what you prefer. “Fine” doesn't tell us which plan to use. — Скажи, что предпочитаешь. «Нормально» не объясняет, какой план выбрать. _(notebook/thinking)_

**Материал для заданий:**

1. Mika likes working around one table. — Мике нравится работать всем за одним столом.
2. She loves planning with the team. — Она любит планировать вместе с командой.
3. Rei prefers recording away from the door. — Рэй предпочитает записывать подальше от двери.
4. Iris prefers writing at a separate table. — Айрис предпочитает писать за отдельным столом.
5. I prefer sitting by the wall to sitting in the doorway. — Я предпочитаю сидеть у стены, а не в дверном проёме.
6. I'd rather move the table than block the door. — Я лучше передвину стол, чем загорожу дверь.
7. I'd prefer to keep the shelf near the table. — Я предпочёл бы оставить полку рядом со столом.
8. How about moving the boxes onto the shelf? — Как насчёт того, чтобы убрать коробки на полку?

_Редактору: like / love / prefer + -ing; prefer A to B; would rather + базовая форма; would prefer + to-infinitive. Это разные конструкции. Пример от первого лица — тренировочный, не каноническое предпочтение игрока до выбора._

_Итог занятия:_

- **Айрис:** A preference and a reason. Now we can compare plans. — Предпочтение и причина. Теперь можно сравнивать планы. _(notebook/focused)_

### Занятие 4. Какую именно полку (форма)

**Место:** room17

_На полку нужно убрать коробки. Айрис подписывает схему, чтобы «эта штука» не означала три разных предмета. Маленькая старая лампа уже была в комнате: её не покупали в этом модуле._

- **Мика:** We have three things called “that thing”. Let's give them better names. — У нас три предмета называются «та штука». Дадим им имена получше. _(phone/thinking)_

**Материал для заданий:**

1. There is a small old lamp on the table. — На столе стоит маленькая старая лампа.
2. We can put the boxes on the narrow wooden shelf. — Можно поставить коробки на узкую деревянную полку.
3. The two soft grey panels go near the inside wall. — Две мягкие серые панели встанут у внутренней стены.
4. We need a clear space beside the door. — Нам нужно свободное место рядом с дверью.
5. There is a spare black chair for the fourth person. — Для четвёртого человека есть свободный чёрный стул.
6. I'd prefer a quiet recording corner to a large empty space. — Я предпочёл бы тихий угол записи большому пустому пространству.
7. A small white card can show the way to the equipment desk. — Маленькая белая карточка может показывать путь к пункту выдачи.

_Редактору: достаточно сочетаний размера, возраста, цвета и материала из этих строк. Не расширять урок до полного теоретического списка порядка всех английских прилагательных._

_Итог занятия:_

- **Рэй:** The shelf now has a name. — Теперь у полки есть название. _(deadpan)_

### Занятие 5. Предложить расстановку (продукция)

**Место:** room17

**Сцена** · Два рабочих варианта

_На плане в обоих вариантах есть тихий угол у внутренней стены, доска рядом со входом и свободный проход. Отличается место письменного стола. Игрок выбирает его сейчас; в финале мебель действительно поставят по выбранному варианту._

- **Мика:** Window or wall for the writing table? Both leave the door clear. — Письменный стол у окна или у стены? Оба варианта оставляют дверь свободной. _(phone/thinking)_

Выбор намерения:
- _Выбрать письменный стол у окна_ → «I'd prefer the writing table by the window.» / «I like working by the window. Let's put the table there.»
 - **Айрис:** Window it is. The shelf can stand beside it. — Значит, у окна. Полка встанет рядом. _(notebook/focused)_ · флаг `u008_layout_window`
- _Выбрать письменный стол у другой стены_ → «I'd rather put the writing table against the other wall.» / «I prefer working by the wall. Can the table go there?»
 - **Айрис:** That works. We'll leave the window area open. — Подходит. Место у окна оставим свободным. _(notebook/focused)_ · флаг `u008_layout_wall`

Если ответ непонятен:
- **Мика:** Which place would you prefer for the writing table? — Какое место ты предпочитаешь для письменного стола? _(thinking)_

_Итог занятия:_

- **Рэй:** Recording corner stays over here. — Угол записи остаётся здесь. _(neutral)_

_Она указывает внутреннюю стену. Выбор стола не отнимает рабочее место у Рэй и не оценивает, кто из героинь «важнее»._

### Занятие 6. Голосом (продукция)

**Место:** room17

_Перед перестановкой игрок пробует вслух объяснить выбранный план. Для второй строки берётся только его сохранённый вариант. Остальные строки общие._

- **Айрис:** Explain the plan before we move the furniture. Less lifting that way. — Объясни план, прежде чем двигать мебель. Так придётся меньше таскать. _(notebook/dry_smile)_

**Фразы для произнесения:**

1. I'd rather keep the doorway clear. — Я предпочёл бы оставить дверной проём свободным.
2. При `u008_layout_window`: I'd prefer the writing table by the window. — Я предпочёл бы письменный стол у окна. При `u008_layout_wall`: I'd rather put the writing table against the other wall. — Я лучше поставлю письменный стол у другой стены.
3. The narrow wooden shelf can hold the boxes. — На узкой деревянной полке можно разместить коробки.
4. Let's leave enough room between the work areas. — Оставим достаточно места между рабочими зонами.

_Итог занятия:_

- **Мика:** Good. We can all point to our own bit of the plan. — Хорошо. Каждый может показать свою часть плана. _(happy)_

### Занятие 7. Проверка модуля 005–008 (беглость · проверка модуля)

**Место:** room17

_Айрис достаёт новую учебную карточку. Это вымышленная ситуация другого клуба, а не сообщение о новых поломках комнаты 17. Проверка не создаёт сюжетных событий и не ставит новые флаги._

- **Айрис:** A different club, a different room. Use the same skills. — Другой клуб, другая комната. Используй те же навыки. _(notebook/focused)_

**Чтение: «Art club — Room 24»** (новая учебная карточка, 73 слова)

> The art club is in Room 24 on the ground floor of the New Building. It is opposite the lift, between a classroom and a small office. Today the desk lamp is making a noise, so it is switched off. The club prefers drawing by the window. They need help moving a narrow wooden table there. Please keep the door clear. There are two spare chairs beside the office if anyone needs them.

_Перевод:_ Художественный клуб находится в кабинете 24 на первом этаже нового корпуса. Он напротив лифта, между аудиторией и маленьким офисом. Сегодня настольная лампа шумит, поэтому она выключена. Участники клуба предпочитают рисовать у окна. Им нужна помощь: передвинуть туда узкий деревянный стол. Пожалуйста, оставьте дверь свободной. Возле офиса есть два свободных стула, если кому-нибудь нужны.

1. Where is Room 24? — варианты: Upstairs in the Old Building / Opposite the lift on the ground floor / At the end of the courtyard; верно: Opposite the lift on the ground floor.
2. What is the problem with the lamp? — варианты: It is making a noise / It is missing / It is too small; верно: It is making a noise.
3. Where does the club prefer to draw? — варианты: In the corridor / By the window / Beside the door; верно: By the window.

**Аудирование: учебное сообщение Айрис** (33 слова)

- **Айрис:** Could you help the art club after lunch? They need two people to move the table. If you can't lift it, you can hold the door. Please don't turn the noisy lamp on. — Можешь помочь художественному клубу после обеда? Нужны двое, чтобы передвинуть стол. Если не можешь поднимать, можно подержать дверь. Пожалуйста, не включай шумящую лампу. _(neutral)_

1. What help is possible without lifting? — варианты: Holding the door / Turning on the lamp / Taking the table away; верно: Holding the door.

**Короткие задания на перенос навыка** · учебная репетиция, не ещё одна сюжетная миссия:

- Объяснить, где кабинет: принимается «Room 24 is opposite the lift on the ground floor.» / «It's on the ground floor, between a classroom and a small office.» — «Кабинет 24 напротив лифта на первом этаже» / «Он на первом этаже, между аудиторией и маленьким офисом».
- Описать неполадку: «The desk lamp is making a noise.» / «Something is wrong with the desk lamp. It's making a noise.» — «Настольная лампа шумит» / «С настольной лампой что-то не так. Она шумит».
- Попросить о помощи: «Could you help us move the table?» / «Would you mind holding the door?» — «Не мог бы ты помочь нам передвинуть стол?» / «Не мог бы ты подержать дверь?».
- Назвать предпочтение клуба: «They prefer drawing by the window.» / «They'd rather draw by the window.» — «Они предпочитают рисовать у окна» / «Они лучше будут рисовать у окна».

_При непонятном ответе:_

- **Айрис:** Which part are you explaining: the place, the problem, the help, or the preference? — Какую часть ты объясняешь: место, проблему, помощь или предпочтение? _(listening)_

_Итог занятия:_

- **Айрис:** New room, familiar skills. Back to ours. — Новая комната, знакомые навыки. Вернёмся к нашей. _(notebook/focused)_

### Занятие 8. Миссия: комната, которой можно пользоваться (беглость · миссия)

**Место:** room17

**Сцена** · Что делать первым

_Около 13:40. Бумажный план выбран, техника исправна, мебель ещё можно передвинуть. Задачи небольшие: поставить панели, передвинуть стол вдвоём, убрать коробки на полку. Все решения уже согласованы; игрок выбирает порядок работы, а не право отменить чужое рабочее место._

- **Мика:** Plan agreed. What would you rather start with? — План согласован. С чего ты предпочёл бы начать? _(focused)_

Выбор намерения:
- _Сначала подготовить угол записи_ → «I'd rather put the soft panels in place first.» / «Let's start with the quiet recording corner.»
 - **Рэй:** Panels first. I'll show you. — Сначала панели. Я покажу. _(focused)_ · флаг `u008_setup_sound_first`
- _Сначала освободить письменный стол_ → «I'd prefer to clear the writing table first.» / «Let's put the boxes on the shelf first.»
 - **Айрис:** Table first. These boxes go on the shelf. — Сначала стол. Эти коробки — на полку. _(notebook/focused)_ · флаг `u008_setup_table_first`

Если ответ непонятен:
- **Мика:** The recording corner or the writing table first? — Сначала угол записи или письменный стол? _(thinking)_

_Последовательность действий соответствует выбору. При `u008_setup_sound_first` игрок помогает Рэй поставить панели, затем вместе с Микой передвигает стол, пока Айрис убирает коробки. При `u008_setup_table_first` игрок и Мика сначала передвигают стол, Айрис убирает коробки; затем игрок помогает Рэй с панелями. В обоих случаях стол стоит у окна при `u008_layout_window`, у другой стены при `u008_layout_wall`. Напольная полка стоит рядом со столом; проход свободен. Четвёртый стул теперь действительно можно занять._

- **Мика:** Four chairs. All available for actual people. — Четыре стула. Все доступны настоящим людям. _(happy)_
- **Рэй:** Try one normal sentence. — Попробуй одно обычное предложение. _(recorder/listening)_

_Игрок читает выбранную строку маршрута из 005. Исправный кабель не гудит. На новой пробе эхо меньше, хотя комната не стала профессиональной студией._

- **Рэй:** Less echo. No buzz. Better. — Меньше эха. Без гула. Лучше. _(recorder/happy)_

**Сцена** · Карточка, которую можно проверить

_Около 13:55. Айрис прикрепляет выбранную карточку маршрута рядом с общей таблицей на среду. Её первая строка зависит от 005, а не выбирается заново._

_При `u005_route_building` карточка начинается: “The equipment desk is on the ground floor of the Old Building.” — «Пункт выдачи на первом этаже старого корпуса». Далее: “Find it between the stairs and the noticeboard, at the end of the corridor.” — «Он между лестницей и доской объявлений, в конце коридора»._

_При `u005_route_landmarks` карточка начинается: “In the Old Building, find the stairs and the noticeboard.” — «В старом корпусе найди лестницу и доску объявлений». Далее: “The equipment desk is between them, on the ground floor, at the end of the corridor.” — «Пункт выдачи между ними, на первом этаже, в конце коридора»._

- **Айрис:** The route is checked. What reminder should go underneath? — Маршрут проверен. Какую памятку добавить снизу? _(notebook/thinking)_

Выбор намерения:
- _Напомнить, что вещи сначала нужно забронировать_ → «Please reserve the furniture before you collect it.» / «Write your room number on the borrowing sheet first.»
 - **Айрис:** Reservation first. I'll add that below the route. — Сначала бронь. Добавлю под маршрутом. _(notebook/focused)_ · флаг `u008_card_reservation`
- _Напомнить, что нужно сверять наклейки_ → «Please check the green labels before taking anything.» / «Only take furniture with a green label.»
 - **Мика:** Labels first. Much better than “take whatever looks nice”. — Сначала наклейки. Лучше, чем «берите всё красивое». _(phone/happy)_ · флаг `u008_card_labels`

Если ответ непонятен:
- **Айрис:** The reservation or the labels? Which reminder do you want to add? — Бронь или наклейки? Какую памятку ты хочешь добавить? _(listening)_

_На полной странице остаются оба правила выдачи; выбранное игроком вынесено отдельной строкой на видимой короткой карточке. Рэй сохраняет маршрут в локальную сборку. Мика делает для общего чата фото комнаты без людей; в кадре нет имён на документах._

**Чат «Room 17»** · После обустройства

- **Мика:** We can actually work in here now! Four chairs, no boxes in the doorway. — Теперь здесь правда можно работать! Четыре стула, никаких коробок в дверях. _(phone/happy)_
- **Айрис:** Room photo, no people. The table is finally visible. — Фото комнаты, без людей. Стол наконец-то видно. _(notebook/dry_smile)_

_Приложение: фото комнаты без людей. Место письменного стола соответствует `u008_layout_window` / `u008_layout_wall`. Если двух вариантов фото пока нет, использовать текстовую карточку с этим описанием, не показывать неверную расстановку._

_Итог занятия:_

- **Рэй:** Equipment off. Cable put away. — Оборудование выключено. Кабель убран. _(recorder/neutral)_
- **Мика:** Next meeting: that lunch I promised. We should ask what everyone actually wants. — Следующая встреча — тот обед, который я обещала. Стоит спросить, чего все действительно хотят. _(phone/thinking)_
- **Айрис:** Put your own answer on the list too. — Свой ответ тоже внеси в список. _(notebook/dry_smile)_
- **Мика:** Right. Four people. Four answers. — Точно. Четыре человека. Четыре ответа. _(happy)_

**Изменение истории:** рабочее место готово; вклад игрока виден в расстановке и карточке. Завершён модуль 005–008. Предложение обеда переходит в 009 без состоявшегося заказа, покупки или личного квеста раньше срока. Статус остаётся «знакомые».

---

# Страницы героинь — дополнения после модуля

Новые строки добавляются к существующим страницам, не заменяют старые. Основной текст здесь русский, как требует бриф. Английские версии для интерфейса и озвучки Claude может подготовить отдельно, не меняя условий.

## Мика

**Что ты о ней знаешь:**

- Для общей работы ей нужна хорошо видимая доска; красивое фото может подождать, пока комнатой действительно можно пользоваться. _(после юнита 008)_

**Общие воспоминания:**

- Перед визитом техника ты взял на себя встречу у двери, а Мика вела список результатов. _(юнит 007 завершён и флаг `u007_role_door`)_
- Перед визитом техника ты выбрал список результатов, а Мика встретила техника. Вы выполнили именно эти роли. _(юнит 007 завершён и флаг `u007_role_notes`)_

_Два воспоминания взаимоисключающие, это одна карточка с двумя вариантами текста._

## Рэй

**Что ты о ней знаешь:**

- Она предпочитает записывать подальше от двери; две мягкие панели для неё полезнее, чем пустой красивый угол. _(после юнита 008)_

**Общие воспоминания:**

- Ты предложил начать обустройство с угла записи. Вы с Рэй поставили панели, а затем освободили письменный стол. На пробе стало меньше эха. _(юнит 008 завершён и флаг `u008_setup_sound_first`)_
- Ты предложил сначала освободить письменный стол, а затем помог Рэй поставить панели. На пробе стало меньше эха. _(юнит 008 завершён и флаг `u008_setup_table_first`)_

_Это одна карточка с двумя вариантами. Она не приписывает игроку первый выбор во втором варианте._

## Айрис

**Что ты о ней знаешь:**

- Ей нужен отдельный письменный стол с местом для блокнота; она любит писать у окна, но принимает и другой удобный вариант. _(после юнита 008)_

**Общие воспоминания:**

- По твоему предложению письменный стол поставили у окна, а полку — рядом. Коробки наконец перестали занимать стул. _(юнит 008 завершён и флаг `u008_layout_window`)_
- По твоему предложению письменный стол поставили у другой стены, оставив место у окна свободным. Коробки убрали на полку рядом со столом. _(юнит 008 завершён и флаг `u008_layout_wall`)_

_Одна карточка, два взаимоисключающих варианта. Новое общее воспоминание не означает дружеского или романтического статуса._

# Флаги выборов и их возвраты

Все ключи ниже новые предложения для интеграции. Они не объявляются уже реализованными. Каждая строка таблицы — пара взаимоисключающих значений одного выбора; не требуются оба. Флаги фиксируются после принятого ответа, не после открытия сцены или ошибки.

| Флаги | Когда выбираются | Где выбор исполняется или возвращается |
|---|---|---|
| `u005_route_building` / `u005_route_landmarks` | 005, занятие 8, вторая сцена | Первая строка карты на доске после 005; реальное чтение и текст карточки в 008, занятие 8 |
| `u006_check_sound_first` / `u006_check_light_first` | 006, занятие 8, первая сцена | В 007, занятие 8, Алекс действительно начинает с выбранного прибора; оба результата обязательны |
| `u007_role_door` / `u007_role_notes` | 007, занятие 5 | В 007, занятие 8, игрок встречает техника или ведёт список; соответствующая карточка Мики после завершения юнита |
| `u008_layout_window` / `u008_layout_wall` | 008, занятие 5 | Вариант голосовой фразы занятия 6; перестановка, итоговая ремарка и карточка Айрис в занятии 8; описание/фото общего чата |
| `u008_setup_sound_first` / `u008_setup_table_first` | 008, занятие 8, первая сцена | Реальный порядок перестановки и соответствующая карточка Рэй после миссии |
| `u008_card_reservation` / `u008_card_labels` | 008, занятие 8, вторая сцена | Выделенная памятка на короткой маршрутной карточке и в локальном гиде; полная страница сохраняет оба правила |

Остальные выборы меняют текущую реакцию или распределение действий в текущей сцене и не требуют долговременных флагов. Например, способ помочь с полкой исполняется сразу и не превращается в отдельную награду за отношения.

## События завершения — не подменять ими выбор

Использовать штатные события завершения юнитов, если они существуют. Приведённые ниже названия описательные, новых программных ключей не требуют:

- После 005: вещи забронированы, маршрут проверен; предметы ещё не в комнате.
- После 006: заявка отправлена, кабель отключён; ремонт ещё не состоялся.
- После 007: выбранная роль исполнена, оборудование проверено, вещи доставлены.
- После 008: выбранная расстановка исполнена, сделана проба, маршрут сохранён в локальную сборку, модуль завершён.

Для прерванной миссии сохранить уже принятый выбор и шаг сцены. Воспоминание о выполненной задаче показывать только после самого события. Повтор занятия — репетиция: не выдаёт вторую мебель, не отправляет ещё одну заявку и не меняет принятую расстановку. Переигрывание канонического выбора — отдельная функция проекта, если будет реализована.

При пропуске через диагностику нужно краткое сюжетное прохождение с этими выборами; нельзя молча приписывать игроку роль, предпочтение или завершённую встречу. Если зависимый старый флаг отсутствует в сохранении, сначала восстановить выбор через короткий вопрос/резюме, а не выбирать за игрока. При невозможности восстановления показать нейтральное резюме без конкретного личного воспоминания; обязательный общий факт «комната обустроена» допускается только при реально завершённой миссии.

# Новые выражения — сводный список

Повтор списка в начале каждого юнита намеренный: этот раздел удобен для переноса в словарь. Сверить с текущей базой приложения; уже известные выражения не дублировать как новые карточки.

| Юнит | Выражение | Русская опора |
|---|---|---|
| 005 | there is / there are | есть, находится / находятся |
| 005 | Is there…? | есть ли…? |
| 005 | Where can I find…? | где найти…? |
| 005 | next to | рядом с |
| 005 | opposite | напротив |
| 005 | between | между |
| 005 | at the end of | в конце |
| 005 | upstairs | наверху, на верхнем этаже |
| 005 | on the ground floor | на первом этаже, на уровне входа |
| 005 | storage room | склад, помещение для хранения |
| 005 | equipment desk | пункт выдачи оборудования и мебели |
| 006 | isn't working | не работает |
| 006 | is buzzing | гудит |
| 006 | is flashing | мигает |
| 006 | is making a noise | шумит, издаёт шум |
| 006 | is getting louder | становится громче |
| 006 | something is wrong with | что-то не так с |
| 006 | broken | сломанный |
| 006 | loose | неплотный, разболтанный |
| 006 | dusty | пыльный |
| 006 | too loud | слишком громкий |
| 006 | at the moment | сейчас, в данный момент |
| 006 | check the connection | проверить соединение |
| 007 | Can you…? / Could you…? | можешь…? / не мог бы ты…? |
| 007 | Would you mind…-ing? | не мог бы ты…? |
| 007 | Shall I…? | мне…? / давай я…? |
| 007 | I'll… | я сделаю… |
| 007 | Could we…? | можно нам…? |
| 007 | Sure, I can | конечно, могу |
| 007 | Sorry, I can't… because… | прости, не могу… потому что… |
| 007 | let someone in | впустить кого-то |
| 007 | give someone a hand | помочь кому-то |
| 007 | bring something | принести что-то |
| 007 | move something together | передвинуть что-то вместе |
| 008 | like working | любить работать, нравиться работать |
| 008 | love planning | очень любить планировать |
| 008 | prefer writing | предпочитать писать |
| 008 | prefer…to… | предпочитать одно другому |
| 008 | I'd rather… | я лучше… / я предпочёл бы… |
| 008 | I'd prefer… | я предпочёл бы… |
| 008 | a small old lamp | маленькая старая лампа |
| 008 | a narrow wooden shelf | узкая деревянная полка |
| 008 | a quiet corner | тихий угол |
| 008 | enough room | достаточно места |
| 008 | leave space for | оставить место для |
| 008 | How about…? | как насчёт…? |

# Передача в Claude

1. Добавить этот модуль после 004, сохранив существующие идентификаторы пролога и 001–004. Новые id создать по правилам проекта; автор намеренно не проставлял их в Markdown.
2. В каждом юните сохранить восемь занятий: понимание → понимание → форма → форма → продукция → продукция голосом → беглость/проверка → миссия. Занятие 7 юнита 008 — проверка всего модуля, не обычный быстрый круг.
3. Из «Материала для заданий» собрать штатные упражнения приложения. Сами упражнения здесь не спроектированы вместо разработчика. Вопросы на понимание уже имеют варианты и ключи; перевод вопроса и вариантов можно добавить в интерфейсе по принятому формату.
4. В каждой сцене сначала выбор намерения, затем английская формулировка. Приведённые варианты — несколько допустимых выражений одного смысла, не требование единственного точного совпадения. Регистр, апострофы и эквивалентные сокращения обрабатывать по текущим правилам.
5. Английские варианты ответа игрока переводятся русским намерением; у всех озвучиваемых реплик и диктантов героинь перевод дан явно. Примеры материала для упражнений также переведены. Большие блоки чтения имеют полный перевод.
6. Все `Место` используют существующие фоны. Пункт выдачи показан через `old_corridor` и ремарку, без нового интерьера. Расстановка, полка и панели — прежде всего состояние истории; если фон пока один, не показывать иллюстрацию, противоречащую выбору. Для фото в чате допустим текстовый заместитель.
7. Алексу нужен только голос/текст. Фото общего чата — без людей. Другие новые персонажи, личные чаты, романтические спрайты, архив и закрытый проход этому модулю не нужны.
8. Обновить страницы героинь по фактическим флагам и событиям. Успех проверки модуля не меняет отношения. Повтор или учебная ошибка не создают новые воспоминания и не отнимают существующие.
9. Озвучить новые английские тексты, проверить ссылки на спрайты и фоны штатным валидатором проекта. Прослушивание, микрофон, схема сохранений и отображение фотографий здесь не проверены: исходников приложения нет.

# Самостоятельная вычитка

Проверка относится к этому документу, а не к запущенному приложению.

- [x] Продолжение начинается после готовой страницы 004; не повторяет первое знакомство или вступительную проверку.
- [x] Учтены постоянная среда в 13:00, лаборатория Рэй, семинары и библиотечная работа Айрис. Встречи не назначены поверх известных обязательств.
- [x] Приглашение на обед из 004 не исчезло: возвращается в конце 008 и ведёт к 009–012. Сам обед и покупки ещё не состоялись.
- [x] Найден обычный пункт выдачи, не архив; старый лист пролога не раскрывается и не становится новой загадкой этого модуля.
- [x] Бронь, заявка, визит, получение и расстановка идут последовательно; шкаф или полка не оказываются в комнате раньше доставки.
- [x] Неисправный разъём, батарейки индикатора и эхо разведены. «Плохая проводка» из прежних догадок не превращена в самостоятельный студенческий ремонт.
- [x] В каждом юните восемь занятий, чтение с вопросами, два аудиофрагмента с вопросами, диктант, два набора материала для формы, голосовые фразы и три сцены с выбором: одна в занятии 5 и две в занятии 8.
- [x] Выбор порядка проверки, роли, расстановки и текста карточки действительно возвращается в действии. Локальные варианты, не меняющие результат, обозначены как локальные.
- [x] Уточнение после непонятного ответа спокойное; нет наказания за английский или ветки, автоматически выбранной за игрока.
- [x] Отношения остаются на стадии «знакомые»; нет преждевременного раскрытия личных проблем, флирта и приватной переписки.
- [x] Реплики оформлены с переводом и допустимой эмоцией/позой; у каждого занятия есть фон. Сильные эмоции не накапливаются в сценах.
- [x] Техническая сверка текста: 32 занятия, 32 допустимых фона, 12 сцен выбора; чтения по 73–95 слов, аудиофрагменты по 29–35 слов. Теги поз и эмоций сверены с брифом.
- [x] Публичный выпуск не состоялся: всё сохранено только в рабочую локальную сборку.

Что ещё проверить в проекте: реальные пути спрайтов и аудио, отображение длинных переводов, допустимость введённых ответов, остановку/возобновление миссии на каждой ветке, отсутствие повторных наград и правильный возврат всех шести пар флагов.  