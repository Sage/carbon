import moment from 'moment';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import { mount } from 'enzyme';
import DateInput, { defaultDateFormat, BaseDateInput } from './date.component';
import InputIconToggle from '../input-icon-toggle';
import DatePicker from './date-picker.component';
import Textbox from '../textbox';
import StyledDateInput from './date.style';
import { classicTheme } from '../../../style/themes';
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
    const wrapper = TestRenderer.create(<StyledDateInput theme={ classicTheme } />);
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

    it('should render with "allowEmptyValue" property and null value', () => {
      wrapper = render({ value: null, allowEmptyValue: true });
      expect(wrapper.find(Textbox).exists()).toBe(true);
    });

    it('should render with "allowEmptyValue" property and empty string value', () => {
      wrapper = render({ value: '', allowEmptyValue: true });
      expect(wrapper.find(Textbox).exists()).toBe(true);
    });
  });

  describe.each(['value', 'defaultValue'])(
    'when the %s is  an empty string', (prop) => {
      const currentDate = getFormattedDate(moment());
      it('then the input element value should be set to today if the "allowEmptyValue" prop is falsy', () => {
        wrapper = render({ [prop]: '' });
        simulateBlurOnInput(wrapper);
        expect(wrapper.find('input').findWhere(n => n.props().type !== 'hidden').prop('value')).toBe(currentDate);
      });

      it('then the input element value should not be updated if the "allowEmptyValue" prop is truthy', () => {
        wrapper = render({ [prop]: '', allowEmptyValue: true });
        simulateBlurOnInput(wrapper);
        expect(wrapper.find('input').findWhere(n => n.props().type !== 'hidden').prop('value')).toBe('');
      });
    }
  );

  describe('when "autoFocus" prop is defined', () => {
    it("then component's input should be focused after render", () => {
      wrapper = render({ autoFocus: true });
      const input = wrapper.find('input').findWhere(n => n.props().type !== 'hidden');
      const focusedElement = document.activeElement;
      expect(input.instance()).toBe(focusedElement);
    });
  });

  describe('when autoFocus prop is not defined', () => {
    it('does not sets focus on the input', () => {
      wrapper = render({});
      const input = wrapper.find('input').findWhere(n => n.props().type !== 'hidden');
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
      wrapper = render({ onBlur: onBlurFn, value: '2019-12-11' });
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
      it('should blur when inputFocusedViaPicker flag is not set or falsy', () => {
        simulateBlurOnInput(wrapper);
        jest.runAllTimers();
        expect(onBlurFn).toHaveBeenCalled();
      });

      it('should not blur when inputFocusedViaPicker flag is truthy', () => {
        wrapper.find(BaseDateInput).instance().inputFocusedViaPicker = true;
        simulateFocusOnInput(wrapper);
        simulateBlurOnInput(wrapper);
        jest.runAllTimers();
        expect(onBlurFn).not.toHaveBeenCalled();
      });

      it('should not blur when "allowBlur" returns true', () => {
        isEdge.mockImplementation(() => true);
        wrapper.find(BaseDateInput).instance().inputFocusedViaPicker = true;
        simulateBlurOnInput(wrapper);
        jest.runAllTimers();
        expect(onBlurFn).toHaveBeenCalled();
      });
    });

    describe('when the "isMounted" flag is falsy', () => {
      it('does not update the "lastValidEventValues"', () => {
        const instance = wrapper.find(BaseDateInput).instance();
        instance.isMounted = false;
        simulateChangeOnInput(wrapper, '21-12-2019');
        simulateBlurOnInput(wrapper);
        jest.runAllTimers();
        expect(instance.state.lastValidEventValues.rawValue).toEqual('2019-12-11');
        expect(instance.state.lastValidEventValues.formattedValue).toEqual('11/12/2019');
      });
    });
  });

  describe('when the "keyDown" event is triggered on the input', () => {
    const tabKeyCode = 9;
    const enterKeyCode = 13;

    beforeEach(() => {
      wrapper = render({ value: '' });
      simulateFocusOnInput(wrapper);
    });

    describe('and `onKeyDown` prop is passed', () => {
      it('then the `onKeyDown` prop should be invoked', () => {
        const onKeyDown = jest.fn();
        wrapper.setProps({ onKeyDown });
        simulateOnKeyDown(wrapper, 117);
        expect(onKeyDown).toHaveBeenCalled();
      });
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
      wrapper = render({ value: '' });
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
      expect(wrapper.update().find('input').findWhere(n => n.props().type !== 'hidden')
        .prop('value')).toBe(getFormattedDate(mockDate));
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
      const validDate = '2019-04-01';
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
        expect(wrapper.find('input').findWhere(n => n.props().type !== 'hidden').props().value).toBe(visibleDate);
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
        expect(wrapper.find('input').findWhere(n => n.props().type !== 'hidden').props().value).toBe(invalidDate);
      });
    });

    describe('to an empty date', () => {
      it('reformats the "visibleValue" when it is an empty string and "allowEmptyValue" is falsy', () => {
        const initialDate = '2019-04-01';
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
        expect(wrapper.find('input').findWhere(n => n.props().type !== 'hidden').props().value).toBe(formattedDate);
      });

      it('does not reformat the "visibleValue" when it is an empty string and "allowEmptyValue" is truthy', () => {
        const initialDate = '2019-04-01';
        const emptyDate = '';

        wrapper = render({
          onChange: onChangeFn,
          name: componentName,
          value: initialDate,
          allowEmptyValue: true
        });

        simulateChangeOnInput(wrapper, emptyDate);
        simulateBlurOnInput(wrapper);
        jest.runAllTimers();
        wrapper.update();
        expect(wrapper.find('input').findWhere(n => n.props().type !== 'hidden').props().value).toBe(emptyDate);
      });
    });
  });

  describe('hidden input', () => {
    beforeEach(() => {
      wrapper = render({ value: '28/07/1987' });
    });

    it('stores the raw/ unformatted value', () => {
      expect(wrapper.find('input').findWhere(n => n.props().type === 'hidden').prop('value')).toEqual('1987-07-28');
    });

    it('updates the hidden value when the new date is valid', () => {
      wrapper = render({ value: '28/07/1987' });
      wrapper.find(BaseDateInput).setState({ visibleValue: '29/07/2007' });
      simulateBlurOnInput(wrapper);
      jest.runAllTimers();
      expect(wrapper.find('input').findWhere(n => n.props().type === 'hidden').prop('value')).toEqual('2007-07-29');
    });

    it('does not update the hidden value if the new date is not valid', () => {
      wrapper.find(BaseDateInput).setState({ visibleValue: 'foo' });
      expect(wrapper.find('input').findWhere(n => n.props().type === 'hidden').prop('value')).toEqual('1987-07-28');
    });
  });

  describe.each(['disabled', 'readOnly'])('when the "%s" prop is set', (prop) => {
    const validDate = '2019-04-01';
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

    afterEach(() => wrapper.unmount());

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

    describe.each([
      { disabled: true, readOnly: false },
      { disabled: false, readOnly: true },
      { disabled: true, readOnly: true }
    ])('The date picker', (props) => {
      it(`does not call "openDatePicker" when disabled is ${props.disabled} and readOnly is ${props.readOnly}`, () => {
        wrapper = render({});
        wrapper.find(InputIconToggle).props().onClick();
        wrapper.setProps({ ...props });
        wrapper.update();
        wrapper.find(DatePicker).parent().props().onClick();
        wrapper.update();
        expect(spyOn(wrapper.find(BaseDateInput).instance(), 'openDatePicker')).not.toBeCalled();
      });
    });

    describe('on an external element', () => {
      const nativeClickEvent = new Event('click', { bubbles: true, cancelable: true });
      let domNode;

      it('then the Datepicker should be closed', () => {
        wrapper = mount(<div><DateInput value='2012-12-11' /><span id='external' /></div>);
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
        const input = wrapper.find('input').findWhere(n => n.props().type !== 'hidden');

        expect(input.instance().value).toBe(mockDate);
      });
    });

    describe('controlled vs uncontrolled input', () => {
      it('supports being used as an controlled input via passing of a value prop', () => {
        wrapper = render({ value: '2001-02-27' });
        expect(wrapper.find(BaseDateInput).instance().isControlled).toEqual(true);
        expect(wrapper.find(BaseDateInput).instance().initialVisibleValue).toEqual('27/02/2001');
      });

      it('supports being used as an uncontrolled input via passing of a defaultValue prop', () => {
        wrapper = render({ defaultValue: '2009-02-23' });
        expect(wrapper.find(BaseDateInput).instance().isControlled).toEqual(false);
        expect(wrapper.find(BaseDateInput).instance().initialVisibleValue).toEqual('23/02/2009');
      });

      it('acts as a controlled input when value and default are passed and does not throw', () => {
        wrapper = render({ defaultValue: '2009-02-23', value: '2001-02-27' });
        expect(wrapper.find(BaseDateInput).instance().isControlled).toEqual(true);
        expect(wrapper.find(BaseDateInput).instance().initialVisibleValue).toEqual('27/02/2001');
      });
    });
  });

  describe('when additional validations are provided with the "validations" prop', () => {
    const mockValidationFunction = () => {};
    const mockValidationFunction2 = () => {};

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

    describe('when the validations update', () => {
      it('appends the new validator to the validations array', () => {
        wrapper = render({ validations: [mockValidationFunction] });
        wrapper.setProps({ validations: [mockValidationFunction, mockValidationFunction2] });

        expect(wrapper.find(BaseDateInput).state().validationsArray.length).toEqual(3);
      });
    });

    it('updates the validation array in state when there is a difference', () => {
      wrapper = render({ validations: [mockValidationFunction] });
      wrapper.setProps({ validations: [mockValidationFunction2] });

      expect(wrapper.find(BaseDateInput).state().validationsArray.length).toEqual(2);
    });
  });
});

describe('when the calendar icon is clicked', () => {
  it('opens the picker, if it is not already open, and closes it on the next click', () => {
    const wrapper = render({});
    wrapper.find(InputIconToggle).props().onClick();
    wrapper.update();
    expect(wrapper.find(DatePicker).exists()).toBe(true);
    wrapper.find(InputIconToggle).props().onClick();
    wrapper.update();
    expect(wrapper.find(DatePicker).exists()).toBe(false);
  });

  it('does not close the picker when the picker onClick is called', () => {
    const wrapper = render({});
    wrapper.find(InputIconToggle).props().onClick();
    wrapper.update();
    wrapper.find(DatePicker).parent().props().onClick();
    wrapper.update();
    expect(wrapper.find(DatePicker).exists()).toBe(true);
  });
});

function render(props, renderer = mount) {
  return renderer(<DateInput { ...props } />);
}

function getFormattedDate(date) {
  return date.format(defaultDateFormat);
}

function simulateFocusOnInput(container) {
  const input = container.find('input').findWhere(n => n.props().type !== 'hidden');

  input.simulate('focus');
}

function simulateBlurOnInput(container) {
  const input = container.find('input').findWhere(n => n.props().type !== 'hidden');

  input.simulate('blur');
}

function simulateChangeOnInput(container, value) {
  const input = container.find('input').findWhere(n => n.props().type !== 'hidden');

  input.instance().value = value;
  input.simulate('change');
}

function simulateClickOnInput(container) {
  const input = container.find('input').findWhere(n => n.props().type !== 'hidden');
  const mockEvent = {
    nativeEvent: {
      stopImmediatePropagation: () => {}
    }
  };

  input.simulate('click', mockEvent);
}

function simulateOnKeyDown(container, key) {
  const keyDownParams = { which: key };
  const input = container.find('input').findWhere(n => n.props().type !== 'hidden');

  input.simulate('keyDown', keyDownParams);
}
