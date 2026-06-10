import { areasEs } from "@/lib/local-areas-es";
import { LocalAreaPage, buildAreaMetadata } from "@/components/sections/LocalAreaPage";

const area = areasEs["weeki-wachee-property-management"];
export const metadata = buildAreaMetadata(area, "es");
export default function Page() {
  return <LocalAreaPage area={area} lang="es" />;
}
