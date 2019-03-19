import React from 'react';
import { mount } from 'enzyme';
import Number from './number.component';
import Textbox from '../textbox';

describe('Number Input', () => {
  let wrapper, input, onChangeDeferredFn, onChangeFn, onKeyDownFn;
  const selectionStart = 2;
  const selectionEnd = 4;
  const inputValue = '123456789';

  describe('when rendered', () => {
    it("should have the Textbox component as it's child", () => {
      wrapper = mount(<Number />);
      expect(wrapper.find(Textbox)).toHaveLength(1);
    });
  });

  describe("when it's input value is changed to", () => {
    describe.each([['an integer', '123456789'], ['a negative integer', '-123456789']])('%s', (desc, newValue) => {
      beforeEach(() => {
        onChangeFn = jest.fn();
        onChangeDeferredFn = jest.fn();
        jest.useFakeTimers();

        wrapper = mount(<Number
          value={ inputValue } onChange={ onChangeFn }
          onChangeDeferred={ onChangeDeferredFn }
        />);
      });

      it('calls the onChange method', () => {
        simulateInputChange(wrapper, newValue);
        expect(onChangeFn).toHaveBeenCalled();
      });

      it('the onChangeDeferred only after a default deferTimeout', () => {
        simulateInputChange(wrapper, newValue);
        expect(onChangeDeferredFn).not.toHaveBeenCalled();
        jest.runTimersToTime(750);
        expect(onChangeDeferredFn).toHaveBeenCalled();
      });

      it('calls the onChangeDeferred handler only after the deferTimeout', () => {
        const deferTimeoutVal = 1000;

        wrapper.setProps({ deferTimeout: deferTimeoutVal });
        simulateInputChange(wrapper, newValue);
        expect(onChangeDeferredFn).not.toHaveBeenCalled();
        jest.runTimersToTime(deferTimeoutVal);
        expect(onChangeDeferredFn).toHaveBeenCalled();
      });
    });

    describe.each(['10.5', 'abc'])('a non integer like %s', (newValue) => {
      let inputInstance;

      describe('with the value prop not defined', () => {
        beforeEach(() => {
          onChangeFn = jest.fn();

          wrapper = mount(<Number />);

          input = wrapper.find('input');
          inputInstance = input.instance();
          inputInstance.value = newValue;
          input.simulate('change');
        });

        it('input value should be an empty string', () => {
          expect(inputInstance.value).toBe('');
        });
      });

      describe('with the value prop defined', () => {
        beforeEach(() => {
          onChangeFn = jest.fn();
          jest.useFakeTimers();

          wrapper = mount(<Number value={ inputValue } onChange={ onChangeFn } />);

          setTextSelection(wrapper, selectionStart, selectionEnd);
          input = wrapper.find('input');
          inputInstance = input.instance();
          inputInstance.value = newValue;
          input.simulate('change');
        });

        it('does not call the onChange method', () => {
          expect(onChangeFn).not.toHaveBeenCalled();
        });

        describe('and when the value prop is defined', () => {
          it('input value is the same as in the prop', () => {
            expect(inputInstance.value).toEqual(inputValue);
          });

          it("input's selection start and end are the same as set in the component", () => {
            expect(inputInstance.selectionStart).toBe(selectionStart);
            expect(inputInstance.selectionEnd).toBe(selectionEnd);
          });
        });
      });
    });
  });

  describe("when a key is pressed on it's input", () => {
    let wrapperInstance, inputInstance;

    beforeEach(() => {
      onKeyDownFn = jest.fn();
      wrapper = mount(<Number value={ inputValue } onKeyDown={ onKeyDownFn } />);
      wrapperInstance = wrapper.instance();
      input = wrapper.find('input');
      inputInstance = input.instance();
      inputInstance.selectionStart = selectionStart;
      inputInstance.selectionEnd = selectionEnd;
      input.simulate('keyDown');
    });

    it('calls the onKeyDown prop method', () => {
      expect(onKeyDownFn).toHaveBeenCalled();
    });

    it("component's selection start and end should mirror the input ones", () => {
      expect(wrapperInstance.selectionStart).toBe(selectionStart);
      expect(wrapperInstance.selectionEnd).toBe(selectionEnd);
    });
  });
});

function simulateInputChange(wrapper, value) {
  const input = wrapper.find('input');
  input.instance().value = value;
  input.simulate('change');
}

function setTextSelection(wrapper, selectionStart, selectionEnd) {
  const wrapperInstance = wrapper.instance();
  wrapperInstance.selectionStart = selectionStart;
  wrapperInstance.selectionEnd = selectionEnd;
}
