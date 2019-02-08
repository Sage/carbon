export default (palette) => {
  const { atOpacity } = palette,
      blackWithOpacity = atOpacity('#000000');

  return (
    {
      colors: {
        white: '#FFFFFF',
        error: palette.errorRed,
        warning: palette.gold,
        sageLogo: palette.brilliantGreen,
        success: palette.brilliantGreenShade(20),
        info: palette.productBlueShade(3),
        text: {
          body: blackWithOpacity(0.9),
          disabled: blackWithOpacity(0.55),
          placeholder: blackWithOpacity(0.3)
        }
      }
    }
  );
};
