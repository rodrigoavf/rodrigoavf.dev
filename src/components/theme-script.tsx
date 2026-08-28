/**
 * Applies the saved theme before first paint.
 *
 * This has to run synchronously in <head>, ahead of React, or a visitor who
 * chose dark would get a flash of the light page on every navigation-free load.
 */
const script = `
try {
  var t = localStorage.getItem("theme");
  if (t === "dark" || t === "light") {
    document.documentElement.dataset.theme = t;
  }
} catch (e) {}
`;

export function ThemeScript() {
  return (
    <script
      // Static string, no interpolation of anything user-supplied.
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
    />
  );
}
