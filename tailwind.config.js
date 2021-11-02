const _ = require("lodash");
const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
module.exports = {
  mode: "jit",
  purge: {
    content: ["./public/**/*.html"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1600px",
      xxxl: "1920px",

      // Max
      // "max-xs": { max: "359px" },
      // "max-sm": { max: "479px" },
      // "max-md": { max: "767px" },
      // "max-lg": { max: "1023px" },
      // "max-xl": { max: "1279px" },
      // "max-xxl": { max: "1599px" },
      // "max-xxxl": { max: "1919px" },
    },
    transitionDuration: {
      DEFAULT: "300ms",
      150: "150ms",
      200: "200ms",
    },
    transitionTimingFunction: {
      DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
      linear: "linear",
      in: "cubic-bezier(0.4, 0, 1, 1)",
      out: "cubic-bezier(0, 0, 0.2, 1)",
      "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
    },
    extend: {
      colors: {
        charcoal: "#2E343F",
        cream: "#FAF6EF",
        gold: {
          100: "#ECE7D4",
          200: "#CEBB8A",
          DEFAULT: "#BA9F55",
        },
        blue: {
          100: "#5AA2B6",
          200: "#007E9E",
          DEFAULT: "#00526A",
        },
      },
      fontFamily: {
        Bebas: ["Bebas Neue", "cursive"],
        Montserrat: ["Montserrat", "sans-serif"],
        Oswald: ["Oswald", "sans-serif"],
      },
      lineHeight: {
        0: "0",
      },
      maxHeight: {
        0: "0",
      },
      spacing: {
        120: "30rem",
        144: "36rem",
        "-px": "-1px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),

    // Hocus
    plugin(function ({ addVariant, e }) {
      addVariant("hocus", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) =>
          ["hover", "focus"]
            .map(
              (variant) => `.${e(`hocus${separator}${className}`)}:${variant}`
            )
            .join(",")
        );
      });

      // TODO: Investigate why group-hocus won't work with `@apply`
      addVariant("group-hocus", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) =>
          ["hover", "focus"]
            .map(
              (variant) =>
                `.group:${variant} .${e(`group-hocus${separator}${className}`)}`
            )
            .join(",")
        );
      });
    }),

    plugin(function ({ addUtilities }) {
      const typeUtilities = {
        ".type-sm": {
          fontSize:
            "clamp(0.75rem, calc(1rem - (2 / 1792 * 100 * 1vw)), 0.875rem)",
        },

        ".type-base": {
          fontSize:
            "clamp(0.9rem, calc(0.5rem + (8 / 1792 * 100 * 1vw)), 1.1rem)",
        },

        ".type-lg": {
          fontSize:
            "clamp(1rem, calc(1rem + (2 / 1792 * 100 * 1vw)), 1.125rem)",
        },

        ".type-xl": {
          fontSize:
            "clamp(1.25rem, calc(1rem + (8 / 1792 * 100 * 1vw)), 1.5rem)",
        },

        ".type-2xl": {
          fontSize:
            "clamp(1.333rem, calc(1rem + (16 / 1792 * 100 * 1vw)), 2rem)",
        },

        ".type-3xl": {
          fontSize:
            "clamp(1.666rem, calc(1rem + (24 / 1792 * 100 * 1vw)), 2.5rem)",
        },

        ".type-4xl": {
          fontSize: "clamp(2rem, calc(1rem + (32 / 1792 * 100 * 1vw)), 3rem)",
        },

        ".type-5xl": {
          fontSize:
            "clamp(2.666rem, calc(1rem + (48 / 1792 * 100 * 1vw)), 4rem)",
        },

        ".type-6xl": {
          fontSize: "clamp(3rem, calc(1rem + (56 / 1792 * 100 * 1vw)), 4.5rem)",
        },

        ".type-7xl": {
          fontSize: "clamp(4rem, calc(1rem + (80 / 1792 * 100 * 1vw)), 6rem)",
        },

        ".type-8xl": {
          fontSize:
            "clamp(4.666rem, calc(1rem + (96 / 1792 * 100 * 1vw)), 7rem)",
        },

        ".type-10xl": {
          fontSize:
            "clamp(5.25rem, calc(1rem + (112 / 1792 * 100 * 1vw)), 9rem)",
        },
      };

      addUtilities(typeUtilities, ["responsive"]);
    }),

    // Flood utilities
    plugin(function ({ addUtilities, config }) {
      const containerPadding = {
        min: "1.5rem",
        xs: "2rem",
        sm: "3rem",
        md: "4rem",
        lg: "4rem",
        xl: "8rem",
        xxl: "10rem",
        xxxl: "12rem",
      };

      const floodUtilities = _.map(containerPadding, (padding, screen) => {
        let width = config(`theme.screens.${screen}`);

        return {
          [`@media (min-width: ${width})`]: {
            ".container": {
              "padding-left": padding,
              "padding-right": padding,
            },
            ".flood-r": {
              "margin-right": `-${padding}`,
            },
            ".flood-l": {
              "margin-left": `-${padding}`,
            },
            ".bordered": {
              "padding-left": `calc(${padding} - 2rem)`,
              "padding-right": `calc(${padding} - 2rem)`,
            },
          },
        };
      });

      floodUtilities.unshift({
        ".container": {
          "padding-left": containerPadding.min,
          "padding-right": containerPadding.min,
        },
        ".flood-r": {
          "margin-right": `-${containerPadding.min}`,
        },
        ".flood-l": {
          "margin-left": `-${containerPadding.min}`,
        },
      });

      addUtilities([...floodUtilities]);
    }),
  ],
};
