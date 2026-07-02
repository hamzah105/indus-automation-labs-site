import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#05070f",
        midnight: "#080d1c",
        cyanGlow: "#22d3ee",
        electric: "#38bdf8",
        violetGlow: "#a78bfa",
        mint: "#34d399",
        solar: "#fbbf24"
      },
      boxShadow: {
        glow: "0 0 34px rgba(34, 211, 238, 0.22)",
        violet: "0 0 38px rgba(167, 139, 250, 0.18)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "Space Grotesk", "Inter", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
