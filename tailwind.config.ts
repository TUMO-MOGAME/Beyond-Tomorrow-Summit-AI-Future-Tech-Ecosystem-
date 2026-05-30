import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        aegis: {
          bg: "#0a0e1a",
          panel: "#111726",
          border: "#1e2740",
          accent: "#3b82f6",
          safe: "#22c55e",
          caution: "#f59e0b",
          danger: "#ef4444",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
