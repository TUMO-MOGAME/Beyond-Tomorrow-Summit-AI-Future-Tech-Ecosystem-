/**
 * Aegis icon set — thin-line, single-stroke, currentColor.
 * Replaces every emoji in the app so the UI reads as a designed product
 * rather than a prototype. 24px grid, 1.6 stroke, round joins.
 */
import type { SVGProps } from "react";

export type IconName =
  | "shield"
  | "shield-check"
  | "scan"
  | "users"
  | "landmark"
  | "mute"
  | "broadcast"
  | "clipboard"
  | "record"
  | "play"
  | "stop"
  | "clock"
  | "mask"
  | "whisper"
  | "alert"
  | "money"
  | "gift"
  | "heart-crack"
  | "ban"
  | "flag"
  | "arrow-right"
  | "check"
  | "x"
  | "mic"
  | "bulb"
  | "lock"
  | "pointer"
  | "sparkle"
  | "globe";

const PATHS: Record<IconName, JSX.Element> = {
  shield: <path d="M12 3 19 6v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-3Z" />,
  "shield-check": (
    <>
      <path d="M12 3 19 6v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-3Z" />
      <path d="m8.8 12 2.2 2.2 4.2-4.4" />
    </>
  ),
  scan: (
    <>
      <path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2" />
      <circle cx="12" cy="12" r="2.4" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0M16 6.2a3 3 0 0 1 0 5.6M17 19a5.5 5.5 0 0 0-3-4.9" />
    </>
  ),
  landmark: (
    <>
      <path d="M4 9 12 4l8 5M5 9v8M19 9v8M9 9v8M15 9v8M3.5 20h17" />
    </>
  ),
  mute: (
    <>
      <path d="M4 9v6h3l5 4V5L7 9H4Z" />
      <path d="m16 9 5 6M21 9l-5 6" />
    </>
  ),
  broadcast: (
    <>
      <circle cx="12" cy="12" r="2" />
      <path d="M7.5 7.5a6 6 0 0 0 0 9M16.5 7.5a6 6 0 0 1 0 9M4.7 4.7a10 10 0 0 0 0 14.6M19.3 4.7a10 10 0 0 1 0 14.6" />
    </>
  ),
  clipboard: (
    <>
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <path d="M9 4a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 4v1.5H9V4ZM9 10h6M9 14h6M9 18h3.5" />
    </>
  ),
  record: <circle cx="12" cy="12" r="5.5" fill="currentColor" stroke="none" />,
  play: <path d="M8 5.5 18 12 8 18.5V5.5Z" fill="currentColor" stroke="none" />,
  stop: <rect x="6.5" y="6.5" width="11" height="11" rx="2" fill="currentColor" stroke="none" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  mask: (
    <>
      <path d="M4 6c5-1.5 11-1.5 16 0 0 6-2.5 11-8 13C6.5 17 4 12 4 6Z" />
      <path d="M8.5 10.5c.8-.6 1.7-.6 2.5 0M13 10.5c.8-.6 1.7-.6 2.5 0M9.5 15c1.5 1 3.5 1 5 0" />
    </>
  ),
  whisper: (
    <>
      <path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6c-1.6 0-3-.5-4.3-1.2" />
      <path d="M4 4l16 16" />
    </>
  ),
  alert: (
    <>
      <path d="M12 4 21 19H3L12 4Z" />
      <path d="M12 10v4M12 16.5v.01" />
    </>
  ),
  money: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.6" />
      <path d="M6 9.5v.01M18 14.5v.01" />
    </>
  ),
  gift: (
    <>
      <path d="M4 11h16v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8ZM3 8h18v3H3zM12 8v12" />
      <path d="M12 8C12 8 9 8 8 6.5 7.3 5.4 8.3 4 9.5 4.5 11 5 12 8 12 8ZM12 8c0 0 3 0 4-1.5.7-1.1-.3-2.5-1.5-2C13 5 12 8 12 8Z" />
    </>
  ),
  "heart-crack": (
    <>
      <path d="M12 20C7 16.5 4 13.5 4 9.5 4 7 6 5 8.4 5c1.5 0 2.8.8 3.6 2 .8-1.2 2.1-2 3.6-2C18 5 20 7 20 9.5c0 4-3 7-8 10.5Z" />
      <path d="m12 7-1.5 3 2.5 1.2L11.5 15" />
    </>
  ),
  ban: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m6 6 12 12" />
    </>
  ),
  flag: <path d="M5 21V4m0 0 8 1 6-1v9l-6 1-8-1" />,
  "arrow-right": <path d="M4 12h15m-6-6 6 6-6 6" />,
  check: <path d="m5 12.5 4.5 4.5L19 7" />,
  x: <path d="m6 6 12 12M18 6 6 18" />,
  mic: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3" />
    </>
  ),
  bulb: (
    <>
      <path d="M9 17.5a6 6 0 1 1 6 0c-.7.5-1 1.2-1 2v.5H10v-.5c0-.8-.3-1.5-1-2Z" />
      <path d="M10 21.5h4" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </>
  ),
  pointer: (
    <>
      <path d="M5 12h11" />
      <path d="m12 7 5 5-5 5" />
    </>
  ),
  sparkle: (
    <path d="M12 3c.6 3.8 1.4 4.6 5.2 5.2-3.8.6-4.6 1.4-5.2 5.2-.6-3.8-1.4-4.6-5.2-5.2C10.6 7.6 11.4 6.8 12 3ZM18 14c.3 1.8.7 2.2 2.5 2.5-1.8.3-2.2.7-2.5 2.5-.3-1.8-.7-2.2-2.5-2.5 1.8-.3 2.2-.7 2.5-2.5Z" />
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.5 2.3 2.5 14.7 0 17M12 3.5c-2.5 2.3-2.5 14.7 0 17" />
    </>
  ),
};

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  size?: number;
}

export default function Icon({ name, size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {PATHS[name]}
    </svg>
  );
}
