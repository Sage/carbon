import React from 'react';
import TestUtils from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer';
import moment from 'moment';
import LocaleUtils from 'react-day-picker/moment';
import I18n from 'i18n-js';
import DayPickerStyle from './day-picker.style';
import DateHelper from './../../utils/helpers/date';
import Date from './date';
import Portal from './../portal';
import Events from './../../utils/helpers/events';
import { shallow, mount } from 'enzyme';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';
import classicTheme from '../../style/themes/classic';

describe('Date', () => {
  let instance, wrapper;
  let today = moment().format("DD/MM/YYYY");
  let hiddenToday = moment().format("YYYY-MM-DD");

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Date name='date' label='Date' />
    );
  });

  describe('initialize', () => {
    it('sets the initial internal state', () => {
      expect(instance.state.open).toBeFalsy();
      expect(instance.state.datePickerValue).toBeNull();
      expect(instance.state.visibleValue).toEqual(today);
    });
  });

  describe('lifecycle', () => {
    describe('componentWillReceiveProps', () => {
      beforeEach(() => {
        spyOn(instance, 'setState');
      });

      describe('when element has focus', () => {
        it('does not change the state', () => {
          instance._document = { activeElement: instance._input }
          instance.componentWillReceiveProps({});
          expect(instance.setState).not.toHaveBeenCalled();
        });
      });

      describe('when element does not have focus', () => {
        it('calls set state with to set the date', () => {
          instance.componentWillReceiveProps({ date: today });
          expect(instance.setState).toHaveBeenCalledWith({ visibleValue: today });
        });
      });
    });

    describe('componentDidMount', () => {
      describe('if not autoFocus', () => {
        it('does not set focus on the input', () => {
          spyOn(instance._input, 'focus');
          instance.componentDidMount();
          expect(instance._input.focus).not.toHaveBeenCalled();
        });
      });

      describe('if autoFocus', () => {
        it('does sets focus on the input', () => {
          instance = TestUtils.renderIntoDocument(<Date autoFocus />);
          spyOn(instance._input, 'focus');
          instance.componentDidMount();
          expect(instance._input.focus).toHaveBeenCalled();
        });
      });
    });

    describe('componentDidUpdate', () => {
      beforeAll(() => {
        instance = TestUtils.renderIntoDocument(
          <Date name='date' label='Date' value='foo' />
        );
      });

      describe('when the if condition is true', () => {
        beforeEach(() => {
          spyOn(instance, '_handleBlur');
          spyOn(instance, 'datePickerValueChanged').and.returnValue(true);
          instance.componentDidUpdate({ value: 'bar'})
        });

        it('checks whether the value has changed', () => {
          expect(instance.datePickerValueChanged).toHaveBeenCalled();
        });

        it('sets blockBlur to false', () => {
          expect(instance.blockBlur).toBeFalsy();
        });

        it('calls handleBlur', () => {
          expect(instance._handleBlur).toHaveBeenCalled();
        });
      });
    });
  });

  describe('datePickerValueChanged', () => {
    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <Date name='date' label='Date' value='foo' />
      );
      instance.blockBlur = true;
    });

    it('returns true if the date picker value has changed', () => {
      expect(instance.datePickerValueChanged({ value: 'bar' })).toBeTruthy();
    });

    it('returns false is the date picker has not changed', () => {
      expect(instance.datePickerValueChanged({ value: 'foo' })).toBeFalsy();
    });
  });

  describe('emitOnChangeCallback', () => {
    let date;

    describe('on valid value', () => {
      beforeEach(() => {
        spyOn(instance, '_handleOnChange');
        date = moment().add(10, 'days').format('YYYY-MM-DD');
        instance.emitOnChangeCallback(date);
      });

      it('sets the hiddenField to the new date', () => {
        expect(instance.hidden.value).toEqual(date);
      });

      it('triggers the onChange handler in the input decorator', () => {
        expect(instance._handleOnChange).toHaveBeenCalledWith({ target: instance.hidden });
      });
    });

    describe('on invalid date input', () => {
      beforeEach(() => {
        spyOn(instance, '_handleOnChange');
        instance.emitOnChangeCallback('abc');
      });

      it('triggers _handleOnChange with the invalid value', () => {
        const value = instance._handleOnChange.calls.mostRecent().args[0].target.value;
        expect(value).toEqual('abc');
      });
    });
  });

  describe('openDatePicker', () => {
    let spy;

    beforeEach(() => {
      spy = jasmine.createSpy('spy');
      instance._document = { addEventListener: spy };

      spyOn(instance, 'setState');
      instance.openDatePicker();
    });

    it('adds a eventListener to the document', () => {
      expect(spy).toHaveBeenCalledWith('click', instance.closeDatePicker);
    });

    it('calls set state to open the view and set the view date', () => {
      expect(instance.setState).toHaveBeenCalledWith({ open: true })
    });

    describe('date validity', () => {
      describe('when a valid date', () => {
        it('calls set state setting the datePickerValue to be the valid date', () => {
          instance = TestUtils.renderIntoDocument(
            <Date name='date' value='2015-01-01' label='Date' />
          );
          spyOn(instance, 'setState');
          instance.openDatePicker();
          expect(instance.setState).toHaveBeenCalledWith(
            { datePickerValue: DateHelper.stringToDate('2015-01-01') }
          );
        });
      });

      describe('when date invalid', () => {
        it('does not call setState', () => {
          instance = TestUtils.renderIntoDocument(
            <Date name='date' value='x' label='Date' />
          );
          spyOn(instance, 'setState');
          instance.openDatePicker();
          expect(instance.setState).not.toHaveBeenCalledWith({ datePickerValue: 'x' });
        });
      });
    });
  });

  describe('closeDatePicker', () => {
    let spy;

    beforeEach(() => {
      spy = jasmine.createSpy('spy');
      instance._document = { removeEventListener: spy };

      spyOn(instance, 'setState');
      instance.closeDatePicker();
    });

    it('removes a eventListener to the document', () => {
      expect(spy).toHaveBeenCalledWith('click', instance.closeDatePicker);
    });

    it('calls set state to open the view and set the view date', () => {
      expect(instance.setState).toHaveBeenCalledWith({ open: false })
    });
  });


  describe('updateVisibleValue', () => {
    it('calls set state with the calculated value', () => {
      spyOn(instance, 'setState');
      instance.updateVisibleValue();

      expect(instance.setState).toHaveBeenCalledWith({ visibleValue: today });
    });
  });

  describe('handleVisibleInputChange', () => {
    beforeEach(() => {
      spyOn(instance, 'setState').and.callThrough();
    });

    it('is triggered when visible input changes', () => {
      spyOn(instance, 'emitOnChangeCallback')
      TestUtils.Simulate.change(instance._input);

      expect(instance.emitOnChangeCallback).toHaveBeenCalledWith(hiddenToday);
      expect(instance.setState).toHaveBeenCalledWith({
        visibleValue: today,
        datePickerValue: DateHelper.stringToDate(hiddenToday)
      });
    });

    describe('valid dates', () => {
      let noOfDays = 300;
      let hiddenDate = moment().add(noOfDays, 'days').format('YYYY-MM-DD');

      it('accepts the format DD MMM YYYY', () => {
        let date = moment().add(noOfDays, 'days').format('DD MMM YYYY');
        instance.handleVisibleInputChange({ target: { value: date } });
        expect(instance.setState).toHaveBeenCalledWith({
          visibleValue: date,
          datePickerValue: DateHelper.stringToDate(hiddenDate)
        });
      });

      it('accepts the format DD-MM', () => {
        let date = moment().format('DD-MM');
        instance.handleVisibleInputChange({ target: { value: date } });
        expect(instance.setState).toHaveBeenCalledWith({
          visibleValue: date,
          datePickerValue: DateHelper.stringToDate(hiddenToday)
        });
      });

      it('accepts the format DD.MM.YYYY', () => {
        let date = moment().add(noOfDays, 'days').format('DD.MM.YYYY');
        instance.handleVisibleInputChange({ target: { value: date } });
        expect(instance.setState).toHaveBeenCalledWith({
          visibleValue: date,
          datePickerValue: DateHelper.stringToDate(hiddenDate)
        });
      });

      it('accepts the format DD-MM-YYYY', () => {
        let date = moment().add(noOfDays, 'days').format('DD-MM-YYYY');
        instance.handleVisibleInputChange({ target: { value: date } });
        expect(instance.setState).toHaveBeenCalledWith({
          visibleValue: date,
          datePickerValue: DateHelper.stringToDate(hiddenDate)
        });
      });

      describe('if the month changes and datepicker is open', () => {
        it('updates the month of the datepicker', () => {
          instance.setState({ open: true });
          spyOn(instance.datepicker, 'showMonth');
          let date = moment().add(1, 'months').format('DD-MM-YYYY');
          instance.handleVisibleInputChange({ target: { value: date } });
          expect(instance.datepicker.showMonth).toHaveBeenCalledWith(instance.state.datePickerValue);
          expect(instance.state.open).toBeTruthy();
        });
      });

      describe('if the year changes and datepicker is open', () => {
        it('updates the year of the datepicker', () => {
          instance.setState({ open: true });
          spyOn(instance.datepicker, 'showMonth');
          let date = moment().add(1, 'years').format('DD-MM-YYYY');
          instance.handleVisibleInputChange({ target: { value: date } });
          expect(instance.datepicker.showMonth).toHaveBeenCalledWith(instance.state.datePickerValue);
        });
      });
    });

    describe('when a invalid date is entered', () => {
      it('does not update the hidden value', () => {
        instance.handleVisibleInputChange({ target: { value: 'abc' } });
        expect(instance.setState).toHaveBeenCalledWith({
          visibleValue: 'abc'
        });
      });

      it("calls inputIconHTML with error in order to correctly generate the error icon", () => {
        let invalidDate = TestUtils.renderIntoDocument(<Date value='' />);
        spyOn(invalidDate, 'inputIconHTML');
        invalidDate.setState({ valid: false });
        expect(invalidDate.inputIconHTML).toHaveBeenCalledWith('error');
      });

      it("calls inputIconHTML with warning in order to correctly generate the warning icon", () => {
        let invalidDate = TestUtils.renderIntoDocument(<Date value='' />);
        spyOn(invalidDate, 'inputIconHTML');
        invalidDate.setState({ warning: true });
        expect(invalidDate.inputIconHTML).toHaveBeenCalledWith('warning');
      });

      it("calls inputIconHTML with info in order to correctly generate the info icon", () => {
        let invalidDate = TestUtils.renderIntoDocument(<Date value='' />);
        spyOn(invalidDate, 'inputIconHTML');
        invalidDate.setState({ info: true });
        expect(invalidDate.inputIconHTML).toHaveBeenCalledWith('info');
      });
    });
  });

  describe('handleDateSelect', () => {
    let wrapper, cell, portalContent;
    beforeEach(() => {
      wrapper = mount(
        <Date name='date' label='Date' />
      )
      wrapper.instance().getInputBoundingRect = jest.fn( () => ({left: 5, bottom: 10}) );

      wrapper.setState({open: true})
      wrapper.update();
      portalContent = wrapper.find(Date);
      cell = portalContent.find('.DayPicker-Day').first();
      instance = wrapper.instance();
    });

    it('sets blockBlur to true', () => {
      cell.simulate('click', { nativeEvent: { stopImmediatePropagation: () => {} } })
      expect(instance.blockBlur).toBeTruthy();
    });

    it('closes the date picker', () => {
      spyOn(instance, 'closeDatePicker');
      cell.simulate('click', { nativeEvent: { stopImmediatePropagation: () => {} } })
      expect(instance.closeDatePicker).toHaveBeenCalled();
    });

    it('emits a onChange callback', () => {
      spyOn(instance, 'emitOnChangeCallback')
      cell.simulate('click', { nativeEvent: { stopImmediatePropagation: () => {} } })
      expect(instance.emitOnChangeCallback).toHaveBeenCalled();
    });

    it('updates the visible value', () => {
      spyOn(instance, 'updateVisibleValue')
      cell.simulate('click', { nativeEvent: { stopImmediatePropagation: () => {} } })
      expect(instance.updateVisibleValue).toHaveBeenCalled();
    });

    it('positions the date picker under the input', () => {
      const style = portalContent.find('.DayPicker').props().style;
      expect(style.left).toEqual(5);
      expect(style.top).toEqual(10);
    });
  });

  describe('handleBlur', () => {
    it('updates the visible value', () => {
      spyOn(instance, 'updateVisibleValue');
      TestUtils.Simulate.blur(instance._input);
      expect(instance.updateVisibleValue).toHaveBeenCalled();
    });

    describe('when onBlur is set', () => {
      it('calls onBlur', () => {
        let onBlur = jasmine.createSpy('onBlur');

        instance = TestUtils.renderIntoDocument(<Date name='date' label='Date' onBlur={ onBlur } />);
        TestUtils.Simulate.blur(instance._input);
        expect(onBlur).toHaveBeenCalled();
      });
    });
  });

  describe('handleFocus', () => {
    beforeEach(() => {
      spyOn(instance, 'openDatePicker')
    });

    describe('when focus is blocked', () => {
      it('does not open the date picker', () => {
        instance.blockFocus = true;
        TestUtils.Simulate.focus(instance._input);
        expect(instance.openDatePicker).not.toHaveBeenCalled();
      });
    });

    describe('when focus is not blocked', () => {
      it('opens the date picker', () => {
        instance.blockFocus = false;
        TestUtils.Simulate.focus(instance._input);
        expect(instance.openDatePicker).toHaveBeenCalled();
      });
    });

    describe('when disabled', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(
          <Date name='date' label='Date' disabled />
        )
        spyOn(instance, 'openDatePicker')
        TestUtils.Simulate.focus(instance._input);
      });

      it('does not open the date picker', () => {
        expect(instance.openDatePicker).not.toHaveBeenCalled();
      });

      it('sets the input as disabled', () => {
        expect(instance._input.disabled).toEqual(true);
      })
    });

    describe('when readOnly', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(
          <Date name='date' label='Date' readOnly />
        )
        spyOn(instance, 'openDatePicker')
        TestUtils.Simulate.focus(instance._input);
      });

      it('does not open the date picker', () => {
        expect(instance.openDatePicker).not.toHaveBeenCalled();
      });

      it('sets the input as readonly', () => {
        expect(instance._input.readOnly).toEqual(true);
      });
    });
  });

  describe('handleKeyDown', () => {
    describe('when the tab key is pressed on a focused input', () => {
      it('closes the datepicker on tab out', () => {
        spyOn(Events, 'isTabKey').and.returnValue(true);
        spyOn(instance, 'closeDatePicker');
        TestUtils.Simulate.keyDown(instance._input, { keyCode: 9 });
        expect(instance.closeDatePicker).toHaveBeenCalled();
      });
    });

    describe('when any other key is pressed', () => {
      it('continues without closing the datepicker', () => {
        spyOn(Events, 'isTabKey').and.returnValue(false);
        spyOn(instance, 'closeDatePicker');
        TestUtils.Simulate.keyDown(instance._input, { keyCode: 12 });
        expect(instance.closeDatePicker).not.toHaveBeenCalled();
      });
    });
  });

  describe('datePickerProps', () => {
    let datepicker;

    beforeEach(() => {
      instance.setState({ open: true });
      datepicker = instance.datepicker;
    });

    it('sets the weekDays and format', () => {
      const datepickerProps = datepicker.props
      expect(datepickerProps.fixedWeeks).toBeTruthy();
      expect(datepickerProps.enableOutsideDays).toBeTruthy();
      expect(datepickerProps.inline).toBeTruthy();
      expect(datepickerProps.locale).toEqual(I18n.locale);
      expect(datepickerProps.localeUtils).toEqual(LocaleUtils);
    });
  });

  describe('inputProps', () => {
    it('sets the carbon-date__input class on the input', () => {
      expect(instance._input.classList[0]).toEqual('carbon-date__input');
    });

    it('sets the visible value', () => {
      expect(instance._input.value).toEqual(today);
    });
  });

  describe('hiddenInputProps', () => {
    it('sets the input as a hidden readOnly field', () => {
      expect(instance.hidden.type).toEqual('hidden');
      expect(instance.hidden.readOnly).toEqual(true);
    });

    describe('when value is not passed', () => {
      it('uses the defaultValue', () => {
        expect(instance.hidden.defaultValue).toEqual(hiddenToday);
      });
    });

    describe('when value is passed', () => {
      let value;
      let hidden;

      beforeEach(() => {
        value = moment().add(3, 'days').format('YYYY-MM-DD');

        instance = TestUtils.renderIntoDocument(
          <Date name='date' label='Date' value={ value } />
        )
      });

      it('sets the hidden value to props.value', () => {
        expect(instance.hidden.defaultValue).toEqual(value);
      });
    });

    describe('when minDate is passed', () => {
      let minDate;
      let date;
      beforeEach(() => {
        minDate = moment().subtract(3, 'days').format('YYYY-MM-DD');
        instance = TestUtils.renderIntoDocument(
          <Date name='date' label='Date' minDate={ minDate } />
        )
        instance.setState({ open: true });
        date = instance.datepicker;
      });

      it('sets the minDate to the correct value', () => {
        expect(date.props.disabledDays[0].before).toEqual(DateHelper.stringToDate(minDate));
      });
    });

    describe('when maxDate is passed', () => {
      let maxDate, date, wrapper;
      beforeEach(() => {
        maxDate = moment().add(3, 'days').format('YYYY-MM-DD');
        wrapper = mount(
          <Date name='date' label='Date' maxDate={ maxDate } />
        );
        instance = wrapper.instance();
        wrapper.setState({ open: true });
        wrapper.update();
        date = instance.datepicker;
      });

      it('sets the maxDate to the correct value', () => {
        expect(date.props.disabledDays[0].after).toEqual(DateHelper.stringToDate(maxDate));
      });

      it('does not close the date picker when a disabled day is clicked', () => {
        const portal = wrapper.find(Portal);
        const portalContent = wrapper.find(Date);
        const cell = portalContent.find('.DayPicker-Day--disabled').first();
        cell.simulate('click', { nativeEvent: { stopImmediatePropagation: () => {} } });
        expect(wrapper.state().open).toBeTruthy();
      });
    });
  });

  describe('mainClasses', () => {
    it('retuns a date class and common input decorated class', () => {
      expect(instance.mainClasses).toEqual('carbon-date common-input--with-icon common-input');
    });
  });

  describe('inputClasses', () => {
    it('retuns a date input class', () => {
      expect(instance.inputClasses).toEqual('carbon-date__input common-input__input');
    });
  });

  describe('render', () => {
    it('renders a parent div with a custom click method', () => {
      let spy = jasmine.createSpy('stopImmediatePropagation');
      let dateNode = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-date')
      TestUtils.Simulate.click(dateNode, { nativeEvent: { stopImmediatePropagation: spy } });
      expect(spy).toHaveBeenCalled();
    });

    it('renders a visible input', () => {
      let visibleInput = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input')[0]
      expect(visibleInput.classList[0]).toEqual('carbon-date__input');
    });

    it('renders a hidden input', () => {
      let visibleInput = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input')[1]
      expect(visibleInput.type).toEqual('hidden');
    });

    describe('when state.open is true', () => {
      it('renders a date picker', () => {
        instance.setState({ open: true });
        expect(instance.datepicker).toBeTruthy();
      });
    });

    describe('when state.open is false', () => {
      it('does not renders a date picker', () => {
        expect(instance.datepicker).toBeFalsy();
      });
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      let wrapper = shallow(<Date data-element='bar' data-role='baz' />);

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'date', 'bar', 'baz');
      });
    });

    describe("on internal elements", () => {
      let wrapper = shallow(<Date fieldHelp='test' label='test' />);

      elementsTagTest(wrapper, [
        'help',
        'input',
        'label'
      ]);
    });
  });

  describe('DayPickerStyle', () => {
    const render = (props) => {
      return TestRenderer.create(
        <DayPickerStyle { ...props }>
          sample children
        </DayPickerStyle>
      );
    };

    it('renders presentational div and context provider for its children', () => {
      expect(render({}, TestRenderer.create)).toMatchSnapshot();
    });

    describe('classic theme', () => {
      it('applies custom styling', () => {
        expect(render({ theme: classicTheme }, TestRenderer.create)).toMatchSnapshot();
      });
    });
  });
});
