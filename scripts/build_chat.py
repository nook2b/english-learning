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
    m = {'from': speaker, 'type': 'text', 'text': found['text'], 'ru': found['ru']}
    if found.get('if'):
        m['if'] = found['if']
    return m


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
]

messages = []
for uid, n, day, items in FEED:
    for k, m in enumerate(items):
        messages.append({'id': f'room17-{uid}-{n}-{k + 1}', 'unlock': {'unit': uid, 'session': n}, 'day': day, **m})
out = {'id': 'room17', 'title': 'Room 17', 'members': ['mika', 'rei', 'iris'], 'messages': messages}
(ROOT / 'content/chats/room17.json').write_text(json.dumps(out, ensure_ascii=False, indent=1) + '\n')
print(len(messages), 'messages')
