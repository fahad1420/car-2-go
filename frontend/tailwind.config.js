/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          lemon: '#E2F163',
          'lemon-light': '#EEF88A',
          'lemon-dark': '#C6D628',
          'lemon-glow': 'rgba(226, 241, 99, 0.25)',
          charcoal: '#09090B',
          graphite: '#121214',
          surface: '#18181B',
          muted: '#27272A',
          border: '#E4E4E7',
          'dark-border': '#27272A',
          light: '#FAFAFA',
          pure: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
        arabic: ['Tajawal', 'sans-serif']
      },
      letterSpacing: {
        'tighter-luxury': '-0.035em',
        'tight-luxury': '-0.02em',
        'normal-luxury': '0',
        'nav-luxury': '0.04em',
        'label-luxury': '0.10em',
        'mono-luxury': '0.06em',
      },
      lineHeight: {
        'headline': '0.94',
        'hero': '0.90',
        'editorial': '1.02',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'lemon-sweep': 'sweep 6s ease-in-out infinite',
        'float': 'float 5s ease-in-out infinite',
      },
      keyframes: {
        sweep: {
          '0%, 100%': { transform: 'translateX(-100%) opacity(0)' },
          '50%': { transform: 'translateX(100%) opacity(0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
