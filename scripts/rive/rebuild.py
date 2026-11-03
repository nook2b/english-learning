"""Usage: python3 scripts/rive/rebuild.py assets/rive/iris.riv <kit dir with sprites/{pose}/> out.riv

Rebuilds iris.riv with the new Iris art, keeping every artboard, property and animation.

Body and layer textures are swapped; face patches are recut from the new frames
(eyes with the closed mouth, blink, three mouths) and moved where the new face is.
"""
import io, json, os, struct, sys
sys.path.insert(0, 'scripts'); sys.path.insert(0, 'scripts/rive')
import numpy as np
from PIL import Image
from scipy import ndimage
from rive_textures import rewrite, textures
from rivparse import parse

SRC, KIT, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
b = bytearray(open(SRC, 'rb').read())
EMOS = json.load(open('assets/rive/expressions.json'))['iris']
POSES = {'stand': dict(start=0, body=71, layers=(72, 73), under=70, anchor=(500, 330), recut=True),
         'notebook': dict(start=74, body=110, layers=(111, 112), under=109, anchor=(500, 330), recut=True),
         'turn': dict(start=113, body=134, layers=(135, 136), under=133, anchor=(497, 338), recut=True)}
# Copies of artboards made by duplicate_artboard.py, in the order they were added: their assets follow the 137 originals.
COPIES = [('stand_left', 'stand'), ('stand_right', 'stand'), ('notebook_left', 'notebook'), ('notebook_right', 'notebook')]
_next = 137
for _copy, _of in COPIES:
    _o = POSES[_of]
    n = _o['layers'][1] - _o['start'] + 1
    if os.path.isdir(f'{KIT}/sprites/{_copy}'):
        d = _next - _o['start']
        POSES[_copy] = dict(start=_next, body=_o['body'] + d, layers=tuple(x + d for x in _o['layers']), under=_o['under'] + d, anchor=_o['anchor'], recut=True, emos=_of)
        _next += n

def load(p): return np.array(Image.open(p).convert('RGBA'))
def diff(a, c): return np.abs(a[:, :, :3].astype(int) - c[:, :, :3].astype(int)).sum(axis=2) + np.abs(a[:, :, 3].astype(int) - c[:, :, 3].astype(int)) > 24
def region(m, grow=5):
    m = ndimage.binary_fill_holes(ndimage.binary_dilation(m, iterations=grow))
    ys, xs = np.nonzero(m)
    return m, (xs.min(), ys.min(), xs.max() + 1, ys.max() + 1)
def patch(frame, m, box):
    x0, y0, x1, y1 = box
    out = frame[y0:y1, x0:x1].copy()
    out[:, :, 3] = np.where(m[y0:y1, x0:x1], frame[y0:y1, x0:x1, 3], 0)
    return out
def png(a):
    o = io.BytesIO(); Image.fromarray(a.astype(np.uint8)).save(o, 'PNG'); return o.getvalue()

new_tex, moves = {}, {}
old = [np.array(Image.open(io.BytesIO(bytes(b[s:e]))).convert('RGBA')) for s, e, k in textures(bytes(b))]
for pose, P in POSES.items():
    base = load(f'{KIT}/sprites/{pose}/iris_{pose}_base.png')
    new_tex[P['body']] = base
    for L in P['layers']:  # hand and item: the new frame under the old layer's shape
        a = base.copy(); a[:, :, 3] = np.minimum(base[:, :, 3], old[L][:, :, 3]); new_tex[L] = a
    if not P['recut']:
        continue
    new_tex[P['under']] = np.zeros((1, 1, 4), np.uint8)  # the new eye patches cover the whole changed face
    ax, ay = P['anchor']
    for g, e in enumerate(EMOS[P.get('emos', pose)]):
        f = lambda s: load(f'{KIT}/sprites/{pose}/iris_{pose}_{e}{s}.png')
        C, H, O, B = f(''), f('_half'), f('_open'), f('_blink')
        i = P['start'] + 5 * g
        mouth = diff(H, C) | diff(O, C)
        mm, mbox = region(mouth, 4)
        bm, bbox = region(diff(B, C), 5)
        fm, fbox = region(diff(C, base) | diff(B, C) | mouth, 5)
        for k, fr in ((i, O), (i + 1, H), (i + 2, C)):
            new_tex[k] = patch(fr, mm, mbox); moves[k] = (mbox[0] - ax, mbox[1] - ay)
        new_tex[i + 3] = patch(B, bm, bbox); moves[i + 3] = (bbox[0] - ax, bbox[1] - ay)
        new_tex[i + 4] = patch(C, fm, fbox); moves[i + 4] = (fbox[0] - ax, fbox[1] - ay)

# Move the recut patches: x and y of each Image (typeKey 100) by its asset id (key 206), in place.
_, objs = parse(bytes(b))
moved = 0
for t, props, *_ in objs:
    if t != 100: continue
    d = {k: (s, v) for k, _, v, s, e in props}
    aid = d.get(206, (None, None))[1]
    if aid in moves:
        for key, val in zip((13, 14), moves[aid]):
            assert key in d, f'asset {aid}: no stored {key}'
            struct.pack_into('<f', b, d[key][0], float(val))
        moved += 1
nb, n = rewrite(bytes(b), lambda idx, data, kind: png(new_tex[idx]) if idx in new_tex else None)
open(OUT, 'wb').write(nb)
print('textures replaced', n, 'patches moved', moved, 'size', len(nb))
