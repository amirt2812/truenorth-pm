"""
New Agent Packet — what a licensee receives when they join the brokerage.

  agent-packet.pdf / .png     9 pages, US Letter, e-signature ready

Same construction as the management agreement: ruled blanks, square checkboxes,
initial lines in the footer, so fields drop straight onto it in DocuSign.

Economics must stay in sync with src/lib/brokerage.ts (the `economics` object)
and with the Join page on the website.

    python3 marketing/print/render_agent_packet.py
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
    "desk_fee": "$0",
    "franchise_fee": "$0",
    "sign_fee": "$0",
    # The brokerage does not provide E&O. Each agent carries their own and
    # files a certificate before their first transaction.
    "eo": "Agent carries their own",
    "file_deadline": "2 business days",
    "payout": "within 1 business day of the brokerage receiving the commission",
}

BENEFITS = [
    ("You keep 100% of your commission",
     f"No split, no cap to chase, no graduated tiers. {TERMS['transaction_fee']} per closed transaction and "
     f"{TERMS['monthly_fee']} a month for the CRM. That is the entire cost of hanging your license here."),
    ("The listing marketing package, on your listings",
     "Professional photography, aerial photos and video, an edited listing video, floor plan, printed flyers, "
     "signage, and open house support. You win listings against agents who pay for every piece of that themselves."),
    ("The broker answers his own phone",
     "Contract questions go to the broker-owner directly and get an answer the same day. You are not routed to a "
     "team lead, and you are not waiting until Monday."),
    ("Full CRM and transaction management",
     "Pipeline, drip campaigns, e-signature, and a per-file document checklist, so nothing sits unsigned the night "
     "before closing."),
    ("Training that is actually scheduled",
     "Contract-to-close walkthroughs, pricing and CMA workshops, and lead conversion practice. Newly licensed "
     "agents get the broker at their first listing appointment and first offer."),
    ("Business the property management side creates",
     "TrueNorth manages rentals across Hernando County. Those owners sell, buy, and refer, and that work goes to "
     "the agents in this brokerage."),
]

FEES = [
    ("Commission split", f"{TERMS['split']} to the agent", "Paid on every transaction, from the first one."),
    ("Transaction fee", TERMS["transaction_fee"], "Per closed transaction, deducted from the commission at disbursement."),
    ("Monthly fee", f"{TERMS['monthly_fee']} per month", "CRM, transaction management, e-signature, and brokerage tools."),
    ("Desk fee", TERMS["desk_fee"], "The brokerage is virtual. No desk fee now, and none when the office opens."),
    ("Franchise or royalty fee", TERMS["franchise_fee"], "TrueNorth is independent. Nothing comes off the top."),
    ("Sign and lockbox use", TERMS["sign_fee"], "Brokerage signage and electronic lockboxes are provided for your listings."),
    ("Errors and omissions coverage", TERMS["eo"], "You carry your own policy and file a certificate before your first transaction. The brokerage does not provide E&O."),
    ("Listing marketing package", "Included", "Photography, aerial, video, floor plan, flyers, open house support."),
]

AGENT_PAYS = [
    "Your Florida license renewal and post-licensing or continuing education.",
    "Your Realtor association dues, MLS fees, and lockbox key fob or app subscription.",
    "Your own errors and omissions insurance. The brokerage does not carry coverage for agents, and you may not take a listing or write an offer until your certificate is on file.",
    "Your own prospecting and personal branding beyond the listing package.",
    "Your vehicle, phone, and anything else you would pay for as an independent contractor.",
]

GETTING_STARTED = [
    ("Send in this packet", "Agent information sheet, signed acknowledgment, signed independent contractor agreement, W-9, and a copy of your license."),
    ("Transfer your license at DBPR", "We submit the change of employer through DBPR online. Do not work a TrueNorth transaction until the transfer shows active — it is a misdemeanor under s. 475.42(1)(b), Fla. Stat."),
    ("Move your association and MLS record", "Update your board and MLS profile to TrueNorth Brokerage Group so your listings publish under the right brokerage."),
    ("Set up your tools", "CRM login, e-signature account, shared document templates, and your @truenorthpm.co email alias."),
    ("Send your headshot and bio", "For the website agent page, your listing presentations, and your signature block."),
    ("Sit down with the broker", "Ninety minutes on contracts, our file standards, and your first ninety days of prospecting."),
]

POLICIES = [
    ("Commissions are negotiable",
     "Commissions are not set by law and are never set by this brokerage. You negotiate your own fee with your "
     "client on every transaction. Do not publish a fixed commission rate alongside the brokerage name, and do not "
     "discuss your rates with agents at other firms. This is antitrust exposure, not a style preference."),
    ("Advertising must carry the brokerage name",
     "Rule 61J2-10.025, F.A.C., requires the licensed brokerage name in every advertisement. Online, it must sit "
     "adjacent to or directly above or below your contact information. Use your own name as registered with the "
     "Commission. A team or group name may never be larger than the brokerage name, and may not include words like "
     "Agency, Brokerage, Company, Corp., Inc., or LLC."),
    ("All funds go to brokerage escrow",
     "You may never hold a deposit, a rent payment, or any other person's money. Earnest money and all trust funds "
     "are delivered to the brokerage or the named escrow agent immediately. Florida requires the broker to be a "
     "signatory on escrow accounts and to reconcile them monthly."),
    ("Files are turned in on time",
     f"Every executed contract and addendum is uploaded within {TERMS['file_deadline']}. Commission is disbursed "
     f"{TERMS['payout']}, and a complete file is what makes that possible. The brokerage must keep records 5 years "
     "under s. 475.5015, Fla. Stat."),
    ("Fair housing is not negotiable",
     "Apply the same criteria, the same showings, and the same service to every client and customer. Steering, "
     "selective showing, and screening language that excludes a protected class end the relationship with this "
     "brokerage immediately, regardless of what a client asks you to do."),
    ("You are an independent contractor",
     "You set your own hours, methods, and business plan. You are not an employee, the brokerage does not withhold "
     "taxes, and you receive a Form 1099. Supervision here means license law compliance and file review, which is "
     "the broker's legal duty, not control of your schedule."),
]


def head():
    return (
        f'<header><img src="{LOGO}" style="width:1.8in">'
        f'<div class="hmeta">{LEGAL_NAME}<br>d/b/a {TRADE_NAME}<br>'
        f'Brokerage License {BROKERAGE_LICENSE} · Broker License {BROKER_LICENSE}<br>'
        f'{OFFICE}<br>{PHONE} · {EMAIL} · {URL}</div></header><div class="rule"></div>'
    )


def foot(n, total):
    return (f'<footer><span>New Agent Packet · {SALES_BRAND}</span>'
            f'<span>Agent initials {box(".55in")} &nbsp; Broker initials {box(".55in")}</span>'
            f'<span>Page {n} of {total}</span></footer>')


def sheet(n, total, body):
    return f'<section class="sheet">{head()}<div class="body">{body}</div>{foot(n, total)}</section>'


P_WELCOME = f"""
<h1>Welcome to {SALES_BRAND}</h1>
<p class="lede">Thank you for considering us. This packet is everything you need to decide, and everything you need to
join if you do. It is short on purpose.</p>
<p>I built this brokerage around a simple idea: an agent who produces should keep what they earn, and a broker should be
worth calling. You keep {TERMS['split']} of your commission. The brokerage charges {TERMS['transaction_fee']} per closed
transaction and {TERMS['monthly_fee']} a month for the technology. There is no desk fee, no franchise fee, no royalty,
and no cap to work toward, because there is nothing to cap.</p>
<p>What you get in return is not a bigger building. It is the marketing package behind your listings, a CRM that keeps
your pipeline straight, training that is scheduled instead of promised, and a broker who picks up the phone when you
have a contract question at 6 p.m. on a Friday.</p>
<p>We are a virtual brokerage today, and that is deliberate — low overhead is exactly why these numbers work. As the
roster grows we expect to open a physical office in Hernando County. When that happens, you still will not pay a desk
fee for it.</p>
<p>We also run a property management business across Hernando County. Those owners sell, buy, and refer their friends.
That work goes to the agents in this brokerage.</p>
<p>If the fit is right, the paperwork in this packet takes about fifteen minutes.</p>
<div class="sig">
  <div class="serif" style="font-size:15pt;color:{NAVY}">{BROKER}</div>
  <div class="small">Broker-Owner · Licensed Real Estate Broker, {BROKER_LICENSE}<br>{PHONE} · {EMAIL}</div>
</div>

<h2>What this packet contains</h2>
<table class="tbl">
  <tr class="hd"><td style="width:.4in">Page</td><td>Section</td><td>What to do with it</td></tr>
  <tr><td class="c">2</td><td>Why TrueNorth</td><td>Read</td></tr>
  <tr><td class="c">3</td><td>Commission plan and fee schedule</td><td>Read, then initial page 9</td></tr>
  <tr><td class="c">4–5</td><td>Brokerage policies</td><td>Read, then initial page 9</td></tr>
  <tr><td class="c">6</td><td>Getting started checklist</td><td>Work through it with us</td></tr>
  <tr><td class="c">7</td><td>Agent information sheet</td><td>Complete and return</td></tr>
  <tr><td class="c">8</td><td>Billing authorization</td><td>Complete and return</td></tr>
  <tr><td class="c">9</td><td>Acknowledgment and signature</td><td>Sign and return</td></tr>
</table>
<p class="small">Also required with your packet: a signed Independent Contractor Agreement, a completed IRS Form W-9,
and a copy of your current Florida real estate license.</p>
"""

P_WHY = f"""
<h2>Why {SALES_BRAND}</h2>
<table class="tbl">
  {"".join(f'<tr><td style="width:2.5in"><b>{t}</b></td><td>{b}</td></tr>' for t, b in BENEFITS)}
</table>

<h2>What we are not</h2>
<p>We are not a lead-mill that sells you back your own money, and we do not promise a flood of company leads. Brokerages
that lead with free leads usually take it out of your split somewhere else. We would rather charge you almost nothing
and let you keep your own production.</p>
<p>We are also not the right fit for an agent who wants someone else to run their business. You are an independent
contractor here. The broker's job is compliance, contracts, marketing support, and training — not managing your
calendar.</p>

<h2>Who this works for</h2>
<table class="tbl">
  <tr><td style="width:2.5in"><b>The producing agent</b></td><td>You close six or more a year and you are tired of watching a split and a franchise fee come off every check.</td></tr>
  <tr><td><b>The part-time agent</b></td><td>You close two or three a year. A $20 monthly fee does not punish you for a slow quarter, and there is no minimum production requirement.</td></tr>
  <tr><td><b>The newly licensed agent</b></td><td>You want a broker who will sit in on your first listing appointment instead of handing you a login and a coffee mug.</td></tr>
  <tr><td><b>The investor-facing agent</b></td><td>You work with landlords and buyers of rental property, and you want a brokerage that can underwrite and then manage what your client buys.</td></tr>
</table>
"""

P_FEES = f"""
<h2>Commission plan and fee schedule</h2>
<p class="lede">Everything the brokerage charges, in one table. If it is not listed here, we do not charge it.</p>
<table class="tbl">
  <tr class="hd"><td style="width:2.1in">Item</td><td style="width:1.6in">Amount</td><td>Notes</td></tr>
  {"".join(f'<tr><td><b>{a}</b></td><td>{b}</td><td>{c}</td></tr>' for a, b, c in FEES)}
</table>

<h2>What the agent pays for</h2>
<ul class="list">{"".join(f"<li>{x}</li>" for x in AGENT_PAYS)}</ul>

<h2>How you get paid</h2>
<p><b>Disbursement.</b> At closing, the title company or closing agent sends the full commission to the brokerage. We
deduct the {TERMS['transaction_fee']} transaction fee and disburse the balance to you {TERMS['payout']}, by direct
deposit, with a commission statement showing the math.</p>
<p><b>Referral and co-broke splits</b> agreed in writing before closing come off the top before the transaction fee is
applied.</p>
<p><b>Commission disputes.</b> If a cooperating brokerage or a client disputes a commission, the brokerage holds the
disputed portion until it is resolved and keeps you informed in writing.</p>
<p><b>Leaving.</b> If you transfer your license out, pending transactions under contract on your departure date close
through TrueNorth on these same terms, and you are paid normally. Listings belong to the brokerage; we release them to
you or to your seller on request, in writing, with no release fee.</p>

<h2>Monthly fee, in plain terms</h2>
<p>The {TERMS['monthly_fee']} monthly fee is billed on the first of each month and covers the CRM, transaction
management, e-signature, and shared templates. It is not prorated for a partial first month, and it stops the month
after you notify us in writing that you are leaving.</p>
"""

P_POL1 = f"""
<h2>Brokerage policies</h2>
<p class="lede">These exist because Florida license law requires them, or because they protect your license and the
brokerage's. They are not negotiable, and they are short.</p>
{"".join(f'<h3>{t}</h3><p>{b}</p>' for t, b in POLICIES[:3])}
"""

P_POL2 = f"""
{"".join(f'<h3>{t}</h3><p>{b}</p>' for t, b in POLICIES[3:])}

<h3>Supervision and file review</h3>
<p>Every file is reviewed by the broker. Expect questions about missing disclosures, unsigned addenda, and deadlines
that passed without an extension. That review is the broker's statutory duty and it is also what keeps a complaint from
turning into a case.</p>

<h3>Personal transactions</h3>
<p>If you buy, sell, or lease property for your own account, you must disclose in writing that you hold a real estate
license, as Rule 61J2-10.028 and Chapter 475 require. Personal transactions run through the brokerage like any other
and the transaction fee applies.</p>

<h3>Use of the brokerage name and marks</h3>
<p>The TrueNorth name, logo, and marks belong to the brokerage and may be used on materials that comply with the
advertising policy above. Return or destroy signage and marketing bearing the brokerage name when you leave.</p>

<h3>Confidentiality</h3>
<p>Client lists, contact records, transaction files, and anything in the CRM stay confidential during and after your
time here. Client information collected under the brokerage belongs to the brokerage and the client, not to a vendor
and not to a competitor.</p>
"""

P_START = f"""
<h2>Getting started</h2>
<p class="lede">Six steps. We do most of them with you in a single sitting.</p>
<table class="tbl">
  <tr class="hd"><td style="width:.4in">#</td><td style="width:2.1in">Step</td><td>What happens</td></tr>
  {"".join(f'<tr><td class="c">{i}</td><td><b>{t}</b></td><td>{b}</td></tr>' for i, (t, b) in enumerate(GETTING_STARTED, 1))}
</table>

<h2>Before your first transaction</h2>
<p>{cb()} Your license shows TrueNorth Brokerage Group as your employer on the DBPR licensee search<br>
{cb()} Your MLS and association records show the brokerage<br>
{cb()} Your signature block, business cards, and social profiles carry the brokerage name<br>
{cb()} You have CRM access and have uploaded your first contact list<br>
{cb()} You have read the advertising and escrow policies on pages 4 and 5</p>

<h2>Who to call</h2>
<table class="tbl">
  <tr class="hd"><td style="width:2.3in">For</td><td>Contact</td></tr>
  <tr><td>Contracts, offers, disputes, anything urgent</td><td>{BROKER}, Broker-Owner · {PHONE} · {EMAIL}</td></tr>
  <tr><td>Commission disbursement and billing</td><td>{EMAIL}</td></tr>
  <tr><td>Listing marketing, photography, signage</td><td>{EMAIL}</td></tr>
  <tr><td>Your association, MLS, and lockbox</td><td>Your local board — record your contact here: {box("1.8in")}</td></tr>
</table>
"""

P_INFO = f"""
<h2>Agent information sheet</h2>
<p class="lede">Complete every line. We need these exactly as they appear on your license and tax records.</p>
<table class="form">
  <tr><td>Full legal name, as licensed<div>{box("3.1in")}</div></td><td>Preferred name for marketing<div>{box("2.3in")}</div></td></tr>
  <tr><td>Florida real estate license number<div>{box("3.1in")}</div></td><td>License type<div>{cb("Sales associate")} &nbsp; {cb("Broker associate")}</div></td></tr>
  <tr><td>License expiration date<div>{box("3.1in")}</div></td><td>Post-licensing complete?<div>{cb("Yes")} &nbsp; {cb("No")} &nbsp; {cb("N/A")}</div></td></tr>
  <tr><td>Mobile phone<div>{box("3.1in")}</div></td><td>Email<div>{box("2.3in")}</div></td></tr>
  <tr><td colspan="2">Mailing address<div>{box("5.8in")}</div></td></tr>
  <tr><td>Date of birth<div>{box("3.1in")}</div></td><td>Preferred start date<div>{box("2.3in")}</div></td></tr>
  <tr><td>Current or previous brokerage<div>{box("3.1in")}</div></td><td>Years licensed<div>{box("2.3in")}</div></td></tr>
  <tr><td>Realtor association<div>{box("3.1in")}</div></td><td>MLS and MLS ID<div>{box("2.3in")}</div></td></tr>
  <tr><td>NRDS / member ID<div>{box("3.1in")}</div></td><td>Lockbox key or app ID<div>{box("2.3in")}</div></td></tr>
  <tr><td>Emergency contact name<div>{box("3.1in")}</div></td><td>Emergency contact phone<div>{box("2.3in")}</div></td></tr>
  <tr><td colspan="2">Languages you work in, designations, and areas of focus<div>{box("5.8in")}</div></td></tr>
  <tr><td colspan="2">Open transactions you expect to bring with you (address and status)<div>{box("5.8in")}</div><div>{box("5.8in")}</div></td></tr>
</table>
<p class="small">{cb()} I have attached a copy of my current Florida real estate license. &nbsp;
{cb()} I have attached a completed IRS Form W-9. &nbsp; {cb()} I have attached a headshot for marketing use.</p>
"""

P_BILL = f"""
<h2>Billing authorization</h2>
<p class="lede">Two charges, both predictable: {TERMS['monthly_fee']} a month, and {TERMS['transaction_fee']} per closed
transaction deducted at disbursement.</p>

<table class="tbl">
  <tr class="hd"><td style="width:2.2in">Charge</td><td style="width:1.4in">Amount</td><td>When</td></tr>
  <tr><td>Monthly technology fee</td><td>{TERMS['monthly_fee']}</td><td>1st of each month, beginning {box("1.1in")}</td></tr>
  <tr><td>Transaction fee</td><td>{TERMS['transaction_fee']}</td><td>Deducted from your commission at disbursement</td></tr>
</table>

<h2>Authorization</h2>
<p>I authorize {LEGAL_NAME} to charge the payment method I provide for the monthly technology fee, and to deduct the
transaction fee from commissions due to me at disbursement. I may change or revoke this authorization with 10 days'
written notice; fees already earned and transactions already closed are unaffected.</p>

<table class="form">
  <tr><td>Agent name<div>{box("3.1in")}</div></td><td>Date<div>{box("2.3in")}</div></td></tr>
  <tr><td>Signature<div>{box("3.1in")}</div></td><td>Billing start month<div>{box("2.3in")}</div></td></tr>
</table>

<div class="callout">
  <b>We do not collect card numbers on paper.</b> After you return this packet, you will receive a secure payment link
  to enter your card or bank details directly with our payment processor. Never email a card number or write one on a
  form — not to us, and not to anyone else in this business.
</div>

<h2>Payment method you plan to use</h2>
<p>{cb("Debit or credit card")} &nbsp; {cb("Bank account (ACH)")} &nbsp; {cb("I will decide at the secure link")}</p>
"""

P_SIGN = f"""
<h2>Acknowledgment and signature</h2>
<p class="lede">Signing confirms you received this packet and agree to the brokerage policies in it. Your compensation
is governed by the Independent Contractor Agreement, which is signed separately.</p>

<table class="tbl">
  <tr><td style="width:.4in" class="c">{cb()}</td><td>I have read the <b>commission plan and fee schedule</b> on page 3 and understand that I keep {TERMS['split']} of my commission, that the brokerage charges {TERMS['transaction_fee']} per closed transaction and {TERMS['monthly_fee']} per month, and that no other brokerage fees apply.</td></tr>
  <tr><td class="c">{cb()}</td><td>I have read the <b>brokerage policies</b> on pages 4 and 5, including the policies on commission negotiability, advertising, escrow and trust funds, file deadlines, and fair housing.</td></tr>
  <tr><td class="c">{cb()}</td><td>I understand I am an <b>independent contractor</b>, not an employee, that no taxes are withheld, and that I will receive a Form 1099.</td></tr>
  <tr><td class="c">{cb()}</td><td>I understand I may not work a TrueNorth transaction until my license transfer is <b>active with the DBPR</b>.</td></tr>
  <tr><td class="c">{cb()}</td><td>I have provided a copy of my <b>Florida real estate license</b>, a completed <b>Form W-9</b>, and a signed <b>Independent Contractor Agreement</b>.</td></tr>
  <tr><td class="c">{cb()}</td><td>Everything I have stated on the agent information sheet is <b>true and complete</b>.</td></tr>
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

<p class="small">This packet describes brokerage policy and is not a substitute for the Independent Contractor
Agreement, Chapter 475, Florida Statutes, or the rules of the Florida Real Estate Commission. Where this packet and
those authorities differ, the law and the signed agreement control.</p>
"""

_FEES_MAIN, _FEES_TAIL = P_FEES.split("<p><b>Leaving.</b>", 1)
_FEES_TAIL = "<p><b>Leaving.</b>" + _FEES_TAIL

PAGES = [P_WELCOME, P_WHY, _FEES_MAIN, _FEES_TAIL + P_POL1, P_POL2, P_START, P_INFO, P_BILL, P_SIGN]

CSS = f"""{BASE_CSS}
@page{{size:8.5in 11in;margin:0}}
html,body{{width:8.5in;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact;overflow:visible}}
body{{color:#1F2937;font-size:8.6pt;line-height:1.45}}
.sheet{{position:relative;width:8.5in;height:11in;padding:.5in .6in .55in;display:flex;flex-direction:column;
  page-break-after:always;overflow:hidden}}
.sheet:last-child{{page-break-after:auto}}
header{{display:flex;justify-content:space-between;align-items:flex-start;gap:.3in}}
.hmeta{{text-align:right;font-size:6.6pt;line-height:1.5;color:{SLATE}}}
.rule{{height:1.6pt;background:{GOLD};margin:.1in 0 .16in}}
.body{{flex:1}}
h1{{font-family:'Fraunces',Georgia,serif;font-size:21pt;font-weight:500;color:{NAVY};letter-spacing:-.01em;margin-bottom:.08in}}
h2{{font-family:'Fraunces',Georgia,serif;font-size:11pt;font-weight:600;color:{NAVY};margin:.16in 0 .06in}}
h3{{font-family:'Fraunces',Georgia,serif;font-size:9.5pt;font-weight:600;color:{NAVY};margin:.13in 0 .03in}}
p{{margin-bottom:.07in}}
.lede{{font-size:9pt;color:#334155}}
.small{{font-size:7.4pt;color:{SLATE};line-height:1.5}}
b{{font-weight:600;color:{NAVY}}}
.fill{{display:inline-block;border-bottom:.75pt solid #9CA3AF;height:11pt;vertical-align:-3pt}}
.cb{{display:inline-block;width:9.5pt;height:9.5pt;border:.9pt solid #6B7280;border-radius:1.5pt;vertical-align:-1.5pt}}
table{{width:100%;border-collapse:collapse}}
.tbl td{{border:.5pt solid #D7DEE7;padding:3pt 4.5pt;vertical-align:top}}
.tbl .hd td{{background:{SAND};font-weight:600;color:{NAVY}}}
.tbl tr:nth-child(even) td{{background:#FBFCFD}}
.c{{text-align:center}}
.list{{margin:.03in 0 .07in .16in}}
.list li{{margin-bottom:.03in}}
.form td{{padding:3pt 10pt 7pt 0;vertical-align:top;width:50%;font-size:7.4pt;color:{SLATE}}}
.form td div{{margin-top:1pt}}
.sig{{margin-top:.18in}}
.callout{{margin-top:.12in;background:{SAND};border-radius:.1in;padding:.13in .16in;font-size:8.4pt;line-height:1.5}}
footer{{display:flex;justify-content:space-between;align-items:flex-end;border-top:.5pt solid #D7DEE7;
  padding-top:5pt;font-size:6.6pt;color:{SLATE}}}
.sigwrap{{display:flex;gap:.4in;margin-top:.14in}}
.sigcol{{flex:1}}
.sighd{{font-weight:600;color:{NAVY};font-size:8.6pt;margin-bottom:.1in}}
.sigline{{margin-bottom:.15in}}
.sigline span{{display:block;font-size:6.8pt;color:{SLATE};margin-top:2pt}}
"""


def document(only=None):
    total = len(PAGES)
    pick = [(i, PAGES[i - 1]) for i in (only or range(1, total + 1))]
    body = "".join(sheet(i, total, p) for i, p in pick)
    return f'<!doctype html><html><head><meta charset="utf-8"><style>{CSS}</style></head><body>{body}</body></html>'


def render():
    name = "agent-packet"
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
