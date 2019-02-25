import React from 'react';
import { shallow, mount } from 'enzyme';
import 'jest-styled-components';

import InputIconToggle from './input-icon-toggle.component';

const props = {
  iconType: 'foo',
  inputId: '123',
  isHovered: false
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

  describe('when initiated with the isHovered prop set to false', () => {
    beforeEach(() => {
      wrapper = mount(<InputIconToggle { ...props } />);
    });

    it('renders as expected', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when initiated with the isHovered prop set to true', () => {
    const propsHovered = { ...props, isHovered: true };

    beforeEach(() => {
      wrapper = mount(<InputIconToggle { ...propsHovered } />);
    });

    it('renders as expected', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
