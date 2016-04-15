import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Icon from './icon';

describe('Icon', () => {
  let instance, span, svg;

  describe('renderIcon', () => {
    it('calls the render warning icon method', () => {
      instance = TestUtils.renderIntoDocument(<Icon type='warning' />);
      instance.renderIcon;
      span = TestUtils.findRenderedDOMComponentWithTag(instance, 'span');
      svg = span.children[0];
      expect(svg.getAttribute('class')).toEqual("ui-icon__svg ui-icon__svg--warning");
    });

    it('calls the render new icon method', () => {
      instance = TestUtils.renderIntoDocument(<Icon type='new' />);
      instance.renderIcon;
      span = TestUtils.findRenderedDOMComponentWithTag(instance, 'span');
      svg = span.children[0];
      expect(svg.getAttribute('class')).toEqual("ui-icon__svg ui-icon__svg--new");
    });

    it('calls the render maintenance icon method', () => {
      instance = TestUtils.renderIntoDocument(<Icon type='maintenance' />);
      instance.renderIcon;
      span = TestUtils.findRenderedDOMComponentWithTag(instance, 'span');
      svg = span.children[0];
      expect(svg.getAttribute('class')).toEqual("ui-icon__svg ui-icon__svg--maintenance");
    });

    it('calls the render sort down icon method', () => {
      instance = TestUtils.renderIntoDocument(<Icon type='sort-down' />);
      instance.renderIcon;
      span = TestUtils.findRenderedDOMComponentWithTag(instance, 'span');
      svg = span.children[0];
      expect(svg.getAttribute('class')).toEqual("ui-icon__svg ui-icon__svg--sort-down");
    });

    it('calls the render sort up icon method', () => {
      instance = TestUtils.renderIntoDocument(<Icon type='sort-up' />);
      instance.renderIcon;
      span = TestUtils.findRenderedDOMComponentWithTag(instance, 'span');
      svg = span.children[0];
      expect(svg.getAttribute('class')).toEqual("ui-icon__svg ui-icon__svg--sort-up");
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

  describe ('mainClasses', () => {
    describe('with custom class name', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(<Icon type='foo' className='custom' />);
        span = TestUtils.findRenderedDOMComponentWithTag(instance, 'span');
      });

      it('renders with a class of icon-settings and test', () => {
        expect(span.className).toEqual('custom icon-foo');
      });
    });

    describe('when decorated with a tooltip', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(<Icon type='foo' tooltipMessage='Hello' />);
        debugger
        span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[0];
      });

      it('adds a target-tooltip class', () => {
        expect(span.className).toMatch('icon-foo target-tooltip');
      });
    });
  });

});
