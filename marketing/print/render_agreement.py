"""
Property Management Agreement — owner-facing contract on TrueNorth letterhead,
built for e-signature (DocuSign, Dropbox Sign, Adobe Sign).

  management-agreement.pdf   8 pages, US Letter, vector text
  management-agreement.png   first-page preview

Every blank is a ruled box and every option is a square checkbox, so fields drop
straight onto them in DocuSign. Initial lines sit at the foot of each page.

Business terms live in the TERMS block below — change them there, not in the
body copy, and rerun.

    python3 marketing/print/render_agreement.py
"""
import pathlib
import sys
import tempfile

HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from render_print import BROKER_LICENSE, BROKERAGE, BROKERAGE_LICENSE, EMAIL, PHONE, ROOT, URL, chrome  # noqa: E402
from render import BASE_CSS, GOLD, H_LOGO, NAVY, SAND, SLATE  # noqa: E402

BROKER = "Alfredo Mirt"
OFFICE = "7629 Odessa Ct, Brooksville, FL 34613"
LEGAL_NAME, TRADE_NAME = BROKERAGE.split(" d/b/a ")

TERMS = {
    "initial_term_months": 12,
    "notice_days": 30,
    "founding_cancel_days": 90,
    "approval_threshold": "$300",
    "reserve": "$300",
    "leasing_fee": "75% of the first full month's rent ($795 minimum)",
    "renewal_fee": "$299",
    "markup": "10%",
    "disbursement_day": "10th",
    "plans": [
        ("Essential", "$99", "Core management: rent collection, statements, maintenance intake, lease enforcement."),
        ("Plus", "$149", "Adds inspections, priority maintenance, renewals, monthly performance snapshot."),
        ("Premier", "$229", "Adds enhanced inspections, advisory, capex planning, dedicated point of contact."),
    ],
}

PLAN_MATRIX = [
    ("Online rent collection and tenant reminders (RentRedi)", 1, 1, 1),
    ("Monthly owner statements in the owner portal", 1, 1, 1),
    ("Maintenance request intake, triage, and documentation", 1, 1, 1),
    ("Lease enforcement support and notice preparation", 1, 1, 1),
    ("Annual rent-strategy review", 1, 1, 1),
    ("Periodic property inspections", 0, "2 / yr", "4 / yr"),
    ("Priority maintenance coordination", 0, 1, 1),
    ("Owner approval thresholds you set", 0, 1, 1),
    ("Lease renewal management", 0, 1, 1),
    ("Monthly performance snapshot", 0, 1, 1),
    ("Rental performance advisory", 0, 0, 1),
    ("Capital expense and renewal planning support", 0, 0, 1),
    ("Dedicated point of contact", 0, 0, 1),
    ("End-of-year owner reporting support", 0, 0, 1),
]

SLAS = [
    ("Owner calls, texts, and emails", "Answered or returned within 1 business day"),
    ("Emergency maintenance (life safety or active property damage)", "Acknowledged within 2 hours, any hour, any day"),
    ("Non-emergency work orders", "Opened within 1 business day; vendor scheduled within 3 business days"),
    ("Rent posting", "Posted to the owner ledger within 1 business day of receipt"),
    ("Owner disbursement and monthly statement", f"Sent by the {TERMS['disbursement_day']} of each month"),
    ("Rent-ready property marketed", "Listed within 3 business days of rent-ready condition and photos"),
    ("Completed rental applications", "Screened and decided within 2 business days"),
    ("Tenant move-out accounting", "Deposit returned or claim notice sent within the deadlines in s. 83.49, Fla. Stat."),
]

ADDONS = [
    ("Additional property inspection, scheduled or on request", "$89 each"),
    ("Turn or renovation project coordination", f"{TERMS['markup']} of project cost"),
    ("Rent-ready coordination for a vacant property", "$149 per turn"),
    ("Hurricane season readiness visit and photo report", "$99 per visit"),
    ("Annual capital expense plan and budget", "$199 per year"),
    ("Portfolio reporting for 3+ properties", "$25 per month"),
    ("Utility placement and transfer coordination", "$75 per occurrence"),
    ("Insurance claim documentation support", "$125 per claim"),
]


def box(w="2.2in"):
    return f'<span class="fill" style="width:{w}"></span>'


def cb(label=""):
    return f'<span class="cb"></span>{f" {label}" if label else ""}'


def head(page_no, pages):
    return (
        f'<header><img src="{H_LOGO}" style="width:1.95in">'
        f'<div class="hmeta">{LEGAL_NAME}<br>d/b/a {TRADE_NAME}<br>'
        f'Brokerage License {BROKERAGE_LICENSE} · Broker License {BROKER_LICENSE}<br>'
        f'{OFFICE}<br>{PHONE} · {EMAIL} · {URL}</div></header>'
        f'<div class="rule"></div>'
    )


def foot(page_no, pages):
    return (
        f'<footer><span>Property Management Agreement · {TRADE_NAME}</span>'
        f'<span>Owner initials {box(".55in")} &nbsp; Broker initials {box(".55in")}</span>'
        f'<span>Page {page_no} of {pages}</span></footer>'
    )


def page(n, total, body):
    return f'<section class="sheet">{head(n, total)}<div class="body">{body}</div>{foot(n, total)}</section>'


def plan_rows():
    rows = ""
    for name, price, blurb in TERMS["plans"]:
        rows += (
            f'<tr><td style="width:.3in">{cb()}</td>'
            f'<td style="width:1.05in"><b>{name}</b></td>'
            f'<td style="width:.95in">{price} / month</td>'
            f'<td>{blurb}</td>'
            f'<td style="width:1.35in">Agreed fee: ${box(".7in")}</td></tr>'
        )
    rows += (
        f'<tr><td>{cb()}</td><td><b>Leasing Only</b></td><td>See §7</td>'
        f'<td>Tenant placement for an owner who self-manages day to day. No monthly management fee.</td>'
        f'<td>Fee: {box(".95in")}</td></tr>'
    )
    return rows


def matrix_rows():
    out = ""
    for label, e, p, pr in PLAN_MATRIX:
        cells = "".join(
            f'<td class="c">{"●" if v == 1 else ("—" if v == 0 else v)}</td>' for v in (e, p, pr)
        )
        out += f"<tr><td>{label}</td>{cells}</tr>"
    return out


def addon_rows():
    return "".join(
        f'<tr><td style="width:.3in">{cb()}</td><td>{label}</td>'
        f'<td style="width:1.15in" class="c">{fee}</td>'
        f'<td style="width:1.1in">or ${box(".6in")}</td></tr>'
        for label, fee in ADDONS
    )


def sla_rows():
    return "".join(f"<tr><td>{what}</td><td>{when}</td></tr>" for what, when in SLAS)


S_HEADER = f"""
<h1>Exclusive Property Management Agreement</h1>
<p class="lede">This Agreement is between the Owner identified below and {LEGAL_NAME}, a Florida licensed real estate
brokerage doing business as {TRADE_NAME} (&ldquo;Broker&rdquo; or &ldquo;TrueNorth&rdquo;), Florida brokerage license
{BROKERAGE_LICENSE}, whose principal broker is {BROKER}, Florida broker license {BROKER_LICENSE}.</p>

<h2>1. Owner and property</h2>
<table class="form">
  <tr><td>Owner name(s), as title is held<div>{box("3.1in")}</div></td>
      <td>Entity type, if any<div>{box("2.3in")}</div></td></tr>
  <tr><td>Mailing address<div>{box("3.1in")}</div></td>
      <td>Owner phone<div>{box("2.3in")}</div></td></tr>
  <tr><td>Owner email (statements and notices are sent here)<div>{box("3.1in")}</div></td>
      <td>Taxpayer ID on file (W-9)<div>{cb("Yes")} &nbsp; {cb("To follow")}</div></td></tr>
  <tr><td colspan="2">Property address, including unit<div>{box("5.8in")}</div></td></tr>
  <tr><td>Beds / baths / square feet<div>{box("1.6in")}</div></td>
      <td>Additional properties on Exhibit A<div>{cb("Yes")} &nbsp; {cb("No")}</div></td></tr>
  <tr><td>Property status at signing<div>{cb("Vacant")} &nbsp; {cb("Tenant in place")} &nbsp; {cb("Owner occupied")}</div></td>
      <td>Target or current monthly rent<div>${box("1.3in")}</div></td></tr>
  <tr><td>Agreement start date<div>{box("1.6in")}</div></td>
      <td>HOA or condo association<div>{cb("Yes")} &nbsp; {cb("No")} &nbsp; Name: {box("1.1in")}</div></td></tr>
</table>

<h2>2. Appointment</h2>
<p>Owner appoints TrueNorth as the exclusive agent to lease, manage, and operate the property described above (the
&ldquo;Property&rdquo;) on the terms in this Agreement, and grants TrueNorth the authority described in §10. TrueNorth
accepts the appointment and will perform its duties in accordance with Chapter 475, Florida Statutes, the rules of the
Florida Real Estate Commission, Chapter 83, Florida Statutes, and applicable fair housing law.</p>

<h2>3. Term, renewal, and termination</h2>
<p><b>Initial term.</b> {TERMS["initial_term_months"]} months from the start date above. After that, this Agreement
continues month to month until either party ends it.</p>
<p><b>Ending the Agreement.</b> Either party may end it with {TERMS["notice_days"]} days&rsquo; written notice after the
initial term. Either party may end it immediately for a material breach the other party has not cured within 10 days of
written notice.</p>
<p><b>Founding Owner cancellation.</b> {cb("Founding Owner terms apply")} — Owner may cancel within
{TERMS["founding_cancel_days"]} days of the start date for any reason, with no termination fee. Leasing fees already
earned for a tenant placed by TrueNorth are not refunded.</p>
<p><b>On termination.</b> Within 14 days TrueNorth will deliver to Owner or Owner&rsquo;s new agent: all security
deposits and other tenant funds held, less amounts properly owed; keys and access devices; copies of leases,
applications, inspection reports, and maintenance records; and a final accounting. Owner remains responsible for
obligations incurred before termination, including vendor invoices for work already performed.</p>
<p><b>Sale of the Property.</b> Owner may sell at any time. If the Property sells with a tenant in place, this Agreement
ends at closing and TrueNorth will transfer deposits and records to the buyer or the buyer&rsquo;s agent. This Agreement
does not give TrueNorth a listing right, and no sales commission is owed under it.</p>
"""

S_PLANS = f"""
<h2>4. Service plan selected</h2>
<p class="note">Check one. Monthly fees are per property. Plan prices are the standard rate; the agreed fee controls if a
different amount is written in.</p>
<table class="tbl">{plan_rows()}</table>

<h2>5. What each plan includes</h2>
<table class="tbl matrix">
  <tr class="hd"><td>Service</td><td class="c">Essential</td><td class="c">Plus</td><td class="c">Premier</td></tr>
  {matrix_rows()}
</table>
"""

S_ADDONS = f"""
<h2>6. Add-on services</h2>
<p class="note">Check any that apply. Fees are charged only when the service is performed, and appear on the monthly
statement. Write a different amount in the right column to override.</p>
<table class="tbl">{addon_rows()}</table>

<h2>7. Fees</h2>
<table class="tbl">
  <tr class="hd"><td>Fee</td><td style="width:2.5in">Amount</td><td style="width:2.1in">When it is charged</td></tr>
  <tr><td>Monthly management fee</td><td>As selected in §4</td><td>Monthly, from collected rent</td></tr>
  <tr><td>Vacancy</td><td><b>No management fee while the Property is vacant</b></td><td>Fee resumes when rent is collected</td></tr>
  <tr><td>Tenant placement (leasing)</td><td>{TERMS["leasing_fee"]}</td><td>From the first month&rsquo;s rent</td></tr>
  <tr><td>Lease renewal</td><td>{TERMS["renewal_fee"]} per renewal</td><td>Month the renewal is signed</td></tr>
  <tr><td>Maintenance coordination</td><td>{TERMS["markup"]} of third-party repair invoices</td><td>With the repair invoice</td></tr>
  <tr><td>Eviction coordination</td><td>No TrueNorth fee. Attorney and court costs are Owner&rsquo;s expense.</td><td>As incurred</td></tr>
  <tr><td>Add-on services</td><td>As selected in §6</td><td>When performed</td></tr>
  <tr><td>Setup fee</td><td>None</td><td>&mdash;</td></tr>
</table>
<p><b>Tenant-paid late fees and pet fees belong to Owner</b> and are credited to Owner&rsquo;s account, not retained by
TrueNorth. Application fees are retained by the screening provider and TrueNorth to cover screening costs.</p>
"""

S_MONEY = f"""
<h2>8. Money: collection, reserve, and payment to Owner</h2>
<p><b>Maintenance markup disclosure.</b> TrueNorth adds {TERMS["markup"]} to third-party repair invoices as
compensation for sourcing, scheduling, and documenting the work. This markup is disclosed here, appears on the monthly
statement, and is in addition to the monthly management fee.</p>
<p><b>Rent and trust funds.</b> TrueNorth collects rent and holds all Owner and tenant funds in the brokerage&rsquo;s
property management escrow account at a Florida banking institution, as required by s. 475.25(1)(k), Florida Statutes,
and Rule 61J2-14, Florida Administrative Code. Owner funds are not commingled with TrueNorth&rsquo;s operating funds.</p>
<p><b>Security deposits and advance rent.</b> Deposits are held and accounted for under s. 83.49, Florida Statutes,
including the written notice to the tenant within 30 days of receipt, and are returned or claimed against within the
deadlines that statute sets. Owner authorizes TrueNorth to hold deposits in the brokerage escrow account.</p>
<p><b>Owner reserve.</b> Owner will maintain a reserve of {TERMS["reserve"]} per property, funded at signing or from the
first rent collected, and replenished from rent each month. The reserve covers routine repairs and small expenses so
work is not delayed.</p>
<p><b>Disbursement.</b> TrueNorth pays Owner by the {TERMS["disbursement_day"]} of each month by direct deposit, for
rent collected and cleared in the prior month, less the management fee, approved expenses, and the reserve. A statement
accompanies every disbursement.</p>
<p><b>Shortfalls.</b> If expenses exceed collected rent, Owner will fund the difference within 10 days of a written
request. TrueNorth is not required to advance its own funds.</p>
<p><b>Year end.</b> TrueNorth provides an annual statement and issues Form 1099-MISC reporting rents paid to Owner.
Owner must keep a current Form W-9 on file.</p>
"""

S_SLA = f"""
<h2>9. Service commitments</h2>
<table class="tbl">
  <tr class="hd"><td>What</td><td style="width:3.2in">Commitment</td></tr>
  {sla_rows()}
</table>
<p><b>If TrueNorth misses a commitment.</b> If TrueNorth sends the monthly statement or disbursement more than 3
business days late, or fails to acknowledge a reported emergency within 2 hours, Owner receives a credit of 25% of that
month&rsquo;s management fee, applied to the next statement. Owner must request the credit within 60 days. This credit is
Owner&rsquo;s exclusive remedy for a missed commitment and does not apply to delays caused by Owner, a tenant, a vendor,
a utility, a government office, or a weather event.</p>
"""

S_AUTHORITY = f"""
<h2>10. TrueNorth&rsquo;s authority</h2>
<p>Owner authorizes TrueNorth, as Owner&rsquo;s agent, to: advertise and market the Property; set and adjust asking rent
after consulting Owner; screen applicants against written, uniformly applied criteria; sign leases, renewals, addenda,
and move-in and move-out documents on Owner&rsquo;s behalf for terms of 12 months or less; collect rent, deposits, and
fees; serve notices permitted by Chapter 83, Florida Statutes, including notices for nonpayment and lease violations;
hire and pay licensed and insured vendors within the limits in §11; refer eviction matters to an attorney selected or
approved by Owner, and coordinate documents and testimony; and endorse and deposit checks payable to Owner for rent and
related amounts into the escrow account.</p>
<p>Leases longer than 12 months, Property sales, mortgages, and capital projects over {TERMS["approval_threshold"]}
require Owner&rsquo;s written approval.</p>

<h2>11. Maintenance and repairs</h2>
<p><b>Approval threshold.</b> TrueNorth may authorize repairs up to {TERMS["approval_threshold"]} per occurrence without
prior approval. Above that amount, TrueNorth obtains Owner&rsquo;s approval first. Owner may set a different threshold
here: ${box("0.8in")}</p>
<p><b>Emergencies.</b> TrueNorth may exceed the threshold without prior approval when needed to protect life, safety, or
the Property from imminent damage, or to meet Owner&rsquo;s obligations under s. 83.51, Florida Statutes. TrueNorth will
notify Owner as soon as practical and document the work.</p>
<p><b>Vendors.</b> TrueNorth uses licensed and insured vendors where the law requires a license. Vendors are independent
contractors, not TrueNorth employees, and TrueNorth is not liable for their work beyond selecting them with reasonable
care and documenting the job.</p>
<p><b>Owner-preferred vendors.</b> Owner may list preferred vendors on Exhibit B. If an Owner-preferred vendor is slower
than normal or unavailable in an emergency, TrueNorth may use another vendor.</p>
"""

S_OWNER = f"""
<h2>12. Owner&rsquo;s obligations</h2>
<p>Owner will: deliver the Property in a condition that meets s. 83.51, Florida Statutes, including working smoke
detectors, and keep it that way; maintain landlord or dwelling-fire insurance with at least $300,000 of liability
coverage and name {LEGAL_NAME} as an additional insured, and give TrueNorth a certificate at signing and at each
renewal; pay the mortgage, property taxes, HOA or condominium assessments, and insurance premiums; provide keys, access
codes, warranties, appliance manuals, and HOA or condominium rules; disclose known material defects; provide the federal
lead-based-paint disclosure and pamphlet for any dwelling built before 1978; keep a current W-9 on file; respond to
approval requests within 2 business days; and refrain from contacting or negotiating with tenants directly about
tenancy matters, routing those through TrueNorth instead.</p>
<p>Owner represents that Owner holds title or has authority to enter this Agreement, and that no undisclosed lease,
listing, or management agreement covers the Property.</p>

<h2>13. Fair housing and nondiscrimination</h2>
<p>Both parties comply with the federal Fair Housing Act, the Florida Fair Housing Act, and all applicable state and
local fair housing law. TrueNorth applies written screening criteria uniformly to every applicant and accommodates
assistance and service animals as the law requires. Owner may not instruct TrueNorth to take any action that would
violate fair housing law, and TrueNorth will not follow such an instruction.</p>

<h2>14. Insurance, indemnity, and limits on liability</h2>
<p><b>TrueNorth&rsquo;s coverage.</b> TrueNorth maintains errors and omissions coverage and general liability coverage,
and will provide a certificate on request.</p>
<p><b>Owner indemnity.</b> Owner will indemnify, defend, and hold TrueNorth and its personnel harmless from claims,
damages, costs, and reasonable attorney&rsquo;s fees arising out of the Property or this Agreement, including claims for
personal injury or property damage, except to the extent caused by TrueNorth&rsquo;s negligence, willful misconduct, or
violation of law.</p>
<p><b>TrueNorth indemnity.</b> TrueNorth will indemnify, defend, and hold Owner harmless from claims arising out of
TrueNorth&rsquo;s negligence, willful misconduct, or violation of law in performing this Agreement.</p>
<p><b>Limitation.</b> Except for TrueNorth&rsquo;s fraud, willful misconduct, or mishandling of escrow funds,
TrueNorth&rsquo;s total liability under this Agreement is limited to the management fees Owner paid in the 12 months
before the claim. Neither party is liable for lost profits or other indirect damages.</p>
<p><b>No guarantee.</b> TrueNorth does not guarantee tenant performance, occupancy, rent levels, or that a tenant will
not damage the Property.</p>
"""

S_GENERAL = f"""
<h2>15. Records, privacy, and data</h2>
<p>TrueNorth keeps the books, accounts, and records this Agreement generates for at least 5 years, as s. 475.5015,
Florida Statutes, requires, and makes them available to Owner on reasonable request and to the Department of Business
and Professional Regulation as the law requires. Applicant and tenant information is confidential and is handled under
applicable privacy law, including s. 501.171, Florida Statutes. Owner will keep tenant information confidential and use
it only to own and operate the Property.</p>

<h2>16. Relationship of the parties</h2>
<p>TrueNorth is an independent contractor, not Owner&rsquo;s employee, partner, or joint venturer. TrueNorth acts as
Owner&rsquo;s agent for leasing and managing the Property. TrueNorth is a licensed real estate brokerage, not a law firm,
an accounting firm, or an insurer, and does not give legal, tax, or investment advice. Legal services are provided only
by licensed attorneys.</p>

<h2>17. Disputes, governing law, and notices</h2>
<p>Florida law governs this Agreement, and venue for any action is Hernando County, Florida. Before filing suit, the
parties will attempt in good faith to resolve the dispute, and will mediate with a Florida certified circuit civil
mediator, splitting the mediator&rsquo;s fee. The prevailing party in any action to enforce this Agreement is entitled to
reasonable attorney&rsquo;s fees and costs.</p>
<p>Notices must be in writing and are effective when sent to the email addresses in §1 and in the signature block, or
when delivered by hand or by a national overnight carrier to the addresses listed. A party may change its address by
notice.</p>

<h2>18. General</h2>
<p>This Agreement, with its exhibits, is the entire agreement between the parties about the Property and replaces any
earlier understanding. It may be amended only in a writing signed by both parties. If any provision is unenforceable,
the rest stays in force. Neither party may assign this Agreement without the other&rsquo;s written consent, except that
TrueNorth may assign it to a successor brokerage that assumes its obligations. This Agreement binds the parties&rsquo;
heirs, successors, and permitted assigns. Nothing in this Agreement waives any right or obligation under Chapter 475 or
Chapter 83, Florida Statutes.</p>
<p>This Agreement may be signed in counterparts and delivered electronically. Electronic signatures are valid and
enforceable under the federal E-SIGN Act and s. 668.50, Florida Statutes, and have the same effect as ink signatures.</p>

<h2>19. Acknowledgment</h2>
<p>{cb()} Owner has read this Agreement, including the maintenance markup disclosure in §8 and the limits on liability
in §14, and has had the opportunity to review it with an attorney of Owner&rsquo;s choosing.</p>
"""

S_SIGN = f"""
<h2>20. Signatures</h2>
<div class="sigwrap">
  <div class="sigcol">
    <div class="sighd">Owner</div>
    <div class="sigline">{box("2.9in")}<span>Signature</span></div>
    <div class="sigline">{box("2.9in")}<span>Printed name and title</span></div>
    <div class="sigline">{box("2.9in")}<span>Date</span></div>
    <div class="sigline">{box("2.9in")}<span>Email for notices</span></div>
  </div>
  <div class="sigcol">
    <div class="sighd">Second owner, if title is held jointly</div>
    <div class="sigline">{box("2.9in")}<span>Signature</span></div>
    <div class="sigline">{box("2.9in")}<span>Printed name and title</span></div>
    <div class="sigline">{box("2.9in")}<span>Date</span></div>
    <div class="sigline">{box("2.9in")}<span>Email for notices</span></div>
  </div>
</div>
<div class="sigwrap" style="margin-top:.3in">
  <div class="sigcol">
    <div class="sighd">{LEGAL_NAME} d/b/a {TRADE_NAME}</div>
    <div class="sigline">{box("2.9in")}<span>Signature</span></div>
    <div class="sigline">{box("2.9in")}<span>{BROKER}, Licensed Real Estate Broker ({BROKER_LICENSE})</span></div>
    <div class="sigline">{box("2.9in")}<span>Date</span></div>
    <div class="sigline"><span>{OFFICE} · {PHONE} · {EMAIL}</span></div>
  </div>
  <div class="sigcol">
    <div class="sighd">Attachments</div>
    <p class="note">{cb("Exhibit A — Additional properties")}<br>
      {cb("Exhibit B — Property details, access, insurance, vendors")}<br>
      {cb("Founding Owner Offer Addendum")}<br>
      {cb("Lead-based paint disclosure (pre-1978 dwellings)")}<br>
      {cb("W-9")} &nbsp; {cb("Insurance certificate")} &nbsp; {cb("Keys received")}</p>
  </div>
</div>
"""

EX_ROWS = "".join(
    f'<tr><td class="c">{i}</td><td>{box("2.4in")}</td><td>{box("0.95in")}</td><td>{box("0.8in")}</td>'
    f'<td>{cb("Ess")} {cb("Plus")} {cb("Prem")}</td><td>${box(".6in")}</td></tr>'
    for i in range(1, 9)
)

S_EXA = f"""
<h2>Exhibit A — Additional properties</h2>
<p class="note">Each property listed here is covered by this Agreement on the same terms, at the plan and fee shown.</p>
<table class="tbl">
  <tr class="hd"><td class="c" style="width:.35in">#</td><td>Property address</td><td style="width:1.1in">Beds / baths</td>
      <td style="width:.95in">Monthly rent</td><td style="width:1.5in">Plan</td><td style="width:.95in">Fee</td></tr>
  {EX_ROWS}
</table>
"""

S_EXB = f"""
<h2>Exhibit B — Property details, access, insurance, and vendors</h2>
<table class="form">
  <tr><td>Insurance carrier<div>{box("2.6in")}</div></td><td>Policy number<div>{box("2.6in")}</div></td></tr>
  <tr><td>Policy expiration<div>{box("2.6in")}</div></td><td>Agent name and phone<div>{box("2.6in")}</div></td></tr>
  <tr><td>Home warranty, if any<div>{box("2.6in")}</div></td><td>Warranty claim number<div>{box("2.6in")}</div></td></tr>
  <tr><td>HOA or condo contact<div>{box("2.6in")}</div></td><td>HOA approval needed to lease<div>{cb("Yes")} &nbsp; {cb("No")}</div></td></tr>
  <tr><td>Keys and access devices provided<div>{box("2.6in")}</div></td><td>Gate or alarm codes<div>{box("2.6in")}</div></td></tr>
  <tr><td>Lawn care included in rent<div>{cb("Yes")} &nbsp; {cb("No")}</div></td><td>Pool service included in rent<div>{cb("Yes")} &nbsp; {cb("No")}</div></td></tr>
  <tr><td>Pets allowed<div>{cb("Yes")} &nbsp; {cb("No")} &nbsp; {cb("Case by case")}</div></td><td>Pet restrictions<div>{box("2.6in")}</div></td></tr>
  <tr><td>Built before 1978<div>{cb("Yes")} &nbsp; {cb("No")}</div></td><td>Known material defects<div>{box("2.6in")}</div></td></tr>
  <tr><td colspan="2">Owner-preferred vendors (trade, company, phone)<div>{box("5.8in")}</div><div>{box("5.8in")}</div></td></tr>
  <tr><td colspan="2">Owner goals and notes<div>{box("5.8in")}</div><div>{box("5.8in")}</div></td></tr>
</table>
"""

def _split(block, marker):
    head, tail = block.split(marker, 1)
    return head, marker + tail


S_INTRO, S_TERM = _split(S_HEADER, "<h2>3. Term")
S_PLAN, S_MATRIX = _split(S_PLANS, "<h2>5. What each plan includes")
S_ADD, S_FEES = _split(S_ADDONS, "<h2>7. Fees")

PAGES = [S_INTRO, S_TERM + S_PLAN, S_MATRIX + S_ADD, S_FEES, S_MONEY, S_SLA,
         S_AUTHORITY, S_OWNER, S_GENERAL, S_SIGN, S_EXA, S_EXB]


def document(only=None):
    total = len(PAGES)
    pick = [(i, PAGES[i - 1]) for i in (only or range(1, total + 1))]
    sheets = "".join(page(i, total, body) for i, body in pick)
    return f"""<!doctype html><html><head><meta charset="utf-8"><style>{BASE_CSS}
@page{{size:8.5in 11in;margin:0}}
html,body{{width:8.5in;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact;overflow:visible}}
body{{color:#1F2937;font-size:8.6pt;line-height:1.46}}
.sheet{{position:relative;width:8.5in;height:11in;padding:.5in .6in .55in;display:flex;flex-direction:column;
  page-break-after:always;overflow:hidden}}
.sheet:last-child{{page-break-after:auto}}
header{{display:flex;justify-content:space-between;align-items:flex-start;gap:.3in}}
.hmeta{{text-align:right;font-size:6.6pt;line-height:1.5;color:{SLATE}}}
.rule{{height:1.6pt;background:{GOLD};margin:.1in 0 .16in}}
.body{{flex:1}}
h1{{font-family:'Fraunces',Georgia,serif;font-size:19pt;font-weight:500;color:{NAVY};letter-spacing:-.01em;margin-bottom:.08in}}
h2{{font-family:'Fraunces',Georgia,serif;font-size:11pt;font-weight:600;color:{NAVY};margin:.13in 0 .05in}}
p{{margin-bottom:.07in}}
.lede{{font-size:9pt;color:#334155}}
.note{{font-size:7.6pt;color:{SLATE};margin-bottom:.06in}}
b{{font-weight:600;color:{NAVY}}}
.fill{{display:inline-block;border-bottom:.75pt solid #9CA3AF;height:11pt;vertical-align:-3pt}}
.cb{{display:inline-block;width:9.5pt;height:9.5pt;border:.9pt solid #6B7280;border-radius:1.5pt;vertical-align:-1.5pt}}
table{{width:100%;border-collapse:collapse}}
.tbl td{{border:.5pt solid #D7DEE7;padding:2.5pt 4.5pt;vertical-align:top}}
.tbl .hd td{{background:{SAND};font-weight:600;color:{NAVY}}}
.tbl tr:nth-child(even) td{{background:#FBFCFD}}
.grid .hd td,.grid tr:nth-child(even) .c{{}}
.matrix td{{padding:1.9pt 4.5pt}}
.c{{text-align:center}}
.form td{{padding:3pt 10pt 7pt 0;vertical-align:top;width:50%;font-size:7.4pt;color:{SLATE}}}
.form td div{{margin-top:1pt}}
footer{{display:flex;justify-content:space-between;align-items:flex-end;border-top:.5pt solid #D7DEE7;
  padding-top:5pt;font-size:6.6pt;color:{SLATE}}}
.sigwrap{{display:flex;gap:.4in}}
.sigcol{{flex:1}}
.sighd{{font-weight:600;color:{NAVY};font-size:8.6pt;margin-bottom:.1in}}
.sigline{{margin-bottom:.16in}}
.sigline span{{display:block;font-size:6.8pt;color:{SLATE};margin-top:2pt}}
</style></head><body>{sheets}</body></html>"""


def render():
    name = "management-agreement"
    with tempfile.TemporaryDirectory() as tmp:
        html = pathlib.Path(tmp) / f"{name}.html"
        html.write_text(document(), encoding="utf-8")
        common = ["--headless=new", "--disable-gpu", "--hide-scrollbars", f"--user-data-dir={tmp}/profile",
                  "--allow-file-access-from-files", "--virtual-time-budget=12000"]
        pdf = HERE / f"{name}.pdf"
        chrome(common + ["--no-pdf-header-footer", f"--print-to-pdf={pdf}", html.as_uri()], pdf)
        png = HERE / f"{name}.png"
        chrome(common + ["--force-device-scale-factor=1.6", "--window-size=816,1056",
                         f"--screenshot={png}", html.as_uri()], png)
        print(pdf.relative_to(ROOT))
        print(png.relative_to(ROOT))


if __name__ == "__main__":
    render()
