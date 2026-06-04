import type { Config } from "tailwindcss";

/**
 * Aegis design system — "Soft Guardian".
 * Calm, friendly, trustworthy: an airy blue-tinted canvas, white cards with soft
 * shadows, a confident blue brand, and a handwritten accent voice (Gamja Flower)
 * for Aegis's human moments. Functional risk colors (safe/caution/danger) are the
 * only strong hues. Built to feel like a caring assistant, not a hacker dashboard.
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── new "Soft Guardian" palette ──────────────────────────────
        canvas: "#E8EDF6", // page background (airy blue-gray)
        panel: "#FFFFFF", // cards
        mist: "#EFF4FF", // soft blue tint surface
        haze: "#F4F7FD", // very light surface
        line: "#DCE4F2", // hairline borders
        ink: "#1B2438", // primary text (deep navy-slate)
        brand: {
          DEFAULT: "#3B6FF6", // primary blue
          deep: "#2452D6",
          soft: "#86A9FF",
          tint: "#DCE7FF",
        },
        // text ramp
        slatey: "#3A465E", // secondary text
        muted: "#7C89A3", // muted text
        faint: "#A8B2C7", // faint / captions
        // functional risk states (tuned for a light UI)
        safe: "#1FA97A",
        caution: "#E0A23C",
        danger: "#E5564B",
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        hand: ["var(--font-hand)", "var(--font-outfit)", "cursive"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(40,72,140,0.18)",
        card: "0 18px 50px -20px rgba(40,72,140,0.25)",
        lift: "0 30px 70px -28px rgba(40,72,140,0.35)",
        glow: "0 16px 40px -14px rgba(59,111,246,0.45)",
        phone: "0 40px 90px -30px rgba(30,42,80,0.45)",
      },
      keyframes: {
        "rise": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float": {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "100%": { transform: "scale(1.8)", opacity: "0" },
        },
        "breathe": {
          "0%,100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        rise: "rise 0.7s cubic-bezier(0.16,1,0.3,1) both",
        float: "float 6s ease-in-out infinite",
        "pulse-ring": "pulse-ring 1.6s ease-out infinite",
        breathe: "breathe 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
