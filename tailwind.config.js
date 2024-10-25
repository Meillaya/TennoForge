/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'wf-primary': '#9D4EDD', // Main purple
        'wf-accent': '#FF3366',
        'wf-dark': {
          DEFAULT: '#0A0A0B',
          900: '#050506',
          800: '#151517',
          700: '#1C1C1F',
          600: '#232326'
        },
        'wf-purple': {
          50: '#F6EFFE',
          100: '#E6CCFF',
          200: '#D4A6FF',
          300: '#B975FF',
          400: '#9D4EDD', // Primary
          500: '#7B2CBF',
          600: '#5A189A',
          700: '#3C096C',
          800: '#240046',
          900: '#10002B'
        }
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif']
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
        'noise': "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAElBMVEUAAAAAAAAAAAAAAAAAAAAAAADgKxmiAAAABnRSTlMDY2pkYmE0pPjhAAAANklEQVQ4y2NgQAX8DIxgwsTAwMjACGFBhBkR8v/BgokRKg9XwIgQgJiFSHmEAbgChDFYQR8DALZgJP1ReaRBAAAAAElFTkSuQmCC')"
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(157, 78, 221, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(157, 78, 221, 0.6)' }
        }
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.wf-primary'),
              '&:hover': {
                color: theme('colors.wf-purple.300'),
              },
            },
            h1: {
              color: theme('colors.gray.100'),
            },
            h2: {
              color: theme('colors.gray.100'),
            },
            h3: {
              color: theme('colors.gray.100'),
            },
            h4: {
              color: theme('colors.gray.100'),
            },
            strong: {
              color: theme('colors.gray.100'),
            },
            code: {
              color: theme('colors.gray.100'),
              backgroundColor: theme('colors.wf-dark.700'),
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
            },
            blockquote: {
              color: theme('colors.gray.400'),
              borderLeftColor: theme('colors.wf-dark.600'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class'
    }),
    require('@tailwindcss/typography')
  ],
};