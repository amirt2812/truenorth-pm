"""
Baseball cap art — front panel, heat transfer (full color).

  cap-white-on-dark.png / .pdf    white + gold lockup, for navy/black/charcoal caps
  cap-navy-on-light.png / .pdf    navy + gold lockup, for white/grey caps
  cap-mark-white.png / .pdf       house mark alone, for a side panel or the back
  cap-mark-navy.png / .pdf

Heat transfer prints unlimited colors, so these keep the brand palette — but ink
only adds, it never lightens. Navy art on a navy cap disappears, so a dark cap
needs the reversed (white) file.

PNGs have a TRANSPARENT background at 300 dpi, which is what the cap vendor
wants; a white background would print as a white box around the logo.

IMPRINT: set IMPRINT_W_IN / IMPRINT_H_IN to the vendor's stated front-panel
area before ordering. The default is the usual VistaPrint cap window.

    python3 marketing/promo/render_cap.py
"""
import pathlib
import shutil
import sys
import tempfile

HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent / "print"))
sys.path.insert(0, str(HERE.parent / "social"))
from render_print import ROOT, chrome  # noqa: E402
from render import BASE_CSS, GOLD, GOLD_LT, NAVY  # noqa: E402
from render import S_LOGO  # noqa: E402

# Mark crop inside the stacked logo sheet: x549-1198, y0-553 of 1747x1101.
MARK = (549, 0, 649, 553, 1747, 1101)


def mark(width_in, color):
    """House mark, masked out of the stacked logo and filled with `color`."""
    x, y, w, h, sheet_w, sheet_h = MARK
    sc = width_in / w
    pos = f"{-x * sc}in {-y * sc}in/{sheet_w * sc}in auto"
    return (f'<div style="width:{width_in}in;height:{h * sc}in;background-color:{color};'
            f"-webkit-mask:url('{S_LOGO}') no-repeat {pos};mask:url('{S_LOGO}') no-repeat {pos}\"></div>")

IMPRINT_W_IN, IMPRINT_H_IN = 4.0, 2.25   # VistaPrint cap front panel — confirm before ordering
ART_W_IN, ART_H_IN = 3.8, 2.0            # art stays inside the window


def lockup(light_bg):
    ink = NAVY if light_bg else "#FFFFFF"
    accent = "#A57F37" if light_bg else GOLD_LT
    mark_html = mark(1.05, ink)
    return (
        f'<div style="display:flex;align-items:center;gap:.2in">'
        f'{mark_html}'
        f'<div style="text-align:left">'
        f'<div style="font-family:\'Fraunces\',Georgia,serif;font-weight:600;font-size:34pt;line-height:1;'
        f'letter-spacing:-.01em;color:{ink}">TrueNorth</div>'
        f'<div style="margin-top:.07in;width:2.3in;height:.022in;background:{accent}"></div>'
        f'<div style="margin-top:.07in;text-transform:uppercase;font-weight:700;font-size:10pt;'
        f'letter-spacing:.145em;color:{ink}">Property Management</div>'
        f'</div></div>'
    )


def page(body, w_in, h_in):
    return f"""<!doctype html><html><head><meta charset="utf-8"><style>{BASE_CSS}
@page{{size:{w_in}in {h_in}in;margin:0}}
html,body{{width:{w_in}in;height:{h_in}in;background:transparent}}
.art{{width:{w_in}in;height:{h_in}in;display:flex;align-items:center;justify-content:center}}
</style></head><body><div class="art">{body}</div></body></html>"""


def mark_art(light_bg):
    return page(mark(1.5, NAVY if light_bg else "#FFFFFF"), 1.7, 1.45)


PIECES = {
    "cap-white-on-dark": (lambda: page(lockup(False), ART_W_IN, ART_H_IN), ART_W_IN, ART_H_IN),
    "cap-navy-on-light": (lambda: page(lockup(True), ART_W_IN, ART_H_IN), ART_W_IN, ART_H_IN),
    "cap-mark-white": (lambda: mark_art(False), 1.7, 1.45),
    "cap-mark-navy": (lambda: mark_art(True), 1.7, 1.45),
}


def render(name):
    build, w, h = PIECES[name]
    tmp = tempfile.mkdtemp()
    html = pathlib.Path(tmp) / f"{name}.html"
    html.write_text(build(), encoding="utf-8")
    common = ["--headless=new", "--disable-gpu", "--hide-scrollbars", f"--user-data-dir={tmp}/profile",
              "--allow-file-access-from-files", "--virtual-time-budget=10000",
              "--default-background-color=00000000"]  # keep the PNG background transparent
    png = HERE / f"{name}.png"
    chrome(common + ["--force-device-scale-factor=3.125", f"--window-size={int(w * 96)},{int(h * 96)}",
                     f"--screenshot={png}", html.as_uri()], png)
    pdf = HERE / f"{name}.pdf"
    chrome(common + ["--no-pdf-header-footer", f"--print-to-pdf={pdf}", html.as_uri()], pdf)
    shutil.rmtree(tmp, ignore_errors=True)
    print(png.relative_to(ROOT))


if __name__ == "__main__":
    for n in sys.argv[1:] or PIECES:
        render(n)
