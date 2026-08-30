export const site = {
  name: "Rodrigo Ferreira",
  role: "Lead Data Analyst / Analytics Engineer",
  location: "Braga, Portugal",
  domain: "rodrigoavf.dev",
  url: "https://rodrigoavf.dev",
  tagline:
    "Data analysis & engineering notes, tutorials, and things I build.",
  description:
    "Notes, tutorials and projects on data analysis and data engineering by Rodrigo Ferreira.",
  /** Longer blurb under the headline on the home page. */
  intro:
    "I'm a Lead Data consultant specializing in Microsoft Fabric and Databricks with over ten years of experience across Brazil, China and Portugal. This is where I write up what I work out along the way — and keep the references I got tired of looking up twice.",
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
  emailRot13: "ebqevtb@ebqevtbnis.qri",
} as const;
