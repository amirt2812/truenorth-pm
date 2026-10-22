"""
Business cards. Front is the logo alone; back carries every detail Florida
advertising rules expect on a licensee's card (Fla. R. 61J2-10.025): the
licensed brokerage name, the broker's name, and how to reach the office.

  business-card-front.pdf / .png   white logo on navy
  business-card-back.pdf / .png    details on white

Finished size 3.5" x 2" (US standard). Each file includes 0.125" bleed on every
side (3.75" x 2.25"); copy stays inside a 0.2" safe margin from the trim.

    python3 marketing/print/render_cards.py
"""
import pathlib
import sys
import tempfile

HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from render_print import (BROKERAGE, BROKER_LICENSE, BROKERAGE_LICENSE, EMAIL, PHONE, QR_CSS, QR_JS,  # noqa: E402
                          ROOT, URL, chrome)
from render import BASE_CSS, GOLD, GOLD_LT, H_LOGO, MIST, NAVY, SLATE, compass  # noqa: E402

BROKER, BROKER_TITLE = "Alfredo Mirt", "Founder &amp; Broker"
# Tagged so scans show up as their own source in analytics.
CARD_QR_URL = "https://truenorthpm.co/?utm_source=business_card&utm_medium=print"
ADDRESS = "7629 Odessa Ct · Brooksville, FL 34613"
W_IN, H_IN = 3.75, 2.25  # 3.5" x 2" finished + 0.125" bleed each side
W_PX, H_PX = int(W_IN * 96), int(H_IN * 96)


def shell(body, bg):
    return f"""<!doctype html><html><head><meta charset="utf-8"><style>{BASE_CSS}{QR_CSS}
@page{{size:{W_IN}in {H_IN}in;margin:0}}
html,body{{width:{W_IN}in;height:{H_IN}in;background:{bg};-webkit-print-color-adjust:exact;print-color-adjust:exact}}
.card{{position:relative;width:{W_IN}in;height:{H_IN}in;overflow:hidden}}
</style></head><body><div class="card">{body}</div></body></html>"""


def front():
    body = (
        compass(W_PX / 2, H_PX / 2, 86, GOLD, 0.32, 1.4, label=False)
        + f'<div class="abs" style="inset:0;display:flex;align-items:center;justify-content:center">'
        f'<img class="white" src="{H_LOGO}" style="width:2.45in"></div>'
    )
    return shell(body, NAVY)


def back():
    rows = [("phone", PHONE), ("email", EMAIL), ("web", URL), ("office", ADDRESS)]
    contact = "".join(
        f'<div style="display:flex;gap:.06in;align-items:baseline">'
        f'<span class="caps" style="flex:none;width:.36in;color:{GOLD};font-size:4.4pt">{label}</span>'
        f'<span style="color:{NAVY};font-size:6.8pt;line-height:1.3">{value}</span></div>'
        for label, value in rows
    )
    body = (
        f'<div class="abs" style="left:0;top:0;bottom:0;width:.07in;background:{NAVY}"></div>'
        f'<div class="abs" style="left:.32in;right:.32in;top:.3in;bottom:.3in;display:flex;flex-direction:column">'
        f'<div style="display:flex;gap:.16in;align-items:flex-start">'
        f'<div style="flex:1">'
        f'<div class="serif" style="color:{NAVY};font-size:13pt;font-weight:600;line-height:1.1">{BROKER}</div>'
        f'<div class="caps" style="margin-top:.035in;color:#A57F37;font-size:5.4pt;letter-spacing:.17em">{BROKER_TITLE}</div>'
        f'<div style="margin-top:.1in;width:.62in;height:1.3pt;background:{GOLD}"></div>'
        f'<div style="margin-top:.11in;display:flex;flex-direction:column;gap:.045in">{contact}</div>'
        f'</div>'
        f'<div style="flex:none;width:.78in;text-align:center">'
        f'<div class="qr" data-url="{CARD_QR_URL}"></div>'
        f'<div class="caps" style="margin-top:.035in;color:{SLATE};font-size:4.2pt;letter-spacing:.08em">Scan for rentals<br>&amp; free rent analysis</div>'
        f'</div></div>'
        f'<div style="margin-top:auto;color:{SLATE};font-size:5.2pt;line-height:1.5">'
        f'{BROKERAGE}<br>Licensed Real Estate Broker · {BROKERAGE_LICENSE} · {BROKER_LICENSE} · Equal Housing Opportunity</div>'
        f"</div>"
    )
    return shell(body + QR_JS, "#FFFFFF")


PIECES = {"business-card-front": front, "business-card-back": back}


def render(name):
    with tempfile.TemporaryDirectory() as tmp:
        html = pathlib.Path(tmp) / f"{name}.html"
        html.write_text(PIECES[name](), encoding="utf-8")
        common = ["--headless=new", "--disable-gpu", "--hide-scrollbars", f"--user-data-dir={tmp}/profile",
                  "--allow-file-access-from-files", "--virtual-time-budget=10000"]
        png = HERE / f"{name}.png"
        chrome(common + ["--force-device-scale-factor=4", f"--window-size={W_PX},{H_PX}",
                         f"--screenshot={png}", html.as_uri()], png)
        pdf = HERE / f"{name}.pdf"
        chrome(common + ["--no-pdf-header-footer", f"--print-to-pdf={pdf}", html.as_uri()], pdf)
        print(png.relative_to(ROOT))
        print(pdf.relative_to(ROOT))


if __name__ == "__main__":
    for n in sys.argv[1:] or PIECES:
        render(n)
