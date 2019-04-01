import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import I18n from 'i18n-js';
import DayPicker from 'react-day-picker';
import LocaleUtils from 'react-day-picker/moment';
import Browser from 'utils/helpers/browser';
import DateHelper from 'utils/helpers/date';
import Navbar from 'components/date/navbar/navbar';
import Portal from 'components/portal';

const DatePicker = (props) => {
  const window = Browser.getWindow();
  const [containerPosition, updateDatePickerPosition] = useState(getContainerPosition(window, props.input));
  const containerProps = {
    style: containerPosition,
    onClick: handleWidgetClick
  };
  const datepicker = useRef(null);

  const datePickerProps = {
    disabledDays: getDisabledDays(props.minDate, props.maxDate),
    enableOutsideDays: true,
    fixedWeeks: true,
    initialMonth: props.datePickerValue || DateHelper.stringToDate(props.input.value),
    inline: true,
    locale: I18n.locale,
    localeUtils: LocaleUtils,
    navbarElement: <Navbar />,
    onDayClick: props.handleDateSelect,
    selectedDays: [props.datePickerValue]
  };

  useEffect(() => {
    if (props.datePickerValue && monthOrYearHasChanged(datepicker, props.datePickerValue)) {
      datepicker.current.showMonth(props.datePickerValue);
    }
  });

  return (
    <Portal onReposition={ () => updateDatePickerPosition(getContainerPosition(window, props.input)) }>
      <DayPicker
        { ...datePickerProps } containerProps={ containerProps }
        ref={ datepicker }
      />
    </Portal>
  );
};

DatePicker.propTypes = {
  /** Minimum possible date */
  minDate: PropTypes.string,
  /** Maximum possible date */
  maxDate: PropTypes.string,
  input: PropTypes.object,
  datePickerValue: PropTypes.object,
  handleDateSelect: PropTypes.func
};

/**
 * Determines if the new date's month or year has changed from the currently selected.
 *
 * @method monthOrYearHasChanged
 * @param {Date}
 * @return {Boolean}
 */
function monthOrYearHasChanged(datepicker, newDate) {
  const currentDate = datepicker.current.state.currentMonth;

  return currentDate.getMonth() !== newDate.getMonth() || currentDate.getYear() !== newDate.getYear();
}

/**
 * Returns the disabled array of days specified by props maxDate and minDate
 *
 * @method getDisabledDays
 * @return {Array}
 */
function getDisabledDays(minDate, maxDate) {
  const days = [];

  if (!minDate && !maxDate) {
    return null;
  }

  if (minDate) {
    days.push({ before: DateHelper.stringToDate(minDate) });
  }

  if (maxDate) {
    days.push({ after: DateHelper.stringToDate(maxDate) });
  }

  return days;
}

/**
 * Returns the style for the DayPicker container
 *
 * @method containerPosition
 * @return {Object}
 */
function getContainerPosition(window, input) {
  const inputRect = input.getBoundingClientRect();
  const offsetY = window.pageYOffset;

  return {
    left: inputRect.left,
    top: inputRect.bottom + offsetY
  };
}

/**
 * Prevents propagation so date picker does not close on click inside the widget.
 *
 * @method handleWidgetClick
 * @param {Object} ev event
 * @return {void}
 */
function handleWidgetClick(ev) {
  ev.nativeEvent.stopImmediatePropagation();
}

export default DatePicker;
