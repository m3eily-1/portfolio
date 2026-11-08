"""Build the social share image (Open Graph / LinkedIn) into public/og.png, 1200x630.

Ink background with a soft gold glow, the hero portrait on the right, and the name,
title and URL set in the site's type (Times New Roman + Geist Mono) and colours.

Run from the repo root:  python3 scripts/make-og.py
"""

from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
W, H = 1200, 630
INK = (0, 0, 0)
GLOW = (46, 39, 26)
BONE = (237, 230, 218)
MUTE = (150, 146, 139)  # --mute on black
SUN = (145, 123, 80)
TIMES = "/System/Library/Fonts/Supplemental/Times New Roman.ttf"
MONO = ROOT / "scripts" / "fonts" / "GeistMono-Regular.ttf"
PAD = 72

# background: ink with a gold glow behind the portrait
y, x = np.mgrid[0:H, 0:W]
d = np.sqrt(((x - W * 0.78) / (W * 0.5)) ** 2 + ((y - H * 0.62) / (H * 0.85)) ** 2)
t = np.clip(1 - d, 0, 1) ** 1.8
arr = np.zeros((H, W, 3))
for c in range(3):
    arr[..., c] = INK[c] + (GLOW[c] - INK[c]) * t
arr += np.random.default_rng(7).uniform(-1.4, 1.4, arr.shape)  # dither: no banding
img = Image.fromarray(np.clip(arr, 0, 255).astype("uint8")).convert("RGBA")

# portrait, bottom-anchored on the right, fading out at the bottom edge
p = Image.open(ROOT / "public" / "img" / "portrait-hero.webp").convert("RGBA")
ph = 600
p = p.resize((round(p.width * ph / p.height), ph), Image.LANCZOS)
fade = np.ones((ph, p.width))
f0 = int(ph * 0.72)
fade[f0:] = np.linspace(1, 0, ph - f0)[:, None] ** 1.4
a = np.array(p.getchannel("A"), dtype=float) * fade
p.putalpha(Image.fromarray(a.astype("uint8")))
img.alpha_composite(p, (W - p.width + 40, H - ph + 30))

draw = ImageDraw.Draw(img)
mono = ImageFont.truetype(str(MONO), 17)
name = ImageFont.truetype(TIMES, 112)
title = ImageFont.truetype(TIMES, 40)
line = ImageFont.truetype(TIMES, 28)


def tracked(xy, text, font, fill, track=2.4):
    x0, y0 = xy
    for ch in text:
        draw.text((x0, y0), ch, font=font, fill=fill)
        x0 += draw.textlength(ch, font=font) + track


tracked((PAD, PAD), "PORTFOLIO", mono, SUN)
draw.text((PAD - 4, 196), "Ahmed Mealy", font=name, fill=BONE)
draw.text((PAD, 330), "Senior Product Designer & Builder", font=title, fill=SUN)
draw.text((PAD, 388), "From concept to shipped product.", font=line, fill=MUTE)
tracked((PAD, H - PAD - 14), "M3EILY-1.GITHUB.IO/PORTFOLIO", mono, BONE)

out = ROOT / "public" / "og.png"
img.convert("RGB").save(out, optimize=True)
print(out, out.stat().st_size // 1024, "KB")
