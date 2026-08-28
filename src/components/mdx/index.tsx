import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { CopyButton } from "@/components/copy-button";
import { getImageSize } from "@/lib/image-size";
import { Callout } from "./callout";
import { Embed, PowerBIEmbed, YouTube } from "./embed";
import { Figure } from "./figure";

/**
 * Markdown images (`![alt](/images/…)`) rendered through `next/image`, so they
 * are optimised and lazy-loaded. Dimensions are measured from the file at build
 * time — markdown has nowhere to declare them.
 */
function MdxImage({ src, alt }: ComponentPropsWithoutRef<"img">) {
  if (typeof src !== "string") return null;

  const external = /^https?:\/\//.test(src);
  if (external) {
    // Not measurable, and not on an allowed next/image domain by default.
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt ?? ""}
        loading="lazy"
        className="my-8 w-full rounded-xl border border-border"
      />
    );
  }

  const { width, height } = getImageSize(src);
  return (
    <Image
      src={src}
      alt={alt ?? ""}
      width={width}
      height={height}
      sizes="(min-width: 1024px) 1024px, 100vw"
      className="my-8 h-auto w-full rounded-xl border border-border"
    />
  );
}

/** Internal links go through next/link; external ones open in a new tab. */
function MdxLink({ href, children, ...props }: ComponentPropsWithoutRef<"a">) {
  if (!href) return <a {...props}>{children}</a>;

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer noopener" {...props}>
      {children}
    </a>
  );
}

/** Code blocks, wrapped so a copy button can sit in the corner. */
function Pre({ children, ...props }: ComponentPropsWithoutRef<"pre">) {
  return (
    <div className="group relative my-6">
      <pre {...props}>{children}</pre>
      <CopyButton />
    </div>
  );
}

/** Tables scroll sideways on narrow screens rather than breaking the layout. */
function Table({ children }: { children?: ReactNode }) {
  return (
    <div className="my-6 overflow-x-auto">
      <table>{children}</table>
    </div>
  );
}

export const mdxComponents = {
  img: MdxImage,
  a: MdxLink,
  pre: Pre,
  table: Table,
  // Available to author with, without importing anything:
  Figure,
  Callout,
  Embed,
  PowerBIEmbed,
  YouTube,
  Image,
};
