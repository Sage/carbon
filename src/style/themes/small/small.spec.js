import { assertIsSubset } from '../test-utils';
import smallTheme from '.';
import baseTheme from '../base';

describe('smallTheme', () => {
  it('contains the base theme', () => {
    assertIsSubset(baseTheme, smallTheme);
  });
});
