import React from 'react';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import StyledLoaderSquare from './loader-square.style';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import baseTheme from '../../style/themes/base';

function render(props) {
  return TestRenderer.create(<StyledLoaderSquare { ...props } />);
}

describe('Loader square', () => {
  let wrapper;
  it('renders as expected', () => {
    wrapper = render();
    assertStyleMatch(
      {
        backgroundColor: baseTheme.colors.primary,
        height: '8px',
        width: '8px',
        marginRight: '6px'
      },
      wrapper.toJSON()
    );
  });

  describe('when inside button', () => {
    it('applies white background', () => {
      wrapper = render({ isInsideButton: true });
      assertStyleMatch(
        {
          backgroundColor: baseTheme.colors.white
        },
        wrapper.toJSON()
      );
    });

    describe('when is not active', () => {
      it('applies slate background', () => {
        wrapper = render({ isInsideButton: true, isActive: false });
        assertStyleMatch(
          {
            backgroundColor: baseTheme.colors.border
          },
          wrapper.toJSON()
        );
      });
    });
  });

  describe('when size is set to large', () => {
    it('applies proper width, height and margin', () => {
      wrapper = render({ size: 'large' });
      assertStyleMatch(
        {
          height: '16px',
          width: '16px',
          marginRight: '10px'
        },
        wrapper.toJSON()
      );
    });
  });
});
