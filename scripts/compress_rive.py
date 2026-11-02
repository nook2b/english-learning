#!/usr/bin/env python3
"""Shrinks the textures embedded in Rive files, keeping everything else.

A .riv from the kit is ~95% lossless textures (PNG or lossless WebP), each
swappable in place (scripts/rive_textures.py) for a smaller encoding.

    python3 scripts/compress_rive.py in.riv out.riv [--mode webp|quant] [--quality 90]

webp: lossy WebP (the Rive runtime decodes it); quant: 256-colour PNG without
dithering (what TinyPNG does). Check the result with a render comparison before
replacing the files in assets/rive (see docs/22-rive-brief.md).
"""
import argparse
import io
import sys

from PIL import Image
from rive_textures import rewrite


def encode(data: bytes, mode: str, quality: int) -> bytes:
    im = Image.open(io.BytesIO(data)).convert("RGBA")
    out = io.BytesIO()
    if mode == "webp":
        # exact keeps the colour under fully transparent pixels: no halos at layer edges.
        im.save(out, "WEBP", quality=quality, method=6, exact=True)
    else:
        im.quantize(256, method=Image.Quantize.FASTOCTREE, dither=Image.Dither.NONE).save(out, "PNG", optimize=True)
    return out.getvalue()


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("src")
    ap.add_argument("dst")
    ap.add_argument("--mode", choices=["webp", "quant"], default="webp")
    ap.add_argument("--quality", type=int, default=90)
    args = ap.parse_args()
    b = open(args.src, "rb").read()

    def change(_: int, data: bytes, kind: str) -> bytes | None:
        # Already lossy WebP stays as it is; PNG and lossless WebP are re-encoded when smaller.
        if kind == "webp":
            return None
        new = encode(data, args.mode, args.quality)
        return new if len(new) < len(data) else None

    out, count = rewrite(b, change)
    open(args.dst, "wb").write(out)
    print(f"{args.src}: {len(b)} -> {len(out)} bytes ({len(out) / len(b):.0%}), {count} textures")
    return 0


if __name__ == "__main__":
    sys.exit(main())
