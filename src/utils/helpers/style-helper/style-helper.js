import { THEMES } from '../../../style/themes';

// eslint-disable-next-line import/prefer-default-export
export function isClassic(theme) {
  if (theme === undefined) return false;
  return theme.name === THEMES.classic;
}
