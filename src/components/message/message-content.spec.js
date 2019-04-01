import React from 'react';
import TestRenderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import MessageContent from './message-content.component';
import MessageContentStyle from './message-content.style';
import 'jest-styled-components';
import OptionsHelper from '../../utils/helpers/options-helper/options-helper';
import classicTheme from '../../style/themes/classic';

function render(props, renderer = TestRenderer.create) {
  return renderer(<MessageContentStyle { ...props }>Message</MessageContentStyle>);
}

describe('MessageContent', () => {
  describe('when rendered', () => {
    it('should render correctly', () => {
      expect(shallow(<MessageContent />)).toMatchSnapshot();
    });
  });

  describe('when in classic theme', () => {
    describe('when the title prop is provided', () => {
      OptionsHelper.messages.forEach((messageType) => {
        const wrapper = render({ theme: classicTheme, type: messageType, title: 'Example title' });
        expect(wrapper.toJSON()).toMatchSnapshot();
      });
    });
  });
});
