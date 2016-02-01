import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import moment from 'moment';
import Date from './date';
import Events from './../../utils/helpers/events';

describe('Date', () => {
  let instance;
  let today = moment().format("DD MMM YYYY");
  let hiddenToday = moment().format("YYYY-MM-DD");

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Date name='date' label='Date' />
    )
  });

  describe('intialize', () => {
    it('sets the intial internal state', () => {
      expect(instance.state.open).toBeFalsy();
      expect(instance.state.viewDate).toBeNull();
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
          instance._document = { activeElement: instance.refs.visible }
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
  });

  describe('emitOnChangeCallback', () => {
    let date;

    beforeEach(() => {
      spyOn(instance, '_handleOnChange');
      date = moment().add(10, 'days').format('YYYY-MM-DD');
      instance.emitOnChangeCallback(date);
    });

    it('sets the hiddenField to the new date', () => {
      expect(instance.refs.hidden.value).toEqual(date);
    });

    it('triggers the onChange handler in the input decorator', () => {
      expect(instance._handleOnChange).toHaveBeenCalledWith({ target: instance.refs.hidden });
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
      expect(instance.setState).toHaveBeenCalledWith({
        open: true,
        viewDate: instance.props.defaultValue
      })
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
      spyOn(instance, 'setState');
    });

    it('is triggered when visible input changes', () => {
      spyOn(instance, 'emitOnChangeCallback')
      TestUtils.Simulate.change(instance.refs.visible);

      expect(instance.emitOnChangeCallback).toHaveBeenCalledWith(hiddenToday);
      expect(instance.setState).toHaveBeenCalledWith({
        visibleValue: today,
        viewDate: hiddenToday
      });
    });

    describe('valid dates', () => {
      let noOfDays = 300;
      let hiddenDate = moment().add(noOfDays, 'days').format('YYYY-MM-DD');

      it('accepts the format DD MMM YYYY', () => {
        let date = moment().add(noOfDays, 'days').format('DD MMM YYYY');
        instance.handleVisibleInputChange({ target: { value: date } })
        expect(instance.setState).toHaveBeenCalledWith({
          visibleValue: date,
          viewDate: hiddenDate
        });
      });

      it('accepts the format MMM DD YY', () => {
        let date = moment().add(noOfDays, 'days').format('MMM DD YY');
        instance.handleVisibleInputChange({ target: { value: date } })
        expect(instance.setState).toHaveBeenCalledWith({
          visibleValue: date,
          viewDate: hiddenDate
        });
      });

      it('accepts the format DD-MM', () => {
        let date = moment().format('DD-MM');
        instance.handleVisibleInputChange({ target: { value: date } })
        expect(instance.setState).toHaveBeenCalledWith({
          visibleValue: date,
          viewDate: hiddenToday
        });
      });

      it('accepts the format DD-MM-YYYY', () => {
        let date = moment().add(noOfDays, 'days').format('DD-MM-YYYY');
        instance.handleVisibleInputChange({ target: { value: date } })
        expect(instance.setState).toHaveBeenCalledWith({
          visibleValue: date,
          viewDate: hiddenDate
        });
      });
    });

    describe('when a invalid date is entered', () => {
      it('does not update the hidden value', () => {
        instance.handleVisibleInputChange({ target: { value: 'abc' } })
        expect(instance.setState).toHaveBeenCalledWith({
          visibleValue: 'abc'
        });
      });
    });
  });

  describe('handleDateSelect', () => {
    beforeEach(() => {
      instance.setState({ open: true });
    });

    it('closes the date picker', () => {
      let spy = spyOn(instance, 'closeDatePicker')
      instance.refs.datepicker.handleChange();
      expect(instance.closeDatePicker).toHaveBeenCalled();
    });

    it('emits a onChange callback', () => {
      spyOn(instance, 'emitOnChangeCallback')
      instance.refs.datepicker.handleChange();
      expect(instance.emitOnChangeCallback).toHaveBeenCalledWith( hiddenToday );
    });

    it('updates the visible value', () => {
      spyOn(instance, 'updateVisibleValue')
      instance.refs.datepicker.handleChange();
      expect(instance.updateVisibleValue).toHaveBeenCalled();
    });
  });

  describe('handleBlur', () => {
    beforeEach(() => {
      spyOn(instance, 'updateVisibleValue');
      TestUtils.Simulate.blur(instance.refs.visible);
    });

    it('updates the visible value', () => {
      expect(instance.updateVisibleValue).toHaveBeenCalled();
    });
  });

  describe('handleFocus', () => {
    beforeEach(() => {
      spyOn(instance, 'openDatePicker')
      TestUtils.Simulate.focus(instance.refs.visible);
    });

    it('opens the date picker', () => {
      expect(instance.openDatePicker).toHaveBeenCalled();
    });

    describe('when disabled', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(
          <Date name='date' label='Date' disabled />
        )
        spyOn(instance, 'openDatePicker')
        TestUtils.Simulate.focus(instance.refs.visible);
      });

      it('does not open the date picker', () => {
        expect(instance.openDatePicker).not.toHaveBeenCalled();
      });
    });

    describe('when readOnly', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(
          <Date name='date' label='Date' readOnly />
        )
        spyOn(instance, 'openDatePicker')
        TestUtils.Simulate.focus(instance.refs.visible);
      });

      it('does not open the date picker', () => {
        expect(instance.openDatePicker).not.toHaveBeenCalled();
      });
    });
  });

  describe('handleViewDateChange', () => {
    it('sets the state of the viewDate', () => {
      spyOn(instance, 'setState');
      instance.handleViewDateChange(123);
      expect(instance.setState).toHaveBeenCalledWith({ viewDate: 123 });
    });
  });

  describe('handleKeyDown', () => {
    describe('when the tab key is pressed on a focused input', () => {
      it('closes the datepicker on tab out', () => {
        spyOn(Events, 'isTabKey').and.returnValue(true);
        spyOn(instance, 'closeDatePicker');
        TestUtils.Simulate.keyDown(instance.refs.visible, { keyCode: 9 });
        expect(instance.closeDatePicker).toHaveBeenCalled();
      });
    });

    describe('when any other key is pressed', () => {
      it('continues without closing the datepicker', () => {
        spyOn(Events, 'isTabKey').and.returnValue(false);
        spyOn(instance, 'closeDatePicker');
        TestUtils.Simulate.keyDown(instance.refs.visible, { keyCode: 12 });
        expect(instance.closeDatePicker).not.toHaveBeenCalled();
      });
    });
  });

  describe('datePickerProps', () => {
    let datepicker;

    beforeEach(() => {
      instance.setState({ open: true });
      datepicker = instance.refs.datepicker;
    });

    it('sets the weekDays and format', () => {
      expect(datepicker.props.weekDayNames).toEqual(
        ['S', 'M', 'T', 'W', 'T', 'F', 'S']
      );
      expect(datepicker.props.monthFormat).toEqual('MMM');
      expect(datepicker.props.dateFormat).toEqual('YYYY-MM-DD');
    });
  });

  describe('inputProps', () => {
    it('sets the ui-date__input class on the input', () => {
      expect(instance.refs.visible.classList[0]).toEqual('ui-date__input');
    });

    it('sets the visible value', () => {
      expect(instance.refs.visible.value).toEqual(today);
    });
  });

  describe('hiddenInputProps', () => {
    it('sets the input as a hidden readOnly field', () => {
      expect(instance.refs.hidden.type).toEqual('hidden');
      expect(instance.refs.hidden.readOnly).toEqual(true);
    });

    describe('when value is not passed', () => {
      it('uses the defaultValue', () => {
        expect(instance.refs.hidden.defaultValue).toEqual(hiddenToday);
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
        expect(instance.refs.hidden.defaultValue).toEqual(value);
      });
    });
  });

  describe('mainClasses', () => {
    it('retuns a date class and common input decorated class', () => {
      expect(instance.mainClasses).toEqual('ui-date common-input--with-icon common-input');
    });
  });

  describe('inputClasses', () => {
    it('retuns a date input class', () => {
      expect(instance.inputClasses).toEqual('ui-date__input common-input__input');
    });
  });

  describe('render', () => {
    it('renders a parent div with a custom click method', () => {
      let spy = jasmine.createSpy('stopImmediatePropagation');
      let dateNode = TestUtils.findRenderedDOMComponentWithClass(instance, 'ui-date')
      TestUtils.Simulate.click(dateNode, { nativeEvent: { stopImmediatePropagation: spy } });
      expect(spy).toHaveBeenCalled();
    });

    it('renders a visible input', () => {
      let visibleInput = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input')[0]
      expect(visibleInput.classList[0]).toEqual('ui-date__input');
    });

    it('renders a hidden input', () => {
      let visibleInput = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input')[1]
      expect(visibleInput.type).toEqual('hidden');
    });

    describe('when state.open is true', () => {
      it('renders a date picker', () => {
        instance.setState({ open: true });
        expect(instance.refs.datepicker).toBeTruthy();
      });
    });

    describe('when state.open is false', () => {
      it('does not renders a date picker', () => {
        expect(instance.refs.datepicker).toBeFalsy();
      });
    });
  });
});
