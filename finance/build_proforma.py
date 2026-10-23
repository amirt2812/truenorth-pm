"""
TrueNorth pro forma — single model.

Pricing: $29 per agent per month, $399 per closed transaction, media shot
in-house with editing absorbed, flyers and signage sold at cost plus a markup.

    python3 finance/build_proforma.py

Blue cells are inputs. Black cells are formulas. Yellow cells are the two
switches: the growth case on Assumptions!B3 and whether your own time counts as
a cost on Costs!B3.
"""
import pathlib

from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter
from openpyxl.worksheet.datavalidation import DataValidation

OUT = pathlib.Path(__file__).resolve().parent / "TrueNorth-Pro-Forma.xlsx"
NAVY, SAND, BLUE, GREEN, GREY = "0F2742", "F6F1E7", "0000FF", "008000", "6B7280"

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
FILL_Y = PatternFill("solid", fgColor="FFFF00")
THIN = Side(style="thin", color="D7DEE7")
BOX = Border(top=THIN, bottom=THIN, left=THIN, right=THIN)
USD = '$#,##0;($#,##0);"-"'
USD2 = '$#,##0.00;($#,##0.00);"-"'
PCT = '0.0%;(0.0%);"-"'
NUM = '#,##0.0;(#,##0.0);"-"'
INT = '#,##0;(#,##0);"-"'
MULT = '0.0x'

wb = Workbook()


def sheet(t, widths):
    ws = wb.create_sheet(t)
    for i, w in enumerate(widths, 1):
        ws.column_dimensions[get_column_letter(i)].width = w
    return ws


def put(ws, row, col, v, font=F_N, fmt=None, fill=None, align=None, border=True):
    c = ws.cell(row=row, column=col, value=v)
    c.font = font
    if fmt: c.number_format = fmt
    if fill: c.fill = fill
    if align: c.alignment = Alignment(horizontal=align)
    if border: c.border = BOX
    return c


def head(ws, row, labels):
    for i, lab in enumerate(labels):
        c = ws.cell(row=row, column=1 + i, value=lab)
        c.font, c.fill, c.border = F_H, FILL_H, BOX
        c.alignment = Alignment(horizontal="center" if i else "left", vertical="center", wrap_text=True)
    ws.row_dimensions[row].height = 26


def section(ws, row, text, span=6):
    for col in range(1, span + 1):
        c = ws.cell(row=row, column=col)
        c.fill, c.border = FILL_SAND, BOX
        if col == 1:
            c.value, c.font = text, F_SUB
    return row + 1


# ─────────────────────────────── Read Me
ws = sheet("Read Me", [104])
ws["A1"] = "TrueNorth — Brokerage and Property Management Pro Forma"
ws["A1"].font = F_TITLE
for i, line in enumerate([
    "",
    "THE MODEL",
    "$29 per agent per month. $399 per closed transaction. You shoot listing media yourself and the",
    "brokerage absorbs the $65 edit. Flyers and signage are sold to the agent at cost plus a markup.",
    "Agents carry their own E&O, dues, MLS, and e-signature.",
    "",
    "TWO SWITCHES",
    "  Assumptions!B3   Conservative, Modest, or Aggressive growth.",
    "  Costs!B3         Whether your own hours count as a cost. 1 = yes, and that is the honest view.",
    "",
    "WHAT IT SAYS AT THE MODEST CASE",
    "Fixed costs are $350 a month. Break-even is under 2 agents on cash, 2.5 with your time costed.",
    "You and your mother clear that on day one. Year-1 cash profit lands near $14,000 and year 2 opens",
    "at roughly a $24,000 run rate.",
    "",
    "THREE THINGS THE MODEL CANNOT ENFORCE",
    "  1. Escrow reconciliation. Rule 61J2-14.012 requires a signed monthly reconciliation of every",
    "     escrow account whether or not you pay a bookkeeper. Calendar it for the 5th and keep five",
    "     years of signed statements.",
    "  2. One-time legal. There is no retainer in this budget, and there should not be. Budget $800",
    "     to $1,500 once, for an attorney to read the independent contractor agreement and the packet",
    "     before your first agent signs.",
    "  3. Bodily injury. E&O does not cover someone tripping at your open house. General liability is",
    "     $400-700 a year. Revisit before you host one.",
    "",
    "AND ONE THAT RETURNS",
    "Association and MLS dues are prepaid through 2027, so they read as zero here. They are a real",
    "$85 a month that reappears in 2028. Break-even goes to 2.2 agents when it does.",
], start=3):
    c = ws.cell(row=i, column=1, value=line)
    c.font = F_SUB if line and line.isupper() else F_N

# ─────────────────────────────── Assumptions
ws = sheet("Assumptions", [38, 14, 14, 14, 14, 52])
put(ws, 1, 1, "Assumptions", F_TITLE, border=False)
put(ws, 3, 1, "Growth case", F_B)
put(ws, 3, 2, "Modest", F_IN, fill=FILL_Y, align="center")
dv = DataValidation(type="list", formula1='"Conservative,Modest,Aggressive"')
ws.add_data_validation(dv); dv.add(ws["B3"])

r = 5
head(ws, r, ["Driver", "Conservative", "Modest", "Aggressive", "Active", "Note"]); r += 1
drivers = [
    ("Agents at start", 2, 2, 2, INT, "You and your mother."),
    ("Net new agents per month, months 1-12", 0.5, 1.0, 2.0, NUM, "Recruiting pace. One a month is believable for a new brokerage with this pitch."),
    ("Net new agents per month, months 13-24", 1.0, 2.0, 3.5, NUM, ""),
    ("Annual agent attrition", 0.20, 0.25, 0.30, PCT, "Faster recruiting usually means looser screening."),
    ("Transactions per agent per month", 0.35, 0.50, 0.70, NUM, "0.5 is six closings a year per agent."),
    ("Share of transactions that are listing side", 0.35, 0.45, 0.55, PCT, "Listings cost you camera time."),
    ("Media attach rate on listings", 1.00, 0.85, 0.75, PCT, "Not every listing needs video."),
    ("PM doors at start", 3, 5, 8, INT, ""),
    ("PM doors added per month", 1.0, 2.0, 3.5, NUM, "The asset. See PM and EV."),
    ("PM monthly fee per door", 129, 149, 169, USD, ""),
]
d0 = r
for name, a, b, c_, fmt, note in drivers:
    put(ws, r, 1, name, F_N)
    put(ws, r, 2, a, F_IN, fmt); put(ws, r, 3, b, F_IN, fmt); put(ws, r, 4, c_, F_IN, fmt)
    put(ws, r, 5, f"=INDEX(B{r}:D{r},MATCH($B$3,$B$5:$D$5,0))", F_B, fmt)
    put(ws, r, 6, note, F_NOTE); r += 1
A = {n: f"Assumptions!$E${d0+i}" for i, (n, *_x) in enumerate(drivers)}
ws.freeze_panes = "A6"

r += 1
r = section(ws, r, "Pricing")
price0 = r
for name, v, fmt, note in [
    ("Monthly fee per agent", 29, USD, "Your number."),
    ("Transaction fee", 399, USD, "Your number. Charged on every closed side."),
    ("Media fee charged to the agent", 0, USD, "Currently none. Every $50 here adds about $0.5k a year at 12 agents."),
]:
    put(ws, r, 1, name, F_N); put(ws, r, 2, v, F_IN, fmt); put(ws, r, 6, note, F_NOTE); r += 1
P = {k: f"Assumptions!$B${price0+i}" for i, k in enumerate(["monthly", "txn", "media_fee"])}

# ─────────────────────────────── Costs
ws = sheet("Costs", [40, 14, 58])
put(ws, 1, 1, "Costs", F_TITLE, border=False)
put(ws, 3, 1, "Count your own time as a cost?", F_B)
put(ws, 3, 2, 1, F_IN, INT, fill=FILL_Y, align="center")
put(ws, 3, 3, "1 = yes, the honest view. 0 = cash only.", F_NOTE)
TIME_ON = "Costs!$B$3"

r = 5
r = section(ws, r, "Fixed monthly", 3)
f0 = r
for name, v, note in [
    ("Brokerage E&O policy", 80, "Your quoted premium. Agents carry their own on top."),
    ("General liability", 0, "Declined. E&O does not cover bodily injury at an open house."),
    ("Association and MLS dues", 0, "Prepaid through 2027. Real cost is about $85/month and returns in 2028."),
    ("Bookkeeping", 0, "In-house. Escrow still needs a signed monthly reconciliation."),
    ("Legal retainer", 0, "None. Budget $800-1,500 once for the ICA and packet review."),
    ("DocuSign Business Pro, one seat", 45, "Only for the agent-packet PowerForm."),
    ("Email", 0, "Outlook, prepaid for the year. Agent aliases forward free."),
    ("Website hosting and domain", 0, "Vercel free tier."),
    ("Banking and escrow fees", 25, "Often $0 with the right business account."),
    ("Recruiting and marketing", 200, "Discretionary. Your only throttle."),
]:
    put(ws, r, 1, name, F_N); put(ws, r, 2, v, F_IN, USD); put(ws, r, 3, note, F_NOTE); r += 1
put(ws, r, 1, "Total fixed monthly", F_B); put(ws, r, 2, f"=SUM(B{f0}:B{r-1})", F_B, USD)
FIXED = f"Costs!$B${r}"; r += 2

r = section(ws, r, "Per agent and per transaction", 3)
v0 = r
for name, v, fmt, note in [
    ("Email alias and admin, per agent per month", 0, USD, "Aliases forwarding to their own inbox cost nothing."),
    ("Banking and file handling, per transaction", 8, USD, "Cash cost."),
    ("Your admin time per transaction", 35, USD, "Compliance review and file handling, costed at your rate."),
]:
    put(ws, r, 1, name, F_N); put(ws, r, 2, v, F_IN, fmt); put(ws, r, 3, note, F_NOTE); r += 1
SEAT, TXN_CASH, TXN_TIME = (f"Costs!$B${v0}", f"Costs!$B${v0+1}", f"Costs!$B${v0+2}")
r += 1

r = section(ws, r, "Listing media — you shoot it", 3)
m0 = r
for name, v, fmt, note in [
    ("Editing per listing", 65, USD, "Your editor's rate. The only media cash cost the brokerage absorbs."),
    ("Your hours per listing", 2.5, NUM, "Drive, shoot, fly, upload, review."),
    ("Value of your hour", 75, USD, "What the hour is worth recruiting an agent or signing a door instead."),
]:
    put(ws, r, 1, name, F_N); put(ws, r, 2, v, F_IN, fmt); put(ws, r, 3, note, F_NOTE); r += 1
put(ws, r, 1, "Media cost per listing", F_B)
put(ws, r, 2, f"=B{m0}+IF({TIME_ON}=1,B{m0+1}*B{m0+2},0)", F_B, USD)
MEDIA = f"Costs!$B${r}"; r += 1
put(ws, r, 1, "Listings you can shoot per month", F_N); put(ws, r, 2, 10, F_IN, NUM)
put(ws, r, 3, "Above this you outsource at about $720, or stop taking listings.", F_NOTE)
CAP = f"Costs!$B${r}"; r += 1
put(ws, r, 1, "Outsourced package, if over capacity", F_N); put(ws, r, 2, 720, F_IN, USD)
OUTSOURCED = f"Costs!$B${r}"; r += 2

r = section(ws, r, "Add-ons sold at cost plus markup", 3)
a0 = r
for name, v, fmt, note in [
    ("Flyers — cost", 60, USD, ""),
    ("Sign and lockbox — cost", 85, USD, ""),
    ("Markup", 0.10, PCT, "Ten percent of about $130. A convenience, not a profit centre."),
    ("Share of listings buying flyers", 0.80, PCT, ""),
    ("Share buying sign and lockbox", 0.95, PCT, ""),
]:
    put(ws, r, 1, name, F_N); put(ws, r, 2, v, F_IN, fmt); put(ws, r, 3, note, F_NOTE); r += 1
put(ws, r, 1, "Add-on margin per listing", F_B)
put(ws, r, 2, f"=(B{a0}*B{a0+3}+B{a0+1}*B{a0+4})*B{a0+2}", F_B, USD2)
ADDON = f"Costs!$B${r}"

# ─────────────────────────────── P&L
ws = sheet("P&L", [34] + [11] * 24 + [13])
put(ws, 1, 1, "P&L — 24 months", F_TITLE, border=False)
put(ws, 2, 1, "Brokerage only. Property management is on PM and EV.", F_NOTE, border=False)
r = 4
put(ws, r, 1, "Month", F_B)
for m in range(1, 25):
    put(ws, r, 1 + m, m, F_B, INT, align="center")
put(ws, r, 26, "Total", F_B, align="center")
ws.freeze_panes = "B5"
r += 1


def prow(label, f, fmt=USD, bold=False, total=True):
    global r
    put(ws, r, 1, label, F_B if bold else F_N)
    for m in range(1, 25):
        put(ws, r, 1 + m, f(m, get_column_letter(1 + m)), F_B if bold else F_N, fmt)
    if total:
        put(ws, r, 26, f"=SUM(B{r}:Y{r})", F_B, fmt)
    this = r; r += 1
    return this


r = section(ws, r, "Volume", 26)
r_bop, r_eop = r, r + 1
put(ws, r_bop, 1, "Agents, start of month", F_N)
put(ws, r_eop, 1, "Agents, end of month", F_N)
for m in range(1, 25):
    L, prev = get_column_letter(1 + m), get_column_letter(m)
    put(ws, r_bop, 1 + m, (f"={A['Agents at start']}" if m == 1 else f"={prev}{r_eop}"), F_N, NUM)
    put(ws, r_eop, 1 + m,
        f"=MAX(0,{L}{r_bop}+IF({m}<=12,{A['Net new agents per month, months 1-12']},"
        f"{A['Net new agents per month, months 13-24']})-{L}{r_bop}*{A['Annual agent attrition']}/12)", F_N, NUM)
put(ws, r_eop, 26, f"=Y{r_eop}", F_B, NUM)
r = r_eop + 1
r_txn = prow("Closings", lambda m, L: f"={L}{r_eop}*{A['Transactions per agent per month']}", NUM)
r_list = prow("Listing-side closings", lambda m, L: f"={L}{r_txn}*{A['Share of transactions that are listing side']}", NUM)
r_media = prow("Listings you shoot", lambda m, L: (
    f"=MIN({L}{r_list}*{A['Media attach rate on listings']},{CAP})"), NUM)
r_over = prow("Listings outsourced over capacity", lambda m, L: (
    f"=MAX(0,{L}{r_list}*{A['Media attach rate on listings']}-{CAP})"), NUM)

r += 1
r = section(ws, r, "Revenue", 26)
r_r1 = prow("Membership fees", lambda m, L: f"={L}{r_eop}*{P['monthly']}")
r_r2 = prow("Transaction fees", lambda m, L: f"={L}{r_txn}*{P['txn']}")
r_r3 = prow("Media fees", lambda m, L: f"=({L}{r_media}+{L}{r_over})*{P['media_fee']}")
r_r4 = prow("Add-on margin", lambda m, L: f"={L}{r_list}*{ADDON}")
r_rev = prow("Total revenue", lambda m, L: f"=SUM({L}{r_r1}:{L}{r_r4})", bold=True)

r += 1
r = section(ws, r, "Costs", 26)
r_c1 = prow("Media", lambda m, L: f"={L}{r_media}*{MEDIA}+{L}{r_over}*{OUTSOURCED}")
r_c2 = prow("Per transaction", lambda m, L: f"={L}{r_txn}*({TXN_CASH}+IF({TIME_ON}=1,{TXN_TIME},0))")
r_c3 = prow("Per agent", lambda m, L: f"={L}{r_eop}*{SEAT}")
r_c4 = prow("Fixed overhead", lambda m, L: f"={FIXED}")
r_c5 = prow("Managing agent", lambda m, L: f"='Managing Agent'!{L}$30")
r_cost = prow("Total costs", lambda m, L: f"=SUM({L}{r_c1}:{L}{r_c5})", bold=True)

r += 1
r_eb = prow("Profit", lambda m, L: f"={L}{r_rev}-{L}{r_cost}", bold=True)
r_cum = prow("Cumulative", lambda m, L: (f"={L}{r_eb}" if m == 1 else f"={get_column_letter(m)}{r_eb+1}+{L}{r_eb}"),
             total=False, bold=True)
put(ws, r_cum, 26, f"=Y{r_cum}", F_B, USD)
PL = dict(eop=r_eop, txn=r_txn, eb=r_eb)

# ─────────────────────────────── Unit Economics
ws = sheet("Unit Economics", [46, 15, 52])
put(ws, 1, 1, "Unit economics", F_TITLE, border=False)
r = 3
r = section(ws, r, "Per transaction", 3)
put(ws, r, 1, "Transaction fee", F_N); put(ws, r, 2, f"={P['txn']}", F_LINK, USD2); r += 1
put(ws, r, 1, "Banking and file handling", F_N); put(ws, r, 2, f"=-{TXN_CASH}", F_LINK, USD2); r += 1
put(ws, r, 1, "Your admin time", F_N); put(ws, r, 2, f"=-IF({TIME_ON}=1,{TXN_TIME},0)", F_LINK, USD2); r += 1
put(ws, r, 1, "Managing agent override", F_N)
put(ws, r, 2, "=-'Managing Agent'!$B$5*'Managing Agent'!$B$6", F_LINK, USD2); r += 1
put(ws, r, 1, "Buyer-side contribution", F_B); put(ws, r, 2, f"=SUM(B{r-4}:B{r-1})", F_B, USD2)
buyer = r; r += 2
put(ws, r, 1, "Media cost", F_N); put(ws, r, 2, f"=-{MEDIA}*{A['Media attach rate on listings']}", F_LINK, USD2); r += 1
put(ws, r, 1, "Media fee charged", F_N); put(ws, r, 2, f"={P['media_fee']}", F_LINK, USD2); r += 1
put(ws, r, 1, "Add-on margin", F_N); put(ws, r, 2, f"={ADDON}", F_LINK, USD2); r += 1
put(ws, r, 1, "Listing-side contribution", F_B); put(ws, r, 2, f"=B{buyer}+SUM(B{r-3}:B{r-1})", F_B, USD2)
listing = r; r += 2
put(ws, r, 1, "Blended per transaction", F_B)
put(ws, r, 2, (f"=B{buyer}*(1-{A['Share of transactions that are listing side']})"
               f"+B{listing}*{A['Share of transactions that are listing side']}"), F_B, USD2)
blended = r; r += 2

r = section(ws, r, "Per agent", 3)
put(ws, r, 1, "Membership fee", F_N); put(ws, r, 2, f"={P['monthly']}", F_LINK, USD2); r += 1
put(ws, r, 1, "Seat cost", F_N); put(ws, r, 2, f"=-{SEAT}", F_LINK, USD2); r += 1
put(ws, r, 1, "Transaction contribution", F_N)
put(ws, r, 2, f"={A['Transactions per agent per month']}*B{blended}", F_LINK, USD2); r += 1
put(ws, r, 1, "Per agent per month", F_B); put(ws, r, 2, f"=SUM(B{r-3}:B{r-1})", F_B, USD2)
per_agent = r; r += 1
put(ws, r, 1, "Per agent per year", F_B); put(ws, r, 2, f"=B{per_agent}*12", F_B, USD2); r += 2

r = section(ws, r, "Break-even", 3)
put(ws, r, 1, "Fixed overhead", F_N); put(ws, r, 2, f"={FIXED}", F_LINK, USD)
fixed_row = r; r += 1
put(ws, r, 1, "Managing agent, year-1 average", F_N)
put(ws, r, 2, "=AVERAGE('Managing Agent'!B30:M30)", F_LINK, USD)
mgmt_row = r; r += 1
put(ws, r, 1, "Agents to break even", F_B)
put(ws, r, 2, f"=IF(B{per_agent}<=0,\"never\",(B{fixed_row}+B{mgmt_row})/B{per_agent})", F_B, NUM)
put(ws, r, 3, "You and your mother are two.", F_NOTE); r += 1
put(ws, r, 1, "Closings per month to break even", F_B)
put(ws, r, 2, f"=IF(B{blended}<=0,\"never\",(B{fixed_row}+B{mgmt_row})/B{blended})", F_B, NUM); r += 2

r = section(ws, r, "If you changed the monthly fee", 3)
head(ws, r, ["Monthly fee", "Per agent/mo", "Agents to break even"]); r += 1
for fee in (0, 19, 29, 49, 79):
    put(ws, r, 1, fee, F_IN, USD)
    put(ws, r, 2, f"=A{r}-{SEAT}+{A['Transactions per agent per month']}*$B${blended}", F_B, USD2)
    put(ws, r, 3, f"=IF(B{r}<=0,\"never\",($B${fixed_row}+$B${mgmt_row})/B{r})", F_B, NUM)
    r += 1

# ─────────────────────────────── Managing Agent
ws = sheet("Managing Agent", [34] + [11] * 24 + [13])
put(ws, 1, 1, "Paying the managing agent", F_TITLE, border=False)
put(ws, 2, 1, "Row 30 feeds the P&L.", F_NOTE, border=False)
put(ws, 3, 1, "Structure", F_B)
put(ws, 3, 2, "Override only", F_IN, fill=FILL_Y)
dv3 = DataValidation(type="list", formula1='"Override only,Override + base"')
ws.add_data_validation(dv3); dv3.add(ws["B3"])
r = 5
for name, v, fmt, note in [
    ("Override per closed transaction", 60, USD, "Paid on transactions closed by agents she recruited."),
    ("Share of closings credited to her", 0.70, PCT, "She recruits; you broker."),
    ("Mentor split, share of mentee commission", 0.20, PCT, "Paid by the MENTEE out of their commission. Not a brokerage cost."),
    ("Mentee transactions covered", 3, INT, ""),
    ("Share of new agents needing a mentor", 0.50, PCT, ""),
    ("Commission per side to the agent", 7750, USD, "2.5% of a $310k sale."),
    ("Monthly base, if selected", 1500, USD, "Read the warning below first."),
]:
    put(ws, r, 1, name, F_N); put(ws, r, 2, v, F_IN, fmt); put(ws, r, 4, note, F_NOTE); r += 1
I = {k: f"$B${5+i}" for i, k in enumerate(
    ["override", "share", "mentor_pct", "mentee_txns", "mentor_share", "commission", "base"])}
r += 1
put(ws, r, 1, "A fixed base is what can cost you the 1099", F_SUB, border=False); r += 1
for line in [
    "IRC s. 3508 requires substantially all of a licensee's pay to track output, not hours. A flat monthly",
    "base paid to a licensed agent cuts against that, and if her classification falls, every agent's is open",
    "to the same question. If you want to pay a base, pay it to an entity she forms for management services,",
    "under a separate agreement, away from her license income.",
]:
    put(ws, r, 1, line, F_NOTE, border=False); r += 1

r = 20
put(ws, r, 1, "Month", F_B)
for m in range(1, 25):
    put(ws, r, 1 + m, m, F_B, INT, align="center")
put(ws, r, 26, "Total", F_B, align="center")
r += 1


def mrow(label, f, fmt=USD, bold=False):
    global r
    put(ws, r, 1, label, F_B if bold else F_N)
    for m in range(1, 25):
        put(ws, r, 1 + m, f(m, get_column_letter(1 + m)), F_B if bold else F_N, fmt)
    put(ws, r, 26, f"=SUM(B{r}:Y{r})", F_B, fmt)
    this = r; r += 1
    return this


r_rtx = mrow("Closings by her recruits", lambda m, L: f"=P&L!{L}{PL['txn']}*{I['share']}", NUM)
r_ovr = mrow("Override earned", lambda m, L: f"={L}{r_rtx}*{I['override']}")
r_new = mrow("New agents this month", lambda m, L: (
    "=0" if m == 1 else f"=MAX(0,P&L!{L}{PL['eop']}-P&L!{get_column_letter(m)}{PL['eop']})"), NUM)
r_men = mrow("Mentor split, paid by mentees", lambda m, L: (
    f"={L}{r_new}*{I['mentor_share']}*{I['mentee_txns']}*{I['commission']}*{I['mentor_pct']}"))
r_bas = mrow("Base, if selected", lambda m, L: f'=IF($B$3="Override + base",{I["base"]},0)')

r = 30
put(ws, r, 1, "Cost to the brokerage", F_B)
for m in range(1, 25):
    L = get_column_letter(1 + m)
    put(ws, r, 1 + m, f"={L}{r_ovr}+{L}{r_bas}", F_B, USD)
put(ws, r, 26, f"=SUM(B{r}:Y{r})", F_B, USD)
r += 2
put(ws, r, 1, "What she earns, year 1", F_SUB, border=False); r += 1
put(ws, r, 1, "Her own closings per month", F_N)
put(ws, r, 2, f"={A['Transactions per agent per month']}", F_LINK, NUM); r += 1
put(ws, r, 1, "Her commission income", F_N); put(ws, r, 2, f"=B{r-1}*12*{I['commission']}", F_B, USD); r += 1
put(ws, r, 1, "Override and mentor income", F_N); put(ws, r, 2, "=SUM(B22:M22)+SUM(B24:M24)", F_B, USD); r += 1
put(ws, r, 1, "Fees she pays the brokerage", F_N)
put(ws, r, 2, f"=-(12*{P['monthly']}+B{r-3}*12*{P['txn']})", F_B, USD); r += 1
put(ws, r, 1, "Net to her", F_B); put(ws, r, 2, f"=B{r-3}+B{r-2}+B{r-1}", F_B, USD)

# ─────────────────────────────── PM and EV
ws = sheet("PM and EV", [42, 15, 15, 15, 50])
put(ws, 1, 1, "Property management and enterprise value", F_TITLE, border=False)
r = 3
r = section(ws, r, "Property management", 5)
put(ws, r, 1, "Doors at month 24", F_N)
put(ws, r, 2, f"={A['PM doors at start']}+{A['PM doors added per month']}*24", F_B, NUM); d24 = r; r += 1
put(ws, r, 1, "Monthly fee per door", F_N); put(ws, r, 2, f"={A['PM monthly fee per door']}", F_LINK, USD); r += 1
put(ws, r, 1, "Annual recurring revenue", F_B); put(ws, r, 2, f"=B{d24}*B{r-1}*12", F_B, USD); arr = r; r += 1
put(ws, r, 1, "Leasing fees per year", F_N)
put(ws, r, 2, f"=B{d24}*0.4*0.75*{A['PM monthly fee per door']}*6", F_IN, USD)
put(ws, r, 5, "Rough placeholder. Replace with your own turnover and leasing fee.", F_NOTE); lease = r; r += 1
put(ws, r, 1, "Direct cost share", F_N); put(ws, r, 2, 0.35, F_IN, PCT); cost_share = r; r += 1
put(ws, r, 1, "PM contribution per year", F_B)
put(ws, r, 2, f"=(B{arr}+B{lease})*(1-B{cost_share})", F_B, USD); r += 2

r = section(ws, r, "What each business is worth", 5)
head(ws, r, ["", "Low", "Mid", "High", "Basis"]); r += 1
put(ws, r, 1, "Brokerage multiple of profit", F_N)
for col, v in ((2, 1.5), (3, 2.5), (4, 3.5)):
    put(ws, r, col, v, F_IN, MULT)
put(ws, r, 5, "Small brokerages trade low. Rosters walk and fee income is not contracted.", F_NOTE)
bm = r; r += 1
put(ws, r, 1, "Brokerage profit, year 2", F_N)
put(ws, r, 2, f"=SUM('P&L'!N{PL['eb']}:Y{PL['eb']})", F_LINK, USD); be = r; r += 1
put(ws, r, 1, "Brokerage value", F_B)
for col in (2, 3, 4):
    put(ws, r, col, f"=MAX(0,$B${be}*{get_column_letter(col)}{bm})", F_B, USD)
bv = r; r += 2
put(ws, r, 1, "PM multiple of recurring revenue", F_N)
for col, v in ((2, 1.2), (3, 1.8), (4, 2.5)):
    put(ws, r, col, v, F_IN, MULT)
put(ws, r, 5, "Management contracts recur and transfer, so PM books trade on revenue.", F_NOTE)
pm = r; r += 1
put(ws, r, 1, "PM value", F_B)
for col in (2, 3, 4):
    put(ws, r, col, f"=$B${arr}*{get_column_letter(col)}{pm}", F_B, USD)
pv = r; r += 2
put(ws, r, 1, "Combined", F_B)
for col in (2, 3, 4):
    L = get_column_letter(col)
    put(ws, r, col, f"={L}{bv}+{L}{pv}", F_B, USD)
r += 1
put(ws, r, 1, "PM share of value", F_B)
for col in (2, 3, 4):
    L = get_column_letter(col)
    put(ws, r, col, f"=IFERROR({L}{pv}/({L}{bv}+{L}{pv}),0)", F_B, PCT)
put(ws, r, 5, "If most of the value is here, the brokerage's job is to feed this book.", F_NOTE)

del wb["Sheet"]
wb.save(OUT)
print(OUT)
