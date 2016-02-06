import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Icon from './icon';

describe('Icon', () => {
  let instance, span;

  describe('renderIcon', () => {
    it('calls the render warning icon method', () => {
      instance = TestUtils.renderIntoDocument(<Icon type='warning' />);
      spyOn(instance, 'renderWarningIcon');
      instance.renderIcon;
      expect(instance.renderWarningIcon).toHaveBeenCalled();
    });

    it('calls the render new icon method', () => {
      instance = TestUtils.renderIntoDocument(<Icon type='new' />);
      spyOn(instance, 'renderNewIcon');
      instance.renderIcon;
      expect(instance.renderNewIcon).toHaveBeenCalled();
    });

    it('calls the render maintenance icon method', () => {
      instance = TestUtils.renderIntoDocument(<Icon type='maintenance' />);
      spyOn(instance, 'renderMaintenanceIcon');
      instance.renderIcon;
      expect(instance.renderMaintenanceIcon).toHaveBeenCalled();
    });
  });

  describe('success', () => {
    it('renders with an icon of tick', () => {
      instance = TestUtils.renderIntoDocument(<Icon type='success' />);
      span = TestUtils.findRenderedDOMComponentWithTag(instance, 'span');
      expect(span.className).toEqual('icon-tick');
    });
  });

  describe('with no additional options', () => {
    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(<Icon type='foo' />);
      span = TestUtils.findRenderedDOMComponentWithTag(instance, 'span');
    });

    it('renders with a class of icon-settings', () => {
      expect(span.className).toEqual('icon-foo');
    });
  });

  describe('with custom class name', () => {
    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(<Icon type='foo' className='custom' />);
      span = TestUtils.findRenderedDOMComponentWithTag(instance, 'span');
    });

    it('renders with a class of icon-settings and test', () => {
      expect(span.className).toEqual('custom icon-foo');
    });
  });
});
