import React from 'react';
import 'jest-styled-components';
import TestRenderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { ValidationIconPresentation, ValidationIconContext } from './validation-icon-presentation.component';

function render(props, renderer = TestRenderer.create) {
  return renderer(
    <ValidationIconPresentation>
      <ValidationIconContext.Consumer>
        {context => (
          <span
            onFocus={ () => {
              context.onFocus();
              props.onFocus();
            } }
            onBlur={ () => {
              context.onBlur();
              props.onBlur();
            } }
          >
            Hello
          </span>
        )}
      </ValidationIconContext.Consumer>
    </ValidationIconPresentation>
  );
}

describe('ValidationIconPresentation', () => {
  it('renders as expected', () => {
    const wrapper = TestRenderer.create(<ValidationIconPresentation />);

    expect(wrapper).toMatchSnapshot();
  });

  describe('child element', () => {
    const fakeFocus = jest.fn();
    const fakeBlur = jest.fn();
    const wrapper = render({
      onFocus: fakeFocus,
      onBlur: fakeBlur
    }, mount);

    describe('focus on child element', () => {
      it('onFocus should be invoked', () => {
        const span = wrapper.find('span');
        span.simulate('focus');

        expect(fakeFocus).toBeCalledTimes(1);
      });
    });

    describe('blur on child element', () => {
      it('onBlur should be invoked', () => {
        const span = wrapper.find('span');
        span.simulate('blur');

        expect(fakeBlur).toBeCalledTimes(1);
      });
    });
  });
});
