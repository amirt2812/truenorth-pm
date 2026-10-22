/**
 * ============================================================================
 *  BROKERAGE (sales side) — content + economics
 * ============================================================================
 *  The rental side of the business trades as TrueNorth Property Management.
 *  The sales side trades under the legal name, TrueNorth Brokerage Group,
 *  because a property-management name on a listing confuses sellers.
 *
 *  Every number a visitor can act on lives in `economics` below. Change it
 *  here and it updates the listing page, the buyer page, the new-construction
 *  rebate page, the agent recruiting page, and the FAQs together.
 * ============================================================================
 */

export type Lang2 = "en" | "es";
export type L<T> = { en: T; es: T };

export const economics = {
  /** Listing side, paid to TrueNorth at closing. */
  listingCommission: "2.5%",
  /** What an agent keeps of their own commission. */
  agentSplit: "100%",
  /** Per closed transaction, charged to the agent. */
  transactionFee: "$399",
  /** Monthly, covers the CRM and tooling. */
  monthlyFee: "$20",
  deskFee: "$0",
  franchiseFee: "$0",
  /** Headline new-construction rebate (the $300k–$499,999 tier). */
  headlineRebate: "$2,500",
  maxRebate: "$5,000",
  /** Minimum builder-paid commission for a full-tier rebate. */
  minBuilderCoop: "2%",
} as const;

/**
 * New-construction rebate tiers. Paid as a credit at closing, never as cash
 * outside closing, and always disclosed to every interested party per
 * Rule 61J2-10.028(2), F.A.C.
 */
export const rebateTiers: { price: L<string>; rebate: string }[] = [
  { price: { en: "Under $300,000", es: "Menos de $300,000" }, rebate: "$1,500" },
  { price: { en: "$300,000 – $499,999", es: "$300,000 – $499,999" }, rebate: "$2,500" },
  { price: { en: "$500,000 – $749,999", es: "$500,000 – $749,999" }, rebate: "$3,500" },
  { price: { en: "$750,000 and above", es: "$750,000 o más" }, rebate: "$5,000" },
];

/** The listing marketing package, included at the single listing fee. */
export const marketingSuite: { icon: string; title: L<string>; body: L<string> }[] = [
  {
    icon: "image",
    title: { en: "Professional photography", es: "Fotografía profesional" },
    body: {
      en: "A full interior and exterior shoot, professionally edited and color-corrected. Not phone photos.",
      es: "Una sesión completa de interiores y exteriores, editada profesionalmente y con color corregido. No son fotos de teléfono.",
    },
  },
  {
    icon: "eye",
    title: { en: "Aerial photos and video", es: "Fotos y video aéreos" },
    body: {
      en: "Drone coverage that shows the lot, the roofline, the water or conservation behind you, and how the home sits in the neighborhood.",
      es: "Cobertura con dron que muestra el lote, la línea del techo, el agua o la conservación detrás de usted, y cómo se ubica la casa en el vecindario.",
    },
  },
  {
    icon: "compass",
    title: { en: "Edited listing video", es: "Video de la propiedad editado" },
    body: {
      en: "A walkthrough cut for social and for the listing itself, not a slideshow of the same photos.",
      es: "Un recorrido editado para redes sociales y para la propiedad misma, no una presentación de las mismas fotos.",
    },
  },
  {
    icon: "ruler",
    title: { en: "Floor plan", es: "Plano de planta" },
    body: {
      en: "A measured floor plan buyers can read before they drive out, which filters out the wrong showings.",
      es: "Un plano medido que los compradores pueden leer antes de venir, lo que filtra las visitas equivocadas.",
    },
  },
  {
    icon: "doc",
    title: { en: "Print brochures and flyers", es: "Folletos y volantes impresos" },
    body: {
      en: "Designed property flyers for the counter, the sign box, and the open house. Printed, not emailed to you to print.",
      es: "Volantes de la propiedad diseñados para el mostrador, el letrero y la casa abierta. Impresos, no enviados para que usted los imprima.",
    },
  },
  {
    icon: "users",
    title: { en: "Open houses", es: "Casas abiertas" },
    body: {
      en: "Scheduled, advertised, and hosted by a licensee — with every visitor logged and followed up the next business day.",
      es: "Programadas, anunciadas y atendidas por un licenciatario — con cada visitante registrado y contactado al siguiente día hábil.",
    },
  },
  {
    icon: "chart",
    title: { en: "Syndication everywhere buyers look", es: "Difusión donde los compradores buscan" },
    body: {
      en: "The MLS feeds Zillow, Realtor.com, Redfin, Homes.com and hundreds of other sites, with the listing copy and photo order controlled by us.",
      es: "El MLS alimenta Zillow, Realtor.com, Redfin, Homes.com y cientos de sitios más, con el texto y el orden de las fotos controlados por nosotros.",
    },
  },
  {
    icon: "pin",
    title: { en: "Sign, lockbox, and showing service", es: "Letrero, caja de llaves y servicio de visitas" },
    body: {
      en: "Professional signage, an electronic lockbox that logs who entered, and showing requests handled so you are not the scheduler.",
      es: "Señalización profesional, una caja electrónica que registra quién entró, y solicitudes de visita gestionadas para que usted no sea el coordinador.",
    },
  },
  {
    icon: "clock",
    title: { en: "Weekly seller reporting", es: "Reporte semanal al vendedor" },
    body: {
      en: "Views, saves, showings, and feedback every week, with a pricing recommendation when the data says to move.",
      es: "Vistas, guardados, visitas y comentarios cada semana, con una recomendación de precio cuando los datos lo indiquen.",
    },
  },
];

/** Why an agent joins. */
export const agentBenefits: { icon: string; title: L<string>; body: L<string> }[] = [
  {
    icon: "dollar",
    title: { en: "You keep 100% of your commission", es: "Usted conserva el 100% de su comisión" },
    body: {
      en: `No split. ${economics.transactionFee} per closed transaction and ${economics.monthlyFee} a month for the tech stack. No desk fee, no franchise fee, no royalty, no monthly minimum.`,
      es: `Sin división. ${economics.transactionFee} por transacción cerrada y ${economics.monthlyFee} al mes por la plataforma. Sin cuota de escritorio, sin franquicia, sin regalías, sin mínimo mensual.`,
    },
  },
  {
    icon: "chat",
    title: { en: "The broker answers his own phone", es: "El corredor contesta su propio teléfono" },
    body: {
      en: "You are not routed to a team lead. Contract questions go straight to the broker-owner and get an answer the same day.",
      es: "No lo redirigen a un líder de equipo. Las preguntas de contrato van directo al corredor-propietario y reciben respuesta el mismo día.",
    },
  },
  {
    icon: "image",
    title: { en: "The listing package, at your disposal", es: "El paquete de marketing, a su disposición" },
    body: {
      en: "Photography, aerial, video, floor plans, flyers, and open house support on your listings too. You win listings against agents who have to pay for all of it themselves.",
      es: "Fotografía, aéreo, video, planos, volantes y apoyo en casas abiertas también en sus propiedades. Gana listados frente a agentes que pagan todo eso por su cuenta.",
    },
  },
  {
    icon: "doc",
    title: { en: "Full CRM and transaction management", es: "CRM completo y gestión de transacciones" },
    body: {
      en: "Pipeline, drip campaigns, e-signature, and a document checklist per file, so nothing sits unsigned the night before closing.",
      es: "Pipeline, campañas automatizadas, firma electrónica y lista de documentos por expediente, para que nada quede sin firmar la noche antes del cierre.",
    },
  },
  {
    icon: "compass",
    title: { en: "Training and real mentorship", es: "Capacitación y mentoría real" },
    body: {
      en: "Contract-to-close walkthroughs, pricing and CMA workshops, lead conversion scripts, and a broker who will sit in on your first listing appointment if you want.",
      es: "Recorridos de contrato a cierre, talleres de precios y CMA, guiones de conversión, y un corredor que lo acompaña a su primera cita de listado si lo desea.",
    },
  },
  {
    icon: "home",
    title: { en: "Business the rental side creates", es: "Negocio que genera el lado de rentas" },
    body: {
      en: "We manage rentals across Hernando County. Those owners buy, sell, and refer — and that flow goes to the agents in this brokerage, not to a call center.",
      es: "Administramos rentas en todo el Condado de Hernando. Esos propietarios compran, venden y refieren — y ese flujo va a los agentes de esta correduría, no a un centro de llamadas.",
    },
  },
];

/** Fee comparison rows: [label, TrueNorth, typical brokerage]. */
export const feeTable: { label: L<string>; tn: L<string>; typical: L<string> }[] = [
  {
    label: { en: "Commission split", es: "División de comisión" },
    tn: { en: "100% to you", es: "100% para usted" },
    typical: { en: "70/30 to 80/20 until you cap", es: "70/30 a 80/20 hasta alcanzar el tope" },
  },
  {
    label: { en: "Per transaction", es: "Por transacción" },
    tn: { en: economics.transactionFee, es: economics.transactionFee },
    typical: { en: "$300 – $600 on top of the split", es: "$300 – $600 además de la división" },
  },
  {
    label: { en: "Monthly", es: "Mensual" },
    tn: { en: `${economics.monthlyFee} for the CRM and tools`, es: `${economics.monthlyFee} por el CRM y herramientas` },
    typical: { en: "$50 – $150 tech and desk fees", es: "$50 – $150 en cuotas de tecnología y escritorio" },
  },
  {
    label: { en: "Desk fee", es: "Cuota de escritorio" },
    tn: { en: economics.deskFee, es: economics.deskFee },
    typical: { en: "$200 – $1,000 a month", es: "$200 – $1,000 al mes" },
  },
  {
    label: { en: "Franchise or royalty fee", es: "Franquicia o regalías" },
    tn: { en: economics.franchiseFee, es: economics.franchiseFee },
    typical: { en: "5% – 6% off the top", es: "5% – 6% desde el inicio" },
  },
  {
    label: { en: "Errors and omissions insurance", es: "Seguro de errores y omisiones" },
    tn: { en: "You carry your own", es: "Usted contrata el suyo" },
    typical: { en: "Bundled, or billed per file", es: "Incluido, o cobrado por expediente" },
  },
  {
    label: { en: "Listing marketing package", es: "Paquete de marketing de listados" },
    tn: { en: "Included", es: "Incluido" },
    typical: { en: "Agent pays per listing", es: "El agente paga por listado" },
  },
];
