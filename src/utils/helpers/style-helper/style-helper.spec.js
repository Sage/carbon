import { THEMES } from '../../../style/themes';
import { isClassic } from '.';
import classicTheme from '../../../style/themes/classic';
import mintTheme from '../../../style/themes/mint';

describe.each([[THEMES.classic, classicTheme], [THEMES.mint, mintTheme]])(
  'when isClassic is called', (name, theme) => {
    it(`returns the expected result for the ${name}`, () => {
      if (name === 'classic') expect(isClassic(theme)).toEqual(true);
      else expect(isClassic(theme)).toEqual(false);
    });
  }
);
