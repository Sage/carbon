import moment from 'moment';
import MockDate from 'mockdate';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import { shallow, mount } from 'enzyme';
import DayPicker from 'react-day-picker';
import Portal from '../../../components/portal/portal';
import DatePicker from './date-picker.component';
import StyledDayPicker from './day-picker.style';
import classicTheme from '../../../style/themes/classic';

const inputElement = { value: '12-12-2012', getBoundingClientRect: () => ({ left: 0, bottom: 0 }) };
const firstDate = '2019-02-02';
const secondDate = '2019-02-08';
const currentDate = moment().toDate();

describe('DatePicker', () => {
  let wrapper;

  describe('when rendered with an "inputElement" prop', () => {
    beforeEach(() => {
      wrapper = render({ selectedDate: currentDate, inputElement });
    });

    it('should render a "Portal" component', () => {
      expect(wrapper.find(Portal).exists()).toBe(true);
    });

    it('should render a "DayPicker" component inside a "Portal"', () => {
      expect(wrapper.find(Portal).find(DayPicker).exists()).toBe(true);
    });
  });

  describe('when rendered with "minDate" prop', () => {
    beforeEach(() => {
      wrapper = render({ inputElement, minDate: firstDate });
    });

    it(`should pass to the "DayPicker" component the "disabledDays" 
        prop containing an object with "before" property`, () => {
      const disabledDays = [{ before: moment(firstDate).toDate() }];
      expect(wrapper.find(DayPicker).props().disabledDays).toEqual(disabledDays);
    });
  });

  describe('when rendered with "maxDate" prop', () => {
    beforeEach(() => {
      wrapper = render({ inputElement, maxDate: secondDate });
    });

    it(`should pass to the "DayPicker" component the "disabledDays" 
        prop containing an object with "after" property`, () => {
      const disabledDays = [{ after: moment(secondDate).toDate() }];
      expect(wrapper.find(DayPicker).props().disabledDays).toEqual(disabledDays);
    });
  });

  describe('when rendered with both "minDate" and "maxDate" props', () => {
    beforeEach(() => {
      wrapper = render({ inputElement, minDate: firstDate, maxDate: secondDate });
    });

    it(`should pass to the "DayPicker" component the "disabledDays" 
        prop containing an object with both "before" and "after" properties`, () => {
      const disabledDays = [{ before: moment(firstDate).toDate() }, { after: moment(secondDate).toDate() }];
      expect(wrapper.find(DayPicker).props().disabledDays).toEqual(disabledDays);
    });
  });

  describe('when the "onDayClick" prop have been triggered', () => {
    let handleDateSelectFn;

    beforeEach(() => {
      handleDateSelectFn = jest.fn();
      wrapper = render({ selectedDate: currentDate, inputElement, handleDateSelect: handleDateSelectFn });
    });

    describe('without a disabled modifier', () => {
      it('then "handleDaySelect" prop should have been called with the same date', () => {
        wrapper.setProps({ selectedDate: moment(firstDate).toDate() });
        wrapper.find(DayPicker).prop('onDayClick')(moment(firstDate).toDate(), {});
        expect(handleDateSelectFn).toHaveBeenCalledWith(moment(firstDate).toDate());
      });
    });

    describe('with a disabled modifier', () => {
      it('then "handleDaySelect" prop should not have been called', () => {
        wrapper.find(DayPicker).prop('onDayClick')(moment(firstDate).toDate(), { disabled: true });
        expect(handleDateSelectFn).not.toHaveBeenCalled();
      });
    });
  });

  describe('when the "selectedDate" prop have been changed to a different date', () => {
    const selectedDate = moment(firstDate).toDate();

    beforeEach(() => {
      wrapper = render({ inputElement, selectedDate }, mount);
    });
  });
});

describe('StyledDayPicker', () => {
  beforeAll(() => {
    MockDate.set('4/3/2019');
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('renders presentational div and context provider for its children', () => {
    expect(renderStyledDayPicker({ value: '2019-04-01' })).toMatchSnapshot();
  });

  describe('classic theme', () => {
    it('applies custom styling', () => {
      expect(
        renderStyledDayPicker({ theme: classicTheme, value: '2019-04-01' })
      ).toMatchSnapshot();
    });
  });
});

function render(props, renderer = shallow) {
  return renderer(<DatePicker { ...props } />);
}

function renderStyledDayPicker(props) {
  return TestRenderer.create(<StyledDayPicker { ...props } />);
}
