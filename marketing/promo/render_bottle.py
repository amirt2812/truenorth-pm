"""
Water bottle engraving art — 22 oz stainless, laser engraved.

  bottle-engrave-vertical.pdf / .png    stacked mark + wordmark, for the tall
                                        imprint window down the bottle
  bottle-engrave-compact.pdf / .png     mark + wordmark only, no URL, for a
                                        shorter window or a smaller bottle
  bottle-engrave-mark.pdf / .png        the house mark alone, for a lid or the
                                        back of the bottle

Laser engraving burns ONE tone into the steel. There is no color, no gradient,
and no white ink: everything in these files is solid black, which the engraver
reads as "etch here." Art is drawn at actual imprint size.

IMPRINT: set IMPRINT_W_IN / IMPRINT_H_IN to the vendor's stated imprint area
before ordering. The default below is the common window for a 22 oz bottle;
confirm it on the product page or in the vendor's template, then rerun.

    python3 marketing/promo/render_bottle.py
"""
import pathlib
import shutil
import sys
import tempfile

HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent / "print"))
sys.path.insert(0, str(HERE.parent / "social"))
from render_print import ROOT, URL, chrome  # noqa: E402
from render import BASE_CSS, S_LOGO  # noqa: E402

IMPRINT_W_IN, IMPRINT_H_IN = 2.5, 8.0   # vendor imprint window — confirm before ordering
INK = "#000000"                          # engraving art is single-tone; black = etched

# The stacked logo file is mark + wordmark; the mark alone lives at x549-1198, y0-553.
MARK_BOX = (549, 0, 649, 553, 1747, 1101)


def mark(width_in):
    """House mark cropped out of the stacked logo, scaled to width_in inches."""
    x, y, w, h, sheet_w, sheet_h = MARK_BOX
    s = width_in / w
    return (f'<div style="width:{width_in}in;height:{h * s}in;'
            f"background:url('{S_LOGO}') no-repeat {-x * s}in {-y * s}in/{sheet_w * s}in auto;"
            f'filter:brightness(0) saturate(100%)"></div>')


def page(body, w_in, h_in):
    return f"""<!doctype html><html><head><meta charset="utf-8"><style>{BASE_CSS}
@page{{size:{w_in}in {h_in}in;margin:0}}
html,body{{width:{w_in}in;height:{h_in}in;background:#FFFFFF;-webkit-print-color-adjust:exact;print-color-adjust:exact}}
.art{{width:{w_in}in;height:{h_in}in;display:flex;flex-direction:column;align-items:center;justify-content:center;
  text-align:center;color:{INK}}}
.wm{{font-family:'Fraunces',Georgia,serif;font-weight:600;letter-spacing:-.01em;line-height:1}}
.sub{{text-transform:uppercase;font-weight:700;line-height:1.1}}
</style></head><body><div class="art">{body}</div></body></html>"""


def vertical():
    body = (
        mark(2.0)
        + '<div class="wm" style="margin-top:.3in;font-size:30pt">TrueNorth</div>'
        + '<div class="sub" style="margin-top:.11in;font-size:12pt;letter-spacing:.14em">Property<br>Management</div>'
        + f'<div style="margin-top:.26in;width:1.1in;height:.028in;background:{INK}"></div>'
        + f'<div class="sub" style="margin-top:.24in;font-size:10pt;letter-spacing:.1em">{URL}</div>'
    )
    return page(body, IMPRINT_W_IN, IMPRINT_H_IN)


def compact():
    body = (
        mark(1.45)
        + '<div class="wm" style="margin-top:.26in;font-size:32pt">TrueNorth</div>'
        + '<div class="sub" style="margin-top:.1in;font-size:11pt;letter-spacing:.14em">Property Management</div>'
    )
    return page(body, 3.2, 2.4)


def mark_only():
    return page(mark(1.6), 1.8, 1.6)


PIECES = {
    "bottle-engrave-vertical": (vertical, IMPRINT_W_IN, IMPRINT_H_IN),
    "bottle-engrave-compact": (compact, 3.2, 2.4),
    "bottle-engrave-mark": (mark_only, 1.8, 1.6),
}


def render(name):
    build, w, h = PIECES[name]
    tmp = tempfile.mkdtemp()
    html = pathlib.Path(tmp) / f"{name}.html"
    html.write_text(build(), encoding="utf-8")
    common = ["--headless=new", "--disable-gpu", "--hide-scrollbars", f"--user-data-dir={tmp}/profile",
              "--allow-file-access-from-files", "--virtual-time-budget=10000"]
    pdf = HERE / f"{name}.pdf"
    chrome(common + ["--no-pdf-header-footer", f"--print-to-pdf={pdf}", html.as_uri()], pdf)
    png = HERE / f"{name}.png"   # 600 dpi raster for vendors that want pixels
    chrome(common + ["--force-device-scale-factor=6.25", f"--window-size={int(w * 96)},{int(h * 96)}",
                     f"--screenshot={png}", html.as_uri()], png)
    shutil.rmtree(tmp, ignore_errors=True)
    print(pdf.relative_to(ROOT))


if __name__ == "__main__":
    for n in sys.argv[1:] or PIECES:
        render(n)
