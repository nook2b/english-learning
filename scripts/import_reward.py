#!/usr/bin/env python3
"""Import the celebration pictures from docs/29-reward-art-brief.md.

Takes the PNGs named as in the brief ({heroine}_{moment}.png, trio_{moment}.png),
checks the size and the transparent background, scales them for the app and
writes WebP files to assets/reward/. The app picks them up by name
(app/src/story/RewardArt.tsx); a missing picture falls back to the heroine's sprite.

    python3 scripts/import_reward.py <folder with PNGs>
"""
import pathlib
import sys

from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "assets/reward"

HEROINES = ("mika", "rei", "iris")
SOLO = [f"{h}_{m}" for h in HEROINES for m in ("session", "quest", "welcome")] + ["rei_challenge_win", "rei_challenge_next"]
TRIO = ["trio_mission", "trio_module", "trio_streak"]

# Shown at about 250 points (solo) and 420 points wide (trio): twice that covers retina screens.
SOLO_SIZE = 640
TRIO_WIDTH = 960


def main() -> int:
    src = pathlib.Path(sys.argv[1])
    OUT.mkdir(parents=True, exist_ok=True)
    problems = 0
    for name in SOLO + TRIO:
        path = src / f"{name}.png"
        if not path.exists():
            print(f"missing: {name}.png")
            continue
        img = Image.open(path).convert("RGBA")
        corners = [img.getpixel(p)[3] for p in ((0, 0), (img.width - 1, 0), (0, img.height - 1), (img.width - 1, img.height - 1))]
        if max(corners[:2]) > 0:
            print(f"warning: {name}.png has no transparent background at the top corners")
            problems += 1
        if name in TRIO:
            if abs(img.width / img.height - 1.5) > 0.05:
                print(f"warning: {name}.png is {img.width}x{img.height}, the brief asks for 3:2")
                problems += 1
            size = (TRIO_WIDTH, round(TRIO_WIDTH * img.height / img.width))
        else:
            if img.width != img.height:
                print(f"warning: {name}.png is {img.width}x{img.height}, the brief asks for a square")
                problems += 1
            size = (SOLO_SIZE, round(SOLO_SIZE * img.height / img.width))
        img.resize(size, Image.LANCZOS).save(OUT / f"{name}.webp", "WEBP", quality=88, method=6)
        print(f"ok: {name}.webp {size[0]}x{size[1]}")
    extra = sorted(p.name for p in src.glob("*.png") if p.stem not in SOLO + TRIO)
    if extra:
        print("not in the brief, skipped:", ", ".join(extra))
    return 0 if problems == 0 else 2


if __name__ == "__main__":
    sys.exit(main())
