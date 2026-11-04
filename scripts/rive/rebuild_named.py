"""Puts new frames into artboards of a heroine's .riv, finding each texture by its asset name.

    python3 scripts/rive/rebuild_named.py in.riv KIT HEROINE out.riv ARTBOARD [ARTBOARD ...]

For artboard A the kit holds KIT/sprites/A/{heroine}_A_base.png and, per emotion E,
{heroine}_A_E.png, _half, _open, _blink. Assets are named "A E mouth open|half|closed",
"A E eyelids", "A E face", "A Body", "A Fixed Skin" and full-canvas layers; patches are
recut from the frames where they changed and moved under the artboard's "Head Breath Anchor".
"""
import io, os, struct, sys
sys.path.insert(0, 'scripts'); sys.path.insert(0, 'scripts/rive')
import numpy as np
from PIL import Image
from scipy import ndimage
from rive_textures import rewrite, textures
from rivparse import parse

SRC, KIT, H, OUT, *BOARDS = sys.argv[1:]
b = bytearray(open(SRC, 'rb').read())
_, objs = parse(bytes(b))
props = lambda p: {k: (v, s) for k, _, v, s, e in p}
assets = [props(p).get(203, (b'',))[0].decode() for t, p, *_ in objs if t == 105]
anchor, board = {}, None
for t, p, *_ in objs:
    d = props(p)
    if t == 1: board = d[4][0].decode()
    if t == 2 and d.get(4, (b'',))[0] == b'Head Breath Anchor': anchor[board] = (d.get(13, (0,))[0], d.get(14, (0,))[0])
old = [np.array(Image.open(io.BytesIO(bytes(b[s:e]))).convert('RGBA')) for s, e, k in textures(bytes(b))]

def load(p): return np.array(Image.open(p).convert('RGBA'))
def diff(a, c): return np.abs(a.astype(int) - c.astype(int)).sum(axis=2) > 24
def region(m, grow):
    m = ndimage.binary_fill_holes(ndimage.binary_dilation(m, iterations=grow)); ys, xs = np.nonzero(m)
    return m, (xs.min(), ys.min(), xs.max() + 1, ys.max() + 1)
def patch(f, m, box):
    x0, y0, x1, y1 = box; out = f[y0:y1, x0:x1].copy()
    out[:, :, 3] = np.where(m[y0:y1, x0:x1], f[y0:y1, x0:x1, 3], 0); return out
def png(a):
    o = io.BytesIO(); Image.fromarray(a.astype(np.uint8)).save(o, 'PNG'); return o.getvalue()

new, moves = {}, {}
for A in BOARDS:
    base = load(f'{KIT}/sprites/{A}/{H}_{A}_base.png')
    ax, ay = anchor[A]
    # Emotions drawn in the kit; other faces of a copied artboard (Mika's "left happy face" for `look`) stay as they are.
    emos = sorted({n[len(A) + 1:].rsplit(' face', 1)[0] for n in assets if n.startswith(A + ' ') and n.endswith(' face')})
    emos = [e for e in emos if os.path.exists(f'{KIT}/sprites/{A}/{H}_{A}_{e}.png')]
    for i, n in enumerate(assets):
        if not n.startswith(A + ' '): continue
        role = n[len(A) + 1:]
        if role == 'Body': new[i] = base
        elif role == 'Fixed Skin': new[i] = np.zeros((1, 1, 4), np.uint8)
        elif old[i].shape[:2] == base.shape[:2] and not any(w in role for w in ('mouth', 'eyelids', 'face', 'left', 'right')):
            a = base.copy(); a[:, :, 3] = np.minimum(base[:, :, 3], old[i][:, :, 3]); new[i] = a  # layer
    for e in emos:
        f = lambda s: load(f'{KIT}/sprites/{A}/{H}_{A}_{e}{s}.png')
        C, Hf, O, B = f(''), f('_half'), f('_open'), f('_blink')
        mouth = diff(Hf, C) | diff(O, C)
        mm, mbox = region(mouth, 4); bm, bbox = region(diff(B, C), 5); fm, fbox = region(diff(C, base) | diff(B, C) | mouth, 5)
        idx = {r: assets.index(f'{A} {e} {r}') for r in ('mouth open', 'mouth half', 'mouth closed', 'eyelids', 'face')}
        for r, fr in (('mouth open', O), ('mouth half', Hf), ('mouth closed', C)):
            new[idx[r]] = patch(fr, mm, mbox); moves[idx[r]] = (mbox[0] - ax, mbox[1] - ay)
        new[idx['eyelids']] = patch(B, bm, bbox); moves[idx['eyelids']] = (bbox[0] - ax, bbox[1] - ay)
        new[idx['face']] = patch(C, fm, fbox); moves[idx['face']] = (fbox[0] - ax, fbox[1] - ay)
    print(A, len(emos), 'emotions')
moved = 0
for t, p, *_ in objs:
    if t != 100: continue
    d = props(p); aid = d.get(206, (None,))[0]
    if aid in moves:
        for key, val in zip((13, 14), moves[aid]):
            struct.pack_into('<f', b, d[key][1], float(val))
        moved += 1
nb, n = rewrite(bytes(b), lambda i, data, kind: png(new[i]) if i in new else None)
open(OUT, 'wb').write(nb)
print('textures', n, 'moved', moved)
