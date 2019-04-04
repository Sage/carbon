import React from 'react';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import { shallow } from 'enzyme';
import OptionsHelper from '../../utils/helpers/options-helper/options-helper';
import MessageStyle from './message.style';
import Message from './message.component';
import classicTheme from '../../style/themes/classic';
import CloseIcon from './close-icon/close-icon.component';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';

function render(props, renderer = TestRenderer.create) {
  return renderer(<MessageStyle { ...props }>Message</MessageStyle>);
}

describe('Message', () => {
  describe('when rendered', () => {
    it('should match the snapshot', () => {
      const wrapper = shallow(<Message>Message</Message>);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when onDismiss function is not provided', () => {
    it('not renders the close icon when the onDismiss prop ', () => {
      const wrapper = shallow(<Message>Message</Message>);
      const closeIcon = wrapper.find(CloseIcon);
      expect(closeIcon.length).toEqual(0);
    });
  });

  describe('when onDismiss function is provided', () => {
    it('should render the close icon', () => {
      const onDismiss = jest.fn();
      const wrapper = shallow(<Message onDismiss={ onDismiss }>Message</Message>);
      const closeIcon = wrapper.find(CloseIcon);
      expect(closeIcon.length).toEqual(1);
    });
  });

  describe('when transparent prop is set to true', () => {
    it('should render the message without the border', () => {
      const wrapper = render({
        transparent: true,
        type: 'info'
      });

      assertStyleMatch(
        {
          border: 'none'
        },
        wrapper.toJSON()
      );
    });
  });

  describe('when transparent prop is not passed', () => {
    it('should render the message with border in a proper color and a white background', () => {
      OptionsHelper.messages.forEach((messageType) => {
        const wrapper = render({ messageType });
        expect(wrapper.toJSON()).toMatchSnapshot();
      });
    });
  });

  describe('when in classic mode', () => {
    describe('when rendered', () => {
      it('should match the snapshot', () => {
        OptionsHelper.colors.forEach((messageType) => {
          const wrapper = render({ theme: classicTheme, messageType });
          expect(wrapper.toJSON()).toMatchSnapshot();
        });
      });
    });

    describe('when transparent prop is set to true', () => {
      it('should render the message without the border and background color in white', () => {
        const wrapper = render({
          transparent: true,
          theme: classicTheme,
          messageType: 'info'
        });

        assertStyleMatch(
          {
            border: 'none',
            backgroundColor: '#FFFFFF'
          },
          wrapper.toJSON()
        );
      });
    });

    describe('when border prop is set to false', () => {
      it('should render the message without a border', () => {
        const wrapper = render({
          border: false,
          theme: classicTheme,
          messageType: 'info'
        });

        assertStyleMatch(
          {
            border: 'none'
          },
          wrapper.toJSON()
        );
      });
    });

    describe('when roundedCorners prop is set to false', () => {
      it('should apply no border-radius style', () => {
        const wrapper = render({
          roundedCorners: false,
          theme: classicTheme,
          messageType: 'info'
        });

        assertStyleMatch(
          {
            borderRadius: '0px'
          },
          wrapper.toJSON()
        );
      });
    });

    describe('when roundedCorners prop is not passed', () => {
      it('should apply proper border-radius style', () => {
        const wrapper = render({
          theme: classicTheme,
          type: 'info'
        });

        assertStyleMatch(
          {
            borderRadius: '3px'
          },
          wrapper.toJSON()
        );
      });
    });
  });
});
