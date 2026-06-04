import { ShieldCheck } from "lucide-react";

/**
 * Aegis wordmark — a soft blue shield with the Outfit wordmark.
 */
export default function AegisLogo({
  size = 28,
  withWordmark = true,
}: {
  size?: number;
  withWordmark?: boolean;
}) {
  const box = Math.round(size * 1.28);
  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        className="flex items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-deep text-white shadow-glow"
        style={{ width: box, height: box }}
      >
        <ShieldCheck size={size * 0.72} />
      </span>
      {withWordmark && (
        <span className="text-xl font-semibold tracking-tight text-ink">Aegis</span>
      )}
    </span>
  );
}
