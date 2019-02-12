export default (palette) => {
  return (
    {
      colors: {
        base: palette.productGreen,
        primary: palette.productGreenShade(21),
        secondary: palette.productGreenShade(41),
        tertiary: palette.productGreenShade(61)
      }
    }
  );
};
