import React from 'react';
import TestRenderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import MessageContent from './message-content.component';
import MessageContentStyle from './message-content.style';
import 'jest-styled-components';
import OptionsHelper from '../../../utils/helpers/options-helper/options-helper';
import classicTheme from '../../../style/themes/classic';

function render(props) {
  return TestRenderer.create(<MessageContentStyle { ...props }>Message</MessageContentStyle>);
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
        it('should render the title with a proper color applied', () => {
          const wrapper = render({ theme: classicTheme, messageType, title: 'Example title' });
          expect(wrapper).toMatchSnapshot();
        });
      });
    });
  });
});
