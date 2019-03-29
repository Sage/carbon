import React from 'react';
import { shallow } from 'enzyme';
import MessageContent from './message-content.component';
import 'jest-styled-components';

function render(props) {
  return shallow(<MessageContent { ...props } />);
}

describe('MessageContent', () => {
  describe('when rendered', () => {
    it('should match snapshot', () => {
      expect(render()).toMatchSnapshot();
    });
  });
});
