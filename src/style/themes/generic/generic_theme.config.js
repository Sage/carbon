export default (palette) => {
  return (
    {
      colors: {
        base: palette.genericGreen,
        primary: palette.genericGreenTint(15),
        secondary: palette.genericGreenShade(35),
        tertiary: palette.genericGreenShade(55)
      }
    }
  );
};
