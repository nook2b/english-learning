#!/usr/bin/env python3
"""Builds content/chats/room17.json: the team chat "Room 17" as it grows along the course.

Voice messages come from the units (listening tasks whose context says they were sent to
the chat, and the timetable voices of 003); texts, photos and the player's own messages
are listed below. Each message opens when its session is done (unlock unit + session).

    python3 scripts/build_chat.py
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
units = {p.stem[5:]: json.loads(p.read_text()) for p in sorted((ROOT / 'content/course/s1/a1').glob('unit-*.json'))}


def line(uid, n, speaker, start):
    """A story line of a session, found by its speaker and first words."""
    s = units[uid]['sessions'][n - 1]
    pool = (s.get('frame') or {}).get('lines', []) + s.get('wrap', [])
    for e in s['exercises']:
        if e['type'] == 'scene':
            pool += e['lines'] + e.get('after', [])
    found = next(l for l in pool if l['speaker'] == speaker and l['text'].startswith(start))
    return as_message(found)


def as_message(found):
    m = {'from': found['speaker'], 'type': 'text', 'text': found['text'], 'ru': found['ru']}
    for k in ('if', 'ifNot'):
        if found.get(k):
            m[k] = found[k]
    return m


def lines(uid, n, speaker, start):
    """Every variant of a line (lines that depend on a choice come in several)."""
    s = units[uid]['sessions'][n - 1]
    pool = (s.get('frame') or {}).get('lines', []) + s.get('wrap', [])
    return [as_message(l) for l in pool if l['speaker'] == speaker and l['text'].startswith(start)]


def voices(uid, n):
    out = []
    for e in units[uid]['sessions'][n - 1]['exercises']:
        in_chat = 'чат' in (e.get('context') or '').lower() or (uid == '003' and n == 2)
        if e['type'] == 'listening' and in_chat:
            m = {'from': e['speaker'], 'type': 'voice', 'text': e['audio'], 'ru': e['ru']}
            if e.get('delivery'):
                m['delivery'] = e['delivery']
            out.append(m)
    return out


def photo(sender, image, about, caption=None, caption_ru=None, **cond):
    m = {'from': sender, 'type': 'photo', 'image': image, 'about': about}
    if caption:
        m.update(caption=caption, captionRu=caption_ru)
    m.update(cond)
    return m


def me(text, ru):
    return {'from': 'me', 'type': 'text', 'text': text, 'ru': ru}


def reply(intents, clarify, **cond):
    """The player answers in the chat (docs/55): pick an intent, write it in English; heroines react."""
    return {'from': 'me', 'type': 'reply', 'intents': [{'label': l, 'answers': a, 'reaction': r} for l, a, r in intents], 'clarify': clarify, **cond}


def say(who, text, ru, expr=None):
    return {'from': who, 'text': text, 'ru': ru, **({'expr': expr} if expr else {})}


def system(ru):
    return {'from': 'system', 'type': 'system', 'ru': ru}


# (unit, session, label for the day divider, messages)
FEED = [
    ('003', 2, 'Вторник, вечер', [system('Мика добавила тебя в чат «Room 17»'), line('003', 2, 'mika', 'I asked everyone'), *voices('003', 2)]),
    ('003', 8, 'Среда', [system('Общий час команды: среда, 13:00')]),
    ('005', 2, 'Пятница', [photo('iris', 'chat_005_floorplan', 'План этажа с пометками ручкой'), *voices('005', 2)]),
    ('006', 2, 'Понедельник', [photo('mika', 'chat_006_light', 'Мигающий индикатор записи над дверью'), *voices('006', 2)]),
    ('007', 2, 'Вторник', voices('007', 2)),
    ('008', 2, 'Среда', voices('008', 2)),
    ('008', 8, 'Среда, после обустройства', [
        line('008', 8, 'mika', 'We can actually work'),
        photo('iris', 'chat_008_room_after_window', 'Комната 17 после обустройства: письменный стол у окна', 'Room photo, no people.', 'Фото комнаты, без людей.', **{'if': 'u008_layout_window'}),
        photo('iris', 'chat_008_room_after_wall', 'Комната 17 после обустройства: письменный стол у стены', 'Room photo, no people.', 'Фото комнаты, без людей.', ifNot='u008_layout_window'),
    ]),
    ('010', 8, 'Среда, после обеда', [
        photo('mika', 'chat_010_menu', 'Меню столовой на стойке'),
        line('010', 8, 'mika', 'Shop on Friday'), line('010', 8, 'rei', 'Free. We need'), line('010', 8, 'iris', 'Free too.'),
        me('Friday at four works for me.', 'Пятница в четыре мне подходит.'),
    ]),
    ('011', 7, 'Пятница', [photo('mika', 'chat_011_prices', 'Ценники на полке: подставки £7 и £12, микрофоны £18, £28, £40')]),
    ('011', 8, 'Пятница, после магазина', [
        photo('mika', 'chat_011_receipt', 'Подставка, ветрозащита и чек на столе', 'Stand £12 + windscreen £4. £8 left.', 'Подставка £12 + ветрозащита £4. Осталось £8.'),
        line('011', 8, 'mika', 'Eight pounds left'),
    ]),
    ('012', 2, 'Среда', voices('012', 2)),
    ('012', 8, 'Среда, после покупки', [
        photo('iris', 'chat_012_shelf_clips', 'Полка с двумя чашками, кабель закреплён зажимами', 'Two mugs. Two pounds left.', 'Две чашки. Осталось два фунта.', **{'if': 'u012_supply_clips'}),
        photo('iris', 'chat_012_shelf_tape', 'Полка с двумя чашками, коробки подписаны лентой', 'Two mugs. Two pounds left.', 'Две чашки. Осталось два фунта.', **{'if': 'u012_supply_tape'}),
    ]),
    ('013', 2, 'Среда, во дворе', [voices('013', 2)[0], reply([
        ('Сравнить, что слышно обычно и сейчас', ["You usually hear people talking, but right now you hear the drill.", "People usually talk near the benches, but the drill is louder today.", "Usually you hear people talking, but right now you hear the drill.", "People usually talk here, but right now the drill is louder."], [say('rei', 'Yep. The drill wins today.', 'Ага. Сегодня побеждает дрель.', 'recorder/smirk')]),
        ('Описать, как изменился двор', ["It's usually quiet here, but they're drilling today.", "It's usually quiet, but the drill is making a lot of noise right now.", "It is usually quiet here, but they are drilling today.", "It's usually quiet here, but today it's noisy."], [say('rei', "That's the courtyard today. Save that line.", 'Вот такой сегодня двор. Сохрани эту строчку.', 'recorder/neutral')]),
    ], say('rei', 'Usually, or right now?', 'Обычно или прямо сейчас?', 'recorder/listening')), *voices('013', 2)[1:], photo('rei', 'chat_013_ladder', 'Стремянка и инструменты у стены двора', 'Not our equipment.', 'Это оборудование не наше.')]),
    ('014', 2, 'Пятница, перед второй попыткой', [voices('014', 2)[0], reply([
        ('Назвать помеху и попросить повторить', ["The fan is too loud. Could you repeat the last part, please?", "They're moving chairs behind you. Could you say that last bit again?", "The fan is too loud. Could you repeat that, please?", "It's too loud. Could you say that again, please?"], [say('mika', "Sure! I'm coming back to the bench.", 'Конечно! Я возвращаюсь к скамейке.', 'phone/happy')]),
        ('Попросить записать следующее сообщение у скамейки', ["The fan is running above you. Could you send the next message from the bench?", "The chairs are pretty loud. Could you record the next one by the bench, please?", "It's too loud there. Could you record the next message by the bench?", "Could you send the next message from the bench, please?"], [say('mika', "Good idea. I'll wait until I get there.", 'Хорошая идея. Подожду, пока дойду.', 'phone/neutral')]),
    ], say('mika', 'Sorry, what would you like me to do?', 'Прости, что ты хочешь, чтобы я сделала?', 'listening')), *voices('014', 2)[1:], photo('iris', 'chat_014_notice', 'Объявление о работах во дворе: Wed, 17:00', 'The important part.', 'Самое важное.')]),
    ('014', 8, 'Пятница, после попытки', [{'from': 'mika', 'type': 'text', 'text': "No recording today. We'll check new times on Monday.", 'ru': 'Сегодня не записываем. В понедельник выберем другое время.'}]),
    ('015', 2, 'Понедельник, сверка расписаний', [*voices('015', 2), {'from': 'rei', 'type': 'text', 'text': 'Friday after three thirty. Or Saturday morning. Both work.', 'ru': 'В пятницу после половины четвёртого. Или в субботу утром. Оба подходят.'}, reply([
        ('Согласиться на пятницу', ["Friday at four works for me.", "I can do Friday at four.", "Friday at four is fine for me.", "Friday works for me."], [say('mika', 'Got it. Friday at four stays on the list.', 'Поняла. Пятницу в четыре оставляю в списке.', 'phone/happy')]),
        ('Отклонить пятницу и предложить субботу', ["I'd rather not meet on Friday. How about Saturday at eleven?", "Friday at four isn't ideal for me. Could we meet on Saturday at eleven?", "I'm afraid Friday doesn't work for me. How about Saturday at eleven?", "How about Saturday at eleven instead?"], [say('mika', 'Noted. Saturday at eleven is on the list too.', 'Записала. Суббота в одиннадцать тоже в списке.', 'phone/neutral')]),
    ], say('mika', 'Which day and time work for you?', 'Какой день и время тебе подходят?', 'listening'))]),
    ('015', 8, 'Понедельник, после выбора', [
        photo('mika', 'chat_015_board_fri', 'Доска: выбрана пятница, 16:00, суббота зачёркнута', 'One time, four people.', 'Одно время, четыре человека.', ifNot='u015_slot_sat11'),
        photo('mika', 'chat_015_board_sat', 'Доска: выбрана суббота, 11:00, пятница зачёркнута', 'One time, four people.', 'Одно время, четыре человека.', **{'if': 'u015_slot_sat11'}),
    ]),
    ('016', 2, 'Четверг, подтверждения', [*lines('016', 2, 'mika', 'Confirmed:'), *lines('016', 2, 'iris', 'That works.'), *lines('016', 2, 'rei', 'Confirmed. I'), reply([
        ('Подтвердить встречу и выключить звук на своём телефоне', ["See you in the courtyard at four on Friday. I'll put my phone on silent.", "We're meeting in the courtyard on Friday at four, right? I'll turn off my phone's sound.", "See you in the courtyard on Friday at four. I'll put my phone on silent.", "We're meeting in the courtyard on Friday at four, right? I'll put my phone on silent."], [say('rei', "Right. I'll do the same.", 'Да. Я тоже отключу.', 'neutral')]),
        ('Подтвердить встречу и прислушаться к фону', ["Just to confirm, we're meeting in the courtyard on Friday at four. I'll listen for background noise.", "Courtyard, Friday at four. I'll check how quiet it is.", "Just to confirm, we're meeting in the courtyard on Friday at four. I'll check the background noise.", "Courtyard, Friday at four. I'll listen for background noise."], [say('rei', 'Right. Tell me what you hear.', 'Да. Скажи, что услышишь.', 'neutral')]),
    ], say('rei', 'Which time did we agree on?', 'На какое время мы договорились?', 'listening'), ifNot='u015_slot_sat11'), reply([
        ('Подтвердить встречу и выключить звук на своём телефоне', ["See you in the courtyard at eleven on Saturday. I'll put my phone on silent.", "We're meeting in the courtyard on Saturday at eleven, right? I'll turn off my phone's sound.", "See you in the courtyard on Saturday at eleven. I'll put my phone on silent.", "We're meeting in the courtyard on Saturday at eleven, right? I'll put my phone on silent."], [say('rei', "Right. I'll do the same.", 'Да. Я тоже отключу.', 'neutral')]),
        ('Подтвердить встречу и прислушаться к фону', ["Just to confirm, we're meeting in the courtyard on Saturday at eleven. I'll listen for background noise.", "Courtyard, Saturday at eleven. I'll check how quiet it is.", "Just to confirm, we're meeting in the courtyard on Saturday at eleven. I'll check the background noise.", "Courtyard, Saturday at eleven. I'll listen for background noise."], [say('rei', 'Right. Tell me what you hear.', 'Да. Скажи, что услышишь.', 'neutral')]),
    ], say('rei', 'Which time did we agree on?', 'На какое время мы договорились?', 'listening'), **{'if': 'u015_slot_sat11'})]),
    ('016', 8, 'После записи', [photo('rei', 'chat_016_recorder', 'Экран рекордера: длина фонового клипа 00:10', 'Ten seconds. Finally.', 'Десять секунд. Наконец-то.')]),
]

messages = []
for uid, n, day, items in FEED:
    # Player replies have their own numbers, so the ids of the other messages (kept as "seen") stay put.
    k = r = 0
    for m in items:
        if m['type'] == 'reply':
            r += 1
            mid = f'room17-{uid}-{n}-r{r}'
        else:
            k += 1
            mid = f'room17-{uid}-{n}-{k}'
        messages.append({'id': mid, 'unlock': {'unit': uid, 'session': n}, 'day': day, **m})
out = {'id': 'room17', 'title': 'Room 17', 'members': ['mika', 'rei', 'iris'], 'messages': messages}
(ROOT / 'content/chats/room17.json').write_text(json.dumps(out, ensure_ascii=False, indent=1) + '\n')
print(len(messages), 'messages')
