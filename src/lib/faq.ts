import { site, serviceAreaSentence, isBrokerageNamed } from "./site";

/** Master FAQ list for /faq. License answer uses the required placeholder. */
export const faqs: { q: string; a: string }[] = [
  { q: "What areas do you serve?", a: `We serve ${serviceAreaSentence}` },
  { q: "What types of properties do you manage?", a: "We manage residential rentals — single-family homes, townhomes, condos, and small multi-unit and portfolio properties across Hernando County." },
  { q: "How much do your services cost?", a: "Full-service plans start at $99/month (Essential), $149/month (Plus), and $229/month (Premier), plus à la carte leasing and renewal options. Final pricing depends on property type, location, condition, service scope, and a signed management agreement." },
  { q: "Do you offer leasing-only services?", a: "Yes. Our Leasing Only service covers marketing, screening, showings, and lease execution for owners who self-manage day to day. It starts at 75% of the first month's rent (minimum fee to be confirmed)." },
  { q: "Can I approve repairs before work is done?", a: "Yes. You set an owner approval threshold. Routine work below it is coordinated and documented; work above it is sent to you for approval first, except genuine emergencies that protect health, safety, or the property." },
  { q: "How do you screen tenants?", a: "We apply a consistent, fair-housing-compliant screening process to every applicant. Specific criteria are provided in writing and applied uniformly. [INSERT final screening criteria once confirmed with your attorney/brokerage.]" },
  { q: "How do owners receive rent payments?", a: "Owner disbursements and statements are handled through our RentRedi-powered process, with online statements available in your owner portal." },
  { q: "How do tenants pay rent?", a: "Tenants pay rent online through the RentRedi tenant portal, with automated reminders." },
  { q: "Do you manage homes with HOAs?", a: "Yes. We manage properties governed by HOAs and help keep tenants aligned with community rules." },
  { q: "Do you handle evictions?", a: "TrueNorth can coordinate documentation and attorney handoff when legal action is required. Legal services are provided only by licensed attorneys; we do not provide legal representation or advice." },
  { q: "Do you hold security deposits?", a: "Security deposit handling is performed in accordance with applicable Florida law and the signed lease/management agreement." },
  { q: "What software do you use?", a: `We use ${site.softwarePlatform} as our primary property management suite for rent payments, maintenance requests, owner visibility, and centralized communication.` },
  { q: "Can I switch from another property manager?", a: "Yes. Many owners come to us from another manager. We'll walk you through a clean transition, subject to the terms of your current agreement and a signed management agreement with us." },
  { q: "Do you work with out-of-state owners?", a: "Yes. Our RentRedi owner portal and clear monthly reporting are built so out-of-area owners stay fully informed." },
  { q: "Are you a licensed brokerage?", a: isBrokerageNamed
      ? `Property management and leasing services are provided through ${site.brokerageLegalName}, a Florida licensed real estate brokerage (license ${site.brokerageLicenseNumber}), in accordance with applicable Florida law.`
      : "Property management and leasing services are provided in accordance with applicable Florida real estate law. Our full brokerage name and license number will be published here." },
];

/** Spanish master FAQ list for /es/faq. */
export const faqsEs: { q: string; a: string }[] = [
  { q: "¿Qué áreas atienden?", a: "Atendemos Spring Hill, Brooksville, Weeki Wachee, Hernando Beach, Timber Pines y las comunidades cercanas del Condado de Hernando." },
  { q: "¿Qué tipos de propiedades administran?", a: "Administramos rentas residenciales — casas unifamiliares, townhomes, condominios y propiedades pequeñas multifamiliares y de portafolio en todo el Condado de Hernando." },
  { q: "¿Cuánto cuestan sus servicios?", a: "Los planes integrales comienzan en $99/mes (Essential), $149/mes (Plus) y $229/mes (Premier), más opciones de arrendamiento y renovación por separado. El precio final depende del tipo de propiedad, ubicación, condición, alcance del servicio y un acuerdo de administración firmado." },
  { q: "¿Ofrecen servicios de solo arrendamiento?", a: "Sí. Nuestro servicio de Solo Arrendamiento cubre la promoción, selección, visitas y firma del contrato para propietarios que autoadministran el día a día. Comienza en 75% de la primera renta (tarifa mínima por confirmar)." },
  { q: "¿Puedo aprobar las reparaciones antes de que se realicen?", a: "Sí. Usted define un umbral de aprobación. El trabajo de rutina por debajo se coordina y documenta; el trabajo por encima se le envía para aprobación primero, salvo emergencias reales que protejan la salud, la seguridad o la propiedad." },
  { q: "¿Cómo seleccionan a los inquilinos?", a: "Aplicamos un proceso de selección consistente y conforme a la vivienda justa a cada solicitante. Los criterios específicos se entregan por escrito y se aplican de manera uniforme. [INSERTAR criterios de selección finales una vez confirmados con su abogado/correduría.]" },
  { q: "¿Cómo reciben los propietarios los pagos de renta?", a: "Los desembolsos y estados de cuenta del propietario se manejan a través de nuestro proceso con RentRedi, con estados en línea disponibles en su portal del propietario." },
  { q: "¿Cómo pagan la renta los inquilinos?", a: "Los inquilinos pagan renta en línea por el portal del inquilino de RentRedi, con recordatorios automáticos." },
  { q: "¿Administran casas con HOA?", a: "Sí. Administramos propiedades regidas por HOA y ayudamos a mantener a los inquilinos alineados con las reglas de la comunidad." },
  { q: "¿Manejan desalojos?", a: "TrueNorth puede coordinar la documentación y la entrega a un abogado cuando se requiere acción legal. Los servicios legales los brindan únicamente abogados con licencia; no brindamos representación ni asesoría legal." },
  { q: "¿Retienen los depósitos de seguridad?", a: "El manejo del depósito de seguridad se realiza de acuerdo con la ley aplicable de Florida y el contrato/acuerdo de administración firmado." },
  { q: "¿Qué software usan?", a: `Usamos ${site.softwarePlatform} como nuestra suite principal de administración de propiedades para pagos de renta, solicitudes de mantenimiento, visibilidad del propietario y comunicación centralizada.` },
  { q: "¿Puedo cambiar de otro administrador?", a: "Sí. Muchos propietarios llegan a nosotros desde otro administrador. Le guiaremos en una transición limpia, sujeta a los términos de su acuerdo actual y a un acuerdo de administración firmado con nosotros." },
  { q: "¿Trabajan con propietarios de fuera del estado?", a: "Sí. Nuestro portal del propietario con RentRedi y los reportes mensuales claros están diseñados para que los propietarios de fuera del área se mantengan plenamente informados." },
  { q: "¿Son una correduría con licencia?", a: isBrokerageNamed
      ? `Los servicios de administración y arrendamiento se brindan a través de ${site.brokerageLegalName}, una correduría de bienes raíces con licencia en Florida (licencia ${site.brokerageLicenseNumber}), de acuerdo con la ley aplicable de Florida.`
      : "Los servicios de administración y arrendamiento se brindan de acuerdo con la ley de bienes raíces aplicable de Florida. Nuestro nombre completo de correduría y número de licencia se publicarán aquí." },
];
