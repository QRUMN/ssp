/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: 'rgb(var(--color-teal))',
          light: 'rgb(var(--color-teal) / 0.1)',
        },
        ink: {
          DEFAULT: 'rgb(var(--color-ink))',
          light: 'rgb(var(--color-ink) / 0.1)',
        },
        paper: {
          DEFAULT: 'rgb(var(--color-paper))',
          light: 'rgb(var(--color-paper) / 0.1)',
        },
        sand: {
          DEFAULT: 'rgb(var(--color-sand))',
          light: 'rgb(var(--color-sand) / 0.1)',
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        display: ['Syne', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
};