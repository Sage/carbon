import React from 'react';
import TestRenderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import TypeIcon from './type-icon.component';
import TypeIconStyle from './type-icon.style';
import 'jest-styled-components';
import OptionsHelper from '../../../utils/helpers/options-helper';
import classicTheme from '../../../style/themes/classic';

function render(props, renderer = TestRenderer.create) {
  return renderer(<TypeIconStyle { ...props } />);
}

describe('TypeIcon', () => {
  describe('when rendered', () => {
    it('renders correctly', () => {
      expect(shallow(<TypeIcon />)).toMatchSnapshot();
    });

    it('should match the snapshot', () => {
      OptionsHelper.messages.forEach((messageType) => {
        const wrapper = render({ type: messageType });
        expect(wrapper.toJSON()).toMatchSnapshot();
      });
    });
  });

  describe('when transparent prop is set to true', () => {
    it('applies white background and the type icon with the proper style applied', () => {
      OptionsHelper.messages.forEach((messageType) => {
        const wrapper = render({ transparent: true, type: messageType });
        expect(wrapper.toJSON()).toMatchSnapshot();
      });
    });
  });

  describe('when in classic mode', () => {
    describe('when rendered', () => {
      it('should match the snapshot', () => {
        OptionsHelper.colors.forEach((messageType) => {
          const wrapper = render({ type: messageType, theme: classicTheme });
          expect(wrapper.toJSON()).toMatchSnapshot();
        });
      });
    });

    describe('when transparent prop is set to true', () => {
      it('applies white background and the type icon with the proper style applied', () => {
        OptionsHelper.colors.forEach((messageType) => {
          const wrapper = render({ transparent: true, type: messageType, theme: classicTheme });
          expect(wrapper.toJSON()).toMatchSnapshot();
        });
      });
    });
  });
});
