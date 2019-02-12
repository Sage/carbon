import configureBase from './base-theme.config';
import baseColors from '../../color-config';
import atOpacity from '../../utils/at-opacity';
import { mergeDeep } from '../../utils/merge-deep';
import generatePalette from '../../palette';

const addHex = base => `#${base}`;

const palette = {
  ...generatePalette(baseColors),
  atOpacity,
  ...Object.keys(baseColors).reduce((acc, col) => {
    acc[col] = addHex(baseColors[col]);
    return acc;
  }, {})
};


const baseTheme = configureBase(palette);

export default baseTheme;

export const mergeWithBase = (configureTheme) => {
  const themeToMergeWithBase = configureTheme(palette);

  return mergeDeep(baseTheme, themeToMergeWithBase);
};
