import Image from "next/image";

/**
 * The cut-out portrait.
 *
 * The PNG has a genuine alpha channel, so it sits directly on the page rather
 * than in a frame. Two details make that work: a soft brand-coloured glow
 * behind it, which grounds the figure instead of leaving it floating, and a
 * short fade at the bottom, because the source is cropped mid-shoulder and the
 * hard cut would otherwise read as a mistake.
 *
 * Intrinsic size is 519x480, so it is never rendered much above ~300px wide —
 * past that it goes soft.
 */
export function Portrait({
  className = "",
  sizes = "(min-width: 1024px) 288px, 200px",
  priority = false,
}: {
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative ${className}`}>
      <span
        aria-hidden="true"
        className="portrait-glow absolute inset-0 -z-10 translate-y-4 scale-125"
      />
      <Image
        src="/Rodrigo_Portrait.png"
        alt="Rodrigo Ferreira"
        width={519}
        height={480}
        sizes={sizes}
        priority={priority}
        className="portrait-fade h-auto w-full"
      />
    </div>
  );
}
