"""Procedural, painterly hero scene: a morning road with gold fields and a rider with a backpack.
Output: wide webp. Deterministic (seeded)."""
import math, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

W, H = 2400, 1750
Y0 = int(H * 0.60)            # horizon
SEED = 11
R = np.random.default_rng(SEED)


def hx(s):
    s = s.lstrip('#')
    return np.array([int(s[i:i + 2], 16) for i in (0, 2, 4)], np.float32)


def stops_grad(ts, stops):
    """ts: array of 0..1 -> Nx3 colours by piecewise-linear stops [(t,'#hex'),...]"""
    xs = [s[0] for s in stops]
    cols = np.stack([hx(s[1]) for s in stops])
    return np.stack([np.interp(ts, xs, cols[:, c]) for c in range(3)], -1)


def fbm(w, h, base=64, octs=5, seed=0, aspect=1.0):
    r = np.random.default_rng(seed)
    out = np.zeros((h, w), np.float32)
    amp, tot = 1.0, 0.0
    for o in range(octs):
        s = max(2, base >> o)
        gw, gh = max(2, int(w / (s * aspect)) + 2), max(2, h // s + 2)
        g = r.random((gh, gw)).astype(np.float32)
        im = Image.fromarray(g, mode='F').resize((w, h), Image.BICUBIC)
        out += amp * np.asarray(im)
        tot += amp
        amp *= 0.5
    out /= tot
    out = (out - out.min()) / (out.max() - out.min() + 1e-6)
    return out


def smooth(a, lo, hi):
    t = np.clip((a - lo) / (hi - lo + 1e-6), 0, 1)
    return t * t * (3 - 2 * t)


def to_img(a):
    return Image.fromarray(np.clip(a, 0, 255).astype(np.uint8), 'RGB')


yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)

# ------------------------------------------------------------------ sky
sky_ts = np.clip(np.arange(H) / Y0, 0, 1)
sky_col = stops_grad(sky_ts, [(0, '#4C8CC4'), (0.30, '#78AED6'), (0.52, '#B4D4E4'),
                              (0.80, '#E9E3CF'), (1.0, '#F8DFB3')])
img = np.repeat(sky_col[:, None, :], W, axis=1).astype(np.float32)

# sun glow low on the right
sx, sy = W * 0.70, Y0 - 70
d = np.sqrt((xx - sx) ** 2 + (yy - sy) ** 2)
glow = np.exp(-(d / 520) ** 2)[..., None]
img = img + glow * (hx('#FFD9A0') - img) * 0.55
core = np.exp(-(d / 130) ** 2)[..., None]
img = img + core * (hx('#FFF1D0') - img) * 0.5

# ------------------------------------------------------------------ clouds
def cloud(cx, cy, cw, ch, seed, warm=0.0, density=1.0):
    """Returns (rgb float HxWx3 delta composite) applied straight to img."""
    global img
    h0 = ch
    ch = ch * 1.45
    x0, y0 = int(cx - cw / 2), int(cy - ch / 2)
    w, h = int(cw), int(ch)
    r = np.random.default_rng(seed)
    m = Image.new('L', (w, h), 0)
    dr = ImageDraw.Draw(m)
    n = int(40 * density + 20)
    for i in range(n):
        u = r.random()
        px = (0.08 + 0.84 * u) * w
        # taller in the middle, flat bottom
        env = math.sin(math.pi * u) ** 0.8
        rad_y = 0.72 * (0.18 + 0.30 * r.random()) * h0 * (0.45 + 0.75 * env)
        rad_x = rad_y * (1.0 + 0.9 * r.random())
        py = h * 0.78 - rad_y * (0.35 + 0.8 * r.random()) * env
        dr.ellipse([px - rad_x, py - rad_y, px + rad_x, py + rad_y], fill=255)
    m = m.filter(ImageFilter.GaussianBlur(max(3, h * 0.035)))
    a = np.asarray(m, np.float32) / 255
    nz = fbm(w, h, base=max(8, int(h / 4)), octs=5, seed=seed + 5)
    a = np.clip((a + (nz - 0.5) * 0.85 - 0.38) * 3.2, 0, 1)
    # flatten the base a little
    flat = smooth(np.arange(h)[:, None] / h, 0.80, 0.97)
    a = a * (1 - 0.6 * flat)
    # top-lit shading, per column
    solid = a > 0.35
    top = np.where(solid.any(0), solid.argmax(0), 0).astype(np.float32)
    bot = np.where(solid.any(0), h - 1 - solid[::-1].argmax(0), h).astype(np.float32)
    v = (np.arange(h)[:, None] - top[None, :]) / np.maximum(bot - top, 8)[None, :]
    v = np.clip(v, 0, 1)
    v = np.clip(v + (nz - 0.5) * 0.35, 0, 1)
    light = hx('#FFFFFF') * (1 - warm) + hx('#FFF0D4') * warm
    shade = hx('#9FB8D6') * (1 - warm) + hx('#D7B9A4') * warm
    col = light[None, None, :] * (1 - v[..., None]) + shade[None, None, :] * v[..., None]
    # sunward edge catches warm light
    xs = np.arange(w)[None, :] / w
    col = col + (hx('#FFE2B0') - col) * (0.25 * smooth(xs, 0.5, 1.0))[..., None] * (1 - v[..., None])
    xa, ya = max(0, x0), max(0, y0)
    xb, yb = min(W, x0 + w), min(H, y0 + h)
    if xb <= xa or yb <= ya:
        return
    sl = (slice(ya - y0, yb - y0), slice(xa - x0, xb - x0))
    al = a[sl][..., None] * 0.96
    img[ya:yb, xa:xb] = img[ya:yb, xa:xb] * (1 - al) + col[sl] * al


# high thin streaks first (behind)
for (cx, cy, cw, ch, s) in [(0.52, 0.34, 0.65, 0.05, 31), (0.30, 0.41, 0.50, 0.04, 32)]:
    cloud(cx * W, cy * H, cw * W, ch * H, s, warm=0.2, density=0.9)
# big cumulus
for (cx, cy, cw, ch, s, wm) in [
    (0.17, 0.17, 0.46, 0.21, 41, 0.0), (0.60, 0.10, 0.36, 0.14, 42, 0.05),
    (0.90, 0.22, 0.30, 0.15, 43, 0.15),
    (0.78, 0.40, 0.34, 0.09, 45, 0.45), (0.12, 0.43, 0.30, 0.08, 46, 0.2),
]:
    cloud(cx * W, cy * H, cw * W, ch * H, s, warm=wm)

# ------------------------------------------------------------------ far hills and trees
def ridge(amp, base_h, seed, rough):
    r = np.random.default_rng(seed)
    xs = np.arange(W)
    h = np.zeros(W, np.float32)
    for k in range(1, 7):
        h += (r.random() * 2 - 1) * np.sin(xs / W * math.pi * (1.3 * k) * 2 + r.random() * 6) * amp / (k ** rough)
    return base_h + h


layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
dl = ImageDraw.Draw(layer)
for (amp, bh, seed, col, al) in [(26, 34, 3, '#A9C6C6', 215), (16, 20, 4, '#8DB1A2', 235)]:
    hh = ridge(amp, bh, seed, 1.2)
    pts = [(x, Y0 - hh[x]) for x in range(0, W, 6)] + [(W, Y0 + 4), (0, Y0 + 4)]
    c = tuple(int(v) for v in hx(col)) + (al,)
    dl.polygon(pts, fill=c)
# tree clumps and a few slender palms near the horizon
for i in range(260):
    x = R.random() * W
    if abs(x - W / 2) < 18:
        continue
    r_ = 4 + R.random() * 15
    y = Y0 - 2 - R.random() * 14
    g = int(80 + R.random() * 40)
    dl.ellipse([x - r_ * 1.3, y - r_, x + r_ * 1.3, y + r_ * 0.45], fill=(70 + int(R.random() * 20), g + 40, 80, 235))
for i in range(26):
    x = R.random() * W
    hgt = 22 + R.random() * 34
    y = Y0 - 1
    dl.line([(x, y), (x + R.normal() * 2, y - hgt)], fill=(78, 100, 84, 235), width=2)
    for k in range(6):
        ang = -math.pi / 2 + (k - 2.5) * 0.55
        dl.line([(x, y - hgt), (x + math.cos(ang) * 14, y - hgt + math.sin(ang) * 10 + 4)], fill=(70, 110, 80, 235), width=2)
layer = layer.filter(ImageFilter.GaussianBlur(1.1))
base = to_img(img).convert('RGBA')
base.alpha_composite(layer)
img = np.asarray(base.convert('RGB'), np.float32).copy()

# ------------------------------------------------------------------ ground (fields)
t = np.clip((yy - Y0) / (H - Y0), 0, 1)
ground = stops_grad(t[:, 0], [(0, '#D8CF92'), (0.08, '#C8B861'), (0.35, '#B39332'), (1.0, '#8F7222')])
ground = np.repeat(ground[:, None, :], W, axis=1)

# perspective-correct patchwork of paddy: sample a tiled noise texture by (x*z, z)
TEX = 1536
tex1 = fbm(TEX, TEX, base=180, octs=4, seed=21)
tex2 = fbm(TEX, TEX, base=60, octs=4, seed=22)
tt = np.clip((yy - Y0) / (H - Y0), 0.006, 1)
z = 1.0 / (tt + 0.012)
u = ((xx - W / 2) * z * 0.55 + 4000).astype(np.int64) % TEX
vv = (z * 70).astype(np.int64) % TEX
n1 = tex1[vv, u]
n2 = tex2[vv, u]
gold_a, gold_b = hx('#D9B24C'), hx('#B98F2C')
green_a, green_b = hx('#9DB04A'), hx('#6F9440')
mix_gb = smooth(n1, 0.46, 0.60)[..., None]
goldv = gold_a * (1 - n2[..., None]) + gold_b * n2[..., None]
greenv = green_a * (1 - n2[..., None]) + green_b * n2[..., None]
fieldcol = goldv * (1 - mix_gb) + greenv * mix_gb
# haze with distance
haze = np.clip(1 - tt * 4.0, 0, 1)[..., None] * 0.55
fieldcol = fieldcol * (1 - haze) + hx('#E7DDB0') * haze
# furrow stripes running toward the horizon
stripe = np.sin((xx - W / 2) * z * 0.045) * 0.5 + 0.5
fieldcol = fieldcol * (0.93 + 0.12 * stripe[..., None])
g_mask = smooth(yy - Y0, -1, 3)[..., None]
img = img * (1 - g_mask) + fieldcol * g_mask

# ------------------------------------------------------------------ road geometry
HWB = 0.19 * W            # half width at the bottom edge


def road_cx(tv):
    return W / 2 - 110 * tv ** 1.7


def road_hw(tv):
    return 3 + HWB * tv


rt = np.clip((yy - Y0) / (H - Y0), 0, 1)
cxm = road_cx(rt)
hwm = road_hw(rt)
dx = (xx - cxm)
inside = (np.abs(dx) < hwm) & (yy >= Y0)
edge = smooth(hwm - np.abs(dx), -2, 3)  # soft edge
rcol = stops_grad(rt[:, 0], [(0, '#BDBBB6'), (0.07, '#9A9CA6'), (0.4, '#707A92'), (1.0, '#576280')])
rcol = np.repeat(rcol[:, None, :], W, axis=1)
grain = fbm(W, H, base=4, octs=3, seed=51)
patch = fbm(W, H, base=70, octs=4, seed=52)
rcol = rcol + ((grain - 0.5) * 22 + (patch - 0.5) * 20)[..., None]
# worn tyre lanes
rel = dx / np.maximum(hwm, 1)
lanes = (np.exp(-((np.abs(rel) - 0.42) / 0.11) ** 2)) * (0.6 + 0.4 * patch)
rcol = rcol * (1 - 0.14 * lanes[..., None])
# dust and sand along the shoulders
dust = smooth(np.abs(rel), 0.80, 1.0)[..., None] * (0.35 + 0.35 * patch[..., None])
rcol = rcol * (1 - dust) + hx('#B9A07A') * dust
# warm light from the sun on the right half of the road
sunside = smooth(rel, -0.2, 1.0)[..., None] * 0.14 * smooth(rt, 0.0, 0.5)[..., None]
rcol = rcol * (1 - sunside) + hx('#F4D9A8') * sunside
img = img * (1 - (edge * inside)[..., None]) + rcol * (edge * inside)[..., None]

# faded centre dashes
dash = Image.new('L', (W, H), 0)
dd = ImageDraw.Draw(dash)
N = 15
for k in range(N):
    ta = (k / N) ** 2.1
    tb = ta + 0.42 * (((k + 1) / N) ** 2.1 - ta)
    if ta < 0.015:
        continue
    ya, yb = Y0 + (H - Y0) * ta, Y0 + (H - Y0) * tb
    wa, wb = 0.012 * road_hw(ta) + 0.6, 0.012 * road_hw(tb) + 0.6
    ca, cb = road_cx(ta), road_cx(tb)
    dd.polygon([(ca - wa, ya), (ca + wa, ya), (cb + wb, yb), (cb - wb, yb)], fill=255)
dash = np.asarray(dash.filter(ImageFilter.GaussianBlur(0.8)), np.float32) / 255
wear = smooth(fbm(W, H, base=24, octs=4, seed=61), 0.38, 0.62)
dash = dash * (0.25 + 0.45 * wear)
img = img * (1 - dash[..., None]) + hx('#F2E8CE') * dash[..., None]

# ------------------------------------------------------------------ grass strokes
def road_side(x, y):
    tv = (y - Y0) / (H - Y0)
    return abs(x - road_cx(tv)) / road_hw(tv)


gl = Image.new('RGBA', (W, H), (0, 0, 0, 0))
gd = ImageDraw.Draw(gl)
greens = ['#6F9440', '#8DAA45', '#A9B84F', '#C4B14B', '#D8B84E', '#7C9A48', '#5F8A3E']
golds = ['#E1BE55', '#CDA340', '#B98F2C', '#F0D273', '#D7B04A']
dry = ['#C9A64A', '#A98538', '#8E7027']
pal_g = [hx(c) for c in greens]
pal_o = [hx(c) for c in golds]
pal_d = [hx(c) for c in dry]
strokes = []
NS = 78000
for i in range(NS):
    uu = R.random() ** 1.55
    y = Y0 + 6 + (H - Y0 - 6) * uu
    x = R.random() * W
    if road_side(x, y) < 0.97:
        continue
    strokes.append((y, x))
# roadside verge tufts (bigger, denser)
for i in range(30000):
    uu = R.random() ** 1.35
    y = Y0 + 10 + (H - Y0 - 10) * uu
    side = -1 if R.random() < 0.5 else 1
    tv = (y - Y0) / (H - Y0)
    x = road_cx(tv) + side * road_hw(tv) * (0.93 + abs(R.normal()) * 0.16)
    strokes.append((y, x))
strokes.sort()
for (y, x) in strokes:
    tv = (y - Y0) / (H - Y0)
    L = 3 + 70 * tv ** 1.25 * (0.55 + 0.9 * R.random())
    wd = max(1, int(1 + 3.6 * tv * (0.6 + 0.8 * R.random())))
    lean = R.normal() * 0.28 + (0.06 if x > W / 2 else -0.06)
    # choose colour family by noise-ish position
    fam = R.random()
    if fam < 0.42:
        c = pal_g[R.integers(len(pal_g))]
    elif fam < 0.85:
        c = pal_o[R.integers(len(pal_o))]
    else:
        c = pal_d[R.integers(len(pal_d))]
    sun = 0.92 + 0.22 * (x / W) + R.normal() * 0.05
    c = np.clip(c * sun * (1 - 0.18 * (1 - tv) * 0 ), 0, 255)
    hz = max(0.0, 1 - tv * 5) * 0.5          # haze fades distant strokes toward the pale horizon colour
    c = c * (1 - hz) + hx('#E7DDB0') * hz
    a = int(150 + 90 * R.random())
    p1 = (x, y)
    p2 = (x + lean * L * 0.55, y - L * 0.55)
    p3 = (x + lean * L * 1.15, y - L)
    col = (int(c[0]), int(c[1]), int(c[2]), a)
    gd.line([p1, p2, p3], fill=col, width=wd)
    if L > 14:
        tip = np.clip(c * 1.18 + 10, 0, 255)
        gd.line([p2, p3], fill=(int(tip[0]), int(tip[1]), int(tip[2]), a), width=max(1, wd - 1))
gl = gl.filter(ImageFilter.GaussianBlur(0.35))
base = to_img(img).convert('RGBA')
base.alpha_composite(gl)

# ------------------------------------------------------------------ rider + scooter
S = 4
LW, LH = 460, 560
YO = 84            # local canvas in final px
rc = Image.new('RGBA', (LW * S, LH * S), (0, 0, 0, 0))
cx0 = LW // 2


def P(x, y):
    return ((cx0 + x) * S, (y + YO) * S)


def poly(pts, fill, d):
    d.polygon([P(*p) for p in pts], fill=fill)


def chaikin(pts, it=3, closed=True):
    for _ in range(it):
        out = []
        n = len(pts)
        for i in range(n if closed else n - 1):
            a, b = pts[i], pts[(i + 1) % n]
            out.append((0.75 * a[0] + 0.25 * b[0], 0.75 * a[1] + 0.25 * b[1]))
            out.append((0.25 * a[0] + 0.75 * b[0], 0.25 * a[1] + 0.75 * b[1]))
        pts = out
    return pts


def ell(cx, cy, rx, ry, fill, d):
    d.ellipse([P(cx - rx, cy - ry), P(cx + rx, cy + ry)], fill=fill)


def line(pts, fill, wd, d):
    d.line([P(*p) for p in pts], fill=fill, width=int(wd * S), joint='curve')


# colours
INK = (31, 37, 64, 255)        # jacket
INK2 = (45, 53, 88, 255)
DENIM = (58, 86, 130, 255)
MUSTARD = (240, 184, 72, 255)
MUSTARD_D = (200, 140, 40, 255)
CORAL = (222, 84, 56, 255)
CORAL_D = (168, 56, 40, 255)
CREAM = (246, 236, 214, 255)
HAIR = (52, 36, 34, 255)
TIRE = (26, 26, 34, 255)

# shadow on the road (cast away from the sun, to the left)
sh = Image.new('RGBA', (LW * S, LH * S), (0, 0, 0, 0))
sd = ImageDraw.Draw(sh)
sd.ellipse([P(-150, 408), P(110, 462)], fill=(30, 30, 55, 120))
sd.ellipse([P(-60, 24 + 340), P(60, 24 + 400)], fill=(30, 30, 55, 90))
sh = sh.filter(ImageFilter.GaussianBlur(10 * S))
rc.alpha_composite(sh)
d = ImageDraw.Draw(rc)

# rear tyre and mudguard
poly(chaikin([(-19, 330), (19, 330), (22, 420), (14, 440), (-14, 440), (-22, 420)], 3), TIRE, d)
for k in range(8):
    line([(-16, 345 + k * 11), (16, 349 + k * 11)], (60, 60, 72, 255), 1.5, d)
poly(chaikin([(-34, 300), (34, 300), (30, 345), (-30, 345)], 3), (38, 38, 52, 255), d)
# scooter rear cowl (coral), with side flares
poly(chaikin([(-62, 235), (62, 235), (74, 275), (58, 318), (30, 338), (-30, 338), (-58, 318), (-74, 275)], 3), CORAL, d)
poly(chaikin([(30, 240), (62, 240), (74, 275), (58, 318), (36, 330), (46, 285)], 3), (240, 112, 78, 255), d)  # sun side
poly(chaikin([(-62, 240), (-30, 240), (-44, 285), (-36, 330), (-58, 318), (-74, 275)], 3), CORAL_D, d)        # shade side
# tail light and number plate
d.rounded_rectangle([P(-17, 268), P(17, 288)], radius=6 * S, fill=(255, 214, 96, 255))
d.rounded_rectangle([P(-12, 272), P(12, 284)], radius=4 * S, fill=(255, 245, 190, 255))
d.rounded_rectangle([P(-26, 296), P(26, 322)], radius=3 * S, fill=CREAM)
for k in range(5):
    d.rectangle([P(-20 + k * 8, 302), P(-16 + k * 8, 316)], fill=(70, 60, 70, 255))
# seat edge and passenger grab rail
poly(chaikin([(-58, 222), (58, 222), (66, 246), (-66, 246)], 3), (52, 36, 40, 255), d)
line([(-70, 232), (-70, 262)], (50, 50, 62, 255), 6, d)
line([(70, 232), (70, 262)], (50, 50, 62, 255), 6, d)

# handlebar and mirrors (behind the rider)
line([(-112, 96), (112, 96)], (46, 46, 60, 255), 8, d)
line([(-108, 92), (-118, 56)], (60, 60, 74, 255), 3, d)
line([(108, 92), (118, 56)], (60, 60, 74, 255), 3, d)
ell(-118, 52, 11, 7, (70, 74, 96, 255), d)
ell(118, 52, 11, 7, (70, 74, 96, 255), d)

# legs and trainers
for sgn in (-1, 1):
    poly(chaikin([(sgn * 38, 190), (sgn * 66, 190), (sgn * 78, 250), (sgn * 82, 306), (sgn * 58, 308), (sgn * 48, 252)], 3), DENIM, d)
    ell(sgn * 72, 318, 20, 11, (240, 238, 232, 255), d)
    ell(sgn * 72, 322, 20, 6, (200, 196, 190, 255), d)

# torso
torso = chaikin([(-58, 30), (-30, 8), (30, 8), (58, 30), (66, 80), (54, 150), (48, 205), (-48, 205), (-54, 150), (-66, 80)], 3)
poly(torso, INK, d)
poly(chaikin([(18, 14), (58, 32), (66, 80), (54, 150), (46, 200), (30, 200), (36, 130), (30, 60)], 3), INK2, d)   # sun side
# jacket folds
for pts in [[(-36, 120), (-12, 132), (6, 150)], [(14, 110), (30, 126), (40, 150)], [(-46, 70), (-30, 82), (-26, 100)]]:
    line(pts, (20, 24, 44, 200), 2.4, d)
# arms to the grips
for sgn in (-1, 1):
    arm = chaikin([(sgn * 50, 34), (sgn * 68, 40), (sgn * 94, 70), (sgn * 108, 90), (sgn * 98, 106), (sgn * 82, 100), (sgn * 66, 84), (sgn * 52, 76)], 3)
    poly(arm, INK if sgn < 0 else INK2, d)
    ell(sgn * 106, 98, 13, 12, (214, 168, 140, 255), d)      # hands on the grips
    ell(sgn * 108, 102, 11, 6, (46, 46, 60, 255), d)

# backpack
bp = chaikin([(-44, 40), (-34, 24), (34, 24), (44, 40), (50, 110), (46, 156), (-46, 156), (-50, 110)], 3)
poly(bp, MUSTARD, d)
poly(chaikin([(10, 30), (34, 28), (46, 44), (50, 110), (46, 154), (20, 154), (28, 100)], 3), (250, 205, 100, 255), d)
poly(chaikin([(-46, 112), (46, 112), (46, 156), (-46, 156)], 2), MUSTARD_D, d)
d.rounded_rectangle([P(-30, 96), P(30, 138)], radius=8 * S, fill=(226, 160, 52, 255))          # front pocket
line([(-30, 106), (30, 106)], (150, 100, 30, 255), 2.2, d)                                       # zip
ell(0, 122, 4, 4, (110, 70, 20, 255), d)
line([(-12, 24), (-12, 8), (12, 8), (12, 24)], (180, 120, 30, 255), 5, d)                        # top handle
line([(-42, 50), (-44, 150)], (160, 105, 30, 255), 3, d)
line([(42, 50), (44, 150)], (160, 105, 30, 255), 3, d)
# shoulder straps
line([(-34, 24), (-40, 6)], (24, 28, 48, 255), 8, d)
line([(34, 24), (40, 6)], (24, 28, 48, 255), 8, d)

# hair falling over the collar, then helmet
hair = chaikin([(-22, -6), (22, -6), (26, 26), (20, 66), (8, 88), (-4, 76), (-14, 90), (-26, 60), (-26, 26)], 3)
poly(hair, HAIR, d)
for off in (-14, -2, 10, 20):
    line([(off, 4), (off + 2, 36), (off + (3 if off > 0 else -3), 74)], (86, 60, 52, 200), 1.6, d)
helmet = chaikin([(-38, -22), (-32, -54), (0, -66), (32, -54), (38, -22), (34, 2), (-34, 2)], 3)
poly(helmet, CREAM, d)
poly(chaikin([(10, -62), (32, -52), (38, -22), (34, 0), (18, 0), (22, -30)], 3), (255, 249, 232, 255), d)
poly(chaikin([(-38, -22), (-30, -50), (-20, -58), (-26, -26), (-34, 0)], 3), (210, 196, 170, 255), d)
line([(-34, -2), (34, -2)], (190, 176, 150, 255), 5, d)                      # lower rim
line([(-20, -50), (0, -58), (20, -50)], (255, 255, 250, 255), 3.0, d)         # specular
line([(-4, -62), (-4, -30)], CORAL, 4.2, d)                                   # centre stripe
for k in range(3):
    line([(-12 + k * 12, -28), (-12 + k * 12, -14)], (176, 160, 134, 255), 2.4, d)  # vents

rc = rc.resize((LW, LH), Image.LANCZOS)
# directional light: warm and bright on the sun side, cooler on the shadow side
ra = np.asarray(rc, np.float32)
gx = np.linspace(0.82, 1.12, LW)[None, :, None]
gy = np.linspace(1.04, 0.90, LH)[:, None, None]
ra[..., :3] = np.clip(ra[..., :3] * gx * gy, 0, 255)
warm = np.clip(np.linspace(-0.2, 1, LW), 0, 1)[None, :, None]
ra[..., :3] = ra[..., :3] * (1 - 0.10 * warm) + hx('#FFD9A0') * 0.10 * warm
rc = Image.fromarray(ra.astype(np.uint8), 'RGBA')

SC = 1.15
rc = rc.resize((int(LW * SC), int(LH * SC)), Image.LANCZOS)
rt_ = 0.955
ry = int(Y0 + (H - Y0) * rt_)
rx = int(road_cx(rt_))
base.alpha_composite(rc, (rx - rc.width // 2, ry - int((440 + YO) * SC)))   # rear tyre touches the road

# ------------------------------------------------------------------ finishing
out = np.asarray(base.convert('RGB'), np.float32)
# aerial haze band at the horizon
hb = np.exp(-((yy - Y0) / 55.0) ** 2)[..., None] * 0.28
out = out * (1 - hb) + hx('#F8E6C0') * hb
# gentle depth of field in the foreground corners
blur = np.asarray(to_img(out).filter(ImageFilter.GaussianBlur(5)), np.float32)
bm = (smooth(rt, 0.84, 1.0) * smooth(np.abs(xx - W / 2), 700, 1200))[..., None]
out = out * (1 - bm) + blur * bm
# paper grain + soft blotches, like gouache on textured paper
g1 = R.normal(0, 5.0, (H, W)).astype(np.float32)
blot = (fbm(W, H, base=90, octs=4, seed=77) - 0.5) * 16
out = out + g1[..., None] + blot[..., None]
# soft vignette
vg = 1 - 0.16 * smooth(np.sqrt(((xx - W / 2) / (W / 2)) ** 2 + ((yy - H * 0.55) / (H * 0.7)) ** 2), 0.6, 1.25)
out = out * vg[..., None]
res = to_img(out)
res.save(sys.argv[1] if len(sys.argv) > 1 else 'hero-scene.webp', quality=82, method=6)
res.resize((1000, 729), Image.LANCZOS).save('preview_scene.png')
print('ok', res.size)
