import moment from 'moment';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import { mount } from 'enzyme';
import DateInput, { defaultDateFormat, BaseDateInput } from './date.component';
import DatePicker from './date-picker.component';
import Textbox from '../textbox';
import StyledDateInput from './date.style';
import { THEMES } from '../../../style/themes';
import DateHelper from '../../../utils/helpers/date/date';
import { isEdge } from '../../../utils/helpers/browser-type-check';

moment.suppressDeprecationWarnings = true;
jest.useFakeTimers();
jest.mock('../../../utils/helpers/browser-type-check');

describe('StyledDateInput', () => {
  it('renders correctly for default theme', () => {
    const wrapper = TestRenderer.create(<StyledDateInput size='large' />);
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
      it('should render a DatePicker component', () => {
        wrapper = render({ autoFocus: true });
        simulateFocusOnInput(wrapper);
        expect(wrapper.find(DatePicker).exists()).toBe(true);
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
        jest.runAllTimers();
        expect(onBlurFn).toHaveBeenCalled();
      });
    });

    describe('and browser is Edge', () => {
      it('should blur when inputFocusedViaPicker flag is falsy', () => {
        wrapper.find(BaseDateInput).instance().shouldAllowBlur = () => true;
        wrapper.find(BaseDateInput).instance().inputFocusedViaPicker = true;
        wrapper.find(BaseDateInput).instance().handleBlur();
        simulateBlurOnInput(wrapper);
        jest.runAllTimers();
        expect(onBlurFn).toHaveBeenCalled();
      });
    });

    describe('shouldAllowBlur', () => {
      it('returns true when the browser isEdge and inputFocusedViaPicker is falsy', () => {
        isEdge.mockImplementation(() => true);
        wrapper.find(BaseDateInput).instance().inputFocusedViaPicker = false;
        expect(wrapper.find(BaseDateInput).instance().shouldAllowBlur()).toEqual(true);
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
        it('then onBlur prop should not have been called', () => {
          simulateFocusOnInput(wrapper);
          wrapper.setProps({ value: secondDate });
          expect(wrapper.find(DatePicker).exists()).toBe(true);
          expect(onBlurFn).not.toHaveBeenCalled();
        });

        it('when the visibleValue is invalid it passes the previously valid value to picker', () => {
          simulateFocusOnInput(wrapper);
          wrapper.find(BaseDateInput).setState({ visibleValue: 'foo' });
          const picker = wrapper.find(DatePicker);
          expect(picker.exists()).toBe(true);
          expect(picker.props().inputDate).toEqual(firstDate);
        });
      });

      describe('and the rawValue is invalid', () => {
        it('then it should return the previous valid date values', () => {
          simulateFocusOnInput(wrapper);
          const event = {
            target: {
              name: 'foo',
              id: 'foo',
              value: '21/12/122'
            }
          };
          expect(wrapper.find(BaseDateInput).instance()
            .buildCustomEvent(event, 'foo').target.value)
            .toEqual({ formattedValue: firstDate, rawValue: '2019-08-12' });
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

    it('should return focus to the date input and the picker should not open', () => {
      const instance = wrapper.find(BaseDateInput).instance();
      expect(instance.inputFocusedViaPicker).toEqual(true);
      instance.openDatePicker();
      expect(
        wrapper
          .update()
          .find(DatePicker)
          .exists()
      ).toBe(false);
    });
  });

  describe('when the input value is changed', () => {
    let onChangeFn;
    const mockTodayDate = '2019-04-11';
    const componentName = 'abc';

    beforeEach(() => {
      jest.spyOn(DateHelper, 'todayFormatted').mockImplementation(() => mockTodayDate);
      onChangeFn = jest.fn();
      wrapper = render({
        onChange: onChangeFn,
        name: componentName,
        value: '2019-04-11'
      });
    });

    describe('to a valid date', () => {
      const validDate = '1 apr 2019';
      const isoDate = '2019-04-01';
      const visibleDate = '01/04/2019';
      const jsDateObject = new Date(isoDate);
      let mockedStringToDate;

      beforeAll(() => {
        mockedStringToDate = jest.spyOn(DateHelper, 'stringToDate').mockImplementation(() => jsDateObject);
      });

      it('then the "onChange" prop should have been called', () => {
        simulateChangeOnInput(wrapper, validDate);
        expect(onChangeFn).toHaveBeenCalled();
      });

      it('then the "selectedDate" prop with proper Date Object should be passed to the DatePicker component', () => {
        simulateFocusOnInput(wrapper);
        simulateChangeOnInput(wrapper, validDate);
        expect(wrapper.find(DatePicker).props().selectedDate).toBe(jsDateObject);
      });

      it("then the value of it's input should be changed to a locally formatted date", () => {
        simulateChangeOnInput(wrapper, validDate);
        simulateBlurOnInput(wrapper);
        jest.runAllTimers();
        wrapper.update();
        expect(wrapper.find('input').props().value).toBe(visibleDate);
      });

      afterAll(() => {
        mockedStringToDate.mockRestore();
      });
    });

    describe('to an invalid date', () => {
      const invalidDate = 'abcde';

      it('then the "onChange" prop should not have been called', () => {
        simulateChangeOnInput(wrapper, invalidDate);
        expect(onChangeFn).not.toHaveBeenCalled();
      });

      it('then the "selectedDate" prop with JS Date set to today should be passed to the DatePicker component', () => {
        wrapper.setProps({ value: invalidDate });
        simulateFocusOnInput(wrapper);
        expect(wrapper.find(DatePicker).props().selectedDate).toEqual(DateHelper.stringToDate(mockTodayDate));
      });

      it("then the value of it's input should not be changed", () => {
        simulateChangeOnInput(wrapper, invalidDate);
        simulateBlurOnInput(wrapper);
        wrapper.update();
        expect(wrapper.find('input').props().value).toBe(invalidDate);
      });
    });

    describe('to an empty date', () => {
      it('reformats the visiblevalue when it is an empty string', () => {
        const initialDate = '1 apr 2019';
        const formattedDate = '01/04/2019';
        const emptyDate = '';

        wrapper = render({
          onChange: onChangeFn,
          name: componentName,
          value: initialDate
        });

        simulateChangeOnInput(wrapper, emptyDate);
        simulateBlurOnInput(wrapper);
        jest.runAllTimers();
        wrapper.update();
        expect(wrapper.find('input').props().value).toBe(formattedDate);
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
      wrapper = render({
        [prop]: true,
        onChange: onChangeFn,
        onFocus: onFocusFn,
        onBlur: onBlurFn
      });
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

    it('then the date picker should not open on click', () => {
      simulateClickOnInput(wrapper);
      expect(wrapper.find(DatePicker).exists()).toBe(false);
      expect(onBlurFn).not.toHaveBeenCalled();
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
        wrapper = mount(<div><DateInput /><span id='external' /></div>);
        domNode = wrapper.getDOMNode();
        document.body.appendChild(domNode);
        simulateFocusOnInput(wrapper.find(DateInput));
        expect(wrapper.find(DatePicker).exists()).toBe(true);
        wrapper.find('#external').getDOMNode().dispatchEvent(nativeClickEvent);
        expect(wrapper.update().find(DatePicker).exists()).toBe(false);
      });

      afterEach(() => {
        document.body.removeChild(domNode);
      });
    });

    // To be removed after the DateRange component is refactored
    describe('when the "closeDatePicker" method has been called', () => {
      it('then the visible value should not change', () => {
        const mockDate = getFormattedDate(moment('2012-02-01'));
        wrapper = mount(<DateInput value={ mockDate } />);
        wrapper.find(BaseDateInput).instance().closeDatePicker();
        const input = wrapper.find('input');

        expect(input.instance().value).toBe(mockDate);
      });
    });

    describe('controlled vs uncontrolled input', () => {
      it('supports being used as an controlled input via passing of a value prop', () => {
        wrapper = render({ value: '27th Feb 01' });
        expect(wrapper.find(BaseDateInput).instance().isControlled).toEqual(true);
        expect(wrapper.find(BaseDateInput).instance().initialVisibleValue).toEqual('27th Feb 01');
      });

      it('supports being used as an uncontrolled input via passing of a defaultValue prop', () => {
        wrapper = render({ defaultValue: '23rd Feb 09' });
        expect(wrapper.find(BaseDateInput).instance().isControlled).toEqual(false);
        expect(wrapper.find(BaseDateInput).instance().initialVisibleValue).toEqual('23rd Feb 09');
      });

      it('acts as a controlled input when value and default are passed and does not throw', () => {
        wrapper = render({ defaultValue: '23rd Feb 09', value: '27th Feb 01' });
        expect(wrapper.find(BaseDateInput).instance().isControlled).toEqual(true);
        expect(wrapper.find(BaseDateInput).instance().initialVisibleValue).toEqual('27th Feb 01');
      });
    });
  });

  describe('when additional validations are provided with the "validations" prop', () => {
    const mockValidationFunction = () => {};

    describe('as a function', () => {
      it('then these validations should be passed with internal validations to the Textbox Component', () => {
        wrapper = render({ validations: mockValidationFunction });
        const { internalValidations } = wrapper.find(BaseDateInput).instance().props;
        expect(wrapper.find(Textbox).props().validations).toEqual([mockValidationFunction, ...internalValidations]);
      });
    });

    describe('as an array', () => {
      it('then these validations should be passed with internal validations to the Textbox Component', () => {
        wrapper = render({ validations: [mockValidationFunction] });
        const { internalValidations } = wrapper.find(BaseDateInput).instance().props;
        expect(wrapper.find(Textbox).props().validations).toEqual([mockValidationFunction, ...internalValidations]);
      });
    });
  });
});

function render(props, renderer = mount) {
  return renderer(<DateInput { ...props } />);
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
