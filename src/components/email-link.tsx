"use client";

import { site } from "@/lib/site";

function rot13(value: string) {
  return value.replace(/[a-z]/gi, (char) => {
    const base = char <= "Z" ? 65 : 97;
    return String.fromCharCode(
      ((char.charCodeAt(0) - base + 13) % 26) + base,
    );
  });
}

/**
 * Contact link that never puts the address in the page.
 *
 * The address is stored ROT13-encoded (`site.emailRot13`) and only decoded
 * inside the click handler, so it appears neither in the prerendered HTML that
 * address harvesters scrape nor in the live DOM that a JS-executing scraper
 * would read. A <button> rather than an <a> is what makes that possible: an
 * anchor would have to carry the decoded `mailto:` in an attribute to work.
 */
export function EmailLink({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={`cursor-pointer ${className ?? ""}`}
      onClick={() => {
        window.location.href = `mailto:${rot13(site.emailRot13)}`;
      }}
    >
      Email
    </button>
  );
}
