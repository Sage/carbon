import React from 'react';
import TestRenderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import CloseIcon from './close-icon.component';
import CloseIconStyle from './close-icon.style';
import 'jest-styled-components';
import OptionsHelper from '../../utils/helpers/options-helper/options-helper';
import classicTheme from '../../style/themes/classic';

function render(props, renderer = TestRenderer.create) {
  return renderer(<CloseIconStyle { ...props } />);
}

describe('CloseIcon', () => {
  describe('when rendered', () => {
    it('should render correctly', () => {
      expect(shallow(<CloseIcon />)).toMatchSnapshot();
    });

    it('should match the snapshot', () => {
      OptionsHelper.messages.forEach((messageType) => {
        const wrapper = render({ type: messageType });
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
  });
});
