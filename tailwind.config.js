module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.{js,jsx,ts,tsx,vue}',
    './website/src/**/*.{js,jsx,ts,tsx,vue}',
    './figma-plugin/src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#FF430A',
        'controls-panel': '#F6F8F8',
        'controls-panel-mobile': 'rgba(245, 245, 245, 0.2)',
      },
      spacing: {
        0.2: '3.5px',
        0.5: '6px',
        1: '8px',
        1.5: '10px',
        2: '12px',
        3: '16px',
        3.5: '20px',
        4: '26px', // modified form  24px
        5: '32px',
        6: '48px',
      },
      borderRadius: {
        none: '0',
        sm: '4px',
        DEFAULT: '9px',
        md: '11px',
        lg: '0.5rem',
        full: '9999px',
      },
      fontSize: {
        xs: '.75rem',
        sm: '.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.714rem', // modified from 1.875rem
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
      },
      width: {
        'control-number-input': '53px',
        thumb: '16px',
        mark: '2px',
      },
      height: {
        input: '34px',
        button: '55px',
        slider: '2px',
        thumb: '16px',
        mark: '16px',
      },
      opacity: {
        'preview-btn': '.17',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
