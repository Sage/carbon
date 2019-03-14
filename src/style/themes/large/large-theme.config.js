export default (palette) => {
  return (
    {
      name: 'large',

      colors: {
        base: palette.amethyst,
        primary: palette.amethystTint(10),
        secondary: palette.amethystShade(10),
        tertiary: palette.amethystShade(30)
      }
    }
  );
};
