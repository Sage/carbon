import React from 'react';
import TestRenderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import Icon from 'components/icon';
import Button from '.';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import BaseTheme from '../../../style/themes/base';

function render(props, renderer = shallow) {
  return renderer(
    <Button { ...props } />
  );
}

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

    ['before', 'after'].forEach((pos) => {
      it(`contains an Icon if "${pos}" is passed as the "iconPosition" prop`, () => {
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
      it(`has style matching the config for a ${variant} Button`, () => {
        const wrapper = render({
          children: 'foo', disabled: true, renderAs: variant
        }, TestRenderer.create).toJSON();

        assertStyleMatch({
          background:
          (variant === 'secondary' || variant === 'tertiary' ? 'transparent' : BaseTheme.colors.disabled.background),
          borderColor: (variant === 'secondary' ? BaseTheme.colors.disabled.background : 'transparent'),
          color: BaseTheme.colors.disabled.text
        }, wrapper);
      });
    });
  });

  describe('when the "disabled" prop is passed', () => {
    it('has style matching the default config when no "as" and "size" props are passed', () => {
      const wrapper = render({ children: 'foo', disabled: true }, TestRenderer.create).toJSON();
      assertStyleMatch({
        background: 'transparent',
        borderColor: BaseTheme.colors.disabled.background,
        color: BaseTheme.colors.disabled.text,
        fontSize: '14px',
        height: `${sizes.medium[0].toString()}px`,
        paddingLeft: `${sizes.medium[1].toString()}px`,
        paddingRight: `${sizes.medium[1].toString()}px`
      }, wrapper);
    });

    Object.keys(sizes).forEach((size) => {
      variants.forEach((variant) => {
        it(`has style matching the config for a ${size} ${variant} Button`, () => {
          const wrapper = render({
            children: 'foo', disabled: true, renderAs: variant, size
          }, TestRenderer.create).toJSON();

          assertStyleMatch({
            background:
            (variant === 'secondary' || variant === 'tertiary' ? 'transparent' : BaseTheme.colors.disabled.background),
            borderColor: (variant === 'secondary' ? BaseTheme.colors.disabled.background : 'transparent'),
            color: BaseTheme.colors.disabled.text,
            fontSize: (size === 'large' ? '16px' : '14px'),
            height: `${sizes[size][0].toString()}px`,
            paddingLeft: `${sizes[size][1].toString()}px`,
            paddingRight: `${sizes[size][1].toString()}px`
          }, wrapper);
        });
      });
    });
  });
});
