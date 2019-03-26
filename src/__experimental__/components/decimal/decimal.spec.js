import React from 'react';
import { shallow } from 'enzyme';
import Decimal from './decimal.component';

function render(props, renderer = shallow) {
  return renderer(
    <Decimal { ...props } />
  );
}

describe('Decimal', () => {
  describe('Init test', () => {
    it('returns false', () => {
      const test = false;
      expect(test).toEqual(false);
    });
  });
});
