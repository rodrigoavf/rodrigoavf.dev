import Image from "next/image";

/** An image with a caption. For an uncaptioned image, plain `![alt](src)` is enough. */
export function Figure({
  src,
  alt,
  caption,
  width = 1600,
  height = 900,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}) {
  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full rounded-xl border border-border"
        sizes="(min-width: 1024px) 1024px, 100vw"
      />
      {caption ? (
        <figcaption className="mt-3 text-center text-sm text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
