import React from 'react';
import { shallow } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import Decimal from './decimal.component';
import Textbox from '../textbox/textbox.component';

function render(props) {
  const onChange = props.onChange ? props.onChange : () => true;

  return shallow(
    <Decimal
      onChange={ onChange }
      value={ props.value }
      precision={ props.precision }
    />
  );
}

function renderIntoDocument(props) {
  return TestUtils.renderIntoDocument(
    <Decimal value={ props.value } precision={ props.precision } />
  );
}

function assertCorrectlyFormattedVal(instance, value) {
  return expect(instance.formatValue()).toEqual(value);
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
      wrapper.instance().onChange({ target: { value: '1hello$1.27' } });
      assertCorrectTextboxVal(wrapper, '12.34');
    });

    it('does not allow the user to enter commas after the decimal point', () => {
      const wrapper = render({ value: '34.56' });
      wrapper.instance().onChange({ target: { value: '34.5,,,,6' } });
      assertCorrectTextboxVal(wrapper, '34.56');
    });

    it('forces change event if user blurs', () => {
      const onChange = jest.fn();
      const wrapper = render({ onChange });
      wrapper.instance().onBlur({ target: { value: '1' } });
      expect(onChange).toHaveBeenCalled();
    });

    it('formats with delimiters with input is not active', () => {
      const instance = renderIntoDocument({ value: '1234567.00' });
      assertCorrectlyFormattedVal(instance, '1,234,567.00');
    });

    it('updates the value after increasing the precison', () => {
      const instance = renderIntoDocument({ value: '99.99', precision: 4 });
      assertCorrectlyFormattedVal(instance, '99.9900');
    });

    it('updates the value after decreasing the precison', () => {
      const instance = renderIntoDocument({ value: '234.1234567', precision: 4 });
      assertCorrectlyFormattedVal(instance, '234.1235');
    });

    it('does not allow the precison to be greater than 15', () => {
      const instance = renderIntoDocument({ value: '4.1234', precision: 20 });
      assertCorrectlyFormattedVal(instance, '4.123400000000000');
    });

    it('does not format number if input is active', () => {
      const instance = renderIntoDocument({ value: '1234567.00' });
      instance._document = {
        activeElement: instance.input.current
      };
      assertCorrectlyFormattedVal(instance, '1234567.00');
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
