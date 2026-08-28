/**
 * The "R" mark.
 *
 * The gradient stops come from CSS variables rather than being baked in: the
 * logo's own turquoise sits at 1.4:1 on white, which is close to invisible, so
 * the light theme uses a darkened pair. The dark theme uses the real colours.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 322 390"
      className={className}
      role="img"
      aria-label="Ravf"
    >
      <defs>
        <linearGradient
          id="logo-gradient"
          x1="0"
          y1="390"
          x2="322"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="var(--logo-from)" />
          <stop offset="0.55" stopColor="var(--logo-mid)" />
          <stop offset="1" stopColor="var(--logo-to)" />
        </linearGradient>
      </defs>
      <path
        fill="url(#logo-gradient)"
        fillRule="evenodd"
        d="M 0 0 L 196 0 C 268 0 322 52 322 118 C 322 184 268 236 196 236 L 322 390 L 198 390 L 74 238 L 74 160 L 196 160 C 218 160 236 142 236 118 C 236 94 218 76 196 76 L 46 76 Z"
      />
    </svg>
  );
}
