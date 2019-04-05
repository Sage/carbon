import moment from 'moment';
import React from 'react';
import { mount, shallow } from 'enzyme';
import DayPicker from 'react-day-picker';
import Portal from '../../../components/portal/portal';
import DatePicker from './date-picker.component';

const inputElement = { value: '12-12-2012', getBoundingClientRect: () => ({ left: 0, bottom: 0 }) };

describe('DatePicker', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render({ inputElement, minDate: '2019-02-02', maxDate: '2019-02-08' }, mount);
  });

  it('should render a Portal component', () => {
    expect(wrapper.find(Portal)).toHaveLength(1);
  });

  it('should render a DayPicker component inside a Portal', () => {
    expect(wrapper.find(Portal).contains(DayPicker)).toBe(true);
  });

  it('should pass proper disabledDays prop to the DayPicker component', () => {
    const disabledDays = [{ before: moment('2019-02-02').toDate() }, { after: moment('2019-02-08').toDate() }];
    expect(wrapper.find(DayPicker).props().disabledDays).toEqual(disabledDays);
  });

  describe('when an input field value is changed', () => {
    it('should');
    expect();
  });
});

function render(props, renderer = shallow) {
  return renderer(<DatePicker { ...props } />);
}
