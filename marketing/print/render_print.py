"""
Renders TrueNorth print pieces with headless Chrome (same brand system as
marketing/social/render.py):

  postcard-front.png / postcard-back.png   9" x 6" postcard + 0.125" bleed, 300 dpi (2775 x 1875)
  agent-one-pager.pdf / .png               US Letter, vector PDF for printing + PNG preview

    python3 marketing/print/render_print.py            # all pieces
    python3 marketing/print/render_print.py postcard-back

Postcard back: the right half is left blank on purpose — the mail house prints
the recipient address, barcode, and postage indicia there. Keep it clear.
"""
import pathlib
import subprocess
import sys
import tempfile
import time

HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent / "social"))
from render import (  # noqa: E402
    BASE_CSS, CHROME, COORDS, GOLD, GOLD_LT, H_LOGO, MIST, NAVY, SAND, SLATE, compass, page,
)

ROOT = HERE.parents[1]
PHONE = "(727) 815-5245"
BROKERAGE = "TrueNorth Brokerage Group LLC d/b/a TrueNorth Property Management"  # Fla. R. 61J2-10.025 — licensed name, required on all advertising
RETURN_ADDRESS = "7629 Odessa Ct · Brooksville, FL 34613"
QR_JS = (
    '<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js"></script>'
    "<script>document.querySelectorAll('.qr').forEach(function(el){var q=qrcode(0,'M');q.addData(el.dataset.url);q.make();"
    "el.innerHTML=q.createSvgTag({cellSize:10,margin:0,scalable:true});});</script>"
)
QR_CSS = ".qr svg{display:block;width:100%;height:auto}"


def diamond(size, color=GOLD):
    return f'<span style="flex:none;width:{size}px;height:{size}px;transform:rotate(45deg);background:{color};margin-top:.45em"></span>'


# ── Postcard (2775 x 1875 px = 9.25" x 6.25" at 300 dpi; trim 0.125" = 38 px) ─
def postcard_front():
    body = (
        '<div class="grid" style="background-size:auto"></div>'
        + compass(2330, 380, 720, GOLD, 0.22)
        + f'<div class="abs caps" style="left:160px;top:170px;color:{GOLD_LT};font-size:44px">For Hernando County homeowners</div>'
        f'<h1 class="abs serif" style="left:160px;top:270px;width:1640px;color:#fff;font-size:178px;line-height:1.02;font-weight:400;letter-spacing:-.025em">'
        f'What would your home <em style="color:{GOLD_LT}">rent for</em> today?</h1>'
        f'<p class="abs" style="left:160px;top:960px;width:1560px;color:#C9D5E4;font-size:56px;line-height:1.42">'
        f"A free, no-obligation rental analysis from a local property manager: an estimated rent range, rent-readiness notes, and a clear recommendation.</p>"
        f'<img class="abs white" src="{H_LOGO}" style="left:160px;bottom:170px;width:760px">'
        f'<div class="abs" style="right:170px;bottom:170px;width:640px;background:#fff;border-radius:28px;padding:48px 48px 40px;text-align:center">'
        f'<div class="qr" data-url="https://truenorthpm.co/mail"></div>'
        f'<div style="margin-top:30px;color:{SLATE};font-size:34px;font-weight:500">Scan, or visit</div>'
        f'<div style="color:{NAVY};font-size:46px;font-weight:700;letter-spacing:-.01em">truenorthpm.co/mail</div></div>'
        + QR_JS
    )
    return page(2775, 1875, f"<style>{QR_CSS}</style>" + body, NAVY)


def postcard_back():
    items = ["Plans from $99/month", "Online owner portal and monthly statements", "A reply within one business day, every time"]
    li = "".join(f'<li style="display:flex;gap:26px">{diamond(20)}<span>{t}</span></li>' for t in items)
    left = (
        f'<div class="abs" style="left:160px;top:160px;bottom:150px;width:1260px;display:flex;flex-direction:column;justify-content:space-between">'
        f'<div class="caps" style="color:{GOLD};font-size:36px">A note from the founder</div>'
        f'<div class="serif" style="color:{NAVY};font-size:96px;line-height:1;font-weight:500;letter-spacing:-.02em;margin-top:-8px">Hello from Hernando County,</div>'
        f'<p style="color:#334155;font-size:44px;line-height:1.46">I’m Alfredo Mirt, a local real estate investor and the founder of TrueNorth Property Management. '
        f"I started TrueNorth because owners here deserve clear pricing, fast answers, and a manager who actually picks up the phone.</p>"
        f'<ul style="list-style:none;display:flex;flex-direction:column;gap:18px;color:{NAVY};font-size:42px;font-weight:600">{li}</ul>'
        f'<div style="border:3px solid {GOLD};border-radius:20px;padding:30px 36px;color:{NAVY};font-size:34px;line-height:1.45">'
        f'<b>Founding owner terms, first 20 owners:</b> no setup fee · no leasing fee on a tenant already in place · cancel in your first 90 days with no termination fee.</div>'
        f'<div style="display:flex;align-items:flex-end;gap:40px">'
        f'<div style="width:230px;flex:none" class="qr" data-url="https://truenorthpm.co/mail"></div>'
        f'<div><div style="color:{NAVY};font-size:50px;font-weight:700">{PHONE}</div>'
        f'<div style="color:{NAVY};font-size:44px;font-weight:600">truenorthpm.co/mail</div>'
        f'<p style="margin-top:18px;color:{SLATE};font-size:22px;line-height:1.45">{BROKERAGE} · Equal Housing Opportunity. The rental analysis is a market-informed estimate, not an appraisal. '
        f"If your property is currently listed for sale or under a management agreement, please disregard this notice.</p></div></div></div>"
    )
    right = (
        f'<div class="abs" style="left:1500px;top:160px;bottom:160px;width:3px;background:#E4DCCB"></div>'
        f'<div class="abs" style="left:1590px;top:160px;color:{NAVY};font-size:30px;line-height:1.4">'
        f'<img src="{H_LOGO}" style="width:500px;display:block;margin-bottom:18px">{RETURN_ADDRESS}</div>'
    )
    return page(2775, 1875, f"<style>{QR_CSS}</style>" + left + right + QR_JS, "#FFFFFF")


# ── Agent one-pager (US Letter; authored in CSS inches) ───────────────────────
def one_pager():
    cards = [
        ("Your client stays yours", "We focus on management, not sales. When a client you referred is ready to buy or sell, we send them back to you."),
        ("Expired listing? Compare renting.", "For sellers who can’t get their price, we deliver a free rental analysis within one business day so they can weigh renting against a price cut."),
        ("Investor buyers get numbers early", "Send any address before your buyer writes an offer. We’ll return a market-informed rent range to support the deal."),
    ]
    card_html = "".join(
        f'<div style="border-top:2.5pt solid {GOLD};padding-top:.14in"><h3 class="serif" style="font-size:14pt;line-height:1.15;font-weight:500;color:{NAVY}">{t}</h3>'
        f'<p style="margin-top:.08in;font-size:9.6pt;line-height:1.5;color:#334155">{b}</p></div>'
        for t, b in cards
    )
    steps = [
        "Text or email the property address and your client’s name.",
        "We deliver a rental analysis within one business day.",
        "Your client decides, and you stay in the loop.",
    ]
    step_html = "".join(
        f'<div style="display:flex;gap:.12in;align-items:flex-start"><span style="flex:none;width:.3in;height:.3in;border-radius:50%;background:{NAVY};color:#fff;'
        f'font-weight:700;font-size:10pt;display:flex;align-items:center;justify-content:center">{i}</span>'
        f'<span style="font-size:10pt;line-height:1.45;color:{NAVY};padding-top:.04in">{s}</span></div>'
        for i, s in enumerate(steps, 1)
    )
    html = f"""<!doctype html><html><head><meta charset="utf-8"><style>{BASE_CSS}{QR_CSS}
@page{{size:8.5in 11in;margin:0}}
html,body{{width:8.5in;height:11in;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}}
.sheet{{position:relative;width:8.5in;height:11in;padding:.62in .7in .5in;display:flex;flex-direction:column;overflow:hidden}}
</style></head><body><div class="sheet">
  <div style="display:flex;justify-content:space-between;align-items:center">
    <img src="{H_LOGO}" style="width:2.7in">
    <div class="caps" style="color:{GOLD};font-size:8.5pt">For real estate agents</div>
  </div>
  <h1 class="serif" style="margin-top:.55in;font-size:34pt;line-height:1.04;font-weight:400;letter-spacing:-.02em;color:{NAVY}">
    Keep your clients.<br>We’ll <em style="color:#A57F37">manage their rentals.</em></h1>
  <p style="margin-top:.22in;max-width:6.2in;font-size:12pt;line-height:1.55;color:#334155">
    When a buyer closes on an investment property, a listing expires, or a seller decides to rent instead of sell,
    refer them to TrueNorth. We manage the home locally across Hernando County, and your relationship with the client stays intact.</p>
  <div style="margin-top:.45in;display:grid;grid-template-columns:repeat(3,1fr);gap:.28in">{card_html}</div>
  <div style="margin-top:.5in;background:{SAND};border-radius:.14in;padding:.28in .32in">
    <div class="caps" style="color:#80622B;font-size:8pt">How a referral works</div>
    <div style="margin-top:.16in;display:grid;grid-template-columns:repeat(3,1fr);gap:.24in">{step_html}</div>
  </div>
  <div style="margin-top:auto;background:{NAVY};border-radius:.14in;padding:.3in .34in;display:flex;align-items:center;justify-content:space-between;gap:.3in">
    <div style="color:#fff">
      <div class="serif" style="font-size:17pt;font-weight:500">Alfredo Mirt, Founder &amp; Broker</div>
      <div style="margin-top:.06in;font-size:11pt;color:{GOLD_LT};font-weight:600">{PHONE} · alfredo@truenorthpm.co</div>
      <div style="margin-top:.04in;font-size:9.5pt;color:{MIST}">Spring Hill · Brooksville · Weeki Wachee · Hernando Beach · Timber Pines</div>
    </div>
    <div style="flex:none;background:#fff;border-radius:.08in;padding:.09in;width:1.05in">
      <div class="qr" data-url="https://truenorthpm.co/agents"></div>
    </div>
  </div>
  <p style="margin-top:.16in;font-size:7.5pt;line-height:1.45;color:{SLATE}">{BROKERAGE} · Equal Housing Opportunity · Any referral arrangement complies with Florida real estate law.
    truenorthpm.co/agents</p>
</div>{QR_JS}</body></html>"""
    return html


PIECES = {
    "postcard-front": dict(w=2775, h=1875, build=postcard_front),
    "postcard-back": dict(w=2775, h=1875, build=postcard_back),
    "agent-one-pager": dict(w=816, h=1056, build=one_pager, pdf=True, preview_scale=1.5625),  # PNG preview 1275 x 1650
}


def chrome(args, out):
    """Headless Chrome on macOS can hang after writing — stop it once the file is written and stable."""
    out.unlink(missing_ok=True)
    proc = subprocess.Popen([CHROME, *args], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    deadline, last = time.time() + 90, -1
    while time.time() < deadline:
        if out.exists():
            size = out.stat().st_size
            if size and size == last:
                break
            last = size
        if proc.poll() is not None and out.exists():
            break
        time.sleep(0.5)
    if proc.poll() is None:
        proc.kill()
        proc.wait()
    if not out.exists():
        sys.exit(f"Chrome produced no {out.name}")


def render(name):
    spec = PIECES[name]
    with tempfile.TemporaryDirectory() as tmp:
        html = pathlib.Path(tmp) / f"{name}.html"
        html.write_text(spec["build"](), encoding="utf-8")
        common = ["--headless=new", "--disable-gpu", "--hide-scrollbars", f"--user-data-dir={tmp}/profile",
                  "--allow-file-access-from-files", "--virtual-time-budget=10000"]
        png = HERE / f"{name}.png"
        scale = spec.get("preview_scale", 1)
        chrome(common + [f"--force-device-scale-factor={scale}", f"--window-size={spec['w']},{spec['h']}",
                         f"--screenshot={png}", html.as_uri()], png)
        print(f"{png.relative_to(ROOT)}")
        if spec.get("pdf"):
            pdf = HERE / f"{name}.pdf"
            chrome(common + ["--no-pdf-header-footer", f"--print-to-pdf={pdf}", html.as_uri()], pdf)
            print(f"{pdf.relative_to(ROOT)}")


if __name__ == "__main__":
    for n in sys.argv[1:] or PIECES:
        render(n)
