/** @type {import('tailwindcss').Config} */
const v = name => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './App.tsx', './index.tsx', './components/**/*.{ts,tsx}', './data/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Atkinson Hyperlegible Next"', 'system-ui', 'sans-serif'],
        heading: ['"Atkinson Hyperlegible Next"', 'system-ui', 'sans-serif'],
        serif: ['"Fraunces Variable"', 'Georgia', 'serif'],
        mono: ['"DM Mono"', 'ui-monospace', 'monospace'],
        hand: ['"Fraunces Variable"', 'Georgia', 'serif'],
      },
      colors: {
        ink: { DEFAULT: '#101828', light: '#4B5565' },
        paper: { DEFAULT: '#FFFAF0', deep: '#F4E9D2' },
        mist: '#FFFDF7',
        night: '#0F172A',
        pink: { DEFAULT: '#E8628F', soft: '#FFDCE8' },
        aqua: { DEFAULT: '#06B6D4', text: '#0A7F94', soft: '#D6F6FB' },
        // "primary" is the accent the case-study sections use. It follows the
        // project theme: aqua by default, yellow inside .theme-reposet (see mock.css).
        primary: { DEFAULT: v('p'), dark: v('p-dark'), light: v('p-light'), vibrant: v('p-vibrant') },
        // Reposet's section uses orange classes; map them to yellow so the page stays cohesive.
        orange: {
          50: '#FFFAE0', 100: '#FFF3C4', 200: '#FDE68A', 300: '#FBD84D', 400: '#F5B800',
          500: '#E0A100', 600: '#C58A00', 700: '#9A6B00', 800: '#7A5400', 900: '#5C3F00',
        },
        slate: {
          50: '#F6F8FA', 100: '#EBEFF3', 200: '#DCE3EA', 300: '#BCC7D3', 400: '#94A1B3',
          500: '#6B7789', 600: '#4B5565', 700: '#344054', 800: '#1D2939', 900: '#101828',
        },
      },
      boxShadow: {
        cute: '6px 6px 0px 0px #06B6D4',
        'cute-hover': '10px 10px 0px 0px #06B6D4',
        card: '0 10px 24px -12px rgba(16,24,40,0.35)',
      },
      borderRadius: { '4xl': '2.5rem' },
      animation: {
        'spin-slow': 'spin 15s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        blob: 'blob 7s infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0', transform: 'translateY(8px)' }, '100%': { opacity: '1', transform: 'none' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-20px)' } },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
