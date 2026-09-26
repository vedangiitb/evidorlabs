/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        canvas: '#050507',
        surface: {
          50: '#09090b',
          100: '#0e0e11',
          200: '#141418',
          300: '#1c1c22',
          400: '#27272f',
        },
        border: 'rgba(255, 255, 255, 0.08)',
        'border-subtle': 'rgba(255, 255, 255, 0.04)',
        'border-strong': 'rgba(255, 255, 255, 0.16)',
        accent: {
          DEFAULT: '#ffffff',
          muted: '#a1a1aa',
          amber: '#f59e0b',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'Geist Mono',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      boxShadow: {
        'sv-border': '0 0 0 1px rgba(255, 255, 255, 0.08)',
        'sv-card': '0 0 0 1px rgba(255, 255, 255, 0.08), 0 8px 32px -8px rgba(0, 0, 0, 0.8)',
        'sv-highlight': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
        'sv-glow': '0 0 40px -10px rgba(255, 255, 255, 0.12)',
      },
      backgroundImage: {
        'grid-fine': 'linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
        'spotlight-top': 'radial-gradient(800px circle at 50% 0%, rgba(255, 255, 255, 0.07), transparent 70%)',
        'fade-bottom': 'linear-gradient(to bottom, transparent, #000000)',
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
      },
    },
  },
  plugins: [],
};
