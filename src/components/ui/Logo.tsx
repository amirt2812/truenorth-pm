"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { langFromPath } from "@/lib/i18n";
import logoHorizontal from "../../../public/logo-horizontal.png";

/**
 * Brand mark using the official TrueNorth horizontal lockup (deep navy on
 * transparent). On dark backgrounds (`light`), the monochrome navy artwork is
 * inverted to white via CSS filter so it reads cleanly on the navy footer.
 */
export function Logo({
  light = false,
  className = "",
  priority = false,
}: {
  light?: boolean;
  className?: string;
  priority?: boolean;
}) {
  const home = langFromPath(usePathname() || "/") === "es" ? "/es" : "/";
  return (
    <Link href={home} aria-label={`${site.brand} home`} className={`inline-flex items-center ${className}`}>
      <Image
        src={logoHorizontal}
        alt={site.brand}
        priority={priority}
        className="h-9 w-auto sm:h-10"
        style={light ? { filter: "brightness(0) invert(1)" } : undefined}
      />
    </Link>
  );
}
