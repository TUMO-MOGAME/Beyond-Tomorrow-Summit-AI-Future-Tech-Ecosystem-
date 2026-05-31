/**
 * Aegis shield wordmark. Pure SVG — crisp at any size, no asset dependency.
 * Signet-gold shield with a cream guard mark; wordmark set in the display serif.
 */
export default function AegisLogo({
  size = 28,
  withWordmark = true,
}: {
  size?: number;
  withWordmark?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Aegis"
      >
        <defs>
          <linearGradient id="aegisShield" x1="8" y1="3" x2="40" y2="45" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#C9C9CF" />
          </linearGradient>
        </defs>
        {/* shield */}
        <path
          d="M24 3 L41 9 V23 C41 34 33.5 41.5 24 45 C14.5 41.5 7 34 7 23 V9 Z"
          fill="url(#aegisShield)"
        />
        {/* inner guard mark */}
        <path
          d="M15 24 L21 30 L33 17"
          stroke="#000000"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      {withWordmark && (
        <span className="font-display text-xl font-semibold tracking-tightest text-cream">
          Aegis
        </span>
      )}
    </span>
  );
}
