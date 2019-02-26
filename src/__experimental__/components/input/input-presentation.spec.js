import React from 'react';
import { shallow, mount } from 'enzyme';
import { InputPresentation, Input } from '.';
import baseTheme from '../../../style/themes/base';
import 'jest-styled-components';

const deletekeys = (obj, keys) => keys.forEach(k => delete obj[k]);
const stripKeys = (obj, keys) => {
  return Object.keys(obj).reduce((acc, key) => {
    const strippedObj = deletekeys(obj[key], keys);
    return { ...acc, [key]: { ...strippedObj } };
  }, {});
};

const isUpperCase = char => char.toUpperCase() === char;
const toCSSCase = (str) => {
  return str.split('').reduce((acc, char) => {
    const toAdd = isUpperCase(char) ? `-${char.toLowerCase()}` : char;
    return acc + toAdd;
  }, '');
};

const assertStyleMatch = (styleSpec, component) => {
  Object.entries(styleSpec).forEach(([attr, value]) => {
    expect(component).toHaveStyleRule(toCSSCase(attr), value);
  });
};

const mountRender = (props) => {
  return mount(<InputPresentation { ...props }><Input /></InputPresentation>);
};

describe('InputPresentation', () => {
  const shallowRender = props => shallow(<InputPresentation { ...props }>sample children</InputPresentation>);

  it('renders presentational div and context provider for its children', () => {
    expect(shallowRender()).toMatchSnapshot();
  });

  it('renders the focus class when component has focus', () => {
    const wrapper = shallowRender().setState({ hasFocus: true });
    expect(wrapper
      .find('.carbon-input-presentation')
      .hasClass('carbon-input-presentation--has-focus')).toBeTruthy();
  });

  describe('style', () => {
    const {
      input: inputStyleRules,
      colors: {
        error, warning, text
      }
    } = baseTheme;

    describe('sizes', () => {
      const { small, medium, large } = stripKeys(inputStyleRules.dimensions, ['width', 'fontSize']);
    
      it('has the right style for small-sized inputs', () => {
        assertStyleMatch(small, mountRender({ size: 'small' }));
      });
      it('has the right style for medium-sized inputs', () => {
        assertStyleMatch(medium, mountRender({ size: 'medium' }));
      });
      it('has the right style for large-sized inputs', () => {
        assertStyleMatch(large, mountRender({ size: 'large' }));
      });
    });

    describe('states', () => {
      describe('disabled', () => {
        it('has the correct style rules', () => {
          assertStyleMatch(
            {
              color: text.disabled,
              background: inputStyleRules.disabled,
              cursor: 'not-allowed'
            },
            mountRender({ disabled: true })
          );
        });
      });

      describe('active', () => {
        it('has the correct style rules', () => {
          const wrapper = mountRender({ hasFocus: true });

          const styleRules = {
            color: text.body,
            background: inputStyleRules.backgroundColor,
            outline: `3px solid ${warning}`,
            border: `1px solid ${inputStyleRules.border}`
          };

          assertStyleMatch(
            styleRules,
            wrapper
          );
        });
      });

      describe('readOnly', () => {
        it('has the correct style rules', () => {
          assertStyleMatch(
            {
              background: inputStyleRules.readOnly,
              border: 'none'
            },
            mountRender({ readOnly: true })
          );
        });
      });

      describe('error', () => {
        it('has the correct style rules', () => {
          assertStyleMatch(
            {
              color: text.body,
              background: inputStyleRules.backgroundColor,
              border: `2px solid ${error}`
            },
            mountRender({ error: true })
          );
        });
      });

      describe('warning', () => {
        it('has the correct style rules', () => {
          assertStyleMatch(
            {
              color: text.body,
              background: inputStyleRules.backgroundColor,
              border: `2px solid ${warning}`
            },
            mountRender({ warning: true })
          );
        });
      });
    });
  });

  describe('InputPresentationContext', () => {
    let wrapper, context;

    // helper function to retrieve latest context, enzyme does not currently
    // support easily fetching this
    const getContext = renderedWrapper => (
      renderedWrapper.update().find('.carbon-input-presentation')
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
});
