import React from 'react';
import { shallow } from 'enzyme';

import InputIconToggle from './input-icon-toggle.component';

const props = {
  iconType: 'foo',
  inputId: '123'
};

describe('InputIconToggle', () => {
  let wrapper;

  describe('when initiated without the content prop', () => {
    beforeEach(() => {
      wrapper = shallow(<InputIconToggle { ...props } />);
    });

    it('renders as expected', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when initiated with the content prop', () => {
    const mockContent = <span>mock content</span>;
    const propsWithContent = { content: mockContent, ...props };

    beforeEach(() => {
      wrapper = shallow(<InputIconToggle { ...propsWithContent } />);
    });

    it('renders as expected', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
