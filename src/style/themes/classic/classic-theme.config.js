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
        gutter: '10px',
        medium: {
          height: '31px',
          padding: '6px'
        },
        hover: {
          borderColor: '#99adb6'
        },
        active: {
          border: 'border: 1px solid #255bc7;'
        },
        disabled: {
          backgroundColor: '#d9e0e4',
          borderColor: '#d9e0e4'
        },
        validation: {
          borderWidth: '1px'
        },
        fieldHelp: {
          color: '#335c6d',
          marginSide: '6px',
          marginTop: '5px'
        },
        label: {
          marginSide: '6px'
        }
      }
    }
  );
};
