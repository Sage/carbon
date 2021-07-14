export default (palette) => {
  return {
    name: "mint",

    colors: {
      base: "#6875FC",
      primary: "#4050FB",
      secondary: "#333FC6",
      tertiary: "#262F94",
      whiteMix: palette.productGreenTint(90),
      hoveredTabKeyline: palette.productGreenTint(30),
      disabled: palette.productGreenTint(40),
    },

    stepSequence: {
      completedText: palette.productGreenShade(23),
    },
  };
};
