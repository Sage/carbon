import React from 'react';
import TestUtils from 'react-dom/test-utils';
import moment from 'moment';
import LocaleUtils from 'react-day-picker/moment';
import I18n from 'i18n-js';
import { shallow, mount } from 'enzyme';
import Date from './date.component';
import DatePicker from './date-picker.component';

describe('Date', () => {
  let wrapper;

  describe('when autoFocus prop is defined', () => {
    it('does sets focus on the input', () => {
      wrapper = render({ autoFocus: true }, mount);
      const input = wrapper.find('input');
      const focusedElement = document.activeElement;
      expect(input.instance()).toBe(focusedElement);
    });
  });

  describe('when autoFocus prop is not defined', () => {
    it('does not sets focus on the input', () => {
      wrapper = render({}, mount);
      const input = wrapper.find('input');
      const focusedElement = document.activeElement;
      expect(input.instance()).not.toBe(focusedElement);
    });
  });

  describe('when the Component is updated', () => {
    let onBlurFn;

    beforeEach(() => {
      onBlurFn = jest.fn();
    });

    describe('with the same value', () => {
      it('then onBlur prop should not have been called', () => {
        wrapper = render({ onBlur: onBlurFn, value: '12/08/2019' });
        wrapper.setProps({ value: '12/08/2019' });
        expect(onBlurFn).not.toHaveBeenCalled();
      });
    });

    describe('with a different value', () => {
      beforeEach(() => {
        wrapper = render({ onBlur: onBlurFn, value: '12/08/2019' }, mount);
      });

      describe('and with blur not blocked', () => {
        it('then onBlur prop should not have been called', () => {
          wrapper.setProps({ value: '17/08/2019' });
          expect(onBlurFn).not.toHaveBeenCalled();
        });
      });

      describe('and with blur blocked', () => {
        it('then onBlur prop should have been called', () => {
          wrapper.instance().blockBlur();
          wrapper.setProps({ value: '17/08/2019' });
          expect(onBlurFn).toHaveBeenCalled();
        });
      });
    });
  });

  describe('when blur event is triggered on the input', () => {
    let onBlurFn;

    beforeEach(() => {
      onBlurFn = jest.fn();
      wrapper = render({ onBlur: onBlurFn }, mount);
    });

    describe('and with blur not blocked', () => {
      it('then onBlur prop should not have been called', () => {
        wrapper.instance().blockBlur();
        simulateBlurOnInput(wrapper);
        expect(onBlurFn).not.toHaveBeenCalled();
      });
    });

    describe('and with blur blocked', () => {
      it('then onBlur prop should have been called', () => {
        simulateBlurOnInput(wrapper);
        expect(onBlurFn).toHaveBeenCalled();
      });
    });

    function simulateBlurOnInput(container) {
      const input = container.find('input');
      input.simulate('blur');
    }
  });

  describe('when focus event is triggered on the input', () => {
    let onFocusFn;

    beforeEach(() => {
      onFocusFn = jest.fn();
      wrapper = render({ onFocus: onFocusFn }, mount);
    });

    it('should render a DatePicker component', () => {
      simulateFocusOnInput(wrapper);
      expect(wrapper.find(DatePicker).exists()).toBe(true);
    });

    describe('and with blur blocked', () => {
      it('then onFocus prop should have been called', () => {
        simulateFocusOnInput(wrapper);
        expect(onFocusFn).toHaveBeenCalled();
      });
    });

    function simulateFocusOnInput(container) {
      const input = container.find('input');
      input.simulate('focus');
    }
  });
});

function render(props, renderer = shallow) {
  return renderer(<Date { ...props } />);
}
