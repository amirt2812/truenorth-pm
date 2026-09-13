"""
Brokerage office entrance sign, as a print-ready decal (Fla. Stat. s. 475.22).

Florida requires a sign on or about the office entrance, easily read by anyone
about to enter, showing the firm or trade name, at least one broker's name, and
the words "Licensed Real Estate Broker". Two colorways, same layout:

  office-sign-navy.pdf / .png    white logo on navy (best on a door or glass)
  office-sign-white.pdf / .png   navy logo on white

Finished size 12" x 8". Each file includes 0.125" bleed on every side
(12.25" x 8.25"); the sign shop cuts at the trim. All copy sits well inside a
0.5" safe area. PDFs are vector text; PNGs are previews.

    python3 marketing/print/render_sign.py
"""
import pathlib
import sys
import tempfile

HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from render_print import BROKERAGE, ROOT, chrome  # noqa: E402  (also puts marketing/social on the path)
from render import BASE_CSS, GOLD, GOLD_LT, H_LOGO, MIST, NAVY, SLATE  # noqa: E402

BROKER = "Alfredo Mirt"
LEGAL_NAME, TRADE_NAME = BROKERAGE.split(" d/b/a ")
W_IN, H_IN = 12.25, 8.25  # 12" x 8" finished + 0.125" bleed each side


def sign(dark):
    bg, ink, sub, accent = (NAVY, "#FFFFFF", MIST, GOLD_LT) if dark else ("#FFFFFF", NAVY, SLATE, "#A57F37")
    return f"""<!doctype html><html><head><meta charset="utf-8"><style>{BASE_CSS}
@page{{size:{W_IN}in {H_IN}in;margin:0}}
html,body{{width:{W_IN}in;height:{H_IN}in;background:{bg};-webkit-print-color-adjust:exact;print-color-adjust:exact}}
.sheet{{position:relative;width:{W_IN}in;height:{H_IN}in;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}}
.frame{{position:absolute;inset:.55in;border:1.5pt solid {GOLD};border-radius:.12in;opacity:{.75 if dark else 1}}}
</style></head><body><div class="sheet">
  <div class="frame"></div>
  <img class="{"white" if dark else ""}" src="{H_LOGO}" style="width:6.4in">
  <div style="margin-top:.34in;width:1.1in;height:2pt;background:{GOLD}"></div>
  <div class="serif" style="margin-top:.3in;color:{ink};font-size:36pt;line-height:1.1;font-weight:500;letter-spacing:-.01em">{LEGAL_NAME}</div>
  <div style="margin-top:.08in;color:{sub};font-size:20pt;font-weight:500">d/b/a {TRADE_NAME}</div>
  <div class="serif" style="margin-top:.44in;color:{ink};font-size:30pt;line-height:1.1;font-weight:500">{BROKER}</div>
  <div class="caps" style="margin-top:.08in;color:{accent};font-size:18pt;letter-spacing:.2em">Licensed Real Estate Broker</div>
</div></body></html>"""


PIECES = {"office-sign-navy": True, "office-sign-white": False}


def render(name, dark):
    with tempfile.TemporaryDirectory() as tmp:
        html = pathlib.Path(tmp) / f"{name}.html"
        html.write_text(sign(dark), encoding="utf-8")
        common = ["--headless=new", "--disable-gpu", "--hide-scrollbars", f"--user-data-dir={tmp}/profile",
                  "--allow-file-access-from-files", "--virtual-time-budget=10000"]
        png = HERE / f"{name}.png"
        chrome(common + ["--force-device-scale-factor=2", f"--window-size={int(W_IN * 96)},{int(H_IN * 96)}",
                         f"--screenshot={png}", html.as_uri()], png)
        pdf = HERE / f"{name}.pdf"
        chrome(common + ["--no-pdf-header-footer", f"--print-to-pdf={pdf}", html.as_uri()], pdf)
        print(png.relative_to(ROOT))
        print(pdf.relative_to(ROOT))


if __name__ == "__main__":
    for n in sys.argv[1:] or PIECES:
        render(n, PIECES[n])
