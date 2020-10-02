import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import I18n from 'i18n-js';
import 'react-day-picker/lib/style.css';
import LocaleUtils from 'react-day-picker/moment';
import DayPicker from 'react-day-picker';
import DateHelper from '../../../utils/helpers/date/date';
import Navbar from './navbar';
import Weekday from './weekday';
import StyledDayPicker from './day-picker.style';

const DatePicker = (props) => {
  const [currentInputDate, setCurrentInputDate] = useState(isoFormattedValueString(props.inputDate));
  const datepicker = useRef(null);

  useEffect(() => {
    const formattedDate = isoFormattedValueString(props.inputDate);
    const hasUpdated = currentInputDate !== formattedDate;
    if (hasUpdated) {
      datepicker.current.showMonth(DateHelper.stringToDate(formattedDate));
      setCurrentInputDate(formattedDate);
    }
  }, [props.inputDate, currentInputDate]);

  const handleDayClick = (selectedDate, modifiers) => {
    if (!modifiers.disabled) {
      props.handleDateSelect(selectedDate);
    }
  };

  const datePickerProps = {
    disabledDays: getDisabledDays(props.minDate, props.maxDate),
    enableOutsideDays: true,
    fixedWeeks: true,
    initialMonth: props.selectedDate || undefined,
    inline: true,
    locale: I18n.locale,
    localeUtils: LocaleUtils,
    navbarElement: <Navbar />,
    onDayClick: handleDayClick,
    selectedDays: props.selectedDate || undefined,
    weekdayElement: (weekdayElementProps) => {
      const { className, weekday, localeUtils } = weekdayElementProps;
      const weekdayLong = localeUtils.formatWeekdayLong(weekday);
      const weekdayShort = weekdayLong.substring(0, 3);

      return (
        <Weekday className={ className } title={ weekdayLong }>
          {weekdayShort}
        </Weekday>
      );
    }
  };

  return (
    <StyledDayPicker>
      <DayPicker { ...datePickerProps } ref={ datepicker } />
    </StyledDayPicker>
  );
};

DatePicker.propTypes = {
  /** Minimum possible date */
  minDate: PropTypes.string,
  /** Maximum possible date */
  maxDate: PropTypes.string,
  /* The string value in the date input */
  inputDate: PropTypes.string,
  /** Element that the DatePicker will be displayed under */
  inputElement: PropTypes.object.isRequired,
  /** Currently selected date */
  selectedDate: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  /** Callback to set selected date */
  handleDateSelect: PropTypes.func
};

function isoFormattedValueString(valueToFormat) {
  return DateHelper.formatValue(valueToFormat);
}

/**
 * Returns the disabled array of days specified by props maxDate and minDate
 */
function getDisabledDays(minDate, maxDate) {
  const days = [];

  if (!minDate && !maxDate) {
    return null;
  }

  if (minDate && checkIsoFormatAndLength(minDate)) {
    days.push({ before: DateHelper.stringToDate(minDate) });
  }

  if (maxDate && checkIsoFormatAndLength(maxDate)) {
    days.push({ after: DateHelper.stringToDate(maxDate) });
  }

  return days;
}

function checkIsoFormatAndLength(date) {
  if (date.length !== 10 || !DateHelper.isValidDate(date, { defaultValue: 'YYYY-MM-DD' })) {
    return false;
  }
  const array = date.split('-');
  return array.length === 3 && array[0].length === 4 && array[1].length === 2 && array[2].length === 2;
}

export default DatePicker;
