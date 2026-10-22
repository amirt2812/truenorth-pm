import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { NewConstructionPage } from "@/components/sections/BrokeragePages";

export const metadata: Metadata = pageMeta({
  title: "Reembolso de Obra Nueva | $2,500 en el Cierre",
  description: "Regístrenos como su agente antes de visitar un modelo y le reembolsamos de $2,500 a $5,000 de nuestra comisión como crédito en el cierre.",
  path: "/new-construction",
  lang: "es",
});

export default function Page() {
  return <NewConstructionPage lang="es" />;
}
