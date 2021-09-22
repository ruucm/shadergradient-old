module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#FF430A",
        "controls-panel": "#F6F8F8",
      },
      spacing: {
        1: "8px",
        2: "12px",
        3: "16px",
        4: "26px", // modified form  24px
        5: "32px",
        6: "48px",
      },
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        DEFAULT: "9px",
        md: "11px",
        lg: "0.5rem",
        full: "9999px",
      },
      fontSize: {
        xs: ".75rem",
        sm: ".875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.714rem", // modified from 1.875rem
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
      },
      width: {
        "control-types": "168px",
        control: "408px",
        "control-title": "93px",
        "control-inputs": "283px",
        "control-number-input": "53px",
        thumb: "16px",
        mark: "2px",
      },
      height: {
        input: "34px",
        button: "55px",
        slider: "2px",
        thumb: "16px",
        mark: "16px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
