import configureBase from './base_theme.config';
import baseColors from '../../color-config';
import atOpacity from '../../utils/at_opacity';
import { mergeDeep } from '../../utils/merge_deep';
import generatePalette from '../../palette';

const palette = {
  ...generatePalette(baseColors),
  atOpacity
};

export default (configureTheme) => {
  const baseTheme = configureBase(palette);
  const themeToMergWithBase = configureTheme(palette);

  return mergeDeep(baseTheme, themeToMergWithBase);
};
