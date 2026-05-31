import type { Config } from "tailwindcss";

/**
 * Aegis design system — "Pure mono".
 * True black, white text, a precise grayscale ramp. The only color in the
 * system is the functional risk signal (safe / caution / danger) on the
 * meter and verdicts — everything else is monochrome. Sharp, editorial,
 * unmistakably designed.
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // pure black surfaces, climbing in near-imperceptible steps
        ink: {
          DEFAULT: "#000000", // page
          panel: "#0B0B0C", // cards / panels
          raised: "#151517", // inputs / raised
          line: "#242427", // hairline borders
          line2: "#37373D", // stronger borders / focus
        },
        // neutral type ramp
        cream: "#FFFFFF", // primary text (white)
        sand: "#A4A4AC", // secondary text
        taupe: "#67676F", // faint / captions
        // monochrome "accent" — white. (named `gold` for back-compat with
        // existing class names; every value is now grayscale.)
        gold: {
          DEFAULT: "#FFFFFF",
          soft: "#DCDCDF", // hover
          dim: "#3A3A40", // focus border
        },
        // functional risk states — the only color in the system
        sage: "#7FD6A6", // safe
        caution: "#E0B448", // caution
        clay: "#F0613F", // danger
        // back-compat aliases so legacy class names keep resolving
        aegis: {
          bg: "#000000",
          panel: "#0B0B0C",
          border: "#242427",
          accent: "#FFFFFF",
          safe: "#7FD6A6",
          caution: "#E0B448",
          danger: "#F0613F",
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
        panel: "0 1px 0 rgba(255,255,255,0.03) inset, 0 18px 40px -24px rgba(0,0,0,0.9)",
        lift: "0 24px 60px -30px rgba(0,0,0,1)",
        gold: "0 14px 36px -14px rgba(255,255,255,0.25)",
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
