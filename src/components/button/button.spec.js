import React from 'react';
import 'jest-styled-components';
import { mount, shallow } from 'enzyme';
import Icon from 'components/icon';
import Link from 'components/link';
import TestRenderer from 'react-test-renderer';
import Button from '.';
import StyledButton from './button.style';
import BaseTheme from '../../style/themes/base';
import classicTheme from '../../style/themes/classic';

import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import { rootTagTest } from '../../utils/helpers/tags/tags-specs';

const render = (props, renderer = shallow) => {
  return renderer(
    <Button { ...props } />
  );
};

const variants = ['primary', 'secondary', 'tertiary', 'destructive', 'darkBackground'];
const sizes = { small: [32, 16], medium: [40, 24], large: [48, 32] };

describe('Button', () => {
  describe('when no props other than children are passed into the component', () => {
    it('renders the default props and children to match the snapshot', () => {
      const wrapper = render({ children: 'foo' });
      expect(wrapper.props().renderAs).toEqual('secondary');
      expect(wrapper.props().size).toEqual('medium');
      expect(wrapper.props().disabled).toEqual(false);
      expect(wrapper.props().iconPosition).toEqual('');
      expect(!wrapper.contains(<Icon type='filter' />)).toBeTruthy();
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when only the icon position and type props and children are passed into the component', () => {
    it('renders the default props and children to match the snapshot with the Icon before children', () => {
      const wrapper = render({ children: 'foo', iconType: 'filter', iconPosition: 'before' }, TestRenderer.create);
      expect(wrapper).toMatchSnapshot();
    });

    it('renders the default props and children to match the snapshot with the Icon after children', () => {
      const wrapper = render({ children: 'foo', iconType: 'filter', iconPosition: 'after' }, TestRenderer.create);
      expect(wrapper).toMatchSnapshot();
    });

    ['before', 'after'].forEach((position) => {
      it(`contains an Icon if "${position}" is passed as the "iconPosition" prop`, () => {
        expect(
          render({
            children: 'foo',
            iconType: 'filter',
            iconPosition: 'after'
          }).contains(
            <Icon type='filter' />
          )
        ).toBeTruthy();
      });
    });
  });

  describe('when a subtext prop is passed into the component', () => {
    it('does not render the subtext if the size prop is not "large"', () => {
      const wrapper = render({ children: 'foo', subtext: 'foo' });
      expect(wrapper.props().renderAs).toEqual('secondary');
      expect(wrapper.props().size).toEqual('medium');
      expect(wrapper.props().disabled).toEqual(false);
      expect(wrapper).toMatchSnapshot();
    });

    it('renders the subtext if the size prop is "large"', () => {
      const wrapper = render({ children: 'foo', size: 'large', subtext: 'foo' });
      expect(wrapper.props().renderAs).toEqual('secondary');
      expect(wrapper.props().size).toEqual('large');
      expect(wrapper.props().disabled).toEqual(false);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when the no props are passed except children', () => {
    it('sets the default variants to "secondary" and "medium"', () => {
      const wrapper = render({ children: 'foo' }, TestRenderer.create).toJSON();
      assertStyleMatch({
        background: 'transparent',
        borderColor: BaseTheme.colors.primary,
        color: BaseTheme.colors.primary,
        fontSize: '14px',
        height: '40px',
        paddingLeft: '24px',
        paddingRight: '24px'
      }, wrapper);
    });
  });

  describe('when setting the "as" prop', () => {
    variants.forEach((variant) => {
      it(`matches the style for a ${variant} Button`, () => {
        const wrapper = render({
          children: 'foo', disabled: true, renderAs: variant
        }, TestRenderer.create).toJSON();

        assertStyleMatch({
          background:
          (variant === 'secondary' || variant === 'tertiary' ? 'transparent' : BaseTheme.disabled.border),
          borderColor: (variant === 'secondary' ? BaseTheme.disabled.border : 'transparent'),
          color: BaseTheme.disabled.text
        }, wrapper);
      });
    });
  });

  describe('when the "disabled" prop is passed', () => {
    it('matches the style for the default Button when no "as" and "size" props are passed', () => {
      const wrapper = render({ children: 'foo', disabled: true }, TestRenderer.create).toJSON();
      assertStyleMatch({
        background: 'transparent',
        borderColor: BaseTheme.disabled.border,
        color: BaseTheme.disabled.text,
        fontSize: '14px',
        height: `${sizes.medium[0].toString()}px`,
        paddingLeft: `${sizes.medium[1].toString()}px`,
        paddingRight: `${sizes.medium[1].toString()}px`
      }, wrapper);
    });

    Object.keys(sizes).forEach((size) => {
      variants.forEach((variant) => {
        it(`matches the style for a ${size} ${variant} Button`, () => {
          const wrapper = render({
            children: 'foo', disabled: true, renderAs: variant, size
          }, TestRenderer.create).toJSON();

          assertStyleMatch({
            background:
            (variant === 'secondary' || variant === 'tertiary' ? 'transparent' : BaseTheme.disabled.border),
            borderColor: (variant === 'secondary' ? BaseTheme.disabled.border : 'transparent'),
            color: BaseTheme.disabled.text,
            fontSize: (size === 'large' ? '16px' : '14px'),
            height: `${sizes[size][0].toString()}px`,
            paddingLeft: `${sizes[size][1].toString()}px`,
            paddingRight: `${sizes[size][1].toString()}px`
          }, wrapper);
        });
      });
    });
  });

  describe('when the classic theme is applied', () => {
    ['blue', 'grey', 'magenta', 'magenta-dull', 'red', 'white'].forEach((variant) => {
      const wrapper = TestRenderer.create(
        <StyledButton theme={ classicTheme } variant={ variant }>Foo</StyledButton>
      );

      it(`matches the snapshot for the ${variant} Button when default props are passed`, () => {
        expect(wrapper).toMatchSnapshot();
      });
    });

    it('matches the expected style default "blue" Button default props are passed', () => {
      const wrapper = TestRenderer.create(<StyledButton theme={ classicTheme }>foo</StyledButton>);
      assertStyleMatch({
        background: 'transparent',
        border: '1px solid #255bc7',
        color: '#255bc7'
      }, wrapper.toJSON());
    });

    it('matches the expected style default "blue" Button default props are passed', () => {
      const wrapper = TestRenderer.create(<StyledButton disabled theme={ classicTheme }>foo</StyledButton>);
      assertStyleMatch({
        background: '#e6ebed'
      }, wrapper.toJSON());
    });
  });

  let defaultButton, primary, secondary, small, large, disabled, anchor, to;

  beforeEach(() => {
    defaultButton = render({ children: 'Save' });

    primary = render({
      name: 'Primary Button',
      as: 'primary',
      onClick: jest.fn(),
      children: 'Primary'
    });

    secondary = render({
      name: 'Secondary Button',
      className: 'customClass',
      theme: 'red',
      children: 'Secondary'
    });

    small = render({
      name: 'Small Button',
      size: 'small',
      children: 'Small'
    });

    large = render({
      name: 'Large Button',
      size: 'large',
      children: 'Large'
    });

    disabled = render({
      name: 'Disabled Button',
      disabled: true,
      children: 'Disabled'
    });

    anchor = render({
      href: '/foo',
      children: 'Anchor'
    }, mount);

    to = render({
      to: '/foo',
      children: 'To'
    }, mount);
  });

  describe('A basic button', () => {
    it('renders a button with defaults', () => {
      expect(defaultButton.props().renderAs).toEqual('secondary');
      expect(defaultButton.containsMatchingElement(
        <span>Save</span>
      )).toBeTruthy();
      expect(defaultButton.props().disabled).toEqual(false);
      expect(defaultButton.props().size).toEqual('medium');
      expect(defaultButton.props().variant).toEqual('blue');
    });
  });

  describe('A primary button', () => {
    it('renders a primary button', () => {
      expect(primary.props().name).toEqual('Primary Button');
      expect(primary.props().renderAs).toEqual('primary');
      expect(primary.containsMatchingElement(
        <span>Primary</span>
      )).toBeTruthy();
      expect(primary.props().disabled).toEqual(false);
    });
  });

  describe('A secondary button', () => {
    it('renders a secondary button', () => {
      expect(secondary.props().name).toEqual('Secondary Button');
      expect(secondary.props().renderAs).toEqual('secondary');
      expect(secondary.containsMatchingElement(
        <span>Secondary</span>
      )).toBeTruthy();
      expect(secondary.props().disabled).toEqual(false);
    });
  });

  describe('A small button', () => {
    it('renders a small button', () => {
      expect(small.props().name).toEqual('Small Button');
      expect(small.props().size).toEqual('small');
      expect(small.containsMatchingElement(
        <span>Small</span>
      )).toBeTruthy();
      expect(small.props().disabled).toEqual(false);
    });
  });

  describe('A large button', () => {
    it('renders a large button', () => {
      expect(large.props().name).toEqual('Large Button');
      expect(large.props().size).toEqual('large');
      expect(large.containsMatchingElement(
        <span>Large</span>
      )).toBeTruthy();
      expect(large.props().disabled).toEqual(false);
    });
  });

  describe('A disabled button', () => {
    it('renders a disabled button', () => {
      expect(disabled.props().name).toEqual('Disabled Button');
      expect(disabled.props().renderAs).toEqual('secondary');
      expect(disabled.containsMatchingElement(
        <span>Disabled</span>
      )).toBeTruthy();
      expect(disabled.props().disabled).toEqual(true);
    });
  });

  describe('Passing a custom onClick', () => {
    it('triggers when the button is clicked', () => {
      const wrapper = render({
        children: 'foo',
        onClick: jest.fn()
      });

      wrapper.simulate('click');
      expect(wrapper.props().onClick).toHaveBeenCalled();
    });
  });

  describe('render', () => {
    describe('default', () => {
      it('renders a button', () => {
        const wrapper = render({ children: 'foo ' }, mount);
        expect(wrapper.type()).toEqual(Button);
      });
    });

    describe('with href', () => {
      it('renders an anchor', () => {
        expect(anchor.exists('_Link')).toEqual(true);
        expect(anchor.find('_Link').length).toEqual(1);
        expect(anchor.find('_Link').type()).toEqual(Link);
      });
    });

    describe('with to', () => {
      it('renders an anchor', () => {
        expect(to.exists('_Link')).toEqual(true);
        expect(to.find('_Link').length).toEqual(1);
        expect(to.find('_Link').type()).toEqual(Link);
      });
    });
  });

  describe('subtext prop', () => {
    describe('rendered correctly', () => {
      let wrapper;
      beforeEach(() => {
        wrapper = render({ size: 'large', subtext: 'Test', children: 'A Button' });
      });
      it('adds a modify class and outputs in the correct child element', () => {
        const subtextElement = wrapper.find('[data-element="subtext"]');
        expect(subtextElement.length).toEqual(1);
        expect(subtextElement.text()).toEqual('Test');
      });
    });

    describe('invalid states', () => {
      const sizesForInvalid = [
        'small',
        'medium'
      ];

      sizesForInvalid.forEach((size) => {
        it(`throws an error if it is used on a ${size} button`, () => {
          const subtext = () => { Button.propTypes.subtext({ subtext: 'test', size }); };
          expect(subtext).toThrowError('subtext prop has no effect unless the button is large');
        });
      });
    });
  });

  describe('tags on component', () => {
    const wrapper = shallow(<Button data-element='bar' data-role='baz'>Test</Button>);

    it('includes correct component, element and role data tags', () => {
      rootTagTest(wrapper, 'button', 'bar', 'baz');
    });
  });
});
