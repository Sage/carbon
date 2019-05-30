import React from 'react';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import Preview from './preview.component';

const render = (children, props) => {
  return TestRenderer.create(
    <Preview { ...props }>
      {children}
    </Preview>
  );
};

describe('Preview', () => {
  describe('when given children', () => {
    it('will render the children', () => {
      const wrapper = render('This is some text');
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when given no children', () => {
    it('will render the placeholder', () => {
      const wrapper = render();
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when given no children and a falsy loading prop', () => {
    it('will render nothing', () => {
      const wrapper = render(null, { loading: false });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when given children but a truthy loading prop', () => {
    it('will render the placeholder', () => {
      const wrapper = render('This is some text', { loading: true });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when multi line', () => {
    it('renders multi previews, the last being 80% width', () => {
      const wrapper = render(null, { lines: 3 });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when given a width and height', () => {
    it('renders with the given width and height', () => {
      const wrapper = render(null, { width: '10px', height: '20px' });
      expect(wrapper).toMatchSnapshot();
    });
  });
});
