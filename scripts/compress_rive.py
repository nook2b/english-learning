#!/usr/bin/env python3
"""Shrinks the textures embedded in Rive files, keeping everything else.

A .riv from the kit is ~95% lossless PNG textures. Each one is stored as a
length-prefixed byte field (varuint length + bytes) with no absolute offsets
elsewhere, so it can be swapped for a smaller encoding in place.

    python3 scripts/compress_rive.py in.riv out.riv [--mode webp|quant] [--quality 90]

webp: lossy WebP (the Rive runtime decodes it); quant: 256-colour PNG without
dithering (what TinyPNG does). Check the result with a render comparison before
replacing the files in assets/rive (see docs/22-rive-brief.md).
"""
import argparse
import io
import re
import sys

from PIL import Image


def varuint(n: int) -> bytes:
    out = bytearray()
    while True:
        x = n & 0x7F
        n >>= 7
        if n:
            out.append(x | 0x80)
        else:
            out.append(x)
            return bytes(out)


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
    out = bytearray()
    pos = 0
    count = 0
    for m in re.finditer(rb"\x89PNG\r\n\x1a\n", b):
        start = m.start()
        end = b.find(b"IEND", start) + 8
        prefix = varuint(end - start)
        if b[start - len(prefix) : start] != prefix:
            print(f"PNG at {start} is not a length-prefixed field; left as is", file=sys.stderr)
            continue
        new = encode(b[start:end], args.mode, args.quality)
        if len(new) >= end - start:
            continue
        out += b[pos : start - len(prefix)] + varuint(len(new)) + new
        pos = end
        count += 1
    out += b[pos:]
    open(args.dst, "wb").write(out)
    print(f"{args.src}: {len(b)} -> {len(out)} bytes ({len(out) / len(b):.0%}), {count} textures")
    return 0


if __name__ == "__main__":
    sys.exit(main())
