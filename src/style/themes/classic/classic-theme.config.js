export default (palette) => {
  return (
    {
      colors: {
        base: palette.productGreen,
        primary: palette.productGreenShade(21),
        secondary: palette.productGreenShade(41),
        tertiary: palette.productGreenShade(61)
      },

      input: {
        borderColor: '#ccd6db',
        medium: {
          height: '31px',
          padding: '6px'
        },
        hover: {
          borderColor: '#99adb6'
        },
        active: {
          border: 'border: 1px solid #255bc7;'
        }
      }
    }
  );
};
