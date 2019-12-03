import React from 'react';
import { shallow, mount } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import MockDate from 'mockdate';
import TestUtils from 'react-dom/test-utils';
import I18n from 'i18n-js';
import DateRange from './date-range.component';
import Textbox from '../textbox/textbox.component';
import { BaseDateInput } from '../date';
import DateRangeValidator from '../../../utils/validations/date-range';
import { elementsTagTest, rootTagTest } from '../../../utils/helpers/tags/tags-specs';
import StyledDateRange from './date-range.style';
import StyledDateInput from '../date/date.style';

jest.useFakeTimers();

describe('DateRange', () => {
  let wrapper, startInput, endInput, customOnChange, customOnBlur, wrapperInstance;

  beforeEach(() => {
    customOnChange = jasmine.createSpy();
    customOnBlur = jasmine.createSpy();

    wrapper = renderDateRange({
      onChange: customOnChange,
      onBlur: customOnBlur,
      value: ['2016-10-10', '2016-11-11'],
      'data-element': 'bar',
      'data-role': 'baz',
      name: 'foo',
      id: 'bar'
    }, mount);
    startInput = wrapper.find(BaseDateInput).at(0);
    endInput = wrapper.find(BaseDateInput).at(1);

    wrapperInstance = wrapper.instance();

    spyOn(startInput.instance(), 'handleBlur');
    spyOn(endInput.instance(), 'handleBlur');
  });

  describe('onChange', () => {
    describe('when the start date changes', () => {
      it('calls the passed in onChange function', () => {
        wrapper.find(BaseDateInput).at(0)
          .find('input').findWhere(n => n.props().type !== 'hidden')
          .simulate('change', { target: { value: '2016-10-15' } });
        expect(customOnChange).toHaveBeenCalledWith({
          target: {
            id: 'bar',
            name: 'foo',
            value: [
              { formattedValue: '15/10/2016', rawValue: '2016-10-15' },
              { formattedValue: '11/11/2016', rawValue: '2016-11-11' }
            ]
          }
        });
      });
    });

    describe('when the end date changes', () => {
      it('calls the passed in onChange function', () => {
        wrapper.find(BaseDateInput).at(1)
          .find('input').findWhere(n => n.props().type !== 'hidden')
          .simulate('change', { target: { value: '2016-11-16' } });

        expect(customOnChange).toHaveBeenCalledWith(
          {
            target: {
              id: 'bar',
              name: 'foo',
              value: [
                { formattedValue: '10/10/2016', rawValue: '2016-10-10' },
                { formattedValue: '16/11/2016', rawValue: '2016-11-16' }
              ]
            }
          }
        );
      });

      describe('when no onChange prop is passed in', () => {
        it('it does not call the passed in onChange function', () => {
          wrapper.setProps({ onChange: undefined });
          const spy = spyOn(wrapperInstance, 'buildCustomEvent');
          wrapper.find(BaseDateInput).at(0)
            .find('input').findWhere(n => n.props().type !== 'hidden')
            .simulate('change', { target: { value: '2016-11-16' } });

          expect(spy).not.toHaveBeenCalled();
        });
      });

      describe('when no onBlur prop is passed in', () => {
        it('it does not call the passed in onChange function', () => {
          wrapper.setProps({ onBlur: undefined });
          const spy = spyOn(wrapperInstance, 'buildCustomEvent');
          wrapperInstance._onBlur();
          expect(spy).not.toHaveBeenCalled();
        });
      });
    });

    describe('when the user interacts with a date input', () => {
      it('does not fire an onBlur event when the startDate is focused', () => {
        wrapper.instance().focusStart();
        wrapper.instance()._onBlur();
        expect(customOnBlur).not.toHaveBeenCalled();
      });

      it('does not fire an onBlur event when the endtDate is focused', () => {
        wrapper.instance().focusEnd();
        wrapper.instance()._onBlur();
        expect(customOnBlur).not.toHaveBeenCalled();
      });
    });

    describe('when the user updates the startDate textbox', () => {
      it('calls the passed in onBlur function', () => {
        wrapper.find(BaseDateInput).at(0)
          .find('input').findWhere(n => n.props().type !== 'hidden')
          .simulate('blur', { target: { value: '2016-10-15' } });
        jest.runAllTimers();
        expect(customOnBlur).toHaveBeenCalled();
      });
    });

    describe('when the user updates the endDate textbox', () => {
      it('calls the passed in onBlur function', () => {
        wrapper.find(BaseDateInput).at(1)
          .find('input').findWhere(n => n.props().type !== 'hidden')
          .simulate('blur', { target: { value: '2016-10-15' } });
        jest.runAllTimers();
        expect(customOnBlur).toHaveBeenCalled();
      });
    });

    describe.each([['start-date'], ['end-date']])('when changed to an invalid date', (date) => {
      beforeEach(() => {
        wrapper = renderDateRange({ onChange: customOnChange }, mount);
      });

      it('then the "forceUpdateTriggerToggle" prop should remain the same', () => {
        expect(checkForceUpdateProp(wrapper, 0)).toBe(false);
        expect(checkForceUpdateProp(wrapper, 1)).toBe(false);
        wrapper.find(`[data-element="${date}"]`)
          .find('input').findWhere(n => n.props().type !== 'hidden')
          .simulate('change', { target: { value: 'foo' } });
        expect(checkForceUpdateProp(wrapper, 0)).toBe(false);
        expect(checkForceUpdateProp(wrapper, 1)).toBe(false);
      });
    });

    describe.each([['start-date'], ['end-date']])('when changed to a valid date', (date) => {
      beforeEach(() => {
        wrapper = renderDateRange({ onChange: customOnChange }, mount);
      });

      it('then the "forceUpdateTriggerToggle" prop should be flipped', () => {
        expect(checkForceUpdateProp(wrapper, 0)).toBe(false);
        expect(checkForceUpdateProp(wrapper, 1)).toBe(false);
        wrapper.find(`[data-element="${date}"]`)
          .find('input').findWhere(n => n.props().type !== 'hidden')
          .simulate('change', { target: { value: '2016-10-15' } });
        expect(checkForceUpdateProp(wrapper, 0)).toBe(true);
        expect(checkForceUpdateProp(wrapper, 1)).toBe(true);
      });
    });
  });

  describe('startDate getter', () => {
    it('returns the start date', () => {
      expect(wrapperInstance.startDate).toEqual('2016-10-10');
    });
  });

  describe('endDate getter', () => {
    it('returns the end date', () => {
      expect(wrapperInstance.endDate).toEqual('2016-11-11');
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

      expect(wrapperInstance.startMessage).toEqual(I18n.t('errors.messages.date_range'));
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

      expect(wrapperInstance.endMessage).toEqual(I18n.t('errors.messages.date_range'));
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
      const spy = spyOn(endInput.instance(), 'closeDatePicker');
      wrapperInstance.focusStart();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('endDate', () => {
    it('closes the other datepicker', () => {
      const spy = spyOn(startInput.instance(), 'closeDatePicker');
      wrapperInstance.focusEnd();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('render', () => {
    beforeEach(() => {
      customOnChange = jasmine.createSpy();
      wrapper = renderDateRange({
        onChange: customOnChange,
        startDateProps: { label: 'From' },
        endDateProps: { label: 'To' }
      }, mount);

      startInput = wrapper.find(BaseDateInput).at(0);
      endInput = wrapper.find(BaseDateInput).at(1);
    });

    it('renders 2 date components', () => {
      expect(wrapper.find(BaseDateInput).length).toEqual(2);
    });

    it('renders optional labels inline', () => {
      expect(startInput.props().label).toEqual('From');
      expect(endInput.props().label).toEqual('To');
    });

    it('renders a DateRangeValidator with each Date component', () => {
      expect(startInput.props().validations[0]).toEqual(jasmine.any(DateRangeValidator));
      expect(endInput.props().validations[0]).toEqual(jasmine.any(DateRangeValidator));
    });
  });

  describe('start and end date props', () => {
    it('dates are enabled by default', () => {
      wrapper = renderDateRange({
        onChange: customOnChange,
        value: ['2016-10-10', '2016-11-11']
      }, mount);
      startInput = wrapper.find(BaseDateInput).at(0);
      endInput = wrapper.find(BaseDateInput).at(1);
      expect(startInput.props().disabled).toBeUndefined();
      expect(endInput.props().disabled).toBeUndefined();
    });

    it('dates can be disabled by passing startDateProps and endDateProps to DateRange', () => {
      wrapper = renderDateRange({
        onChange: customOnChange,
        startDateProps: { disabled: true },
        endDateProps: { disabled: true },
        value: []
      }, mount);
      startInput = wrapper.find(BaseDateInput).at(0);
      endInput = wrapper.find(BaseDateInput).at(1);
      expect(startInput.props().disabled).toEqual(true);
      expect(endInput.props().disabled).toEqual(true);
    });

    it('Date values can be set via startDateProps and endDateProps', () => {
      wrapper = renderDateRange({
        onChange: customOnChange,
        startDateProps: { value: '2016-10-10' },
        endDateProps: { value: '2016-11-11' },
        value: []
      }, mount);
      startInput = wrapper.find(BaseDateInput).at(0);
      endInput = wrapper.find(BaseDateInput).at(1);
      expect(startInput.props().value).toEqual('2016-10-10');
      expect(endInput.props().value).toEqual('2016-11-11');
    });

    it('value prop is retained for backward compatibility', () => {
      wrapper = renderDateRange({
        onChange: customOnChange,
        value: ['2015-10-10', '2015-11-11']
      }, mount);
      startInput = wrapper.find(BaseDateInput).at(0);
      endInput = wrapper.find(BaseDateInput).at(1);
      expect(startInput.props().value).toEqual('2015-10-10');
      expect(endInput.props().value).toEqual('2015-11-11');
    });

    it('value prop is overriden by startDateProps.value and endDateProps.value', () => {
      wrapper = renderDateRange({
        onChange: customOnChange,
        startDateProps: { value: '2016-10-10' },
        endDateProps: { value: '2016-11-11' }
      }, mount);
      startInput = wrapper.find(BaseDateInput).at(0);
      endInput = wrapper.find(BaseDateInput).at(1);
      expect(startInput.props().value).toEqual('2016-10-10');
      expect(endInput.props().value).toEqual('2016-11-11');
    });

    it('class names can be added to dates by passing startDateProps and endDateProps to DateRange', () => {
      wrapper = renderDateRange({
        onChange: customOnChange,
        startDateProps: { className: 'custom-start-class' },
        endDateProps: { className: 'custom-end-class' }
      }, mount);
      startInput = wrapper.find(BaseDateInput).at(0);
      endInput = wrapper.find(BaseDateInput).at(1);
      expect(startInput.props().className).toEqual('custom-start-class');
      expect(endInput.props().className).toEqual('custom-end-class');
    });

    it('validations can be added to dates by passing startDateProps and endDateProps to DateRange', () => {
      const mockValidationFunction = () => {};
      wrapper = renderDateRange({
        onChange: customOnChange,
        startDateProps: { validations: [mockValidationFunction] }
      }, mount);
      startInput = wrapper.find(BaseDateInput).at(0);
      endInput = wrapper.find(BaseDateInput).at(1);

      expect(startInput.props().validations.length).toEqual(2);
      expect(startInput.props().validations[1]).toEqual(mockValidationFunction);
      expect(endInput.props().validations.length).toEqual(1);
    });
  });

  describe('tags', () => {
    describe('on component', () => {
      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper.childAt(0), 'date-range', 'bar', 'baz');
      });
    });

    describe('on internal elements', () => {
      customOnChange = jasmine.createSpy();
      wrapper = renderDateRange({ onChange: customOnChange });

      elementsTagTest(wrapper, [
        'start-date',
        'end-date'
      ]);
    });
  });
});

describe('DateRange Uncontrolled behaviour', () => {
  const mockedTodayDate = '2019-04-01';

  beforeAll(() => {
    MockDate.set(mockedTodayDate);
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('renders the correct default value when defaultValue prop passed', () => {
    const defaultValue = ['2019-02-01', '2019-02-02'];
    const wrapper = renderDateRange({ value: undefined, defaultValue }, mount);

    expect(wrapper.find(Textbox).at(0).prop('rawValue')).toBe(defaultValue[0]);
    expect(wrapper.find(Textbox).at(1).prop('rawValue')).toBe(defaultValue[1]);
  });

  it('input values of both Date Inputs defaults to today date if none provided', () => {
    const wrapper = renderDateRange({ value: undefined }, mount);
    expect(wrapper.find(Textbox).at(0).prop('rawValue')).toBe(mockedTodayDate);
    expect(wrapper.find(Textbox).at(1).prop('rawValue')).toBe(mockedTodayDate);
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
      value={ ['2016-10-10', '2016-11-11'] }
      { ...props }
    />
  );
}

function checkForceUpdateProp(wrapper, dateInputNum) {
  return wrapper.find(BaseDateInput).at(dateInputNum).props().forceUpdateTriggerToggle;
}
