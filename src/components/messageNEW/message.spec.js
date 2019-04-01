import React from 'react';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import { shallow } from 'enzyme';
import OptionsHelper from '../../utils/helpers/options-helper/options-helper';
import MessageStyle from './message.style';
import Message from './message.component';
import classicTheme from '../../style/themes/classic';

function render(props, renderer = TestRenderer.create) {
  return renderer(<MessageStyle { ...props }>Message</MessageStyle>);
}

describe('Message', () => {
  describe('when rendered', () => {
    it('should match the snapshot', () => {
      OptionsHelper.messages.forEach((messageType) => {
        const wrapper = render({ type: messageType });
        expect(wrapper.toJSON()).toMatchSnapshot();
      });
    });
  });

  describe('when onDismiss function is not provided', () => {
    it('should not render the close icon', () => {
      const wrapper = shallow(<Message onDismiss={ false }>Message</Message>);
      expect(wrapper.children().length).toEqual(2);
    });
  });

  describe('when onDismiss function is provided', () => {
    it('should not render the close icon', () => {
      const wrapper = shallow(<Message onDismiss>Message</Message>);
      expect(wrapper.children().length).toEqual(3);
    });
  });

  describe('when roundedCorners prop is set to false', () => {
    it('should apply no border-radius style', () => {
      const wrapper = render({ roundedCorners: false });
      expect(wrapper.toJSON()).toMatchSnapshot();
    });
  });

  describe('when roundedCorners prop is not passed', () => {
    it('should apply proper border-radius style', () => {
      expect(render().toJSON()).toMatchSnapshot();
    });
  });

  describe('when transparent prop is set to true', () => {
    it('should render the message without the border', () => {
      OptionsHelper.colors.forEach((messageType) => {
        const wrapper = render({ transparent: true, type: messageType });
        expect(wrapper.toJSON()).toMatchSnapshot();
      });
    });
  });

  describe('when in classic mode', () => {
    describe('when rendered', () => {
      it('should match the snapshot', () => {
        OptionsHelper.messages.forEach((messageType) => {
          const wrapper = render({ theme: classicTheme, type: messageType });
          expect(wrapper.toJSON()).toMatchSnapshot();
        });
      });
    });

    describe('when transparent prop is set to true', () => {
      it('should render the message without the border and background color', () => {
        OptionsHelper.colors.forEach((messageType) => {
          const wrapper = render({ transparent: true, theme: classicTheme, type: messageType });
          expect(wrapper.toJSON()).toMatchSnapshot();
        });
      });
    });

    describe('when border prop is set to false', () => {
      it('should render the message without a border', () => {
        OptionsHelper.colors.forEach((messageType) => {
          const wrapper = render({ border: false, theme: classicTheme, type: messageType });
          expect(wrapper.toJSON()).toMatchSnapshot();
        });
      });
    });
  });
});
