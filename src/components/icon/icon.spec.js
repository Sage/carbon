import React from 'react';
// import TestRenderer from 'react-test-renderer';
import TestUtils from 'react-dom/test-utils';
import { mount, shallow } from 'enzyme';
import Tooltip from '../tooltip';
// import { rootTagTest } from '../../utils/helpers/tags/tags-specs/tags-specs';
// import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import 'jest-styled-components';
import Icon from './icon.component';
import { StyledIcon } from './icon.style';

function render(props) {
  return shallow(<Icon { ...props } />);
}

// function renderStyles(props) {
//   return TestRenderer.create(<StyledIcon { ...props } />);
// }

describe('Icon', () => {
  let instance, span, svg, wrapper;

  const icons = [
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
  ];

  describe('renderIcon', () => {
    icons.forEach((icon) => {
      it(`calls the render ${icon} icon method`, () => {
        instance = TestUtils.renderIntoDocument(<Icon type={ icon } />);
        // eslint-disable-next-line no-unused-expressions
        instance.renderIcon;
        span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[1];
        svg = span.children[0];
        expect(svg.getAttribute('class')).toEqual(`carbon-icon__svg--${icon}`);
      });
    });
  });

  describe('mismatched pairs of props and icons retrieved', () => {
    const mismatchedPairs = [
      { prop: 'help', rendersAs: 'question' },
      { prop: 'maintenance', rendersAs: 'settings' },
      { prop: 'new', rendersAs: 'gift' },
      { prop: 'success', rendersAs: 'tick' }
    ];

    mismatchedPairs.forEach((mismatchedPair) => {
      it(`renders ${mismatchedPair.prop} as ${mismatchedPair.rendersAs}`, () => {
        wrapper = render({ type: mismatchedPair.prop });
        expect(wrapper.find(`[data-element="${mismatchedPair.rendersAs}"]`)).toBeTruthy();
      });
    });
  });

  describe('mainClasses', () => {
    describe('with custom class name', () => {
      it('renders with a custom classname', () => {
        wrapper = render({ className: 'testClass' });
        expect(wrapper.find('.testClass').length).toEqual(1);
      });
    });

    describe('bgSize', () => {
      describe('without shape or color', () => {
        it('renders with default size', () => {
          wrapper = render({ type: 'basket' });
          const icon = wrapper.find(StyledIcon);
          expect(icon.props().bgSize).toEqual('small');
        });
      });

      // describe('with bgSize prop provided', () => {
      //   it('renders with the proper bgSize', () => {
      //     wrapper = render({ type: 'basket', bgSize: 'large' });
      //     const icon = wrapper.find(StyledIcon);
      //     expect(icon.props().bgSize).toEqual('large');
      //   });
      // });
    });

    // describe('has Shape', () => {
    //   describe('when only bgTheme is provided', () => {
    //     it('applies common styles and default size values', () => {
    //       wrapper = renderStyles({ type: 'tick', bgTheme: 'error' });
    //       assertStyleMatch({ height: '24px' }, wrapper.toJSON());
    //     });
    //   });
    // });

    // describe('bgShape', () => {
    //   it('renders in a proper shape', () => {
    //     wrapper = render({ type: 'basket', bgShape: 'circle' });
    //     const icon = wrapper.find(StyledIcon);
    //     expect(icon.props().bgSize).toEqual('large');
    //   });
    // });

    // describe('bgTheme', () => {
    //   it('renders background span with color classes', () => {
    //     const color = 'success';

    //     instance = TestUtils.renderIntoDocument(<Icon type='foo' bgTheme={ color } />);
    //     span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[0];
    //     expect(span.className).toContain('carbon-icon--shape');
    //     expect(span.className).toContain(`carbon-icon--${color}`);
    //   });
    // });
  });

  describe('when passed a tooltipMessage', () => {
    it('renders a tooltip', () => {
      wrapper = mount(<Icon type='info' tooltipMessage='Helpful content' />);
      wrapper.setState({ isVisible: true });
      const tooltip = wrapper.find(Tooltip);
      expect(tooltip.length).toEqual(1);
    });
  });

  describe('tags', () => {
    // describe('on component', () => {
    //   wrapper = shallow(<Icon type='tick' data-role='baz' />);
    //   it('include correct component, element and role data tags', () => {
    //     rootTagTest(wrapper.find(StyledIcon), 'icon', 'tick', 'baz');
    //   });
    // });
    describe('on internal elements', () => {
      wrapper = mount(<Icon
        tooltipMessage='Test' tooltipAlign='left'
        tooltipPosition='top' type='tick'
      />);
      wrapper.setState({ isVisible: true });
      const tooltip = wrapper.find(Tooltip);
      expect(tooltip.props().align).toEqual('left');
      expect(tooltip.props().position).toEqual('top');
      expect(tooltip.props().children).toEqual('Test');
    });
  });
});
