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
        paper: {
          50: "#FCFBF7",
          100: "#F7F5EE",
          200: "#EFECE1",
          300: "#E3DFC9",
          400: "#CFC8AA",
          500: "#B9AF8B",
        },
        parchment: {
          light: "#FDFBF7",
          base: "#F4EBD9",
          aged: "#E6D7B9",
          dark: "#CDB896",
        },
        ink: {
          light: "#5C564E",
          DEFAULT: "#2B2621",
          dark: "#1A1714",
          blue: "#1E293B",
          sepia: "#4A3525",
        },
        rose: {
          dusty: "#C28285",
          vintage: "#D9AAB7",
          soft: "#F8ECEE",
          deep: "#8B3A4A",
        },
        burgundy: {
          DEFAULT: "#6B1D2F",
          dark: "#4A111E",
          light: "#8F2C43",
        },
        wax: {
          red: "#9B1B30",
          burgundy: "#7A1C2E",
          gold: "#C59B27",
          forest: "#2D5A43",
          navy: "#1B365D",
          blush: "#C87D85",
        },
        envelope: {
          kraft: "#C4A482",
          cream: "#FAF6EE",
          burgundy: "#5E1825",
          midnight: "#1A2238",
          sage: "#8A9A86",
          rose: "#D4A5A5",
        }
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
        script: ["var(--font-caveat)", "cursive"],
        handwriting: ["var(--font-dancing)", "cursive"],
        signature: ["var(--font-sacramento)", "cursive"],
        typewriter: ["var(--font-courier)", "monospace"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        letter: "0 20px 40px -15px rgba(43, 38, 33, 0.15), 0 0 0 1px rgba(43, 38, 33, 0.05)",
        envelope: "0 25px 50px -12px rgba(30, 20, 15, 0.25)",
        stamp: "2px 2px 5px rgba(0,0,0,0.15)",
        wax: "0 6px 12px rgba(0,0,0,0.25), inset 0 2px 3px rgba(255,255,255,0.3)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        sway: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        sway: "sway 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
