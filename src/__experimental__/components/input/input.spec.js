import React from 'react';
import { mount } from 'enzyme';
import { Input, InputPresentationContext } from '.';
import 'jest-styled-components';

describe('Input', () => {
  const renderMount = (props, context) => {
    let component = <Input onChange={ () => {} } { ...props } />;

    if (context) {
      component = (
        <InputPresentationContext.Provider value={ context }>
          { component }
        </InputPresentationContext.Provider>
      );
    }

    return mount(component);
  };

  it('renders with an input', () => {
    expect(renderMount()).toMatchSnapshot();
  });

  it('sends the input ref to the inputRef callback', () => {
    const inputRef = jest.fn();
    const wrapper = renderMount({ inputRef });
    expect(inputRef).toHaveBeenCalledWith(wrapper.instance().input);
  });

  it('does not fail onBlur or Focus if none are defined', () => {
    const input = renderMount().find('input');
    expect(() => input.simulate('focus')).not.toThrow();
    expect(() => input.simulate('blur')).not.toThrow();
  });

  it('triggers onBlur if passed as prop or context', () => {
    const onBlurProp = jest.fn();
    const onBlurContext = jest.fn();
    const wrapper = renderMount({ onBlur: onBlurProp }, { onBlur: onBlurContext });
    wrapper.find('input').simulate('blur');
    expect(onBlurProp).toHaveBeenCalled();
    expect(onBlurContext).toHaveBeenCalled();
  });

  it('triggers onFocus if passed as prop or context', () => {
    const onFocusProp = jest.fn();
    const onFocusContext = jest.fn();
    const wrapper = renderMount({ onFocus: onFocusProp }, { onFocus: onFocusContext });
    wrapper.find('input').simulate('focus');
    expect(onFocusProp).toHaveBeenCalled();
    expect(onFocusContext).toHaveBeenCalled();
  });

  describe('select text on focus', () => {
    const focusWith = (value, leftPos, rightPos) => {
      jest.useFakeTimers();
      const wrapper = renderMount({ value });
      const inputComponent = wrapper.find('input');
      const inputElement = inputComponent.instance();
      spyOn(inputElement, 'setSelectionRange');
      inputElement.selectionStart = leftPos;
      inputElement.selectionEnd = rightPos;
      inputComponent.simulate('focus');
      jest.runAllTimers();
      return inputElement;
    };

    it('selects all of the text if focus is applied to the left of the value', () => {
      const inputElement = focusWith('hello', 0, 0);
      expect(inputElement.setSelectionRange).toHaveBeenCalledWith(0, 5);
    });

    it('selects all of the text if focus is applied to the right of the value', () => {
      const inputElement = focusWith('hello', 5, 5);
      expect(inputElement.setSelectionRange).toHaveBeenCalledWith(0, 5);
    });

    it('does not select the text if focus is applied inside of the value', () => {
      const inputElement = focusWith('hello', 4, 4);
      expect(inputElement.setSelectionRange).not.toHaveBeenCalled();
    });
  });

  describe('onClick', () => {
    it('triggers focus on the input', () => {
      const wrapper = renderMount();
      const focus = jest.fn();
      wrapper.instance().input.current = { focus };
      wrapper.find('input').simulate('click');
      expect(focus).toHaveBeenCalled();
    });

    it('triggers onClick prop if one is passed', () => {
      const onClick = jest.fn();
      const wrapper = renderMount({ onClick });
      wrapper.find('input').simulate('click');
      expect(onClick).toHaveBeenCalled();
    });
  });
});
