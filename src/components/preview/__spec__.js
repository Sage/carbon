import React from 'react';
import { shallow } from 'enzyme';
import Preview from './preview';

const renderShallow = (children, props) => {
  return shallow(
    <Preview { ...props }>
      { children }
    </Preview>
  );
};

describe('Preview', () => {
  describe('when given children', () => {  
    it('will render the children', () => {
      const wrapper = renderShallow('This is some text');
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when given no children', () => {
    it('will render the placeholder', () => {
      const wrapper = renderShallow();
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when given children but a truthy loading prop', () => {
    it('will render the placeholder', () => {
      const wrapper = renderShallow('This is some text', { loading: true });
      expect(wrapper).toMatchSnapshot();
    });
  });
});
