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
    it('prevents default when value string at max length', () => {
      const preventDefault = jest.fn();
      input.simulate('keypress', { preventDefault });
      expect(preventDefault).toHaveBeenCalled();
    });
    it('does not prevent default when value string  less than max length', () => {
      const preventDefault = jest.fn();
      instance = mountComponent({
        separator, groups: basicGroupConfig, value: '123', onChange
      });
      input = instance.find('input');
      input.simulate('keypress', { preventDefault });
      expect(preventDefault).not.toHaveBeenCalled();
    });
    it('allows keydown events', () => {
      const setSelectionRange = jest.fn();
      jest.useFakeTimers();

      input.simulate('change', { target: { selectionEnd: 1, value: '123', setSelectionRange } });
      jest.runAllTimers();
      expect(setSelectionRange).toHaveBeenCalledWith(1, 1);

      input.simulate('change', { target: { selectionEnd: 3, value: '123', setSelectionRange } });
      jest.runAllTimers();
      expect(setSelectionRange).toHaveBeenCalledWith(4, 4);

      input.simulate('keydown', { which: 8 });

      input.simulate('change', { target: { selectionEnd: 1, value: '123', setSelectionRange } });
      jest.runAllTimers();
      expect(setSelectionRange).toHaveBeenCalledWith(1, 1);

      input.simulate('change', { target: { selectionEnd: 3, value: '123', setSelectionRange } });
      jest.runAllTimers();
      expect(setSelectionRange).toHaveBeenCalledWith(2, 2);
    });
  });
});
