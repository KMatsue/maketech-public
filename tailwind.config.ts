import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/stories/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // Theme colors using CSS Variables
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        secondary: 'var(--secondary)',
        'secondary-foreground': 'var(--secondary-foreground)',
        
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        
        border: 'var(--border)',
        input: 'var(--input)',
        
        accent: 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',
        
        destructive: 'var(--destructive)',
        'destructive-foreground': 'var(--destructive-foreground)',
        
        ring: 'var(--ring)',
        
        // Info colors
        'info-bg': 'var(--info-bg)',
        'info-text': 'var(--info-text)',
        
        // Code/Result Display colors
        'code-bg': 'var(--code-bg)',
        'file-button-bg': 'var(--file-button-bg)',
        'file-button-text': 'var(--file-button-text)',
        
        // PDF Margin Display colors
        'pdf-margin-bg': 'var(--pdf-margin-bg)',
        'pdf-margin-text': 'var(--pdf-margin-text)',
        
        // Usage Hints colors
        'usage-hints-bg': 'var(--usage-hints-bg)',
        'usage-hints-text': 'var(--usage-hints-text)',
        
        // Preview Area colors
        'preview-area-bg': 'var(--preview-area-bg)',
        
        // Component specific colors
        'navbar-bg': 'var(--navbar-bg)',
        'navbar-text': 'var(--navbar-text)',
        'navbar-text-hover': 'var(--navbar-text-hover)',
        'navbar-border': 'var(--navbar-border)',
        
        'footer-bg': 'var(--footer-bg)',
        'footer-text': 'var(--footer-text)',
        'footer-text-hover': 'var(--footer-text-hover)',
        
        // Unified borders
        'border-primary': 'var(--border-primary)',
        'border-secondary': 'var(--border-secondary)',
        
        // Tag colors
        'tag-bg': 'var(--tag-bg)',
        'tag-text': 'var(--tag-text)',
        'tag-border': 'var(--tag-border)',
        'tag-hover-bg': 'var(--tag-hover-bg)',
        
        // Pagination colors
        'pagination-border': 'var(--pagination-border)',
        'pagination-hover-bg': 'var(--pagination-hover-bg)',
        'pagination-active-text': 'var(--pagination-active-text)',
        'pagination-inactive-text': 'var(--pagination-inactive-text)',
        
        // Card colors
        'card-hover-bg': 'var(--card-hover-bg)',
        
        // ThemeSwitch colors
        'theme-switch-hover-bg': 'var(--theme-switch-hover-bg)',
        'theme-switch-dropdown-bg': 'var(--theme-switch-dropdown-bg)',
        'theme-switch-dropdown-border': 'var(--theme-switch-dropdown-border)',
        'theme-switch-item-hover-bg': 'var(--theme-switch-item-hover-bg)',
        'theme-switch-item-text': 'var(--theme-switch-item-text)',
        'theme-switch-active-bg': 'var(--theme-switch-active-bg)',
        'theme-switch-active-text': 'var(--theme-switch-active-text)',
        
        // Legacy colors (for backward compatibility)
        text: "#333333",
        "text-dark": "#CCCCCC",
      },
      screens: {
        sp: { max: "640px" },
      },
    },
    // screens: {
    //   sp: { max: "640px" },

    //   sm: "640px",
    //   // => @media (min-width: 640px) { ... }

    //   md: "768px",
    //   // => @media (min-width: 768px) { ... }

    //   lg: "1024px",
    //   // => @media (min-width: 1024px) { ... }

    //   xl: "1280px",
    //   // => @media (min-width: 1280px) { ... }

    //   "2xl": "1536px",
    //   // => @media (min-width: 1536px) { ... }
    // },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
export default config;
