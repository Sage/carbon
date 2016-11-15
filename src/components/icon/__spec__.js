import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Icon from './icon';
import Tooltip from 'components/tooltip'

describe('Icon', () => {
  let instance, span, svg;

  let icons = [
    'basket',
    'bin',
    'business',
    'csv',
    'chevron',
    'completed',
    'draft',
    'dribbble',
    'edit',
    'email',
    'external-link',
    'github',
    'individual',
    'key',
    'location',
    'message',
    'minus',
    'mobile',
    'pdf',
    'paperclip',
    'payment',
    'phone',
    'plus',
    'print',
    'processing',
    'progress',
    'refresh',
    'remove',
    'sort-down',
    'sort-up',
    'submitted',
    'sync',
    'twitter',
    'white-tick'
  ]

  describe('renderIcon', () => {
    icons.forEach((icon) => {
      it(`calls the render ${icon} icon method`, () => {
        instance = TestUtils.renderIntoDocument(<Icon type={ icon } />);
        instance.renderIcon;
        span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[1];
        svg = span.children[0];
        expect(svg.getAttribute('class')).toEqual(`carbon-icon__svg carbon-icon__svg--${icon}`);
      });
    });
  });

  describe("mis matched pairs of props and icons retrieved", () => {
    let mismatchedPairs = [ { prop: 'help',        rendersAs: 'question' },
                            { prop: 'maintenance', rendersAs: 'settings' },
                            { prop: 'new',         rendersAs: 'gift' },
                            { prop: 'success',     rendersAs: 'tick' } ];

    mismatchedPairs.forEach((mismatchedPair) => {
      it(`renders ${mismatchedPair.prop} as ${mismatchedPair.rendersAs}`, () => {
        instance = TestUtils.renderIntoDocument(<Icon type={ mismatchedPair.prop } />);
        span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[0];
        expect(span.className).toEqual(`carbon-icon icon-${mismatchedPair.rendersAs}`);
      });
    });
  });

  describe('with no additional options', () => {
    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(<Icon type='foo' />);
      span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[0];
    });

    it('renders with a class of icon-settings', () => {
      expect(span.className).toEqual('carbon-icon icon-foo');
    });
  });

  describe ('mainClasses', () => {
    describe('with custom class name', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(<Icon type='foo' className='custom' />);
        span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[0];
      });

      it('renders with a class of icon-settings and test', () => {
        expect(span.className).toEqual('carbon-icon custom icon-foo');
      });
    });
  });

  describe('when passed a tooltipMessage', () => {
    it('renders a tooltip', () => {
      let helpInstance = TestUtils.renderIntoDocument(<Icon type='info' tooltipMessage='Helpful content' />);
      let tooltip = TestUtils.findRenderedComponentWithType(helpInstance, Tooltip);
      expect(tooltip).toBeDefined();
    });
  });
});
