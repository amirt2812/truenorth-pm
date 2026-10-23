"""
Independent check of the pro forma's arithmetic.

The workbook holds live formulas, which Excel and Numbers compute on open. This
script re-implements the same model from the same inputs so the numbers quoted
in conversation are not taken on faith.

    python3 finance/verify_proforma.py
"""

MEDIA = 175 + 125 + 200 + 75 + 60 + 60 + 25          # per listing
FIXED = 150 + 45 + 85 + 35 + 85 + 45 + 250 + 125 + 35 + 40 + 200
SEAT_BASE, CRM_SEAT = 18, 65
TXN_BASE, TC_COST = 35 + 8, 325

SCEN = {
    "Conservative": dict(start=2, add1=0.5, add2=1.0, attr=0.20, tpm=0.35, listing=0.35,
                         attach=1.00, mix=(0.60, 0.30, 0.10), doors=3, doors_add=1.0, fee=129),
    "Modest":       dict(start=2, add1=1.0, add2=2.0, attr=0.25, tpm=0.50, listing=0.45,
                         attach=0.85, mix=(0.50, 0.35, 0.15), doors=5, doors_add=2.0, fee=149),
    "Aggressive":   dict(start=2, add1=2.0, add2=3.5, attr=0.30, tpm=0.70, listing=0.55,
                         attach=0.75, mix=(0.40, 0.40, 0.20), doors=8, doors_add=3.5, fee=169),
}

TIERS = dict(monthly=(29, 99, 299), txn=(495, 425, 350), credit=(0, 300, 500),
             crm=(0, 1, 1), tc=(0, 0, 0))


def blend(arch, mix):
    if arch == "B":
        w = mix
        return dict(
            monthly=sum(a * b for a, b in zip(TIERS["monthly"], w)),
            txn=sum(a * b for a, b in zip(TIERS["txn"], w)),
            credit=sum(a * b for a, b in zip(TIERS["credit"], w)),
            crm=sum(a * b for a, b in zip(TIERS["crm"], w)),
            tc=sum(a * b for a, b in zip(TIERS["tc"], w)),
        )
    return dict(monthly=20, txn=399, credit=750 if arch == "A" else 0, crm=1, tc=0)


def run(arch, name, mom_override=60, recruit_share=0.70, mentor_pct=0.20,
        mentee_txns=3, mentor_share=0.50, commission=7750):
    s = SCEN[name]
    b = blend(arch, s["mix"])
    agents, cum, months = s["start"], 0.0, []
    for m in range(1, 25):
        bop = agents
        agents = max(0.0, bop + (s["add1"] if m <= 12 else s["add2"]) - bop * s["attr"] / 12)
        new = max(0.0, agents - bop)
        txns = agents * s["tpm"]
        listings = txns * s["listing"]
        media_units = listings * s["attach"]
        rev = agents * b["monthly"] + txns * b["txn"] + media_units * max(0, MEDIA - b["credit"])
        mentor = new * mentor_share * mentee_txns * commission * mentor_pct  # paid by the mentee
        mom = txns * recruit_share * mom_override  # the only piece the brokerage funds
        cost = (media_units * MEDIA + txns * (TXN_BASE + b["tc"] * TC_COST)
                + agents * (SEAT_BASE + b["crm"] * CRM_SEAT) + FIXED + mom)
        cum += rev - cost
        months.append(dict(m=m, agents=agents, txns=txns, rev=rev, cost=cost, ebitda=rev - cost, cum=cum, mom=mom, mentor=mentor))
    buyer = b["txn"] - TXN_BASE - b["tc"] * TC_COST
    listing = buyer - MEDIA + max(0, MEDIA - b["credit"])
    blended = buyer * (1 - s["listing"]) + listing * s["listing"]
    per_agent = b["monthly"] - (SEAT_BASE + b["crm"] * CRM_SEAT) + s["tpm"] * blended
    mom_y1 = sum(x["mom"] for x in months[:12])
    be = "never" if per_agent <= 0 else (FIXED + mom_y1 / 12) / per_agent
    y2 = sum(x["ebitda"] for x in months[12:])
    return dict(buyer=buyer, listing=listing, blended=blended, per_agent=per_agent,
                be=be, y2=y2, cum=cum, agents24=months[-1]["agents"], months=months, b=b)


print(f"Media package per listing: ${MEDIA}   Fixed overhead per month: ${FIXED}\n")
hdr = f"{'arch':<34}{'buyer':>9}{'listing':>10}{'blended':>10}{'/agent/mo':>11}{'BE agents':>11}{'yr2 EBITDA':>13}{'24mo cum':>12}"
for scen in SCEN:
    print(f"=== {scen} ===")
    print(hdr)
    for arch, label in (("A", "A. Flat $399 + $20, media incl."),
                        ("B", "B. Tiered"),
                        ("C", "C. Flat $399 + $20, media billed")):
        x = run(arch, scen)
        be = x["be"] if isinstance(x["be"], str) else f"{x['be']:.1f}"
        print(f"{label:<34}{x['buyer']:>9,.0f}{x['listing']:>10,.0f}{x['blended']:>10,.0f}"
              f"{x['per_agent']:>11,.0f}{be:>11}{x['y2']:>13,.0f}{x['cum']:>12,.0f}")
    print()

m = run("B", "Modest")
print(f"Modest / Tiered: agents at month 24 = {m['agents24']:.1f}, "
      f"blended monthly fee ${m['b']['monthly']:.2f}, blended transaction fee ${m['b']['txn']:.2f}")
s = SCEN["Modest"]
doors24 = s["doors"] + s["doors_add"] * 24
pm_arr = doors24 * s["fee"] * 12
print(f"PM at month 24: {doors24:.0f} doors, ${pm_arr:,.0f} annual recurring, "
      f"value at 1.8x = ${pm_arr*1.8:,.0f}")
print(f"Brokerage value at 2.5x year-2 EBITDA = ${max(0, m['y2'])*2.5:,.0f}")

print("\nPer-tier economics (Modest drivers: 0.5 txn/agent/mo, 45% listing side)")
sm = SCEN["Modest"]
print(f"{'tier':<10}{'monthly':>9}{'txn fee':>9}{'credit':>8}{'buyer':>9}{'listing':>9}{'blended':>9}{'/agent/mo':>11}{'/agent/yr':>11}")
for i, nm in enumerate(("Solo", "Pro", "Premier")):
    mo, tx, cr = TIERS["monthly"][i], TIERS["txn"][i], TIERS["credit"][i]
    crm, tc = TIERS["crm"][i], TIERS["tc"][i]
    buyer = tx - TXN_BASE - tc * TC_COST
    listing = buyer - MEDIA + max(0, MEDIA - cr)
    blended = buyer * (1 - sm["listing"]) + listing * sm["listing"]
    per = mo - (SEAT_BASE + crm * CRM_SEAT) + sm["tpm"] * blended
    print(f"{nm:<10}{mo:>9,.0f}{tx:>9,.0f}{cr:>8,.0f}{buyer:>9,.0f}{listing:>9,.0f}{blended:>9,.0f}{per:>11,.0f}{per*12:>11,.0f}")
