import configureBase from './base-theme.config';
import baseColors from '../../color-config';
import atOpacity from '../../utils/at-opacity';
import { mergeDeep } from '../../utils/merge-deep';
import generatePalette from '../../palette';
import addHexSymbols from '../../utils/add-hex-symbols';

const palette = {
  ...generatePalette(baseColors),
  atOpacity,
  ...addHexSymbols(baseColors)
};


const baseTheme = configureBase(palette);

export default baseTheme;

export const mergeWithBase = (configureTheme) => {
  const themeToMergeWithBase = configureTheme(palette);

  return mergeDeep(baseTheme, themeToMergeWithBase);
};
