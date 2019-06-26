import { assertIsSubset } from '../test-utils';
import largeTheme from '.';
import baseTheme from '../base';

describe('largeTheme', () => {
  it('contains the base theme', () => {
    assertIsSubset(baseTheme, largeTheme);
  });
});
