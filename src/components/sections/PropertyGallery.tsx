"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";

/**
 * Property photo gallery: large active image with prev/next arrow controls and
 * a thumbnail strip. Keyboard accessible — Left/Right arrows move between photos
 * when the gallery has focus; the active thumbnail auto-scrolls into view.
 */
export function PropertyGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const isPlaceholder = images.length === 1 && images[0].endsWith("placeholder.svg");
  const hasMultiple = images.length > 1;
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const go = (next: number) => setActive((next + images.length) % images.length);
  const prev = () => go(active - 1);
  const nextImg = () => go(active + 1);

  // Touch swipe (mobile): track horizontal drag, advance on a decisive swipe.
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const SWIPE_THRESHOLD = 45; // px of horizontal travel to count as a swipe

  function onTouchStart(e: React.TouchEvent) {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (!touchStart.current || !hasMultiple) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    // Only act on mostly-horizontal swipes so vertical page scroll still works.
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      dx < 0 ? nextImg() : prev();
    }
    touchStart.current = null;
  }

  // Keep the active thumbnail visible as you click/arrow through.
  useEffect(() => {
    thumbRefs.current[active]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [active]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (!hasMultiple) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextImg();
    }
  }

  return (
    <div>
      <div
        className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-navy-100 bg-navy-50"
        role="region"
        aria-roledescription="carousel"
        aria-label={`${alt} photo gallery`}
        tabIndex={hasMultiple ? 0 : -1}
        onKeyDown={onKeyDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ touchAction: "pan-y" }}
      >
        <Image
          src={images[active]}
          alt={`${alt} — photo ${active + 1} of ${images.length}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
        />

        {hasMultiple && !isPlaceholder && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy-800 shadow-md transition hover:bg-white focus-visible:opacity-100 active:scale-95 sm:opacity-0 sm:group-hover:opacity-100"
            >
              <Icon name="arrow-right" className="h-5 w-5 rotate-180" />
            </button>
            <button
              type="button"
              onClick={nextImg}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy-800 shadow-md transition hover:bg-white focus-visible:opacity-100 active:scale-95 sm:opacity-0 sm:group-hover:opacity-100"
            >
              <Icon name="arrow-right" className="h-5 w-5" />
            </button>
          </>
        )}

        {hasMultiple && (
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-navy-900/80 px-2.5 py-1 text-xs font-medium text-white">
            <Icon name="image" className="h-3.5 w-3.5" />
            {active + 1} / {images.length}
          </span>
        )}
      </div>

      {!isPlaceholder && hasMultiple && (
        <ul className="mt-3 flex gap-3 overflow-x-auto pb-1" aria-label="Photo thumbnails">
          {images.map((src, i) => (
            <li key={src} className="shrink-0">
              <button
                ref={(el) => {
                  thumbRefs.current[i] = el;
                }}
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
