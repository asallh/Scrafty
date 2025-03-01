import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/input.js"
  ],
  theme: {
    extend: {
      colors: {
        background: "#dba06d",
        titleColor: "black",
        buttonColor: "#9e574e",
        buttonHover:"#80433b",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [nextui()],
} satisfies Config;
