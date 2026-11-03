"""Cleans what an image editor leaves around a repainted head: the soft glow and
the opaque blurry "shadow" outside the drawn outline; the figure inside becomes opaque.

    python3 scripts/rive/clean_glow.py front_base.png in_dir out_dir

in_dir holds one direction's frames, its *_base.png among them. Only the area
where the frames differ from front_base is touched. The mask is computed once,
on the direction's base, and applied to every frame (they differ only in the face).
"""
import glob, os, sys
import numpy as np
from PIL import Image
from scipy import ndimage

front = np.array(Image.open(sys.argv[1]).convert('RGBA')).astype(int)
src, out = sys.argv[2], sys.argv[3]
os.makedirs(out, exist_ok=True)
files = sorted(glob.glob(f'{src}/*.png'))
base = np.array(Image.open(next(f for f in files if f.endswith('_base.png'))).convert('RGBA')).astype(int)

changed = np.zeros(front.shape[:2], bool)
for f in files:
    changed |= np.abs(np.array(Image.open(f).convert('RGBA')).astype(int) - front).sum(axis=2) > 8
region = ndimage.binary_dilation(changed, iterations=6)

al, rgb = base[:, :, 3], base[:, :, :3]
lum = rgb.mean(axis=2)
grad = sum(np.hypot(ndimage.sobel(rgb[:, :, c].astype(float), 0), ndimage.sobel(rgb[:, :, c].astype(float), 1)) for c in range(3))
smooth = ndimage.uniform_filter(grad, 5) < 60          # the editor's shadow is a soft gradient, the drawing has strokes
outline = (lum < 55) & (al > 150)                       # the dark line that bounds the figure stops the fill
passable = region & ~outline & (smooth | (al < 100))
lab, _ = ndimage.label(passable)
reach = np.unique(lab[(al < 100) & region & passable])
ghost = np.isin(lab, reach[reach > 0]) & (al >= 100)   # opaque but reachable from outside without crossing a line

for f in files:
    a = np.array(Image.open(f).convert('RGBA'))
    fa = a[:, :, 3].astype(int)
    new = np.where(ghost | (fa < 100), 0, np.where(fa >= 128, 255, fa))
    a[:, :, 3] = np.where(region, new, fa).astype(np.uint8)
    Image.fromarray(a).save(f'{out}/{os.path.basename(f)}')
print(len(files), 'frames; region', int(region.sum()), 'px; shadow removed', int(ghost.sum()), 'px')
