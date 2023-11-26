const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  content: [
    // app content
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./ui/**/*.{js,ts,jsx,tsx}",
    // include packages if not transpiling
    "../../packages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      /**
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      */
      spacing: {
        header: "4.25rem",
      },
      top: {
        header: "4.25rem",
      },
      backdropBlur: {
        xs: "3px",
      },
      screens: {
        xs: "375px",
        sm: "475px",
        md: "595px",
        tab: "720px",
        tablet: "860px",
        lp: "1150px",
        xl: "1440px",
        "2xl": "1726px",
      },
      fontSize: {
        sleek: [
          "0.8125rem",
          {
            lineHeight: "1.5rem",
            fontWeight: "457",
          },
        ],
      },
      fontWeight: {
        semibold: "556",
        bold: "656",
      },
      fontFamily: {
        logo: ["var(--font-inter-display)", ...fontFamily.sans],
        sans: ["var(--font-inter)", ...fontFamily.sans],
      },
      backgroundImage: () => ({
        "gradient-primary":
          "linear-gradient(90deg, rgba(74,112,254,1) 0%, rgba(177,96,254,1) 100%)",
        "gradient-accent":
          "linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(74,112,254,1) 30%, rgba(177,96,254,1) 70%, rgba(255,255,255,0.2) 100%)",
        "gradient-secondary":
          "linear-gradient(267.41deg, #50B5FF 38.68%, #985EFE 63.16%)",
        "gradient-blend":
          "linear-gradient(90deg, rgba(246, 247, 249, 0.12) 0%, rgba(255, 255, 255, 0.6) 51.04%, rgba(246, 247, 249, 0.12) 100%)",
      }),
      borderColor: () => ({
        "gradient-primary":
          "linear-gradient(90deg, rgba(74,112,254,1) 0%, rgba(177,96,254,1) 100%)",
      }),
      boxShadow: {
        "ocean-shadow": "0px 0px 10px rgba(74, 112, 254, 0.3)",
      },
      colors: {
        /* shadcn */
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        /* end shadcn */
        night: {
          DEFAULT: "#080615",
          900: "#211F2C",
          800: "#393844",
          700: "#52515B",
          600: "#6B6A73",
          500: "#83828A",
          400: "#9C9BA1",
          300: "#B5B4B9",
          200: "#CECDD0",
          100: "#E6E6E8",
        },
        "mid-dark": {
          DEFAULT: "#2A2B2E",
          900: "#3F4043",
          800: "#555558",
          700: "#6A6B6D",
          600: "#7F8082",
          500: "#949596",
          400: "#AAAAAB",
          300: "#BFBFC0",
          200: "#D4D5D5",
          100: "#EAEAEA",
        },
        slate: {
          DEFAULT: "#888A90",
          900: "#94969B",
          800: "#A0A1A6",
          700: "#ACADB1",
          600: "#B8B9BC",
          500: "#C3C5C7",
          400: "#CFD0D3",
          300: "#DBDCDE",
          200: "#E7E8E9",
          100: "#F3F3F4",
        },
        gray: {
          DEFAULT: "#AEB0B7",
          900: "#B6B8BE",
          800: "#BEC0C5",
          700: "#C6C8CD",
          600: "#CED0D4",
          500: "#D7D7DB",
          400: "#DFDFE2",
          300: "#E7E7E9",
          200: "#EFEFF1",
          100: "#F7F7F8",
        },
        ocean: {
          DEFAULT: "#4A70FE",
          900: "#5C7EFE",
          800: "#6E8DFE",
          700: "#809BFE",
          600: "#92A9FE",
          500: "#A4B7FF",
          400: "#B7C6FF",
          300: "#C9D4FF",
          200: "#DBE2FF",
          100: "#EDF1FF",
        },
        royal: {
          DEFAULT: "#B160FE",
          900: "#B970FE",
          800: "#C180FE",
          700: "#C890FE",
          600: "#D0A0FE",
          500: "#D8AFFF",
          400: "#E0BFFF",
          300: "#E8CFFF",
          200: "#EFDFFF",
          100: "#F7EFFF",
        },
        specialty: {
          gray: "#F6F7F9",
          green: "#0DAA76",
          red: "#EF4444",
        },
        translucent: {
          DEFAULT: "rgba(255, 255, 255, 0.88)",
        },
      },
      keyframes: {
        /* shadcn */
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        /* end shadcn */
        "right-to-left": {
          "0%": { right: "-50%", opacity: 0.5 },
          "100%": { right: 0, opacity: 1 },
        },
        "fade-in": {
          "0%": { opacity: 0.4 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        /* shadcn */
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        /* end shadcn */
        rtl: "right-to-left 0.6s ease-in-out",
        fadeIn: "fade-in 0.4s ease-in-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwindcss-radix")(),
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
  variants: {
    scrollbar: ["rounded"],
  },
};
