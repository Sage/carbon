import { assertIsSubset } from '../test-utils';
import mediumTheme from '.';
import baseTheme from '../base';

describe('mediumTheme', () => {
  it('contains the base theme', () => {
    assertIsSubset(baseTheme, mediumTheme);
  });
});
