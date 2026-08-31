import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "var(--navy-card)",
        "navy-light": "var(--bg-light)",
        royal: "#1e3a5f",
        gold: "var(--gold)",
        "gold-light": "var(--gold-light)",
        brass: "var(--gold-dark)",
        text: "var(--text)",
        "text-light": "var(--text-muted)",
        "warm-white": "var(--warm-white)",
        beige: "#f6f3eb",
        "beige-light": "#faf8f3",
        "beige-dark": "#ede7db",
        "sand-stone": "#d8cfbc",
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
export default config;
