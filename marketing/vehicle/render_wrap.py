"""
TrueNorth vehicle-wrap concept: 2023 Tesla Model Y side profile, two options.

Car geometry is drawn to the Model Y's real proportions at 11 px per inch
(length 187", wheelbase 113.8", height 64", ~30" tires), front facing left.
This is a concept for choosing a direction — a wrap shop builds the production
proof from the exact vehicle template.

    python3 marketing/vehicle/render_wrap.py
"""
import math
import pathlib
import subprocess
import sys
import tempfile
import time

HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent / "social"))
from render import BASE_CSS, CHROME, GOLD, GOLD_LT, H_LOGO, MIST, NAVY  # noqa: E402

OUT = HERE / "model-y-wrap-concept.png"
URL, PHONE = "truenorthpm.co", "(352) 995-2355"
BROKERAGE = "TrueNorth Brokerage Group LLC d/b/a TrueNorth Property Management"  # Fla. R. 61J2-10.025 — vehicle signage is advertising
legal_name, trade_name = BROKERAGE.split(" d/b/a ")

FRONT, REAR, WHEEL_Y, TIRE_R, ARCH_R, SILL = (566, 715), (1818, 715), 715, 165, 190, 800

BODY = (
    f"M 200 {SILL} C 176 792, 166 745, 166 700 C 166 640, 176 585, 215 548 "
    "C 250 520, 330 500, 470 488 C 640 474, 800 455, 890 438 L 1215 188 "
    "C 1330 170, 1500 172, 1640 185 C 1800 200, 1960 245, 2080 305 "
    "C 2140 335, 2175 350, 2195 362 C 2215 380, 2228 420, 2230 470 L 2226 640 "
    f"C 2224 720, 2222 770, 2208 {SILL} L 1988 {SILL} A {ARCH_R} {ARCH_R} 0 1 0 1648 {SILL} "
    f"L 736 {SILL} A {ARCH_R} {ARCH_R} 0 1 0 396 {SILL} Z"
)
GLASS = (
    "M 940 428 L 1228 212 C 1340 196, 1500 198, 1630 210 C 1780 224, 1900 262, 1985 318 "
    "C 1995 330, 1990 350, 1970 362 C 1700 385, 1300 405, 960 430 Z"
)
DOOR_LINES = [
    "M 945 432 C 930 520, 925 640, 932 772",  # front door leading edge
    "M 1405 407 L 1410 780",  # B-pillar seam
    "M 1925 366 C 1900 440, 1760 520, 1675 570",  # rear door trailing edge to the arch
    "M 932 772 L 1640 772",  # rocker seam
]


def ring(cx, cy, r, color, opacity, sw=3):
    ticks = []
    for d in range(0, 360, 5):
        a = math.radians(d - 90)
        inner = r - (r * 0.09 if d % 30 == 0 else r * 0.035)
        ticks.append(
            f'<line x1="{cx + inner * math.cos(a):.1f}" y1="{cy + inner * math.sin(a):.1f}" '
            f'x2="{cx + r * math.cos(a):.1f}" y2="{cy + r * math.sin(a):.1f}"/>'
        )
    return (
        f'<g fill="none" stroke="{color}" stroke-width="{sw}" opacity="{opacity}">'
        f'<circle cx="{cx}" cy="{cy}" r="{r}"/><circle cx="{cx}" cy="{cy}" r="{r * 0.82:.0f}" stroke-dasharray="3 14"/>'
        f'{"".join(ticks)}</g>'
    )


def wheel(cx, cy):
    spokes = []
    for k in range(5):
        pts = []
        for rad, half in ((30, 11), (112, 7), (112, -7), (30, -11)):
            a = math.radians(k * 72 - 90 + half)
            pts.append(f"{cx + rad * math.cos(a):.1f},{cy + rad * math.sin(a):.1f}")
        spokes.append(f'<polygon points="{" ".join(pts)}"/>')
    return (
        f'<circle cx="{cx}" cy="{cy}" r="{TIRE_R}" fill="#121417"/>'
        f'<circle cx="{cx}" cy="{cy}" r="{TIRE_R - 6}" fill="none" stroke="#1E2227" stroke-width="4"/>'
        f'<circle cx="{cx}" cy="{cy}" r="120" fill="#262A31"/>'
        f'<g fill="#4A515B">{"".join(spokes)}</g>'
        f'<circle cx="{cx}" cy="{cy}" r="120" fill="none" stroke="#6B737E" stroke-width="3"/>'
        f'<circle cx="{cx}" cy="{cy}" r="28" fill="#1A1D22" stroke="#5B626C" stroke-width="2"/>'
    )


def car(option):
    full = option == "A"
    uid = option.lower()
    base = (
        f'<linearGradient id="paint{uid}" x1="0" y1="180" x2="0" y2="800" gradientUnits="userSpaceOnUse">'
        + ('<stop offset="0" stop-color="#1F3D62"/><stop offset=".45" stop-color="#0F2742"/><stop offset="1" stop-color="#071424"/>'
           if full else
           '<stop offset="0" stop-color="#FFFFFF"/><stop offset=".55" stop-color="#EEF0F2"/><stop offset="1" stop-color="#CDD3DA"/>')
        + "</linearGradient>"
    )
    defs = (
        "<defs>"
        + base
        + f'<clipPath id="body{uid}"><path d="{BODY}"/></clipPath>'
        '<clipPath id="above-sill"><rect x="0" y="0" width="2400" height="800"/></clipPath>'
        '<linearGradient id="glass" x1="0" y1="190" x2="0" y2="430" gradientUnits="userSpaceOnUse">'
        '<stop offset="0" stop-color="#3A4654"/><stop offset="1" stop-color="#0C1015"/></linearGradient>'
        '<linearGradient id="floor" x1="0" y1="0" x2="0" y2="1000" gradientUnits="userSpaceOnUse">'
        '<stop offset="0" stop-color="#F4F5F7"/><stop offset=".86" stop-color="#E3E7EC"/><stop offset="1" stop-color="#D6DBE1"/></linearGradient>'
        '<filter id="blur40"><feGaussianBlur stdDeviation="22"/></filter>'
        '<filter id="blur6"><feGaussianBlur stdDeviation="6"/></filter>'
        '<filter id="to-white"><feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0"/></filter>'
        f'<pattern id="grid{uid}" width="96" height="96" patternUnits="userSpaceOnUse">'
        f'<path d="M 96 0 L 0 0 0 96" fill="none" stroke="{GOLD_LT}" stroke-width="1.2" opacity="{0.12 if full else 0.16}"/></pattern>'
        "</defs>"
    )

    # Stays below the rear-door phone number, then climbs steeply over the rear quarter.
    wave = "M 140 830 L 140 705 C 600 700, 1150 670, 1520 615 C 1800 572, 2000 470, 2270 380 L 2270 830 Z"
    wave_edge = "M 140 705 C 600 700, 1150 670, 1520 615 C 1800 572, 2000 470, 2270 380"

    # Wrap artwork, clipped to the painted body.
    if full:
        art = (
            f'<rect x="0" y="0" width="2400" height="1000" fill="url(#paint{uid})"/>'
            f'<rect x="0" y="0" width="2400" height="1000" fill="url(#grid{uid})"/>'
            + ring(1840, 560, 440, GOLD, 0.5)
            + ring(1840, 560, 700, GOLD, 0.18, 2)
            + f'<path d="M 955 700 L 1630 700" stroke="{GOLD}" stroke-width="5"/>'
        )
        logo_filter, url_fill, caps_fill = 'filter="url(#to-white)"', "#FFFFFF", MIST
    else:
        art = (
            f'<rect x="0" y="0" width="2400" height="1000" fill="url(#paint{uid})"/>'
            f'<g><clipPath id="wave{uid}"><path d="{wave}"/></clipPath>'
            f'<g clip-path="url(#wave{uid})"><rect x="0" y="0" width="2400" height="1000" fill="{NAVY}"/>'
            f'<rect x="0" y="0" width="2400" height="1000" fill="url(#grid{uid})"/>'
            + ring(1840, 560, 440, GOLD, 0.6)
            + "</g></g>"
            f'<path d="{wave_edge}" fill="none" stroke="{GOLD}" stroke-width="9"/>'
        )
        logo_filter, url_fill, caps_fill = "", NAVY, "#FFFFFF"

    graphics = (
        f'<image href="{H_LOGO}" x="975" y="462" width="400" height="103" {logo_filter}/>'
        f'<text x="1438" y="484" font-family="Plus Jakarta Sans, sans-serif" font-weight="700" font-size="44" fill="{url_fill}" letter-spacing="-0.5">{URL}</text>'
        f'<text x="1440" y="530" font-family="Plus Jakarta Sans, sans-serif" font-weight="700" font-size="33" fill="{GOLD if full else GOLD}">{PHONE}</text>'
        f'<text x="976" y="{742 if full else 748}" font-family="Plus Jakarta Sans, sans-serif" font-weight="600" font-size="19" letter-spacing="4.2" fill="{caps_fill}">HERNANDO COUNTY, FLORIDA</text>'
        # Two lines so the licensed name stays on the front door, clear of the B-pillar seam.
        f'<text x="976" y="598" font-family="Plus Jakarta Sans, sans-serif" font-size="16" fill="{url_fill}" opacity=".85">'
        f'{legal_name}<tspan x="976" dy="21">d/b/a {trade_name}</tspan></text>'
    )
    shading = (
        '<rect x="0" y="640" width="2400" height="170" fill="#000" opacity=".16" filter="url(#blur40)"/>'
        '<path d="M 250 552 C 700 478, 1200 440, 2205 398" fill="none" stroke="#FFFFFF" stroke-width="14" '
        f'opacity="{0.16 if full else 0.55}" filter="url(#blur6)"/>'
    )

    seams = "".join(f'<path d="{d}" fill="none" stroke="#000" stroke-opacity=".45" stroke-width="2.5"/>' for d in DOOR_LINES)
    glass = (
        f'<path d="{GLASS}" fill="url(#glass)" stroke="#07090C" stroke-width="10" stroke-linejoin="round"/>'
        '<path d="M 1130 300 L 1260 214 L 1330 212 L 1170 330 Z" fill="#FFFFFF" opacity=".10"/>'
        '<path d="M 1580 212 L 1640 212 L 1540 392 L 1485 396 Z" fill="#FFFFFF" opacity=".07"/>'
        '<path d="M 1398 205 L 1432 204 L 1436 404 L 1402 407 Z" fill="#07090C"/>'  # B-pillar
    )
    details = (
        f'<path d="M 962 432 C 966 402, 1002 388, 1046 392 C 1062 400, 1056 422, 1030 430 Z" fill="{"#0A1B30" if full else "#E4E8EC"}" stroke="#000" stroke-opacity=".35" stroke-width="2"/>'  # mirror
        '<path d="M 204 566 C 254 540, 330 526, 405 521 C 395 534, 330 548, 214 580 Z" fill="#EAF2FA" stroke="#9FB2C6" stroke-width="2"/>'  # headlight
        '<path d="M 2150 380 C 2186 392, 2214 410, 2228 440 L 2228 458 C 2200 440, 2170 420, 2140 400 Z" fill="#B3121D"/>'  # taillight
        '<rect x="1300" y="452" width="82" height="11" rx="5" fill="#000" opacity=".45"/>'
        '<rect x="1800" y="428" width="72" height="11" rx="5" fill="#000" opacity=".45"/>'
    )

    return f"""<svg viewBox="0 0 2400 1000" width="2400" height="1000" xmlns="http://www.w3.org/2000/svg">
{defs}
<rect width="2400" height="1000" fill="url(#floor)"/>
<ellipse cx="1200" cy="884" rx="1110" ry="30" fill="#000" opacity=".35" filter="url(#blur40)"/>
<g clip-path="url(#above-sill)"><circle cx="{FRONT[0]}" cy="{WHEEL_Y}" r="{ARCH_R + 2}" fill="#0B0D10"/><circle cx="{REAR[0]}" cy="{WHEEL_Y}" r="{ARCH_R + 2}" fill="#0B0D10"/></g>
<g clip-path="url(#body{uid})">{art}{graphics}{shading}</g>
<path d="{BODY}" fill="none" stroke="#000" stroke-opacity=".35" stroke-width="3"/>
{seams}{glass}{details}
{wheel(*FRONT)}{wheel(*REAR)}
</svg>"""


def page():
    label = lambda tag, title, note: (  # noqa: E731
        f'<div style="display:flex;align-items:baseline;justify-content:space-between;padding:0 90px">'
        f'<div style="display:flex;align-items:baseline;gap:22px"><span class="caps" style="color:{GOLD};font-size:22px">Option {tag}</span>'
        f'<span class="serif" style="color:{NAVY};font-size:46px;font-weight:500">{title}</span></div>'
        f'<span style="color:#52627A;font-size:24px">{note}</span></div>'
    )
    return f"""<!doctype html><html><head><meta charset="utf-8"><style>{BASE_CSS}
html,body{{width:2400px;height:2560px;background:#F4F5F7}}
</style></head><body>
<div style="padding:80px 90px 40px;display:flex;justify-content:space-between;align-items:flex-end">
  <div>
    <div class="caps" style="color:{GOLD};font-size:22px">TrueNorth Property Management · Vehicle wrap concept</div>
    <h1 class="serif" style="margin-top:14px;color:{NAVY};font-size:76px;line-height:1.02;font-weight:400;letter-spacing:-.02em">2023 Tesla Model Y, <em style="color:#A57F37">two ways.</em></h1>
  </div>
  <img src="{H_LOGO}" style="width:430px;margin-bottom:10px">
</div>
{label("A", "Full satin navy wrap", "Maximum presence · reads at a distance")}
{car("A")}
{label("B", "Partial wrap on Pearl White", "Lower cost · keeps the factory paint")}
{car("B")}
<p style="padding:10px 90px 0;color:#52627A;font-size:22px;line-height:1.5">Concept drawn to Model Y proportions; a wrap shop will build the production proof from the exact vehicle template.
Florida advertising rules apply to vehicle signage: the licensed brokerage name must stay on the wrap.</p>
</body></html>"""


def render():
    with tempfile.TemporaryDirectory() as tmp:
        html = pathlib.Path(tmp) / "wrap.html"
        html.write_text(page(), encoding="utf-8")
        OUT.unlink(missing_ok=True)
        proc = subprocess.Popen(
            [CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
             f"--user-data-dir={tmp}/profile", "--allow-file-access-from-files", "--virtual-time-budget=8000",
             "--window-size=2400,2560", f"--screenshot={OUT}", html.as_uri()],
            stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
        )
        deadline, last = time.time() + 90, -1
        while time.time() < deadline:
            if OUT.exists() and OUT.stat().st_size and OUT.stat().st_size == last:
                break
            last = OUT.stat().st_size if OUT.exists() else -1
            time.sleep(0.5)
        if proc.poll() is None:
            proc.kill()
            proc.wait()
    if not OUT.exists():
        sys.exit("Chrome produced no screenshot")
    print(OUT)


if __name__ == "__main__":
    render()
