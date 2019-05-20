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

function render(props) {
  return TestRenderer.create(<MessageStyle { ...props }>Message</MessageStyle>);
}

describe('Message', () => {
  describe('when in small/medium/large theme', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Message>Message</Message>);
    });

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('does not render the close icon when onDismiss prop is not provided', () => {
      const closeIcon = wrapper.find(CloseIcon);
      expect(closeIcon.exists()).toEqual(false);
    });

    it('renders the close icon when onDismiss function is provided', () => {
      const onDismiss = jest.fn();
      wrapper.setProps({ onDismiss });
      const closeIcon = wrapper.find(CloseIcon);
      expect(closeIcon.exists()).toEqual(true);
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
      OptionsHelper.messages.forEach((variant) => {
        const wrapper = render({ variant });
        expect(wrapper).toMatchSnapshot();
      });
    });
  });

  describe('when in classic mode', () => {
    describe('when rendered', () => {
      it('should match the snapshot', () => {
        OptionsHelper.colors.forEach((variant) => {
          const wrapper = render({ theme: classicTheme, variant });
          expect(wrapper).toMatchSnapshot();
        });
      });
    });

    describe('when transparent prop is set to true', () => {
      it('should render the message without the border and with background transparent', () => {
        const wrapper = render({
          transparent: true,
          theme: classicTheme,
          variant: 'info'
        });

        assertStyleMatch(
          {
            border: 'none',
            backgroundColor: 'transparent'
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
          variant: 'info'
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
          variant: 'info'
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
