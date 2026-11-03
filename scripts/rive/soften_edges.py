"""For frames with a hard 0/255 silhouette: smooths the edge of the repainted head
by about a pixel and keeps the original soft edge everywhere else.

    python3 scripts/rive/soften_edges.py front_base.png in_dir out_dir
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
# The repainted head: where colour or silhouette differs from the front pose.
diff = (np.abs(base[:, :, :3] - front[:, :, :3]).sum(axis=2) > 30) & ((base[:, :, 3] > 0) | (front[:, :, 3] > 0))
diff |= (base[:, :, 3] > 128) != (front[:, :, 3] > 128)
diff = ndimage.binary_opening(diff, iterations=2)
head = ndimage.binary_dilation(diff, iterations=8)
for f in files:
    a = np.array(Image.open(f).convert('RGBA'))
    hard = (a[:, :, 3] > 128).astype(float)
    soft = ndimage.gaussian_filter(hard, 0.8)
    ring = ndimage.binary_dilation(hard > 0, iterations=1) & ~ndimage.binary_erosion(hard > 0, iterations=1)
    head_alpha = np.where(ring, soft * 255, hard * 255)
    a[:, :, 3] = np.where(head, head_alpha, front[:, :, 3]).clip(0, 255).astype(np.uint8)
    Image.fromarray(a).save(f'{out}/{os.path.basename(f)}')
print(len(files), 'frames; head region', int(head.sum()), 'px')
