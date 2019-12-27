export default (palette) => {
  return (
    {
      name: 'mint',

      colors: {
        base: palette.productGreen,
        primary: palette.productGreenShade(21),
        secondary: palette.productGreenShade(41),
        tertiary: palette.productGreenShade(61),
        whiteMix: palette.productGreenTint(90),
        hoveredTabKeyline: palette.productGreenTint(30),
        disabled: palette.productGreenTint(40)
      }
    }
  );
};
