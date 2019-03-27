import React from 'react';
import { shallow } from 'enzyme';
import Decimal from './decimal.component';
import Textbox from '../textbox/textbox.component';

function render(props) {
  return shallow(
    <Decimal
      onChange={ () => true }
      value={ props.value }
      precision={ props.precision || '2' }
    />
  );
}

describe('Decimal', () => {
  describe('Input validation', () => {
    it('renders the correct value', () => {
      const input = render({ value: '0.00' });
      input.instance().handleChange({ target: { value: '14.79' } });
      expect(input.find(Textbox).prop('value')).toEqual('14.79');
    });
    it('does not allow the user to enter letters or special characters', () => {
      const input = render({ value: '12.34' });
      input.instance().handleChange({ target: { value: '1hello$1.27' } });
      expect(input.find(Textbox).prop('value')).toEqual('12.34');
    });
    it('does not allow the user to enter commas after the decimal point', () => {
      const input = render({ value: '34.56' });
      input.instance().handleChange({ target: { value: '34.5,,,,6' } });
      expect(input.find(Textbox).prop('value')).toEqual('34.56');
    });
    it('formats the delimiters correctly on blur', () => {
      const input = render({ value: '1234567.00' });
      input.instance().handleChange({ target: { value: '1,,,2345,,,67.00' } });
      input.instance().handleBlur();
      expect(input.find(Textbox).prop('value')).toEqual('1,234,567.00');
    });
    it('updates the value after increasing the precison', () => {
      const input = render({ value: '99.99', precision: '2' });
      input.setProps({ precision: 4 });
      expect(input.find('Textbox').prop('value')).toEqual('99.9900');
    });
    it('updates the value after decreasing the precison', () => {
      const input = render({ value: '1234.1234567', precision: '7' });
      input.setProps({ precision: 4 });
      expect(input.find(Textbox).prop('value')).toEqual('1,234.1235');
    });
    it('does not allow the precison to be greater than 15', () => {
      const input = render({ value: '4.1234', precision: '4' });
      input.setProps({ precision: 20 });
      expect(input.find(Textbox).prop('value')).toEqual('4.123400000000000');
    });
  });
  // DQ: THESE DON'T ACTUALLY BELONG HERE?!?!
  describe('Layout', () => {
    it('allows the input width to be set', () => {
      const test = false;
      expect(test).toEqual(true);
    });
    it('sets the input width correctly if the inlineInput prop is true', () => {
      const test = false;
      expect(test).toEqual(true);
    });
    it('allows the label width to be set if the inlineInput prop is true', () => {
      const test = false;
      expect(test).toEqual(true);
    });
    it('aligns the value within the input based on align prop', () => {
      const test = false;
      expect(test).toEqual(true);
    });
  });
});
