import React from 'react';
import { shallow, mount } from 'enzyme';
import 'jest-styled-components';

import Icon from 'components/icon';
import InputIconToggle from './input-icon-toggle.component';

const props = {
  iconType: 'foo',
  inputId: '123',
  isHovered: false
};

describe('InputIconToggle', () => {
  let wrapper;

  describe('when initiated with the disabled prop set to true', () => {
    const propsDisabled = { ...props, disabled: true };

    beforeEach(() => {
      wrapper = shallow(<InputIconToggle { ...propsDisabled } />);
    });

    it('does not render anything', () => {
      expect(wrapper.isEmptyRender()).toBeTruthy();
    });
  });

  describe('when initiated without the content prop', () => {
    beforeEach(() => {
      wrapper = shallow(<InputIconToggle { ...props } />);
    });

    it('renders an Icon component with an icon type that was specified in the props', () => {
      expect(wrapper.contains(<Icon type={ props.iconType } />)).toBeTruthy();
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
