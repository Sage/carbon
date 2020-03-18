import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import I18n from 'i18n-js';
import 'react-day-picker/lib/style.css';
import LocaleUtils from 'react-day-picker/moment';
import DayPicker from 'react-day-picker';
import Browser from '../../../utils/helpers/browser/browser';
import DateHelper from '../../../utils/helpers/date/date';
import Portal from '../../../components/portal/portal';
import Navbar from './navbar';
import Weekday from './weekday';
import StyledDayPicker from './day-picker.style';

const DatePicker = (props) => {
  const window = Browser.getWindow();
  const [containerPosition, setContainerPosition] = useState(() => getContainerPosition(window, props.inputElement));
  const [currentInputDate, setCurrentInputDate] = useState(isoFormattedValueString(props.inputDate));
  const containerProps = {
    style: containerPosition
  };
  const datepicker = useRef(null);

  const datePickerProps = {
    disabledDays: getDisabledDays(props.minDate, props.maxDate),
    enableOutsideDays: true,
    fixedWeeks: true,
    initialMonth: props.selectedDate,
    inline: true,
    locale: I18n.locale,
    localeUtils: LocaleUtils,
    navbarElement: <Navbar />,
    onDayClick: handleDayClick,
    selectedDays: [props.selectedDate],
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

  useEffect(() => {
    if (hasComponentUpdated()) {
      const updatedDate = isoFormattedValueString(props.inputDate);
      datepicker.current.showMonth(DateHelper.stringToDate(updatedDate));
      setCurrentInputDate(updatedDate);
    }
  }, [props.inputDate, currentInputDate, containerPosition, hasComponentUpdated]);

  function handleDayClick(selectedDate, modifiers) {
    if (!modifiers.disabled) {
      props.handleDateSelect(selectedDate);
    }
  }

  function hasComponentUpdated() {
    const propDate = isoFormattedValueString(props.inputDate);
    return props.inputDate && currentDateHasChanged(currentInputDate, propDate);
  }

  return (
    <Portal onReposition={ () => setContainerPosition(getContainerPosition(window, props.inputElement)) }>
      <StyledDayPicker>
        <DayPicker
          { ...datePickerProps }
          containerProps={ containerProps }
          ref={ datepicker }
        />
      </StyledDayPicker>
    </Portal>
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
  selectedDate: PropTypes.object,
  /** Callback to set selected date */
  handleDateSelect: PropTypes.func
};

function currentDateHasChanged(currentDate, newDate) {
  return currentDate !== newDate;
}

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

/**
 * Returns the style for the DayPicker container
 */
function getContainerPosition(window, input) {
  const inputRect = input.getBoundingClientRect();
  const offsetY = window.pageYOffset;

  return {
    left: inputRect.left,
    top: inputRect.bottom + offsetY
  };
}

export default DatePicker;
