import React from 'react';
import { mount } from 'enzyme';
import GroupedCharacter from '.';

const mountComponent = props => mount(<GroupedCharacter { ...props } />);

describe('GroupedCharacter', () => {
  const basicGroupConfig = [2, 2, 4],
      separator = '-',
      valueString = '12345678';
  let instance, input, onChange;

  describe('functionality', () => {
    beforeEach(() => {
      onChange = jest.fn();

      instance = mountComponent({
        separator, groups: basicGroupConfig, value: valueString, onChange
      });
      input = instance.find('input');
    });

    it('takes configuration for how text should be grouped', () => {
      expect(input.props().value).toEqual('12-34-5678');
    });
    it('emits an unformatted string', () => {
      input.simulate('change', { target: { value: '123456' } });
      expect(onChange).toHaveBeenCalledWith({ target: { value: '123456' } });
    });
    it('does not allow values of length greater than that allowed by the group config', () => {
      instance = mountComponent({
        separator, groups: basicGroupConfig, value: '1234567890', onChange
      });
      input = instance.find('input');
      expect(input.props().value).toEqual('12-34-5678');
    });
    it('formats the input value correctly when deleting characters next to separator', () => {
      instance = mountComponent({
        separator, groups: basicGroupConfig, value: '12345', onChange
      });
      input = instance.find('input');
      input.simulate('keypress', { which: 46 });
      expect(input.props().value).toEqual('12-34-5');
    });
    it('prevents default if ', () => {
      input.simulate('keypress', { which: 46 });
      expect(input.props().value).toEqual('12-34-5');
    });
  });
});
