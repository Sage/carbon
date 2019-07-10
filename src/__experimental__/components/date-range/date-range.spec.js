import React from 'react';
import { shallow, mount } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import TestUtils from 'react-dom/test-utils';
import I18n from 'i18n-js';
import DateRange from './date-range.component';
import Date from '../date';
import DateRangeValidator from '../../../utils/validations/date-range';
import { elementsTagTest, rootTagTest } from '../../../utils/helpers/tags/tags-specs';
import StyledDateRange from './date-range.style';
import StyledDateInput from '../date/date.style';

describe('DateRange', () => {
  let instance, customOnChange;

  beforeEach(() => {
    customOnChange = jasmine.createSpy();
    instance = TestUtils.renderIntoDocument(
      <DateRange onChange={ customOnChange } value={ ['2016-10-10', '2016-11-11'] } />
    );
    spyOn(instance._startDate, 'handleBlur');
    spyOn(instance._endDate, 'handleBlur');
  });

  describe('_onChange', () => {
    describe('when the start date changes', () => {
      it('calls the passed in onChange function', () => {
        instance._onChange('startDate', { target: { value: '2016-10-15' } });
        expect(customOnChange).toHaveBeenCalledWith(['2016-10-15', '2016-11-11']);
      });
    });

    describe('when the end date changes', () => {
      it('calls the passed in onChange function', () => {
        instance._onChange('endDate', { target: { value: '2016-11-16' } });
        expect(customOnChange).toHaveBeenCalledWith(['2016-10-10', '2016-11-16']);
      });
    });

    describe.each([['start-date'], ['end-date']])('when changed to an invalid date', (date) => {
      let wrapper;

      beforeEach(() => {
        wrapper = renderDateRange({}, mount);
      });

      it('then the "forceUpdateTriggerToggle" prop should remain the same', () => {
        expect(checkForceUpdateProp(wrapper, 0)).toBe(false);
        expect(checkForceUpdateProp(wrapper, 1)).toBe(false);
        wrapper.find(`[data-element="${date}"]`).find('input').simulate('change', { target: { value: 'foo' } });
        expect(checkForceUpdateProp(wrapper, 0)).toBe(false);
        expect(checkForceUpdateProp(wrapper, 1)).toBe(false);
      });
    });

    describe.each([['start-date'], ['end-date']])('when changed to a valid date', (date) => {
      let wrapper;

      beforeEach(() => {
        wrapper = renderDateRange({}, mount);
      });

      it('then the "forceUpdateTriggerToggle" prop should be flipped', () => {
        expect(checkForceUpdateProp(wrapper, 0)).toBe(false);
        expect(checkForceUpdateProp(wrapper, 1)).toBe(false);
        wrapper.find(`[data-element="${date}"]`).find('input').simulate('change', { target: { value: '2016-10-15' } });
        expect(checkForceUpdateProp(wrapper, 0)).toBe(true);
        expect(checkForceUpdateProp(wrapper, 1)).toBe(true);
      });
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
        const customInstance = TestUtils.renderIntoDocument(
          <DateRange
            onChange={ customOnChange }
            value={ ['2016-10-10', '2016-11-11'] }
            startMessage="That's in the past, live for the future"
          />
        );
        expect(customInstance.startMessage).toEqual("That's in the past, live for the future");
      });
    });

    describe('when no translation is available and no custom message was passed', () => {
      it('returns a default english sentence', () => {
        I18n.translations = {};

        const noMessageInstance = TestUtils.renderIntoDocument(
          <DateRange
            onChange={ customOnChange }
            value={ ['2016-10-10', '2016-11-11'] }
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
        const customInstance = TestUtils.renderIntoDocument(
          <DateRange
            onChange={ customOnChange }
            value={ ['2016-10-10', '2016-11-11'] }
            endMessage="That's in the future, live in the present"
          />
        );
        expect(customInstance.endMessage).toEqual("That's in the future, live in the present");
      });
    });

    describe('when no translation is available and no custom message was passed', () => {
      it('returns a default english sentence', () => {
        I18n.translations = {};

        const noMessageInstance = TestUtils.renderIntoDocument(
          <DateRange
            onChange={ customOnChange }
            value={ ['2016-10-10', '2016-11-11'] }
          />
        );
        expect(noMessageInstance.endMessage).toEqual('End date cannot be earlier than the start date');
      });
    });
  });

  describe('focusStart', () => {
    it('closes the other datepicker', () => {
      spyOn(instance._endDate, 'closeDatePicker');
      instance.focusStart();
      expect(instance._endDate.closeDatePicker).toHaveBeenCalled();
    });
  });

  describe('endDate', () => {
    it('closes the other datepicker', () => {
      spyOn(instance._startDate, 'closeDatePicker');
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
      const labelInstance = TestUtils.renderIntoDocument(
        <DateRange
          onChange={ customOnChange }
          value={ ['2016-10-10', '2016-11-11'] }
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
      const labelInstance = TestUtils.renderIntoDocument(
        <DateRange
          onChange={ customOnChange }
          value={ ['2016-10-10', '2016-11-11'] }
        />
      );
      const dates = TestUtils.scryRenderedComponentsWithType(labelInstance, Date);
      expect(dates[0].props.disabled).toBeUndefined();
      expect(dates[1].props.disabled).toBeUndefined();
    });

    it('dates can be disabled by passing startDateProps and endDateProps to DateRange', () => {
      const labelInstance = TestUtils.renderIntoDocument(
        <DateRange
          onChange={ customOnChange }
          value={ ['2016-10-10', '2016-11-11'] }
          startDateProps={ { disabled: true } }
          endDateProps={ { disabled: true } }
        />
      );
      const dates = TestUtils.scryRenderedComponentsWithType(labelInstance, Date);
      expect(dates[0].props.disabled).toEqual(true);
      expect(dates[1].props.disabled).toEqual(true);
    });

    it('Date values can be set via startDateProps and endDateProps', () => {
      const labelInstance = TestUtils.renderIntoDocument(
        <DateRange
          onChange={ customOnChange }
          startDateProps={ { value: '2016-10-10' } }
          endDateProps={ { value: '2016-11-11' } }
          value={ [] }
        />
      );

      const dates = TestUtils.scryRenderedComponentsWithType(labelInstance, Date);
      expect(dates[0].props.value).toEqual('2016-10-10');
      expect(dates[1].props.value).toEqual('2016-11-11');
    });

    it('value prop is retained for backward compatibility', () => {
      const labelInstance = TestUtils.renderIntoDocument(
        <DateRange
          onChange={ customOnChange }
          value={ ['2015-10-10', '2015-11-11'] }
        />
      );
      const dates = TestUtils.scryRenderedComponentsWithType(labelInstance, Date);
      expect(dates[0].props.value).toEqual('2015-10-10');
      expect(dates[1].props.value).toEqual('2015-11-11');
    });

    it('value prop is overriden by startDateProps.value and endDateProps.value', () => {
      const labelInstance = TestUtils.renderIntoDocument(
        <DateRange
          onChange={ customOnChange }
          value={ ['2015-10-10', '2015-11-11'] }
          startDateProps={ { value: '2016-10-10' } }
          endDateProps={ { value: '2016-11-11' } }
        />
      );
      const dates = TestUtils.scryRenderedComponentsWithType(labelInstance, Date);
      expect(dates[0].props.value).toEqual('2016-10-10');
      expect(dates[1].props.value).toEqual('2016-11-11');
    });

    it('class names can be added to dates by passing startDateProps and endDateProps to DateRange', () => {
      const labelInstance = TestUtils.renderIntoDocument(
        <DateRange
          onChange={ customOnChange }
          value={ ['2016-10-10', '2016-11-11'] }
          startDateProps={ { className: 'custom-start-class' } }
          endDateProps={ { className: 'custom-end-class' } }
        />
      );
      const dates = TestUtils.scryRenderedComponentsWithType(labelInstance, Date);
      expect(dates[0].props.className).toEqual('custom-start-class');
      expect(dates[1].props.className).toEqual('custom-end-class');
    });

    it('validations can be added to dates by passing startDateProps and endDateProps to DateRange', () => {
      const mockValidationFunction = () => {};
      const labelInstance = TestUtils.renderIntoDocument(
        <DateRange
          onChange={ customOnChange }
          value={ ['2016-10-10', '2016-11-11'] }
          startDateProps={ { validations: [mockValidationFunction] } }
        />
      );
      const dates = TestUtils.scryRenderedComponentsWithType(labelInstance, Date);
      expect(dates[0].props.validations.length).toEqual(2);
      expect(dates[0].props.validations[1]).toEqual(mockValidationFunction);
      expect(dates[1].props.validations.length).toEqual(1);
    });
  });

  describe('tags', () => {
    describe('on component', () => {
      const wrapper = renderDateRange({
        'data-element': 'bar',
        'data-role': 'baz'
      });

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'date-range', 'bar', 'baz');
      });
    });

    describe('on internal elements', () => {
      const wrapper = renderDateRange({});

      elementsTagTest(wrapper, [
        'start-date',
        'end-date'
      ]);
    });
  });
});

describe('StyledDateRange', () => {
  it('renders Date inputs correctly when the labels are inline', () => {
    const wrapper = TestRenderer.create(<StyledDateRange labelsInline><StyledDateInput /></StyledDateRange>);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders Date inputs correctly when the labels are not inline', () => {
    const wrapper = TestRenderer.create(<StyledDateRange><StyledDateInput /></StyledDateRange>);
    expect(wrapper).toMatchSnapshot();
  });
});

function renderDateRange(props, renderer = shallow) {
  return renderer(
    <DateRange
      onChange={ () => {} }
      value={ ['2016-10-10', '2016-11-11'] }
      { ...props }
    />
  );
}

function checkForceUpdateProp(wrapper, dateInputNum) {
  return wrapper.find(Date).at(dateInputNum).props().forceUpdateTriggerToggle;
}
