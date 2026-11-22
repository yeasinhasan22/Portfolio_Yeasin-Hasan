import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        hand: ['var(--font-hand)', 'cursive'],
      },
      colors: {
        /* ---- paper/ink design system ---- */
        paper: {
          DEFAULT: 'hsl(var(--paper))',
          deep: 'hsl(var(--paper-deep))',
          raised: 'hsl(var(--paper-raised))',
        },
        ink: {
          DEFAULT: 'hsl(var(--ink))',
          soft: 'hsl(var(--ink-soft))',
          faint: 'hsl(var(--ink-faint))',
        },
        rule: 'hsl(var(--rule))',
        lime: 'hsl(var(--acc-lime))',
        sky: 'hsl(var(--acc-sky))',
        pink: 'hsl(var(--acc-pink))',
        amber: 'hsl(var(--acc-amber))',
        violet: 'hsl(var(--acc-violet))',

        /* ---- shadcn tokens (kept so components/ui keeps working) ---- */
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        bento: '1.5rem',
      },
      boxShadow: {
        paper: '0 1px 2px hsl(var(--ink) / 0.04), 0 8px 24px -12px hsl(var(--ink) / 0.18)',
        lift: '0 2px 4px hsl(var(--ink) / 0.05), 0 24px 48px -20px hsl(var(--ink) / 0.3)',
        sticker: '0 1px 0 hsl(var(--ink) / 0.9)',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          from: { transform: 'translateX(-50%)' },
          to: { transform: 'translateX(0)' },
        },
        blink: {
          '0%, 45%': { opacity: '1' },
          '50%, 95%': { opacity: '0.15' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.15s ease-out',
        'accordion-up': 'accordion-up 0.15s ease-out',
        marquee: 'marquee var(--marquee-duration, 36s) linear infinite',
        'marquee-reverse': 'marquee-reverse var(--marquee-duration, 36s) linear infinite',
        blink: 'blink 1.6s steps(1) infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
