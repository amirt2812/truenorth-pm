import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
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
  return (
    <Link href="/" aria-label={`${site.brand} home`} className={`inline-flex items-center ${className}`}>
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
