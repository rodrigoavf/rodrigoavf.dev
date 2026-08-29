import Image from "next/image";

/**
 * The cut-out portrait.
 *
 * The PNG has a genuine alpha channel, so it sits directly on the page with
 * nothing painted behind it. The one treatment it gets is a short fade at the
 * bottom: the source is cropped mid-shoulder, and the hard cut would otherwise
 * read as a mistake. The fade is deliberately narrow so it dissolves the crop
 * line without washing out the figure.
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
    <div className={className}>
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
