"""Moves the manga marks of a heroine's .riv (nodes "Mark <name>") in every artboard.

    python3 scripts/rive/mark_positions.py in.riv out.riv DX DY QDX QDY

Side marks (note, anger, heart, sparkle, sweat) move by DX, DY; the question mark
is put next to them: side position + (QDX, QDY). Blush stays on the cheeks.
"""
import struct, sys
sys.path.insert(0, 'scripts/rive')
from rivparse import parse

src, out = sys.argv[1], sys.argv[2]
dx, dy, qdx, qdy = map(float, sys.argv[3:7])
b = bytearray(open(src, 'rb').read())
_, objs = parse(bytes(b))
side = {}
moved = 0
board = None
for t, props, *_ in objs:
    d = {k: (v, s) for k, _, v, s, e in props}
    if t == 1:
        board = d.get(4, (None,))[0]
        continue
    name = d.get(4, (b'',))[0]
    if t != 2 or not isinstance(name, bytes) or not name.startswith(b'Mark ') or name == b'Mark blush':
        continue
    x, xs = d[13]; y, ys = d[14]
    if name == b'Mark question':
        q = (board, 'q', xs, ys)
        side.setdefault(board, {})['q'] = (xs, ys)
        continue
    nx, ny = x + dx, y + dy
    struct.pack_into('<f', b, xs, nx); struct.pack_into('<f', b, ys, ny)
    side.setdefault(board, {})['side'] = (nx, ny)
    moved += 1
for board, v in side.items():
    if 'q' in v and 'side' in v:
        (xs, ys), (sx, sy) = v['q'], v['side']
        struct.pack_into('<f', b, xs, sx + qdx); struct.pack_into('<f', b, ys, sy + qdy)
        moved += 1
open(out, 'wb').write(b)
print('moved', moved)
