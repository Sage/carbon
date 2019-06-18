import React from 'react';
import 'jest-styled-components';
import TestRenderer from 'react-test-renderer';
import { assertStyleMatch } from '../../../../__spec_helper__/test-utils';
import StyledColorOptionInput from './style/color-option-input.style';
import StyledColorSampleBox from '../color-sample-box/style/color-sample-box.style';
import baseTheme from '../../../../style/themes/base';
import classicTheme from '../../../../style/themes/classic';

function render(props) {
  return TestRenderer.create(<StyledColorOptionInput { ...props } />);
}

describe('ColorOptionInput', () => {
  let wrapper;

  describe('when checked', () => {
    it('applies white box shadow and primary accent color border', () => {
      wrapper = render();
      assertStyleMatch(
        {
          border: `2px solid ${baseTheme.colors.primary}`,
          boxShadow: `inset 0px 0px 0px 3px ${baseTheme.colors.white}`
        },
        wrapper.toJSON(),
        { modifier: `:checked + ${StyledColorSampleBox}` }
      );
    });
  });

  describe('when in classic theme', () => {
    describe('when checked and focused', () => {
      it('applies border and no box shadow', () => {
        wrapper = render({ theme: classicTheme });
        assertStyleMatch(
          {
            border: '1px solid #003349',
            boxShadow: 'none'
          },
          wrapper.toJSON(),
          { modifier: `:checked + ${StyledColorSampleBox}` }
        );
      });
    });
  });
});
