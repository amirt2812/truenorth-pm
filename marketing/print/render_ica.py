"""
Independent Contractor Agreement — brokerage and licensee.

  independent-contractor-agreement.pdf / .png    6 pages, US Letter

Built so 1099 treatment actually holds up: it states the three things IRC s.
3508 requires of a "qualified real estate agent," and the written, commission-
only election that keeps a licensee outside the workers' compensation
definition of employee under s. 440.02(15)(d), Fla. Stat.

Compensation lives in Exhibit A so a fee change is an exhibit amendment rather
than a new agreement. Keep the numbers in sync with src/lib/brokerage.ts and
marketing/print/render_agent_packet.py.

    python3 marketing/print/render_ica.py
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

SALES_BRAND = "TrueNorth Brokerage Group"
LOGO = pathlib.Path(ROOT, "public", "logo-horizontal.png").as_uri()

TERMS = {
    "split": "100%",
    "transaction_fee": "$399",
    "monthly_fee": "$20",
    "payout_days": "1 business day",
    "file_deadline": "2 business days",
    "notice_days": "10 days",
    "eo_minimum": "$500,000 per claim",
    "fee_change_notice": "30 days",
}


def head():
    return (
        f'<header><img src="{LOGO}" style="width:1.8in">'
        f'<div class="hmeta">{LEGAL_NAME}<br>d/b/a {TRADE_NAME}<br>'
        f'Brokerage License {BROKERAGE_LICENSE} · Broker License {BROKER_LICENSE}<br>'
        f'{OFFICE}<br>{PHONE} · {EMAIL} · {URL}</div></header><div class="rule"></div>'
    )


def foot(n, total):
    return (f'<footer><span>Independent Contractor Agreement · {SALES_BRAND}</span>'
            f'<span>Agent initials {box(".55in")} &nbsp; Broker initials {box(".55in")}</span>'
            f'<span>Page {n} of {total}</span></footer>')


def sheet(n, total, body):
    return f'<section class="sheet">{head()}<div class="body">{body}</div>{foot(n, total)}</section>'


P1 = f"""
<h1>Independent Contractor Agreement</h1>
<p class="lede">This Agreement is between {LEGAL_NAME}, a Florida licensed real estate brokerage doing business as
{TRADE_NAME} and as {SALES_BRAND}, Florida brokerage license {BROKERAGE_LICENSE} (the &ldquo;Brokerage&rdquo;), whose
broker is {BROKER}, license {BROKER_LICENSE} (the &ldquo;Broker&rdquo;), and the licensee identified below (the
&ldquo;Agent&rdquo;).</p>

<table class="form">
  <tr><td>Agent name, as licensed<div>{box("3.1in")}</div></td><td>Florida license number<div>{box("2.3in")}</div></td></tr>
  <tr><td>License type<div>{cb("Sales associate")} &nbsp; {cb("Broker associate")}</div></td><td>Effective date<div>{box("2.3in")}</div></td></tr>
  <tr><td>Email for notices<div>{box("3.1in")}</div></td><td>Mobile phone<div>{box("2.3in")}</div></td></tr>
</table>

<h2>1. Association and scope</h2>
<p>The Brokerage registers the Agent's license and authorizes the Agent to perform real estate services permitted by
Chapter 475, Florida Statutes, in the Brokerage's name. The Agent performs those services as an independent contractor,
not as an employee. This Agreement does not create a partnership, joint venture, or employment relationship.</p>
<p>The Agent may not perform any act requiring a license on behalf of the Brokerage until the Agent's license is
registered to the Brokerage and active with the Department of Business and Professional Regulation. Acting before that
registration is active violates s. 475.42(1)(b), Florida Statutes.</p>

<h2>2. Independent contractor status and taxes</h2>
<p><b>Federal tax treatment.</b> The parties intend that the Agent be treated as a qualified real estate agent and
statutory nonemployee under s. 3508 of the Internal Revenue Code. Accordingly: (a) the Agent is and will remain a
licensed real estate licensee; (b) substantially all compensation paid to the Agent for services performed as a real
estate agent is directly related to sales or other output, rather than to the number of hours worked; and (c)
<b>the Agent will not be treated as an employee for federal tax purposes</b> with respect to those services.</p>
<p><b>Reporting and withholding.</b> The Brokerage will not withhold federal income tax, Social Security, Medicare, or
any state tax from compensation. The Brokerage will report compensation on IRS Form 1099-NEC. The Agent is solely
responsible for income tax, self-employment tax, and estimated payments, and will keep a current Form W-9 on file.</p>
<p><b>Workers' compensation.</b> The Agent is a real estate licensee who <b>agrees in writing to perform for
remuneration solely by way of commission</b>, and is therefore excluded from the definition of employee under
s. 440.02(15)(d), Florida Statutes. The Brokerage does not provide workers' compensation coverage for the Agent.</p>
<p><b>No benefits.</b> The Agent is not eligible for and waives any claim to employee benefits of any kind, including
health insurance, retirement contributions, paid leave, overtime, minimum wage, and unemployment compensation.</p>
<p><b>Control of the work.</b> The Agent sets their own hours, schedule, methods, territory within the Brokerage's
service area, and business plan, and pays their own expenses. The Brokerage does not set sales quotas, require floor
time, require attendance at meetings, or direct the manner in which the Agent produces business. Supervision by the
Broker is limited to compliance with license law, review of transaction files, and handling of funds, which Chapter 475
requires of the Broker and which does not convert this relationship into employment.</p>
"""

P2 = f"""
<h2>3. The Agent's obligations</h2>
<p>The Agent will, at the Agent's own expense:</p>
<ul class="list">
  <li>Keep the Florida real estate license active and in good standing, and complete all post-licensing and continuing education on time.</li>
  <li>Maintain membership in a Realtor association and the MLS the Agent uses, and keep MLS records showing the Brokerage as the Agent's firm.</li>
  <li><b>Carry errors and omissions insurance of at least {TERMS['eo_minimum']}</b> and deliver a certificate to the Brokerage before the Agent's first transaction and at each renewal. The Brokerage does not provide errors and omissions coverage for the Agent.</li>
  <li>Comply with Chapter 475, Florida Statutes, the rules of the Florida Real Estate Commission, federal and Florida fair housing law, and the Brokerage's written policies as they exist from time to time.</li>
  <li>Include the Brokerage's licensed name in every advertisement as Rule 61J2-10.025, F.A.C., requires, and submit any team or group name for the Broker's written approval before use.</li>
  <li>Deliver all earnest money, deposits, and other funds belonging to another person to the Brokerage or the named escrow agent immediately. <b>The Agent may never hold, deposit, or commingle such funds.</b></li>
  <li>Deliver every executed contract, addendum, and disclosure to the Brokerage within {TERMS['file_deadline']} of execution, and respond to the Broker's file requests promptly.</li>
  <li>Carry automobile liability insurance meeting Florida's financial responsibility requirements for any vehicle used in the business.</li>
  <li>Not accept compensation for real estate services from anyone other than the Brokerage, and not pay any fee or share any compensation with a person who is not properly licensed.</li>
</ul>

<h2>4. The Brokerage's obligations</h2>
<p>The Brokerage will: register the Agent's license and supervise as Chapter 475 requires; maintain escrow accounts and
handle trust funds in compliance with s. 475.25(1)(k), Florida Statutes, and Rule 61J2-14, F.A.C.; provide the CRM,
transaction management, and e-signature tools covered by the monthly fee; provide the listing marketing package
described in Exhibit A for the Agent's listings; make the Broker reasonably available for contract and compliance
questions; provide training sessions as scheduled; and disburse compensation as provided in Exhibit A.</p>

<h2>5. Compensation</h2>
<p>Compensation is set out in <b>Exhibit A</b>, which is part of this Agreement. In summary, the Agent receives
{TERMS['split']} of the commission earned on the Agent's transactions, and the Brokerage charges
{TERMS['transaction_fee']} per closed transaction and {TERMS['monthly_fee']} per month.</p>
<p><b>Earning and payment.</b> A commission is earned only when the transaction closes and the Brokerage actually
receives the funds. The Brokerage disburses the Agent's share within {TERMS['payout_days']} of receipt, by direct
deposit, with a statement showing the calculation.</p>
<p><b>Splits and referrals.</b> Co-brokerage splits, referral fees, and team splits agreed in writing before closing are
applied before the transaction fee.</p>
<p><b>Disputes.</b> If a client, cooperating brokerage, or closing agent disputes a commission, the Brokerage may hold
the disputed portion until the dispute is resolved, and will keep the Agent informed in writing.</p>
<p><b>No draws or advances.</b> The Brokerage does not advance commissions and does not guarantee any level of income.</p>
<p><b>Changes.</b> The Brokerage may amend Exhibit A on {TERMS['fee_change_notice']} written notice. Transactions under
contract when notice is given close on the prior schedule. If the Agent does not accept the change, the Agent may
terminate under Section 8 without penalty.</p>
"""

P3 = f"""
<h2>6. Expenses</h2>
<p>The Agent pays all costs of the Agent's business, including license and education costs, association and MLS dues,
lockbox access, errors and omissions insurance, personal marketing beyond the listing package, vehicle, phone,
and any staff or assistant the Agent engages. The Brokerage does not reimburse these costs and does not mark them up.</p>
<p>An assistant or team member engaged by the Agent works for the Agent, not the Brokerage. If that person performs any
act requiring a real estate license, they must be licensed and registered with the Brokerage first.</p>

<h2>7. Confidentiality, records, and Brokerage property</h2>
<p>Client lists, contact records, transaction files, pricing information, and data in the Brokerage's CRM are
confidential and remain the property of the Brokerage and its clients during and after this Agreement. The Agent will
not copy, export, or use them except to perform services for the Brokerage's clients.</p>
<p>Listings and listing agreements belong to the Brokerage, not to the Agent. Transaction records belong to the
Brokerage, which must retain them for at least 5 years under s. 475.5015, Florida Statutes.</p>
<p>The Brokerage's name, logo, and marks remain the Brokerage's property. The Agent's license to use them ends when this
Agreement ends, and the Agent will stop using them and remove them from signage, profiles, and marketing within 10 days.</p>
<p>The Agent's own personal contact database, developed by the Agent and not derived from Brokerage leads, files, or the
property management book, remains the Agent's.</p>

<h2>8. Term and termination</h2>
<p><b>Term.</b> This Agreement begins on the effective date and continues until terminated.</p>
<p><b>Termination.</b> Either party may terminate at any time, with or without cause, on written notice. Termination is
effective on delivery unless the notice states a later date.</p>
<p><b>Immediate termination.</b> The Brokerage may terminate immediately if the Agent's license lapses or is suspended
or revoked, if the Agent's errors and omissions coverage lapses, if the Agent mishandles funds belonging to another, or
if the Agent violates fair housing law.</p>
<p><b>Pending transactions.</b> Transactions under written contract on the termination date close through the Brokerage
and are compensated on the schedule in effect at termination, less the transaction fee. Listings remain with the
Brokerage; the Brokerage may, in its discretion and at the seller's request, release a listing to the Agent's new
brokerage or cancel it.</p>
<p><b>On termination.</b> The Agent will return Brokerage property, signage, lockboxes, and files; cease use of the
Brokerage's name and marks; and cooperate in transferring the license through DBPR. Monthly fees stop the month after
written notice. Amounts owed by either party survive termination.</p>

<h2>9. Indemnification and limitation of liability</h2>
<p><b>By the Agent.</b> The Agent will indemnify, defend, and hold the Brokerage and the Broker harmless from claims,
damages, fines, costs, and reasonable attorney's fees arising out of the Agent's acts or omissions, including license
law violations, misrepresentation, mishandling of funds, discrimination, and acts outside the scope of this Agreement,
except to the extent caused by the Brokerage's own negligence or willful misconduct.</p>
<p><b>By the Brokerage.</b> The Brokerage will indemnify, defend, and hold the Agent harmless from claims arising out of
the Brokerage's own negligence, willful misconduct, or violation of law.</p>
<p><b>Deductibles and uncovered claims.</b> The Agent is responsible for the deductible and any amount above policy
limits on a claim arising from the Agent's transactions.</p>
<p><b>Limitation.</b> Except for fraud, willful misconduct, or mishandling of escrow funds, the Brokerage's total
liability to the Agent is limited to the fees the Agent paid the Brokerage in the 12 months before the claim. Neither
party is liable for lost profits or other indirect damages.</p>
<p><b>No guarantee.</b> The Brokerage makes no representation about the volume of business, leads, or income the Agent
will receive.</p>
"""

P4 = f"""
<h2>10. Dispute resolution and governing law</h2>
<p>Florida law governs this Agreement, and venue for any action is Hernando County, Florida. Before filing suit, the
parties will attempt in good faith to resolve the dispute and will mediate with a Florida certified circuit civil
mediator, splitting the mediator's fee. Commission disputes between licensees may also be submitted to the local
Realtor association's arbitration process where both parties are members. The prevailing party in any action to enforce
this Agreement is entitled to reasonable attorney's fees and costs.</p>

<h2>11. Notices</h2>
<p>Notices must be in writing and are effective when sent to the email addresses in this Agreement, or when delivered by
hand or by a national overnight carrier to the addresses on file. Either party may change its address by notice.</p>

<h2>12. General</h2>
<p>This Agreement and Exhibit A are the entire agreement between the parties about the Agent's association with the
Brokerage and replace any prior understanding. Except for Exhibit A, which may be amended as provided in Section 5, this
Agreement may be amended only in a writing signed by both parties. The Brokerage's written policies are incorporated by
reference and may be updated by the Brokerage; where a policy conflicts with this Agreement, this Agreement controls.
If any provision is unenforceable, the rest stays in force. The Agent may not assign this Agreement. Sections 2, 6, 7,
9, 10, and 12 survive termination. This Agreement may be signed in counterparts and delivered electronically;
electronic signatures are valid under the federal E-SIGN Act and s. 668.50, Florida Statutes. Nothing in this Agreement
waives any right or obligation under Chapter 475, Florida Statutes.</p>

<h2>13. Acknowledgment</h2>
<table class="tbl">
  <tr><td style="width:.4in" class="c">{cb()}</td><td>I have read this Agreement and Exhibit A, and I understand that I am an <b>independent contractor</b>, that no taxes will be withheld, and that I will receive a Form 1099-NEC.</td></tr>
  <tr><td class="c">{cb()}</td><td>I agree to perform <b>for remuneration solely by way of commission</b>, and I understand the Brokerage does not carry workers' compensation coverage for me.</td></tr>
  <tr><td class="c">{cb()}</td><td>I understand the Brokerage does <b>not</b> provide errors and omissions insurance, and that I must carry at least {TERMS['eo_minimum']} and file a certificate before my first transaction.</td></tr>
  <tr><td class="c">{cb()}</td><td>I understand I may not act for the Brokerage until my license is <b>active with the DBPR</b> under this Brokerage.</td></tr>
</table>

<div class="sigwrap">
  <div class="sigcol">
    <div class="sighd">Agent</div>
    <div class="sigline">{box("2.9in")}<span>Signature</span></div>
    <div class="sigline">{box("2.9in")}<span>Printed name</span></div>
    <div class="sigline">{box("2.9in")}<span>Florida license number</span></div>
    <div class="sigline">{box("2.9in")}<span>Date</span></div>
  </div>
  <div class="sigcol">
    <div class="sighd">{LEGAL_NAME} d/b/a {TRADE_NAME}</div>
    <div class="sigline">{box("2.9in")}<span>Signature</span></div>
    <div class="sigline">{box("2.9in")}<span>{BROKER}, Broker-Owner, License {BROKER_LICENSE}</span></div>
    <div class="sigline">{box("2.9in")}<span>Date</span></div>
    <div class="sigline"><span>{OFFICE} · {PHONE} · {EMAIL}</span></div>
  </div>
</div>
"""

P5 = f"""
<h2>Exhibit A — Compensation schedule</h2>
<p class="lede">Effective {box("1.4in")} and until amended under Section 5.</p>

<table class="tbl">
  <tr class="hd"><td style="width:2.1in">Item</td><td style="width:1.5in">Amount</td><td>Terms</td></tr>
  <tr><td><b>Commission split</b></td><td>{TERMS['split']} to the Agent</td><td>Of the commission the Brokerage receives on the Agent's transaction, after any written co-broke, referral, or team split.</td></tr>
  <tr><td><b>Transaction fee</b></td><td>{TERMS['transaction_fee']}</td><td>Per closed transaction, each side. Deducted at disbursement.</td></tr>
  <tr><td><b>Monthly technology fee</b></td><td>{TERMS['monthly_fee']} per month</td><td>Billed on the 1st. Covers CRM, transaction management, e-signature, and templates. Not prorated for a partial first month.</td></tr>
  <tr><td><b>Desk fee</b></td><td>$0</td><td>None now, and none when a physical office opens.</td></tr>
  <tr><td><b>Franchise or royalty</b></td><td>$0</td><td>The Brokerage is independent.</td></tr>
  <tr><td><b>Signage and lockboxes</b></td><td>$0</td><td>Brokerage signage and electronic lockboxes provided for the Agent's listings.</td></tr>
  <tr><td><b>Listing marketing package</b></td><td>Included</td><td>Professional photography, aerial photos and video, edited listing video, floor plan, printed flyers, and open house support, on listings taken in the Brokerage's name.</td></tr>
  <tr><td><b>Errors and omissions</b></td><td>Agent carries their own</td><td>Minimum {TERMS['eo_minimum']}. Certificate due before the first transaction.</td></tr>
  <tr><td><b>Personal transactions</b></td><td>Transaction fee applies</td><td>Property the Agent buys, sells, or leases for their own account runs through the Brokerage.</td></tr>
</table>

<h2>Worked example</h2>
<p class="small">A $350,000 sale with the Agent on the listing side at a 2.5% listing fee. The Brokerage receives $8,750.
The Agent's share is {TERMS['split']} of that, $8,750, less the {TERMS['transaction_fee']} transaction fee, for
$8,351 disbursed within {TERMS['payout_days']} of the Brokerage receiving the funds. Over a year with twelve monthly
fees, the Agent's total cost to the Brokerage on that single transaction is $399 plus $240.</p>

<h2>Agreed</h2>
<div class="sigwrap">
  <div class="sigcol">
    <div class="sighd">Agent</div>
    <div class="sigline">{box("2.9in")}<span>Signature and date</span></div>
  </div>
  <div class="sigcol">
    <div class="sighd">Brokerage</div>
    <div class="sigline">{box("2.9in")}<span>Signature and date</span></div>
  </div>
</div>
"""

def _split(block, marker):
    head, tail = block.split(marker, 1)
    return head, marker + tail


_P2A, _P2B = _split(P2, "<h2>5. Compensation</h2>")
_P3A, _P3B = _split(P3, "<h2>9. Indemnification and limitation of liability</h2>")
_P3A1, _P3A2 = _split(_P3A, "<h2>7. Confidentiality, records, and Brokerage property</h2>")

PAGES = [P1, _P2A, _P2B + _P3A1, _P3A2 + _P3B, P4, P5]

CSS = f"""{BASE_CSS}
@page{{size:8.5in 11in;margin:0}}
html,body{{width:8.5in;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact;overflow:visible}}
body{{color:#1F2937;font-size:7.9pt;line-height:1.38}}
.sheet{{position:relative;width:8.5in;height:11in;padding:.5in .6in .55in;display:flex;flex-direction:column;
  page-break-after:always;overflow:hidden}}
.sheet:last-child{{page-break-after:auto}}
header{{display:flex;justify-content:space-between;align-items:flex-start;gap:.3in}}
.hmeta{{text-align:right;font-size:6.6pt;line-height:1.5;color:{SLATE}}}
.rule{{height:1.6pt;background:{GOLD};margin:.1in 0 .16in}}
.body{{flex:1}}
h1{{font-family:'Fraunces',Georgia,serif;font-size:18pt;font-weight:500;color:{NAVY};letter-spacing:-.01em;margin-bottom:.08in}}
h2{{font-family:'Fraunces',Georgia,serif;font-size:9.8pt;font-weight:600;color:{NAVY};margin:.11in 0 .04in}}
p{{margin-bottom:.055in}}
.lede{{font-size:8.8pt;color:#334155}}
.small{{font-size:7.6pt;color:{SLATE};line-height:1.5}}
b{{font-weight:600;color:{NAVY}}}
.fill{{display:inline-block;border-bottom:.75pt solid #9CA3AF;height:11pt;vertical-align:-3pt}}
.cb{{display:inline-block;width:9.5pt;height:9.5pt;border:.9pt solid #6B7280;border-radius:1.5pt;vertical-align:-1.5pt}}
table{{width:100%;border-collapse:collapse}}
.tbl td{{border:.5pt solid #D7DEE7;padding:2.4pt 4pt;vertical-align:top}}
.tbl .hd td{{background:{SAND};font-weight:600;color:{NAVY}}}
.tbl tr:nth-child(even) td{{background:#FBFCFD}}
.c{{text-align:center}}
.list{{margin:.03in 0 .07in .16in}}
.list li{{margin-bottom:.025in}}
.form td{{padding:2.5pt 9pt 6pt 0;vertical-align:top;width:50%;font-size:7.4pt;color:{SLATE}}}
.form td div{{margin-top:1pt}}
footer{{display:flex;justify-content:space-between;align-items:flex-end;border-top:.5pt solid #D7DEE7;
  padding-top:5pt;font-size:6.6pt;color:{SLATE}}}
.sigwrap{{display:flex;gap:.4in;margin-top:.14in}}
.sigcol{{flex:1}}
.sighd{{font-weight:600;color:{NAVY};font-size:8.6pt;margin-bottom:.1in}}
.sigline{{margin-bottom:.12in}}
.sigline span{{display:block;font-size:6.8pt;color:{SLATE};margin-top:2pt}}
"""


def document(only=None):
    total = len(PAGES)
    pick = [(i, PAGES[i - 1]) for i in (only or range(1, total + 1))]
    return ('<!doctype html><html><head><meta charset="utf-8"><style>' + CSS + "</style></head><body>"
            + "".join(sheet(i, total, p) for i, p in pick) + "</body></html>")


def render():
    name = "independent-contractor-agreement"
    tmp = tempfile.mkdtemp()
    html = pathlib.Path(tmp) / f"{name}.html"
    html.write_text(document(), encoding="utf-8")
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
