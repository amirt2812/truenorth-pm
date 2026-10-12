"""
Lease kit — the paperwork that wraps the Florida Realtors/Florida Bar lease.

TrueNorth uses form RLHD-3x, "Residential Lease for Single Family Home or
Duplex," approved by the Supreme Court of Florida. A licensee may fill in the
blanks on that form; drafting a substitute lease is practicing law. These pieces
make filling it in fast, consistent, and complete:

  lease-data-sheet.pdf        3 pages. Every blank in RLHD-3x, in form order,
                              with TrueNorth's standard answer beside it.
  lease-signing-checklist.pdf 1 page. What goes in the signing packet, what is
                              delivered to the tenant, and what is filed after.
  move-in-move-out-report.pdf 2 pages. Room-by-room condition record for the
                              start and end of a tenancy.

    python3 marketing/print/render_lease_kit.py
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

LOGO = pathlib.Path(ROOT, "public", "logo-horizontal.png").as_uri()

# ── RLHD-3x maintenance matrix (form article 10) with TrueNorth's standard split
MAINT = [
    ("roofs", "L"), ("doors", "L"), ("windows", "L"), ("floors", "L"),
    ("screens", "L"), ("steps", "L"), ("porches", "L"), ("exterior walls", "L"),
    ("foundations", "L"), ("plumbing", "L"), ("structural components", "L"),
    ("heating", "L"), ("hot water", "L"), ("running water", "L"),
    ("electrical system", "L"), ("cooling", "L"), ("ceilings", "L"),
    ("interior walls", "L"), ("locks and keys", "L"),
    ("smoke detection devices", "L"), ("garbage removal / outside receptacles", "T"),
    ("extermination of rats, mice, roaches, ants, bedbugs", "L"),
    ("extermination of wood-destroying organisms", "L"),
    ("lawn / shrubbery", "T"), ("pool / spa / hot tub", "L"),
    ("water treatment", "L"), ("filters (specify size and type)", "T"),
    ("other (specify)", "—"),
]

PACKET = [
    ("Nonlawyer disclosure (ND-3)", "One for the landlord, one for the tenant, whenever TrueNorth fills in blanks for them. Keep copies 6 years."),
    ("Residential Lease, RLHD-3x", "Completed from the data sheet. Every page initialed by landlord and tenant."),
    ("Early Termination Fee / Liquidated Damages Addendum", "Part of the form. Tenant chooses one of the two boxes — it cannot be left blank."),
    ("Lead-based paint disclosure and EPA pamphlet", "Required for any dwelling built before 1978. Article 13 of the lease, plus 'Protect Your Family From Lead in Your Home.'"),
    ("Copy of Part II, Chapter 83, Florida Statutes", "Attached to the form. Hand it over with the lease; the lease says it is attached."),
    ("Homeowners' association documents and approval", "Rules, application, approval letter. Article 16 makes the lease contingent on approval."),
    ("Pet addendum", "Only if pets are permitted. Describe number, type, breed, and maximum adult weight in article 7."),
    ("Move-in condition report", "Completed with the tenant, dated and signed, with photos stored in the property file."),
    ("Keys and access receipt", "Counts must match article 12: dwelling keys, mailbox keys, openers, HOA keys, remotes, cards."),
    ("Proof of renter's insurance", "If required. Article 18 recommends it; it is not automatic."),
    ("Utility transfer confirmation", "Tenant's accounts active on the start date for everything article 9 does not assign to the landlord."),
    ("W-9 and insurance certificate from the owner", "For the management file, not the tenant packet."),
]

AFTER = [
    ("Within 30 days of receiving the deposit", "Send the tenant the written security deposit notice required by s. 83.49(3), Florida Statutes: where the deposit is held, whether it earns interest, and the surety bond details if any."),
    ("At signing", "Deliver a fully signed copy of the lease and every attachment to the tenant, and file one in the property folder."),
    ("Day one", "Deposits and advance rent into the brokerage property management escrow account. Never into an operating account."),
    ("Within 5 business days of the tenant getting phone service", "Article 25 requires the tenant to send their telephone number in writing. Chase it if it does not arrive."),
    ("Ongoing", "Keep the lease, addenda, disclosures, inspection reports, and ledgers for at least 5 years (s. 475.5015)."),
]

ROOMS = ["Living room", "Dining room", "Kitchen", "Primary bedroom", "Primary bath", "Bedroom 2",
         "Bedroom 3", "Bedroom 4", "Hall bath", "Laundry", "Garage", "Lanai / patio", "Yard / landscaping",
         "Roof / exterior", "Windows / screens", "Doors / locks", "HVAC / filter", "Water heater",
         "Smoke / CO detectors", "Appliances", "Flooring", "Walls / ceilings", "Light fixtures / fans", "Other"]


def head():
    return (
        f'<header><img src="{LOGO}" style="width:1.8in">'
        f'<div class="hmeta">{LEGAL_NAME}<br>d/b/a {TRADE_NAME}<br>'
        f'Brokerage License {BROKERAGE_LICENSE} · Broker License {BROKER_LICENSE}<br>'
        f'{OFFICE}<br>{PHONE} · {EMAIL} · {URL}</div></header><div class="rule"></div>'
    )


def foot(title, n, total):
    return (f'<footer><span>{title} · {TRADE_NAME}</span><span>Page {n} of {total}</span></footer>')


def sheet(title, n, total, body):
    return f'<section class="sheet">{head()}<div class="body">{body}</div>{foot(title, n, total)}</section>'


CSS = f"""{BASE_CSS}
@page{{size:8.5in 11in;margin:0}}
html,body{{width:8.5in;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact;overflow:visible}}
body{{color:#1F2937;font-size:7.9pt;line-height:1.36}}
.sheet{{position:relative;width:8.5in;height:11in;padding:.45in .55in .5in;display:flex;flex-direction:column;
  page-break-after:always;overflow:hidden}}
.sheet:last-child{{page-break-after:auto}}
header{{display:flex;justify-content:space-between;align-items:flex-start;gap:.3in}}
.hmeta{{text-align:right;font-size:6.4pt;line-height:1.5;color:{SLATE}}}
.rule{{height:1.5pt;background:{GOLD};margin:.08in 0 .13in}}
.body{{flex:1}}
h1{{font-family:'Fraunces',Georgia,serif;font-size:15.5pt;font-weight:500;color:{NAVY};letter-spacing:-.01em}}
h2{{font-family:'Fraunces',Georgia,serif;font-size:9.5pt;font-weight:600;color:{NAVY};margin:.1in 0 .04in}}
p{{margin-bottom:.06in}}
.note{{font-size:7.3pt;color:{SLATE}}}
b{{font-weight:600;color:{NAVY}}}
.fill{{display:inline-block;border-bottom:.7pt solid #9CA3AF;height:10pt;vertical-align:-3pt}}
.cb{{display:inline-block;width:9pt;height:9pt;border:.9pt solid #6B7280;border-radius:1.5pt;vertical-align:-1.5pt}}
table{{width:100%;border-collapse:collapse}}
.tbl td{{border:.5pt solid #D7DEE7;padding:2.0pt 3.6pt;vertical-align:top}}
.tbl .hd td{{background:{SAND};font-weight:600;color:{NAVY}}}
.tbl tr:nth-child(even) td{{background:#FBFCFD}}
.c{{text-align:center}}
.art{{color:{SLATE};font-size:7pt}}
.form td{{padding:2pt 8pt 5pt 0;vertical-align:top;font-size:7.2pt;color:{SLATE}}}
.form td div{{margin-top:1pt}}
footer{{display:flex;justify-content:space-between;border-top:.5pt solid #D7DEE7;padding-top:4pt;
  font-size:6.4pt;color:{SLATE}}}
"""


def field(label, width="2.4in"):
    return f'<td>{label}<div>{box(width)}</div></td>'


def maint_rows():
    out = ""
    for i in range(0, len(MAINT), 2):
        cells = ""
        for item, default in MAINT[i:i + 2]:
            d = {"L": "Landlord", "T": "Tenant", "—": "—"}[default]
            cells += f'<td>{item}</td><td class="c">{cb()}</td><td class="c">{cb()}</td><td class="art">{d}</td>'
        if len(MAINT[i:i + 2]) == 1:
            cells += '<td></td><td></td><td></td><td></td>'
        out += f"<tr>{cells}</tr>"
    return out


DS1 = f"""
<h1>Lease Data Sheet</h1>
<p class="note">Fill this in with the owner before you open the lease form. Every line maps to a blank in Florida
Realtors/Florida Bar form RLHD-3x, in form order. The right-hand notes are TrueNorth's standard answer — change them
when the property calls for it. <b>The signed lease controls, not this sheet.</b></p>

<h2>Parties and contacts <span class="art">· article 1</span></h2>
<table class="form">
  <tr>{field("Landlord, exactly as title is held", "2.9in")}{field("Landlord mailing address", "2.9in")}</tr>
  <tr>{field("Landlord email", "2.9in")}{field("Landlord phone", "2.9in")}</tr>
  <tr>{field("Tenant 1 full legal name", "2.9in")}{field("Tenant 1 email and phone", "2.9in")}</tr>
  <tr>{field("Tenant 2 full legal name", "2.9in")}{field("Tenant 2 email and phone", "2.9in")}</tr>
</table>

<h2>Property <span class="art">· article 2</span></h2>
<table class="form">
  <tr><td colspan="2">Street address, unit, city, zip<div>{box("6.2in")}</div></td></tr>
  <tr><td colspan="2">Furniture and appliances included — list every item, or write NONE<div>{box("6.2in")}</div></td></tr>
  <tr><td colspan="2">Everyone who will occupy the premises besides the tenant(s), including children<div>{box("6.2in")}</div></td></tr>
</table>

<h2>Term and rent <span class="art">· articles 3 and 4</span></h2>
<table class="form">
  <tr>{field("Start date", "1.9in")}{field("End date (12 months or less)", "1.9in")}{field("Total rent for the term", "1.9in")}</tr>
  <tr>{field("Monthly rent", "1.9in")}{field("Day of month rent is due", "1.9in")}{field("Prorated first rent, if any", "1.9in")}</tr>
</table>
<table class="tbl">
  <tr class="hd"><td style="width:2.6in">Item</td><td>TrueNorth standard answer</td></tr>
  <tr><td>Rent paid in</td><td>Installments, monthly, on the 1st</td></tr>
  <tr><td>Taxes on rent</td><td>None. Residential rent is not taxed in Florida.</td></tr>
  <tr><td>Rent payable to</td><td>{LEGAL_NAME} d/b/a {TRADE_NAME}, {OFFICE}</td></tr>
  <tr><td>Accepted payment methods</td><td>Online through RentRedi. Add "other: online payment portal" on the form, and strike cash.</td></tr>
  <tr><td>Bad check fee</td><td>Maximum allowed by s. 68.065, Fla. Stat. After one bad check, require certified funds.</td></tr>
  <tr><td>Late fee <span class="art">· article 6</span></td><td>Write the amount and the number of days. If left blank the form defaults to 4% of the rent, 5 days late.</td></tr>
</table>

<h2>Money due before occupancy <span class="art">· article 5</span></h2>
<p class="note">Nobody gets keys until every line below is collected and cleared. Deposits go straight into the
brokerage property management escrow account.</p>
<table class="tbl">
  <tr class="hd"><td style="width:2.5in">Line on the form</td><td style="width:1.3in">Amount</td><td style="width:1.3in">Due date</td><td>Notes</td></tr>
  <tr><td>First month's rent</td><td>${box(".9in")}</td><td>{box(".9in")}</td><td></td></tr>
  <tr><td>Prorated rent</td><td>${box(".9in")}</td><td>{box(".9in")}</td><td>30-day month if monthly</td></tr>
  <tr><td>Advance rent for</td><td>${box(".9in")}</td><td>{box(".9in")}</td><td>Name the month</td></tr>
  <tr><td>Last month's rent</td><td>${box(".9in")}</td><td>{box(".9in")}</td><td></td></tr>
  <tr><td>Security deposit</td><td>${box(".9in")}</td><td>{box(".9in")}</td><td>s. 83.49 notice goes out within 30 days</td></tr>
  <tr><td>Additional security deposit</td><td>${box(".9in")}</td><td>{box(".9in")}</td><td></td></tr>
  <tr><td>HOA security deposit</td><td>${box(".9in")}</td><td>{box(".9in")}</td><td>Article 16 says who pays it</td></tr>
  <tr><td>Pet deposit</td><td>${box(".9in")}</td><td>{box(".9in")}</td><td>A pet deposit permits pets even if the box is unchecked</td></tr>
  <tr><td>Other</td><td>${box(".9in")}</td><td>{box(".9in")}</td><td></td></tr>
</table>
"""

DS2 = f"""
<h2>Pets and smoking <span class="art">· article 7</span></h2>
<table class="form">
  <tr><td>{cb("Pets permitted")} &nbsp; {cb("No pets")}<div class="art">A pet deposit permits pets whether or not the box is checked.</div></td>
      <td>{cb("Smoking permitted")} &nbsp; {cb("No smoking")}<div class="art">Leave unchecked for no smoking.</div></td></tr>
  <tr><td colspan="2">Number, type, breed, and maximum adult weight of each pet<div>{box("6.2in")}</div></td></tr>
</table>

<h2>Notices and who the tenant contacts <span class="art">· articles 8 and 10</span></h2>
<table class="tbl">
  <tr class="hd"><td style="width:2.3in">Blank on the form</td><td>TrueNorth standard answer</td></tr>
  <tr><td>Landlord's Agent</td><td>{LEGAL_NAME} d/b/a {TRADE_NAME}</td></tr>
  <tr><td>Send all notices to</td><td>Check <b>Landlord's Agent</b>, then {TRADE_NAME}, {OFFICE}</td></tr>
  <tr><td>Maintenance requests to</td><td>{TRADE_NAME}, {OFFICE}, {PHONE} — tenants submit through the RentRedi portal</td></tr>
</table>

<h2>Utilities <span class="art">· article 9</span></h2>
<p>Tenant pays every utility and connection charge except these, which the landlord provides at their expense
(write NONE if there are none): {box("3.5in")}</p>

<h2>Maintenance responsibility <span class="art">· article 10</span></h2>
<p class="note">Check Landlord or Tenant for every line. A blank means the landlord is responsible. The right column is
TrueNorth's standard split for a single-family rental; change it to match what the owner agreed to.</p>
<table class="tbl">
  <tr class="hd"><td>Item</td><td class="c" style="width:.32in">L</td><td class="c" style="width:.32in">T</td><td style="width:.72in">Default</td>
      <td>Item</td><td class="c" style="width:.32in">L</td><td class="c" style="width:.32in">T</td><td style="width:.72in">Default</td></tr>
  {maint_rows()}
</table>
<p>Filter size and type: {box("2.2in")} &nbsp; Other items: {box("2.6in")}</p>
"""

DS3 = f"""
<h2>Keys and access <span class="art">· article 12</span></h2>
<table class="form">
  <tr>{field("# sets of dwelling keys", "1.2in")}{field("# mailbox keys", "1.2in")}{field("# garage openers", "1.2in")}</tr>
  <tr>{field("# HOA keys / to what", "1.9in")}{field("# HOA remotes / to what", "1.9in")}{field("# HOA cards / to what", "1.9in")}</tr>
  <tr><td colspan="3">Everything above is returned at the end of the term to {TRADE_NAME}, {OFFICE}</td></tr>
</table>

<h2>Lead-based paint <span class="art">· article 13</span></h2>
<table class="form">
  <tr><td>Was the dwelling built before January 1, 1978?<div>{cb("Yes — complete article 13 and hand over the EPA pamphlet")} &nbsp; {cb("No — leave article 13 blank")}</div></td>
      <td>Known lead-based paint or hazards?<div>{cb("Known, explain on the form")} &nbsp; {cb("No knowledge")}</div></td></tr>
  <tr><td colspan="2">Records or reports available to the owner — list them, or confirm there are none<div>{box("6.2in")}</div></td></tr>
</table>
<p class="note">Landlord, tenant, and agent each initial article 13. Alfredo Mirt signs the agent line, which certifies the
owner was told about their obligations under 42 U.S.C. 4852d.</p>

<h2>Association, use, and commission <span class="art">· articles 16, 17, 28</span></h2>
<table class="form">
  <tr><td>HOA approval required?<div>{cb("Yes")} &nbsp; {cb("No")} &nbsp; Association: {box("1.5in")}</div></td>
      <td>HOA application fee paid by<div>{cb("Landlord")} &nbsp; {cb("Tenant")}</div></td></tr>
  <tr><td>HOA security deposit paid by<div>{cb("Landlord")} &nbsp; {cb("Tenant")}</div></td>
      <td>Tenant may hang pictures and install window treatments?<div>{cb("Yes — leave the box unchecked")} &nbsp; {cb("No — check the box")}</div></td></tr>
  <tr><td>Brokers' commission applies?<div>{cb("Yes — complete article 28")} &nbsp; {cb("No")}</div></td>
      <td>Commission paid by<div>{cb("Landlord")} &nbsp; {cb("Tenant")} &nbsp; Amount: {box("1.1in")}</div></td></tr>
  <tr><td>Real estate licensee<div>{BROKER}</div></td>
      <td>Real estate brokerage company<div>{LEGAL_NAME} d/b/a {TRADE_NAME}</div></td></tr>
</table>

<h2>Tenant's personal property and early termination <span class="art">· article 29 and the addendum</span></h2>
<table class="tbl">
  <tr class="hd"><td style="width:2.9in">Decision</td><td>How to complete it</td></tr>
  <tr><td>Article 29 initial box</td><td>Tenant initials only if they agree the landlord is not responsible for storing property left behind. Explain it; never initial for them.</td></tr>
  <tr><td>Early termination addendum</td><td>Tenant must check one of the two boxes. If they agree to a fee, it cannot exceed two months' rent: ${box(".9in")}</td></tr>
</table>

<h2>Who completed the form <span class="art">· last page of the lease</span></h2>
<table class="tbl">
  <tr><td style="width:1.6in">Name of individual</td><td>{BROKER}</td></tr>
  <tr><td>Name of business</td><td>{LEGAL_NAME} d/b/a {TRADE_NAME}</td></tr>
  <tr><td>Address</td><td>{OFFICE}</td></tr>
  <tr><td>Telephone</td><td>{PHONE}</td></tr>
</table>

<h2>Before you send it out</h2>
<p>{cb()} Every blank above is answered &nbsp; {cb()} Owner approved the rent, term, deposits, and maintenance split
&nbsp; {cb()} Nonlawyer disclosure ready for each party &nbsp; {cb()} Attachments assembled from the signing checklist</p>
"""

CHECK = f"""
<h1>Lease Signing Checklist</h1>
<p class="note">Use this for every tenancy. The lease is Florida Realtors/Florida Bar form RLHD-3x. TrueNorth fills in
the blanks; TrueNorth does not draft lease language. If a landlord or tenant wants a term the form does not contain,
send them to an attorney.</p>

<h2>The signing packet</h2>
<table class="tbl">
  <tr class="hd"><td class="c" style="width:.3in"></td><td style="width:2.7in">Document</td><td>Notes</td></tr>
  {"".join(f'<tr><td class="c">{cb()}</td><td><b>{n}</b></td><td>{d}</td></tr>' for n, d in PACKET)}
</table>

<h2>After signing</h2>
<table class="tbl">
  <tr class="hd"><td class="c" style="width:.3in"></td><td style="width:2.7in">When</td><td>What</td></tr>
  {"".join(f'<tr><td class="c">{cb()}</td><td><b>{w}</b></td><td>{d}</td></tr>' for w, d in AFTER)}
</table>

"""

CHECK2 = f"""
<h2>Three things that go wrong most often</h2>
<p><b>1. The early termination addendum is left blank.</b> The tenant must pick one of the two boxes. A blank one is an
argument waiting to happen.</p>
<p><b>2. The deposit notice is late.</b> Section 83.49(3) gives you 30 days from receiving the deposit to tell the tenant
in writing where it is held. Calendar it the day the money arrives.</p>
<p><b>3. Keys do not match article 12.</b> Count them at move-in and write the same numbers on the lease and the keys
receipt, or you cannot charge for what is missing at move-out.</p>

<table class="form" style="margin-top:.2in">
  <tr>{field("Property", "2.9in")}{field("Tenant(s)", "2.9in")}</tr>
  <tr>{field("Lease start date", "2.9in")}{field("Packet assembled by / date", "2.9in")}</tr>
</table>
"""


def room_rows(n_cols=2):
    return "".join(
        f'<tr><td>{r}</td><td>{box("2.0in")}</td><td class="c">{cb()}</td><td>{box("1.1in")}</td></tr>'
        for r in ROOMS
    )


MIO1 = f"""
<h1>Move-In / Move-Out Condition Report</h1>
<table class="form">
  <tr>{field("Property address", "2.9in")}{field("Tenant(s)", "2.9in")}</tr>
  <tr>{field("Move-in date and inspector", "2.9in")}{field("Move-out date and inspector", "2.9in")}</tr>
</table>
<p class="note">Record the condition at move-in with the tenant present where possible, and photograph every room. Mark
the box when the item is also checked at move-out, and note any change. Photographs are stored in the property file and
are part of this record.</p>
<table class="tbl">
  <tr class="hd"><td style="width:1.7in">Area or item</td><td>Condition at move-in</td><td class="c" style="width:.5in">Move-out checked</td><td style="width:1.2in">Change noted</td></tr>
  {room_rows()}
</table>
"""

MIO2 = f"""
<h2>Keys and access returned <span class="art">· must match article 12 of the lease</span></h2>
<table class="tbl">
  <tr class="hd"><td style="width:2.2in">Item</td><td class="c" style="width:1.1in">Issued at move-in</td><td class="c" style="width:1.1in">Returned at move-out</td><td>Notes</td></tr>
  <tr><td>Dwelling keys</td><td class="c">{box(".55in")}</td><td class="c">{box(".55in")}</td><td>{box("2.3in")}</td></tr>
  <tr><td>Mailbox keys</td><td class="c">{box(".55in")}</td><td class="c">{box(".55in")}</td><td>{box("2.3in")}</td></tr>
  <tr><td>Garage openers</td><td class="c">{box(".55in")}</td><td class="c">{box(".55in")}</td><td>{box("2.3in")}</td></tr>
  <tr><td>HOA keys / remotes / cards</td><td class="c">{box(".55in")}</td><td class="c">{box(".55in")}</td><td>{box("2.3in")}</td></tr>
</table>

<h2>Meters, filters, and detectors</h2>
<table class="form">
  <tr>{field("HVAC filter size and date changed", "2.9in")}{field("Water heater condition", "2.9in")}</tr>
  <tr>{field("Smoke detectors tested (date, count)", "2.9in")}{field("CO detectors tested (date, count)", "2.9in")}</tr>
  <tr>{field("Utilities in tenant's name as of", "2.9in")}{field("Lawn / pool service responsibility", "2.9in")}</tr>
</table>

<h2>Move-out findings</h2>
<p class="note">Normal wear and tear is not chargeable. List only damage beyond normal wear, cleaning beyond broom-clean
condition, and missing items. If anything will be claimed against the deposit, the written claim must be sent within the
deadline in s. 83.49, Florida Statutes.</p>
<table class="tbl">
  <tr class="hd"><td style="width:2.5in">Item</td><td>Description</td><td style="width:1.1in">Estimated cost</td></tr>
  {"".join(f'<tr><td>{box("2.3in")}</td><td>{box("3.0in")}</td><td>${box(".8in")}</td></tr>' for _ in range(8))}
</table>

<h2>Acknowledgment</h2>
<p class="note">Signing records the condition observed on the date shown. It is not a waiver of either party's rights
under the lease or Chapter 83, Florida Statutes.</p>
<table class="form">
  <tr>{field("Tenant signature and date — move-in", "2.9in")}{field("TrueNorth signature and date — move-in", "2.9in")}</tr>
  <tr>{field("Tenant signature and date — move-out", "2.9in")}{field("TrueNorth signature and date — move-out", "2.9in")}</tr>
</table>
"""

def _split(block, marker):
    head, tail = block.split(marker, 1)
    return head, marker + tail


DS1A, DS_MONEY = _split(DS1, "<h2>Money due before occupancy")
DS3A, DS_SEND = _split(DS3, "<h2>Before you send it out")
DS2A, DS_MAINT = _split(DS2, "<h2>Maintenance responsibility")

DOCS = {
    "lease-data-sheet": ("Lease Data Sheet", [DS1A, DS_MONEY + DS2A, DS_MAINT + DS_SEND, DS3A]),
    "lease-signing-checklist": ("Lease Signing Checklist", [CHECK, CHECK2]),
    "move-in-move-out-report": ("Move-In / Move-Out Condition Report", [MIO1, MIO2]),
}


def document(name, only=None):
    title, pages = DOCS[name]
    total = len(pages)
    pick = [(i, pages[i - 1]) for i in (only or range(1, total + 1))]
    body = "".join(sheet(title, i, total, p) for i, p in pick)
    return f'<!doctype html><html><head><meta charset="utf-8"><style>{CSS}</style></head><body>{body}</body></html>'


def render(name):
    tmp = tempfile.mkdtemp()
    html = pathlib.Path(tmp) / f"{name}.html"
    html.write_text(document(name), encoding="utf-8")
    common = ["--headless=new", "--disable-gpu", "--hide-scrollbars", f"--user-data-dir={tmp}/profile",
              "--allow-file-access-from-files", "--virtual-time-budget=12000"]
    pdf = HERE / f"{name}.pdf"
    chrome(common + ["--no-pdf-header-footer", f"--print-to-pdf={pdf}", html.as_uri()], pdf)
    png = HERE / f"{name}.png"
    chrome(common + ["--force-device-scale-factor=1.6", "--window-size=816,1056", f"--screenshot={png}", html.as_uri()], png)
    shutil.rmtree(tmp, ignore_errors=True)
    print(pdf.relative_to(ROOT))


if __name__ == "__main__":
    for n in sys.argv[1:] or DOCS:
        render(n)
