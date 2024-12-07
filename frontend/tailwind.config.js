/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

export default {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        light: {
          background: '#E9E1D5',
          text: '#5C4A3B',
          primary: '#8D6E53',
          secondary: '#C4B7A6',
          accent: '#AA8E6A',
          border: '#D1C4B0',
          muted: '#9B8771',
          table: {
            background: '#F8F2E8',
            text: '#5A4632',
            header: '#EFE6D9',
            row: '#FFFFFF',
            altRow: '#F3E9DC',
            hover: '#E6D6C5',
            border: '#CFC2B5',
          },
        },
        dark: {
          background: '#201812',
          text: '#DAC5A3',
          primary: '#7E5F42',
          secondary: '#A07B58',
          accent: '#735236',
          border: '#3E2F24',
          muted: '#6E5A48',
          table: {
            background: '#2A1C13',
            text: '#E6E1D4',
            header: '#3D2D21',
            row: '#4B392E',
            altRow: '#3A2B21',
            hover: '#5D4738',
            border: '#4D3A2C',
          },
        },
      },
      boxShadow: {
        glowLight: '0 0 20px rgba(141, 110, 83, 0.5)',
        glowLightHover: '0 0 30px rgba(141, 110, 83, 0.8), 0 0 50px rgba(141, 110, 83, 0.6)',
        glowDark: '0 0 20px rgba(126, 95, 66, 0.4)',
        glowDarkHover: '0 0 30px rgba(126, 95, 66, 0.7), 0 0 50px rgba(126, 95, 66, 0.5)',
      },
      keyframes: {
        horizontalWiggle: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(5px)' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-50%)' },
        },
        stretch: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(2)' },
        },
        'ring-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        ellipsis: {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '50%': { transform: 'scale(0.5)', opacity: 0.5 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: 1 },
          '50%': { transform: 'scale(1.5)', opacity: 0.5 },
        },
        wave: {
          '0%, 100%': { transform: 'scaleY(0.5)' },
          '50%': { transform: 'scaleY(1)' },
        },

      },
      animation: {
        'horizontal-wiggle': 'horizontalWiggle 1s ease-in-out infinite',
        bounce: 'bounce 1s ease-in-out infinite',
        stretch: 'stretch 1.2s ease-in-out infinite',
        'ring-spin': 'ring-spin 1s linear infinite',
        ellipsis: 'ellipsis 1.5s infinite',
        pulse: 'pulse 1.5s infinite ease-in-out',
        wave: 'wave 1.2s ease-in-out infinite',






      },
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      const lightColors = theme('colors.light');
      const darkColors = theme('colors.dark');

      addBase({
        ':root': {
          '--tw-color-background': lightColors.background,
          '--tw-color-text': lightColors.text,
          '--tw-color-primary': lightColors.primary,
          '--tw-color-secondary': lightColors.secondary,
          '--tw-color-accent': lightColors.accent,
          '--tw-color-border': lightColors.border,
          '--tw-color-muted': lightColors.muted,
          '--tw-color-table-background': lightColors.table.background,
          '--tw-color-table-text': lightColors.table.text,
          '--tw-color-table-header': lightColors.table.header,
          '--tw-color-table-row': lightColors.table.row,
          '--tw-color-table-alt-row': lightColors.table.altRow,
          '--tw-color-table-hover': lightColors.table.hover,
          '--tw-color-table-border': lightColors.table.border,

        },
        '.dark': {
          '--tw-color-background': darkColors.background,
          '--tw-color-text': darkColors.text,
          '--tw-color-primary': darkColors.primary,
          '--tw-color-secondary': darkColors.secondary,
          '--tw-color-accent': darkColors.accent,
          '--tw-color-border': darkColors.border,
          '--tw-color-muted': darkColors.muted,
        },
      });
    },
  ],
};
