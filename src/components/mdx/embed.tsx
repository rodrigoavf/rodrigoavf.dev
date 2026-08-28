import type { ReactNode } from "react";

type Ratio = "16/9" | "4/3" | "1/1" | "3/2";

const ratioClass: Record<Ratio, string> = {
  "16/9": "aspect-video",
  "4/3": "aspect-4/3",
  "1/1": "aspect-square",
  "3/2": "aspect-3/2",
};

function Frame({
  children,
  ratio = "16/9",
}: {
  children: ReactNode;
  ratio?: Ratio;
}) {
  return (
    <div className="wide my-8">
      <div
        className={`${ratioClass[ratio]} overflow-hidden rounded-xl border border-border bg-surface`}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * Any embeddable URL. Sites that send `X-Frame-Options: DENY` will render
 * blank here — nothing can be done about that from our side.
 */
export function Embed({
  src,
  title,
  ratio,
}: {
  src: string;
  title: string;
  ratio?: Ratio;
}) {
  return (
    <Frame ratio={ratio}>
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allowFullScreen
        className="h-full w-full border-0"
      />
    </Frame>
  );
}

/**
 * A Power BI report published with *Publish to web (public)*. Any other embed
 * mode requires a login and will not render for visitors.
 */
export function PowerBIEmbed({
  src,
  title = "Power BI report",
  ratio,
}: {
  src: string;
  title?: string;
  ratio?: Ratio;
}) {
  return (
    <Frame ratio={ratio}>
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allowFullScreen
        className="h-full w-full border-0"
      />
    </Frame>
  );
}

/** A YouTube video. `id` is the part after `v=` in the watch URL. */
export function YouTube({
  id,
  title = "YouTube video",
}: {
  id: string;
  title?: string;
}) {
  return (
    <Frame>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={title}
        loading="lazy"
        allowFullScreen
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        className="h-full w-full border-0"
      />
    </Frame>
  );
}
