export const site = {
  name: "Rodrigo Vaz",
  domain: "rodrigoavf.dev",
  url: "https://rodrigoavf.dev",
  tagline:
    "Data analysis & data engineering — notes, tutorials, and things I build.",
  description:
    "Notes, tutorials and projects on data analysis and data engineering by Rodrigo Vaz.",
  /** Longer blurb under the headline on the home page. */
  intro:
    "This is a placeholder introduction. A couple of sentences about who you are, what you work on, and what someone can expect to find here.",
  nav: [
    { href: "/", label: "Home" },
    { href: "/writing", label: "Writing" },
    { href: "/projects", label: "Projects" },
    { href: "/cheat-sheets", label: "Cheat Sheets" },
    { href: "/about", label: "About" },
  ],
  social: [
    { href: "https://github.com/rodrigoavf", label: "GitHub" },
    { href: "https://www.linkedin.com/in/rodrigoavf/", label: "LinkedIn" },
  ],
  /**
   * Contact address, ROT13-encoded so the plain string never appears in the
   * prerendered HTML, in the JS bundle, or in this repo — all three are things
   * address harvesters read. `<EmailLink>` decodes it in the browser.
   *
   * Keep it encoded. To change it, re-encode the new address (every letter
   * shifted 13 places; ROT13 is its own inverse, so encoding and decoding are
   * the same operation) — do not paste a plain address here.
   */
  emailRot13: "enis@bhgybbx.pbz",
} as const;
