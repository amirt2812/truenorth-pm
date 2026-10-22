import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { SellPage } from "@/components/sections/BrokeragePages";

export const metadata: Metadata = pageMeta({
  title: "Venda su Casa en el Condado de Hernando | 2.5% de Tarifa",
  description: "Liste con TrueNorth por 2.5%: fotografía profesional, video aéreo, planos, volantes impresos, casas abiertas y reportes semanales incluidos.",
  path: "/sell",
  lang: "es",
});

export default function Page() {
  return <SellPage lang="es" />;
}
