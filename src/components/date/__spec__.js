import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import moment from 'moment';
import Date from './index';

describe('Date', () => {
  let instance;
  let today = moment().format("DD MMM YYYY")

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Date label='Date' />
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
          instance.doc = { activeElement: instance.refs.visible }
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
    beforeEach(() => {
      spyOn(instance, 'setState');
      instance.openDatePicker();
    });


    it('adds a eventListener to the document', () => {
      spyOn(instance, 'closeDatePicker');
      TestUtils.Simulate.click(instance.doc)
      expect(instance.closeDatePicker).toHaveBeenCalled();
    });

    it('calls set state to open the view and set the view date', () => {
      expect(instance.setState).toHaveBeenCalledWith({
        open: true,
        viewDate: instance.props.defaultValue
      })
    });
  });

  describe('closeDatePicker', () => {
    beforeEach(() => {
      spyOn(instance, 'setState');
      instance.closeDatePicker();
    });

    it('removes a eventListener to the document', () => {
      // TODO: May pass but not working like openDatePicker addEvent
      spyOn(instance, 'closeDatePicker');
      TestUtils.Simulate.click(instance.doc)
      expect(instance.closeDatePicker).not.toHaveBeenCalled();
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
      let viewDate = moment().format('YYYY-MM-DD') 

      expect(instance.emitOnChangeCallback).toHaveBeenCalledWith(viewDate);
      expect(instance.setState).toHaveBeenCalledWith({ 
        visibleValue: today,
        viewDate: viewDate
      });
    });

    describe('valid dates', () => {
      let noOfDays = 300
      let hiddenDate = moment().add(noOfDays, 'days').format('YYYY-MM-DD');

      it('accepts the format DD MMM YYYY', () => {
        let date = moment().add(noOfDays, 'days').format('DD MMM YYY');
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
          // Doesn't have year so adding days may create inconsistent results
          viewDate: moment().format('YYYY-MM-DD')
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

  describe('handleWidgetClick', () => {
    it('stops immediate propagation of the event', () => {
      expect(1).toEqual(2);
    });
  });

  describe('handleDateSelect', () => {
    it('closes the date picker', => {

    });
    it('closes the date picker', => {

    });
    it('closes the date picker', => {

    });
  });
  describe('handleBlur', () => {

  });
  describe('handleFocus', () => {

  });
  describe('datePickerProps', () => {

  });
  describe('inputProps', () => {

  });
  describe('hiddenInputProps', () => {

  });
  describe('mainClasses', () => {

  });
  describe('inputClasses', () => {

  });
  describe('render', () => {

  });
});
