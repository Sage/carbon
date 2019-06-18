import React from 'react';
import 'jest-styled-components';
import TestRenderer from 'react-test-renderer';
import { assertStyleMatch } from '../../../../__spec_helper__/test-utils';
import StyledTickIcon from './tick-icon.style';

function render(props) {
  return TestRenderer.create(<StyledTickIcon { ...props } type='tick' />);
}

describe('StyledTickIcon', () => {
  let wrapper;

  describe('when checked', () => {
    it('changes property display to block', () => {
      wrapper = render({ checked: true });
      assertStyleMatch(
        {
          display: 'block'
        },
        wrapper.toJSON(),
        { modifier: '&.carbon-icon' }
      );
    });
  });
});
