#!/usr/bin/env python3
"""Clears background left inside a figure: white pockets between hair strands
or between an arm and the body, white specks and a light dotted edge outside
the black outline. All of it shows on a dark background.

    python3 scripts/fix_white_pockets.py in.png out.png        # one sprite (any 1024x1536 PNG)
    python3 scripts/fix_white_pockets.py in.riv out.riv        # the full-size textures inside a Rive file

The background is near pure white (mean >= 247); the figure's own whites
(socks, sneakers) are shaded (mean ~244) and below LEGS. Only pixels above
LEGS are touched, so socks and shoes stay as they are. Whites of the eyes
touch the iris and are kept: the iris test is tuned for Mika's blue eyes,
check the result before using this on another heroine.
"""
import io
import re
import sys

import numpy as np
from PIL import Image
from scipy import ndimage

LEGS = 1150  # y on the 1024x1536 canvas: socks and shoes start below
MIN_POCKET = 60
POCKET_MEAN = 247
EDGE_PEEL = 2
NEAR = 12  # px from the transparent background
EDGE_LUM = 50  # the black outline is darker; grey is outline blended with the old white background


def borders_iris(mine: np.ndarray, rgb: np.ndarray) -> bool:
    """Whites of the eyes and their highlights touch the blue iris; background never does."""
    ring = ndimage.binary_dilation(mine, iterations=3) & ~mine
    blue = rgb[..., 2] - rgb[..., 0] > 40
    return blue[ring].mean() > 0.03


def fix(im: Image.Image) -> tuple[Image.Image, int]:
    a = np.array(im.convert("RGBA"))
    rgb, alpha = a[..., :3].astype(int), a[..., 3]
    above = np.zeros(alpha.shape, bool)
    above[:LEGS] = True
    clear = np.zeros(alpha.shape, bool)
    # Pockets: near pure white patches (the old background) of some size.
    white = (alpha > 200) & (rgb.min(-1) > 225) & above
    lab, _ = ndimage.label(white)
    for i, sl in enumerate(ndimage.find_objects(lab)):
        m = lab[sl] == i + 1
        if m.sum() < 15 or rgb[sl][m].mean() < 240:
            continue
        box = tuple(slice(max(x.start - 4, 0), x.stop + 4) for x in sl)
        local = lab[box] == i + 1
        if borders_iris(local, rgb[box]):
            continue
        if m.sum() >= MIN_POCKET and rgb[sl][m].mean() >= POCKET_MEAN:
            clear[sl] |= m
            continue
        # A small pocket closed by the black outline (neutral, with its grey anti-aliasing).
        ring = ndimage.binary_dilation(local, iterations=2) & ~local
        neutral = (rgb[box].max(-1) - rgb[box].min(-1) < 30) | (alpha[box] < 10)
        if neutral[ring].mean() > 0.8:
            clear[box] |= local
    # Slivers: light patches of any size next to the transparent background;
    # highlights in the eyes never are.
    near_edge = ndimage.binary_dilation(alpha < 10, iterations=NEAR)
    # Neutral only: light blonde hair and skin highlights are tinted.
    light = (alpha > 200) & (rgb.min(-1) > 170) & (rgb.max(-1) - rgb.min(-1) < 30) & above
    lab, _ = ndimage.label(light)
    for i, sl in enumerate(ndimage.find_objects(lab)):
        m = lab[sl] == i + 1
        if (near_edge[sl] & m).any():
            box = tuple(slice(max(x.start - 4, 0), x.stop + 4) for x in sl)
            if not borders_iris(lab[box] == i + 1, rgb[box]):
                clear[sl] |= m
    # The pale anti-aliasing ring around a pocket goes too.
    ring = ndimage.binary_dilation(clear, iterations=1) & (alpha > 200) & (rgb.min(-1) > 200)
    ring[LEGS:] = False
    clear |= ring
    a[clear, 3] = 0
    # The cut-out edge: outside the black outline, light pixels of the old background
    # (a dotted line on dark). Peeled for up to EDGE_PEEL pixels inward.
    four = ndimage.generate_binary_structure(2, 1)
    lum = rgb.mean(-1)
    for _ in range(EDGE_PEEL):
        edge = (a[..., 3] > 0) & ndimage.binary_dilation(a[..., 3] == 0, four) & (lum > EDGE_LUM)
        a[edge, 3] = 0
        clear |= edge
    return Image.fromarray(a), int(clear.sum())


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


def main() -> int:
    src, dst = sys.argv[1:3]
    if src.endswith(".png"):
        im, n = fix(Image.open(src))
        im.save(dst)
        print(f"{src}: {n} px cleared")
        return 0
    b = open(src, "rb").read()
    out, pos = bytearray(), 0
    for m in re.finditer(rb"\x89PNG\r\n\x1a\n", b):
        start, end = m.start(), b.find(b"IEND", m.start()) + 8
        prefix = varuint(end - start)
        im = Image.open(io.BytesIO(b[start:end]))
        if im.size != (1024, 1536) or b[start - len(prefix) : start] != prefix:
            continue
        fixed, n = fix(im)
        buf = io.BytesIO()
        fixed.save(buf, "PNG", optimize=True)
        out += b[pos : start - len(prefix)] + varuint(buf.tell()) + buf.getvalue()
        pos = end
        print(f"{src}: texture at {start}: {n} px cleared")
    out += b[pos:]
    open(dst, "wb").write(out)
    return 0


if __name__ == "__main__":
    sys.exit(main())
