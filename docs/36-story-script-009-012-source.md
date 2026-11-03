# English Club — сценарий юнитов 009–012

Версия 1 · 03.11.2026. Продолжение актуального сценария 001–008. Для передачи в Claude вместе с файлами 21, 23, 29, 30 и 33. Приоритет для этого модуля: бриф 33 → формат брифа 29 → уже написанная история. Предыдущие сцены не переписывать.

## Синопсис

На следующей встрече команда идёт на обещанный обед: теперь у каждого есть место в комнате 17, но общего любимого блюда пока нет. Мика почти выбирает четыре одинаковых набора, вовремя останавливается и спрашивает остальных. Заказ приходится уточнить: Рэй не ест мясо и рыбу, Айрис не любит сырой лук, а Мика предпочитает неострую еду. Игрок учится не угадывать чужие ограничения и замечает первые личные знаки внимания — свободное место рядом, адресную шутку, запомнившуюся мелочь. В пятницу четверо сравнивают покупки для студии и обнаруживают, что работающему микрофону нужнее устойчивая подставка, чем дорогая замена. На следующей среде общий список помогает купить ровно необходимое, оставить небольшой резерв и не принести в комнату четыре одинаковых пакета. На полке появляются две разные общие чашки; пока их всего две, и четвёрка шутит о будущем полном комплекте. Обед, покупки и локальная памятка завершены, а следующий эпизод может начинаться с выхода во двор — без самой записи в этом модуле.

## Календарь и состояние на входе

| Юнит | Сюжетное время | Событие |
|---|---|---|
| 009 | Среда четвёртой недели, 13:00–13:15 | Следующая встреча после обустройства комнаты. Столовая: меню, пожелания, предварительный заказ |
| 010 | Та же среда, 13:15–13:45 | Проверка состава до оплаты и подачи еды; общий обед |
| 011 | Пятница четвёртой недели, 16:00–16:40 | Разовая дополнительная встреча после занятий, согласованная в финале 010. Магазин, тест подставки, первая покупка |
| 012 | Среда пятой недели, 13:00–14:00 | Обычная встреча: список → магазин → комната 17 |

Восемь занятий — шаги эпизода, а не восемь дней. Среда, 13:00 остаётся общим регулярным часом; пятница его не заменяет. Комната, исправный микрофон, заменённый кабель, панели, стол и полка сохраняются. Стол не перемещать: использовать сохранённый вариант 008. Гид остаётся локальным черновиком, новых публикаций нет. Все центральные персонажи — совершеннолетние однокурсники, статус «знакомые».

## Соглашения для переноса

- Ниже даны все 32 занятия. В занятиях 3–4 приводится материал, а не готовые однотипные упражнения: задания соберёт Claude.
- В каждой сцене сначала выбирается намерение, затем принимается английская формулировка этого смысла; приведённые ответы — примеры, не исчерпывающий белый список. У ответов игрока указан перевод. Не показывать варианты другого намерения как языковые ошибки.
- Флаг сохраняется после принятого ответа. Непонятая фраза ведёт только к уточнению; флаг и сюжетный результат не ставятся заранее. Взаимоисключающие флаги одной сцены хранятся как один выбор. Повторение не меняет старый выбор и не выдаёт новое событие.
- Шесть инициатив флирта: Мика — 009/5 и 012/8; Айрис — 009/8 и 012/5; Рэй — 010/5 и 011/5. Это игровые подколки и адресное внимание, а не признания. У каждой сцены три безопасных ответа. Нейтральная ветка не уменьшает доверие.
- Флаги `flirt_*` отмечают взаимный флирт, не дают учебных очков, не открывают отношения. Самостоятельный выбор маршрута позднее не блокируется их отсутствием. Возвраты внутри модуля — короткие реплики по делу, не новые сцены флирта.
- Общий чат «Room 17» показывается внутри приложения. Личных сообщений, кружочков и личных фотографий в этом модуле нет. Голосовые снабжены обычным тегом позы/эмоции для единообразия текста; на экране чата спрайт необязателен.
- Работница столовой Нора и продавец Сэм — два второстепенных персонажа модуля, без спрайтов. Их `neutral`/`listening` — указание подачи, не запрос нового арта. Письменные материалы не требуют спрайта и озвучки.
- Учебная модель предпочтений игрока не заменяет анкету. В 010 игрок может назвать известное ограничение из профиля либо выбрать «без грибов» как предпочтение / «без особых пожеланий». Ни один вариант не создаёт диагноз. Если профиль содержит аллергию, Claude обязан адаптировать предметный состав заказа и реплики проверки, а не подставить слово в несовместимый шаблон.

---

## Юнит 009. Заказать обед

**Цель:** Узнать, что есть, назвать своё пожелание и собрать предварительный заказ без предположений за других.

**Итог юнита:** У каждого есть выбранное блюдо и напиток; предварительный заказ записан. До окончательного подтверждения команда проверит состав в 010. Еда пока не оплачена и не подана.

**Выражения юнита:** I'd like… — Я бы хотел…; Could I have…? — Можно мне…?; Do you have any…? — У вас есть…?; some rice — немного риса; any soup — суп (в вопросе); a portion of… — порция…; a bowl of… — миска…; a slice of… — ломтик…; a bottle of… — бутылка…; anything else? — что-нибудь ещё?; for here — здесь, в заведении; on the side — отдельно.

### Занятие 1. Четыре ответа (понимание)

**Место:** dining_hall

_Среда, 13:00. Столовая ещё не переполнена. Мика открывает меню на телефоне, начинает показывать четыре одинаковых набора и убирает палец с кнопки количества._

- **Мика:** Four lunch sets—wait. Four people, four answers. What would everyone like? — Четыре набора… стоп. Четыре человека, четыре ответа. Кто что хочет? _(phone/thinking)_
- **Рэй:** Something without meat. — Что-нибудь без мяса. _(neutral)_
- **Айрис:** Let's read before we agree. — Прочитаем, прежде чем соглашаться. _(notebook/focused)_

**Чтение: «Lunch today»** (меню; слов: 80)

> Lunch is served from twelve until two. Today we have chicken with rice for £6, vegetable pasta for £5, and tomato soup for £3. A slice of bread costs £1. You can have a bottle of water or a cup of tea for £1 each.
>
> Please order at the counter. Tell us about any food allergies before we prepare your meal. Some dishes can be changed. Ask a member of staff about ingredients. Take a table number after you pay.

_Перевод:_ Обед подают с двенадцати до двух. Сегодня есть курица с рисом за £6, паста с овощами за £5 и томатный суп за £3. Ломтик хлеба стоит £1. Бутылка воды или чашка чая — по £1. Заказывайте у стойки. Сообщите о пищевой аллергии до приготовления еды. Некоторые блюда можно изменить. О составе спросите сотрудника. После оплаты возьмите номер для стола.

1. When does lunch finish? — Когда заканчивается обед? Варианты: At twelve / At two / At three; верно: At two.
2. What costs £5? — Что стоит £5? Варианты: Vegetable pasta / Chicken with rice / Tomato soup; верно: Vegetable pasta.
3. When should a customer mention an allergy? — Когда нужно сообщить об аллергии? Варианты: After eating / Before the meal is prepared / Only when paying; верно: Before the meal is prepared.
4. Where do customers order? — Где заказывают? Варианты: At the table / At the counter / In Room 17; верно: At the counter.

_Итог занятия:_

- **Мика:** Nobody has ordered four surprise lunches. Progress! — Никто не заказал четыре обеда-сюрприза. Уже прогресс! _(happy)_

### Занятие 2. Сначала послушать (понимание)

**Место:** dining_hall

_Пока игрок смотрит меню, героини сверяют пожелания вслух. Для аудирования используются две реплики этой сцены, а не отправленные задним числом сообщения._

- **Айрис:** Listen for the food and the amount. They are separate pieces of information. — Слушай, что за еда и сколько её нужно. Это разные сведения. _(notebook/focused)_

**Аудирование 1 — Мика** (слов: 35)

- **Мика:** I'd like a portion of chicken with rice and a bottle of water. I don't need any bread. The rice is enough. Let's ask about the sauce before we send the order to the kitchen. — Я бы хотела порцию курицы с рисом и бутылку воды. Хлеб мне не нужен. Риса достаточно. Спросим о соусе, прежде чем отправлять заказ на кухню. _(phone/neutral)_

1. Does Mika want bread? — Мика хочет хлеб? Варианты: Yes / No / Two slices; верно: No.
2. What still needs checking? — Что ещё нужно проверить? Варианты: The sauce / The table number / The opening day; верно: The sauce.

**Аудирование 2 — Айрис** (слов: 32)

- **Айрис:** I'd like a bowl of tomato soup, a slice of bread and a cup of tea. I want to check the soup ingredients first. A dish name doesn't tell us everything inside. — Я бы хотела миску томатного супа, ломтик хлеба и чашку чая. Сначала хочу проверить состав супа. Название блюда не сообщает обо всём, что в нём есть. _(notebook/thinking)_

1. How much bread does Iris want? — Сколько хлеба хочет Айрис? Варианты: A whole loaf / A slice / None; верно: A slice.

**Диктант:** Could I have a bottle of water? — Можно мне бутылку воды?

_Итог занятия:_

- **Рэй:** Pasta and water for me. — Мне пасту и воду. _(neutral)_

### Занятие 3. Порция, миска, ломтик (форма)

**Место:** dining_hall

_Айрис записывает количества в черновик заказа. Это подготовка к разговору у стойки._

- **Айрис:** A portion tells us how much. Four portions still need four choices. — Порция указывает количество. Для четырёх порций всё равно нужны четыре выбора. _(notebook/focused)_

**Материал для заданий:**

1. I'd like a portion of rice. — Я бы хотел порцию риса.
2. Could I have a bowl of soup? — Можно мне миску супа?
3. Iris wants a slice of bread. — Айрис хочет ломтик хлеба.
4. We need three bottles of water. — Нам нужны три бутылки воды.
5. There is some rice in the lunch set. — В обеденном наборе есть рис.
6. There are two cups of tea on that tray. — На том подносе две чашки чая.

_Итог занятия:_

- **Айрис:** Now “some” has a size when it needs one. — Теперь у «немного» есть мера там, где она нужна. _(notebook/dry_smile)_

### Занятие 4. Есть ли ещё суп? (форма)

**Место:** dining_hall

_Мика замечает, что у соседнего посетителя закончилось место на подносе. Команда пока ничего не добавляет к своему заказу._

- **Мика:** Let's ask what's available before we add anything else. — Спросим, что есть, прежде чем добавлять что-то ещё. _(phone/focused)_

**Материал для заданий:**

1. Do you have any tomato soup? — У вас есть томатный суп?
2. There is some vegetable pasta left. — Ещё осталась паста с овощами.
3. We don't need any extra bread. — Нам не нужен дополнительный хлеб.
4. Could I have some water? — Можно мне воды?
5. Are there any clean trays? — Есть чистые подносы?
6. Would you like some tea? — Хотите чаю?
7. Is there any sauce on the rice? — На рисе есть соус?

_Итог занятия:_

- **Рэй:** Questions before extra trays. — Сначала вопросы. Потом лишние подносы. _(deadpan)_

### Занятие 5. Свободное место (продукция · флирт Мики)

**Место:** dining_hall

_Мика оставляет за столом папку и показывает свободный стул рядом. Остальные выбирают напитки у меню в двух шагах; это не встреча вдвоём._

**Сцена · Место с преимуществом**

- **Мика:** I saved you a seat. Best view of the menu. And fairly good company. — Я заняла тебе место. Отсюда лучше всего видно меню. И компания вполне ничего. _(happy)_

Выбор намерения:

- _Поддержать флирт_ → «The company is better than the menu.» / «I'd choose the company first.» — «Компания лучше меню» / «Я бы сначала выбрал компанию».
 - **Мика:** Good answer. The menu can't take a compliment anyway. — Хороший ответ. Меню всё равно не умеет принимать комплименты. _(laugh)_ · флаг `flirt_mika_009`
- _Отшутиться по-дружески_ → «Does the seat come with extra rice?» / «I hope the chair has a good review.» — «К месту прилагается дополнительный рис?» / «Надеюсь, у стула хорошие отзывы».
 - **Мика:** Five stars. Never talks during lunch. — Пять звёзд. За обедом никогда не разговаривает. _(laugh)_
- _Вернуться к заказу_ → «Thanks. What would you like to drink?» / «Thank you. Shall we finish the order?» — «Спасибо. Что ты будешь пить?» / «Спасибо. Закончим заказ?»
 - **Мика:** Water for me. Let's check everyone else's choice too. — Мне воду. Проверим и выбор остальных. _(phone/happy)_

Если ответ непонятен:
- **Мика:** Sorry, could you say that another way? — Прости, можешь сказать иначе? _(listening)_

Общее продолжение:
- **Мика:** Right. Four meals, not four copies of mine. — Так. Четыре обеда, а не четыре копии моего. _(phone/focused)_

_Итог занятия:_

- **Айрис:** Your seat can wait. Your order still needs a line. — Место тебя подождёт. Для заказа пока нужна строчка. _(notebook/focused)_

### Занятие 6. Голосом: свой заказ (продукция)

**Место:** dining_hall

_Игрок репетирует вежливый заказ. Репетиция не фиксирует пищевые предпочтения и не отправляет заказ._

- **Айрис:** Try a complete order, with an amount and a polite request. — Попробуй полный заказ: количество и вежливая просьба. _(notebook/focused)_

**Фразы вслух:**

1. I'd like a portion of vegetable pasta, please. — Я бы хотел порцию пасты с овощами, пожалуйста.
2. Could I have a bottle of water? — Можно мне бутылку воды?
3. Do you have any tomato soup left? — У вас ещё есть томатный суп?
4. A slice of bread on the side, please. — Ломтик хлеба отдельно, пожалуйста.

_Итог занятия:_

- **Рэй:** Clear. Ready for the counter. — Понятно. Можно к стойке. _(happy)_

### Занятие 7. Быстрый круг: без лишнего (беглость)

**Место:** dining_hall

_Короткие устные ответы по меню. Это тренировка, не новые заказы._

- **Мика:** Quick round! Food, amount, drink. Nobody has to guess. — Быстрый круг! Блюдо, количество, напиток. Никому не придётся угадывать. _(phone/happy)_

**Подсказки для коротких ответов:** попросить миску супа; спросить, остался ли хлеб; попросить бутылку воды; отказаться от дополнительного риса. Пример опоры: «A bowl of soup, please.» — «Миску супа, пожалуйста».

_Итог занятия:_

- **Мика:** Short enough for a queue. Clear enough for a real order. — Достаточно коротко для очереди. Достаточно понятно для настоящего заказа. _(phone/happy)_

### Занятие 8. Миссия: заказать для себя, услышать других (беглость · миссия)

**Место:** dining_hall

**Сцена 1 · Последняя пустая строка**

_Все у стойки. Нора принимает предварительный заказ; перед приготовлением она отдельно уточнит состав и пожелания. Игрок выбирает блюдо, а не ограничение. Его реальная анкета имеет приоритет над примерными вариантами._

- **Нора (второстепенный):** What would you like? We can check ingredients before I send the order through. — Что будете? Мы можем проверить состав, прежде чем я отправлю заказ. _(neutral)_

Выбор намерения:

- _Выбрать пасту_ → «I'd like a portion of vegetable pasta, please.» / «Could I have the vegetable pasta?» — «Я бы хотел порцию пасты с овощами, пожалуйста» / «Можно мне пасту с овощами?».
 - **Нора (второстепенный):** Vegetable pasta. I'll keep the order open while we check. — Паста с овощами. Оставлю заказ открытым до проверки. _(neutral)_ · флаг `u009_meal_pasta`
- _Выбрать суп с хлебом_ → «I'd like tomato soup and a slice of bread.» / «Could I have a bowl of soup with bread?» — «Я бы хотел томатный суп и ломтик хлеба» / «Можно миску супа с хлебом?».
 - **Нора (второстепенный):** Soup and bread. We'll check those ingredients too. — Суп с хлебом. Их состав тоже проверим. _(neutral)_ · флаг `u009_meal_soup`

Если ответ непонятен:
- **Нора (второстепенный):** Which dish would you like? — Какое блюдо вы хотите? _(listening)_

Общее продолжение:
- **Мика:** Water for me and Rei. Tea for Iris. What about you? — Воду мне и Рэй. Чай Айрис. А тебе? _(phone/thinking)_

- **Нора (второстепенный):** Anything else? And is it for here? — Что-нибудь ещё? И вы будете есть здесь? _(neutral)_

_Игрок отвечает «For here, please.» — «Здесь, пожалуйста». Для объёма этого сценария игрок заказывает воду: «A bottle of water, please.» — «Бутылку воды, пожалуйста». При свободном ответе допускается замена на чай с пересчётом; цена та же, выбор не влияет на сюжет._

**Сцена 2 · Точный наблюдатель (флирт Айрис)**

_Нора отходит за папкой состава. Айрис сверяет записанные пожелания, потом поворачивается к игроку. Остальные обсуждают подносы, не комментируя разговор._

- **Айрис:** You waited for my answer before writing. I could get used to that. — Ты дождался моего ответа, прежде чем записать. К такому можно привыкнуть. _(turn/dry_smile)_

Выбор намерения:

- _Поддержать флирт_ → «Your answers are worth waiting for.» / «I'd like to hear more of them.» — «Твоих ответов стоит подождать» / «Я бы хотел услышать их побольше».
 - **Айрис:** Then I'll try to keep them interesting. — Тогда постараюсь, чтобы они были интересными. _(turn/happy)_ · флаг `flirt_iris_009`
- _Отшутиться_ → «My pen needed a break.» / «It's a very patient pen.» — «Ручке нужен был перерыв» / «Это очень терпеливая ручка».
 - **Айрис:** A rare quality in stationery. — Редкое качество для канцелярии. _(dry_smile)_
- _Уточнить заказ_ → «Is your tea on the list?» / «Shall we check the ingredients now?» — «Твой чай в списке?» / «Теперь проверим состав?».
 - **Айрис:** It is. And yes, ingredients next. — В списке. И да, дальше состав. _(notebook/focused)_

Если ответ непонятен:
- **Айрис:** Could you put that another way? — Можешь сказать иначе? _(listening)_

_Итог занятия:_

- **Нора (второстепенный):** Before we confirm: does anyone have an allergy or need a change? — Перед подтверждением: у кого-нибудь есть аллергия или нужно что-то изменить? _(neutral)_
- **Рэй:** Let's check the sauce. — Проверим соус. _(neutral)_

**Изменение истории:** предварительный заказ собран; следующий юнит продолжает этот же разговор до приготовления еды. Зафиксированы блюдо игрока и только выбранные взаимные подколки.

---

## Юнит 010. Уточнить состав

**Цель:** Спросить о составе и количестве, различить предпочтение и ограничение, подтвердить подходящий заказ.

**Итог юнита:** Заказ проверен и приготовлен с согласованными изменениями. Обед состоялся. На пятницу согласован общий поход в магазин; это дополнительная встреча, не изменение расписания.

**Выражения юнита:** Does it contain…? — В этом есть…?; What is in…? — Что входит в…?; without… — без…; on the side — отдельно; I don't eat… — Я не ем…; I'd prefer it without… — Я бы предпочёл без…; I'm allergic to… — У меня аллергия на…; How much…? — Сколько…?; How many…? — Сколько…?; not much — немного; a lot of — много; check the label — проверить этикетку.

### Занятие 1. Название — ещё не состав (понимание)

**Место:** dining_hall

_13:15. Заказ всё ещё открыт. Нора даёт лист состава. Айрис читает его перед подтверждением, а не пытается определить ингредиенты по готовому блюду._

- **Айрис:** “Vegetable” describes the pasta. Let's check the sauce separately. — «Овощная» описывает пасту. Соус проверим отдельно. _(notebook/focused)_

**Чтение: «Kitchen notes»** (памятка; слов: 91)

> Vegetable pasta comes with tomato sauce and a cheese topping. The sauce contains tomatoes, cooked onions and mushrooms, but no meat or fish. We can leave out the cheese. We can also serve plain pasta with a separate portion of cooked vegetables, without mushrooms.
>
> Tomato soup contains cooked onions. Raw onion is an optional topping, added after cooking. Please ask for no topping if you do not want it.
>
> Chicken comes with rice. The hot sauce is served separately on request. For allergies, ask staff to check the full ingredient information.

_Перевод:_ Пасту с овощами подают с томатным соусом и сыром сверху. В соусе томаты, приготовленный лук и грибы, но нет мяса или рыбы. Сыр можно не добавлять. Также можно подать обычную пасту с отдельной порцией приготовленных овощей, без грибов. В томатном супе есть приготовленный лук. Сырой лук добавляют по желанию после приготовления. Если он не нужен, попросите без этой добавки. Курицу подают с рисом. Острый соус приносят отдельно по запросу. При аллергии попросите сотрудника проверить полную информацию о составе.

1. Does the pasta sauce contain fish? — В соусе для пасты есть рыба? Варианты: Yes / No / Only on Fridays; верно: No.
2. Can mushrooms be removed from the ready sauce? — Можно убрать грибы из готового соуса? Варианты: Yes, by taking them out / The alternative is plain pasta with separate vegetables / The sheet says there are no mushrooms; верно: The alternative is plain pasta with separate vegetables.
3. Is all the onion in the soup raw? — Весь лук в супе сырой? Варианты: Yes / No, only the optional topping / There is no onion; верно: No, only the optional topping.
4. How is the hot sauce served? — Как подают острый соус? Варианты: Mixed into every dish / Separately on request / Only with tea; верно: Separately on request.

_Итог занятия:_

- **Айрис:** Cooked onion is fine for me. I'd prefer no raw onion on top. — Приготовленный лук мне подходит. Сверху я бы предпочла без сырого лука. _(neutral)_

### Занятие 2. Не одно и то же (понимание)

**Место:** dining_hall

_Нора уточняет пожелания. Голоса для аудирования — части разговора у стойки._

- **Мика:** Let's say what we mean. “I don't like it” and “I'm allergic” aren't the same. — Скажем точно. «Я это не люблю» и «у меня аллергия» — не одно и то же. _(phone/thinking)_

**Аудирование 1 — Рэй** (слов: 28)

- **Рэй:** I don't eat meat or fish. Cheese is fine. Could you check that there is no meat stock in the sauce? I want to be sure before ordering. — Я не ем мясо и рыбу. Сыр мне подходит. Проверите, нет ли в соусе мясного бульона? Хочу убедиться до заказа. _(neutral)_

1. What can Rei eat? — Что Рэй может есть? Варианты: Fish / Cheese / Chicken; верно: Cheese.
2. What does she ask staff to check? — Что она просит проверить? Варианты: The meat stock / The bread price / The amount of rice; верно: The meat stock.

**Аудирование 2 — Мика** (слов: 29)

- **Мика:** I'd prefer my chicken without hot sauce. It's a preference, not an allergy. A little pepper is fine. Please don't order the same changes for everyone without asking them. — Я бы предпочла курицу без острого соуса. Это предпочтение, не аллергия. Немного перца нормально. Пожалуйста, не заказывайте такие же изменения всем, не спросив. _(phone/thinking)_

1. Is Mika describing an allergy? — Мика говорит об аллергии? Варианты: Yes / No / She doesn't know; верно: No.

**Диктант:** Does the sauce contain any meat? — В соусе есть мясо?

_Итог занятия:_

- **Нора (второстепенный):** I've checked: no meat stock in this sauce. — Проверила: в этом соусе нет мясного бульона. _(neutral)_

### Занятие 3. Состав и изменения (форма)

**Место:** dining_hall

_Айрис отделяет вопросы от просьб, чтобы в заказе было понятно и то и другое._

- **Айрис:** First find out what is in it. Then ask for the change. — Сначала узнай состав. Затем попроси изменение. _(notebook/focused)_

**Материал для заданий:**

1. Does the soup contain cooked onions? — В супе есть приготовленный лук?
2. What's in the pasta sauce? — Что входит в соус для пасты?
3. I'd prefer it without raw onion. — Я бы предпочёл без сырого лука.
4. Could I have the sauce on the side? — Можно мне соус отдельно?
5. I don't eat fish. — Я не ем рыбу.
6. I'm allergic to nuts. — У меня аллергия на орехи.
7. Could you check the full ingredient list? — Не могли бы вы проверить полный состав?

_Предложение 6 — учебный пример, не факт о ком-либо из команды. Оно не устанавливает аллергию игроку или героиням._

_Итог занятия:_

- **Айрис:** Specific words prevent very different orders from sounding the same. — Точные слова помогают не спутать совсем разные заказы. _(notebook/focused)_

### Занятие 4. Сколько именно (форма)

**Место:** dining_hall

_На подносе у Норы стоят бутылки воды; еду начнут готовить только после подтверждения в миссии._

- **Мика:** Drinks are easy to count. Sauce needs a different question. — Напитки легко посчитать. Для соуса нужен другой вопрос. _(phone/thinking)_

**Материал для заданий:**

1. How many bottles of water do we need? — Сколько бутылок воды нам нужно?
2. How much rice comes with the chicken? — Сколько риса подают с курицей?
3. There isn't much hot sauce in this sample. — В этом образце немного острого соуса.
4. There aren't many people in the queue now. — В очереди сейчас немного людей.
5. There are a lot of tables in the hall. — В зале много столов.
6. Is there a lot of salt in the soup? — В супе много соли?
7. How many portions of pasta are on our list? — Сколько порций пасты в нашем списке?

_Итог занятия:_

- **Рэй:** Count bottles. Ask about sauce. — Бутылки считаем. Про соус спрашиваем. _(neutral)_

### Занятие 5. Полезная подробность (продукция · флирт Рэй)

**Место:** dining_hall

_Игрок уже услышал вопрос о бульоне в аудировании. Айрис передаёт Норе список, в котором отдельно отмечены состав соуса и сыр. Рэй замечает, что игрок не стал выбирать за неё._

**Сцена · Комплимент с оговоркой**

- **Рэй:** You actually listened. Careful. I might choose your table again. — Ты правда слушал. Осторожнее. Я ведь могу снова сесть с тобой. _(smirk)_

Выбор намерения:

- _Поддержать флирт_ → «I'll make sure there's a seat for you.» / «Then I'll keep listening.» — «Позабочусь, чтобы для тебя было место» / «Тогда продолжу слушать».
 - **Рэй:** Good. No speech required. — Хорошо. Без торжественной речи. _(smirk)_ · флаг `flirt_rei_010`
- _Отшутиться_ → «My ears finally have a job.» / «The menu was a good teacher.» — «У моих ушей наконец есть работа» / «Меню было хорошим учителем».
 - **Рэй:** Better hours than our club. — Расписание лучше, чем у нашего клуба. _(happy)_
- _Вернуться к составу_ → «So the cheese is fine for you?» / «Shall we confirm your pasta now?» — «Значит, сыр тебе подходит?» / «Подтвердим твою пасту?».
 - **Рэй:** Yes. Cheese stays. Meat doesn't. — Да. Сыр остаётся. Мясо — нет. _(neutral)_

Если ответ непонятен:
- **Рэй:** Say that again? — Повторишь? _(listening)_

_Итог занятия:_

- **Рэй:** My order is clear now. — Теперь мой заказ понятен. _(neutral)_

### Занятие 6. Голосом: спросить, не угадать (продукция)

**Место:** dining_hall

_Репетиция фраз до окончательного подтверждения. Учебные примеры не меняют уже записанных пожеланий._

- **Айрис:** A question is safer than an assumption. Try these aloud. — Вопрос надёжнее предположения. Произнеси эти фразы. _(notebook/focused)_

**Фразы вслух:**

1. Does the sauce contain mushrooms? — В соусе есть грибы?
2. Could I have it without the topping? — Можно мне без добавки сверху?
3. How much rice is in one portion? — Сколько риса в одной порции?
4. Could you check the label, please? — Не могли бы вы проверить этикетку?

_Итог занятия:_

- **Айрис:** Now we can ask without guessing the answer first. — Теперь можно спросить, не угадывая ответ заранее. _(notebook/focused)_

### Занятие 7. Быстрый круг: уточнения (беглость)

**Место:** dining_hall

_Пока Нора сверяет заказ с кухней, Мика предлагает короткую тренировку по памятке._

- **Мика:** Three quick questions. No bonus for speaking fastest. — Три коротких вопроса. За самую быструю речь бонуса нет. _(phone/happy)_

**Подсказки:** спросить о рыбе в соусе; спросить, сколько ломтиков хлеба в заказе; попросить острый соус отдельно. Опоры: «Does it contain fish?» — «В этом есть рыба?»; «How many slices?» — «Сколько ломтиков?»; «Sauce on the side, please.» — «Соус отдельно, пожалуйста».

_Итог занятия:_

- **Мика:** Questions ready. Let's finish the real order. — Вопросы готовы. Закончим настоящий заказ. _(phone/focused)_

### Занятие 8. Миссия: обед, который подходит (беглость · миссия)

**Место:** dining_hall

**Сцена 1 · Пожелание игрока**

_Нора возвращается. В базовой ветке у игрока нет известной аллергии; он выбирает пожелание к блюду из 009. Если анкета задаёт ограничение, заменить базовую сцену полноценным согласованным разговором о нём, сохранив возможность уточнить состав._

- **Нора (второстепенный):** Any changes for your meal? — Для вашего блюда нужны изменения? _(neutral)_

Выбор намерения:

- _Попросить вариант без грибов; это предпочтение_ → «I'd prefer my meal without mushrooms.» / «Could I have a mushroom-free option, please?» — «Я бы предпочёл блюдо без грибов» / «Можно мне вариант без грибов, пожалуйста?».
 - **Нора (второстепенный):** For pasta, we'll use plain pasta and separate vegetables. The soup already has no mushrooms. — Для пасты возьмём обычную пасту и отдельные овощи. В супе грибов и так нет. _(neutral)_ · флаг `u010_player_no_mushrooms`
- _Оставить выбранное блюдо без изменений_ → «No changes for me, thank you.» / «My meal is fine as it is.» — «Мне без изменений, спасибо» / «Моё блюдо мне подходит как есть».
 - **Нора (второстепенный):** All right. Your original choice stays on the order. — Хорошо. В заказе остаётся ваш исходный вариант. _(neutral)_ · флаг `u010_player_standard`

Если ответ непонятен:
- **Нора (второстепенный):** Is there an ingredient you would like to leave out? — Есть ингредиент, который вы хотите исключить? _(listening)_

Общее продолжение:
- **Айрис:** No raw onion on mine, please. Cooked onion is fine. — Мне без сырого лука, пожалуйста. Приготовленный подходит. _(neutral)_
- **Мика:** No hot sauce on my chicken, please. — Мне курицу без острого соуса, пожалуйста. _(happy)_
- **Нора (второстепенный):** Confirmed. I'll send it to the kitchen now. — Подтверждено. Теперь отправляю на кухню. _(neutral)_

_Каждый оплачивает собственный обед. Общие клубные деньги не используются. Затем проходит несколько минут: Нора приносит заказ к столу. У игрока блюдо из `u009_meal_*`, с изменением из `u010_player_*`; заказ не переопределять общей картинкой. У Рэй паста с овощным соусом и сыром, у Айрис суп без сырого лука с хлебом, у Мики курица с рисом без острого соуса._

**Сцена 2 · Полезная строка для гида**

_Обед уже на столе. С разрешения всех Мика фотографирует только меню, без людей и тарелок с персональными пометками. Айрис предлагает добавить в локальный черновик короткую подсказку для новичка._

- **Айрис:** One useful reminder for the guide. What should come first? — Одна полезная памятка для гида. Что поставить первым? _(notebook/thinking)_

Выбор намерения:

- _Начать с вопроса о составе_ → «Ask what's in the dish before ordering.» / «Check the ingredients before you confirm.» — «Спросите состав блюда до заказа» / «Проверьте состав перед подтверждением».
 - **Айрис:** Ingredients first. I'll keep the example short. — Сначала состав. Пример будет коротким. _(notebook/focused)_ · флаг `u010_guide_ingredients`
- _Начать с просьбы об изменении_ → «Say clearly what you need without.» / «Ask for any changes before they prepare it.» — «Чётко скажите, без чего вам нужно блюдо» / «Попросите изменения до приготовления».
 - **Айрис:** Changes before cooking. I'll put the ingredient question underneath. — Изменения до приготовления. Вопрос о составе поставлю ниже. _(notebook/focused)_ · флаг `u010_guide_changes`

Если ответ непонятен:
- **Айрис:** Which reminder should lead: ingredients or changes? — Что поставить первым: состав или изменения? _(thinking)_

_Итог занятия:_

- **Мика:** Actual lunch! No planning while we eat for the next five minutes. — Настоящий обед! Следующие пять минут едим без планирования. _(happy)_
- **Рэй:** Starting now. — Начиная сейчас. _(deadpan)_

_После обеда, отдельный короткий общий чат «Room 17», без дополнительного выбора._

- **Мика:** Shop on Friday at four? Extra meeting, after classes. — В магазин в пятницу в четыре? Дополнительная встреча, после занятий. _(phone/thinking)_
- **Рэй:** Free. We need a stand. — Свободна. Нужна подставка. _(neutral)_
- **Айрис:** Free too. I can bring the budget sheet. — Тоже свободна. Принесу лист бюджета. _(notebook/focused)_

_Игрок подтверждает уже согласованную в календаре доступность: «Friday at four works for me.» — «Пятница в четыре мне подходит». Это не выбор романтической встречи. Если приложение позволяет отказ по времени, встреча переносится для всех; до подтверждения 011 не происходит._

**Изменение истории:** обед завершён, пищевые факты героинь раскрыты, локальная карточка получает выбранный порядок советов; пятничный поход согласован.

---

## Юнит 011. Сравнить цены

**Цель:** Сравнить цену и пригодность вариантов, объяснить, почему самая дешёвая или самая дорогая вещь не всегда подходит.

**Итог юнита:** Из общего бюджета £24 куплены устойчивая подставка с зажимом за £12 и поролоновая ветрозащита за £4. Израсходовано £16, осталось £8. Исправный микрофон не заменяют. Игрок определяет порядок сравнения и порядок советов в локальной карточке покупок.

**Выражения юнита:** cheaper than — дешевле, чем; more expensive than — дороже, чем; the cheapest — самый дешёвый; the best option — лучший вариант; as good as — такой же хороший, как; not as tall as — не такой высокий, как; too expensive — слишком дорогой; tall enough — достаточно высокий; stable enough — достаточно устойчивый; within our budget — в пределах бюджета; compare the prices — сравнить цены; try it first — сначала попробовать.

### Занятие 1. Не новый микрофон (понимание)

**Место:** shop

_Пятница, 16:00. Все четверо у полки для домашней записи. В распоряжении команды выделенный клубу фонд на общие расходники: £24; Айрис принесла запись об остатке. Это не взнос игрока. Рэй сначала рассматривает хороший новый микрофон; Мика замечает яркую модель, но не требует её купить. Айрис кладёт на свободный край прилавка лист бюджета._

- **Рэй:** Better microphone. Worse price. — Микрофон лучше. Цена хуже. _(thinking)_
- **Мика:** The blue one looks great. Looking is still free, right? — Синий выглядит классно. Смотреть ведь пока бесплатно? _(happy)_
- **Айрис:** We have a working microphone and twenty-four pounds. Let's start there. — У нас есть рабочий микрофон и двадцать четыре фунта. Начнём с этого. _(notebook/focused)_

**Чтение: «Small recording equipment»** (карточка полки; слов: 87)

> Three microphones are on display: a basic model for £18, a blue model for £28, and a studio model for £40. A microphone is not included with any stand.
>
> The short table stand costs £7. The taller stand with a clamp costs £12. Both can hold our microphone, but only the taller stand can reach a comfortable speaking height at our table. A foam windscreen costs £4.
>
> Customers may test the stands at the counter. Ask before opening a box. Keep your receipt if you buy anything.

_Перевод:_ На витрине три микрофона: базовая модель за £18, синяя за £28 и студийная за £40. Ни с одной подставкой микрофон не идёт в комплекте. Низкая настольная подставка стоит £7. Более высокая подставка с зажимом — £12. Обе удерживают наш микрофон, но только высокая поднимает его на удобную для речи высоту за нашим столом. Поролоновая ветрозащита стоит £4. Подставки можно проверить у прилавка. Прежде чем открывать коробку, спросите. Сохраните чек после покупки.

1. Which microphone is the cheapest? — Какой микрофон самый дешёвый? Варианты: Basic / Blue / Studio; верно: Basic.
2. What costs £12? — Что стоит £12? Варианты: A microphone / The taller stand with a clamp / A windscreen; верно: The taller stand with a clamp.
3. Why might the £7 stand be unsuitable? — Почему подставка за £7 может не подойти? Варианты: Too short / Too blue / Cannot hold any microphone; верно: Too short.
4. Can customers open boxes without asking? — Можно открывать коробки без спроса? Варианты: Yes / No / Only on Friday; верно: No.

_Итог занятия:_

- **Рэй:** Ours works. Holding it is the problem. — Наш работает. Проблема — его держать. _(neutral)_

### Занятие 2. Цена и задача (понимание)

**Место:** shop

_На столе для теста Рэй показывает, где должен оказаться микрофон. Айрис читает бюджет; обе реплики входят в аудирование._

- **Мика:** Let's compare what the money actually changes. — Сравним, что деньги действительно меняют. _(phone/thinking)_

**Аудирование 1 — Рэй** (слов: 29)

- **Рэй:** The short stand holds the microphone. It's cheaper, but not tall enough for our table. The taller one lets us sit normally. Let's test the clamp before buying it. — Низкая подставка держит микрофон. Она дешевле, но для нашего стола недостаточно высокая. С высокой можно нормально сидеть. Проверим зажим до покупки. _(neutral)_

1. Which feature matters here? — Что здесь важно? Варианты: Height / Colour / A famous name; верно: Height.

**Аудирование 2 — Айрис** (слов: 33)

- **Айрис:** Our club has twenty-four pounds for shared supplies. The taller stand and a foam windscreen cost sixteen together. That leaves eight. Lunch was paid separately, so it doesn't come out of this budget. — У клуба двадцать четыре фунта на общие вещи. Высокая подставка и поролоновая ветрозащита вместе стоят шестнадцать. Останется восемь. Обед каждый оплачивал отдельно, поэтому из этого бюджета он не вычитается. _(notebook/focused)_

1. How much will remain after these two items? — Сколько останется после двух покупок? Варианты: £4 / £8 / £16; верно: £8.
2. Is lunch included in this budget? — Обед входит в этот бюджет? Варианты: Yes / No / Only Mika's lunch; верно: No.

**Диктант:** The cheaper stand isn't tall enough. — Более дешёвая подставка недостаточно высокая.

_Итог занятия:_

- **Мика:** Less shopping, more useful shopping. I can work with that. — Меньше покупок, больше полезных покупок. Подходит. _(phone/happy)_

### Занятие 3. Дешевле чего? (форма)

**Место:** shop

_Айрис прикрывает рукой яркую рекламную надпись и оставляет видимыми только цену и характеристики._

- **Айрис:** Compare two things first. Then decide what “best” means. — Сначала сравни две вещи. Потом реши, что значит «лучше всего». _(notebook/focused)_

**Материал для заданий:**

1. The short stand is cheaper than the tall one. — Низкая подставка дешевле высокой.
2. The studio microphone is more expensive than the blue one. — Студийный микрофон дороже синего.
3. The basic microphone is the cheapest of the three. — Базовый микрофон самый дешёвый из трёх.
4. The taller stand is the best option for our table. — Высокая подставка лучше всего подходит для нашего стола.
5. The short stand is not as tall as the other one. — Низкая подставка не такая высокая, как другая.
6. Is the cheaper one as good as this one? — Более дешёвый такой же хороший, как этот?
7. A useful stand is better for us than a new colour. — Полезная подставка для нас лучше нового цвета.

_Итог занятия:_

- **Рэй:** Best for the job. Not the shelf. — Лучше для дела. Не для витрины. _(neutral)_

### Занятие 4. Слишком или достаточно (форма)

**Место:** shop

_Мика записывает два условия: покупка помещается в бюджет и решает конкретную задачу._

- **Мика:** “We can pay” is one question. “Will it help?” is another. — «Мы можем заплатить?» — один вопрос. «Это поможет?» — другой. _(phone/focused)_

**Материал для заданий:**

1. The blue microphone is too expensive for us. — Синий микрофон для нас слишком дорогой.
2. The £7 stand is not tall enough. — Подставка за £7 недостаточно высокая.
3. The taller stand is stable enough for our microphone. — Высокая подставка достаточно устойчива для нашего микрофона.
4. We have enough money for the stand and the windscreen. — У нас достаточно денег на подставку и ветрозащиту.
5. We don't have enough money for the studio microphone. — У нас недостаточно денег на студийный микрофон.
6. The clamp opens wide enough for our table. — Зажим раскрывается достаточно широко для нашего стола.
7. Is the cheaper option good enough for this job? — Более дешёвый вариант достаточно хорош для этой задачи?

_Итог занятия:_

- **Айрис:** Two conditions. Both need a yes. — Два условия. По обоим нужно «да». _(notebook/focused)_

### Занятие 5. Хорошая пара для сравнения (продукция · флирт Рэй)

**Место:** shop

_Мика спрашивает Сэма о коробках для переноса, Айрис сверяет цены. Рэй показывает игроку два ценника._

**Сцена · Тебя можно брать в магазин**

- **Рэй:** Shopping with you is better than shopping alone. Fewer bad ideas. Mostly mine. — С тобой ходить по магазинам лучше, чем одной. Меньше плохих идей. В основном моих. _(smirk)_

Выбор намерения:

- _Поддержать флирт_ → «I like this shopping team too.» / «Then let's make a good team again.» — «Мне тоже нравится наша команда для покупок» / «Тогда ещё как-нибудь соберём такую команду».
 - **Рэй:** Fine. Keep the honest opinions. — Ладно. Только продолжай говорить честно. _(happy)_ · флаг `flirt_rei_011`
- _Отшутиться_ → «The prices are doing most of the work.» / «My wallet is very convincing.» — «Цены делают большую часть работы» / «Мой кошелёк очень убедителен».
 - **Рэй:** Strong argument. Very quiet. — Сильный аргумент. Очень тихий. _(smirk)_
- _Вернуться к сравнению_ → «Let's test the taller stand first.» / «Is the clamp strong enough?» — «Сначала проверим высокую подставку» / «Зажим достаточно крепкий?».
 - **Рэй:** Good question. Let's check. — Хороший вопрос. Проверим. _(focused)_

Если ответ непонятен:
- **Рэй:** What do you mean? — Что ты имеешь в виду? _(listening)_

_Итог занятия:_

- **Рэй:** Price first. Test next. — Сначала цена. Дальше проверка. _(neutral)_

### Занятие 6. Голосом: обосновать выбор (продукция)

**Место:** shop

_Игрок репетирует объяснение для общего списка. Это не просьба продавцу дать скидку._

- **Айрис:** A reason someone else can check. That's what we need. — Нужна причина, которую другой сможет проверить. _(notebook/focused)_

**Фразы вслух:**

1. This one is cheaper, but it isn't tall enough. — Этот дешевле, но недостаточно высокий.
2. The taller stand is the best option for our table. — Высокая подставка лучше всего подходит для нашего стола.
3. It is within our budget. — Она укладывается в наш бюджет.
4. Could we try it before we buy it? — Можно попробовать до покупки?

_Итог занятия:_

- **Айрис:** A price and a reason. Better than “the nice one”. — Цена и причина. Лучше, чем «тот красивый». _(notebook/dry_smile)_

### Занятие 7. Быстрый круг: три ценника (беглость)

**Место:** shop

_Мика показывает фотографии ценников в общем чате, без людей. Никаких новых товаров и скидок._

- **Мика:** Quick comparisons. One sentence each, then we ask to test. — Быстрые сравнения. По одному предложению, потом попросим проверить. _(phone/focused)_

**Подсказки:** сравнить микрофоны £18 и £28; назвать самый дорогой из трёх; объяснить разницу между подставками £7 и £12; назвать остаток после покупки на £16 из £24.

**Опоры:** «The blue one is more expensive.» — «Синий дороже»; «The studio model is the most expensive.» — «Студийная модель самая дорогая»; «The short stand isn't tall enough.» — «Низкая подставка недостаточно высокая»; «We'll have eight pounds left.» — «У нас останется восемь фунтов».

_Итог занятия:_

- **Мика:** Same prices in the chat and on the shelf. Ready. — В чате и на полке одинаковые цены. Готово. _(phone/happy)_

### Занятие 8. Миссия: купить то, чего не хватало (беглость · миссия)

**Место:** shop

**Сцена 1 · Проверяем сначала**

_Сэм разрешает тестировать демонстрационный экземпляр. У команды записаны размеры стола и модель микрофона, поэтому проверка не строится на догадке. Игрок выбирает порядок теста, оба пункта выполняются._

- **Сэм (второстепенный):** We can check the clamp and the height. Which first? — Можем проверить зажим и высоту. С чего начнём? _(neutral)_

Выбор намерения:

- _Начать с устойчивости_ → «Could we check if the clamp is strong enough?» / «Let's test the clamp first, please.» — «Можно проверить, достаточно ли крепкий зажим?» / «Давайте сначала проверим зажим».
 - **Сэм (второстепенный):** Clamp first, then height. Here is the matching microphone holder. — Сначала зажим, потом высота. Вот совместимый держатель микрофона. _(neutral)_ · флаг `u011_test_clamp`
- _Начать с высоты_ → «Could we check if it's tall enough?» / «Let's test the speaking height first.» — «Можно проверить, достаточно ли она высокая?» / «Давайте сначала проверим высоту для речи».
 - **Сэм (второстепенный):** Height first, then clamp. Use this chair for the test. — Сначала высота, потом зажим. Для проверки сядьте на этот стул. _(neutral)_ · флаг `u011_test_height`

Если ответ непонятен:
- **Сэм (второстепенный):** The clamp or the height first? — Сначала зажим или высота? _(listening)_

Общее продолжение:
- **Рэй:** Stable. Tall enough. This works. — Устойчивая. Достаточно высокая. Подходит. _(focused)_
- **Айрис:** Twelve for the stand, four for the windscreen. Sixteen in total. — Двенадцать за подставку, четыре за ветрозащиту. Всего шестнадцать. _(notebook/focused)_
- **Мика:** All four agree? Good. Let's buy these two. — Все четверо согласны? Хорошо. Берём эти две вещи. _(phone/happy)_

_Сэм пробивает подставку за £12 и ветрозащиту за £4. Айрис сохраняет чек; общий остаток £8. Тест и согласие игрока происходят до покупки. Сам выбор порядка теста не выдаёт право отменить уже согласованные нужды команды._

**Сцена 2 · Совет следующему покупателю**

_Мика фотографирует две покупки и чек для общего чата. Айрис пишет короткую заметку для локальной сборки гида._

- **Айрис:** What should our shopping note start with? — С чего начнём памятку о покупках? _(notebook/thinking)_

Выбор намерения:

- _Сначала объяснить задачу_ → «Choose what is good enough for the job.» / «Start with what you actually need.» — «Выбирайте то, что достаточно хорошо для задачи» / «Начните с того, что действительно нужно».
 - **Айрис:** The job first, then the prices and the test. — Сначала задача, потом цены и проверка. _(notebook/focused)_ · флаг `u011_guide_need`
- _Сначала напомнить о сравнении_ → «Compare the prices, then test your choice.» / «Don't choose only by the lowest price.» — «Сравните цены, потом проверьте выбранное» / «Не выбирайте только по самой низкой цене».
 - **Айрис:** Comparison first, with our stand as the example. — Сначала сравнение, на примере нашей подставки. _(notebook/focused)_ · флаг `u011_guide_compare`

Если ответ непонятен:
- **Айрис:** Start with the task or with comparing prices? — Начать с задачи или со сравнения цен? _(thinking)_

_Итог занятия:_

- **Рэй:** Good team. Honest opinions. — Хорошая команда. Честные мнения. _(neutral)_ · если флаг `flirt_rei_011`
- **Мика:** Eight pounds left. I'll post that before anyone finds another beautiful microphone. — Осталось восемь фунтов. Напишу, пока никто не нашёл ещё один прекрасный микрофон. _(phone/happy)_
- **Рэй:** Wednesday. We fit the stand. — В среду. Установим подставку. _(neutral)_

**Изменение истории:** первая общая покупка оплачена; обе вещи до среды остаются в закрытой коробке в комнате 17. Микрофон прежний, исправный. Чек и £8 остатка внесены в общий чат. Карточка покупок сохранена локально в выбранном порядке.

---

## Юнит 012. Составить общий список

**Цель:** Согласовать количества и обязанности, отличить запас от лишнего и выполнить одну общую закупку.

**Итог юнита:** Подставка установлена, ветрозащита надета. Куплены две общие чашки и одна выбранная мелочь. Из £8 потрачено £6, осталось £2. Список следующей встречи согласован; чай из дома и печенье пока только предложены, клубные деньги на них не выделялись.

**Выражения юнита:** a few — несколько; a little — немного; too many — слишком много (исчисляемого); too much — слишком много (неисчисляемого); enough — достаточно; We need… — Нам нужно…; We don't need any… — Нам не нужно…; I'll get… — Я куплю/возьму…; Who's getting…? — Кто берёт…?; one each — по одному; leave some money — оставить немного денег; check the list — свериться со списком.

### Занятие 1. Три пакета одного и того же (понимание)

**Место:** room17

_Следующая среда, 13:00. Коробка из магазина на столе. Мика показывает черновик, в котором чай внесён три раза разными людьми. Никто его ещё не покупал._

- **Мика:** Three people offered tea. Very kind. Possibly too much tea. — Трое предложили чай. Очень мило. Возможно, слишком много чая. _(phone/thinking)_
- **Рэй:** One list. Fewer bags. — Один список. Меньше пакетов. _(neutral)_

**Чтение: «Room 17 — shared list»** (список с пояснениями; слов: 96)

> We have a working microphone, a new stand and a foam windscreen. We don't need any more recording equipment today. We have £8 left in the shared budget.
>
> Two plain mugs cost £2 each. We also need either one pack of cable clips or one roll of paper tape. Each option costs £2. Buy one option, not both, and leave £2 for later.
>
> Food is separate. For next Wednesday, Mika can bring a little tea from home. Iris can bring a few biscuits. Ask everyone first. Nobody needs to buy four bags of the same thing.

_Перевод:_ У нас есть рабочий микрофон, новая подставка и поролоновая ветрозащита. Сегодня дополнительная техника для записи не нужна. В общем бюджете осталось £8. Две простые чашки стоят по £2. Ещё нужна либо одна упаковка кабельных зажимов, либо один рулон бумажной ленты. Каждый вариант стоит £2. Купите один, не оба, и оставьте £2 на потом. Еда отдельно. На следующую среду Мика может принести немного чая из дома. Айрис может принести несколько печений. Сначала спросите всех. Никому не нужно покупать четыре пакета одного и того же.

1. How much shared money is available now? — Сколько общих денег сейчас есть? Варианты: £2 / £8 / £24; верно: £8.
2. How many extra supply options should the team buy? — Сколько дополнительных вариантов расходников нужно купить? Варианты: Both / One / Four; верно: One.
3. How much should remain? — Сколько должно остаться? Варианты: £0 / £2 / £6; верно: £2.
4. Has the tea already been bought? — Чай уже куплен? Варианты: Yes / No, it is planned for next Wednesday / The shop gives it free; верно: No, it is planned for next Wednesday.

_Итог занятия:_

- **Айрис:** Two budgets. Supplies now, possible snacks next week. — Две отдельные статьи. Вещи сейчас, возможное угощение на следующей неделе. _(notebook/focused)_

### Занятие 2. Кто берёт что (понимание)

**Место:** room17

_Мика и Айрис оставляют короткие голосовые в общем чате, чтобы список оставался понятным и после встречи. Обещания относятся к следующей среде, не к сегодняшней покупке чашек._

- **Мика:** I'll put the offers in the chat. Offers first, final list after everyone answers. — Запишу предложения в чат. Сначала предложения, окончательный список — когда все ответят. _(phone/focused)_

**Аудирование 1 — Мика, общий чат «Room 17»** (слов: 31)

- **Мика:** I'll bring a little tea from home next Wednesday. We don't need three packets. Please tell me if you don't want tea. Water is fine too. Nobody has to join in. — В следующую среду принесу немного чая из дома. Три пачки нам не нужны. Скажите, если не хотите чай. Вода тоже подойдёт. Никто не обязан участвовать. _(phone/neutral)_

1. When does Mika offer to bring tea? — Когда Мика предлагает принести чай? Варианты: Today / Next Wednesday / Every day; верно: Next Wednesday.
2. Must everyone drink tea? — Всем обязательно пить чай? Варианты: Yes / No / Only new members; верно: No.

**Аудирование 2 — Айрис, общий чат «Room 17»** (слов: 32)

- **Айрис:** I can bring a few plain biscuits next week. I'll keep the packet so everyone can check the ingredients. We need enough for a small break, not enough to open a café. — Могу принести несколько простых печений на следующей неделе. Сохраню упаковку, чтобы все могли проверить состав. Нужно достаточно для короткого перерыва, а не для открытия кафе. _(notebook/dry_smile)_

1. Why will Iris keep the packet? — Зачем Айрис сохранит упаковку? Варианты: To check ingredients / To hide the price / To carry the microphone; верно: To check ingredients.

**Диктант:** We have enough money for two mugs. — У нас достаточно денег на две чашки.

_Итог занятия:_

- **Рэй:** I'll bring water. No extra list. — Принесу воду. Без дополнительного списка. _(neutral)_

### Занятие 3. Несколько или немного (форма)

**Место:** room17

_Айрис подчёркивает количество рядом с предметом, а не вместо него. Чашки пока только в списке._

- **Айрис:** A little tea. A few biscuits. Small amounts, different words. — Немного чая. Несколько печений. Маленькие количества, разные слова. _(notebook/focused)_

**Материал для заданий:**

1. Mika can bring a little tea. — Мика может принести немного чая.
2. Iris can bring a few biscuits. — Айрис может принести несколько печений.
3. We have a little money left. — У нас осталось немного денег.
4. There are a few empty boxes on the shelf. — На полке есть несколько пустых коробок.
5. We need a few clips, not a large box. — Нам нужно несколько зажимов, а не большая коробка.
6. Leave a little space for the cups. — Оставьте немного места для чашек.
7. A few names are still missing from the list. — В списке пока не хватает нескольких имён.

_Итог занятия:_

- **Айрис:** Small doesn't mean the same word for everything. — Маленькое количество не означает одно и то же слово для всего. _(notebook/focused)_

### Занятие 4. Достаточно — это тоже решение (форма)

**Место:** room17

_Рэй убирает лишнюю пустую коробку с края стола. Это не новый перенос мебели._

- **Рэй:** Enough space. Keep some. — Места хватает. Часть оставим свободной. _(neutral)_

**Материал для заданий:**

1. We don't need any more microphones. — Нам больше не нужны микрофоны.
2. There are too many bags on this draft list. — В черновом списке слишком много пакетов.
3. Three packets of tea are too much for one short meeting. — Три пачки чая — слишком много для одной короткой встречи.
4. Two mugs are enough for now if we take turns. — Двух чашек пока хватит, если пользоваться по очереди.
5. We don't have enough money for every item. — У нас недостаточно денег на все вещи.
6. I'll get the mugs. Who's getting the tape? — Я возьму чашки. Кто берёт ленту?
7. We need one pack of clips, not one each. — Нам нужна одна упаковка зажимов, а не каждому по упаковке.

_Итог занятия:_

- **Мика:** “Enough” just saved me from a second shopping bag. — «Достаточно» только что избавило меня от второго пакета покупок. _(phone/happy)_

### Занятие 5. Ещё одна строка (продукция · флирт Айрис)

**Место:** room17

_Айрис читает финальную версию списка. Игрок замечает, что в ней есть чай Мики и вода Рэй, но нет пожелания самой Айрис. Он спрашивает: «And what would you like?» — «А ты что хочешь?». Она добавляет свой чай._

**Сцена · Полезная привычка**

- **Айрис:** You keep asking for my answer. Careful. I might start saving you a line in every plan. — Ты всё время спрашиваешь моё мнение. Осторожнее. Начну оставлять тебе строчку в каждом плане. _(turn/dry_smile)_

Выбор намерения:

- _Поддержать флирт_ → «I'd like a line next to yours.» / «Save me one next to yours.» — «Я бы хотел строчку рядом с твоей» / «Оставь мне одну рядом с твоей».
 - **Айрис:** I'll leave room for one. No final draft yet. — Оставлю место для одного. Финальной версии пока нет. _(turn/happy)_ · флаг `flirt_iris_012`
- _Отшутиться_ → «Only if my handwriting is good enough.» / «Does the line come with biscuits?» — «Только если мой почерк достаточно хорош» / «К строчке прилагается печенье?».
 - **Айрис:** Terms and conditions. I expected nothing less. — Условия и оговорки. Меньшего я и не ожидала. _(dry_smile)_
- _Вернуться к покупкам_ → «Shall I get the mugs?» / «Is the shopping list ready?» — «Мне взять чашки?» / «Список покупок готов?».
 - **Айрис:** Yes. Two mugs, one extra item, and some money left. — Да. Две чашки, одна дополнительная вещь и остаток денег. _(notebook/focused)_

Если ответ непонятен:
- **Айрис:** Could you say that more simply? — Можешь сказать проще? _(listening)_

_Итог занятия:_

- **Айрис:** My answer is on the list now. Thank you. — Теперь мой ответ тоже в списке. Спасибо. _(happy)_

### Занятие 6. Голосом: взять одну задачу (продукция)

**Место:** room17

_Все готовятся к короткому походу в ближайший магазин. Игрок репетирует предложения помощи; они пока не назначают исполнителей._

- **Мика:** One clear offer is better than everyone saying “I'll get everything”. — Одно ясное предложение лучше, чем всеобщее «я возьму всё». _(phone/focused)_

**Фразы вслух:**

1. I'll get two mugs. — Я возьму две чашки.
2. We don't need any more tea today. — Сегодня нам больше не нужен чай.
3. Who's getting the cable clips? — Кто берёт кабельные зажимы?
4. Let's leave a little money for later. — Оставим немного денег на потом.

_Итог занятия:_

- **Мика:** A name next to each task. I like this version of organising. — Имя рядом с каждой задачей. Мне нравится такая организация. _(phone/happy)_

### Занятие 7. Проверка модуля 009–012 (беглость · проверка модуля)

**Место:** room17

_Перед выходом Айрис показывает новую вымышленную ситуацию. Это учебная карточка фотографического клуба, а не реальный новый заказ команды. Она не создаёт событий, покупок, ограничений или флагов._

- **Айрис:** Different club. Same decisions: food, ingredients, prices, quantities. — Другой клуб. Те же решения: еда, состав, цены, количества. _(notebook/focused)_

**Чтение: «Photo club picnic»** (учебная карточка; слов: 93)

> The photo club is planning a picnic for four people. They have £20. A cheese sandwich costs £3 and contains milk and wheat. A vegetable rice box costs £4 and contains no milk. Bottles of water cost £1 each.
>
> One member cannot have milk. The club needs one meal and one bottle of water per person. Three cheese sandwiches, one rice box and four bottles of water cost £17. Two large bags of crisps would cost another £4. The club must stay within its budget and check any other dietary needs before ordering.

_Перевод:_ Фотоклуб планирует пикник на четверых. У них £20. Сэндвич с сыром стоит £3, содержит молоко и пшеницу. Коробка овощного риса стоит £4, молока в ней нет. Бутылка воды стоит £1. Одному участнику нельзя молоко. Каждому нужно по одному блюду и бутылке воды. Три сэндвича с сыром, одна коробка риса и четыре бутылки воды стоят £17. Два больших пакета чипсов стоили бы ещё £4. Клуб должен уложиться в бюджет и до заказа уточнить остальные пищевые ограничения.

1. Which meal has no milk according to the card? — В каком блюде по карточке нет молока? Варианты: Cheese sandwich / Vegetable rice / Both; верно: Vegetable rice.
2. How much is the planned food and water? — Сколько стоят запланированные еда и вода? Варианты: £13 / £17 / £21; верно: £17.
3. Can they add both bags of crisps within £20? — Можно добавить оба пакета чипсов и уложиться в £20? Варианты: Yes / No / Only without a receipt; верно: No.

**Аудирование — Айрис, учебное сообщение** (слов: 33)

- **Айрис:** Please check everyone's order before paying. We have enough money for the meals and water, but not for both bags of crisps. The rice box is more expensive, but one person needs it. — Перед оплатой проверьте заказ каждого. На еду и воду денег достаточно, но на оба пакета чипсов уже нет. Коробка риса дороже, но одному человеку она нужна. _(notebook/focused)_

1. Why isn't the cheapest meal suitable for everyone? — Почему самое дешёвое блюдо подходит не всем? Варианты: It contains milk / There is no water / It costs £20; верно: It contains milk.

**Продукция — четыре самостоятельных коротких ответа:**

- Заказать одно подходящее блюдо и напиток. Образец: «I'd like a rice box and a bottle of water.» — «Я бы хотел коробку риса и бутылку воды».
- Спросить о составе. Образец: «Does the sandwich contain milk?» — «В сэндвиче есть молоко?».
- Сравнить два блюда. Образец: «The rice box is more expensive than the sandwich.» — «Коробка риса дороже сэндвича».
- Предложить покупку в пределах бюджета. Образец: «I'll get four bottles of water. We don't need both bags of crisps.» — «Я возьму четыре бутылки воды. Оба пакета чипсов нам не нужны».

_Принятие: оцениваются понятность запроса, состав, сравнение и количество/бюджет; не сходство с образцом слово в слово. Уточнение при непонятном ответе:_
- **Айрис:** Which item do you mean? Try naming it first. — Какую вещь ты имеешь в виду? Попробуй сначала назвать её. _(listening)_

_Итог занятия:_

- **Айрис:** Good. Back to our eight pounds and our actual list. — Хорошо. Возвращаемся к нашим восьми фунтам и настоящему списку. _(notebook/focused)_

### Занятие 8. Миссия: две чашки и немного места (беглость · миссия)

**Место:** shop

_Для переноса разделить миссию на две сцены с отдельными фонами, указаны ниже. 13:30–14:00. Магазин рядом, путь туда и обратно короткий. Все четверо идут вместе; это не поручение игроку оплатить чужие покупки._

**Сцена 1 · Одна мелочь, не две**

**Место:** shop

_Сэм показывает две простые чашки: жёлтую и серо-синюю, каждая £2. Они общие, не подарки героиням. Рэй считает обе мелочи полезными: кабельные зажимы пригодятся у подставки, бумажная лента — для временных подписей коробок. Срочной угрозы или новой неисправности нет; выбрать можно любую._

- **Мика:** Two mugs leave four pounds. One extra item leaves two. Which do we get? — После двух чашек останется четыре фунта. После одной мелочи — два. Что берём? _(phone/thinking)_

Выбор намерения:

- _Взять зажимы для кабеля_ → «I'll get one pack of clips. We don't need the tape today.» / «Let's buy a few clips and leave the tape for later.» — «Возьму одну упаковку зажимов. Лента сегодня не нужна» / «Купим несколько зажимов, ленту оставим на потом».
 - **Рэй:** Clips today. I'll fit them. — Сегодня зажимы. Я поставлю. _(focused)_ · флаг `u012_supply_clips`
- _Взять бумажную ленту для подписей_ → «I'll get one roll of tape. We can buy clips later.» / «Let's buy a little tape for labels, not the clips today.» — «Возьму один рулон ленты. Зажимы можно купить позже» / «Возьмём немного ленты для подписей, сегодня без зажимов».
 - **Айрис:** Tape today. I'll label the boxes. — Сегодня лента. Я подпишу коробки. _(notebook/focused)_ · флаг `u012_supply_tape`

Если ответ непонятен:
- **Мика:** One pack of clips or one roll of tape? — Упаковку зажимов или рулон ленты? _(thinking)_

Общее продолжение:
- **Мика:** I'll take the mugs to the counter. You bring the item you chose. Iris has the money. — Отнесу чашки к кассе. Ты принеси выбранную вещь. Деньги у Айрис. _(phone/focused)_
- **Сэм (второстепенный):** Two mugs and one extra item. Six pounds altogether. — Две чашки и одна дополнительная вещь. Всего шесть фунтов. _(neutral)_
- **Айрис:** Six paid. Two left. Receipt saved. — Шесть заплатили. Два осталось. Чек сохранён. _(notebook/focused)_

_Покупка совершается после ответа; £8 − £4 за чашки − £2 за выбранную мелочь = £2. Невыбранный товар не появляется в инвентаре и на фото._

**Сцена 2 · Хорошо получилось (флирт Мики)**

**Место:** room17

_Около 13:50. Рэй устанавливает подставку с ветрозащитой; Айрис освобождает полку для двух чашек. Игрок помогает по выбранной ветке: подаёт зажимы Рэй или держит коробку, пока Айрис подписывает её лентой. Чашки пока пустые, чай и печенье не появились заранее._

- **Рэй:** Cable clipped below the stand. Enough space to move. — Кабель закреплён под подставкой. Для движения места хватает. _(focused)_ · если флаг `u012_supply_clips`
- **Айрис:** Labels on. We'll return the boxes to the right places. — Подписи готовы. Вернём коробки на нужные места. _(notebook/focused)_ · если флаг `u012_supply_tape`
- **Мика:** Enough money left, and nobody carried four bags. I like planning things with you. — Деньги остались, никто не тащил четыре пакета. Мне нравится планировать с тобой. _(happy)_

Выбор намерения:

- _Поддержать флирт_ → «Then I'd like to be in the next plan.» / «Planning with you is the best part.» — «Тогда я хочу быть в следующем плане» / «Планировать с тобой — самое приятное».
 - **Мика:** Noted! One place in the next plan. Still room for sensible shopping. — Записано! Одно место в следующем плане. На разумные покупки место тоже оставим. _(phone/happy)_ · флаг `flirt_mika_012`
- _Отшутиться_ → «The list deserves most of the credit.» / «My best skill is carrying only one bag.» — «Главная заслуга у списка» / «Мой главный талант — нести только один пакет».
 - **Мика:** A very useful talent. I'll add it under “team skills”. — Очень полезный талант. Добавлю в «навыки команды». _(laugh)_
- _Продолжить дело_ → «Shall we check next Wednesday's list?» / «Let's confirm who brings what next week.» — «Проверим список на следующую среду?» / «Подтвердим, кто что принесёт на следующей неделе».
 - **Мика:** Yes. Offers only become a plan when everyone agrees. — Да. Предложения становятся планом, только когда все согласны. _(phone/focused)_

Если ответ непонятен:
- **Мика:** Could you say that again? — Можешь повторить? _(listening)_

Общее продолжение:

_В общий список следующей среды Мика вносит чай из дома, Айрис — несколько печений в упаковке, Рэй — свою воду. Игрок может присоединиться со своим напитком или ничего не приносить; это не скрытая плата за участие. Точный ответ о еде из 010 сохраняется. При несовместимости печенья с известным ограничением выбирают другой вариант до покупки. Две общие чашки пока используют по очереди; остальные приносят свои бутылки или личные чашки._

- **Айрис:** Two mugs. Four people. We are halfway to a collection. — Две чашки. Четыре человека. Мы на полпути к коллекции. _(notebook/dry_smile)_
- **Рэй:** Different colours. Fewer arguments. — Разные цвета. Меньше споров. _(deadpan)_
- **Мика:** Next time, tea if you want it. No compulsory biscuits. — В следующий раз — чай по желанию. Печенье не обязательное. _(phone/happy)_

_Итог занятия:_

- **Айрис:** A few useful things. A little money left. Enough room for all four of us. — Несколько полезных вещей. Немного оставшихся денег. Достаточно места для нас четверых. _(happy)_

**Изменение истории:** итоговый список и расходы сохранены; выбранная мелочь действительно используется. В комнате работают прежний микрофон, новая подставка и ветрозащита, две общие чашки стоят на полке. Флирт не меняет этот результат. Запись во дворе и появление остальных двух чашек оставлены будущим эпизодам.

---

# Страницы героинь — только дополнения 009–012

Существующие страницы и воспоминания не заменять. Новые записи открываются один раз после состоявшегося события. Пищевые сведения — факты персонажей, не медицинские выводы.

## Мика

**Что ты о ней знаешь:**

- Предпочитает неострую еду; немного перца ей подходит. Это предпочтение, не заявленная аллергия. _(после 010)_
- Замечает яркие красивые вещи, но умеет отказаться от покупки ради общей задачи и оставить резерв. _(после 011)_

**Общие воспоминания:**

- На первом общем обеде Мика оставила тебе место рядом и назвала компанию «вполне ничего». Ты ответил, что компания лучше меню. _(только `flirt_mika_009`, после 009)_
- Вы довели общий список до покупки: две разные чашки, одна полезная мелочь и £2 на потом. _(после 012; предмет уточнять по `u012_supply_*`)_

## Рэй

**Что ты о ней знаешь:**

- Не ест мясо и рыбу, но ест сыр. Перед заказом уточняет состав соуса, включая мясной бульон. Аллергия в этом модуле не заявлена. _(после 010)_
- Предпочтёт подходящую подставку новому микрофону, если старый исправен; смотрит на высоту и устойчивость. _(после 011)_

**Общие воспоминания:**

- За обедом Рэй заметила, что ты слушал её пожелания, а не выбирал за неё. Ты поддержал её подколку про следующую встречу. _(только `flirt_rei_010`, после 010)_
- В магазине вы сначала проверили зажим, затем высоту / сначала высоту, затем зажим. Купленная подставка подошла. _(после 011; выбрать порядок по `u011_test_*`)_

## Айрис

**Что ты о ней знаешь:**

- Не любит сырой лук сверху; приготовленный лук в супе ей подходит. Это предпочтение, не аллергия. _(после 010)_
- Хочет оставлять немного общих денег на будущие мелочи; личная еда не входит в бюджет студии. _(после 012)_

**Общие воспоминания:**

- За первым обедом она заметила, что ты дождался её ответа. Ты поддержал её шутку, и она пообещала делать ответы интересными. _(только `flirt_iris_009`, после 009)_
- Вы вместе сверили покупки с остатком: £24 → £8 → £2. На полке появилась половина будущей коллекции чашек. _(после 012)_

_Нейтральная и дружеская реакция не создаёт воспоминание о взаимном флирте. Общие бытовые воспоминания открываются при любом ответе._

# Флаги, возвраты и состояние

| Флаг / выбор | Когда ставится | Где возвращается |
|---|---|---|
| `u009_meal_pasta` / `u009_meal_soup` | 009/8, сцена 1 | 010/8: Нора приносит именно выбранное блюдо; количество пасты/хлеба в упражнениях адаптировать к заказу |
| `flirt_mika_009` | 009/5, только взаимный флирт | Страница Мики; будущие короткие знаки внимания до 080, без автоматического выбора маршрута |
| `flirt_iris_009` | 009/8, сцена 2 | Страница Айрис; 012/5 контекст вопроса о её пожелании совместим с любым прошлым ответом |
| `u010_player_no_mushrooms` / `u010_player_standard` | 010/8, сцена 1, базовая ветка | Состав тарелки игрока в 010/8; вопрос об угощении в списке 012; не считать диагнозом |
| `flirt_rei_010` | 010/5 | Страница Рэй; будущие сцены, не обязательное условие 011/5 |
| `u010_guide_ingredients` / `u010_guide_changes` | 010/8, сцена 2 | Порядок двух советов в локальной карточке; финальный свод ниже |
| `flirt_rei_011` | 011/5 | Короткая условная реплика Рэй в 011/8; будущие знаки внимания |
| `u011_test_clamp` / `u011_test_height` | 011/8, сцена 1 | Реальный порядок теста и воспоминание Рэй |
| `u011_guide_need` / `u011_guide_compare` | 011/8, сцена 2 | Порядок трёх советов в локальной карточке; финальный свод ниже |
| `flirt_iris_012` | 012/5 | Будущие словесные подколки Айрис; не превращает список в любовную записку |
| `u012_supply_clips` / `u012_supply_tape` | 012/8, сцена 1 | Купленный товар, чек, действия в комнате и фото: показывать только выбранное |
| `flirt_mika_012` | 012/8, сцена 2 | Следующие общие планы могут содержать персональную шутку; не свидание |

**Канонические покупки:** 011 — подставка £12 + ветрозащита £4; 012 — две чашки по £2 + одна мелочь £2. Общий расход £22 из £24. Остаток £2. Обед оплачивается отдельно каждым. Снабжение чаем и печеньем на следующую неделю — согласованные предложения, ещё не доставленные предметы.

**Локальная карточка «Lunch» — возврат выбора 010:**

- Если `u010_guide_ingredients`: «Ask what's in the dish. Request any changes before cooking.» — «Спросите состав блюда. Попросите изменения до приготовления».
- Если `u010_guide_changes`: «Request any changes before cooking. Ask what's in the dish if you are unsure.» — «Попросите изменения до приготовления. Если сомневаетесь, спросите состав блюда».
- Общая последняя строка: «Tell staff about allergies and ask them to check the full ingredient information.» — «Сообщите сотрудникам об аллергии и попросите проверить полную информацию о составе».

**Локальная карточка «Shopping» — возврат выбора 011:**

- Если `u011_guide_need`: «Start with the job. Compare the prices. Test your choice.» — «Начните с задачи. Сравните цены. Проверьте выбранное».
- Если `u011_guide_compare`: «Compare the prices. Check what the job needs. Test your choice.» — «Сравните цены. Проверьте, что нужно для задачи. Проверьте выбранное».

**Не создаваемые состояния:** признание, свидание, статус пары, личный чат, опубликованный гид, новая поломка, найденный архив, посещённый закрытый проход, записанная тишина во дворе, купленный новый микрофон, четыре общие чашки.

# Общий чат и арт для переноса

| Момент | Материал | Содержание / перевод |
|---|---|---|
| После 010 | Фото меню, без людей | «Ask about ingredients before ordering.» — «Спросите состав до заказа». Текст отдельной подписью |
| 010, после обеда | Договорённость на пятницу | Три реплики героинь и подтверждение игрока приведены в 010/8 |
| 011/7 | Фото ценников | Подставки £7/£12, микрофоны £18/£28/£40; числа доступны текстом, не только в картинке |
| После 011 | Фото двух покупок, чек | «Stand £12 + windscreen £4. £8 left.» — «Подставка £12 + ветрозащита £4. Осталось £8» |
| 012/2 | Два голосовых | Предложения принести чай и печенье на следующую среду; не подтверждение доставки |
| После 012 | Фото полки, без людей | Две чашки — жёлтая и серо-синяя. «Two mugs. Two pounds left.» — «Две чашки. Осталось два фунта» |

Новые изображения этим сценарием не создавались. Использовать текстовые карточки/заглушки до подготовки арта; не блокировать урок отсутствующей картинкой. Для фото оборудования сохранять расстановку 008, не показывать отсутствующий вариант покупки.

# Свод целевых выражений

| Юнит | Количество | Тематическое ядро |
|---|---:|---|
| 009 | 12 | I'd like…; Could I have…?; Do you have any…?; some rice; any soup; a portion of…; a bowl of…; a slice of…; a bottle of…; anything else?; for here; on the side |
| 010 | 12 | Does it contain…?; What is in…?; without…; on the side; I don't eat…; I'd prefer it without…; I'm allergic to…; How much…?; How many…?; not much; a lot of; check the label |
| 011 | 12 | cheaper than; more expensive than; the cheapest; the best option; as good as; not as tall as; too expensive; tall enough; stable enough; within our budget; compare the prices; try it first |
| 012 | 12 | a few; a little; too many; too much; enough; We need…; We don't need any…; I'll get…; Who's getting…?; one each; leave some money; check the list |

Повтор `on the side` намеренный: в 009 — форма заказа, в 010 — способ попросить изменение. Все переводы даны в начале соответствующего юнита. Разговорные дополнительные фразы флирта не заменяют целевую лексику.

# Самопроверка автора и передача в Claude

- Продолжение начинается на следующей встрече после 008. Общий обед происходит один раз, во второй половине 010. До него меню и заказ — подготовка, а не повторный обед.
- В каждом из четырёх юнитов восемь занятий: чтение; два аудио и диктант; две формы с 6–8 предложениями; продукция с выбором; голосом; беглость/проверка; миссия с двумя выборами.
- Шесть моментов флирта: по два в 009 и 012, по одному в 010 и 011. Героини не состязаются и не комментируют чужую подколку. Каждая получает два собственных момента.
- В каждой сцене выбора по 2–3 намерения и по два принимаемых английских ответа на намерение. На каждый вариант дана своя реакция; непонятный ответ ведёт к спокойному уточнению.
- Языковая ошибка не меняет отношения; нейтральная реакция на внимание не наказывается; повтор не создаёт второе событие. Флаги флирта ставятся только на взаимный ответ.
- Предпочтения Мики и Айрис не названы аллергиями. Рэй — вегетарианка, не веганка. Аллергия на орехи дана только как грамматический пример. Анкета игрока приоритетна.
- Деньги проверяются отдельно: £24 − £16 = £8; £8 − £6 = £2. Обед и возможная домашняя еда не расходуют клубные деньги. Куплена одна из двух мелочей, не обе.
- Дорогой микрофон остаётся на полке магазина. Две чашки — общие; никто не покупает привязанность подарком. Тест подставки сверяется с реальной моделью микрофона и размерами стола.
- Стол из 008 не перемещён; среда 13:00 сохранена. Пятница отдельно согласована. В 012 чашки пустые, продукты на следующую встречу не появляются заранее.
- Личные проблемы, архив, закрытый проход, запись тишины и личные чаты не открыты. Никаких признаний, свиданий и эмоций `blush`, `tender`, `teary`.
- Перед интеграцией Claude сохраняет существующие id 001–008, назначает id только новому контенту, адаптирует новые флаги к реальной схеме. Условные реплики не озвучивать как безусловные; примечания автора не включать в реплики персонажей.
- Это сценарий и редакторский контракт, не готовые JSON, аудио или обновление приложения. Проверка связности выполнена по приложенным версиям 21/23/29/30/33; запуск приложения и проверка реальных ассетов здесь не выполнялись.