import type { Config } from "tailwindcss";

/**
 * Aegis design system — "Quiet modern dark".
 * Warm charcoal ink, a single confident signet-gold accent, calm semantic
 * states (sage / amber / clay) tuned to the palette so nothing screams.
 * NOT navy. NOT electric blue. Reads like a private security desk, not a
 * hacker dashboard.
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // warm charcoal surfaces
        ink: {
          DEFAULT: "#161311", // page
          panel: "#1E1A16", // cards / panels
          raised: "#262019", // inputs / raised
          line: "#352E25", // hairline borders
          line2: "#473E31", // stronger borders / focus
        },
        // warm neutral type ramp
        cream: "#ECE4D6", // primary text
        sand: "#A89E8D", // secondary text
        taupe: "#6E665A", // faint / captions
        // signet-gold accent (the one confident color)
        gold: {
          DEFAULT: "#D8A84B",
          soft: "#E8C173",
          dim: "#9A7C38",
        },
        // calm semantic states
        sage: "#88B29A", // safe
        caution: "#D6A040", // caution
        clay: "#CE6B4A", // danger (decisive, not alarm-bell)
        // back-compat aliases so legacy class names keep resolving
        aegis: {
          bg: "#161311",
          panel: "#1E1A16",
          border: "#352E25",
          accent: "#D8A84B",
          safe: "#88B29A",
          caution: "#D6A040",
          danger: "#CE6B4A",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        panel: "0 1px 0 rgba(255,255,255,0.02) inset, 0 18px 40px -24px rgba(0,0,0,0.7)",
        lift: "0 24px 60px -30px rgba(0,0,0,0.85)",
        gold: "0 14px 36px -14px rgba(216,168,75,0.45)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        breathe: {
          "0%,100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
        sweep: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
        breathe: "breathe 2.4s ease-in-out infinite",
        sweep: "sweep 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
