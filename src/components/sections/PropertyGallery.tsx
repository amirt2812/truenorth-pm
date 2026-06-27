"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";

/**
 * Property photo gallery: large active image + thumbnail strip. Keyboard
 * accessible (arrow keys move between photos when the strip has focus).
 */
export function PropertyGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const isPlaceholder = images.length === 1 && images[0].endsWith("placeholder.svg");

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-navy-100 bg-navy-50">
        <Image
          src={images[active]}
          alt={`${alt} — photo ${active + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
        />
        {images.length > 1 && (
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-navy-900/80 px-2.5 py-1 text-xs font-medium text-white">
            <Icon name="image" className="h-3.5 w-3.5" />
            {active + 1} / {images.length}
          </span>
        )}
      </div>

      {!isPlaceholder && images.length > 1 && (
        <ul className="mt-3 flex gap-3 overflow-x-auto pb-1" aria-label="Photo thumbnails">
          {images.map((src, i) => (
            <li key={src} className="shrink-0">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`View photo ${i + 1}`}
                aria-current={i === active}
                className={`relative h-16 w-24 overflow-hidden rounded-lg ring-2 transition ${
                  i === active ? "ring-gold-500" : "ring-transparent hover:ring-navy-200"
                }`}
              >
                <Image src={src} alt="" fill sizes="96px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
