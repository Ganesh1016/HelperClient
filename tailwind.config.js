import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    button: {
      colors: {
        blue: "#6C64FB",
      },
    },
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      body: "#FEFFFF",
      primary: "#6C64FB",
      darkPrimary: "#150524",
      tertiary: "#F4F5F4",
      lightText: "#787878",
      alert: "#FFE5E5",
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
    fontSize: {
      logo: "1.875rem",
      ctabuttonfont: "1.1rem",
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
      "6xl": "3.815rem",
      "7xl": "4.769rem",
      "8xl": "5.961rem",
      "9xl": "7.451rem",
      "10xl": "9.313rem",
    },
    extend: {
      borderRadius: {
        ctabutton: "2.5rem",
      },
    },
  },
  plugins: [], // Ensure you include the plugins array even if it's empty
});
