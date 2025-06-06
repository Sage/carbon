import { create } from "storybook/theming/create";

export default create({
  base: "light",

  colorPrimary: "#007e45",
  colorSecondary: "#007e45",

  // UI
  appBg: "#FFFFFF",
  appContentBg: "#f2f5f6",
  appBorderColor: "#000000",

  // Typography
  fontBase: '"Sage UI", sans-serif',
  fontCode: "monospace",

  // Text colors
  textColor: "rgba(0,0,0,0.9)",
  textInverseColor: "rgba(255,255,255,1)",

  // Toolbar default and active colors
  barTextColor: "white",
  barSelectedColor: "#00DC00",
  barBg: "#000000",

  // Form colors
  inputBg: "white",
  inputBorder: "#668592",
  inputTextColor: "rgba(0,0,0,0.9)",
  inputBorderRadius: 0,

  brandTitle: "Carbon by Sage",
  brandUrl: "https://carbon.sage.com",
  brandImage: "carbon-by-sage-logo.png",
});
