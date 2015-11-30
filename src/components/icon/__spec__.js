import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Icon from './index';

fdescribe('Icon', () => {
  let instance;

  describe('with no additional options', () => {
    beforeEach(() => {
      instance = Icon({ type: 'foo' });
    });

    it('renders with a class of icon-settings', () => {
      expect(instance.props.className).toEqual('icon-foo ');
    });
  });

  describe('with custom class name', () => {
    beforeEach(() => {
      instance = Icon({ type: 'foo', className: 'test' });
    });

    it('renders with a class of icon-settings and test', () => {
      expect(instance.props.className).toEqual('icon-foo test');
    });
  });
});
