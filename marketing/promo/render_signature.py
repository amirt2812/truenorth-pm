"""
Email signature assets, hosted at truenorthpm.co/email/.

  signature-logo.png        horizontal lockup, navy, transparent, 360px wide
                            (display at 180px so it stays sharp on retina)
  signature-logo-white.png  same, reversed, for dark backgrounds
  signature-mark.png        house mark only, navy, transparent, 128px
                            (display at 64px) — the compact two-column layout
  signature-mark-white.png  same, reversed

Transparent PNG, no background box, so it sits on whatever the mail client
paints behind it.

    python3 marketing/promo/render_signature.py
"""
import pathlib
import shutil
import sys
import tempfile

HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent / "print"))
sys.path.insert(0, str(HERE.parent / "social"))
from render_print import ROOT, chrome  # noqa: E402
from render import BASE_CSS, H_LOGO, NAVY, S_LOGO  # noqa: E402

MARK = (549, 0, 649, 553, 1747, 1101)  # crop of the stacked logo sheet
PUBLIC = ROOT / "public" / "email"


def mark_html(px, color):
    x, y, w, h, sheet_w, sheet_h = MARK
    s = px / w
    pos = f"{-x * s}px {-y * s}px/{sheet_w * s}px auto"
    return (f'<div style="width:{px}px;height:{h * s:.1f}px;background-color:{color};'
            f"-webkit-mask:url('{S_LOGO}') no-repeat {pos};mask:url('{S_LOGO}') no-repeat {pos}\"></div>")


def logo_html(px, white):
    f = "filter:brightness(0) invert(1);" if white else ""
    return f'<img src="{H_LOGO}" style="width:{px}px;display:block;{f}">'


def page(body, w, h):
    return (f'<!doctype html><html><head><meta charset="utf-8"><style>{BASE_CSS}'
            f"html,body{{width:{w}px;height:{h}px;background:transparent}}"
            f'</style></head><body>{body}</body></html>')


PIECES = {
    "signature-logo": (lambda: page(logo_html(360, False), 360, 93), 360, 93),
    "signature-logo-white": (lambda: page(logo_html(360, True), 360, 93), 360, 93),
    "signature-mark": (lambda: page(mark_html(128, NAVY), 128, 110), 128, 110),
    "signature-mark-white": (lambda: page(mark_html(128, "#FFFFFF"), 128, 110), 128, 110),
}


def render(name):
    build, w, h = PIECES[name]
    tmp = tempfile.mkdtemp()
    html = pathlib.Path(tmp) / f"{name}.html"
    html.write_text(build(), encoding="utf-8")
    PUBLIC.mkdir(parents=True, exist_ok=True)
    out = PUBLIC / f"{name}.png"
    chrome(["--headless=new", "--disable-gpu", "--hide-scrollbars", f"--user-data-dir={tmp}/profile",
            "--allow-file-access-from-files", "--virtual-time-budget=9000",
            "--default-background-color=00000000", "--force-device-scale-factor=1",
            f"--window-size={w},{h}", f"--screenshot={out}", html.as_uri()], out)
    shutil.rmtree(tmp, ignore_errors=True)
    print(out.relative_to(ROOT))


if __name__ == "__main__":
    for n in sys.argv[1:] or PIECES:
        render(n)
