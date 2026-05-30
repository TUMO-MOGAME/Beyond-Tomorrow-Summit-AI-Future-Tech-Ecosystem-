/**
 * Aegis shield wordmark. Pure SVG — crisp at any size, no asset dependency.
 */
export default function AegisLogo({
  size = 28,
  withWordmark = true,
}: {
  size?: number;
  withWordmark?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Aegis"
      >
        <defs>
          <linearGradient id="aegisShield" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#60a5fa" />
            <stop offset="1" stopColor="#2563eb" />
          </linearGradient>
        </defs>
        {/* shield */}
        <path
          d="M24 3 L41 9 V23 C41 34 33.5 41.5 24 45 C14.5 41.5 7 34 7 23 V9 Z"
          fill="url(#aegisShield)"
        />
        {/* inner check / pulse mark */}
        <path
          d="M15 24 L21 30 L33 17"
          stroke="white"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      {withWordmark && (
        <span className="text-xl font-extrabold tracking-tight text-white">Aegis</span>
      )}
    </span>
  );
}
