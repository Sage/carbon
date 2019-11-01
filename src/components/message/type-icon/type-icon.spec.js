import React from 'react';
import TestRenderer from 'react-test-renderer';
import TypeIconStyle from './type-icon.style';
import 'jest-styled-components';
import OptionsHelper from '../../../utils/helpers/options-helper';
import classicTheme from '../../../style/themes/classic';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';

function render(props) {
  return TestRenderer.create(<TypeIconStyle { ...props } />);
}

describe('TypeIcon', () => {
  describe('when rendered', () => {
    describe('with no additional props', () => {
      OptionsHelper.messages.forEach((variant) => {
        it(`should match the snapshot for ${variant}`, () => {
          const wrapper = render({ variant });
          expect(wrapper).toMatchSnapshot();
        });
      });
    });
  });

  describe('when transparent prop is set to true', () => {
    it('applies white background and the type icon with the proper style applied', () => {
      OptionsHelper.messages.forEach((variant) => {
        const wrapper = render({ transparent: true, variant });
        expect(wrapper).toMatchSnapshot();
      });
    });
  });

  describe('when in classic theme', () => {
    describe('when rendered', () => {
      OptionsHelper.colors.forEach((variant) => {
        it(`should match the snapshot for ${variant}`, () => {
          const wrapper = render({ variant, theme: classicTheme });
          expect(wrapper).toMatchSnapshot();
        });
      });
    });

    describe('when roundedCorners prop is set to false', () => {
      it('should apply no border-radius', () => {
        const wrapper = render({
          roundedCorners: false,
          theme: classicTheme,
          type: 'info'
        });

        assertStyleMatch(
          {
            borderRadius: '0px'
          },
          wrapper.toJSON()
        );
      });
    });

    describe('when transparent prop is set to true', () => {
      OptionsHelper.colors.forEach((variant) => {
        it(`applies white background and the type icon with the proper style applied for ${variant}`, () => {
          const wrapper = render({ transparent: true, variant, theme: classicTheme });
          expect(wrapper).toMatchSnapshot();
        });
      });
    });
  });
});
