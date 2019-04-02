import React from 'react';
import { shallow } from 'enzyme';
import Preview from './preview';

const renderShallow = (children, props) => {
  return shallow(
    <Preview { ...props }>
      {children}
    </Preview>);
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

  describe('when given no children and a falsy loading prop', () => {
    it('will render nothing', () => {
      const wrapper = renderShallow(null, { loading: false });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when given children but a truthy loading prop', () => {
    it('will render the placeholder', () => {
      const wrapper = renderShallow('This is some text', { loading: true });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when multi line', () => {
    it('renders multi previews, the last being 80% width', () => {
      const wrapper = renderShallow(null, { lines: 3 });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when given a width and height', () => {
    it('renders with the given width and height', () => {
      const wrapper = renderShallow(null, { width: '10px', height: '20px' });
      expect(wrapper).toMatchSnapshot();
    });
  });
});
