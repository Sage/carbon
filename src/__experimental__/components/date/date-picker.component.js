import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import i18n from "i18next";
import "react-day-picker/lib/style.css";
import LocaleUtils from "react-day-picker/moment";
import DayPicker from "react-day-picker";

import Browser from "../../../utils/helpers/browser/browser";
import DateHelper from "../../../utils/helpers/date/date";
import StyledPortal from "../../../components/portal/portal.style";
import Navbar from "./navbar";
import Weekday from "./weekday";
import StyledDayPicker from "./day-picker.style";

const DatePicker = ({
  inputElement,
  inputDate,
  handleDateSelect,
  minDate,
  maxDate,
  selectedDate,
  disablePortal,
}) => {
  const window = Browser.getWindow();
  const [containerPosition, setContainerPosition] = useState(() =>
    getContainerPosition(window, inputElement)
  );

  const [lastValidDate, setLastValidDate] = useState(
    DateHelper.formatDateString(new Date().toString())
  );

  const datepicker = useRef(null);

  useEffect(() => {
    let monthDate;
    const isoFormattedInputDate = isoFormattedValueString(inputDate);

    if (isDateValid(isoFormattedInputDate)) {
      monthDate = new Date(isoFormattedInputDate);
      setLastValidDate(isoFormattedInputDate);
    } else {
      monthDate = new Date(lastValidDate);
    }

    datepicker.current.showMonth(monthDate);
  }, [inputDate, lastValidDate]);

  const handleDayClick = (date, modifiers) => {
    if (!modifiers.disabled) {
      handleDateSelect(date);
    }
  };

  const datePickerProps = {
    disabledDays: getDisabledDays(minDate, maxDate),
    enableOutsideDays: true,
    fixedWeeks: true,
    initialMonth: selectedDate || undefined,
    inline: true,
    locale: i18n.language,
    localeUtils: LocaleUtils,
    navbarElement: <Navbar />,
    onDayClick: handleDayClick,
    selectedDays: selectedDate || undefined,
    weekdayElement: (weekdayElementProps) => {
      const { className, weekday, localeUtils } = weekdayElementProps;
      const weekdayLong = localeUtils.formatWeekdayLong(weekday, i18n.language);
      const weekdayShort = localeUtils.formatWeekdayShort(
        weekday,
        i18n.language
      );

      return (
        <Weekday className={className} title={weekdayLong}>
          {weekdayShort}
        </Weekday>
      );
    },
  };

  const picker = (
    <StyledDayPicker>
      <DayPicker
        {...datePickerProps}
        containerProps={{ style: disablePortal ? {} : containerPosition }}
        ref={datepicker}
      />
    </StyledDayPicker>
  );

  if (disablePortal) {
    return picker;
  }

  return (
    <StyledPortal
      onReposition={() =>
        setContainerPosition(getContainerPosition(window, inputElement))
      }
    >
      {picker}
    </StyledPortal>
  );
};

DatePicker.propTypes = {
  /** Minimum possible date */
  minDate: PropTypes.string,
  /** Maximum possible date */
  maxDate: PropTypes.string,
  /** Boolean to toggle where DatePicker is rendered in relation to the Date Input */
  disablePortal: PropTypes.bool,
  /* The string value in the date input */
  inputDate: PropTypes.string,
  /** Element that the DatePicker will be displayed under */
  inputElement: PropTypes.object.isRequired,
  /** Currently selected date */
  selectedDate: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  /** Callback to set selected date */
  handleDateSelect: PropTypes.func,
};

/**
 * Checks if date can be transformed to native js Date object
 */
function isDateValid(string) {
  const date = new Date(string);
  return date.toString() !== "Invalid Date";
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
  if (
    date.length !== 10 ||
    !DateHelper.isValidDate(date, { defaultValue: "YYYY-MM-DD" })
  ) {
    return false;
  }
  const array = date.split("-");
  return (
    array.length === 3 &&
    array[0].length === 4 &&
    array[1].length === 2 &&
    array[2].length === 2
  );
}

function getContainerPosition(window, input) {
  const inputRect = input.getBoundingClientRect();
  const offsetY = window.pageYOffset;

  return {
    left: inputRect.left,
    top: inputRect.bottom + offsetY,
  };
}

export default DatePicker;
