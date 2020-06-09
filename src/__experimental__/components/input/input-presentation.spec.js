import React from 'react';
import TestRenderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import 'jest-styled-components';
import { shallow, mount } from 'enzyme';
import { InputPresentation } from '.';
import InputPresentationStyle from './input-presentation.style';
import baseTheme from '../../../style/themes/base';
import sizes from './input-sizes.style';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import OptionsHelper from '../../../utils/helpers/options-helper';
import classicTheme from '../../../style/themes/classic';

describe('InputPresentation', () => {
  it('renders presentational div and context provider for its children', () => {
    expect(render({}, TestRenderer.create)).toMatchSnapshot();
  });

  describe('style', () => {
    describe('sizes', () => {
      OptionsHelper.sizesRestricted.forEach((size) => {
        it(`has the right style for ${size}-sized inputs`, () => {
          assertStyleMatch({
            minHeight: sizes[size].height,
            paddingLeft: sizes[size].horizontalPadding,
            paddingRight: sizes[size].horizontalPadding
          }, render({ size }));
        });
      });
    });

    describe('width', () => {
      it('renders correctly with a custom width', () => {
        assertStyleMatch({
          flex: '0 0 54%'
        }, render({ inputWidth: 54 }));
      });
    });

    describe.each([
      ['error'],
      ['warning'],
      ['info']
    ])('when %s prop is set to true', (validation) => {
      it('has the right style', () => {
        const boxShadow = `inset 1px 1px 0 ${baseTheme.colors[validation]},`
                        + `inset -1px -1px 0 ${baseTheme.colors[validation]}`;

        assertStyleMatch({
          borderColor: `${baseTheme.colors[validation]} !important`,
          boxShadow: validation === 'error' ? boxShadow : undefined
        }, render({ [validation]: true }));
      });
    });

    describe.each([
      ['error'],
      ['warning'],
      ['info']
    ])('when %s prop is a string', (validation) => {
      it('has the right style', () => {
        const boxShadow = `inset 1px 1px 0 ${baseTheme.colors[validation]},`
                        + `inset -1px -1px 0 ${baseTheme.colors[validation]}`;

        assertStyleMatch({
          borderColor: `${baseTheme.colors[validation]} !important`,
          boxShadow: validation === 'error' ? boxShadow : undefined
        }, render({ [validation]: 'Message' }));
      });
    });

    describe('when align prop is passed as "right"', () => {
      it('has the correct style rules', () => {
        assertStyleMatch({ flexDirection: 'row-reverse' }, render({ align: 'right' }));
      });
    });

    describe('disabled', () => {
      it('has the correct style rules', () => {
        assertStyleMatch({
          background: baseTheme.disabled.input,
          borderColor: baseTheme.disabled.border,
          cursor: 'not-allowed'
        }, render({ disabled: true }));
      });
    });

    describe('readOnly', () => {
      it('has the correct style rules', () => {
        assertStyleMatch({
          backgroundColor: baseTheme.readOnly.textboxBackground,
          borderColor: baseTheme.readOnly.textboxBorder,
          boxShadow: 'none'
        }, render({ readOnly: true }));
      });
    });

    describe('hasFocus', () => {
      it('has the correct style rules', () => {
        assertStyleMatch({
          border: '1px solid #668592'
        }, render({ readOnly: true }));
      });
    });
  });

  describe('InputPresentationContext', () => {
    let wrapper, context;

    // helper function to retrieve latest context, enzyme does not currently
    // support easily fetching this
    const getContext = renderedWrapper => (
      renderedWrapper.update().find(InputPresentationStyle)
        .childAt(0).props().value
    );

    beforeAll(() => {
      wrapper = render({}, shallow);
      context = getContext(wrapper);
    });

    it('provides hasFocus state defaulting to false', () => {
      expect(context.hasFocus).toEqual(false);
    });

    it('enables focus on focus', () => {
      expect(context.hasFocus).toEqual(false);
      context.onFocus();
      context = getContext(wrapper);
      expect(context.hasFocus).toEqual(true);
    });

    it('disables focus on blur', () => {
      expect(context.hasFocus).toEqual(true);
      context.onBlur();
      context = getContext(wrapper);
      expect(context.hasFocus).toEqual(false);
    });

    it('provides hasMouseOver state defaulting to false', () => {
      expect(context.hasMouseOver).toEqual(false);
    });

    it('enables hasMouseOver on mouse enter', () => {
      expect(context.hasMouseOver).toEqual(false);
      wrapper.find(InputPresentationStyle).simulate('mouseenter');
      context = getContext(wrapper);
      expect(context.hasMouseOver).toEqual(true);
    });

    it('disables hasMouseOver on mouse leave', () => {
      expect(context.hasMouseOver).toEqual(true);
      wrapper.find(InputPresentationStyle).simulate('mouseleave');
      context = getContext(wrapper);
      expect(context.hasMouseOver).toEqual(false);
    });

    it('assigns a given input to the component', () => {
      expect(wrapper.instance().input).toEqual({});
      context.inputRef({ current: 'my input!' });
      expect(wrapper.instance().input).toEqual({ current: 'my input!' });
    });

    describe('on mouse down of the wrapping div', () => {
      it('focuses on the input after a 0 timeout', () => {
        jest.useFakeTimers();
        const focus = jest.fn();
        context.inputRef({ current: { focus } });
        wrapper.simulate('mousedown');
        expect(focus).not.toHaveBeenCalled();
        jest.runAllTimers();
        expect(focus).toHaveBeenCalled();
      });
    });
  });

  describe('classic theme', () => {
    it('applies custom styling', () => {
      expect(renderWithTheme({}, classicTheme, TestRenderer.create)).toMatchSnapshot();
    });

    it('applies custom border and outline on focus', () => {
      assertStyleMatch({
        outline: 'none',
        border: '1px solid #255BC7'
      }, renderWithTheme({ hasFocus: true }, classicTheme), {
        modifier: '&&'
      });
    });

    it('applies custom background and border color on disabled', () => {
      assertStyleMatch({
        background: '#d9e0e4',
        borderColor: '#d9e0e4 !important'
      }, renderWithTheme({ disabled: true }, classicTheme));
    });
  });
});

function render(props, renderer = mount) {
  return renderer(<InputPresentation { ...props }>sample children</InputPresentation>);
}

function renderWithTheme(props, theme, renderer = mount) {
  return renderer(
    <ThemeProvider theme={ theme }>
      <InputPresentation { ...props }>sample children</InputPresentation>
    </ThemeProvider>
  );
}
