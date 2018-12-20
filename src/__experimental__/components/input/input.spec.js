import React from 'react';
import { mount } from 'enzyme';
import { Input, InputPresentationContext } from './';

const mockContext = context => {
  const InputPresentationContextMock = ({ children }) => children(context);
  InputPresentationContext.Consumer = InputPresentationContextMock;
};

describe('Input', () => {
  const renderMount = (props, context) => {
    mockContext(context);
    return mount(<Input { ...props } />);
  }

  it('renders with InputPresentationContext and an input', () => {
    expect(renderMount()).toMatchSnapshot();
  });

  it('replaces old class name for new one', () => {
    const wrapper = renderMount({ className: 'foo common-input__input' });
    expect(wrapper.find('input').props().className).toEqual('foo carbon-input');
  });

  it('does not fail onBlur or Focus if none are defined', () => {
    const input = renderMount().find('input');
    expect(() => input.simulate('focus')).not.toThrow();
    expect(() => input.simulate('blur')).not.toThrow();
  });

  it('triggers onFocus if passed as prop or context', () => {
    const onFocusProp = jest.fn();
    const onFocusContext = jest.fn();
    const wrapper = renderMount({ onFocus: onFocusProp }, { onFocus: onFocusContext });
    wrapper.find('input').simulate('focus');
    expect(onFocusProp).toHaveBeenCalled();
    expect(onFocusContext).toHaveBeenCalled();
  });

  it('triggers onBlur if passed as prop or context', () => {
    const onBlurProp = jest.fn();
    const onBlurContext = jest.fn();
    const wrapper = renderMount({ onBlur: onBlurProp }, { onBlur: onBlurContext });
    wrapper.find('input').simulate('blur');
    expect(onBlurProp).toHaveBeenCalled();
    expect(onBlurContext).toHaveBeenCalled();
  });
});
