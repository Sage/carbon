export default (palette) => {
  return {
    name: "mint",

    colors: {
      base: "#4050FB",
      primary: "#333FC6",
      secondary: "#262F94",
      tertiary: "#191F62",
      whiteMix: palette.productGreenTint(90),
      hoveredTabKeyline: palette.productGreenTint(30),
      disabled: palette.productGreenTint(40),
    },

    stepSequence: {
      completedText: palette.productGreenShade(23),
    },
  };
};
