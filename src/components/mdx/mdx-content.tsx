import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkUnwrapImages from "remark-unwrap-images";
import { mdxComponents } from "./index";

/**
 * Compiles a post body. This runs at build time only — every page that uses it
 * is statically prerendered — so the cost never reaches a visitor.
 */
export function MdxContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={mdxComponents}
      options={{
        mdxOptions: {
          // unwrapImages lifts a lone image out of its paragraph, so it can
          // span the full width instead of being trapped in the text column.
          remarkPlugins: [remarkGfm, remarkUnwrapImages],
          rehypePlugins: [
            rehypeSlug,
            [
              rehypeAutolinkHeadings,
              {
                behavior: "wrap",
                properties: { className: "heading-anchor" },
              },
            ],
            [
              rehypePrettyCode,
              {
                // Both themes are emitted as CSS variables on each token, and
                // globals.css picks one — so switching theme needs no re-render
                // and no flash.
                theme: { light: "github-light", dark: "github-dark-dimmed" },
                keepBackground: false,
                defaultLang: "text",
              },
            ],
          ],
        },
      }}
    />
  );
}
