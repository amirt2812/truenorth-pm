"""
Brokerage + property management pro forma.

Three scenarios, a tier-based fee architecture, full cost build-up, 24-month
P&L, unit economics, three ways to pay the managing agent, and an enterprise
value view that separates what the brokerage is worth from what the property
management book is worth.

    python3 finance/build_proforma.py

Every blue cell is an input. Black cells are formulas. Change the scenario in
Scenarios!B3 and the whole model moves.
"""
import pathlib

from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter
from openpyxl.worksheet.datavalidation import DataValidation

OUT = pathlib.Path(__file__).resolve().parent / "TrueNorth-Pro-Forma.xlsx"

NAVY = "0F2742"
GOLD = "C29A4A"
SAND = "F6F1E7"
BLUE = "0000FF"      # hardcoded input
GREEN = "008000"     # link to another sheet
GREY = "6B7280"

F_TITLE = Font(name="Arial", size=16, bold=True, color=NAVY)
F_H = Font(name="Arial", size=11, bold=True, color="FFFFFF")
F_SUB = Font(name="Arial", size=10, bold=True, color=NAVY)
F_B = Font(name="Arial", size=10, bold=True)
F_N = Font(name="Arial", size=10)
F_IN = Font(name="Arial", size=10, color=BLUE)
F_LINK = Font(name="Arial", size=10, color=GREEN)
F_NOTE = Font(name="Arial", size=9, italic=True, color=GREY)

FILL_H = PatternFill("solid", fgColor=NAVY)
FILL_SAND = PatternFill("solid", fgColor=SAND)
FILL_YELLOW = PatternFill("solid", fgColor="FFFF00")
THIN = Side(style="thin", color="D7DEE7")
BOX = Border(top=THIN, bottom=THIN, left=THIN, right=THIN)

USD = '$#,##0;($#,##0);"-"'
USD2 = '$#,##0.00;($#,##0.00);"-"'
PCT = '0.0%;(0.0%);"-"'
NUM = '#,##0.0;(#,##0.0);"-"'
INT = '#,##0;(#,##0);"-"'
MULT = '0.0x'

wb = Workbook()


def sheet(title, widths):
    ws = wb.create_sheet(title)
    for i, w in enumerate(widths, 1):
        ws.column_dimensions[get_column_letter(i)].width = w
    return ws


def title(ws, text, sub=None, span=8):
    ws["A1"] = text
    ws["A1"].font = F_TITLE
    if sub:
        ws["A2"] = sub
        ws["A2"].font = F_NOTE
    ws.row_dimensions[1].height = 22


def header_row(ws, row, labels, start=1):
    for i, lab in enumerate(labels):
        c = ws.cell(row=row, column=start + i, value=lab)
        c.font = F_H
        c.fill = FILL_H
        c.alignment = Alignment(horizontal="center" if i else "left", vertical="center", wrap_text=True)
        c.border = BOX
    ws.row_dimensions[row].height = 28


def put(ws, row, col, value, font=F_N, fmt=None, fill=None, align=None, border=True):
    c = ws.cell(row=row, column=col, value=value)
    c.font = font
    if fmt:
        c.number_format = fmt
    if fill:
        c.fill = fill
    if align:
        c.alignment = Alignment(horizontal=align)
    if border:
        c.border = BOX
    return c


def section(ws, row, text):
    c = ws.cell(row=row, column=1, value=text)
    c.font = F_SUB
    c.fill = FILL_SAND
    for col in range(1, 10):
        ws.cell(row=row, column=col).fill = FILL_SAND
        ws.cell(row=row, column=col).border = BOX
    return row + 1


# ══════════════════════════════════════════════════════════ Read Me
ws = sheet("Read Me", [100])
ws["A1"] = "TrueNorth — Brokerage and Property Management Pro Forma"
ws["A1"].font = F_TITLE
readme = [
    "",
    "HOW TO USE THIS MODEL",
    "Blue numbers are inputs you can change. Black numbers are formulas — do not type over them.",
    "Yellow cells are the two switches that drive everything: the scenario on Scenarios!B3 and the fee",
    "architecture on Tiers!B3.",
    "",
    "THE PROBLEM THIS MODEL WAS BUILT TO ANSWER",
    "At $399 per transaction with the listing marketing package included, a listing-side deal costs the",
    "brokerage more than it collects. The media package (photography, aerial, edited video, floor plan,",
    "flyers, sign, lockbox) is modeled at roughly $500-750 per listing on the Costs tab. The brokerage",
    "collects $399. Every listing an agent takes is therefore a loss before a single fixed cost is paid,",
    "and the harder an agent works, the more the brokerage loses. That is not a pricing problem at the",
    "margin; it is the wrong shape of deal.",
    "",
    "THREE FEE ARCHITECTURES ARE MODELED (switch on the Tiers tab)",
    "  A. Flat — the current plan: $399 per transaction, $20 a month, media included. Modeled so you can",
    "     see the hole rather than take my word for it.",
    "  B. Tiered — three membership levels. Media moves behind a per-listing credit that rises with tier.",
    "     An agent who wants the full package pays for access to it through a higher monthly fee.",
    "  C. Flat, media excluded — keep one simple price, but media is billed to the agent at cost.",
    "     The simplest fix, and the one that needs the least explanation to a recruit.",
    "",
    "WHAT THE TABS DO",
    "  Scenarios       Conservative / Modest / Aggressive growth, and the drivers behind each.",
    "  Tiers           The fee architecture, what each tier includes, and the cost to serve it.",
    "  Costs           Fixed monthly stack, per-agent cost, per-transaction cost, media package build-up.",
    "  P&L             24 months, brokerage only. Agents ramp, revenue, cost, EBITDA, cumulative cash.",
    "  Unit Economics  Contribution per transaction and per agent. Break-even agent count.",
    "  Managing Agent  Three ways to pay your mother, what each costs, and what she earns.",
    "  PM and EV       Property management revenue, and what the two businesses are worth separately.",
    "",
    "WHAT I COULD NOT KNOW",
    "Vendor prices on the Costs tab are market estimates, not quotes. Get real numbers for the CRM,",
    "transaction management, and media before you set a price you have to honor for a year. Each is",
    "labeled and every one is editable.",
]
for i, line in enumerate(readme, start=3):
    c = ws.cell(row=i, column=1, value=line)
    c.font = F_SUB if line.isupper() and line else F_N
    if line.startswith("  "):
        c.font = F_N

# ══════════════════════════════════════════════════════════ Scenarios
ws = sheet("Scenarios", [38, 15, 15, 15, 15, 40])
title(ws, "Scenarios", "Pick one in B3. Every other tab follows it.")
put(ws, 3, 1, "Selected scenario", F_B)
put(ws, 3, 2, "Modest", F_IN, fill=FILL_YELLOW, align="center")
dv = DataValidation(type="list", formula1='"Conservative,Modest,Aggressive"', allow_blank=False)
ws.add_data_validation(dv)
dv.add(ws["B3"])

r = 5
header_row(ws, r, ["Driver", "Conservative", "Modest", "Aggressive", "Active", "Note"])
r += 1
drivers = [
    ("Agents at start (incl. you and your mother)", 2, 2, 2, INT, "You and your mother on day one."),
    ("Net new agents per month, months 1-12", 0.5, 1.0, 2.0, NUM, "Recruiting is the whole game. 1/mo is a believable pace for a new brokerage with a referral-based pitch."),
    ("Net new agents per month, months 13-24", 1.0, 2.0, 3.5, NUM, "Assumes word of mouth compounds once agents are paid on time."),
    ("Annual agent attrition", 0.20, 0.25, 0.30, PCT, "Industry churn is high. Faster growth usually means looser screening, so attrition rises with the case."),
    ("Transactions per agent per month", 0.35, 0.50, 0.70, NUM, "0.5 = six closings a year per agent. The NAR median is in that range; be honest here."),
    ("Share of transactions that are listing side", 0.35, 0.45, 0.55, PCT, "Listings are the expensive side to serve because of media."),
    ("Average sale price", 285000, 310000, 340000, USD, "Hernando County range. Drives the agent's gross, not your fee."),
    ("Media package attach rate on listings", 1.00, 0.85, 0.75, PCT, "Not every listing gets the full package; land and teardowns do not need video."),
    ("Tier mix — Solo", 0.60, 0.50, 0.40, PCT, "Used only when the Tiered architecture is selected."),
    ("Tier mix — Pro", 0.30, 0.35, 0.40, PCT, ""),
    ("Tier mix — Premier", 0.10, 0.15, 0.20, PCT, ""),
    ("PM doors at start", 3, 5, 8, INT, "Units under management today."),
    ("PM doors added per month", 1.0, 2.0, 3.5, NUM, "The property management book is the asset. See PM and EV."),
    ("PM monthly fee per door", 129, 149, 169, USD, "Blended across Essential/Plus/Premier."),
]
first = r
for name, cons, mod, agg, fmt, note in drivers:
    put(ws, r, 1, name, F_N)
    put(ws, r, 2, cons, F_IN, fmt)
    put(ws, r, 3, mod, F_IN, fmt)
    put(ws, r, 4, agg, F_IN, fmt)
    put(ws, r, 5, f'=INDEX(B{r}:D{r},MATCH($B$3,$B$5:$D$5,0))', F_B, fmt)
    put(ws, r, 6, note, F_NOTE)
    r += 1
last = r - 1
ws.freeze_panes = "A6"
SC = {name: f"Scenarios!$E${first + i}" for i, (name, *_rest) in enumerate(drivers)}

r += 1
put(ws, r, 1, "Tier mix must total 100%", F_NOTE)
put(ws, r, 5, f"=SUM(E{first+8}:E{first+10})", F_B, PCT)

# ══════════════════════════════════════════════════════════ Tiers
ws = sheet("Tiers", [34, 16, 16, 16, 44])
title(ws, "Fee architecture", "Switch architectures in B3. The tier table below drives the Tiered case.")
put(ws, 3, 1, "Selected architecture", F_B)
put(ws, 3, 2, "B. Tiered", F_IN, fill=FILL_YELLOW, align="center")
dv2 = DataValidation(type="list", formula1='"A. Flat (current),B. Tiered,C. Flat media excluded,D. In-house media"', allow_blank=False)
ws.add_data_validation(dv2)
dv2.add(ws["B3"])

r = 5
header_row(ws, r, ["Tier", "Solo", "Pro", "Premier", "What it is"])
r += 1
tier_rows = [
    ("Monthly fee", 29, 99, 299, USD, "Covers the seat: compliance, escrow, supervision, e-signature, transaction management."),
    ("Transaction fee", 495, 425, 350, USD, "Falls as the monthly rises. An agent who closes a lot should prefer Premier; that is the point."),
    ("Media credit per listing", 0, 300, 500, USD, "What the brokerage funds toward the listing media package. Agent pays any excess."),
    ("CRM seat included", 0, 1, 1, INT, "1 = yes. Cost per seat is on the Costs tab."),
    ("Transaction coordination included", 0, 0, 0, INT, "1 = yes. Left at 0 on every tier: a $325 coordinator inside a $350 transaction fee erases the fee. Sell it as a $395 add-on instead."),
]
tfirst = r
for name, a, b, c_, fmt, note in tier_rows:
    put(ws, r, 1, name, F_N)
    put(ws, r, 2, a, F_IN, fmt)
    put(ws, r, 3, b, F_IN, fmt)
    put(ws, r, 4, c_, F_IN, fmt)
    put(ws, r, 5, note, F_NOTE)
    r += 1

r += 1
r = section(ws, r, "Flat architectures (A and C)")
put(ws, r, 1, "Flat monthly fee", F_N); put(ws, r, 2, 20, F_IN, USD)
put(ws, r, 5, "Your current plan.", F_NOTE); fa_month = r; r += 1
put(ws, r, 1, "Flat transaction fee", F_N); put(ws, r, 2, 399, F_IN, USD)
put(ws, r, 5, "Your current plan.", F_NOTE); fa_txn = r; r += 1
put(ws, r, 1, "Media credit per listing — A", F_N); put(ws, r, 2, 750, F_IN, USD)
put(ws, r, 5, "Architecture A includes the full package, so the brokerage funds all of it.", F_NOTE); fa_media = r; r += 1
put(ws, r, 1, "Media credit per listing — C", F_N); put(ws, r, 2, 0, F_IN, USD)
put(ws, r, 5, "Architecture C bills media to the agent at cost. Same $399, no hole.", F_NOTE); fc_media = r; r += 1
put(ws, r, 1, "Monthly fee — D (in-house media)", F_N); put(ws, r, 2, 99, F_IN, USD)
put(ws, r, 5, "The per-seat tech stack costs about $83 a month. A $20 fee cannot cover it; this one can.", F_NOTE); fd_month = r; r += 1
put(ws, r, 1, "Transaction fee — D", F_N); put(ws, r, 2, 399, F_IN, USD)
put(ws, r, 5, "Your number, kept.", F_NOTE); fd_txn = r; r += 1

r += 1
r = section(ws, r, "Blended economics at the selected architecture and scenario")
blend_first = r
put(ws, r, 1, "Blended monthly fee per agent", F_N)
put(ws, r, 2, (f'=IF($B$3="B. Tiered",B{tfirst}*{SC["Tier mix — Solo"]}+C{tfirst}*{SC["Tier mix — Pro"]}'
               f'+D{tfirst}*{SC["Tier mix — Premier"]},IF($B$3="D. In-house media",B{fd_month},B{fa_month}))'), F_B, USD2); r += 1
put(ws, r, 1, "Blended transaction fee", F_N)
put(ws, r, 2, (f'=IF($B$3="B. Tiered",B{tfirst+1}*{SC["Tier mix — Solo"]}+C{tfirst+1}*{SC["Tier mix — Pro"]}'
               f'+D{tfirst+1}*{SC["Tier mix — Premier"]},IF($B$3="D. In-house media",B{fd_txn},B{fa_txn}))'), F_B, USD2); r += 1
put(ws, r, 1, "Blended media credit per listing", F_N)
put(ws, r, 2, (f'=IF($B$3="B. Tiered",B{tfirst+2}*{SC["Tier mix — Solo"]}+C{tfirst+2}*{SC["Tier mix — Pro"]}'
               f'+D{tfirst+2}*{SC["Tier mix — Premier"]},IF(OR($B$3="A. Flat (current)",$B$3="D. In-house media"),B{fa_media},B{fc_media}))'), F_B, USD2); r += 1
put(ws, r, 1, "Share of agents with CRM seat included", F_N)
put(ws, r, 2, (f'=IF($B$3="B. Tiered",C{tfirst+3}*{SC["Tier mix — Pro"]}+D{tfirst+3}*{SC["Tier mix — Premier"]},1)'), F_B, PCT); r += 1
put(ws, r, 1, "Share of transactions with TC included", F_N)
put(ws, r, 2, (f'=IF($B$3="B. Tiered",D{tfirst+4}*{SC["Tier mix — Premier"]},0)'), F_B, PCT); r += 1
BLEND = {k: f"Tiers!$B${blend_first + i}" for i, k in enumerate(
    ["monthly", "txn", "media_credit", "crm_share", "tc_share"])}

# ══════════════════════════════════════════════════════════ Costs
ws = sheet("Costs", [40, 14, 46])
title(ws, "Cost build-up", "Market estimates, not quotes. Replace with real numbers before you commit to a price.")
r = 3
r = section(ws, r, "Listing media package — per listing")
media_first = r
media = [
    ("Professional photography", 175, "Local real estate shooter, 30-40 images."),
    ("Aerial photos and video", 125, "Requires an FAA Part 107 pilot. Your cost if you hire one; near zero if you certify yourself."),
    ("Edited listing video", 200, "Walkthrough, cut for social."),
    ("Floor plan", 75, "Usually bundled with the photo shoot."),
    ("Printed flyers and brochures", 60, "Short run, per listing."),
    ("Yard sign and install", 60, "Amortized over roughly 4 listings per sign."),
    ("Lockbox", 25, "Amortized. Electronic boxes run $100-150 and last years."),
]
for name, amt, note in media:
    put(ws, r, 1, name, F_N); put(ws, r, 2, amt, F_IN, USD); put(ws, r, 3, note, F_NOTE); r += 1
put(ws, r, 1, "Total media package per listing", F_B)
put(ws, r, 2, f"=SUM(B{media_first}:B{r-1})", F_B, USD)
put(ws, r, 3, "This is the number that breaks a $399 flat fee.", F_NOTE)
OUTSOURCED = f"Costs!$B${r}"
r += 2

r = section(ws, r, "In-house media — you shoot it yourself")
inhouse_first = r
inhouse = [
    ("Editing, per listing", 65, "Your quoted editor rate for photos and video."),
    ("Printed flyers and brochures", 60, "Still a print cost whoever shoots it."),
    ("Yard sign and lockbox, amortized", 85, "Unchanged — you are not shooting these."),
    ("Your hours per listing", 2.5, "Drive, shoot interior and exterior, fly the drone, upload, review the edit."),
    ("Value of your hour", 75, "What an hour of your time is worth doing the next best thing: recruiting an agent or signing a door."),
]
for name, amt, note in inhouse:
    put(ws, r, 1, name, F_N)
    put(ws, r, 2, amt, F_IN, NUM if name == "Your hours per listing" else USD)
    put(ws, r, 3, note, F_NOTE); r += 1
put(ws, r, 1, "In-house media, cash cost per listing", F_B)
put(ws, r, 2, f"=SUM(B{inhouse_first}:B{inhouse_first+2})", F_B, USD)
put(ws, r, 3, "What actually leaves the bank account.", F_NOTE)
INHOUSE_CASH = f"Costs!$B${r}"; r += 1
put(ws, r, 1, "In-house media, loaded cost per listing", F_B)
put(ws, r, 2, f"=B{r-1}+B{inhouse_first+3}*B{inhouse_first+4}", F_B, USD)
put(ws, r, 3, "Cash plus your time. This is the honest number to price against.", F_NOTE)
INHOUSE_LOADED = f"Costs!$B${r}"; r += 1
put(ws, r, 1, "Listings you can personally shoot per month", F_N)
put(ws, r, 2, 10, F_IN, NUM)
put(ws, r, 3, "Above this, you outsource the overflow at the full package price — or stop taking listings.", F_NOTE)
CAPACITY = f"Costs!$B${r}"; r += 1
put(ws, r, 1, "Count your time as a cost?", F_N)
put(ws, r, 2, 1, F_IN, INT)
put(ws, r, 3, "1 = yes (recommended). 0 = treat your labor as free and see the flattering version.", F_NOTE)
COUNT_TIME = f"Costs!$B${r}"; r += 1
put(ws, r, 1, "Active media cost per listing", F_B)
put(ws, r, 2, (f'=IF(Tiers!$B$3="D. In-house media",IF({COUNT_TIME}=1,{INHOUSE_LOADED},{INHOUSE_CASH}),{OUTSOURCED})'),
    F_B, USD)
put(ws, r, 3, "What the P&L and unit economics use.", F_NOTE)
MEDIA_COST = f"Costs!$B${r}"
r += 2

r = section(ws, r, "Fixed monthly — the brokerage exists whether or not anyone closes")
fixed_first = r
fixed = [
    ("Brokerage E&O policy", 150, "Firm policy. Agents carry their own on top."),
    ("General liability", 45, ""),
    ("Broker association and MLS dues", 85, "Your own dues, annualized to a month."),
    ("Website, hosting, domain, email", 35, ""),
    ("Transaction management platform", 85, "Base tier for a small firm."),
    ("E-signature", 45, "DocuSign Business Pro is about $45/user/month annually — needed for PowerForms."),
    ("Accounting and bookkeeping", 250, "Trust accounting is not a DIY job once agents are closing."),
    ("Legal and compliance retainer", 125, "Annual attorney review amortized."),
    ("Phone system and call routing", 35, ""),
    ("Banking, escrow account fees, software", 40, ""),
    ("Marketing and recruiting spend", 200, "Cards, cap hats, event table fees, boosted posts."),
]
for name, amt, note in fixed:
    put(ws, r, 1, name, F_N); put(ws, r, 2, amt, F_IN, USD); put(ws, r, 3, note, F_NOTE); r += 1
put(ws, r, 1, "Total fixed monthly", F_B)
put(ws, r, 2, f"=SUM(B{fixed_first}:B{r-1})", F_B, USD)
FIXED = f"Costs!$B${r}"
r += 2

r = section(ws, r, "Per agent, per month")
agent_first = r
per_agent = [
    ("CRM seat", 65, "Follow Up Boss class tool. Only charged for tiers that include it."),
    ("Email, storage, phone line", 18, "Charged for every agent."),
]
for name, amt, note in per_agent:
    put(ws, r, 1, name, F_N); put(ws, r, 2, amt, F_IN, USD); put(ws, r, 3, note, F_NOTE); r += 1
CRM_SEAT = f"Costs!$B${agent_first}"
SEAT_BASE = f"Costs!$B${agent_first+1}"
r += 1

r = section(ws, r, "Per transaction")
txn_first = r
per_txn = [
    ("Compliance review and file handling", 35, "Your time, costed. It is not free just because you do it."),
    ("Disbursement and banking", 8, ""),
    ("Transaction coordination, when included", 325, "Outsourced TC per file. Only for tiers that include it."),
]
for name, amt, note in per_txn:
    put(ws, r, 1, name, F_N); put(ws, r, 2, amt, F_IN, USD); put(ws, r, 3, note, F_NOTE); r += 1
TXN_BASE = f"(Costs!$B${txn_first}+Costs!$B${txn_first+1})"
TC_COST = f"Costs!$B${txn_first+2}"

# ══════════════════════════════════════════════════════════ P&L
ws = sheet("P&L", [34] + [11] * 24 + [13])
title(ws, "Brokerage P&L — 24 months", "Brokerage only. Property management is modeled separately on PM and EV.")
r = 4
put(ws, r, 1, "Month", F_B)
for m in range(1, 25):
    put(ws, r, 1 + m, m, F_B, INT, align="center")
put(ws, r, 26, "Year 1 + 2", F_B, align="center")
ws.freeze_panes = "B5"
hdr = r
r += 1

def row(label, formula_for_month, fmt=USD, font=F_N, total=True, bold=False):
    global r
    put(ws, r, 1, label, F_B if bold else F_N)
    for m in range(1, 25):
        col = 1 + m
        put(ws, r, col, formula_for_month(m, get_column_letter(col)), F_B if bold else font, fmt)
    if total:
        put(ws, r, 26, f"=SUM(B{r}:Y{r})", F_B, fmt)
    this = r
    r += 1
    return this

r = section(ws, r, "Agents")
adds1 = SC["Net new agents per month, months 1-12"]
adds2 = SC["Net new agents per month, months 13-24"]
attr = SC["Annual agent attrition"]
start_agents = SC["Agents at start (incl. you and your mother)"]

# Agent roll-forward: reserve both row numbers first so each can reference the other.
r_bop, r_eop = r, r + 1
put(ws, r_bop, 1, "Agents, start of month", F_N)
put(ws, r_eop, 1, "Agents, end of month", F_N)
for m in range(1, 25):
    L = get_column_letter(1 + m)
    prev = get_column_letter(m)
    put(ws, r_bop, 1 + m, (f"={start_agents}" if m == 1 else f"={prev}{r_eop}"), F_N, NUM)
    put(ws, r_eop, 1 + m, f"=MAX(0,{L}{r_bop}+IF({m}<=12,{adds1},{adds2})-{L}{r_bop}*{attr}/12)", F_N, NUM)
put(ws, r_eop, 26, f"=Y{r_eop}", F_B, NUM)
r = r_eop + 1

r_txn = row("Transactions closed", lambda m, L: f"={L}{r_eop}*{SC['Transactions per agent per month']}", fmt=NUM)
r_list = row("Listing-side transactions", lambda m, L: f"={L}{r_txn}*{SC['Share of transactions that are listing side']}", fmt=NUM)
r_media_units = row("Listings taking the media package", lambda m, L: f"={L}{r_list}*{SC['Media package attach rate on listings']}", fmt=NUM)

r += 1
r = section(ws, r, "Revenue")
r_rev_month = row("Membership fees", lambda m, L: f"={L}{r_eop}*{BLEND['monthly']}")
r_rev_txn = row("Transaction fees", lambda m, L: f"={L}{r_txn}*{BLEND['txn']}")
r_rev_media = row("Media billed to agents above credit", lambda m, L: (
    f"={L}{r_media_units}*MAX(0,{MEDIA_COST}-{BLEND['media_credit']})"))
r_rev = row("Total revenue", lambda m, L: f"=SUM({L}{r_rev_month}:{L}{r_rev_media})", bold=True)

r += 1
r = section(ws, r, "Cost of service")
r_overflow = row("Listings above your shooting capacity", lambda m, L: (
    f'=IF(Tiers!$B$3="D. In-house media",MAX(0,{L}{r_media_units}-{CAPACITY}),0)'), fmt=NUM)
r_c_media = row("Media cost", lambda m, L: (
    f"=MIN({L}{r_media_units},IF(Tiers!$B$3=\"D. In-house media\",{CAPACITY},{L}{r_media_units}))*{MEDIA_COST}"
    f"+{L}{r_overflow}*{OUTSOURCED}"))
r_c_txn = row("Per-transaction cost", lambda m, L: (
    f"={L}{r_txn}*({TXN_BASE}+{BLEND['tc_share']}*{TC_COST})"))
r_c_seat = row("Per-agent cost", lambda m, L: (
    f"={L}{r_eop}*({SEAT_BASE}+{BLEND['crm_share']}*{CRM_SEAT})"))
r_c_fixed = row("Fixed overhead", lambda m, L: f"={FIXED}")
r_c_mom = row("Managing agent compensation", lambda m, L: f"='Managing Agent'!{L}$30")
r_cost = row("Total cost", lambda m, L: f"=SUM({L}{r_c_media}:{L}{r_c_mom})", bold=True)

r += 1
r_ebitda = row("EBITDA", lambda m, L: f"={L}{r_rev}-{L}{r_cost}", bold=True)
r_cum = row("Cumulative EBITDA", lambda m, L: (f"={L}{r_ebitda}" if m == 1 else f"={get_column_letter(m)}{r_ebitda+1}+{L}{r_ebitda}"), total=False, bold=True)
put(ws, r_cum, 26, f"=Y{r_cum}", F_B, USD)
r_margin = row("EBITDA margin", lambda m, L: f"=IFERROR({L}{r_ebitda}/{L}{r_rev},0)", fmt=PCT, total=False)
put(ws, r_margin, 26, f"=IFERROR(Z{r_ebitda}/Z{r_rev},0)", F_B, PCT)

PL = dict(eop=r_eop, txn=r_txn, rev=r_rev, cost=r_cost, ebitda=r_ebitda, cum=r_cum)

# ══════════════════════════════════════════════════════════ Unit Economics
ws = sheet("Unit Economics", [44, 16, 16, 46])
title(ws, "Unit economics", "What one transaction and one agent are actually worth at the selected architecture.")
r = 3
r = section(ws, r, "Per transaction")
put(ws, r, 1, "Revenue — transaction fee", F_N); put(ws, r, 2, f"={BLEND['txn']}", F_LINK, USD2); r += 1
put(ws, r, 1, "Cost — compliance, file, banking", F_N); put(ws, r, 2, f"=-{TXN_BASE}", F_LINK, USD2); r += 1
put(ws, r, 1, "Cost — transaction coordination (weighted)", F_N); put(ws, r, 2, f"=-{BLEND['tc_share']}*{TC_COST}", F_LINK, USD2); r += 1
put(ws, r, 1, "Contribution — buyer-side transaction", F_B); put(ws, r, 2, f"=SUM(B{r-3}:B{r-1})", F_B, USD2)
put(ws, r, 3, "", F_N); put(ws, r, 4, "No media on the buyer side. This is the profitable half.", F_NOTE)
buyer_contrib = r; r += 2

put(ws, r, 1, "Media package cost per listing", F_N); put(ws, r, 2, f"=-{MEDIA_COST}", F_LINK, USD2); r += 1
put(ws, r, 1, "Media billed back to the agent", F_N); put(ws, r, 2, f"=MAX(0,{MEDIA_COST}-{BLEND['media_credit']})", F_LINK, USD2); r += 1
put(ws, r, 1, "Contribution — listing-side transaction", F_B)
put(ws, r, 2, f"=B{buyer_contrib}+B{r-2}+B{r-1}", F_B, USD2)
put(ws, r, 4, "Negative here means every listing is a loss. That is the test.", F_NOTE)
listing_contrib = r; r += 2

put(ws, r, 1, "Blended contribution per transaction", F_B)
put(ws, r, 2, (f"=B{buyer_contrib}*(1-{SC['Share of transactions that are listing side']})"
               f"+B{listing_contrib}*{SC['Share of transactions that are listing side']}"), F_B, USD2)
blended_contrib = r; r += 2

r = section(ws, r, "Per agent, per month")
put(ws, r, 1, "Membership fee", F_N); put(ws, r, 2, f"={BLEND['monthly']}", F_LINK, USD2); r += 1
put(ws, r, 1, "Seat cost", F_N); put(ws, r, 2, f"=-({SEAT_BASE}+{BLEND['crm_share']}*{CRM_SEAT})", F_LINK, USD2); r += 1
put(ws, r, 1, "Contribution from transactions", F_N)
put(ws, r, 2, f"={SC['Transactions per agent per month']}*B{blended_contrib}", F_LINK, USD2); r += 1
put(ws, r, 1, "Contribution per agent per month", F_B)
put(ws, r, 2, f"=SUM(B{r-3}:B{r-1})", F_B, USD2)
agent_contrib = r; r += 1
put(ws, r, 1, "Contribution per agent per year", F_B); put(ws, r, 2, f"=B{agent_contrib}*12", F_B, USD2); r += 2

r = section(ws, r, "Break-even")
put(ws, r, 1, "Fixed overhead per month", F_N); put(ws, r, 2, f"={FIXED}", F_LINK, USD); r += 1
put(ws, r, 1, "Managing agent cost per month (year 1 average)", F_N)
put(ws, r, 2, "=AVERAGE('Managing Agent'!B30:M30)", F_LINK, USD); r += 1
put(ws, r, 1, "Agents required to break even", F_B)
put(ws, r, 2, f"=IF(B{agent_contrib}<=0,\"never\",(B{r-2}+B{r-1})/B{agent_contrib})", F_B, NUM)
put(ws, r, 4, "If this says never, the architecture loses money on every agent and no amount of recruiting fixes it.", F_NOTE)
r += 1
put(ws, r, 1, "Transactions per month required to break even", F_B)
put(ws, r, 2, f"=IF(B{blended_contrib}<=0,\"never\",(B{r-3}+B{r-2})/B{blended_contrib})", F_B, NUM)

# ══════════════════════════════════════════════════════════ Managing Agent
ws = sheet("Managing Agent", [34] + [11] * 24 + [13])
title(ws, "Paying the managing agent", "Three structures. Switch in B3. Row 30 feeds the P&L.")
put(ws, 3, 1, "Selected structure", F_B)
put(ws, 3, 2, "2. Override + mentor split", F_IN, fill=FILL_YELLOW)
dv3 = DataValidation(type="list", formula1='"1. Output-based only,2. Override + mentor split,3. Base + override"', allow_blank=False)
ws.add_data_validation(dv3)
dv3.add(ws["B3"])

r = 5
inputs = [
    ("Recruiting override per closed transaction", 60, USD, "Paid on every transaction closed by an agent she recruited, for the life of that agent."),
    ("Share of agents credited to her recruiting", 0.70, PCT, "She is the recruiter; you are the broker. Be honest about who sources whom."),
    ("Mentor split — share of mentee commission", 0.20, PCT, "Paid by the MENTEE out of their own commission, not by the brokerage. The brokerage collects and passes it through."),
    ("Mentee transactions covered", 3, INT, "First three closings. After that the agent is on their own."),
    ("Share of new agents needing a mentor", 0.50, PCT, "Newly licensed or returning agents."),
    ("Average commission per side to the agent", 7750, USD, "2.5% of the average sale price. Drives the mentor split."),
    ("Monthly base (structure 3 only)", 1500, USD, "See the note below before you choose this."),
]
ifirst = r
for name, amt, fmt, note in inputs:
    put(ws, r, 1, name, F_N); put(ws, r, 2, amt, F_IN, fmt); put(ws, r, 4, note, F_NOTE); r += 1
I = {k: f"$B${ifirst+i}" for i, k in enumerate(
    ["override", "recruit_share", "mentor_pct", "mentee_txns", "mentor_share", "commission", "base"])}

r += 1
put(ws, r, 1, "A fixed monthly base is the one that can cost you the 1099", F_SUB)
r += 1
for line in [
    "IRC s. 3508 requires that substantially all of a real estate agent's pay be tied to output rather than hours.",
    "A flat monthly base paid to a licensed agent cuts against that, and if her classification falls, every agent's",
    "classification is open to the same question. If you want to pay her a base, pay it to an entity she forms for",
    "management services, under a separate written agreement, and keep it away from her license income.",
]:
    put(ws, r, 1, line, F_NOTE, border=False); r += 1

r = 20
put(ws, r, 1, "Month", F_B)
for m in range(1, 25):
    put(ws, r, 1 + m, m, F_B, INT, align="center")
put(ws, r, 26, "Total", F_B, align="center")
r += 1

def mrow(label, f, fmt=USD, bold=False, total=True):
    global r
    put(ws, r, 1, label, F_B if bold else F_N)
    for m in range(1, 25):
        L = get_column_letter(1 + m)
        put(ws, r, 1 + m, f(m, L), F_B if bold else F_N, fmt)
    if total:
        put(ws, r, 26, f"=SUM(B{r}:Y{r})", F_B, fmt)
    this = r; r += 1
    return this

r_recruit_txn = mrow("Transactions by her recruits", lambda m, L: f"=P&L!{L}{PL['txn']}*{I['recruit_share']}", NUM)
r_override = mrow("Recruiting override", lambda m, L: f"={L}{r_recruit_txn}*{I['override']}")
r_newagents = mrow("New agents this month", lambda m, L: (
    f"=MAX(0,P&L!{L}{PL['eop']}-P&L!{get_column_letter(m)}{PL['eop']})" if m > 1 else "=0"), NUM)
r_mentor = mrow("Mentor split earned", lambda m, L: (
    f"={L}{r_newagents}*{I['mentor_share']}*{I['mentee_txns']}*{I['commission']}*{I['mentor_pct']}"))
r_base = mrow("Base, if selected", lambda m, L: f'=IF($B$3="3. Base + override",{I["base"]},0)')
put(ws, r, 1, "Memo: mentor split paid by mentees (pass-through, not a brokerage cost)", F_NOTE)
for m in range(1, 25):
    L = get_column_letter(1 + m)
    put(ws, r, 1 + m, f"={L}{r_mentor}", F_N, USD)
put(ws, r, 26, f"=SUM(B{r}:Y{r})", F_B, USD)
r += 1

r = 30
put(ws, r, 1, "Total cost to the brokerage", F_B)
for m in range(1, 25):
    L = get_column_letter(1 + m)
    put(ws, r, 1 + m, (
        f'=IF($B$3="3. Base + override",{L}{r_override}+{L}{r_base},{L}{r_override})'), F_B, USD)
put(ws, r, 26, f"=SUM(B{r}:Y{r})", F_B, USD)
r += 2
put(ws, r, 1, "Her total earnings, including her own production", F_SUB)
r += 1
put(ws, r, 1, "Her own transactions per month", F_N)
put(ws, r, 2, f"={SC['Transactions per agent per month']}", F_LINK, NUM)
put(ws, r, 4, "She is also an agent paying the same fees as everyone else.", F_NOTE); r += 1
put(ws, r, 1, "Her commission income per year", F_N)
put(ws, r, 2, f"=B{r-1}*12*{I['commission']}", F_B, USD); r += 1
put(ws, r, 1, "Her management income, year 1", F_N)
put(ws, r, 2, "=SUM(B30:M30)+SUM(B26:M26)", F_B, USD)
put(ws, r, 4, "Override from the brokerage plus mentor splits paid by her mentees.", F_NOTE); r += 1
put(ws, r, 1, "Her fees paid to the brokerage per year", F_N)
put(ws, r, 2, f"=-(12*{BLEND['monthly']}+B{r-3}*12*{BLEND['txn']})", F_B, USD); r += 1
put(ws, r, 1, "Net to her, year 1", F_B)
put(ws, r, 2, f"=B{r-3}+B{r-2}+B{r-1}", F_B, USD)

# ══════════════════════════════════════════════════════════ PM and EV
ws = sheet("PM and EV", [42, 16, 16, 16, 44])
title(ws, "Property management and enterprise value", "Where the durable value actually sits.")
r = 3
r = section(ws, r, "Property management, 24 months")
put(ws, r, 1, "Doors at start", F_N); put(ws, r, 2, f"={SC['PM doors at start']}", F_LINK, INT); r += 1
put(ws, r, 1, "Doors added per month", F_N); put(ws, r, 2, f"={SC['PM doors added per month']}", F_LINK, NUM); r += 1
put(ws, r, 1, "Doors at month 24", F_N); put(ws, r, 2, f"=B{r-2}+B{r-1}*24", F_B, NUM); doors24 = r; r += 1
put(ws, r, 1, "Monthly fee per door", F_N); put(ws, r, 2, f"={SC['PM monthly fee per door']}", F_LINK, USD); r += 1
put(ws, r, 1, "Annual recurring management revenue at month 24", F_B)
put(ws, r, 2, f"=B{doors24}*B{r-1}*12", F_B, USD); pm_arr = r; r += 1
put(ws, r, 1, "Leasing fees per year", F_N)
put(ws, r, 2, f"=B{doors24}*0.4*0.75*{SC['PM monthly fee per door']}*6", F_IN, USD)
put(ws, r, 5, "Rough: 40% of doors turn in a year, leasing fee of 75% of a month's rent. Replace with your real numbers.", F_NOTE)
pm_leasing = r; r += 1
put(ws, r, 1, "PM direct costs", F_N); put(ws, r, 2, 0.35, F_IN, PCT)
put(ws, r, 5, "Share of PM revenue consumed by software, inspections, and your time.", F_NOTE); pm_cost = r; r += 1
put(ws, r, 1, "PM contribution per year", F_B)
put(ws, r, 2, f"=(B{pm_arr}+B{pm_leasing})*(1-B{pm_cost})", F_B, USD); pm_contrib = r; r += 2

r = section(ws, r, "What each business is worth")
header_row(ws, r, ["", "Low", "Mid", "High", "Basis"]); r += 1
put(ws, r, 1, "Brokerage — multiple of EBITDA", F_N)
for col, v in ((2, 1.5), (3, 2.5), (4, 3.5)):
    put(ws, r, col, v, F_IN, MULT)
put(ws, r, 5, "Small independent brokerages trade low. Agent rosters walk, and fee income is not contracted.", F_NOTE)
br_mult = r; r += 1
put(ws, r, 1, "Brokerage EBITDA, year 2 run rate", F_N)
put(ws, r, 2, "=SUM('P&L'!N" + str(PL['ebitda']) + ":Y" + str(PL['ebitda']) + ")", F_LINK, USD)
br_ebitda = r; r += 1
put(ws, r, 1, "Brokerage value", F_B)
for col in (2, 3, 4):
    put(ws, r, col, f"=MAX(0,$B${br_ebitda}*{get_column_letter(col)}{br_mult})", F_B, USD)
br_value = r; r += 2

put(ws, r, 1, "PM — multiple of annual recurring revenue", F_N)
for col, v in ((2, 1.2), (3, 1.8), (4, 2.5)):
    put(ws, r, col, v, F_IN, MULT)
put(ws, r, 5, "Management contracts recur and transfer with a sale, which is why PM books trade on revenue, not earnings.", F_NOTE)
pm_mult = r; r += 1
put(ws, r, 1, "PM annual recurring revenue", F_N)
put(ws, r, 2, f"=B{pm_arr}", F_LINK, USD); pm_rev_ref = r; r += 1
put(ws, r, 1, "PM value", F_B)
for col in (2, 3, 4):
    put(ws, r, col, f"=$B${pm_rev_ref}*{get_column_letter(col)}{pm_mult}", F_B, USD)
pm_value = r; r += 2

put(ws, r, 1, "Combined enterprise value", F_B)
for col in (2, 3, 4):
    put(ws, r, col, f"={get_column_letter(col)}{br_value}+{get_column_letter(col)}{pm_value}", F_B, USD)
r += 1
put(ws, r, 1, "PM share of total value", F_B)
for col in (2, 3, 4):
    L = get_column_letter(col)
    put(ws, r, col, f"=IFERROR({L}{pm_value}/({L}{br_value}+{L}{pm_value}),0)", F_B, PCT)
put(ws, r, 5, "If this is most of the value, the brokerage's job is to feed the PM book, not to carry the company.", F_NOTE)

del wb["Sheet"]
wb.save(OUT)
print(OUT)
