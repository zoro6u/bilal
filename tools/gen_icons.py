#!/usr/bin/env python3
"""Bilal icon generator — renders the logo to web icons and Android launcher assets.
Usage: python3 tools/gen_icons.py   (run from the project root)
"""
from PIL import Image, ImageDraw
import os, math

SS = 4  # supersample factor
GOLD_HI = (245, 226, 164); GOLD = (214, 176, 98); GOLD_LO = (170, 128, 58)

def lerp(a, b, t): return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))

def rounded_mask(size, radius):
    m = Image.new("L", (size, size), 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, size - 1, size - 1], radius=radius, fill=255)
    return m

def circle_mask(size):
    m = Image.new("L", (size, size), 0)
    ImageDraw.Draw(m).ellipse([0, 0, size - 1, size - 1], fill=255)
    return m

def gradient(size, top, mid, bot):
    img = Image.new("RGB", (size, size), top); px = img.load()
    for y in range(size):
        t = y / (size - 1)
        c = lerp(top, mid, t / 0.5) if t < 0.5 else lerp(mid, bot, (t - 0.5) / 0.5)
        for x in range(size): px[x, y] = c
    return img

def draw_background(size):
    bg = gradient(size, (11, 22, 38), (15, 46, 69), (12, 54, 50)).convert("RGBA")
    glow = Image.new("RGBA", (size, size), (0, 0, 0, 0)); gd = ImageDraw.Draw(glow)
    cx, cy, r = size * 0.27, size * 0.235, size * 0.135
    gd.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(228, 200, 140, 42))
    o = r * 0.62
    gd.ellipse([cx - r + o, cy - r - o * 0.35, cx + r + o, cy + r - o * 0.35], fill=(0, 0, 0, 0))
    return Image.alpha_composite(bg, glow)

def draw_foreground(size, scale=1.0):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0)); d = ImageDraw.Draw(img, "RGBA")
    cx = cy = size / 2; S = size * scale; g = GOLD; gh = GOLD_HI; gl = GOLD_LO
    src_y = cy - S * 0.345
    for rad, alpha in [(0.155, 215), (0.232, 150), (0.31, 92)]:
        R = S * rad; ww = max(2, int(S * 0.016)); bb = [cx - R, src_y - R, cx + R, src_y + R]
        d.arc(bb, 200, 250, fill=(gh[0], gh[1], gh[2], alpha), width=ww)
        d.arc(bb, 290, 340, fill=(gh[0], gh[1], gh[2], alpha), width=ww)
    sw = S * 0.082; st = cy - S * 0.155; sb = cy + S * 0.345
    d.rounded_rectangle([cx - sw / 2, st, cx + sw / 2, sb], radius=sw * 0.45, fill=g)
    d.rounded_rectangle([cx - sw / 2, st, cx - sw / 2 + sw * 0.30, sb], radius=sw * 0.3, fill=gh)
    d.rounded_rectangle([cx - S * 0.082, sb - S * 0.015, cx + S * 0.082, sb + S * 0.03], radius=S * 0.012, fill=gl)
    d.rounded_rectangle([cx - S * 0.105, sb + S * 0.025, cx + S * 0.105, sb + S * 0.065], radius=S * 0.014, fill=gl)
    by = cy - S * 0.150
    d.rounded_rectangle([cx - S * 0.072, by, cx + S * 0.072, by + S * 0.032], radius=S * 0.012, fill=gh)
    d.rounded_rectangle([cx - S * 0.072, by + S * 0.030, cx + S * 0.072, by + S * 0.040], radius=S * 0.006, fill=gl)
    uw = S * 0.058
    d.rounded_rectangle([cx - uw / 2, cy - S * 0.255, cx + uw / 2, by], radius=uw * 0.4, fill=g)
    bulb_d = S * 0.105; bcy = cy - S * 0.312
    d.rounded_rectangle([cx - uw * 0.42, cy - S * 0.27, cx + uw * 0.42, cy - S * 0.252], radius=S * 0.006, fill=gl)
    d.ellipse([cx - bulb_d / 2, bcy - bulb_d / 2, cx + bulb_d / 2, bcy + bulb_d / 2], fill=g)
    d.ellipse([cx - bulb_d / 2, bcy - bulb_d / 2, cx - bulb_d / 2 + bulb_d * 0.42, bcy + bulb_d / 2], fill=gh)
    tip_y = bcy - bulb_d * 0.92
    d.polygon([(cx, tip_y), (cx - bulb_d * 0.30, bcy - bulb_d * 0.30), (cx + bulb_d * 0.30, bcy - bulb_d * 0.30)], fill=g)
    d.ellipse([cx - S * 0.012, tip_y - S * 0.024, cx + S * 0.012, tip_y], fill=gh)
    fr = S * 0.040; fcy = tip_y - S * 0.062
    fin = Image.new("RGBA", (size, size), (0, 0, 0, 0)); fd = ImageDraw.Draw(fin)
    fd.ellipse([cx - fr, fcy - fr, cx + fr, fcy + fr], fill=gh)
    o = fr * 0.72; fd.ellipse([cx - fr + o, fcy - fr - o * 0.22, cx + fr + o, fcy + fr - o * 0.22], fill=(0, 0, 0, 0))
    return Image.alpha_composite(img, fin)

def render_icon(size, pad=1.0, with_bg=True):
    s = size * SS
    bg = draw_background(s) if with_bg else Image.new("RGBA", (s, s), (0, 0, 0, 0))
    out = Image.alpha_composite(bg.convert("RGBA"), draw_foreground(s, scale=pad))
    return out.resize((size, size), Image.LANCZOS)

def save_masked(img, mask, path):
    base = Image.new("RGBA", img.size, (0, 0, 0, 0)); base.paste(img, (0, 0), mask); base.save(path)

def gen_web():
    os.makedirs("icons", exist_ok=True)
    for sz in [1024, 512, 192, 180, 96, 48, 32]:
        ic = render_icon(sz)
        save_masked(ic, rounded_mask(sz, int(sz * 0.22)), f"icons/icon-{sz}.png")
    render_icon(1024).save("icons/icon-master-square.png")
    for sz in [512, 192]:
        render_icon(sz, pad=0.78).save(f"icons/maskable-{sz}.png")
    print("web icons done")

def gen_android():
    res = "android/app/src/main/res"
    if not os.path.isdir(res):
        print("(android project not found, skipping launcher icons)"); return
    # launcher base 48dp, adaptive layer base 108dp
    dens = {"mdpi": 1, "hdpi": 1.5, "xhdpi": 2, "xxhdpi": 3, "xxxhdpi": 4}
    for d, m in dens.items():
        folder = f"{res}/mipmap-{d}"; os.makedirs(folder, exist_ok=True)
        leg = int(48 * m)
        ic = render_icon(leg)
        save_masked(ic, rounded_mask(leg, int(leg * 0.16)), f"{folder}/ic_launcher.png")
        save_masked(ic, circle_mask(leg), f"{folder}/ic_launcher_round.png")
        adp = int(108 * m)
        fg = Image.alpha_composite(Image.new("RGBA", (adp * SS, adp * SS), (0, 0, 0, 0)),
                                   draw_foreground(adp * SS, scale=0.60)).resize((adp, adp), Image.LANCZOS)
        fg.save(f"{folder}/ic_launcher_foreground.png")
        draw_background(adp * SS).convert("RGBA").resize((adp, adp), Image.LANCZOS).save(f"{folder}/ic_launcher_background.png")
    print("android launcher icons done")

if __name__ == "__main__":
    gen_web()
    gen_android()
