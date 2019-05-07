import moment from 'moment';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import { mount } from 'enzyme';
import Date, { defaultDateFormat } from './date.component';
import DatePicker from './date-picker.component';
import Textbox from '../textbox';
import StyledDateInput from './date.style';
import { THEMES } from '../../../style/themes';

describe('StyledDateInput', () => {
  it('renders correctly for default theme', () => {
    const wrapper = TestRenderer.create(<StyledDateInput />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly for the "classic" theme', () => {
    const mockTheme = {
      name: THEMES.classic
    };
    const wrapper = TestRenderer.create(<StyledDateInput theme={ mockTheme } />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Date', () => {
  let wrapper;

  describe('when the Component is rendered', () => {
    it("should have the Textbox component rendered as it's descendant", () => {
      wrapper = render({});
      expect(wrapper.find(Textbox).exists()).toBe(true);
    });
  });

  describe('when the "value" prop is an empty string', () => {
    const currentDate = getFormattedDate(moment());

    it('then the input element value should be set to today', () => {
      wrapper = render({ value: '' });
      simulateBlurOnInput(wrapper);
      expect(wrapper.find('input').prop('value')).toBe(currentDate);
    });
  });

  describe('when "autoFocus" prop is defined', () => {
    it("then component's input should be focused after render", () => {
      wrapper = render({ autoFocus: true });
      const input = wrapper.find('input');
      const focusedElement = document.activeElement;
      expect(input.instance()).toBe(focusedElement);
    });
  });

  describe('when autoFocus prop is not defined', () => {
    it('does not sets focus on the input', () => {
      wrapper = render({});
      const input = wrapper.find('input');
      const focusedElement = document.activeElement;
      expect(input.instance()).not.toBe(focusedElement);
    });
  });

  describe('when the "focus" event is triggered on the input', () => {
    let onFocusFn;

    beforeEach(() => {
      onFocusFn = jest.fn();
    });

    it('then onFocus prop should have been called', () => {
      wrapper = render({ onFocus: onFocusFn });
      simulateFocusOnInput(wrapper);
      expect(onFocusFn).toHaveBeenCalled();
    });

    describe('with autoFocus property on the component', () => {
      it('should not render a DatePicker component', () => {
        wrapper = render({ onFocus: onFocusFn, autoFocus: true });
        simulateFocusOnInput(wrapper);
        expect(wrapper.find(DatePicker).exists()).toBe(false);
      });
    });

    describe('without autoFocus property on the component', () => {
      it('should render a DatePicker component', () => {
        wrapper = render({ onFocus: onFocusFn });
        simulateFocusOnInput(wrapper);
        expect(wrapper.find(DatePicker).exists()).toBe(true);
      });
    });
  });

  describe('when the "blur" event is triggered on the input', () => {
    let onBlurFn;

    beforeEach(() => {
      onBlurFn = jest.fn();
      wrapper = render({ onBlur: onBlurFn });
    });

    describe('and with DatePicker opened', () => {
      it('then onBlur prop should not have been called', () => {
        simulateFocusOnInput(wrapper);
        simulateBlurOnInput(wrapper);
        expect(wrapper.find(DatePicker).exists()).toBe(true);
        expect(onBlurFn).not.toHaveBeenCalled();
      });
    });

    describe('and with DatePicker closed', () => {
      it('then onBlur prop should have been called', () => {
        simulateBlurOnInput(wrapper);
        expect(wrapper.find(DatePicker).exists()).toBe(false);
        expect(onBlurFn).toHaveBeenCalled();
      });
    });
  });

  describe('when the "keyDown" event is triggered on the input', () => {
    const tabKeyCode = 9;
    const enterKeyCode = 13;

    beforeEach(() => {
      wrapper = render({});
      simulateFocusOnInput(wrapper);
    });

    describe('and with the "Tab" key', () => {
      it('then the "DatePicker" should be closed', () => {
        expect(wrapper.find(DatePicker).exists()).toBe(true);
        simulateOnKeyDown(wrapper, tabKeyCode);
        expect(wrapper.find(DatePicker).exists()).toBe(false);
      });
    });

    describe('and with the key other that "Tab"', () => {
      it('then the "DatePicker" should not be closed', () => {
        expect(wrapper.find(DatePicker).exists()).toBe(true);
        simulateOnKeyDown(wrapper, enterKeyCode);
        expect(wrapper.find(DatePicker).exists()).toBe(true);
      });
    });
  });

  describe('when the Component is updated', () => {
    const firstDate = '12/08/2019';
    const secondDate = '17/08/2019';
    let onBlurFn;

    beforeEach(() => {
      onBlurFn = jest.fn();
    });

    describe('with the same value', () => {
      it('then onBlur prop should not have been called', () => {
        wrapper = render({ onBlur: onBlurFn, value: firstDate });
        wrapper.setProps({ value: firstDate });
        expect(onBlurFn).not.toHaveBeenCalled();
      });
    });

    describe('with a different value', () => {
      beforeEach(() => {
        wrapper = render({ onBlur: onBlurFn, value: firstDate });
      });

      describe('and with DatePicker closed', () => {
        it('then onBlur prop should not have been called', () => {
          wrapper.setProps({ value: secondDate });
          expect(wrapper.find(DatePicker).exists()).toBe(false);
          expect(onBlurFn).not.toHaveBeenCalled();
        });
      });

      describe('and with DatePicker opened', () => {
        it('then onBlur prop should have been called', () => {
          simulateFocusOnInput(wrapper);
          wrapper.setProps({ value: secondDate });
          expect(wrapper.find(DatePicker).exists()).toBe(true);
          expect(onBlurFn).toHaveBeenCalled();
        });
      });
    });
  });

  describe('when the "handleDateSelect" prop is called on the opened "DatePicker"', () => {
    const mockDate = moment('2012-02-01');

    beforeEach(() => {
      wrapper = render({});
      simulateFocusOnInput(wrapper);
      wrapper
        .find(DatePicker)
        .props()
        .handleDateSelect(mockDate);
    });

    it('should not contain the DatePicker component', () => {
      expect(
        wrapper
          .update()
          .find(DatePicker)
          .exists()
      ).toBe(false);
    });

    it('should update the input element to reflect the passed date', () => {
      expect(wrapper.update().find('input').prop('value')).toBe(getFormattedDate(mockDate));
    });
  });

  describe('when the input value is changed', () => {
    let onChangeFn;

    beforeEach(() => {
      onChangeFn = jest.fn();
      wrapper = render({ onChange: onChangeFn });
    });

    describe('to a valid date', () => {
      const validDate = '1 apr 2019';

      it('then the "onChange" prop should have been called', () => {
        simulateChangeOnInput(wrapper, validDate);
        expect(onChangeFn).toHaveBeenCalled();
      });
    });

    describe('to an invalid date', () => {
      const invalidDate = 'abcde';

      it('then the "onChange" prop should not have been called', () => {
        simulateChangeOnInput(wrapper, invalidDate);
        expect(onChangeFn).not.toHaveBeenCalled();
      });
    });
  });

  describe.each(['disabled', 'readOnly'])('when the "%s" prop is set', (prop) => {
    const validDate = '1 apr 2019';
    let onChangeFn;
    let onFocusFn;
    let onBlurFn;

    beforeEach(() => {
      onChangeFn = jest.fn();
      onFocusFn = jest.fn();
      onBlurFn = jest.fn();
      wrapper = render(
        {
          [prop]: true,
          onChange: onChangeFn,
          onFocus: onFocusFn,
          onBlur: onBlurFn
        }
      );
    });

    it('then onBlur prop should not have been called', () => {
      simulateBlurOnInput(wrapper);
      expect(onBlurFn).not.toHaveBeenCalled();
    });

    it('then onFocus prop should not have been called', () => {
      simulateFocusOnInput(wrapper);
      expect(onFocusFn).not.toHaveBeenCalled();
    });

    it('then the "onChange" prop should not have been called', () => {
      simulateChangeOnInput(wrapper, validDate);
      expect(onChangeFn).not.toHaveBeenCalled();
    });
  });

  describe('when the "click" event is triggered with the DatePicker open', () => {
    describe('on the component\'s input element', () => {
      it('then the Datepicker should not be closed', () => {
        wrapper = render({});
        simulateFocusOnInput(wrapper);
        expect(wrapper.find(DatePicker).exists()).toBe(true);
        simulateClickOnInput(wrapper);
        expect(wrapper.find(DatePicker).exists()).toBe(true);
      });
    });

    describe('on an external element', () => {
      const nativeClickEvent = new Event('click', { bubbles: true, cancelable: true });
      let domNode;

      it('then the Datepicker should be closed', () => {
        wrapper = mount(<div><Date /><span id='external' /></div>);
        domNode = wrapper.getDOMNode();
        document.body.appendChild(domNode);
        simulateFocusOnInput(wrapper.find(Date));
        expect(wrapper.find(DatePicker).exists()).toBe(true);
        wrapper.find('#external').getDOMNode().dispatchEvent(nativeClickEvent);
        expect(wrapper.update().find(DatePicker).exists()).toBe(false);
      });

      afterEach(() => {
        document.body.removeChild(domNode);
      });
    });
  });
});

function render(props, renderer = mount) {
  return renderer(<Date { ...props } />);
}

function getFormattedDate(date) {
  return date.format(defaultDateFormat);
}

function simulateFocusOnInput(container) {
  const input = container.find('input');

  input.simulate('focus');
}

function simulateBlurOnInput(container) {
  const input = container.find('input');

  input.simulate('blur');
}

function simulateChangeOnInput(container, value) {
  const input = container.find('input');

  input.instance().value = value;
  input.simulate('change');
}

function simulateClickOnInput(container) {
  const input = container.find('input');
  const mockEvent = {
    nativeEvent: {
      stopImmediatePropagation: () => {}
    }
  };

  input.simulate('click', mockEvent);
}

function simulateOnKeyDown(container, key) {
  const keyDownParams = { which: key };
  const input = container.find('input');

  input.simulate('keyDown', keyDownParams);
}
