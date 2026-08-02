import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        "paper-alt": "var(--paper-alt)",
        surface: "var(--surface)",
        ink: "var(--ink)",
        "ink-muted": "var(--ink-muted)",
        "ink-soft": "var(--ink-soft)",
        rule: "var(--rule)",
        "rule-strong": "var(--rule-strong)",
        accent: "var(--accent)",
        "accent-deep": "var(--accent-deep)",
        "accent-soft": "var(--accent-soft)",
        data: "var(--data)",
        "data-soft": "var(--data-soft)",
        focus: "var(--focus)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        border: "var(--border)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        display: [
          "clamp(2.5rem, 5.5vw, 4rem)",
          { lineHeight: "1.05", letterSpacing: "-0.02em" },
        ],
        "section-heading": [
          "clamp(1.75rem, 3vw, 2.5rem)",
          { lineHeight: "1.15", letterSpacing: "-0.015em" },
        ],
        "sub-heading": ["1.375rem", { lineHeight: "1.3" }],
        eyebrow: [
          "0.75rem",
          { lineHeight: "1.4", letterSpacing: "0.14em" },
        ],
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
        sm: "var(--radius-sm)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
      },
      maxWidth: {
        content: "1120px",
      },
      transitionTimingFunction: {
        report: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
