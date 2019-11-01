import { assertIsSubset } from '../test-utils';
import classicTheme from '.';
import baseTheme from '../base';

describe('classicTheme', () => {
  it('contains the base theme', () => {
    assertIsSubset(baseTheme, classicTheme);
  });
});
