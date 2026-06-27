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
  rent?: number; // monthly rent in USD — omit to hide the price (e.g. leased showcase homes)
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
    slug: "2168-godfrey-ave-spring-hill",
    title: "2168 Godfrey Ave",
    status: "leased",
    beds: 4,
    baths: 2,
    sqft: 1754,
    address: "2168 Godfrey Avenue",
    city: "Spring Hill",
    images: [
      "House Front-1.jpg",
      "Front Porch-1.jpg",
      "Living Room 1.jpg",
      "Living Room 2.jpg",
      "Kitchen-1.jpg",
      "Dining-1.jpg",
      "Master BR Sink.jpg",
      "Master BR Shower.jpg",
      "Master BR Toilet.jpg",
      "Guest BR.jpg",
      "Laundry.jpg",
    ],
    description:
      "A 2022-built single-family home in Spring Hill, professionally managed by TrueNorth Property Management. Currently leased — contact us to be notified of similar rentals as they become available.",
    descriptionEs:
      "Una casa unifamiliar construida en 2022 en Spring Hill, administrada profesionalmente por TrueNorth Property Management. Actualmente arrendada — contáctenos para recibir aviso de rentas similares.",
    features: [],
    featuresEs: [],
    availableDate: "",
    petPolicy: "",
    isSample: true,
  },
  {
    slug: "10387-belltower-st-spring-hill",
    title: "10387 Belltower St",
    status: "leased",
    beds: 4,
    baths: 2,
    sqft: 1828,
    address: "10387 Belltower Street",
    city: "Spring Hill",
    images: [
      "Cover Photo.jpg",
      "Backyard.jpg",
      "Covered Lanai.jpg",
      "Living Room.JPG",
      "Kitchen 1.JPG",
      "Kitchen 2.JPG",
      "Dining Room.JPG",
      "Walk In Pantry.JPG",
      "Main Hallway.JPG",
      "Master Bedroom.JPG",
      "Master Bathroom.JPG",
      "Master Walk In Closet.JPG",
      "Bedroom 1.JPG",
      "Bedroom 2.JPG",
      "Bedroom 3.JPG",
      "Secondary Bathroom.JPG",
      "Laundry Room.JPG",
      "Floor Plan.jpg",
    ],
    description:
      "A single-family home in Spring Hill, professionally managed by TrueNorth Property Management. Currently leased — contact us to be notified of similar rentals as they become available.",
    descriptionEs:
      "Una casa unifamiliar en Spring Hill, administrada profesionalmente por TrueNorth Property Management. Actualmente arrendada — contáctenos para recibir aviso de rentas similares.",
    features: [],
    featuresEs: [],
    availableDate: "",
    petPolicy: "",
    isSample: true,
  },
  {
    slug: "3118-windbrook-ave-spring-hill",
    title: "3118 Windbrook Ave",
    status: "leased",
    beds: 4,
    baths: 2,
    sqft: 1828,
    address: "3118 Windbrook Avenue",
    city: "Spring Hill",
    images: [
      "Cover Photo.jpg",
      "Backyard.jpg",
      "Covered Lanai.jpg",
      "Living Room.JPG",
      "Kitchen 1.JPG",
      "Kitchen 2.JPG",
      "Dining Room.JPG",
      "Walk In Pantry.JPG",
      "Main Hallway.JPG",
      "Master Bedroom.JPG",
      "Master Bathroom.JPG",
      "Master Walk In Closet.JPG",
      "Bedroom 1.JPG",
      "Bedroom 2.JPG",
      "Bedroom 3.JPG",
      "Secondary Bathroom.JPG",
      "Laundry Room.JPG",
      "Floor Plan.jpg",
    ],
    description:
      "A newer concrete-block single-family home in Spring Hill with an open-concept layout, professionally managed by TrueNorth Property Management. Currently leased — contact us to be notified of similar rentals as they become available.",
    descriptionEs:
      "Una casa unifamiliar más reciente de bloque de concreto en Spring Hill con un diseño de concepto abierto, administrada profesionalmente por TrueNorth Property Management. Actualmente arrendada — contáctenos para recibir aviso de rentas similares.",
    features: [],
    featuresEs: [],
    availableDate: "",
    petPolicy: "",
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
