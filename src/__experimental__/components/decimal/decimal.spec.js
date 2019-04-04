import React from 'react';
import { shallow, mount } from 'enzyme';
import Decimal from './decimal.component';
import Textbox from '../textbox/textbox.component';

function render(props, renderType = shallow) {
  const onChange = props.onChange ? props.onChange : () => true;

  return renderType(
    <Decimal
      onChange={ onChange }
      value={ props.value }
      precision={ props.precision }
      maxPrecision={ props.maxPrecision }
    />
  );
}

function assertCorrectTextboxVal(wrapper, value) {
  return expect(wrapper.find(Textbox).prop('value')).toEqual(value);
}

describe('Decimal', () => {
  describe('Input validation', () => {
    it('renders the correct value', () => {
      const wrapper = render({ value: '9.87' });
      assertCorrectTextboxVal(wrapper, '9.87');
    });

    it('renders a value from props exactly even when invalid', () => {
      const wrapper = render({ value: '12abc.85' });
      assertCorrectTextboxVal(wrapper, '12abc.85');
    });

    it('updates an external state onChange', () => {
      const onChange = jest.fn();
      const wrapper = render({ onChange });
      const input = wrapper.find(Textbox);
      input.simulate('change', { target: { value: '14.79' } });
      expect(onChange).toHaveBeenCalledWith({ target: { value: '14.79' } });
    });

    it('does not allow the user to enter letters or special characters', () => {
      const wrapper = render({ value: '12.34' });
      wrapper.instance().onChange({ target: { value: '1!@£$%^&*()#_+=}{|":;<>?qwertyuiopasd\\\'fghjklzxcvbnm1.27' } });
      assertCorrectTextboxVal(wrapper, '12.34');
    });

    it('does not allow the user to enter commas after the decimal point', () => {
      const wrapper = render({ value: '34.56' });
      wrapper.instance().onChange({ target: { value: '34.5,,,,6' } });
      assertCorrectTextboxVal(wrapper, '34.56');
    });

    it('forces update on user blurs', () => {
      const wrapper = render({ value: '1.00' }, mount);
      wrapper.setProps({ value: '2' });
      wrapper.instance().onBlur();
      assertCorrectTextboxVal(wrapper, '2.00');
    });

    it('formats with delimiters when input is not active', () => {
      const wrapper = render({ value: '12345.00' }, mount);

      wrapper.setProps({ value: '1234567.00' });
      assertCorrectTextboxVal(wrapper, '1,234,567.00');
    });

    it('does not format number if input is active', () => {
      const wrapper = render({ value: '1234.00' }, mount);

      wrapper.instance()._document = {
        activeElement: wrapper.instance().input.current
      };
      wrapper.setProps({ value: '1234.00' });
      assertCorrectTextboxVal(wrapper, '1234.00');
    });
  });

  describe('Precision handling', () => {
    it('updates the value after increasing the precison', () => {
      const wrapper = render({ value: '99.99' }, mount);

      wrapper.setProps({ precision: 4 });
      assertCorrectTextboxVal(wrapper, '99.9900');
    });

    it('updates the value after decreasing the precison', () => {
      const wrapper = render({ value: '234.1234567' }, mount);

      wrapper.setProps({ precision: 4 });
      assertCorrectTextboxVal(wrapper, '234.1235');
    });

    it('does not allow the precison to be greater than the max precision', () => {
      const wrapper = render({ value: '4.1234', maxPrecision: 15 }, mount);

      wrapper.setProps({ precision: 20 });
      assertCorrectTextboxVal(wrapper, '4.123400000000000');
    });

    it('uses the defaultProp if precision is a falsey value', () => {
      const wrapper = render({ value: '5.1234' }, mount);

      wrapper.setProps({ precision: 0 });
      assertCorrectTextboxVal(wrapper, '5.12');
    });

    it('uses the defaultProp if precision is not positive', () => {
      const wrapper = render({ value: '6.1234' }, mount);

      wrapper.setProps({ precision: -3 });
      assertCorrectTextboxVal(wrapper, '6.12');
    });
  });

  describe('Input handling', () => {
    it('calls setSelection after passing invalid value', async () => {
      const setSelectionMock = jest.fn();
      jest.useFakeTimers();
      const evt = {
        target: {
          value: '123s456.78',
          setSelectionRange: setSelectionMock,
          selectionEnd: 3
        }
      };
      const input = render({ value: '1234567.00' });
      input.instance().onChange(evt);
      jest.runAllTimers();
      expect(setSelectionMock).toHaveBeenCalledWith(2, 2);
    });
  });
});
