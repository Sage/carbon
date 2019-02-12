import generatePalette from '../palette';
import atOpacity from '../utils/at-opacity';
import baseColors from '../color-config';

const addHex = base => `#${base}`;

export const palette = {
  ...generatePalette(baseColors),
  atOpacity,
  ...Object.keys(baseColors).reduce((acc, col) => {
    acc[col] = addHex(baseColors[col]);
    return acc;
  }, {})
};
const blackWithOpacity = atOpacity('#000000');

export const baseThemeConfig = {
  colors: {
    brand: palette.brilliantGreen,
    white: '#FFFFFF',
    error: palette.errorRed,
    warning: palette.gold,
    success: palette.brilliantGreenShade(20),
    info: palette.productBlueShade(3),
    text: {
      body: blackWithOpacity(0.9),
      disabled: blackWithOpacity(0.55),
      placeholder: blackWithOpacity(0.3)
    }
  }
};


const isObject = (obj) => {
  return typeof obj === 'object' && obj !== null;
};

export const assertIsSubset = (obj, comparison) => {
  if (!isObject(obj)) {
    // no further nesting, assert that values are equal
    expect(obj).toEqual(comparison);
    return;
  }

  const objKeys = Object.keys(obj);
  const comparisonKeys = Object.keys(comparison);

  objKeys.forEach((key) => {
    // assert that keys are present
    expect(comparisonKeys.includes(key)).toBeTruthy();

    // repeat for nested objects
    assertIsSubset(obj[key], comparison[key]);
  });
};
