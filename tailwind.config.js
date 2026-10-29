/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        surface: '#121218',
        'surface-elevated': '#181922',
        border: '#242734',
        'border-light': 'rgba(255, 255, 255, 0.1)',
        'border-subtle': 'rgba(255, 255, 255, 0.05)',
        accent: '#FF9800',
        'accent-glow': 'rgba(255, 152, 0, 0.3)',
        'accent-dim': 'rgba(255, 152, 0, 0.08)',
        'status-green': '#80B82C',
        'status-green-glow': 'rgba(109, 157, 39, 0.3)',
        'text-primary': '#FFFFFF',
        'text-secondary': 'rgba(255, 255, 255, 0.7)',
        'text-muted': 'rgba(255, 255, 255, 0.38)',
      },
      fontFamily: {
        orbitron: ['"Orbitron"', 'sans-serif'],
        chakra: ['"Chakra Petch"', 'sans-serif'],
        inter: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
};
