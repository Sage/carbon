import React from 'react';
import { shallow, mount } from 'enzyme';
import Decimal from './decimal.component';
import Textbox from '../textbox/textbox.component';

function render(props, renderer = shallow) {
  return renderer(
    <Decimal { ...props } />
  );
}

describe('Decimal', () => {
  describe('Input validation', () => {
    it('does not allow the user to enter letters or special characters', () => {
      const input = mount(<Decimal value="1hello$1.27" />)
      console.log(input.find('Textbox').prop('value'))
      console.log(input.instance())
      expect(input.find('Textbox').prop('value')).toEqual('11.27');
      // expect(input.find('Textbox').length).toEqual(1);
    });
    it('does not allow the user to enter commas after the decimal point', () => {
      const test = false;
      expect(test).toEqual(true);
    });
    it('formats the commas correctly on blur', () => {
      const test = false;
      expect(test).toEqual(true);
    });
    it('updates the value after increasing the precison', () => {
      const test = false;
      expect(test).toEqual(true);
    });
    it('updates the value after decreasing the precison', () => {
      const test = false;
      expect(test).toEqual(true);
    });
    it('does not allow the precison to be greater than 20', () => {
      const test = false;
      expect(test).toEqual(true);
    });
  });
  // DQ: DO THESE ACTUALLY GO HERE?!?!
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
