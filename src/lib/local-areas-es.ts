import type { Area } from "./local-areas";

/**
 * Spanish content for the 5 local SEO area pages. Mirrors local-areas.ts with
 * unique, non-duplicate copy per area. Rendered by LocalAreaPage with lang="es".
 */
export const areasEs: Record<string, Area> = {
  "hernando-county-property-management": {
    slug: "hernando-county-property-management",
    city: "Condado de Hernando",
    metaTitle: "Administración de Propiedades en el Condado de Hernando | TrueNorth",
    metaDescription:
      "Administración de propiedades local y transparente en todo el Condado de Hernando, FL — Spring Hill, Brooksville, Weeki Wachee y Hernando Beach. Análisis de renta gratis y precios claros.",
    h1: "Administración de Propiedades en todo el Condado de Hernando",
    intro: [
      "El mercado de renta del Condado de Hernando abarca los fraccionamientos en crecimiento de Spring Hill, los vecindarios establecidos de Brooksville, las casas costeras de Hernando Beach y Weeki Wachee, y comunidades 55+ como Timber Pines. Cada submercado se renta de forma distinta — y un administrador de talla única rara vez acierta en el precio o en el inquilino adecuado.",
      "TrueNorth Property Management aporta sistemas de calidad institucional a los arrendadores residenciales locales, con precios transparentes, una experiencia para propietario e inquilino con RentRedi, y el tipo de capacidad de respuesta que conserva buenos inquilinos y protege su activo.",
    ],
    painPoints: [
      "Administradores que fijan precios con base en promedios de todo el condado",
      "Comunicación lenta de oficinas regionales fuera del área",
      "Facturas de mantenimiento vagas sin documentación",
      "Estados de cuenta difíciles de leer",
      "Sin umbrales claros de aprobación antes de las reparaciones",
    ],
    whyLocal:
      "El Condado de Hernando no es un solo mercado — son muchos. Fijar el precio de una casa 3/2 en Spring Hill como una casa frente al canal en Hernando Beach deja dinero sobre la mesa o causa vacancias largas. La administración local significa precios informados por el mercado, ojos locales más rápidos en su propiedad y selección de inquilinos ajustada al área.",
    highlights: [
      { title: "Cobertura de todo el condado", body: "Spring Hill, Brooksville, Weeki Wachee, Hernando Beach, Timber Pines y comunidades cercanas." },
      { title: "Precios informados por el mercado", body: "Posicionamiento de renta basado en comparables locales, submercado por submercado." },
      { title: "Operaciones preparadas para huracanes", body: "Preparación específica de Florida para que los propietarios no estén improvisando cuando amenaza el clima." },
    ],
    faqs: [
      { q: "¿Qué partes del Condado de Hernando atienden?", a: "Atendemos Spring Hill, Brooksville, Weeki Wachee, Hernando Beach, Timber Pines y comunidades cercanas en todo el condado." },
      { q: "¿Fijan el mismo precio para todas las propiedades?", a: "No. Posicionamos la renta con base en comparables locales de cada submercado en lugar de un promedio de todo el condado." },
      { q: "¿Pueden administrar una propiedad si vivo fuera del estado?", a: "Sí. Nuestro portal del propietario con RentRedi y los reportes mensuales claros están diseñados para que los propietarios de fuera del área se mantengan plenamente informados." },
    ],
  },
};
