"""
Renders TrueNorth social profile images, covers, and launch-post graphics.

Each asset is a small HTML page (brand tokens from tailwind.config.ts, logo PNGs
from /public) screenshotted at exact platform dimensions with headless Chrome.

    python3 marketing/social/render.py            # all assets
    python3 marketing/social/render.py fb-cover   # one asset by name
"""
import math
import pathlib
import subprocess
import sys
import tempfile
import time

ROOT = pathlib.Path(__file__).resolve().parents[2]
OUT = ROOT / "marketing" / "social" / "images"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
H_LOGO = (ROOT / "public" / "logo-horizontal.png").as_uri()  # 1939 x 498, includes tagline
S_LOGO = (ROOT / "public" / "logo-stacked.png").as_uri()  # 1747 x 1101; mark = x549–1198, y0–553

NAVY, INK, GOLD, GOLD_LT, SAND, MIST, SLATE = "#0F2742", "#0A1B30", "#C29A4A", "#DBB76A", "#F6F1E7", "#AEC1D8", "#475569"
AREAS = "Spring Hill · Brooksville · Weeki Wachee · Hernando Beach · Timber Pines"
COORDS = "28.55° N · 82.39° W"  # Brooksville, county seat

BASE_CSS = f"""
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=block');
*{{margin:0;padding:0;box-sizing:border-box}}
html,body{{overflow:hidden}}
body{{font-family:'Plus Jakarta Sans',system-ui,sans-serif;-webkit-font-smoothing:antialiased;position:relative}}
.serif{{font-family:'Fraunces',Georgia,serif;font-optical-sizing:auto}}
.white{{filter:brightness(0) invert(1)}}
.grid{{position:absolute;inset:0;background-image:
  repeating-linear-gradient(0deg,rgba(219,183,106,.07) 0 1px,transparent 1px 96px),
  repeating-linear-gradient(90deg,rgba(219,183,106,.07) 0 1px,transparent 1px 96px)}}
.caps{{text-transform:uppercase;letter-spacing:.22em;font-weight:600}}
.abs{{position:absolute}}
"""


def compass(cx, cy, r, color=GOLD, opacity=0.35, stroke=2.0, label=True):
    """Bearing ring: 5° ticks, longer every 30°, 'N' at 0°. Drawn in an overflow-visible SVG."""
    ticks = []
    for deg in range(0, 360, 5):
        a = math.radians(deg - 90)
        inner = r - (r * 0.09 if deg % 30 == 0 else r * 0.035)
        x1, y1 = cx + inner * math.cos(a), cy + inner * math.sin(a)
        x2, y2 = cx + r * math.cos(a), cy + r * math.sin(a)
        ticks.append(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}"/>')
    n = (
        f'<text x="{cx}" y="{cy - r * 1.07:.1f}" text-anchor="middle" font-family="Fraunces, Georgia, serif" '
        f'font-size="{r * 0.1:.0f}" fill="{color}" stroke="none">N</text>'
        if label else ""
    )
    return (
        f'<svg class="abs" style="left:0;top:0;overflow:visible;opacity:{opacity}" width="1" height="1">'
        f'<g fill="none" stroke="{color}" stroke-width="{stroke}">'
        f'<circle cx="{cx}" cy="{cy}" r="{r}"/><circle cx="{cx}" cy="{cy}" r="{r * 0.82:.1f}" stroke-dasharray="2 10"/>'
        f'{"".join(ticks)}</g>{n}</svg>'
    )


def mark(width, white=True, style=""):
    """Building + house + needle mark cropped out of the stacked logo."""
    s = width / 649
    return (
        f'<div class="{"white" if white else ""}" style="width:{width}px;height:{553 * s:.0f}px;'
        f"background:url('{S_LOGO}') no-repeat {-549 * s:.1f}px 0/{1747 * s:.1f}px auto;{style}\"></div>"
    )


def page(w, h, body, bg):
    return (
        f"<!doctype html><html><head><meta charset='utf-8'><style>{BASE_CSS}"
        f"html,body{{width:{w}px;height:{h}px;background:{bg}}}</style></head><body>{body}</body></html>"
    )


# ── Profile pictures (square; platforms crop to a circle) ─────────────────────
def profile(dark=True):
    bg = NAVY if dark else SAND
    ring = GOLD
    body = (
        f'<div class="abs" style="inset:0;background:radial-gradient(circle at 50% 45%,{"#1B3859" if dark else "#FCFAF5"} 0,{bg} 70%)"></div>'
        + compass(540, 540, 452, ring, 0.9 if dark else 0.75, 3, label=False)
        + f'<div class="abs" style="left:0;right:0;top:0;bottom:0;display:flex;align-items:center;justify-content:center;padding-bottom:18px">{mark(540, white=dark)}</div>'
    )
    return page(1080, 1080, body, bg)


# ── Covers ────────────────────────────────────────────────────────────────────
def fb_cover():
    # Mobile shows only the center ~1110px of the 1640px width — all content lives there.
    body = (
        '<div class="grid"></div>'
        + compass(1480, 312, 400, GOLD, 0.28)
        + compass(150, 560, 260, GOLD, 0.16, label=False)
        + f'<div class="abs" style="left:0;right:0;top:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:30px">'
        f'<img class="white" src="{H_LOGO}" style="width:760px">'
        f'<div style="width:96px;height:2px;background:{GOLD}"></div>'
        f'<div class="caps" style="color:{MIST};font-size:17px">{AREAS}</div></div>'
        + f'<div class="abs caps" style="right:40px;bottom:30px;color:{GOLD};font-size:13px;opacity:.8">{COORDS}</div>'
    )
    return page(1640, 624, body, NAVY)


def linkedin_cover():
    # LinkedIn's company logo overlaps the lower-left of the banner — keep copy right-aligned.
    body = (
        '<div class="grid" style="background-size:auto"></div>'
        + compass(1010, 96, 150, GOLD, 0.3, 1.5, label=False)
        + f'<div class="abs" style="right:64px;top:0;bottom:0;display:flex;flex-direction:column;justify-content:center;align-items:flex-end;gap:12px">'
        f'<div class="serif" style="color:#fff;font-size:40px;font-weight:400;letter-spacing:-.01em">Property management with <em style="color:{GOLD_LT}">direction.</em></div>'
        f'<div class="caps" style="color:{MIST};font-size:13px">Hernando County, Florida · truenorthpm.co</div></div>'
    )
    return page(1128, 191, body, NAVY)


def youtube_banner():
    # Only the center 1546 x 423 is guaranteed visible on every device.
    body = (
        '<div class="grid"></div>'
        + compass(1280, 720, 620, GOLD, 0.22)
        + compass(1280, 720, 1040, GOLD, 0.1, label=False)
        + f'<div class="abs" style="left:0;right:0;top:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:60px">'
        f'<img class="white" src="{H_LOGO}" style="width:1080px">'
        f'<div class="caps" style="color:{MIST};font-size:24px">{AREAS}</div></div>'
    )
    return page(2560, 1440, body, NAVY)


# ── Launch-post graphics (1080 x 1350, 4:5 — works on IG, FB, and LinkedIn) ───
def footer_band(cta):
    return (
        f'<div class="abs" style="left:0;right:0;bottom:0;height:184px;background:{NAVY};display:flex;align-items:center;justify-content:space-between;padding:0 80px">'
        f'<img class="white" src="{H_LOGO}" style="width:400px">'
        f'<div style="color:{GOLD_LT};font-size:24px;font-weight:600;text-align:right;line-height:1.35">{cta}</div></div>'
    )


def teaser(eyebrow, figure, sub, title, cta="Read the guide<br>truenorthpm.co/resources"):
    body = (
        compass(1010, 250, 330, NAVY, 0.07)
        + f'<div class="abs" style="left:80px;right:80px;top:84px;display:flex;justify-content:space-between;align-items:center">'
        f'<div class="caps" style="color:{GOLD};font-size:20px;display:flex;align-items:center;gap:16px"><span style="width:44px;height:2px;background:{GOLD}"></span>{eyebrow}</div>'
        f'<div class="caps" style="color:{SLATE};font-size:15px;opacity:.7">{COORDS}</div></div>'
        f'<div class="abs" style="left:80px;right:80px;top:150px;bottom:184px;display:flex;flex-direction:column;justify-content:center">'
        f'<div class="serif" style="color:{NAVY};font-size:208px;line-height:.95;font-weight:500;letter-spacing:-.03em;font-variant-numeric:lining-nums;font-variation-settings:\'SOFT\' 0,\'WONK\' 0">{figure}</div>'
        f'<p style="margin-top:36px;color:{SLATE};font-size:33px;line-height:1.42;max-width:860px">{sub}</p>'
        f'<div style="width:72px;height:3px;background:{GOLD};margin:84px 0 30px"></div>'
        f'<h1 class="serif" style="color:{NAVY};font-size:62px;line-height:1.08;font-weight:500;letter-spacing:-.015em;text-wrap:balance">{title}</h1></div>'
        + footer_band(cta)
    )
    return page(1080, 1350, body, SAND)


def launch():
    items = ["Plans from $99/month", "Online owner &amp; tenant portals", "Local, responsive, and transparent"]
    li = "".join(
        f'<li style="display:flex;align-items:center;gap:22px"><span style="width:14px;height:14px;transform:rotate(45deg);background:{GOLD}"></span>{t}</li>'
        for t in items
    )
    body = (
        '<div class="grid"></div>'
        + compass(900, 330, 420, GOLD, 0.25)
        + f'<div class="abs" style="left:84px;right:84px;top:88px;display:flex;justify-content:space-between">'
        f'<div class="caps" style="color:{GOLD_LT};font-size:20px">Now serving Hernando County</div>'
        f'<div class="caps" style="color:{MIST};font-size:15px;opacity:.8">{COORDS}</div></div>'
        f'<h1 class="abs serif" style="left:84px;right:84px;top:250px;color:#fff;font-size:124px;line-height:1;font-weight:400;letter-spacing:-.03em">'
        f'Property management with <em style="color:{GOLD_LT}">direction.</em></h1>'
        f'<ul class="abs" style="left:84px;top:760px;list-style:none;display:flex;flex-direction:column;gap:26px;color:#fff;font-size:36px;font-weight:500">{li}</ul>'
        f'<div class="abs" style="left:84px;right:84px;bottom:84px;padding-top:40px;border-top:1px solid rgba(219,183,106,.35);display:flex;align-items:center;justify-content:space-between">'
        f'<img class="white" src="{H_LOGO}" style="width:420px">'
        f'<div style="color:{GOLD_LT};font-size:24px;font-weight:600;text-align:right;line-height:1.4">truenorthpm.co<br>(727) 815-5245</div></div>'
    )
    return page(1080, 1350, body, NAVY)


ASSETS = {
    "profile-navy": (1080, 1080, lambda: profile(True)),
    "profile-sand": (1080, 1080, lambda: profile(False)),
    "fb-cover": (1640, 624, fb_cover),
    "linkedin-cover": (1128, 191, linkedin_cover),
    "youtube-banner": (2560, 1440, youtube_banner),
    "post-01-launch": (1080, 1350, launch),
    "post-02-pricing": (1080, 1350, lambda: teaser(
        "Spring Hill rental market", "$2,200",
        "What one extra vacant month costs on a $2,200 rental. A $50 price cut costs $600 over a full year.",
        "How to price your Spring Hill rental without guessing")),
    "post-03-hurricane": (1080, 1350, lambda: teaser(
        "Hurricane preparedness", "Sept 10",
        "The statistical peak of Atlantic hurricane season, and a good day to check your rental’s storm plan.",
        "Rental property hurricane checklist for Florida landlords")),
    "post-04-screening": (1080, 1350, lambda: teaser(
        "Tenant screening", "2.5–3×",
        "A common income-to-rent guideline. It’s one of five written criteria to apply the same way to every applicant.",
        "How to screen tenants fairly and consistently in Florida")),
    "post-05-deposits": (1080, 1350, lambda: teaser(
        "Florida rental basics", "15 / 30",
        "Days a Florida landlord has to return a deposit, or send a certified-mail notice of a claim.",
        "Florida security deposit rules every landlord should know")),
    "post-06-investing": (1080, 1350, lambda: teaser(
        "Investor strategy", "−$4/mo",
        "What a home renting $950 above its mortgage can net once taxes, insurance, vacancy, and reserves are counted.",
        "Buying a rental in Hernando County? Run these numbers first")),
}


def render(name):
    w, h, build = ASSETS[name]
    with tempfile.TemporaryDirectory() as tmp:
        html = pathlib.Path(tmp) / f"{name}.html"
        html.write_text(build(), encoding="utf-8")
        out = OUT / f"{name}.png"
        out.unlink(missing_ok=True)
        # Headless Chrome on macOS writes the screenshot but doesn't always exit — stop it once the file lands.
        proc = subprocess.Popen(
            [CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
             f"--user-data-dir={tmp}/profile", "--allow-file-access-from-files", "--virtual-time-budget=8000",
             f"--window-size={w},{h}", f"--screenshot={out}", html.as_uri()],
            stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
        )
        deadline = time.time() + 60
        while proc.poll() is None and not out.exists() and time.time() < deadline:
            time.sleep(0.25)
        time.sleep(0.5)  # let the write finish
        if proc.poll() is None:
            proc.kill()
            proc.wait()
        if not out.exists():
            sys.exit(f"{name}: Chrome produced no screenshot")
        print(f"{out.relative_to(ROOT)}  {w}x{h}")


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    for n in sys.argv[1:] or ASSETS:
        render(n)
