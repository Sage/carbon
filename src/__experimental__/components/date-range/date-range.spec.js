import React from 'react';
import TestUtils from 'react-dom/test-utils';
import I18n from 'i18n-js';
import DateRange from './date-range';
import Date from '../date';
import DateRangeValidator from '../../../utils/validations/date-range';
import { shallow } from 'enzyme';
import { elementsTagTest, rootTagTest } from '../../../utils/helpers/tags/tags-specs';

describe('DateRange', () => {
  let instance, customOnChange;

  beforeAll(() => {
    customOnChange = jasmine.createSpy();

    instance = TestUtils.renderIntoDocument(
      <DateRange onChange={ customOnChange } value={ ['2016-10-10','2016-11-11'] } />
    );

    spyOn(instance._startDate, '_handleContentChange');
    spyOn(instance._startDate, '_handleBlur');

    spyOn(instance._endDate, '_handleContentChange');
    spyOn(instance._endDate, '_handleBlur');
  });

  describe('_onChange', () => {
    describe('when the start date changes', () => {
      it('calls the passed in onChange function', () => {
        instance._onChange('startDate', { target: { value: '2016-10-15' } });
        expect(customOnChange).toHaveBeenCalledWith(['2016-10-15', '2016-11-11']);
      });

      describe('when a valid date', () => {
        it('triggers a content change in the endDate field', () => {
          instance._onChange('startDate', { target: { value: '2016-10-15' } });
          expect(instance._endDate._handleContentChange).toHaveBeenCalled();
        });
      });

      describe('when a invalid date', () => {
        it('does not trigger a content change in the endDate field', () => {
          let invalidInstance = TestUtils.renderIntoDocument(
            <DateRange onChange={ customOnChange } value={ ['2016-10-10','foo'] } />
          );
          spyOn(invalidInstance._endDate, '_handleContentChange');
          invalidInstance._onChange('startDate', { target: { value: 'foo' } });
          expect(invalidInstance._endDate._handleContentChange).not.toHaveBeenCalled();
        });
      });
    });

    describe('when the end date changes', () => {
      it('calls the passed in onChange function', () => {
        instance._onChange('endDate', { target: { value: '2016-11-16' } });
        expect(customOnChange).toHaveBeenCalledWith(['2016-10-10', '2016-11-16']);
      });

      describe('when a valid date', () => {
        it('triggers a content change in the startDate field', () => {
          instance._onChange('endDate', { target: { value: '2016-11-16' } });
          expect(instance._startDate._handleContentChange).toHaveBeenCalled();
        });
      });

      describe('when a invalid date', () => {
        it('does not trigger a content change in the startDate field', () => {
          let invalidInstance = TestUtils.renderIntoDocument(
            <DateRange onChange={ customOnChange } value={ ['foo','2016-11-11'] } />
          );
          spyOn(invalidInstance._startDate, '_handleContentChange');
          invalidInstance._onChange('endDate', { target: { value: 'foo' } });
          expect(invalidInstance._startDate._handleContentChange).not.toHaveBeenCalled();
        });
      });
    });

    it('calls handleBlur on both date fields', () => {
      instance._onChange('startDate', { target: { value: '2016-10-15' } });
      expect(instance._startDate._handleBlur).toHaveBeenCalled();
      expect(instance._endDate._handleBlur).toHaveBeenCalled();
    });
  });

  describe('startDate getter', () => {
    it('returns the start date', () => {
      expect(instance.startDate).toEqual('2016-10-10');
    });
  });

  describe('endDate getter', () => {
    it('returns the end date', () => {
      expect(instance.endDate).toEqual('2016-11-11');
    });
  });

  describe('startMessage getter', () => {
    it('returns a default message', () => {
      I18n.translations = {
        en: {
          errors: {
            messages: {
              date_range: 'start date cannot be earlier than end date'
            }
          }
        }
      };

      expect(instance.startMessage).toEqual(I18n.t('errors.messages.date_range'));
    });

    describe('when a custom message is provided', () => {
      it('returns the custom message', () => {
        let customInstance = TestUtils.renderIntoDocument(
          <DateRange
            onChange={ customOnChange }
            value={ ['2016-10-10','2016-11-11'] }
            startMessage="That's in the past, live for the future"
          />
        );
        expect(customInstance.startMessage).toEqual("That's in the past, live for the future");
      });
    });

    describe('when no translation is available and no custom message was passed', () => {
      it('returns a default english sentence', () => {
        I18n.translations = {};

        let noMessageInstance = TestUtils.renderIntoDocument(
          <DateRange
            onChange={ customOnChange }
            value={ ['2016-10-10','2016-11-11'] }
          />
        );
        expect(noMessageInstance.startMessage).toEqual('Start date must not be later than the end date');
      });
    });
  });

  describe('endMessage getter', () => {
    it('returns a default message', () => {
      I18n.translations = {
        en: {
          errors: {
            messages: {
              date_range: 'start date cannot be earlier than end date'
            }
          }
        }
      };

      expect(instance.endMessage).toEqual(I18n.t('errors.messages.date_range'));
    });

    describe('when a custom message is provided', () => {
      it('returns the custom message', () => {
        let customInstance = TestUtils.renderIntoDocument(
          <DateRange
            onChange={ customOnChange }
            value={ ['2016-10-10','2016-11-11'] }
            endMessage="That's in the future, live in the present"
          />
        );
        expect(customInstance.endMessage).toEqual("That's in the future, live in the present");
      });
    });

    describe('when no translation is available and no custom message was passed', () => {
      it('returns a default english sentence', () => {
        I18n.translations = {};

        let noMessageInstance = TestUtils.renderIntoDocument(
          <DateRange
            onChange={ customOnChange }
            value={ ['2016-10-10','2016-11-11'] }
          />
        );
        expect(noMessageInstance.endMessage).toEqual('End date cannot be earlier than the start date');
      });
    });
  });

  describe('focusStart', () => {
    it('closes the other datepicker', () => {
      spyOn( instance._endDate, 'closeDatePicker');
      instance.focusStart();
      expect(instance._endDate.closeDatePicker).toHaveBeenCalled();
    });
  });

  describe('endDate', () => {
    it('closes the other datepicker', () => {
      spyOn( instance._startDate, 'closeDatePicker');
      instance.focusEnd();
      expect(instance._startDate.closeDatePicker).toHaveBeenCalled();
    });
  });

  describe('render', () => {
    let dates;

    beforeAll(() => {
      dates = TestUtils.scryRenderedComponentsWithType(instance, Date);
    });

    it('renders 2 date components', () => {
      expect(dates.length).toEqual(2);
    });

    it('renders optional labels inline', () => {
      let labelInstance = TestUtils.renderIntoDocument(
        <DateRange
          onChange={ customOnChange }
          value={ ['2016-10-10','2016-11-11'] }
          startLabel='From'
          endLabel='To'
        />
      );
      dates = TestUtils.scryRenderedComponentsWithType(labelInstance, Date);
      expect(dates[0].props.label).toEqual('From');
      expect(dates[1].props.label).toEqual('To');
    });

    it('renders a DateRangeValidator with each Date component', () => {
      expect(dates[0].props.validations[0]).toEqual(jasmine.any(DateRangeValidator));
      expect(dates[1].props.validations[0]).toEqual(jasmine.any(DateRangeValidator));
    });
  });

  describe('start and end date props', () => {
    it('dates are enabled by default', () => {
      let labelInstance = TestUtils.renderIntoDocument(
        <DateRange
          onChange={ customOnChange }
          value={ ['2016-10-10','2016-11-11'] }
        />
      );
      let dates = TestUtils.scryRenderedComponentsWithType(labelInstance, Date);
      expect(dates[0].props.disabled).toBeUndefined();
      expect(dates[1].props.disabled).toBeUndefined();
    });

    it('dates can be disabled by passing startDateProps and endDateProps to DateRange', () => {
      let labelInstance = TestUtils.renderIntoDocument(
        <DateRange
          onChange={ customOnChange }
          value={ ['2016-10-10','2016-11-11'] }
          startDateProps={ { disabled: true } }
          endDateProps={ { disabled: true } }
        />
      );
      let dates = TestUtils.scryRenderedComponentsWithType(labelInstance, Date);
      expect(dates[0].props.disabled).toEqual(true);
      expect(dates[1].props.disabled).toEqual(true);
    });

    it('Date values can be set via startDateProps and endDateProps', () => {
      let labelInstance = TestUtils.renderIntoDocument(
        <DateRange
          onChange={ customOnChange }
          startDateProps={ { value: '2016-10-10' } }
          endDateProps={ { value: '2016-11-11'  } }
          value={ [] }
        />
      );

      let dates = TestUtils.scryRenderedComponentsWithType(labelInstance, Date);
      expect(dates[0].props.value).toEqual('2016-10-10');
      expect(dates[1].props.value).toEqual('2016-11-11');
    });

    it('value prop is retained for backward compatibility', () => {
      let labelInstance = TestUtils.renderIntoDocument(
        <DateRange
          onChange={ customOnChange }
          value={ ['2015-10-10','2015-11-11'] }
        />
      );
      let dates = TestUtils.scryRenderedComponentsWithType(labelInstance, Date);
      expect(dates[0].props.value).toEqual('2015-10-10');
      expect(dates[1].props.value).toEqual('2015-11-11');
    });

    it('value prop is overriden by startDateProps.value and endDateProps.value', () => {
      let labelInstance = TestUtils.renderIntoDocument(
        <DateRange
          onChange={ customOnChange }
          value={ ['2015-10-10','2015-11-11'] }
          startDateProps={ { value: '2016-10-10' } }
          endDateProps={ { value: '2016-11-11'  } }
        />
      );
      let dates = TestUtils.scryRenderedComponentsWithType(labelInstance, Date);
      expect(dates[0].props.value).toEqual('2016-10-10');
      expect(dates[1].props.value).toEqual('2016-11-11');
    });

    it('default classNames are applied to start and end dates if none are explicitly specified', () => {
      let labelInstance = TestUtils.renderIntoDocument(
        <DateRange
          onChange={ customOnChange }
          value={ ['2016-10-10','2016-11-11'] }
        />
      );
      let dates = TestUtils.scryRenderedComponentsWithType(labelInstance, Date);
      expect(dates[0].props.className).toEqual('carbon-date-range carbon-date-range__start');
      expect(dates[1].props.className).toEqual('carbon-date-range carbon-date-range__end');
    });

    it('class names can be added to dates by passing startDateProps and endDateProps to DateRange', () => {
      let labelInstance = TestUtils.renderIntoDocument(
        <DateRange
          onChange={ customOnChange }
          value={ ['2016-10-10','2016-11-11'] }
          startDateProps={ { className: 'custom-start-class' } }
          endDateProps={ { className: 'custom-end-class' } }
        />
      );
      let dates = TestUtils.scryRenderedComponentsWithType(labelInstance, Date);
      expect(dates[0].props.className).toEqual('carbon-date-range carbon-date-range__start custom-start-class');
      expect(dates[1].props.className).toEqual('carbon-date-range carbon-date-range__end custom-end-class');
    });

    it('validations can be added to dates by passing startDateProps and endDateProps to DateRange', () => {
      let labelInstance = TestUtils.renderIntoDocument(
        <DateRange
          onChange={ customOnChange }
          value={ ['2016-10-10','2016-11-11'] }
          startDateProps={ { validations: ['custom validation'] } }
        />
      );
      let dates = TestUtils.scryRenderedComponentsWithType(labelInstance, Date);
      expect(dates[0].props.validations.length).toEqual(2);
      expect(dates[0].props.validations[1]).toEqual('custom validation');
      expect(dates[1].props.validations.length).toEqual(1);
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      let wrapper = shallow(
        <DateRange
          data-element='bar'
          onChange={ () => {} }
          data-role='baz'
          value={ ['2016-10-10','2016-11-11'] }
        />
      );

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'date-range', 'bar', 'baz');
      });
    });

    describe("on internal elements", () => {
      let wrapper = shallow(<DateRange onChange={ () => {} } value={ ['2016-10-10','2016-11-11'] } />);

      elementsTagTest(wrapper, [
        'start-date',
        'end-date'
      ]);
    });
  });
});
