import Link from "next/link";
import { site, compliance } from "@/lib/site";
import { agentBenefits, economics, feeTable, marketingSuite, rebateTiers, type Lang2 } from "@/lib/brokerage";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card, FeatureCard } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { HtmlLang } from "@/components/layout/HtmlLang";
import { localizeHref } from "@/lib/i18n";

/** Thin helpers so every string below can be written once per language. */
const t = <T,>(v: { en: T; es: T }, lang: Lang2) => v[lang];
const L = (href: string, lang: Lang2) => localizeHref(href, lang);

function Lede({ lang }: { lang: Lang2 }) {
  return lang === "es" ? <HtmlLang lang="es" /> : null;
}

/** Fine print that must ride along with any commission figure. */
function CommissionNote({ lang }: { lang: Lang2 }) {
  return <p className="mt-6 text-sm leading-relaxed text-slate-500">{compliance.commissionsNegotiable[lang]}</p>;
}

/* ───────────────────────────── Sell ───────────────────────────── */

const sell = {
  eyebrow: { en: "Sell with TrueNorth", es: "Venda con TrueNorth" },
  title: {
    en: "One listing fee. The marketing most brokerages charge extra for.",
    es: "Una sola tarifa de listado. El marketing que otras corredurías cobran aparte.",
  },
  intro: {
    en: `${economics.listingCommission} to list your home — photography, aerial video, floor plan, printed flyers, open houses, and weekly reporting included. Not add-ons. Not "available for a fee." Included.`,
    es: `${economics.listingCommission} para listar su casa — fotografía, video aéreo, plano, volantes impresos, casas abiertas y reportes semanales incluidos. No son extras. No son "disponibles por una tarifa". Incluidos.`,
  },
  suiteHeading: { en: "What every TrueNorth listing gets", es: "Lo que recibe cada listado de TrueNorth" },
  suiteIntro: {
    en: "The same package on a $240,000 starter home as on a $900,000 waterfront. Your listing fee does not change what your house gets.",
    es: "El mismo paquete en una casa inicial de $240,000 que en una frente al agua de $900,000. Su tarifa no cambia lo que recibe su casa.",
  },
  feeHeading: { en: "What it costs", es: "Lo que cuesta" },
  steps: {
    en: [
      { title: "Pricing conversation", body: "We walk the home, pull comparable sales, and give you a range with the reasoning behind it — including the number we would not go above." },
      { title: "Prep and shoot", body: "A punch list of what actually returns money before listing, then the full shoot: interior, exterior, aerial, video, floor plan." },
      { title: "Go live everywhere", body: "MLS first, which feeds Zillow, Realtor.com, Redfin and the rest, with our listing copy and our photo order — then the social campaign and the print pieces." },
      { title: "Showings and open houses", body: "Electronic lockbox, logged entries, hosted open houses, and feedback chased down and sent to you." },
      { title: "Weekly numbers", body: "Views, saves, showings, and feedback every week. If the market says the price is wrong, you hear it from us early, not at day 60." },
      { title: "Offer, contract, close", body: "Every offer presented with its real net to you, then contract-to-close management: inspections, appraisal, title, and the closing table." },
    ],
    es: [
      { title: "Conversación de precio", body: "Recorremos la casa, sacamos ventas comparables y le damos un rango con el razonamiento detrás — incluyendo el número que no superaríamos." },
      { title: "Preparación y sesión", body: "Una lista de lo que realmente devuelve dinero antes de listar, y luego la sesión completa: interior, exterior, aéreo, video y plano." },
      { title: "Publicación en todas partes", body: "Primero el MLS, que alimenta Zillow, Realtor.com, Redfin y los demás, con nuestro texto y nuestro orden de fotos — luego la campaña social y las piezas impresas." },
      { title: "Visitas y casas abiertas", body: "Caja de llaves electrónica, entradas registradas, casas abiertas atendidas, y comentarios perseguidos y enviados a usted." },
      { title: "Números semanales", body: "Vistas, guardados, visitas y comentarios cada semana. Si el mercado dice que el precio está mal, lo escucha temprano, no en el día 60." },
      { title: "Oferta, contrato, cierre", body: "Cada oferta presentada con su neto real, y luego la gestión de contrato a cierre: inspecciones, avalúo, título y la mesa de cierre." },
    ],
  },
  faqs: {
    en: [
      { q: `Is the ${economics.listingCommission} negotiable?`, a: "Commissions are not set by law and are fully negotiable. That figure is what we charge to list, and it buys the full marketing package rather than a sign in the yard." },
      { q: "What about the buyer's agent?", a: "That is a separate decision you make with us for your listing. Whether you offer compensation to a buyer's agent, and how much, is yours to decide, and we will show you how each choice changes your net." },
      { q: "Do I pay anything up front?", a: "No. Photography, aerial, video, floor plan, flyers, signage, and open houses are carried by us and paid out of the commission at closing." },
      { q: "What if the home does not sell?", a: "You owe no commission. The agreement has a defined term, and we will tell you honestly when the issue is price rather than exposure." },
      { q: "Do you also manage rentals?", a: "Yes. If the numbers say renting beats selling this year, we will say so — and we manage the property if you go that way. That is a different conversation, not a bait and switch." },
    ],
    es: [
      { q: `¿Es negociable el ${economics.listingCommission}?`, a: "Las comisiones no están fijadas por ley y son totalmente negociables. Esa cifra es lo que cobramos por listar, e incluye el paquete completo de marketing en lugar de solo un letrero en el jardín." },
      { q: "¿Y el agente del comprador?", a: "Esa es una decisión aparte que usted toma con nosotros para su listado. Si ofrece compensación a un agente del comprador, y cuánto, lo decide usted, y le mostraremos cómo cada opción cambia su neto." },
      { q: "¿Pago algo por adelantado?", a: "No. Fotografía, aéreo, video, plano, volantes, señalización y casas abiertas los cubrimos nosotros y se pagan de la comisión en el cierre." },
      { q: "¿Y si la casa no se vende?", a: "No debe comisión. El acuerdo tiene un plazo definido, y le diremos con honestidad cuando el problema sea el precio y no la exposición." },
      { q: "¿También administran rentas?", a: "Sí. Si los números dicen que rentar supera a vender este año, se lo diremos — y administramos la propiedad si toma ese camino. Es otra conversación, no un cambio de carnada." },
    ],
  },
};

export function SellPage({ lang = "en" as Lang2 }: { lang?: Lang2 }) {
  return (
    <>
      <Lede lang={lang} />
      <PageHero
        lang={lang}
        breadcrumbs={[{ name: lang === "es" ? "Vender" : "Sell", path: L("/sell", lang) }]}
        eyebrow={t(sell.eyebrow, lang)}
        title={t(sell.title, lang)}
        intro={t(sell.intro, lang)}
        primary={{ label: lang === "es" ? "Solicitar valuación gratis" : "Get a Free Home Valuation", href: L("/contact?topic=sell", lang) }}
        secondary={{ label: lang === "es" ? "Ver el paquete" : "See the package", href: "#package" }}
      />

      <Section tone="white" id="package">
        <SectionHeading eyebrow={lang === "es" ? "Incluido" : "Included"} title={t(sell.suiteHeading, lang)} intro={t(sell.suiteIntro, lang)} />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {marketingSuite.map((s) => (
            <FeatureCard key={s.title.en} icon={s.icon as never} title={t(s.title, lang)}>
              {t(s.body, lang)}
            </FeatureCard>
          ))}
        </div>
      </Section>

      <Section tone="sand">
        <SectionHeading eyebrow={lang === "es" ? "Precio" : "Pricing"} title={t(sell.feeHeading, lang)} />
        <Card className="mx-auto mt-10 max-w-3xl text-center">
          <p className="font-display text-6xl font-semibold text-navy-800">{economics.listingCommission}</p>
          <p className="mt-2 text-lg text-navy-800">
            {lang === "es" ? "tarifa de listado, pagada en el cierre" : "listing fee, paid at closing"}
          </p>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-slate-600">
            {lang === "es"
              ? "Cualquier compensación que decida ofrecer al agente del comprador es una decisión aparte que tomamos juntos para su listado, y le mostramos cómo cada opción cambia su neto."
              : "Any compensation you choose to offer a buyer's agent is a separate decision we make together for your listing, and we show you how each choice changes your net."}
          </p>
          <CommissionNote lang={lang} />
        </Card>
      </Section>

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading align="left" eyebrow={lang === "es" ? "Proceso" : "Process"} title={lang === "es" ? "Cómo se ve vender con nosotros." : "What selling with us looks like."} />
          </div>
          <div className="lg:col-span-8">
            <ProcessSteps steps={t(sell.steps, lang)} />
          </div>
        </div>
      </Section>

      <FaqSection items={t(sell.faqs, lang)} eyebrow="FAQ" title={lang === "es" ? "Preguntas de vendedores" : "Seller questions"} />
      <CtaBand
        lang={lang}
        title={lang === "es" ? "¿Cuánto vale su casa hoy?" : "What is your home worth today?"}
        subtitle={lang === "es" ? "Una valuación local y honesta, con los comparables que la respaldan y sin presión para listar." : "An honest local valuation, with the comparable sales behind it and no pressure to list."}
        primary={{ label: lang === "es" ? "Solicitar valuación gratis" : "Get a Free Home Valuation", href: L("/contact?topic=sell", lang) }}
      />
    </>
  );
}

/* ───────────────────────────── Buy ───────────────────────────── */

const buy = {
  eyebrow: { en: "Buy with TrueNorth", es: "Compre con TrueNorth" },
  title: { en: "A buyer's agent who runs the numbers before you fall in love.", es: "Un agente del comprador que revisa los números antes de que se enamore." },
  intro: {
    en: "We work Hernando County every day on both sides of the market — sales and rentals. That means you get what a home is worth, what it rents for, and what it will cost to hold, before you write an offer.",
    es: "Trabajamos el Condado de Hernando todos los días en ambos lados del mercado — ventas y rentas. Eso significa que sabrá cuánto vale una casa, cuánto renta y cuánto costará mantenerla, antes de escribir una oferta.",
  },
  points: {
    en: [
      { icon: "chart", title: "The real number, not the list price", body: "A written comparable analysis before every offer, so you know whether the asking price is defensible." },
      { icon: "home", title: "Investor math on any address", body: "Rent range, expected vacancy, management cost, and cash flow — the same analysis we run for the owners whose rentals we manage." },
      { icon: "shield", title: "Inspection and repair leverage", body: "We read inspection reports for what matters structurally and mechanically, and negotiate from the report rather than from feelings." },
      { icon: "doc", title: "A written agreement before we tour", body: "We sign a buyer representation agreement that states exactly what our fee is and who pays it. No surprises at the closing table." },
    ],
    es: [
      { icon: "chart", title: "El número real, no el precio de lista", body: "Un análisis comparativo escrito antes de cada oferta, para que sepa si el precio pedido es defendible." },
      { icon: "home", title: "Matemática de inversionista en cualquier dirección", body: "Rango de renta, vacancia esperada, costo de administración y flujo de efectivo — el mismo análisis que hacemos para los propietarios que administramos." },
      { icon: "shield", title: "Ventaja en inspección y reparaciones", body: "Leemos los informes de inspección por lo que importa estructural y mecánicamente, y negociamos desde el informe, no desde las emociones." },
      { icon: "doc", title: "Un acuerdo escrito antes de visitar", body: "Firmamos un acuerdo de representación que indica exactamente cuál es nuestra tarifa y quién la paga. Sin sorpresas en el cierre." },
    ],
  },
  faqs: {
    en: [
      { q: "What does it cost me to use TrueNorth as my buyer's agent?", a: "Our fee is negotiable and is set in writing in the buyer representation agreement before we tour anything. In many transactions the seller or builder offers compensation that covers it in whole or in part; where they do not, we agree on the number with you in advance." },
      { q: "Do I have to sign something before you show me a house?", a: "Yes. A written buyer representation agreement comes first. It spells out what we do, what we charge, and how either of us can end it. You should be suspicious of anyone who skips it." },
      { q: "Can you help me buy a rental property?", a: "That is the part of this we do best. We will underwrite the property as a rental — rent range, expenses, and realistic cash flow — and if you buy it, we can manage it." },
      { q: "What about new construction?", a: `Register us with the builder on your first visit and we rebate part of our commission back to you at closing, from ${economics.headlineRebate} up to ${economics.maxRebate} depending on price and what the builder pays. See the new construction page for the terms.` },
    ],
    es: [
      { q: "¿Cuánto me cuesta usar a TrueNorth como mi agente?", a: "Nuestra tarifa es negociable y se fija por escrito en el acuerdo de representación antes de visitar cualquier propiedad. En muchas transacciones el vendedor o constructor ofrece compensación que la cubre total o parcialmente; cuando no, acordamos el número con usted por adelantado." },
      { q: "¿Debo firmar algo antes de que me muestren una casa?", a: "Sí. Primero va un acuerdo escrito de representación del comprador. Explica qué hacemos, qué cobramos y cómo cualquiera de los dos puede terminarlo. Desconfíe de quien se lo salte." },
      { q: "¿Pueden ayudarme a comprar una propiedad de renta?", a: "Esa es la parte que mejor hacemos. Analizamos la propiedad como renta — rango de renta, gastos y flujo realista — y si la compra, podemos administrarla." },
      { q: "¿Y la obra nueva?", a: `Regístrenos con el constructor en su primera visita y le reembolsamos parte de nuestra comisión en el cierre, desde ${economics.headlineRebate} hasta ${economics.maxRebate} según el precio y lo que pague el constructor. Vea la página de obra nueva para los términos.` },
    ],
  },
};

export function BuyPage({ lang = "en" as Lang2 }: { lang?: Lang2 }) {
  return (
    <>
      <Lede lang={lang} />
      <PageHero
        lang={lang}
        breadcrumbs={[{ name: lang === "es" ? "Comprar" : "Buy", path: L("/buy", lang) }]}
        eyebrow={t(buy.eyebrow, lang)}
        title={t(buy.title, lang)}
        intro={t(buy.intro, lang)}
        primary={{ label: lang === "es" ? "Hablar con un agente" : "Talk to an Agent", href: L("/contact?topic=buy", lang) }}
        secondary={{ label: lang === "es" ? "Reembolso de obra nueva" : "New construction rebate", href: L("/new-construction", lang) }}
      />

      <Section tone="white">
        <SectionHeading eyebrow={lang === "es" ? "Cómo trabajamos" : "How we work"} title={lang === "es" ? "Representación con los números al frente." : "Representation with the numbers up front."} />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {t(buy.points, lang).map((p) => (
            <FeatureCard key={p.title} icon={p.icon as never} title={p.title}>
              {p.body}
            </FeatureCard>
          ))}
        </div>
      </Section>

      <Section tone="navy-soft">
        <Card className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-600">
            {lang === "es" ? "Obra nueva" : "New construction"}
          </p>
          <h2 className="mt-3 font-display text-3xl text-navy-800">
            {lang === "es"
              ? `${economics.headlineRebate} de vuelta en el cierre`
              : `${economics.headlineRebate} back at closing`}
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-slate-600">
            {lang === "es"
              ? `Compre una casa de obra nueva con nosotros y le devolvemos parte de nuestra comisión, de ${economics.headlineRebate} hasta ${economics.maxRebate} según el precio y la comisión del constructor.`
              : `Buy a new construction home with us and we rebate part of our commission to you, from ${economics.headlineRebate} up to ${economics.maxRebate} depending on price and what the builder pays.`}
          </p>
          <div className="mt-7">
            <Button href={L("/new-construction", lang)} variant="gold">
              {lang === "es" ? "Ver los términos" : "See the terms"} <Icon name="arrow-right" className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </Section>

      <FaqSection items={t(buy.faqs, lang)} eyebrow="FAQ" title={lang === "es" ? "Preguntas de compradores" : "Buyer questions"} />
      <CtaBand
        lang={lang}
        title={lang === "es" ? "Empecemos con su lista de requisitos." : "Start with your must-have list."}
        subtitle={lang === "es" ? "Hablemos de zona, presupuesto y plazos — y de si comprar ahora tiene sentido para usted." : "Let's talk area, budget, and timing — and whether buying now actually makes sense for you."}
        primary={{ label: lang === "es" ? "Hablar con un agente" : "Talk to an Agent", href: L("/contact?topic=buy", lang) }}
      />
    </>
  );
}

/* ─────────────────── New construction rebate ─────────────────── */

const nc = {
  eyebrow: { en: "New construction", es: "Obra nueva" },
  title: { en: `We hand you back ${economics.headlineRebate} at closing.`, es: `Le devolvemos ${economics.headlineRebate} en el cierre.` },
  intro: {
    en: "Builders pay a cooperating commission to the agent who registers you. Most agents keep all of it. We rebate a defined share of ours straight back to you as a credit at closing — in writing, before you ever tour a model.",
    es: "Los constructores pagan una comisión cooperativa al agente que lo registra. La mayoría de los agentes se la queda completa. Nosotros le devolvemos una parte definida de la nuestra como crédito en el cierre — por escrito, antes de que visite un modelo.",
  },
  why: {
    en: [
      { icon: "key", title: "Register us first — this is the whole game", body: "Builders only pay the agent who registered you on your first visit. Walk into a model alone and you permanently lose both the representation and the rebate on that community." },
      { icon: "shield", title: "You still get represented", body: "The sales office works for the builder. We read the builder's contract, push on lot premiums, incentives, and upgrade pricing, and attend your walkthroughs." },
      { icon: "doc", title: "Everything in writing, disclosed to everyone", body: "The rebate is set out in your buyer agreement and disclosed to the builder, your lender, and the closing agent, exactly as Florida requires." },
    ],
    es: [
      { icon: "key", title: "Regístrenos primero — eso lo es todo", body: "Los constructores solo pagan al agente que lo registró en su primera visita. Si entra solo a un modelo, pierde permanentemente la representación y el reembolso en esa comunidad." },
      { icon: "shield", title: "Usted sigue representado", body: "La oficina de ventas trabaja para el constructor. Nosotros leemos su contrato, presionamos en primas de lote, incentivos y precios de mejoras, y asistimos a sus recorridos." },
      { icon: "doc", title: "Todo por escrito y divulgado a todos", body: "El reembolso se establece en su acuerdo de comprador y se divulga al constructor, a su prestamista y al agente de cierre, tal como exige Florida." },
    ],
  },
  steps: {
    en: [
      { title: "Tell us where you are shopping", body: "Send us the communities on your list before you visit any of them. One text is enough." },
      { title: "We register you", body: "We register as your agent with each builder, by email, before your first visit — and we come with you to that visit where we can." },
      { title: "We sign the buyer agreement", body: "It states our fee, the builder-paid compensation, and the exact rebate tier that applies to your purchase." },
      { title: "We disclose it to everyone", body: "Builder, lender, and closing agent all receive written notice of the rebate so it lands correctly on the Closing Disclosure." },
      { title: "You get the credit at closing", body: "The rebate appears as a credit on your Closing Disclosure, reducing what you bring to the table." },
    ],
    es: [
      { title: "Díganos dónde está buscando", body: "Envíenos las comunidades de su lista antes de visitarlas. Un mensaje de texto basta." },
      { title: "Lo registramos", body: "Nos registramos como su agente con cada constructor, por correo, antes de su primera visita — y lo acompañamos a esa visita cuando es posible." },
      { title: "Firmamos el acuerdo de comprador", body: "Indica nuestra tarifa, la compensación pagada por el constructor y el nivel exacto de reembolso que aplica a su compra." },
      { title: "Lo divulgamos a todos", body: "Constructor, prestamista y agente de cierre reciben aviso escrito del reembolso para que aparezca correctamente en el Closing Disclosure." },
      { title: "Recibe el crédito en el cierre", body: "El reembolso aparece como crédito en su Closing Disclosure, reduciendo lo que debe llevar al cierre." },
    ],
  },
  faqs: {
    en: [
      { q: "Is a buyer rebate legal in Florida?", a: "Yes. Rule 61J2-10.028(2), Florida Administrative Code, provides that sharing brokerage compensation with a party to the transaction, with full disclosure to all interested parties, is not a violation of Chapter 475. We make that disclosure in writing to the builder, your lender, and the closing agent." },
      { q: "Will my lender allow it?", a: "Usually, as a credit toward closing costs and prepaids shown on the Closing Disclosure. Loan programs cap how much credit you can receive, and your lender has the final say, so we disclose the rebate to them early rather than at the closing table." },
      { q: "Can I just take it in cash?", a: "No. It is paid as a credit at closing through the closing agent. Cash outside closing is how people create lender and disclosure problems, and we will not do it." },
      { q: "Is the rebate taxable?", a: "A commission rebate to a buyer is generally treated as an adjustment to the purchase price rather than income, which also reduces your cost basis. We are not tax advisors — ask yours." },
      { q: "What if the builder pays a reduced commission, or none?", a: `Rebates assume the builder pays a cooperating commission of at least ${economics.minBuilderCoop}. Below that, the rebate is reduced proportionally, and if a builder pays nothing we tell you before you sign anything so you can decide whether to proceed.` },
      { q: "What if I already visited the model without you?", a: "Then the builder will likely refuse to recognize us on that community, and no rebate is possible there. It is worth one text before your first visit." },
    ],
    es: [
      { q: "¿Es legal un reembolso al comprador en Florida?", a: "Sí. La Regla 61J2-10.028(2) del Código Administrativo de Florida establece que compartir la compensación de corretaje con una parte de la transacción, con divulgación completa a todas las partes interesadas, no es una violación del Capítulo 475. Hacemos esa divulgación por escrito al constructor, a su prestamista y al agente de cierre." },
      { q: "¿Mi prestamista lo permitirá?", a: "Generalmente sí, como crédito para costos de cierre y pagos anticipados reflejado en el Closing Disclosure. Los programas de préstamo limitan cuánto crédito puede recibir y su prestamista tiene la última palabra, por eso lo divulgamos temprano y no en la mesa de cierre." },
      { q: "¿Puedo recibirlo en efectivo?", a: "No. Se paga como crédito en el cierre a través del agente de cierre. El efectivo fuera del cierre crea problemas con el prestamista y con la divulgación, y no lo haremos." },
      { q: "¿El reembolso paga impuestos?", a: "Un reembolso de comisión al comprador generalmente se trata como un ajuste al precio de compra y no como ingreso, lo que también reduce su base de costo. No somos asesores fiscales — consulte al suyo." },
      { q: "¿Y si el constructor paga una comisión reducida o ninguna?", a: `Los reembolsos asumen que el constructor paga una comisión cooperativa de al menos ${economics.minBuilderCoop}. Por debajo de eso, el reembolso se reduce proporcionalmente, y si un constructor no paga nada se lo decimos antes de firmar para que usted decida.` },
      { q: "¿Y si ya visité el modelo sin ustedes?", a: "Entonces el constructor probablemente no nos reconocerá en esa comunidad y no habrá reembolso ahí. Vale la pena un mensaje antes de su primera visita." },
    ],
  },
};

export function NewConstructionPage({ lang = "en" as Lang2 }: { lang?: Lang2 }) {
  const es = lang === "es";
  return (
    <>
      <Lede lang={lang} />
      <PageHero
        lang={lang}
        breadcrumbs={[{ name: es ? "Obra Nueva" : "New Construction", path: L("/new-construction", lang) }]}
        eyebrow={t(nc.eyebrow, lang)}
        title={t(nc.title, lang)}
        intro={t(nc.intro, lang)}
        primary={{ label: es ? "Registrarme antes de visitar" : "Register Me Before I Tour", href: L("/contact?topic=new-construction", lang) }}
        secondary={{ label: es ? "Ver los niveles" : "See the tiers", href: "#tiers" }}
      />

      <Section tone="white" id="tiers">
        <SectionHeading
          eyebrow={es ? "Niveles de reembolso" : "Rebate tiers"}
          title={es ? "Lo que le devolvemos" : "What we hand back"}
          intro={es
            ? `Basado en el precio de compra, cuando el constructor paga una comisión cooperativa de al menos ${economics.minBuilderCoop}.`
            : `Based on purchase price, when the builder pays a cooperating commission of at least ${economics.minBuilderCoop}.`}
        />
        <div className="mx-auto mt-10 max-w-3xl overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-sand-100">
                <th className="rounded-l-lg px-5 py-3 font-display text-base font-medium text-navy-800">
                  {es ? "Precio de compra" : "Purchase price"}
                </th>
                <th className="rounded-r-lg px-5 py-3 text-right font-display text-base font-medium text-navy-800">
                  {es ? "Su reembolso" : "Your rebate"}
                </th>
              </tr>
            </thead>
            <tbody>
              {rebateTiers.map((r) => (
                <tr key={r.rebate} className="border-b border-navy-100 last:border-0">
                  <td className="px-5 py-4 text-[15px] text-slate-700">{t(r.price, lang)}</td>
                  <td className="px-5 py-4 text-right font-display text-2xl font-semibold text-navy-800">{r.rebate}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-5 text-sm leading-relaxed text-slate-500">{compliance.rebateShort[lang]}</p>
        </div>
      </Section>

      <Section tone="sand">
        <SectionHeading eyebrow={es ? "Por qué importa" : "Why it matters"} title={es ? "El orden de las cosas decide si cobra." : "The order of operations decides whether you get paid."} />
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {t(nc.why, lang).map((w) => (
            <FeatureCard key={w.title} icon={w.icon as never} title={w.title}>
              {w.body}
            </FeatureCard>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading align="left" eyebrow={es ? "Cómo funciona" : "How it works"} title={es ? "Cinco pasos, uno urgente." : "Five steps, one of them urgent."} />
          </div>
          <div className="lg:col-span-8">
            <ProcessSteps steps={t(nc.steps, lang)} />
          </div>
        </div>
      </Section>

      <FaqSection items={t(nc.faqs, lang)} eyebrow="FAQ" title={es ? "Preguntas sobre el reembolso" : "Rebate questions"} />

      <Section tone="white">
        <div className="mx-auto max-w-3xl rounded-2xl border border-navy-100 bg-sand-50 p-7">
          <h3 className="font-display text-lg font-medium text-navy-800">{es ? "Términos del programa" : "Program terms"}</h3>
          <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-slate-600">
            {(es
              ? [
                  "El reembolso requiere un acuerdo de representación de comprador firmado antes de visitar, y que TrueNorth esté registrada como su agente con el constructor en su primera visita.",
                  `Requiere que el constructor pague una comisión cooperativa de al menos ${economics.minBuilderCoop} del precio de compra; por debajo de ese nivel el reembolso se reduce proporcionalmente.`,
                  "Se paga como crédito en el cierre a través del agente de cierre y aparece en el Closing Disclosure. No se paga en efectivo fuera del cierre.",
                  "Se divulga por escrito al constructor, a su prestamista y al agente de cierre, conforme a la Regla 61J2-10.028(2), F.A.C.",
                  "Su prestamista puede limitar o rechazar créditos del vendedor o de partes interesadas. La aprobación del prestamista es definitiva.",
                  "Sujeto al cierre efectivo de la transacción y al pago de la comisión por parte del constructor.",
                  "No es asesoría fiscal. Un reembolso generalmente ajusta su base de costo; consulte a su asesor fiscal.",
                ]
              : [
                  "The rebate requires a signed buyer representation agreement before touring, and TrueNorth registered as your agent with the builder on your first visit.",
                  `It requires the builder to pay a cooperating commission of at least ${economics.minBuilderCoop} of the purchase price; below that, the rebate is reduced proportionally.`,
                  "It is paid as a credit at closing through the closing agent and appears on the Closing Disclosure. It is never paid in cash outside closing.",
                  "It is disclosed in writing to the builder, your lender, and the closing agent, per Rule 61J2-10.028(2), F.A.C.",
                  "Your lender may limit or decline seller or interested-party credits. Lender approval is final.",
                  "It is contingent on the transaction actually closing and on the builder paying the commission.",
                  "This is not tax advice. A rebate generally adjusts your cost basis; ask your tax advisor.",
                ]
            ).map((line) => (
              <li key={line} className="flex gap-2.5">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBand
        lang={lang}
        title={es ? "Un mensaje antes de su primera visita." : "One text before your first model tour."}
        subtitle={es ? "Envíenos las comunidades de su lista y lo registramos hoy. Después de que entre solo, ya no se puede deshacer." : "Send us the communities on your list and we will register you today. After you walk in alone, it cannot be undone."}
        primary={{ label: es ? "Registrarme" : "Register Me", href: L("/contact?topic=new-construction", lang) }}
      />
    </>
  );
}

/* ───────────────────────────── Join ───────────────────────────── */

const join = {
  eyebrow: { en: "For agents", es: "Para agentes" },
  title: { en: "Keep your whole commission. Pay us $399 a deal.", es: "Conserve toda su comisión. Págenos $399 por transacción." },
  intro: {
    en: `${economics.agentSplit} to you, ${economics.transactionFee} per closed transaction, ${economics.monthlyFee} a month for the tech. No desk fee, no franchise fee, no royalty, no cap to chase — and the listing marketing package behind every deal you bring.`,
    es: `${economics.agentSplit} para usted, ${economics.transactionFee} por transacción cerrada, ${economics.monthlyFee} al mes por la tecnología. Sin cuota de escritorio, sin franquicia, sin regalías, sin tope que perseguir — y el paquete de marketing detrás de cada negocio que traiga.`,
  },
  faqs: {
    en: [
      { q: "What is the catch on the split?", a: `There isn't one. You keep ${economics.agentSplit} of your commission. We make our money on ${economics.transactionFee} per closed transaction and ${economics.monthlyFee} a month. If you close two deals a year, that is what you pay; if you close thirty, it is still that.` },
      { q: "What do I pay for on my own?", a: "Your license renewal, your Realtor association and MLS dues, your own errors and omissions insurance, your marketing beyond the listing package, and your vehicle and phone. The brokerage does not carry E&O for agents — you carry your own policy and file the certificate before your first transaction. We do not mark any of it up." },
      { q: "Is this a virtual brokerage?", a: "Yes, by design right now. Low overhead is exactly why the split works the way it does. We expect to open a physical office as the agent roster grows, and you will not pay a desk fee for it when we do." },
      { q: "What about training if I am newly licensed?", a: "You get contract-to-close walkthroughs, pricing and CMA workshops, and the broker on your first listing appointment and first offer. Newly licensed agents are welcome; unsupported newly licensed agents are how people leave the business." },
      { q: "Do I get leads?", a: "We do not promise a lead firehose, because brokerages that do are usually selling you back your own money. What we do have is a property management book across Hernando County, and those owners sell, buy, and refer. That business goes to our agents." },
      { q: "How do I start?", a: "Open the agent packet, sign it electronically, and we will schedule your onboarding. If you are still at another brokerage, we will walk you through the DBPR transfer so your license moves cleanly." },
    ],
    es: [
      { q: "¿Cuál es la trampa en la división?", a: `No hay. Usted conserva el ${economics.agentSplit} de su comisión. Nosotros ganamos con ${economics.transactionFee} por transacción cerrada y ${economics.monthlyFee} al mes. Si cierra dos negocios al año, eso paga; si cierra treinta, sigue siendo lo mismo.` },
      { q: "¿Qué pago por mi cuenta?", a: "La renovación de su licencia, sus cuotas de asociación y MLS, su propio seguro de errores y omisiones, su marketing más allá del paquete de listados, y su vehículo y teléfono. La correduría no cubre E&O para los agentes — usted contrata su póliza y entrega el certificado antes de su primera transacción. No le cobramos sobreprecio por nada de eso." },
      { q: "¿Es una correduría virtual?", a: "Sí, por diseño en este momento. El bajo costo operativo es precisamente por lo que la división funciona así. Esperamos abrir una oficina física conforme crezca el equipo, y no pagará cuota de escritorio cuando ocurra." },
      { q: "¿Y la capacitación si soy nuevo?", a: "Recibe recorridos de contrato a cierre, talleres de precios y CMA, y al corredor en su primera cita de listado y su primera oferta. Los agentes nuevos son bienvenidos; los agentes nuevos sin apoyo son los que abandonan el negocio." },
      { q: "¿Me dan prospectos?", a: "No prometemos una avalancha de prospectos, porque las corredurías que lo hacen suelen venderle su propio dinero. Lo que sí tenemos es una cartera de administración de rentas en todo el Condado de Hernando, y esos propietarios venden, compran y refieren. Ese negocio va a nuestros agentes." },
      { q: "¿Cómo empiezo?", a: "Abra el paquete de agente, fírmelo electrónicamente y agendamos su incorporación. Si está en otra correduría, lo guiamos en el traslado con el DBPR para que su licencia se mueva sin problemas." },
    ],
  },
};

export function JoinPage({ lang = "en" as Lang2 }: { lang?: Lang2 }) {
  const es = lang === "es";
  const packet = site.links.agentPacket;
  const startHref = packet || L("/contact?topic=join", lang);
  return (
    <>
      <Lede lang={lang} />
      <PageHero
        lang={lang}
        breadcrumbs={[{ name: es ? "Únase a la Correduría" : "Join the Brokerage", path: L("/join", lang) }]}
        eyebrow={t(join.eyebrow, lang)}
        title={t(join.title, lang)}
        intro={t(join.intro, lang)}
        primary={{ label: es ? "Abrir el paquete de agente" : "Open the Agent Packet", href: startHref }}
        secondary={{ label: es ? "Hablar con el corredor" : "Talk to the broker", href: L("/contact?topic=join", lang) }}
      />

      <Section tone="white">
        <SectionHeading
          eyebrow={es ? "La economía" : "The economics"}
          title={es ? "Lo que paga, al lado de lo que probablemente paga hoy." : "What you pay, next to what you probably pay now."}
        />
        <div className="mx-auto mt-10 max-w-4xl overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-sand-100">
                <th className="rounded-l-lg px-5 py-3 font-display text-base font-medium text-navy-800">{es ? "Concepto" : "Line item"}</th>
                <th className="px-5 py-3 font-display text-base font-medium text-navy-800">{site.salesBrand}</th>
                <th className="rounded-r-lg px-5 py-3 font-display text-base font-medium text-slate-500">{es ? "Correduría típica" : "Typical brokerage"}</th>
              </tr>
            </thead>
            <tbody>
              {feeTable.map((row) => (
                <tr key={row.label.en} className="border-b border-navy-100 last:border-0">
                  <td className="px-5 py-3.5 text-[15px] text-slate-700">{t(row.label, lang)}</td>
                  <td className="px-5 py-3.5 text-[15px] font-semibold text-navy-800">{t(row.tn, lang)}</td>
                  <td className="px-5 py-3.5 text-[15px] text-slate-500">{t(row.typical, lang)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section tone="sand">
        <SectionHeading eyebrow={es ? "Qué recibe" : "What you get"} title={es ? "Una correduría premier sin el costo de una." : "A premier brokerage without a premier brokerage's overhead."} />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {agentBenefits.map((b) => (
            <FeatureCard key={b.title.en} icon={b.icon as never} title={t(b.title, lang)}>
              {t(b.body, lang)}
            </FeatureCard>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <Card className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl text-navy-800">{es ? "El paquete de agente" : "The agent packet"}</h2>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-slate-600">
            {es
              ? "Acuerdo de contratista independiente, política de comisiones, políticas de la correduría y los formularios del DBPR para trasladar su licencia. Todo se firma electrónicamente, normalmente en menos de quince minutos."
              : "Independent contractor agreement, commission policy, brokerage policies, and the DBPR forms to move your license. All signed electronically, usually in under fifteen minutes."}
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={startHref} variant="gold" size="lg">
              {es ? "Abrir el paquete de agente" : "Open the Agent Packet"} <Icon name="arrow-right" className="h-4 w-4" />
            </Button>
            <Button href={L("/contact?topic=join", lang)} variant="secondary" size="lg">
              {es ? "Primero una conversación" : "A conversation first"}
            </Button>
          </div>
          {!packet && (
            <p className="mt-5 text-sm text-slate-500">
              {es
                ? "¿Prefiere hablar antes de firmar? Escríbanos y le enviamos el paquete por correo."
                : "Rather talk before you sign anything? Reach out and we will send the packet to your inbox."}
            </p>
          )}
        </Card>
      </Section>

      <FaqSection items={t(join.faqs, lang)} eyebrow="FAQ" title={es ? "Preguntas de agentes" : "Agent questions"} />
      <CtaBand
        lang={lang}
        title={es ? "Traiga su licencia. Quédese con su comisión." : "Bring your license. Keep your commission."}
        subtitle={es ? "Una conversación directa con el corredor-propietario, sin presentación de reclutamiento." : "A straight conversation with the broker-owner, not a recruiting presentation."}
        primary={{ label: es ? "Hablar con el corredor" : "Talk to the Broker", href: L("/contact?topic=join", lang) }}
      />
    </>
  );
}

/* ───────────────────────── Brokerage hub ───────────────────────── */

export function BrokerageHub({ lang = "en" as Lang2 }: { lang?: Lang2 }) {
  const es = lang === "es";
  const doors = es
    ? [
        { icon: "home", title: "Vender", body: `${economics.listingCommission} de tarifa de listado, con fotografía, video aéreo, planos, volantes impresos y casas abiertas incluidos.`, href: "/sell", cta: "Vender mi casa" },
        { icon: "key", title: "Comprar", body: `Representación con los números al frente — y ${economics.headlineRebate} de vuelta en el cierre en obra nueva.`, href: "/buy", cta: "Comprar una casa" },
        { icon: "users", title: "Unirse como agente", body: `${economics.agentSplit} de comisión, ${economics.transactionFee} por transacción, ${economics.monthlyFee} al mes. Sin división, sin franquicia.`, href: "/join", cta: "Ver los términos" },
      ]
    : [
        { icon: "home", title: "Sell", body: `${economics.listingCommission} listing fee, with photography, aerial video, floor plans, printed flyers, and open houses included.`, href: "/sell", cta: "Sell my home" },
        { icon: "key", title: "Buy", body: `Representation with the numbers up front — and ${economics.headlineRebate} back at closing on new construction.`, href: "/buy", cta: "Buy a home" },
        { icon: "users", title: "Join as an agent", body: `${economics.agentSplit} commission, ${economics.transactionFee} per transaction, ${economics.monthlyFee} a month. No split, no franchise.`, href: "/join", cta: "See the terms" },
      ];
  return (
    <>
      <Lede lang={lang} />
      <PageHero
        lang={lang}
        breadcrumbs={[{ name: es ? "Correduría" : "Brokerage", path: L("/brokerage", lang) }]}
        eyebrow={site.salesBrand}
        title={es ? "Compre, venda e invierta con la correduría que también administra la renta." : "Buy, sell, and invest with the brokerage that also manages the rental."}
        intro={es
          ? "Somos una correduría local, dirigida por su corredor-propietario, en el Condado de Hernando. Vemos los dos lados del mercado todos los días: lo que se vende y lo que se renta. Eso cambia el consejo que recibe."
          : "We are a local, broker-owned brokerage in Hernando County. We see both sides of the market every day — what sells and what rents. That changes the advice you get."}
        primary={{ label: es ? "Hablar con el corredor" : "Talk to the Broker", href: L("/contact", lang) }}
      />

      <Section tone="white">
        <div className="grid gap-5 sm:grid-cols-3">
          {doors.map((d) => (
            <Card key={d.title} className="flex flex-col">
              <Icon name={d.icon as never} className="h-7 w-7 text-gold-600" />
              <h2 className="mt-4 font-display text-2xl text-navy-800">{d.title}</h2>
              <p className="mt-2 flex-1 leading-relaxed text-slate-600">{d.body}</p>
              <Link href={L(d.href, lang)} className="mt-5 inline-flex items-center gap-1.5 font-medium text-navy-700 hover:text-gold-700">
                {d.cta} <Icon name="arrow-right" className="h-4 w-4" />
              </Link>
            </Card>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed text-slate-500">
          {compliance.commissionsNegotiable[lang]}
        </p>
      </Section>

      <CtaBand
        lang={lang}
        title={es ? "Una llamada, sin libreto." : "One call, no script."}
        subtitle={es ? "Vender, comprar, rentar, o decidir cuál de los tres. Hablemos del caso específico." : "Selling, buying, renting, or deciding which of the three. Let's talk about the specific situation."}
        primary={{ label: es ? "Contactar" : "Contact Us", href: L("/contact", lang) }}
      />
    </>
  );
}
