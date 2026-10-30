#!/usr/bin/env python3
"""Generate voice clips for course content with ElevenLabs.

Collects every line a heroine speaks (story frames and wraps, scene lines,
reactions, clarifications, chat lines on the heroine pages), listening and dictation audio and English
read-aloud samples, and writes assets/audio/{speaker}/{key}.mp3. The key is
the same FNV-1a hash the app computes (app/src/speech/clips.ts) over the
voiced text: the line with its ElevenLabs audio tags (app/src/speech/delivery.ts,
docs/14-voice.md). Changing a line or its delivery means a new clip; existing
files are skipped.

    python3 scripts/generate_audio.py --dry-run      # what would be generated
    python3 scripts/generate_audio.py [--unit 001]   # generate

Needs access to api.elevenlabs.io/v1/text-to-speech; the key comes from
ELEVENLABS_API_KEY or is injected by the environment's proxy.
"""
import argparse
import json
import os
import pathlib
import sys
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent


def clip_key(speaker: str, text: str) -> str:
    h = 0x811C9DC5
    for b in f"{speaker}|{text.strip()}".encode("utf-8"):
        h ^= b
        h = (h * 0x01000193) & 0xFFFFFFFF
    return f"{h:08x}"


def voiced_text(text: str, expr=None, delivery=None, by_expr=None) -> str:
    """Same rule as app/src/speech/delivery.ts: explicit tags win, else the sprite emotion's tag."""
    tags = delivery or (by_expr or {}).get((expr or "").split("/")[-1])
    return f"{tags} {text.strip()}" if tags else text.strip()


def lines_of(unit: dict):
    """Yields (speaker, text, expr, delivery)."""
    for s in unit["sessions"]:
        for line in (s.get("frame") or {}).get("lines", []) + s.get("wrap", []):
            yield line["speaker"], line["text"], line.get("expr"), line.get("delivery")
        for e in s["exercises"]:
            t = e["type"]
            if t == "scene":
                for line in e["lines"] + [i["reaction"] for i in e["intents"]] + [e["clarify"]]:
                    yield line["speaker"], line["text"], line.get("expr"), line.get("delivery")
            elif t in ("listening", "dictation"):
                yield e["speaker"], e["audio"], None, e.get("delivery")
            elif t == "speak" and e["show"] == "en" and e.get("voice"):
                yield e["voice"], e["text"], None, e.get("delivery")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--unit", help="only this unit id, e.g. 001")
    ap.add_argument("--prune", action="store_true", help="delete clips no line uses any more (changed or removed lines)")
    args = ap.parse_args()

    config = json.loads((ROOT / "content/voices.json").read_text())
    voices = config["voices"]
    by_expr = config["deliveryByExpr"]
    todo = {}
    needed = set()
    for path in sorted((ROOT / "content/course").rglob("unit-*.json")):
        unit = json.loads(path.read_text())
        if args.unit and unit["id"] != args.unit:
            continue
        for speaker, text, expr, delivery in lines_of(unit):
            if speaker not in voices:
                continue
            voiced = voiced_text(text, expr, delivery, by_expr)
            out = ROOT / "assets/audio" / speaker / f"{clip_key(speaker, voiced)}.mp3"
            needed.add(out)
            if not out.exists():
                todo[out] = (speaker, voiced)

    if not args.unit:
        for path in sorted((ROOT / "content/characters").glob("*.json")):
            ch = json.loads(path.read_text())
            for line in ch.get("lines", []):
                voiced = voiced_text(line["text"], line.get("expr"), line.get("delivery"), by_expr)
                out = ROOT / "assets/audio" / ch["id"] / f"{clip_key(ch['id'], voiced)}.mp3"
                needed.add(out)
                if not out.exists():
                    todo[out] = (ch["id"], voiced)

    if not args.unit:
        # After-class review lines (content/after-class.json): heroine -> state -> line.
        for hid, states in json.loads((ROOT / "content/after-class.json").read_text()).items():
            for line in states.values():
                voiced = voiced_text(line["text"], line.get("expr"), line.get("delivery"), by_expr)
                out = ROOT / "assets/audio" / hid / f"{clip_key(hid, voiced)}.mp3"
                needed.add(out)
                if not out.exists():
                    todo[out] = (hid, voiced)

    if args.prune and not args.unit:
        stale = [f for f in (ROOT / "assets/audio").rglob("*.mp3") if f not in needed]
        for f in stale:
            f.unlink()
        print(f"{len(stale)} unused clips deleted")

    chars = sum(len(t) for _, t in todo.values())
    print(f"{len(todo)} clips to generate, {chars} characters")
    if args.dry_run:
        for out, (speaker, text) in todo.items():
            print(f"  {speaker:5} {out.name}  {text}")
        return 0

    key = os.environ.get("ELEVENLABS_API_KEY", "injected-by-proxy")
    for n, (out, (speaker, text)) in enumerate(todo.items(), 1):
        req = urllib.request.Request(
            f"https://api.elevenlabs.io/v1/text-to-speech/{voices[speaker]}?output_format={config['format']}",
            data=json.dumps({"text": text, "model_id": config["model"], "voice_settings": config["voice_settings"]}).encode(),
            headers={"xi-api-key": key, "content-type": "application/json", "accept": "audio/mpeg"},
        )
        try:
            with urllib.request.urlopen(req, timeout=120) as resp:
                data = resp.read()
        except urllib.error.HTTPError as e:
            print(f"failed on {speaker}: {text!r}: HTTP {e.code} {e.read()[:300]!r}", file=sys.stderr)
            return 1
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_bytes(data)
        print(f"[{n}/{len(todo)}] {speaker} {out.name} {len(data) // 1024} KB")
    return 0


if __name__ == "__main__":
    sys.exit(main())
