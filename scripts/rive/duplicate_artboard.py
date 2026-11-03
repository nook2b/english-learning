"""Copies an artboard of a .riv under a new name, with its own copies of the images it uses.

    python3 scripts/rive/duplicate_artboard.py in.riv stand stand_left out.riv

The copy keeps the animations, the state machine and the view model of the
original (the artboard's viewModelId is shared), so the app drives it the same
way; its textures can then be replaced with scripts/rive/rebuild.py.
Prints the asset ids of the copy: old id -> new id.
"""
import json, sys
sys.path.insert(0, 'scripts/rive')
from rivparse import parse, varuint

SRC, NAME, NEW, OUT = sys.argv[1:5]
b = open(SRC, 'rb').read()
_, objs = parse(b)

def enc(n):
    out = bytearray()
    while True:
        x = n & 0x7F; n >>= 7
        out.append(x | 0x80 if n else x)
        if not n: return bytes(out)

boards = [n for n, o in enumerate(objs) if o[0] == 1]
names = {n: dict((k, v) for k, _, v, *_ in objs[n][1]).get(4) for n in boards}
first = next(n for n in boards if names[n] == NAME.encode())
end = next((n for n in boards if n > first), len(objs))
assets = [n for n, o in enumerate(objs) if o[0] == 105]
used = sorted({dict((k, v) for k, _, v, *_ in objs[n][1])[206] for n in range(first, end) if objs[n][0] == 100})
remap = {old: len(assets) + k for k, old in enumerate(used)}

def rewrite_obj(n, changes):
    """Object bytes with property values replaced: changes = {key: encoded value bytes}."""
    t, props, s, e = objs[n]
    out = bytearray(enc(t))
    for k, ty, v, ps, pe in props:
        out += enc(k)
        out += changes.get(k, b[ps:pe])
    out += b'\x00'
    return bytes(out)

def string(v): return enc(len(v)) + v

block = bytearray()
for n in range(first, end):
    t, props, s, e = objs[n]
    if n == first:
        block += rewrite_obj(n, {4: string(NEW.encode())})
    elif t == 100:
        aid = dict((k, v) for k, _, v, *_ in props)[206]
        block += rewrite_obj(n, {206: enc(remap[aid])})
    else:
        block += b[s:e]
# New assets (ImageAsset + its FileAssetContents) after the last asset, same order as `used`.
new_assets = bytearray()
for old in used:
    a = assets[old]
    name = dict((k, v) for k, _, v, *_ in objs[a][1]).get(203, b'')
    new_assets += rewrite_obj(a, {203: string(name.replace(NAME.encode(), NEW.encode(), 1) if name.startswith(NAME.encode()) else NEW.encode() + b' ' + name)})
    new_assets += b[objs[a + 1][2]:objs[a + 1][3]]
last_asset_end = objs[assets[-1] + 1][3]
board_end = objs[end][2] if end < len(objs) else len(b)
out = b[:last_asset_end] + bytes(new_assets) + b[last_asset_end:board_end] + bytes(block) + b[board_end:]
open(OUT, 'wb').write(out)
print(json.dumps(remap))
