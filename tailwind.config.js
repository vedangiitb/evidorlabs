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
        background: '#07080b',
        surface: {
          50: '#0c0e14',
          100: '#11141d',
          200: '#171b27',
          300: '#1f2434',
          400: '#2b3247',
        },
        border: 'rgba(255, 255, 255, 0.08)',
        'border-strong': 'rgba(255, 255, 255, 0.16)',
        evidor: {
          cyan: '#38bdf8',
          teal: '#2dd4bf',
          indigo: '#818cf8',
          violet: '#a855f7',
          amber: '#f59e0b',
          emerald: '#10b981',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['var(--font-mono)', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0)",
        'radial-glow': 'radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.15) 0%, rgba(129, 140, 248, 0.05) 45%, transparent 70%)',
        'radial-glow-cyan': 'radial-gradient(circle at 50% 50%, rgba(45, 212, 191, 0.12) 0%, transparent 60%)',
      },
      animation: {
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-flow': 'glowFlow 8s ease-in-out infinite alternate',
      },
      keyframes: {
        glowFlow: {
          '0%': { opacity: '0.4', transform: 'scale(0.98)' },
          '100%': { opacity: '0.8', transform: 'scale(1.02)' },
        },
      },
    },
  },
  plugins: [],
};
