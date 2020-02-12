import React from 'react';
import TestRenderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import Tooltip from '../tooltip';
import { rootTagTest } from '../../utils/helpers/tags/tags-specs/tags-specs';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import 'jest-styled-components';
import Icon from './icon.component';
import StyledIcon from './icon.style';
import classicTheme from '../../style/themes/classic';
import OptionsHelper from '../../utils/helpers/options-helper';
import classicConfig from './icon-classic-config';
import dlsConfig from './icon-config';
import baseTheme from '../../style/themes/base';
import browserTypeCheck, { isSafari } from '../../utils/helpers/browser-type-check';

jest.mock('../../utils/helpers/browser-type-check');

function render(props) {
  return shallow(<Icon type='add' { ...props } />);
}

function renderStyles(props) {
  return TestRenderer.create(<StyledIcon type='add' { ...props } />);
}

describe('Icon component', () => {
  const mismatchedPairs = [
    { prop: 'help', rendersAs: 'question' },
    { prop: 'maintenance', rendersAs: 'settings' },
    { prop: 'new', rendersAs: 'gift' },
    { prop: 'success', rendersAs: 'tick' },
    { prop: 'messages', rendersAs: 'message' }
  ];

  describe.each(mismatchedPairs)(
    'mismatched pairs of props and icons retrieved',
    (mismatchedPair) => {
      it(`renders ${mismatchedPair.prop} as ${mismatchedPair.rendersAs}`, () => {
        const wrapper = render({ type: mismatchedPair.prop });
        const elemExists = wrapper.find(`[data-element="${mismatchedPair.rendersAs}"]`).exists();
        expect(elemExists).toEqual(true);
      });
    }
  );

  describe.each(OptionsHelper.colors)(
    'when in classic theme',
    (bgTheme) => {
      it(`applies proper background color for ${bgTheme}`, () => {
        const wrapper = renderStyles({ theme: classicTheme, bgTheme });
        assertStyleMatch(
          {
            backgroundColor: classicConfig.backgroundColor[bgTheme]
          },
          wrapper.toJSON()
        );

        assertStyleMatch(
          {
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 'normal',
            lineHeight: '16px',
            verticalAlign: 'middle'
          },
          wrapper.toJSON(),
          { modifier: '&::before' }
        );
      });
    }
  );

  describe('when the icon type is services', () => {
    beforeEach(() => {
      browserTypeCheck.mockImplementation(() => true);
      isSafari.mockImplementation(() => true);
    });

    it('it applies additional margin-top styling when the fontSize is "small"', () => {
      const wrapper = renderStyles({
        type: 'services', theme: classicTheme, fontSize: 'small'
      });
      assertStyleMatch(
        {
          marginTop: '-7px'
        },
        wrapper.toJSON(),
        { modifier: '&::before' }
      );
    });

    it('it applies additional margin-top styling when the fontSize is "large"', () => {
      const wrapper = renderStyles({
        type: 'services', theme: classicTheme, fontSize: 'large'
      });
      assertStyleMatch(
        {
          marginTop: '-7px'
        },
        wrapper.toJSON(),
        { modifier: '&::before' }
      );
    });

    it('it applies additional margin-top styling when the browser is safari and fontSize is "small"', () => {
      browserTypeCheck.mockImplementation(() => false);
      const wrapper = renderStyles({
        type: 'services', theme: classicTheme, fontSize: 'small'
      });
      assertStyleMatch(
        {
          marginTop: '-4px'
        },
        wrapper.toJSON(),
        { modifier: '&::before' }
      );
    });

    it('it applies additional margin-top styling when the browser is safari and the fontSize is "large"', () => {
      browserTypeCheck.mockImplementation(() => false);
      const wrapper = renderStyles({
        type: 'services', theme: baseTheme, fontSize: 'large'
      });
      assertStyleMatch(
        {
          marginTop: '-6px'
        },
        wrapper.toJSON(),
        { modifier: '&::before' }
      );
    });
  });

  describe('with custom class name', () => {
    it('renders with a custom classname', () => {
      const wrapper = render({ className: 'testClass' });
      expect(wrapper.find('.testClass').length).toEqual(1);
    });
  });


  describe('icon color', () => {
    it('renders proper icon color for disabled state', () => {
      const wrapper = renderStyles({ disabled: true, bgTheme: 'business' });
      assertStyleMatch(
        {
          color: baseTheme.icon.disabled
        },
        wrapper.toJSON()
      );
    });

    describe.each(['error', 'info', 'business'])(
      'whent the background theme is %s',
      (whiteIconBackground) => {
        it('renders a white icon', () => {
          const wrapper = renderStyles({ bgTheme: whiteIconBackground });
          assertStyleMatch(
            {
              color: baseTheme.colors.white
            },
            wrapper.toJSON()
          );
        });
      }
    );

    describe.each(['success', 'warning'])(
      'when the background theme is %s',
      (darkIconBackground) => {
        it('renders a dark icon', () => {
          const wrapper = renderStyles({ bgTheme: darkIconBackground });
          assertStyleMatch(
            {
              color: baseTheme.icon.default
            },
            wrapper.toJSON()
          );

          assertStyleMatch(
            {
              color: baseTheme.icon.defaultHover
            },
            wrapper.toJSON(),
            { modifier: ':hover' }
          );
        });
      }
    );

    describe('when bgTheme is set to none', () => {
      it('renders white icon when iconColor is set to onDarkBackground', () => {
        const wrapper = renderStyles({ iconColor: 'on-dark-background', bgTheme: 'none' });
        assertStyleMatch(
          {
            color: baseTheme.colors.white
          },
          wrapper.toJSON()
        );
      });

      it('renders dark icon when iconColor is set to onLightBackground', () => {
        const wrapper = renderStyles({ iconColor: 'on-light-background', bgTheme: 'none' });
        assertStyleMatch(
          {
            color: baseTheme.icon.onLightBackground
          },
          wrapper.toJSON()
        );

        assertStyleMatch(
          {
            color: baseTheme.icon.onLightBackgroundHover
          },
          wrapper.toJSON(),
          { modifier: ':hover' }
        );
      });

      describe('fontSize is "large" and bgSize is "small"', () => {
        it('sets the height and width style properties of bgSize to same as "large"', () => {
          const wrapper = renderStyles({ fontSize: 'large', bgTheme: 'foo', bgSize: 'small' });
          assertStyleMatch(
            {
              height: '40px',
              width: '40px'
            },
            wrapper.toJSON()
          );
        });
      });

      it('renders dark icon when iconColor is set to business-color', () => {
        const wrapper = renderStyles({ iconColor: 'business-color', bgTheme: 'none' });
        assertStyleMatch(
          {
            color: baseTheme.colors.primary
          },
          wrapper.toJSON()
        );

        assertStyleMatch(
          {
            color: '#1E861E'
          },
          wrapper.toJSON(),
          { modifier: ':hover' }
        );
      });
    });
  });

  describe('background color', () => {
    describe('when disabled', () => {
      it('renders backgroundColor in a proper color', () => {
        const wrapper = renderStyles({ disabled: true });
        assertStyleMatch(
          {
            backgroundColor: baseTheme.icon.disabled
          },
          wrapper.toJSON()
        );
      });
    });

    describe('when bgTheme is set to none', () => {
      it('renders transparent background', () => {
        const wrapper = renderStyles({ bgTheme: 'none' });
        assertStyleMatch(
          {
            backgroundColor: 'transparent'
          },
          wrapper.toJSON()
        );
      });
    });

    describe.each(['info', 'error', 'success', 'warning'])(
      'when bgTheme is set to one of the statuses',
      (status) => {
        const wrapper = renderStyles({ bgTheme: status });
        const hoverColors = {
          info: '#005C9B',
          error: '#9F2C3F',
          success: '#008C00',
          warning: '#BA5000'
        };
        it(`renders proper background color for ${status}`, () => {
          assertStyleMatch(
            {
              backgroundColor: baseTheme.colors[status]
            },
            wrapper.toJSON()
          );

          assertStyleMatch(
            {
              backgroundColor: hoverColors[status]
            },
            wrapper.toJSON(),
            { modifier: ':hover' }
          );
        });
      }
    );

    describe('when bgTheme is set to business', () => {
      const wrapper = renderStyles({ bgTheme: 'business' });

      it('renders proper background color', () => {
        assertStyleMatch(
          {
            backgroundColor: baseTheme.colors.primary
          },
          wrapper.toJSON()
        );

        assertStyleMatch(
          {
            backgroundColor: '#1E861E'
          },
          wrapper.toJSON(),
          { modifier: ':hover' }
        );
      });
    });
  });

  describe('background size', () => {
    describe('without shape or color', () => {
      it('renders with default size', () => {
        const wrapper = render({ type: 'basket' });
        const icon = wrapper.find(StyledIcon);
        expect(icon.props().bgSize).toEqual('small');
      });
    });

    describe.each(OptionsHelper.sizesRestricted)(
      'with bgSize prop provided',
      (size) => {
        it(`renders in the proper size for ${size}`, () => {
          const wrapper = renderStyles({ theme: classicTheme, bgSize: size });
          assertStyleMatch(
            {
              width: dlsConfig.backgroundSize[size],
              height: dlsConfig.backgroundSize[size]
            },
            wrapper.toJSON()
          );
        });
      }
    );
  });

  describe.each(OptionsHelper.shapes)(
    'background shape',
    (shape) => {
      it(`renders in the proper size for ${shape}`, () => {
        const wrapper = renderStyles({ theme: classicTheme, bgShape: shape });
        assertStyleMatch(
          {
            borderRadius: dlsConfig.backgroundShape[shape]
          },
          wrapper.toJSON()
        );
      });
    }
  );

  describe('when passed a tooltipMessage', () => {
    it('renders a tooltip', () => {
      const wrapper = mount(<Icon type='info' tooltipMessage='Helpful content' />);
      wrapper.setState({ isVisible: true });
      const tooltip = wrapper.find(Tooltip);
      expect(tooltip.length).toEqual(1);
    });
  });

  describe('tags', () => {
    describe('on component', () => {
      const wrapper = shallow(<Icon type='tick' data-role='baz' />);
      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper.find(StyledIcon), 'icon', 'tick', 'baz');
      });
    });
    describe('on internal elements', () => {
      const wrapper = mount(<Icon
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
