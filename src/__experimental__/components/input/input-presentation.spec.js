import React from 'react';
import { shallow, mount } from 'enzyme';
import { InputPresentation } from '.';
import baseTheme from '../../../style/themes/base';
import 'jest-styled-components';

// 
const assertStyleMatch = (styleSpec, component) => {
  
  Object.entries(styleSpec).forEach(([attr, value]) => {
    expect(component).toHaveStyleRule(attr, value);
  })
};



describe('InputPresentation', () => {
  const shallowRender = props => shallow(<InputPresentation { ...props }>sample children</InputPresentation>);
  const mountRender = props => mount(<InputPresentation { ...props }>sample children</InputPresentation> )

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
        error, warning, info, text
      }
    } = baseTheme;

    describe('states', () => {
      describe('disabled', () => {
        it('has the correct style rules', () => {

          assertStyleMatch(
            {
              color: text.disabled,
              background: inputStyleRules.disabled
            },
            mountRender({ disabled: true })
          );
        });

        it('changes the cursor on hover', () => {

        });
      });

      describe('active', () => {
        it('has the correct style rules', () => {
          const wrapper = mountRender({ hasFocus: true });
          wrapper.instance().onFocus();
          assertStyleMatch(
            {
              color: text.body,
              background: inputStyleRules.backgroundColor,
              border: warning

            },
            wrapper
          );

        });
      });

      describe('readOnly', () => {
        it('has the correct style rules', () => {
          assertStyleMatch(
            {
              color: 'red',
              background: inputStyleRules.backgroundColor,
              
            },
            mountRender({ readOnly: true })
          );

        });
      });

      describe('error', () => {
        it('has the correct style rules', () => {
          assertStyleMatch(
            {
              color: 'red',
              background: inputStyleRules.backgroundColor,
              
            },
            mountRender({ error: true })
          );
        });
      });

      describe('warning', () => {
        it('has the correct style rules', () => {
          assertStyleMatch(
            {
              color: 'red',
              background: inputStyleRules.backgroundColor,
              
            },
            mountRender({ warning: true })
          );

        });
      });

      describe('info', () => {
        it('has the correct style rules', () => {
          assertStyleMatch(
            {
              color: 'red',
              background: inputStyleRules.backgroundColor,
              
            },
            mountRender({ info: true })
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
