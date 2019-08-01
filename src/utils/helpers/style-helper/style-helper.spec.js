import { THEMES } from '../../../style/themes';
import { isClassic } from '.';
import Classic from '../../../style/themes/classic';
import Small from '../../../style/themes/small';

describe.each([[THEMES.classic, Classic], [THEMES.small, Small]])(
  'when isClassic is called', (name, theme) => {
    it(`returns the expected result for the ${name}`, () => {
      if (name === 'classic') expect(isClassic(theme)).toEqual(true);
      else expect(isClassic(theme)).toEqual(false);
    });
  }
);

describe(
  'when isClassic is called and the theme is undefined', () => {
    it('returns false', () => {
      expect(isClassic(undefined)).toEqual(false);
    });
  }
);
