"""Workflow screenshots to WebP at display size.

The home and /work pages show these at 340 to 570 CSS px wide (1024 in the
lightbox), so the full-size PNGs (150 to 930 KB each) were far heavier than
anything a visitor sees. This writes a WebP copy, at most 1200 px wide, next
to the originals in attached_assets/webp/, plus two small founder avatars.
src/data/portfolio.ts imports the WebP copies. Run again after adding a
screenshot:  python3 scripts/screenshots-to-webp.py
"""
import re
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[3]
ASSETS = ROOT / "attached_assets"
OUT = ASSETS / "webp"
OUT.mkdir(exist_ok=True)
MAX_W = 1200

data = (ROOT / "artifacts/portfolio/src/data/portfolio.ts").read_text()
names = sorted(set(re.findall(r'@assets/(?:webp/)?((?:Screenshot_|entsorger_showcase)[^"]*?)\.(?:png|webp)"', data)))
before = after = 0
for n in names:
    src = ASSETS / f"{n}.png"
    im = Image.open(src).convert("RGB")
    if im.width > MAX_W:
        im = im.resize((MAX_W, round(im.height * MAX_W / im.width)), Image.LANCZOS)
    dst = OUT / f"{n}.webp"
    im.save(dst, "WEBP", quality=80, method=6)
    before += src.stat().st_size
    after += dst.stat().st_size

portrait = Image.open(ASSETS / "denver_portrait_2026.jpg").convert("RGB")
side = min(portrait.size)
# Square crop from the top, the way the round avatars show it (object-top).
square = portrait.crop(((portrait.width - side) // 2, 0, (portrait.width - side) // 2 + side, side))
for px in (96, 192):
    square.resize((px, px), Image.LANCZOS).save(OUT / f"denver_portrait_{px}.webp", "WEBP", quality=82, method=6)

print(f"{len(names)} screenshots: {before/1e6:.1f} MB PNG -> {after/1e6:.2f} MB WebP")
