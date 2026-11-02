"""Textures embedded in a Rive file, for the scripts that rewrite them.

Each image in a .riv is a length-prefixed byte field (varuint length + bytes)
with no absolute offsets elsewhere, so it can be swapped in place. Kits store
PNG or WebP (lossless VP8L or lossy VP8).
"""
import re
from collections.abc import Callable, Iterator

IMAGE = re.compile(rb"(\x89PNG\r\n\x1a\n)|(RIFF(....)WEBPVP8)", re.S)


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


def textures(b: bytes) -> Iterator[tuple[int, int, str]]:
    """(start, end, kind) of every length-prefixed image; kind is 'png', 'webp-lossless' or 'webp'."""
    for m in IMAGE.finditer(b):
        start = m.start()
        if m.group(1):
            end, kind = b.find(b"IEND", start) + 8, "png"
        else:
            end = start + 8 + int.from_bytes(m.group(3), "little")
            kind = "webp-lossless" if b[start + 12 : start + 16] == b"VP8L" else "webp"
        prefix = varuint(end - start)
        if b[start - len(prefix) : start] == prefix:
            yield start, end, kind


def rewrite(b: bytes, change: Callable[[int, bytes, str], bytes | None]) -> tuple[bytes, int]:
    """Replaces each texture for which change(index, data, kind) returns new bytes; returns the file and the count."""
    out, pos, count = bytearray(), 0, 0
    for i, (start, end, kind) in enumerate(textures(b)):
        new = change(i, b[start:end], kind)
        if new is None:
            continue
        out += b[pos : start - len(varuint(end - start))] + varuint(len(new)) + new
        pos = end
        count += 1
    out += b[pos:]
    return bytes(out), count
