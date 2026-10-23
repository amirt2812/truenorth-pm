"""
Agent recruiting pieces built around the short link.

  apply-qr.png / .pdf              Plain QR to truenorthpm.co/apply, 2in square
  agent-recruiting-card.pdf / .png 4x6 handout for broker opens and events

The QR points at truenorthpm.co/apply, never at the DocuSign URL directly, so a
reprinted PowerForm never invalidates printed material.

    python3 marketing/print/render_recruiting.py
"""
import pathlib
import shutil
import sys
import tempfile

HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
sys.path.insert(0, str(HERE.parent / "social"))
from render_print import (BROKERAGE, BROKERAGE_LICENSE, EMAIL, PHONE, QR_CSS, QR_JS,  # noqa: E402
                          ROOT, chrome)
from render import BASE_CSS, GOLD, GOLD_LT, H_LOGO, MIST, NAVY  # noqa: E402

APPLY_URL = "https://truenorthpm.co/apply"
SALES_BRAND = "TrueNorth Brokerage Group"


def page(w_in, h_in, bg, body):
    return f"""<!doctype html><html><head><meta charset="utf-8"><style>{BASE_CSS}{QR_CSS}
@page{{size:{w_in}in {h_in}in;margin:0}}
html,body{{width:{w_in}in;height:{h_in}in;background:{bg};-webkit-print-color-adjust:exact;print-color-adjust:exact}}
.art{{position:relative;width:{w_in}in;height:{h_in}in;overflow:hidden}}
</style></head><body><div class="art">{body}</div>{QR_JS}</body></html>"""


def qr_only():
    body = (f'<div style="position:absolute;inset:.2in"><div class="qr" data-url="{APPLY_URL}"></div></div>')
    return page(2.4, 2.4, "#FFFFFF", body)


def card():
    bullets = [
        ("100%", "commission to you. No split, no cap."),
        ("$399", "per closed transaction"),
        ("$29", "a month, flat. No desk fee, no franchise fee."),
    ]
    rows = "".join(
        f'<div style="display:flex;gap:.14in;align-items:baseline;margin-bottom:.075in">'
        f'<span style="flex:none;width:.78in;text-align:right;font-size:17pt;font-weight:700;color:{GOLD_LT}">{a}</span>'
        f'<span style="font-size:9pt;line-height:1.3;color:#E7EDF5">{b}</span></div>'
        for a, b in bullets
    )
    body = (
        '<div class="grid"></div>'
        f'<div style="position:absolute;inset:.36in;display:flex;flex-direction:column">'
        f'<img class="white" src="{H_LOGO}" style="width:2.5in">'
        f'<div class="caps" style="margin-top:.1in;color:{GOLD};font-size:7.5pt;letter-spacing:.2em">{SALES_BRAND}</div>'
        f'<div class="serif" style="margin-top:.2in;color:#fff;font-size:23pt;line-height:1.06;font-weight:500;letter-spacing:-.01em">'
        f'Keep your<br>whole commission.</div>'
        f'<div style="margin-top:.22in">{rows}</div>'
        f'<div style="margin-top:auto;display:flex;align-items:flex-end;justify-content:space-between;gap:.2in">'
        f'<div><div style="color:#fff;font-size:11pt;font-weight:600">Scan to open the agent packet</div>'
        f'<div style="margin-top:.05in;color:{GOLD_LT};font-size:12pt;font-weight:700">truenorthpm.co/apply</div>'
        f'<div style="margin-top:.1in;color:{MIST};font-size:8pt;line-height:1.45">{PHONE} · {EMAIL}</div></div>'
        f'<div style="flex:none;width:1.12in;background:#fff;border-radius:.08in;padding:.06in">'
        f'<div class="qr" data-url="{APPLY_URL}"></div></div></div>'
        f'<div style="margin-top:.12in;color:{MIST};font-size:5.6pt;line-height:1.45">{BROKERAGE} · '
        f'Florida licensed real estate brokerage, License {BROKERAGE_LICENSE} · Equal Housing Opportunity</div>'
        f"</div>"
    )
    return page(4, 6, NAVY, body)


PIECES = {"apply-qr": (qr_only, 2.4, 2.4), "agent-recruiting-card": (card, 4, 6)}


def render(name):
    build, w, h = PIECES[name]
    tmp = tempfile.mkdtemp()
    html = pathlib.Path(tmp) / f"{name}.html"
    html.write_text(build(), encoding="utf-8")
    common = ["--headless=new", "--disable-gpu", "--hide-scrollbars", f"--user-data-dir={tmp}/profile",
              "--allow-file-access-from-files", "--virtual-time-budget=11000"]
    png = HERE / f"{name}.png"
    chrome(common + ["--force-device-scale-factor=4", f"--window-size={int(w * 96)},{int(h * 96)}",
                     f"--screenshot={png}", html.as_uri()], png)
    pdf = HERE / f"{name}.pdf"
    chrome(common + ["--no-pdf-header-footer", f"--print-to-pdf={pdf}", html.as_uri()], pdf)
    shutil.rmtree(tmp, ignore_errors=True)
    print(png.relative_to(ROOT))


if __name__ == "__main__":
    for n in sys.argv[1:] or PIECES:
        render(n)
