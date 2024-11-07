import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "selector",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple_main: "#6c5ce7",
        heading_main: "#2D3436",
        dark_body: "#121316",
        dark_heading: "#191a1d"
      },
    },
    fontFamily: {
      league_spartan: ["var(--font-league_spartan_sans)"],
      inter: ["var(--font-inter)"],
    },
  },
  plugins: [],
};
export default config;
