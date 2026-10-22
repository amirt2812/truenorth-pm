"""
Vehicle door decal / magnet, sized to a 24" x 18" template.

  vehicle-decal-24x18-navy.pdf / .png    white logo on navy
  vehicle-decal-24x18-white.pdf / .png   navy logo on white (for a dark vehicle)

Finished size is exactly 24 x 18 inches, which is the standard large car-magnet
template. Nothing important sits within 1" of the edge, so a rounded-corner cut
or a magnet backing never clips copy. Vehicle signage is advertising under
Fla. R. 61J2-10.025, so the licensed brokerage name stays on the art.

Legibility: the phone number prints about 2.8" tall, which reads from roughly 28
feet. The web address prints about 1.7" tall. Both are locked to one line.

    python3 marketing/vehicle/render_decal.py
"""
import pathlib
import shutil
import sys
import tempfile

HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent / "print"))
sys.path.insert(0, str(HERE.parent / "social"))
from render_print import BROKERAGE, BROKERAGE_LICENSE, PHONE, ROOT, URL, chrome  # noqa: E402
from render import BASE_CSS, GOLD, GOLD_LT, H_LOGO, MIST, NAVY  # noqa: E402

W_IN, H_IN = 24, 18
SAFE_IN = 1.0


def decal(dark):
    bg = NAVY if dark else "#FFFFFF"
    logo_class = "white" if dark else ""
    phone_color = "#FFFFFF" if dark else NAVY
    url_color = GOLD_LT if dark else "#A57F37"
    legal_color = MIST if dark else "#52627A"
    grid = '<div class="grid"></div>' if dark else ""
    return f"""<!doctype html><html><head><meta charset="utf-8"><style>{BASE_CSS}
@page{{size:{W_IN}in {H_IN}in;margin:0}}
html,body{{width:{W_IN}in;height:{H_IN}in;background:{bg};-webkit-print-color-adjust:exact;print-color-adjust:exact}}
.art{{position:relative;width:{W_IN}in;height:{H_IN}in;overflow:hidden;display:flex;flex-direction:column;
  align-items:center;justify-content:center;text-align:center;padding:{SAFE_IN}in}}
.ring{{position:absolute;right:-3in;top:50%;transform:translateY(-50%);width:16in;height:16in;border-radius:50%;
  border:.09in solid {GOLD};opacity:{.22 if dark else .3}}}
.ring2{{position:absolute;right:-1.2in;top:50%;transform:translateY(-50%);width:11.5in;height:11.5in;border-radius:50%;
  border:.045in dashed {GOLD};opacity:{.16 if dark else .22}}}
</style></head><body><div class="art">
  {grid}
  <div class="ring"></div><div class="ring2"></div>
  <img class="{logo_class}" src="{H_LOGO}" style="position:relative;width:18in">
  <div style="position:relative;margin-top:.7in;width:6in;height:.09in;background:{GOLD}"></div>
  <div style="position:relative;margin-top:.75in;color:{phone_color};font-size:200pt;font-weight:700;
    letter-spacing:-.015em;line-height:1;white-space:nowrap">{PHONE}</div>
  <div style="position:relative;margin-top:.38in;color:{url_color};font-size:140pt;font-weight:600;line-height:1;
    white-space:nowrap">{URL}</div>
  <div class="caps" style="position:relative;margin-top:.62in;color:{legal_color};font-size:30pt;letter-spacing:.22em">
    Hernando County, Florida</div>
  <div style="position:relative;margin-top:.26in;color:{legal_color};font-size:26pt">{BROKERAGE} · {BROKERAGE_LICENSE}</div>
</div></body></html>"""


PIECES = {"vehicle-decal-24x18-navy": True, "vehicle-decal-24x18-white": False}


def render(name, dark):
    tmp = tempfile.mkdtemp()
    html = pathlib.Path(tmp) / f"{name}.html"
    html.write_text(decal(dark), encoding="utf-8")
    common = ["--headless=new", "--disable-gpu", "--hide-scrollbars", f"--user-data-dir={tmp}/profile",
              "--allow-file-access-from-files", "--virtual-time-budget=10000"]
    pdf = HERE / f"{name}.pdf"
    chrome(common + ["--no-pdf-header-footer", f"--print-to-pdf={pdf}", html.as_uri()], pdf)
    png = HERE / f"{name}.png"
    chrome(common + ["--force-device-scale-factor=0.5", f"--window-size={W_IN * 96},{H_IN * 96}",
                     f"--screenshot={png}", html.as_uri()], png)
    shutil.rmtree(tmp, ignore_errors=True)
    print(pdf.relative_to(ROOT))


if __name__ == "__main__":
    for n in sys.argv[1:] or PIECES:
        render(n, PIECES[n])
