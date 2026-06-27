/**
 * ============================================================================
 *  PROPERTY LISTINGS — edit this file to manage what appears on /properties
 * ============================================================================
 *  HOW TO ADD A PROPERTY
 *  1. Add photos to /public/properties/<slug>/  (e.g. 01.jpg, 02.jpg …).
 *     - First image is the cover. Use landscape photos ~1600px wide.
 *  2. Copy one of the objects below, change the fields, and give it a unique
 *     `slug` (lowercase, words-with-dashes — becomes the URL /properties/<slug>).
 *  3. Set `status` to "available" or "leased". Leased homes stay listed (great
 *     for showing your track record) and are filtered with the toggle.
 *  4. `descriptionEs` is optional — if omitted, the English description shows on
 *     the Spanish page too.
 *
 *  The sample entries below are PLACEHOLDERS (note isSample: true) — replace
 *  them with your real listings. Until you add photos, a branded placeholder
 *  image shows automatically, so nothing looks broken.
 *
 *  Upgrade path: when you outgrow editing this file, these same fields can be
 *  fed from RentRedi, a CMS, or a spreadsheet without changing the page code.
 * ============================================================================
 */

export type PropertyStatus = "available" | "leased";

export type Property = {
  slug: string;
  title: string;
  status: PropertyStatus;
  rent: number; // monthly rent in USD
  beds: number;
  baths: number;
  sqft?: number;
  address: string; // street line shown on the card
  city: string;
  /** Folder under /public/properties/<slug>/ — list filenames in display order. */
  images: string[];
  description: string;
  descriptionEs?: string;
  /** Optional highlight bullets (e.g. "Screened lanai", "2-car garage"). */
  features?: string[];
  featuresEs?: string[];
  availableDate?: string; // ISO; shown for available homes ("Available now" if past/empty)
  petPolicy?: string;
  isSample?: boolean;
};

export const properties: Property[] = [
  {
    slug: "sample-spring-hill-3-2",
    title: "Updated 3 Bed / 2 Bath Home",
    status: "available",
    rent: 1895,
    beds: 3,
    baths: 2,
    sqft: 1620,
    address: "[Sample listing — replace in src/lib/properties.ts]",
    city: "Spring Hill",
    images: [], // add photos to /public/properties/sample-spring-hill-3-2/
    description:
      "A bright, move-in-ready single-family home in a quiet Spring Hill neighborhood. Open kitchen with stainless appliances, split floor plan, screened lanai, and a fenced backyard. Minutes from US-19 and Tampa-bound commuter routes.",
    descriptionEs:
      "Una casa unifamiliar luminosa y lista para mudarse en un tranquilo vecindario de Spring Hill. Cocina abierta con electrodomésticos de acero inoxidable, plano dividido, lanai con mosquitero y patio cercado. A minutos de la US-19 y de las rutas hacia Tampa.",
    features: ["Screened lanai", "2-car garage", "Fenced backyard", "Stainless appliances"],
    featuresEs: ["Lanai con mosquitero", "Garaje para 2 autos", "Patio cercado", "Electrodomésticos de acero inoxidable"],
    availableDate: "",
    petPolicy: "Pets considered with deposit",
    isSample: true,
  },
  {
    slug: "sample-brooksville-4-2",
    title: "Spacious 4 Bed / 2 Bath with Office",
    status: "available",
    rent: 2250,
    beds: 4,
    baths: 2,
    sqft: 2080,
    address: "[Sample listing — replace in src/lib/properties.ts]",
    city: "Brooksville",
    images: [],
    description:
      "Roomy family home on a larger Brooksville lot. Four bedrooms plus a dedicated office, formal dining, and a two-car garage. Mature landscaping and plenty of space inside and out.",
    descriptionEs:
      "Amplia casa familiar en un lote más grande de Brooksville. Cuatro recámaras más una oficina dedicada, comedor formal y garaje para dos autos. Jardinería madura y mucho espacio por dentro y por fuera.",
    features: ["Home office", "Formal dining", "Large lot", "2-car garage"],
    featuresEs: ["Oficina en casa", "Comedor formal", "Lote grande", "Garaje para 2 autos"],
    availableDate: "",
    petPolicy: "No pets",
    isSample: true,
  },
  {
    slug: "sample-weeki-wachee-2-2",
    title: "Coastal 2 Bed / 2 Bath Villa",
    status: "leased",
    rent: 1650,
    beds: 2,
    baths: 2,
    sqft: 1240,
    address: "[Sample listing — replace in src/lib/properties.ts]",
    city: "Weeki Wachee",
    images: [],
    description:
      "Low-maintenance villa near the water in Weeki Wachee. Tile throughout, a screened patio, and easy access to the river and gulf. Currently leased — contact us to be notified of similar homes.",
    descriptionEs:
      "Villa de bajo mantenimiento cerca del agua en Weeki Wachee. Pisos de loseta, patio con mosquitero y fácil acceso al río y al golfo. Actualmente arrendada — contáctenos para recibir aviso de casas similares.",
    features: ["Tile throughout", "Screened patio", "Near the water"],
    featuresEs: ["Pisos de loseta", "Patio con mosquitero", "Cerca del agua"],
    petPolicy: "Pets considered with deposit",
    isSample: true,
  },
];

export const getProperty = (slug: string) => properties.find((p) => p.slug === slug);

export const propertySlugs = properties.map((p) => p.slug);

/** Cover image path, with a branded placeholder when a listing has no photos. */
export function coverImage(p: Property): string {
  return p.images.length > 0 ? `/properties/${p.slug}/${p.images[0]}` : "/properties/placeholder.svg";
}

/** All image paths for a property's gallery (falls back to the placeholder). */
export function galleryImages(p: Property): string[] {
  if (p.images.length === 0) return ["/properties/placeholder.svg"];
  return p.images.map((f) => `/properties/${p.slug}/${f}`);
}

export const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
