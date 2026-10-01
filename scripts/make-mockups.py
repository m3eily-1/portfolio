"""Build one consistent mockup per project into public/img/mockups/: <slug>.webp (1600x1000) and <slug>-tall.webp (1250x1500).

Style: ink canvas with a soft gold glow, the project name set large in deep gold behind,
and one sharp hero screen floating in front (phones keep their own screen corners; web
projects sit in a square browser window). Sources are the sharp centre screens of the
PDF mockups, or the SC Braga app screens.

Run from the repo root:  python3 scripts/make-mockups.py
"""

from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
IMG = ROOT / "public" / "img"
OUT = IMG / "mockups"
INK = (27, 24, 21)  # --ink-2, a step above the page so cards read as panels
GLOW = (60, 51, 35)
NAME = (54, 47, 34)  # deep gold, a step above the glow
BAR = (38, 35, 30)
FONT = "/System/Library/Fonts/Supplemental/Times New Roman.ttf"

LAPTOP = (389, 266, 1037, 672)  # screen area inside the PDF laptop mockups

# slug: (kind, source, crop, name)
PROJECTS = {
    "sc-braga": ("phone", "scbraga/live.webp", None, "SC Braga"),
    "stc-design-system": ("board", "stc-ds-1.webp", (230, 60, 1230, 700), "Design System"),
    "stc-voting": ("web", "stc-voting.webp", LAPTOP, "Demand Committee"),
    "ejar": ("web", "ejar-1.webp", LAPTOP, "Ejar"),
    "my-orange": ("phone", "screens/orange.webp", None, "My Orange"),
    "budget": ("phone", "screens/budget.webp", None, "Budget"),
    "flash": ("phone", "screens/flash.webp", None, "Flash"),
    "bona": ("phone", "screens/bona.webp", None, "BONA"),
    "otida": ("phone", "screens/otida.webp", None, "Otida"),
    "check": ("web", "check-1.webp", LAPTOP, "Check"),
    "jinni": ("phone", "screens/jinni.webp", None, "Jinni"),
    "egyptian-streets": ("web", "es-1.webp", LAPTOP, "Egyptian Streets"),
}


def background(name: str, W: int, H: int) -> Image.Image:
    # radial gold glow behind the screen
    y, x = np.mgrid[0:H, 0:W]
    d = np.sqrt(((x - W * 0.5) / (W * 0.55)) ** 2 + ((y - H * 0.55) / (H * 0.7)) ** 2)
    t = np.clip(1 - d, 0, 1) ** 1.6
    arr = np.zeros((H, W, 3))
    for c in range(3):
        arr[..., c] = INK[c] + (GLOW[c] - INK[c]) * t
    arr += np.random.default_rng(7).uniform(-1.6, 1.6, arr.shape)  # dither: no banding in the glow
    bg = Image.fromarray(np.clip(arr, 0, 255).astype("uint8"))
    # the project name, as large as fits the width
    draw = ImageDraw.Draw(bg)
    size = 340
    font = ImageFont.truetype(FONT, size)
    tw = draw.textlength(name, font=font)
    if tw > W * 0.94:
        size = int(size * W * 0.94 / tw)
        font = ImageFont.truetype(FONT, size)
        tw = draw.textlength(name, font=font)
    draw.text(((W - tw) / 2, H * 0.5 - size * 0.62), name, font=font, fill=NAME)
    return bg


def shadow(canvas: Image.Image, box, blur=46, offset=34, strength=170):
    sh = Image.new("L", canvas.size, 0)
    ImageDraw.Draw(sh).rectangle((box[0] + 16, box[1] + offset, box[2] - 16, box[3] + offset), fill=strength)
    sh = sh.filter(ImageFilter.GaussianBlur(blur))
    canvas.paste(Image.new("RGB", canvas.size, (0, 0, 0)), (0, 0), sh)


def phone(src: Image.Image, h: int) -> tuple[Image.Image, Image.Image]:
    src = src.convert("RGBA")
    w = round(src.width * h / src.height)
    return src.resize((w, h), Image.LANCZOS), None


def window(screen: Image.Image, width: int) -> Image.Image:
    bar = 34
    h = round(screen.height * width / screen.width)
    win = Image.new("RGBA", (width, h + bar), BAR + (255,))
    d = ImageDraw.Draw(win)
    for i in range(3):  # square window controls, no rounded corners
        d.rectangle((16 + i * 18, bar / 2 - 4, 24 + i * 18, bar / 2 + 4), fill=(78, 72, 62, 255))
    win.paste(screen.convert("RGB").resize((width, h), Image.LANCZOS), (0, bar))
    return win


SUPPLIED = ROOT / "mockup-src"  # Ahmed's own screens: mockup-src/<slug>.(png|jpg|jpeg|webp) win over the PDF crops


def source(slug: str) -> Image.Image:
    kind, file, crop, _ = PROJECTS[slug]
    for ext in ("png", "jpg", "jpeg", "webp"):
        f = SUPPLIED / f"{slug}.{ext}"
        if f.exists():
            return Image.open(f)
    src = Image.open(IMG / file)
    return src.crop(crop) if crop else src


def build(slug: str, W: int, H: int, suffix: str = ""):
    kind, _, _, name = PROJECTS[slug]
    src = source(slug)
    canvas = background(name, W, H)
    if kind == "phone":
        art, _ = phone(src, round(H * 0.8))
        x, y = (W - art.width) // 2, (H - art.height) // 2 + round(H * 0.03)
        shadow(canvas, (x, y, x + art.width, y + art.height))
        canvas.paste(art, (x, y), art)
    else:
        art = window(src, min(round(W * (0.675 if kind == "web" else 0.625)), round(W * 0.86)) if W > H else round(W * 0.86))
        x, y = (W - art.width) // 2, (H - art.height) // 2 + round(H * 0.03)
        shadow(canvas, (x, y, x + art.width, y + art.height))
        canvas.paste(art, (x, y))
    OUT.mkdir(exist_ok=True)
    canvas.save(OUT / f"{slug}{suffix}.webp", quality=88)
    return src.size


if __name__ == "__main__":
    for s in PROJECTS:
        print(s, build(s, 1600, 1000))  # covers, ring cards, regular Featured Works cards
        build(s, 1250, 1500, "-tall")  # tall Featured Works cards (0.83)
