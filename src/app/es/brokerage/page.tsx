import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { BrokerageHub } from "@/components/sections/BrokeragePages";

export const metadata: Metadata = pageMeta({
  title: "Correduría de Bienes Raíces en el Condado de Hernando",
  description: "Compre, venda e invierta en el Condado de Hernando con TrueNorth Brokerage Group — una correduría local dirigida por su corredor-propietario que también administra rentas.",
  path: "/brokerage",
  lang: "es",
});

export default function Page() {
  return <BrokerageHub lang="es" />;
}
