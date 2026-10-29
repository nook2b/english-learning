#!/usr/bin/env python3
"""Import "{expr}_talk.png" frames as small mouth patches.

A talk frame differs from its sprite only around the mouth. Swapping two
lossy WebPs would make the whole figure shimmer, so we keep only the
changed area (plus a small margin) as a lossless WebP named
"{expr}_talk@{x},{y},{w},{h}.webp" next to the sprite; the app overlays it
at that position while the heroine speaks.

    python3 scripts/import_talk_frames.py <folder with sprite PNGs> <folder with talk PNGs>

Both folders use the {heroine}/{outfit}/{pose}/... layout of the packs.
"""
import pathlib
import sys

from PIL import Image, ImageChops

MARGIN = 6
ROOT = pathlib.Path(__file__).resolve().parent.parent


def main() -> int:
    originals, talks = map(pathlib.Path, sys.argv[1:3])
    for talk_path in sorted(talks.rglob("*_talk.png")):
        rel = talk_path.relative_to(talks)
        expr = talk_path.name[: -len("_talk.png")]
        base_path = originals / rel.parent / f"{expr}.png"
        base = Image.open(base_path).convert("RGBA")
        talk = Image.open(talk_path).convert("RGBA")
        if base.size != talk.size:
            print(f"size mismatch: {rel}", file=sys.stderr)
            return 1
        box = ImageChops.difference(base, talk).convert("L").point(lambda v: 255 if v > 8 else 0).getbbox()
        if not box:
            print(f"no change: {rel}", file=sys.stderr)
            continue
        x0, y0 = max(box[0] - MARGIN, 0), max(box[1] - MARGIN, 0)
        x1, y1 = min(box[2] + MARGIN, talk.width), min(box[3] + MARGIN, talk.height)
        out_dir = ROOT / "assets/characters" / rel.parent
        for old in out_dir.glob(f"{expr}_talk@*.webp"):
            old.unlink()
        out = out_dir / f"{expr}_talk@{x0},{y0},{x1 - x0},{y1 - y0}.webp"
        talk.crop((x0, y0, x1, y1)).save(out, "WEBP", lossless=True)
        print(f"{rel.parent}/{out.name} {out.stat().st_size} B")
    return 0


if __name__ == "__main__":
    sys.exit(main())
