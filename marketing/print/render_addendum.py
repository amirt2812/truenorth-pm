"""
Founding Owner Offer Addendum — attaches to the Property Management Agreement.

  founding-owner-addendum.pdf / .png

One page on letterhead, US Letter, built for e-signature the same way as the
agreement: ruled blanks and square checkboxes. Offer terms live in OFFER below.

    python3 marketing/print/render_addendum.py
"""
import pathlib
import shutil
import sys
import tempfile

HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from render_print import BROKER_LICENSE, BROKERAGE, BROKERAGE_LICENSE, EMAIL, PHONE, ROOT, URL, chrome  # noqa: E402
from render_agreement import BROKER, LEGAL_NAME, OFFICE, TRADE_NAME, box, cb  # noqa: E402
from render import BASE_CSS, GOLD, NAVY, SAND, SLATE  # noqa: E402

OFFER = {"spots": 20, "cancel_days": 90}

TERMS_LIST = [
    ("No setup fee",
     "The onboarding and account setup fee is waived for every property covered by the Agreement."),
    ("No leasing fee on a tenant already in place",
     "If a tenant is occupying the property on the start date, TrueNorth charges no tenant placement fee for that "
     "tenancy. The normal leasing fee applies to any new tenant TrueNorth places later."),
    (f"{OFFER['cancel_days']}-day cancellation, no penalty",
     f"Owner may cancel the Agreement for any reason within {OFFER['cancel_days']} days of the start date by giving "
     "written notice, with no termination fee and no notice period. Leasing fees already earned for a tenant TrueNorth "
     "placed are not refunded, and Owner remains responsible for vendor invoices for work already performed."),
]


def rows():
    return "".join(
        f'<tr><td style="width:.3in">{cb()}</td><td style="width:2.35in"><b>{t}</b></td><td>{d}</td></tr>'
        for t, d in TERMS_LIST
    )


def document():
    return f"""<!doctype html><html><head><meta charset="utf-8"><style>{BASE_CSS}
@page{{size:8.5in 11in;margin:0}}
html,body{{width:8.5in;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact;overflow:visible}}
body{{color:#1F2937;font-size:8.4pt;line-height:1.46}}
.sheet{{position:relative;width:8.5in;height:11in;padding:.5in .6in .55in;display:flex;flex-direction:column;overflow:hidden}}
header{{display:flex;justify-content:space-between;align-items:flex-start;gap:.3in}}
.hmeta{{text-align:right;font-size:6.6pt;line-height:1.5;color:{SLATE}}}
.rule{{height:1.6pt;background:{GOLD};margin:.1in 0 .18in}}
.body{{flex:1}}
h1{{font-family:'Fraunces',Georgia,serif;font-size:19pt;font-weight:500;color:{NAVY};letter-spacing:-.01em;margin-bottom:.08in}}
h2{{font-family:'Fraunces',Georgia,serif;font-size:10.5pt;font-weight:600;color:{NAVY};margin:.13in 0 .05in}}
p{{margin-bottom:.08in}}
.lede{{font-size:9pt;color:#334155}}
.note{{font-size:7.6pt;color:{SLATE}}}
b{{font-weight:600;color:{NAVY}}}
.fill{{display:inline-block;border-bottom:.75pt solid #9CA3AF;height:11pt;vertical-align:-3pt}}
.cb{{display:inline-block;width:9.5pt;height:9.5pt;border:.9pt solid #6B7280;border-radius:1.5pt;vertical-align:-1.5pt}}
table{{width:100%;border-collapse:collapse}}
.tbl td{{border:.5pt solid #D7DEE7;padding:3.6pt 5pt;vertical-align:top}}
.spot{{background:{SAND};border-radius:.1in;padding:.12in .18in;margin:.1in 0 .02in;font-size:8.6pt}}
.form td{{padding:3pt 10pt 8pt 0;vertical-align:top;width:50%;font-size:7.4pt;color:{SLATE}}}
.form td div{{margin-top:1pt}}
footer{{display:flex;justify-content:space-between;align-items:flex-end;border-top:.5pt solid #D7DEE7;
  padding-top:5pt;font-size:6.6pt;color:{SLATE}}}
.sigwrap{{display:flex;gap:.4in;margin-top:.1in}}
.sigcol{{flex:1}}
.sighd{{font-weight:600;color:{NAVY};font-size:8.8pt;margin-bottom:.12in}}
.sigline{{margin-bottom:.11in}}
.sigline span{{display:block;font-size:6.8pt;color:{SLATE};margin-top:2pt}}
</style></head><body><div class="sheet">
<header><img src="{pathlib.Path(ROOT, "public", "logo-horizontal.png").as_uri()}" style="width:1.8in">
<div class="hmeta">{LEGAL_NAME}<br>d/b/a {TRADE_NAME}<br>
Brokerage License {BROKERAGE_LICENSE} · Broker License {BROKER_LICENSE}<br>
{OFFICE}<br>{PHONE} · {EMAIL} · {URL}</div></header>
<div class="rule"></div>
<div class="body">
  <h1>Founding Owner Offer Addendum</h1>
  <p class="lede">This Addendum is part of the Exclusive Property Management Agreement between the Owner named below and
  {LEGAL_NAME} d/b/a {TRADE_NAME}. Where this Addendum and the Agreement differ, this Addendum controls.</p>

  <table class="form">
    <tr><td>Owner name(s)<div>{box("3.1in")}</div></td>
        <td>Agreement start date<div>{box("2.3in")}</div></td></tr>
    <tr><td>Property address<div>{box("3.1in")}</div></td>
        <td>Founding Owner spot number<div>{box(".5in")} of {OFFER["spots"]}</div></td></tr>
  </table>

  <h2>What the Founding Owner offer includes</h2>
  <table class="tbl">{rows()}</table>

  <h2>Conditions</h2>
  <p>This offer is limited to the first {OFFER["spots"]} owners who sign a management agreement with TrueNorth, and
  applies only to the properties covered by that Agreement, including any listed on its Exhibit A. It cannot be combined with another promotion. Every other term of the Agreement stays in force, including the monthly management fee for the
  plan selected, the add-on fees selected, the maintenance coordination markup, and the renewal fee.</p>
  <p>If Owner cancels under the {OFFER["cancel_days"]}-day provision, TrueNorth returns deposits, tenant funds, keys,
  and records within 14 days with a final accounting, exactly as the Agreement requires on termination.</p>

  <p style="margin-top:.12in">Additional founding terms, if any: {box("5.2in")}</p>

  <div class="spot">{cb()} <b>Owner accepts the Founding Owner offer</b> on the terms above, and understands the offer
  ends once all {OFFER["spots"]} spots are claimed.</div>

  <h2>Signatures</h2>
  <div class="sigwrap">
    <div class="sigcol">
      <div class="sighd">Owner</div>
      <div class="sigline">{box("2.9in")}<span>Signature</span></div>
      <div class="sigline">{box("2.9in")}<span>Printed name and title</span></div>
      <div class="sigline">{box("2.9in")}<span>Date</span></div>
    </div>
    <div class="sigcol">
      <div class="sighd">{LEGAL_NAME} d/b/a {TRADE_NAME}</div>
      <div class="sigline">{box("2.9in")}<span>Signature</span></div>
      <div class="sigline">{box("2.9in")}<span>{BROKER}, Licensed Real Estate Broker ({BROKER_LICENSE})</span></div>
      <div class="sigline">{box("2.9in")}<span>Date</span></div>
    </div>
  </div>
</div>
<footer><span>Founding Owner Offer Addendum · {TRADE_NAME}</span>
<span>Owner initials {box(".55in")} &nbsp; Broker initials {box(".55in")}</span>
<span>Page 1 of 1</span></footer>
</div></body></html>"""


def render():
    name = "founding-owner-addendum"
    tmp = tempfile.mkdtemp()
    html = pathlib.Path(tmp) / f"{name}.html"
    html.write_text(document(), encoding="utf-8")
    common = ["--headless=new", "--disable-gpu", "--hide-scrollbars", f"--user-data-dir={tmp}/profile",
              "--allow-file-access-from-files", "--virtual-time-budget=10000"]
    pdf = HERE / f"{name}.pdf"
    chrome(common + ["--no-pdf-header-footer", f"--print-to-pdf={pdf}", html.as_uri()], pdf)
    png = HERE / f"{name}.png"
    chrome(common + ["--force-device-scale-factor=1.6", "--window-size=816,1056", f"--screenshot={png}", html.as_uri()], png)
    shutil.rmtree(tmp, ignore_errors=True)
    print(pdf.relative_to(ROOT))
    print(png.relative_to(ROOT))


if __name__ == "__main__":
    render()
