import { THEMES } from '../../../style/themes';
import { isClassic } from '.';
import Classic from '../../../style/themes/classic';
import Small from '../../../style/themes/small';

describe.each([[THEMES.classic, Classic], [THEMES.small, Small]])(
  'when isClassic is called', (name, theme) => {
    it(`returns the expected result for the ${name}`, () => {
      expect(isClassic(theme));
    });
  }
);
