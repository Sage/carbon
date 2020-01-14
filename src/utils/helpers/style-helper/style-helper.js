import { classicTheme } from '../../../style/themes';

// eslint-disable-next-line import/prefer-default-export
export function isClassic({ name }) {
  return name === classicTheme.name;
}
