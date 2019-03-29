import React from 'react';
import TestRenderer from 'react-test-renderer';
import Message from './message.component';
import 'jest-styled-components';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import classicTheme from '../../style/themes/classic';
import classicConfig from './message-classic-config.style';
import OptionsHelper from '../../utils/helpers/options-helper/options-helper';

function render(props) {
  return TestRenderer.create(<Message { ...props }>Message</Message>);
}

describe('Message', () => {
  describe('when rendered', () => {
    it('should match snapshot', () => {
      expect(render()).toMatchSnapshot();
    });
  });

  describe('when roundedCorners prop is set to false', () => {
    it('should apply no border-radius style', () => {
      const wrapper = render({
        roundedCorners: false
      });
      assertStyleMatch(
        {
          borderRadius: 'none'
        },
        wrapper.toJSON()
      );
    });
  });

  describe('when roundedCorners prop is not passed', () => {
    it('should apply proper border-radius style', () => {
      const wrapper = render();
      assertStyleMatch(
        {
          borderRadius: '3px'
        },
        wrapper.toJSON()
      );
    });
  });

  describe('when in classic mode', () => {
    describe('when transparent prop is set to true', () => {
      OptionsHelper.colors.forEach((messageType) => {
        it('should remove border and background color', () => {
          const wrapper = render({ transparent: true, theme: classicTheme, type: messageType });
          assertStyleMatch(
            {
              border: 'none',
              backgroundColor: classicConfig.transparent.backgroundColor
            },
            wrapper.toJSON()
          );
        });
      });
    });
  });
});
