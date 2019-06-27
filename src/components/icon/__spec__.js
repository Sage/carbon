import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { mount, shallow } from 'enzyme';
import Tooltip from '../../components/tooltip';
import Icon from './icon';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';

describe('Icon', () => {
  let instance, span, svg;

  let icons = [
    'basket',
    'bin',
    'chevron',
    'completed',
    'dribbble',
    'email',
    'external-link',
    'github',
    'individual',
    'location',
    'minus',
    'paperclip',
    'payment',
    'plus',
    'processing',
    'progress',
    'remove',
    'sort-down',
    'sort-up',
    'submitted',
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

  describe('mainClasses', () => {
    describe('with custom class name', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(<Icon type='foo' className='custom' />);
        span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[0];
      });

      it('renders with a class of icon-settings and test', () => {
        expect(span.className).toEqual('carbon-icon custom icon-foo');
      });
    });

    describe('bgSize', () => {
      describe('without shape or color', () => {
        it('renders with no size class', () => {
          let size = 'medium';

          instance = TestUtils.renderIntoDocument(<Icon type='foo' bgSize={ size } />);
          span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[0];
          expect(span.className).not.toContain(`carbon-icon--${size}`);
        });
      });

      describe('with shape', () => {
        it('renders background span with size class', () => {
          let size = 'medium';

          instance = TestUtils.renderIntoDocument(<Icon type='foo' bgSize={ size } bgShape='circle' />);
          span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[0];
          expect(span.className).toContain(`carbon-icon--${size}`);
        });
      });

      describe('with color', () => {
        it('renders background span with size class', () => {
          let size = 'medium';

          instance = TestUtils.renderIntoDocument(<Icon type='foo' bgSize={ size } bgTheme='error' />);
          span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[0];
          expect(span.className).toContain(`carbon-icon--${size}`);
        });
      });
    });

    describe('bgShape', () => {
      it('renders with shape classes', () => {
        let shape = 'circle';

        instance = TestUtils.renderIntoDocument(<Icon type='foo' bgShape={ shape } />);
        span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[0];
        expect(span.className).toContain('carbon-icon--shape');
        expect(span.className).toContain(`carbon-icon--${shape}`);
      });
    });

    describe('bgTheme', () => {
      it('renders background span with color classes', () => {
        let color = 'success';

        instance = TestUtils.renderIntoDocument(<Icon type='foo' bgTheme={ color } />);
        span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[0];
        expect(span.className).toContain('carbon-icon--shape');
        expect(span.className).toContain(`carbon-icon--${color}`);
      });
    });
  });

  describe('when passed a tooltipMessage', () => {
    it('renders a tooltip', () => {
      const wrapper = mount(<Icon type='info' tooltipMessage='Helpful content'/>);
      wrapper.setState({ isVisible: true });
      const tooltip = wrapper.find(Tooltip);
      expect(tooltip.length).toEqual(1);
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      let wrapper = mount(<Icon data-role='baz' type='tick'/>);
      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper.find('.carbon-icon'), 'icon', 'tick', 'baz');
      });
    });

    describe("on internal elements", () => {
      let wrapper = mount(
        <Icon
          tooltipMessage='Test'
          tooltipAlign='left'
          tooltipPosition='top'
          type='tick'
        />);
      wrapper.setState({ isVisible: true });

      const tooltip = wrapper.find(Tooltip);
      expect(tooltip.props().align).toEqual('left');
      expect(tooltip.props().position).toEqual('top');
      expect(tooltip.props().children).toEqual('Test');
    });
  });
});

