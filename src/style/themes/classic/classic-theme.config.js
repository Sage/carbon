import { THEMES } from '..';

export default (palette) => {
  return (
    {
      name: THEMES.classic,

      colors: {
        base: palette.productGreen,
        primary: palette.productGreenShade(21),
        secondary: palette.productGreenShade(41),
        tertiary: palette.productGreenShade(61),

        iconBackground: '#e6ebed',
        iconBorder: '#bfccd2',
        iconColor: palette.slate,
        iconColorAlt: '#fff',
        iconHover: palette.lightBlue,
        iconFocus: palette.navyBlue
      }
    }
  );
};
