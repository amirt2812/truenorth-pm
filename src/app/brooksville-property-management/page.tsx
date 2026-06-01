import { areas } from "@/lib/local-areas";
import { LocalAreaPage, buildAreaMetadata } from "@/components/sections/LocalAreaPage";

const area = areas["brooksville-property-management"];
export const metadata = buildAreaMetadata(area);
export default function Page() {
  return <LocalAreaPage area={area} />;
}
