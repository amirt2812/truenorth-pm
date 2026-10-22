import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { BuyPage } from "@/components/sections/BrokeragePages";

export const metadata: Metadata = pageMeta({
  title: "Compre una Casa en el Condado de Hernando, FL",
  description: "Un agente del comprador que analiza la propiedad antes de ofertar — más un reembolso de obra nueva pagado en el cierre.",
  path: "/buy",
  lang: "es",
});

export default function Page() {
  return <BuyPage lang="es" />;
}
