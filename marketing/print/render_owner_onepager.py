"""
Owner one-pager — the leave-behind for landlords.

  owner-one-pager.pdf / .png     US Letter, one page

What we do, the three plans with pricing, the a la carte options, the Founding
Owner offer, and a QR to the free rental analysis. Carries the disclosures a
Florida real estate advertisement needs: the licensed brokerage name (Fla. R.
61J2-10.025), both license numbers, Equal Housing Opportunity, and the pricing
qualifier.

Prices live in PLANS / ALACARTE below and must match src/lib/pricing.ts and the
management agreement.

    python3 marketing/print/render_owner_onepager.py
"""
import pathlib
import shutil
import sys
import tempfile

HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
sys.path.insert(0, str(HERE.parent / "social"))
from render_print import (BROKER_LICENSE, BROKERAGE, BROKERAGE_LICENSE, EMAIL, PHONE,  # noqa: E402
                          QR_CSS, QR_JS, ROOT, URL, chrome)
from render import BASE_CSS, GOLD, GOLD_LT, H_LOGO, MIST, NAVY, SAND, SLATE  # noqa: E402

QR_URL = "https://truenorthpm.co/free-rental-analysis?utm_source=owner_onepager&utm_medium=print"

PLANS = [
    ("Essential", "$99", "/mo", "Reliable rent collection and clear reporting.",
     ["Online rent collection", "Owner statements in your portal", "Maintenance intake and triage",
      "Lease enforcement support", "Annual rent-strategy review"]),
    ("Plus", "$149", "/mo", "Our most popular plan. Adds eyes on the property.",
     ["Everything in Essential", "Periodic inspections", "Priority maintenance coordination",
      "Approval thresholds you set", "Renewals handled for you"]),
    ("Premier", "$229", "/mo", "Full service, with advisory and planning.",
     ["Everything in Plus", "Enhanced inspection cadence", "Rental performance advisory",
      "Capex and renewal planning", "Dedicated point of contact"]),
]

ALACARTE = [
    ("Leasing only", "75% of first month's rent", "Marketing, screening, showings, and lease execution for owners who self-manage. $795 minimum."),
    ("Renewal only", "$299 per renewal", "Market-informed pricing, tenant negotiation, and the paperwork."),
    ("Build your own", "Custom", "Mix services, or price a portfolio of three or more properties."),
]

DOING = [
    ("Lease it", "Market-informed pricing, listing, showings, and a screening process applied the same way to every applicant."),
    ("Run it", "Rent collected online, maintenance triaged and documented with photos and invoices, inspections on a set cadence."),
    ("Report it", "A monthly statement you can actually read, repairs approved by you above a threshold you set, and an answer within one business day."),
]


def plan_cards():
    out = ""
    for i, (name, price, cad, blurb, feats) in enumerate(PLANS):
        feat = "".join(f'<li>{f}</li>' for f in feats)
        featured = i == 1
        tag = '<div class="tag">Most popular</div>' if featured else ""
        cls = "plan feat" if featured else "plan"
        out += (
            f'<div class="{cls}">'
            f'{tag}'
            f'<div class="pname">{name}</div>'
            f'<div class="price">{price}<span>{cad}</span></div>'
            f'<div class="pblurb">{blurb}</div>'
            f'<ul>{feat}</ul></div>'
        )
    return out


def doc():
    doing = "".join(
        f'<div class="do"><div class="dot"></div><div><b>{t}</b> {d}</div></div>' for t, d in DOING
    )
    ala = "".join(
        f'<tr><td class="an">{n}</td><td class="ap">{p}</td><td class="ad">{d}</td></tr>' for n, p, d in ALACARTE
    )
    return f"""<!doctype html><html><head><meta charset="utf-8"><style>{BASE_CSS}{QR_CSS}
@page{{size:8.5in 11in;margin:0}}
html,body{{width:8.5in;height:11in;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}}
.sheet{{position:relative;width:8.5in;height:11in;padding:.5in .6in .42in;display:flex;flex-direction:column;overflow:hidden}}
header{{display:flex;justify-content:space-between;align-items:flex-end}}
.hmeta{{text-align:right;font-size:7pt;line-height:1.5;color:{SLATE}}}
.rule{{height:1.6pt;background:{GOLD};margin:.12in 0 .2in}}
h1{{font-family:'Fraunces',Georgia,serif;font-size:21pt;font-weight:400;color:{NAVY};line-height:1.06;letter-spacing:-.02em}}
h1 em{{color:#A57F37;font-style:italic}}
.lede{{margin-top:.09in;font-size:9pt;line-height:1.45;color:#334155;max-width:7.1in}}
h2{{font-family:'Fraunces',Georgia,serif;font-size:11pt;font-weight:600;color:{NAVY};margin:.14in 0 .07in}}
.do{{display:flex;gap:.09in;align-items:flex-start;font-size:8.6pt;line-height:1.4;color:#334155;margin-bottom:.05in}}
.dot{{flex:none;width:.09in;height:.09in;border-radius:50%;background:{GOLD};margin-top:.055in}}
b{{color:{NAVY};font-weight:600}}
.plans{{display:flex;gap:.16in}}
.plan{{flex:1;border:.7pt solid #D7DEE7;border-radius:.12in;padding:.13in .14in;position:relative}}
.plan.feat{{border:1.4pt solid {GOLD};background:#FDFBF6}}
.tag{{position:absolute;top:-.085in;left:.16in;background:{GOLD};color:#fff;font-size:6.2pt;font-weight:700;
  text-transform:uppercase;letter-spacing:.12em;padding:.02in .07in;border-radius:.03in}}
.pname{{font-family:'Fraunces',Georgia,serif;font-size:12pt;font-weight:600;color:{NAVY}}}
.price{{font-size:19pt;font-weight:700;color:{NAVY};line-height:1.1}}
.price span{{font-size:9pt;font-weight:500;color:{SLATE}}}
.pblurb{{margin-top:.04in;font-size:7.4pt;line-height:1.35;color:{SLATE};min-height:.34in}}
.plan ul{{margin-top:.06in;padding-left:.12in;font-size:7.6pt;line-height:1.45;color:#334155}}
.plan li{{margin-bottom:.015in}}
table.ala{{width:100%;border-collapse:collapse;margin-top:.04in}}
.ala td{{border-top:.5pt solid #E4E9EF;padding:.042in .055in;vertical-align:top;font-size:8pt}}
.an{{width:1.25in;font-weight:600;color:{NAVY}}}
.ap{{width:1.85in;color:#A57F37;font-weight:600}}
.ad{{color:{SLATE}}}
.offer{{margin-top:.15in;background:{NAVY};border-radius:.14in;padding:.15in .2in;color:#fff;display:flex;gap:.24in;align-items:center}}
.offer h3{{font-family:'Fraunces',Georgia,serif;font-size:13pt;font-weight:600;color:#fff}}
.offer .sub{{font-size:7.4pt;color:{MIST};text-transform:uppercase;letter-spacing:.14em;font-weight:600}}
.offer ul{{margin:0;padding-left:.13in;font-size:8.2pt;line-height:1.45;color:#E7EDF5}}
.cta{{margin-top:auto;display:flex;align-items:center;gap:.24in;border-top:.7pt solid #D7DEE7;padding-top:.13in}}
.ctatext{{flex:1}}
.ctah{{font-family:'Fraunces',Georgia,serif;font-size:12.5pt;font-weight:600;color:{NAVY}}}
.ctac{{margin-top:.06in;font-size:10pt;font-weight:600;color:{NAVY}}}
.ctac span{{color:{SLATE};font-weight:500}}
.qrbox{{flex:none;width:.85in;text-align:center}}
.qrcap{{margin-top:.04in;font-size:5.6pt;text-transform:uppercase;letter-spacing:.1em;color:{SLATE};font-weight:600}}
.fine{{margin-top:.1in;font-size:6.2pt;line-height:1.45;color:{SLATE}}}
</style></head><body><div class="sheet">
<header>
  <img src="{H_LOGO}" style="width:2.25in">
  <div class="hmeta">{PHONE}<br>{EMAIL}<br>{URL}</div>
</header>
<div class="rule"></div>

<h1>Your rental, run properly &mdash;<br><em>and priced in the open.</em></h1>
<p class="lede">TrueNorth is a local, broker-owned property management company serving Hernando County. We lease, manage,
and maintain single-family rentals for owners who would rather not field the 9 p.m. phone call &mdash; with flat
pricing you can read on this page, and no management fee while your property sits vacant.</p>

<h2>What we do</h2>
{doing}

<h2>Plans</h2>
<div class="plans">{plan_cards()}</div>

<h2>Or pay only for what you need</h2>
<table class="ala">{ala}</table>

<div class="offer">
  <div style="flex:none;max-width:2.1in">
    <div class="sub">Founding owner offer</div>
    <h3>First 20 owners</h3>
  </div>
  <ul>
    <li>No setup fee</li>
    <li>No leasing fee if a tenant is already in place</li>
    <li>Cancel within 90 days, no termination fee, for any reason</li>
  </ul>
</div>

<div class="cta">
  <div class="ctatext">
    <div class="ctah">Find out what your home rents for. Free.</div>
    <div class="ctac">{PHONE} <span>&nbsp;·&nbsp; {EMAIL} &nbsp;·&nbsp; {URL}</span></div>
  </div>
  <div class="qrbox"><div class="qr" data-url="{QR_URL}"></div>
    <div class="qrcap">Scan for a free<br>rental analysis</div></div>
</div>

<p class="fine">{BROKERAGE} · Florida licensed real estate brokerage, License {BROKERAGE_LICENSE} · Broker: Alfredo Mirt,
Licensed Real Estate Broker, License {BROKER_LICENSE} · Equal Housing Opportunity. Pricing shown is a starting rate and
depends on property type, location, condition, and scope of service; final pricing and all services are set by a signed
management agreement. The rental analysis is a market-informed estimate, not an appraisal. Not legal, tax, or investment
advice.</p>
</div>{QR_JS}</body></html>"""


def render():
    name = "owner-one-pager"
    tmp = tempfile.mkdtemp()
    html = pathlib.Path(tmp) / f"{name}.html"
    html.write_text(doc(), encoding="utf-8")
    common = ["--headless=new", "--disable-gpu", "--hide-scrollbars", f"--user-data-dir={tmp}/profile",
              "--allow-file-access-from-files", "--virtual-time-budget=12000"]
    pdf = HERE / f"{name}.pdf"
    chrome(common + ["--no-pdf-header-footer", f"--print-to-pdf={pdf}", html.as_uri()], pdf)
    png = HERE / f"{name}.png"
    chrome(common + ["--force-device-scale-factor=1.6", "--window-size=816,1056", f"--screenshot={png}", html.as_uri()], png)
    shutil.rmtree(tmp, ignore_errors=True)
    print(pdf.relative_to(ROOT))


if __name__ == "__main__":
    render()
