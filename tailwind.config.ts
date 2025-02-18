import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation:{
        "cart_saltar":"cart_saltar 8s infinite ",
        "pulse-fade-in": "pulse-fade-in 0.6s ease-out",
        "blurred-fade-in": "blurred-fade-in 0.4s ease-in-out",
        "rotate-in": "rotate-in 0.6s ease-out",
        "zoom-out": "zoom-out 1s infinite ",
        "transitionToLefft":"transitionToLefft 8s ease-in-out"
      },
      keyframes:{

        "transitionToLefft":{
          "0%": {
            "transform": "translateX(50%)"
          },
          "100%": {
            "transform": "translateX(-100%)"
          },
        },
        "zoom-out": {
          "0%": {
            "opacity": "1",
            "transform": "scale(1)"
          },
          "100%": {
            "opacity": "0.4",
            "transform": "scale(.5)"
          }
        },

        "cart_saltar":{
          "0%":{"transform": "rotate(5deg)"},
          "2%":{"transform": "rotate(-5deg)"},
          "4%":{"transform": "rotate(5deg)"},
          "6%":{"transform": "rotate(-5deg)"},
          "8%":{"transform": "rotate(5deg)"},
          "10%":{"transform": "rotate(-5deg)"},
          "12%":{"transform": "rotate(0deg)"},
          "100%":{"transform": "rotate(0deg)"},
        },


        "rotate-in": {
          "0%": {
            "opacity": "0",
            "transform": "rotate(-90deg)"
          },
          "100%": {
            "opacity": "1",
            "transform": "rotate(0deg)"
          }
        },
        "blurred-fade-in": {
          "0%": {
            "filter": "blur(5px)",
            "opacity": "0"
          },
          "100%": {
            "filter": "blur(0)",
            "opacity": "1"
          }
        },
        "pulse-fade-in": {
          "0%": {
            "transform": "scale(0.9)",
            "opacity": "0"
          },
          "50%": {
            "transform": "scale(1.05)",
            "opacity": "0.5"
          },
          "100%": {
            "transform": "scale(1)",
            "opacity": "1"
          }
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
