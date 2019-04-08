import React from 'react';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import { shallow, mount } from 'enzyme';
import { InputPresentation, Input } from '.';
import baseTheme from '../../../style/themes/base';
import sizes from './input-sizes.style';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import OptionsHelper from '../../../utils/helpers/options-helper';
import classicTheme from '../../../style/themes/classic';

const mountRender = (props) => {
  return mount(<InputPresentation { ...props }><Input /></InputPresentation>);
};

describe('InputPresentation', () => {
  const shallowRender = (props, renderer = shallow) => {
    return renderer(
      <InputPresentation { ...props }>
        sample children
      </InputPresentation>
    );
  };

  it('renders presentational div and context provider for its children', () => {
    expect(shallowRender({}, TestRenderer.create)).toMatchSnapshot();
  });

  describe('style', () => {
    describe('sizes', () => {
      OptionsHelper.sizesRestricted.forEach((size) => {
        it(`has the right style for ${size}-sized inputs`, () => {
          assertStyleMatch({
            minHeight: sizes[size].height,
            paddingLeft: sizes[size].padding,
            paddingRight: sizes[size].padding
          }, mountRender({ size }));
        });
      });
    });

    describe('validations', () => {
      ['infoMessage', 'warningMessage', 'errorMessage'].forEach((message) => {
        const validation = message.replace('Message', '');
        it(`has the right style for ${validation} validations`, () => {
          const boxShadow = `inset 1px 1px 0 ${baseTheme.colors[validation]}, `
          + `inset -1px -1px 0 ${baseTheme.colors[validation]}`;
          assertStyleMatch({
            borderColor: `${baseTheme.colors[validation]} !important`,
            boxShadow
          }, mountRender({ [message]: 'validation!' }));
        });
      });
    });

    describe('disabled', () => {
      it('has the correct style rules', () => {
        assertStyleMatch({
          background: baseTheme.disabled.input,
          borderColor: baseTheme.disabled.border,
          cursor: 'not-allowed'
        }, mountRender({ disabled: true }));
      });
    });

    describe('readOnly', () => {
      it('has the correct style rules', () => {
        assertStyleMatch({
          background: 'transparent !important',
          borderColor: 'transparent !important'
        }, mountRender({ readOnly: true }));
      });
    });

    describe('hasFocus', () => {
      it('has the correct style rules', () => {
        assertStyleMatch({
          border: '1px solid #668491'
        }, mountRender({ readOnly: true }));
      });
    });
  });

  describe('InputPresentationContext', () => {
    let wrapper, context;

    // helper function to retrieve latest context, enzyme does not currently
    // support easily fetching this
    const getContext = renderedWrapper => (
      renderedWrapper.update().find('[role="presentation"]')
        .childAt(0).props().value
    );

    beforeAll(() => {
      wrapper = shallowRender();
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
      expect(shallowRender({ theme: classicTheme }, TestRenderer.create)).toMatchSnapshot();
    });

    it('applies custom border and outline on focus', () => {
      assertStyleMatch({
        outline: 'none',
        border: '1px solid #255BC7'
      }, mountRender({ theme: classicTheme, hasFocus: true }), {
        modifier: '&&'
      });
    });

    it('applies custom background and border color on disabled', () => {
      assertStyleMatch({
        background: '#d9e0e4',
        borderColor: '#d9e0e4 !important'
      }, mountRender({ theme: classicTheme, disabled: true }));
    });
  });
});
