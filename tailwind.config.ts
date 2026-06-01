import type { Config } from "tailwindcss";

/**
 * TrueNorth Property Management — Design Tokens
 * Brand palette: deep navy, white, slate gray, warm muted gold, soft sand/off-white.
 * Colors are driven by CSS variables defined in globals.css so dark-mode/theming stays centralized.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0F2742", // deep navy — primary brand
          50: "#EEF2F7",
          100: "#D6E0EC",
          200: "#AEC1D8",
          300: "#7E9BBE",
          400: "#4C6F9C",
          500: "#2C4D78",
          600: "#1B3859",
          700: "#13314F", // deep navy alt
          800: "#0F2742",
          900: "#0A1B30",
          950: "#06101D",
        },
        gold: {
          DEFAULT: "#C29A4A", // warm muted gold accent
          50: "#FBF7EE",
          100: "#F4E9CF",
          200: "#E9D29F",
          300: "#DBB76A",
          400: "#CFA453",
          500: "#C29A4A",
          600: "#A57F37",
          700: "#80622B",
          800: "#5C4720",
          900: "#3D2F15",
        },
        slate: {
          // tuned neutral grays for premium UI text
          DEFAULT: "#475569",
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E5EAF0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
        },
        sand: {
          DEFAULT: "#F6F1E7", // soft sand / off-white background
          50: "#FCFAF5",
          100: "#F6F1E7",
          200: "#EFE6D4",
          300: "#E3D5B9",
        },
      },
      fontFamily: {
        // Wired to next/font CSS variables in layout.tsx
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem, 5vw, 4.25rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.25rem, 4vw, 3.25rem)", { lineHeight: "1.08", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(1.875rem, 3vw, 2.5rem)", { lineHeight: "1.12", letterSpacing: "-0.01em" }],
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 39, 66, 0.04), 0 8px 24px rgba(15, 39, 66, 0.06)",
        "card-hover": "0 2px 4px rgba(15, 39, 66, 0.06), 0 16px 40px rgba(15, 39, 66, 0.10)",
        gold: "0 8px 24px rgba(194, 154, 74, 0.18)",
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
      },
      maxWidth: {
        container: "1200px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
