import React from 'react';
import TestRenderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import CloseIcon from './close-icon.component';
import CloseIconStyle from './close-icon.style';
import 'jest-styled-components';
import OptionsHelper from '../../../utils/helpers/options-helper/options-helper';
import classicTheme from '../../../style/themes/classic';

function render(props, renderer = TestRenderer.create) {
  return renderer(<CloseIconStyle { ...props } />);
}

describe('CloseIcon', () => {
  describe('when rendered', () => {
    it('should render correctly', () => {
      expect(shallow(<CloseIcon />)).toHaveLength(1);
    });
  });

  describe('when render with no additional props', () => {
    OptionsHelper.messages.forEach((messageType) => {
      it(`should match snapshot for ${messageType}`, () => {
        const wrapper = render({ messageType });
        expect(wrapper.toJSON()).toMatchSnapshot();
      });
    });
  });
});

describe('when in classic mode', () => {
  OptionsHelper.colors.forEach((messageType) => {
    describe(`when rendered as ${messageType}`, () => {
      it('should match the snapshot', () => {
        const wrapper = render({ messageType, theme: classicTheme });
        expect(wrapper.toJSON()).toMatchSnapshot();
      });

      describe('when transparent prop is set to true', () => {
        it('should apply white color background', () => {
          const wrapper = render({
            transparent: true,
            theme: classicTheme,
            messageType
          });
          expect(wrapper.toJSON()).toMatchSnapshot();
        });
      });
    });
  });
});
