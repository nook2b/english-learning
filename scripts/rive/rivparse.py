"""Minimal reader for the Rive binary: objects as (typeKey, [(key, type, value, start, end)])."""
import struct, json, os
CORE = {int(k): v for k, v in json.load(open(os.path.join(os.path.dirname(__file__), "coretypes.json"))).items()}
MAP = {"CoreUintType": 0, "CoreIdType": 0, "CoreIntType": 0, "CoreStringType": 1, "CoreBytesType": 1, "CoreDoubleType": 2, "CoreColorType": 3, "CoreBoolType": 4}

def varuint(b, i):
    n = s = 0
    while True:
        x = b[i]; i += 1
        n |= (x & 0x7F) << s; s += 7
        if not x & 0x80: return n, i

def parse(b):
    assert b[:4] == b'RIVE'
    i = 4
    major, i = varuint(b, i); minor, i = varuint(b, i); fid, i = varuint(b, i)
    keys = []
    while True:
        k, i = varuint(b, i)
        if k == 0: break
        keys.append(k)
    types = {}
    bit = 0; cur = 0
    for n, k in enumerate(keys):
        if n % 16 == 0:
            cur = struct.unpack_from('<I', b, i)[0]; i += 4
        types[k] = (cur >> ((n % 16) * 2)) & 3
    objs = []
    while i < len(b):
        tk, i = varuint(b, i)
        props = []
        while True:
            k, i = varuint(b, i)
            if k == 0: break
            t = MAP[CORE[k]] if k in CORE else types.get(k)
            st = i
            if t == 0: v, i = varuint(b, i)
            elif t == 1:
                L, i = varuint(b, i); v = b[i:i+L]; i += L
            elif t == 2: v = struct.unpack_from('<f', b, i)[0]; i += 4
            elif t == 3: v = struct.unpack_from('<I', b, i)[0]; i += 4
            elif t == 4: v = b[i]; i += 1
            else: raise ValueError(f'unknown key {k} at {i}')
            props.append((k, t, v, st, i))
        objs.append((tk, props))
    return (major, minor), objs
