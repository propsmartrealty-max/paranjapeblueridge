import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,astro,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,astro,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,astro,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Luxury Obsidian Core Palette
        obsidian: "#060911",
        "obsidian-dark": "#030508",
        "obsidian-card": "#0d1424",
        "obsidian-elevated": "#121b2f",
        "obsidian-border": "rgba(255, 255, 255, 0.08)",
        
        // Warm Ivory (High Contrast Typography)
        ivory: "#fbf9f5",
        "ivory-muted": "#e2ded4",
        "ivory-subtle": "#c5c0b4",
        
        // Champagne Accents (Restrained Wealth)
        champagne: "#c5a059",
        "champagne-light": "#dfc28d",
        "champagne-dark": "#9e7d3b",
        "champagne-subtle": "rgba(197, 160, 89, 0.15)",
        
        // Architectural Stone Supporting
        stone: "#64748b",
        "stone-light": "#94a3b8",
        "stone-dark": "#334155",
        "stone-muted": "#1e293b",

        // Backward compatibility mappings
        navy: "#0d1424",
        "navy-light": "#121b2f",
        royal: "#121b2f",
        gold: "#c5a059",
        "gold-light": "#dfc28d",
        brass: "#9e7d3b",
        text: "#fbf9f5",
        "text-light": "#94a3b8",
        "warm-white": "#fbf9f5",
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', '"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      backdropBlur: {
        xs: "2px",
        "2xl": "40px",
        "3xl": "64px",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "glass-elevated": "0 20px 50px 0 rgba(0, 0, 0, 0.55)",
        "champagne-glow": "0 0 40px -10px rgba(197, 160, 89, 0.3)",
      }
    },
  },
  plugins: [],
};
export default config;
