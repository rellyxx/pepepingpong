/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  darkTheme: "light",
  // DaisyUI theme colors
  daisyui: {
    themes: [
      {
        light: {
          primary: "#383D51",
          "primary-content": "#212638",
          secondary: "#383D51",
          "secondary-content": "#212638",
          accent: "#ffffff",
          "accent-content": "#212638",
          neutral: "#212638",
          "neutral-content": "#ffffff",
          "base-100": "#ffffff",
          "base-200": "#f4f8ff",
          "base-300": "#FFC850",
          "base-content": "#212638",
          info: "#93BBFB",
          success: "#34EEB6",
          warning: "#FFCF72",
          error: "#FF8863",
          dw: "#ffffff",
          "--rounded-btn": "9999rem",

          ".tooltip": {
            "--tooltip-tail": "6px",
          },
          ".link": {
            textUnderlineOffset: "2px",
          },
          ".link:hover": {
            opacity: "80%",
          },
          ".btn": {
            borderRadius: "25px",
          },
        },
      },
      // {
      //   dark: {
      //     primary: "#383D51",
      //     "primary-content": "#F9FBFF",
      //     secondary: "#383D51",
      //     "secondary-content": "#F9FBFF",
      //     accent: "#292727e8",
      //     "accent-content": "#F9FBFF",
      //     neutral: "#F9FBFF",
      //     "neutral-content": "#385183",
      //     "base-100": "#385183",
      //     "base-200": "#000",
      //     "base-300": "#212638",
      //     "base-content": "#F9FBFF",
      //     info: "#385183",
      //     success: "#34EEB6",
      //     warning: "#FFCF72",
      //     error: "#FF8863",
      //     dw:"#000000",
      //     "--rounded-btn": "9999rem",
      //     ".tooltip": {
      //       "--tooltip-tail": "6px",
      //       "--tooltip-color": "oklch(var(--p))",
      //     },
      //     ".link": {
      //       textUnderlineOffset: "2px",
      //     },
      //     ".link:hover": {
      //       opacity: "80%",
      //     },
      //     ".btn":{
      //       borderRadius:"4px",
      //     }
      //   },
      // },
    ],
  },
  theme: {
    // colors:{
    //   themeYellow:"#F89F1A",
    // },
    extend: {
      boxShadow: {
        center: "0 0 12px -2px rgb(0 0 0 / 0.05)",
      },
      animation: {
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
};
