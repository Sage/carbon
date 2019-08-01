import { THEMES } from '../../../style/themes';

// eslint-disable-next-line import/prefer-default-export
export function isClassic(theme) {
  return theme.name === THEMES.classic;
}
