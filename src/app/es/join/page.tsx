import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { JoinPage } from "@/components/sections/BrokeragePages";

export const metadata: Metadata = pageMeta({
  title: "Únase a TrueNorth Brokerage Group | 100% de Comisión",
  description: "Conserve el 100% de su comisión. $399 por transacción cerrada, $29 al mes, sin cuota de escritorio ni franquicia — con el paquete de marketing incluido.",
  path: "/join",
  lang: "es",
});

export default function Page() {
  return <JoinPage lang="es" />;
}
