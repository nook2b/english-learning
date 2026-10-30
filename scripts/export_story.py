#!/usr/bin/env python3
"""Exports everything the story says into one readable document.

python3 scripts/export_story.py            # writes docs/21-story-script.md

The document is generated from content/ (units, heroine pages, after-class
lines): edit the content, not the document, then run this again. Ids in
brackets point at the place in the content files.
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
NAMES = {"mika": "Мика", "rei": "Рэй", "iris": "Айрис", "newcomer": "Новичок", "narrator": "Диктор"}
KINDS = {"comprehension": "понимание", "form": "форма", "production": "продукция", "fluency": "беглость"}


def say(line, indent=""):
    who = NAMES.get(line["speaker"], line["speaker"])
    extra = []
    if line.get("expr"):
        extra.append(line["expr"])
    if line.get("delivery"):
        extra.append(line["delivery"])
    tail = f" _({', '.join(extra)})_" if extra else ""
    ru = f" — {line['ru']}" if line.get("ru") else ""
    return f"{indent}- **{who}:** {line['text']}{ru}{tail}"


def unit_story(unit):
    out = [f"## Юнит {unit['id']}. {unit['title']}", "", f"**Цель:** {unit['goal']}", "", f"**Итог юнита:** {unit['outcome']}", ""]
    for n, s in enumerate(unit["sessions"], 1):
        role = {"mission": " · миссия", "check": " · проверка модуля"}.get(s.get("role", ""), "")
        out += [f"### Занятие {n}. {s['title']} ({KINDS[s['kind']]}{role})", ""]
        if s.get("frame"):
            out += [f"_{s['frame']['setting']}_", ""] + [say(l) for l in s["frame"]["lines"]] + [""]
        for e in s["exercises"]:
            ctx = f" · {e['context']}" if e.get("context") else ""
            if e["type"] == "reading":
                look = {"letter": "письмо", "notice": "объявление", "note": "тетрадный лист"}.get(e.get("look", ""), "текст")
                out += [f"**Чтение [{e['id']}]: «{e['title']}»** ({look}{ctx})", ""]
                # Each line of the text is its own paragraph in the quote.
                out += "\n>\n".join(f"> {p}" for p in e["text"].split("\n")).split("\n") + [""]
                if e.get("ru"):
                    out += [f"_Перевод:_ {e['ru']}", ""]
            elif e["type"] == "listening":
                out += [f"**Аудирование [{e['id']}]**{ctx}", "", say({"speaker": e["speaker"], "text": e["audio"], "ru": e.get("ru"), "delivery": e.get("delivery")}), ""]
            elif e["type"] == "dictation":
                out += [f"**Диктант [{e['id']}]**{ctx}", "", say({"speaker": e["speaker"], "text": e["audio"], "delivery": e.get("delivery")}), ""]
            elif e["type"] == "scene":
                out += [f"**Сцена [{e['id']}]**{ctx}", "", f"_{e['setting']}_", ""] + [say(l) for l in e["lines"]]
                out += ["", "Выбор намерения:"]
                for it in e["intents"]:
                    flag = f" · флаг `{it['flag']}`" if it.get("flag") else ""
                    out += [f"- _{it['label']}_ → «{it['answers'][0]}»{flag}", say(it["reaction"], "  ")]
                out += ["", "Если ответ непонятен:", say(e["clarify"]), ""]
        if s.get("wrap"):
            out += ["_Итог занятия:_", ""] + [say(l) for l in s["wrap"]] + [""]
    return out


def unlock(u):
    return f"после юнита {u['unit']}" if u.get("unit") else f"флаг `{u['flag']}`"


def heroine_page(c):
    out = [f"## {c['name']}", "", c["about"], "", "**Что ты о ней знаешь:**", ""]
    out += [f"- {f['ru']} _({unlock(f['unlock'])})_" for f in c["facts"]]
    out += ["", "**Общие воспоминания:**", ""]
    out += [f"- {m['en']} — {m['ru']} _({unlock(m['unlock'])})_" for m in c["memories"]]
    out += ["", "**Реплики «Поболтать»:**", ""]
    out += [f"{say({'speaker': c['id'], **l})} _({unlock(l['unlock'])})_" for l in c["lines"]]
    out += ["", "**Личные квесты:**", ""]
    out += [f"- **{q['title']}** (юниты {q['window']}): {q['change']}" for q in c["quests"]]
    return out + [""]


def main():
    units = [json.loads(p.read_text()) for p in sorted((ROOT / "content/course").rglob("unit-*.json"))]
    chars = {p.stem: json.loads(p.read_text()) for p in sorted((ROOT / "content/characters").glob("*.json"))}
    after = json.loads((ROOT / "content/after-class.json").read_text())
    out = [
        "# English Club — весь написанный сюжет",
        "",
        "Собрано скриптом `scripts/export_story.py` из `content/`: все реплики, сцены, тексты и аудио юнитов, страницы героинь и реплики «После уроков». "
        "Документ для чтения и правок: правки переносятся в контент, после чего документ собирается заново. "
        "В скобках — id задания в файлах юнитов, курсивом — эмоция спрайта и теги голоса.",
        "",
        "Общий замысел, герои и сезоны — в [сюжетной библии](06-story-bible.md); хронология, правила сцен и контракт сохранений — в [23-story-rules.md](23-story-rules.md).",
        "",
        "## Содержание",
        "",
    ]
    out += ["- [Пролог. Не тот кабинет](#пролог-не-тот-кабинет)"]
    out += [f"- [Юнит {u['id']}. {u['title']}](#юнит-{u['id']}-{u['title'].lower().replace(' ', '-')})" for u in units]
    out += ["- [Страницы героинь](#страницы-героинь)", "- [После уроков](#после-уроков)", "", "---", ""]
    # The prologue (content/story/prologue.json) is one session before unit 001.
    prologue = json.loads((ROOT / "content/story/prologue.json").read_text())
    section = unit_story({"id": "", "title": "", "goal": "безопасно попробовать переспрос и представление (вводная с подсказками); понедельник, около 9:40, до проверки в 10:00", "outcome": "игрока позвали вернуться в комнату 17 после проверки; дальше — кабинет 70 и переход «Вернуться в комнату 17»", "sessions": [prologue]})
    section[0] = "## Пролог. Не тот кабинет"
    section = [l.replace("**Итог юнита:**", "**Итог пролога:**") for l in section]
    section = [l for l in section if not l.startswith("### Занятие 1.")]
    out += section + ["---", ""]
    for u in units:
        out += unit_story(u) + ["---", ""]
    out += ["# Страницы героинь", ""]
    for hid in ("mika", "rei", "iris"):
        out += heroine_page(chars[hid])
    out += ["---", "", "# После уроков", "", "Реплики на вкладке «Повторение»: говорит первая из пары дня.", ""]
    states = {"due": "есть что разобрать", "waiting": "всё ждёт своего дня", "empty": "ничего не накопилось", "done": "раунд окончен"}
    for hid in ("mika", "rei", "iris"):
        out += [f"**{NAMES[hid]}**", ""] + [f"{say({'speaker': hid, **after[hid][k]})} · _{v}_" for k, v in states.items()] + [""]
    (ROOT / "docs/21-story-script.md").write_text("\n".join(out) + "\n")
    print("docs/21-story-script.md:", len(out), "lines")


if __name__ == "__main__":
    main()
