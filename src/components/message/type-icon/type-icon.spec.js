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
      expect(shallow(<TypeIcon />)).toHaveLength(1);
    });

    it('should match the snapshot', () => {
      const wrapper = shallow(<TypeIcon />);
      expect(wrapper).toMatchSnapshot();
    });

    describe('with no additional props', () => {
      OptionsHelper.messages.forEach((messageType) => {
        it(`should match the snapshot for ${messageType}`, () => {
          const wrapper = render({ type: messageType });
          expect(wrapper.toJSON()).toMatchSnapshot();
        });
      });
    });
  });

  describe('when roundedCorners prop is set to false', () => {
    it('should apply no border-radius', () => {
      const wrapper = render({ roundedCorners: false });
      expect(wrapper.toJSON()).toMatchSnapshot();
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
      OptionsHelper.colors.forEach((messageType) => {
        it(`should match the snapshot for ${messageType}`, () => {
          const wrapper = render({ type: messageType, theme: classicTheme });
          expect(wrapper.toJSON()).toMatchSnapshot();
        });
      });
    });

    describe('when transparent prop is set to true', () => {
      OptionsHelper.colors.forEach((messageType) => {
        it(`applies white background and the type icon with the proper style applied for ${messageType}`, () => {
          const wrapper = render({ transparent: true, type: messageType, theme: classicTheme });
          expect(wrapper.toJSON()).toMatchSnapshot();
        });
      });
    });
  });
});
